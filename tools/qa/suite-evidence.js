/* Lossless dictionaries keep repeated log text out of every before/after state.
 * Decode restores the original checkpoint case byte-for-byte as JSON values. */
function encodeCase(r){
  const logs=[],observations=[],logIndex=new Map(),obsIndex=new Map();
  const internLog=entry=>{const key=JSON.stringify(entry);if(!logIndex.has(key)){logIndex.set(key,logs.length);logs.push(entry)}return logIndex.get(key)};
  const internObs=obs=>{if(!obs)return obs;const value={...obs,logs:(obs.logs||[]).map(internLog)},key=JSON.stringify(value);if(!obsIndex.has(key)){obsIndex.set(key,observations.length);observations.push(value)}return {observation:obsIndex.get(key)}};
  return {...r,trace:r.trace.map(t=>({...t,...('before'in t?{before:internObs(t.before)}:{}),...('after'in t?{after:internObs(t.after)}:{})})),evidence:{logs,observations}};
}
function decodeCase(r){
  if(!r.evidence)return r;
  const {evidence,...record}=r;
  const obs=ref=>ref==null?ref:{...evidence.observations[ref.observation],logs:evidence.observations[ref.observation].logs.map(i=>evidence.logs[i])};
  return {...record,trace:record.trace.map(t=>({...t,...('before'in t?{before:obs(t.before)}:{}),...('after'in t?{after:obs(t.after)}:{})}))};
}
module.exports={encodeCase,decodeCase};
