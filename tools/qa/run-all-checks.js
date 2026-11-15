/* Every fast check in one go, with one pass/fail table. The first one fails if index.html is not what src/ builds. Not the UI check and not the simulations (ask before those).
   Usage: node tools/qa/run-all-checks.js <folder outside the repo> */
const {spawnSync}=require('child_process'),path=require('path'),{outDir}=require('./qa-page.js');
const out=outDir(process.argv[2],'dg-all-checks');
const checks=[['check-build.js',false],['check-social-rules.js',false],['check-regressions.js',true],['check-personalities.js',true],['check-daily-ui.js',true],['check-morning.js',true],['check-rival-careers.js',true],['check-modern.js',true],['check-ux.js',true],['check-tables.js',true]];
const rows=checks.map(([f,needsOut])=>{const t0=Date.now(),r=spawnSync(process.execPath,[path.join(__dirname,f)].concat(needsOut?[path.join(out,f.replace('.js',''))]:[]),{encoding:'utf8',maxBuffer:1<<26});
  const text=(r.stdout||'')+(r.stderr||''),ok=r.status===0,lines=text.trim().split('\n'),passes=lines.filter(l=>/^PASS /.test(l)).length;
  if(!ok)console.log('\n--- '+f+' ---\n'+lines.filter(l=>!/^PASS /.test(l)).slice(-25).join('\n'));
  return {f,ok,passes,secs:Math.round((Date.now()-t0)/1000),last:lines.filter(l=>!/^PASS /.test(l)).pop()||''}});
console.log('\nCheck                      Result  Passes  Time');
rows.forEach(r=>console.log(r.f.padEnd(27)+(r.ok?'PASS':'FAIL').padEnd(8)+String(r.passes).padEnd(8)+r.secs+'s'));
const bad=rows.filter(r=>!r.ok).length;console.log(bad?bad+' check script(s) FAILED.':'All '+rows.length+' check scripts passed.');process.exitCode=bad?1:0;
