/* The pathway and job tables, checked against the game's rules, using the game's own built tables (no copy of the rules' data).
   Usage: node tools/qa/check-tables.js <folder outside the repo> [--list] [page]
   ERROR = a broken rule (exit 1). WARN = a judgement call to show the user. --list prints every pathway and job. */
const path=require('path'),{outDir,openGame}=require('./qa-page.js');
const args=process.argv.slice(2),LIST=args.includes('--list'),pos=args.filter(a=>!a.startsWith('--')),out=outDir(pos[0],'dg-tables'),page=pos[1]&&path.resolve(pos[1]);
(async()=>{const {br,pg,errors}=await openGame(out,{page});
 try{
  const r=await pg.evaluate(()=>{const T=__T,E=[],W=[],GEN=['Certificate','Degree','Honours','Masters'];
   T.ev("Object.keys(CAREERS).forEach(function(c){CAREERS[c].ranks.forEach(function(rk){if(rk.base)rk.pay=rk.base})})");const TRACKS=T.ev('TRACKS'),CAREERS=T.ev('CAREERS'),BOARD=T.ev('BOARD'),CONFIG=T.ev('CONFIG'),NAME=T.ev('NAME'),blankEdu=T.ev('blank().edu');
   T.ev('CFG_WARN').forEach(w=>E.push('Game warning on load: '+w));
   const hoursTo=(t,l)=>{let h=0,n=0;for(let i=0;i<l;i++){const k=TRACKS[t].L[i].length;h+=k*T.ev("lesCount('"+t+"',"+n+")*lesHours('"+t+"',"+n+")");n+=k}return Math.round(h*100)/100};
   const paths=[],first={},names={};
   Object.keys(TRACKS).forEach(t=>{const P=TRACKS[t],tag='Pathway "'+P.n+'" ('+t+')';
    if(!/^[a-z][a-z0-9]{1,5}$/.test(t))E.push(tag+': key must be 2-6 lowercase letters or digits.');
    if(names[P.n])E.push(tag+': name already used.');names[P.n]=1;const f=P.n.split(' ')[0];if(first[f])E.push(tag+': first word "'+f+'" clashes with '+first[f]+'.');first[f]=t;
    if(P.lv[0]!=='Certificate')E.push(tag+': must start at Certificate.');let last=-1;
    P.lv.forEach(l=>{const i=GEN.indexOf(l);if(i<0)E.push(tag+': unknown level '+l);else if(i<=last)E.push(tag+': levels out of order.');last=Math.max(last,i)});
    if(P.L.length!==P.lv.length)E.push(tag+': one module list per level is needed.');
    let n=0;const lv=[];P.L.forEach((list,i)=>{if(list.length<1||list.length>4)E.push(tag+' '+P.lv[i]+': '+list.length+' modules (rule: 1 to 4).');
      const ln=T.ev("lesCount('"+t+"',"+n+")"),lh=T.ev("lesHours('"+t+"',"+n+")");if(!(ln>=2&&ln<=4))E.push(tag+' '+P.lv[i]+': '+ln+' lessons a module (rule: 2 to 4).');if(!(lh>0&&lh<=3))E.push(tag+' '+P.lv[i]+': '+lh+'h a lesson (rule: up to 3h).');
      lv.push(P.lv[i]+' '+list.length+' modules x '+ln+' lessons x '+Math.round(lh*60)+'m ('+hoursTo(t,i+1)+'h in all)');n+=list.length});
    if(blankEdu[t]!==0)E.push(tag+': missing from blank() edu.');
    if(!(CONFIG.education.certFee&&CONFIG.education.certFee[t]>0))E.push(tag+': no Certificate fee in CONFIG.education.certFee.');
    paths.push(P.n+' ['+t+']: '+lv.join(' | ')+' · Certificate fee $'+(CONFIG.education.certFee||{})[t])});
   Object.keys(blankEdu).forEach(k=>{if(!TRACKS[k])E.push('blank() edu lists "'+k+'" but there is no such pathway.')});
   const all=[];
   Object.keys(CAREERS).forEach(c=>{const C=CAREERS[c],b=C.b||c;if(!NAME[b])E.push('Job line '+c+': building "'+b+'" is not on the map.');if(BOARD.indexOf(c)<0)E.push('Job line '+c+' ('+C.n+') is not in BOARD.');
    let pp=-1,ph=-1,pn='';C.ranks.forEach(rk=>{const tag='"'+rk.r+'" ('+C.n+')',q=rk.q||[],best={};q.forEach(x=>{if(!TRACKS[x[0]]||x[1]<1||x[1]>TRACKS[x[0]].lv.length)E.push(tag+': asks for a level its pathway does not have.');else best[x[0]]=Math.max(best[x[0]]||0,x[1])});
      const h=Object.keys(best).reduce((a,t)=>a+hoursTo(t,best[t]),0),ef=T.ev('effort('+rk.pay+')');
      if(!(Number.isInteger(rk.pay)&&rk.pay>=40&&rk.pay<=1500))E.push(tag+': pay must be a whole number from 40 to 1500.');
      if(rk.pay<pp)E.push(tag+': pays less than '+pn+' listed before it (lowest pay first).');if(h<ph-1e-9)E.push(tag+': pays more than '+pn+' but needs less study ('+h+'h against '+ph+'h).');
      if(rk.dress&&['casual','smart','suit'].indexOf(rk.dress)<0)E.push(tag+': dress must be casual, smart or suit.');if(T.ev('kreq')(rk)>100)E.push(tag+': knowledge over 100.');
      pp=rk.pay;ph=h;pn=rk.r;all.push({c,b,line:C.n,r:rk.r,pay:rk.pay,min:ef.min,h,q:q.map(x=>TRACKS[x[0]].n+' '+TRACKS[x[0]].lv[x[1]-1]).join(' + ')||'none',kn:T.ev('kreq')(rk),dress:rk.dress||'any'})})});
   const s=all.slice().sort((a,b)=>a.pay-b.pay);let bestPh=0,bestR=null,gp=-1,gb=0,gr=null;
   s.forEach(z=>{const ph=z.pay/(z.min/60);if(z.pay!==gp){if(gb>bestPh){bestPh=gb;bestR=gr}gp=z.pay;gb=0}
     if(ph<bestPh-1e-9)E.push('Pay per hour falls: '+z.r+' $'+z.pay+' earns $'+ph.toFixed(1)+'/h, less than '+bestR.r+' at $'+bestR.pay+' ($'+bestPh.toFixed(1)+'/h).');if(ph>gb){gb=ph;gr=z}
     if(z.min>CONFIG.time.maxWorkMinutes)E.push(z.r+': one shift is longer than the daily work limit.')});
   const byB={};all.forEach(o=>(byB[o.b]=byB[o.b]||[]).push(o));
   Object.keys(byB).forEach(b=>{const L=byB[b].slice().sort((x,y)=>x.pay-y.pay);let top=L[0];L.forEach(o=>{if(o.pay>top.pay&&o.h<top.h)W.push('At the '+NAME[b]+', '+o.r+' ($'+o.pay+', '+o.h+'h study) pays more than '+top.r+' ($'+top.pay+', '+top.h+'h) with less study.');if(o.h>=top.h)top=o})});
   /* known and accepted by the owner (reported, left as is): shown as KNOWN, not counted as an error */
   const KNOWN=[/^"Principal Engineer" \(Factory\): pays more than Project Lead but needs less study/];
   const K=E.filter(e=>KNOWN.some(k=>k.test(e)));K.forEach(e=>E.splice(E.indexOf(e),1));
   return {E,W,K,paths,all,byB:Object.keys(byB).map(b=>[NAME[b],byB[b]]),tracks:Object.keys(TRACKS).length}});
  if(errors.length)r.E.push('Script errors: '+errors.join(' | '));
  console.log('Daily Grind tables: '+r.tracks+' pathways, '+r.all.length+' roles in '+r.byB.length+' buildings.');
  if(LIST){console.log('\nPATHWAYS');r.paths.forEach(p=>console.log('  '+p));console.log('\nJOBS (base pay, shift, pay an hour, study, needs)');
   r.byB.forEach(([n,l])=>{console.log('  '+n);l.forEach(o=>console.log('    '+o.r.padEnd(27)+('$'+o.pay).padStart(5)+'  '+(o.min/60).toFixed(2)+'h  $'+(o.pay/(o.min/60)).toFixed(0).padStart(3)+'/h  '+String(o.h).padStart(5)+'h study  '+o.q+(o.kn?' · knowledge '+o.kn:'')+' · '+o.dress+'  ['+o.c+']'))})}
  r.K.forEach(w=>console.log('KNOWN '+w));r.W.forEach(w=>console.log('WARN  '+w));r.E.forEach(e=>console.log('ERROR '+e));
  console.log(r.E.length?'\nFAILED: '+r.E.length+' error(s), '+r.W.length+' warning(s).':'\nPASS tables: '+r.W.length+' warning(s).');process.exitCode=r.E.length?1:0;
 }finally{await br.close()}
})().catch(e=>{console.error(e.message||e);process.exitCode=1});
