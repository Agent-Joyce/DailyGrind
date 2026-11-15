  /* ==================================================================
     12. START
     ================================================================== */
  paintMode();  /* the welcome screen's mode buttons and difficulty texts */
  if(!load())fresh();
  CFG_WARN.forEach(function(w){log('⚙️ '+w,'bad');console.warn(w)});
  /*@site*/
  /* the site build works offline and can be installed: its service worker caches this build's files (never in the single file) */
  if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol))window.addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){})});
  /*@/site*/
})();

