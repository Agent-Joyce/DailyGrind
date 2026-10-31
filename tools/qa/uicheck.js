/* Daily Grind UI check (QA). Loaded only into the throwaway test copy that run-uicheck.ps1 (or run-uicheck.js) builds.
   Needs the test hook (window.__G) injected before the line "  if(!load())fresh();".

   What it does, at whatever width the page is shown (run it once at desktop width and once at phone width):
     1. Sets up a game with something to press everywhere: cash, savings, a job at the Fast Food, a School course in
        progress, belongings, food and chips at home, all outfits.
     2. Every building: walks there with a real tile click, checks the panel's layout, then presses every enabled button
        in it, one at a time, putting the game back exactly as it was before each press.
     3. After every press:
          JS-ERROR      a script error
          DEAD BUTTON   nothing changed (no state change, no toast, no new panel, no pop-up)
          NO TOAST      the action wrote to the log but no toast appeared (pop-ups excepted)
          TEXT≠EFFECT   the log line's energy / happiness / health / knowledge differ from the real change
          TOAST≠EFFECT  the toast's vital icons and numbers differ from the real change
          CHIP≠EFFECT   the chips on the button's row (time, energy, happiness, health, knowledge) differ from the real change
                        (rows marked 'chance', such as a rival call that may end in an argument, compare only their time)
     4. Layout, on every panel, the status page and every pop-up:
          OVERFLOW      the page scrolls sideways, or something sticks out of its card or off the screen
          CLIPPED       a button's label does not fit in the button
          OVERLAP       a button covers its row's text, or two buttons overlap
          BAD TEXT      "NaN", "undefined", "null" or "[object" shown to the player
     5. Situations the main game does not have (SITUATIONS): sick (cold/flu with medical bills, dengue, sick at home),
        rent arrears, a loan to repay, a pawned item to redeem, an industry-specific storyline (its peak, your own job hit,
        the rumour), out of clothes (buying used ones, a job's shift disabled), bank offers, the phone home screen, the Bank app and the Jobs app, a friend's job tip, a rival's job race, meeting and calling rivals. Each checks its buttons are there (MISSING) and presses them.
     6. Flows: ending the day (end-of-day cards, morning card), the action preview, a certificate and its bonus toast,
        the Belongings list on the status page, and the town leaderboard of a game with AI rivals.
   Results: window.__UI_RESULTS, an on-page report, the browser console, and a message to the parent page
   (so a harness page can collect the desktop and phone runs). Settings: window.__UICHECK = {autorun, seed}. */
