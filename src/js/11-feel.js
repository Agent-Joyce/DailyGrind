  /* ==================================================================
     11b. GAME FEEL AND SETTINGS (CHANGELOG 107)
     Presentation only: nothing here changes S, spends time or rolls dice.
     - Numbers in the header count up or down and flash when they change; pay shows a small coin burst.
     - A short "Day N" sweep when the night ends.
     - Sounds for what just happened (pay, spending, a meal, a lesson, a new day), a soft tap on buttons, phone vibration.
     - Settings in the Controls menu: vibration, motion, text size (sound, preview, rules, log and reset were already there).
     Motion is off when the device asks for reduced motion, when the setting says so, and for automated browsers
     (navigator.webdriver), so tests always read settled numbers; set localStorage dailyGrind.forceMotion = 1 to test motion.
     ================================================================== */
  var FEEL={hap:true,motion:'auto',text:'m'},feelPrev=null,feelState=null,feelDay=0;
  try{var fs0=JSON.parse(localStorage.getItem('dailyGrind.settings')||'{}');if(fs0&&typeof fs0==='object'){if(fs0.hap===false)FEEL.hap=false;if(fs0.motion==='reduce')FEEL.motion='reduce';if(['m','l','xl'].indexOf(fs0.text)>=0)FEEL.text=fs0.text}}catch(e){}
  function feelSave(){try{localStorage.setItem('dailyGrind.settings',JSON.stringify(FEEL))}catch(e){}}
  function motionOK(){
    if(FEEL.motion==='reduce')return false;
    try{if(navigator.webdriver&&localStorage.getItem('dailyGrind.forceMotion')!=='1')return false}catch(e){}
    return !(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }
  /* vibration patterns by sound name (phones only; ignored where the browser has no vibration) */
  var BUZZ={tap:8,coin:14,spend:10,eat:12,learn:12,err:[30,40,30],day:[15,60,15],night:[15,60,15],win:[20,40,20,40,60],cert:[20,40,20,40,60],lose:[80,60,80],ping:10};
  function buzz(k){if(!FEEL.hap||!BUZZ[k]||!navigator.vibrate)return;try{navigator.vibrate(BUZZ[k])}catch(e){}}
  function feelText(){document.body.dataset.text=FEEL.text}
  function feelButtons(){
    var h=$('hapBtn'),m=$('motionBtn'),t=$('textBtn');if(!h)return;
    h.textContent='📳 Vibration: '+(FEEL.hap?'on':'off');h.setAttribute('aria-pressed',String(FEEL.hap));h.hidden=!navigator.vibrate;
    m.textContent='✨ Motion: '+(FEEL.motion==='reduce'?'reduced':'on');m.setAttribute('aria-pressed',String(FEEL.motion!=='reduce'));
    t.textContent='🔠 Text size: '+({m:'normal',l:'large',xl:'larger'})[FEEL.text];
  }
  function feelSetup(){
    var bar=document.querySelector('#hudTools .hud-toolbar');if(!bar||$('hapBtn'))return;
    var mk=function(id,title){var b=document.createElement('button');b.type='button';b.className='mute';b.id=id;b.title=title;return b};
    var h=mk('hapBtn','Phone vibration on button presses and events'),m=mk('motionBtn','Number count-ups, flashes and the day sweep'),t=mk('textBtn','Make the text in panels and pop-ups bigger');
    var first=$('previewBtn')||bar.firstChild;bar.insertBefore(h,first);bar.insertBefore(m,first);bar.insertBefore(t,first);
    var head=document.createElement('b');head.className='hud-toolbar-h';head.textContent='Settings';bar.insertBefore(head,bar.firstChild);
    h.addEventListener('click',function(){FEEL.hap=!FEEL.hap;feelSave();feelButtons();buzz('coin')});
    m.addEventListener('click',function(){FEEL.motion=FEEL.motion==='reduce'?'auto':'reduce';feelSave();feelButtons()});
    t.addEventListener('click',function(){FEEL.text=({m:'l',l:'xl',xl:'m'})[FEEL.text];feelSave();feelText();feelButtons();render()});
    var sweep=document.createElement('div');sweep.id='daySweep';sweep.setAttribute('aria-hidden','true');document.body.appendChild(sweep);
    document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('button');if(b&&!b.disabled)snd('tap')},true);
    feelText();feelButtons();
  }
  /* count a number up or down in an element, keeping its format */
  function feelTween(el,from,to,fmt){
    if(el._tw)cancelAnimationFrame(el._tw);
    var t0=null,dur=Math.min(700,260+Math.abs(to-from)*4);
    var step=function(ts){if(t0==null)t0=ts;var p=Math.min(1,(ts-t0)/dur),e=1-Math.pow(1-p,3);el.textContent=fmt(from+(to-from)*e);if(p<1)el._tw=requestAnimationFrame(step);else{el._tw=0;el.textContent=fmt(to)}};
    el._tw=requestAnimationFrame(step);
  }
  function feelFlash(el,up){if(!el)return;el.classList.remove('chg-up','chg-dn');void el.offsetWidth;el.classList.add(up?'chg-up':'chg-dn');setTimeout(function(){el.classList.remove('chg-up','chg-dn')},900)}
  function feelCoins(n){
    var from=$('appCash');if(!from)return;var r=from.getBoundingClientRect();
    for(var i=0;i<Math.max(3,Math.min(8,n));i++){var c=document.createElement('i');c.className='coin-pop';c.textContent='●';c.setAttribute('aria-hidden','true');
      c.style.left=(r.left+r.width/2)+'px';c.style.top=(r.bottom+26)+'px';c.style.setProperty('--dx',Math.round((i-(n-1)/2)*9)+'px');c.style.animationDelay=(i*45)+'ms';document.body.appendChild(c);
      (function(x){setTimeout(function(){if(x.parentNode)x.parentNode.removeChild(x)},1100)})(c)}
  }
  function feelSweep(day){var s=$('daySweep');if(!s)return;s.textContent='☀ Day '+day;s.classList.remove('run');void s.offsetWidth;s.classList.add('run')}
  /* called at the end of every repaint (modernPaint): compare with the last painted numbers */
  function feelPaint(){
    feelSetup();
    var now={cash:S.cash,e:Math.round(S.energy),h:Math.round(S.happy),l:Math.round(S.health),day:S.day,fed:!!S.fed,study:S.studyMin||0,tier:S.tier,certs:Object.keys(S.edu||{}).reduce(function(a,t){return a+lvl(t)},0)};
    var prev=feelPrev,fresh=feelState!==S||!prev||!S.flags.diff||S.over;feelState=S;feelPrev=now;
    if(fresh)return;
    var newDay=now.day!==prev.day,anim=motionOK();
    if(newDay){if(anim)feelSweep(now.day);snd('day');return}
    var small=window.innerWidth<=640;
    [['appCash','cash',function(v){return small?kMoney(Math.round(v)):money(Math.round(v))}],['appEnergy','e',function(v){return Math.round(v)+'%'}],['appHealth','l',function(v){return Math.round(v)+'%'}],['appHappy','h',function(v){return Math.round(v)+'%'}]].forEach(function(x){
      var el=$(x[0]);if(!el||now[x[1]]===prev[x[1]])return;
      if(anim){feelTween(el,prev[x[1]],now[x[1]],x[2]);feelFlash(el.parentNode,now[x[1]]>prev[x[1]])}
    });
    if(nightRun||S.pending||S.morning)return;   /* the night has its own cards */
    var d=now.cash-prev.cash;
    if(now.certs>prev.certs||now.tier>prev.tier)snd('cert');
    else if(now.study>prev.study)snd('learn');
    else if(now.fed&&!prev.fed)snd('eat');
    else if(d>0){snd('coin');if(anim&&d>=10)feelCoins(Math.round(Math.log(d+1)))}
    else if(d<0)snd('spend');
  }
