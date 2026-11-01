/* Focused desktop/phone checks for daily indicators and the illustrated app shell. */
const fs=require('fs'),path=require('path'),assert=require('assert');
const pw=require('playwright');
const out=path.resolve(process.argv[2]);fs.mkdirSync(out,{recursive:true});
let src=fs.readFileSync(path.resolve(__dirname,'../../index.html'),'utf8');
const marker='  if(!load())fresh();';
src=src.replace(marker,'  window.__D={get S(){return S},render,enter,checkWin,CONFIG,TIERS,TRACKS,makeRivals,lvl,moneyBrief,quietCard,get loc(){return loc},set loc(x){loc=x},set view(x){view=x}};\n'+marker);
fs.writeFileSync(path.join(out,'index.html'),src);
(async()=>{const browser=await pw.chromium.launch(process.env.DG_BROWSER_CHANNEL?{channel:process.env.DG_BROWSER_CHANNEL}:{});const results=[];
try{for(const width of [1280,390]){const pg=await browser.newPage({viewport:{width,height:844}}),errors=[];pg.on('pageerror',e=>errors.push(e.message));await pg.route(/^https?:\/\//,r=>r.abort());await pg.goto(require('url').pathToFileURL(path.join(out,'index.html')).href);await pg.click('#welcomeGo');
const checks=await pg.evaluate(()=>{
const T=__D,s=T.S,r=[];function ok(v,msg){if(!v)throw Error(msg);r.push(msg)}
['mnGo','gpGo','cpGo'].forEach(id=>document.getElementById(id)?.click());
s.items.phone=1;s.workMin=180;s.studyMin=120;s.fed=true;s.ap=479;s.cash=900;s.career={fast:0};s.shut.fast=2;s.edu.fin=T.TRACKS.fin.c[0];T.loc='apt';T.view=null;T.render();
ok(document.getElementById('dailyProgress').textContent.includes('Eaten today')&&document.getElementById('dailyProgress').textContent.includes('3h')&&document.getElementById('dailyProgress').textContent.includes('2h'),'meal/work/study indicators');
ok(document.getElementById('appTime').className==='time-warning','under eight hours is orange');s.ap=179;T.render();ok(document.getElementById('appTime').className==='time-urgent','under three hours is red');
const dark=+document.documentElement.style.getPropertyValue('--day-shade');s.ap=1440;T.render();ok(dark>0&&+document.documentElement.style.getPropertyValue('--day-shade')===0,'dimming resets in the morning');
ok(document.querySelector('.tile[data-loc=apt] .tags').textContent.includes('You are here')&&document.querySelector('.tile[data-loc=apt] .tags').textContent.includes('apartment'),'current location and apartment markers');ok(document.querySelector('.tile[data-loc=fast]').classList.contains('work-closed'),'closed workplace marker');
s.home='bung';T.render();ok(document.querySelector('.tile[data-loc=bung] .tags').textContent.includes('bungalow'),'bungalow marker');s.home='apt';
document.querySelector('[data-dg-screen=life]').click();ok(document.querySelectorAll('.education-paths>span').length===Object.keys(T.TRACKS).length&&document.querySelector('.education-paths').textContent.includes('Certificate'),'highest completed qualification for every pathway');
ok(!document.querySelector('#lifeShortcuts [data-dg-device]'),'phone removed from Life shortcuts');
T.loc='fast';T.view=null;T.render();ok(document.getElementById('hudEnd').textContent==='Bunk outside','outside sleep label');
document.querySelector('[data-dg-screen=town]').click();ok(!document.getElementById('townDevice').disabled,'phone visible and enabled on map');document.getElementById('townDevice').click();ok(document.body.dataset.building==='phone','map phone button opens apps');
T.view=null;T.loc='apt';s.mode='rivals';s.rivals=T.makeRivals(3,'medium',1000);T.render();document.querySelector('[data-dg-screen=rivals]').click();ok(document.querySelectorAll('.rival-chart').length===4&&[...document.querySelectorAll('.rival-chart')].every(c=>c.getBoundingClientRect().height>0),'all characters have visible wealth/career charts');ok(!/NaN|undefined/.test(document.getElementById('rivList').textContent),'chart text is valid');
s.mode='single';s.rivals=[];s.tier=-1;s.bank=0;for(const tier of T.TIERS){s.cash=tier.v;T.checkWin();ok(!s.over&&!document.getElementById('over').classList.contains('show'),tier.n+' continues without checkpoint modal')}
ok(!T.moneyBrief(0,0).some(x=>x.t.includes('Best expected return')),'morning omits repeated market briefing');
s.mode='rivals';s.rivals=T.makeRivals(3,'medium',1000);document.querySelector('[data-dg-screen=today]').click();s.cash=900;s.tier=0;s.fed=false;T.render();document.getElementById('toasts').innerHTML='';
const teal=getComputedStyle(document.documentElement).getPropertyValue('--teal').trim();const probe=document.createElement('span');probe.style.background=teal;document.body.appendChild(probe);const rgb=getComputedStyle(probe).backgroundColor;probe.remove();
const bad=[...document.querySelectorAll('button:not(.tile):not(:disabled)')].filter(b=>b.getBoundingClientRect().width&&b.getBoundingClientRect().height&&getComputedStyle(b).backgroundColor!==rgb).map(b=>b.textContent.trim());ok(!bad.length,'all visible enabled buttons use teal: '+bad.join(', '));
const activity=document.getElementById('dailyProgress').getBoundingClientRect(),status=document.querySelector('.app-status').getBoundingClientRect();ok(activity.top>=status.bottom-1,'daily indicators do not overlap time/cash');ok(document.documentElement.scrollWidth<=innerWidth,'no horizontal page overflow');return r;
});
for(const screen of ['today','town','life','rivals']){await pg.click('[data-dg-screen="'+screen+'"]');await pg.screenshot({path:path.join(out,width+'-'+screen+'.png')});}
assert.deepStrictEqual(errors,[]);results.push({width,checks,errors});console.log(width+'px: '+checks.length+' focused checks passed');await pg.close();}
fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
