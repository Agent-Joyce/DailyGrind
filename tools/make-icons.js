/* Draws the app icons from the game's own brand mark (run once, or again if the mark or colours change).
   Usage: node tools/make-icons.js <folder outside the repo>   -> writes src/pwa/icons/icon-192.png, icon-512.png, maskable-512.png */
const path=require('path'),fs=require('fs'),{outDir,openGame,repo}=require('./qa/qa-page.js');
const out=outDir(process.argv[2],'dg-icons'),dest=path.join(repo,'src/pwa/icons');
(async()=>{const {br,pg}=await openGame(out);
 try{
  const mark=await pg.evaluate(()=>__T.ev("modernIcon('brand')"));fs.mkdirSync(dest,{recursive:true});
  for(const [name,size,glyph,radius] of [['icon-192.png',192,0.62,0.22],['icon-512.png',512,0.62,0.22],['maskable-512.png',512,0.46,0]]){
    await pg.setViewportSize({width:size,height:size});
    await pg.setContent('<body style="margin:0;background:transparent"><div style="width:'+size+'px;height:'+size+'px;border-radius:'+Math.round(size*radius)+'px;background:#286254;display:grid;place-items:center;color:#ebc67e"><div id="g" style="width:'+Math.round(size*glyph)+'px;height:'+Math.round(size*glyph)+'px">'+mark+'</div></div></body>');
    await pg.evaluate(()=>{const s=document.querySelector('#g svg');if(s){s.setAttribute('width','100%');s.setAttribute('height','100%');s.style.width='100%';s.style.height='100%'}});
    await pg.screenshot({path:path.join(dest,name),omitBackground:true});console.log('wrote src/pwa/icons/'+name);
  }
 }finally{await br.close()}
})().catch(e=>{console.error(e.message||e);process.exitCode=1});
