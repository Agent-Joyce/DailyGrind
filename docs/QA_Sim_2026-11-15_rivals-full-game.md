# Rival simulation: rivals use the whole game (CHANGELOG 121)

**Versions tested**
- Base: `d00f221` (claude/vigilant-curie-a1kpwu, with §113–§117). Results `base-*`.
- Changed: `5faf4e0` (claude/roadmap-b21-b23-c13-c14: §118 awareness, §119 conversations, §120 moments, §121 whole game, with the `keepWorth` loan fix). Results `new2-*`.
- A first run of §121 without the `keepWorth` rule (commit `adf9f8e`) is not in the table: 16 of 30 medium and 19 of 30 expert rivals went bankrupt, because broke rivals borrowed to pay course fees that left their net worth negative. Switching off the loans, the villa and the investing one at a time (medium) showed only the loans caused it. The fix is `rivalBorrow()`: net worth after the fee must stay above $300.

**Settings:** careful bot, 10 games, seeds 1–10, 30 days, three rivals, `--rivals=medium` and `--rivals=expert`, normal difficulty. Same seeds for both builds, but rival dice order differs, so games are not identical beyond day 1. No random-bot games.

| | Medium base | Medium changed | Expert base | Expert changed |
|---|---|---|---|---|
| Player wins (Life Score) | 3/10 | 2/10 | 2/10 | 0/10 |
| Player net worth (median) | $11,547 | $11,328 | $13,081 | $11,547 |
| Rival net worth (median) | $8,696 | $10,801 | $11,698 | $8,826 |
| Rival net worth (max) | $38,877 | $36,309 | $35,300 | $76,902 |
| Rivals above $10,000 | 13/30 | 16/30 | 18/30 | 15/30 |
| Rivals out of the race | 0 | 0 | 0 | 0 |
| Life Score points, median rival / player | 60 / 88 | 66 / 66 | 70 / 66 | 86 / 52 |
| Bot issues | 5 | 4 | 7 | 12 |

**Reading**
- Medium is close to the base: rivals slightly richer, the player slightly behind. No defaults or bankruptcies.
- Expert is clearly stronger: the careful bot wins none of 10 (base 2), rivals' Life Score points rise from 70 to 86, and the richest rival reaches $76,902 (base $35,300). The most likely cause is investing (hedge fund and crypto for expert investors and hustlers); not isolated yet. The retune's target was that a careful bot wins some games at every level.
- Bot issues: all survival warnings except two `TEXT≠EFFECT` lines in the changed medium run ("class says happy 10 but it changed 5", "class says know 10 but it changed 14"); they look like study-group or sickness effects on the lesson, not rival code, and were not investigated. The expert run has more "clothes ran out" warnings (8 vs 1) from the player's side; not investigated.
- Not run: random bot, mixed rivals, single games, the UI check.

Raw results: `QA_Sim_2026-11-15_rivals-full-game.json` (keys `base-medium`, `new2-medium`, `base-expert`, `new2-expert`).
