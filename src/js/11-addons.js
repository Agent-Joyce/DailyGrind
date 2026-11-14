  /* ==================================================================
     11. ADD-ONS
     Features that sit on top of the core game: 1 clock and day bar, 2 vital trend arrows, 3 toasts, 4 action preview,
     5 end-of-run recap, 6 starting traits. Their settings are in CONFIG.ui and CONFIG.traits.
     How they hook in: this block replaces render(), log() and finish() with wrappers that call the original and then
     the hooks registered in HOOK (before / after render, on each log line, on game over). A hook that throws is
     caught by safe() and reported in the console, so one broken add-on cannot stop the game.
     The action preview (dryRun) runs a real action on a copy of S. While it runs it swaps out everything the action
     could touch outside S (render, log, sound, save, finish, Math.random and the others listed in its keep object) and
     puts them all back afterwards. If an action starts using a new global function with side effects, add it there.
     ================================================================== */
  (function addons39(){
    var UI=CONFIG.ui||{};
    var HOOK={before:[],after:[],onLog:[],onFinish:[]};  /* what each feature asks to run */
    function safe(list,a,b){list.forEach(function(f){try{f(a,b)}catch(e){console.warn('Add-on problem:',e)}})}
    (function wrap(){
      var _render=render,_log=log,_finish=finish;
      /* before-render hooks may change the game state (so the old render() saves it); after-render hooks only draw */
      render=function(){safe(HOOK.before);_render();safe(HOOK.after)};
      log=function(m,c){_log(m,c);if(S)safe(HOOK.onLog,m,c||'')};
      finish=function(t,x){_finish(t,x);safe(HOOK.onFinish,t,x)};
    })();
    function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
    /* first sentence (or two, if the first is very short) of a log line, trimmed to fit a toast or a list row */
    /* a short version for toasts (the log keeps the full line): the first sentence (plus a short second one when the first is very short),
      bracketed detail dropped, and the time and vital changes from it put at the end: "You called your family · 30m · +3 happiness" */
    function shortText(msg){
      msg=String(msg).trim();
      var sen=[],cur='',d=0;
      for(var i=0;i<msg.length;i++){var c=msg[i];cur+=c;if(c==='(')d++;else if(c===')')d=Math.max(0,d-1);
        else if(!d&&/[.!?]/.test(c)&&(i===msg.length-1||msg[i+1]===' ')){sen.push(cur.trim());cur=''}}
      if(cur.trim())sen.push(cur.trim());
      var t=sen[0]||msg;if(t.length<60&&sen[1]&&t.length+sen[1].length<110)t+=' '+sen[1];
      var VIT=/[+−-]\d+(?:\.\d+)?%? (?:energy|happiness|health|knowledge)\b/g,TIME=/\b\d+h(?: \d+m)?\b|\b\d+m\b/;
      var vits=[],tm='';
      /* bracketed detail that holds vitals (or is just a time) is the real change: it moves to the tail. Other brackets stay
        (they explain a refusal), and vitals written in the sentence itself ("+9 knowledge a day") stay where they are */
      t=t.replace(/\s*\(([^()]*)\)/g,function(m,inner){var v=inner.match(VIT)||[];if(v.length||/^\s*(\d+h(?: \d+m)?|\d+m)\s*$/.test(inner)){vits=vits.concat(v);if(!tm){var x=inner.match(TIME);if(x)tm=x[0]}return ''}return m});
      t=t.replace(/\s*[,;:]\s*([.!?]?)$/,'$1').replace(/\s{2,}/g,' ').replace(/\s+([.,!?])/g,'$1').replace(/[.]$/,'').trim();
      var tail=[];if(tm)tail.push(tm);if(vits.length)tail.push(vits.join(' '));
      return t+(tail.length?'\u0001 · '+tail.join(' · '):'');  /* \u0001 marks where the real change starts (see vitIcons) */
    }

    /* ---------- 1. CLOCK + DAY BAR ----------
      S.ap is "minutes left today". The clock is just: start hour + minutes already used.
      The day bar remembers WHAT each used chunk was spent on (S.tl), by noticing which button or
      building you just clicked when the minutes dropped. */
    var CK=UI.clock||{};
    var CK_START=(CK.startHour>=0&&CK.startHour<24)?Math.floor(CK.startHour):7;
    function pad2(n){return (n<10?'0':'')+n}
    function clockMin(left){var t=(CK_START*60+(MAX_AP-left))%1440;return t<0?t+1440:t}
    function clockText(left){
      var t=clockMin(left),h=Math.floor(t/60),m=t%60;
      if(CK.use24h)return pad2(h)+':'+pad2(m);
      return (h%12||12)+':'+pad2(m)+' '+(h<12?'AM':'PM');
    }
    function clockIcon(left){var h=Math.floor(clockMin(left)/60);return h>=5&&h<7?'🌅':h>=7&&h<17?'☀️':h>=17&&h<19?'🌇':'🌙'}
    var KIND={fun:['Leisure','#9bd36a'],walk:['Walking','#8aa0b3'],work:['Work','#f0bd4a'],study:['Study','#6aa0ff'],gym:['Gym','#ef7d72'],rest:['Rest','#a78bfa'],
              food:['Food','#5fcf92'],health:['Health','#ff9ecb'],errand:['Errands','#3cc0c3'],other:['Other','#6b7885']};
    var nextKind=null;  /* what the player just pressed; used by the next render */
    document.addEventListener('click',function(e){
      var el=e.target;if(!el||!el.closest)return;
      if(el.closest('.tile')){nextKind='walk';return}
      var b=el.closest('#shop [data-act]');
      if(b)nextKind=(ACTIONS[b.dataset.act]||{}).kind||'errand';  /* colours come from the ACTIONS table */
    },true);
    /* before render: if minutes went down since the last render, file them under the right colour */
    function trackTime(){
      var d=S.tl;
      if(!d||d.day!==S.day){
        d=S.tl={day:S.day,last:S.ap,seg:[]};
        if(MAX_AP-S.ap>0)d.seg.push(['other',MAX_AP-S.ap]);  /* minutes already gone when the day started (illness) or before this save */
      }else if(S.ap<d.last){
        var k=nextKind||'other',n=d.last-S.ap,s=d.seg[d.seg.length-1];
        if(s&&s[0]===k)s[1]+=n;else d.seg.push([k,n]);
      }
      d.last=S.ap;nextKind=null;
    }
    function paintClock(){
      $('clockNow').textContent=clockText(S.ap);$('clockIcon').textContent=clockIcon(S.ap);
      var d=S.tl,bar=$('daybar');if(!d||!bar)return;
      var by={},html='';
      d.seg.forEach(function(s){
        var K=KIND[s[0]]||KIND.other;by[s[0]]=(by[s[0]]||0)+s[1];
        html+='<i style="width:'+(s[1]/MAX_AP*100).toFixed(2)+'%;background:'+K[1]+'"></i>';
      });
      var kinds=Object.keys(by).sort(function(a,b){return by[b]-by[a]});
      var tip='Used so far: '+(kinds.map(function(k){return (KIND[k]||KIND.other)[0]+' '+hm(by[k])}).join(', ')||'nothing yet')+'. Left: '+hm(S.ap)+'.';
      var legend=kinds.map(function(k){var K=KIND[k]||KIND.other;return '<span><i style="background:'+K[1]+'"></i>'+K[0]+' '+hm(by[k])+'</span>'}).join('');
      var topKinds=kinds.slice(0,3).map(function(k){return (KIND[k]||KIND.other)[0]+' '+hm(by[k])}).join(' · ');
      var sumline=topKinds?(topKinds+' · '+hm(S.ap)+' left'):(hm(S.ap)+' left');
      bar.innerHTML='<div class="track" title="'+esc(tip)+'">'+html+'</div>'+(legend?'<div class="legend">'+legend+'<span class="lg-left">'+hm(S.ap)+' left</span></div>':'')+'<div class="sumline">'+esc(sumline)+'</div>';
    }
    HOOK.before.push(trackTime);HOOK.after.push(paintClock);

    /* ---------- 2. VITAL TREND ARROWS ----------
      On the first render of each day we remember the morning values (S.vs). After that every vital
      shows ▲ or ▼ with how far it has moved since you woke up. */
    var TR_MIN=(UI.trend&&UI.trend.minChange)||1;
    function trackVitals(){
      if(!S.vs||S.vs.day!==S.day)S.vs={day:S.day,energy:S.energy,happy:S.happy,health:S.health,know:Math.floor(S.know)};
    }
    /* top-bar arrows: shown for a few seconds when a new day starts, measured from the moment the night began (sleep and other overnight effects included) */
    function arrow(key,now){
      if(!FLASH||Date.now()>FLASH.until)return '';
      var base={energy:FLASH.e,happy:FLASH.h,health:FLASH.l,know:FLASH.k}[key];if(base==null)return '';
      var d=Math.round(now-base);
      if(Math.abs(d)<TR_MIN)return '';
      return '<span class="tr '+(d>0?'up':'dn')+'" title="Overnight: '+(d>0?'+':'−')+Math.abs(d)+'">'+(d>0?'▲':'▼')+Math.abs(d)+'</span>';
    }
    function paintTrends(){
      var k=Math.min(100,Math.floor(S.know));
      var pairs=[['hEn',S.energy,'%'],['hHp',S.happy,'%'],['hHl',S.health,'%'],['hKn',k,'%'],['energy',S.energy,'%'],['happy',S.happy,'%'],['health',S.health,'%'],['know',k,'%']];
      var arr={hEn:arrow('energy',S.energy),hHp:arrow('happy',S.happy),hHl:arrow('health',S.health),hKn:'',energy:arrow('energy',S.energy),happy:arrow('happy',S.happy),health:arrow('health',S.health),know:arrow('know',k)};
      pairs.forEach(function(p){var el=$(p[0]);if(!el)return;el.innerHTML=p[1]+p[2]+(arr[p[0]]||'');el.style.color=vitColor(p[1])});
    }
    HOOK.before.push(trackVitals);HOOK.after.push(paintTrends);

    /* ---------- 3. TOASTS ----------
      Two sources: (a) a NEW warning appearing in the same list the Overview shows (tired, rent due, no meal...),
      (b) a log line containing one of CONFIG.ui.toasts.words. No toasts while a pop-up is open, because
      the morning card, event card and game-over card already tell you the news. */
    var TS=UI.toasts||{};
    var toastQ=[],seenWarn=null,lastS=null;
    function modalOpen(){return !!(S.over||S.pending||S.morning||S.cert||document.querySelector('.over.show'))}
    function toast(txt,cls,quiet){
      if(TS.on===false||!txt)return;
      var key=txt.replace(/[\d$,%.]+/g,'#');
      if(toastQ.some(function(t){return t.key===key}))return;
      toastQ.push({txt:txt,cls:cls||'',key:key,quiet:!!quiet});
      if(toastQ.length>6)toastQ.shift();
    }
    function dismiss(el,now){
      if(!el||!el.parentNode)return;
      if(now){el.parentNode.removeChild(el);return}
      el.classList.add('out');setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el)},250);
    }
    function makeToast(t){
      var box=$('toasts'),el=document.createElement('div');
      if([].some.call(box.children,function(c){return c.dataset.txt===t.txt}))return;  /* already on screen */
      el.className='toast '+t.cls+(t.force?' forced':'');el.innerHTML=t.txt;el.dataset.txt=t.txt;
      if(t.quiet)el.setAttribute('aria-hidden','true');  /* log lines are already read out by the live region */
      /* Toasts expire automatically and are transparent to taps on controls beneath. */
      box.appendChild(el);
      while(box.children.length>(TS.max||3))dismiss(box.firstChild,true);
      /* longer messages stay up longer (+1s per 60 characters, up to 15s); hovering pauses the countdown */
      var sh=TS.shorter||{},cut=(sh.words||[]).some(function(w){return t.txt.toLowerCase().indexOf(w)>=0})?(sh.seconds||0):0;
      var ms=Math.max(1000,Math.min(15000,((TS.seconds||4.5)-cut+el.textContent.length/60)*1000)),tm=setTimeout(function(){dismiss(el)},ms);
      el.addEventListener('mouseenter',function(){clearTimeout(tm)});
      el.addEventListener('mouseleave',function(){tm=setTimeout(function(){dismiss(el)},2500)});
    }
    /* log lines: queue a toast when the line contains one of the chosen phrases */
    function logToast(msg,cls){
      var m=String(msg).toLowerCase();
      if(toastAll||(TS.words||[]).some(function(w){return m.indexOf(w)>=0}))toast(vitIcons(shortText(msg)),cls==='bad'?'bad':cls==='good'?'good':toastAll?'':'warn',true);
    }
    /* "+3 happiness", "−10% energy" ... become the vital's icon and the number */
    function vitIcons(t){
      var K={energy:'energy',happiness:'happy',health:'health',knowledge:'know'},p=String(t).split('\u0001');
      var f=function(x,cls){return esc(x).replace(/([+−-]\d+(?:\.\d+)?%?) (energy|happiness|health|knowledge)\b/g,function(m,v,k){return '<span class="'+cls+'">'+ic(K[k])+v.replace('-','−')+'</span>'})};
      /* icons after the marker are the real change (class fx); before it they only describe something ("+9 knowledge a day") */
      return f(p[0],'tvit')+(p.length>1?f(p.slice(1).join(''),'tvit fx'):'');
    }
    /* warnings: compare this render's warning list with the last one and queue what is new.
      While a pop-up is open we only update the list, so news that arrived overnight is not repeated as a toast. */
    function watchWarnings(modal){
      var keys={};
      stressList().forEach(function(x){keys[x.t.replace(/[\d$,%.]+/g,'#').slice(0,24)]=x});
      if(!modal&&seenWarn&&TS.vitalWarnings!==false){
        var fresh=Object.keys(keys).filter(function(k){return !seenWarn[k]});
        if(fresh.length)toast(keys[fresh[0]].t,keys[fresh[0]].l==='bad'?'bad':'warn');  /* the list is sorted worst-first, so the first new one is the one that matters */
      }
      seenWarn=keys;
    }
    function paintToasts(){
      if(lastS!==S){lastS=S;seenWarn=null;toastQ=[];$('toasts').innerHTML=''}  /* a different game: start clean */
      var modal=modalOpen();
      watchWarnings(modal);
      if(modal){toastQ=[];[].slice.call($('toasts').children).forEach(function(el){if(!el.classList.contains('forced'))el.parentNode.removeChild(el)});if(!forceToast.length)return}  /* the pop-up already tells the news, except a toast made for it (forceToast) */
      if(forceToast.length){toastQ=toastQ.concat(forceToast.map(function(t){return {txt:vitIcons('\u0001'+t.txt),cls:t.cls||'good',key:t.txt,force:1}}));forceToast=[]}
      if(!toastQ.length)return;
      var hud=$('hud');$('toasts').style.top=(hud?Math.round(hud.getBoundingClientRect().bottom)+8:72)+'px';
      var q=toastQ;toastQ=[];q.forEach(makeToast);
    }
    HOOK.onLog.push(logToast);HOOK.after.push(paintToasts);

    /* ---------- 4. ACTION PREVIEW ----------
      Pressing one of the chosen buttons (CONFIG.ui.preview.actions) first runs the REAL action on a throw-away
      copy of the game, reads off what changed, then shows it. Only "Do it" runs the action for real.
      Because it uses the real code, the preview always matches CONFIG and never needs its own price list.
      Anything unusual (the action would be refused, nothing changes, something throws) skips the preview
      and lets the normal button behave exactly as before. */
    var PV=UI.preview||{};
    var PV_ACTIONS=PV.actions||['work','class','study','gym'];
    var pvOn=PV.on!==false;
    try{if(localStorage.getItem('dailyGrind.preview')==='0')pvOn=false}catch(e){}
    function pvVitals(){return {ap:S.ap,cash:S.cash,energy:S.energy,happy:S.happy,health:S.health,know:Math.floor(S.know)}}
    function dryRun(a,arg){
      var A=ACTIONS[a],fn=A&&A.dry?A.run:null;if(!fn)return null;  /* only actions marked dry in ACTIONS */
      /* everything the action could touch outside S, so we can put it back */
      var keep={S:S,loc:loc,view:view,last:last,PREV:PREV,sayLine:sayLine,render:render,log:log,snd:snd,done:done,refuse:refuse,
                feedback:feedback,floater:floater,save:save,clearSave:clearSave,finish:finish,checkWin:checkWin,rnd:Math.random};
      var out=null,refused=false,notes=[];
      try{
        var before=pvVitals();
        S=JSON.parse(JSON.stringify(S));
        render=function(){};snd=function(){};done=function(){};feedback=function(){};floater=function(){};
        save=function(){};clearSave=function(){};finish=function(){};checkWin=function(){return false};
        log=function(m){notes.push(m)};
        refuse=function(){refused=true;return false};
        Math.random=function(){return 0.5};  /* any luck-based part gets a middle-of-the-road roll */
        fn(arg);
        out={before:before,after:pvVitals(),notes:notes,refused:refused,cert:!!S.cert,over:!!S.over,day:S.day!==keep.S.day};
      }catch(e){out=null;console.warn('Action preview (dryRun): '+a+' failed on the copy of the game, so it runs without a preview.',e)}
      S=keep.S;loc=keep.loc;view=keep.view;last=keep.last;PREV=keep.PREV;sayLine=keep.sayLine;render=keep.render;log=keep.log;snd=keep.snd;
      done=keep.done;refuse=keep.refuse;feedback=keep.feedback;floater=keep.floater;save=keep.save;clearSave=keep.clearSave;
      finish=keep.finish;checkWin=keep.checkWin;Math.random=keep.rnd;
      return out;
    }
    var pvPending=null;  /* {a, arg} waiting for the player's answer */
    function pvRow(icon,label,delta,after,fmt){
      if(!delta)return '';
      return '<div class="pv-row"><span class="pv-i">'+icon+'</span><span class="pv-l">'+label+'</span><span class="pv-d '+(delta>0?'up':'dn')+'">'+(delta>0?'+':'−')+fmt(Math.abs(delta))+'</span><span class="pv-a">'+after+'</span></div>';
    }
    function pvTitle(b){
      var ns=b.closest('.nowstudy,.ns-row'),nb=ns&&ns.querySelector('.ns-h b,.arow-t b');
      if(nb)return 'Go to class: '+nb.textContent.trim();  /* the Study button at School */
      var o=b.closest('.opt'),at=o&&o.querySelector('.arow-t');if(at)return at.textContent.replace(/\s+/g,' ').trim();  /* compact rows: just the name, not the chips and note */
      var o=b.closest('.opt'),t=o&&o.firstElementChild?o.firstElementChild.cloneNode(true):null;
      if(t){[].forEach.call(t.querySelectorAll('small'),function(x){x.parentNode.removeChild(x)});var s=t.textContent.replace(/\s+/g,' ').trim();if(s)return s}
      return b.textContent.replace(/\s+/g,' ').trim();
    }
    function showPreview(b,a,arg,r){
      var B=r.before,A=r.after,used=B.ap-A.ap,rows='';
      rows+='<div class="pv-row"><span class="pv-i">'+ic('time')+'</span><span class="pv-l">Time</span><span class="pv-d dn">−'+hm(used)+'</span><span class="pv-a">Done at '+clockText(A.ap)+' · '+hm(A.ap)+' left today</span></div>';
      rows+=pvRow(ic('cash'),'Cash',A.cash-B.cash,'You will have '+money(A.cash),function(n){return money(n)});
      rows+=pvRow(ic('energy'),'Energy',A.energy-B.energy,'Energy '+A.energy+'%',function(n){return n+'%'});
      rows+=pvRow(ic('happy'),'Happiness',A.happy-B.happy,'Happiness '+A.happy,function(n){return n});
      rows+=pvRow(ic('health'),'Health',A.health-B.health,'Health '+A.health,function(n){return n});
      rows+=pvRow(ic('know'),'Knowledge',A.know-B.know,'Knowledge '+A.know,function(n){return n});
      $('pvT').textContent=pvTitle(b)+'?';
      $('pvSub').textContent=(NAME[view]?NAME[view]+' · ':'')+'Here is what this will do:';
      $('pvRows').innerHTML=rows;
      var warn=[];
      if(A.energy<30&&B.energy>=30)warn.push('⚠ You would be tired afterwards (energy under 30%).');
      if(r.cert)warn.push('🎓 This finishes a qualification.');
      $('pvWarn').innerHTML=warn.map(function(w){return '<div class="pv-warn">'+esc(w)+'</div>'}).join('');
      $('pvNote').textContent=r.notes.length?'Likely result: '+r.notes.slice(0,2).join(' '):'';
      $('pvSkip').checked=true;  /* "Don't ask me again" is ticked by default */
      pvPending={a:a,arg:arg};$('toasts').innerHTML='';
      $('pvpop').classList.add('show');keyHints();
      setTimeout(function(){$('pvGo').focus()},0);
    }
    function closePreview(){pvPending=null;$('pvpop').classList.remove('show');keyHints()}
    function pvGo(){
      var p=pvPending;if(!p)return;
      if($('pvSkip').checked)setPreview(false);
      closePreview();
      var el=$('shop').querySelector('[data-act="'+p.a+'"][data-arg="'+p.arg+'"]');
      if(el&&!el.disabled){el.dataset.pv='1';el.click();delete el.dataset.pv}
    }
    function setPreview(on){
      pvOn=on;try{localStorage.setItem('dailyGrind.preview',on?'1':'0')}catch(e){}
      $('previewBtn').textContent='🔎 Preview: '+(on?'on':'off');$('previewBtn').setAttribute('aria-pressed',String(on));
    }
    /* capture phase: this runs BEFORE the Shop panel's own click handler, and can stop it */
    $('shop').addEventListener('click',function(e){
      var b=e.target.closest('[data-act]');if(!b||b.disabled)return;
      if(b.dataset.pv==='1')return;                                  /* the player already said "Do it" */
      if(!pvOn||S.over||S.pending||PV_ACTIONS.indexOf(b.dataset.act)<0)return;
      var a=b.dataset.act,arg=b.dataset.arg||'',r=dryRun(a,arg);
      if(!r||r.refused||r.over||r.day||r.before.ap===r.after.ap)return;  /* nothing useful to show: act normally */
      e.stopPropagation();e.preventDefault();
      showPreview(b,a,arg,r);
    },true);
    $('pvGo').addEventListener('click',pvGo);
    /* tapping or clicking outside the card cancels (the only way out on a phone, where there is no Esc key) */
    $('pvpop').addEventListener('click',function(e){if(e.target===this)closePreview()});
    $('previewBtn').addEventListener('click',function(){setPreview(!pvOn)});
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'&&$('pvpop').classList.contains('show')){e.stopImmediatePropagation();closePreview()}
    },true);
    setPreview(pvOn);

    /* ---------- 5. END-OF-RUN RECAP ----------
      While you play we quietly keep (a) your net worth at the end of each day (S.hist) and
      (b) any big log lines that match CONFIG.ui.moments (S.moments). When the game ends, finish() shows
      the old score table, then this recap is added underneath: a net-worth line, your 3 biggest moments,
      and a Share button. */
    var MOMENTS=UI.moments||[];
    function trackWorth(){
      var nw=Math.round(worth()),d=S.over&&S.endDay?S.endDay:S.day;  /* a game that ended overnight records its final net worth on the day that just ended */
      if(!S.hist)S.hist=[];
      var h=S.hist;
      if(S.over)while(h.length&&h[h.length-1][0]>d)h.pop();
      if(h.length&&h[h.length-1][0]===d)h[h.length-1][1]=nw;else h.push([d,nw]);
      if(S.flags&&S.flags.diff&&S.nw0===undefined)S.nw0=nw;  /* net worth at the very start, once the difficulty is chosen */
    }
    function logMoment(msg){
      var m=String(msg).toLowerCase(),best=null;
      MOMENTS.forEach(function(row){
        if((row.words||[]).some(function(w){return m.indexOf(w)>=0})&&(!best||row.points>best.points))best=row;
      });
      if(!best)return;
      if(!S.moments)S.moments=[];
      S.moments.push({d:S.day,p:best.points,i:best.icon,t:shortText(msg)});
      if(S.moments.length>60){S.moments.sort(function(a,b){return b.p-a.p});S.moments.length=30}  /* keep the file small */
    }
    function bestDays(){
      var h=S.hist||[],out=[],prev=S.nw0,best=null,worst=null;
      h.forEach(function(p){
        if(prev!==undefined){var d=p[1]-prev;if(!best||d>best.d)best={day:p[0],d:d};if(!worst||d<worst.d)worst={day:p[0],d:d}}
        prev=p[1];
      });
      if(best&&best.d>0)out.push({d:best.day,p:1,i:'📈',t:'Best day: '+(best.d>0?'+':'−')+money(Math.abs(best.d))+' net worth'});
      if(worst&&worst.d<0)out.push({d:worst.day,p:0,i:'📉',t:'Roughest day: −'+money(Math.abs(worst.d))+' net worth'});
      return out;
    }
    /* the three biggest moments: highest points first, at most two of the same kind, topped up with best/worst day */
    function topMoments(){
      var list=(S.moments||[]).slice().sort(function(a,b){return b.p-a.p||a.d-b.d}),out=[],kinds={};
      list.forEach(function(m){if(out.length<3&&(kinds[m.i]||0)<2){kinds[m.i]=(kinds[m.i]||0)+1;out.push(m)}});
      bestDays().forEach(function(m){if(out.length<3)out.push(m)});
      return out.sort(function(a,b){return a.d-b.d});
    }
    /* net worth by day as a small SVG line; dashed gold lines mark the ranks that fall inside the range */
    function netWorthChart(){
      var pts=(S.hist||[]).map(function(p){return {x:p[0],y:p[1]}});
      if(S.nw0!==undefined)pts.unshift({x:0,y:S.nw0});
      if(pts.length<2)return '';
      var W=320,H=130,L=10,R=10,T=16,Bm=20,ys=pts.map(function(p){return p.y}),lo=Math.min.apply(null,ys),hi=Math.max.apply(null,ys);
      TIERS.forEach(function(t){if(hi>0&&t.v>hi&&t.v<=hi*1.15)hi=t.v});  /* show the next rank line if you were close to it */
      if(hi===lo){hi+=1;lo-=1}
      var pad=(hi-lo)*0.08;lo-=pad;hi+=pad;
      var x0=pts[0].x,x1=pts[pts.length-1].x;if(x1===x0)x1=x0+1;
      function X(v){return L+(v-x0)/(x1-x0)*(W-L-R)}
      function Y(v){return T+(1-(v-lo)/(hi-lo))*(H-T-Bm)}
      var line=pts.map(function(p,i){return (i?'L':'M')+X(p.x).toFixed(1)+' '+Y(p.y).toFixed(1)}).join(' ');
      var area=line+' L'+X(x1).toFixed(1)+' '+(H-Bm)+' L'+X(x0).toFixed(1)+' '+(H-Bm)+' Z';
      var g='';
      TIERS.forEach(function(t){if(t.v>lo&&t.v<hi)g+='<line class="rc-goal" x1="'+L+'" x2="'+(W-R)+'" y1="'+Y(t.v).toFixed(1)+'" y2="'+Y(t.v).toFixed(1)+'"/><text x="'+(L+2)+'" y="'+(Y(t.v)-3).toFixed(1)+'">'+esc(t.ic+' '+money(t.v))+'</text>'});
      var dots=pts.map(function(p,i){return '<circle class="rc-dot" cx="'+X(p.x).toFixed(1)+'" cy="'+Y(p.y).toFixed(1)+'" r="'+(i===pts.length-1?4:2.6)+'"/>'}).join('');
      var last=pts[pts.length-1],first=pts[0],lx=X(last.x),flip=lx>W*0.6;
      return '<svg class="rc-chart" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Net worth by day, from '+esc(money(first.y))+' to '+esc(money(last.y))+'">'+g+
        '<path class="rc-area" d="'+area+'"/><path class="rc-line" d="'+line+'"/>'+dots+
        '<text class="rc-val" x="'+(flip?lx-6:lx+6).toFixed(1)+'" y="'+(Y(last.y)-7).toFixed(1)+'" text-anchor="'+(flip?'end':'start')+'">'+esc(money(last.y))+'</text>'+
        '<text x="'+L+'" y="'+(H-5)+'">'+(first.x===0?'Start':'Day '+first.x)+'</text><text x="'+(W-R)+'" y="'+(H-5)+'" text-anchor="end">Day '+last.x+'</text></svg>';
    }
    function recapText(title){
      var ms=topMoments();
      var dd=S.endDay||Math.min(S.day,maxDays());
      return 'Daily Grind · '+Df().n+(traitTag()?' · '+traitTag():'')+' · '+dd+' day'+(dd>1?'s':'')+'\n'+title+' · ⭐ '+score().toLocaleString()+' points\n💰 Net worth '+money(worth())+
        (ms.length?'\nBiggest moments:\n'+ms.map(function(m){return '• Day '+m.d+': '+m.t}).join('\n'):'');
    }
    function shareCopy(txt){
      var msg=$('rcMsg'),ta=$('rcText');
      function manual(){ta.hidden=false;ta.value=txt;ta.focus();ta.select();msg.textContent='Copy this text to share it.'}
      try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(function(){msg.textContent='Copied! Paste it anywhere.'},manual);return}}catch(e){}
      manual();
    }
    function shareResult(txt){
      try{
        if(navigator.share){navigator.share({text:txt}).catch(function(err){if(!err||err.name!=='AbortError')shareCopy(txt)});return}
      }catch(e){}
      shareCopy(txt);
    }
    function showRecap(title){
      var ms=topMoments(),chart=netWorthChart(),txt=recapText(title),box=$('overScore');
      box.insertAdjacentHTML('beforeend','<div class="recap" id="recap"><div class="rc-head"><span>🎮 Daily Grind</span><small>'+esc(Df().n+(traitTag()?' · '+traitTag():''))+' · day '+(S.endDay||Math.min(S.day,maxDays()))+'</small></div>'+
        '<div class="rc-big">'+esc(title)+'</div><div class="rc-stats"><span>'+(S.mode==='rivals'&&S.rivals&&S.rivals.length?(function(){var me=lifeScore().filter(function(p){return p.me})[0];return '🏁 '+ordinal(me.place)+' of '+(S.rivals.length+1)+' · '+me.pts+' Life Score points'})():'⭐ '+score().toLocaleString()+' points')+'</span><span>💰 '+esc(money(worth()))+'</span></div>'+
        (chart?'<div class="rc-h">Net worth by day</div>'+chart:'')+
        '<div class="rc-h">Biggest moments</div>'+(ms.length?'<ul class="rc-moments">'+ms.map(function(m){return '<li><b>Day '+m.d+'</b><span>'+esc(m.i+' '+m.t)+'</span></li>'}).join('')+'</ul>':'<div class="sub">A quiet run. No big moments this time.</div>')+
        '<div class="rc-actions"><button class="btn alt" id="rcShare" type="button">Share result</button><span id="rcMsg" role="status"></span></div><textarea id="rcText" readonly hidden aria-label="Result text to copy"></textarea></div>');
      $('rcShare').addEventListener('click',function(){shareResult(txt)});
    }
    function clearRecap(){if(!S.over){var r=$('recap');if(r&&r.parentNode)r.parentNode.removeChild(r)}}  /* nothing left over after New game */
    HOOK.before.push(trackWorth);HOOK.after.push(clearRecap);HOOK.onLog.push(logMoment);HOOK.onFinish.push(showRecap);

    /* ---------- 6. STARTING TRAITS ----------
      On the welcome screen you pick one trait (or none). A trait is just a short list of CONFIG changes in
      CONFIG.traits.list: {k:'path.to.value', v:newValue} sets a value, {k:'path.to.value', x:1.25} multiplies it.
      We remember every value a trait could touch, put them all back to normal, then apply the chosen trait,
      so switching games never leaves a trait's numbers behind. The choice is saved in S.trait. */
    var TCFG=CONFIG.traits||{};
    var TLIST=TCFG.on===false?[]:(TCFG.list||[]);
    function tPath(k){var o=CONFIG,p=String(k).split('.');for(var i=0;i<p.length-1&&o;i++)o=o[p[i]];return {o:o,key:p[p.length-1]}}
    var TBASE={};                      /* path -> the normal value, taken before any trait is applied */
    TLIST.forEach(function(t){
      (t.set||[]).forEach(function(r){
        var q=tPath(r.k);
        if(!q.o||typeof q.o[q.key]!=='number'){CFG_WARN.push('Trait settings: "'+t.name+'" points at "'+r.k+'", which is not a number in CONFIG. That line is ignored.');r.bad=1;return}
        if(!(r.k in TBASE))TBASE[r.k]=q.o[q.key];
      });
    });
    function traitById(id){var r=null;TLIST.forEach(function(t){if(t.id===id)r=t});return r}
    function traitTag(){var t=S&&traitById(S.trait);return t?t.icon+' '+t.name:''}
    var appliedTrait=null;
    /* tables that were copied from CONFIG when the game loaded must be rebuilt after a trait changes it */
    function rebuildDerived(){
      [['basic','basic'],['prem','premium']].forEach(function(p){var c=FD[p[1]];GROC[p[0]]={n:c.name,cost:c.cost,en:c.energy,hap:c.happiness,hp:c.health}});
      paintBurnRules();
    }
    function applyTrait(id){
      Object.keys(TBASE).forEach(function(k){var q=tPath(k);q.o[q.key]=TBASE[k]});
      var t=traitById(id);
      if(t)(t.set||[]).forEach(function(r){
        if(r.bad)return;
        var q=tPath(r.k);q.o[q.key]=r.v!==undefined?r.v:Math.round(TBASE[r.k]*r.x*100)/100;
      });
      appliedTrait=t?id:'';
      rebuildDerived();
    }
    /* before every draw: make sure the numbers in CONFIG match the trait this game was started with */
    function syncTrait(){if((S.trait||'')!==appliedTrait)applyTrait(S.trait)}
    /* the picker on the welcome screen */
    var pickedTrait='none';
    function markPicker(){[].forEach.call(document.querySelectorAll('#traits .trait'),function(l){var on=l.querySelector('input').checked;l.classList.toggle('on',on);if(on&&$('traitPick'))$('traitPick').textContent=l.querySelector('.tc-h').textContent.trim()})}
    function buildPicker(){
      var box=$('traits'),wrap=$('traitBox');if(!box)return;
      if(!TLIST.length){wrap.hidden=true;return}
      var all=[{id:'none',icon:'⚖️',name:'No trait',plus:'Play the game exactly as designed.',minus:''}].concat(TLIST);
      box.innerHTML=all.map(function(t,i){
        return '<label class="trait"><input type="radio" name="trait" value="'+esc(t.id)+'"'+(i?'':' checked')+'><span class="tc-h">'+esc(t.icon)+' <b>'+esc(t.name)+'</b></span>'+
          '<span class="tc-p">+ '+esc(t.plus)+'</span>'+(t.minus?'<span class="tc-m">− '+esc(t.minus)+'</span>':'')+'</label>';
      }).join('');
      box.addEventListener('change',function(e){if(e.target&&e.target.name==='trait'){pickedTrait=e.target.value;markPicker()}});
      markPicker();
    }
    buildPicker();
    /* capture phase: this runs BEFORE the welcome screen's own difficulty handler, which starts the game */
    $('diffs').addEventListener('click',function(e){
      if(!e.target.closest('[data-diff]')||S.flags.diff)return;
      var id=pickedTrait==='none'?'':pickedTrait,t=traitById(id);
      if(t)S.trait=id;else delete S.trait;
      applyTrait(t?id:'');
      S.health=CONFIG.health.start;          /* the starting health value is read when a game is created, so set it again here */
      if(t)log('Your trait: '+t.icon+' '+t.name+'. '+t.plus+(t.minus?' The catch: '+t.minus:''),'good');
    },true);
    var traitS=null;
    function paintTrait(){
      if(traitS!==S){                          /* a different game: the picker starts on "No trait" again */
        traitS=S;
        if(!S.flags.diff&&$('traits')){pickedTrait='none';var r=$('traits').querySelector('input[value="none"]');if(r)r.checked=true;markPicker()}
      }
      var tg=traitTag();$('diffTag').textContent=Df().n+(tg?' · '+tg:'');
    }
    HOOK.before.push(syncTrait);HOOK.after.push(paintTrait);
  })();

  /* ---------- Illustrated app shell: presentation state only (never game rules) ---------- */
  var modernScreen='today',modernState=null,modernDay=0,modernBank='amt',modernBankMode='deposit',modernSearch='';
  var SCENE_KEYS=['jobs','school','bank','market','fast','resto','elec','mall','apt','hosp','factory','thrift','comm','bung','gym','park'];
  var TOWN_POINTS=SCENE_KEYS.map(function(k){return TOWN_LAYOUT[k]});
  function modernEsc(t){return String(t==null?'':t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function modernIcon(k){var p={today:'<rect x="3" y="4" width="18" height="17" rx="4"/><path d="M8 2v4m8-4v4M3 10h18m-13 5h3m3 0h2"/>',town:'<path d="m3 7 6-3 6 3 6-3v16l-6 3-6-3-6 3V7Zm6-3v16m6-13v16"/>',life:'<path d="m3 11 9-8 9 8v10H3V11Zm6 10v-8h6v8"/>',rivals:'<circle cx="9" cy="8" r="4"/><path d="M2 21v-3a7 7 0 0 1 14 0v3m1-17a4 4 0 0 1 0 8m2 4a6 6 0 0 1 3 5"/>',brand:'<path d="M4 21V7l8-4 8 4v14M9 21v-6h6v6M8 9h1m6 0h1M8 12h1m6 0h1"/>',work:'<rect x="3" y="7" width="18" height="14" rx="3"/><path d="M8 7V4h8v3M3 12h18m-10 0v3h2v-3"/>',study:'<path d="M12 5C8 2 4 3 2 4v16c4-2 7-1 10 1 3-2 6-3 10-1V4c-4-2-7-1-10 1Zm0 0v16"/>',food:'<path d="M6 3v6m-3-6v4a3 3 0 0 0 6 0V3M6 10v11m12-18c-4 3-4 8 0 9V3Zm0 9v9"/>',bank:'<path d="m2 8 10-6 10 6H2Zm2 3v7m5-7v7m6-7v7m5-7v7M2 21h20"/>',shop:'<path d="M3 8h18l-2-5H5L3 8Zm1 0v13h16V8M9 21v-7h6v7M3 8v2c0 3 4 3 5 0 1 3 5 3 6 0 1 3 7 3 7 0V8"/>',device:'<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 18h4"/>',health:'<path d="M8 3h8v5h5v8h-5v5H8v-5H3V8h5V3Z"/>',tree:'<path d="m12 2-7 9h4l-5 6h7v5m1-20 7 9h-4l5 6h-8"/>',gym:'<path d="M3 7v10m4-13v16m10-16v16m4-13v10M7 12h10"/>'};return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p[k]+'</svg>'}
  function rivalFace(r,extra){var i=r?S.rivals.indexOf(r):-1;return i<0?'<span class="rival-face you-face '+(extra||'')+'" aria-hidden="true">You</span>':'<span class="rival-face '+(extra||'')+'" role="button" tabindex="0" data-portrait="'+i+'" aria-label="Open '+modernEsc(r.name)+' portrait" style="--face-x:'+(Math.max(0,i)%4*100/3)+'%"></span>'}
  function modernSelect(screen){
    if(S.over||S.pending||!S.flags.diff)return;
    closePlaces();modernScreen=screen;ovHidden=false;view=null;render();
    $('center').scrollTop=0;
  }
  function modernSetup(){
    var top=document.createElement('header');top.id='appTop';top.setAttribute('aria-label','Daily Grind status');
    top.innerHTML='<div class="app-brand"><span class="brand-mark">'+modernIcon('brand')+'</span><div>Daily Grind<small>Your town. Your next chapter.</small></div></div><div class="app-status"><span><small>DAY</small><b id="appDay"></b></span><span><span class="hud-sky" id="appSky" aria-hidden="true">☀</span><b id="appTime"></b><small>left</small></span><span><small>CASH</small><b id="appCash"></b></span><span class="status-energy"><small>ENERGY</small><b id="appEnergy"></b></span></div>';
    document.body.appendChild(top);top.appendChild($('actbar'));
    var vp=document.createElement('div');vp.id='townViewport';vp.setAttribute('aria-label','Town map with sixteen destinations.');
    vp.innerHTML='<div class="town-caption"><b>Your neighbourhood</b><span>Choose a pin or a destination below</span></div><div id="townCanvas" class="town-canvas"></div>';
    $('board').insertBefore(vp,$('board').firstChild);
    var phone=document.createElement('div');phone.className='town-device';phone.innerHTML='<button type="button" class="btn" id="townDevice" data-dg-device="phone">Phone / tablet apps</button><small id="townDeviceNote"></small>';vp.appendChild(phone);
    vp.querySelector('.town-caption').insertAdjacentHTML('beforeend','<div class="town-legend">📍 You · 💼 Work · 🏠 Home · 🔒 Closed</div>');
    var shade=document.createElement('div');shade.id='dayShade';shade.setAttribute('aria-hidden','true');document.body.appendChild(shade);
    document.querySelectorAll('.tile').forEach(function(tile){
      var k=tile.dataset.loc,i=SCENE_KEYS.indexOf(k),p=TOWN_POINTS[i];tile.style.left=p[0]+'%';tile.style.top=p[1]+'%';tile.style.removeProperty('--w');
      tile.innerHTML='<span class="scene"><img class="building-sprite" src="'+TOWN_SPRITES[k]+'" alt="" draggable="false"><span class="pin" aria-hidden="true"><span>'+(i+1)+'</span></span><span class="tags"></span><span class="cost"></span></span><b class="lab">'+modernEsc(NAME[k])+'</b>';
      $('townCanvas').appendChild(tile);
    });
    /* place names in their own layer above every building, so a neighbour's picture or pin never covers a name */
    var labels=document.createElement('div');labels.id='townLabels';labels.setAttribute('aria-hidden','true');
    labels.innerHTML=SCENE_KEYS.map(function(k,i){var p=TOWN_POINTS[i];return p&&NAME[k]?'<span class="town-label" data-for="'+k+'" style="left:'+p[0]+'%;top:'+p[1]+'%">'+modernEsc(NAME[k])+'</span>':''}).join('');$('townCanvas').appendChild(labels);
    modernDrawTown();modernPortraitSetup();
    var directory=document.createElement('section');directory.id='townDirectory';directory.hidden=true;directory.setAttribute('aria-label','Destinations');$('center').appendChild(directory);
    var heading=document.createElement('div');heading.id='screenHeading';heading.className='screen-heading';$('overview').insertBefore(heading,$('overview').firstChild);
    var progress=document.createElement('div');progress.id='dailyProgress';progress.className='daily-progress';progress.setAttribute('aria-live','polite');$('appTop').appendChild(progress);
    var quick=document.createElement('div');quick.id='todayQuick';quick.className='quick-grid';$('overview').querySelector('.top').after(quick);
    var focus=document.createElement('div');focus.id='todayFocus';focus.className='daily-focus';quick.after(focus);
    var guide=document.createElement('details');guide.className='guide-disclosure';guide.innerHTML='<summary>First-week checklist</summary>';$('goals').before(guide);guide.appendChild($('goals'));
    var life=document.createElement('div');life.id='lifeShortcuts';life.className='quick-grid';heading.after(life);
    var intro=document.createElement('p');intro.id='rivalIntro';intro.className='sub';heading.after(intro);
    var tools=document.createElement('details');tools.id='hudTools';tools.innerHTML='<summary aria-label="Controls">⚙<span class="dp-full">Controls</span></summary><div class="hud-toolbar"></div>';$('actbar').prepend(tools);
    ['muteBtn','previewBtn','rulesBtn','logBig','resetBtn'].forEach(function(id){tools.querySelector('.hud-toolbar').appendChild($(id))});
    var drawer=document.createElement('section');drawer.id='logDrawer';drawer.hidden=true;drawer.setAttribute('role','dialog');drawer.setAttribute('aria-label','Daily log');drawer.innerHTML='<div class="drawer-heading"><h2>Daily log</h2><button type="button" class="btn" id="closeLog">Close ✕</button></div>';drawer.appendChild($('log'));document.body.appendChild(drawer);$('closeLog').addEventListener('click',function(){modernLog(false);$('logBig').focus()});$('logBig').setAttribute('aria-controls','logDrawer');
    var oldHead=$('overview').querySelector('.loghead');if(oldHead)oldHead.remove();
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&(!drawer.hidden||tools.open)){e.preventDefault();e.stopImmediatePropagation();modernLog(false);tools.open=false}},true);
    document.addEventListener('click',function(e){if(!tools.contains(e.target))tools.open=false});
    var context=document.createElement('div');context.id='hudContext';context.innerHTML='<span id="hudRank"></span><span id="hudLocation"></span><button type="button" class="btn" id="appInbox" data-dg-app="msgsapp" hidden></button><button type="button" class="btn" id="hudAlert" hidden></button>';$('appTop').appendChild(context);
    $('hudAlert').addEventListener('click',function(){modernSelect('today');$('warn').scrollIntoView({block:'nearest'});});
    document.querySelector('.app-status').insertAdjacentHTML('beforeend','<span class="status-health"><small>HEALTH</small><b id="appHealth"></b></span><span class="status-happy"><small>MOOD</small><b id="appHappy"></b></span>');
    /* the three vitals are their own group, so the header can place them on a second row on a phone */
    var vitals=document.createElement('div');vitals.className='app-vitals';['.status-energy','.status-health','.status-happy'].forEach(function(q){vitals.appendChild(top.querySelector(q))});top.querySelector('.app-status').after(vitals);
    var economy=$('econ').parentNode;economy.className='grp g-econ';economy.querySelector('.l').className='gh';$('overview').querySelector('.g-home').before(economy);
    var hero=document.createElement('div');hero.id='interiorHero';hero.className='interior-hero';hero.setAttribute('role','img');hero.innerHTML='<span class="interior-caption"></span>';$('shop').insertBefore(hero,$('shop').firstChild);
    var nav=document.createElement('nav');nav.id='appNav';nav.setAttribute('aria-label','Main navigation');
    nav.innerHTML=['today','town','life','rivals'].map(function(k){return '<button type="button" class="nav-item" data-dg-screen="'+k+'">'+modernIcon(k)+'<span>'+k.charAt(0).toUpperCase()+k.slice(1)+'</span>'+(k==='rivals'?'<span id="rivalBadge" class="nav-badge" hidden></span>':k==='today'?'<span id="todayBadge" class="nav-badge alert" hidden></span>':'')+'</button>'}).join('');document.body.appendChild(nav);
    document.addEventListener('click',function(e){
      var b=e.target.closest('[data-dg-screen],[data-dg-go],[data-dg-device],[data-dg-app],[data-dg-product],[data-dg-mode],[data-dg-preset]');if(!b||b.disabled)return;
      if(b.dataset.dgScreen){modernSelect(b.dataset.dgScreen);return}
      if(S.over||S.pending||!S.flags.diff)return;
      if(b.dataset.dgGo){toastAll=true;try{enter(b.dataset.dgGo)}finally{toastAll=false};return}
      if(b.dataset.dgDevice){openDevice(b.dataset.dgDevice);return}
      if(b.dataset.dgApp){var device=handheld()?'phone':pcHere()?'pc':null;if(!device)return refuse('You need a working phone or tablet, or your computer at home.');openDevice(device);openApp(b.dataset.dgApp);return}
      if(b.dataset.dgProduct){modernBank=b.dataset.dgProduct;render();return}
      if(b.dataset.dgMode){bankQuick={};modernBankMode=b.dataset.dgMode;render();return}
      if(b.dataset.dgPreset){var c=b.closest('.bk-card'),input=c&&c.querySelector('input');if(!input)return;var lim=modernAmountLimit(c),v=b.dataset.dgPreset;modernSetAmount(input,bankPresetAmount(input.id,v,lim));return}
    });
    $('townDirectory').addEventListener('input',function(e){if(e.target.id==='destinationSearch'){modernSearch=e.target.value;modernFilterPlaces()}});
    $('shop').addEventListener('input',function(e){if(e.target.matches('.bk-card input[data-modern-amount]'))modernSetAmount(e.target,e.target.value,true)});
    $('shop').addEventListener('change',function(e){if(e.target.id==='bankProductSelect'){modernBank=e.target.value;render();return}if(e.target.matches('.bk-card input[data-modern-amount]'))modernSetAmount(e.target,e.target.value)});
    $('shop').addEventListener('keydown',function(e){if(e.target.matches('.bk-card input[data-modern-amount]')&&e.key==='Enter'){e.preventDefault();modernSetAmount(e.target,e.target.value);e.target.blur()}});
    /* Validate typed amounts before the existing transaction handlers run, without moving focus or scrolling. */
    $('shop').addEventListener('click',function(e){var b=e.target.closest('[data-bank-deposit],[data-bank-withdraw]');if(!b)return;var c=b.closest('.bk-card'),input=c.querySelector('input');if(!/^\d{1,10}$/.test(input.value)){e.stopImmediatePropagation();input.setAttribute('aria-invalid','true');input.focus();refuse('Enter a whole dollar amount.');return}modernSetAmount(input,input.value)},true);
  }
  function modernQuick(icon,title,sub,attr,disabled,primary){icon=modernIcon({'💼':'work','📚':'study','🍽':'food','🏠':'life','📱':'device','🏦':'bank'}[icon]||'brand');return '<button type="button" class="quick-card'+(primary?' primary':'')+'" '+attr+(disabled?' disabled':'')+'><span class="quick-icon" aria-hidden="true">'+icon+'</span><b>'+modernEsc(title)+'</b><small>'+modernEsc(sub)+'</small></button>'}
  function modernMapFit(){var v=$('townViewport'),c=$('townCanvas');if(v&&c&&v.clientWidth&&v.clientHeight)c.style.width=Math.min(v.clientWidth,v.clientHeight*1.5)+'px';var t=c&&c.querySelector('.tile');if(t&&t.offsetHeight)c.style.setProperty('--tile-half',Math.round(t.offsetHeight/2)+'px')}
  function modernFilterPlaces(){var term=modernSearch.trim().toLowerCase(),count=0;$('townDirectory').querySelectorAll('[data-dg-go]').forEach(function(b){b.hidden=!!term&&!b.textContent.toLowerCase().includes(term);if(!b.hidden)count++});var empty=$('destinationEmpty');if(empty)empty.hidden=!!count}
  function modernPaintPlaces(){
    var currentWork=myJob();var el=$('townDirectory'),key=loc+'|'+S.day+'|'+S.ap+'|'+S.home+'|'+S.homeless;
    if(el.dataset.key===key)return;el.dataset.key=key;
    var rows=LOCS.slice().sort(function(a,b){return dist(loc,a[0])-dist(loc,b[0])});
    el.innerHTML='<div class="town-directory-top"><h2>Where to next?</h2><span class="sub">16 places</span></div><input id="destinationSearch" class="destination-search" type="search" placeholder="Find a place…" aria-label="Find a destination" value="'+modernEsc(modernSearch)+'"><div class="destinations">'+rows.map(function(l){var here=l[0]===loc,closed=shutLeft(l[0]);return '<button type="button" class="destination'+(here?' current':'')+'" data-dg-go="'+l[0]+'"><span aria-hidden="true">'+modernIcon({jobs:'work',school:'study',bank:'bank',fast:'food',resto:'food',hosp:'health',apt:'life',bung:'life',park:'tree',gym:'gym',elec:'device',comm:'rivals'}[l[0]]||'shop')+'</span><div><b>'+modernEsc(l[2])+'</b><small>'+(here?'You are here':hm(dist(loc,l[0])*WALK)+' walk')+(currentWork&&currentWork.b===l[0]?' · Your work':'')+(l[0]===S.home&&!S.homeless?' · Your '+(S.home==='bung'?'bungalow':'apartment'):'')+(closed?' · Closed':'')+'</small></div></button>'}).join('')+'</div><p id="destinationEmpty" class="dest-empty" hidden>No places match your search.</p>';modernFilterPlaces();
  }
  function modernAmountLimit(c){
    var id=c.dataset.bankId,withdraw=modernBankMode==='withdraw',v=id==='amt'?S.bank:S.inv[id.replace('amt_','')].v;
    return {min:withdraw?1:+c.dataset.minimum,max:Math.max(0,withdraw?Math.ceil(v):Math.floor(S.cash))};
  }
  function modernSetAmount(input,raw,typing){
    var c=input.closest('.bk-card'),lim=modernAmountLimit(c),valid=/^\d{1,10}$/.test(String(raw));
    input.setAttribute('aria-invalid',String(!valid));
    if(!valid){modernPaintAmount(c);return}
    if(typing){delete bankQuick[input.id];bankSel[input.id]=Math.floor(+raw);modernPaintAmount(c);return}
    var n=Math.min(lim.max,Math.max(lim.min,Math.floor(+raw)));
    bankSel[input.id]=n;if(!typing||n!==+raw)input.value=n;
    modernPaintAmount(c);
  }
  function modernPaintAmount(c){
    var input=c.querySelector('input'),lim=modernAmountLimit(c),n=Number(input.value),bad=!/^\d{1,10}$/.test(input.value),withdraw=modernBankMode==='withdraw';
    c.dataset.mode=modernBankMode;
    var buttons=c.querySelectorAll('.bk-amt [data-act=step]');buttons.forEach(function(b){var a=b.dataset.arg.split('|');a[2]=lim.min;a[3]=lim.max;b.dataset.arg=a.join('|');b.disabled=bad||(+a[1]<0?n<=lim.min:n>=lim.max)});
    var dep=c.querySelector('[data-bank-deposit]'),wd=c.querySelector('[data-bank-withdraw]');
    var product=c.dataset.bankId==='amt'?null:INV[c.dataset.bankId.replace('amt_','')],need=product&&S.know<product.know?'Needs Knowledge '+product.know:product&&product.dev&&!product.dev.split('|').some(owns)?'Needs a working '+product.dev.replace(/\|/g,' or '):'';
    dep.textContent='Deposit '+money(n||0);dep.disabled=!!S.over||bad||n<lim.min||n>S.cash||!!need;dep.title=need;
    var id=c.dataset.bankId,k=id.replace('amt_',''),v=id==='amt'?S.bank:S.inv[k].v;
    wd.textContent='Withdraw '+money(Math.min(n||0,Math.ceil(v))||0);wd.disabled=!!S.over||bad||v<=0.5||n<1;
    c.querySelectorAll('[data-dg-mode]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.dgMode===modernBankMode))});
    var hint=c.querySelector('.amount-hint'),remaining=withdraw?Math.max(0,v-n):S.cash-n;
    hint.classList.toggle('bad',bad||(!withdraw&&remaining<0));
    hint.textContent=bad?'Enter a whole dollar amount.':withdraw?'Balance after withdrawal: '+money(remaining)+(k==='fd'&&S.day<S.inv.fd.lock?' · Early withdrawal forfeits interest and charges 3% of principal.':''):'Cash remaining: '+money(remaining)+(n>S.cash?' · Not enough cash.':'')+(need?' · '+need+'.':'')+(n<lim.min?' · Minimum '+money(lim.min)+'.':'');
    if(!bad&&!withdraw&&(id==='amt'||k==='fd'))hint.textContent+=' '+interestProjection(id,n);
  }
  function modernPaintBank(){
    if(view!=='bank'&&view!=='bankapp')return;
    var grid=$('shopBody').querySelector('.bk-grid');if(!grid)return;
    var cards=[].slice.call(grid.querySelectorAll('.bk-card'));
    if(!cards.some(function(c){return c.dataset.bankId===modernBank}))modernBank='amt';
    var select=document.createElement('select');select.id='bankProductSelect';select.className='bank-product-select';select.setAttribute('aria-label','Choose savings or investment product');select.innerHTML=cards.map(function(c){return '<option value="'+c.dataset.bankId+'"'+(modernBank===c.dataset.bankId?' selected':'')+'>'+modernEsc(c.querySelector('.bk-h b').textContent)+'</option>'}).join('');
    var tabs=document.createElement('div');tabs.className='bk-tabs';tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','Savings and investment products');
    tabs.innerHTML=cards.map(function(c){return '<button type="button" role="tab" class="bk-tab" data-dg-product="'+c.dataset.bankId+'" aria-selected="'+(modernBank===c.dataset.bankId)+'" aria-controls="bank-panel-'+c.dataset.bankId+'" tabindex="'+(modernBank===c.dataset.bankId?'0':'-1')+'">'+modernEsc(c.querySelector('.bk-h b').textContent)+'</button>'}).join('');grid.before(tabs);tabs.addEventListener('keydown',function(e){if(['ArrowLeft','ArrowRight','Home','End'].indexOf(e.key)<0)return;e.preventDefault();var i=cards.findIndex(function(c){return c.dataset.bankId===modernBank});i=e.key==='Home'?0:e.key==='End'?cards.length-1:(i+(e.key==='ArrowRight'?1:-1)+cards.length)%cards.length;modernBank=cards[i].dataset.bankId;render();$('shopBody').querySelector('[data-dg-product="'+modernBank+'"]').focus()});
    cards.forEach(function(c){
      var active=c.dataset.bankId===modernBank;c.id='bank-panel-'+c.dataset.bankId;c.setAttribute('role','tabpanel');c.hidden=!active;if(!active)return;
      var input=c.querySelector('input');input.removeAttribute('readonly');input.inputMode='numeric';input.pattern='[0-9]*';input.maxLength=10;input.dataset.modernAmount='1';
      var mode=document.createElement('div');mode.className='bk-mode';mode.innerHTML='<button type="button" data-dg-mode="deposit">Deposit</button><button type="button" data-dg-mode="withdraw">Withdraw</button>';c.querySelector('.bk-amt').before(mode);
      var preset=document.createElement('div');preset.className='bk-presets';preset.innerHTML=['100','500','quarter','max'].map(function(p){return '<button type="button" data-dg-preset="'+p+'" aria-label="Add to selection: '+(p==='quarter'?'25 percent':p==='max'?'maximum available':p+' dollars')+'">'+(p==='quarter'?'25%':p==='max'?'Max':'$'+p)+'</button>'}).join('');c.querySelector('.bk-amt').after(preset);
      var hint=document.createElement('p');hint.className='amount-hint';hint.setAttribute('aria-live','polite');c.querySelector('.bk-b').before(hint);
      var lim=modernAmountLimit(c),n=bankSel[input.id]==null?lim.min:bankSel[input.id];modernSetAmount(input,n);
    });
    var table=$('shopBody').querySelector('.bk-cmp-w');if(table){var d=document.createElement('details');d.className='guide-disclosure';d.innerHTML='<summary>Compare all products</summary>';table.before(d);d.appendChild(table)}
    /* Put product controls first. Loan and offer content remains fully available below it. */
    var container=grid.parentNode,anchor=container.firstChild;container.insertBefore(tabs,anchor);container.insertBefore(select,tabs);container.insertBefore(grid,tabs.nextSibling);var firstBox=$('shopBody').querySelector('.pbox');if(firstBox&&firstBox!==container)firstBox.before(container);
  }
  function modernDecorateRivals(){
    if(S.mode!=='rivals')return;
    $('shopBody').querySelectorAll('.arow-t').forEach(function(t){if(t.querySelector('.rival-face'))return;var r=S.rivals.find(function(r){return t.textContent.indexOf(r.name)>=0});if(r)t.insertAdjacentHTML('afterbegin',rivalFace(r))});
  }
  var portraitState=null,portraitSeen='',portraitTimer=null,portraitReturn=null;
  function modernPortraitMinimize(){var p=$('characterPop');if(!p||p.hidden||p.classList.contains('showcase'))return;if(S.pending||S.cert||p.contains(document.activeElement)){portraitTimer=setTimeout(modernPortraitMinimize,500);return}p.classList.add('minimized');p.setAttribute('aria-expanded','false')}
  function modernPortraitClose(){var p=$('characterPop');if(p)p.hidden=true;clearTimeout(portraitTimer)}
  function modernPortrait(i,context,manual){var r=S.rivals&&S.rivals[i],p=$('characterPop');if(!r||!p||S.mode!=='rivals'||S.over||S.pending||S.cert)return;
    clearTimeout(portraitTimer);portraitReturn=document.activeElement;p.hidden=false;p.classList.toggle('showcase',!!manual);p.querySelector('.character-photo').style.setProperty('--face-x',(Math.max(0,i)%4*100/3)+'%');p.querySelector('.character-photo').setAttribute('aria-label',r.name+' portrait');
    $('characterName').textContent=r.name;$('characterContext').textContent=context||'Your neighbour';$('characterMeta').textContent=personality(r).name+' · '+relLabel(r.rel||0);$('characterLine').textContent=manual?personality(r).about:(S.logs&&S.logs[0]?String(S.logs[0][0]).replace(/^Day \d+: /,'').replace(/<[^>]*>/g,''):'');
    p.classList.remove('minimized');p.setAttribute('aria-expanded','true');
    if(manual)$('characterClose').focus();else if(!/message/i.test(context||''))portraitTimer=setTimeout(modernPortraitMinimize,CONFIG.rivals.social.greetingMs);
  }
  function modernPortraitSetup(){
    var p=document.createElement('aside');p.id='characterPop';p.hidden=true;p.setAttribute('role','dialog');p.setAttribute('aria-label','Character portrait');p.innerHTML='<div class="character-photo" role="img"></div><div class="character-copy"><span id="characterContext" class="eyebrow"></span><h2 id="characterName"></h2><p id="characterMeta"></p><p id="characterLine"></p><button type="button" class="btn" id="characterClose">Close ✕</button></div>';document.body.appendChild(p);
    var reopen=document.createElement('button');reopen.type='button';reopen.id='characterReopen';reopen.className='btn';reopen.textContent='Show greeting';reopen.addEventListener('click',function(){p.classList.remove('minimized');p.setAttribute('aria-expanded','true');$('characterClose').focus()});p.appendChild(reopen);
    $('characterClose').addEventListener('click',function(){modernPortraitClose();if(portraitReturn&&portraitReturn.isConnected)portraitReturn.focus()});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!p.hidden){e.preventDefault();e.stopImmediatePropagation();modernPortraitClose();return}var t=e.target.closest&&e.target.closest('[data-portrait]');if(t&&(e.key==='Enter'||e.key===' ')){e.preventDefault();modernPortrait(+t.dataset.portrait,'Meet your neighbour',true)}},true);
    document.addEventListener('click',function(e){var face=e.target.closest&&e.target.closest('[data-portrait]');if(face){e.preventDefault();e.stopPropagation();modernPortrait(+face.dataset.portrait,'Meet your neighbour',true)} });
    document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act], [data-cg]');if(!b||b.disabled)return;var a=b.dataset.act,arg=b.dataset.arg||'',i=null;
      if(a==='meet'&&S.enc)i=S.enc.i;else if(a==='rcall'&&arg!=='group')i=+arg;else if(b.dataset.cg!=null)i=+b.dataset.cg;else if(a==='msg'){var m=(S.msgs||[]).find(function(m){return m.id===+arg.split('|')[0]});if(m)i=m.i}
      if(i!==null){var state=S,oldStatus=m&&m.st;setTimeout(function(){if(S!==state)return;var success=a==='rcall'?calledToday(i):a==='meet'?S.enc&&S.enc.done:b.dataset.cg!=null?S.cong&&S.cong.d===S.day&&S.cong[i]:a==='msg'?m&&m.st!==oldStatus:false;if(success)modernPortrait(i,a==='rcall'?'On the phone':a==='meet'?'Around town':'A message from your neighbour',false)},0)}
    },true);
  }
  function modernPortraitBeat(){if(S.over||S.pending||S.cert){modernPortraitClose();return}if(portraitState!==S){portraitState=S;portraitSeen='';modernPortraitClose()}var e=S.enc;if(S.mode==='rivals'&&e&&!e.done&&e.day===S.day&&e.loc===view){var key=e.day+'|'+e.i+'|'+e.loc;if(key!==portraitSeen){portraitSeen=key;modernPortrait(e.i,'You meet at '+NAME[e.loc],false)}}}
  function modernLog(open){var d=$('logDrawer');if(!d)return;d.hidden=!open;$('logBig').textContent=open?'Close log':'Expand log';$('logBig').setAttribute('aria-expanded',String(open));if(open){$('log').classList.add('big');$('log').style.height='';$('hudTools').open=false;$('closeLog').focus()}}
  function modernDrawTown(){
    var canvas=$('townCanvas'),svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 1000 666.667');svg.classList.add('neighbourhood-art');svg.setAttribute('aria-hidden','true');
    var foot=function(k){var p=TOWN_LAYOUT[k];return [p[0]*10,p[1]*6.6667+25]},loop=['apt','jobs','school','bank','market','hosp','factory','bung','thrift','park'].map(foot),road=loopPath(loop),h='<defs><radialGradient id="townGround"><stop stop-color="#5b8064"/><stop offset="1" stop-color="#315c51"/></radialGradient><pattern id="townGrain" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M3 8h2m17 13h2" stroke="#86ac8433"/></pattern></defs><rect width="1000" height="667" fill="url(#townGround)"/><rect width="1000" height="667" fill="url(#townGrain)"/><path d="M970 -20 Q900 140 968 290 T960 700" fill="none" stroke="#29606b" stroke-width="65"/><path d="M970 -20 Q900 140 968 290 T960 700" fill="none" stroke="#558391" stroke-width="2" opacity=".45"/>';
    var paths=[road];[['jobs','comm','fast','mall','thrift'],['school','resto','gym','bung'],['apt','elec','park'],['fast','resto','market']].forEach(function(keys){var p=keys.map(foot);paths.push('M'+p[0].join(',')+p.slice(1).map(function(v,i){var a=p[i];return ' Q'+[(a[0]+v[0])/2+14,(a[1]+v[1])/2-8].join(',')+' '+v.join(',')}).join(''))});
    paths.forEach(function(d){h+='<path d="'+d+'" fill="none" stroke="#697b71" stroke-width="31" stroke-linecap="round" stroke-linejoin="round"/><path d="'+d+'" fill="none" stroke="#34484a" stroke-width="22" stroke-linecap="round"/><path d="'+d+'" fill="none" stroke="#bdac7155" stroke-width="1.4" stroke-dasharray="10 13"/>'});
    var rand=rng(81);for(var i=0;i<85;i++){var x=rand()*925+20,y=rand()*610+35;var near=Object.values(TOWN_LAYOUT).some(function(p){return Math.hypot(x-p[0]*10,(y-p[1]*6.6667)*1.2)<65});if(!near)h+='<g><ellipse cx="'+x+'" cy="'+(y+7)+'" rx="14" ry="6" fill="#102e31"/><circle cx="'+x+'" cy="'+(y-4)+'" r="13" fill="'+(i%2?'#49795b':'#386950')+'"/><circle cx="'+(x-4)+'" cy="'+(y-8)+'" r="7" fill="#679263" opacity=".6"/></g>'}
    Object.keys(TOWN_LAYOUT).forEach(function(k){var p=foot(k);h+='<g class="street-lamp"><circle cx="'+(p[0]+42)+'" cy="'+(p[1]-5)+'" r="14" fill="#ffd591" opacity=".10"/><circle cx="'+(p[0]+42)+'" cy="'+(p[1]-5)+'" r="3" fill="#ffd591"/></g>'});svg.innerHTML=h;canvas.prepend(svg);
  }
  function modernLandmarks(){
    var j=myJob(),work=j&&j.b,closed=work&&shutLeft(work)>0;
    document.querySelectorAll('.tile').forEach(function(t){var k=t.dataset.loc,you=k===loc,home=k===S.home&&!S.homeless,job=k===work;
      t.classList.toggle('workplace',job);t.classList.toggle('work-closed',job&&closed);t.classList.toggle('homeplace',home);
      var tags=(you?'<span class="tag you">📍 You are here</span>':'')+(job?'<span class="tag '+(closed?'closed':'job')+'">'+(closed?'🔒 Work closed':'💼 Your work')+'</span>':'')+(home?'<span class="tag home">🏠 Your '+(k==='bung'?'bungalow':'apartment')+'</span>':'');t.querySelector('.tags').innerHTML=tags;
      var tl=document.querySelector('.town-label[data-for="'+k+'"]');if(tl){tl.classList.toggle('here',you);tl.classList.toggle('tagged',you||job||home)}
      t.setAttribute('aria-label',NAME[k]+(you?', you are here':'')+(home?', your home':'')+(job?', your workplace'+(closed?', closed today':''):'')+', '+hm(dist(loc,k)*WALK)+' walk');
    });
  }
  function modernRivalCharts(){
    if(S.mode!=='rivals'||!S.rivals.length)return;
    var people=lifeScore(),wealthMax=Math.max(1,...people.map(function(p){return Math.max(0,p.worth)})),careerMax=Math.max(1,...people.map(function(p){return p.best?p.best.pay:0}));
    var rows=$('rivList').querySelectorAll('details');people.forEach(function(p,i){var row=rows[i];if(!row)return;var pay=p.best?p.best.pay:0,chart=document.createElement('div');chart.className='rival-chart';chart.setAttribute('role','img');chart.setAttribute('aria-label',p.name+': net worth '+money(p.worth)+', best career '+money(pay)+' per shift');
      chart.innerHTML='<span>Net worth</span><span class="chart-track"><i style="width:'+(Math.max(0,p.worth)/wealthMax*100)+'%"></i></span><b>'+money(p.worth)+'</b><span>Career</span><span class="chart-track career-bar"><i style="width:'+(pay/careerMax*100)+'%"></i></span><b>'+money(pay)+'/shift</b><span class="chart-note">Best career pay · relative to this town</span>';row.querySelector('summary').appendChild(chart);
    });
  }
  function modernPaint(){
    if(modernState!==S){modernState=S;modernDay=S.day;modernScreen='today';modernBank='amt';modernBankMode='deposit'}
    if(modernDay!==S.day){modernDay=S.day;if(!view)modernScreen='today'}
    var screen=view?'building':modernScreen;document.body.dataset.screen=screen;document.body.dataset.building=view||'';
    $('center').hidden=false;$('townDirectory').hidden=screen!=='town';
    if(screen==='town'){$('overview').hidden=true;$('shop').hidden=true;modernPaintPlaces()}
    $('toasts').style.top='';modernMapFit();
    [['energy',S.energy],['happy',S.happy],['health',S.health],['know',S.know]].forEach(function(p){$(p[0]).style.color=p[1]<30?'var(--red)':p[1]<60?'#f0c579':'#9ce3ce'});
    $('saveSt').textContent=$('saveSt').textContent.replace('💾 ','');$('meal').textContent=$('meal').textContent.replace(/^[^A-Za-z]+/,'');
    $('appDay').textContent=S.day+(maxDays()===Infinity?'':' / '+maxDays());$('appTime').textContent=hm(S.ap);$('appCash').textContent=window.innerWidth<=640?kMoney(S.cash):money(S.cash);$('appCash').title=money(S.cash);$('appEnergy').textContent=Math.round(S.energy)+'%';
    $('appSky').textContent=S.ap>960?'☀':S.ap>480?'◐':'☾';
    $('appHealth').textContent=Math.round(S.health)+'%';$('appHappy').textContent=Math.round(S.happy)+'%';
    [['appHealth',S.health<CONFIG.health.poorBelow],['appHappy',S.happy<25],['appEnergy',S.energy<30]].forEach(function(p){$(p[0]).style.color=p[1]?'var(--red)':'#9ce3ce'});
    var next=Math.max(0,nextGoal()-worth()),warns=stressList();$('hudRank').textContent=money(worth())+' net worth'+(next?' · '+money(next)+' to '+TIERS[Math.min(TIERS.length-1,S.tier+1)].n:' · Top rank');
    var job=myJob();$('hudLocation').textContent=NAME[loc]+(job?' · '+job.rk.r+' '+money(payInfo().v)+'/shift'+(shutLeft(job.b)>0?' · Work closed':''):'');
    $('hudRank').style.setProperty('--rank-progress',Math.max(0,Math.min(100,worth()/Math.max(1,nextGoal())*100))+'%');
    $('appInbox').hidden=S.mode!=='rivals'||!newMsgs()||!handheld();$('appInbox').textContent=(S.mode==='rivals'?newMsgs():0)+' messages';
    $('hudAlert').hidden=!warns.length;$('hudAlert').textContent=warns.length+' alert'+(warns.length===1?'':'s');$('hudAlert').title=warns.map(function(w){return w.t.replace(/<[^>]*>/g,'')}).join(' / ');
    $('appTime').className=S.ap<180?'time-urgent':S.ap<480?'time-warning':'';
    $('dailyProgress').innerHTML='<span class="'+(S.fed?'eaten':'not-eaten')+'" title="'+(S.fed?'Eaten today':'No meal yet')+'"><i class="dp-short" aria-hidden="true">🍽 '+(S.fed?'✓':'!')+'</i><i class="dp-full">'+(S.fed?'✓ Eaten today':'! No meal yet')+'</i></span><span title="Worked today"><i class="dp-short" aria-hidden="true">💼 </i><i class="dp-full">Work: </i>'+hm(S.workMin||0)+'</span><span title="Studied today"><i class="dp-short" aria-hidden="true">📚 </i><i class="dp-full">Study: </i>'+hm(S.studyMin||0)+'</span>';
    $('appTop').style.setProperty('--rank-progress',Math.max(0,Math.min(100,worth()/Math.max(1,nextGoal())*100))+'%');
    var tb=$('todayBadge');if(tb){tb.hidden=!warns.length;tb.textContent=warns.length;tb.title=warns.length+' alert'+(warns.length===1?'':'s')+' on the Today screen'}
    $('townDevice').disabled=!handheld()||!!S.over||!!S.pending;$('townDevice').textContent=owns('tablet')&&!owns('phone')?'Tablet apps':'Phone / tablet apps';$('townDeviceNote').textContent=handheld()?'Bank · Jobs'+(S.mode==='rivals'?' · Calls · Messages':''):'Buy a phone or tablet to use apps';
    var shadeLevel=S.over?0:Math.max(0,1-S.ap/MAX_AP);document.documentElement.style.setProperty('--day-shade',(shadeLevel*.13).toFixed(3));$('board').style.setProperty('--map-dusk',(shadeLevel*.35).toFixed(3));
    modernLandmarks();modernRivalCharts();modernPortraitBeat();
    var blocked=!!S.over||!!S.pending||!S.flags.diff;
    $('appNav').querySelectorAll('[data-dg-screen]').forEach(function(b){b.disabled=blocked;if(b.dataset.dgScreen===modernScreen)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
    var badge=$('rivalBadge'),unread=S.mode==='rivals'?newMsgs():0;badge.hidden=!unread;badge.textContent=unread;
    var texts={today:['Make today count.','A little progress goes a long way.'],life:['Your life, in balance.','Money, home and everything you are building.'],rivals:['Meet your neighbours.','Different ambitions. The same twenty-four hours.']},txt=texts[modernScreen]||texts.today;
    $('screenHeading').innerHTML='<span class="eyebrow">'+(modernScreen==='rivals'?'The people in your town':modernScreen==='life'?'Your progress':'Day '+S.day+' · '+modernEsc(Df().n))+'</span><h1>'+txt[0]+'</h1><p>'+txt[1]+'</p>';
    var j=myJob(),track=Object.keys(TRACKS).find(function(t){return inProgress(t)}),device=handheld()||pcHere();
    $('todayQuick').innerHTML=modernQuick('💼',j?'Go to work':'Find your first job',j?j.rk.r+' · '+money(payInfo().v)+'/shift':'Explore the Employment Office','data-dg-go="'+(j?j.b:'jobs')+'"',false,true)+modernQuick('📚',track?'Continue your course':'Build your skills',track?TRACKS[track].n:'Explore learning pathways','data-dg-go="school"')+modernQuick('🍽',S.fed?'Plan your next meal':'Time for a meal',S.fed?'You have eaten today':'Visit Fast Food or the Supermarket','data-dg-go="fast"')+modernQuick('🏠','Head home',S.homeless?'Find somewhere to live':'Rest, cook and recharge','data-dg-go="'+S.home+'"');
    var goal=Math.max(0,nextGoal()-worth());$('todayFocus').innerHTML='<div><b>'+(goal?money(goal)+' to your next rank':'You reached the top rank')+'</b><span>'+(S.fed?'Meal sorted. Make time to recharge.':'Remember to eat before ending your day.')+'</span></div><span aria-hidden="true">↗</span>';
    $('lifeShortcuts').innerHTML=modernQuick('🏦','Manage your money',device?'Savings and investments':'Visit the Bank in town',device?'data-dg-app="bankapp"':'data-dg-go="bank"');
    $('rivalIntro').textContent=S.mode==='rivals'?'Open a profile to see personality, relationships and remembered favours.':'You are playing a solo game. Start a game with AI rivals to meet your neighbours.';
    var guide=$('goals').parentNode;guide.hidden=$('goals').hidden;
    if(view){$('shopTitle').innerHTML=modernIcon({jobs:'work',school:'study',bank:'bank',bankapp:'bank',jobsapp:'work',phone:'device',pc:'device',msgsapp:'rivals',callsapp:'rivals',fast:'food',resto:'food',hosp:'health',apt:'life',bung:'life',park:'tree',gym:'gym',elec:'device',comm:'rivals'}[view]||'shop')+' '+modernEsc(NAME[view]);var base=view==='bankapp'?'bank':view==='jobsapp'?'jobs':APPS.indexOf(view)>=0?loc:view,i=Math.max(0,SCENE_KEYS.indexOf(base)),hero=$('interiorHero');hero.style.setProperty('--scene-x',(i%4*100/3)+'%');hero.style.setProperty('--scene-y',(Math.floor(i/4)*100/3)+'%');hero.setAttribute('aria-label',NAME[base]+' illustrated background');hero.querySelector('.interior-caption').textContent=APPS.indexOf(view)>=0?'On your '+(appFrom==='pc'?'computer':'phone'):'Welcome to '+NAME[base];modernPaintBank();modernDecorateRivals()}
    var key=screen+'|'+view;if($('center').dataset.modernKey!==key){$('center').dataset.modernKey=key;$('center').scrollTop=0}
    $('hudLeave').setAttribute('aria-label','Back to '+modernScreen);var endLabel=$('hudEnd').textContent;$('hudEnd').setAttribute('aria-label',endLabel);$('hudEnd').title=endLabel;var endFull=atHome()?'Sleep':'Bunk outside';$('hudEnd').innerHTML=atHome()?'Sleep':'<i class="dp-full">Bunk outside</i><i class="dp-short">Sleep out</i>';$('hudEnd').setAttribute('aria-label',endFull);$('hudEnd').title=endFull;$('hudEnd').classList.toggle('warn',!atHome());
  }
  modernSetup();
  /* Keep the panel in one app viewport on every device; it never moves below the map. */
  window.removeEventListener('resize',placeCenter);
  placeCenter=function(){var c=$('center'),b=$('board');if(c.parentNode!==b)b.appendChild(c);c.classList.remove('ovl');b.classList.remove('ovlOpen');if($('evwrap').parentNode!==document.body)document.body.appendChild($('evwrap'))};
  window.addEventListener('resize',placeCenter);window.addEventListener('resize',modernMapFit);
  var modernStepBase=stepAmt;stepAmt=function(arg){modernStepBase(arg);var input=$(String(arg).split('|')[0]);if(input&&input.dataset.modernAmount)modernSetAmount(input,input.value)};
  var modernRenderBase=render;render=function(){modernRenderBase();modernPaint()};


