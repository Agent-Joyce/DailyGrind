/* The build: index.html matches src/, and the site build (dist/) runs from a web server with nothing fetched from outside,
   with its pictures and font, an installable manifest, and a service worker that keeps it working offline.
   Usage: node tools/qa/check-build.js   (builds dist/ itself; writes nothing else) */
const fs=require('fs'),path=require('path'),http=require('http'),{spawnSync}=require('child_process'),{chromium}=require('playwright');
const repo=path.resolve(__dirname,'../..'),dist=path.join(repo,'dist'),build=path.join(repo,'tools/build.js');
const TYPES={html:'text/html; charset=utf-8',css:'text/css',js:'text/javascript',webp:'image/webp',png:'image/png',woff2:'font/woff2',webmanifest:'application/manifest+json',txt:'text/plain'};
const done=[];function ok(x,msg){if(!x)throw Error(msg)}
async function test(name,fn){try{await fn();done.push(name);console.log('PASS '+name)}catch(e){throw Error(name+': '+e.message)}}
(async()=>{
 await test('index.html is exactly what src/ builds',async()=>{const r=spawnSync(process.execPath,[build,'--check'],{encoding:'utf8'});ok(r.status===0,(r.stdout+r.stderr).trim())});
 await test('the single file asks for nothing outside itself',async()=>{const h=fs.readFileSync(path.join(repo,'index.html'),'utf8');
   ok(!/<link[^>]+href="https?:/.test(h)&&!/<script[^>]+src=/.test(h)&&!/@import/.test(h)&&!/url\(https?:/.test(h),'index.html still links to an outside file');ok(h.indexOf('@img(')<0&&h.indexOf('@font(')<0&&h.indexOf('@BUILD@')<0&&h.indexOf('@site')<0,'an unfilled build marker is left in index.html');
   ok(h.split('  if(!load())fresh();').length===2,'the test-hook marker line is not unique');ok(h.indexOf('serviceWorker')<0,'the single file registers a service worker')});
 const b=spawnSync(process.execPath,[build,'--site'],{encoding:'utf8'});if(b.status!==0)throw Error('site build failed: '+b.stdout+b.stderr);
 const server=http.createServer((q,s)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p.endsWith('/'))p+='index.html';const f=path.join(dist,p);
   if(!f.startsWith(dist)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){s.writeHead(404);return s.end('not found')}
   s.writeHead(200,{'Content-Type':TYPES[f.split('.').pop()]||'application/octet-stream','Cache-Control':'no-store'});fs.createReadStream(f).pipe(s)});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const port=server.address().port,base='http://127.0.0.1:'+port+'/';
 const launch={};if(process.env.DG_BROWSER_CHANNEL)launch.channel=process.env.DG_BROWSER_CHANNEL;if(process.env.DG_BROWSER_EXECUTABLE)launch.executablePath=process.env.DG_BROWSER_EXECUTABLE;
 const br=await chromium.launch(launch);
 try{
  for(const viewport of [{width:1280,height:800},{width:390,height:844}]){
   const ctx=await br.newContext({viewport}),pg=await ctx.newPage(),errors=[],outside=[],failed=[];
   pg.on('pageerror',e=>errors.push(String(e.message||e)));pg.on('request',q=>{if(q.url().indexOf(base)!==0&&!/^(data|blob):/.test(q.url()))outside.push(q.url())});pg.on('response',r=>{if(r.status()>=400)failed.push(r.status()+' '+r.url())});
   await ctx.route(u=>u.href.indexOf(base)!==0,r=>r.abort());
   const w=viewport.width+'px: ';
   await test(w+'the site loads and a game starts with no errors and no missing file',async()=>{await pg.goto(base,{waitUntil:'load'});await pg.click('#welcomeGo');await pg.waitForTimeout(400);
     ok(!errors.length,'script errors: '+errors.join(' | '));ok(!failed.length,'missing files: '+failed.join(', '));ok(await pg.evaluate(()=>!document.getElementById('welcome').classList.contains('show')),'the welcome screen did not close');
     ok(await pg.evaluate(()=>!/NaN|undefined/.test(document.body.innerText)),'NaN or undefined on screen')});
   await test(w+'nothing is requested from another site',async()=>{ok(!outside.length,'outside requests: '+outside.slice(0,3).join(', '))});
   await test(w+'the town pictures load from the site and no web font is fetched',async()=>{
     const r=await pg.evaluate(async()=>{await document.fonts.ready;const imgs=[].slice.call(document.querySelectorAll('img.building-sprite'));await Promise.all(imgs.map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r})));
       return {n:imgs.length,bad:imgs.filter(i=>!i.naturalWidth).length,src:imgs[0]&&imgs[0].getAttribute('src'),font:document.fonts.check('700 16px "Bricolage Grotesque"'),faces:[].slice.call(document.fonts).filter(f=>f.status==='loaded').length,art:getComputedStyle(document.documentElement).getPropertyValue('--interior-art').slice(0,40)}});
     ok(r.n>=10,'only '+r.n+' building pictures on the map');ok(!r.bad,r.bad+' building pictures failed to load');ok(/^img\//.test(r.src||''),'pictures are not served from img/: '+r.src);ok(r.faces===0,'a web font was loaded: the game uses the system font stack (see CHANGELOG 106)');ok(/url\(/.test(r.art),'the interior picture variable is missing')});
   await test(w+'the manifest is valid and its icons exist',async()=>{const href=await pg.getAttribute('link[rel=manifest]','href');ok(href,'no manifest link');const m=JSON.parse(fs.readFileSync(path.join(dist,href),'utf8'));
     ok(m.name&&m.start_url&&m.display==='standalone','manifest fields missing');ok(m.icons.some(i=>i.sizes==='192x192')&&m.icons.some(i=>i.sizes==='512x512')&&m.icons.some(i=>i.purpose==='maskable'),'icon sizes missing');m.icons.forEach(i=>ok(fs.existsSync(path.join(dist,i.src)),'icon missing: '+i.src))});
   await test(w+'the service worker takes control and the game loads with the network off',async()=>{
     await pg.evaluate(()=>navigator.serviceWorker.ready);await pg.reload({waitUntil:'load'});ok(await pg.evaluate(()=>!!navigator.serviceWorker.controller),'the page is not controlled by the service worker');
     await pg.evaluate(()=>{window.__T0=1});await ctx.setOffline(true);await new Promise(r=>{server.close(r);server.closeAllConnections&&server.closeAllConnections()});failed.length=0;errors.length=0;
     await pg.reload({waitUntil:'load'});ok(await pg.evaluate(()=>!window.__T0&&!!document.getElementById('hudEnd')&&document.querySelectorAll('img.building-sprite').length>=10),'the game did not come back offline');
     const bad=await pg.evaluate(async()=>{const imgs=[].slice.call(document.querySelectorAll('img.building-sprite'));await Promise.all(imgs.map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r})));return imgs.filter(i=>!i.naturalWidth).length});
     ok(!bad,bad+' pictures missing offline');ok(!errors.length,'script errors offline: '+errors.join(' | '));ok(await pg.evaluate(()=>!!localStorage.getItem('dailyGrind.save.v1')),'the save was lost')});
   await ctx.close();if(viewport.width===1280)await new Promise(r=>server.listen(port,'127.0.0.1',r));  /* back on for the next width */
  }
 }finally{await br.close();try{server.close()}catch(e){}}
 console.log(done.length+' build checks passed.');
})().catch(e=>{console.error('FAIL '+(e.message||e));process.exit(1)});
