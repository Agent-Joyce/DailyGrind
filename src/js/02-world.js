  /* ==================================================================
     2. WORLD TABLES
     Values derived from CONFIG plus the fixed tables: ranks, difficulty, icons, buildings, homes, items, jobs, City College pathways, careers.
     ================================================================== */
  var MAX_AP=CONFIG.time.dayMinutes, RENT_EVERY=CONFIG.time.rentEveryDays, GOAL=0, WALK=CONFIG.time.walkMinutes;
  /* time: S.ap is minutes left today. Activity costs are written in 'units'; M() turns units into minutes using CONFIG.time. */
  function M(u){var T=CONFIG.time;return Math.max(T.minAction,Math.round(u*T.minutesPerUnit/T.roundTo)*T.roundTo)}
  function everyDays(n){return n===1?'every day':'every '+n+' days'}
  function hm(m){m=Math.max(0,Math.round(m));var h=Math.floor(m/60),mm=m%60;return h?(h+'h'+(mm?' '+mm+'m':'')):mm+'m'}
  /* ranks, built from CONFIG.ranks (sorted lowest first) */
  var TIERS=CONFIG.ranks.slice().sort(function(a,b){return a.netWorth-b.netWorth}).map(function(r){return {n:r.name,v:r.netWorth,ic:r.icon,d:r.byDay||0,b:r.bonus||0}});
  GOAL=TIERS[0].v;  /* the winning net worth = the first rank */
  function reachedTier(){var w=worth(),t=-1;TIERS.forEach(function(x,i){if(w>=x.v)t=i});return t}
  function nextGoal(){return TIERS[Math.min(S.tier+1,TIERS.length-1)].v}
  /* rank target days (CONFIG.ranks byDay): reaching a rank by its day earns its bonus */
  function tierDue(i){var d=TIERS[i]&&TIERS[i].d;return d?Math.min(Math.round(d*gameLen()/CONFIG.time.gameDays),maxDays()):0}  /* target days stretch with a longer (rival) game */
  function onTime(i){var due=tierDue(i),rd=S.rankDay&&S.rankDay[i];return !!due&&rd!=null&&rd<=due}
  function rankBonus(){var b=0;TIERS.forEach(function(x,i){if(onTime(i))b+=x.b});return b}
  /* " by day 8" while the next rank's target day has not passed, else "" */
  function nextDueTxt(){var t=S.tier+1,due=tierDue(t);return t<TIERS.length&&due&&S.day<=due?' by day '+due:''}
  var nightRank=false;  /* true while the overnight pipeline checks ranks: gains made overnight belong to the day that just ended */
  var DIFF={
    easy:{n:'Easy',cash:500,days:CONFIG.time.gameDays,px:0.9,wage:1.05,ill:0.6,d:'$500 to start, '+CONFIG.time.gameDays+' days, cheaper prices, fewer illnesses.'},
    normal:{n:'Normal',cash:200,days:CONFIG.time.gameDays,px:1,wage:1,ill:1,d:'$200 to start, '+CONFIG.time.gameDays+' days, standard prices.'},
    hard:{n:'Hard',cash:100,days:CONFIG.time.gameDays,px:1.15,wage:0.95,ill:1.4,d:'$100 to start, '+CONFIG.time.gameDays+' days, prices 15% higher, pay 5% lower, more illness.'}
  };
  function Df(){return DIFF[S.diff]||DIFF.normal}
  /* how long this game lasts: a single game CONFIG.time.gameDays, a game with AI rivals CONFIG.rivals.gameDays */
  function gameLen(){return S&&S.mode==='rivals'?CONFIG.rivals.gameDays:CONFIG.time.gameDays}
  function maxDays(){return gameLen()}
  var S, loc, view, last=null;
  var toastAll=false, forceToast=[], nightRun=false, nightFed=false;  /* nightRun: the overnight pipeline is running (a game that ends then ends on the day that just finished) */  /* toastAll: during a button click, every log line becomes a toast; forceToast: toasts shown even over a pop-up */
  var $=function(id){return document.getElementById(id)};
  /* ---------- stat icons (small SVGs in the game's outline style) ---------- */
  var ICO={
    cash:'<rect x="1.6" y="5.6" width="20.8" height="12.8" rx="2" fill="#2f8f5b" stroke="#16222e" stroke-width="1.7"/><rect x="4" y="8" width="16" height="8" rx="1" fill="none" stroke="#bfe6cf" stroke-width="1"/><circle cx="12" cy="12" r="3.4" fill="#bfe6cf" stroke="#16222e" stroke-width="1.1"/><path d="M13.2 10.7c-.3-.4-.7-.6-1.2-.6-.7 0-1.2.4-1.2.9 0 1.3 2.5.7 2.5 2 0 .5-.6.9-1.3.9-.6 0-1.1-.3-1.3-.7M12 9.4v.7M12 13.9v.7" fill="none" stroke="#16222e" stroke-width="1.1" stroke-linecap="round"/><circle cx="5.6" cy="12" r=".9" fill="#bfe6cf"/><circle cx="18.4" cy="12" r=".9" fill="#bfe6cf"/>',
    energy:'<path d="M13.6 2.2 4.8 13.4h6.1l-1.5 8.4 9-11.4h-6.2z" fill="#3b8fe0" stroke="#16222e" stroke-width="1.8" stroke-linejoin="round"/>',
    happy:'<circle cx="12" cy="12" r="9.4" fill="#fff" stroke="#16222e" stroke-width="1.9"/><circle cx="8.8" cy="10" r="1.3" fill="#16222e"/><circle cx="15.2" cy="10" r="1.3" fill="#16222e"/><path d="M7.7 14.1c1 2.1 2.5 3.2 4.3 3.2s3.3-1.1 4.3-3.2" fill="none" stroke="#16222e" stroke-width="1.9" stroke-linecap="round"/>',
    know:'<path d="M12 4.4 1.8 9.2 12 14l10.2-4.8z" fill="#8a5cc2" stroke="#16222e" stroke-width="1.9" stroke-linejoin="round"/><path d="M6 11.2v4.4c1.6 1.6 3.6 2.4 6 2.4s4.4-.8 6-2.4v-4.4L12 14z" fill="#6c45a3" stroke="#16222e" stroke-width="1.9" stroke-linejoin="round"/>',
    health:'<path d="M12 20.6s-8.4-4.9-8.4-11.1C3.6 6.6 5.8 4.4 8.5 4.4c1.5 0 2.8.7 3.5 1.9.7-1.2 2-1.9 3.5-1.9 2.7 0 4.9 2.2 4.9 5.1 0 6.2-8.4 11.1-8.4 11.1z" fill="#e2564a" stroke="#16222e" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 9.2v6M9 12.2h6" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>',
    time:'<circle cx="12" cy="12.6" r="9.2" fill="#0f7f82" stroke="#16222e" stroke-width="1.8"/><circle cx="12" cy="12.6" r="6.4" fill="#fbf3e2"/><path d="M12 12.6V8.8M12 12.6l2.8 1.7" stroke="#16222e" stroke-width="2" stroke-linecap="round"/>'
  };
  ICO.worth='<path d="M9 3.2h6l-1.6 3.1h-2.8z" fill="#d99a1e" stroke="#16222e" stroke-width="1.6" stroke-linejoin="round"/><path d="M10.4 6.3h3.2c3.9 2.3 6.6 6 6.6 9.6 0 3.3-2.6 5-8.2 5s-8.2-1.7-8.2-5c0-3.6 2.7-7.3 6.6-9.6z" fill="#f0bd4a" stroke="#16222e" stroke-width="1.8" stroke-linejoin="round"/><path d="M13.9 11.6c-.4-.6-1.1-.9-1.9-.9-1.1 0-1.9.6-1.9 1.4 0 2 3.9 1 3.9 3 0 .9-.9 1.5-2 1.5-.9 0-1.7-.4-2.1-1M12 9.7v1M12 16.6v1" fill="none" stroke="#16222e" stroke-width="1.5" stroke-linecap="round"/>';
  var ICO_NAME={worth:'net worth',cash:'cash',energy:'energy',happy:'happiness',know:'knowledge',health:'health',time:'time'};
  function ic(k){return '<svg class="ic" viewBox="0 0 24 24" role="img" aria-label="'+ICO_NAME[k]+'">'+ICO[k]+'</svg>'}
  /* the same icons as <symbol>s, for the fixed HTML (top bar, vitals) which uses <use href="#ic-…"> */
  (function(){var d=document.createElement('div');d.innerHTML='<svg width="0" height="0" style="position:absolute" aria-hidden="true">'+Object.keys(ICO).map(function(k){return '<symbol id="ic-'+k+'" viewBox="0 0 24 24">'+ICO[k]+'</symbol>'}).join('')+'</svg>';document.body.appendChild(d.firstChild)})();
  /* ---------- quick tooltips: [data-tip] shows at once on hover (computer) or on tap (phone) ---------- */
  (function(){
    var tip=document.createElement('div');tip.id='tip';tip.setAttribute('role','tooltip');document.body.appendChild(tip);var cur=null,hideT=null;
    function scoreTip(){
      var W=CONFIG.score,p=scoreParts(),tot=p.reduce(function(a,b){return a+b[1]},0);
      return '<b>How your score is worked out</b><br>Net worth + energy × '+W.energy+' + happiness × '+W.happiness+' + health × '+W.health+' + knowledge × '+W.knowledge+' + education levels × '+W.educationLevel+' + bonuses for ranks reached by their target day'+
        '<table>'+p.map(function(r){return '<tr><td>'+r[0]+'</td><td>'+(r[1]<0?'−':'')+Math.abs(r[1]).toLocaleString()+'</td></tr>'}).join('')+'<tr class="tot"><td>Score</td><td>'+Math.max(0,tot).toLocaleString()+'</td></tr></table>';
    }
    function show(el){
      clearTimeout(hideT);cur=el;var k=el.getAttribute('data-tip');tip.innerHTML=k==='score'?scoreTip():k;tip.classList.add('on');
      var r=el.getBoundingClientRect(),w=tip.offsetWidth,h=tip.offsetHeight,x=Math.min(window.innerWidth-w-8,Math.max(8,r.left+r.width/2-w/2)),y=r.bottom+8;
      if(y+h>window.innerHeight-8)y=Math.max(8,r.top-h-8);tip.style.left=x+'px';tip.style.top=y+'px';
    }
    function hide(){cur=null;tip.classList.remove('on')}
    document.addEventListener('mouseover',function(e){var el=e.target.closest&&e.target.closest('[data-tip]');if(el&&el!==cur)show(el);else if(!el&&cur)hide()});
    document.addEventListener('focusin',function(e){var el=e.target.closest&&e.target.closest('[data-tip]');if(el)show(el)});
    document.addEventListener('focusout',hide);
    /* phones: tap to show, tap again or anywhere else to hide; it also closes by itself after 6 seconds */
    document.addEventListener('pointerdown',function(e){if(e.pointerType==='mouse')return;var el=e.target.closest&&e.target.closest('[data-tip]');
      if(el&&el!==cur){show(el);hideT=setTimeout(hide,6000)}else hide()});
    window.addEventListener('scroll',hide,true);
  })();
  /* turn "1h 30m, +12% energy, +1 happiness, −8 health" into icon + number: used for every option line.
    Offset-based check replaces the previous lookbehind (?<!of ), which older Safari cannot parse. */
  function statIcons(s){
    s=String(s).replace(/(^|[\s(>])(\d+h(?: \d+m)?|\d+m)(?=,| ·| to buy|\s*$)/g,function(_,pre,t,off,str){
      if(off>=2&&str.substr(off-2,3)==='of ')return _;
      return pre+ic('time')+t;
    })
      .replace(/([+\-−]?\d+(?:\.\d+)?%) energy\b/g,function(_,v){return ic('energy')+v})
      .replace(/([+\-−]?\d+(?:\.\d+)?) happiness\b/g,function(_,v){return ic('happy')+v})
      .replace(/([+\-−]?\d+(?:\.\d+)?) health\b/g,function(_,v){return ic('health')+v})
      .replace(/([+\-−]?\d+(?:\.\d+)?) knowledge\b/g,function(_,v){return ic('know')+v});
    return s.replace(/,\s*(?=<svg class="ic")/g,'  ');
  }
  /* short money for the top bar: $12,345 -> $12.3K, $1,250,000 -> $1.3M (under $1,000 unchanged) */
  function kMoney(n){var a=Math.abs(n),s=n<0?'-$':'$',f=function(v){return v.toFixed(1).replace(/\.0$/,'')};
    return a>=1e6?s+f(a/1e6)+'M':a>=1000?s+f(a/1000)+'K':money(n)}
  var money=function(n){return (n<0?'-$':'$')+Math.abs(n).toLocaleString()};
  var clamp=function(n){return Math.max(0,Math.min(100,n))};

  var LOCS=[['jobs','💼','Employment Office'],['school','🎓','City College'],['bank','🏦','Bank'],['market','🛒','Fresh Market'],
    ['fast','🍔','Golden Bun'],['resto','🍝','Family Restaurant'],['elec','💻','Electronics Store'],['mall','🛍️','Clothes Mall'],
    ['apt','🏢','Budget Apartments'],['hosp','🏥','Hospital'],['factory','🏭','Factory'],['thrift','👕','Second-Hand Shop'],['comm','🤝','Community Centre'],['bung','🏡','Garden Villa'],['gym','🏋️','Gym'],['park','🌳','Park']];
  /* Shared illustrated map geometry (3:2 aspect); travel uses these same positions. */
  var TOWN_SPRITES={"jobs":"@img(town-jobs.webp)","school":"@img(town-school.webp)","bank":"@img(town-bank.webp)","market":"@img(town-market.webp)","fast":"@img(town-fast.webp)","resto":"@img(town-resto.webp)","elec":"@img(town-elec.webp)","mall":"@img(town-mall.webp)","apt":"@img(town-apt.webp)","hosp":"@img(town-hosp.webp)","factory":"@img(town-factory.webp)","thrift":"@img(town-thrift.webp)","comm":"@img(town-comm.webp)","bung":"@img(town-bung.webp)","gym":"@img(town-gym.webp)","park":"@img(town-park.webp)"};
  var TOWN_LAYOUT={jobs:[23,24],school:[53,15],bank:[72,27],market:[88,46],fast:[35,42],resto:[60,48],elec:[18,65],mall:[50,68],apt:[14,44],hosp:[80,67],factory:[87,85],thrift:[33,83],comm:[39,23],bung:[70,88],gym:[62,70],park:[11,87]};
  var TOWN_DIAMETER=Math.max(...Object.values(TOWN_LAYOUT).flatMap(function(a){return Object.values(TOWN_LAYOUT).map(function(b){return Math.hypot((a[0]-b[0])*1.5,a[1]-b[1])})}));
  var NAME={},ICON={};
  LOCS.forEach(function(l){ICON[l[0]]=l[1];NAME[l[0]]=l[2]});
  /* screens, not places: a device's home screen and its two apps (opened from the Overview's 📱 Phone button, or the 💻 Computer at home) */
  ICON.callsapp='📞';NAME.callsapp='Calls';ICON.msgsapp='💬';NAME.msgsapp='Messages';ICON.phone='📱';NAME.phone='Phone';ICON.pc='💻';NAME.pc='Computer';ICON.bankapp='🏦';NAME.bankapp='Bank app';ICON.jobsapp='💼';NAME.jobsapp='Jobs app';ICON.gigsapp='📦';NAME.gigsapp='Gigs app';ICON.creatorapp='🎬';NAME.creatorapp='Creator app';
  var APPS=['phone','pc','bankapp','jobsapp','callsapp','msgsapp','gigsapp','creatorapp'];

  var HOUSE={apt:{rent:150,rest:25,hap:0,fee:0,rate:3},bung:{rent:350,rest:40,hap:10,fee:300,rate:4.5}};
  /* the fixed nightly change in words, leaving out anything that is 0 (CONFIG.sleep, health.nightly.always, selfStudy.nightlyLoss) */
  function nightTxt(){var a=[],SL=CONFIG.sleep,hl=CONFIG.health.nightly.always,kl=CONFIG.selfStudy.nightlyLoss;
    if(SL.nightEnergy)a.push('energy '+sg(SL.nightEnergy)+'%');if(SL.nightHappiness)a.push('happiness '+sg(SL.nightHappiness));if(hl)a.push('health '+sg(hl));if(kl)a.push('knowledge '+sg(kl));
    return a.length?a.join(', ').replace(/, ([^,]*)$/,' and $1'):'nothing'}
  /* comfort items at home make resting more effective (CONFIG.sleep.comfortBonus each) */
  var COMFORT={tv:'TV',tvnew:'Smart TV',console:'Game console',fridge:'Refrigerator',fridgeold:'Refrigerator',microwave:'Microwave',coffee:'Coffee machine',computer:'Computer',computerold:'Computer',tablet:'Tablet',tabletold:'Tablet'};
  function comfortItems(){var seen={},a=[];Object.keys(COMFORT).forEach(function(k){if(S.items[k]&&!S.broken[k]&&!seen[COMFORT[k]]){seen[COMFORT[k]]=1;a.push(COMFORT[k])}});return a}
  /* the Belongings ⓘ on the status page: everything you own */
  function belongList(){
    var ks=Object.keys(S.items).filter(function(k){return S.items[k]&&ITEMS[k]}),F=S.food||[],li=[],c={};
    ks.forEach(function(k){li.push('<li><span>'+ITEMS[k].ic+'</span><span>'+ITEMS[k].n+(S.broken[k]?' <em class="brk">(broken)</em>':'')+'</span></li>')});
    F.forEach(function(p){var n=p.sp?'Spoiled food':FOODN[p.t]();c[n]=(c[n]||0)+1});
    Object.keys(c).forEach(function(n){li.push('<li><span>'+(n==='Spoiled food'?'🤢':n==='Cooked meal'?FOODIC.cook:n===GROC.basic.n?FOODIC.basic:FOODIC.prem)+'</span>'+n+' × '+c[n]+'</li>')});
    if(S.chips)li.push('<li><span>🥔</span>Chips × '+S.chips+'</li>');
    if((S.tickets||[]).length)li.push('<li><span>🎟️</span>Lottery ticket × '+S.tickets.length+'</li>');
    var pw=Object.keys(S.pawned||{}).filter(function(k){return ITEMS[k]});
    return (li.length?'<ul>'+li.join('')+'</ul>':'<p style="margin:0">Nothing yet. Buy things at the Electronics Store or Second-Hand Shop, and meals at the Fresh Market.</p>')+
      (pw.length?'<p>Pawned at the Second-Hand Shop: '+pw.map(function(k){return ITEMS[k].n}).join(', ')+'.</p>':'')+(S.homeless&&ks.length?'<p>Your things are in storage until you have a home again.</p>':'');
  }
  function comfortMult(){return 1+(CONFIG.sleep.comfortBonus||0)*comfortItems().length}
  function restRate(){return HOUSE[S.home].rate*comfortMult()*(CONFIG.sleep.rateX||1)}  /* energy % per hour of rest */
  function sleepRate(){return (CONFIG.sleep.perHour[S.home]||HOUSE[S.home].rate)*comfortMult()*(CONFIG.sleep.rateX||1)}  /* energy % per hour of a night's sleep at home */
  function sleepGain(min){return Math.min(CONFIG.sleep.maxEnergy,Math.round(min/60*sleepRate()))}
  function sleepHap(min){var SL=CONFIG.sleep;return Math.round(Math.min(Math.floor(min/60),SL.maxHappinessHours==null?99:SL.maxHappinessHours)*SL.happinessPerHour)}  /* happiness from a night at home: full hours, at most maxHappinessHours */
  function sleepHealth(min){var HS=CONFIG.health.sleep;return Math.round(Math.min(HS.max,min/60*HS.perHour))}
  var GLOVES_PAY=15;  /* work gloves: $ added to every shift */
  var ITEMS={
    clothes:{n:'Work gloves',ic:'🧤',p:25,shop:'thrift',d:'Adds $'+GLOVES_PAY+' to every shift you work'},
    tv:{n:'Second-hand TV',ic:'📺',p:150,shop:'thrift',d:restTxt('tv')+'. Breaks down more often',old:.12},
    fridgeold:{n:'Used refrigerator',ic:'🧊',p:140,shop:'thrift',d:'Holds '+CONFIG.food.fridgeSpace+' meals for '+CONFIG.food.keepDaysFridge+' days instead of '+CONFIG.food.keepDaysRoom+', but breaks down more often',old:.12},
    phoneold:{n:'Used mobile phone',ic:'📱',p:340,shop:'thrift',d:dayTxt('phoneold')+'. Lets you trade ETFs and study online. Breaks down more often',old:.12},
    tabletold:{n:'Old tablet',ic:'📲',p:430,shop:'thrift',d:dayTxt('tabletold')+'. Lets you trade ETFs and study online. Breaks down more often',old:.15},
    computerold:{n:'Old computer',ic:'🖥️',p:520,shop:'thrift',d:dayTxt('computerold')+'. Lets you trade ETFs and study online, plus freelance coding and hedge-fund access. Breaks down more often',old:.18},
    fridge:{n:'Refrigerator',ic:'🧊',p:660,shop:'elec',d:'Holds '+CONFIG.food.fridgeSpace+' meals for '+CONFIG.food.keepDaysFridge+' days instead of '+CONFIG.food.keepDaysRoom},
    tvnew:{n:'Smart TV',ic:'🖥️',p:450,shop:'elec',d:restTxt('tvnew')},
    console:{n:'Game console',ic:'🎮',p:150,shop:'elec',d:restTxt('console')},
    computer:{n:'Computer',ic:'💻',p:710,shop:'elec',d:dayTxt('computer')+'. Lets you trade ETFs and study online, plus freelance coding and hedge-fund access'},
    tablet:{n:'Tablet',ic:'📲',p:640,shop:'elec',d:dayTxt('tablet')+'. Lets you trade ETFs and study online'},
    phone:{n:'Mobile phone',ic:'📱',p:460,shop:'elec',d:dayTxt('phone')+'. Lets you trade ETFs and study online'},
    microwave:{n:'Microwave',ic:'♨️',p:320,shop:'elec',d:'Reheats a cold cooked meal from the fridge in '+CONFIG.food.reheatMinutes+' min (without one you eat it cold, '+sg(CONFIG.food.coldHappiness)+' happiness)'},
    coffee:{n:'Coffee machine',ic:'☕',p:290,shop:'elec',d:'+'+CONFIG.gadgets.coffeeEnergy+'% energy each morning, and it counts as a comfort item (+'+pctTxt(CONFIG.sleep.comfortBonus)+' faster rest and sleep)'}
  };
  /* item descriptions built from CONFIG.gadgets */
  function dayTxt(k){var g=CONFIG.gadgets.daily[k]||{};return '+'+(g.knowledge||0)+' knowledge and +'+(g.happiness||0)+' happiness a day'}
  function restTxt(k){var g=CONFIG.gadgets.perRestHour[k]||{},a=[];if(g.happiness)a.push('+'+g.happiness+' happiness');if(g.knowledge)a.push('+'+g.knowledge+' knowledge');return a.join(' and ')+' for every hour you rest or sleep at home'}
  var GROUPS={fridge:['fridge','fridgeold'],phone:['phone','phoneold'],tv:['tv','tvnew'],computer:['computer','computerold'],tablet:['tablet','tabletold'],console:['console'],microwave:['microwave'],coffee:['coffee']};
  function ikey(g){var r=null;(GROUPS[g]||[g]).forEach(function(k){if(!r&&S.items[k]&&!S.broken[k])r=k});return r}
  function owns(g){return !!ikey(g)}
  function invSum(f){return INVK.reduce(function(a,k){return a+((S.inv[k]||{})[f]||0)},0)+((S.promo||{})[f]||0)}  /* includes a promo deposit (CONFIG.bank.offers) */
  function anyInv(){return invSum('v')>0.5}
  function invTotal(){return Math.round(invSum('v'))}
  var JOBS={free:{n:'Freelance coding',min:CONFIG.time.freelanceMinutes,pay:80,en:5,computer:1}};
  var TRACKS={
    /* L = modules grouped by level. Higher levels have more modules. */
    sal:{n:'Sales',lv:['Certificate','Degree'],L:[['Customer Relations','Product Knowledge'],['Negotiation','Retail Analytics','Merchandising','Sales Leadership']]},
    fnb:{n:'Food & Beverage',lv:['Certificate','Degree'],L:[['Food Hygiene','Cooking Basics'],['Kitchen Management','Food Costing','Advanced Cuisine','Master Chef Practicum']]},
    fin:{n:'Finance',lv:['Certificate','Degree','Masters'],L:[['Accounting Basics','Business Maths'],['Financial Reporting','Markets & Investing','Risk Management','Portfolio Strategy'],['Derivatives','Asset Management','Valuation','Finance Thesis']]},
    tech:{n:'Technology',lv:['Certificate','Degree','Masters'],L:[['Programming Basics','Data Literacy'],['Web Development','Databases','Machine Learning','Cloud Systems'],['Deep Learning','AI Systems','Cyber Security','Distributed Systems']]},
    med:{n:'Medicine',lv:['Certificate','Degree','Honours','Masters'],L:[['Human Biology','First Aid & Hygiene'],['Anatomy','Pharmacology','Clinical Skills','Pathology'],['Surgery Basics','Internal Medicine','Paediatrics','Medical Ethics'],['Clinical Residency I','Clinical Residency II','Emergency Medicine','Public Health']]},
    eng:{n:'Engineering',lv:['Certificate','Degree','Honours','Masters'],L:[['Mechanics Basics','Workshop Safety'],['Circuits & Electronics','CAD Design','Thermodynamics','Systems Engineering'],['Control Theory','Advanced Design','Project Management','Honours Project'],['Robotics','Structural Analysis','Energy Systems','Masters Project']]},
    /* Customer Service: a single-module Certificate with longer lessons (3 lessons x 3h = 9h) */
    cus:{n:'Customer Service',lv:['Certificate'],L:[['Customer Care Essentials']],les:{Certificate:3},hrs:{Certificate:3}},
    /* modern pathways (CHANGELOG 105) */
    data:{n:'Data & AI',lv:['Certificate','Degree','Masters'],L:[['Spreadsheets & SQL','Statistics Basics'],['Data Analysis','Data Visualisation','Machine Learning Models','Data Engineering'],['Generative AI','MLOps','AI Ethics & Governance','Data Science Thesis']]},
    media:{n:'Creative Media',lv:['Certificate','Degree'],L:[['Visual Design Basics','Short-Form Video'],['Brand & Content Strategy','UX Design','Motion Graphics','Portfolio Project']]},
    green:{n:'Green Energy',lv:['Certificate','Degree'],L:[['Electrical Safety','Solar Basics'],['Solar & Storage Systems','EV Charging Systems','Energy Auditing','Green Building Project']]},
    logi:{n:'Logistics',lv:['Certificate','Degree'],L:[['Warehouse Operations','Delivery Routing'],['Inventory Planning','Supply Chain Analytics','Customs & Trade','Fleet Management']]}
  };
  /* derived module data: flat list m, cumulative level ends c */
  Object.keys(TRACKS).forEach(function(t){var T=TRACKS[t],c=0;T.m=[];T.c=[];T.L.forEach(function(l){T.m=T.m.concat(l);c+=l.length;T.c.push(c)})});
  function totMods(t){var c=TRACKS[t].c;return c[c.length-1]}
  function levelOf(t,n){var c=TRACKS[t].c;for(var i=0;i<c.length;i++)if(n<c[i])return i;return c.length-1}
  function posInLevel(t,n){var i=levelOf(t,n),start=i?TRACKS[t].c[i-1]:0;return {i:i,k:n-start+1,of:TRACKS[t].L[i].length}}
  function modCost(t,n){return 50+levelOf(t,n)*35}
  /* Qualification -> modules (1-4) -> lessons (2-4). Each lesson is 1-3 hours; higher qualifications have more and longer lessons. */
  /* lessons per module, and hours per lesson (Degree 12h, Honours 8h, Masters 6h of class in all) */
  var LES_N={Certificate:2,Degree:3,Honours:3,Masters:3}, LES_H={Certificate:1,Degree:1,Honours:40/60,Masters:30/60};
  /* a pathway can override the defaults with les:{Level:n} (lessons per module) and hrs:{Level:h} (hours per lesson) */
  function lesCount(t,n){var T=TRACKS[t],lv=T.lv[levelOf(t,n)];return (T.les&&T.les[lv])||LES_N[lv]}
  function lesHours(t,n){var T=TRACKS[t],lv=T.lv[levelOf(t,n)];return (T.hrs&&T.hrs[lv])||LES_H[lv]}
  /* tuition is paid once, when you enrol in a qualification; lessons are then free */
  function qualFee(t,n){var i=levelOf(t,n);if(i===0)return G(Math.round(CONFIG.education.certFee[t]*((S.certVar&&S.certVar[t])||1)));return G(modCost(t,n)*TRACKS[t].L[i].length)}
  function lesDone(t){return (S.les&&S.les[t])||0}
  function inProgress(t){return S.edu[t]<totMods(t)&&S.enr&&S.enr[t]===levelOf(t,S.edu[t])}
  /* shift length (minutes) and energy cost, from CONFIG.time.shifts */
  function effort(pay){
    var rows=CONFIG.time.shifts.slice().sort(function(a,b){return b.pay-a.pay});
    for(var i=0;i<rows.length;i++)if(pay>=rows[i].pay)return {min:rows[i].minutes,en:rows[i].energy};
    var r=rows[rows.length-1];return {min:r.minutes,en:r.energy};
  }
  // roles per building, lowest rank first. t = track needed, l = level needed (0 = none)
  var CAREERS={
    factory:{n:'Factory',ranks:[
      {r:'Line Worker',pay:120,t:'',l:0,dress:'casual'},
      {r:'Technician',pay:180,t:'eng',l:1,dress:'suit'},
      {r:'Design Engineer',pay:250,t:'eng',l:2,dress:'suit'},
      {r:'Senior Engineer',pay:330,t:'eng',l:3,dress:'suit'},
      {r:'Project Lead',pay:400,t:'eng',l:4,dress:'suit'},
      {r:'Principal Engineer',pay:480,t:'eng',l:5,dress:'suit'},
      {r:'Chief Engineer',pay:700,t:'eng',l:5,dress:'suit'}]},
    fast:{n:'Golden Bun',ranks:[
      {r:'Crew Member',pay:70,t:'',l:0},
      {r:'Shift Supervisor',pay:110,t:'fnb',l:1,dress:'casual'},
      {r:'Store Manager',pay:180,t:'fnb',l:2,dress:'casual'}]},
    resto:{n:'Family Restaurant',ranks:[
      {r:'Dishwasher',pay:85,t:'',l:0,dress:'casual'},
      {r:'Waiter',pay:105,t:'cus',l:1,dress:'casual'},
      {r:'Chef',pay:180,t:'fnb',l:2,dress:'casual'},
      {r:'Master Chef',pay:300,t:'fnb',l:3,dress:'suit'}]},
    market:{n:'Fresh Market',ranks:[
      {r:'Shelf Stacker',pay:75,t:'',l:0},
      {r:'Cashier',pay:85,t:'',l:0,dress:'casual'},
      {r:'Store Supervisor',pay:140,t:'cus',l:1,dress:'casual'},
      {r:'Fresh Market Manager',pay:230,t:'sal',l:2,dress:'suit'}]},
    mall:{n:'Clothes Mall',ranks:[
      {r:'Sales Clerk',pay:95,t:'',l:0,dress:'casual'},
      {r:'Visual Merchandiser',pay:150,t:'cus',l:1,dress:'casual'},
      {r:'Boutique Manager',pay:250,t:'sal',l:2,dress:'suit'}]},
    thrift:{n:'Second-Hand Shop',ranks:[
      {r:'Shop Assistant',pay:70,t:'',l:0},
      {r:'Second-Hand Shop Manager',pay:140,t:'cus',l:1,dress:'casual'}]},
    pawn:{n:'Second-Hand Shop (Pawn counter)',b:'thrift',ranks:[
      {r:'Counter Assistant',pay:80,t:'',l:0,dress:'casual'},
      {r:'Appraiser',pay:170,t:'fin',l:1,dress:'casual'},
      {r:'Pawnbroker',pay:290,t:'fin',l:2,dress:'suit'}]},
    bank:{n:'Bank',ranks:[
      {r:'Teller',pay:110,t:'fin',l:1,dress:'suit'},
      {r:'Internal Auditor',pay:150,t:'fin',l:2,dress:'suit'},
      {r:'Market Risk Analyst',pay:240,t:'fin',l:2,dress:'suit'},
      {r:'Rates Trader',pay:330,t:'fin',l:3,dress:'suit'},
      {r:'Tech Developer',pay:410,t:'tech',l:4,dress:'suit'},
      {r:'Head Trader',pay:450,t:'fin',l:4,dress:'suit'}]},
    hosp:{n:'Hospital',ranks:[
      {r:'Hospital Porter',pay:90,t:'',l:0,dress:'casual'},
      {r:'Nursing Aide',pay:140,t:'med',l:1,dress:'casual'},
      {r:'Nurse',pay:210,t:'med',l:2,dress:'casual'},
      {r:'Senior Nurse',pay:290,t:'med',l:3,dress:'casual'},
      {r:'Junior Doctor',pay:330,t:'med',l:4,dress:'suit'},
      {r:'Specialist Doctor',pay:460,t:'med',l:5,dress:'suit'},
      {r:'Consultant',pay:620,t:'med',l:5,dress:'suit'},
      {r:'Chief of Surgery',pay:900,t:'med',l:5,dress:'suit'}]},
    elec:{n:'Electronics Store (Sales)',b:'elec',ranks:[
      {r:'Stock Clerk',pay:90,t:'',l:0,dress:'casual'},
      {r:'Sales Assistant',pay:170,t:'cus',l:1,dress:'casual'},
      {r:'Sales Director',pay:350,t:'sal',l:2,dress:'suit'}]},
    elec2:{n:'Electronics Store (Technology)',b:'elec',ranks:[
      {r:'Data Annotator',pay:150,t:'tech',l:1,dress:'casual'},
      {r:'Software Developer',pay:210,t:'tech',l:2,dress:'casual'},
      {r:'AI Engineer',pay:290,t:'tech',l:3,dress:'suit'},
      {r:'Lead Architect',pay:450,t:'tech',l:4,dress:'suit'},
      {r:'Chief Technologist',pay:660,t:'tech',l:4,dress:'suit'}]},
    /* second job line at each workplace (more openings) */
    factory2:{n:'Factory (Logistics)',b:'factory',ranks:[
      {r:'Forklift Driver',pay:110,t:'',l:0,dress:'casual'}]},
    fast2:{n:'Golden Bun (Kitchen)',b:'fast',ranks:[
      {r:'Kitchen Hand',pay:65,t:'',l:0},
      {r:'Delivery Rider',pay:80,t:'',l:0,dress:'casual'},
      {r:'Grill Cook',pay:120,t:'fnb',l:1,dress:'casual'},
      {r:'Area Manager',pay:220,t:'fnb',l:2,dress:'smart'}]},
    resto2:{n:'Restaurant (Management)',b:'resto',ranks:[
      {r:'Restaurant Manager',pay:310,t:'fnb',l:3,dress:'suit'}]},
    market2:{n:'Fresh Market (Delivery & Promotions)',b:'market',ranks:[
      {r:'Delivery Driver',pay:90,t:'',l:0,dress:'casual'},
      {r:'Product Promoter',pay:190,t:'sal',l:2,dress:'smart'}]},
    mall2:{n:'Clothes Mall (Promotions)',b:'mall',ranks:[
      {r:'Sales Promoter',pay:150,t:'cus',l:1,dress:'smart'},
      {r:'Mall Manager',pay:320,t:'sal',l:2,dress:'suit'}]},
    thrift2:{n:'Second-Hand Shop (Workshop)',b:'thrift',ranks:[
      {r:'Sorter',pay:65,t:'',l:0},
      {r:'Repair Technician',pay:140,t:'eng',l:1,dress:'casual'}]},
    pawn2:{n:'Second-Hand Shop (Back office)',b:'thrift',ranks:[
      {r:'Security Guard',pay:95,t:'',l:0,dress:'casual'},
      {r:'Bookkeeper',pay:150,t:'fin',l:1,dress:'smart'}]},
    hosp2:{n:'Hospital (Support)',b:'hosp',ranks:[
      {r:'Cleaner',pay:75,t:'',l:0},
      {r:'Lab Technician',pay:180,t:'tech',l:2,dress:'casual'},
      {r:'General Manager',pay:330,t:'fin',l:3,dress:'suit'}]},
    elec3:{n:'Electronics Store (Service)',b:'elec',ranks:[
      {r:'Delivery & Install',pay:95,t:'',l:0,dress:'casual'},
      {r:'Repair Technician',pay:170,t:'eng',l:1,dress:'casual'},
      {r:'IT Support Lead',pay:240,t:'tech',l:2,dress:'smart'}]},
    /* modern job lines (CHANGELOG 105): new lines only, so no saved job changes position */
    elec4:{n:'Electronics Store (Digital Studio)',b:'elec',ranks:[
      {r:'Data Analyst',pay:165,t:'data',l:1,dress:'casual'},
      {r:'Data Scientist',pay:240,t:'data',l:2,dress:'smart'},
      {r:'UX Designer',pay:245,t:'media',l:2,dress:'smart'},
      {r:'Machine Learning Lead',pay:430,t:'data',l:3,dress:'suit'}]},
    bank2:{n:'Bank (Analytics)',b:'bank',ranks:[
      {r:'Fraud Analyst',pay:235,t:'data',l:2,dress:'smart'}]},
    mall3:{n:'Clothes Mall (Studio)',b:'mall',ranks:[
      {r:'Content Assistant',pay:140,t:'media',l:1,dress:'casual'},
      {r:'Social Media Manager',pay:215,t:'media',l:2,dress:'smart'},
      {r:'Brand Director',pay:320,t:'media',l:2,dress:'suit'}]},
    factory3:{n:'Factory (Green Energy)',b:'factory',ranks:[
      {r:'Solar Installer',pay:150,t:'green',l:1,dress:'casual'},
      {r:'EV Charging Technician',pay:175,t:'green',l:1,dress:'casual'},
      {r:'Energy Systems Engineer',pay:260,t:'green',l:2,dress:'smart'},
      {r:'Sustainability Manager',pay:340,t:'green',l:2,dress:'suit'}]},
    market3:{n:'Fresh Market (Fulfilment)',b:'market',ranks:[
      {r:'Warehouse Picker',pay:95,t:'',l:0,dress:'casual'},
      {r:'Dispatch Coordinator',pay:155,t:'logi',l:1,dress:'casual'},
      {r:'Supply Chain Planner',pay:230,t:'logi',l:2,dress:'smart'},
      {r:'Regional Logistics Manager',pay:330,t:'logi',l:2,dress:'suit'}]}
  };
  /* dress codes: casual < smart casual < business suit */
  Object.keys(CAREERS).forEach(function(c){CAREERS[c].ranks.forEach(function(rk){
    if(rk.dress==='suit'&&rk.l<=2&&rk.pay<300)rk.dress='smart';
    else if(rk.dress==='casual'&&rk.l>=2)rk.dress='smart';
  })});
  /* gym jobs */
  CAREERS.gym={n:'Gym',ranks:[
    {r:'Front Desk',pay:85,t:'',l:0,dress:'casual'},
    {r:'Gym Instructor',pay:120,t:'sal',l:1,dress:'casual'},
    {r:'Operations Assistant',pay:250,t:'sal',l:2,dress:'smart'}]};
  /* per-game pay variation (CONFIG.jobs.payVary): rk.base is the pay set above; rk.pay is this game's pay */
  Object.keys(CAREERS).forEach(function(c){CAREERS[c].ranks.forEach(function(rk){rk.base=rk.pay})});
  function applyPayVar(){
    var v=CONFIG.jobs.payVary||0;if(!S.payVar)S.payVar={};
    Object.keys(CAREERS).forEach(function(c){CAREERS[c].ranks.forEach(function(rk,i){
      var key=c+'_'+i;if(S.payVar[key]==null)S.payVar[key]=Math.round((Math.random()*2-1)*v*1000)/1000;
      rk.pay=Math.round(rk.base*(1+S.payVar[key]));
    })});
  }
  /* the better the pay, the more qualifications from different fields it asks for.
    q = list of [track, level]. Pay 250+ asks for a second field (up to a Degree); pay 450+ for a third. */
  var COMP={factory:['eng','tech','fin'],fast:['fnb','sal','fin'],resto:['fnb','sal','fin'],market:['sal','fnb','fin'],mall:['sal','fin','fnb'],thrift:['sal','fin','eng'],pawn:['fin','tech','sal'],bank:['fin','tech','sal'],hosp:['med','tech','eng'],elec:['sal','tech','fin'],gym:['sal','med']};
  /* Build each job's qualification list (rk.q) from CONFIG.jobs.
    rk.q is a list of [track, level]; rk.kn is the knowledge needed. */
  var CFG_WARN=[];  /* problems found in CONFIG, shown in the Daily log when the game loads */
  (function buildQuals(){
    var J=CONFIG.jobs, pick=J.pick||{};
    /* turn 'Finance Degree' into ['fin',3]; returns null if the name is not recognised */
    function parseQual(txt){
      var t=String(txt).trim().toLowerCase(), hit=null;
      Object.keys(TRACKS).forEach(function(k){
        var T=TRACKS[k];
        T.lv.forEach(function(lv,i){if(t===(T.n+' '+lv).toLowerCase())hit=[k,i+1]});
      });
      return hit;
    }
    /* how many roles carry each name, so a shared name can be flagged */
    var count={};
    Object.keys(CAREERS).forEach(function(c){CAREERS[c].ranks.forEach(function(rk){count[rk.r]=(count[rk.r]||0)+1})});
    var used={};
    Object.keys(CAREERS).forEach(function(c){var b=CAREERS[c].b||c;CAREERS[c].ranks.forEach(function(rk){
      var full=CAREERS[c].n+': '+rk.r, key=pick[full]?full:(pick[rk.r]&&count[rk.r]===1?rk.r:null);
      if(key){
        used[key]=1;
        var q=[],kn=null,bad=[];
        pick[key].forEach(function(item){
          var m=/^\s*knowledge\s*:\s*(\d+)\s*$/i.exec(item);
          if(m){kn=+m[1];return}
          var p=parseQual(item);if(p)q.push(p);else bad.push(item);
        });
        if(bad.length){CFG_WARN.push('Job settings: "'+key+'" lists something I do not recognise ('+bad.join(', ')+'), so the automatic rule is used for it.')}
        else{
          rk.q=q;
          rk.l=q.reduce(function(a,x){return Math.max(a,x[1])},0);  /* highest level asked, used for dress code and wording */
          if(q.length)rk.t=q[0][0];
          rk.kn=kn!=null?kn:q.reduce(function(a,x){return Math.max(a,knFor(x[0],x[1]))},0);
          rk.picked=1;
          return;
        }
      }
      /* automatic rule */
      rk.q=[];rk.kn=knFor(rk.t,rk.l);
      if(!rk.l)return;
      rk.q.push([rk.t,rk.l]);
      if(rk.pay>=J.secondQualPay){
        var cp=(COMP[b]||[]).filter(function(t){return t!==rk.t});
        if(cp[0])rk.q.push([cp[0],Math.min(rk.l,J.secondQualMaxLevel,TRACKS[cp[0]].lv.length)]);
        if(rk.pay>=J.thirdQualPay&&cp[1])rk.q.push([cp[1],Math.min(J.thirdQualLevel,TRACKS[cp[1]].lv.length)]);
      }
    })});
    Object.keys(pick).forEach(function(k){
      if(used[k])return;
      var cards=[];Object.keys(CAREERS).forEach(function(c){CAREERS[c].ranks.forEach(function(rk){if(rk.r===k)cards.push('"'+CAREERS[c].n+': '+k+'"')})});
      CFG_WARN.push('Job settings: '+(cards.length>1?'"'+k+'" is a shared name. Use '+cards.join(' or ')+' instead.':'there is no job called "'+k+'". Check the spelling against the Employment Office.'));
    });
    function knFor(t,l){var T=TRACKS[t];return T?(J.knowledgeByLevel[T.lv[l-1]]||0):0}
  })();
  var GENLV=['Certificate','Degree','Honours','Masters'];
  var BOARD=['factory','factory2','factory3','fast','fast2','resto','resto2','market','market2','market3','mall','mall2','mall3','thrift','thrift2','pawn','pawn2','bank','bank2','hosp','hosp2','elec','elec2','elec3','elec4','gym'];
  function lvl(t){if(t==='any'){var mx=0;Object.keys(TRACKS).forEach(function(k){mx=Math.max(mx,lvl(k))});return mx}var c=TRACKS[t].c,n=S.edu[t],k=0;c.forEach(function(e){if(n>=e)k++});return k}
  function bestEdu(){var b=null;Object.keys(S.edu).forEach(function(t){if(lvl(t)>0&&(!b||lvl(t)>lvl(b)))b=t});return b}
  function cur(c){var r=S.career[c];return r==null?null:CAREERS[c].ranks[r]}
  function kreq(rk){return rk.kn||0}
  function qTxt(q){return q[0]==='any'?'Any '+GENLV[q[1]-1]:TRACKS[q[0]].n+' '+TRACKS[q[0]].lv[q[1]-1]}
  function meetsQ(q){return lvl(q[0])>=q[1]}
  function meets(rk){return (rk.q||[]).every(meetsQ)}
  /* a qualification in a few characters for the job board (the full name is the chip's tooltip) */
  var QSHORT={'Food & Beverage':'F&B','Customer Service':'Cust. Service','Engineering':'Eng.','Technology':'Tech','Certificate':'Cert','Honours':'Hons'};
  function qShort(q){return qTxt(q).replace(/Food & Beverage|Customer Service|Engineering|Technology|Certificate|Honours/g,function(w){return QSHORT[w]})}
  function needTxt(rk,c){var parts=[];parts.push(rk.q&&rk.q.length?rk.q.map(qTxt).join(' + '):'No qualification');if(kreq(rk))parts.push('Knowledge '+kreq(rk));return parts.join(' · ')}
  /* work experience (CONFIG.jobs.experience): better-paid jobs need shifts already worked at the same workplace */
  function shiftPayNow(rk){return Math.round(rk.pay*payIdx())}
  function needsExp(rk){var E=CONFIG.jobs.experience;return !!E&&E.shifts>0&&shiftPayNow(rk)>E.payAbove}
  function shiftsAt(c){return (S.shiftsAt||{})[bOf(c)]||0}
  function expShort(c,rk){return needsExp(rk)&&shiftsAt(c)<CONFIG.jobs.experience.shifts}
  function expTxt(c){var n=CONFIG.jobs.experience.shifts;return n+' shift'+(n===1?'':'s')+' worked at the '+NAME[bOf(c)]+' (you have '+Math.min(n,shiftsAt(c))+')'}
  function bOf(c){return CAREERS[c].b||c}
  function sleepLabel(){return 'Sleep at '+(S.home==='bung'?'Villa':'Apartment')}
  function myJob(){var c=Object.keys(S.career)[0];return c&&CAREERS[c]&&cur(c)?{c:c,b:bOf(c),rk:cur(c)}:null}
  function shutLeft(b){return (S.shut&&S.shut[b])||0}
  function shutSum(){var n=0;Object.keys(S.shut||{}).forEach(function(b){n+=S.shut[b]||0});return n}
  /* each morning about a quarter of roles have no openings; an industry-specific storyline freezes or opens up its roles */
  function rollOpenings(){S.closed={};Object.keys(CAREERS).forEach(function(c){CAREERS[c].ranks.forEach(function(rk,i){
    var x=indRole(c,i),p=x&&x.open?0:x&&x.freeze?CONFIG.industry.freezeShare:0.25;if(Math.random()<p)S.closed[c+'_'+i]=1})})}
  /* meals out and Fresh Market meals, built from CONFIG.food */
  var FD=CONFIG.food,TREATS={},GROC={};
  [['snack','burger'],['meal','combo'],['dine','dinner'],['feast','tasting'],['cafe','cafe']].forEach(function(p){var c=FD[p[1]];
    TREATS[p[0]]={n:c.name,ap:c.units,min:c.minutes||0,cost:c.cost,en:c.energy,hap:c.happiness,junk:c.junk?1:0,good:c.healthy||0,hp:c.health,snack:c.snack?1:0}});
  function treatMin(t){return t.min||M(t.ap)}
  [['basic','basic'],['prem','premium']].forEach(function(p){var c=FD[p[1]];GROC[p[0]]={n:c.name,cost:c.cost,en:c.energy,hap:c.happiness,hp:c.health}});
  function eatTxt(g){return '+'+g.en+'% energy, '+sg(g.hap)+' happiness, '+sg(g.hp)+' health'}
  /* Home food lives in S.food: {t:'basic'|'prem'|'cook', u:keep-days used, f:in the fridge, pk:you chose it for the fridge,
    ex:you took it out, cold:cooked meal chilled overnight, sp:spoiled}. A fridge night uses 1 day of keepDaysFridge;
    a night outside uses keepDaysFridge/keepDaysRoom. Chips are just a count (S.chips). */
  var FOODN={basic:function(){return GROC.basic.n},prem:function(){return GROC.prem.n},cook:function(){return 'Cooked meal'}},FOODIC={basic:'🥕',prem:'🍱',cook:'🍲'};
  function roomRate(){return FD.keepDaysFridge/FD.keepDaysRoom}
  function foodLeft(p,inF){if(p.sp)return 0;var r=(inF==null?p.f:inF)?1:roomRate();return Math.max(0,Math.ceil((FD.keepDaysFridge-p.u)/r-1e-9))}
  function fridgeCap(){return owns('fridge')&&!S.homeless?FD.fridgeSpace:0}  /* no home: the fridge is in storage */
  function inFridge(){return (S.food||[]).filter(function(p){return p.f}).length}
  /* fill the fridge: with room for everything, everything fresh goes in; otherwise your picks first,
    then the meals closest to going off, and the ones you took out last */
  function fridgeSync(){
    var F=S.food||[],cap=fridgeCap(),ok=F.filter(function(p){return !p.sp});
    F.forEach(function(p){if(p.sp){p.f=0;p.pk=0;p.ex=0}});
    if(ok.length<=cap){ok.forEach(function(p){p.f=1;p.pk=0;p.ex=0});return}
    var n=0;ok.forEach(function(p){p.f=0});
    ok.forEach(function(p){if(!p.pk)return;if(n<cap){p.f=1;n++}else p.pk=0});
    ok.filter(function(p){return !p.f}).sort(function(a,b){return ((a.ex?1:0)-(b.ex?1:0))||(b.u-a.u)}).forEach(function(p){if(n<cap){p.f=1;n++}});
  }
  /* the fresh item of a type to use next: the one with the fewest days left (food outside the fridge first) */
  function nextFood(t,test){var r=-1;(S.food||[]).forEach(function(p,i){if(p.t===t&&!p.sp&&(!test||test(p))&&(r<0||foodLeft(p)<foodLeft(S.food[r])))r=i});return r}
  function keepTxt(){return owns('fridge')?'❄️ in the fridge it keeps '+FD.keepDaysFridge+' days ('+FD.keepDaysRoom+' outside)':'🌡️ with no fridge it keeps '+FD.keepDaysRoom+' days'}
  /* clothes, built from CONFIG.clothes: n = name, p = base price, w = days it lasts */
  var WEAR={};['casual','smart','suit'].forEach(function(k){var c=CONFIG.clothes[k];WEAR[k]={n:c.name,p:c.price,w:Math.max(1,Math.round(c.days))}});
  var DRESS={casual:WEAR.casual.n+' or better',smart:WEAR.smart.n+' or a '+WEAR.suit.n,suit:'a '+WEAR.suit.n},DSHORT={casual:'Casual',smart:'Smart casual',suit:'Suit'};
  /* salaries move with both the wage trend and the price index */
  function payIdx(){return S.wage*S.px}
  function G(n){return Math.round(n*S.px)}
  function price(k){return S.offer[k]!=null?S.offer[k]:G(WEAR[k].p)}
  function hasDress(req){var c=S.clothes;return req==='suit'?c.suit>0:req==='smart'?(c.smart>0||c.suit>0):(c.casual>0||c.smart>0||c.suit>0)}
  /* no clothes at all: no shift away from home until you buy some */
  function naked(){return !hasDress('casual')}
  var NAKED='You have no clothes to wear. Buy some at the Clothes Mall, or used ones at the Second-Hand Shop, before you can work a shift.';
  /* used Smart Casual or Business Suit from the Second-Hand Shop (CONFIG.clothes.used) */
  function usedPrice(k){return G(WEAR[k].p*CONFIG.clothes.used.priceShare)}
  function buyUsed(k){
    var U=CONFIG.clothes.used,pr=usedPrice(k);
    if(!spend(CONFIG.clothes.buyUnits,pr))return;
    var v0=vitSnap();S.clothes[k]=U.days;S.flags.clothes=1;S.flags.buy=1;
    log('You bought a used '+WEAR[k].n+' outfit for '+money(pr)+vitPar(v0)+'. It will last '+U.days+' days.');
    done();
  }
  function buyWear(k){
    var c=WEAR[k],pr=price(k);
    if(!spend(CONFIG.clothes.buyUnits,pr))return;
    var v0=vitSnap();S.clothes[k]=c.w;delete S.offer[k];S.flags.clothes=1;S.flags.buy=1;S.happy=clamp(S.happy+(CONFIG.clothes[k].happiness||0));
    log('You bought '+c.n+' for '+money(pr)+vitPar(v0)+'. They will last '+c.w+' days.');
    done();
  }
  function bargain(k){
    var c=WEAR[k];
    if(S.barg[k])return refuse('You already bargained over the '+c.n+' today.');
    var CC=CONFIG.clothes;
    if(S.ap<M(CC.bargainUnits))return refuse('Not enough time left to haggle.');
    S.ap-=M(CC.bargainUnits);S.barg[k]=1;
    var pct=CC.bargainMin+Math.floor(Math.random()*(CC.bargainMax-CC.bargainMin+1)),up=Math.random()>=CC.bargainWinChance,np=Math.round(G(c.p)*(1+(up?1:-1)*pct/100));
    S.offer[k]=np;
    log(up?'The clerk wouldn’t budge: the '+c.n+' went UP '+pct+'% to '+money(np)+'.':'You haggled the '+c.n+' DOWN '+pct+'% to '+money(np)+'.',up?'bad':'good');
    done();
  }