(function(){
  var CFG=window.__UICHECK||{};
  var G,S,$=function(id){return document.getElementById(id)};
  var errs=[],issues=[],seen={},stats={buttons:0,clicks:0,buildings:0,checks:0,popups:[]};
  window.addEventListener('error',function(e){errs.push(String(e.message||e))});
  function mul(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
  function y(){return new Promise(function(r){setTimeout(r,0)})}
  var VP=function(){return innerWidth<=640?'phone':'desktop'};
  function note(kind,where,msg){var k=kind+'|'+where+'|'+msg;if(seen[k])return;seen[k]=1;issues.push({kind:kind,where:where,msg:msg})}
  async function shot(name){if(window.__uiShot)try{await window.__uiShot(VP()+'_'+name)}catch(e){}}

  /* ---------- the game state every press starts from ---------- */
  var base,baseLoc;
  function setup(){
    G=window.__G;Math.random=mul(CFG.seed||7);
    try{localStorage.removeItem('dailyGrind.save.v1')}catch(e){}
    G.fresh();var w=$('welcomeGo');if(w&&w.offsetParent)w.click();
    var pb=$('previewBtn');if(pb&&/on/i.test(pb.textContent))pb.click();  /* preview is tested on its own */
    S=G.S;
    S.cash=5000;S.bank=800;S.energy=60;S.happy=50;S.health=50;S.know=40;S.ap=1440;S.fed=false;S.homeMeals=0;
    ['tv','console','computer','phone','fridge','microwave','coffee'].forEach(function(k){if(G.ITEMS[k])S.items[k]=1});
    S.food=[{t:'basic',u:0,f:0},{t:'basic',u:0,f:0},{t:'prem',u:0,f:0},{t:'cook',u:0,f:0}];S.chips=2;
    S.clothes={casual:5,smart:5,suit:5};
    if(G.CAREERS.fast)S.career={fast:0};
    if(G.TRACKS.sal){S.enr={sal:0};S.les={sal:0};S.enrolled=true}
    S.morning=null;S.goalPop=null;S.cert=null;
    /* the money above would reach a net-worth rank and pop up its card after every press: mark the ranks below the last as reached */
    S.tier=Math.max(S.tier||0,G.CONFIG.ranks.length-2);
    G.render();
    base=JSON.stringify(G.S);baseLoc=G.loc;
  }
  function closeOver(){[].forEach.call(document.querySelectorAll('.over.show'),function(o){o.classList.remove('show')})}
  function restore(where){
    G.S=JSON.parse(base);S=G.S;G.loc=where&&['phone','pc','bankapp','jobsapp','callsapp','msgsapp'].indexOf(where)<0?where:baseLoc;G.view=where||null;  /* device and app screens are not places */
    closeOver();$('toasts').innerHTML='';G.render();$('toasts').innerHTML='';
  }

  /* ---------- reading numbers off the page ---------- */
  var VK={energy:'energy',happiness:'happy',health:'health',knowledge:'know'};
  function vit(){S=G.S;return {energy:S.energy,happy:S.happy,health:S.health,know:Math.floor(S.know),ap:S.ap,cash:S.cash}}
  function num(t){return +String(t).replace(/−/g,'-').replace(/[^\d.+-]/g,'')}
  function mins(t){var h=/(\d+)h/.exec(t),m=/(\d+)m/.exec(t);return (h?+h[1]*60:0)+(m?+m[1]:0)}
  /* the game writes the real change in brackets: "(30m, +3 happiness)". Numbers outside brackets describe something
    ("+9 knowledge a day"), so they are not compared */
  function parseLog(t){var o={},m,b,re=/([+−-]\d+)(%?) (energy|happiness|health|knowledge)\b/g,br=/\(([^()]*)\)/g;
    while((b=br.exec(t))){re.lastIndex=0;while((m=re.exec(b[1])))o[VK[m[3]]]=(o[VK[m[3]]]||0)+num(m[1])}return o}
  function iconName(el){var s=el.querySelector('svg');return s?s.getAttribute('aria-label'):''}
  /* the toast's vital icons for the real change (class fx; plain .tvit icons only describe something) */
  function parseToasts(list){var o={};list.forEach(function(t){[].forEach.call(t.querySelectorAll('.tvit.fx'),function(v){var k=VK[iconName(v)];if(k)o[k]=(o[k]||0)+num(v.textContent)})});return o}
  /* the chips on a button's row: only plain numbers ("+4%", "−5", "1h 30m"), not "per 3h", "/ 5 days" ... */
  function parseChips(row){var o={};if(!row)return o;
    [].forEach.call(row.querySelectorAll('.chip'),function(c){var n=iconName(c),t=c.textContent.trim();
      if(n==='time'&&/^(\d+h)?\s*(\d+m)?$/.test(t)&&t)o.ap=(o.ap||0)-mins(t);
      else if(VK[n]&&/^[+−-]?\d+%?$/.test(t))o[VK[n]]=(o[VK[n]]||0)+num(t)});
    return o}
  function cmp(kind,where,said,v0,v1){Object.keys(said).forEach(function(k){var d=v1[k]-v0[k];if(said[k]!==d)note(kind,where,(k==='ap'?'time':k)+' shown '+(k==='ap'?-said[k]+' min':said[k])+' but it changed '+(k==='ap'?-d+' min':d))})}

  /* ---------- layout ---------- */
  function visible(el){var r=el.getBoundingClientRect();return r.width>0&&r.height>0&&getComputedStyle(el).visibility!=='hidden'}
  function hit(a,b){var x=Math.min(a.right,b.right)-Math.max(a.left,b.left),y=Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top);return x>2&&y>2}
  function layout(where,root){
    stats.checks++;root=root||document.body;
    var W=document.documentElement.clientWidth;
    if(document.documentElement.scrollWidth>W+1)note('OVERFLOW',where,'the page scrolls sideways ('+document.documentElement.scrollWidth+'px wide in a '+W+'px window)');
    var txt=root.innerText||'';var bad=/NaN|undefined|\[object|\bnull\b/.exec(txt);
    if(bad)note('BAD TEXT',where,'"'+txt.substr(Math.max(0,bad.index-40),90).replace(/\s+/g,' ')+'"');
    [].forEach.call(root.querySelectorAll('button,.chip,.arow-t,.psec summary,.toast,.kv'),function(el){
      if(!visible(el)||el.closest('[hidden]'))return;var r=el.getBoundingClientRect();
      if(r.right>W+1||r.left<-1)note('OVERFLOW',where,'"'+(el.textContent||'').trim().slice(0,40)+'" goes off the screen');
      var box=el.closest('.pbox,.grp,.card,.cert,.evcard');if(box&&box!==el){var b=box.getBoundingClientRect();if(r.right>b.right+1||r.left<b.left-1)note('OVERFLOW',where,'"'+(el.textContent||'').trim().slice(0,40)+'" sticks out of its card')}
      if(el.tagName==='BUTTON'&&el.scrollWidth>el.clientWidth+2&&getComputedStyle(el).overflow!=='visible')note('CLIPPED',where,'button "'+el.textContent.trim().slice(0,40)+'"');
    });
    [].forEach.call(root.querySelectorAll('.arow'),function(row){
      var bs=[].filter.call(row.querySelectorAll('button'),visible),ts=[].filter.call(row.querySelectorAll('.arow-t,.chipl,.arow-n'),visible);
      bs.forEach(function(b,i){var rb=b.getBoundingClientRect();
        ts.forEach(function(t){if(hit(rb,t.getBoundingClientRect()))note('OVERLAP',where,'button "'+b.textContent.trim().slice(0,30)+'" covers "'+t.textContent.trim().slice(0,40)+'"')});
        bs.slice(i+1).forEach(function(c){if(hit(rb,c.getBoundingClientRect()))note('OVERLAP',where,'buttons "'+b.textContent.trim().slice(0,20)+'" and "'+c.textContent.trim().slice(0,20)+'" overlap')})});
    });
  }
  function popupFits(where){
    [].forEach.call(document.querySelectorAll('.over.show'),function(o){var c=o.firstElementChild;if(!c)return;var r=c.getBoundingClientRect();
      if(r.width>innerWidth+1)note('OVERFLOW',where,'pop-up is wider than the screen');
      if(r.height>innerHeight+1&&c.scrollHeight<=c.clientHeight&&getComputedStyle(c).overflowY==='visible')note('OVERFLOW',where,'pop-up is taller than the screen and does not scroll');
      layout(where,c)});
  }

  /* ---------- one press ---------- */
  function key(b){return b.dataset.act+'|'+(b.dataset.arg||'')}
  function shopButtons(){return [].filter.call(document.querySelectorAll('#shop [data-act]'),function(b){return !b.disabled&&visible(b)})}
  async function press(bld,k,idx){
    restore(bld);
    var b=shopButtons().filter(function(x){return key(x)===k})[idx];
    if(!b){note('DEAD BUTTON',bld,k+' disappeared after a restore');return}
    var where=bld+': '+(b.textContent.trim()||k).slice(0,40),row=b.closest('.arow,.opt');
    var chanceRow=!!(row&&row.classList.contains('chance')),chips=parseChips(row),s0=JSON.stringify(G.S),html0=$('shopBody').innerHTML,n0=G.S.logs.length,v0=vit(),e0=errs.length,inp={};
    [].forEach.call(document.querySelectorAll('#shop input'),function(i){inp[i.id]=i.value});
    $('toasts').innerHTML='';
    b.click();await y();stats.clicks++;
    var v1=vit(),lines=G.S.logs.slice(0,G.S.logs.length-n0),toasts=[].slice.call(document.querySelectorAll('#toasts .toast'));
    var modal=!!document.querySelector('.over.show')||!!G.S.pending||!!G.S.cert||!!G.S.over;
    errs.slice(e0).forEach(function(e){note('JS-ERROR',where,e)});
    var inpCh=[].some.call(document.querySelectorAll('#shop input'),function(i){return inp[i.id]!==i.value});
    var chosen=b.dataset.act==='ltenure'&&!b.classList.contains('alt');  /* the loan length already picked: pressing it again changes nothing */
    if(!chosen&&JSON.stringify(G.S)===s0&&!toasts.length&&$('shopBody').innerHTML===html0&&!modal&&!inpCh)note('DEAD BUTTON',where,'nothing happened');
    if(lines.length&&!toasts.length&&!modal)note('NO TOAST',where,'"'+lines[0][0].replace(/^Day \d+: /,'').slice(0,60)+'"');
    var refused=lines.some(function(l){return l[1]==='bad'});
    if(!modal){
      var said={};lines.forEach(function(l){var p=parseLog(l[0]);Object.keys(p).forEach(function(q){said[q]=(said[q]||0)+p[q]})});
      cmp('TEXT≠EFFECT',where,said,v0,v1);
      if(toasts.length)cmp('TOAST≠EFFECT',where,parseToasts(toasts),v0,v1);
      /* shop rows (buy, bundle, chips, bargain, sell, lottery) show what the thing does later, not what buying it does */
      /* rows marked 'chance' (a rival chat or call that may end in an argument) can't promise their happiness: only their time is compared */
      if(!refused&&lines.length&&!/^(buy|groc|bundle|chips|bargain|sell|lotto)\|/.test(k))cmp('CHIP≠EFFECT',where,chanceRow?{ap:chips.ap}:chips,v0,v1);
      toasts.forEach(function(t){var r=t.getBoundingClientRect();if(r.right>innerWidth+1||r.left<-1)note('OVERFLOW',where,'toast goes off the screen')});
    }else{stats.popups.push(where);popupFits(where+' (pop-up)')}
  }

  /* ---------- buildings ---------- */
  async function building(bld){
    stats.buildings++;
    /* walk there from home with a real tile click */
    restore(G.S.home);var v0=vit(),n0=G.S.logs.length,t=document.querySelector('.tile[data-loc="'+bld+'"]');
    if(!t){note('DEAD BUTTON',bld,'no map tile');return}
    if(bld!==G.S.home){
      t.click();await y();
      if(G.view!==bld)note('DEAD BUTTON','walk to '+bld,'the building did not open');
      var lines=G.S.logs.slice(0,G.S.logs.length-n0),toasts=[].slice.call(document.querySelectorAll('#toasts .toast')),v1=vit();
      if(!toasts.length)note('NO TOAST','walk to '+bld,'no toast for the walk');
      var said={};lines.forEach(function(l){var p=parseLog(l[0]);Object.keys(p).forEach(function(q){said[q]=(said[q]||0)+p[q]})});
      cmp('TEXT≠EFFECT','walk to '+bld,said,v0,v1);cmp('TOAST≠EFFECT','walk to '+bld,parseToasts(toasts),v0,v1);
    }
    await pressAll(bld,bld);
  }
  /* layout of a panel, then press each of its enabled buttons in turn */
  async function pressAll(bld,label){
    restore(bld);layout(label+' panel',$('center'));layout(label+' (whole page)',document.body);await shot(label.replace(/\W+/g,'_'));
    var list=shopButtons().map(key),count={};
    for(var i=0;i<list.length;i++){var k=list[i];count[k]=(count[k]||0);stats.buttons++;
      if(/^(step|ltenure)\|/.test(k)&&count[k]>0){count[k]++;continue}
      await press(bld,k,count[k]);count[k]++}
    return list;
  }

  /* ---------- situations the main game does not have: each starts from the main game, adds one situation,
    checks that its buttons are there, and presses everything in that building ---------- */
  /* three rivals for the rival-game situations (the fields the screens read) */
  function uiRivals(){return [['Maya','👩','easy',-30],['Leo','🧔','medium',20],['Sam','🧑','expert',55]].map(function(x){return {name:x[0],ic:x[1],diff:x[2],rel:x[3],cash:300,bank:0,etf:0,job:null,y:300,
    log:[],out:null,edu:{},clothes:{casual:3,smart:0,suit:0},shiftsAt:{},hist:[],know:10,happy:60,health:80,energy:70,tier:-1,rankDay:{},bestJob:null,life:{h:[60],l:[80],crisis:0,unwell:0,best:null},places:['fast']}})}
  var SITUATIONS=[
    {name:'sick with a cold or the flu, with medical bills',bld:'hosp',need:['treat_ill','paydebt','checkup','insure'],
      mod:function(S){S.ill={k:'flu',d:1};S.medDebt=200}},
    {name:'sick with dengue (needs the ward)',bld:'hosp',need:['ward'],
      mod:function(S){S.ill={k:'dengue',d:1}}},
    {name:'sick at home',bld:'apt',need:['nap'],
      mod:function(S){S.ill={k:'flu',d:1}}},
    {name:'rent arrears',bld:'apt',need:['arrears'],
      mod:function(S){S.arrears={bal:120,days:4,fresh:0}}},
    {name:'a loan to repay',bld:'bank',need:['repay','repayall'],
      mod:function(S){S.loan={borrowed:500,principal:500,interest:12,taken:S.day-1,tenure:5,rate:4,due:S.day+4}  /* taken yesterday: the game blocks repaying on the day you borrow */}},
    {name:'a pawned TV to redeem (Thrift Store pawn counter)',bld:'thrift',need:['redeem','sell'],
      mod:function(S){S.items.tv=0;delete S.broken.tv;S.pawned.tv={w:S.day,g:75}}},
    {name:'an industry-specific storyline at its peak (Employment Office outlook and board chips)',bld:'jobs',need:['apply'],
      mod:function(S){S.ind={id:'robots',day:3,len:5,sw:0.4,ph:2,last:'',used:[]};S.indNext=0}},
    {name:'an industry-specific storyline hitting your own job (shift row chips)',bld:'factory',need:['work'],
      mod:function(S){S.ind={id:'robots',day:3,len:5,sw:0.4,ph:2,last:'',used:[]};S.indNext=0;S.career={factory:0};S.jobName='Line Worker';S.shut={};S.ill=null;S.clothes.casual=Math.max(S.clothes.casual||0,3)}},
    {name:'an industry-specific storyline rumour (the day before it starts)',bld:'jobs',need:['apply'],
      mod:function(S){S.ind=null;S.indNext=S.day+1;S.indId='gold'}},
    {name:'a bank offer today, at the Bank',bld:'bank',need:['offer','invest','dep'],
      mod:function(S){S.bankOffer={day:S.day,rate:3.4,days:3,min:300,max:1000};S.promo=null}},
    {name:'the 📱 Bank app with an offer (no loans)',bld:'bankapp',need:['offer','invest','dep','wd'],
      mod:function(S){S.bankOffer={day:S.day,rate:3.4,days:3,min:300,max:1000};S.promo=null}},
    {name:'the 📱 phone home screen',bld:'phone',need:['app'],
      mod:function(S){S.items.phone=1;delete S.broken.phone}},
    {name:'the Jobs app (job board, apply online)',bld:'jobsapp',need:['apply'],
      mod:function(S){S.items.phone=1;delete S.broken.phone}},
    {name:'a promo deposit held, in the Bank app',bld:'bankapp',need:['invest'],
      mod:function(S){S.bankOffer=null;S.promo={v:520,c:500,lock:S.day+2,rate:3.4,last:0}}},
    {name:'a friend’s job tip (Community Centre), at the Employment Office',bld:'jobs',need:['apply'],
      mod:function(S){S.tip={until:S.day+2};S.career={}}},
    {name:'a rival took the last opening (job race), at the Employment Office',bld:'jobs',need:['apply'],
      mod:function(S){S.mode='rivals';S.career={};var k=null;Object.keys(G.CAREERS).some(function(c){if(G.CAREERS[c].ranks[0]&&!(G.CAREERS[c].ranks[0].q||[]).length){k=c+'_0';return true}});if(k){S.closed[k]=1;S.raced={};S.raced[k]='Maya'}}},
    {name:'meeting a rival (encounter card), at the Fast Food',bld:'fast',need:['meet'],
      mod:function(S){S.mode='rivals';S.rivals=uiRivals();S.enc={day:S.day,i:1,loc:'fast',done:false}}},
    {name:'calling rivals from home',bld:'apt',need:['rcall'],
      mod:function(S){S.mode='rivals';S.rivals=uiRivals();S.home='apt';S.homeless=0;S.rcalled=null}},
    {name:'the Calls app (one rival or a group)',bld:'callsapp',need:['rcall'],
      mod:function(S){S.mode='rivals';S.rivals=uiRivals();S.items.phone=1;delete S.broken.phone;S.rcalled=null}},
    {name:'the Messages app (a request to borrow, a bet, a loan due tomorrow)',bld:'msgsapp',need:['msg','rborrow','rbet'],
      mod:function(S){S.mode='rivals';S.rivals=uiRivals();S.items.phone=1;delete S.broken.phone;S.cash=Math.max(S.cash,400);S.asked=null;S.bets=[];
        S.msgs=[{id:1,i:0,k:'borrow',day:S.day,until:S.day+1,amt:80,back:88,st:null},{id:2,i:2,k:'bet',day:S.day,until:S.day+1,amt:50,back:0,st:null},{id:3,i:1,k:'bet',day:S.day-1,until:S.day,amt:50,back:0,st:'no'}];
        S.rloans=[{i:1,dir:'out',amt:100,owe:110,due:S.day+1,late:0},{i:2,dir:'in',amt:60,owe:66,due:S.day+2,late:0}];S.msgN=3}},
    {name:'out of clothes, buying used ones',bld:'thrift',need:['ubuy'],
      mod:function(S){S.clothes={casual:0,smart:0,suit:0}}},
    {name:'out of clothes with a job (shift disabled, "No clothes" chip)',bld:'fast',need:[],
      mod:function(S){S.clothes={casual:0,smart:0,suit:0};S.career={fast:0};S.jobName='Crew Member';S.shut={};S.ill=null}}
  ];
  async function situation(x){
    var keep=base,S0=JSON.parse(base);x.mod(S0);base=JSON.stringify(S0);
    try{
      var label=x.bld+' ('+x.name+')',e0=errs.length;
      var list=await pressAll(x.bld,label);
      x.need.forEach(function(a){if(!list.some(function(k){return k.split('|')[0]===a}))note('MISSING',label,'no enabled "'+a+'" button')});
      errs.slice(e0).forEach(function(e){note('JS-ERROR',label,e)});
    }finally{base=keep}
  }

  /* ---------- flows ---------- */
  async function endOfDay(){
    restore(G.S.home);var d=G.S.day,e0=errs.length;
    $('hudEnd').click();await y();
    if(!G.S.pending)note('DEAD BUTTON','End day','no end-of-day card');
    popupFits('end-of-day card');layout('end-of-day card',$('evwrap'));await shot('event');
    for(var i=0;i<8&&G.S.pending;i++){var b=document.querySelector('#event [data-act]:not(:disabled)');if(!b){note('DEAD BUTTON','end-of-day card','no button to press');break}b.click();await y()}
    if(G.S.day!==d+1)note('DEAD BUTTON','End day','the day did not move on (day '+G.S.day+')');
    if(G.S.morning){popupFits('morning card');await shot('morning');var m=$('mnGo');if(m)m.click();await y()}
    errs.slice(e0).forEach(function(e){note('JS-ERROR','end of day',e)});
    layout('next morning (whole page)',document.body);
  }
  async function preview(){
    restore('gym');var pb=$('previewBtn');if(pb&&/off/i.test(pb.textContent))pb.click();await y();
    var b=shopButtons().filter(function(x){return x.dataset.act==='gym'})[0];
    if(!b){note('DEAD BUTTON','preview','no gym class to try');return}
    var v0=vit();b.click();await y();
    var o=document.querySelector('.over.show');if(!o)note('DEAD BUTTON','preview','pressing a gym class did not open the preview');
    else{popupFits('preview');await shot('preview');$('pvGo').click();await y();
      if(vit().ap===v0.ap)note('DEAD BUTTON','preview','"Do it" did not run the class');
      if(!document.querySelectorAll('#toasts .toast').length)note('NO TOAST','preview','no toast after "Do it"')}
    pb=$('previewBtn');if(pb&&/on/i.test(pb.textContent))pb.click();
  }
  async function certificate(){
    restore('school');var t='sal',e0=errs.length;
    for(var i=0;i<20&&!G.S.cert;i++){var S1=G.S;S1.energy=80;S1.happy=50;S1.ap=1440;S1.studyMin=0;G.render();$('toasts').innerHTML='';
      var b=document.querySelector('#shop [data-act="class"][data-arg="'+t+'"]');if(!b||b.disabled){note('DEAD BUTTON','certificate','no lesson button');return}b.click();await y()}
    if(!G.S.cert){note('DEAD BUTTON','certificate','no certificate after 20 lessons');return}
    popupFits('certificate');await shot('certificate');
    var ft=document.querySelector('#toasts .toast.forced');
    if(!ft)note('NO TOAST','certificate','no bonus toast over the certificate');
    else{var o=parseToasts([ft]),E=G.CONFIG.education,lv=G.TRACKS[t].lv[0];
      if(o.know!==(E.certKnowledge||{})[lv]||o.happy!==(E.certHappiness||{})[lv])note('TOAST≠EFFECT','certificate','bonus toast shows '+JSON.stringify(o)+', CONFIG says knowledge '+(E.certKnowledge||{})[lv]+', happiness '+(E.certHappiness||{})[lv])}
    if(/bonus/i.test($('cpMsg').textContent))note('BAD TEXT','certificate','the certificate still lists the bonus');
    errs.slice(e0).forEach(function(e){note('JS-ERROR','certificate',e)});
    $('cpGo').click();await y();
  }
  async function statusPage(){
    restore(null);G.view=null;G.render();layout('status page',document.body);
    var b=$('belongBtn');if(!b){note('DEAD BUTTON','status page','no Belongings ⓘ');return}
    b.click();await y();var p=$('belongPop');
    if(!p||p.hidden)note('DEAD BUTTON','status page','the Belongings ⓘ did not open the list');
    else{if(!/Computer/.test(p.textContent))note('BAD TEXT','Belongings list','does not list the computer the player owns');layout('Belongings list',p.closest('.grp')||p);await shot('status')}
    /* a game with AI rivals: the town leaderboard on the status page, one rival's story opened */
    restore(null);G.S.mode='rivals';
    G.S.rivals=[['Maya','👩','easy',640,null],['Leo','🧔','medium',2380,{c:'hosp',i:1}],['Sam','🧑','expert',5120,{c:'bank',i:2}]].map(function(x){return {name:x[0],ic:x[1],diff:x[2],cash:x[3],bank:0,etf:0,job:x[4],y:x[3]-90,
      log:['Day 3: got a new job.','Day 2: reached Comfortable.'],out:x[2]==='easy'?{day:9,why:'gave up'}:null,edu:{},clothes:{},shiftsAt:{},hist:[],know:12,happy:60,health:80,energy:70,tier:0,rankDay:{0:4},bestJob:x[4]?{r:'Nurse',pay:210}:null,life:{h:[60,55],l:[80,82],crisis:1,best:null}}});
    G.view=null;G.render();var rb=$('rivBox');
    if(!rb||rb.hidden)note('MISSING','status page (rivals)','no town leaderboard in a game with AI rivals');
    else{if(rb.querySelectorAll('.rivrow').length!==4)note('BAD TEXT','town leaderboard','expected 4 rows (you and 3 rivals), found '+rb.querySelectorAll('.rivrow').length);
      var d=rb.querySelector('details');if(d){d.open=true;await y()}layout('town leaderboard',rb);await shot('status_rivals')}
    G.S.mode='single';G.S.rivals=[];
  }

  /* ---------- run and report ---------- */
  async function run(){
    var t0=Date.now();box('Running the UI check at '+innerWidth+'px…');
    try{if(!window.__G)throw new Error('the game did not start'+(errs.length?': '+errs[0]:''));setup()}
    catch(e){note('JS-ERROR','start',String(e&&e.message||e));var r0={viewport:VP(),width:innerWidth,height:innerHeight,ms:Date.now()-t0,stats:stats,issues:issues};
      window.__UI_RESULTS=r0;try{if(window.parent!==window)window.parent.postMessage({type:'dg-uicheck',res:r0},'*')}catch(x){}report(r0);return r0}
    var blds=[].map.call(document.querySelectorAll('.tile[data-loc]'),function(t){return t.dataset.loc});
    for(var i=0;i<blds.length;i++){box('UI check at '+innerWidth+'px: '+blds[i]+' ('+(i+1)+' of '+blds.length+')…');try{await building(blds[i])}catch(e){note('JS-ERROR',blds[i],'check crashed: '+(e&&e.message||e))}}
    for(var j=0;j<SITUATIONS.length;j++){box('UI check at '+innerWidth+'px: '+SITUATIONS[j].name+'…');try{stats.situations=(stats.situations||0)+1;await situation(SITUATIONS[j])}catch(e){note('JS-ERROR',SITUATIONS[j].name,'check crashed: '+(e&&e.message||e))}}
    for(var f of [statusPage,preview,certificate,endOfDay]){try{await f()}catch(e){note('JS-ERROR',f.name,'check crashed: '+(e&&e.message||e))}}
    var res={viewport:VP(),width:innerWidth,height:innerHeight,ms:Date.now()-t0,stats:stats,issues:issues};
    window.__UI_RESULTS=res;console.log('Daily Grind UI check',res);
    try{if(window.parent!==window)window.parent.postMessage({type:'dg-uicheck',res:res},'*')}catch(e){}
    report(res);return res;
  }
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function box(h){var b=$('uiReport');if(!b){b=document.createElement('div');b.id='uiReport';b.style.cssText='position:fixed;left:8px;right:8px;bottom:8px;max-height:45vh;z-index:99999;overflow:auto;background:#fff;color:#111;font:12px/1.4 system-ui,sans-serif;padding:10px 12px;border:3px solid #16222e;border-radius:10px;box-shadow:0 10px 40px rgba(0,0,0,.4)';document.body.appendChild(b)}b.innerHTML=h;return b}
  function report(r){
    var by={};r.issues.forEach(function(i){(by[i.kind]=by[i.kind]||[]).push(i)});
    box('<b>Daily Grind UI check · '+r.viewport+' ('+r.width+'×'+r.height+')</b> · '+r.stats.buildings+' buildings, '+r.stats.clicks+' presses, '+r.stats.checks+' layout checks, '+Math.round(r.ms/1000)+'s<br>'+
      (r.issues.length?'<b style="color:#b00">'+r.issues.length+' issue(s)</b>':'<b style="color:#1a7f3c">No issues found.</b>')+
      (r.stats.popups.length?'<br>Presses that opened a pop-up (layout checked, numbers not compared): '+esc(r.stats.popups.join('; ')):'')+
      Object.keys(by).map(function(k){return '<div style="margin-top:6px"><b>'+esc(k)+'</b> ×'+by[k].length+'<ul style="margin:2px 0 0 18px;padding:0">'+by[k].map(function(i){return '<li>'+esc(i.where)+': '+esc(i.msg)+'</li>'}).join('')+'</ul></div>'}).join('')+
      ' <button onclick="this.parentNode.remove()">Close</button>');
  }
  window.__uiRun=run;window.__uiParts={setup:setup,restore:restore,parseChips:parseChips,parseToasts:parseToasts,shopButtons:shopButtons};
  window.addEventListener('load',function(){if(CFG.autorun!==false)setTimeout(run,400)});
})();
