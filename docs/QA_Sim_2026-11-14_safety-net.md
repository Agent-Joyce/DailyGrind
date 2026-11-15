# QA simulation: Community Centre safety net (CHANGELOG 116)


> **Rebase note (15 November):** after these runs the branch was rebased onto the moved base branch (Package A and B work). The commit hashes below are the pre-rebase ones: base `0cc6d7b` is now `af2c530`, and the safety-net build is now `484f07a` (plus the sim bot change `c4b30de`). The results were **not** re-run on the rebased code, so they measure the safety net on the earlier base, before the base branch's rival and bot changes.

Date 14 November 2026. Single games only (no AI rivals).

## Versions and settings

| | Commit | Notes |
|---|---|---|
| Base | `0cc6d7b` | Before the safety net |
| New | `fee9c77` | CHANGELOG §116 plus the sim bot change below |

- Players: 20 careful (seeds 1 to 20) and 10 random (seeds 101 to 110) per build, single mode, default difficulty.
- Command: `node tools/qa/run-sims.js <folder> 20 10 1 101 [base page]`. Raw results: `QA_Sim_2026-11-14_safety-net.json` (`base.results`, `new.results`).
- The careful bot (`tools/qa/sim.js`) now calls `rescue()` when it would otherwise record "clothes ran out" or "could not eat": it walks to the Community Centre and presses Emergency help if the button exists and is enabled. The base build has no such button, so the same bot plays both builds.

## Results

| | Base | New |
|---|---|---|
| Careful: endings | 1 Tycoon, 8 Wealthy, 11 Comfortable | 1 Tycoon, 8 Wealthy, 11 Comfortable |
| Careful: median net worth | $4,755 | $4,699 |
| Careful: games with "could not eat" | 2 (seeds 8, 14) | 2 (seeds 8, 14) |
| Careful: games with "clothes ran out" | 0 | 0 |
| Emergency help used | n/a | 0 times |
| Random: endings | 9 Hospitalised, 1 Bankrupt | 9 Hospitalised, 1 Bankrupt |
| Random: median net worth | $123 | $123 |
| Script errors | 3 random games | the same 3 random games |

## Reading the results

- **The safety net changed no outcome here, and the careful bot never qualified for it.** The two "could not eat" games (day 17) are not cases the net is meant for: in seed 8 the bot had $13, above the cheapest meal ($8), but its own rule wants $15 for fast food; in seed 14 it had $547 in savings, and savings count as money you can afford with. The careful player does not reach a real death spiral in these 20 seeds, so these runs cannot show the benefit the roadmap hoped for ("fewer clothes ran out / could not eat runs").
- The random players do not use the centre on purpose and 9 of 10 are hospitalised in both builds; they say nothing about the feature.
- Net worth differences of a few dollars (for example seed 8: $8,293 to $8,636) come from the bot spending 45 minutes walking to the Community Centre and back in the new build, which shifts later days. They are not a result of the feature.
- **Pre-existing, not from this change:** 3 of 10 random games throw "Cannot read properties of null (reading 'classList')" in both builds. Not investigated here.
- **Not exercised:** a game where the player is truly out of cash and savings with no clothes or meal. That is covered only by the targeted case in `tools/qa/check-ux.js`.

## Limits

One run per build, no repeats; the bot is not a stress test. A real measure needs poorer starts (Hard difficulty, or a bot that spends down), which `run-sims.js` cannot set today.
