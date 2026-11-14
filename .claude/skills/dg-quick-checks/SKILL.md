---
name: dg-quick-checks
description: Run every fast Daily Grind check (rules, regressions, rival personalities, daily UI, morning pop-up, rival careers, modern content, job tables) in one command. Use after any change to index.html gameplay, rivals, pop-ups or CONFIG, and before committing. Not the full UI check and not the simulations.
---

# Daily Grind quick checks

Run from the repository root. The output folder must be **outside the repo** (use the session scratchpad); it holds throwaway hooked copies of `index.html` and must never be committed.

```bash
node tools/qa/run-all-checks.js <folder outside the repo>
```

It runs, in order, and prints one table:

| Script | Covers | Browser |
|---|---|---|
| `check-social-rules.js` | Contracts, stakes, pacts, loans, hidden events, career planning, morning note tidying, bug-fix regressions | No (isolated Node) |
| `check-regressions.js` | Bet settlement, shared rent, Life Score sampling | Yes |
| `check-personalities.js` | Rival personalities and remembered favours | Yes |
| `check-daily-ui.js` | Daily HUD, map landmarks, rank milestones at 1280 and 390 px | Yes |
| `check-morning.js` | Night cards and the morning pop-up: no repeats, group order, rival grouping, fits a phone | Yes |
| `check-rival-careers.js` | Rivals are not locked out of dress-code jobs; single games draw no rival dice | Yes |
| `check-modern.js` | New pathways, the 16 modern roles, gig delivery, tutoring and the creator path | Yes |
| `check-tables.js` | Pathway and job table rules (levels, modules, pay order, study order, pay per hour); add `--list` to print the tables | Yes |

## Reading the result

- Exit code 0 and "All 8 check scripts passed" means done.
- On a failure the launcher prints that script's last lines. Run the one script alone to see everything: `node tools/qa/<script> <folder>`.
- A failure is either a real bug or a check that needs updating because behaviour changed on purpose. Say which, fix the real ones, and update the check (never delete or skip a failing check to get a pass).

## Rules

- These checks are expected after every gameplay change. They are **not** a substitute for the UI check (`dg-ui-check`) or simulations (`dg-sim`); ask the user before running those.
- When you add a feature, add a case to the matching script. Shared browser setup is in `tools/qa/qa-page.js` (`openGame`, `PAGE_HELPERS`: `QA.seed`, `QA.newGame`, `QA.night`, `QA.morning`).
- Report the table to the user, with any failure quoted.
