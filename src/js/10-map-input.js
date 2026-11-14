  /* ==================================================================
     10. MAP LAYOUT AND INPUT
     Where each building sits on the map, the roads and traffic, keyboard keys, button handlers (ACTIONS) and the Rules text from CONFIG.
     ================================================================== */
  var BP={school:[13,19,15],jobs:[37,22,12.5],bung:[62,19,17],bank:[87,18,17],fast:[91,41,14],resto:[91,67,14],hosp:[91,55,11.5],factory:[9,55,11.5],
          mall:[86,97,16],apt:[62,97,11],park:[74,90,11],elec:[36,97,16],comm:[13,97,10],thrift:[9,67,12],market:[9,41,14],gym:[50,97,12]};
  var KN=[[20,24],[34,22],[50,25],[64,22],[80,24],[84,36],[81,50],[84,64],[80,77],[64,79],[48,76],[34,79],[20,77],[16,64],[19,50],[16,36]];
  var SPUR={school:0,jobs:1,bung:3,bank:4,fast:5,hosp:6,factory:14,resto:7,mall:8,apt:9,park:9,gym:10,elec:11,comm:12,thrift:13,market:15};
  var PARKS=[[25.5,12,4.2,6.5,'pond'],[48.5,12,4,6,'trees'],[74,12,3,5,'trees'],[23,89,4.8,5.5,'fountain']];

  LOCS.forEach(function(l){
    var k=l[0], b=document.createElement('button');
    b.className='tile';b.dataset.loc=k;
    b.style.left=BP[k][0]+'%';b.style.top=BP[k][1]+'%';b.style.setProperty('--w',BP[k][2]);b.style.zIndex=Math.round(BP[k][1]);
    b.innerHTML='<span class="scene">'+art(k)+'<span class="tags"></span><span class="cost"></span></span><b class="lab">'+l[2]+'</b>';
    b.addEventListener('click',function(){toastAll=true;try{enter(k)}finally{toastAll=false}});
    $('board').appendChild(b);
  });
  /* ---- town map: buildings placed freely, irregular roads, parks, trees, traffic ---- */
  function rng(seed){return function(){seed=(seed*16807)%2147483647;return (seed-1)/2147483646}}
  function loopPath(pts){
    var n=pts.length,f=function(v){return v.toFixed(1)},d='M'+f(pts[0][0])+' '+f(pts[0][1]);
    for(var i=0;i<n;i++){
      var a=pts[(i+n-1)%n],b=pts[i],c=pts[(i+1)%n],e=pts[(i+2)%n];
      d+=' C'+f(b[0]+(c[0]-a[0])/6)+' '+f(b[1]+(c[1]-a[1])/6)+' '+f(c[0]-(e[0]-b[0])/6)+' '+f(c[1]-(e[1]-b[1])/6)+' '+f(c[0])+' '+f(c[1]);
    }
    return d+'Z';
  }
  function tree(x,y,s,r){
    return {y:y,svg:'<g transform="translate('+x.toFixed(1)+' '+y.toFixed(1)+')"><ellipse cx="'+(s*.55)+'" cy="2" rx="'+(s*.8)+'" ry="'+(s*.28)+'" fill="#000" opacity=".22"/>'+
      '<g class="sway" style="animation-delay:-'+(r()*4).toFixed(1)+'s"><rect x="-1.7" y="-'+(s*.55)+'" width="3.4" height="'+(s*.55)+'" fill="#6b4a2e"/>'+
      '<circle cx="0" cy="-'+(s*1.1)+'" r="'+(s*.62)+'" fill="url(#leaf)"/><circle cx="-'+(s*.4)+'" cy="-'+(s*.78)+'" r="'+(s*.46)+'" fill="url(#leaf)"/>'+
      '<circle cx="'+(s*.4)+'" cy="-'+(s*.8)+'" r="'+(s*.48)+'" fill="url(#leaf)"/></g></g>'};
  }
  function car(loop,col,dur,begin,sc){
    return '<g><animateMotion dur="'+dur+'s" begin="-'+begin+'s" repeatCount="indefinite" rotate="auto" path="'+loop+'"/><g transform="translate(0 '+(6*sc)+') scale('+sc+')">'+
      '<rect x="-9" y="-4.5" width="18" height="9" rx="2.6" fill="'+col+'"/><rect x="-3" y="-3.6" width="6" height="7.2" rx="1.5" fill="rgba(0,0,0,.22)"/>'+
      '<rect x="3" y="-3.4" width="4.6" height="6.8" rx="1" fill="#bfe3f5"/><rect x="-7.5" y="-3.4" width="2.6" height="6.8" rx="1" fill="#bfe3f5"/>'+
      '<rect x="8" y="-3.6" width="1.4" height="2" fill="#fff6b0"/><rect x="8" y="1.6" width="1.4" height="2" fill="#fff6b0"/></g></g>';
  }
  function bus(loop,begin,sc){
    var w=loopN(5,function(i){return '<rect x="'+(-13+i*5.6)+'" y="-3.4" width="4" height="3" fill="#bfe3f5"/>'});
    return '<g><animateMotion dur="180s" begin="-'+begin+'s" repeatCount="indefinite" rotate="auto" path="'+loop+'"/><g transform="translate(0 '+(6*sc)+') scale('+sc+')">'+
      '<rect x="-16" y="-5" width="32" height="10" rx="2.4" fill="#f2b01e"/>'+w+'<rect x="-16" y="1" width="32" height="1.2" fill="#c9890a"/></g></g>';
  }

  /* ---- small background buildings, kept low-key ---- */
  var MINI={
    police:function(){
      return shade(38,56,42)+box(4,24,58,30,12,'#e4e9ef','#aeb8c4','#f1f5f9')+Rc(4,24,58,8,'#1d4f9c')+T(33,30.2,6,'#fff','POLICE',30)+
        win(9,38,14,10)+win(43,38,14,10)+Rc(28,38,10,16,'#2a3b52',E)+Rc(31,20,8,4,'#555')+
        '<circle cx="33" cy="19" r="2.6" fill="#2b7fff" class="blink"/><circle cx="38" cy="19" r="2.6" fill="#ff3b3b" class="blink" style="animation-delay:.8s"/>'+
        Rc(70,48,14,6,'#fff',E)+Rc(70,50.4,14,1.8,'#1d4f9c')+'<circle cx="74" cy="55" r="1.4" fill="#222"/><circle cx="81" cy="55" r="1.4" fill="#222"/>';
    },
    clinic:function(){
      return shade(34,56,36)+box(6,26,50,28,12,'#f4f7f6','#c3ccc9','#ffffff')+Rc(29.4,29,3.2,10,'#d33')+Rc(26,32.4,10,3.2,'#d33')+
        win(10,42,12,8)+win(40,42,12,8)+Rc(26,42,10,12,'#7aa7b8',E)+T(31,26,5,'#2f7f6f','CLINIC',22);
    },
    petrol:function(){
      return shade(40,56,44)+Rc(10,25,3,28,'#9aa0a6')+Rc(50,25,3,28,'#9aa0a6')+PS([6,20,60,20,66,16,12,16],'#f2f4f5',E)+Rc(6,20,54,5,'#e6e9ec',E)+Rc(6,20,54,2,'#e03a2f')+
        Rc(20,40,6,13,'#e03a2f',E)+Rc(36,40,6,13,'#2f7fd0',E)+Rc(21,42,4,3,'#bfe3f5')+Rc(37,42,4,3,'#bfe3f5')+
        box(66,36,14,18,6,'#eee','#bbb','#fff')+Rc(68,40,8,6,'url(#glass)',E)+Rc(66,34,14,3,'#e03a2f');
    },
    hawker:function(){
      return shade(34,56,36)+box(8,32,34,22,8,'#d6a86a','#a97d44','#e6c08a')+loopN(5,function(i){return Rc(6+i*7.6,28,7.8,6,i%2?'#fff':'#c0392b',E)})+
        Rc(14,38,22,8,'#6b4a2e',E)+T(25,36.8,0.01,'#000','',1)+
        '<circle cx="52" cy="48" r="4" fill="#7a5a3a"/><rect x="51" y="48" width="2" height="6" fill="#555"/><circle cx="64" cy="49" r="3.4" fill="#7a5a3a"/><rect x="63" y="49" width="2" height="5" fill="#555"/>';
    },
    house:function(){
      return shade(30,56,32)+box(6,28,36,26,10,'#f1e6d2','#cdbd9f','#e4d3b4')+PS([3,28,45,28,40,16,9,16],'#b5543f',E)+PS([45,28,55,23,50,12,40,16],'#8e3f2e')+
        win(11,36,10,9,'url(#warm)')+Rc(28,38,8,16,'#6b4423',E);
    },
    shelter:function(){
      return shade(18,56,22)+Rc(2,24,32,3,'#5d636a',E)+Rc(3,27,1.6,27,'#777')+Rc(31,27,1.6,27,'#777')+Rc(5,28,26,16,'url(#glass)',E+' opacity=".55"')+
        Rc(8,44,20,2.4,'#8a6a45')+Rc(12,15,12,9,'#2b6fb3',E)+T(18,22,5,'#fff','BUS',9);
    }
  };
  var MINI_POS=[['police',5.5,29,.95],['petrol',7,85,1],['hawker',93.5,85,1],['shelter',27.5,28,.8],['shelter',72,76,.8]];

  function layout(){
    var b=$('board'),W=b.clientWidth,H=b.clientHeight;
    if(!W||!H)return;
    var X=function(v){return v*W/100},Y=function(v){return v*H/100};
    var pts=KN.map(function(k){return [X(k[0]),Y(k[1])]});
    var loop=loopPath(pts), rw=Math.max(16,Math.min(28,W*0.028)), sc=Math.max(.75,Math.min(1.25,W/1000));
    var r=rng(11), still=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
    var spurs=Object.keys(SPUR).map(function(k,i){
      var q=pts[SPUR[k]],bx=X(BP[k][0]),by=Y(BP[k][1])+3;
      return 'M'+bx.toFixed(1)+' '+by.toFixed(1)+' Q'+((bx+q[0])/2+(i%2?12:-12)).toFixed(1)+' '+((by+q[1])/2).toFixed(1)+' '+q[0].toFixed(1)+' '+q[1].toFixed(1);
    }).join(' ');

    var s='';
    var trees=[],n0=pts.length;
    PARKS.forEach(function(p){
      var cx=X(p[0]),cy=Y(p[1]),rx=X(p[2]),ry=Y(p[3]);
      s+='<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+rx+'" ry="'+ry+'" fill="#9ccf6e" stroke="#76a94e" stroke-width="3"/>';
      s+='<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+(rx*.82)+'" ry="'+(ry*.82)+'" fill="none" stroke="#c9b98a" stroke-width="2" stroke-dasharray="5 4"/>';
      if(p[4]==='pond'){
        s+='<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+(rx*.42)+'" ry="'+(ry*.36)+'" fill="url(#water)" stroke="#5a8f6a" stroke-width="2"/>';
        if(!still)s+='<ellipse cx="'+(cx-rx*.1)+'" cy="'+cy+'" rx="3" ry="1.5" fill="none" stroke="#fff" stroke-width="1"><animate attributeName="rx" values="3;'+(rx*.3)+'" dur="3.4s" repeatCount="indefinite"/><animate attributeName="ry" values="1.5;'+(ry*.25)+'" dur="3.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0" dur="3.4s" repeatCount="indefinite"/></ellipse>';
      }
      if(p[4]==='fountain'){
        s+='<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+(rx*.3)+'" ry="'+(ry*.28)+'" fill="url(#water)" stroke="#b9bdc2" stroke-width="3"/><rect x="'+(cx-2)+'" y="'+(cy-10)+'" width="4" height="10" fill="#b9bdc2"/>';
        if(!still)for(var j=0;j<3;j++)s+='<circle cx="'+(cx+(j-1)*4)+'" cy="'+(cy-10)+'" r="1.6" fill="#e9f7ff"><animate attributeName="cy" values="'+(cy-10)+';'+(cy-24+j*3)+';'+(cy-6)+'" dur="1.6s" begin="-'+(j*.5)+'s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;1;0" dur="1.6s" begin="-'+(j*.5)+'s" repeatCount="indefinite"/></circle>';
      }
      s+='<rect x="'+(cx-9)+'" y="'+(cy+ry*.62)+'" width="18" height="4" rx="1" fill="#8a6a45"/>';
      for(var i=0;i<(p[4]==='trees'?5:3);i++){
        var a=r()*6.28,rho=.45+r()*.45;
        trees.push(tree(cx+Math.cos(a)*rx*rho,cy+Math.sin(a)*ry*rho+8,(11+r()*6)*sc,r));
      }
    });
    s+='<g fill="none" stroke-linecap="round" stroke-linejoin="round">'+
      '<path d="'+loop+' '+spurs+'" stroke="#c9c6bd" stroke-width="'+(rw+12)+'"/>'+
      '<path d="'+loop+'" stroke="#454a50" stroke-width="'+rw+'"/>'+
      '<path d="'+spurs+'" stroke="#454a50" stroke-width="'+(rw*.62)+'"/>'+
      '<path d="'+loop+'" stroke="#f2d16b" stroke-width="1.6" stroke-dasharray="9 8"/></g>';
    pts.forEach(function(p,i){
      if(i%4!==2)return;
      var a=pts[(i+n0-1)%n0],b=pts[(i+1)%n0],ang=Math.atan2(b[1]-a[1],b[0]-a[0])*180/Math.PI;
      s+='<g transform="translate('+p[0].toFixed(1)+' '+p[1].toFixed(1)+') rotate('+ang.toFixed(1)+')" fill="#fff" opacity=".8">'+
        [-2,-1,0,1,2].map(function(k){return '<rect x="'+(k*5.2*sc-1.3)+'" y="'+(-rw/2+1.5)+'" width="2.6" height="'+(rw-3)+'"/>'}).join('')+'</g>';
    });
    pts.forEach(function(p,i){
      var dx=p[0]-W/2,dy=p[1]-H/2,m=Math.hypot(dx,dy)||1;
      trees.push(tree(p[0]+dx/m*(rw+22),p[1]+dy/m*(rw+22)+6,(12+r()*5)*sc,r));
    });
    /* traffic lights + lamps, placed just outside the road */
    var n=pts.length;
    pts.forEach(function(p,i){
      var dx=p[0]-W/2,dy=p[1]-H/2,m=Math.hypot(dx,dy)||1,ox=dx/m,oy=dy/m;
      if(i%4===2){
        var k=sc*.9,lx=p[0]+ox*(rw/2+9),ly=p[1]+oy*(rw/2+9);
        var lamp=function(cy,col,vals,kt,i2){return '<circle cx="0" cy="'+cy+'" r="1.7" fill="'+col+'" opacity=".2">'+
          (still?'':'<animate attributeName="opacity" calcMode="discrete" values="'+vals+'" keyTimes="0;.5;.9" dur="24s" begin="-'+(i*3+i2)+'s" repeatCount="indefinite"/>')+'</circle>'};
        trees.push({y:ly,svg:'<g transform="translate('+lx.toFixed(1)+' '+ly.toFixed(1)+') scale('+k+')"><ellipse cx="1.5" cy="1" rx="4" ry="1.4" fill="#000" opacity=".22"/>'+
          '<rect x="-.8" y="-14" width="1.6" height="14" fill="#4a4f55"/><rect x="-2.6" y="-26" width="5.2" height="13" rx="1.6" fill="#22272c"/>'+
          lamp(-23,'#ff3b30','1;.2;.2','',0)+lamp(-19.5,'#ffb300','.2;.2;1','',0)+lamp(-16,'#2ecc71','.2;1;.2','',0)+'</g>'});
      }else if(i%2===1){
        var lx2=p[0]+ox*(rw/2+7),ly2=p[1]+oy*(rw/2+7);
        trees.push({y:ly2,svg:'<g transform="translate('+lx2.toFixed(1)+' '+ly2.toFixed(1)+')"><circle cx="0" cy="-12" r="7" fill="#fff3a0" opacity=".22"/><rect x="-.7" y="-12" width="1.4" height="12" fill="#555a60"/><circle cx="0" cy="-12.5" r="1.8" fill="#fff6b0"/></g>'});
      }
    });
    MINI_POS.forEach(function(q){
      if(W<640)return;
      var k=sc*.7*q[3];
      trees.push({y:Y(q[2]),svg:'<g transform="translate('+(X(q[1])-38*k).toFixed(1)+' '+(Y(q[2])-56*k).toFixed(1)+') scale('+k.toFixed(2)+')">'+MINI[q[0]]()+'</g>'});
    });
    trees.sort(function(a,b){return a.y-b.y});
    s+=trees.map(function(t){return t.svg}).join('');
    if(!still){
      s+=car(loop,'#d94f3d',120,8,sc)+car(loop,'#2f7fbf',140,50,sc)+car(loop,'#eceff1',110,75,sc)+car(loop,'#3a9a5b',150,115,sc)+bus(loop,30,sc);
      ['#c8453b','#2b4a8a','#e0a526'].forEach(function(c,i){
        s+='<g><animateMotion dur="'+(150+i*30)+'s" begin="-'+(i*45)+'s" repeatCount="indefinite" path="'+loop+'"/><g transform="translate(0 '+(-(rw/2+8))+')"><circle cy="-6" r="2.3" fill="#e8c7a8"/><rect x="-2" y="-4" width="4" height="7" rx="1.5" fill="'+c+'"/></g></g>';
      });
    }
    $('map').setAttribute('viewBox','0 0 '+W+' '+H);
    $('map').innerHTML=s;
  }
  /* on phones the panel lives below the map instead of floating over it */
  function placeCenter(){
    var c=$('center'),b=$('board'),mob=window.innerWidth<=640;
    var ev=$('evwrap'),inside=!mob||(!!view&&!S.pending);
    /* phones: the overview sits below the map, but a building's panel overlays the map itself */
    if(inside&&c.parentNode!==b)b.appendChild(c);
    else if(!inside&&c.parentNode===b)b.parentNode.insertBefore(c,b.nextSibling);
    if(mob&&ev.parentNode!==document.body)document.body.appendChild(ev);
    else if(!mob&&ev.parentNode!==b)b.appendChild(ev);
    c.classList.toggle('ovl',mob&&inside);b.classList.toggle('ovlOpen',mob&&inside);
  }
  placeCenter();
  window.addEventListener('resize',placeCenter);
  window.addEventListener('resize',layout);
  if(window.ResizeObserver)new ResizeObserver(layout).observe($('board'));
  layout();

  $('shop').addEventListener('click',function(e){
    if(S.over)return;
    var b=e.target.closest('[data-act]'); if(!b)return;
    var a=b.dataset.act,g=b.dataset.arg;
    toastAll=true;try{shopAct(a,g,b)}finally{toastAll=false}
  });
  /* ---------- ACTIONS: every panel button (data-act) in one table ----------
    run(arg, button)  what the button does (arg is its data-arg)
    kind              its colour in the day bar under the clock (work, study, gym, rest, food, health, fun; anything else is "errand")
    dry               the action preview may try it on a copy of the game (see dryRun; CONFIG.ui.preview.actions picks which ones it shows)
    ui                only changes the screen (amount steppers, toggles): no game time passes
    To add a button: give it data-act="name" in its panel and add one line here. */
  var ACTIONS={
    contract:{run:function(g){proposeContract(g)},kind:'fun'},
    cdo:{run:function(g){contractDo(g)},kind:'fun'},
    promise:{run:function(g){resolvePromise(g)},kind:'fun'},
    social:{run:function(g){socialDecision(g)},kind:'fun'},
    work:     {run:function(g){work(g)},          kind:'work',   dry:true},
    gig:      {run:function(){gigRun()},          kind:'work'},
    tutor:    {run:function(){tutor()},           kind:'work',   dry:true},
    post:     {run:function(){creatorPost()},     kind:'work'},
    fac:      {run:function(g){factoryDo(g)},     kind:'work'},
    'class':  {run:function(g){study(g)},         kind:'study',  dry:true},
    study:    {run:function(){selfStudy()},       kind:'study',  dry:true},
    enrol:    {run:function(g){enrol(g)}},
    apply:    {run:function(g){apply(g)}},
    gym:      {run:function(g){gymSession(g)},    kind:'gym',    dry:true},
    nap:      {run:function(){nap()},             kind:'rest',   dry:true},
    fun:      {run:function(g){leisure(g)},       kind:'fun',    dry:true},
    comm:     {run:function(g){community(g)},     kind:'fun',    dry:true},
    rest:     {run:function(){endWeek(true)}},
    treat:    {run:function(g){treat(g)},         kind:'food',   dry:true},
    groc:     {run:function(g){buyGroc(g)},       kind:'food',   dry:true},
    bundle:   {run:function(g){buyBundle(g)},     kind:'food',   dry:true},
    chips:    {run:function(){chips()},           kind:'food'},
    eatchips: {run:function(){eatChips()},        kind:'food',   dry:true},
    cook:     {run:function(g){cook(g)},          kind:'food',   dry:true},
    eatc:     {run:function(g){eatCooked(g)},     kind:'food',   dry:true},
    eatp:     {run:function(g){eatPrem(g)},       kind:'food',   dry:true},
    binsp:    {run:function(){binSpoiled()}},
    treat_ill:{run:function(){treatIll()},        kind:'health', dry:true},
    checkup:  {run:function(){checkup()},         kind:'health', dry:true},
    ward:     {run:function(){ward()},            kind:'health', dry:true},
    insure:   {run:function(){insure()}},
    paydebt:  {run:function(){payDebt()}},
    buy:      {run:function(g){buy(g)},                          dry:true},
    cbuy:     {run:function(g){buyWear(g)}},
    ubuy:     {run:function(g){buyUsed(g)},                      dry:true},
    bargain:  {run:function(g){bargain(g)}},
    sell:     {run:function(g){sell(g)}},
    repair:   {run:function(g){repair(g)}},
    redeem:   {run:function(g){redeem(g)}},
    lotto:    {run:function(){buyTicket()},                      dry:true},
    home:     {run:function(g){moveHome(g)}},
    payrent:  {run:function(){payRent()}},
    arrears:  {run:function(){payArrears()}},
    dep:      {run:function(){moveMoney('dep')}},
    wd:       {run:function(){moveMoney('wd')}},
    invest:   {run:function(g){invest(g)}},
    offer:    {run:function(){buyOffer()}},
    app:      {run:function(g){openApp(g)},        ui:true},  /* opens an app screen: no time */
    pc:       {run:function(){openDevice('pc')},   ui:true},
    meet:     {run:function(g){rivalMeet(g)},     kind:'fun'},
    rcall:    {run:function(g){rivalCall(g)},     kind:'fun'},
    msg:      {run:function(g){replyMsg(g)},      kind:'fun'},
    rborrow:  {run:function(g){askBorrow(g)},     kind:'fun'},
    rbet:     {run:function(g){offerBet(g)},      kind:'fun'},
    flat:     {run:function(g){inviteFlat(g)},    kind:'fun'},
    unflat:   {run:function(){kickFlat()},        kind:'fun'},
    fdo:      {run:function(g){flatDo(g)},        kind:'fun'},
    pact:     {run:function(g){proposePact(g)},   kind:'fun'},
    prenew:   {run:function(){renewPact()},       kind:'fun'},
    pend:     {run:function(){endPact()},         kind:'fun'},
    pbetray:  {run:function(){betrayPact()},      kind:'fun'},
    sab:      {run:function(g){sabotage(g)},      kind:'fun'},
    accuse:   {run:function(g){accuse(g)},        kind:'fun'},
    device:   {run:function(g){openDevice(g)},     ui:true},  /* ← Phone / ← Computer: back to the device's home screen */
    divest:   {run:function(g){divest(g)}},
    borrow:   {run:function(){borrow()}},
    repay:    {run:function(){repay(false)}},
    repayall: {run:function(){repay(true)}},
    step:     {run:function(g){stepAmt(g)},       ui:true},  /* amount stepper: no re-render, the page stays where it is */
    frig:     {run:function(g){fridgeToggle(g)},  ui:true},  /* fridge pick: the page stays where it is */
    alljobs:  {run:function(){allJobs=!allJobs;render()},  ui:true},
    ltenure:  {run:function(g){loanTenure=+g;render()},    ui:true}
  };
  function shopAct(a,g,b){var A=ACTIONS[a];if(A)A.run(g,b)}
  /* after a choice on the end-of-day card, jump back to the top so the next card is seen (panel buttons do not scroll: their news is a toast) */
  function toTop(){
    var c=$('center');c.scrollTop=0;
    var h=$('hud'),hb=h&&getComputedStyle(h).position!=='static'?Math.max(0,h.getBoundingClientRect().bottom):0,r=c.getBoundingClientRect();
    if(r.top<hb)window.scrollTo({top:Math.max(0,window.scrollY+r.top-hb-4),behavior:'smooth'});
  }
  $('event').addEventListener('click',function(e){
    var b=e.target.closest('[data-act]');if(!b||S.over)return;
    var a=b.dataset.act;
    if(a==='evyes')decide(true);else if(a==='evno')decide(false);else if(a==='evopt')storyPick(+b.dataset.arg);
    else if(a==='cont'&&S.pending&&S.pending.ev.done){if(S.pending.q&&S.pending.q.length){S.pending.ev=S.pending.q.shift();render()}else rollover(S.pending.rested)}
    toTop();
  });
  $('belongBtn').addEventListener('click',function(e){e.stopPropagation();var p=$('belongPop'),open=p.hidden;p.hidden=!open;this.setAttribute('aria-expanded',String(open))});
  document.addEventListener('click',function(e){var p=$('belongPop');if(!p.hidden&&!e.target.closest('#belongPop')){p.hidden=true;$('belongBtn').setAttribute('aria-expanded','false')}});
  $('again').addEventListener('click',function(){clearSave();fresh()});
  $('keep').addEventListener('click',function(){$('over').classList.remove('show')});
  /* Daily log: Expand shows many more lines (the log can also be dragged taller by its corner) */
  $('logBig').addEventListener('click',function(){modernLog($('logDrawer').hidden)});
  function muteUI(){$('muteBtn').textContent=MUTE?'🔇 Sound off':'🔊 Sound on';$('muteBtn').setAttribute('aria-pressed',String(MUTE));$('muteBtn').setAttribute('aria-label',MUTE?'Sound off. Turn sound on':'Sound on. Turn sound off')}
  muteUI();
  /* Reset takes a second click instead of window.confirm(), which some embedded browsers block silently */
  var resetArmed=0;
  $('resetBtn').addEventListener('click',function(){
    var b=this;
    if(!resetArmed){resetArmed=setTimeout(function(){resetArmed=0;b.textContent='↺ Reset'},4000);b.textContent='Click again to confirm';return}
    clearTimeout(resetArmed);resetArmed=0;b.textContent='↺ Reset';
    clearSave();$('over').classList.remove('show');$('rules').classList.remove('show');fresh()});
  $('muteBtn').addEventListener('click',function(){MUTE=!MUTE;try{localStorage.setItem('dailyGrind.mute',MUTE?'1':'0')}catch(e){}muteUI();if(!MUTE)snd('coin')});
  $('gpGo').addEventListener('click',function(){S.goalPop=0;render()});
  $('cpGo').addEventListener('click',function(){S.cert=null;render()});
  $('cpNext').addEventListener('click',function(){var c=S.cert;if(!c)return;S.cert=null;enrol(c.t)});
  $('mnGo').addEventListener('click',function(){S.morning=null;render()});
  $('mnList').addEventListener('click',function(e){var b=e.target.closest('[data-cg]');if(b)congratulate(+b.dataset.cg)});
  $('phoneBtn').addEventListener('click',function(){openDevice('phone')});
  $('hudLeave').addEventListener('click',function(){if(S.over||S.pending)return;view=null;render()});
  /* clicking or tapping the map outside the open window works like Leave (buildings still walk you there) */
  /* ...and with no building open, it hides the overview window so the map is clear (the Overview button brings it back) */
  document.addEventListener('click',function(e){
    if(S.over||S.pending||document.querySelector('.over.show'))return;
    if(!e.target.closest||!document.contains(e.target)||e.target.closest('#center,.tile,.over,#hud,#appTop,#appNav,#logDrawer,#characterPop,[data-portrait],button,a,input,select,textarea,label'))return;
    if(view){view=null;render()}
    else if(!ovHidden&&window.innerWidth>640){ovHidden=true;render()}
  });
  $('hudOv').addEventListener('click',function(){ovHidden=false;view=null;render()});
  $('ovHide').addEventListener('click',function(){ovHidden=true;render()});
  function closePlaces(){var p=$('placesList');if(p&&p.parentNode)p.parentNode.removeChild(p)}
  function showPlaces(){
    closePlaces();
    var box=document.createElement('div');box.id='placesList';box.className='places';box.setAttribute('role','dialog');box.setAttribute('aria-label','Places in town');
    var rows=LOCS.slice().sort(function(a,b){return dist(loc,a[0])-dist(loc,b[0])});
    box.innerHTML='<button class="btn alt pclose" type="button" id="placesClose">Close</button><h3>📍 Places</h3>'+
      rows.map(function(l){
        var k=l[0],d=dist(loc,k)*WALK,here=k===loc,home=k===S.home&&!S.homeless,sh=shutLeft(k);
        return '<div class="prow"><div><b>'+l[1]+' '+l[2]+'</b><small>'+(here?'You are here':hm(d)+' walk')+(home?' · Home':'')+(sh?' · 🔒 closed '+sh+'d':'')+'</small></div>'+
          (here?'<span class="tags" style="position:static;flex-direction:row"><span class="tag you">Here</span></span>':'<button class="btn" type="button" data-go="'+k+'" style="min-height:34px;padding:4px 12px;font-size:.8rem">Go</button>')+'</div>';
      }).join('');
    $('board').appendChild(box);
    box.addEventListener('click',function(e){
      if(e.target.id==='placesClose'){closePlaces();return}
      var b=e.target.closest('[data-go]');if(!b)return;
      closePlaces();enter(b.dataset.go);
    });
  }
  $('hudPlaces').addEventListener('click',function(){if(S.over||S.pending)return;showPlaces()});

  $('hudEnd').addEventListener('click',function(){if(S.over||S.pending)return;endWeek(false)});
  $('goals').addEventListener('click',function(e){if(e.target.id==='hideGoals'){S.tut=1;render()}});
  /* the welcome screen's game mode: a single game, or a game with AI rivals (how many, which level) */
  var pickMode='single',pickCount=3,pickLevel='medium',pickMood=CONFIG.rivals.politics.defaultMood;
  function paintMode(){
    [].forEach.call(document.querySelectorAll('#modes [data-mode]'),function(b){var on=b.dataset.mode===pickMode;b.setAttribute('aria-pressed',on?'true':'false');b.className='btn'+(on?'':' alt')});
    $('rivOpts').hidden=pickMode!=='rivals';
    [].forEach.call(document.querySelectorAll('#rivCount [data-rc]'),function(b){b.classList.toggle('on',+b.dataset.rc===pickCount)});
    [].forEach.call(document.querySelectorAll('#rivLevel [data-rl]'),function(b){b.classList.toggle('on',b.dataset.rl===pickLevel)});
    [].forEach.call(document.querySelectorAll('#rivMood [data-rm]'),function(b){b.classList.toggle('on',b.dataset.rm===pickMood)});
    var n=pickMode==='rivals'?CONFIG.rivals.gameDays:CONFIG.time.gameDays;
    $('welcomeGoT').textContent=pickMode==='rivals'?'▶ Start playing · '+pickCount+' AI rival'+(pickCount===1?'':'s'):'▶ Start playing';$('welcomeRivals').hidden=pickMode==='rivals';$('welcomeRivalsT').textContent=CONFIG.rivals.gameDays+' days, three neighbours, a town leaderboard';
    $('modeSingleTxt').textContent=CONFIG.time.gameDays+' days, your own score';$('modeRivalsTxt').textContent=CONFIG.rivals.gameDays+' days, a town leaderboard';
    document.querySelectorAll('#diffs [data-diff]').forEach(function(b){var D=DIFF[b.dataset.diff],sm=b.querySelector('small');if(D&&sm)sm.textContent=D.d.replace(/\.$/,'').replace(/\d+ days/,n+' days')});
  }
  $('modes').addEventListener('click',function(e){var b=e.target.closest('[data-mode]');if(!b)return;pickMode=b.dataset.mode;paintMode()});
  /* the second big button: a game against three medium rivals at Normal, or whatever the Custom game drawer was set to */
  $('welcomeRivals').addEventListener('click',function(){pickMode='rivals';paintMode();$('welcomeGo').click()});
  $('rivOpts').addEventListener('click',function(e){var c=e.target.closest('[data-rc]'),l=e.target.closest('[data-rl]'),md=e.target.closest('[data-rm]');if(c)pickCount=+c.dataset.rc;if(l)pickLevel=l.dataset.rl;if(md)pickMood=md.dataset.rm;paintMode()});
  /* capture phase: before the difficulty handler below starts the game */
  $('diffs').addEventListener('click',function(e){
    var b=e.target.closest('[data-diff]');if(!b||S.flags.diff)return;
    if(pickMode!=='rivals'){S.mode='single';S.rivals=[];return}
    S.mode='rivals';S.townMood=pickMood;S.rep=CONFIG.rivals.politics.rep.start;S.life=blankLife();S.rivalSeed=(Math.random()*2147483647)|0;S.rivals=makeRivals(pickCount,pickLevel,DIFF[b.dataset.diff].cash);
    S.indLeft=Math.max(0,(CONFIG.rivals.industryStorylines||1)-1);S.sagaNext=sagaDay();S.indNext=indDay();  /* storylines spread over the longer game */
  },true);
  $('diffs').addEventListener('click',function(e){
    var b=e.target.closest('[data-diff]');if(!b)return;
    var k=b.dataset.diff,D=DIFF[k];
    S.coach={on:!!($('coachOn')&&$('coachOn').checked),step:0};  /* the guided first day (coachNow) */
    S.diff=k;S.flags.diff=1;S.cash=D.cash;S.px=D.px*(CONFIG.limits.startPriceMin+Math.random()*(CONFIG.limits.startPriceMax-CONFIG.limits.startPriceMin));S.wage=D.wage;S.today=null;T0();
    $('welcome').classList.remove('show');
    log('Difficulty: '+D.n+'. '+D.d.replace(/\d+ days/,gameLen()+' days'),'good');
    if(S.mode==='rivals')log('🏁 A game with AI rivals: '+S.rivals.map(function(r){return r.ic+' '+r.name+' ('+r.diff+' · '+personality(r).name+')'}).join(', ')+'. They live the same '+gameLen()+' days in the same town. Town mood: '+moodX().icon+' '+moodX().name+'. The leaderboard is on the Overview.','good');
    render();
  });
  $('rulesBtn').addEventListener('click',function(){$('rules').classList.add('show');setTimeout(function(){$('rulesClose').focus()},0)});
  $('rulesClose').addEventListener('click',function(){$('rules').classList.remove('show')});
  /* show CONFIG.time values in the fixed welcome text and HUD */
  (function timeText(){
    try{
      $('cfgWalk').textContent=WALK+' minute'+(WALK===1?'':'s');if($('cfgWalkE'))$('cfgWalkE').textContent=Math.abs(CONFIG.time.walkEnergy||0)+'%';
      (function(){var LE=CONFIG.leisure,fx=function(L){return [L.energy?sg(L.energy)+'% energy':'',L.happiness?sg(L.happiness)+' happiness':'',L.health?sg(L.health)+' health':''].filter(Boolean).join(', ')},cf=FD.cafe;
        var ED=CONFIG.education,cK=ED.certKnowledge||{},cH=ED.certHappiness||{},cL=['Certificate','Degree','Honours','Masters'].filter(function(l){return cK[l]||cH[l]});
        var aN=function(l){return l==='Honours'?'Honours':l==='Masters'?'a Masters':'a '+l},same=cL.every(function(l){return cK[l]===cH[l]});
        if($('cfgCert')&&same)$('cfgCert').textContent=cL.length?'Earning a qualification adds knowledge and happiness: '+cL.map(function(l,i){return sg(cK[l])+(i?'':' each')+' for '+aN(l)}).join(', ')+'.':'';
        else if($('cfgCert'))$('cfgCert').textContent=cL.length?'Earning a qualification adds '+cL.map(function(l){return (cK[l]===cH[l]?sg(cK[l])+' knowledge and happiness':[cK[l]?sg(cK[l])+' knowledge':'',cH[l]?sg(cH[l])+' happiness':''].filter(Boolean).join(', '))+' for '+(l==='Honours'?'Honours':(l==='Masters'?'a Masters':'a '+l))}).join('; ')+'.':'';
        if($('cfgHpWork')){var hw=Math.abs(CONFIG.time.workHealthPerHour||0),hl=Math.abs(CONFIG.education.lessonHealthPerHour||0),hs=Math.abs(CONFIG.selfStudy.healthPerHour||0);
          $('cfgHpWork').textContent=hw===hl&&hl===hs?'work and study ('+hw+' health an hour of shifts, lessons and self-study)':'work and study (an hour costs '+hw+' health at work, '+hl+' in a lesson, '+hs+' in self-study)'}
        var SH=CONFIG.shame;if($('cfgShame'))$('cfgShame').textContent='checked when you end the day: net worth under $0 costs '+Math.abs(SH.debtHappiness)+' happiness and '+Math.abs(SH.debtEnergy)+'% energy'+(SH.nearlyBrokeFromDay>1?'; from day '+SH.nearlyBrokeFromDay+', ':'; ')+'net worth under $'+SH.nearlyBrokeBelow+' costs '+Math.abs(SH.nearlyBrokeHappiness)+' happiness. Nothing is taken during the day.'+(SH.noClothesHappiness?' Waking up with no clothes at all costs '+Math.abs(SH.noClothesHappiness)+' happiness, and you can’t work any shift until you buy some (freelance work at home is fine).':'');
        var F=CONFIG.factory;if($('cfgFac'))$('cfgFac').textContent='day labour on the loading dock ('+hm(F.dayLabour.minutes)+', '+(F.dayLabour.perDay===1?'once':F.dayLabour.perDay+' times')+' a day, no dress code) pays '+pctTxt(F.dayLabour.payShare)+' of the lowest Factory wage and does not count as work experience. A safety course (once a game, '+hm(F.course.minutes)+', +'+F.course.knowledge+' knowledge) counts as '+F.course.expShifts+' shift'+(F.course.expShifts>1?'s':'')+' of Factory work experience; a factory tour (once a game, '+hm(F.tour.minutes)+') adds '+F.tour.knowledge+' knowledge and '+F.tour.happiness+' happiness.';
        if($('cfgFun'))$('cfgFun').textContent='at home, watch a show or play games ('+hm(LE.screen.minutes)+', '+fx(LE.screen)+', needs a TV or game console) or call your family '+(LE.call.perDay===1?'once':LE.call.perDay+' times')+' a day ('+hm(LE.call.minutes)+', '+fx(LE.call)+'). At the Park, walk ('+hm(LE.walk.minutes)+', '+fx(LE.walk)+') or jog ('+hm(LE.jog.minutes)+', '+fx(LE.jog)+'). The Restaurant also serves '+cf.name+' ('+hm(cf.minutes)+', '+sg(cf.energy)+'% energy, '+sg(cf.happiness)+' happiness), a snack rather than a meal.'})();
      (function(){var E=CONFIG.events,I=CONFIG.industry,last=function(L){return CONFIG.time.gameDays-L.daysBeforeEnd};
        if($('cfgStory'))$('cfgStory').textContent='each game has one global storyline (an oil crisis, a pandemic…), starting between day '+E.storyline.fromDay+' and day '+last(E.storyline)+', that moves prices, pay and interest for everyone; and one industry-specific storyline (a chip shortage, banks going all-in on AI…), starting between day '+I.fromDay+' and day '+last(I)+', that moves pay for particular jobs by '+Math.round(I.paySwing[0]*100)+'% to '+Math.round(I.paySwing[1]*100)+'% up or down, freezes or opens up hiring, and can lay you off or suspend your workplace. The Employment Office shows a rumour '+(I.rumourDays===1?'the day':I.rumourDays+' days')+' before it starts and its effects while it runs. The two may overlap; shorter macro shocks never come within '+E.storylineGap+' days of either.'})();
      (function(){var Mk=CONFIG.market,R=Mk.returns,O=CONFIG.bank.offers;
        if($('cfgBank'))$('cfgBank').textContent='savings pay about '+Mk.rateBase+'% a day (the rate moves with the news), a fixed deposit '+R.fdOverSavings+'× that, and the ETF, hedge fund and crypto expect about '+R.etf.base+'%, '+R.hf.base+'% and '+R.cry.base+'% a day in a steady market, with bigger swings the more they pay. With a phone or tablet (📱 Phone / tablet apps on the town map), or a computer at home (💻 Computer in your home), the Bank app does all this without the walk (loans still need a visit), and the Jobs app shows the Employment Office job board, where you can apply online (1h, as in person). '+(O&&O.chance>0?'Some mornings from day '+O.fromDay+' the Bank has a one-day offer: a promo deposit at '+O.rate[0]+'–'+O.rate[1]+'% a day for '+dayN(O.days)+'. ':'')+'Overnight gains appear in the morning summary; today’s rates and available products are shown at the Bank.'})();
      (function(){var C=CONFIG.community,f=function(c){return hm(c.minutes)+(c.cost?', $'+c.cost:'')+(c.energy?', '+sg(c.energy)+'% energy':'')+', '+sg(c.happiness)+' happiness'+(c.knowledge?', '+sg(c.knowledge)+' knowledge':'')};
        if($('cfgComm'))$('cfgComm').textContent='once a day each: a night out with friends ('+f(C.nightOut)+'), karaoke ('+f(C.karaoke)+') or volunteering ('+f(C.volunteer)+'). A night out ('+pctTxt(C.nightOut.tipChance)+') or volunteering ('+pctTxt(C.volunteer.tipChance)+') can get you a friend’s job tip: for '+dayN(C.tip.days)+' your next interview is '+Math.round(C.tip.passBonus*100)+'% more likely to pass and never fails for “no openings”.'})();
      (function(){var R=CONFIG.rivals,T=CONFIG.time.gameDays,due=TIERS.filter(function(r){return r.d}).map(function(r){return Math.min(Math.round(r.d*R.gameDays/T),R.gameDays)});
        if($('cfgRivals'))$('cfgRivals').textContent='choose “With AI rivals” on the welcome screen: 1 to 3 computer players (easy, medium, expert or mixed) live the same '+R.gameDays+' days in the same town, under the same prices, pay, storylines, layoffs and job openings. A rival game lasts '+R.gameDays+' days (a single game '+T+'), has '+R.industryStorylines+' industry-specific storylines, and its rank target days stretch to day '+due.join(', ')+'. Reaching '+TIERS[TIERS.length-1].n+' does not end a rival game: everyone plays all '+R.gameDays+' days. The game is won on the Life Score: in each category everyone gets a place, worth '+R.scoring.placePoints.join('/')+' points (1st/2nd/…) × the category weight: '+Object.keys(R.scoring.categories).filter(function(k){return R.scoring.categories[k].on&&LIFE_CATS[k]}).map(function(k){return LIFE_CATS[k].n.toLowerCase()+' ×'+R.scoring.categories[k].weight}).join(', ')+'. Happiness counts as the average over the game, health as unwell nights (ill, or health under '+CONFIG.health.poorBelow+'), stability counts crisis days (no meal, rent arrears, an overdue loan, illness, no clothes), career is your best-paid job, and first to the line rewards reaching each rank earliest. '+'Personalities: '+Object.keys(R.personalities).map(function(k){var p=R.personalities[k];return p.name.toLowerCase()+' ('+p.about+')'}).join('; ')+'. Meaningful help and refusals are remembered (up to '+R.memory.maxEntries+' recent memories). Remembered trust changes lending by '+pctTxt(R.memory.lendPerTrust)+' per point, capped at '+R.memory.maxTrust+' points either way. Rivals can owe up to '+R.memory.maxOwed+' favours; each can become one job introduction on a later morning while you are on speaking terms. Open their Overview profile for their memories. '+(R.jobRace&&R.jobRace.chance>0?'When a '+R.jobRace.levels.join(' or ')+' rival gets a job, it may have taken the last opening: that role has no openings for you the next day (up to '+R.jobRace.maxPerGame+' times a game). ':'')+(function(){var X=R.social;return X?'Each rival has a relationship with you, from enemy to friend. Building it costs time: chat ('+hm(X.chat.minutes)+') or say hello ('+hm(X.hello.minutes)+') when you meet them around town, call them (from home, or by phone anywhere, one or a group; usually +1 or +2, sometimes an argument), or congratulate them on their news ('+hm(X.congratulate.minutes)+'). On bad terms, an interaction may turn tense and make things worse ('+pctTxt(X.tension.per*20)+' base chance at −20, up to '+pctTxt(X.tension.max)+'; personality also affects tension)' +(X.argument&&X.argument.happiness?'; an argument (a call that goes wrong, or tension) also costs you '+Math.abs(X.argument.happiness)+' happiness':'')+'. Friends sometimes tip you off about openings; enemies race you harder for them. ':''})()+(function(){var M=R.money;if(!M)return '';var L=M.loan,B=M.bet;return 'In the 💬 Messages app (phone or computer), rivals may ask to borrow money or offer a bet, and you can ask them. Loans run '+L.days+' days at '+Math.round(L.interest*100)+'%: you get a reminder the morning before yours is due, and if it isn’t paid in full on the due morning your relationship with the lender drops '+Math.abs(L.defaultRel)+', with every other rival '+Math.abs(L.defaultOthersRel)+', and you lose '+Math.abs(L.defaultHappiness)+' happiness. A rival who turns down your request drops '+Math.abs(L.askedNoRel)+'. A bet (each stake is '+pctTxt(B.percent)+' of the lower net worth, capped at '+money(B.max)+' and spare cash after a '+money(B.reserve)+' reserve) goes to whoever grows their net worth more over '+B.days+' days. '})()+(function(){var T=R.together;if(!T)return '';var F=T.flat,Z=T.study;return 'At home you can invite a friendly rival to be your flatmate: rent is split in half, living together lifts or drags both your moods each night ('+sg(F.nightHappiness.friend)+' as friends, '+sg(F.nightHappiness.bad)+' on bad terms), some rent days they skip their share ('+sg(F.skipRel)+' relationship, '+sg(F.skipHappiness)+' happiness, and you pay it all), and they move out at '+F.leaveAt+'. When they are home you can cook, hang out, do chores or clear the air together; they may be busy and decline ('+pctTxt(F.noChance)+', relationship '+sg(F.noRel)+', no time or cash spent). A lesson in a pathway a friendly rival is also studying is a study group: +'+Z.groupKnowledge+' knowledge, '+sg(Z.groupHappiness)+' happiness and '+sg(Z.groupRel)+' relationship. Some nights bring a decision involving a rival (a lift, a birthday, a rumour, covering a shift…). '})()+(function(){var Pp=R.politics;if(!Pp)return '';var Q=Pp.pact,Bt=Pp.betray,Rp=Pp.rep,mo=Pp.moods;return 'Town mood (welcome screen): '+Object.keys(mo).map(function(k){return mo[k].icon+' '+mo[k].name.toLowerCase()+(mo[k].betray?' (betrayals ×'+mo[k].betray+')':' (no betrayals)')}).join(', ')+'. Everyone has a reputation from 0 to 100 (start '+Rp.start+'): keeping a pact '+sg(Rp.keepPact)+', repaying a rival on time '+sg(Rp.repay)+', not paying back '+sg(Rp.defaulted)+', helping a rival '+sg(Rp.help)+', a betrayal '+sg(Rp.betray)+'; it shifts interview chances ('+pctTxt(Rp.interviewPer*10)+' per 10 points) and whether rivals accept your pacts and loans, and it is a Life Score category. With a 🤝 friend ('+Q.need+'+) you can make a '+Q.days+'-day pact in Messages, plain or with a shared pot ('+pctTxt(Q.percent)+' of lower net worth each, min '+money(Q.min)+', max '+money(Q.max)+', retaining '+money(Q.reserve)+' cash, earning the savings rate +'+Q.potBonusRate+' point a day): an ally may pass you job tips and never takes the last opening from you; a pact kept to the end splits the pot ('+sg(Q.keepRel)+' relationship). An ally can betray you ('+Object.keys(Bt.chance).map(function(k){return k+' '+pctTxt(Bt.chance[k])}).join(', ')+' a night, experts ×'+Bt.lateMult+' in the last '+Bt.lateDays+' days): taking the pot, not repaying a loan, taking the job you are after, or leaking your plans; the betrayer drops to '+Bt.relTo+' with the victim and loses reputation. You can betray an ally too. Rivals make and break pacts with each other. Each night every rival’s relationship with you drifts by '+sg(Pp.drift.min)+' to '+sg(Pp.drift.max)+'. '})()+(function(){var Pp=R.politics,Z=Pp&&Pp.sabotage,TH=Pp&&Pp.theft;if(!Z||!TH)return '';var mv=Z.moves,mo=Pp.moods;return 'Sabotage ('+Object.keys(mo).filter(function(k){return mo[k].sabotage}).map(function(k){return mo[k].name.toLowerCase()}).join(' and ')+' towns; every move costs time): '+Object.keys(mv).map(function(k){var m=mv[k];return m.name.toLowerCase()+' ('+hm(m.minutes)+', caught '+pctTxt(m.caught)+')'}).join(', ')+'. Each earlier sabotage adds '+pctTxt(Z.perUse)+' to the chance of being caught, up to '+pctTxt(Z.maxCaught)+'. Caught: reputation '+sg(Z.caught.rep)+', relationship '+sg(Z.caught.rel)+', '+sg(Z.caught.happiness)+' happiness, and they may strike back; not caught after '+Z.gotAwayDays+' days: '+sg(Z.gotAwayHappiness)+' happiness. You can hit each rival '+Z.yourHitsPerRivalPerDay+' times a day and be hit '+Z.hitsOnYouPerDay+' times a night. Rivals sabotage you and each other; when you are not told who, accuse someone at the Community Centre (right: they lose reputation; wrong: relationship '+sg(Z.accuse.wrongRel)+' with the one you blamed and '+sg(Z.accuse.wrongHappiness)+' happiness). Cash can go missing overnight: a flatmate below '+TH.flatmate.below+' may steal, and burglars break in ('+pctTxt(TH.burglary.chance)+' a night) in the '+TH.burglary.homes.map(function(h){return NAME[h]||h}).join(', ')+'. A small theft ('+pctTxt(TH.small.min)+'–'+pctTxt(TH.small.max)+' of your cash) does not say who; a big one ('+pctTxt(TH.big.min)+'–'+pctTxt(TH.big.max)+') does, and a flatmate who takes it moves out. Money in the bank is never taken. '})()+(function(){var C=R.contracts,W=C.wealth;return 'Specific pacts last '+C.days+' days with explicit obligations in Messages: Study Buddies ('+C.study.sessions+' sessions), Roommate Loyalty ('+C.noticeDays+' days notice), Wealth Challenge (first to the target by the deadline; '+pctTxt(W.percent)+' of the lower net worth each, capped by '+money(W.max)+' and a '+money(W.reserve)+' reserve; stake locked on acceptance), Emergency Support (unaffordable help excused), and Roommate Royalty (household priority and contributions). Bets and pots check every participant before acceptance; ties and cancellations refund once. Broken promises allow forgiveness, affordable compensation or termination. Rumour sources stay unknown until discovered; discovered betrayals can be confronted, forgiven and reconciled. ';})()+'The Overview shows the running leaderboard, the morning news tells you what your rivals did, and the end screen shows every category.'})();
      $('cfgRent').textContent=everyDays(RENT_EVERY);
      $('apOf').textContent=' of '+hm(MAX_AP);
      $('cfgDebt').textContent=pctTxt(CONFIG.hospital.billInterest);
      $('cfgGoal').textContent=money(GOAL);$('cfgGoal2').textContent=money(GOAL);$('cfgRank1').textContent=TIERS[0].ic+' '+TIERS[0].n;
      var up=TIERS.slice(1),last=TIERS[TIERS.length-1];
      var parts=up.map(function(r){return '<b>'+r.ic+' '+r.n+'</b> at '+money(r.v)});
      $('cfgRanks').innerHTML=(parts.length>1?parts.slice(0,-1).join(', ')+' and '+parts[parts.length-1]:parts[0])+' (ranks are milestones: the game goes on to its last day)';
      var tg=TIERS.map(function(r,i){return r.d?'<b>'+r.ic+' '+r.n+'</b> by day '+Math.min(r.d,CONFIG.time.gameDays||r.d)+' (+'+r.b.toLocaleString()+')':''}).filter(Boolean);
      $('cfgOnTime').parentNode.hidden=!tg.length;
      $('cfgOnTime').innerHTML='<b>Target days:</b> reach a rank by the end of its day for bonus score points: '+(tg.length>1?tg.slice(0,-1).join(', ')+' and '+tg[tg.length-1]:tg[0]||'')+'. A rank reached later still counts, without the bonus.';
      paintBurnRules();
      var hd=CONFIG.food.hungryDaysToHospital;$('cfgHungry').textContent=numWord(hd)+' day'+(hd===1?'':'s');
      $('cfgHunger').textContent=Math.abs(CONFIG.food.hungryEnergy)+'% energy and '+Math.abs(CONFIG.food.hungryHappiness)+' happiness';
      var sd=CONFIG.clothes.startCasualDays;$('cfgClothes').textContent=sd+' day'+(sd===1?'':'s');
      document.querySelectorAll('#diffs [data-diff]').forEach(function(b){var D=DIFF[b.dataset.diff],sm=b.querySelector('small');if(D&&sm)sm.textContent=D.d.replace(/\.$/,'')});
    }catch(e){console.warn('Rules text (timeText): a line could not be filled in from CONFIG, so the rest of this block was skipped.',e)}
  })();
