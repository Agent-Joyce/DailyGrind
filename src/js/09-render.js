  /* ==================================================================
     9. RENDER
     ================================================================== */
  /* ---------- render: repaint the screen from S ----------
    render() is the only entry point; it calls the parts below in this order (the order matters: placeCenter() needs the
    overview filled in, the panel is drawn after the windows are shown or hidden, and save() runs last).
    The add-ons wrap render() (see ADD-ONS): their before-hooks run first and their after-hooks (clock, trend arrows,
    toasts) run after it. */
  function render(){
    fridgeSync();  /* a fridge that broke or was repaired changes what fits */
    renderStats();
    placeCenter();
    renderGoals();
    renderPopups();
    renderHud();
    renderOverviewCards();
    renderMap();
    renderWindows();
    renderPanel();
    renderA11y();
    save();feedback();
  }
  /* day, time and vitals, and the Home & life, wardrobe and belongings lines of the overview */
  function renderStats(){
    var H=HOUSE[S.home];
    $('day').textContent=Math.min(S.day,maxDays());
    $('ap').textContent=hm(S.ap);
    var fr=S.ap/MAX_AP;$('donut').setAttribute('stroke-dasharray',(fr*100).toFixed(2)+' 100');$('donut').setAttribute('stroke',fr<.2?'#ef7d72':fr<.5?'#e0a526':'#3cc0c3');
    $('donutTxt').textContent=Math.round(fr*100)+'%';
    $('cash').textContent=money(S.cash);
    $('bank').textContent=money(S.bank);
    $('energy').textContent=S.energy+'%';
    $('enBar').style.width=S.energy+'%';
    $('enBar').style.background=S.energy<30?'var(--red)':'var(--teal)';
    $('health').textContent=S.health+'%';$('hlBar').style.width=S.health+'%';$('hlBar').style.background=S.health<CONFIG.health.poorBelow?'var(--red)':'var(--teal)';
    $('happy').textContent=S.happy+'%';
    $('hpBar').style.width=S.happy+'%';
    $('hpBar').style.background=S.happy<25?'var(--red)':'var(--teal)';
    $('homeName').textContent=S.homeless?'No home':NAME[S.home];$('homeName').title=$('homeName').textContent;
    var be=bestEdu();
    $('edu').textContent=be?TRACKS[be].n+' '+TRACKS[be].lv[lvl(be)-1]:'High School';$('edu').title=$('edu').textContent;
    $('eduSub').className='education-paths';$('eduSub').innerHTML=Object.keys(TRACKS).map(function(t){var n=lvl(t);return '<span>'+TRACKS[t].n+'<b>'+(n?TRACKS[t].lv[n-1]:'None completed')+'</b></span>'}).join('');
    var rw=nextRentWeek(), left=rw-S.day;
    $('rent').textContent=S.homeless?'None (no home)':S.rentPaid===rw?'Paid ✓ (day '+rw+')':money(H.rent)+(left===0?' due today':' in '+left+' day'+(left>1?'s':''));$('rent').title=S.homeless?'No rent while you have no home':'Due at the end of day '+rw;
    var pxs=Math.round(S.px*100), ws=Math.round(payIdx()*100);
    $('econ').innerHTML='<span class="'+(pxs>100?'up':pxs<100?'dn':'')+'">Prices '+pxs+'%</span><span>Shift pay '+ws+'%</span><span>Interest '+S.rate.toFixed(1)+'%/day</span>'+(function(){var jb=myJob();return jb&&shutLeft(jb.b)>0?'<span class="up">🔒 '+NAME[jb.b]+' closed: '+shutLeft(jb.b)+'d</span>':''})();
    if(S.trends.length){var t0=S.trends[0],bad=S.trends.some(function(t){return t.p>0||t.w<0||t.mkt<0||t.ill>1}),sh=t0.n.length>28?t0.n.slice(0,26)+'…':t0.n;
      $('econ').innerHTML+='<span class="trend '+(bad?'up':'dn')+'" title="'+S.trends.map(function(t){return t.n+' ('+t.left+' days left): '+trendNow(t)}).join(' | ').replace(/"/g,'&quot;')+'">🌐 '+sh+' · '+t0.left+'d'+(S.trends.length>1?' (+'+(S.trends.length-1)+' more)':'')+'</span>'}
    var wr=function(k,n,max){var w=S.clothes[k];return '<span class="chip'+(w?w<=1?' warn':' ok':'')+'" title="'+WEAR[k].n+': '+(w?w+' day'+(w>1?'s':'')+' left':'none')+'">'+n+' '+(w?w+'d':'—')+'</span>'};
    $('wardrobe').innerHTML=wr('casual','Casual',WEAR.casual.w)+wr('smart','Smart',WEAR.smart.w)+wr('suit','Suit',WEAR.suit.w);
    var as=assets(), nw=worth(), tot=Math.max(nextGoal(),nw);
    $('assets').textContent=money(as);
    var iv=invTotal();$('invv').textContent=money(iv);
    $('know').textContent=Math.floor(S.know);$('knBar').style.width=S.know+'%';
    $('meal').className='meal '+(S.fed?'ok':'no');$('meal').textContent=S.fed?'🍽 Ate today ✓':'🍽 No meal yet today';
    var nIt=Object.keys(S.items).filter(function(k){return S.items[k]}).length,FF=S.food.filter(function(p){return !p.sp}),nSp=S.food.length-FF.length;
    $('belong').textContent=nIt+' item'+(nIt!==1?'s':'')+(FF.length?' · 🍽 '+FF.length+' meal'+(FF.length>1?'s':'')+' ('+Math.min.apply(null,FF.map(function(p){return foodLeft(p)}))+'d left)':'')+(nSp?' · 🤢'+nSp:'')+(S.chips?' · 🥔'+S.chips:'');
    if((S.tickets||[]).length)$('belong').textContent+=' · 🎟️'+S.tickets.length;
    $('belongPop').innerHTML=belongList();
  }
  /* first-week goals, certificate and morning pop-ups: shown or hidden from S */
  function renderPopups(){
    var gp=$('goalpop');
    if(S.goalPop&&!S.over&&!S.pending&&!S.cert&&!S.morning){$('gpList').innerHTML=goals().map(function(x){return '<li>✅ '+x[1]+'</li>'}).join('');var gpT=Math.min(TIERS.length-1,Math.max(0,S.tier+1));$('gpMsg').textContent='You have the basics down. Next target: '+TIERS[gpT].n+' at '+money(nextGoal())+' net worth'+(nextDueTxt()?nextDueTxt()+' for a +'+TIERS[gpT].b.toLocaleString()+' score bonus'+(maxDays()===Infinity?'.':' (it still counts as a rank until day '+maxDays()+').'):maxDays()===Infinity?'.':', within '+maxDays()+' days.');gp.classList.add('show')}else gp.classList.remove('show');
    var cp=$('certpop');
    if(S.cert&&!S.over){var C=S.cert,TT=TRACKS[C.t];$('cpT').textContent=TT.n+' '+TT.lv[C.l-1];$('cpMods').textContent='Modules: '+C.mods.join(' · ');$('cpDay').textContent='Awarded on day '+C.d;
      var opens=[],close=[];Object.keys(CAREERS).forEach(function(c){CAREERS[c].ranks.forEach(function(rk){if((rk.q||[]).some(function(q){return q[0]===C.t&&q[1]===C.l})){if(meets(rk))opens.push(rk.r);else close.push(rk.r)}})});
      var nxT=S.edu[C.t]<totMods(C.t),nxF=nxT?qualFee(C.t,S.edu[C.t]):0;
      $('cpMsg').textContent=(opens.length?'New jobs open to you: '+opens.join(', ')+'. ':'')+(close.length?'Closer to: '+close.slice(0,4).join(', ')+' (they also need other qualifications). ':'')+(nxT?'Next up: the '+TT.lv[C.l]+' (tuition '+money(nxF)+', paid when you enrol).':'You have completed the whole pathway!');
      var cn=$('cpNext');cn.hidden=!nxT;if(nxT){cn.textContent='Enrol in the '+TT.lv[C.l]+' · '+money(nxF);cn.disabled=S.cash<nxF||S.expelled>0}
      cp.classList.add('show')}else cp.classList.remove('show');
    var mo=$('morning');if(S.morning&&!S.over&&!S.pending&&!S.cert){$('mnT').textContent='☀️ Day '+S.day+(maxDays()!==Infinity?' of '+maxDays():'');$('mnSub').innerHTML=morningTop();$('mnList').innerHTML=morningHtml(S.morning);mo.classList.add('show')}else mo.classList.remove('show');
  }
  /* the top bar: net worth, cash, investments, score, buttons and current pay, plus the Rules text that depends on difficulty */
  function renderHud(){
    $('hNw').textContent=kMoney(worth());$('hNw').style.color=worth()<0?'#ef7d72':'';$('hKn').textContent=Math.floor(S.know)+'%';$('hCash').textContent=kMoney(S.cash);$('hNw').title=money(worth());$('hCash').title=money(S.cash);$('hEn').textContent=S.energy+'%';$('hHp').textContent=S.happy;$('hHl').textContent=S.health;$('hHl').style.color=S.health<30?'#ef7d72':'';
    $('hEn').style.color=S.energy<30?'#ef7d72':'';$('hHp').style.color=S.happy<30?'#ef7d72':'';$('hCash').style.color=S.cash<0?'#ef7d72':'';
    var hiv=invTotal();$('hInvC').hidden=!anyInv();if(anyInv()){var pl0=hiv-invSum('c');$('hInv').textContent=money(hiv);$('hInvPL').textContent=sm(pl0)+' ('+(pl0>=0?'+':'−')+Math.abs(invSum('c')?pl0/invSum('c')*100:0).toFixed(1)+'%)';$('hInvPL').style.color=pl0>=0?'#7fe0a6':'#ef7d72'}
    $('hScore').textContent=score().toLocaleString();var bs0=bestScore();$('hBest').textContent=bs0?'best '+bs0.toLocaleString():'';
    $('hudLeave').hidden=!view||!!S.pending;$('hudEnd').disabled=!!S.over||!!S.pending;$('hudEnd').textContent=atHome()?sleepLabel()+' ☾':'Sleep outside ☾';
    var pi=payInfo(),pm0=prod().m;$('pay').textContent=money(pi.v)+(pi.n?'/shift':'');$('payRole').textContent=pi.txt+(pi.n&&pm0<1?' · ×'+Math.round(pm0*100)+'% today':'');
    $('dayMax').textContent=maxDays()===Infinity?'':' / '+maxDays();$('diffTag').textContent=Df().n;
    $('rlWin').textContent=maxDays()===Infinity?' (no time limit on Easy)':', within '+maxDays()+' days';$('rlTime').textContent=maxDays()===Infinity?'Not on Easy: there is no day limit.':'Day '+maxDays()+' passes and you are still under '+money(GOAL)+'.';
  }
  /* the overview's day recap, warnings, net-worth parts, investments line and rank goal */
  /* the town leaderboard (rival games): you and your rivals by net worth, with their job and today's change */
  function rivalBoard(){
    var box=$('rivBox');if(!box)return;var on=S.mode==='rivals'&&S.rivals&&S.rivals.length;box.hidden=!on;if(!on)return;
    var P=lifeScore();
    var reminder=$('wealthChallengeReminder');if(!reminder){reminder=document.createElement('p');reminder.id='wealthChallengeReminder';box.appendChild(reminder)}reminder.innerHTML=wealthReminder().replace(/<\/?li>/g,'');reminder.hidden=!reminder.innerHTML;
    $('rivSub').textContent='· Life Score · day '+Math.min(S.day,maxDays())+' of '+maxDays()+' · '+moodX().icon+' '+moodX().name;
    var wasOpen=[].map.call($('rivList').querySelectorAll(':scope>details'),function(d){return d.open});  /* a button inside a card repaints the list: keep the cards open */
    $('rivList').innerHTML=P.map(function(p){
      var job=p.me?(myJob()?myJob().rk.r:'No job'):p.out?'Out: '+p.out.why+' (day '+p.out.day+')':(rivalJob(p.r)?rivalJob(p.r).rk.r:'No job');
      var d=p.r?rivalWorth(p.r)-p.r.y:0;
      var line='<span>'+ordinal(p.place)+'</span>'+rivalFace(p.r)+'<span class="rn"><strong>'+modernEsc(p.name)+'</strong>'+(p.r?' <small class="rival-meta">'+modernEsc(p.r.diff+' · '+personality(p.r).name+' · '+relLabel(p.r.rel||0))+'</small>':'')+'<small>Reputation '+Math.round(p.rep)+(((p.r&&ally()===p.r)||(p.me&&ally()))?' · '+(p.me?'Allied with '+modernEsc(ally().name):'Your ally'):'')+'</small><small>'+modernEsc(job)+' · '+money(p.worth)+(d?' <span class="'+(d>0?'up':'dn')+'">'+(d>0?'▲':'▼')+money(Math.abs(d))+'</span>':'')+'</small></span><b>'+p.pts+' pts</b>';
      var cats=Object.keys(p.cats).map(function(k){var x=p.cats[k];return LIFE_CATS[k].ic+' '+ordinal(x.place)+' ('+x.txt+')'}).join(' · ');
      return '<details><summary class="rivrow'+(p.me?' me':'')+'">'+line+'</summary><ul>'+(p.me?politicsLis(-1):'')+(p.r?memoryProfile(p.r)+'<li>Relationship '+sg(p.r.rel||0)+' ('+relLabel(p.r.rel||0)+')'+(p.r.drift?' · overnight '+sg(p.r.drift):'')+'</li>'+politicsLis(S.rivals.indexOf(p.r))+moneyLis(S.rivals.indexOf(p.r))+(flatmate()===p.r?'<li>🏠 Your flatmate'+(S.flat.hd===S.day?(S.flat.here?' · home today':' · out today'):'')+'</li>':'')+(studyPartners(S.lastTrack).indexOf(p.r)>=0?'<li>📚 Studying the same pathway as you</li>':''):'')+'<li>'+cats+'</li>'+(p.r?(p.r.log.length?p.r.log.map(function(l){return '<li>'+l+'</li>'}).join(''):'<li>Nothing to report yet.</li>'):'')+'</ul>'+(p.r?rivalMoves(S.rivals.indexOf(p.r)):'')+'</details>';
    }).join('');
    [].forEach.call($('rivList').querySelectorAll(':scope>details'),function(d,k){if(wasOpen[k])d.open=true});
  }
  function moneyLis(i){return (S.rloans||[]).filter(function(l){return l.i===i}).map(function(l){return '<li>💬 '+(l.dir==='in'?'Owes you '+money(l.owe):'You owe '+money(l.owe))+' (due day '+l.due+')</li>'}).join('')+(S.bets||[]).filter(function(b){return b.i===i}).map(function(b){return '<li>🎲 Bet of '+money(b.stake)+' each until day '+b.until+'</li>'}).join('')}
  function renderOverviewCards(){
    rivalBoard();
    (function(){var d=handheld(),o=offerToday();$('phoneBtn').disabled=!d||!!S.over;
      $('phoneNote').textContent=!d?'Needs a phone or tablet'+(owns('computer')?' (your computer at home has the apps)':''):'Bank and Jobs apps'+(o&&!S.promo?' · 🎁 bank offer today':'')+(S.mode==='rivals'&&newMsgs()?' · 💬 '+newMsgs()+' new':'')+(S.mode==='rivals'&&dueTomorrow().length?' · 💬 due tomorrow':'')})();
    var as=assets(),nw=worth(),tot=Math.max(nextGoal(),nw),iv=invTotal();  /* the same values renderStats() shows */
    var sm2=S.summary,sc=$('sumcard');sc.hidden=!sm2;
    if(sm2){var sg=function(v,suf){return '<b class="'+(v>0?'up':v<0?'dn':'')+'">'+(v>0?'+':v<0?'−':'±')+(suf==='$'?money(Math.abs(Math.round(v))):Math.abs(Math.round(v))+(suf||''))+'</b>'};
      sc.innerHTML='<span class="st">📊 Day '+sm2.day+' recap</span><span>Earned <b class="up">'+money(Math.round(sm2.earn))+'</b></span><span>Spent <b class="dn">'+money(Math.round(sm2.spend))+'</b></span><span>Net worth '+sg(sm2.dnw,'$')+'</span><span>⚡ '+sg(sm2.de,'%')+'</span><span>😊 '+sg(sm2.dh)+'</span><span>💚 '+sg(sm2.dl||0)+'</span><span>🧠 '+sg(sm2.dk)+'</span>'+
        (sm2.best?'<span class="bestday">🏆 Best day yet</span>':'')+
        ((sm2.wins||[]).length?'<div class="wins" title="'+sm2.wins.join(' | ').replace(/"/g,'&quot;')+'">Wins: '+sm2.wins.map(function(x){return x.replace(/[<>&]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;'}[c]})}).join(' · ')+'</div>':'')+
        (sm2.hits.length?'<div class="hits" title="'+sm2.hits.join(' | ').replace(/"/g,'&quot;')+'">What hurt: '+sm2.hits.map(function(x){return x.replace(/[<>&]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;'}[c]})}).join(' · ')+'</div>':'');}
    (function(){var h=momentCard(),mb=$('momentBox');mb.hidden=!h;mb.innerHTML=h})();
    var al=stressList(),wa=$('warn');
    wa.hidden=!al.length;
    wa.innerHTML=al.slice(0,2).map(function(x){return '<div class="al '+x.l+'">'+x.t+'</div>'}).join('')+(al.length>2?'<div class="al more" title="'+al.slice(2).map(function(x){return x.t}).join(' | ').replace(/"/g,'&quot;')+'">+'+(al.length-2)+' more warning'+(al.length>3?'s':'')+'</div>':'');
    /* debts shown as negative parts, so the parts add up to net worth */
    var lo=loanOwed(),bo=S.medDebt+(S.arrears?S.arrears.bal:0);
    $('loanv').textContent=lo>0?'-'+money(lo):money(0);$('loanv').classList.toggle('dn',lo>0);
    $('billsRow').hidden=bo<=0;$('billsv').textContent='-'+money(bo);$('billsRow').title='Medical bills '+money(S.medDebt)+' + rent arrears '+money(S.arrears?S.arrears.bal:0);
    $('debtline').hidden=true;
    var il=$('invline');
    if(anyInv()){var c0=invSum('c'),pl=iv-c0,wk=S.wk||{abs:0,pct:0};
      il.hidden=false;il.innerHTML='📈 Investments: <b>'+money(iv)+'</b> · today <b class="'+(wk.abs>=0?'up':'dn')+'">'+sm(wk.abs)+' ('+(wk.pct>=0?'+':'−')+Math.abs(wk.pct).toFixed(1)+'%)</b> · overall <b class="'+(pl>=0?'up':'dn')+'">'+sm(pl)+' ('+(pl>=0?'+':'−')+Math.abs(c0?pl/c0*100:0).toFixed(1)+'%)</b>';}
    else il.hidden=true;
    $('nw').textContent=money(nw);$('goalAmt').textContent=(S.tier>=0?TIERS[S.tier].ic+' '+TIERS[S.tier].n+' · ':'')+(S.tier<TIERS.length-1?'next: '+TIERS[S.tier+1].n+' '+money(nextGoal())+nextDueTxt():'top rank');
    $('sgCash').style.width=Math.max(0,S.cash)/tot*100+'%';$('sgBank').style.width=S.bank/tot*100+'%';$('sgAsset').style.width=as/tot*100+'%';$('sgInv').style.width=invTotal()/tot*100+'%';
  }
  /* the town map: evening darkness and each building's highlight, walk time, label and tags */
  function renderMap(){
    /* evening: the town darkens as the day runs out (CONFIG.ui.evening); the morning resets S.ap, so it lights up again */
    var EV=CONFIG.ui.evening||{},evF=EV.fromMinutes||0,dusk=evF&&!S.over&&S.ap<evF?(EV.darkest||0)*(0.5+0.5*(1-S.ap/evF)):0;
    $('board').style.setProperty('--dusk',dusk.toFixed(3));$('board').classList.toggle('evening',dusk>0);
    document.querySelectorAll('.tile').forEach(function(t){
      var k=t.dataset.loc;
      t.classList.toggle('here',k===loc);
      t.classList.toggle('open',k===view);
      t.querySelector('.cost').textContent=k===loc?'':hm(dist(loc,k)*WALK);
      t.setAttribute('aria-label',NAME[k]+(k===loc?', you are here':', '+hm(dist(loc,k)*WALK)+' walk')+(k===S.home&&!S.homeless?', your home':''));
      t.querySelector('.tags').innerHTML=(k===S.home&&!S.homeless?'<span class="tag">Home</span>':'')+(k===loc?'<span class="tag you">You</span>':'');
    });
  }
  /* which windows show (overview, building panel, end-of-day card) and the end-of-day card itself */
  function renderWindows(){
    var pend=!!S.pending;
    document.body.classList.toggle('pending',pend);
    $('center').classList.toggle('wide',(view==='jobs'||view==='school'||view==='bank'||view==='bankapp'||view==='jobsapp')&&!pend);
    var pk=view+'|'+pend;if(window.__pk!==pk){window.__pk=pk;$('center').scrollTop=0}
    $('overview').hidden=!!view||pend;
    /* overview hidden by a click on the map: hide the whole window until the Overview button (or a new day) */
    var ovOff=!view&&!pend&&ovHidden;$('center').hidden=ovOff;$('hudOv').hidden=!ovOff;
    $('shop').hidden=!view||pend;
    /* overview window (no building open): only as tall as the vitals row, centred on the map, scroll for net worth and the log */
    (function(){var c=$('center'),ov=!view&&!pend&&window.innerWidth>640,t3=c.querySelector('.three');
      c.style.maxHeight='';if(ov&&t3)c.style.maxHeight='min(94%, '+Math.round(t3.offsetTop+t3.offsetHeight+14)+'px)'})();
    var wrap=$('evwrap'), was=wrap.hidden;
    wrap.hidden=!pend;
    if(pend){renderEvent();setTimeout(function(){var f=$('event').querySelector('button:not(:disabled)');if(f&&was)f.focus()},0);if(was){var c=$('event');c.classList.remove('pop');void c.offsetWidth;c.classList.add('pop')}}
  }
  /* the open building's panel: title, shopkeeper line and body (typed amounts and open ⓘ sections are kept) */
  function renderPanel(){
    var pend=!!S.pending;
    if(view&&!pend){
      $('shopTitle').textContent=ICON[view]+' '+NAME[view];
      if(!sayLine||sayLine.k!==view)sayLine={k:view,t:greetLine(view)};
      $('say').innerHTML='<b>'+GREET[view][0]+'</b>“'+sayLine.t+'”';
      $('say').classList.add('slim');
      $('result').textContent='';$('result').className='result';  /* news from a button is a toast now (see TOASTS) */
      var keep={},open={};[].forEach.call($('shopBody').querySelectorAll('input[id]'),function(i){keep[i.id]=i.value});
      [].forEach.call($('shopBody').querySelectorAll('details[open][data-sec]'),function(d){open[d.dataset.sec]=1});  /* an ⓘ you opened stays open after an action */
      $('shopBody').innerHTML=momentCard()+encounterCard()+workSection(view)+panels[view]();
      Object.keys(keep).forEach(function(id){var i=$(id);if(i)i.value=keep[id]});
      [].forEach.call($('shopBody').querySelectorAll('details[data-sec]'),function(d){if(open[d.dataset.sec])d.open=true});
      if(S.over)$('shop').querySelectorAll('button').forEach(function(b){b.disabled=true});
    }
  }
  /* screen-reader roles for the bars, keyboard hints and the spoken latest message */
  function renderA11y(){
    [['donutWrap',S.ap,MAX_AP,'Minutes left today'],['enBar',S.energy,100,'Energy'],['hpBar',S.happy,100,'Happiness'],['hlBar',S.health,100,'Health'],['knBar',Math.floor(S.know),100,'Knowledge']].forEach(function(m){
      var b=m[0]==='donutWrap'?$(m[0]):$(m[0]).parentNode;b.setAttribute('role','progressbar');b.setAttribute('aria-label',m[3]);b.setAttribute('aria-valuemin','0');b.setAttribute('aria-valuemax',String(m[2]));b.setAttribute('aria-valuenow',String(m[1]));});
    keyHints();
    if(last&&last.msg!==window.__srLast){window.__srLast=last.msg;$('sr').textContent=last.msg}
  }
  function actionButtons(){
    var o=document.querySelector('.over.show');
    var root=o?o:(!$('evwrap').hidden?$('event'):(!$('shop').hidden?$('shopBody'):null));
    if(!root)return [];
    return [].slice.call(root.querySelectorAll('button:not(:disabled):not([hidden]):not([data-act="step"])')).filter(function(b){return b.offsetParent!==null||o});
  }
  function keyHints(){
    document.querySelectorAll('[data-k]').forEach(function(b){b.removeAttribute('data-k')});
    var bs=actionButtons();if(bs.length>9)return;  /* long lists (Employment Office, Bank...): no number shortcuts, they would jump around */
    bs.forEach(function(b,i){b.setAttribute('data-k',String(i+1))});
  }
  document.addEventListener('keydown',function(e){
    if(e.ctrlKey||e.metaKey||e.altKey)return;
    var typing=e.target&&/INPUT|TEXTAREA|SELECT/.test(e.target.tagName);
    var k=e.key;
    if(k==='Escape'){
      if($('rules').classList.contains('show')){$('rules').classList.remove('show');$('rulesBtn').focus();return}
      if($('over').classList.contains('show')&&!$('keep').hidden){$('keep').click();return}
      if(typing){e.target.blur();return}
      if(view&&!S.pending&&!S.over){view=null;render();return}
      return;
    }
    if(typing)return;
    if(/^[1-9]$/.test(k)){var bs=actionButtons(),b=bs.length>9?null:bs[+k-1];if(b){e.preventDefault();b.click()}return}
    if(document.querySelector('.over.show'))return;
    if((k==='e'||k==='E')&&!S.pending&&!S.over){e.preventDefault();endWeek(false);return}
    if(k==='h'||k==='H'){$('rulesBtn').click();return}
    if(k==='m'||k==='M'){$('muteBtn').click();return}
  });

