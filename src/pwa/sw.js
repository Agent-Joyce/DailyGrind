/* Daily Grind service worker (site build only). tools/build.js fills in the build hash and the file list.
   Pre-caches every file of this build, answers from the cache first, and drops older builds' caches when a new one takes over.
   Saved games are in localStorage and are not touched. */
const CACHE='daily-grind-@BUILD@',FILES=/*@FILES@*/;
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.indexOf('daily-grind-')===0&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin)return;
  e.respondWith(caches.open(CACHE).then(c=>c.match(r).then(hit=>hit||c.match(r,{ignoreSearch:true})).then(hit=>hit||fetch(r).catch(()=>r.mode==='navigate'?c.match('./'):Response.error()))));
});
