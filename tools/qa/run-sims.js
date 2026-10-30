/* Daily Grind simulation runs: Node launcher (needs Node and Playwright, as in the cloud environment).

   Builds a throwaway test copy of index.html with the test hook sim.js needs and the run settings, runs it in headless
   Chromium, and writes results.json (window.__QA_RESULTS) plus a one-line-per-game summary to the console.
   Ask the user before running simulations (CLAUDE.md), and save the report to docs/QA_Sim_<date>_<change>.md/.json.

   Usage (from the repo folder):
     node tools/qa/run-sims.js <folder outside the repo> [survive=20] [random=10] [surviveSeed=1] [randomSeed=101] [page] [--no-comm] [--rivals=level] [--rival-count=n]
   --no-comm: the careful player does not use the Community Centre (to measure what it adds to morale).
   --rivals=easy|medium|expert|mixed [--rival-count=1..3]: play games with AI rivals (30 days); each result lists the rivals.
   page: another copy of index.html to run instead (for example the base build when comparing two builds).
   Seeds replay the same games as long as index.html has not changed. */
const fs=require('fs'),path=require('path');
let pw;try{pw=require('playwright')}catch(e){pw=require('/opt/node22/lib/node_modules/playwright')}
const here=__dirname,repo=path.resolve(here,'..','..');
const argv=process.argv.slice(2),flags=argv.filter(a=>a.startsWith('--')),noComm=flags.includes('--no-comm');
const rv=(flags.find(a=>a.startsWith('--rivals='))||'').split('=')[1]||'',rvCount=+((flags.find(a=>a.startsWith('--rival-count='))||'').split('=')[1]||3);
const [outArg,sv='20',rn='10',ss='1',rs='101',page]=argv.filter(a=>!a.startsWith('--'));
if(!outArg)throw new Error('Usage: node tools/qa/run-sims.js <folder outside the repo> [survive] [random] [surviveSeed] [randomSeed] [page]');
const out=path.resolve(outArg);
if((out+path.sep).startsWith(repo+path.sep))throw new Error('The output folder must be outside the repo (the test copy must not be committed).');
fs.mkdirSync(out,{recursive:true});

const marker='  if(!load())fresh();';
let src=fs.readFileSync(page?path.resolve(page):path.join(repo,'index.html'),'utf8');
if(src.split(marker).length!==2)throw new Error('Expected the line "'+marker+'" exactly once in index.html.');
/* the internals sim.js uses (search sim.js for "G." to see them) */
const hook='  window.__G={get S(){return S},set S(v){S=v},get loc(){return loc},get view(){return view},CONFIG:CONFIG,fresh:fresh,enter:enter,render:function(){render()},'+
  'worth:worth,score:score,CAREERS:CAREERS,TRACKS:TRACKS,HOUSE:HOUSE,lvl:lvl,meets:meets,kreq:kreq,payIdx:payIdx,effort:effort,M:M,G:G,'+
  'hasDress:hasDress,price:price,qualFee:qualFee,lesCount:lesCount,lesHours:lesHours,inProgress:inProgress,expShort:expShort,'+
  'shutLeft:shutLeft,myJob:myJob,dist:dist,homeFee:homeFee,maxDays:maxDays,rivalWorth:rivalWorth};';
src=src.replace(marker,hook+'\n'+marker);
const cfg=`<script>window.__QA={survive:${+sv},random:${+rn},surviveSeed:${+ss},randomSeed:${+rs},noComm:${noComm},rivals:${JSON.stringify(rv)},rivalCount:${rvCount}};</script><script src="sim.js"></script>`;
const at=src.lastIndexOf('</body>');src=src.slice(0,at)+cfg+'\n'+src.slice(at);
fs.writeFileSync(path.join(out,'index.html'),src);
fs.copyFileSync(path.join(here,'sim.js'),path.join(out,'sim.js'));

(async()=>{
  const br=await pw.chromium.launch(),pg=await br.newPage(),errs=[];
  pg.on('pageerror',e=>errs.push(String(e.message||e)));
  await pg.route(/^https?:\/\//,r=>r.abort());  /* no network */
  await pg.goto('file://'+path.join(out,'index.html'));
  await pg.waitForFunction(()=>window.__QA_RESULTS,null,{timeout:1800000,polling:1000});
  const res=await pg.evaluate(()=>window.__QA_RESULTS);
  fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(res,null,1));
  console.log(`${res.length} games (survive ${sv} from seed ${ss}, random ${rn} from seed ${rs}${noComm?', --no-comm':''}${rv?', rivals '+rv+' x'+rvCount:''}); page errors: ${errs.length?errs.join(' | '):'none'}`);
  res.forEach(r=>console.log(r.mode,r.seed,'day',r.lastDay,r.ending,'$'+r.netWorth,r.rank,r.job,r.vitals,JSON.stringify(r.morale||{}),Object.keys(r.issues).map(k=>k+(r.issues[k]>1?' x'+r.issues[k]:'')).join('; ')));
  console.log('Results in '+path.join(out,'results.json'));
  await br.close();
})().catch(e=>{console.error(e);process.exit(1)});
