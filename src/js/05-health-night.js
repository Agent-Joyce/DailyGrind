  /* ==================================================================
     5. HEALTH, STRESS AND THE NIGHT
     Illness and health, burnout, the game-over checks (stressTick) and rollover(), which runs everything that happens overnight.
     ================================================================== */
  /* ---------- health: a slow-moving vital that shapes how often you fall ill ---------- */
  function goodCount(){return (S.good||[]).filter(function(d){return S.day-d<5}).length}
  function eatGood(n){S.good.push(S.day);S.good=S.good.filter(function(d){return S.day-d<5});S.health=clamp(S.health+n)}
  /* illness multipliers, all from CONFIG.illness */
  function dietF(){var I=CONFIG.illness,f=1,j=junkCount(),g=goodCount();if(j>=I.junkMeals)f*=I.junkX;if(g>=CONFIG.health.healthyMealCount)f*=I.healthyManyX;else if(g>=1)f*=I.healthyFewX;return f}
  function healthF(){var rows=CONFIG.illness.byHealth.slice().sort(function(a,b){return b.healthAtLeast-a.healthAtLeast});for(var i=0;i<rows.length;i++)if(S.health>=rows[i].healthAtLeast)return rows[i].x;return rows[rows.length-1].x}
  function gymF(){var I=CONFIG.illness;return Math.max(I.gymBestX,1-I.gymPerVisitCut*gymCount())}
  function checkupWord(){var x=CONFIG.illness.checkupX;return x===0.5?'halved':'cut by '+pctTxt(1-x)}
  /* nights (out of the last CONFIG.illness.lowWindow) you went to bed with low energy */
  function lowNights(){var I=CONFIG.illness;return (S.lowE||[]).filter(function(d){return S.day-1-d<I.lowWindow}).length}  /* nights up to last night */
  /* nightly chance of falling ill: low energy only counts once it has lasted (CONFIG.illness.lowNights),
    then a fixed cut for everyone, then reduced by health, diet and gym visits */
  function illChance(){
    var I=CONFIG.illness,rows=I.byEnergy.slice().sort(function(a,b){return a.energyUnder-b.energyUnder}),base=rows[rows.length-1].chance;
    if(lowNights()>=I.lowNights)for(var i=0;i<rows.length;i++)if(S.energy<rows[i].energyUnder){base=rows[i].chance;break}
    var ch=Math.max(0,base*I.cutForEveryone-I.minusForEveryone);  /* fixed cut for everyone */
    ch*=healthF()*dietF()*gymF()*Df().ill*trendIll()*(S.burn>0?I.burnoutX:1);
    if(S.immune>0)ch*=I.checkupX;
    return Math.min(I.maxChance,ch);
  }
  function healthTick(wasFed){
    var N=CONFIG.health.nightly,d=N.always,why=N.always?[sg(N.always)+' every night']:[];
    if(!wasFed){d+=N.skippedMeal;why.push(sg(N.skippedMeal)+' no meal today')}
    if(S.ill){d+=N.sick;why.push(sg(N.sick)+' illness')}
    if(S.energy<N.lowEnergyBelow){d+=N.lowEnergy;why.push(sg(N.lowEnergy)+' very low energy')}
    if(S.burn>0){d+=N.burnout;why.push(sg(N.burnout)+' burnout')}
    if(S.slept>0){d+=S.slept;why.push(sg(S.slept)+' sleep')}
    var h0=S.health;S.health=clamp(S.health+d);S.slept=0;
    log('Overnight health '+sg(S.health-h0)+(why.length?' ('+why.join(', ')+')':'')+'.',S.health-h0<0?'warn':'good');
  }
  /* burnout: work + school lessons + self-study for more than CONFIG.burnout.loadMinutes in a day, daysInARow days running */
  function loadMin(){return (S.workMin||0)+(S.studyMin||0)}
  function burnTick(){
    var BU=CONFIG.burnout;
    if(loadMin()>BU.loadMinutes)S.loadStreak=(S.loadStreak||0)+1;else S.loadStreak=0;
    S.studyMin=0;S.workMin=0;
    if(S.burn>0){S.burn--;if(!S.burn){S.notes.push({l:'good',t:'😮‍💨 You have recovered from burnout. Pace your work and studying from now on.'});log('You recovered from burnout.','good')}}
    else if(S.loadStreak>=BU.daysInARow){
      S.burn=BU.lastsDays;S.loadStreak=0;S.health=clamp(S.health+BU.healthHit);S.energy=clamp(S.energy+BU.energyHit);S.happy=clamp(S.happy+BU.happinessHit);
      S.notes.push({l:'bad',t:'🔥 BURNOUT! You worked and studied more than '+loadLimitTxt()+' a day for '+dayN(BU.daysInARow)+' running. Health '+sg(BU.healthHit)+', energy '+sg(BU.energyHit)+'%, happiness '+sg(BU.happinessHit)+'. For '+dayN(BU.lastsDays)+' your health keeps dropping and shifts pay '+pctTxt(1-BU.pay)+' less.'});
      log('Burnout from long days of work and study: health '+sg(BU.healthHit)+', productivity down for '+dayN(BU.lastsDays)+'.','bad');
    }  /* the warning the day before burnout is in stressList, which the morning notes include */
  }
  /* the day's work + study line shown at workplaces, City College and home */
  function loadTxt(){var BU=CONFIG.burnout,m=loadMin();return '⏱ Work and study today: <b>'+hm(m)+'</b>. More than '+loadLimitTxt()+' a day for '+dayN(BU.daysInARow)+' running causes burnout'+(S.loadStreak?' (streak: '+S.loadStreak+' of '+BU.daysInARow+')':'')+'.'}
  function stressTick(){
    var nw=worth();
    var SH=CONFIG.shame;
    if(nw<0){S.happy=clamp(S.happy+SH.debtHappiness);S.energy=clamp(S.energy+SH.debtEnergy);log('You are in debt and the creditors keep calling. The shame hits hard ('+sg(SH.debtHappiness)+' happiness, '+sg(SH.debtEnergy)+'% energy).','bad')}
    else if(nw<SH.nearlyBrokeBelow&&S.day-1>=SH.nearlyBrokeFromDay){S.happy=clamp(S.happy+SH.nearlyBrokeHappiness);log('You are almost broke and feel ashamed around everyone ('+sg(SH.nearlyBrokeHappiness)+' happiness).','warn')}  /* S.day-1: the day that just ended */
    S.exh=S.energy<=10?S.exh+1:0;
    S.gloom=S.happy<=10?S.gloom+1:0;
    var BR=CONFIG.bankrupt;
    S.broke=(nw<BR.netWorthBelow&&S.day-1>=BR.fromDay)?(S.broke||0)+1:0;
    if(S.broke>=BR.daysInARow){finish('Bankrupt','Your net worth stayed under '+money(BR.netWorthBelow)+' for '+numWord(BR.daysInARow)+' days in a row ('+money(nw)+' now). The creditors seized everything in day '+(S.day-1)+'.');return true}
    if(S.broke>0)log('Warning: your net worth is under '+money(BR.netWorthBelow)+' ('+S.broke+' of '+BR.daysInARow+' days). '+(S.broke===BR.daysInARow-1?'One more day and you go bankrupt.':'Get above it soon.'),'bad');
    if(S.hungry>=FD.hungryDaysToHospital){finish('Hospitalised','You went '+numWord(FD.hungryDaysToHospital)+' day'+(FD.hungryDaysToHospital===1?'':'s')+' in a row without a proper meal and collapsed. The hospital bills finish you off.');return true}
    if(S.exh>=2){finish('Exhaustion','You ran on empty for two days in a row and your body gave out in day '+(S.day-1)+'.');return true}
    if(S.gloom>=3){finish('You gave up','Three days of rock-bottom morale. You lost all motivation and left town in day '+(S.day-1)+'.');return true}
    if(S.exh===1)log('Warning: you are running on empty. Another day at this level and you will collapse.','bad');
    if(S.gloom===1||S.gloom===2)log('Warning: your morale is at rock bottom ('+S.gloom+'/3 days). Do something that cheers you up.','bad');
    if(FD.hungryDaysToHospital>1&&S.hungry===FD.hungryDaysToHospital-1)log('Warning: '+numWord(S.hungry)+' day'+(S.hungry===1?'':'s')+' without a meal. One more will put you in hospital.','bad');
    illTick();
    var cs=Object.keys(S.career);
    if(S.happy<20&&cs.length&&Math.random()<0.35){
      var c=cs[Math.floor(Math.random()*cs.length)],rk=CAREERS[c].ranks[S.career[c]].r;
      if(S.career[c]>0){S.career[c]--;log('Your boss is fed up with your attitude and demotes you from '+rk+' at the '+CAREERS[c].n+'.','bad')}
      else{delete S.career[c];log('Your boss is fed up with your attitude and fires you from the '+CAREERS[c].n+'.','bad')}
    }
    if(S.day>maxDays()){
      var ft=Math.max(S.tier,reachedTier());
      if(ft>=0)finish(TIERS[ft].ic+' Final rank: '+TIERS[ft].n,'Your '+maxDays()+' days are up. You finished with '+money(worth())+' in net worth'+(ft<TIERS.length-1?', short of '+TIERS[ft+1].n+' ('+money(TIERS[ft+1].v)+')':'')+'. You win!');
      else finish('Time’s up','Your '+maxDays()+' days are up and your net worth is '+money(worth())+', short of '+money(GOAL)+'.');
      return true;
    }
    if(maxDays()>10&&S.day===maxDays()-6)log('Only 7 days left to reach '+money(nextGoal())+'.','warn');
    return false;
  }
  function goals(){
    return [
      ['ate','🍔 Eat a meal before the day ends (Golden Bun, Family Restaurant, or Fresh Market food eaten at home)'],
      ['job','💼 Get a job at the Employment Office (many entry jobs need no degree)'],
      ['study','📚 Attend a lesson at City College (qualifications unlock better jobs)'],
      ['worked','🛠️ Work a shift at your workplace (not the Employment Office)'],
      ['buy','🛍️ Buy an item (Electronics Store, Second-Hand Shop or Clothes Mall)'],
      ['rent','🏠 Pay your rent (early at home, or it comes out of your cash at the end of day '+RENT_EVERY+')']
    ];
  }
  function renderGoals(){
    var g=goals(),left=g.filter(function(x){return !S.flags[x[0]]}).length,el=$('goals');
    if(!left&&!S.tut){S.tut=1;S.goalPop=1;snd('win');log('You finished the getting-started goals. You are on your own now!','good')}
    el.hidden=!!S.tut;
    if(S.tut)return;
    /* first-week checklist: every step, ticked as done, with a target day (the day the bankruptcy count starts) */
    var by=CONFIG.bankrupt.fromDay;
    el.innerHTML='<div class="gh">🎯 First week <span>'+(g.length-left)+'/'+g.length+'</span><button class="linkbtn" id="hideGoals">Hide</button></div>'+
      '<div class="pips">'+g.map(function(x){return '<i class="'+(S.flags[x[0]]?'on':'')+'"></i>'}).join('')+'</div>'+
      '<ul class="gl">'+g.map(function(x){var ok=S.flags[x[0]];return '<li class="goal'+(ok?' done':'')+'">'+(ok?'✓ ':'○ ')+x[1]+'</li>'}).join('')+'</ul>'+
      '<div class="goal gdue">'+(S.day>by?'Day '+S.day+': you are behind. Finish these to get your money moving.':'Aim to finish by day '+by+', when the bankruptcy check starts.')+'</div>';
  }
  /* best-paid job you currently hold (pay per shift before productivity) */
  function payInfo(){
    var best=null,n=0;
    Object.keys(S.career).forEach(function(c){var rk=CAREERS[c].ranks[S.career[c]];if(!rk)return;n++;var v=Math.round(Math.round(rolePay(c,S.career[c])*payIdx())*(1+S.know/400));if(!best||v>best.v)best={v:v,r:rk.r,c:c}});
    return best?{v:best.v,txt:best.r+' · '+NAME[CAREERS[best.c].b||best.c]+(n>1?' (+'+(n-1)+' more job'+(n>2?'s':'')+')':''),n:n}:{v:0,txt:'no job',n:0};
  }
  /* the Community Centre's emergency-help row: always shown, greyed unless you qualify (CONFIG.community.safetyNet) */
  function safetyRow(){
    var Z=CONFIG.community.safetyNet,N=safetyNeeds();if(!N.on)return '';
    var can=N.left>0&&(N.clothes||N.meal);
    return arow('🆘 Emergency help',chip('time',hm(Z.minutes))+chip('','👕 '+dayN(Z.clothesDays)+' of Casual Clothes')+chip('','🍲 A hot meal')+chip('',N.left>0?'Once a game':'✓ Already used',N.left>0?'':'warn'),btn('safety','','Ask for help',0,!can),
      'For when you have no clothes, or no meal and none at home, and cannot afford the cheapest fix (new or used clothes '+money(safetyCheapClothes())+', a meal '+money(safetyCheapMeal())+'; cash and savings count). You get only what you lack.');
  }
  function stressList(){
    var a=[],H=HOUSE[S.home],nw=worth();
    var push=function(l,t){a.push({l:l,t:t})};
    if(S.energy<=10)push('bad',ic('energy')+' Exhausted ('+S.energy+'%): two days like this and you collapse. Shifts pay 15% less.');
    else if(S.energy<30)push('warn',ic('energy')+' Tired ('+S.energy+'%): shifts pay 15% less'+(S.energy<15?' and you may fall sick.':'.'));
    if(S.happy<=10)push('bad','😞 Rock-bottom morale: three days here and you give up (shifts pay 40% less, you may be demoted).');
    else if(S.happy<20)push('bad','😞 Morale crash ('+S.happy+'): shifts pay 40% less and your boss may demote you.');
    else if(S.happy<25)push('warn','😟 Low morale ('+S.happy+'): shifts pay 25% less.');
    else if(S.happy<40)push('warn','😕 Morale dipping ('+S.happy+'): shifts pay 10% less.');
    if(S.hosp&&S.hosp.adm&&!S.hosp.inWard)push('warn','🏥 You have been admitted: you will be warded in the Hospital all of tomorrow. Eat today, and keep cash for the '+money(S.hosp.bill)+' bill charged when you are released.');
    if(S.ill)push('bad','🤒 Sick with '+illShort(ILL[S.ill.k])+': you can’t work, and you lose '+hm(ILL[S.ill.k].min)+', some happiness and '+Math.abs(CONFIG.health.nightly.sick)+' health a day until you recover. '+(S.hosp?'You are booked into the Hospital ward.':illCure()+' (Hospital treatment always cures you; '+pctTxt(HP.admitChance)+' chance of a day in the ward first.)'));
    else if(S.energy<CONFIG.illness.lowEnergyBelow){var ln=lowNights()+1,IL=CONFIG.illness;push('warn','🏥 Low energy: going to bed under '+IL.lowEnergyBelow+'% tonight would make '+ln+' of the last '+IL.lowWindow+' nights'+(ln>=IL.lowNights?', which raises your chance of falling ill.':'. At '+IL.lowNights+' your chance of falling ill goes up.'))}
    /* bankruptcy: warn from a few days before the count starts (CONFIG.bankrupt.warnDaysBefore), with the gap and a way out */
    (function(){var BR=CONFIG.bankrupt;if(!(nw<BR.netWorthBelow&&S.day>=BR.fromDay-(BR.warnDaysBefore||0)))return;
      var gap=BR.netWorthBelow-nw,counts=S.day>=BR.fromDay,pi=payInfo(),sh=pi.n?Math.ceil(gap/Math.max(1,pi.v)):0;
      push(counts?'bad':'warn','💸 Net worth '+money(nw)+' is under '+money(BR.netWorthBelow)+': you need '+money(gap)+' more. '+
        (counts?'If today ends under the line, that is day '+(S.broke+1)+' of '+BR.daysInARow+' in a row towards bankruptcy.':'From the end of day '+BR.fromDay+', '+numWord(BR.daysInARow)+' days in a row under the line is bankruptcy.')+
        ' Way out: '+(pi.n?'about '+sh+' shift'+(sh>1?'s':'')+' at '+money(pi.v)+' each':'get a job at the Employment Office (some entry jobs need no qualification)')+', and hold off on spending (things you buy count at only half their price).')})();
    /* the next rank's target day is close */
    (function(){var i=S.tier+1,due=tierDue(i);if(i>=TIERS.length||!due||S.day>due||due-S.day>2)return;
      push('warn','⭐ '+TIERS[i].ic+' '+TIERS[i].n+' ('+money(TIERS[i].v)+') by the end of day '+due+' earns +'+TIERS[i].b.toLocaleString()+' score: you need '+money(Math.max(0,TIERS[i].v-nw))+' more'+(due===S.day?' today.':' in '+(due-S.day+1)+' days.'))})();
    if(S.loan){var Lx=S.loan;if(S.day>Lx.due)push('bad','🏦 Loan overdue: you owe '+money(loanOwed())+', growing '+rateTxt(CONFIG.loan.overdueRate)+' a day. Default on day '+(Lx.due+CONFIG.loan.graceDays)+'.');else if(Lx.due-S.day<=1)push('warn','🏦 Loan due '+(Lx.due===S.day?'tonight':'tomorrow')+': you owe '+money(loanOwed())+'.')}
    if(S.burn>0)push('bad','🔥 Burnout ('+S.burn+' day'+(S.burn>1?'s':'')+' left): your health keeps dropping and shifts pay '+pctTxt(1-CONFIG.burnout.pay)+' less. Rest, and cut down on studying.');
    else if(CONFIG.burnout.daysInARow>1&&S.loadStreak>=CONFIG.burnout.daysInARow-1)push('warn','⏱ '+(S.loadStreak===1?'You worked and studied more than '+loadLimitTxt()+' yesterday. Another day like that causes burnout.':'You have worked and studied more than '+loadLimitTxt()+' a day '+numWord(S.loadStreak)+' days running. A '+(ORD[CONFIG.burnout.daysInARow]||CONFIG.burnout.daysInARow+'th')+' day causes burnout.'));
    if(S.health<CONFIG.health.poorBelow)push(S.health<=CONFIG.health.poorBelow/2?'bad':'warn',ic('health')+' Poor health ('+S.health+'/100): you fall ill more easily and shifts pay '+pctTxt(1-CONFIG.health.poorPay)+' less. Eat well, rest or go to the Gym.');
    if(S.arrears)push('bad','🏠 Rent arrears: '+money(S.arrears.bal)+' owed, '+money(instal())+' due tomorrow morning.');
    if(S.medDebt>0)push('bad','🧾 Medical bill arrears: '+money(S.medDebt)+' owed, '+money(medInstal())+' due tomorrow morning (late fee if you can’t pay). Pay more at the Hospital.');
    if(S.hungry>=1&&!S.fed)push('bad','🍽 '+S.hungry+' day'+(S.hungry>1?'s':'')+' without a meal and none yet today: '+FD.hungryDaysToHospital+' in a row puts you in hospital.');
    else if(!S.fed&&S.ap<M(15))push('warn','🍽 No meal yet today. Eat before you end the day.');
    /* earlier, specific warnings for the two ways a bad run snowballs: no meal you can pay for, and no clothes you can pay for (CHANGELOG 111) */
    (function(){var N=safetyNeeds(),have=S.cash+S.bank,help=function(ok){return N.on&&ok?(N.left>0?' The Community Centre can help once this game.':' (The Community Centre has already helped you once.)'):''};
      if(!S.fed&&!(S.food||[]).some(function(p){return !p.sp})&&have<safetyCheapMeal())push('bad','🍽 You cannot afford a meal: the cheapest is '+money(safetyCheapMeal())+' and you have '+money(have)+' in cash and savings. Work a shift first, or sell something at the Second-Hand Shop.'+help(true));
      if(naked())push('bad','👕 You are out of clothes: no shift away from home until you have some (the cheapest is '+money(safetyCheapClothes())+(have<safetyCheapClothes()?', and you have '+money(have)+' in cash and savings':'')+').'+help(have<safetyCheapClothes()));
      else{var days=Math.max(S.clothes.casual||0,S.clothes.smart||0,S.clothes.suit||0);
        if(days<=2&&have<safetyCheapClothes())push('warn','👕 Your last clothes wear out in '+dayN(days)+' and you cannot afford new ones yet (the cheapest is '+money(safetyCheapClothes())+', you have '+money(have)+'). Earn it first: with no clothes you cannot work.')}})();
    if(nw<0)push('bad','💸 In debt ('+money(nw)+'): if your net worth is still under $0 when you end the day, shame costs 8 happiness and 5% energy.');
    else if(nw<CONFIG.shame.nearlyBrokeBelow&&S.day>=CONFIG.shame.nearlyBrokeFromDay)push('warn','💸 Nearly broke ('+money(nw)+'): if your net worth is still under '+money(CONFIG.shame.nearlyBrokeBelow)+' when you end the day, shame costs '+Math.abs(CONFIG.shame.nearlyBrokeHappiness)+' happiness.');
    var left=nextRentWeek()-S.day;
    if(S.homeless)push('bad','🏚️ No home: you sleep outside every night and cannot rest, cook or use your fridge and gadgets. Apply at the Apartment ('+money(homeFee('apt'))+') or the Villa ('+money(homeFee('bung'))+').');
    else if(left<=1&&S.cash<H.rent&&S.rentPaid!==nextRentWeek())push('bad','🏠 Rent of '+money(H.rent)+' is due '+(left===0?'today':'tomorrow')+' and you only have '+money(S.cash)+' in cash.');
    if(S.enrolled&&S.sinceClass>=3)push('bad','🎓 No lesson for '+S.sinceClass+' days: attend one soon or you may be expelled.');
    if(S.expelled>0)push('bad','🚫 Expelled from City College. You can re-enrol in '+S.expelled+' day'+(S.expelled>1?'s':'')+'.');
    if(S.day>=maxDays()-(maxDays()>10?6:1))push('warn','⏳ Only '+(maxDays()-S.day+1)+' day'+(maxDays()-S.day?'s':'')+' left to reach '+money(nextGoal())+'.');
    /* 3.8: warn about food that will not be fresh tomorrow */
    var spoilTonight=0;
    (S.food||[]).forEach(function(p){if(!p.sp&&foodLeft(p)===1)spoilTonight++});
    if(spoilTonight)push('bad','🍲 '+spoilTonight+' meal'+(spoilTonight>1?'s':'')+' at home go'+(spoilTonight>1?'':'es')+' off tonight. Cook or eat '+(spoilTonight>1?'them':'it')+' today, or '+(spoilTonight>1?'they':'it')+' will spoil and cost health.');
    a.sort(function(x,y){return (y.l==='bad')-(x.l==='bad')});
    return a;
  }
  /* nightly happiness/knowledge from devices (per day) and from TV/console (per hour rested at home) */
  function gadgetBonus(){
    var GD=CONFIG.gadgets,hrs=S.restHrs||0,hap=0,know=0;
    if(S.homeless)return {hap:0,know:0,hrs:0};  /* gadgets are in storage */
    ['phone','tablet','computer'].forEach(function(g){var k=ikey(g),d=k&&GD.daily[k];if(d){hap+=d.happiness||0;know+=d.knowledge||0}});
    ['console','tv'].forEach(function(g){var k=ikey(g),d=k&&GD.perRestHour[k];if(d){hap+=(d.happiness||0)*hrs;know+=(d.knowledge||0)*hrs}});
    return {hap:Math.round(hap),know:know,hrs:hrs};
  }
  /* ---------- the morning pop-up: one line per topic, in three groups ----------
    A note is {l: bad|warn|rem|good, t: text, c: group, k: topic, m: detail, g: rival group, s: short rival text, rv}.
    c: 'act' (do today), 'news' (what happened overnight), 'run' (still going on). Notes pushed without c or k are sorted
    here by what they say, so the many S.notes.push lines need no change. Two notes on one topic become one: the more
    serious (then the earlier) is kept and the other's text becomes its detail. */
  var NOTE_SEV={bad:0,warn:1,rem:2,good:3};
  function noteMeta(x){
    var t=String(x.t||''),m=function(c,k){if(!x.c)x.c=c;if(x.k==null)x.k=k;return x};
    if(/^🏦 Loan/i.test(t))return m('act','loan');
    if(/^🤒/.test(t))return m('act','ill');
    if(/^🔥/.test(t))return m('act','burn');
    if(/^🏥 You (are warded|have been admitted)/.test(t))return m('act','hosp');
    if(/job tip|tipped you off|passed you a lead|job introduction/i.test(t))return m('news','tip');
    if(/out of clothes|nothing to wear/i.test(t))return m('act','clothes');
    if(/New message from|invited you to share|Reminder: you owe|You still owe|Review the response in Messages|confront or forgive|is due tonight/.test(t))return m('act','');
    if(/^🏚️/.test(t))return m('act','home');
    return m('news','');
  }
  function tidyMorning(mn){
    var seen={},byKey={},out=[];
    mn.forEach(function(x){
      if(!x||!x.t)return;noteMeta(x);
      var txt=x.t.replace(/\s+/g,' ').trim();if(seen[txt])return;seen[txt]=1;
      var o=x.k?byKey[x.k]:null;
      if(!o){if(x.k)byKey[x.k]=x;out.push(x);return}
      var win=(NOTE_SEV[x.l]<NOTE_SEV[o.l])?x:o,lose=win===x?o:x;
      win.m=(win.m?win.m+' ':'')+lose.t+(lose.m?' '+lose.m:'');if(lose.c==='act')win.c='act';
      if(win===x){out[out.indexOf(o)]=x;byKey[x.k]=x}
    });
    return out;
  }
  /* a long note as a headline and its detail (the first sentence, then the rest) */
  function noteSplit(x){
    var t=String(x.t||''),m=x.m||'',r=/^(.{28,}?[.!?])\s+(?=[A-Z0-9“(])/.exec(t);
    if(t.length>100&&r&&!/\b(Mr|Ms|Dr|vs)\.$/.test(r[1])&&r[1].indexOf('<')<0)return {h:r[1],m:(t.slice(r[0].length)+' '+m).trim()};
    return {h:t,m:m};
  }
  function morningHtml(mn){
    var groups={act:[],news:[],run:[]},names={act:'Do today',news:'Overnight',run:'Still going on'},h='';
    mn.forEach(function(x,i){noteMeta(x);x._i=i;(groups[x.c]||groups.news).push(x)});
    var line=function(x){
      var cg=x.rv!=null&&S.mode==='rivals'&&S.rivals&&S.rivals[x.rv],sp=noteSplit(x);
      var btn=cg?' '+(S.cong&&S.cong.d===S.day&&S.cong[x.rv]?'<small>✓ Congratulated</small>':'<button type="button" class="mini" data-cg="'+x.rv+'">🎉 Congratulate · '+hm(CONFIG.rivals.social.congratulate.minutes)+'</button>'+((S.rivals[x.rv].rel||0)<0?' <small>⚠️ on bad terms: an argument costs '+sg(CONFIG.rivals.social.argument.happiness)+' happiness</small>':'')):'';
      return '<li class="'+x.l+'">'+sp.h+btn+(sp.m?'<details class="mnmore"><summary>More</summary>'+sp.m+'</details>':'')+'</li>';
    };
    ['act','news','run'].forEach(function(c){
      var a=groups[c].slice().sort(function(p,q){return (NOTE_SEV[p.l]-NOTE_SEV[q.l])||(p._i-q._i)});if(!a.length)return;
      h+='<li class="mnhead" role="presentation">'+names[c]+'</li>';
      var done={};
      a.forEach(function(x){
        if(!x.g||!x.s){h+=line(x);return}
        if(done[x.g])return;done[x.g]=1;
        var same=a.filter(function(y){return y.g===x.g&&y.s});if(same.length===1){h+=line(x);return}
        var r=S.rivals&&S.rivals[+x.g.slice(1)],rvn=same.filter(function(y){return y.rv!=null})[0];
        h+=line({l:same[0].l,t:'🏁 '+(r?r.ic+' Cousin '+r.name:'A cousin')+': '+same.map(function(y){return y.s.replace(/\.$/,'')}).join('; ')+'.',rv:rvn?rvn.rv:null,c:c,k:''});
      });
    });
    mn.forEach(function(x){delete x._i});
    return h;
  }
  /* how the night went, above the list: sleep and the overnight change, then yesterday's money */
  function morningTop(){
    var sm=S.summary,n=sm&&sm.n;if(!sm||!n||sm.day!==S.day-1)return '';
    var d=function(v,suf){return '<b class="'+(v>0?'up':v<0?'dn':'')+'">'+sg(Math.round(v))+(suf||'')+'</b>'};
    return '<div class="mntop"><span>'+(n.home?'🛏️ Slept at home':'🌙 Slept outside')+'</span><span>⚡ '+d(n.e,'%')+'</span><span>😊 '+d(n.h)+'</span><span>❤️ '+d(n.l)+'</span><span>🧠 '+d(n.k)+'</span>'+
      '<span class="mnmoney">Day '+sm.day+': earned <b class="up">'+money(Math.round(sm.earn))+'</b> · spent <b class="dn">'+money(Math.round(sm.spend))+'</b> · net worth <b class="'+(sm.dnw>0?'up':sm.dnw<0?'dn':'')+'">'+(sm.dnw<0?'−':'+')+money(Math.abs(Math.round(sm.dnw)))+'</b></span></div>';
  }
  function rollover(rested){nightRun=true;nightFed=S.fed;try{return rollover0(rested)}finally{nightRun=false;nightFed=false}}
  function rollover0(rested){
    ovHidden=false;  /* a new day shows the overview again */
    if(S.over)return;
    FLASH={e:S.energy,h:S.happy,l:S.health,k:Math.floor(S.know),until:Date.now()+2500};setTimeout(function(){render()},2600);
    S.pending=null;
    var h=HOUSE[S.home];
    S.day++;S.ap=MAX_AP;S.offer={};S.barg={};S.raced={};rollOpenings();  /* S.raced: roles a rival took overnight (the job race, set in rivalTick) */
    ['casual','smart','suit'].forEach(function(k){
      if(S.clothes[k]>0){S.clothes[k]=Math.max(0,S.clothes[k]-CONFIG.clothes.wearPerDay);if(!S.clothes[k])log('Your '+WEAR[k].n+' wore out. Replace them at the Clothes Mall before your next shift.','warn')}
    });
    /* overnight energy and happiness: the nightly drop (CONFIG.sleep), sleep, the bed, gadgets, coffee and hunger, logged as one line with the real change */
    var SLn=CONFIG.sleep,e0n=S.energy,h0n=S.happy,eWhy=SLn.nightEnergy?[sg(SLn.nightEnergy)+'% every night']:[],hWhy=SLn.nightHappiness?[sg(SLn.nightHappiness)+' every night']:[];
    if(S.restBonus)eWhy.push(sg(S.restBonus)+'% sleep');
    S.energy=clamp(S.energy+SLn.nightEnergy+S.restBonus);S.restBonus=0;
    var gb=gadgetBonus();S.restHrs=0;
    if(S.restHap)hWhy.push(sg(S.restHap)+' sleep');if(rested&&h.hap)hWhy.push(sg(h.hap)+' bed');if(gb.hap)hWhy.push(sg(gb.hap)+' gadgets');
    var nakedHap=naked()?CONFIG.shame.noClothesHappiness||0:0;if(nakedHap)hWhy.push(sg(nakedHap)+' no clothes');
    S.happy=clamp(S.happy+SLn.nightHappiness+S.restHap+(rested?h.hap:0)+gb.hap+nakedHap);
    if(owns('coffee')&&!S.homeless){S.energy=clamp(S.energy+CONFIG.gadgets.coffeeEnergy);eWhy.push(sg(CONFIG.gadgets.coffeeEnergy)+'% coffee')}
    if(gb.hap||gb.know)log('Your gadgets at home: '+[gb.hap?'+'+gb.hap+' happiness':'',gb.know?'+'+(Math.round(gb.know*10)/10)+' knowledge':''].filter(Boolean).join(', ')+(gb.hrs?' ('+(Math.round(gb.hrs*10)/10)+'h rested at home yesterday)':'')+'.','good');
    var wasFed=S.fed;S.hungry=S.fed?0:S.hungry+1;
    if(!S.fed){S.energy=clamp(S.energy+FD.hungryEnergy);S.happy=clamp(S.happy+FD.hungryHappiness);eWhy.push(sg(FD.hungryEnergy)+'% hungry');hWhy.push(sg(FD.hungryHappiness)+' hungry');log('You did not eat all day and went hungry ('+sg(FD.hungryEnergy)+'% energy, '+sg(FD.hungryHappiness)+' happiness).','bad')}
    log('Overnight energy '+sg(S.energy-e0n)+'%'+(eWhy.length?' ('+eWhy.join(', ')+')':'')+', happiness '+sg(S.happy-h0n)+(hWhy.length?' ('+hWhy.join(', ')+')':'')+'.',S.energy<e0n||S.happy<h0n?'warn':'good');
    S.fed=false;S.homeMeals=0;S.chipsDay=0;
    /* food ages overnight: a fridge night uses 1 keep-day, a night outside uses keepDaysFridge/keepDaysRoom.
      Food that runs out is spoiled and leaves the fridge (it stays in the kitchen). Cooked meals in the fridge turn cold. */
    fridgeSync();var nsp=0,nspF=0;
    S.food.forEach(function(p){if(p.sp)return;p.u+=p.f?1:roomRate();if(p.f&&p.t==='cook')p.cold=1;
      if(p.u>=FD.keepDaysFridge-1e-9){if(p.f)nspF++;p.sp=1;nsp++}});
    fridgeSync();
    if(nsp){log(nsp+' meal'+(nsp>1?'s':'')+' went off overnight'+(nspF?' ('+nspF+' from the fridge)':'')+'. '+(nsp>1?'They stay':'It stays')+' in your kitchen marked 🤢 spoiled: you can still cook or eat '+(nsp>1?'them':'it')+', but it costs '+Math.abs(FD.spoiledHealth)+' health a meal (and may give you food poisoning). Food keeps '+FD.keepDaysRoom+' days outside, '+FD.keepDaysFridge+' in a fridge.','warn');
      S.notes.push({l:'warn',t:'🤢 '+nsp+' meal'+(nsp>1?'s':'')+' at home went off overnight. Eating spoiled food costs '+Math.abs(FD.spoiledHealth)+' health a meal. You can throw it out at home.'})}
    Object.keys(S.pawned).forEach(function(k){if(S.day-S.pawned[k].w>3){delete S.pawned[k];log('Your pawn ticket for the '+ITEMS[k].n.toLowerCase()+' expired. Sal keeps it.','warn')}});
    var SN=CONFIG.selfStudy;
    S.know=clamp(S.know+SN.nightlyLoss+gb.know+(anyInv()?SN.nightlyInvesting:0));
    shutTick();
    trendTick();
    indTick();  /* industry-specific storyline: layoffs and suspensions */
    rivalTick();  /* AI rivals live the day that has just ended (rival games only) */
    /* second-hand gadgets can break down on their own */
    Object.keys(S.items).forEach(function(k){var it=ITEMS[k];if(S.items[k]&&it&&it.old&&!S.broken[k]&&Math.random()<it.old){S.broken[k]=1;S.notes.push({l:'bad',t:'🔧 Your '+it.n.toLowerCase()+' broke down overnight. Repair it at the Electronics Store (or buy a new one).'});log('Your '+it.n.toLowerCase()+' broke down.','bad')}});
    tickInv();
    creatorTick();  /* sponsors pay for your followers (only once you have some) */
    /* the Bank's promo offer for today, if any (CONFIG.bank.offers) */
    (function(){var O=CONFIG.bank.offers;S.bankOffer=null;
      if(O&&O.chance>0&&S.day>=O.fromDay&&Math.random()<O.chance)S.bankOffer={day:S.day,rate:Math.round((O.rate[0]+Math.random()*(O.rate[1]-O.rate[0]))*10)/10,days:O.days,min:O.min,max:O.max}})();
    healthTick(wasFed);burnTick();
    if(!Object.keys(TRACKS).some(function(t){return inProgress(t)})){S.enrolled=false;S.sinceClass=0}  /* nothing in progress: nothing to skip */
    if(S.expelled>0){S.expelled--;if(!S.expelled)log('You may enrol at City College again.','good')}
    else if(S.enrolled){
      S.sinceClass=S.studied?0:S.sinceClass+1;
      if(S.sinceClass>=5&&(S.sinceClass>=6||Math.random()<0.5)){
        Object.keys(S.edu).forEach(function(t){var k=lvl(t);S.edu[t]=k?TRACKS[t].c[k-1]:0});S.les={};S.enr={};
        S.expelled=6;S.enrolled=false;S.sinceClass=0;S.know=clamp(S.know-10);
        log('You were expelled from City College for not attending. Unfinished levels are lost (−10 knowledge). You can re-enrol in 6 days.','bad');
      }else if(S.sinceClass>=3)log('City College warning: you have skipped lessons for '+S.sinceClass+' days. Attend one soon or you may be expelled.','bad');
    }
    S.studied=false;
    if(loanTick())return;
    if(stressTick())return;
    var i=Math.floor(S.bank*S.rate/100),invMoved=S.wk&&anyInv()?S.wk.abs:0;
    if(i>0){S.bank+=i;inc(i);log('Your bank paid '+money(i)+' in interest.','good')}
    if(S.homeless){if((S.day-1)%RENT_EVERY===0)log('No rent was due tonight: you have no home.')}
    else if((S.day-1)%RENT_EVERY===0&&S.rentPaid===S.day-1&&myRent(S.day-1)-(S.rentPaidAmt||h.rent)<=0){log('Rent for day '+(S.day-1)+' was already paid. Mr. Rahman tips his hat.','good');S.flags.rent=1}
    else if((S.day-1)%RENT_EVERY===0){
      S.flags.rent=1;
      var rentDue=myRent(S.day-1)-(S.rentPaid===S.day-1?(S.rentPaidAmt||h.rent):0);  /* with a flatmate: your half, or all of it when they skipped their share; less anything paid early */
      var paid=Math.max(0,Math.min(S.cash,rentDue)),short=rentDue-paid;
      S.cash-=paid;outg(paid);
      if(!short)log((rentDue<h.rent?'Your '+(rentDue*2<=h.rent+1?'half of the ':'share of the ')+'rent ('+money(rentDue)+')':'Rent of '+money(rentDue))+' was deducted from your cash.','warn');
      else{
        /* not enough cash: the shortfall + 10% interest is repaid over 5 days */
        var owe=Math.round(short*1.10);
        if(S.arrears){S.arrears.bal+=owe;S.arrears.days=5;S.arrears.fresh=1}else S.arrears={bal:owe,days:5,fresh:1};
        log('You could only pay '+money(paid)+' of the '+money(rentDue)+' rent. Mr. Rahman put the remaining '+money(short)+' (+10% interest = '+money(owe)+') on a 5-day repayment plan.','bad');
        S.notes.push({l:'bad',t:'🏠 Rent arrears: you were '+money(short)+' short. You now owe '+money(S.arrears.bal)+', repaid automatically from cash over the next 5 days (with interest).'});
      }
    }
    arrearsTick();
    settleBets();  /* both sides' interest, investments and rent have now been applied */
    sampleNight(wasFed);  /* completed overnight effects, once per player and night */
    T0();var t=S.today;
    var dnw=worth()-t.nw,best=false;
    if(dnw>(S.bestDay||0)){best=(S.bestDay||0)>0;S.bestDay=dnw}  /* the first good day sets the bar; later ones that beat it are flagged */
    S.summary={day:S.day-1,earn:t.earn,spend:t.spend,dnw:dnw,de:S.energy-t.e,dh:S.happy-t.h,dl:S.health-(t.hl==null?S.health:t.hl),dk:Math.floor(S.know)-Math.floor(t.k),hits:t.hits.slice(0,3),wins:(t.wins||[]).slice(),best:best};
    S.summary.n={e:S.energy-FLASH.e,h:S.happy-FLASH.h,l:S.health-FLASH.l,k:Math.floor(S.know)-FLASH.k,home:!!rested};  /* overnight only, for the morning strip */
    S.today=null;T0();
    lottoDraw();
    planNews();
    var mn=(S.notes||[]).slice(),rw2=nextRentWeek(),rentNext=myRent(rw2);S.notes=[];
    mn.push.apply(mn,moneyBrief(i,invMoved));
    if(tipOn())mn.push({l:'good',c:'run',k:'tip',t:'🤝 Job tip good until the end of day '+S.tip.until+'. Your next interview is easier and never fails for “no openings”.'});
    if(naked())mn.unshift({l:'bad',c:'act',k:'clothes',t:'👕 You are out of clothes. You can’t work any shift until you buy some (new at the Clothes Mall, or used at the Second-Hand Shop)'+(nakedHap?', and the shame cost you '+Math.abs(nakedHap)+' happiness overnight. It happens again every morning you wake up with nothing to wear.':'.')+(safetyNeeds().clothes&&safetyNeeds().left>0?' You cannot afford any, but the Community Centre can give you a set once this game.':'')});
    if(S.newsPlan&&S.newsPlan.tip)mn.push({l:'rem',c:'act',t:'📡 Tip-off: tonight’s headline is expected to be “'+S.newsPlan.n[0]+'” ('+newsHint(S.newsPlan.n)+'). You have today to move your savings and investments at the Bank.'});
    /* a rank target day passed yesterday without the rank */
    (function(){var i=S.tier+1,due=tierDue(i);if(i<TIERS.length&&due&&S.day===due+1&&reachedTier()<i)mn.push({l:'warn',c:'news',t:'⭐ You missed the day-'+due+' target for '+TIERS[i].ic+' '+TIERS[i].n+'. Its +'+TIERS[i].b.toLocaleString()+' on-time bonus is gone. It still counts as a rank if you reach it'+(maxDays()===Infinity?'':' by day '+maxDays())+'.'+(i+1<TIERS.length&&tierDue(i+1)?' Next target: '+TIERS[i+1].n+' by day '+tierDue(i+1)+'.':'')})})();
    if((S.tickets||[]).some(function(t){return t.draw===S.day}))mn.push({l:'rem',c:'run',k:'lotto',t:'🎟️ Lottery draw tonight (end of day '+S.day+'). Results tomorrow morning.'});
    (function(){var jb=myJob();if(jb&&shutLeft(jb.b)>0)mn.push({l:'bad',c:'run',k:'shut',t:'🔒 The '+NAME[jb.b]+' is closed ('+shutLeft(jb.b)+' day'+(shutLeft(jb.b)>1?'s':'')+' left, counting today). Work is disabled there. Your job as '+jb.rk.r+' stays on record and returns automatically.'})})();
    S.trends.forEach(function(t){if(t.left>0&&(t.term||t.lay||t.r)&&t.card!==S.day-1)mn.push({l:'rem',c:'run',k:'trend:'+t.n,t:'🌐 '+t.n+' · '+t.left+' day'+(t.left>1?'s':'')+' left: '+trendNow(t)+'.'+(t.last?' Latest: '+t.last+'.':'')})});  /* not on a morning after its own night card */
    if(S.inv.fd.v>0.5&&S.inv.fd.lock-S.day===1)mn.push({l:'rem',c:'run',k:'fd',t:'🏦 Your fixed deposit matures tomorrow morning ('+money(Math.round(S.inv.fd.v))+' so far).'});
    if(junkCount()>=CONFIG.illness.junkMeals)mn.push({l:'warn',c:'run',k:'junk',t:'🍟 Junk food '+junkCount()+' times in 5 days. Your chance of falling ill is higher.'});
    if(!S.homeless&&rw2-S.day===1&&S.rentPaid!==rw2)mn.push({l:'rem',c:'act',k:'rent',t:'🏠 Reminder: rent of '+money(rentNext)+' is due at the end of tomorrow (day '+rw2+'). Keep it in cash, or pay early at home.'});
    if(!S.homeless&&rw2-S.day===0&&S.rentPaid!==rw2)mn.push({l:S.cash<rentNext?'bad':'rem',c:'act',k:'rent',t:'🏠 Rent of '+money(rentNext)+' is due tonight. You have '+money(S.cash)+' in cash.'});
    [['casual',WEAR.casual.n],['smart',WEAR.smart.n],['suit',WEAR.suit.n]].forEach(function(c){if(S.clothes[c[0]]>0&&S.clothes[c[0]]<=CONFIG.clothes.wearPerDay)mn.push({l:'rem',c:'act',k:'wear:'+c[0],t:'👕 Your '+c[1]+' wear out tonight. Buy new ones at the Clothes Mall to keep meeting dress codes.'})});
    var burnNote=mn.some(function(a){return /BURNOUT!/.test(a.t)});
    stressList().forEach(function(a){if(!/Rent of/.test(a.t)&&!(burnNote&&/^🔥 Burnout \(/.test(a.t))&&!(naked()&&/out of clothes|nothing to wear/i.test(a.t))){a.c='act';mn.push(a)}});
    mn=tidyMorning(mn);
    S.morning=mn.length?mn:null;
    loc=S.hosp&&S.hosp.inWard?'hosp':S.home;view=null;
    log(S.hosp&&S.hosp.inWard?'A new day starts in the hospital ward.':S.homeless?'A new day starts. You woke up outside, with no home to go back to. You have 24 hours.':'A new day starts. You have 24 hours.');
    nightRank=true;try{done()}finally{nightRank=false}
  }

