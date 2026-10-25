/* Daily Grind UI check: Node launcher (for machines with Node and Playwright, e.g. a cloud sandbox).
   On Windows without Node, use run-uicheck.ps1 instead: it runs the same uicheck.js in your browser.

   Builds a throwaway test copy of index.html with the test hook (window.__G) and uicheck.js, then runs it in headless
   Chromium twice: desktop (1280×800) and phone (390×844, touch, 2× pixels). Saves a screenshot of every building and
   pop-up, and writes uicheck-results.json and uicheck-report.md, all in the output folder.
   Then it checks the things that need a page reload, which uicheck.js cannot do from inside the page: starting at each
   difficulty, starting with a trait, saving and reloading mid-game, and a damaged save (kept as .broken, new game starts).

   Usage (from the repo folder):  node tools/qa/run-uicheck.js [outDir] [page]
   page: another copy of index.html to check instead (used to test the check itself).
   The output folder must be outside the repo (default: a "dg_qa_ui" folder next to the repo folder). */
const fs=require('fs'),path=require('path');
let pw;try{pw=require('playwright')}catch(e){pw=require('/opt/node22/lib/node_modules/playwright')}
const here=__dirname,repo=path.resolve(here,'..','..');
const out=path.resolve(process.argv[2]||path.join(path.dirname(repo),'dg_qa_ui'));
if((out+path.sep).startsWith(repo+path.sep))throw new Error('The output folder must be outside the repo (the test copy must not be committed).');
fs.mkdirSync(path.join(out,'shots'),{recursive:true});

const marker='  if(!load())fresh();';
let src=fs.readFileSync(process.argv[3]?path.resolve(process.argv[3]):path.join(repo,'index.html'),'utf8');
if(src.split(marker).length!==2)throw new Error('Expected the line "'+marker+'" exactly once in index.html.');
const hook='  window.__G={get S(){return S},set S(v){S=v},get loc(){return loc},set loc(v){loc=v},get view(){return view},set view(v){view=v},'+
  'CONFIG:CONFIG,fresh:fresh,render:function(){render()},worth:worth,TRACKS:TRACKS,CAREERS:CAREERS,ITEMS:ITEMS,LOCS:LOCS};';
src=src.replace(marker,hook+'\n'+marker);
src=src.replace(/<\/body>(?![\s\S]*<\/body>)/,'<script>window.__UICHECK={autorun:true,seed:7};</script><script src="uicheck.js"></script>\n</body>');
fs.writeFileSync(path.join(out,'index.html'),src);
fs.writeFileSync(path.join(out,'flows.html'),src.replace('autorun:true','autorun:false'));
fs.copyFileSync(path.join(here,'uicheck.js'),path.join(out,'uicheck.js'));

