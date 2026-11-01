/* Included inside the legacy sim.js closure in a throwaway copy only.
 * Observers do not roll dice or change game state. Node performs the real input. */
  var suiteDayActions=0;
  async function socialStep(){
    if(G.S.over||!home()||G.S.ap<reserve()+150)return;
    if(!(await go(G.S.home)))return;
    if(G.S.mode==='rivals'){
      var people=G.S.rivals.map(function(r,i){return {r:r,i:i}}).filter(function(x){return !x.r.out}).sort(function(a,b){return (b.r.rel||0)-(a.r.rel||0)});
      var friend=people[0];
      if(friend){
        var cb=btn('rcall',String(friend.i));if(cb)await click(cb,'rcall:'+friend.i);
        if(!G.S.flat&&(friend.r.rel||0)>=G.CONFIG.rivals.together.flat.flatFrom){var ib=btn('flat',String(friend.i));if(ib)await click(ib,'flat:'+friend.i)}
      }
      var cook=btn('fdo','cook');if(cook&&!G.S.fed&&G.S.cash>30)await click(cook,'fdo:cook');
      var hang=btn('fdo','hangout');if(hang&&G.S.ap>reserve()+120)await click(hang,'fdo:hangout');
      if(!G.S.items.phone&&G.S.cash>G.G(G.ITEMS.phone.p)+G.HOUSE[G.S.home].rent+150&&await go('elec'))await click(btn('buy','phone'),'buy:phone');
      if(G.S.items.phone&&!G.S.broken.phone&&G.S.ap>reserve()+100){
        await window.__qaInteract({type:'app',app:'msgsapp'});
        for(var mi=0;mi<2;mi++){
          var msg=(G.S.msgs||[]).find(function(m){return !m.st});if(!msg)break;
          var yes=btn('msg',msg.id+'|yes'),no=btn('msg',msg.id+'|no');
          var ok=G.S.cash-(msg.amt||0)>G.HOUSE[G.S.home].rent+80;
          await click(ok&&yes?yes:no,'msg:'+msg.k+':'+(ok&&yes?'yes':'no'));
        }
        var pact=document.querySelector('#shop [data-act="pact"]:not(:disabled)');
        if(pact&&!G.S.pact&&G.S.ap>reserve()+60)await click(pact,'pact:'+pact.dataset.arg);
        var renew=btn('prenew','');if(renew)await click(renew,'prenew');
        if(G.S.day%7===0&&friend&&G.S.cash>300){var bet=btn('rbet',String(friend.i));if(bet)await click(bet,'rbet:'+friend.i)}
      }
    }else if(G.S.happy<85)await moraleStep(85);
  }
  function suiteSnap(){
    var s=G.S;
    function rival(r){return {name:r.name,diff:r.diff,personality:r.personality,cash:r.cash,bank:r.bank,etf:r.etf,worth:G.rivalWorth(r),job:r.job,edu:r.edu,study:r.study,target:r.target,avoidCareer:r.avoidCareer,avoidTrack:r.avoidTrack,rel:r.rel,rep:r.rep,energy:r.energy,happy:r.happy,health:r.health,know:r.know,out:r.out,life:r.life,favours:r.favours,hist:(r.hist||[]).slice(-4)}}
    return {day:s.day,ap:s.ap,over:s.over,mode:s.mode,diff:s.diff,mood:s.townMood,gameDays:G.maxDays(),cash:s.cash,bank:s.bank,worth:G.worth(),score:G.score(),energy:s.energy,happy:s.happy,health:s.health,know:s.know,fed:s.fed,workMin:s.workMin,studyMin:s.studyMin,slept:s.slept,ill:s.ill,home:s.home,homeless:s.homeless,clothes:s.clothes,career:s.career,edu:s.edu,life:s.life,tier:s.tier,medDebt:s.medDebt,arrears:s.arrears,loan:s.loan,inv:s.inv,items:s.items,broken:s.broken,flat:s.flat,pact:s.pact,rpacts:s.rpacts,rloans:s.rloans,bets:s.bets,msgs:s.msgs,incidents:s.incidents,sabOn:s.sabOn,rivalSeed:s.rivalSeed,notes:s.notes,rivals:(s.rivals||[]).map(rival),ending:s.over?$('overTitle').textContent:null,lifeScore:s.mode==='rivals'?G.lifeScore().map(function(p){return {name:p.name,me:!!p.me,place:p.place,pts:p.pts,cats:p.cats}}):null};
  }
  function suiteValidate(){
    check('suite-observation');var s=G.S;
    var investments=Object.values(s.inv).reduce(function(n,v){return n+v.v},0),assets=Object.keys(s.items).reduce(function(n,k){return n+(s.items[k]?Math.floor(G.G(G.ITEMS[k].p)/(s.broken[k]?4:2)):0)},0);
    var owes=s.loan?s.loan.principal+s.loan.interest:0;
    function socialMoney(i){var n=0;(s.rloans||[]).forEach(function(l){var sign=l.dir==='in'?1:-1;n+=i<0?sign*l.owe:l.i===i?-sign*l.owe:0});(s.bets||[]).forEach(function(b){if(i<0||b.i===i)n+=b.stake});if(s.pact&&s.pact.pot&&(i<0||s.pact.i===i))n+=s.pact.pot/2;(s.rpacts||[]).forEach(function(p){if(p.pot&&(p.a===i||p.b===i))n+=p.pot/2});return n}
    var expected=s.cash+s.bank+investments+assets-s.medDebt-(s.arrears?s.arrears.bal:0)-owes+(s.mode==='rivals'?socialMoney(-1):0);
    if(Math.abs(expected-G.worth())>0.01)note('INVARIANT','independent net worth reconciliation');
    (s.rivals||[]).forEach(function(r,i){
      ['cash','bank','happy','health','know'].forEach(function(k){if(!Number.isFinite(r[k]))note('INVARIANT','rival '+i+' '+k+' is not finite')});
      if(Math.round(r.cash+r.bank+(r.etf||0)+socialMoney(i))!==G.rivalWorth(r))note('INVARIANT','rival '+i+' net worth reconciliation');
      var f=r.favours,M=G.CONFIG.rivals.memory;if(f&&(Math.abs(f.trust)>M.maxTrust||f.owed<0||f.owed>M.maxOwed||f.entries.length>M.maxEntries))note('INVARIANT','rival '+i+' memory bounds');
    });
    if(s.mode==='rivals'){
      if(s.townMood==='friendly'&&(s.sabOn||[]).length)note('INVARIANT','sabotage present in Friendly town');
      var board=G.lifeScore(),sc=G.CONFIG.rivals.scoring;
      board.forEach(function(p){var pts=Object.keys(p.cats).reduce(function(n,k){var x=p.cats[k];return n+(sc.placePoints[x.place-1]||0)*sc.categories[k].weight},0);if(pts!==p.pts||p.place!==1+board.filter(function(q){return q.pts>p.pts}).length)note('INVARIANT','Life Score aggregation or final place')});
    }
    var h=$('dailyProgress');if(h&&s.flags.diff){if(h.textContent.includes('Eaten today')!==!!s.fed)note('UI','daily meal indicator disagrees with state')}
    return rep.issues;
  }
  window.__suite={
    init:function(saved){G=window.__G;R=mul(saved?saved.botState:QA.botSeed);rep=saved?saved.rep:{seed:QA.gameSeed,mode:QA.strategy,issues:{}};clicks=saved?saved.clicks:0;target=saved?saved.target:null;MOR=saved?saved.MOR:{};errs.length=0},
    ready:async function(){await popups('survive');var p=$('previewBtn');if(/on/.test(p.textContent))await click(p,'settings:preview-off')},
    day:async function(){suiteDayActions=0;var d=G.S.day;await popups('survive');if(QA.strategy==='random')await randomDay();else await surviveDay();suiteValidate();return {beforeDay:d,snapshot:suiteSnap(),issues:rep.issues,clicks:clicks,morale:MOR}},
    state:function(){return {botState:R.state(),rep:rep,clicks:clicks,target:target,MOR:MOR}},
    observe:function(){suiteValidate();return {day:G.S.day,ap:G.S.ap,over:G.S.over,cash:G.S.cash,bank:G.S.bank,worth:G.worth(),fed:G.S.fed,energy:G.S.energy,happy:G.S.happy,health:G.S.health,know:G.S.know,workMin:G.S.workMin,studyMin:G.S.studyMin,logs:G.S.logs.slice(0,5),issues:rep.issues}},
    probe:async function(){pickTarget();await ensureClothes();await ensureFed();await applyStep();suiteValidate();return suiteSnap()},
    snapshot:suiteSnap
  };
