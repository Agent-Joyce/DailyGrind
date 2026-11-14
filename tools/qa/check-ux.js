/* Phase 1 interface (CHANGELOG 107): the welcome screen, the guided first day, the compact header, button levels,
   settings, and game feel (count-ups, flashes, the day sweep), at desktop and phone width, through real clicks.
   Usage: node tools/qa/check-ux.js <folder outside the repo> */
const path=require('path'),{outDir,openGame,PAGE_HELPERS}=require('./qa-page.js');
const out=outDir(process.argv[2],'dg-ux-check');
(async()=>{let total=0;
 for(const viewport of [{width:1280,height:800},{width:390,height:844}]){
  const {br,pg,errors}=await openGame(out,{viewport}),w=viewport.width+'px: ',done=[];
  const ok=(x,m)=>{if(!x)throw Error(m)},test=async(n,f)=>{try{await f();done.push(n);console.log('PASS '+w+n)}catch(e){throw Error(w+n+': '+e.message)}};
  const ev=c=>pg.evaluate(c=>__T.ev(c),c),fresh=async()=>{await pg.evaluate(()=>{localStorage.clear();localStorage.setItem('dailyGrind.preview','0')});await pg.reload();await pg.addScriptTag({content:PAGE_HELPERS});await pg.evaluate(()=>QA.seed(5))};
  const coach=()=>pg.evaluate(()=>{const c=document.getElementById('coach');return c.hidden?'':c.innerText});
  try{
   await test('the welcome screen offers two ways to start and hides the options in a drawer',async()=>{await fresh();
     ok(await pg.isVisible('#welcomeGo')&&await pg.isVisible('#welcomeRivals')&&await pg.isVisible('#coachOn'),'start buttons or the guide box are not visible');
     ok(!(await pg.isVisible('#modes'))&&!(await pg.isVisible('[data-diff=easy]')),'the custom options are open by default');
     const r=await pg.evaluate(()=>{const c=document.querySelector('#welcome .card').getBoundingClientRect();return c.height<=innerHeight&&c.width<=innerWidth});ok(r,'the welcome card does not fit the screen');
     await pg.click('#customGame>summary');ok(await pg.isVisible('#modes')&&await pg.isVisible('[data-diff=hard]')&&await pg.isVisible('#traitBox'),'the Custom game drawer did not open')});
   await test('Play against AI rivals starts a rival game at Normal with the guide on',async()=>{await fresh();await pg.click('#welcomeRivals');
     ok(await ev("S.mode==='rivals'&&S.rivals.length===3&&S.diff==='normal'&&S.flags.diff===1"),'not a three-rival Normal game');ok(await ev("S.coach.on"),'the guide is off');ok(/step 1 of 4/i.test(await coach()),'no first step shown')});
   await test('unticking the guide starts without it; Hard from the drawer works',async()=>{await fresh();await pg.uncheck('#coachOn');await pg.click('#customGame>summary');await pg.click('[data-diff=hard]');
     ok(await ev("S.diff==='hard'&&S.mode==='single'&&!S.coach.on"),'wrong game');ok(!(await coach()),'the guide is showing')});
   await test('the guided first day: job, shift, meal, sleep, each finished by doing it',async()=>{await fresh();await pg.click('#welcomeGo');
     ok(/Get a job/.test(await coach()),'step 1 missing');const ap0=await ev("S.ap");await pg.click('#coach [data-dg-go]');ok(await ev("loc")==='jobs'&&await ev("S.ap")<ap0,'Take me there did not walk to the Employment Office');
     ok(await pg.evaluate(()=>!!document.querySelector('#shop [data-act=apply].coach-target')),'no Apply button is highlighted');
     await pg.evaluate(()=>{Math.random=()=>0.01});for(let i=0;i<40&&!(await ev("!!myJob()"));i++)await pg.evaluate(i=>{const b=[...document.querySelectorAll('#shop [data-act=apply]:not([disabled])')];if(b.length)b[i%b.length].click()},i);  /* some roles have no opening today */
     ok(await ev("!!myJob()"),'could not get a job');ok(/Work your first shift/.test(await coach()),'step 2 missing');
     await pg.evaluate(()=>{const b=document.querySelector('#coach [data-dg-go]');b&&b.click()});ok(await pg.evaluate(()=>!!document.querySelector('#shop [data-act=work].coach-target')),'the Work button is not highlighted');
     await pg.evaluate(()=>document.querySelector('#shop [data-act=work]:not([disabled])').click());ok(/Eat something/.test(await coach()),'step 3 missing');
     await pg.evaluate(()=>{const b=document.querySelector('#coach [data-dg-go]');b&&b.click()});await pg.evaluate(()=>document.querySelector('#shop [data-act=treat].coach-target').click());ok(await ev("S.fed"),'the highlighted meal did not feed you');
     ok(/Go home and sleep/.test(await coach()),'step 4 missing');await pg.evaluate(()=>{const b=document.querySelector('#coach [data-dg-go]');b&&b.click()});ok(await pg.evaluate(()=>document.getElementById('hudEnd').classList.contains('coach-target')),'Sleep is not highlighted');
     await pg.click('#hudEnd');for(let i=0;i<30&&await ev("!!S.pending");i++)await pg.evaluate(()=>{const e=__T.ev('S.pending.ev');if(!e.done){if(e.story){const b=document.querySelector('#event [data-act=evopt]:not([disabled])');b&&b.click()}else __T.ev('decide(false)')}const c=document.querySelector('#event [data-act=cont]');c&&c.click()});
     await pg.evaluate(()=>{const b=document.getElementById('mnGo');b&&b.offsetParent&&b.click()});ok(await ev("S.day")===2,'the day did not end');ok(/full day/.test(await coach()),'no closing message: '+JSON.stringify([await coach(),await ev('S.over'),await ev('!!S.pending'),await ev('!!S.morning'),await ev('!!S.cert'),await ev('!!S.goalPop')]));
     await pg.click('#coach [data-coach=done]');ok(!(await coach())&&!(await ev("S.coach.on")),'the guide did not close');ok(!errors.length,'script errors: '+errors.join(' | '))});
   await test('Skip closes the guide, and it stays closed after a reload',async()=>{await fresh();await pg.click('#welcomeGo');await pg.click('#coach [data-coach=skip]');ok(!(await coach()),'still showing');await pg.reload();ok(!(await coach())&&await ev("S.flags.diff===1"),'the guide came back after reload')});
   await test('the guide costs nothing and rolls no dice',async()=>{await fresh();await pg.click('#welcomeGo');const r=await pg.evaluate(()=>{let n=0;const m=Math.random;Math.random=()=>{n++;return .5};const a=JSON.stringify([__T.ev('S.ap'),__T.ev('S.cash'),__T.ev('S.energy')]);for(let i=0;i<5;i++)__T.ev('render()');const b=JSON.stringify([__T.ev('S.ap'),__T.ev('S.cash'),__T.ev('S.energy')]);Math.random=m;return [n,a===b]});ok(r[0]===0&&r[1],'repainting the guide changed something: '+r)});
   await test('the header is compact and nothing in it overlaps or runs off the screen',async()=>{await fresh();await pg.click('#welcomeGo');await ev("enter('market')");
     const r=await pg.evaluate(()=>{const h=document.getElementById('appTop').getBoundingClientRect(),vis=e=>e&&e.getBoundingClientRect().width>0,box=e=>e.getBoundingClientRect();
       const items=[...document.querySelectorAll('#appTop .app-status>span,#appTop .app-vitals>span,#appTop #actbar>*:not([hidden]),#appTop .daily-progress>span')].filter(vis).map(box);let clash=0;
       for(let i=0;i<items.length;i++)for(let j=i+1;j<items.length;j++){const a=items[i],b=items[j];if(a.left<b.right-1&&b.left<a.right-1&&a.top<b.bottom-1&&b.top<a.bottom-1)clash++}
       return {h:h.height,clash,off:items.filter(b=>b.right>innerWidth+1||b.left<-1).length,scroll:document.documentElement.scrollWidth>innerWidth,cash:document.getElementById('appCash').getBoundingClientRect().width>0}});
     ok(r.h<=(viewport.width<=640?100:112),'header is '+r.h+'px tall');ok(!r.clash,r.clash+' header items overlap');ok(!r.off,r.off+' header items are off the screen');ok(!r.scroll,'the page scrolls sideways');ok(r.cash,'cash is not shown')});
   await test('buttons have three levels',async()=>{await pg.waitForTimeout(400);  /* colour transitions settle */
     const r=await pg.evaluate(()=>{const bg=e=>getComputedStyle(e).backgroundColor,p=document.createElement('span');p.style.background=getComputedStyle(document.documentElement).getPropertyValue('--teal');document.body.appendChild(p);const teal=bg(p);p.remove();
       document.getElementById('hudTools').open=true;const o={main:bg(document.querySelector('#shop button.btn:not(.alt):not(:disabled)'))===teal,second:bg(document.getElementById('hudLeave'))!==teal,risky:bg(document.getElementById('resetBtn'))!==teal&&bg(document.getElementById('resetBtn'))!==bg(document.getElementById('hudLeave')),warn:bg(document.getElementById('hudEnd'))!==teal};document.getElementById('hudTools').open=false;return o});
     ok(r.main,'a main action is not teal');ok(r.second,'Back is solid teal');ok(r.risky,'Reset does not stand out');ok(r.warn,'Sleeping outside is not marked')});
   await test('settings: vibration, motion and text size are in the Controls menu and are remembered',async()=>{await pg.evaluate(()=>{document.getElementById('hudTools').open=true});
     ok(await pg.isVisible('#motionBtn')&&await pg.isVisible('#textBtn')&&await pg.isVisible('#muteBtn')&&await pg.isVisible('#resetBtn'),'a setting is missing from the menu');
     const z0=await pg.evaluate(()=>document.getElementById('center').getBoundingClientRect().width);await pg.click('#textBtn');ok(await pg.evaluate(()=>document.body.dataset.text)==='l'&&/large/.test(await pg.textContent('#textBtn')),'text size did not change');
     ok(await pg.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'larger text makes the page scroll sideways');await pg.click('#motionBtn');ok(/reduced/.test(await pg.textContent('#motionBtn')),'motion did not switch');
     await pg.reload();ok(await pg.evaluate(()=>document.body.dataset.text)==='l'&&await pg.evaluate(()=>JSON.parse(localStorage.getItem('dailyGrind.settings')).motion)==='reduce','settings were not remembered');
     await pg.evaluate(()=>{localStorage.removeItem('dailyGrind.settings')});await pg.reload()});
   await test('with motion on, cash counts up, flashes and the new day sweeps; with it reduced, numbers just change',async()=>{
     await pg.evaluate(()=>{localStorage.setItem('dailyGrind.forceMotion','1')});await pg.reload();await pg.addScriptTag({content:PAGE_HELPERS});
     await ev("S.cash=200;render()");await ev("S.cash=900;render()");const mid=await pg.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(()=>r(document.getElementById('appCash').textContent)))));
     ok(await pg.evaluate(()=>document.getElementById('appCash').parentNode.classList.contains('chg-up')),'no flash on the cash');ok(mid!=='$900','cash jumped straight to the new value: '+mid);await pg.waitForTimeout(900);ok(await pg.textContent('#appCash')==='$900','cash did not settle: '+await pg.textContent('#appCash'));
     ok(await pg.evaluate(()=>document.querySelectorAll('.coin-pop').length)>=0,'coins');await ev("S.sagaNext=0;S.indNext=0;S.bigCool=9;S.fed=true");await pg.evaluate(()=>QA.night());ok(await pg.evaluate(()=>document.getElementById('daySweep').classList.contains('run')&&/Day/.test(document.getElementById('daySweep').textContent)),'no day sweep');
     ok(await pg.evaluate(()=>getComputedStyle(document.getElementById('daySweep')).pointerEvents)==='none','the day sweep can block taps');await pg.evaluate(()=>QA.closeMorning());
     await pg.evaluate(()=>{localStorage.removeItem('dailyGrind.forceMotion')});await pg.reload();await ev("S.cash=100;render()");await ev("S.cash=700;render()");ok(await pg.textContent('#appCash')==='$700','with motion off the number is not immediate')});
   if(viewport.width<=640)await test('phone toasts sit above the navigation, not over the header or the guide',async()=>{await fresh();await pg.click('#welcomeGo');await pg.click('#coach [data-dg-go]');
     const r=await pg.evaluate(()=>{const t=document.querySelector('#toasts .toast'),c=document.getElementById('coach').getBoundingClientRect(),n=document.getElementById('appNav').getBoundingClientRect();if(!t)return null;const b=t.getBoundingClientRect();return {overGuide:b.top<c.bottom&&b.bottom>c.top,aboveNav:b.bottom<=n.top+1,pe:getComputedStyle(t).pointerEvents}});
     ok(r,'no toast appeared after walking');ok(!r.overGuide,'a toast covers the guide');ok(r.aboveNav,'a toast overlaps the navigation');ok(r.pe==='none','toasts can block taps')});
   await test('the cousins hook: tagline, Rivals tab wording and a reunion-dinner ending (CHANGELOG 108)',async()=>{await fresh();
     ok(/Beat your cousins before the reunion dinner/.test(await pg.textContent('#welcome')),'no tagline on the welcome screen');
     await pg.click('#welcomeRivals');ok(/cousins/i.test(await pg.textContent('#rivBox .gh')),'the scoreboard heading does not mention cousins');
     const t=await ev("lifeTable()");ok(/reunion dinner/i.test(t)&&/Auntie reads out Wealth/.test(t),'the ending is not the reunion dinner');
     const n=await ev("Object.keys(CONFIG.rivals.scoring.categories).filter(function(k){return CONFIG.rivals.scoring.categories[k].on}).length");
     ok((t.match(/Auntie reads out/g)||[]).length===n,'not one auntie line per scoring category');ok(/<table class="lifetab"/.test(t),'the full table is gone');
     const before=await ev("JSON.stringify([S.cash,S.day,S.rivalSeed])");await ev("lifeTable()");ok(before===await ev("JSON.stringify([S.cash,S.day,S.rivalSeed])"),'building the ending changed the game')});
   await test('pan-Asian names: places, rivals and no country-specific wording (CHANGELOG 109)',async()=>{await fresh();
     ok(await ev("['school','market','fast','resto','apt','thrift','bung'].map(function(k){return NAME[k]}).join('|')")==='City College|Fresh Market|Golden Bun|Family Restaurant|Budget Apartments|Second-Hand Shop|Garden Villa','a place has the wrong name');
     ok(await ev("CONFIG.rivals.names.join('|')")==='Linh|Arjun|Jae','rival names are wrong');
     const src=require('fs').readFileSync(path.join(__dirname,'..','..','index.html'),'utf8').replace(/hawkerauntie|kopiclub|hdbcorridor|mrtlost|hawker:function|\['hawker'/g,'');
     const bad=src.match(/hawker|kopi|\bMRT\b|\bHDB\b|Mandopop|void deck|Botanic|Burger|Supermarket|Thrift Store|Bungalow|Fast Food/g);ok(!bad,'old wording is still in index.html: '+[...new Set(bad||[])].join(', '))});
   await test('the Rivals tab lists every move on each rival, and its buttons work (CHANGELOG 110)',async()=>{await fresh();await pg.uncheck('#coachOn');await pg.click('#welcomeRivals');
     await ev("S.cash=900;S.items.phone=1;S.rel=0;S.rivals[0].rel=60;S.rivals[0].cash=900;render()");await pg.click('[data-dg-screen=rivals]');
     await pg.evaluate(()=>{document.querySelector('#rivList>details:nth-of-type(2)').open=true});
     const txt=await pg.textContent('#rivList');for(const w of ['What you can do now','Chat or say hello','Call ','for a loan','a bet','Propose a pact','Schemes against'])ok(txt.includes(w),'missing the move: '+w);
     ok(await pg.evaluate(()=>{const b=document.querySelector('#rivList .rmoves [data-rmove^="rcall"]');return !!b&&!b.disabled}),'the Call button is missing or disabled');
     const ap=await ev("S.ap");await pg.click('#rivList .rmoves [data-rmove^="rcall"]');
     ok(await ev("!!calledToday(0)")&&await ev("S.ap")<ap,'the Call button did not make a call');
     ok(await pg.evaluate(()=>document.querySelector('#rivList>details:nth-of-type(2)').open),'the card closed after pressing a button');
     ok(await pg.evaluate(()=>document.querySelector('#rivList .rmoves [data-rmove^="rcall"]').disabled),'Call is still pressable after calling today');
     const over=await pg.evaluate(()=>{const b=document.getElementById('rivBox').getBoundingClientRect();return document.documentElement.scrollWidth>innerWidth+1||b.right>innerWidth+1});ok(!over,'the move rows scroll sideways');
     await pg.click('#rivList .rmoves [data-dg-app=msgsapp]');ok(await ev("view")==='msgsapp','Open Messages did not open the Messages app');
     await ev("S.items.phone=0;S.items.tablet=0;S.items.computer=0;S.home='apt';view=null;render()");await pg.click('[data-dg-screen=rivals]');
     ok(await pg.evaluate(()=>{const d=document.querySelector('#rivList>details:nth-of-type(2)');d.open=true;const b=d.querySelector('[data-rmove^="rcall"]');return b.disabled}),'Call is pressable without a phone')});
   ok(!errors.length,'script errors: '+errors.join(' | '));
   await pg.evaluate(()=>{document.getElementById('hudTools').open=true});await pg.screenshot({path:path.join(out,'settings-'+viewport.width+'.png')});
   total+=done.length;
  }finally{await br.close()}
 }
 console.log(total+' interface checks passed in all.');
})().catch(e=>{console.error('FAIL '+(e.message||e));process.exitCode=1});
