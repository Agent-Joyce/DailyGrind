/* Reuse the existing careful/random policies without changing legacy runner behaviour.
 * Every source replacement is asserted so an upstream edit fails loudly. */
const fs=require('node:fs'),path=require('node:path');
function buildPlayer(){
  let src=fs.readFileSync(path.join(__dirname,'sim.js'),'utf8');
  function change(old,next){if(src.split(old).length!==2)throw Error('Legacy player anchor changed: '+old.slice(0,90));src=src.replace(old,next)}
  change('return((t^t>>>14)>>>0)/4294967296}}','return((t^t>>>14)>>>0)/4294967296};f.state=function(){return a};return f}');
  change('function mul(a){return function(){','function mul(a){var f=function(){');
  change('el.click();await y();clicks++;',`if(++suiteDayActions>220)throw Error('ACTION_GUARD: over 220 actions in one day');
    el.setAttribute('data-suite-id','target');
    await window.__qaInteract({type:'click',label:label,act:el.dataset.act,arg:el.dataset.arg,id:el.id});
    await y();clicks++;`);
  change("async function go(l){if(G.view===l&&G.loc===l)return true;await click(document.querySelector('.tile[data-loc=\"'+l+'\"]'),'walk:'+l);return G.loc===l&&G.view===l}","async function go(l){if(G.view===l&&G.loc===l)return true;await window.__qaInteract({type:'go',loc:l});return G.loc===l&&G.view===l}");
  change("b=mode==='random'&&R()<0.3?o:$('pvGo');","b=$('pvGo');");
  change("if(!b){o.classList.remove('show');note('UI','pop-up '+id+' had no button to close it');continue}","if(!b)throw Error('UNHANDLED_POPUP: '+id);");
  change("await click(tiles[Math.floor(R()*tiles.length)],'walk');continue","await go(tiles[Math.floor(R()*tiles.length)].dataset.loc);continue");
  change("a.value=String(Math.ceil(n));await click(btn('wd',''),'wd')","await window.__qaInteract({type:'bankAmount',value:Math.ceil(n),withdraw:true});await click(btn('wd',''),'wd')");
  change("box.value=String(Math.floor(G.S.cash-keep));await click(btn('dep',''),'dep')","await window.__qaInteract({type:'bankAmount',value:Math.floor(G.S.cash-keep),withdraw:false});await click(btn('dep',''),'dep')");
  change('await ensureClothes();\n    await ensureFed();','await ensureClothes();\n    if(QA.strategy===\'social\')await socialStep();\n    await ensureFed();');
  change('await workStep();\n    await studyStep();\n    await workStep();',"if(QA.strategy==='career'){await studyStep();await workStep();await workStep()}else{await workStep();await studyStep();await workStep()}");
  change('window.__sim=sim;',fs.readFileSync(path.join(__dirname,'suite-player.js'),'utf8')+'\n  window.__sim=sim;');
  return src;
}
module.exports={buildPlayer};
