---
name: dg-bug-hunt
description: Hunt for bugs in the Daily Grind game by reading recent code, running the checks and playing seeded games. Use when the user asks to find bugs, review a recent change, or check that the build is sound before a release.
---

# Daily Grind bug hunt

Work in this order and keep a running list of findings with `index.html:line`, severity and how each was confirmed (read, check, or reproduced).

## 1. Read the newest code first

- `tail` the CHANGELOG for the latest sections; they name the functions that changed. Sections that say checks were *not* run are the first place to look.
- Read those functions in `index.html` (use `CODE_MAP.md` to find them). Look for the bug types this game has had:
  - **Text and logic drifting apart**: Rules text (`cfg*` setters in `timeText`), tooltips, chips and log lines that no longer match the code or `CONFIG`.
  - **A rule that silently locks something out**: a filter that needs a state nothing can create (the rival dress-code lock was this).
  - **Money that appears or vanishes**: stakes, pots, loans and refunds must move between wallets once.
  - **A loophole**: an exit, cancel or refuse that avoids a cost.
  - **Rival and player rules that differ** by accident.
  - **Dice**: single games must never call `rrand()`; rendering must never roll dice.
  - **Saves**: a new `S` field needs a `blank()` default and a migration.
  - **Repeats and noise**: the same thing told twice in a night card, the morning pop-up or toasts.

## 2. Check against saved evidence

`docs/QA_Sim_*.json` hold earlier results. A pattern such as every rival ending in one job is a finding even when no check failed.

## 3. Run things

```bash
node tools/qa/run-all-checks.js <folder outside the repo>
```

Then, with the user's agreement, the UI check (`dg-ui-check`) and a small seeded simulation (`dg-sim`). For a suspected bug, reproduce it through the hook (`tools/qa/qa-page.js`: `openGame`, then `__T.ev('…')` runs code inside the game) and compare with the previous build when it helps.

## 4. Report

A table: severity, what is wrong, where, evidence, proposed fix. Say plainly what was only read and what was run. Separate bugs from balance and from design choices. Do not fix without the user's go-ahead unless they asked for fixes; when fixing, add a regression case to the matching check script and log the change in `CHANGELOG.md`.
