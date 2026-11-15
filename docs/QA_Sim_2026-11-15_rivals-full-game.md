# Rival simulation: rivals use the whole game (CHANGELOG 118–121)

**Versions tested**
- **Base:** `d00f221` (claude/vigilant-curie-a1kpwu, through §117). Results `base-*`.
- **Final:** `484bed0` (claude/roadmap-b21-b23-c13-c14: §118 awareness, §119 conversations, §120 moments, §121 whole game, with the fixes below). Results `final-*`.
- Intermediate builds are in the JSON under the names shown in the table.

**Settings:** careful bot only, 10 games, seeds 1–10, 30 days, three rivals, normal difficulty, `--rivals=medium|expert|mixed`. Same seeds for both builds, but rival dice order differs, so games diverge after day 1. No random-bot games, no single games, no UI check. n = 10 per cell: a difference of one or two wins is within noise.

## Result

| | Medium base | Medium final | Expert base | Expert final | Mixed base | Mixed final |
|---|---|---|---|---|---|---|
| Bot wins (Life Score) | 3/10 | 1/10 | 2/10 | 1/10 | 2/10 | 4/10 |
| Bot net worth (median) | $11,547 | $10,100 | $13,081 | $10,988 | $13,206 | $12,408 |
| Rival net worth (median) | $8,696 | $10,801 | $11,698 | $8,327 | $4,104 | $3,304 |
| Richest rival | $38,877 | $35,001 | $35,300 | $32,484 | $24,886 | $22,088 |
| Rivals out of the race | 0 | 0 | 0 | 0 | 0 | 0 |
| Life Score points, rival / bot (median) | 60 / 88 | 66 / 66 | 70 / 66 | 77 / 58 | 70 / 82 | 67 / 88 |
| "Clothes ran out" / "could not eat" | 4 / 1 | 1 / 1 | 1 / 6 | 1 / 2 | 1 / 1 | 1 / 1 |

The bot now wins some games at every level (1, 4 and 1 of 10). Medium is the weakest result: rivals are richer than on the base (median $10,801 against $8,696) and the bot's wins fell from 3 to 1.

## What went wrong on the way, and the fixes

1. **Bankruptcies.** The first build let broke rivals borrow to pay course fees: 16 of 30 medium and 19 of 30 expert rivals went bankrupt. Ablation (medium, loans / villa / investing switched off one at a time) pinned it on the loans. Fix: borrow only if net worth after the fee stays above `keepWorth` ($300).
2. **Expert too strong** (first full run: bot 0 of 10, richest rival $76,902, rival points 86 against 52). Investing was suspected, but switching it off left the richest rival at $65,833, and tightening it (share 0.25, per-product caps 0.25 / 0.15 / 0.05, a 0.35 total cap, profits sold back each night) left it at $65,184. Switching the loans off brought it to $32,484. Tracing seed 6 showed a $212 loan on day 10 let a rival start Medicine about four days sooner and reach the top doctor role by day 26. Raising `payGain` to 1.6 or 2 changed nothing. Fix: expert rivals take no loans (`loan.levels`: easy and medium).
3. **"Clothes ran out" 8 against 1 in the first expert run.** Not caused by leader-targeted sabotage: sabotage landing on the bot fell from 8 (base) to 4, and none of the kinds that landed touch cash or clothes. Cash thefts rose from 26 to 35 (the theft code is unchanged). The warnings went back to 1 with the loans off for expert, so they follow the loan change; the route from a rival's loan to the bot's clothes was not found. `leaderSabotage` stays at 1.5.

## Not run or not explained
- Random bot, single games, the UI check, and a larger sample (20 careful games per level would settle the medium result).
- Two `TEXT≠EFFECT` lines in the final medium run ("class says happy 10 but it changed 5", "class says know 10 but it changed 14"); not investigated, probably a lesson effect and not rival code.
- The loan-to-clothes link in point 3.

Raw results: `QA_Sim_2026-11-15_rivals-full-game.json` (one list of games per run name).
