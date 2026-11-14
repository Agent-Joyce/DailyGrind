  /* ==================================================================
     3. STATE AND SAVES
     blank() is the full shape of S. fresh() starts a game; save() and load() keep it in localStorage; finish() ends it.
     ================================================================== */
  function blank(){return {coach:{on:false,step:0},gig:{stars:CONFIG.side.gig.startStars,d:0,runs:0,total:0},tutorDay:0,creator:{f:0,d:0,posts:0,last:0,earned:0},socialEvents:[],socialN:0,socialLast:0,rivalRelations:{},fac:{},calls:null,rankDay:{},bestDay:0,newsPlan:null,loan:null,broke:0,workMin:0,loadStreak:0,lowE:[],homeless:0,sagaLast:'',sagaNext:0,ind:null,indNext:0,indId:'',macroLast:0,bankOffer:null,promo:null,comm:null,safetyUsed:0,tip:null,mode:'single',rivals:[],rivalSeed:0,indLeft:0,life:null,raced:{},jobRaces:0,enc:null,rcalled:null,cong:null,msgs:[],rloans:[],bets:[],msgN:0,asked:null,flat:null,flatSkip:0,townMood:'competitive',rep:60,pact:null,leak:null,blocked:null,rpacts:[],sabOn:[],sabMine:[],sabUsed:0,incidents:[],incN:0,rentPaidAmt:0,rcards:{},lastRCard:0,lastRace:'',deckS:[],deckM:[],deckG:[],slept:0,homeMeals:0,shut:{},food:[],chips:0,chipsDay:0,health:CONFIG.health.start,gym:[],good:[],studyMin:0,burn:0,saga:null,sagaGap:0,restHap:0,goalPop:0,arrears:null,enr:{},tickets:[],junk:[],notes:[],les:{},restBonus:0,cert:null,lastTrack:null,morning:null,rentPaid:0,trends:[],ver:SAVE_VERSION,tmin:1,tier:-1,diff:'normal',today:null,summary:null,flags:{},tut:0,day:1,ap:MAX_AP,cash:200,bank:0,energy:CONFIG.start.energy,happy:70,know:10,ill:null,hosp:null,restHrs:0,sickSleep:0,immune:0,ins:0,medDebt:0,medDays:0,medFresh:0,fed:false,hungry:0,exh:0,gloom:0,sick:0,broken:{},pawned:{},mkt:0,inv:{cry:{c:0,v:0,lock:0,seen:0,last:0,lp:0},fd:{c:0,v:0,lock:0,seen:0,last:0,lp:0},etf:{c:0,v:0,lock:0,seen:0,last:0,lp:0},hf:{c:0,v:0,lock:0,seen:0,last:0,lp:0}},sinceClass:0,studied:false,enrolled:false,expelled:0,edu:{sal:0,fnb:0,fin:0,tech:0,eng:0,med:0,cus:0,data:0,media:0,green:0,logi:0},career:{},closed:{},home:'apt',items:{},clothes:{casual:CONFIG.clothes.startCasualDays,smart:0,suit:0},offer:{},barg:{},px:1,wage:1,rate:CONFIG.market.rateBase,layoff:0,pending:null,deckN:[],deckC:[],over:false}}
  function fresh(){
    S=blank();T0();PREV=null;applyPayVar();S.certVar={};Object.keys(TRACKS).forEach(function(t){S.certVar[t]=1+(Math.random()*2-1)*CONFIG.education.certVariance});
    S.sagaNext=sagaDay();S.indNext=indDay();S.indId=INDUSTRY[Math.floor(Math.random()*INDUSTRY.length)].id;
    rollOpenings();planNews();loc='apt';view=null;last=null;
    $('log').innerHTML='';S.logs=[];
    $('over').classList.remove('show');$('welcome').classList.add('show');
    log('Day 1 begins. You rent the Budget Apartments and own '+(CONFIG.clothes.startCasualDays>0?'one set of '+WEAR.casual.n+' (good for '+CONFIG.clothes.startCasualDays+' day'+(CONFIG.clothes.startCasualDays===1?'':'s')+')':'no work clothes yet, so buy some at the Clothes Mall')+'. Rent is due at the end of day '+RENT_EVERY+'.');
    render();
  }

  function log(msg,cls){
    var d=document.createElement('div');
    d.textContent='Day '+S.day+': '+msg;
    last={msg:msg,cls:cls||''};
    if(cls==='bad'&&S.today&&S.today.hits.length<6)S.today.hits.push(msg);
    if(S.logs){S.logs.unshift([d.textContent,cls||'']);if(S.logs.length>200)S.logs.length=200}
    if(cls)d.className=cls;
    $('log').insertBefore(d,$('log').firstChild);
    $('log').scrollTop=0;
    while($('log').children.length>200)$('log').removeChild($('log').lastChild);
  }
  var SAVE_KEY='dailyGrind.save.v1';
  /* saving: SAVE_ST says whether the last write worked, so the top bar never claims progress is saved when it is not.
    'none' = this browser does not let the page store anything (checked once), 'fail' = the last write failed, 'ok' = saved at SAVE_AT */
  var SAVE_ST=(function(){try{var k=SAVE_KEY+'.test';localStorage.setItem(k,'1');localStorage.removeItem(k);return 'ok'}catch(e){return 'none'}})(),SAVE_AT=null;
  function save(){
    if(SAVE_ST==='none')return paintSave();
    try{if(S.over)localStorage.removeItem(SAVE_KEY);else localStorage.setItem(SAVE_KEY,JSON.stringify({S:S,loc:loc,view:view,last:last}));SAVE_ST='ok';SAVE_AT=new Date()}
    catch(e){SAVE_ST='fail'}
    paintSave();
  }
  function clock(d){var h=d.getHours(),m=d.getMinutes();return (h%12||12)+':'+(m<10?'0':'')+m+(h<12?' am':' pm')}
  function paintSave(){
    var el=$('saveSt');if(!el)return;
    var t=SAVE_ST==='none'?['⚠️ Save unavailable in this browser','This browser does not let the game store anything (for example a private window or blocked site data), so progress is lost when you close the page.','bad']:
      SAVE_ST==='fail'?['⚠️ Saving failed — progress may be lost',SAVE_AT?'The last successful save was at '+clock(SAVE_AT)+'. The browser refused the latest one (storage may be full or blocked).':'No save has worked yet. The browser refused to store the game (storage may be full or blocked).','bad']:
      ['💾 Saved'+(SAVE_AT?' '+clock(SAVE_AT):''),'Your progress is saved in this browser'+(SAVE_AT?' (last saved at '+clock(SAVE_AT)+')':'')+'.',''];
    el.textContent=t[0];el.title=t[1];el.className=t[2];
  }
  function clearSave(){try{localStorage.removeItem(SAVE_KEY)}catch(e){}}
  /* ---------- loading a save: migrate it, then hydrate it ----------
    SAVE_VERSION is the save format the game writes now (S.ver). Older saves are brought up to date by the
    MIGRATIONS below, run in this order on the stored data (several steps depend on the ones before them).
    Most steps are un-versioned and safe to run on any save (they only act when an old field is there).
    To change the save format: add a step at the right place in the list, keep old saves loadable, and if the
    change is version-specific, raise SAVE_VERSION and the ver value in blank(). */
  var SAVE_VERSION=8;
  var MIGRATIONS=[
    ['time left counted in minutes', function(s){if(!s.tmin){s.ap=MAX_AP;s.tmin=1}}],
    ['enrolment record (enr) from qualification progress', function(s){
      if(!s.enr){s.enr={};Object.keys(TRACKS).forEach(function(t){var n=(s.edu||{})[t]||0,ls=(s.les||{})[t]||0;if(n<TRACKS[t].c[TRACKS[t].c.length-1]&&(ls>0||(n>0&&TRACKS[t].c.indexOf(n)<0)))s.enr[t]=TRACKS[t].c.filter(function(e){return n>=e}).length})}}],
    ['v1 to v2: the Factory career renamed, Restaurant, Bank and Electronics ranks shifted up one', function(s){
      if(!(s.ver>=2)&&s.career){var cr=s.career;if(cr.jobs!=null){cr.factory=cr.jobs;delete cr.jobs}['resto','bank','elec'].forEach(function(c){if(cr[c]!=null)cr[c]++});s.ver=2}}],
    ['v2 to v3: careers that no longer exist are dropped', function(s){
      if(s.ver===2&&s.career){var cr=s.career;Object.keys(cr).forEach(function(c){if(!CAREERS[c])delete cr[c]});s.ver=3}}],
    ['kitchen: pantry and cooked lists become one food list (old food counts as fridge days used so far)', function(s){
      if(!s.food&&(s.pantry||s.cooked)){var KF=CONFIG.food.keepDaysFridge,mv=function(t,p){return p.sp?{t:t,u:KF,sp:1}:{t:t,u:Math.min(KF-1,Math.max(0,s.day-(p.w||s.day)))}};
        s.food=(s.pantry||[]).map(function(p){return mv(p.t==='prem'?'prem':'basic',p)}).concat((s.cooked||[]).map(function(c){return mv('cook',c)}))}
      delete s.pantry;delete s.cooked}],
    ['removed fields: separate work and study streaks, rest-based recovery', function(s){delete s.studyStreak;delete s.workStreak;delete s.sickRest}],
    ['one storyline a game: an old save that had one gets no more, one that had none gets a start day', function(s){
      if(s.sagaNext==null)s.sagaNext=s.saga?0:s.sagaLast?0:Math.max(s.day,sagaDay())}],
    ['storyline once a game (was: again after gapDays): a save whose storyline has ended schedules no other', function(s){
      if(s.sagaLast&&!s.saga)s.sagaNext=0}],
    ['industry-specific storylines: a game saved before them gets one, if there is still time in the window', function(s){
      if(s.indNext==null&&!s.ind){var L=CONFIG.industry,last=(s.mode==='rivals'?CONFIG.rivals.gameDays:CONFIG.time.gameDays)-L.daysBeforeEnd,d=Math.max((s.day||1)+1,indDay());
        s.indNext=d<=last&&!s.over?d:0;s.indId=INDUSTRY[Math.floor(Math.random()*INDUSTRY.length)].id}}],
    ['Pawn Shop merged into the Second-Hand Shop: a closure and work experience there move to the Second-Hand Shop', function(s){
      if(s.shut&&s.shut.pawn){s.shut.thrift=Math.max(s.shut.thrift||0,s.shut.pawn);delete s.shut.pawn}
      if(s.shiftsAt&&s.shiftsAt.pawn){s.shiftsAt.thrift=(s.shiftsAt.thrift||0)+s.shiftsAt.pawn;delete s.shiftsAt.pawn}}],
    ['fields added since the save was made get their starting values from blank()', function(s,b){Object.keys(b).forEach(function(k){if(s[k]===undefined)s[k]=b[k]})}],
    ['v3 to v4: Diploma merged into Degree, Doctorate and Specialist removed (finished levels converted, part-done ones reset)', function(s){
      if(s.ver===3&&s.edu){
        var OLDQ={sal:{c:[2,5],lv:['Certificate','Diploma']},fnb:{c:[2,5,8],lv:['Certificate','Diploma','Degree']},fin:{c:[2,5,8,12],lv:['Certificate','Diploma','Degree','Masters']},tech:{c:[2,5,8,12],lv:['Certificate','Diploma','Degree','Masters']},med:{c:[2,5,8,12,16],lv:['Certificate','Diploma','Degree','Honours','Masters']},eng:{c:[2,5,8,12,16],lv:['Certificate','Diploma','Degree','Honours','Masters']}};
        Object.keys(TRACKS).forEach(function(t){var o=OLDQ[t];if(!o)return;var n=s.edu[t]||0,k=0;o.c.forEach(function(e){if(n>=e)k++});
          var lab=k?o.lv[k-1]:null;if(lab==='Diploma')lab='Degree';
          s.edu[t]=lab?TRACKS[t].c[TRACKS[t].lv.indexOf(lab)]:0});
        s.enr={};s.les={};s.cert=null;s.ver=4;
      }}],
    ['jobs list changed: a saved job whose role no longer exists (or moved) is dropped so the player can re-apply', function(s,b,out){
      Object.keys(s.career||{}).forEach(function(c){var rk=CAREERS[c]&&CAREERS[c].ranks[s.career[c]];if(!rk||(s.jobName&&s.jobName!==rk.r)){out.lostJob=s.jobName||c;delete s.career[c]}})}],
    ['one job at a time (keep the best paid); an old layoff becomes a workplace closure; owning items ticks the shopping goal', function(s){
      var cs=Object.keys(s.career||{});if(cs.length>1){var best=null,bp=-1;cs.forEach(function(c){var rk=CAREERS[c]&&CAREERS[c].ranks[s.career[c]];if(rk&&rk.pay>bp){bp=rk.pay;best=c}});var keep={};if(best)keep[best]=s.career[best];s.career=keep}
      if(s.layoff>0){var c0=Object.keys(s.career)[0];if(c0)s.shut[CAREERS[c0].b||c0]=Math.min(4,s.layoff);s.layoff=0}
      if(Object.keys(s.items||{}).some(function(k){return s.items[k]}))s.flags.buy=1}],
    ['rival personalities, archetypes and favour memories (stable for old saves, without rolling dice)', function(s){(s.rivals||[]).forEach(function(r,i){prepareRival(r,i,s.rivalSeed)});s.ver=Math.max(s.ver||0,5)}],
    ['v5 to v6: reputation for rivals in games saved before town politics (no dice rolled)', function(s){(s.rivals||[]).forEach(function(r){if(!Number.isFinite(r.rep))r.rep=CONFIG.rivals.politics.rep.start;if(r.drift==null)r.drift=0});if(!CONFIG.rivals.politics.moods[s.townMood])s.townMood=CONFIG.rivals.politics.defaultMood;s.ver=Math.max(s.ver||0,6)}],
    ['v6 to v7: sabotage records for rivals in games saved before sabotage (no dice rolled)', function(s){(s.rivals||[]).forEach(function(r){if(!Array.isArray(r.sabOn))r.sabOn=[];if(!Number.isFinite(r.sabUsed))r.sabUsed=0;if(!Number.isFinite(r.grudge))r.grudge=0});s.ver=Math.max(s.ver||0,7)}],
    ['v7 to v8: social contracts and loan reliability (no random draws)', function(s){(s.rivals||[]).forEach(function(r){if(!r.home)r.home='apt';if(!r.loanHistory)r.loanHistory={paid:0,late:0,defaulted:0}});if(s.home==='bung'&&s.flat){s.home='apt';s.notes.push({l:'rem',t:'Your shared household was restored at the apartment: villas now allow one occupant. Your housemate and belongings are retained.'})}s.ver=Math.max(s.ver||0,8)}],
    ['new investments, qualifications and outfits added to the nested lists', function(s,b){['inv','edu','clothes'].forEach(function(k){Object.keys(b[k]).forEach(function(q){if(s[k][q]===undefined)s[k][q]=b[k][q]})})}]
  ];
  /* brings stored data up to date in place; returns what the player should be told about */
  function migrateSave(d){var b=blank(),out={lostJob:null};MIGRATIONS.forEach(function(m){m[1](d.S,b,out)});return out}
  /* puts a migrated save into play: state, where you are, the daily log and the screen */
  function hydrate(d,out){
    if(d.loc==='pawn')d.loc='thrift';if(d.view==='pawn')d.view='thrift';  /* the Pawn Shop is now the Second-Hand Shop's pawn counter */
    PREV=null;S=d.S;applyPayVar();loc=LOCS.some(function(l){return l[0]===d.loc})?d.loc:S.home;view=d.view&&panels[d.view]?d.view:null;last=d.last||null;
    if(!S.logs)S.logs=[];
    $('log').innerHTML='';
    S.logs.slice().reverse().forEach(function(e){var x=document.createElement('div');x.textContent=e[0];if(e[1])x.className=e[1];$('log').insertBefore(x,$('log').firstChild)});
    $('over').classList.remove('show');
    log('Welcome back. Your game was restored from your last session.','good');if(out.lostJob)log('The job list has changed and your old job ('+out.lostJob+') no longer exists. Apply for a new one at the Employment Office.','warn');
    if(!S.flags.diff&&S.day===1)$('welcome').classList.add('show');
    render();
  }
  /* true when a saved game was restored. A finished game or no save starts fresh. A save that cannot be read or
    migrated is copied to SAVE_KEY+'.broken' first, so a later fix can still recover it. */
  function load(){
    var raw=null;
    try{raw=localStorage.getItem(SAVE_KEY)}catch(e){return false}  /* storage blocked: the save status says so */
    if(!raw)return false;
    try{
      var d=JSON.parse(raw);if(!d||!d.S||typeof d.S.day!=='number'||d.S.over)return false;
      hydrate(d,migrateSave(d));return true;
    }catch(e){
      console.warn('Daily Grind: the saved game could not be loaded, so a new game starts. The old save is kept as '+SAVE_KEY+'.broken.',e);
      try{localStorage.setItem(SAVE_KEY+'.broken',raw)}catch(x){}
      return false;
    }
  }
  function nextRentWeek(){return Math.ceil(S.day/RENT_EVERY)*RENT_EVERY}
  function finish(title,text){
    if(S.over)return;
    settleBets();closeSocialMoney();
    if(nightRun){sampleNight(nightFed)}  /* settle due bets and include an early-ending night before the final score */
    var lost=!/rank/.test(title)&&title.indexOf(TIERS[TIERS.length-1].n)<0;
    if(lost)snd('lose');
    S.over=true;S.endDay=nightRun?S.day-1:S.day;  /* the last day actually played */
    clearSave();$('keep').hidden=true;
    $('overTitle').textContent=title;
    $('overText').textContent=text;
    var sc=score(),best=bestScore(),first=(function(){try{return localStorage.getItem('dailyGrind.best')===null}catch(e){return true}})(),isTop=S.mode!=='rivals'&&sc>0&&(first||sc>best);  /* a rival game has its own best (dailyGrind.bestRivals) */  /* a 0-point game is never a top score */
    if(isTop){try{localStorage.setItem('dailyGrind.best',String(sc))}catch(e){}}
    $('overScore').hidden=false;
    $('overScore').innerHTML=(isTop?'<div class="topscore">🏆 New personal-best score!</div>':first?'':'<div class="prevtop">Top score so far: <b>'+best.toLocaleString()+'</b></div>')+
      '<div class="bigscore">⭐ '+sc.toLocaleString()+' points</div><table class="sctab">'+scoreParts().map(function(p){return '<tr><td>'+p[0]+'</td><td>'+(p[1]<0?'−':'')+Math.abs(p[1]).toLocaleString()+'</td></tr>'}).join('')+'</table>';
    if(S.mode==='rivals'&&S.rivals&&S.rivals.length){  /* a rival game is won on the Life Score, not the single-game score */
      var LP=lifeScore(),me=LP.filter(function(p){return p.me})[0],pb=null;try{pb=JSON.parse(localStorage.getItem('dailyGrind.bestRivals')||'null')}catch(e){}
      var better=!pb||me.place<pb.place||(me.place===pb.place&&me.pts>pb.pts);if(better){try{localStorage.setItem('dailyGrind.bestRivals',JSON.stringify({place:me.place,pts:me.pts,of:LP.length}))}catch(e){}}
      $('overScore').innerHTML=lifeTable()+(better&&pb?'<div class="topscore">🏆 Your best rival-game finish!</div>':pb?'<div class="prevtop">Best rival-game finish so far: <b>'+ordinal(pb.place)+' of '+pb.of+', '+pb.pts+' points</b></div>':'');
      isTop=false;
    }
    if(isTop&&!lost)snd('win');  /* a personal best on a loss is still a loss: no win sound */
    $('over').classList.add('show');
    render();
  }
  function assets(){var t=0;Object.keys(S.items).forEach(function(k){if(S.items[k])t+=Math.floor(G(ITEMS[k].p)/(S.broken[k]?4:2))});return t}
  /* game score: net worth plus your vitals and education */
  function scoreParts(){
    var ed=0;Object.keys(TRACKS).forEach(function(t){ed+=lvl(t)});
    var W=CONFIG.score;
    var parts=[['Net worth',Math.round(worth())],['Energy ×'+W.energy,S.energy*W.energy],['Happiness ×'+W.happiness,S.happy*W.happiness],['Health ×'+W.health,S.health*W.health],['Knowledge ×'+W.knowledge,Math.floor(S.know)*W.knowledge],['Education levels ×'+W.educationLevel,ed*W.educationLevel],['On-time ranks',rankBonus()]];
    return parts;
  }
  function score(){return Math.max(0,scoreParts().reduce(function(a,b){return a+b[1]},0))}
  function bestScore(){try{return +localStorage.getItem('dailyGrind.best')||0}catch(e){return 0}}
  function worth(){return S.cash+S.bank+invTotal()+assets()-S.medDebt-(S.arrears?S.arrears.bal:0)-loanOwed()+rivalMoney(-1)}
  function rankBurst(){
    /* short celebratory particles over the rank-up modal */
    var host=$('over');if(!host)return;
    var box=document.createElement('div');box.className='rankburst';box.setAttribute('aria-hidden','true');
    var cols=['#e0a526','#3cc0c3','#ef7d72','#5fcf92','#f0bd4a','#4b78c2'];
    for(var i=0;i<28;i++){
      var p=document.createElement('i');
      p.style.left=(8+Math.random()*84)+'%';
      p.style.background=cols[i%cols.length];
      p.style.animationDelay=(Math.random()*0.45)+'s';
      p.style.animationDuration=(0.9+Math.random()*0.8)+'s';
      box.appendChild(p);
    }
    host.appendChild(box);
    setTimeout(function(){if(box.parentNode)box.parentNode.removeChild(box)},2200);
  }
  function checkWin(){
    if(S.over)return false;
    var t=reachedTier();
    if(t<=S.tier)return false;
    /* record the day each new rank was reached (overnight gains count for the day that just ended) */
    var day=S.day-(nightRank?1:0),from=S.tier+1;if(!S.rankDay)S.rankDay={};
    for(var i=from;i<=t;i++)if(S.rankDay[i]==null)S.rankDay[i]=day;
    S.tier=t;var T=TIERS[t];
    /* one line per new rank: on time (with its bonus) or late */
    var notes=[];for(var j=from;j<=t;j++){var due=tierDue(j);if(due)notes.push(onTime(j)?'⭐ '+TIERS[j].n+' on time (target day '+due+'): +'+TIERS[j].b.toLocaleString()+' score.':TIERS[j].n+' came after its target day ('+due+'), so no on-time bonus.')}
    for(var w=from;w<=t;w++)addWin(TIERS[w].ic+' '+TIERS[w].n+(onTime(w)?' on time':''));
    var nt=notes.length?' '+notes.join(' '):'';
    if(t===TIERS.length-1&&S.mode==='rivals'){  /* a rival game goes on to its last day: the top rank is a milestone, the standings decide */
      log('Milestone: '+T.n+' ('+money(T.v)+' net worth reached), the top rank. The race goes on to day '+maxDays()+': the town standings are taken at the end.'+nt,'good');
      snd('win');rankBurst();render();
      return false;
    }
    if(t===TIERS.length-1){
      log('Milestone: '+T.n+' with '+money(worth())+'. '+(maxDays()===Infinity?'Keep playing.':'Keep playing until day '+maxDays()+'.')+nt,'good');
      snd('win');rankBurst();render();return false;
    }
    var nx=TIERS[t+1],ndue=tierDue(t+1),nxDue=ndue&&day<=ndue?' by day '+ndue+' for +'+nx.b.toLocaleString()+' score':'';
    log('Milestone: '+T.n+' ('+money(T.v)+' net worth reached). Next: '+nx.n+' at '+money(nx.v)+nxDue+'.'+nt,'good');
    snd('win');
    rankBurst();
    render();
    return false;
  }
  function done(){wealthProgress();if(!checkWin())render();}
