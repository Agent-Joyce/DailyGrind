# Rival agreement regression guide

Baseline: feature branch from `f499420` on main. Run at 1280×800 and 390×844, with light and dark themes.

1. Start a rival game. At the apartment, make a friend, accept an AI invitation while another flatmate lives there, and verify old and new relationship changes. A bungalow move must be blocked until the existing flatmate is dismissed. A bungalow must never show a flatmate action or split rent. Reload an old saved bungalow game containing a flatmate and verify the next overnight pass resolves it safely.
2. Change CONFIG homeChance to 0 and 1 in throwaway copies, roll several days and confirm the housemate is always away or home respectively. Restore 0.4 before production checks.
3. Offer and receive bets and pacts at low and high net worth. Verify neither wallet goes negative at acceptance, that cash changes exactly once, and the agreed stake remains fixed after net worth changes. Test winner, loser, tie, dropout, expiration, and reload before settlement.
4. Trigger each pact type and commitment test. Check the deadline display, one decision per event, honour, negotiation, breach, compensation and early termination. Wealth challenge reminders appear on its final three days in the comparison panel.
5. Trigger a hardship loan request. Verify refusal changes relationship once and acceptance creates a single due loan; inspect repayment, late, default and reload. Confirm requests respect cooldowns.
6. Click $100 twice and 25% twice on the Bank app. Expect $200 and half the original available balance, respectively. Check rate, tenure, estimates, disabled states, button colour and contrast on both themes and viewport sizes. An automatic character portrait closes after three seconds, while a manually opened portrait and active decision remain usable.
7. Run `node tools/qa/check-regressions.js <outside-repo-dir>`, `node tools/qa/run-uicheck.js <outside-repo-dir>` and `node tools/qa/run-suite.js` according to its manifest. Record browser version, seeds, pass/fail counts and confirmed defects. This runtime lacked a Chromium executable on 2 November 2026; do not record browser tests as passed until they have run.
