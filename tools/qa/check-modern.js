/* Modern pathways, jobs and ways to earn (CHANGELOG 105): the four new pathways enrol and complete, older saves pick them
   up, every new role can be applied for once qualified, and gig delivery, tutoring and the creator path do what their
   rows say, through real button clicks, at desktop and phone width.
   Usage: node tools/qa/check-modern.js <folder outside the repo> */
const {outDir,openGame,PAGE_HELPERS}=require('./qa-page.js');
const out=outDir(process.argv[2],'dg-modern-check');
(async()=>{let total=0;
 for(const viewport of [{width:1280,height:800},{width:390,height:844}]){
  const {br,pg,errors}=await openGame(out,{viewport});
  try{
   await pg.addScriptTag({content:PAGE_HELPERS});
   const res=await pg.evaluate(()=>{const T=__T,done=[];
    function ok(x,msg){if(!x)throw Error(msg)}
    function test(name,fn){try{fn();done.push(name)}catch(e){throw Error(name+': '+e.message)}}
    function start(mode){QA.seed(21);QA.newGame(mode||'single');T.ev("S.cash=3000;S.energy=100;S.happy=80;S.health=80;S.fed=true;S.clothes.casual=9;S.clothes.smart=9;S.clothes.suit=9;S.items.phone=1;localStorage.setItem('dailyGrind.preview','0')")}
    function go(l){T.ev("S.morning=null;S.goalPop=null;S.cert=null;loc='"+l+"';view='"+l+"';render()")}
    function app(k){T.ev("S.morning=null;loc=S.home;appFrom='phone';view='"+k+"';render()")}
    function click(act,arg){const b=document.querySelector('#shop [data-act="'+act+'"]'+(arg!=null?'[data-arg="'+arg+'"]':''));ok(b,'no '+act+' button');ok(!b.disabled,act+' button is disabled');b.click();const g=document.getElementById('pvGo');if(g&&g.offsetParent)g.click()}
    const NEW={data:'Data & AI',media:'Creative Media',green:'Green Energy',logi:'Logistics'};
    const ROLES=['Data Analyst','Data Scientist','UX Designer','Machine Learning Lead','Fraud Analyst','Content Assistant','Social Media Manager','Brand Director','Solar Installer','EV Charging Technician','Energy Systems Engineer','Sustainability Manager','Warehouse Picker','Dispatch Coordinator','Supply Chain Planner','Regional Logistics Manager'];
    test('the School lists the four new pathways and each one enrols and finishes a module by clicks',()=>{
      Object.keys(NEW).forEach(t=>{start();go('school');ok(document.getElementById('shop').textContent.indexOf(NEW[t])>=0,NEW[t]+' is not on the School screen');
        const cash=T.ev("S.cash");click('enrol',t);ok(T.ev("S.cash")<cash,'enrolling in '+NEW[t]+' cost nothing');ok(T.ev("inProgress('"+t+"')"),NEW[t]+' did not start');
        for(let i=0;i<6&&T.ev("S.edu."+t)<1;i++){T.ev("S.ap=1440;S.energy=100;S.studyMin=0;S.workMin=0");go('school');click('class',t)}
        ok(T.ev("S.edu."+t)===1,'the first '+NEW[t]+' module did not complete')})});
    test('a save from before the new pathways loads and starts them at zero',()=>{start();T.ev("S.edu.fin=2;save()");
      const raw=JSON.parse(localStorage.getItem('dailyGrind.save.v1'));Object.keys(NEW).forEach(t=>{delete raw.S.edu[t]});delete raw.S.gig;delete raw.S.creator;delete raw.S.tutorDay;localStorage.setItem('dailyGrind.save.v1',JSON.stringify(raw));
      ok(T.ev("load()"),'the older save did not load');Object.keys(NEW).forEach(t=>ok(T.ev("S.edu."+t)===0,t+' is '+T.ev("S.edu."+t)));ok(T.ev("S.edu.fin")===2,'Finance progress was lost');
      ok(T.ev("gigState().stars")===T.ev("CONFIG.side.gig.startStars")&&T.ev("creatorState().f")===0,'gig or creator state is missing');T.ev("render()")});
    test('every new role is on the job board and can be applied for once qualified',()=>{start();
      T.ev("Object.keys(S.edu).forEach(function(t){S.edu[t]=totMods(t)});S.know=100;S.shiftsAt={};['factory','market','mall','bank','elec'].forEach(function(b){S.shiftsAt[b]=99});S.closed={};jobsAll=true");
      ROLES.forEach(r=>{const id=T.ev("(function(){var o='';Object.keys(CAREERS).forEach(function(c){CAREERS[c].ranks.forEach(function(rk,i){if(rk.r==='"+r+"')o=c+'_'+i})});return o})()");ok(id,r+' is not in CAREERS');
        ok(T.ev("BOARD.indexOf('"+id.split('_')[0]+"')")>=0,r+' is not on the board');const rk=T.ev("CAREERS['"+id.split('_')[0]+"'].ranks["+id.split('_')[1]+"]");ok(T.ev("meets")(rk),'fully qualified player does not meet '+r);
        T.ev("S.career={};S.ap=1440;S.energy=100;Math.random=function(){return 0.01}");T.ev("apply('"+id+"')");ok(T.ev("S.career['"+id.split('_')[0]+"']")===+id.split('_')[1],'applying for '+r+' did not give the job')});QA.seed(22)});
    test('a delivery run pays the fare, costs what its chips say and raises the rating',()=>{start();app('gigsapp');
      const g=T.ev("CONFIG.side.gig"),b=T.ev("({c:S.cash,e:S.energy,ap:S.ap,w:S.workMin||0})");T.ev("Math.random=function(){return 0.99}");click('gig');
      const a=T.ev("({c:S.cash,e:S.energy,ap:S.ap,w:S.workMin||0,st:S.gig.stars,runs:S.gig.runs})");
      ok(a.c-b.c===T.ev("sidePay(gigFare(4))"),'fare paid '+(a.c-b.c));ok(b.ap-a.ap===g.minutes,'time');ok(a.e-b.e===g.energy,'energy');ok(a.w-b.w===g.minutes,'work minutes');ok(Math.abs(a.st-4.1)<1e-9&&a.runs===1,'rating '+a.st)});
    test('a tired rider can run late: less pay and a lower rating',()=>{start();T.ev("S.energy=30;Math.random=function(){return 0}");app('gigsapp');ok(/may be late/.test(document.getElementById('shop').textContent),'no tired warning');
      const c=T.ev("S.cash");click('gig');ok(T.ev("S.gig.stars")<4,'the rating did not fall');ok(T.ev("S.cash")-c<T.ev("sidePay(gigFare(4))"),'a late run paid in full')});
    test('the gig app stops at the daily limit and needs a phone',()=>{start();T.ev("Math.random=function(){return 0.99}");const n=T.ev("CONFIG.side.gig.maxRuns");
      for(let i=0;i<n;i++){T.ev("S.energy=100");app('gigsapp');click('gig')}app('gigsapp');ok(document.querySelector('#shop [data-act="gig"]').disabled,'a run is still offered after '+n);
      T.ev("S.day++;S.ap=1440;S.workMin=0;delete S.items.phone;delete S.items.tablet;delete S.items.phoneold;delete S.items.tabletold;gigRun()");ok(T.ev("S.gig.runs")===0,'a run happened without a phone')});
    test('tutoring needs a qualification, pays by level and works once a day',()=>{start();go('school');ok(document.querySelector('#shop [data-act="tutor"]').disabled,'tutoring offered without a qualification');
      T.ev("S.edu.fin=TRACKS.fin.c[1]");go('school');const t=T.ev("CONFIG.side.tutor"),b=T.ev("({c:S.cash,e:S.energy,h:S.happy,ap:S.ap})"),want=T.ev("sidePay(CONFIG.side.tutor.pay[1])");click('tutor');
      const a=T.ev("({c:S.cash,e:S.energy,h:S.happy,ap:S.ap})");ok(a.c-b.c===want,'paid '+(a.c-b.c)+' not '+want);ok(b.ap-a.ap===t.minutes&&a.e-b.e===t.energy,'time or energy');
      ok(a.h-b.h===t.happiness-T.ev("workHap("+(-t.energy)+")"),'happiness');go('school');ok(document.querySelector('#shop [data-act="tutor"]').disabled,'a second session the same day')});
    test('posting gains followers, more with Creative Media, and sponsors pay overnight',()=>{start();T.ev("Math.random=function(){return 0.5}");app('creatorapp');click('post');const f1=T.ev("S.creator.f");
      const c=T.ev("CONFIG.side.creator");ok(f1===Math.round((c.gain[0]+0.5*(c.gain[1]-c.gain[0]))),'followers '+f1);
      T.ev("S.edu.media=TRACKS.media.c[1];S.energy=100");app('creatorapp');click('post');ok(T.ev("S.creator.f")-f1===Math.round(f1*(1+2*c.mediaBonus)),'Creative Media Degree did not double growth');
      app('creatorapp');ok(document.querySelector('#shop [data-act="post"]').disabled,'a third post was offered');
      T.ev("S.creator.f=1000;S.creator.last=S.day;S.sagaNext=0;S.indNext=0;S.bigCool=9");QA.seed(8);const cash=T.ev("S.cash");T.ev("S.notes=[]");QA.night();
      const m=QA.morning();ok(m&&m.rows.some(r=>/Sponsors paid/.test(r.all)),'no sponsor line in the morning');ok(T.ev("S.creator.earned")>0,'sponsors paid nothing');ok(T.ev("S.creator.f")===1000,'followers were lost although you posted');QA.closeMorning();
      T.ev("S.fed=true");QA.night();ok(T.ev("S.creator.f")===1000-Math.round(1000*c.decay),'a day without a post did not lose followers');QA.closeMorning()});
    test('a single game without followers draws no extra dice at night',()=>{start();let n=0;const r=Math.random;T.ev("S.creator.f=0");T.ev("creatorTick()");Math.random=function(){n++;return 0.5};T.ev("creatorTick()");Math.random=r;ok(n===0,'creatorTick rolled dice with no followers')});
    test('a rival whose workplace is closed does delivery runs',()=>{start('rivals');T.ev("var r=S.rivals[0];r.job={c:'fast',i:0};r.shut=2;r.cash=500;r.clothes.casual=5;r.energy=90;var c0=r.cash;rivalDay(r);window.__g=[r.gigs||0,r.cash,c0]");ok(window.__g[0]>0,'no gig runs recorded')});
    test('the phone lists both new apps and the screens fit',()=>{start();T.ev("loc=S.home;appFrom='phone';view='phone';render()");const t=document.getElementById('shop').textContent;ok(/Gigs app/.test(t)&&/Creator app/.test(t),'apps missing from the phone');
      ['gigsapp','creatorapp'].forEach(k=>{app(k);ok(document.documentElement.scrollWidth<=window.innerWidth+1,k+' scrolls sideways');ok(!/NaN|undefined/.test(document.getElementById('shop').textContent),k+' shows NaN or undefined')});
      go('school');ok(document.documentElement.scrollWidth<=window.innerWidth+1,'the School scrolls sideways')});
    return done});
   if(errors.length)throw Error('Script errors: '+errors.join(' | '));
   console.log(viewport.width+'px: '+res.length+' modern-content checks passed');res.forEach(x=>console.log('PASS '+x));total+=res.length;
  }finally{await br.close()}
 }
 console.log(total+' modern-content checks passed in all.');
})().catch(e=>{console.error(e.message||e);process.exitCode=1});
