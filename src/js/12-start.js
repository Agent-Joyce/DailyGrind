  /* ==================================================================
     12. START
     ================================================================== */
  paintMode();  /* the welcome screen's mode buttons and difficulty texts */
  if(!load())fresh();
  CFG_WARN.forEach(function(w){log('⚙️ '+w,'bad');console.warn(w)});
})();

