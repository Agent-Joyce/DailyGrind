#!/usr/bin/env node
/* Manifest-driven full-game simulations. See docs/Simulation_Guide.md.
 * Requires Node >=18 and Playwright; never changes the source game file. */
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),crypto=require('node:crypto');
const {buildPlayer}=require('./build-suite-player');
const manifest=require('./suite-manifest.json');
const repo=path.resolve(__dirname,'../..');
function hash(x){return crypto.createHash('sha256').update(x).digest('hex')}
function validateManifest(){
  const count=(key,v)=>manifest.filter(c=>c[key]===v).length;
  if(manifest.length!==50||new Set(manifest.map(c=>c.id)).size!==50)throw Error('Manifest must contain 50 unique cases');
  for(const [k,v,n] of [['device','desktop',30],['device','mobile',20],['mode','single',10],['rivals','easy',9],['rivals','medium',9],['rivals','expert',9],['rivals','mixed',13],['mood','friendly',14],['mood','competitive',13],['mood','cutthroat',13],['strategy','balanced',20],['strategy','career',10],['strategy','social',10],['strategy','random',10],['reload',true,10]])if(count(k,v)!==n)throw Error('Manifest count: '+k+'='+v);
  manifest.forEach((c,i)=>{if(c.id!==String(i+1).padStart(3,'0')||c.gameSeed!==1001+i||c.botSeed!==2001+i||c.difficulty!=='normal'||c.trait!=='none')throw Error('Manifest identity/settings: '+c.id)});
  const guide=fs.readFileSync(path.join(repo,'docs/Simulation_Guide.md'),'utf8');
  manifest.forEach(c=>{const row=guide.split('\n').find(l=>l.startsWith('| '+c.id+' |'));if(!row||!row.toLowerCase().includes('| '+c.device+' |')||!row.toLowerCase().includes('| '+c.strategy+' |'))throw Error('Guide disagrees: '+c.id)});
}
const HOOK=`window.__G={get S(){return S},get loc(){return loc},get view(){return view},CONFIG:CONFIG,worth:worth,score:score,ITEMS:ITEMS,CAREERS:CAREERS,TRACKS:TRACKS,HOUSE:HOUSE,lvl:lvl,meets:meets,kreq:kreq,payIdx:payIdx,effort:effort,M:M,G:G,hasDress:hasDress,price:price,qualFee:qualFee,lesCount:lesCount,lesHours:lesHours,inProgress:inProgress,expShort:expShort,shutLeft:shutLeft,myJob:myJob,dist:dist,homeFee:homeFee,maxDays:maxDays,rivalWorth:rivalWorth,lifeScore:lifeScore};`;
function hookedSource(raw){const marker='  if(!load())fresh();';if(raw.split(marker).length!==2)throw Error('Game hook marker changed');return raw.replace(marker,HOOK+'\n'+marker)}
function seedPage(c){
  window.__QA={...c,autorun:false};
  localStorage.setItem('dailyGrind.preview','0');
  let a=c.gameSeed;
  const saved=sessionStorage.getItem('suite-reload-rng');if(saved){a=JSON.parse(saved);sessionStorage.removeItem('suite-reload-rng')}
  Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296};
  window.__suiteRng={state:()=>a,setState:x=>{a=x}};
}
function loadPlaywright(){try{return require('playwright')}catch(e){if(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES)return require(path.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES,'playwright'));throw e}}
async function runCase(browser,url,player,c,out,limits){
  const attemptsDir=path.join(out,'attempts');
  const attempt=1+(fs.existsSync(attemptsDir)?fs.readdirSync(attemptsDir).filter(f=>f.startsWith('case-'+c.id+'-attempt-')&&f.endsWith('.json')).length:0);
  const started=new Date().toISOString(),res={...c,attempt,harnessSha256:limits.harnessSha256,status:'running',started,snapshots:[],trace:[],issues:{},pageErrors:[],reloadResult:{planned:c.reload,status:c.reload?'not_exercised':'not_planned'}};
  const ctx=await browser.newContext({viewport:c.device==='mobile'?{width:390,height:844}:{width:1280,height:800},isMobile:c.device==='mobile',hasTouch:c.device==='mobile',deviceScaleFactor:1,timezoneId:'Asia/Singapore',locale:'en-SG'});
  const pg=await ctx.newPage();pg.setDefaultTimeout(limits.actionMs);
  let expired=false,ready=false,sequence=0;
  const timer=setTimeout(()=>{expired=true;ctx.close().catch(()=>{})},limits.gameMs);
  const checkpoint=()=>{const file=path.join(out,'case-'+c.id+'.json'),temp=file+'.tmp';fs.writeFileSync(temp,JSON.stringify(res,null,1));fs.renameSync(temp,file)};
  checkpoint();
  async function input(loc){
    if(!(await loc.count()))throw Error('MISSING_CONTROL: '+loc);
    if(c.device==='mobile')await loc.tap({timeout:limits.actionMs});else await loc.click({timeout:limits.actionMs});
  }
  async function expand(loc){
    const summaries=await loc.evaluate(el=>{const all=Array.from(document.querySelectorAll('details'));let a=[],d=el.parentElement;while(d){if(d.tagName==='DETAILS'&&!d.open)a.push(d.id?{id:d.id}:{index:all.indexOf(d)});d=d.parentElement}return a.reverse()});
    for(const d of summaries)await input(d.id?pg.locator('#'+d.id+' > summary'):pg.locator('details').nth(d.index).locator(':scope > summary'));
  }
  async function press(selector){const loc=pg.locator(selector).first();await expand(loc);await input(loc)}
  async function navigate(loc){
    await press('[data-dg-screen="town"]');await press('#townDirectory [data-dg-go='+JSON.stringify(loc)+']');
  }
  async function bankProduct(id){
    if(c.device==='mobile')await pg.locator('#bankProductSelect').selectOption(id);
    else await press('[data-dg-product='+JSON.stringify(id)+']');
  }
  await ctx.addInitScript(seedPage,c);
  await ctx.route('**/*',route=>route.request().url().startsWith(url)?route.continue():route.abort());
  pg.on('pageerror',e=>res.pageErrors.push(String(e.stack||e)));
  await pg.exposeBinding('__qaInteract',async(_source,op)=>{
    const before=ready?await pg.evaluate(()=>window.__suite.observe()):null;
    const row={n:++sequence,...op,before};res.trace.push(row);
    try{
      if(op.type==='go')await navigate(op.loc);
      else if(op.type==='app'){
        await press('[data-dg-screen="town"]');await press('#townDevice');
        await press('#shop [data-act="app"][data-arg='+JSON.stringify(op.app)+']');
      }else if(op.type==='bankAmount'){
        await bankProduct('amt');await press('.bk-card:not([hidden]) [data-dg-mode="'+(op.withdraw?'withdraw':'deposit')+'"]');
        await pg.locator('#amt').fill(String(op.value));await pg.locator('#amt').press('Tab');
      }else{
        let sel=op.act?'#shop [data-act='+JSON.stringify(op.act)+']'+(op.arg!=null?'[data-arg='+JSON.stringify(op.arg)+']':''):op.id?'#'+op.id:'[data-suite-id="target"]';
        // Bank step limits are updated on every panel render. Match its input and delta,
        // then let the actual current button supply its current min/max values.
        if(op.act==='step'&&op.arg)sel='#shop [data-act="step"][data-arg^='+JSON.stringify(op.arg.split('|').slice(0,2).join('|')+'|')+']';
        if(op.act&&['evyes','evno','evopt','cont'].includes(op.act))sel='#event [data-act='+JSON.stringify(op.act)+']'+(op.arg!=null?'[data-arg='+JSON.stringify(op.arg)+']':'');
        const target=pg.locator(sel).first();
        if(op.act){
          const bank=await target.evaluate(el=>({id:el.closest('.bk-card')?.dataset.bankId||null,mode:el.hasAttribute('data-bank-deposit')?'deposit':el.hasAttribute('data-bank-withdraw')?'withdraw':null}));
          if(bank.id)await bankProduct(bank.id);
          if(bank.mode)await press('.bk-card:not([hidden]) [data-dg-mode="'+bank.mode+'"]');
          if(bank.id&&!(await pg.locator(sel).first().isEnabled())){
            // Inactive products initially contain legacy button states. Opening the real
            // product reveals actual eligibility; record an unavailable choice, never force it.
            row.skippedReason='Bank control unavailable after opening its product';row.ok=false;
            if(ready)row.after=await pg.evaluate(()=>window.__suite.observe());
            return {skipped:true};
          }
        }
        await press(sel);
      }
      if(ready){row.after=await pg.evaluate(()=>window.__suite.observe());res.issues={...row.after.issues}}
      row.ok=true;
    }catch(e){row.error=String(e);throw e}
  });
  try{
    await pg.goto(url,{waitUntil:'load'});
    await pg.addScriptTag({content:player});await pg.evaluate(()=>window.__suite.init());ready=true;
    res.runtime=await pg.evaluate(()=>({ua:navigator.userAgent,width:innerWidth,height:innerHeight,touch:navigator.maxTouchPoints,scale:devicePixelRatio}));
    if(!(await pg.locator('#traits input[value="none"]').isChecked()))throw Error('Unexpected default starting trait');
    await press('#modes [data-mode="'+c.mode+'"]');
    if(c.mode==='rivals'){
      await press('#rivCount [data-rc="3"]');await press('#rivLevel [data-rl="'+c.rivals+'"]');await press('#rivMood [data-rm="'+c.mood+'"]');
    }
    await press('#welcomeGo');await pg.evaluate(()=>window.__suite.ready());
    res.initial=await pg.evaluate(()=>window.__suite.snapshot());
    if(res.initial.diff!=='normal'||res.initial.mode!==c.mode||(c.mode==='rivals'&&(res.initial.mood!==c.mood||res.initial.rivals.length!==3)))throw Error('Scenario selection mismatch');
    if(limits.preflight){await navigate('bank');await bankProduct('amt');await navigate('apt');res.probe=await pg.evaluate(()=>window.__suite.probe());if(res.probe.day!==1||!res.probe.fed)throw Error('Probe did not feed player on day 1');if(res.pageErrors.length)throw Error(res.pageErrors.join('\n'));res.status='preflight_passed';return res}
    for(let guard=0;guard<res.initial.gameDays+2;guard++){
      const snap=await pg.evaluate(()=>window.__suite.snapshot());if(snap.over)break;
      if(c.reload&&snap.day===10&&res.reloadResult.status==='not_exercised'){
        const before=await pg.evaluate(()=>({raw:localStorage.getItem('dailyGrind.save.v1'),player:window.__suite.state(),rng:window.__suiteRng.state(),state:window.__G.S}));
        const persisted=JSON.parse(before.raw);
        const notSaved=Object.keys(before.state).filter(k=>JSON.stringify(before.state[k])!==JSON.stringify(persisted.S[k]));
        await pg.evaluate(rng=>sessionStorage.setItem('suite-reload-rng',JSON.stringify(rng)),before.rng);
        ready=false;await pg.reload({waitUntil:'load'});await pg.addScriptTag({content:player});
        await pg.evaluate(b=>{window.__suiteRng.setState(b.rng);window.__suite.init(b.player)},before);ready=true;
        const after=await pg.evaluate(()=>window.__G.S);
        const changed=Object.keys(persisted.S).filter(k=>k!=='logs'&&JSON.stringify(after[k])!==JSON.stringify(persisted.S[k]));
        res.reloadResult={planned:true,status:changed.length?'failed':'passed',changedFields:changed,preReloadUnsavedFields:notSaved,beforeRivalSeed:persisted.S.rivalSeed,afterRivalSeed:after.rivalSeed};
        if(changed.length)res.issues['RELOAD: persistent fields changed: '+changed.join(',')]=1;
      }
      const day=await pg.evaluate(()=>window.__suite.day());res.snapshots.push(day.snapshot);Object.assign(res.issues,day.issues);res.clicks=day.clicks;res.morale=day.morale;checkpoint();
      if(day.snapshot.over)break;
      if(day.beforeDay===day.snapshot.day)throw Error('STUCK: day did not advance');
    }
    res.final=await pg.evaluate(()=>window.__suite.snapshot());
    if(!res.final.over)throw Error('DAY_GUARD: game did not end');res.status='completed';
  }catch(e){
    res.status='failed';res.failure={message:expired?'GAME_TIMEOUT':String(e.message||e),stack:String(e.stack||e)};
    try{res.lastValidState=await pg.evaluate(()=>({state:window.__G.S,rng:window.__suiteRng.state()}));res.screenshot='case-'+c.id+'-failure.png';await pg.screenshot({path:path.join(out,res.screenshot),fullPage:true})}catch(ignore){}
  }finally{clearTimeout(timer);res.finished=new Date().toISOString();res.elapsedSeconds=(Date.parse(res.finished)-Date.parse(started))/1000;checkpoint();await ctx.close().catch(()=>{})}
  console.log(c.id,c.device,c.strategy,c.rivals||'single',c.mood||'-',res.status,'day',res.final?.day||res.snapshots.at(-1)?.day||res.lastValidState?.state?.day||'?',res.failure?.message?.slice(0,150)||res.final?.ending||'');
  return res;
}
async function main(){
  validateManifest();buildPlayer();
  const argv=process.argv.slice(2),outArg=argv.find(a=>!a.startsWith('--'));
  if(argv.includes('--validate')){console.log('Manifest, guide mapping and player transform: PASS');return}
  if(!outArg)throw Error('Usage: node tools/qa/run-suite.js <outside-output-folder> [--workers=3] [--commit=sha] [--resume]');
  const out=path.resolve(outArg);if(out===repo||out.startsWith(repo+path.sep))throw Error('Use an output directory outside the repository');fs.mkdirSync(out,{recursive:true});
  const opt=(name,fallback)=>argv.find(a=>a.startsWith('--'+name+'='))?.split('=').slice(1).join('=')||fallback;
  const raw=fs.readFileSync(path.join(repo,'index.html'),'utf8'),player=buildPlayer(),src=hookedSource(raw);
  const pw=loadPlaywright();
  const executablePath=process.env.DG_BROWSER_EXECUTABLE;
  const browser=await pw.chromium.launch({...(executablePath?{executablePath}:{}),args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']});
  const limits={actionMs:+opt('action-ms','20000'),gameMs:+opt('game-ms','600000')};
  const workerCount=+opt('workers','3');
  if(!Number.isInteger(workerCount)||workerCount<1||workerCount>4||!Number.isFinite(limits.actionMs)||limits.actionMs<=0||!Number.isFinite(limits.gameMs)||limits.gameMs<=0){await browser.close();throw Error('Invalid worker count or timeout')}
  const metadata={started:new Date().toISOString(),phaseStarted:new Date().toISOString(),workerCount,timezone:'Asia/Singapore',baseCommit:opt('commit','unknown'),uncommittedChange:'QA suite only; index.html unchanged',gameSha256:hash(raw),harnessSha256:hash(player+fs.readFileSync(__filename)),manifestSha256:hash(JSON.stringify(manifest)),browser:browser.version(),playwright:require(path.join(path.dirname(require.resolve(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES?path.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES,'playwright'):'playwright')),'package.json')).version,limits:{...limits}};
  const metaPath=path.join(out,'metadata.json');
  if(argv.includes('--resume')&&fs.existsSync(metaPath)){
    const prev=JSON.parse(fs.readFileSync(metaPath));
    for(const k of ['baseCommit','gameSha256','manifestSha256','browser'])if(prev[k]!==metadata[k]){await browser.close();throw Error('Cannot resume with changed '+k)}
    if(prev.harnessSha256!==metadata.harnessSha256&&!argv.includes('--recover-harness')){await browser.close();throw Error('Changed harness requires explicit --recover-harness and preserved attempts')}
    metadata.started=prev.started;metadata.sourceVerification=prev.sourceVerification;
    const {previousPhases,...previous}=prev;metadata.previousPhases=[...(previousPhases||[]),previous];
  }
  limits.harnessSha256=metadata.harnessSha256;
  fs.writeFileSync(metaPath,JSON.stringify(metadata,null,2));
  const server=http.createServer((req,res)=>{res.setHeader('Content-Type','text/html; charset=utf-8');res.end(src)});await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const url='http://127.0.0.1:'+server.address().port+'/';
  try{
    let cursor=0;const results=[];const workers=workerCount;
    await Promise.all(Array.from({length:workers},async()=>{
      while(cursor<manifest.length){const c=manifest[cursor++],file=path.join(out,'case-'+c.id+'.json');
        if(fs.existsSync(file)){if(!argv.includes('--resume'))throw Error('Existing result '+c.id+'; choose fresh output folder or --resume');const prior=JSON.parse(fs.readFileSync(file));if(prior.status==='running')throw Error('Interrupted attempt '+c.id+' requires explicit retry authorization');results.push(prior);continue}
        results.push(await runCase(browser,url,player,c,out,limits));
      }
    }));
    metadata.finished=new Date().toISOString();const data={metadata,manifest,results:results.sort((a,b)=>a.id.localeCompare(b.id))};
    fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(data,null,1));fs.writeFileSync(metaPath,JSON.stringify(metadata,null,2));console.log('Batch saved:',out);
  }finally{await browser.close();await new Promise(r=>server.close(r))}
}
module.exports={validateManifest,hookedSource,runCase};
if(require.main===module)main().catch(e=>{console.error(e);process.exitCode=1});
