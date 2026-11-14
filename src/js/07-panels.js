  /* ==================================================================
     7. PANELS
     Building blocks for compact cards (chip, arow, psec, boxed, more) and the panels map: one function per building.
     ================================================================== */
  /* ---------- compact panel pieces, used by every building ----------
    chip: one number with its icon · more: an ⓘ that opens the explanation · arow: name, chips and button on one line
    psec: a section heading whose ⓘ opens that section's rules (key k, stored as data-sec, keeps it open across re-renders) */
  function chip(k,v,cls){return '<span class="chip'+(cls?' '+cls:'')+'">'+(k?ic(k):'')+v+'</span>'}
  function more(k,label,body){return '<details class="more" data-sec="'+k+'"><summary><i class="ib">i</i>'+label+'</summary><div class="more-b">'+body+'</div></details>'}
  function arow(title,ch,b,note,cls){return '<div class="opt arow'+(cls?' '+cls:'')+'"><div><div class="arow-t">'+title+'</div>'+(ch?'<div class="chipl">'+ch+'</div>':'')+(note?'<div class="arow-n">'+note+'</div>':'')+'</div>'+(b||'')+'</div>'}
  /* each psec starts a card that runs until the next psec (or <!--end-->); boxed() wraps them */
  function boxed(t){var p=t.split('<!--sec-->'),h=p[0];for(var i=1;i<p.length;i++){var e=p[i].split('<!--end-->');h+='<section class="pbox">'+e[0]+'</section>'+(e[1]||'')}return h}
  function psec(k,title,right,info){return '<!--sec--><details class="psec" data-sec="'+k+'"'+(info?'':' data-none="1"')+'><summary><span class="gh">'+title+'</span>'+(info?'<i class="ib" title="Details">i</i>':'')+(right?'<span class="psec-r">'+right+'</span>':'')+'</summary>'+(info?'<div class="more-b">'+info+'</div>':'')+'</details>'}
  function house(h){
    var H=HOUSE[h], cur=S.home===h&&!S.homeless, f=homeFee(h), SL=CONFIG.sleep, rr0=restRate();
    var about=(h==='apt'?'Cheap and cramped.':'Quiet street, big garden, soft bed.')+' Rent is '+money(H.rent)+' '+everyDays(RENT_EVERY)+'. Resting here restores '+H.rate+'% energy an hour and a night’s sleep '+(CONFIG.sleep.perHour[h]||H.rate)+'% for each hour left in the day, '+pctTxt(CONFIG.sleep.comfortBonus)+' more for each comfort item at home (TV, console, fridge, coffee machine, computer)'+(H.hap?'. The bed adds +'+H.hap+' happiness each night you sleep here':'')+'.'+(h==='bung'?' The agent only lets to people with a steady job.':'');
    var bz=burglaryRisk(h),head=psec('about',(cur?'🏠 Your home':'🏠 To rent'),chip('cash',(cur&&flatmate()?money(myRent())+' (your half)':money(H.rent))+' / '+RENT_EVERY+' days')+chip('energy',H.rate+'%/h rest')+chip('energy',(CONFIG.sleep.perHour[h]||H.rate)+'%/h sleep')+(bz?chip('','🔓 Break-ins: '+pctTxt(bz)+' a night','warn'):''),about+(bz?' Break-ins happen here: on about '+pctTxt(bz)+' of nights a burglar may take some of the cash you keep at home (never your bank savings). The Villa is secure.':''));
    if(!cur)return boxed((S.homeless?'<p class="bad arow-n">🏚️ <b>No home.</b> You lost the '+NAME[S.home]+' in the housing bubble. Apply here to move back in.</p>':'')+head+arow(S.homeless?'Apply to rent':'Move in',(f?chip('cash',money(f)+(h==='apt'&&S.homeless?' deposit':'')):chip('','No move-in fee'))+(S.homeless?chip('time',hm(CONFIG.housing.applyMinutes)):''),btn('home',h,S.homeless?'Apply':'Move in',0,h==='bung'&&!!S.flat),h==='bung'&&S.flat?'Ask your housemate to move out at your apartment first. Villas have one occupant.':''));
    var F=S.food,cnt=function(t,test){return F.filter(function(p){return p.t===t&&(!test||test(p))}).length};
    var nb=cnt('basic',function(p){return !p.sp}),np=cnt('prem',function(p){return !p.sp}),nw=cnt('cook',function(p){return !p.sp&&!p.cold}),ncold=cnt('cook',function(p){return !p.sp&&p.cold});
    var nbs=cnt('basic',function(p){return p.sp}),nps=cnt('prem',function(p){return p.sp}),ncs=cnt('cook',function(p){return p.sp}),nsp=nbs+nps+ncs,full=homeFull(),mw=owns('microwave');
    var gain=studyGain(),SS=CONFIG.selfStudy,ci=comfortItems(),nh=SL.napMinutes/60,due=nextRentWeek(),t=head;
    if(flatmate())t+=flatRows();  /* your flatmate: at the top, with what you can do together today */
    /* --- sick --- */
    if(S.ill)t+='<p class="bad arow-n">🤒 <b>'+cap(illShort(ILL[S.ill.k]))+': no work.</b> '+illCure()+'</p>';
    /* --- your things: the shelves only when there is something on them --- */
    var empty=!Object.keys(S.items).some(function(k){return S.items[k]})&&!F.length&&!S.chips&&!(S.tickets||[]).length;
    t+=psec('things','📦 Your things',empty?chip('','Nothing yet'):'','Buy belongings at the Electronics Store or Second-Hand Shop, and meals at the Fresh Market. A fridge holds '+FD.fridgeSpace+' meals and keeps them '+FD.keepDaysFridge+' days; food outside it keeps '+FD.keepDaysRoom+' days, counting the day you buy or cook it. Food that runs out turns spoiled.');
    if(!empty)t+=room();
    /* --- computer: the Bank and Jobs apps at home --- */
    var pcOk=owns('computer');
    t+=psec('pc','💻 Computer',pcOk?chip('','Online at home','ok'):chip('',S.items.computer||S.items.computerold?'Broken':'No computer','warn'),'With a working computer at home you can use the Bank app (savings, investments, offers) and the Jobs app (the Employment Office job board, apply online) without walking. Buy one at the Electronics Store, or a used one at the Second-Hand Shop.')+
      arow('Bank and job hunt from home',pcOk?chip('','🏦 Savings & investments')+chip('','💼 Job board')+chip('','No walk','ok'):chip('','Needs a working computer','warn'),btn('pc','','Open',0,!pcOk));
    /* --- kitchen --- */
    var mealCh=function(g,hap){return chip('time',hm(FD.eatMinutes))+chip('energy','+'+g.en+'%')+chip('happy',sg(hap))+chip('health',sg(g.hp))};
    t+=psec('kitchen','🍳 Kitchen',chip('',S.fed?'✓ Eaten today':'No meal yet',S.fed?'ok':'warn')+chip('','Meals '+S.homeMeals+'/'+FD.homeMealsPerDay),
      'A meal at home counts as today’s meal; you can eat up to '+FD.homeMealsPerDay+' a day here. Meal kit must be cooked: the first meal takes '+hm(FD.cookFirst)+', each extra one '+hm(FD.cookExtra)+' more, and cooking costs '+Math.abs(FD.cookEnergy)+'% energy for every 3 hours. A cooked meal that spent a night in the fridge is cold: reheat it with a microwave ('+hm(FD.reheatMinutes)+') or eat it cold ('+sg(FD.coldHappiness)+' happiness). Spoiled food costs '+Math.abs(FD.spoiledHealth)+' health and has a '+pctTxt(FD.spoiledPoisonChance)+' chance of food poisoning. Chips are junk food: '+CONFIG.illness.junkMeals+' junk servings in 5 days raise your illness risk.');
    if(!(nb+np+nw+ncold+nsp+(S.chips||0)))t+='<p class="arow-n">No food at home. Buy meals at the Fresh Market.</p>';
    if(nw)t+=arow('🍲 Cooked meal × '+nw,mealCh(GROC.basic,GROC.basic.hap),btn('eatc','','Eat 1',0,full));
    if(ncold)t+=arow('🥶 Cold meal × '+ncold,mealCh(GROC.basic,GROC.basic.hap+FD.coldHappiness),'<span class="btnrow">'+(mw?btn('eatc','heat','Reheat & eat 1 · '+hm(FD.eatMinutes+FD.reheatMinutes),0,full):'')+btn('eatc','cold','Eat 1 cold',mw?1:0,full)+'</span>');
    if(np)t+=arow('🍱 Ready-to-eat × '+np,mealCh(GROC.prem,GROC.prem.hap),btn('eatp','','Eat 1',0,full));
    if(nb+nbs){var cb='';for(var n=1;n<=nb+nbs;n++)cb+=btn('cook',String(n),'Cook '+n+' · '+hm(cookMin(n)));  /* every Cook button looks the same */
      t+=arow('🥕 Meal kit × '+nb+(nbs?' + '+nbs+' spoiled':''),chip('energy',sg(cookEn(cookMin(1)))+'% per 3h')+chip('','Keeps '+FD.keepDaysRoom+'d · '+FD.keepDaysFridge+'d in fridge'),'<span class="btnrow">'+cb+'</span>')}
    if(S.chips)t+=arow('🥔 Chips × '+S.chips,chip('time',hm(FD.chips.eatMinutes))+chip('happy',sg(FD.chips.happiness))+chip('energy',sg(FD.chips.energy)+'%')+chip('health',sg(FD.chips.health))+chip('','Junk','warn'),btn('eatchips','','Eat 1'));
    if(ncs+nps){var spb='';if(ncs)spb+=btn('eatc','sp','Eat 1 cooked',1,full);if(nps)spb+=btn('eatp','sp','Eat 1 ready meal',1,full);
      t+=arow('<span class="bad">🤢 Spoiled food × '+(ncs+nps)+'</span>',chip('health',sg(FD.spoiledHealth),'warn')+chip('',pctTxt(FD.spoiledPoisonChance)+' poisoning','warn'),'<span class="btnrow">'+spb+'</span>')}
    if(nsp)t+=arow('🗑️ Throw out spoiled × '+nsp,chip('','No time'),btn('binsp','','Throw out',1));
    /* --- rest and sleep --- */
    t+=psec('rest','😴 Rest & sleep',chip('','Comfort '+ci.length+'/5'),
      'Resting gives '+rr0.toFixed(1)+'% energy an hour now'+(ci.length?' (comfort: '+ci.join(', ')+')':' (a TV, console, fridge, coffee machine or computer at home adds '+pctTxt(CONFIG.sleep.comfortBonus)+' each)')+'. A night’s sleep at home restores '+(Math.round(sleepRate()*10)/10)+'% energy for each hour left in the day, up to '+SL.maxEnergy+'%, plus '+CONFIG.health.sleep.perHour+' health an hour (up to '+CONFIG.health.sleep.max+') and '+SL.happinessPerHour+' happiness per full hour. The nightly change is '+nightTxt()+', so going to bed with more hours left means you wake up fresher. Sleeping anywhere else gives '+pctTxt(SL.awayShare)+' of it.');
    t+=arow('Rest',chip('time',hm(SL.napMinutes))+chip('energy','+'+Math.round(nh*rr0)+'%')+chip('happy',sg(SL.napHappiness)),btn('nap','','Rest '+hm(SL.napMinutes),0,S.ap<SL.napMinutes||S.energy>=100));
    t+=arow('Sleep · end the day',chip('time',hm(S.ap))+chip('energy','+'+sleepGain(S.ap)+'%')+chip('health','+'+sleepHealth(S.ap))+chip('happy','+'+(sleepHap(S.ap)+(H.hap||0))),btn('rest','',sleepLabel()));
    /* --- free time --- */
    var LE=CONFIG.leisure,sk=screenKey(),nc=callsToday();
    t+=psec('fun','🎈 Free time','','Free ways to cheer up at home. Watching a show or playing games needs a working TV or game console. You can call your family '+(LE.call.perDay===1?'once':LE.call.perDay+' times')+' a day. For more, walk or jog at the Park.');
    t+=arow(sk==='console'?'🎮 Play games':'📺 Watch a show',chip('time',hm(LE.screen.minutes))+(LE.screen.energy?chip('energy',sg(LE.screen.energy)+'%'):'')+chip('happy',sg(LE.screen.happiness)),btn('fun','screen',sk==='console'?'Play':'Watch',0,!sk),sk?'':'Needs a TV or game console.');
    t+=arow('📞 Call your family',chip('time',hm(LE.call.minutes))+chip('happy',sg(LE.call.happiness))+(nc>=LE.call.perDay?chip('','✓ Called today','ok'):''),btn('fun','call','Call',0,nc>=LE.call.perDay));
    if(S.mode==='rivals'&&S.rivals&&S.rivals.length)t+=callRows(true)+(flatmate()?'':flatRows());  /* call a rival from home: what a family call costs, plus a relationship roll; invite a flatmate */
    /* --- study and work --- */
    var BU=CONFIG.burnout,lm=loadMin();
    t+=psec('study','📚 Study & work',chip('time',hm(lm)+' / '+loadLimitTxt().replace(' hours','h'),lm>BU.loadMinutes?'warn':''),
      'Self-study needs a phone, tablet or computer; the best one counts (knowledge per session: computer '+SS.gain.computer+', tablet '+SS.gain.tablet+', phone '+SS.gain.phone+'). Each hour of self-study costs '+Math.abs(SS.energyPerHour)+'% energy and '+Math.abs(SS.happinessPerHour)+' happiness and '+Math.abs(SS.healthPerHour)+' health. Under '+SS.minEnergy+'% energy you are too tired. A shift also costs happiness ('+pctTxt(CONFIG.time.workHappinessShare)+' of its energy cost) and '+Math.abs(CONFIG.time.workHealthPerHour)+' health for each hour. Working and studying more than '+loadLimitTxt()+' a day (shifts, lessons and self-study together) for '+dayN(BU.daysInARow)+' running causes burnout'+(S.loadStreak?' (streak: '+S.loadStreak+' of '+BU.daysInARow+')':'')+'. You can work at most '+hm(CONFIG.time.maxWorkMinutes)+' of shifts a day.');
    var sc=selfCost();
    t+=arow('Self-study',gain?chip('time',hm(selfMin()))+chip('energy',sg(sc.en)+'%')+chip('happy',sg(sc.hap))+hpChip(sc.hp)+chip('know','+'+gain):'',btn('study','','Study',0,!gain),gain?'':'Needs a phone, tablet or computer.');
    if(owns('computer')){var J=JOBS.free;t+=arow(J.n+' · '+money(shiftPay(J.pay)),chip('time',hm(J.min))+chip('energy','−'+J.en+'%')+chip('happy','−'+workHap(J.en))+hpChip(workHp(J.min)),btn('work','free','Work a shift'))}
    /* --- rent and bills --- */
    t+=psec('rent','🧾 Rent & bills','',
      'Rent is taken from your cash at the end of day '+due+'. If you are short, the rest goes on a 5-day repayment plan with 10% interest, collected each morning, with a late fee on any missed instalment. Medical bills work the same way.');
    if(S.arrears)t+=arow('<span class="bad">Rent arrears · '+money(S.arrears.bal)+'</span>',chip('cash',money(instal())+' tomorrow','warn'),btn('arrears','','Pay now',0,S.cash<=0));
    t+=S.rentPaid===due?arow('Rent for day '+due,chip('','✓ Paid','ok'),'<span class="tag">Paid</span>'):
      arow('Rent · '+money(myRent())+(myRent()<H.rent?' (your half)':''),chip('','Due end of day '+due,due===S.day?'warn':''),btn('payrent','','Pay rent',0,S.cash<myRent()));
    if(S.medDebt>0)t+=arow('<span class="bad">Medical bills · '+money(S.medDebt)+'</span>',chip('cash',money(medInstal())+' tomorrow','warn'),'');
    return boxed(t);
  }

  /* the Second-Hand Shop's own cards: used clothes and second-hand gadgets */
  function thriftSec(){var U=CONFIG.clothes.used;
    return psec('used','👕 Used clothes',chip('time',hm(M(CONFIG.clothes.buyUnits))+' to buy'),'Second-hand Smart Casual and Business Suits at '+pctTxt(U.priceShare)+' of the Clothes Mall price. They meet the same dress codes as new ones but only last '+U.days+' days (new ones last '+WEAR.smart.w+' to '+WEAR.suit.w+'), and a used suit gives no happiness lift. Buying replaces the outfit of the same kind you already have. No haggling here.')+
        ['smart','suit'].map(function(k){var have=S.clothes[k];
          return arow('Used '+WEAR[k].n+' · '+money(usedPrice(k)),chip('','Lasts '+U.days+' days')+(have?chip('','Yours: '+have+'d left',have<=1?'warn':'ok'):''),btn('ubuy',k,'Buy'))}).join('')+
      psec('shop','🛍️ Second-hand',chip('time',hm(M(2))+' to buy'),'Cheaper than new. Second-hand devices break down more often; repair them at the Electronics Store.'+shopInfo('thrift'))+shop('thrift');
  }
  /* the Second-Hand Shop's Sell & pawn counter (the old Pawn Shop): Sal pays for your things and keeps your tickets */
  function pawnSec(){
    var h='',n=0,t='';
    Object.keys(ITEMS).forEach(function(k){
      if(!S.items[k])return;n++;
      h+=arow(ITEMS[k].ic+' '+ITEMS[k].n+(S.broken[k]?' (broken)':''),chip('cash','Pays '+money(Math.floor(G(ITEMS[k].p)/(S.broken[k]?4:2)))),btn('sell',k,'Pawn it'));
    });
    Object.keys(S.pawned).forEach(function(k){var p=S.pawned[k];
      t+=arow('🎫 '+ITEMS[k].n,chip('cash','Redeem '+money(Math.round(p.g*1.15)))+chip('','Until day '+(p.w+3),S.day>=p.w+3?'warn':''),btn('redeem',k,'Redeem'))});
    return (psec('pawn','💍 Sell & pawn',n?'':chip('','Nothing to pawn'),'Sal at the pawn counter pays half of what you paid (a quarter if it is broken), no questions asked. You can buy it back for 15% more within 3 days; after that Sal keeps it.')+h+(t?psec('tickets','🎫 Your pawn tickets','','')+t:''))
  }
  var panels={
    jobs:function(){
      var mine=Object.keys(S.career).map(function(c){return CAREERS[c].ranks[S.career[c]].r}),E=CONFIG.jobs.experience,shut=Object.keys(S.shut);
      return boxed((shut.length?'<p class="bad arow-n">🔒 <b>Closed:</b> '+shut.map(function(b){return NAME[b]+' ('+S.shut[b]+'d)'}).join(', ')+'. No interviews or shifts there until they reopen.</p>':'')+indOutlook()+
        psec('board','💼 Job board',(mine.length?chip('','Your job: '+mine.join(', '),'ok'):chip('','No job yet','warn'))+(tipOn()?chip('','🤝 Tip','ok'):''),
          'Pay shown is base pay: your actual wage also depends on your knowledge and well-being. Apply here, then work your shifts at the workplace. Openings come and go, and you can only hold one job at a time.'+(E&&E.shifts?' Jobs paying more than '+money(E.payAbove)+' a shift also need work experience: '+E.shifts+' shifts already worked at the same workplace (“Work exp needed”).':'')+' A job without a dress chip needs ordinary clothes (Casual Clothes or better). Green requirements are ones you already meet; 🔒 means you do not meet them all yet. Hover a qualification for its full name.')+
        board())},
    factory:function(){
      var sh=shutLeft('factory')>0,closed=sh?chip('','Closed '+shutLeft('factory')+'d','warn'):'',about='The factory floor hums day and night. Engineers earn far more than line workers. Apply for jobs at the Employment Office.';
      if(facJob())return boxed(psec('factory','🏭 Factory floor',closed,about));
      /* no job here: one card, with the factory's own text at the start of its ⓘ */
      var F=CONFIG.factory,L=F.dayLabour,f=S.fac||{},lt=labourToday()>=L.perDay,en=-L.energy;
      var t=psec('outside','🧰 No job here? You can still',closed||chip('','Open to everyone'),about+' Day labour needs no job and no dress code, but pays '+pctTxt(L.payShare)+' of the lowest Factory wage and does not count as work experience. It counts towards your daily work limit and burnout. The safety course counts as '+F.course.expShifts+' shift'+(F.course.expShifts>1?'s':'')+' of Factory work experience. The course and the tour are once a game.');
      t+=arow('🧰 Day labour on the loading dock · '+money(shiftPay(labourPay())),chip('time',hm(L.minutes))+chip('energy','−'+en+'%')+chip('happy','−'+workHap(en))+hpChip(workHp(L.minutes))+(lt?chip('','✓ Done today','ok'):chip('',L.perDay===1?'Once a day':L.perDay+' a day'))+(naked()?chip('','No clothes','warn'):''),btn('fac','labour','Work',0,sh||lt||!!S.ill||naked()),S.ill?'You are sick and can’t work.':naked()?NAKED:'');
      t+=arow('🦺 Safety course · '+money(G(F.course.cost)),chip('time',hm(F.course.minutes))+chip('know','+'+F.course.knowledge)+chip('','+'+F.course.expShifts+' work exp','ok')+(f.course?chip('','✓ Done','ok'):''),btn('fac','course','Take course',0,sh||!!f.course));
      t+=arow('🚶 Factory tour · '+money(G(F.tour.cost)),chip('time',hm(F.tour.minutes))+chip('know','+'+F.tour.knowledge)+chip('happy','+'+F.tour.happiness)+(f.tour?chip('','✓ Done','ok'):''),btn('fac','tour','Take tour',0,sh||!!f.tour));
      return boxed(t)},
    school:function(){
      var started=Object.keys(TRACKS).filter(inProgress),BU=CONFIG.burnout,lm=loadMin();
      if(S.lastTrack&&started.indexOf(S.lastTrack)>0){started.splice(started.indexOf(S.lastTrack),1);started.unshift(S.lastTrack)}
      /* one row per course: name, progress chips, a thin bar for the level, and the Study button */
      var now=started.map(function(t){
        var T=TRACKS[t],n=S.edu[t],q=posInLevel(t,n),Lm=T.L[q.i],st=q.i?T.c[q.i-1]:0,k=lesDone(t),nl=lesCount(t,n),pc=Math.round(((n-st)+k/nl)/q.of*100);
        var mods=Lm.map(function(m,i){var g=st+i;return (g<n?'✓ ':g===n?'▸ ':'')+m}).join(' · ');
        return arow('<b>📘 '+T.n+' '+T.lv[q.i]+'</b>',chip('','Module '+(n-st+1)+'/'+q.of+' · '+Lm[n-st]+' '+k+'/'+nl,'ok')+chip('time',hm(lesHours(t,n)*60))+chip('energy',sg(lessonCost(lesHours(t,n)).en)+'%')+chip('happy',sg(lessonCost(lesHours(t,n)).hap+groupHap(t)))+hpChip(lessonCost(lesHours(t,n)).hp)+groupChip(t),btn('class',t,'Study'),
          '<span class="nsbar" title="'+mods+'"><i style="width:'+pc+'%"></i></span>','ns-row');
      }).join('');
      var tracks=Object.keys(TRACKS).sort(function(x,y){var f=function(t){return S.edu[t]>0&&!inProgress(t)&&S.edu[t]<totMods(t)?0:1};return f(x)-f(y)}).map(function(t){
        var T=TRACKS[t],n=S.edu[t],lv=lvl(t),tot=totMods(t);
        var title=T.n+(lv?' · 🎓 '+T.lv[lv-1]:''),path='<div class="lvpath">'+T.lv.map(function(L,i){return '<i class="'+(i<lv?'got':'')+'" title="'+L+': '+T.L[i].length+' modules">'+L.slice(0,3)+'</i>'}).join('')+'</div>';
        if(n>=tot)return arow(title+path,chip('','Fully qualified','ok'),'<span class="tag">Done</span>');
        var q=posInLevel(t,n);
        if(inProgress(t))return arow(title+path,chip('','Studying '+T.lv[q.i],'ok'),'<span class="tag">Studying</span>');
        var fee=qualFee(t,n),cont=n>0;
        return arow(title+path,chip('','Next: '+T.lv[q.i],cont?'ok':'')+chip('',q.of+' module'+(q.of===1?'':'s'))+chip('time',lesCount(t,n)+' × '+hm(lesHours(t,n)*60))+(S.cash<fee?chip('cash','Need '+money(fee-S.cash)+' more','warn'):''),btn('enrol',t,'Enrol · '+money(fee),0,S.cash<fee),'',cont?'nextstep':'');
      }).join('');
      return boxed((now?psec('now','📘 Now studying',chip('time',hm(lm)+' / '+loadLimitTxt().replace(' hours','h'),lm>BU.loadMinutes?'warn':'')+(S.burn>0?chip('','Burnt out','warn'):''),
          'Each lesson takes the time shown and costs '+Math.abs(CONFIG.education.lessonEnergyPerHour)+'% energy, '+Math.abs(CONFIG.education.lessonHappinessPerHour)+' happiness and '+Math.abs(CONFIG.education.lessonHealthPerHour)+' health an hour. Attend a lesson at least every few days: '+'3 days without one is a warning, and 5 to 6 days gets you expelled. More than '+loadLimitTxt()+' of work and study a day for '+dayN(BU.daysInARow)+' running causes burnout'+(S.loadStreak?' (streak: '+S.loadStreak+' of '+BU.daysInARow+')':'')+'.')+now:'')+
        psec('tracks','🎓 Pathways',S.expelled>0?chip('','Expelled '+S.expelled+'d','warn'):'','Each pathway is a ladder of qualifications (Certificate → Degree → … → Masters). You pay tuition once when you enrol in a qualification, and earn it by completing all its modules. You can study several pathways at once.')+
        '<div class="jb2">'+tracks+'</div>'+
        psec('tutor','🧑‍🏫 Tutoring',chip('',S.tutorDay===S.day?'Done today':'Once a day',S.tutorDay===S.day?'ok':''),'Teach a student for '+hm(SD().tutor.minutes)+', at most '+(SD().tutor.perDay===1?'once':SD().tutor.perDay+' times')+' a day. You need a completed qualification, and the pay follows your highest one: '+['Certificate','Degree','Honours','Masters'].map(function(L,i){return L+' '+money(SD().tutor.pay[i])}).join(', ')+' (before wages, prices and your productivity). It counts towards the daily work limit and burnout.')+
        (lvl('any')?arow('Tutor a student · '+money(sidePay(tutorPay())),chip('time',hm(SD().tutor.minutes))+chip('energy',sg(SD().tutor.energy)+'%')+chip('happy',sg(SD().tutor.happiness-workHap(-SD().tutor.energy)))+hpChip(workHp(SD().tutor.minutes)),btn('tutor','','Tutor',0,S.tutorDay===S.day))
          :arow('Tutor a student',chip('','Needs a completed qualification','warn'),btn('tutor','','Tutor',0,true))))},
    bank:function(app){
      /* app=true: the 📱 Bank app (panels.bankapp), the same screen without loans */
      /* one equal-sized card per product: title, risk, value, key numbers as chips, amount box, Deposit/Withdraw; the explanation sits behind ⓘ */
      /* amounts move in steps of BK_STEP, never below the product's minimum (see stepAmt) */
      var card=function(title,tag,ch,info,val,inputId,min,label,depAct,wdAct,arg,canWd){
        var amt=bankAmt(inputId,min);
        return '<div class="bk-card" data-bank-id="'+inputId+'" data-minimum="'+min+'"><div class="bk-h"><b>'+title+'</b><span>'+tag+'</span></div>'+
          '<div class="bk-v">'+val+'</div><div class="chipl">'+ch+'</div>'+more('i_'+inputId,'Details',info)+
          '<div class="bk-amt">'+btn('step',inputId+'|-1|'+min,'−',1,amt<=min)+'<input id="'+inputId+'" type="text" readonly value="'+amt+'" aria-label="Amount for '+label+' in dollars">'+btn('step',inputId+'|1|'+min,'+',1)+'</div>'+
          '<div class="bk-b">'+btn(depAct,arg,'Deposit').replace('data-act=', 'data-bank-deposit data-act=')+btn(wdAct,arg,'Withdraw',1,!canWd).replace('data-act=', 'data-bank-withdraw data-act=')+'</div></div>'};
      var loanCard=function(){
        var L=CONFIG.loan;if(!L.enabled)return '';
        var raw=loanLimitRaw(),lim=loanLimit();
        var rules='Your credit limit is '+money(L.baseLimit)+' plus '+L.limitPerAsset+' × your '+loanAssetsTxt()+' ('+money(loanAssets())+')'+(raw>L.maxLoan?', capped at '+money(L.maxLoan):'')+'. Interest is simple and only for the days you keep the loan. Repay from cash any day after the one you borrowed. After the due date the balance grows '+rateTxt(L.overdueRate)+' a day'+(L.overdueCompounds?', compounding':'')+', and the game ends if it is not repaid in full '+dayN(L.graceDays)+' after the due date. One loan at a time; what you owe counts against your net worth.';
        if(!S.loan){
          if(!tenureOf(loanTenure)||tenureOf(loanTenure).days!==+loanTenure)loanTenure=L.tenures[0].days;
          var t=tenureOf(loanTenure),amt=Math.min(bankAmt('amt_loan',L.step),Math.max(L.step,lim));
          var tens=L.tenures.map(function(x){return btn('ltenure',String(x.days),dayN(x.days)+' · '+rateTxt(x.rate)+'/day',x.days===t.days?0:1)}).join('');
          return psec('loan','💳 Loan',chip('cash','Limit '+money(lim)),rules)+'<div class="loanb">'+
            '<div class="bk-ten">'+tens+'</div>'+
            '<div class="bk-v">Borrow '+money(amt)+' → repay <b>'+money(loanTotalIfPaidAt(amt,t))+'</b> by the end of day '+(S.day+t.days)+'</div>'+
            '<div class="bk-amt">'+btn('step','amt_loan|-1|'+L.step+'|'+lim,'−',1,amt<=L.step)+'<input id="amt_loan" type="text" readonly value="'+amt+'" aria-label="Amount to borrow in dollars">'+btn('step','amt_loan|1|'+L.step+'|'+lim,'+',1,amt>=lim)+'</div>'+
            '<div class="bk-b">'+btn('borrow','','Borrow',0,lim<L.step)+'</div></div>';
        }
        var Ln=S.loan,owed=loanOwed(),over=S.day>Ln.due,left=Ln.due-S.day,minR=Math.min(BK_STEP,owed),ramt=Math.min(Math.max(bankAmt('amt_repay',minR),minR),owed);
        var st=over?chip('','Overdue · '+rateTxt(L.overdueRate)+'/day','warn')+chip('','Pay by day '+(Ln.due+L.graceDays),'warn'):chip('','Due end of day '+Ln.due+(left===0?' (tonight)':''),left<=1?'warn':'')+chip('',rateTxt(Ln.rate)+'/day');
        return psec('loan','💳 Loan',chip('',over?'Overdue':'Outstanding',over?'warn':''),'Borrowed '+money(Ln.borrowed)+' on day '+Ln.taken+' for '+dayN(Ln.tenure)+': principal '+money(Ln.principal)+' + interest '+money(Ln.interest)+'. '+(Ln.taken===S.day?'You can start repaying tomorrow. ':'')+rules)+'<div class="loanb">'+
          '<div class="bk-v">You owe <b class="'+(over?'dn':'')+'">'+money(owed)+'</b></div><div class="chipl">'+st+'</div>'+
          '<div class="bk-amt">'+btn('step','amt_repay|-1|'+minR+'|'+owed,'−',1,ramt<=minR)+'<input id="amt_repay" type="text" readonly value="'+ramt+'" aria-label="Amount to repay in dollars">'+btn('step','amt_repay|1|'+minR+'|'+owed,'+',1,ramt>=owed)+'</div>'+
          '<div class="bk-b">'+btn('repay','','Repay',0,S.cash<=0||Ln.taken===S.day)+btn('repayall','','Pay in full · '+money(owed),1,S.cash<owed||Ln.taken===S.day)+'</div></div>';
      };
      var rows=card('Savings account','No risk · no minimum',chip('','+'+S.rate.toFixed(1)+'%/day','ok'),'Safe and simple. Earns '+S.rate.toFixed(1)+'% interest each day; the rate moves with the economy. Withdraw any time.','Balance <b>'+money(S.bank)+'</b>','amt',BK_STEP,'savings','dep','wd','',S.bank>0)+
        INVK.map(function(k){
        var P=INV[k],p=S.inv[k],has=p.v>0.5,o=invOdds(k),e=o.e;
        var ch=k==='fd'?chip('','+'+e.toFixed(1)+'%/day','ok')+chip('','Locked 4 days'):chip('',pctS(e)+'/day',e>0?'ok':'warn')+chip('','Loses '+Math.round(o.loss*100)+'% of days');
        var info=P.d+(k==='fd'?' The rate follows the savings rate.':' A usual day is between '+pctS(o.lo)+' and '+pctS(o.hi)+'. Withdraw any time.');
        var c0=has?Math.round(p.c):0,v0=has?Math.round(p.v):0,pl=v0-c0;
        var v=has?'Worth <b class="'+(pl>0?'up':pl<0?'dn':'')+'">'+money(v0)+'</b> <small>(paid '+money(c0)+')</small>'+(k==='fd'&&S.day<p.lock?'<br><small>Matures on day '+p.lock+'</small>':''):'<small>Not invested</small>';
        return card(P.n,P.risk+' risk · min '+money(P.min),ch,info,v,'amt_'+k,P.min,P.n,'invest','divest',k,has);
      }).join('');
      var mood=S.mkt>0.5?'buoyant':S.mkt<-0.5?'weak':'steady',tip=S.newsPlan&&S.newsPlan.tip&&S.newsPlan.day===S.day;
      var offerCard=function(){
        var o=offerToday(),pr=S.promo;
        if(pr&&pr.v>0.5)return psec('offer','🎁 Promo deposit',chip('',pr.rate.toFixed(1)+'%/day','ok')+chip('','Matures day '+pr.lock),'Locked until it matures, then paid into your cash with its interest.')+
          '<div class="loanb"><div class="bk-v">Worth <b class="up">'+money(Math.round(pr.v))+'</b> <small>(paid '+money(Math.round(pr.c))+')</small></div></div>';
        if(!o)return '';
        var amt=Math.min(bankAmt('amt_offer',o.min),o.max);
        return psec('offer','🎁 Bank offer · today only',chip('',o.rate.toFixed(1)+'%/day','ok')+chip('','Locked '+dayN(o.days)),'A promo deposit, offered today only: '+o.rate.toFixed(1)+'% a day for '+dayN(o.days)+', between '+money(o.min)+' and '+money(o.max)+'. Your money is locked until it matures, then paid into your cash with its interest. One promo deposit at a time.')+
          '<div class="loanb"><div class="bk-v">Put in '+money(amt)+' → get about <b>'+money(Math.round(amt*Math.pow(1+o.rate/100,o.days)))+'</b> on day '+(S.day+o.days)+'</div>'+
          '<div class="bk-amt">'+btn('step','amt_offer|-1|'+o.min+'|'+o.max,'−',1,amt<=o.min)+'<input id="amt_offer" type="text" readonly value="'+amt+'" aria-label="Amount for the promo deposit in dollars">'+btn('step','amt_offer|1|'+o.min+'|'+o.max,'+',1,amt>=o.max)+'</div>'+
          '<div class="bk-b">'+btn('offer','','Take the offer',0,S.cash<o.min)+'</div></div>';
      };
      return boxed((app?appBack():'')+(app?'<p class="arow-n">'+(appFrom==='pc'?'💻':'📱')+' Savings, investments and offers without the walk. 💳 For a loan, visit the Bank in person.</p>':loanCard())+offerCard()+
        psec('invest','📈 Savings and investments',chip('','Market '+mood,mood==='weak'?'warn':mood==='buoyant'?'ok':'')+chip('','Savings '+S.rate.toFixed(1)+'%/day'),econNote()+'<br>'+invNote())+
        (tip?'<p class="arow-n">📡 <b>Tip-off for tonight:</b> “'+S.newsPlan.n[0]+'” ('+newsHint(S.newsPlan.n)+')</p>':'')+
        invTable()+'<div class="bk-grid">'+rows+'</div>')},
    bankapp:function(){return panels.bank(true)},
    jobsapp:function(){return appBack()+panels.jobs()},
    phone:function(){return appHome('📱 Your phone')},
    callsapp:function(){var X=CONFIG.rivals.social;return appBack()+boxed(psec('calls','📞 Call your rivals',chip('time',hm(X.call.phoneMinutes)+' a call'),'Call one rival, or tick several and make one group call: either way it takes '+hm(X.call.phoneMinutes)+' and gives '+sg(X.call.phoneHappiness)+' happiness. Each rival on the call: usually +1 or +2 relationship, sometimes nothing, sometimes −1 (an argument). With a rival you are on bad terms with, it may get tense and make things worse. Each rival once a day.')+
      callRows(false)+'<p class="appback">'+btn('rcall','group','📞 Call selected (group call)')+'</p>')},
    msgsapp:function(){return appBack()+boxed(msgsPanel())},
    gigsapp:function(){return appBack()+boxed(gigsPanel())},
    creatorapp:function(){return appBack()+boxed(creatorPanel())},
    pc:function(){return appHome('💻 Your computer')},
    market:function(){
      /* food sorted by price, cheapest first; the lottery is not food, so it has its own card */
      var cap=fridgeCap(),CH=FD.chips,chLeft=Math.min(CH.maxPerDay-(S.chipsDay||0),CH.maxStored-(S.chips||0)),rows=[];
      var eatCh=function(g){return chip('energy','+'+g.en+'%')+chip('happy',sg(g.hap))+chip('health',sg(g.hp))};
      Object.keys(GROC).forEach(function(k){var g=GROC[k],ic=FOODIC[k],how=k==='prem'?'Ready to eat':'Cook at home';
        rows.push({p:G(g.cost),h:arow(ic+' '+g.n+' · '+money(G(g.cost)),chip('',how)+eatCh(g),btn('groc',k,'Buy 1'))});
        rows.push({p:bundleCost(g),h:arow(ic+' '+FD.bundleSize+'× '+g.n.toLowerCase()+' · '+money(bundleCost(g)),chip('',how)+chip('','Save '+pctTxt(FD.bundleDiscount),'ok')+eatCh(g),btn('bundle',k,'Buy bundle'))})});
      rows.push({p:G(CH.cost),h:arow('🥔 Bag of chips · '+money(G(CH.cost)),chip('happy',sg(CH.happiness))+chip('energy',sg(CH.energy)+'%')+chip('health',sg(CH.health))+chip('','Junk','warn')+chip('','At home '+(S.chips||0)+'/'+CH.maxStored),btn('chips','','Buy',0,chLeft<=0))});
      rows.sort(function(a,b){return a.p-b.p});
      var held=(S.tickets||[]).length;
      return boxed(psec('food','🛒 Food',chip('',(cap?'❄️ Fridge ':'🌡️ No fridge · ')+(cap?FD.fridgeSpace+' meals':FD.keepDaysRoom+' days'),cap?'ok':'warn')+chip('time',hm(M(FD.buyUnits))+' to buy'),
          GROC.basic.n+' must be cooked at home; '+GROC.prem.n.toLowerCase()+'s are ready to eat. Food keeps '+FD.keepDaysRoom+' days outside a fridge and '+FD.keepDaysFridge+' days in one ('+FD.fridgeSpace+' meals fit), counting today. A bundle is '+FD.bundleSize+' meals at '+pctTxt(FD.bundleDiscount)+' off. Chips are a junk snack, not a meal, and never go off: up to '+CH.maxPerDay+' bags a day and '+CH.maxStored+' at home. The numbers show what eating it does.')+
        rows.map(function(r){return r.h}).join('')+
        psec('lotto','🎟️ Lottery',chip('','Draw day '+nextDraw())+(held?chip('','You hold '+held,'ok'):''),'Draws are '+everyDays(LT.drawEveryDays)+'. Prize'+(LT.prizeMin===LT.prizeMax?' '+money(LT.prizeMin):'s '+money(LT.prizeMin)+'–'+money(LT.prizeMax))+'. Results come the morning after the draw.')+
        arow('🎟️ Lottery ticket · '+money(G(LT.ticketCost)),chip('cash',LT.prizeMin===LT.prizeMax?money(LT.prizeMin):money(LT.prizeMin)+'–'+money(LT.prizeMax)),btn('lotto','','Buy ticket')))},
    fast:function(){var j=junkCount(),I=CONFIG.illness;
      return boxed(psec('menu','🍔 Menu',chip('','Junk '+j+'/'+I.junkMeals+' in 5 days',j>=I.junkMeals?'warn':''),'Fast food counts as your daily meal, but eating junk food '+I.junkMeals+' or more times in 5 days raises your chance of falling ill.')+
        arow('🍔 '+cap(TREATS.snack.n)+' · '+money(G(TREATS.snack.cost)),treatCh(TREATS.snack),btn('treat','snack','Buy'))+
        arow('🍟 '+cap(TREATS.meal.n)+' · '+money(G(TREATS.meal.cost)),treatCh(TREATS.meal),btn('treat','meal','Buy combo')))},
    resto:function(){
      return boxed(psec('menu','🍽️ Menu','','A meal here counts as your daily meal ('+TREATS.cafe.n+' is a snack, not a meal). Healthy meals add health and, three in five days, lower your chance of falling ill.')+
        arow(cap(TREATS.cafe.n)+' · '+money(G(TREATS.cafe.cost)),treatCh(TREATS.cafe)+chip('','Not a meal'),btn('treat','cafe','Order'))+
        arow(cap(TREATS.dine.n)+' · '+money(G(TREATS.dine.cost)),treatCh(TREATS.dine),btn('treat','dine','Dine in'))+
        arow(cap(TREATS.feast.n)+' · '+money(G(TREATS.feast.cost)),treatCh(TREATS.feast),btn('treat','feast','Treat yourself')))},
    elec:function(){
      var rep=Object.keys(S.broken).filter(function(k){return S.broken[k]&&S.items[k]}).map(function(k){return arow('🔧 Repair '+ITEMS[k].n.toLowerCase()+' · '+money(G(Math.round(ITEMS[k].p*0.3))),chip('time',hm(M(2))),btn('repair',k,'Repair'),'Out of action until fixed.')}).join('');
      return boxed((rep?psec('repair','🔧 Repairs',chip('','Broken '+Object.keys(S.broken).filter(function(k){return S.broken[k]&&S.items[k]}).length,'warn'),'')+rep:'')+
        psec('shop','🛍️ For sale',chip('time',hm(M(2))+' to buy'),'Everything here shows up in your home once you buy it. Devices add knowledge and happiness every night; a TV or console adds happiness for each hour you rest at home. Comfort items make resting and sleep restore '+pctTxt(CONFIG.sleep.comfortBonus)+' more energy each.'+shopInfo('elec'))+shop('elec'))},
    hosp:function(){
      var t=S.ill?ILL[S.ill.k]:null,st='';
      if(S.hosp&&S.hosp.inWard)st='<p class="bad arow-n"><b>You are warded here today.</b> Released tomorrow morning and billed '+money(S.hosp.bill)+'.</p>';
      else if(S.hosp&&S.hosp.adm)st='<p class="bad arow-n"><b>Admitted for tomorrow.</b> Bill on release: '+money(S.hosp.bill)+'.</p>';
      else if(S.hosp)st='<p class="arow-n">Your treatment bill of '+money(S.hosp.bill)+' is charged tomorrow morning.</p>';
      var hc=chip('health',S.health+'/100',S.health<CONFIG.health.poorBelow?'warn':'')+(t?chip('',cap(illShort(t)),'warn'):chip('','Healthy','ok'))+(S.ins>0?chip('','Insured','ok'):'')+(S.immune>0?chip('','Check-up '+S.immune+'d','ok'):'');
      var h=psec('health','🏥 Your health',hc,(t?'You have '+t.n+' and cannot work. '+illCure()+' ':'Chance of falling ill tonight: about '+(illChance()*100).toFixed(1)+'% (lower with good health, healthy meals and gym visits). ')+
        (S.ins>0?'Life insurance pays '+pctTxt(HP.insuranceCovers)+' of your bills for the rest of the game. ':'')+(S.immune>0?'Illness risk '+checkupWord()+' for '+S.immune+' more day'+(S.immune>1?'s':'')+'. ':'')+(isStaff()?'Staff discount: '+pctTxt(1-HP.staffDiscount)+' off. ':''))+st;
      if(S.medDebt>0)h+=arow('<span class="bad">Medical bills · '+money(S.medDebt)+'</span>',chip('cash',money(medInstal())+' tomorrow','warn')+chip('time',hm(M(1))),btn('paydebt','','Pay now',0,S.cash<=0),'Repaid automatically each morning, with a late fee if you miss one.');
      h+=psec('care','🩺 Treatment','','Treatment always cures you. '+pctTxt(HP.admitChance)+' of the time you are warded for the whole of the next day first (+'+money(medCost(HP.wardDayCost))+' a day). The bill is charged the morning after you are released; whatever your cash cannot cover goes on a repayment plan with '+pctTxt(HP.billInterest)+' interest.');
      if(t&&!S.hosp)h+=arow('Treat '+illShort(t)+' · '+illFeeTxt(t)+(HP.admitChance>0?' + ward':''),chip('time',hm(M(HP.treatUnits)))+chip('',pctTxt(HP.admitChance)+' ward day')+chip('','Pay later','ok'),btn('treat_ill','','Treat'));
      h+=arow('Health check-up · '+money(medCost(HP.checkupCost)),chip('time',hm(M(HP.checkupUnits)))+chip('',(CONFIG.illness.checkupX===0.5?'Illness ½':'Illness −'+pctTxt(1-CONFIG.illness.checkupX))+' · '+HP.checkupDays+'d','ok'),btn('checkup','','Book'));
      h+=arow('Recovery ward · '+money(medCost(HP.wardCost)),chip('time',hm(M(HP.wardUnits)))+chip('health','+'+HP.wardHealth)+chip('energy','+'+HP.wardEnergy+'%')+chip('happy','+'+HP.wardHappiness),btn('ward','','Rest up'));
      h+=arow('Life insurance · '+money(G(HP.insuranceCost)),chip('time',hm(M(HP.insuranceUnits)))+chip('','Covers '+pctTxt(HP.insuranceCovers)+' of bills'),S.ins>0?'<span class="tag">Covered</span>':btn('insure','','Buy'));
      return boxed(h);
    },
    mall:function(){var CC=CONFIG.clothes;
      return boxed(psec('clothes','👔 Clothes',chip('time',hm(M(CC.buyUnits))+' to buy'),'Each outfit lasts a set number of days, then wears out; a new one replaces what you have. Jobs have a dress code. Bargaining takes '+hm(M(CC.bargainUnits))+' and moves the price by '+CC.bargainMin+(CC.bargainMax!==CC.bargainMin?'–'+CC.bargainMax:'')+'% either way: '+pctTxt(CC.bargainWinChance)+' of the time it goes down.')+
        ['casual','smart','suit'].map(function(k){var c=WEAR[k],pr=price(k),have=S.clothes[k];
          return arow(c.n+' · '+money(pr)+(S.offer[k]!=null?' <small>(bargained)</small>':''),chip('','Lasts '+c.w+' days')+(CC[k].happiness?chip('happy','+'+CC[k].happiness,'ok'):'')+(have?chip('','Yours: '+have+'d left',have<=1?'warn':'ok'):''),
            '<span class="btnrow">'+btn('cbuy',k,'Buy')+btn('bargain',k,'Bargain',1,!!S.barg[k])+'</span>')}).join(''))},
    thrift:function(){return boxed(thriftSec()+pawnSec())},
    comm:function(){
      var C=CONFIG.community,row=function(k,ic,title,btnTxt){var c=C[k],cost=G(c.cost||0),dn=commToday(k)>=c.perDay;
        return arow(ic+' '+title+(cost?' · '+money(cost):''),chip('time',hm(c.minutes))+(c.energy?chip('energy',sg(c.energy)+'%'):'')+chip('happy',sg(c.happiness))+(c.knowledge?chip('know',sg(c.knowledge)):'')+(c.tipChance?chip('','🤝 '+pctTxt(c.tipChance)+' job tip'):'')+(dn?chip('','✓ Done today','ok'):''),btn('comm',k,btnTxt,0,dn||S.cash<cost))};
      return boxed(psec('comm','🤝 Tonight at the centre',tipOn()?chip('','🤝 Job tip until day '+S.tip.until,'ok'):chip('','Once a day each'),'Time with other people lifts your mood more than time alone. Each activity can be done once a day. A night out or volunteering can also get you a job tip from a friend: your next interview (here in town or in the Jobs app) is '+Math.round(C.tip.passBonus*100)+'% more likely to pass and never fails for “no openings”, for up to '+dayN(C.tip.days)+'. The tip is used up by that interview.')+
        row('nightOut','🍻','Night out with friends','Go out')+row('karaoke','🎤','Karaoke night','Sing')+row('volunteer','🧡','Volunteer at the centre','Volunteer')+safetyRow()+whoRows()+sabRows('comm'))
    },
    gym:function(){
      var staff=isGymStaff(),n=gymCount();
      return boxed(psec('classes','🏋️ Classes',chip('','Workouts '+n+' in 5 days',n?'ok':'')+(staff?chip('','Staff 50% off','ok'):''),'Each class does something different: yoga and the sauna give energy back, boxing lifts your mood the most, spin is quickest and strength training builds the most health. Every workout in the last 5 days lowers your chance of falling ill (strength training counts as two; the sauna does not count). Under '+CONFIG.gym.minEnergy+'% energy you are too tired for a class that costs energy.<ul class="infol">'+GYM.map(function(g){return '<li><b>'+g.ic+' '+g.n+':</b> '+g.d+'</li>'}).join('')+'</ul>')+
        GYM.map(function(g){var c=gymCost(g),tired=g.en>0&&S.energy<CONFIG.gym.minEnergy;return arow(g.ic+' '+g.n+' · '+money(c),chip('time',hm(g.min))+chip('energy',sg(-g.en)+'%')+chip('health','+'+g.hp)+chip('happy','+'+g.hap)+(g.w>1?chip('','Counts ×'+g.w,'ok'):g.w?'':chip('','Not a workout')),btn('gym',g.k,'Join in',0,S.cash<c||tired),tired?'Too tired for this class.':'')}).join(''))},
    apt:function(){return house('apt')},
    park:function(){
      var LE=CONFIG.leisure,tired=S.energy<LE.jog.minEnergy;
      return boxed(psec('park','🌳 In the park',chip('','Free'),'Free to use, any time. A walk lifts your mood and adds a little health; a jog costs energy but does more for your health. Under '+LE.jog.minEnergy+'% energy you are too tired to jog.')+
        arow('🚶 Walk in the park',chip('time',hm(LE.walk.minutes))+chip('happy',sg(LE.walk.happiness))+chip('health',sg(LE.walk.health)),btn('fun','walk','Walk'))+
        arow('🏃 Go for a jog',chip('time',hm(LE.jog.minutes))+chip('energy',sg(LE.jog.energy)+'%')+chip('happy',sg(LE.jog.happiness))+chip('health',sg(LE.jog.health)),btn('fun','jog','Jog',0,tired),tired?'Too tired to jog.':''))},
    bung:function(){return house('bung')}
  };

  var ORDER=['school','jobs','bung','bank','fast','hosp','resto','mall','apt','gym','elec','comm','thrift','factory','market'];
  function ring(a,b){var d=Math.abs(ORDER.indexOf(a)-ORDER.indexOf(b));return Math.min(d,ORDER.length-d)}
  /* Walking follows physical map distance, quantised to the existing walkMinutes step. */
  function dist(a,b){if(a===b)return 0;var p=TOWN_LAYOUT[a],q=TOWN_LAYOUT[b];if(!p||!q)return ring(a,b);return Math.max(1,Math.round(Math.hypot((p[0]-q[0])*1.5,p[1]-q[1])/TOWN_DIAMETER*Math.ceil(ORDER.length/2)))}

  /* ---- tiny 3D drawing kit: oblique projection, light from the upper left ---- */
  var E=' stroke="rgba(0,0,0,.3)" stroke-width=".6" stroke-linejoin="round"';
  function Rc(x,y,w,h,f,o){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+f+'"'+(o||'')+'/>'}
  function P(p,f,o){return '<polygon points="'+p.join(',')+'" fill="'+f+'"'+E+(o||'')+'/>'}
  function PS(p,f,o){return '<polygon points="'+p.join(',')+'" fill="'+f+'"'+(o||'')+'/>'}
  function box(x,y,w,h,d,f,s,t){
    return P([x+w,y,x+w+d,y-d/2,x+w+d,y+h-d/2,x+w,y+h],s)+P([x,y,x+d,y-d/2,x+w+d,y-d/2,x+w,y],t)+Rc(x,y,w,h,f,E);
  }
  function win(x,y,w,h,f){
    return Rc(x,y,w,h,f||'url(#glass)',E)+PS([x,y+h,x+w*.55,y,x+w*.8,y,x+w*.25,y+h],'#fff',' opacity=".2"');
  }
  function sw(bx,by,d,a,b,h,f){
    return PS([bx+a*d,by-a*d/2,bx+b*d,by-b*d/2,bx+b*d,by-b*d/2+h,bx+a*d,by-a*d/2+h],f||'#34566f');
  }
  function T(x,y,s,fill,txt,tl,o){
    return '<text x="'+x+'" y="'+y+'" font-size="'+s+'" font-weight="800" text-anchor="middle" fill="'+fill+'" textLength="'+tl+'" lengthAdjust="spacingAndGlyphs"'+(o||'')+'>'+txt+'</text>';
  }
  function shade(x,y,rx){return '<ellipse cx="'+x+'" cy="'+y+'" rx="'+rx+'" ry="4" fill="#000" opacity=".3"/>'}
  function SV(w,h,b){return '<svg viewBox="0 0 '+w+' '+h+'" aria-hidden="true">'+b+'</svg>'}
  function loopN(n,fn){var s='';for(var i=0;i<n;i++)s+=fn(i);return s}

