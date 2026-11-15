/* Shared by the focused browser checks: builds a throwaway hooked copy of index.html outside the repo and opens it.
   The hook exposes window.__T.ev(code), which evaluates code inside the game's closure (S, CONFIG and every function). */
const fs=require('fs'),path=require('path'),{pathToFileURL}=require('url'),{chromium}=require('playwright');
const repo=path.resolve(__dirname,'../..'),marker='  if(!load())fresh();';
function outDir(arg,name){
  const out=path.resolve(arg||path.join(repo,'..',name));
  if(out===repo||(out+path.sep).startsWith(repo+path.sep))throw Error('The output folder must be outside the repo.');
  fs.mkdirSync(out,{recursive:true});return out;
}
async function openGame(out,opts){
  opts=opts||{};const src=fs.readFileSync(opts.page||path.join(repo,'index.html'),'utf8');
  if(src.split(marker).length!==2)throw Error('Expected the line "'+marker+'" exactly once in index.html.');
  const file=path.join(out,'hooked.html');fs.writeFileSync(file,src.replace(marker,'  window.__T={ev:function(c){return eval(c)}};\n'+marker));
  const launch={};if(process.env.DG_BROWSER_CHANNEL)launch.channel=process.env.DG_BROWSER_CHANNEL;if(process.env.DG_BROWSER_EXECUTABLE)launch.executablePath=process.env.DG_BROWSER_EXECUTABLE;
  const br=await chromium.launch(launch),pg=await br.newPage({viewport:opts.viewport||{width:1280,height:800}}),errors=[];
  pg.on('pageerror',e=>errors.push(String(e.message||e)));await pg.route(/^https?:\/\//,r=>r.abort());
  await pg.goto(pathToFileURL(file).href);return {br,pg,errors};
}
/* in-page helpers, injected with page.addScriptTag({content: PAGE_HELPERS}) */
const PAGE_HELPERS=`
window.QA={
  seed:function(n){var s=n>>>0||1;Math.random=function(){s=(Math.imul(s,1103515245)+12345)&0x7fffffff;return s/0x7fffffff}},
  newGame:function(mode,level,rivalSeed,cash){var T=__T;T.ev("localStorage.clear();fresh();S.flags.diff=1");
    if(mode==='rivals')T.ev("S.mode='rivals';S.rivalSeed="+(rivalSeed||42)+";S.rivals=makeRivals(3,'"+(level||'medium')+"',"+(cash||200)+");S.life=blankLife();S.townMood=S.townMood||'competitive'");
    document.getElementById('welcome').classList.remove('show');T.ev("render()")},
  /* end the day through the real cards: answers No, or the first affordable storyline option; returns the cards' step labels */
  night:function(){var T=__T,steps=[],g=0;T.ev("endWeek(true)");
    while(T.ev("!!S.pending")&&g++<60){var ev=T.ev("S.pending.ev");
      if(!ev.done){if(ev.story){var b=document.querySelector('#event [data-act=evopt]:not([disabled])');if(b)b.click()}else T.ev("decide(false)")}  /* a mini story takes several rounds */
      var c=document.querySelector('#event [data-act=cont]');if(!c)continue;
      var st=document.querySelector('#event .evstep');steps.push(st?st.textContent:'');c.click()}
    return steps},
  morning:function(){var ul=document.getElementById('mnList');if(!__T.ev("!!S.morning"))return null;
    return {top:document.getElementById('mnSub').textContent,rows:[].map.call(ul.children,function(li){var c=li.cloneNode(true);[].forEach.call(c.querySelectorAll('details,button,small'),function(x){x.remove()});
      return {head:li.className==='mnhead',cls:li.className,text:c.textContent.trim(),all:li.textContent,cg:[].map.call(li.querySelectorAll('[data-cg]'),function(b){return +b.dataset.cg})}})}},
  closeMorning:function(){__T.ev("S.morning=null;S.goalPop=null;S.cert=null;render()")}
};`;
module.exports={repo,outDir,openGame,PAGE_HELPERS};
