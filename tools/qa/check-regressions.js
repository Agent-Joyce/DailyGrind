/* Targeted checks only; no multi-game simulations. Output stays outside the repo. */
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const {pathToFileURL}=require('url'),{chromium}=require('playwright');
const repo=path.resolve(__dirname,'../..'),out=path.resolve(process.argv[2]||path.join(repo,'../regressions'));
if(out===repo||(out+path.sep).startsWith(repo+path.sep))throw Error('Output must be outside the repo');
fs.mkdirSync(out,{recursive:true});
let src=fs.readFileSync(path.join(repo,'index.html'),'utf8');
const marker='  if(!load())fresh();';assert.equal(src.split(marker).length,2);
src=src.replace(marker,`  window.__T={get S(){return S},set S(x){S=x},CONFIG,blank,blankLife,makeRivals,settleMoney,worth,rivalWorth,myRent,payRent,HOUSE,healthTick,sampleNight,rollover,finish,save,load,render,get nightRun(){return nightRun},set nightRun(x){nightRun=x},set nightFed(x){nightFed=x},set loc(x){loc=x},set view(x){view=x}};\n`+marker);
fs.writeFileSync(path.join(out,'targeted.html'),src);
(async()=>{const browser=await chromium.launch(process.env.DG_BROWSER_CHANNEL?{channel:process.env.DG_BROWSER_CHANNEL}:{});try{
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.route(/^https?:\/\//,r=>r.abort());await page.goto(pathToFileURL(path.join(out,'targeted.html')).href);
const results=await page.evaluate(()=>{
 const T=__T,results=[];let seed=7;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
 function eq(a,b){if(JSON.stringify(a)!==JSON.stringify(b))throw Error(JSON.stringify(a)+' != '+JSON.stringify(b))}
 function test(name,fn){reset();fn();results.push(name)}
 function reset(){T.S=T.blank();const s=T.S;s.logs=[];s.mode='rivals';s.flags.diff=1;s.day=6;s.cash=1000;s.bank=0;s.fed=true;s.clothes.casual=100;s.life=T.blankLife();s.rivals=T.makeRivals(3,'medium',1000);s.rivals.forEach(r=>r.life=T.blankLife());T.loc='apt';T.view=null;T.nightRun=false;T.nightFed=false}
 test('two simultaneous ties do not create a false win',()=>{const s=T.S;s.cash=900;s.rivals.forEach(r=>r.cash=950);s.bets=[0,1].map(i=>({i,stake:50,until:5,y0:1000,r0:1000}));T.settleMoney();eq([s.cash,s.rivals[0].cash,s.rivals[1].cash,s.bets.length],[1000,1000,1000,0])});
 test('mixed simultaneous win/loss is independent of settlement order',()=>{function run(order){reset();const s=T.S;s.cash=900;s.rivals[0].cash=1050;s.rivals[1].cash=850;s.bets=order.map(i=>({i,stake:50,until:5,y0:1000,r0:1000}));T.settleMoney();return [s.cash,s.rivals[0].cash,s.rivals[1].cash,s.happy]}eq(run([0,1]),run([1,0]))});
 test('dropout refund cannot change another bet result',()=>{const s=T.S;s.cash=900;s.rivals.forEach(r=>r.cash=950);s.rivals[0].out={day:5};s.bets=[0,1].map(i=>({i,stake:50,until:5,y0:1000,r0:1000}));T.settleMoney();eq([s.cash,s.rivals[1].cash],[1000,1000])});
 test('future bet retains its held stake',()=>{const s=T.S;s.cash=900;s.rivals.forEach(r=>r.cash=950);s.bets=[{i:0,stake:50,until:5,y0:1000,r0:1000},{i:1,stake:50,until:8,y0:1000,r0:1000}];T.settleMoney();eq([s.cash,s.bets.length,T.worth()],[950,1,1000])});
 test('rent skip belongs to its bill and future prepayment costs half',()=>{const s=T.S;s.flat={i:0};s.flatSkip=5;const rent=T.HOUSE.apt.rent;eq([T.myRent(5),T.myRent(10),T.myRent()],[rent,Math.ceil(rent/2),Math.ceil(rent/2)]);const cash=s.cash;T.payRent();eq([cash-s.cash,s.rentPaid,s.rentPaidAmt],[Math.ceil(rent/2),10,Math.ceil(rent/2)]);T.payRent();eq(s.cash,cash-Math.ceil(rent/2))});
 test('overnight recovery uses final health and sample is idempotent',()=>{const s=T.S;s.health=T.CONFIG.health.poorBelow-1;s.slept=20;s.energy=80;T.healthTick(true);T.sampleNight(true);T.sampleNight(true);eq([s.life.unwell,s.life.h.length,s.rivals[0].life.h.length],[0,1,1])});
 test('new arrears count on the same night and dropout is sampled once',()=>{const s=T.S;s.arrears={bal:50,days:5};s.rivals[0].out={day:5};s.rivals[1].out={day:4};T.sampleNight(true);eq([s.life.crisis,s.rivals[0].life.h.length,s.rivals[1].life.h.length],[1,1,0])});
 test('real overnight pipeline samples recovery and rent arrears',()=>{const s=T.S;s.day=5;s.cash=0;s.bank=0;s.health=T.CONFIG.health.poorBelow-1;s.slept=20;s.restBonus=50;s.restHap=10;s.energy=80;s.happy=70;s.rivals=[];s.sagaNext=0;s.indNext=0;T.rollover(true);eq(s.day,6);if(!s.arrears)throw Error('Expected rent arrears');eq([s.life.unwell,s.life.crisis,s.life.h.length],[0,1,1])});
 test('rent collection deducts an early half when the flatmate skips',()=>{const s=T.S;s.day=5;s.cash=1000;s.rentPaid=5;s.rentPaidAmt=Math.ceil(T.HOUSE.apt.rent/2);s.flat={i:0};s.rivals[0].rel=50;s.restBonus=50;s.restHap=10;const old=T.CONFIG.rivals.together.flat.skip;T.CONFIG.rivals.together.flat.skip={medium:1};try{T.rollover(true);const paid=s.logs.filter(x=>/rent .*deducted|rent \(/i.test(x[0]));if(s.arrears)throw Error('Unexpected arrears');eq(s.flatSkip,5);if(!s.logs.some(x=>x[0].includes('Your half of the rent ('+ '$'+(T.HOUSE.apt.rent-s.rentPaidAmt))))throw Error('Missing remaining-half collection: '+JSON.stringify(paid))}finally{T.CONFIG.rivals.together.flat.skip=old}});
 test('actual final overnight pipeline records its last night',()=>{const s=T.S;s.day=T.CONFIG.rivals.gameDays;s.cash=1000;s.health=70;s.restBonus=50;s.restHap=10;s.sagaNext=0;s.indNext=0;T.rollover(true);eq([s.over,s.endDay,s.life.h.length,s.rivals[0].life.h.length],[true,T.CONFIG.rivals.gameDays,1,1]);T.sampleNight(true);eq(s.life.h.length,1)});
 test('early-ending night is included before the final table',()=>{const s=T.S;s.day=6;s.health=70;T.nightRun=true;T.nightFed=true;T.finish('Bankrupt','Targeted final-night test');T.nightRun=false;eq([s.over,s.endDay,s.life.h.length,s.rivals[0].life.h.length],[true,5,1,1]);T.sampleNight(true);eq(s.life.h.length,1)});
 test('single games do not acquire Life Score records',()=>{T.S.mode='single';T.S.life=null;T.sampleNight(true);eq(T.S.life,null)});
 reset();T.sampleNight(true);T.save();return results;
});
await page.reload();await page.evaluate(()=>{const s=__T.S;if(s.life.h.length!==1||s.life.lastDay!==5)throw Error('Sample marker lost on reload');__T.sampleNight(true);if(s.life.h.length!==1)throw Error('Reload duplicated sample')});results.push('save/reload retains sample marker without duplication');
assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({results,errors},null,2));console.log(results.length+' targeted regression checks passed');results.forEach(x=>console.log('PASS '+x));
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
