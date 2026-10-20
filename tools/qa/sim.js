/* Daily Grind simulation runs (QA). Loaded only into the throwaway test copy that run-sims.ps1 builds.
   Needs the test hook (window.__G) that run-sims.ps1 injects before the line "  if(!load())fresh();".

   Two players, both driven by real clicks on the page (tiles, #shop buttons, #hudEnd, event buttons, pop-ups):
     survive : eats every day (cooks meal prep two meals at a time), buys the outfit the job needs as soon as
               clothes run out (withdrawing savings if needed), studies towards the best-paid job reachable in the
               days left, avoids study and work burnout, switches jobs when the workplace closes, declines risky offers.
     random  : random buildings, buttons, preview answers and event choices.
   Each run is seeded (game and player use separate seeded generators), so a seed always replays the same game
   as long as index.html has not changed.

   After every click it checks: no script error, vitals 0-100, no NaN, bank and clothes not negative, fridge within
   capacity, at most one job, and that the log line's numbers (energy, happiness, health, knowledge) match the real
   change. Settings come from window.__QA (written by run-sims.ps1). Results: an on-page report, the browser console,
   and a "Download JSON" button. */
(function(){
  var QA=window.__QA||{survive:20,random:10,surviveSeed:1,randomSeed:101};
  function mul(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
  var G,S,R,rep,clicks,errs=[];
  var $=function(id){return document.getElementById(id)};
  window.addEventListener('error',function(e){errs.push(String(e.message))});
  /* yield without setTimeout, so a background tab is not slowed down by timer throttling */
  function y(){return new Promise(function(r){var c=new MessageChannel();c.port1.onmessage=function(){r()};c.port2.postMessage(0)})}
  function vit(){S=G.S;return {cash:S.cash,bank:S.bank,energy:S.energy,happy:S.happy,health:S.health,know:Math.floor(S.know),ap:S.ap}}
  function note(kind,msg){var k=kind+': '+msg;rep.issues[k]=(rep.issues[k]||0)+1}

  /* ---------- checks after every click ---------- */
  function check(where){
    S=G.S;
    ['cash','bank','energy','happy','health','know','ap','px','wage','rate','mkt','medDebt'].forEach(function(k){if(typeof S[k]!=='number'||!isFinite(S[k]))note('INVARIANT',k+' is '+S[k]+' after '+where)});
    ['energy','happy','health','know'].forEach(function(k){if(S[k]<0||S[k]>100)note('INVARIANT',k+' out of 0-100 ('+S[k]+') after '+where)});
    if(S.ap<0||S.ap>1440)note('INVARIANT','time left out of range ('+S.ap+') after '+where);
    if(S.bank<0)note('INVARIANT','bank negative after '+where);
    var cap=G.CONFIG.food.fridgeSpace,inF=S.food.filter(function(p){return p.f}).length;
    if(inF>cap)note('INVARIANT','fridge over capacity ('+inF+'/'+cap+')');
    if(S.food.some(function(p){return p.sp&&p.f}))note('INVARIANT','spoiled food in the fridge');
    if(S.chips>G.CONFIG.food.chips.maxStored)note('INVARIANT','more chips than allowed at home');
    ['casual','smart','suit'].forEach(function(k){if(S.clothes[k]<0)note('INVARIANT','clothes negative')});
    if(!isFinite(G.worth()))note('INVARIANT','net worth not finite');
    Object.keys(S.inv).forEach(function(k){if(!isFinite(S.inv[k].v)||S.inv[k].v<0)note('INVARIANT','investment '+k+' has a bad value '+S.inv[k].v)});
    if(Object.keys(S.career).length>1)note('INVARIANT','more than one job held');
  }
  function parse(t){var o={},m;t=String(t).replace(/−/g,'-');
    if(m=/([+-]\d+)% energy/.exec(t))o.energy=+m[1];if(m=/([+-]\d+) happiness/.exec(t))o.happy=+m[1];
    if(m=/([+-]\d+) health/.exec(t))o.health=+m[1];if(m=/([+-]\d+) knowledge/.exec(t))o.know=+m[1];return o}
  /* click a real element, then compare the new log lines with what really changed */
  async function click(el,label){
    if(!el||el.disabled)return false;
    S=G.S;var nl=S.logs.length,v0=vit(),day0=S.day;
    el.click();await y();clicks++;
    S=G.S;check(label);
    /* skip walking, bedtime (it describes tomorrow) and pop-ups */
    if(S.day===day0&&!S.over&&!/^(walk|hudEnd|rest|popup|leave)/.test(label)){
      var v1=vit(),lines=S.logs.slice(0,S.logs.length-nl).map(function(x){return x[0]});
      var said={};lines.forEach(function(l){if(/Milestone|You walked|Welcome back|Difficulty/.test(l))return;var p=parse(l);Object.keys(p).forEach(function(k){said[k]=(said[k]||0)+p[k]})});
      /* an event's chips may list the same vital twice (outcome + twist); only the first is parsed, so events are checked on cash/vitals in the chips test instead */
      if(!/^event/.test(label))Object.keys(said).forEach(function(k){var d=v1[k]-v0[k];if(said[k]!==d)note('TEXT≠EFFECT',label.replace(/:.*/,'')+' says '+k+' '+said[k]+' but it changed '+d)});
    }
    return true;
  }
  function btn(act,arg){var q='#shop [data-act="'+act+'"]'+(arg!=null?'[data-arg="'+arg+'"]':'');var b=document.querySelector(q);return b&&!b.disabled?b:null}
  async function go(l){if(G.view===l&&G.loc===l)return true;await click(document.querySelector('.tile[data-loc="'+l+'"]'),'walk:'+l);return G.loc===l&&G.view===l}
  async function popups(mode){
    for(var i=0;i<12;i++){
      var o=document.querySelector('.over.show');if(!o)return;
      var id=o.id,b=null;
      if(id==='pvpop')b=$(mode==='random'&&R()<0.3?'pvNo':'pvGo');
      else if(id==='morning')b=$('mnGo');else if(id==='goalpop')b=$('gpGo');
      else if(id==='certpop')b=(mode==='survive'&&!$('cpNext').hidden&&!$('cpNext').disabled&&wantNext())?$('cpNext'):$('cpGo');
      else if(id==='over'){if(!$('keep').hidden)b=$('keep');else return}  /* keep playing after a milestone, stop at game over */
      else if(id==='rules')b=$('rulesClose');else if(id==='welcome')b=$('welcomeGo');
      if(!b){o.classList.remove('show');note('UI','pop-up '+id+' had no button to close it');continue}
      await click(b,'popup:'+id);
    }
  }
  /* ---------- the night's event cards ---------- */
  async function night(mode){
    for(var i=0;i<14&&!$('evwrap').hidden;i++){
      var bs=[].slice.call(document.querySelectorAll('#event [data-act]:not(:disabled)'));
      if(!bs.length){note('STUCK','event card with no enabled button: '+(G.S.pending&&G.S.pending.ev.title));break}
      var c=bs.filter(function(x){return x.dataset.act==='cont'})[0],pick;
      if(c)pick=c;
      else if(mode==='random')pick=bs[Math.floor(R()*bs.length)];
      else{var ev=G.S.pending.ev;  /* careful: repair broken things, decline stories and risky offers */
        if(ev.rep)pick=bs.filter(function(x){return x.dataset.act==='evyes'})[0]||bs[0];
        else if(ev.story)pick=bs[bs.length-1];
        else pick=bs.filter(function(x){return x.dataset.act==='evno'})[0]||bs[0]}
      await click(pick,'event:'+pick.dataset.act);
    }
    if(!$('evwrap').hidden)note('STUCK','event card never closed');
  }
  async function endDay(mode){
    var d0=G.S.day;
    if(G.loc===G.S.home){await go(G.S.home);var r=btn('rest');if(r&&R()<0.5)await click(r,'rest');else await click($('hudEnd'),'hudEnd')}
    else await click($('hudEnd'),'hudEnd');
    await night(mode);await popups(mode);
    if(!G.S.over&&G.S.day===d0)note('STUCK','day did not advance');
  }

  /* ---------- random player ---------- */
  async function randomDay(){
    var n=0;
    while(!G.S.over&&n++<25){
      await popups('random');if(G.S.over)return;
      if(R()<0.07)break;
      if(!G.view||R()<0.25){var tiles=document.querySelectorAll('.tile');await click(tiles[Math.floor(R()*tiles.length)],'walk');continue}
      var bs=[].slice.call(document.querySelectorAll('#shop [data-act]:not(:disabled)')).filter(function(b){return b.dataset.act!=='rest'});
      if(!bs.length){await click($('hudLeave'),'leave');continue}
      var b=bs[Math.floor(R()*bs.length)];
      await click(b,'btn:'+b.dataset.act+':'+(b.dataset.arg||''));
    }
    await popups('random');
    if(!G.S.over)await endDay('random');
  }

  /* ---------- careful player ---------- */
  var target=null;
  function lvl(t){return G.lvl(t)}
  function studyHoursLeft(rk){var h=0;(rk.q||[]).forEach(function(q){var t=q[0],T=G.TRACKS[t],n=G.S.edu[t],end=T.c[q[1]-1];for(var m=n;m<end;m++)h+=G.lesCount(t,m)*G.lesHours(t,m)});return h}
  function feeLeft(rk){var f=0;(rk.q||[]).forEach(function(q){var t=q[0],T=G.TRACKS[t];for(var l=lvl(t);l<q[1];l++)f+=G.qualFee(t,T.c[l-1]||0)});return f}
  function allRanks(){var a=[];Object.keys(G.CAREERS).forEach(function(c){G.CAREERS[c].ranks.forEach(function(rk,i){a.push({c:c,i:i,rk:rk,b:G.CAREERS[c].b||c})})});return a}
  /* qualifications aim at the job worth the most over the days still left: pay x days it could be worked */
  function pickTarget(){
    S=G.S;var daysLeft=G.CONFIG.time.gameDays-S.day+1,best=null;
    allRanks().forEach(function(o){
      var h=studyHoursLeft(o.rk);if(h>daysLeft*4.5)return;  /* about 4.5h of lessons a day stays under the burnout line */
      if(G.kreq(o.rk)>Math.floor(S.know)+h*0.9+6)return;
      var workDays=Math.max(0,daysLeft-Math.ceil(h/4.5)-1),v=o.rk.pay*G.payIdx()*workDays;
      if(!best||v>best.v)best={o:o,v:v};
    });
    target=best&&best.o;return target;
  }
  function wantNext(){var c=G.S.cert;if(!target||!c)return false;return (target.rk.q||[]).some(function(q){return q[0]===c.t&&lvl(c.t)<q[1]})}
  function curJob(){return G.myJob()}
  /* jobs you can get now that beat the current one; a closed workplace counts as no job; the target's workplace earns a bonus (experience) */
  function jobsWanted(){
    var j=curJob(),cp=j?(G.shutLeft(j.b)>=2?0:j.rk.pay):0,out=[];
    allRanks().forEach(function(o){
      if(j&&o.c===j.c&&o.i<=G.S.career[o.c])return;
      if(!G.meets(o.rk)||G.kreq(o.rk)>Math.floor(G.S.know))return;
      if(G.S.closed[o.c+'_'+o.i]||G.shutLeft(o.b)>0||G.expShort(o.c,o.rk))return;
      var gain=o.rk.pay-cp;if(target&&o.b===target.b&&G.expShort(target.c,target.rk))gain+=25;
      if(gain>0)out.push({o:o,g:gain});
    });
    return out.sort(function(a,b){return b.g-a.g}).map(function(x){return x.o});
  }
  async function withdraw(n){if(G.S.bank<=0||!(await go('bank')))return;var a=$('amt');if(a){a.value=String(Math.ceil(n));await click(btn('wd',''),'wd')}}
  /* clothes are always bought the moment the outfit the job needs has run out */
  async function ensureClothes(){
    var j=curJob(),nx=jobsWanted()[0],order=['casual','smart','suit'];
    var want=[j&&j.rk.dress,nx&&nx.rk.dress].filter(Boolean).sort(function(a,b){return order.indexOf(b)-order.indexOf(a)})[0]||'casual';
    if(G.hasDress(want))return;
    var p=G.price(want);
    if(G.S.cash<p)await withdraw(p-G.S.cash+20);
    if(G.S.cash<p){note('SURVIVAL','clothes ran out and new ones were unaffordable (day '+G.S.day+')');return}
    if(await go('mall'))await click(btn('cbuy',want),'cbuy:'+want);
  }
  function fresh(list,type){return list.filter(function(p){return !p.sp&&(!type||p.t===type)})}
  /* eat every day: cooked meal (warm, else reheated or cold), else a ready-to-eat meal, else buy and cook meal prep (two at a time), else fast food */
  async function ensureFed(){
    S=G.S;if(S.fed)return;
    var FD=G.CONFIG.food;
    if(fresh(S.food,'cook').length&&await go(S.home)){var eb=btn('eatc','')||btn('eatc','heat')||btn('eatc','cold');if(eb)await click(eb,'eatc:'+eb.dataset.arg)}if(G.S.fed)return;
    if(fresh(G.S.food,'prem').length&&await go(G.S.home))await click(btn('eatp',''),'eatp');if(G.S.fed)return;
    if(!fresh(G.S.food,'basic').length&&G.S.cash>=G.G(FD.basic.cost)&&await go('market')){
      var bb=btn('bundle','basic');
      if(bb&&G.S.cash>=G.G(FD.basic.cost)*3+60)await click(bb,'bundle:basic');else await click(btn('groc','basic'),'groc:basic');
    }
    if(fresh(G.S.food,'basic').length&&await go(G.S.home)){
      var n=Math.min(fresh(G.S.food,'basic').length,2);  /* without a fridge a cooked meal keeps today and the next two days */
      var cb=btn('cook',String(n))||btn('cook','1');if(cb)await click(cb,'cook:'+cb.dataset.arg);
      await click(btn('eatc',''),'eatc');
    }
    if(!G.S.fed&&G.S.cash>=G.G(15)&&await go('fast'))await click(btn('treat','meal')||btn('treat','snack'),'treat');
    if(!G.S.fed)note('SURVIVAL','could not eat on day '+G.S.day+' (cash '+G.S.cash+', time left '+G.S.ap+'m)');
  }
  async function handleSick(){
    if(!G.S.ill)return;
    if(!G.S.hosp&&await go('hosp'))await click(btn('treat_ill',''),'treat_ill');
    if(G.S.ill&&await go(G.S.home)){var nb=btn('nap','');if(nb&&G.S.ap>720)await click(nb,'nap')}
  }
  function walkHome(){return G.dist(G.loc,G.S.home)*G.CONFIG.time.walkMinutes}
  function reserve(){return 300+walkHome()+15}  /* keep about 5h for sleep, plus the walk home */
  async function studyStep(){
    if(!target)return;
    var need=(target.rk.q||[]).filter(function(q){return lvl(q[0])<q[1]}).sort(function(a,b){return lvl(a[0])-lvl(b[0])});
    if(!need.length)return;
    var t=null;need.forEach(function(q){if(!t&&G.inProgress(q[0]))t=q[0]});
    if(!t){
      if(G.S.expelled>0)return;
      t=need[0][0];var fee=G.qualFee(t,G.S.edu[t]),keep=G.HOUSE[G.S.home].rent+80;
      if(G.S.cash-fee<keep){if(G.S.bank+G.S.cash-fee<keep)return;await withdraw(keep+fee-G.S.cash);if(G.S.cash-fee<keep)return}
      if(!(await go('school')))return;await click(btn('enrol',t),'enrol:'+t);
    }
    if(!G.inProgress(t))return;
    for(var k=0;k<3;k++){
      var h=G.lesHours(t,G.S.edu[t])*60;
      if(G.S.studyMin+h>G.CONFIG.burnout.studyMinutes||G.S.energy<25||G.S.ap-h<reserve())break;
      if(!(await go('school')))return;var c=btn('class',t);if(!c)break;await click(c,'class:'+t);await popups('survive');
      if(!G.inProgress(t))break;
    }
  }
  async function workStep(){
    var CB=G.CONFIG.burnout;
    for(var k=0;k<3;k++){
      var j=curJob();if(!j||G.S.ill)return;
      var ef=G.effort(j.rk.pay),m=G.M(ef.ap);
      var limit=G.S.workStreak>=CB.workDaysInARow-1?CB.workMinutes-1:G.CONFIG.time.maxWorkMinutes;  /* break a long-day streak before it burns out */
      if(G.S.workMin+m>limit||G.S.energy-ef.en<25||G.S.ap-m<reserve()||G.shutLeft(j.b)>0||!G.hasDress(j.rk.dress))return;
      if(!(await go(j.b)))return;var w=btn('work',j.c);if(!w)return;await click(w,'work:'+j.c);
    }
  }
  async function applyStep(){
    for(var tries=0;tries<3&&G.S.ap>reserve()+120;tries++){
      var o=jobsWanted()[0];if(!o||(o.rk.dress&&!G.hasDress(o.rk.dress)))return;
      if(!(await go('jobs')))return;
      var all=document.querySelector('#shop [data-act="alljobs"]');if(all&&/Show all/.test(all.textContent))await click(all,'alljobs');
      var b=btn('apply',o.c+'_'+o.i);if(!b)return;await click(b,'apply:'+o.c+'_'+o.i);
      if(G.S.career[o.c]===o.i)return;
    }
  }
  /* spare cash goes into savings (safe from muggings); keep enough for rent, food, clothes and fees */
  async function bankStep(){
    S=G.S;var rent=G.HOUSE[S.home].rent,keep=rent+150+G.price('casual')+(target?feeLeft(target.rk):0);
    if(S.cash>keep+100&&await go('bank')){var box=$('amt');if(box){box.value=String(Math.floor(G.S.cash-keep));await click(btn('dep',''),'dep')}}
    else if(S.cash<rent&&S.bank>0&&S.day%G.CONFIG.time.rentEveryDays>=G.CONFIG.time.rentEveryDays-1)await withdraw(Math.min(S.bank,rent+60));
  }
  async function surviveDay(){
    await popups('survive');if(G.S.over)return;
    var d=G.S.day;
    if(G.S.hosp&&G.S.hosp.inWard){await endDay('survive');return}
    pickTarget();
    await handleSick();
    await ensureClothes();
    await ensureFed();
    if(!G.S.items.clothes&&G.S.cash>=G.G(25)+G.HOUSE[G.S.home].rent*0.5&&await go('thrift'))await click(btn('buy','clothes'),'buy:gloves');  /* work gloves: +$15 a shift */
    await applyStep();
    await ensureClothes();
    await workStep();
    await studyStep();
    await workStep();
    await ensureFed();
    await bankStep();
    if(G.S.day===d&&!G.S.over){await go(G.S.home);await endDay('survive')}
  }

  /* ---------- one run ---------- */
  async function sim(seed,mode){
    G=window.__G;R=mul(seed*7919+13);Math.random=mul(seed);
    rep={seed:seed,mode:mode,issues:{}};clicks=0;target=null;errs.length=0;
    try{localStorage.removeItem('dailyGrind.save.v1')}catch(e){}
    G.fresh();
    await click($('welcomeGo'),'popup:start');
    var pb=$('previewBtn');
    if(mode==='survive'&&/on/.test(pb.textContent))pb.click();
    if(mode==='random'&&/off/.test(pb.textContent))pb.click();
    var guard=0,maxRank=-1,tl=[];
    while(!G.S.over&&guard++<40){
      var d=G.S.day;
      try{if(mode==='random')await randomDay();else await surviveDay()}catch(e){note('JS-ERROR',String(e&&e.message||e));break}
      maxRank=Math.max(maxRank,G.S.tier);tl.push(Math.round(G.worth()));
      if(G.S.day===d&&!G.S.over){note('STUCK','day '+d+' never ended');await click($('hudEnd'),'hudEnd');await night(mode);await popups(mode)}
    }
    errs.forEach(function(e){note('JS-ERROR',e)});
    S=G.S;var j=G.myJob(),ranks=G.CONFIG.ranks.slice().sort(function(a,b){return a.netWorth-b.netWorth});
    rep.lastDay=Math.min(S.day,G.CONFIG.time.gameDays);rep.ending=S.over?$('overTitle').textContent:'still playing';
    rep.netWorth=Math.round(G.worth());rep.rank=maxRank>=0?ranks[maxRank].name:'none';rep.job=j?j.rk.r:'none';
    rep.quals=Object.keys(S.edu).filter(function(t){return lvl(t)}).map(function(t){return G.TRACKS[t].n+' '+G.TRACKS[t].lv[lvl(t)-1]}).join(', ');
    rep.vitals='E'+S.energy+' H'+S.happy+' L'+S.health+' K'+Math.floor(S.know);rep.clicks=clicks;rep.worthByDay=tl;
    return rep;
  }

  /* ---------- run them all and show the report ---------- */
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function box(){var b=$('qaReport');if(!b){b=document.createElement('div');b.id='qaReport';b.style.cssText='position:fixed;inset:12px;z-index:99999;overflow:auto;background:#fff;color:#111;font:13px/1.4 system-ui,sans-serif;padding:14px 18px;border:3px solid #16222e;border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,.5)';document.body.appendChild(b)}return b}
  async function runAll(){
    var list=[],out=[];
    for(var i=0;i<QA.survive;i++)list.push([QA.surviveSeed+i,'survive']);
    for(var k=0;k<QA.random;k++)list.push([QA.randomSeed+k,'random']);
    var t0=Date.now();
    for(var n=0;n<list.length;n++){
      box().innerHTML='<h2 style="margin:0 0 6px">Daily Grind simulation runs</h2>Running '+(n+1)+' of '+list.length+' ('+list[n][1]+', seed '+list[n][0]+')…';
      out.push(await sim(list[n][0],list[n][1]));
    }
    window.__QA_RESULTS=out;
    console.log('Daily Grind simulation results',out);
    report(out,Date.now()-t0);
  }
  function report(out,ms){
    var agg={};out.forEach(function(r){Object.keys(r.issues).forEach(function(k){agg[k]=(agg[k]||0)+r.issues[k]})});
    var bugs=Object.keys(agg).filter(function(k){return /^(JS-ERROR|INVARIANT|STUCK|TEXT≠EFFECT|UI)/.test(k)});
    var summ=function(m){var rs=out.filter(function(r){return r.mode===m});if(!rs.length)return '';var ends={};rs.forEach(function(r){ends[r.ending]=(ends[r.ending]||0)+1});
      return '<li><b>'+m+'</b> ('+rs.length+' runs): '+Object.keys(ends).map(function(e){return esc(e)+' ×'+ends[e]}).join(', ')+'; reached the last day: '+rs.filter(function(r){return r.lastDay>=__G.CONFIG.time.gameDays}).length+'</li>'};
    var h='<h2 style="margin:0 0 6px">Daily Grind simulation runs</h2><p>'+out.length+' runs in '+Math.round(ms/1000)+'s. '+
      (bugs.length?'<b style="color:#b00">'+bugs.length+' kind(s) of problem found</b> (see below).':'<b style="color:#1a7f3c">No script errors, broken invariants, stuck days or log/effect mismatches.</b>')+'</p><ul>'+summ('survive')+summ('random')+'</ul>'+
      '<p><button id="qaJson">Download JSON</button> <button id="qaClose">Close report</button></p>'+
      '<table style="border-collapse:collapse;width:100%"><tr>'+['Mode','Seed','Last day','Ending','Net worth','Best rank','Job','Qualifications','Vitals','Clicks','Notes'].map(function(x){return '<th style="text-align:left;border-bottom:2px solid #333;padding:3px 6px">'+x+'</th>'}).join('')+'</tr>'+
      out.map(function(r){return '<tr>'+[r.mode,r.seed,r.lastDay,r.ending,'$'+r.netWorth.toLocaleString(),r.rank,r.job,r.quals||'none',r.vitals,r.clicks,Object.keys(r.issues).map(function(k){return k+(r.issues[k]>1?' ×'+r.issues[k]:'')}).join('; ')].map(function(x){return '<td style="border-bottom:1px solid #ddd;padding:3px 6px;vertical-align:top">'+esc(x)+'</td>'}).join('')+'</tr>'}).join('')+'</table>'+
      (Object.keys(agg).length?'<h3>All notes</h3><ul>'+Object.keys(agg).map(function(k){return '<li>'+esc(k)+' ×'+agg[k]+'</li>'}).join('')+'</ul>':'')+
      '<p style="color:#555">SURVIVAL notes are the careful player failing to eat or buy clothes (a balance signal, not a code bug). Seeds replay the same game while index.html is unchanged.</p>';
    box().innerHTML=h;
    $('qaClose').onclick=function(){box().remove()};
    $('qaJson').onclick=function(){var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(out,null,1)],{type:'application/json'}));a.download='dailygrind-sim-results.json';a.click()};
  }
  window.__sim=sim;window.__runAll=runAll;
  window.addEventListener('load',function(){if(QA.autorun!==false)setTimeout(runAll,300)});
})();
