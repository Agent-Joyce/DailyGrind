  /* ==================================================================
     4. PLAYER ACTIONS
     Everything a button can do. Each action spends time (spendMin) and money, changes S, logs what happened (vitPar) and calls done().
     ================================================================== */
  /* ---------- sound + floating feedback ---------- */
  var AC=null,MUTE=false;
  try{MUTE=localStorage.getItem('dailyGrind.mute')==='1'}catch(e){}
  function tone(f,t0,dur,type,vol){
    var o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime+t0;
    o.type=type||'sine';o.frequency.setValueAtTime(f,t);
    g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(vol||0.12,t+0.01);g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
    o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+dur+0.02);
  }
  function snd(k){
    buzz(k);  /* vibration is its own setting (11-feel.js) */
    if(MUTE)return;
    try{
      AC=AC||new (window.AudioContext||window.webkitAudioContext)();
      if(AC.state==='suspended')AC.resume();
      if(k==='coin'){tone(988,0,.09,'square',.05);tone(1319,.07,.18,'square',.05)}
      else if(k==='spend'){tone(420,0,.08,'triangle',.08);tone(300,.05,.1,'triangle',.06)}
      else if(k==='err'){tone(150,0,.18,'sawtooth',.05)}
      else if(k==='day'){tone(523,0,.25,'sine',.08);tone(659,.12,.25,'sine',.08);tone(784,.24,.35,'sine',.08)}
      else if(k==='win'){[523,659,784,1047].forEach(function(f,i){tone(f,i*.12,.3,'triangle',.1)})}
      else if(k==='lose'){[392,330,262].forEach(function(f,i){tone(f,i*.18,.35,'triangle',.09)})}
      else if(k==='tap'){tone(660,0,.035,'sine',.025)}
      else if(k==='learn'){tone(587,0,.1,'sine',.06);tone(880,.09,.16,'sine',.06)}
      else if(k==='eat'){tone(330,0,.07,'triangle',.06);tone(392,.08,.07,'triangle',.06);tone(494,.16,.1,'triangle',.06)}
      else if(k==='night'){[659,523,440,392].forEach(function(f,i){tone(f,i*.2,.45,'sine',.06)})}
      else if(k==='cert'){[523,659,784,1047,1319].forEach(function(f,i){tone(f,i*.1,.32,'triangle',.09)});tone(1568,.55,.6,'sine',.06)}
      else if(k==='ping'){tone(1175,0,.08,'sine',.05);tone(1568,.07,.14,'sine',.04)}
    }catch(e){}
  }
  var PREV=null;
  function floater(txt,cls,i){
    var t=document.querySelector('.tile[data-loc="'+loc+'"]'),bd=$('board');if(!t||!bd)return;
    var a=t.getBoundingClientRect(),b=bd.getBoundingClientRect(),d=document.createElement('div');
    d.className='floater '+cls;d.innerHTML=txt;d.setAttribute('aria-hidden','true');
    d.style.left=(a.left-b.left+a.width/2)+'px';d.style.top=(a.top-b.top+a.height*0.25-i*20)+'px';
    var fs=(CONFIG.ui.floaterSeconds||1.4);d.style.animationDuration=fs+'s';
    bd.appendChild(d);setTimeout(function(){if(d.parentNode)d.parentNode.removeChild(d)},fs*1000+100);
  }
  function feedback(){
    var cur={cash:S.cash,energy:S.energy,happy:S.happy,health:S.health,know:Math.floor(S.know),day:S.day};
    if(PREV&&PREV.day===cur.day){
      var i=0,dc=cur.cash-PREV.cash;
      if(dc){floater(ic('cash')+(dc>0?'+':'−')+money(Math.abs(dc)),dc>0?'up':'dn',i++);snd(dc>0?'coin':'spend')}
      [['energy',ic('energy'),'%'],['happy',ic('happy'),''],['health',ic('health'),''],['know',ic('know'),'']].forEach(function(q){var d=cur[q[0]]-PREV[q[0]];if(d)floater(q[1]+(d>0?'+':'−')+Math.abs(d)+q[2],d>0?'up':'dn',i++)});
    }
    PREV=cur;
  }
  function refuse(msg){log(msg,'bad');snd('err');render();return false}
  function T0(){if(!S.today)S.today={earn:0,spend:0,hits:[],wins:[],nw:worth(),e:S.energy,h:S.happy,hl:S.health,k:S.know,cash:S.cash}}
  /* a good thing that happened today, shown in the next morning's day recap (overnight ones go into the recap being shown) */
  function addWin(t){var a;if(nightRank&&S.summary)a=S.summary.wins=S.summary.wins||[];else{T0();a=S.today.wins=S.today.wins||[]}if(a.length<6)a.push(t)}
  function inc(v){T0();if(v>0)S.today.earn+=v}
  function outg(v){T0();if(v>0)S.today.spend+=v}
  function spend(u,cost){return spendMin(M(u),cost)}
  function spendMin(min,cost){
    if(S.ap<min)return refuse('Not enough time left today (that takes '+hm(min)+', you have '+hm(S.ap)+'). End the day to reset.');
    if(cost>0&&S.cash<cost)return refuse('You can’t afford that. You have '+money(S.cash)+'.');
    S.ap-=min;S.cash-=cost;outg(cost);return true;
  }

  function prod(){
    var m=1,rs=[];
    if(S.happy<20){m*=.6;rs.push('morale crash')}else if(S.happy<25){m*=.75;rs.push('low morale')}else if(S.happy<40){m*=.9;rs.push('dipping morale')}
    if(S.energy<30){m*=.85;rs.push('tiredness')}
    if(S.hungry>0&&!S.fed){m*=FD.hungryPay;rs.push('hunger')}
    if(S.ill){m*=.85;rs.push('illness')}
    if(S.burn>0){m*=CONFIG.burnout.pay;rs.push('burnout')}
    if(S.health<CONFIG.health.poorBelow){m*=CONFIG.health.poorPay;rs.push('poor health')}
    if(S.mode==='rivals'&&sabHas(S,'boss',S.day)){m*=CONFIG.rivals.politics.sabotage.moves.boss.pay;rs.push('someone talked you down to your boss')}
    return {m:m,rs:rs};
  }
  /* what a shift really pays now: base pay x wage/price index x knowledge bonus x any penalty, plus gloves */
  function shiftPay(base){return Math.round(Math.round(base*payIdx()*(1+S.know/400))*prod().m)+(S.items.clothes?GLOVES_PAY:0)}
  function work(k){
    var c=CAREERS[k], rk, j;
    if(c){
      rk=cur(k);
      if(!rk)return refuse('You have no job here yet. Apply at the Employment Office.');
      if(naked())return refuse(NAKED);
      if(shutLeft(bOf(k))>0)return refuse('The '+NAME[bOf(k)]+' is closed for '+shutLeft(bOf(k))+' more day'+(shutLeft(bOf(k))>1?'s':'')+' (counting today). Your job as '+rk.r+' stays on your record and comes back when it reopens.');
      var ef=effort(rk.pay);j={n:rk.r,min:ef.min,pay:rolePay(k,S.career[k]),en:ef.en,dress:rk.dress};
    }else j=JOBS[k];
    if(S.ill)return refuse('You are sick with '+ILL[S.ill.k].n+' and can’t work. '+illCure());
    if(j.dress&&!hasDress(j.dress))return refuse("You don't meet the dress code! This shift needs "+DRESS[j.dress]+'. Visit the Clothes Mall.');
    if(j.computer&&!owns('computer'))return refuse('You need a working computer for freelance work.');
    if(S.energy<20)return refuse('You’re too exhausted to work. Eat or rest first.');
    var capM=CONFIG.time.maxWorkMinutes;
    if((S.workMin||0)+j.min>capM)return refuse('You can work at most '+hm(capM)+' a day. You have already worked '+hm(S.workMin||0)+' today and this shift takes '+hm(j.min)+'. Rest and try again tomorrow.');
    if(!spendMin(j.min,0))return;
    S.workMin=(S.workMin||0)+j.min;
    var pr=prod(), pay=shiftPay(j.pay), low=pr.m<1, v0=vitSnap();
    S.cash+=pay;inc(pay);S.energy=clamp(S.energy-j.en);S.happy=clamp(S.happy-workHap(j.en));S.health=clamp(S.health+workHp(j.min));S.flags.worked=1;
    if(c){if(!S.shiftsAt)S.shiftsAt={};S.shiftsAt[bOf(k)]=(S.shiftsAt[bOf(k)]||0)+1}  /* work experience per workplace */
    log('You worked a shift as '+j.n+' and earned '+money(pay)+vitPar(v0)+'.'+(low?' Productivity was '+Math.round(pr.m*100)+'% ('+pr.rs.join(', ')+').':''),'good');
    done();
  }
  /* ---------- ways to earn outside a job (CONFIG.side): gig delivery, tutoring, the creator path ---------- */
  function SD(){return CONFIG.side}
  function gigState(){if(!S.gig)S.gig={stars:SD().gig.startStars,d:0,runs:0,total:0};if(S.gig.d!==S.day){S.gig.d=S.day;S.gig.runs=0}return S.gig}
  function gigFare(stars){var g=SD().gig;return Math.max(1,g.pay+g.perStar*((stars==null?gigState().stars:stars)-g.baseStars))}
  function sidePay(base){return Math.max(1,Math.round(Math.round(base*payIdx())*prod().m))}  /* wages, prices and your productivity; no knowledge bonus, no gloves */
  function sideBlocked(min){
    if(S.ill)return 'You are sick with '+ILL[S.ill.k].n+' and can’t work. '+illCure();
    if(naked())return NAKED;
    if(S.energy<20)return 'You’re too exhausted to work. Eat or rest first.';
    var capM=CONFIG.time.maxWorkMinutes;
    if((S.workMin||0)+min>capM)return 'You can work at most '+hm(capM)+' a day. You have already worked '+hm(S.workMin||0)+' today.';
    return '';
  }
  function sideWork(min,en,hap){S.workMin=(S.workMin||0)+min;S.energy=clamp(S.energy+en);S.happy=clamp(S.happy-workHap(-en)+(hap||0));S.health=clamp(S.health+workHp(min));S.flags.worked=1}
  function gigRun(){
    var g=SD().gig,st=gigState();
    if(!handheld())return refuse('Delivery runs come through the Gigs app: you need a working phone or tablet.');
    if(st.runs>=g.maxRuns)return refuse('The app has no more runs for you today ('+g.maxRuns+' a day). Try again tomorrow.');
    var why=sideBlocked(g.minutes);if(why)return refuse(why);
    var tired=S.energy<g.lateBelowEnergy;
    if(!spendMin(g.minutes,0))return;
    var v0=vitSnap(),late=tired&&Math.random()<g.lateChance,tip=!late&&Math.random()<g.tipChance?Math.round(G(g.tip[0]+Math.random()*(g.tip[1]-g.tip[0]))):0;
    var pay=sidePay(gigFare()*(late?g.latePay:1))+tip,s0=st.stars;
    st.stars=Math.round(Math.max(g.minStars,Math.min(g.maxStars,st.stars+(late?g.lateStar:g.runStar)))*10)/10;st.runs++;st.total++;
    S.cash+=pay;inc(pay);sideWork(g.minutes,g.energy);
    log('📦 Delivery run '+(late?'arrived late':'done')+': '+money(pay)+(tip?' (with a '+money(tip)+' tip)':'')+vitPar(v0)+'. Rating '+s0.toFixed(1)+' → '+st.stars.toFixed(1)+' ★'+(late?' (you were too tired to keep to time).':'.'),late?'warn':'good');
    done();
  }
  function tutorPay(){var lv=lvl('any');return lv?SD().tutor.pay[Math.min(lv,SD().tutor.pay.length)-1]:0}
  function tutor(){
    var t=SD().tutor;
    if(!lvl('any'))return refuse('You need a completed qualification before a student will pay you to teach.');
    if(S.tutorDay===S.day)return refuse('You have already tutored today. Your student comes back tomorrow.');
    var why=sideBlocked(t.minutes);if(why)return refuse(why);
    if(!spendMin(t.minutes,0))return;
    var v0=vitSnap(),pay=sidePay(tutorPay());
    S.tutorDay=S.day;S.cash+=pay;inc(pay);sideWork(t.minutes,t.energy,t.happiness);
    log('🧑‍🏫 You tutored a student and earned '+money(pay)+vitPar(v0)+'.','good');
    done();
  }
  function creatorState(){if(!S.creator)S.creator={f:0,d:0,posts:0,last:0,earned:0};if(S.creator.d!==S.day){S.creator.d=S.day;S.creator.posts=0}return S.creator}
  function creatorBoost(){return 1+SD().creator.mediaBonus*(TRACKS.media?lvl('media'):0)}
  function creatorPost(){
    var c=SD().creator,st=creatorState();
    if(!handheld()&&!pcHere())return refuse('Posting needs a working phone or tablet, or your computer at home.');
    if(st.posts>=c.maxPosts)return refuse('You have posted '+c.maxPosts+' times today. More would only annoy your followers.');
    var why=sideBlocked(c.minutes);if(why)return refuse(why);
    if(!spendMin(c.minutes,0))return;
    var v0=vitSnap(),viral=Math.random()<c.viralChance,gain=Math.round((c.gain[0]+Math.random()*(c.gain[1]-c.gain[0]))*creatorBoost()*(viral?c.viralX:1));
    st.f+=gain;st.posts++;st.last=S.day;sideWork(c.minutes,c.energy);
    log('🎬 You posted a video'+(viral?' and it went viral':'')+': +'+gain+' followers ('+st.f.toLocaleString()+' now)'+vitPar(v0)+'. Sponsors pay each night.',viral?'good':'');
    done();
  }
  /* overnight: sponsors pay for your followers, and a day without a post loses a few (S.day is already the new day) */
  function creatorTick(){
    var c=SD().creator,st=S.creator;if(!st||!(st.f>0))return;
    var pay=Math.round(st.f*c.perFollower*(1-c.swing+2*c.swing*Math.random())*payIdx());
    if(pay>0){S.cash+=pay;inc(pay);st.earned=(st.earned||0)+pay}
    var lost=0;if(st.last<S.day-1){lost=Math.max(1,Math.round(st.f*c.decay));st.f=Math.max(0,st.f-lost)}
    S.notes.push({l:pay>0?'good':'rem',c:'news',k:'creator',t:'🎬 Sponsors paid '+money(pay)+' overnight for your '+(st.f+lost).toLocaleString()+' followers.'+(lost?' You did not post yesterday: −'+lost+' followers.':'')});
  }
  function gigsPanel(){
    var g=SD().gig,st=gigState(),fare=sidePay(gigFare()),left=g.maxRuns-st.runs,why=!handheld()?'Needs a phone or tablet':left<=0?'No runs left today':'';
    return psec('gigs','📦 Delivery gigs',chip('','★ '+st.stars.toFixed(1))+chip('',left+' of '+g.maxRuns+' runs left',left?'':'warn'),
        'No interview and no dress code: take a run whenever you have the time. A run pays more the higher your rating: '+money(g.pay)+' at '+g.baseStars+' stars, '+money(g.pay+g.perStar)+' at '+g.maxStars+' (before wages, prices and your productivity). Each run on time adds '+g.runStar+' ★. Under '+g.lateBelowEnergy+'% energy a run has a '+Math.round(g.lateChance*100)+'% chance of arriving late: it pays '+Math.round(g.latePay*100)+'% and costs '+Math.abs(g.lateStar)+' ★. Some customers tip. Runs count towards the daily work limit and burnout.')+
      arow('🛵 Take a delivery run · about '+money(fare),chip('time',hm(g.minutes))+chip('energy',sg(g.energy)+'%')+chip('happy','−'+workHap(-g.energy))+hpChip(workHp(g.minutes))+(S.energy<g.lateBelowEnergy?chip('','⚠️ Tired: may be late','warn'):'')+(why?chip('',why,'warn'):''),btn('gig','','Take a run',0,!!why),'','chance')+
      arow('Your record',chip('',st.total+' run'+(st.total===1?'':'s')+' in all')+chip('','Next fare about '+money(fare)),'');
  }
  function creatorPanel(){
    var c=SD().creator,st=creatorState(),left=c.maxPosts-st.posts,lo=Math.round(st.f*c.perFollower*(1-c.swing)*payIdx()),hi=Math.round(st.f*c.perFollower*(1+c.swing)*payIdx()),b=creatorBoost();
    return psec('creator','🎬 Creator studio',chip('','👥 '+st.f.toLocaleString()+' followers')+chip('',left+' of '+c.maxPosts+' posts left',left?'':'warn'),
        'Post videos to build a following. A post gains '+c.gain[0]+' to '+c.gain[1]+' followers, more with Creative Media qualifications (+'+Math.round(c.mediaBonus*100)+'% a level), and a '+Math.round(c.viralChance*100)+'% chance of going viral (×'+c.viralX+'). Every night sponsors pay about '+money(Math.round(100*c.perFollower))+' for each 100 followers, give or take '+Math.round(c.swing*100)+'%. A day without a post loses '+Math.round(c.decay*100)+'% of your followers. Posting counts towards the daily work limit and burnout.')+
      arow('📹 Post a video · +'+Math.round(c.gain[0]*b)+' to '+Math.round(c.gain[1]*b)+' followers',chip('time',hm(c.minutes))+chip('energy',sg(c.energy)+'%')+chip('happy','−'+workHap(-c.energy))+hpChip(workHp(c.minutes))+(b>1?chip('','🎓 Creative Media ×'+b.toFixed(1),'ok'):'')+(left<=0?chip('','Posted enough today','warn'):''),btn('post','','Post',0,left<=0),'','chance')+
      arow('Tonight’s sponsors',st.f?chip('cash',money(lo)+' to '+money(hi))+chip('','Earned so far '+money(st.earned||0)):chip('','No followers yet'),'',st.f&&st.last<S.day?'Post today to keep your followers.':'');
  }
  function apply(id){
    var m=id.split('_'), c=m[0], i=+m[1], rk=CAREERS[c].ranks[i];
    if(S.career[c]!=null&&S.career[c]>=i)return refuse(S.career[c]===i?'You already have that job.':'You already hold a higher position there.');
    if(!meets(rk))return refuse('Not enough education. This job needs '+rk.q.map(qTxt).join(' and ')+'.');
    if(kreq(rk)>Math.floor(S.know))return refuse('Not enough knowledge. This job needs '+kreq(rk)+' (you have '+Math.floor(S.know)+'). Study, invest or learn online.');
    if(shutLeft(bOf(c))>0)return refuse('The '+NAME[bOf(c)]+' is closed for '+shutLeft(bOf(c))+' more day'+(shutLeft(bOf(c))>1?'s':'')+'. No interviews until it reopens.');
    /* every interview takes 1 hour, whatever the result */
    if(!spendMin(60,0))return;
    var who=CAREERS[c].n;
    if(expShort(c,rk)){log('Not enough relevant working experience. '+rk.r+' at the '+who+' needs '+expTxt(c)+'. The 1h interview was wasted.','bad');return done()}
    var tip=tipOn();if(tip)S.tip=null;  /* a friend's tip (Community Centre) is used up by this interview */
    if(S.closed[id]&&!tip&&S.raced&&S.raced[id]){log(S.raced[id]+' got there first. No openings for '+rk.r+' at the '+who+' today. The 1h interview slot was wasted.','warn');return done()}
    if(S.closed[id]&&!tip){log('No openings now for '+rk.r+' at the '+who+'. The 1h interview slot was wasted. Try another day.','warn');return done()}
    var pp=0.82-0.05*i+S.know/400+(S.happy-50)/300-(rk.dress&&!hasDress(rk.dress)?0.25:0)-(S.energy<30?0.1:0)+(S.mode==='rivals'?repInterview(S.rep)+sabInterview(S,S.day):0);  /* the town talks: reputation, and any rumour about you */
    if(tip)pp+=CONFIG.community.tip.passBonus;
    pp=Math.max(0.2,Math.min(0.95,pp));
    if(Math.random()>pp){
      var why=S.mode==='rivals'&&sabInterview(S,S.day)?'Word of a rumour about you had got around.':rk.dress&&!hasDress(rk.dress)?'You turned up without the right clothes.':S.energy<30?'You looked exhausted.':S.happy<35?'Your low mood showed.':['Another candidate had more experience.','You fumbled a tricky question.','The manager wanted someone with more confidence.','You arrived a little late.','They went with an internal hire.'][Math.floor(Math.random()*5)];
      log('Didn’t pass the interview for '+rk.r+' at the '+who+'. '+why+' (1h spent)','bad');return done();
    }
    var old=myJob();
    S.career={};S.career[c]=i;S.jobName=rk.r;S.flags.job=1;
    if(old&&old.c!==c)log('You resigned as '+old.rk.r+' at the '+NAME[old.b]+' to take the new job. You can only hold one job at a time.','warn');
    else if(old)log('You were promoted from '+old.rk.r+'.','good');
    addWin('💼 '+(old&&old.c===c?'Promoted to ':'New job: ')+rk.r);
    log('You passed the interview! You are now a '+rk.r+' at the '+who+' ('+money(Math.round(rolePay(c,i)*payIdx()))+' a shift). Work your shifts at the '+NAME[CAREERS[c].b||c]+'.','good');
    done();
  }
  /* 'a burger' -> 'Burger', 'the chef’s tasting menu' -> 'Chef’s tasting menu' */
  function cap(n){n=String(n).replace(/^(a|an|the) /i,'');return n.charAt(0).toUpperCase()+n.slice(1)}
  function treatHp(t){return t.junk?(t.hp!=null?t.hp:FD.junkHealth):0}
  function treatShown(t){return treatHp(t)+(t.good||0)}  /* health the meal really adds: junk penalty or healthy-meal bonus */
  function treatTxt(t){return hm(treatMin(t))+', +'+t.en+'% energy, +'+t.hap+' happiness'+(treatShown(t)?', '+sg(treatShown(t))+' health':'')}
  function treatCh(t){return chip('time',hm(treatMin(t)))+chip('energy','+'+t.en+'%')+chip('happy','+'+t.hap)+(treatShown(t)?chip('health',sg(treatShown(t))):'')+(t.junk?chip('','Junk','warn'):'')+(t.good?chip('','Healthy','ok'):'')}
  function treat(k){
    var t=TREATS[k];
    var cost=G(t.cost);
    if(!spendMin(treatMin(t),cost))return;
    var v0=vitSnap();
    S.energy=clamp(S.energy+t.en);S.happy=clamp(S.happy+t.hap);if(!t.snack){S.fed=true;S.flags.ate=1}
    if(t.junk){eatJunk();S.health=clamp(S.health+treatHp(t))}
    if(t.good)eatGood(t.good);
    log('You paid '+money(cost)+' for '+t.n+vitPar(v0)+'.'+(t.junk&&junkCount()>=CONFIG.illness.junkMeals?' That is '+junkCount()+' fast-food meals in 5 days: your risk of falling ill is up.':''),t.junk&&junkCount()>=CONFIG.illness.junkMeals?'warn':'');
    done();
  }
  function enrol(t){
    var T=TRACKS[t],n=S.edu[t];if(!T)return;
    if(n>=totMods(t))return refuse('You have completed the whole '+T.n+' pathway.');
    if(inProgress(t))return refuse('You are already enrolled.');
    if(S.expelled>0)return refuse('You were expelled. You can re-enrol in '+S.expelled+' day'+(S.expelled>1?'s':'')+'.');
    var i=levelOf(t,n),fee=qualFee(t,n);
    if(!spendMin(15,fee))return;
    if(!S.enr)S.enr={};S.enr[t]=i;S.les[t]=0;S.enrolled=true;S.sinceClass=0;S.lastTrack=t;
    log('Enrolled in the '+T.n+' '+T.lv[i]+' for '+money(fee)+'. '+(T.L[i].length===1?'Its module and lessons are':'All '+T.L[i].length+' modules and their lessons are')+' now free to attend.','good');
    done();
  }
  function study(t){
    var T=TRACKS[t], n=S.edu[t], tot=totMods(t), lv0=lvl(t);
    if(!T)return;
    if(n>=tot)return refuse('You have already completed the '+T.n+' pathway.');
    if(S.expelled>0)return refuse('You were expelled. You can re-enrol in '+S.expelled+' day'+(S.expelled>1?'s':'')+'.');
    if(S.energy<15)return refuse('You’re too tired to study. Eat or rest first.');
    if(!inProgress(t))return refuse('Enrol in the '+T.n+' '+T.lv[levelOf(t,n)]+' first.');
    if(S.mode==='rivals'&&sabClass(S,S.day))return refuse('Someone booked the last seat in your class today. You can study again tomorrow.');
    var h=lesHours(t,n),cost=0,nl=lesCount(t,n),k=lesDone(t);
    if(!spendMin(h*60,0))return;
    if(!S.les)S.les={};
    var v0=vitSnap();
    var lc=lessonCost(h);
    S.studyMin+=h*60;k++;S.les[t]=k;S.lastTrack=t;S.energy=clamp(S.energy+lc.en);S.happy=clamp(S.happy+lc.hap);S.health=clamp(S.health+lc.hp);S.studied=true;S.flags.study=1;S.sinceClass=0;S.enrolled=true;S.know=clamp(S.know+1);
    studyGroup(t);  /* rival games: friendly rivals on the same pathway study with you */
    var q=posInLevel(t,n);
    if(k<nl){log('Lesson '+k+' of '+nl+' done: "'+T.m[n]+'" ('+T.n+' '+T.lv[q.i]+', '+hm(h*60)+(vitTxt(v0)?'; '+vitTxt(v0):'')+').');return done()}
    S.les[t]=0;S.edu[t]++;S.know=clamp(S.know+2+q.i);
    log('Module complete: "'+T.m[n]+'" ('+T.n+' '+T.lv[q.i]+', module '+q.k+' of '+q.of+(vitTxt(v0)?'; last lesson and module: '+vitTxt(v0):'')+').','good');
    if(lvl(t)>lv0){var ED=CONFIG.education,lvN=T.lv[lvl(t)-1],v1=vitSnap();S.know=clamp(S.know+((ED.certKnowledge||{})[lvN]||0));S.happy=clamp(S.happy+((ED.certHappiness||{})[lvN]||0));var bon=vitTxt(v1);
      log('Qualification earned: '+T.n+' '+T.lv[lvl(t)-1]+'!'+(bon?' Bonus: '+bon+'.':'')+(S.edu[t]<tot?' To continue to the '+T.lv[lvl(t)]+', enrol again at School (tuition '+money(qualFee(t,S.edu[t]))+').':' You have finished the whole pathway.'),'good');S.cert={t:t,l:lvl(t),d:S.day,mods:T.L[lvl(t)-1].slice()};if(bon)forceToast.push({txt:'🎓 '+T.lv[lvl(t)-1]+' bonus: '+bon,cls:'good'});addWin('🎓 '+T.n+' '+T.lv[lvl(t)-1]);snd('win')}
    done();
  }
  /* treatment: nothing to pay now. Usually you are warded all of tomorrow; the bill is charged the morning after release. */
  function treatIll(){
    if(S.hosp)return refuse('You are already booked in for treatment. The bill comes when you are released.');
    if(!S.ill)return refuse('You are not sick.');
    var k=S.ill.k,t=ILL[k];
    if(!spend(HP.treatUnits,0))return;
    var adm=Math.random()<HP.admitChance,days=Math.max(1,HP.wardDays),bill=medCost(illFee(t)+(adm?HP.wardDayCost*days:0));
    if(adm){
      S.hosp={k:k,bill:bill,adm:1,left:days};
      log('The doctor examined you for '+t.n+' and is admitting you: you will be warded in the Hospital for '+(days===1?'the whole of tomorrow':'the next '+dayN(days))+'. You are still sick today (no work). The bill of '+money(bill)+' is charged when you are released.','bad');
    }else{
      S.hosp={k:k,bill:bill,adm:0,left:0};
      var v0=vitSnap();S.ill=null;S.energy=clamp(S.energy+HP.treatEnergy);S.health=clamp(S.health+HP.treatHealth);
      log('Good news: the doctor treated your '+t.n.replace(/^(a|the) /,'')+' and sent you home'+vitPar(v0)+'. You feel much better and can work again. The bill of '+money(bill)+' will be charged tomorrow morning.','good');
    }
    done();
  }
  function checkup(){
    var cost=medCost(HP.checkupCost);
    if(!spend(HP.checkupUnits,cost))return;
    var v0=vitSnap();S.immune=HP.checkupDays;S.health=clamp(S.health+HP.checkupHealth);log('A full check-up for '+money(cost)+'. Your illness risk is '+checkupWord()+' for '+HP.checkupDays+' day'+(HP.checkupDays===1?'':'s')+vitPar(v0)+'.','good');done();
  }
  function ward(){
    var cost=medCost(HP.wardCost);
    if(!spend(HP.wardUnits,cost))return;
    var v0=vitSnap();S.energy=clamp(S.energy+HP.wardEnergy);S.happy=clamp(S.happy+HP.wardHappiness);S.health=clamp(S.health+HP.wardHealth);
    log('You booked into the recovery ward for '+money(cost)+vitPar(v0)+'.','good');done();
  }
  function insure(){
    var cost=G(HP.insuranceCost);
    if(S.ins>0)return refuse('You already have life insurance for the rest of the game.');
    if(!spend(HP.insuranceUnits,cost))return;
    S.ins=1;log('You bought life insurance for '+money(cost)+'. It pays '+pctTxt(HP.insuranceCovers)+' of your hospital bills for the rest of the game.','good');done();
  }
  function payDebt(){
    if(S.medDebt<=0)return refuse('You owe nothing.');
    if(S.cash<=0)return refuse('You have no cash to pay with.');
    if(!spend(1,0))return;
    var p=Math.min(S.cash,S.medDebt);S.cash-=p;outg(p);S.medDebt-=p;if(S.medDebt<=0){S.medDebt=0;S.medDays=0}
    log('You paid '+money(p)+' of your medical bills'+(S.medDebt?'. You still owe '+money(S.medDebt)+'.':'. You are debt free.'),'good');done();
  }
  /* daily rent-arrears instalment; missed payments add a 5% late fee */
  function instal(){var a=S.arrears;return a?Math.ceil(a.bal/Math.max(1,a.days)):0}
  function arrearsTick(){
    var a=S.arrears;if(!a)return;if(a.fresh){a.fresh=0;return}
    var due=instal(),pay=Math.max(0,Math.min(S.cash,due));
    S.cash-=pay;outg(pay);a.bal-=pay;a.days=Math.max(0,a.days-1);
    if(pay<due){var fee=Math.max(1,Math.round((due-pay)*0.05));a.bal+=fee;if(a.days<1)a.days=1;
      S.notes.push({l:'bad',t:'🏠 Missed rent instalment: you paid '+money(pay)+' of '+money(due)+'. A '+money(fee)+' late fee was added. You still owe '+money(a.bal)+'. Earn cash today!'});
      log('Missed rent instalment ('+money(pay)+' of '+money(due)+'). Late fee '+money(fee)+'.','bad');}
    else{log('Rent instalment of '+money(pay)+' paid.'+(a.bal>0?' '+money(a.bal)+' still owed.':' Arrears cleared!'),a.bal>0?'warn':'good');
      if(a.bal>0)S.notes.push({l:'rem',t:'🏠 Rent instalment of '+money(pay)+' paid. '+money(a.bal)+' still owed over '+a.days+' more day'+(a.days>1?'s':'')+' (next: '+money(instal())+').'});}
    if(a.bal<=0)S.arrears=null;
  }
  function payArrears(){
    var a=S.arrears;if(!a)return refuse('You owe no rent.');
    if(S.cash<=0)return refuse('You have no cash.');
    var p=Math.min(S.cash,a.bal);if(!spendMin(15,p))return;a.bal-=p;
    log('You paid '+money(p)+' of your rent arrears.'+(a.bal>0?' '+money(a.bal)+' left.':' All cleared!'),'good');
    if(a.bal<=0)S.arrears=null;done();
  }
  function nap(){
    if(!atHome())return refuse(S.homeless?'You have no home to rest in. Apply at the Apartment or the Bungalow.':'You can only rest at home.');
    var SL=CONFIG.sleep;
    if(!spendMin(SL.napMinutes,0))return;
    var g=Math.round(SL.napMinutes/60*restRate()),v0=vitSnap();S.energy=clamp(S.energy+g);S.happy=clamp(S.happy+SL.napHappiness);
    S.restHrs=(S.restHrs||0)+SL.napMinutes/60;
    log('You rested for '+hm(SL.napMinutes)+' at home'+vitPar(v0)+'.','good');done();
  }
  function payRent(){
    var H=HOUSE[S.home],due=nextRentWeek();
    if(S.rentPaid===due)return refuse('You have already paid rent for day '+due+'.');
    var amt=myRent(due);if(!spendMin(0,amt))return;
    S.rentPaid=due;S.rentPaidAmt=amt;S.flags.rent=1;log('You paid '+money(amt)+' rent early'+(amt<H.rent?' (your half; '+flatmate().name+' pays the other half)':'')+' (covers the end of day '+due+').','good');done();
  }
  /* meal bundle: several portions at a discount (CONFIG.food); they keep like single meals */
  function bundleCost(g){return G(Math.round(g.cost*FD.bundleSize*(1-FD.bundleDiscount)))}
  function fridgeNote(){var F=S.food.filter(function(p){return !p.sp}).length,cap=fridgeCap();
    return !cap?' 🌡️ No working fridge: each meal keeps '+FD.keepDaysRoom+' days, counting today.':F>cap?' ❄️ Your fridge is full ('+cap+'/'+cap+'): '+(F-cap)+' meal'+(F-cap>1?'s stay':' stays')+' outside and keep'+(F-cap>1?'':'s')+' '+FD.keepDaysRoom+' days. Choose what goes in the fridge at home.':' ❄️ In the fridge ('+inFridge()+'/'+cap+'): keeps '+FD.keepDaysFridge+' days, counting today.'}
  function buyBundle(k){
    var g=GROC[k],cost=bundleCost(g);
    if(!spend(FD.buyUnits,cost))return;
    for(var i=0;i<FD.bundleSize;i++)S.food.push({t:k,u:0});
    fridgeSync();
    log('You bought a '+FD.bundleSize+'-day bundle of '+(k==='prem'?'ready-to-eat meals':'meal prep')+' for '+money(cost)+'.'+fridgeNote()+(k==='basic'?' Cook it at home.':''));
    done();
  }
  /* junk food: cheering but unhealthy. 3+ servings in 5 days raises illness risk */
  function junkCount(){return (S.junk||[]).filter(function(d){return S.day-d<5}).length}
  function eatJunk(){if(!S.junk)S.junk=[];S.junk.push(S.day);S.junk=S.junk.filter(function(d){return S.day-d<5})}
  /* chips: bought at the Supermarket (CONFIG.food.chips limits), eaten at home; vitals change only when eaten */
  function chips(){
    var CH=FD.chips;
    if((S.chipsDay||0)>=CH.maxPerDay)return refuse('The Supermarket sells '+numWord(CH.maxPerDay)+' bags of chips a day per customer. Come back tomorrow.');
    if((S.chips||0)>=CH.maxStored)return refuse('You already have '+CH.maxStored+' bags of chips at home. Eat some first.');
    if(!spend(CH.units,G(CH.cost)))return;
    S.chips=(S.chips||0)+1;S.chipsDay=(S.chipsDay||0)+1;
    log('You bought a bag of chips for '+money(G(CH.cost))+'. Eat it at home ('+S.chips+' at home; '+(CH.maxPerDay-S.chipsDay)+' more you can buy today).');
    done();
  }
  function eatChips(){
    var CH=FD.chips;
    if(!atHome())return refuse(S.homeless?'Your chips are in storage until you have a home again.':'Your chips are at home.');
    if(!S.chips)return refuse('You have no chips at home. Buy some at the Supermarket.');
    if(!spendMin(CH.eatMinutes,0))return;
    S.chips--;
    var v0=vitSnap();S.happy=clamp(S.happy+CH.happiness);S.energy=clamp(S.energy+CH.energy);S.health=clamp(S.health+CH.health);eatJunk();
    log('You munched a bag of chips'+vitPar(v0)+'. Not great for your health.'+(junkCount()>=CONFIG.illness.junkMeals?' Too much junk food lately: you are more likely to fall ill.':''),junkCount()>=CONFIG.illness.junkMeals?'warn':'');
    done();
  }
  /* lottery: draws on day 5, 10, 15… results announced the next morning */
  var LT=CONFIG.lottery;
  function nextDraw(){return Math.ceil(S.day/LT.drawEveryDays)*LT.drawEveryDays}
  function buyTicket(){
    if((S.tickets||[]).length>=LT.maxTickets)return refuse(cap(numWord(LT.maxTickets))+' ticket'+(LT.maxTickets===1?'':'s')+' per draw is the limit.');
    if(!spend(LT.ticketUnits,G(LT.ticketCost)))return;
    S.tickets.push({draw:nextDraw()});
    log('You bought a lottery ticket for '+money(G(LT.ticketCost))+'. The draw is at the end of day '+nextDraw()+'; results on the morning of day '+(nextDraw()+1)+'.');
    done();
  }
  function lottoDraw(){
    var due=S.tickets.filter(function(t){return t.draw<S.day});if(!due.length)return;
    S.tickets=S.tickets.filter(function(t){return t.draw>=S.day});
    var won=0;due.forEach(function(){if(Math.random()<LT.winChance)won+=LT.prizeMin+Math.floor(Math.random()*(LT.prizeMax-LT.prizeMin+1))});
    if(won){S.cash+=won;inc(won);S.happy=clamp(S.happy+LT.winHappiness);S.notes.push({l:'good',t:'🎟️ Lottery result (day '+(S.day-1)+' draw): you WON '+money(won)+'! It has been added to your cash.'});log('Lottery win! '+money(won)+'.','good')}
    else{S.notes.push({l:'rem',t:'🎟️ Lottery result (day '+(S.day-1)+' draw): no luck with your '+due.length+' ticket'+(due.length>1?'s':'')+' this time.'});log('Your lottery ticket'+(due.length>1?'s':'')+' did not win.')}
  }
  function buyGroc(k){
    var g=GROC[k],cost=G(g.cost);
    if(!spend(FD.buyUnits,cost))return;
    S.food.push({t:k,u:0});
    fridgeSync();
    log('You bought '+(k==='prem'?'a ready-to-eat meal':'meal prep')+' for '+money(cost)+'.'+fridgeNote()+(k==='basic'?' Cook it at home.':''));
    done();
  }
  /* meal prep must be cooked (choose how many meals to cook); ready-to-eat meals need no cooking.
    Food keeps longer in a fridge (CONFIG.food.keepDays*). */
  function cookMin(n){return FD.cookFirst+(n-1)*FD.cookExtra}
  /* vital costs that scale with time (CONFIG): cooking, lessons, self-study, walking and work */
  function cookEn(min){return Math.round(min/180*FD.cookEnergy)}
  function lessonCost(h){var E=CONFIG.education;return {en:Math.round(h*E.lessonEnergyPerHour),hap:Math.round(h*E.lessonHappinessPerHour),hp:hourHp(h*60,E.lessonHealthPerHour)}}
  function selfMin(){return CONFIG.selfStudy.minutes}
  function selfCost(){var SS=CONFIG.selfStudy,h=selfMin()/60;return {en:Math.round(h*SS.energyPerHour),hap:Math.round(h*SS.happinessPerHour),hp:hourHp(selfMin(),SS.healthPerHour)}}
  function walkEn(min){return Math.round(min/CONFIG.time.walkMinutes*(CONFIG.time.walkEnergy||0))}
  function workHap(en){return Math.ceil(en*(CONFIG.time.workHappinessShare||0))}
  /* health that an hour-based activity costs: minutes x rate per hour, rounded with a half going to a whole point */
  function hourHp(min,rate){var x=min/60*(rate||0);return x<0?-Math.round(-x):Math.round(x)}
  function workHp(min){return hourHp(min,CONFIG.time.workHealthPerHour)}
  function hpChip(v){return v?chip('health',sg(v)):''}
  /* spoiled food (gone off without a fridge) can still be eaten, but it hurts your health and may poison you */
  function eatSpoiled(what,g){
    if(Math.random()<FD.spoiledPoisonChance)return poison(what.replace(/^an? /,''));
    var v0=vitSnap();S.energy=clamp(S.energy+g.en);S.happy=clamp(S.happy+FD.spoiledHappiness);S.health=clamp(S.health+FD.spoiledHealth);S.fed=true;S.flags.ate=1;
    log('You ate '+what+' that had gone off. It filled you up, but it was a bad idea'+vitPar(v0)+'.','warn');
  }
  function spoiledCount(){return S.food.filter(function(p){return p.sp}).length}
  function binSpoiled(){
    var n=spoiledCount();if(!n)return refuse('Nothing in your kitchen has gone off.');
    S.food=S.food.filter(function(p){return !p.sp});
    log('You threw out '+n+' spoiled food item'+(n>1?'s':'')+'.');done();
  }
  /* choose what goes in the fridge (only when there is more food than space) */
  function fridgeToggle(i){
    var p=S.food[+i],cap=fridgeCap();
    if(!p||p.sp)return refuse('Spoiled food cannot go in the fridge.');
    if(!cap)return refuse('You have no working fridge.');
    var fresh=S.food.filter(function(q){return !q.sp}).length;
    if(fresh<=cap)return refuse('Everything already fits in the fridge.');
    var nm=FOODN[p.t]().toLowerCase();
    if(p.f){p.pk=0;p.ex=1;fridgeSync();
      log('You took a '+nm+' out of the fridge. Outside it keeps '+foodLeft(p,0)+' more day'+(foodLeft(p,0)===1?'':'s')+'.')}
    else{if(S.food.filter(function(q){return q.pk}).length>=cap)return refuse('Your fridge is full of food you chose. Take something out first.');
      p.pk=1;p.ex=0;fridgeSync();log('You put a '+nm+' in the fridge. It keeps '+foodLeft(p,1)+' more day'+(foodLeft(p,1)===1?'':'s')+'.')}
    render();
  }
  function poison(what){
    var v0=vitSnap(),c=charge(medCost(FD.poisonCost));S.energy=clamp(S.energy+FD.poisonEnergy);S.health=clamp(S.health+FD.poisonHealth);S.fed=true;S.flags.ate=1;
    log('The '+what+' had gone off. Food poisoning!'+vitPar(v0)+'. A clinic visit: '+billText(c)+'.','bad');
  }
  function cook(n){
    n=Math.max(1,Math.floor(+n||1));
    /* fresh meal prep is cooked first (fewest days left first); spoiled prep makes spoiled meals */
    var preps=S.food.filter(function(p){return p.t==='basic'}).sort(function(a,b){return ((a.sp?1:0)-(b.sp?1:0))||(foodLeft(a)-foodLeft(b))});
    if(!preps.length)return refuse(S.food.some(function(p){return p.t==='prem'})?'Ready-to-eat meals need no cooking: just eat them. Buy meal prep to cook.':'You have no meal prep. Buy some at the Supermarket first.');
    n=Math.min(n,preps.length);
    if(!spendMin(cookMin(n),0))return;
    var v0=vitSnap();S.energy=clamp(S.energy+cookEn(cookMin(n)));
    var take=preps.slice(0,n),bad=0,good=0;
    take.forEach(function(p){if(p.sp)bad++;else good++});
    S.food=S.food.filter(function(p){return take.indexOf(p)<0});
    /* a cooked meal's keep-days start again on the day it is cooked */
    for(var k=0;k<good;k++)S.food.push({t:'cook',u:0});
    for(var k2=0;k2<bad;k2++)S.food.push({t:'cook',u:FD.keepDaysFridge,sp:1});
    fridgeSync();S.flags.cooked=1;
    if(bad)log('You cooked '+bad+' portion'+(bad>1?'s':'')+' of spoiled meal prep anyway. '+(bad>1?'They are':'It is')+' still spoiled: eating '+(bad>1?'them':'it')+' will cost you '+Math.abs(FD.spoiledHealth)+' health a meal.','warn');
    if(good)log('You cooked '+good+' meal'+(good>1?'s':'')+' in '+hm(cookMin(n))+vitPar(v0)+'. Eat '+(good>1?'them':'it')+' now, or keep '+(good>1?'them':'it')+' at home.'+fridgeNote()+(owns('fridge')?' Meals from the fridge are cold the next day: '+(owns('microwave')?'your microwave reheats one in '+hm(FD.reheatMinutes)+'.':'without a microwave you eat them cold ('+sg(FD.coldHappiness)+' happiness).'):''),'good');
    done();
  }
  function homeFull(){return S.homeMeals>=FD.homeMealsPerDay}
  /* arg: '' = a warm cooked meal, 'heat' = reheat a cold one in the microwave, 'cold' = eat a cold one cold, 'sp' = a spoiled one */
  function spoiledIdx(t){var r=-1;S.food.forEach(function(p,i){if(r<0&&p.t===t&&p.sp)r=i});return r}
  function eatCooked(arg){
    var sp=arg==='sp',cold=arg==='heat'||arg==='cold';
    var i=sp?spoiledIdx('cook'):nextFood('cook',function(p){return !!p.cold===cold});
    if(i<0)return refuse(sp?'You have no spoiled meals.':cold?'You have no cold cooked meals.':S.food.some(function(p){return p.t==='cook'&&!p.sp})?'Your cooked meals are cold from the fridge. Reheat one or eat it cold.':S.food.some(function(p){return p.t==='cook'})?'Your only cooked meals have gone off. Eat them anyway, or throw them out.':'You have no cooked meals. Cook some meal prep first.');
    if(arg==='heat'&&!owns('microwave'))return refuse('You need a working microwave to reheat food. Eat it cold, or buy one at the Electronics Store.');
    if(homeFull())return refuse('You are full: '+numWord(FD.homeMealsPerDay)+' home meal'+(FD.homeMealsPerDay===1?'':'s')+' a day is plenty.');
    if(!spendMin(FD.eatMinutes+(arg==='heat'?FD.reheatMinutes:0),0))return;
    var c=S.food.splice(i,1)[0],g=GROC.basic;S.homeMeals++;fridgeSync();
    if(c.sp)return (eatSpoiled('a cooked meal',g),done());
    var v0=vitSnap();S.energy=clamp(S.energy+g.en);S.happy=clamp(S.happy+g.hap+(arg==='cold'?FD.coldHappiness:0));S.fed=true;S.flags.ate=1;eatGood(g.hp);
    log(arg==='heat'?'You reheated a meal from the fridge in the microwave and ate it'+vitPar(v0)+'.':arg==='cold'?'You ate a cold meal straight from the fridge. Filling, but not much fun'+vitPar(v0)+'.':'You ate a home-cooked meal'+vitPar(v0)+'.','good');
    done();
  }
  function eatPrem(arg){
    var sp=arg==='sp',i=sp?spoiledIdx('prem'):nextFood('prem');
    if(i<0)return refuse(sp?'You have no spoiled ready-to-eat meals.':'You have no fresh ready-to-eat meals. Buy some at the Supermarket.');
    if(homeFull())return refuse('You are full: '+numWord(FD.homeMealsPerDay)+' home meal'+(FD.homeMealsPerDay===1?'':'s')+' a day is plenty.');
    if(!spendMin(FD.eatMinutes,0))return;
    var p=S.food.splice(i,1)[0],g=GROC.prem;S.homeMeals++;fridgeSync();
    if(p.sp)return (eatSpoiled('a ready-to-eat meal',g),done());
    var v0=vitSnap();S.energy=clamp(S.energy+g.en);S.happy=clamp(S.happy+g.hap);S.fed=true;S.flags.ate=1;eatGood(g.hp);
    log('You ate a ready-to-eat meal at home, no cooking needed'+vitPar(v0)+'.','good');
    done();
  }
  /* knowledge per self-study session: the best device you own (CONFIG.selfStudy.gain) */
  function studyGain(){var g=CONFIG.selfStudy.gain,b=0;['computer','tablet','phone'].forEach(function(k){if(owns(k))b=Math.max(b,g[k]||0)});return b}
  function selfStudy(){
    var SS=CONFIG.selfStudy,gain=studyGain();
    if(!gain)return refuse('You need a computer, tablet or phone to learn at home.');
    if(S.energy<SS.minEnergy)return refuse('You’re too tired to study. Eat or rest first.');
    if(!spendMin(selfMin(),0))return;
    var sc=selfCost(),v0=vitSnap();S.energy=clamp(S.energy+sc.en);S.happy=clamp(S.happy+sc.hap);S.health=clamp(S.health+sc.hp);S.know=clamp(S.know+gain);S.studyMin+=selfMin();
    log('You spent '+hm(selfMin())+' studying online at home'+vitPar(v0)+'.'+(loadMin()>CONFIG.burnout.loadMinutes?' That makes more than '+loadLimitTxt()+' of work and study today.':''),'good');
    done();
  }
  function repair(k){
    var it=ITEMS[k],c=G(Math.round(it.p*0.3));
    if(!S.broken[k])return refuse('That is not broken.');
    if(!spend(2,c))return;
    delete S.broken[k];
    log('Kenji repaired your '+it.n.toLowerCase()+' for '+money(c)+'.','good');
    done();
  }
  function redeem(k){
    var t=S.pawned[k];if(!t)return refuse('No pawn ticket for that.');
    var c=Math.round(t.g*1.15);
    if(!spend(1,c))return;
    S.items[k]=1;delete S.pawned[k];
    log('You redeemed your '+ITEMS[k].n.toLowerCase()+' for '+money(c)+'.','good');
    done();
  }
  function buy(k){
    var it=ITEMS[k];
    if(S.items[k])return refuse('You already own the '+it.n+'.');
    var pr=G(it.p);
    if(!spend(2,pr))return;
    S.items[k]=1;S.flags.buy=1;
    log('You bought the '+it.n+' for '+money(pr)+'. '+it.d+'.');
    done();
  }
  function sell(k){
    var it=ITEMS[k];
    if(!S.items[k])return refuse('You don’t own that.');
    var g=Math.floor(G(it.p)/(S.broken[k]?4:2));
    S.items[k]=0;delete S.broken[k];S.pawned[k]={w:S.day,g:g};S.cash+=g;
    log('You pawned the '+it.n+' for '+money(g)+'. Redeem it within 3 days for '+money(Math.round(g*1.15))+'.');
    done();
  }
  var INV={
    fd:{n:'Fixed deposit',risk:'Low',min:100,know:0,dev:'',d:'Guaranteed, tracks bank interest. Matures after 4 days: principal plus interest is paid into your cash automatically. Withdrawing early forfeits the interest and costs a 3% penalty.'},
    etf:{n:'Index ETF',risk:'Medium',min:50,know:10,dev:'phone|tablet|computer',d:'Follows the market. Needs Knowledge 10 and a phone, tablet or computer.'},
    hf:{n:'Hedge fund',risk:'High',min:500,know:30,dev:'computer',d:'Big swings both ways. Needs Knowledge 30 and a computer.'},
    cry:{n:'Cryptocurrency',risk:'Extreme',min:20,know:15,dev:'phone|tablet|computer',d:'Wild swings: it can jump or crash 40%+ in a single day. Needs Knowledge 15 and a phone, tablet or computer.'}
  };
  var INVK=['fd','etf','hf','cry'];
  function expRet(k){
    var M=CONFIG.market,R=M.returns,adj=-(S.rate-M.rateBase)*((M.rateBeta||{})[k]||0);
    return k==='fd'?S.rate*R.fdOverSavings:R[k].base+R[k].mood*S.mkt+adj}
  var VOL={fd:0,etf:3,hf:8,cry:22},CAP={fd:[-30,35],etf:[-30,35],hf:[-30,35],cry:[-60,90]};
  /* investment odds for the Bank screen, from the same numbers tickInv uses: a usual day (2 days in 3) is expected ± VOL, within CAP */
  function phi(x){var t=1/(1+0.2316419*Math.abs(x)),p=0.3989423*Math.exp(-x*x/2)*t*(0.3193815+t*(-0.3565638+t*(1.781478+t*(-1.821256+t*1.330274))));return x>0?1-p:p}
  function invOdds(k){var e=expRet(k),v=VOL[k];return {e:e,lo:Math.max(CAP[k][0],e-v),hi:Math.min(CAP[k][1],e+v),loss:v?phi(-e/v):(e<0?1:0)}}
  function pctS(x){return (x<0?'−':'+')+Math.abs(x).toFixed(1)+'%'}
  function invTable(){
    var row=function(n,o,note){return '<tr><td>'+n+'</td><td class="'+(o.e>0?'up':o.e<0?'dn':'')+'">'+pctS(o.e)+'</td><td>'+(o.lo===o.hi?pctS(o.lo):pctS(o.lo)+' to '+pctS(o.hi))+'</td><td>'+(note||Math.round(o.loss*100)+'%')+'</td></tr>'};
    var sv={e:S.rate,lo:S.rate,hi:S.rate,loss:0};
    return '<div class="bk-cmp-w"><table class="bk-cmp"><caption>How they compare today</caption><tr><th>Product</th><th>Expected return</th><th>Usual daily range</th><th>Probability of Loss</th></tr>'+
      row('Savings',sv,'none')+INVK.map(function(k){return row(INV[k].n,invOdds(k),k==='fd'?'none':'')}).join('')+
      '</table></div>'}
  function invNote(){return 'Expected return = average change a day. Usual daily range = where a day’s change lands 2 days in 3. Probability of loss = the chance it falls on any one day. The fixed deposit is locked for 4 days. These follow market mood and interest rates, so they change every day. On a bad news night the swing can be bigger than the usual range.'}
  function nrm(){var u=1-Math.random(),v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)}
  function sm(x){return (x<0?'−':'+')+money(Math.abs(Math.round(x)))}
  function tickInv(){
    S.mkt=clampMkt(S.mkt*CONFIG.market.dailyCalm+rr(-CONFIG.market.dailyNoise,CONFIG.market.dailyNoise));
    var before=0,after=0;
    INVK.forEach(function(k){
      var p=S.inv[k];if(!p||p.v<=0.5){if(p){p.last=0;p.lp=0}return}
      var r=expRet(k)+VOL[k]*nrm();
      r=Math.max(CAP[k][0],Math.min(CAP[k][1],r));
      var b=p.v;p.v=b*(1+r/100);p.last=p.v-b;p.lp=r;before+=b;after+=p.v;
    });
    var pr=S.promo;if(pr&&pr.v>0.5){var pb=pr.v;pr.v=pb*(1+pr.rate/100);pr.last=pr.v-pb;before+=pb;after+=pr.v}
    S.wk={abs:after-before,pct:before?(after-before)/before*100:0};
    if(pr&&S.day>=pr.lock){var pout=Math.round(pr.v),pgain=pout-Math.round(pr.c);S.cash+=pout;inc(Math.max(0,pgain));
      S.notes.push({l:'good',t:'🎁 Your promo deposit matured: '+money(pout)+' (including '+money(pgain)+' interest) has been paid into your cash.'});
      log('Promo deposit matured: '+money(pout)+' paid into your cash ('+sm(pgain)+' interest).','good');S.promo=null}
    /* fixed deposit matures: pay principal + interest into cash */
    var fd=S.inv.fd;
    if(fd.v>0.5&&fd.lock&&S.day>=fd.lock){var out=Math.round(fd.v),gain=out-Math.round(fd.c);S.cash+=out;inc(Math.max(0,gain));
      S.notes.push({l:'good',t:'🏦 Your fixed deposit matured: '+money(out)+' (including '+money(gain)+' interest) has been paid into your cash.'});
      log('Fixed deposit matured: '+money(out)+' paid into your cash ('+sm(gain)+' interest).','good');fd.v=0;fd.c=0;fd.lock=0;fd.last=0;fd.lp=0}
    if(before)log('Your investments moved '+sm(after-before)+' ('+(S.wk.pct>=0?'+':'−')+Math.abs(S.wk.pct).toFixed(1)+'%) today.',after>=before?'good':'bad');
  }
  function invest(k){
    var P=INV[k],p=S.inv[k],box=$('amt_'+k),n=Math.floor(Number(box?box.value:0));
    if(!(n>0))return refuse('Enter an amount to put into the '+P.n.toLowerCase()+'.');
    if(n<P.min)return refuse('Amount too low: the minimum for '+(/^[aeiou]/i.test(P.n)?'an ':'a ')+P.n.toLowerCase()+' is '+money(P.min)+' and you entered '+money(n)+'. Nothing was invested.');
    if(S.know<P.know)return refuse('Not enough knowledge. The '+P.n.toLowerCase()+' needs Knowledge '+P.know+' (you have '+Math.floor(S.know)+').');
    if(P.dev&&!P.dev.split('|').some(owns))return refuse('You need a working '+P.dev.replace(/\|/g,', ').replace(/, ([a-z]+)$/,' or $1')+' to trade online.');
    if(n>S.cash)return refuse('You only have '+money(S.cash)+' in cash.');
    if(!spend(1,n))return;
    S.today.spend-=n;
    p.c+=n;p.v+=n;if(k==='fd')p.lock=S.day+4;
    if(k==='fd')log('Your fixed deposit matures on the morning of day '+p.lock+'.');
    if(!p.seen){p.seen=1;var v0=vitSnap();S.know=clamp(S.know+3);log('Investing in a '+P.n.toLowerCase()+' taught you something'+vitPar(v0)+'.','good')}
    log('You invested '+money(n)+' in '+P.n.toLowerCase()+'.');
    done();
  }
  /* the Bank's promo deposit for today (CONFIG.bank.offers): one at a time, locked until it matures */
  function offerToday(){var o=S.bankOffer;return o&&o.day===S.day?o:null}
  function buyOffer(){
    var o=offerToday();if(!o)return refuse('There is no bank offer today.');
    if(S.promo)return refuse('You already have a promo deposit. It matures on the morning of day '+S.promo.lock+'.');
    var n=Math.min(bankAmt('amt_offer',o.min),o.max);
    if(n>S.cash)return refuse('You only have '+money(S.cash)+' in cash. The offer needs at least '+money(o.min)+'.');
    if(!spend(1,n))return;
    S.today.spend-=n;
    S.promo={v:n,c:n,lock:S.day+o.days,rate:o.rate,last:0};
    log('You put '+money(n)+' in a promo deposit at '+o.rate.toFixed(1)+'% a day. It matures on the morning of day '+S.promo.lock+'.');
    done();
  }
  function divest(k){
    var P=INV[k],p=S.inv[k];
    if(p.v<=0.5)return refuse('You have nothing in the '+P.n.toLowerCase()+'.');
    var box=$('amt_'+k),n=Math.floor(Number(box?box.value:0));
    if(!(n>0))return refuse('Enter an amount to withdraw from the '+P.n.toLowerCase()+'.');
    if(n>=p.v-0.5)n=p.v;  /* asking for more than you hold withdraws everything */
    var frac=n/p.v,out=n,note='';
    if(k==='fd'&&S.day<p.lock){var prin=n*(p.c/p.v),pen=Math.round(prin*0.03);out=prin-pen;note=' Early withdrawal: interest forfeited and a '+money(pen)+' penalty charged.'}
    if(!spend(1,0))return;
    p.c*=1-frac;p.v-=n;if(p.v<1){p.v=0;p.c=0}
    S.cash+=Math.round(out);
    log('You sold '+money(Math.round(n))+' of your '+P.n.toLowerCase()+' and received '+money(Math.round(out))+'.'+note,note?'warn':'');
    done();
  }
  /* the morning money briefing: what your money made overnight, today's rates and the best return open to you */
  function moneyBrief(interest,moved){
    var a=[],o=offerToday();
    if(interest||Math.abs(moved)>=0.5)a.push({l:interest+moved>=0?'good':'warn',t:'💰 Your money made '+sm(interest+moved)+' overnight ('+[interest?'savings +'+money(interest):'',Math.abs(moved)>=0.5?'investments '+sm(moved):''].filter(Boolean).join(', ')+').'});
    if(o)a.push({l:'good',t:'🎁 Bank offer, today only: a promo deposit at '+o.rate.toFixed(1)+'% a day for '+o.days+' days ('+money(o.min)+' to '+money(o.max)+'). It is paid back with interest when it matures.'});
    return a;
  }
  /* the 📱 Bank app: savings, investments and offers from anywhere, with a phone, tablet or computer (loans need a visit) */
  /* the apps run on a phone or tablet (anywhere) or a computer (at home); appFrom is the device the apps were opened on */
  function handheld(){return owns('phone')||owns('tablet')}
  function pcHere(){return owns('computer')&&atHome()&&!S.homeless}
  function bankDevice(){return handheld()||owns('computer')}
  var appFrom='phone';
  function openDevice(d){
    if(S.over||S.pending)return;
    if(d==='pc'?!owns('computer'):!handheld())return refuse(d==='pc'?'You need a working computer.':'You need a working phone or tablet. (A computer at home opens the same apps.)');
    if(d==='pc'&&!pcHere())return refuse('Your computer is at home.');
    appFrom=d;last=null;view=d;sayLine=null;render();
  }
  function openApp(k){
    if(S.over||S.pending)return;
    if(!(appFrom==='pc'?pcHere():handheld()))return refuse('You need a working phone or tablet, or your computer at home.');
    last=null;view=k;sayLine=null;render();
  }
  /* ---- loans ---- */
  var loanTenure=null;
  function loanOwed(){return S.loan?S.loan.principal+S.loan.interest:0}
  function rateTxt(x){return (Math.round(x*1000)/10)+'%'}
  function loanAssets(){var L=CONFIG.loan,a=0;if(L.countCash)a+=Math.max(0,S.cash);if(L.countSavings)a+=S.bank;if(L.countInvestments)a+=invTotal();return a}
  function loanLimitRaw(){var L=CONFIG.loan;return L.baseLimit+L.limitPerAsset*loanAssets()}
  function loanLimit(){var L=CONFIG.loan;return Math.floor(Math.min(L.maxLoan,loanLimitRaw())/L.step)*L.step}
  function loanAssetsTxt(){var L=CONFIG.loan,a=[];if(L.countCash)a.push('cash');if(L.countSavings)a.push('savings');if(L.countInvestments)a.push('investments');return a.length>1?a.slice(0,-1).join(', ')+' and '+a[a.length-1]:(a[0]||'assets')}
  function tenureOf(days){var T=CONFIG.loan.tenures,r=T[0];T.forEach(function(t){if(t.days===+days)r=t});return r}
  function loanTotalIfPaidAt(amt,t){return amt+Math.round(amt*t.rate)*t.days}
  function borrow(){
    var L=CONFIG.loan;
    if(!L.enabled)return refuse('The bank is not lending right now.');
    if(S.loan)return refuse('You still owe '+money(loanOwed())+'. Pay your loan off before borrowing again.');
    var box=$('amt_loan'),n=Math.round(Math.floor(Number(box?box.value:0))/L.step)*L.step,lim=loanLimit(),t=tenureOf(loanTenure);
    if(!(n>=L.step))return refuse('Borrow at least '+money(L.step)+'.');
    if(n>lim)return refuse('Your credit limit is '+money(lim)+' ('+money(L.baseLimit)+' plus '+L.limitPerAsset+' × your '+loanAssetsTxt()+'). You asked for '+money(n)+'.');
    if(S.ap<L.borrowMinutes)return refuse('Not enough time left today (arranging a loan takes '+hm(L.borrowMinutes)+', you have '+hm(S.ap)+').');
    S.ap-=L.borrowMinutes;S.cash+=n;
    S.loan={borrowed:n,principal:n,interest:0,taken:S.day,tenure:t.days,rate:t.rate,due:S.day+t.days};S.flags.loan=1;
    log('You borrowed '+money(n)+' for '+dayN(t.days)+' at '+rateTxt(t.rate)+' a day. Repay it at the Bank by the end of day '+S.loan.due+', or the balance starts growing '+rateTxt(L.overdueRate)+' a day.','warn');
    done();
  }
  function repay(all){
    var Ln=S.loan;if(!Ln)return refuse('You have no loan to repay.');
    if(Ln.taken===S.day)return refuse('You cannot repay a loan on the day you borrowed it. Come back tomorrow.');
    var owed=loanOwed(),box=$('amt_repay'),n=all?owed:Math.floor(Number(box?box.value:0));
    if(!(n>0))return refuse('Enter an amount to repay.');
    n=Math.min(n,owed);
    if(n>S.cash)return refuse('You only have '+money(S.cash)+' in cash. Loans are repaid from cash only: withdraw from savings first.');
    S.cash-=n;
    var ip=Math.min(n,Ln.interest);Ln.interest-=ip;Ln.principal-=n-ip;
    if(loanOwed()<=0){S.loan=null;log('You repaid '+money(n)+' and your loan is paid off.','good')}
    else log('You repaid '+money(n)+'. You still owe '+money(loanOwed())+'.','good');
    done();
  }
  /* each night: add interest, then check the default rules. Returns true if the game ended. */
  function loanTick(){
    var Ln=S.loan;if(!Ln)return false;
    var L=CONFIG.loan,night=S.day-1,add;
    if(night<Ln.due)add=Math.round(Ln.principal*Ln.rate);
    else add=Math.round((L.overdueCompounds?Ln.principal+Ln.interest:Ln.principal)*L.overdueRate);
    Ln.interest+=add;
    var owed=loanOwed();
    if(owed>L.defaultIfOwedAbove){finish('Loan default','You owe '+money(owed)+', more than the '+money(L.defaultIfOwedAbove)+' the bank will carry. It calls in the loan and seizes everything in day '+night+'.');return true}
    if(night>=Ln.due+L.graceDays){finish('Loan default','Your loan was due at the end of day '+Ln.due+' and you still owe '+money(owed)+' '+dayN(L.graceDays)+' later. The bank calls in the debt and seizes everything in day '+night+'.');return true}
    if(S.day<=Ln.due){
      var left=Ln.due-S.day;
      S.notes.push({l:left<=1?'warn':'rem',t:'🏦 Loan: you owe '+money(owed)+'. Due '+(left===0?'tonight (end of day '+Ln.due+')':'in '+dayN(left)+' (end of day '+Ln.due+')')+'. Repay at the Bank.'});
    }else{
      var dl=Ln.due+L.graceDays-S.day+1;
      S.notes.push({l:'bad',t:'🏦 Loan OVERDUE: you owe '+money(owed)+' and it grows '+rateTxt(L.overdueRate)+' a day. Pay in full within '+dayN(dl)+' (by the end of day '+(Ln.due+L.graceDays)+') or the bank ends your game.'});
      log('Your overdue loan grew by '+money(add)+' to '+money(owed)+'.','bad');
    }
    return false;
  }
  function moveMoney(dir){
    var n=Math.floor(Number($('amt').value));
    if(!(n>0))return refuse('Enter an amount to move.');
    if(dir==='dep'){
      if(n>S.cash)return refuse('You only have '+money(S.cash)+' in cash.');
      S.cash-=n;S.bank+=n;log('You deposited '+money(n)+' in the bank.');
    }else{
      if(S.bank<=0)return refuse('Your bank balance is empty.');
      if(n>S.bank)n=S.bank;  /* asking for more than the balance withdraws everything */
      S.bank-=n;S.cash+=n;log('You withdrew '+money(n)+' from the bank.');
    }
    done();
  }
  /* housing (CONFIG.housing): after a housing bubble you can lose your home and must apply again */
  function atHome(){return !S.homeless&&loc===S.home}
  function homeFee(h){return S.homeless?G(h==='apt'?CONFIG.housing.aptDeposit:HOUSE[h].fee):HOUSE[h].fee}
  /* a housing bubble starts: a CONFIG.housing.loseChance chance you lose your home. Returns a line for the event card, or '' */
  function bubbleHit(){
    if(S.homeless||Math.random()>=CONFIG.housing.loseChance)return '';
    var h=S.home;S.homeless=1;
    log('The housing bubble burst and you lost your home: the landlord sold the '+NAME[h]+'. Your things are kept in storage. Apply again at the Apartment or the Bungalow.','bad');
    S.notes.push({l:'bad',t:'🏚️ You lost your home in the housing bubble. Until you apply again (Apartment '+money(homeFee('apt'))+' deposit, Bungalow '+money(homeFee('bung'))+', '+hm(CONFIG.housing.applyMinutes)+'), no rent is due, you sleep outside, and you cannot rest, cook or use your fridge and gadgets.'});
    return 'You lost the '+NAME[h];
  }
  function moveHome(h){
    var f=homeFee(h),re=S.homeless;
    if(h!==S.home&&!loyaltyAllows())return;
    if(h==='bung'&&S.flat)return refuse('Ask your apartment housemate to move out first. Bungalows allow one occupant.');
    if(h==='bung'&&!Object.keys(S.career).length)return refuse('The estate agent wants proof of steady work. Get a job through the Employment Office first.');
    if(S.cash<f)return refuse((re?'Applying costs ':'Moving in costs ')+money(f)+'. You have '+money(S.cash)+'.');
    if(re){if(!spendMin(CONFIG.housing.applyMinutes,f))return}else S.cash-=f;
    if(flatmate()&&h!==S.home){var fm=flatmate();S.flat=null;log('🏠 '+fm.name+' stays behind: you no longer share a home.','warn')}
    S.home=h;S.homeless=0;
    log(re?'Your application was accepted: you have a home again at the '+NAME[h]+(f?' ('+money(f)+' paid)':'')+'. Rent is '+money(HOUSE[h].rent)+' '+everyDays(RENT_EVERY)+'.':'You moved into the '+NAME[h]+(f?' and paid '+money(f)+' up front':'')+'. Rent is now '+money(HOUSE[h].rent)+' '+everyDays(RENT_EVERY)+'.',re?'good':'');
    done();
  }
  function enter(l){
    if(S.over||S.pending)return;
    if(l!==loc){
      var c=dist(loc,l)*WALK;
      if(S.ap<c)return refuse('The '+NAME[l]+' is a '+hm(c)+' walk away. You only have '+hm(S.ap)+' left today.');
      var v0=vitSnap();S.ap-=c;loc=l;S.energy=clamp(S.energy+walkEn(c));
      log('You walked to the '+NAME[l]+' ('+hm(c)+(vitTxt(v0)?', '+vitTxt(v0):'')+').');
    }
    maybeEncounter(l);  /* a rival may be here (rival games) */
    last=null;view=l;sayLine=null;if(window.innerWidth<=640)setTimeout(function(){var h=$('hud'),y=$('board').getBoundingClientRect().top+window.scrollY-(h?h.offsetHeight:0)-4;window.scrollTo({top:Math.max(0,y),behavior:'smooth'})},30);
    render();
  }

  /* illnesses, built from CONFIG.hospital */
  var HP=CONFIG.hospital,ILL={};
  ['cold','flu','dengue','pneu'].forEach(function(k){var c=HP[k];
    ILL[k]={n:c.name,min:c.minutes||M(c.timeUnits||0),hap:c.happiness||0,rest:!!c.rest,wk:c.days||3,cost:c.treatCost||0,lo:c.billMin||0,hi:c.billMax||0}});
  function illShort(t){return t.n.replace(/^(a|the) /,'')}
  /* what the player can do about the illness they have now (cold and flu: rest at home unless that already failed; others: Hospital only) */
  function illCure(){var t=S.ill&&ILL[S.ill.k];if(!t)return '';
    if(!t.rest)return illShort(t).charAt(0).toUpperCase()+illShort(t).slice(1)+' needs treatment at the Hospital: it will not clear up on its own.';
    if(S.ill.fail)return 'Resting at home did not work, so only treatment at the Hospital will cure it now.';
    return 'Sleep at home tonight for a '+pctTxt(HP.homeRecover)+' chance to recover, or get treated at the Hospital.'}
  function isStaff(){return S.career.hosp!=null}
  function medCost(base){return Math.round(G(base)*(isStaff()?HP.staffDiscount:1)*(S.ins>0?1-HP.insuranceCovers:1))}
  /* treatment fee for an illness (a range for serious ones), before insurance and discounts */
  function illFee(t){return t.hi?Math.round(rr(t.lo,t.hi)):t.cost}
  function illFeeTxt(t){return t.hi?money(medCost(t.lo))+'–'+money(medCost(t.hi)):money(medCost(t.cost))}
  /* medical bills: pay what you can from cash; the rest (+ interest) goes on a repayment plan, like rent arrears */
  function charge(amt){
    var pay=Math.min(Math.max(0,S.cash),amt),short=amt-pay,owe=0;S.cash-=pay;outg(pay);
    if(short>0){owe=Math.round(short*(1+HP.billInterest));S.medDebt+=owe;S.medDays=HP.billPlanDays;S.medFresh=1}
    return {paid:pay,debt:short,owe:owe};
  }
  function planTxt(c){return (c.paid?'You could only pay '+money(c.paid)+'. The remaining ':'You had no cash to pay it. The full ')+money(c.debt)+' (+'+pctTxt(HP.billInterest)+' interest = '+money(c.owe)+') goes on a '+HP.billPlanDays+'-day repayment plan, taken from your cash each morning'}
  function billText(c){return 'Bill '+money(c.paid+c.debt)+(S.ins>0?' (insurance covered most of it)':'')+(isStaff()?' (staff discount)':'')+(c.debt?'. '+planTxt(c):'')}
  function medInstal(){return S.medDebt>0?Math.ceil(S.medDebt/Math.max(1,S.medDays||HP.billPlanDays)):0}
  /* daily medical-bill instalment; missed payments add a late fee (same rules as rent arrears) */
  function medTick(){
    if(S.medDebt<=0){S.medDebt=0;return}
    if(S.medFresh){S.medFresh=0;return}
    if(!S.medDays)S.medDays=HP.billPlanDays;
    var due=medInstal(),pay=Math.max(0,Math.min(S.cash,due));
    S.cash-=pay;outg(pay);S.medDebt-=pay;S.medDays=Math.max(0,S.medDays-1);
    if(pay<due){var fee=Math.max(1,Math.round((due-pay)*HP.billLateFee));S.medDebt+=fee;if(S.medDays<1)S.medDays=1;
      S.notes.push({l:'bad',t:'🧾 Missed medical bill instalment: you paid '+money(pay)+' of '+money(due)+'. A '+money(fee)+' late fee was added. You still owe '+money(S.medDebt)+'.'});
      log('Missed medical bill instalment ('+money(pay)+' of '+money(due)+'). Late fee '+money(fee)+'.','bad')}
    else{log('Medical bill instalment of '+money(pay)+' paid.'+(S.medDebt>0?' '+money(S.medDebt)+' still owed.':' Medical bills cleared!'),S.medDebt>0?'warn':'good');
      if(S.medDebt>0)S.notes.push({l:'rem',t:'🧾 Medical bill instalment of '+money(pay)+' paid. '+money(S.medDebt)+' still owed over '+S.medDays+' more day'+(S.medDays>1?'s':'')+' (next: '+money(medInstal())+').'})}
    if(S.medDebt<=0){S.medDebt=0;S.medDays=0}
  }
  /* chance tonight's sleep at home cures you: only for illnesses with rest:true, and only until a roll has failed */
  function recoverChance(){
    var t=S.ill&&ILL[S.ill.k];
    return t&&t.rest&&!S.ill.fail?HP.homeRecover:0;
  }
  /* hospital stay: a ward day, or release (with the bill) on the morning after. Returns true while it applies tonight. */
  function hospTick(){
    var h=S.hosp;if(!h)return false;
    var t=ILL[h.k];
    if(h.left>0){
      h.left--;h.inWard=1;S.ill=null;S.ap=0;S.fed=true;
      S.notes.push({l:'bad',t:'🏥 You are warded in the Hospital today for '+t.n+'. Rest up: you will be released '+(h.left?'in '+dayN(h.left+1):'tomorrow morning')+'. The bill comes when you leave.'});
      log('You spend the day in the hospital ward being treated for '+t.n+'.','bad');
      return true;
    }
    S.hosp=null;S.ill=null;
    if(h.adm){S.energy=clamp(Math.max(S.energy,HP.hospitalMinEnergy));S.health=clamp(S.health+HP.treatHealth)}
    var c=charge(h.bill);
    var head=h.adm?'You were released from the Hospital this morning, recovered from '+t.n+'.':'Your hospital treatment for '+t.n+' has been billed.';
    S.notes.push({l:c.debt?'bad':'warn',t:'🏥 '+head+' Medical bill: '+money(h.bill)+(c.debt?'. '+planTxt(c)+'.':', deducted from your cash.')});
    log(head+' Medical bill '+money(h.bill)+(c.debt?'. '+planTxt(c)+'.':', paid from cash.'),c.debt?'bad':'warn');
    return true;
  }
  function illTick(){
    var inHosp=hospTick();
    if(!inHosp&&S.ill){
      var t=ILL[S.ill.k],ch=S.sickSleep?recoverChance():0;S.ill.d=(S.ill.d||0)+1;
      if(ch&&Math.random()<ch){
        log('A night’s sleep at home did the trick: you recovered from '+t.n+'. You can work again.','good');
        S.notes.push({l:'good',t:'💪 You slept it off at home and recovered from '+t.n+'. You can work again.'});S.ill=null;
      }else if(ch){
        S.ill.fail=1;
        log('You slept at home but are still sick with '+t.n+' (you had a '+pctTxt(ch)+' chance). Only Hospital treatment will cure it now.','bad');
        S.notes.push({l:'bad',t:'🤒 Resting at home did not shake off '+t.n+'. Only treatment at the Hospital will cure it now.'});
      }else if(t.rest&&!S.ill.fail&&S.ill.d>=t.wk){
        log('You got over '+t.n+' after '+dayN(S.ill.d)+'. You can work again.','good');
        S.notes.push({l:'good',t:'💪 You got over '+t.n+'. You can work again.'});S.ill=null;
      }else log('You are still sick with '+t.n+'. '+illCure(),'bad');
    }else if(!inHosp){
      var ch2=illChance();
      if(Math.random()<ch2){
        var mix=CONFIG.illness.mix,tot=0,k=null;Object.keys(mix).forEach(function(q){if(ILL[q])tot+=mix[q]});
        var roll=Math.random()*tot;Object.keys(mix).forEach(function(q){if(!ILL[q]||k)return;roll-=mix[q];if(roll<0)k=q});
        if(!k)k='cold';
        S.ill={k:k,d:0};log('You came down with '+ILL[k].n+'. You can’t work while sick. '+illCure(),'bad');
      }
    }
    if(S.ill&&!inHosp){var t2=ILL[S.ill.k];S.ap=Math.max(0,Math.min(S.ap,MAX_AP-t2.min));S.happy=clamp(S.happy-t2.hap);log('You are sick with '+t2.n+' (−'+hm(t2.min)+', −'+t2.hap+' happiness today, no work).','bad')}
    S.sickSleep=0;
    if(S.immune>0)S.immune--;
    /* life insurance (S.ins) lasts the whole game */
    medTick();
  }
  /* ---------- gym ---------- */
  /* gym classes from CONFIG.gym (en = energy cost, so a class that gives energy back has a negative en) */
  var GYM=CONFIG.gym.classes.map(function(c){return {k:c.k,n:c.n,ic:c.ic,min:c.minutes,cost:c.cost,en:-c.energy,hp:c.health,hap:c.happiness,w:c.workouts==null?1:c.workouts,d:c.d}})
    .sort(function(a,b){return a.cost-b.cost});  /* listed cheapest first */
  function isGymStaff(){var j=myJob();return !!j&&j.b==='gym'}
  function gymCost(g){return Math.round(G(g.cost)*(isGymStaff()?0.5:1))}
  function gymCount(){return (S.gym||[]).filter(function(d){return S.day-d<5}).length}
  function gymSession(k){
    var g=null;GYM.forEach(function(x){if(x.k===k)g=x});if(!g)return;
    var c=gymCost(g);
    if(g.en>0&&S.energy<CONFIG.gym.minEnergy)return refuse('You are too tired to train. Eat or rest first.');
    if(!spendMin(g.min,c))return;
    var v0=vitSnap();
    S.energy=clamp(S.energy-g.en);S.happy=clamp(S.happy+g.hap);S.health=clamp(S.health+g.hp);for(var i=0;i<g.w;i++)S.gym.push(S.day);S.gym=S.gym.filter(function(d){return S.day-d<5});S.flags.gym=1;
    log('At the gym: '+g.n.toLowerCase()+' for '+money(c)+' ('+hm(g.min)+(vitTxt(v0)?', '+vitTxt(v0):'')+').','good');
    done();
  }
  /* ---------- leisure: free things that lift your mood (CONFIG.leisure) ---------- */
  function screenKey(){return owns('tv')?'tv':owns('console')?'console':null}
  function callsToday(){return S.calls&&S.calls.d===S.day?S.calls.n:0}
  function leisure(k){
    var L=CONFIG.leisure[k];if(!L)return;
    if(k==='screen'||k==='call'){if(!atHome())return refuse(S.homeless?'You have no home. Your things are in storage.':'You can only do that at home.')}
    else if(loc!=='park')return refuse('You can only do that at the Park.');
    if(k==='screen'&&!screenKey())return refuse('You need a working TV or game console.');
    if(k==='call'&&callsToday()>=L.perDay)return refuse('You have already called your family today.');
    if(L.minEnergy&&S.energy<L.minEnergy)return refuse('You are too tired to jog. Eat or rest first.');
    if(!spendMin(L.minutes,0))return;
    var v0=vitSnap();
    S.energy=clamp(S.energy+(L.energy||0));S.happy=clamp(S.happy+(L.happiness||0));S.health=clamp(S.health+(L.health||0));
    if(k==='call')S.calls={d:S.day,n:callsToday()+1};
    var what={screen:screenKey()==='tv'?'You watched a show':'You played games on your console',call:'You called your family',walk:'You took a walk in the Park',jog:'You went for a jog in the Park'}[k];
    log(what+' ('+hm(L.minutes)+(vitTxt(v0)?', '+vitTxt(v0):'')+').','good');
    done();
  }
  /* ---------- the Community Centre (CONFIG.community): social activities and friends' job tips ---------- */
  function commToday(k){var c=S.comm;return c&&c.d===S.day?(c[k]||0):0}
  function tipOn(){return !!(S.tip&&S.day<=S.tip.until)}
  function community(k){
    var C=CONFIG.community[k];if(!C||k==='tip')return;
    if(loc!=='comm')return refuse('You can only do that at the Community Centre.');
    if(commToday(k)>=C.perDay)return refuse('You have already done that today. Come back tomorrow.');
    var cost=G(C.cost||0);
    if(!spendMin(C.minutes,cost))return;
    var v0=vitSnap();
    S.energy=clamp(S.energy+(C.energy||0));S.happy=clamp(S.happy+(C.happiness||0));if(C.knowledge)S.know=clamp(S.know+C.knowledge);
    if(!S.comm||S.comm.d!==S.day)S.comm={d:S.day};S.comm[k]=(S.comm[k]||0)+1;
    var what={nightOut:'You had a night out with friends',karaoke:'You sang your heart out at karaoke night',volunteer:'You volunteered at the Community Centre'}[k];
    log(what+' ('+hm(C.minutes)+(cost?', '+money(cost):'')+(vitTxt(v0)?', '+vitTxt(v0):'')+').','good');
    if(C.tipChance&&Math.random()<C.tipChance){var T=CONFIG.community.tip;S.tip={until:S.day+T.days-1};
      log('🤝 A friend tipped you off about openings. Your next job interview is easier (until the end of day '+S.tip.until+').','good')}
    done();
  }
  /* ---------- the Factory for outsiders: day labour, safety course, tour (CONFIG.factory) ---------- */
  function facJob(){return Object.keys(S.career).some(function(c){return cur(c)&&bOf(c)==='factory'})}
  function labourPay(){var low=Infinity;Object.keys(CAREERS).forEach(function(c){if(bOf(c)==='factory')CAREERS[c].ranks.forEach(function(r,i){low=Math.min(low,rolePay(c,i))})});return Math.round(low*CONFIG.factory.dayLabour.payShare)}
  function labourToday(){var f=S.fac||{};return f.ld===S.day?f.ln:0}
  function factoryDo(k){
    var F=CONFIG.factory,f=S.fac||(S.fac={});
    if(facJob())return refuse('You work here. Use the Work button.');
    if(shutLeft('factory')>0)return refuse('The Factory is closed for '+shutLeft('factory')+' more day'+(shutLeft('factory')>1?'s':'')+'.');
    var v0;
    if(k==='labour'){
      var L=F.dayLabour,en=-L.energy;
      if(naked())return refuse(NAKED);
      if(labourToday()>=L.perDay)return refuse('No more casual work today. Come back tomorrow.');
      if(S.ill)return refuse('You are sick with '+ILL[S.ill.k].n+' and can’t work. '+illCure());
      if(S.energy<20)return refuse('You’re too exhausted to work. Eat or rest first.');
      var capM=CONFIG.time.maxWorkMinutes;
      if((S.workMin||0)+L.minutes>capM)return refuse('You can work at most '+hm(capM)+' a day. You have already worked '+hm(S.workMin||0)+' today.');
      if(!spendMin(L.minutes,0))return;
      S.workMin=(S.workMin||0)+L.minutes;
      var pay=shiftPay(labourPay());v0=vitSnap();
      S.cash+=pay;inc(pay);S.energy=clamp(S.energy-en);S.happy=clamp(S.happy-workHap(en));S.health=clamp(S.health+workHp(L.minutes));S.flags.worked=1;f.ln=labourToday()+1;f.ld=S.day;
      log('You did a day of casual work on the loading dock and earned '+money(pay)+vitPar(v0)+'.','good');
    }else if(k==='course'||k==='tour'){
      var C=F[k];
      if(f[k])return refuse(k==='course'?'You have already done the safety course.':'You have already taken the tour.');
      if(!spendMin(C.minutes,G(C.cost)))return;
      v0=vitSnap();S.know=clamp(S.know+(C.knowledge||0));S.happy=clamp(S.happy+(C.happiness||0));f[k]=1;
      if(k==='course'){if(!S.shiftsAt)S.shiftsAt={};S.shiftsAt.factory=(S.shiftsAt.factory||0)+C.expShifts}
      log(k==='course'?'You passed the Factory safety course for '+money(G(C.cost))+vitPar(v0)+'. It counts as '+C.expShifts+' shift'+(C.expShifts>1?'s':'')+' of Factory work experience.':'You took a tour of the Factory for '+money(G(C.cost))+vitPar(v0)+'.','good');
    }else return;
    done();
  }
