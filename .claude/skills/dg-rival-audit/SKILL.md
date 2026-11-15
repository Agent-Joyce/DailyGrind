---
name: dg-rival-audit
description: Audit how well the Daily Grind AI rivals play: their final jobs, dress, qualifications and net worth, whether they converge on one career, and how they place against the player. Use after any change to rivalDay, rivalTarget, CONFIG.rivals or the career and pathway tables, or when the user asks how smart or fair the rivals are.
---

# Daily Grind rival audit

## 1. Fast structural check (always)

```bash
node tools/qa/check-rival-careers.js <folder outside the repo> 6
```

Plays seeded 30-day rival games overnight only (the player just sleeps), six per level. It fails if no medium or expert rival holds a smart or suit role (the dress-code lock) or if a single game draws rival dice. Read the printed table for:

- **Final jobs and dress** per rival, and the "Final jobs" tally.
- **Convergence**: games where every surviving planning rival ended in the same career line.
- **Dropouts**: rivals out of the race, with the reason and day.

To compare with an older build, pass it as the last argument: `git show <commit>:index.html > <outside folder>/base.html`, then `node tools/qa/check-rival-careers.js <folder> 6 <outside folder>/base.html`.

## 2. Against a playing bot (ask first)

```bash
node tools/qa/run-sims.js <folder outside the repo> 10 0 1 101 --rivals=mixed --rival-count=3
```

Repeat with `--rivals=medium` and `--rivals=expert`. From `results.json` report, per level: the player's Life Score place, rival median net worth, early exits, and each Life Score category place. Save the report to `docs/` as the `dg-sim` skill describes.

## 3. What good looks like

- Expert rivals out-score medium, medium out-score easy.
- A careful player can still win some games at every level; rivals far above the top rank's net worth mean the level needs tuning in `CONFIG.rivals.levels`.
- Three rivals do not all finish in the same career in most games.
- Rivals use the features the player has (clothes, bank, study), and no rival is locked out by a rule the player can get round.

Report findings with file and line, and separate bugs from balance.
