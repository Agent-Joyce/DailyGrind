# QA simulation: safety net under hard times (CHANGELOG 116)


> **Rebase note (15 November):** after these runs the branch was rebased onto the moved base branch (Package A and B work). The commit hashes below are the pre-rebase ones: base `0cc6d7b` is now `af2c530`, and the safety-net build is now `484f07a` (plus the sim bot change `c4b30de`). The results were **not** re-run on the rebased code, so they measure the safety net on the earlier base, before the base branch's rival and bot changes.

Date 15 November 2026. Follow-up to [QA_Sim_2026-11-14_safety-net.md](QA_Sim_2026-11-14_safety-net.md), whose normal-difficulty games never reached the safety net.

## Versions and settings

| | Commit |
|---|---|
| Base (before the safety net) | `0cc6d7b` |
| New | `338de3e` |

- 20 careful games per cell, seeds 1 to 20, single mode, the same seeds on both builds. Four runs per build pair:
  - `--start=broke`: about $20 in cash, no savings, one day of clothes left, no food at home (set through the test hook after the game starts; a scenario, not natural play).
  - `--difficulty=hard`: Hard from the Custom game drawer ($100 start, prices +15%, pay −5%, more illness).
- Commands: `node tools/qa/run-sims.js <folder> 20 0 1 101 [base page] --start=broke` and `... --difficulty=hard`. Raw results: `QA_Sim_2026-11-15_safety-net-hard-times.json`.
- Both builds were played by the same `tools/qa/sim.js` (committed in `338de3e`), whose `rescue()` step presses Emergency help only if the button exists, so the base build never uses it.

## Results

| Scenario | Build | Finished the game | Ended early | "Clothes ran out" games | "Could not eat" games | Help used | Median net worth |
|---|---|---|---|---|---|---|---|
| Broke start | Base | 13 / 20 | 2 Bankrupt, 5 Hospitalised | 8 | 11 | n/a | $3,111 |
| Broke start | New | 18 / 20 | 1 Bankrupt, 1 Gave up | 7 | 2 | 10 times in 10 games | $3,546 |
| Hard | Base | 8 / 20 | 2 Bankrupt, 10 Hospitalised | 12 | 12 | n/a | $32 |
| Hard | New | 18 / 20 | 1 Bankrupt, 1 Gave up | 7 | 1 | 12 times in 12 games | $3,674 |

## Reading the results

- With the safety net, 36 of 40 hard-times games finished, against 21 of 40 without it. The largest change is in hospital endings (15 down to 0) and in "could not eat" games (23 down to 3). The help was used once in each game that used it, as designed.
- **Bankrupt** is not helped much (4 down to 2): the net gives clothes and one meal, not income. **Gave up** (low morale) appears in 2 new games that would otherwise have ended another way or not at all; the net does not lift morale beyond +3.
- "Clothes ran out" games fall less (20 to 14): the help gives 3 days of Casual Clothes, and some bots later need Smart or Suit clothes for their job and cannot afford them. Not a defect of the net, but it shows it does not fix career-clothes costs.
- Net worth gaps (Hard: $32 to $3,674) come mostly from games that no longer end early.
- **Caveats:** one run per cell, 20 seeds; the broke start is a constructed scenario; the bot walks to the Community Centre when stuck, which a real player might not know to do (the new warnings and the Rules text are what point to it); only the careful bot was used; AI rival games were not run.
