# Rival personalities and favour memory targeted checks

- Date: 1 November 2026, Singapore.
- Base commit: `19d9c5a59b13b0afbc0aa0599f62d58f403c9e48` plus uncommitted CHANGELOG section 89.
- Runtime: Playwright with installed headless Microsoft Edge on Windows. External HTTP requests blocked.
- Feature checks: `DG_BROWSER_CHANNEL=msedge node tools/qa/check-personalities.js <outside-repo-folder>`.
- Prior regression checks: `DG_BROWSER_CHANNEL=msedge node tools/qa/check-regressions.js <outside-repo-folder>`.

## Result

All 19 personality/memory checks and all 13 prior regression checks passed. Both runs recorded zero page errors. JavaScript syntax checks for the feature runner and UI-check fixtures passed, and `git diff --check` was clean.

The feature checks exercise actual Messages lending/refusal/borrowing buttons, an encounter Chat button, and a night-card Yes button. Controlled outcomes separately verify bounded memory, future introductions, repayment/default, expiry, migration and save/reload.

- Seeded, distinct personalities use no player random draws.
- Personality adjusts lending, repayment and betting within probability limits.
- Lending and refusing through Messages leave the correct memories.
- Remembered help and refusal can change a future borrowing decision.
- The five help cards record both help and refusal; chats and parties earn no credit.
- A real night-card click records the favour and displays the explanation.
- History, trust and favour credits stay bounded; a duplicate deed cannot add credit.
- Returns wait until a later day, consume credit and preserve an active tip even with credit still outstanding.
- Generous and vindictive rivals react differently to the same tense conversation.
- Bad terms and dropout prevent favour returns.
- On-time repayments, one-time default and expired requests leave the right memories.
- Legacy migration is stable and consumes no rival dice; damaged entries have safe defaults.
- Single-player games do not record memories.
- Reload preserves personalities and favour history.

Expanded rival profiles were captured and visually inspected at 1280px desktop and 390px phone width. Both layouts were readable, with no sideways page overflow or NaN/undefined text in the leaderboard. This is a focused inspection, not the complete UI-check suite.

## Documentation verification and remaining checks

The Config Guide's two new tuning rows were verified after reopening the DOCX with python-docx. LibreOffice was unavailable, so the guide was rendered with a hidden Microsoft Word instance to PDF and rasterised with bundled Poppler. All 17 pages were visually inspected, including the two new tuning rows.

The user requested both full UI checks and simulations. The full UI check passed: desktop and phone each had 468 presses, 16 buildings, 27 situations and 95 layout checks, plus six successful reload checks. See [full UI report](QA_UI_2026-11-01_personalities-favours.md). All 30 single-player and 20 mixed-rival simulations completed without technical errors. See the [single-player report](QA_Sim_2026-11-01_personalities-favours-single.md) and [rival report](QA_Sim_2026-11-01_personalities-favours-rivals.md). All saved single-player gameplay results match the preceding build; only click counts differ under browser isolation. Earlier simulation reports describe the previous build and are not evidence for this feature's balance.