(async()=>{
  const br=await pw.chromium.launch(),all=[];
  for(const v of [{name:'desktop',viewport:{width:1280,height:800}},{name:'phone',viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2}]){
    const ctx=await br.newContext({viewport:v.viewport,isMobile:!!v.isMobile,hasTouch:!!v.hasTouch,deviceScaleFactor:v.deviceScaleFactor||1});
    const pg=await ctx.newPage(),pageErrs=[];
    pg.on('pageerror',e=>pageErrs.push(String(e.message||e)));
    await pg.route(/^https?:\/\//,r=>r.abort());  /* no network: fonts fall back, nothing leaves the machine */
    await pg.exposeFunction('__uiShot',async n=>{await pg.screenshot({path:path.join(out,'shots',n.replace(/[^\w-]/g,'_')+'.png')})});
    await pg.goto('file://'+path.join(out,'index.html'));
    await pg.waitForFunction(()=>window.__UI_RESULTS,null,{timeout:300000});
    const r=await pg.evaluate(()=>window.__UI_RESULTS);all.push(r);
    if(!r.stats.buildings&&pageErrs.length)r.issues.push({kind:'JS-ERROR',where:'page load',msg:pageErrs[0]});
    console.log(`\n${r.viewport} ${r.width}x${r.height}: ${r.stats.buildings} buildings, ${r.stats.situations||0} situations, ${r.stats.clicks} presses, ${r.stats.checks} layout checks, ${r.issues.length} issue(s), ${Math.round(r.ms/1000)}s`);
    r.issues.forEach(i=>console.log(`  ${i.kind.padEnd(13)} ${i.where}: ${i.msg}`));
    if(r.stats.popups.length)console.log('  (pop-ups, numbers not compared: '+r.stats.popups.join('; ')+')');
    await ctx.close();
  }
  all.push(await flows(br));
  await br.close();
  fs.writeFileSync(path.join(out,'uicheck-results.json'),JSON.stringify(all,null,1));
  const md=['# Daily Grind UI check','',...all.flatMap(r=>[`## ${r.viewport} (${r.width}×${r.height})`,'',`${r.stats.buildings} buildings, ${r.stats.situations||0} situations, ${r.stats.clicks} presses, ${r.stats.checks} layout checks. ${r.issues.length?r.issues.length+' issue(s):':'No issues.'}`,'',...r.issues.map(i=>`- **${i.kind}** ${i.where}: ${i.msg}`),'',...(r.stats.popups.length?['Presses that opened a pop-up (layout checked, numbers not compared): '+r.stats.popups.join('; '),'']:[])])].join('\n');
  fs.writeFileSync(path.join(out,'uicheck-report.md'),md);
  console.log('\nScreenshots, results and report in '+out);
  process.exitCode=all.some(r=>r.issues.length)?1:0;
})();

/* ---------- checks that need a page reload ---------- */
async function flows(br){
  const t0=Date.now(),issues=[],note=(kind,where,msg)=>issues.push({kind,where,msg});let checks=0;
  const ctx=await br.newContext({viewport:{width:1280,height:800}}),pg=await ctx.newPage(),errs=[];
  pg.on('pageerror',e=>errs.push(String(e.message||e)));
  await pg.route(/^https?:\/\//,r=>r.abort());
  const url='file://'+path.join(out,'flows.html');
  const open=async(clear)=>{await pg.goto(url);if(clear){await pg.evaluate(()=>localStorage.clear());await pg.reload()}await pg.waitForTimeout(250)};
  const shut=()=>pg.evaluate(()=>{['mnGo','gpGo','cpGo'].forEach(id=>{const b=document.getElementById(id);if(b&&b.offsetParent)b.click()})});
  /* 1. each difficulty starts a game */
  const diffs=await (async()=>{await open(true);return pg.evaluate(()=>[...document.querySelectorAll('#diffs [data-diff]')].map(b=>b.dataset.diff))})();
  for(const k of diffs){checks++;await open(true);await pg.click('#diffs [data-diff="'+k+'"]');await pg.waitForTimeout(150);
    const r=await pg.evaluate(()=>({diff:__G.S.diff,cash:__G.S.cash,welcome:document.getElementById('welcome').classList.contains('show'),hud:document.getElementById('hCash').textContent}));
    if(r.diff!==k||r.welcome||!(r.cash>0))note('START','difficulty '+k,'the game did not start properly: '+JSON.stringify(r))}
  /* 2. a starting trait is applied */
  checks++;await open(true);
  const tr=await pg.evaluate(()=>{const i=[...document.querySelectorAll('#traits input')].find(x=>x.value!=='none');if(!i)return null;document.getElementById('traitBox').open=true;i.click();return i.value});
  if(tr){await pg.click('#welcomeGo');await pg.waitForTimeout(150);
    const r=await pg.evaluate(()=>({trait:__G.S.trait,log:__G.S.logs.some(l=>/Your trait/.test(l[0]))}));
    if(r.trait!==tr||!r.log)note('START','trait '+tr,'the trait was not applied: '+JSON.stringify(r))}
  /* 3. save mid-game, reload, same game back */
  checks++;await open(true);await pg.click('#welcomeGo');await pg.waitForTimeout(150);await shut();
  await pg.evaluate(()=>{const b=document.getElementById('previewBtn');if(/on/i.test(b.textContent))b.click()});
  for(const [loc,sel] of [['gym','[data-act="gym"]'],['market','[data-act="groc"]'],['apt','[data-act="nap"]']]){
    await pg.evaluate(l=>document.querySelector('.tile[data-loc="'+l+'"]').click(),loc);await pg.waitForTimeout(100);await shut();
    await pg.evaluate(s=>{const b=document.querySelector('#shop '+s);if(b&&!b.disabled)b.click()},sel);await pg.waitForTimeout(100)}
  await pg.evaluate(()=>document.getElementById('hudEnd').click());await pg.waitForTimeout(150);
  for(let i=0;i<8;i++){const more=await pg.evaluate(()=>{const b=document.querySelector('#event [data-act]:not(:disabled)');if(b&&__G.S.pending){b.click();return true}return false});if(!more)break;await pg.waitForTimeout(120)}
  await shut();await pg.evaluate(()=>document.querySelector('.tile[data-loc="bank"]').click());await pg.waitForTimeout(150);
  const KEYS=['day','ap','cash','bank','energy','happy','health','know','items','food','career','edu','enr','les','clothes','inv','flags','tier','diff','trait','fed','gym','home'];
  const pick=()=>pg.evaluate(K=>{const o={};K.forEach(k=>o[k]=__G.S[k]);return JSON.stringify({S:o,loc:__G.loc,view:__G.view})},KEYS);
  const before=await pick();await open(false);const after=await pick();
  if(before!==after){const a=JSON.parse(before),b=JSON.parse(after);const diff=Object.keys(a.S).filter(k=>JSON.stringify(a.S[k])!==JSON.stringify(b.S[k]));note('SAVE','save and reload','not the same game after reloading: '+(diff.length?diff.join(', '):'place '+a.loc+'/'+a.view+' -> '+b.loc+'/'+b.view))}
  if(!(await pg.evaluate(()=>__G.S.logs.some(l=>/Welcome back/.test(l[0])))))note('SAVE','save and reload','no "Welcome back" line after reloading');
  /* 4. a damaged save: a new game starts and the old one is kept */
  checks++;await pg.evaluate(()=>localStorage.setItem('dailyGrind.save.v1','{"S":{"day":3,'));await open(false);
  const r4=await pg.evaluate(()=>({day:__G.S.day,welcome:document.getElementById('welcome').classList.contains('show'),kept:localStorage.getItem('dailyGrind.save.v1.broken')}));
  if(r4.day!==1||!r4.welcome||r4.kept!=='{"S":{"day":3,')note('SAVE','damaged save','expected a new game and the old save kept as .broken: '+JSON.stringify(r4));
  errs.forEach(e=>note('JS-ERROR','reload checks',e));
  await ctx.close();
  const r={viewport:'reload checks',width:1280,height:800,ms:Date.now()-t0,stats:{buildings:0,situations:0,clicks:0,checks:checks,popups:[]},issues};
  console.log(`\nreload checks: ${diffs.length} difficulties, a trait, save and reload, a damaged save: ${issues.length} issue(s), ${Math.round(r.ms/1000)}s`);
  issues.forEach(i=>console.log(`  ${i.kind.padEnd(13)} ${i.where}: ${i.msg}`));
  return r;
}

