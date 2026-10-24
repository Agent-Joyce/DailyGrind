/* Daily Grind UI check: Node launcher (for machines with Node and Playwright, e.g. a cloud sandbox).
   On Windows without Node, use run-uicheck.ps1 instead: it runs the same uicheck.js in your browser.

   Builds a throwaway test copy of index.html with the test hook (window.__G) and uicheck.js, then runs it in headless
   Chromium twice: desktop (1280×800) and phone (390×844, touch, 2× pixels). Saves a screenshot of every building and
   pop-up, and writes uicheck-results.json and uicheck-report.md, all in the output folder.

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
    console.log(`\n${r.viewport} ${r.width}x${r.height}: ${r.stats.buildings} buildings, ${r.stats.clicks} presses, ${r.stats.checks} layout checks, ${r.issues.length} issue(s), ${Math.round(r.ms/1000)}s`);
    r.issues.forEach(i=>console.log(`  ${i.kind.padEnd(13)} ${i.where}: ${i.msg}`));
    if(r.stats.popups.length)console.log('  (pop-ups, numbers not compared: '+r.stats.popups.join('; ')+')');
    await ctx.close();
  }
  await br.close();
  fs.writeFileSync(path.join(out,'uicheck-results.json'),JSON.stringify(all,null,1));
  const md=['# Daily Grind UI check','',...all.flatMap(r=>[`## ${r.viewport} (${r.width}×${r.height})`,'',`${r.stats.buildings} buildings, ${r.stats.clicks} presses, ${r.stats.checks} layout checks. ${r.issues.length?r.issues.length+' issue(s):':'No issues.'}`,'',...r.issues.map(i=>`- **${i.kind}** ${i.where}: ${i.msg}`),'',...(r.stats.popups.length?['Presses that opened a pop-up (layout checked, numbers not compared): '+r.stats.popups.join('; '),'']:[])])].join('\n');
  fs.writeFileSync(path.join(out,'uicheck-report.md'),md);
  console.log('\nScreenshots, results and report in '+out);
  process.exitCode=all.some(r=>r.issues.length)?1:0;
})();
