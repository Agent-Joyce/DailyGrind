/* AI rivals' careers: a dress code must never lock a rival out of a job, and single games must not touch the rivals' dice.
   Plays seeded 30-day rival games overnight only (you sleep every day with a meal, clothes and a little cash), so it is quick;
   it is not a balance simulation. Usage: node tools/qa/check-rival-careers.js <folder outside the repo> [games per level, default 3] [page]
   Prints every rival's final job, dress and net worth, and a spread summary. Fails when no planning rival (medium, expert)
   holds a smart or suit role in any game, when more than a third of games end with every planning rival in one career line, when a planning rival goes two mornings without clothes, on a script error, or when a single game draws rival dice. */
const fs=require('fs'),path=require('path'),{outDir,openGame,PAGE_HELPERS}=require('./qa-page.js');
const out=outDir(process.argv[2],'dg-rival-careers'),games=Math.max(1,+process.argv[3]||3),page=process.argv[4]&&path.resolve(process.argv[4]);
(async()=>{const {br,pg,errors}=await openGame(out,{page});
 try{
  await pg.addScriptTag({content:PAGE_HELPERS});
  const res=await pg.evaluate(games=>{const T=__T,rows=[];
   for(const level of ['medium','expert','mixed'])for(let g=1;g<=games;g++){
    QA.seed(g*97);QA.newGame('rivals',level,g*1000+5,200);
    let naked=0;
    for(let d=0;d<30&&!T.ev("S.over");d++){T.ev("S.fed=true;S.cash+=150;S.clothes.casual=5;S.energy=80;S.happy=70;S.health=80");QA.night();QA.closeMorning();
      /* a planning rival must never be left without clothes two mornings running (CHANGELOG 108: it can then neither work nor take gigs) */
      T.ev("S.rivals.forEach(function(r){var c=r.clothes;r.__nk=(!r.out&&r.diff!=='easy'&&!(c.casual>0||c.smart>0||c.suit>0))?(r.__nk||0)+1:0})");
      naked+=T.ev("S.rivals.filter(function(r){return r.__nk>=2}).length")}
    rows.push({level,game:g,naked,days:T.ev("S.day-1"),rivals:T.ev("S.rivals.map(function(r){var j=rivalJob(r);return {name:r.name,diff:r.diff,job:j?j.rk.r:'none',career:j?j.c:'',dress:j&&j.rk.dress||'',pay:j?j.rk.pay:0,worth:rivalWorth(r),out:r.out?r.out.why+' (day '+r.out.day+')':'',levels:Object.keys(r.edu).map(function(t){return rivalLv(r,t)}).reduce(function(a,b){return a+b},0)}})")});
   }
   /* a single game never rolls the rivals' dice */
   QA.seed(11);QA.newGame('single');const seed0=T.ev("S.rivalSeed");for(let d=0;d<5;d++){T.ev("S.fed=true;S.cash+=150;S.clothes.casual=5");QA.night();QA.closeMorning()}
   return {rows,singleDice:T.ev("S.rivalSeed")===seed0};
  },games);
  fs.writeFileSync(path.join(out,'rival-careers.json'),JSON.stringify(res,null,1));
  let planners=0,dressed=0,sameAll=0,full=0;const jobs={};
  res.rows.forEach(g=>{console.log(g.level+' game '+g.game+' ('+g.days+' days): '+g.rivals.map(r=>r.diff[0]+' '+r.name+': '+r.job+(r.dress?' ['+r.dress+']':'')+' $'+r.worth+(r.out?' OUT '+r.out:'')).join(' | '));
    const live=g.rivals.filter(r=>!r.out&&r.diff!=='easy');live.forEach(r=>{planners++;if(r.dress==='suit'||r.dress==='smart')dressed++;jobs[r.job]=(jobs[r.job]||0)+1});
    if(live.length>1){full++;if(new Set(live.map(r=>r.career)).size===1)sameAll++}});
  console.log('\nPlanning rivals still in the race: '+planners+'; in a smart or suit role: '+dressed+'.');
  console.log('Final jobs: '+Object.entries(jobs).sort((a,b)=>b[1]-a[1]).map(e=>e[1]+' '+e[0]).join(', ')+'.');
  console.log('Games where every surviving planning rival ended in the same career line: '+sameAll+' of '+full+' (fails above a third: archetypes should send rivals down different ladders, CHANGELOG 109).');
  const naked=res.rows.reduce((n,g)=>n+g.naked,0);console.log('Planning-rival mornings without clothes for a second day running: '+naked+'.');
  const fail=[];if(full&&sameAll*3>full)fail.push(sameAll+' of '+full+' games ended with every planning rival in one career line');if(naked)fail.push(naked+' planning-rival mornings without clothes two days running (the course-fee clothes spiral is back)');if(errors.length)fail.push('script errors: '+errors.join(' | '));if(!dressed)fail.push('no planning rival holds a smart or suit role: the dress-code lock is back');if(!res.singleDice)fail.push('a single game drew rival dice');
  if(fail.length){console.error('FAIL '+fail.join('; '));process.exitCode=1}else console.log('PASS rival careers: dress codes do not lock rivals out; single games leave the rival dice alone.');
 }finally{await br.close()}
})().catch(e=>{console.error(e.message||e);process.exitCode=1});
