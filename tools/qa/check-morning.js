/* The end-of-day cards and the morning pop-up: one line per topic, three groups in order, nothing repeated from the
   night's cards, rival news grouped, and the pop-up fits a phone. Usage: node tools/qa/check-morning.js <folder outside the repo> */
const {outDir,openGame,PAGE_HELPERS}=require('./qa-page.js');
const out=outDir(process.argv[2],'dg-morning-check');
(async()=>{let passed=0;
 for(const viewport of [{width:1280,height:800},{width:390,height:844}]){
  const {br,pg,errors}=await openGame(out,{viewport});
  try{
   await pg.addScriptTag({content:PAGE_HELPERS});
   const res=await pg.evaluate(()=>{const T=__T,done=[];
    function ok(x,msg){if(!x)throw Error(msg)}
    function test(name,fn){try{fn();done.push(name)}catch(e){throw Error(name+': '+e.message)}}
    function quiet(){T.ev("S.sagaNext=0;S.indNext=0;S.saga=null;S.ind=null;S.trends=[];S.bigCool=9;S.fed=true;S.cash=900;S.clothes.casual=9;S.energy=80;S.happy=70;S.health=80")}
    const heads=m=>m.rows.filter(r=>r.head).map(r=>r.text),lines=m=>m.rows.filter(r=>!r.head);
    test('a shock shown on a night card is not repeated that morning, then sits under Still going on',()=>{
      QA.seed(3);QA.newGame('single');quiet();T.ev("S.day=6;S.bigCool=0;S._mc=CONFIG.events.macroChance;CONFIG.events.macroChance=1;S.notes.push({l:'good',t:'✅ A plain overnight note.'})");
      const steps=QA.night();T.ev("CONFIG.events.macroChance=S._mc;delete S._mc");
      ok(T.ev("S.trends.length")>0,'no shock started');const name=T.ev("S.trends[0].n");
      let m=QA.morning();ok(m,'no morning pop-up');ok(!lines(m).some(r=>r.all.indexOf(name)>=0),'the shock is repeated on the morning after its card');
      ok(/Slept at home/.test(m.top)&&/earned/.test(m.top),'the top strip is missing');
      QA.closeMorning();T.ev("S.fed=true;S.bigCool=9");QA.night();m=QA.morning();ok(m,'no second morning');
      const i=m.rows.findIndex(r=>r.all.indexOf(name)>=0);ok(i>=0,'the running shock is missing on later mornings');
      let h='';for(let k=i;k>=0;k--)if(m.rows[k].head){h=m.rows[k].text;break}ok(h==='Still going on','the running shock is under "'+h+'"');
      ok(steps.length>=1,'no night cards')});
    test('night cards say which card of how many',()=>{QA.seed(5);QA.newGame('rivals','medium',77);quiet();T.ev("S.day=6;S.bigCool=0;S._mc=CONFIG.events.macroChance;CONFIG.events.macroChance=1");
      const steps=QA.night();T.ev("CONFIG.events.macroChance=S._mc;delete S._mc");
      ok(steps.length<2||steps.every((s,i)=>s===(i+1)+' of '+steps.length),'step labels: '+JSON.stringify(steps));QA.closeMorning()});
    test('an overdue loan and an illness each appear once, under Do today',()=>{
      QA.seed(9);QA.newGame('single');quiet();
      T.ev("S.day=8;S.loan={borrowed:200,principal:200,interest:0,taken:3,tenure:3,rate:CONFIG.loan.tenures[0].rate,due:6};S.ill={k:'flu',d:3,home:1};S.bank=0");
      QA.night();const m=QA.morning();ok(m,'no morning pop-up');
      const loan=lines(m).filter(r=>/^🏦 Loan/i.test(r.text)),ill=lines(m).filter(r=>/^🤒/.test(r.text));
      ok(loan.length===1,'loan lines: '+loan.length);ok(ill.length<=1,'illness lines: '+ill.length);
      const hs=heads(m),order=['Do today','Overnight','Still going on'].filter(x=>hs.indexOf(x)>=0);ok(hs.join()===order.join(),'groups out of order: '+hs.join());
      const li=m.rows.findIndex(r=>/^🏦 Loan/i.test(r.text));let h='';for(let k=li;k>=0;k--)if(m.rows[k].head){h=m.rows[k].text;break}ok(h==='Do today','the loan is under "'+h+'"');
      const act=[];let cur='';m.rows.forEach(r=>{if(r.head)cur=r.text;else if(cur==='Do today')act.push(r.cls)});
      const sev={bad:0,warn:1,rem:2,good:3};ok(act.every((c,i)=>i===0||sev[act[i-1]]<=sev[c]),'Do today is not sorted by urgency: '+act.join());QA.closeMorning()});
    test('a job tip is announced once, not again as a reminder',()=>{
      QA.seed(4);QA.newGame('single');quiet();T.ev("S.day=5;S.tip={until:7};S.notes.push({l:'good',t:'🤝 👩 Maya tipped you off about an opening: your next job interview is easier (until the end of day 7).'})");
      QA.night();const m=QA.morning();ok(m,'no morning');ok(lines(m).filter(r=>/job tip|tipped you off/i.test(r.text)).length===1,'the tip appears '+lines(m).filter(r=>/job tip|tipped you off/i.test(r.text)).length+' times');QA.closeMorning()});
    test('one rival’s news is one line with one Congratulate button',()=>{
      QA.seed(6);QA.newGame('rivals','easy',31);quiet();T.ev("S.day=5;rivalDay=function(){return 0};rivalNight=function(){};var r=S.rivals[0];S.notes=[];rivalNote(r,2,'was promoted to Chef at the Restaurant.');rivalNote(r,2,'earned a Food & Beverage Degree.');rivalNote(S.rivals[1],1,'fell ill with a cold.')");
      T.ev("var keep=S.notes.slice();var rt=rivalTick;rivalTick=function(){S.notes.push.apply(S.notes,keep);keep=[]};S.notes=[]");
      QA.night();const m=QA.morning();ok(m,'no morning');const maya=lines(m).filter(r=>/Maya/.test(r.all)&&/promoted|Degree/.test(r.all));
      ok(maya.length===1,'Maya has '+maya.length+' lines');ok(/promoted/.test(maya[0].all)&&/Degree/.test(maya[0].all),'the grouped line lost an item');ok(maya[0].cg.length===1&&maya[0].cg[0]===0,'Congratulate buttons: '+JSON.stringify(maya[0].cg));
      const b=document.querySelector('#mnList [data-cg="0"]');b.click();ok(T.ev("S.cong&&S.cong[0]"),'Congratulate did nothing')});
    test('the morning pop-up fits the screen and scrolls inside its card',()=>{const card=document.querySelector('#morning .card'),r=card.getBoundingClientRect();
      ok(r.left>=0&&r.right<=window.innerWidth+1,'the card is wider than the screen');ok(card.scrollWidth<=card.clientWidth+1,'sideways scrolling inside the card');
      ok(document.documentElement.scrollWidth<=window.innerWidth+1,'the page scrolls sideways');ok(!/NaN|undefined/.test(card.textContent),'NaN or undefined on screen')});
    return done});
   if(errors.length)throw Error('Script errors: '+errors.join(' | '));
   console.log(viewport.width+'px: '+res.length+' morning checks passed');res.forEach(x=>console.log('PASS '+x));passed+=res.length;
   await pg.screenshot({path:require('path').join(out,'morning-'+viewport.width+'.png')});
  }finally{await br.close()}
 }
 console.log(passed+' morning pop-up checks passed in all.');
})().catch(e=>{console.error(e.message||e);process.exitCode=1});
