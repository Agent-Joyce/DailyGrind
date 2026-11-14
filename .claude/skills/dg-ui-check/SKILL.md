---
name: dg-ui-check
description: Run the Daily Grind UI check, which presses every button in every building at desktop (1280x800) and phone (390x844) width and reports dead buttons, script errors, layout problems and text that disagrees with the real effect. Use when the user asks to check the UI, the buttons, or the game on desktop and phone, or after a UI change once they agree.
---

# Daily Grind UI check

```bash
node tools/qa/run-uicheck.js <folder outside the repo>
```

The folder must be outside the repo (session scratchpad). It receives a hooked copy of the game, a screenshot of every screen and the results.

## What it does

`tools/qa/uicheck.js` sets up a game with something to press everywhere, presses every enabled button in every building (restoring the game between presses), checks the status page, the action preview, a certificate and ending the day, and runs the extra `SITUATIONS` (illness, arrears, loans, rival loans and bets, flatmates, pacts, betrayal and burglary mornings, and more). The launcher then runs the reload checks: each difficulty, a starting trait, save and reload, a damaged save, rival saves.

## Reporting

1. List **every** issue it prints, grouped by type (JS-ERROR, DEAD button, MISSING, TEXT≠EFFECT, LAYOUT, NaN/undefined).
2. For each, say whether it is a real bug or not, and why. Look at the screenshot for layout issues before deciding.
3. Fix the real ones, rerun, and report the final counts for both widths.

## Rules

- Run it whenever the user asks. After a UI or gameplay change, ask first (CLAUDE.md, "Committing").
- A new button or panel that needs setup to be pressable goes into `setup()` or `SITUATIONS` in `uicheck.js`.
- A check of the check: `node tools/qa/run-uicheck.js <folder> <copy of index.html>` runs it on a deliberately broken copy.
- Chromium phone emulation is not a real-device test; say so if the user asks about phones.
