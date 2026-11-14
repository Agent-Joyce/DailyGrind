#!/usr/bin/env node
/* Daily Grind build. No dependencies.
   Source of truth: src/ (index.html shell, css/*.css, js/*.js in name order, img/, fonts/, pwa/).
   Outputs:
     index.html (repo root, committed): one file with the CSS, script, pictures and font inlined. QA tools read this.
     dist/ (not committed): index.html + app.css + app.js + img/ + fonts/ + manifest, icons and service worker, for a website or itch.io.
   Usage:
     node tools/build.js           build both
     node tools/build.js --check   build in memory and fail if the committed index.html differs (edited by hand, or not rebuilt)
     node tools/build.js --single  only index.html        node tools/build.js --site  only dist/
   Markers in source:
     @img(name)            a picture in src/img: a data URI in the single file, the path img/name in the site build
     @font(name)           the same for src/fonts
     site-only block       wrapped in HTML comments "@site" and "@/site", or the same words in CSS/JS block comments
     single-only block     the same with "@single" and "@/single"
     @BUILD@               a short hash of the site's files (site build), or "single" */
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const root=path.resolve(__dirname,'..'),src=path.join(root,'src'),dist=path.join(root,'dist');
const args=process.argv.slice(2),CHECK=args.includes('--check'),ONLY=args.includes('--single')?'single':args.includes('--site')?'site':'';
const read=f=>fs.readFileSync(path.join(src,f),'utf8');
const parts=d=>fs.readdirSync(path.join(src,d)).filter(f=>!f.startsWith('.')).sort().map(f=>read(d+'/'+f)).join('');
const MIME={webp:'image/webp',png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',svg:'image/svg+xml',woff2:'font/woff2'};
const dataUri=(dir,name)=>{const f=path.join(src,dir,name);if(!fs.existsSync(f))throw Error('Missing file for marker: src/'+dir+'/'+name);
  const ext=name.split('.').pop();if(!MIME[ext])throw Error('Unknown file type: '+name);return 'data:'+MIME[ext]+';base64,'+fs.readFileSync(f).toString('base64')};
/* keep one kind of conditional block and drop the other (the markers themselves always go) */
function blocks(text,keep){
  const drop=keep==='site'?'single':'site';
  [['<!--@','-->','<!--@/'],['/*@','*/','/*@/']].forEach(([a,b,c])=>{
    const esc=s=>s.replace(/[.*+?^${}()|[\]\\\/]/g,'\\$&');
    text=text.replace(new RegExp(esc(a+drop+b)+'[\\s\\S]*?'+esc(c+drop+b)+'\\n?','g'),'');
    text=text.replace(new RegExp(esc(a+keep+b)+'\\n?|'+esc(c+keep+b)+'\\n?','g'),'');
  });
  return text;
}
function markers(text,mode,used){
  return text.replace(/@(img|font)\(([A-Za-z0-9._-]+)\)/g,(m,kind,name)=>{const dir=kind==='img'?'img':'fonts';if(used)used.add(dir+'/'+name);
    return mode==='single'?dataUri(dir,name):dir+'/'+name});
}
function shell(mode){const t=blocks(read('index.html'),mode);
  if(t.split('/*@css*/\n').length!==2||t.split('/*@js*/\n').length!==2)throw Error('src/index.html must contain the lines /*@css*/ and /*@js*/ exactly once.');return t}
function buildSingle(){
  const css=markers(blocks(parts('css'),'single'),'single'),js=markers(blocks(parts('js'),'single'),'single');
  return shell('single').replace('/*@css*/\n',()=>css).replace('/*@js*/\n',()=>js).replace(/@BUILD@/g,'single');
}
function buildSite(){
  const used=new Set(),files={};
  let css=markers(blocks(parts('css'),'site'),'site',used),js=markers(blocks(parts('js'),'site'),'site',used),html=shell('site');
  used.forEach(f=>{files[f]=fs.readFileSync(path.join(src,f))});
  if([...used].some(f=>f.indexOf('fonts/')===0)&&fs.existsSync(path.join(src,'fonts/OFL.txt')))files['fonts/OFL.txt']=fs.readFileSync(path.join(src,'fonts/OFL.txt'));  /* the font's licence ships with it */
  const pwa=path.join(src,'pwa');
  if(fs.existsSync(pwa))(function walk(d,rel){fs.readdirSync(d).forEach(f=>{const p=path.join(d,f),r=rel?rel+'/'+f:f;if(fs.statSync(p).isDirectory())walk(p,r);else if(f!=='sw.js')files[r]=fs.readFileSync(p)})})(pwa,'');
  const hash=crypto.createHash('sha256').update(css).update(js).update(html).update(Object.keys(files).sort().map(k=>k+':'+crypto.createHash('sha256').update(files[k]).digest('hex')).join('|')).digest('hex').slice(0,10);
  css=css.replace(/@BUILD@/g,hash);js=js.replace(/@BUILD@/g,hash);
  html=html.replace('<style>\n/*@css*/\n</style>',()=>'<link rel="stylesheet" href="app.css?v='+hash+'">').replace('<script>\n/*@js*/\n</script>',()=>'<script src="app.js?v='+hash+'"></script>').replace(/@BUILD@/g,hash);
  if(html.indexOf('/*@css*/')>=0||html.indexOf('/*@js*/')>=0)throw Error('src/index.html: the /*@css*/ and /*@js*/ lines must sit alone inside <style> and <script>.');
  files['index.html']=Buffer.from(html);files['app.css']=Buffer.from(css);files['app.js']=Buffer.from(js);
  if(fs.existsSync(path.join(pwa,'sw.js'))){
    const list=Object.keys(files).sort().map(f=>f==='index.html'?'./':f==='app.css'||f==='app.js'?f+'?v='+hash:f);
    files['sw.js']=Buffer.from(fs.readFileSync(path.join(pwa,'sw.js'),'utf8').replace(/@BUILD@/g,hash).replace('/*@FILES@*/',JSON.stringify(list)));
  }
  return {files,hash};
}
const kb=n=>(n/1024).toFixed(0).padStart(6)+' KB';
try{
  if(CHECK){
    const want=buildSingle(),have=fs.existsSync(path.join(root,'index.html'))?fs.readFileSync(path.join(root,'index.html'),'utf8'):'';
    if(want!==have){let i=0;while(i<want.length&&want[i]===have[i])i++;const line=want.slice(0,i).split('\n').length;
      console.error('FAIL build check: index.html is not what src/ builds (first difference at line '+line+'). Edit src/, never index.html, then run: node tools/build.js');process.exit(1)}
    buildSite();console.log('PASS build check: index.html matches src/, and the site build assembles.');
  }else{
    if(ONLY!=='site'){const s=buildSingle();fs.writeFileSync(path.join(root,'index.html'),s);console.log('index.html'.padEnd(34)+kb(Buffer.byteLength(s)))}
    if(ONLY!=='single'){const {files,hash}=buildSite();fs.rmSync(dist,{recursive:true,force:true});let total=0;
      Object.keys(files).sort().forEach(f=>{const p=path.join(dist,f);fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,files[f]);total+=files[f].length});
      ['index.html','app.css','app.js','sw.js'].forEach(f=>{if(files[f])console.log(('dist/'+f).padEnd(34)+kb(files[f].length))});
      const rest=Object.keys(files).filter(f=>f.indexOf('/')>0);console.log(('dist/ pictures, fonts, icons ('+rest.length+')').padEnd(34)+kb(rest.reduce((a,f)=>a+files[f].length,0)));
      console.log('dist/ total'.padEnd(34)+kb(total)+'   build '+hash)}
  }
}catch(e){console.error('Build failed: '+e.message);process.exit(1)}
