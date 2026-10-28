# Simulation run: the careful player looks after its morale (2026-10-28)

**Game version tested:** commit `6771e92` (Community Centre, CHANGELOG 77). `index.html` is the same at `d652bd1`.
**What changed:** the simulation bot only. The careful player now has a `moraleStep()` (`tools/qa/sim.js`, commit `d652bd1`, CHANGELOG 78).
**Settings (every run):** `node tools/qa/run-sims.js`, 20 careful players from seed 1 and 10 random players from seed 101.
**Raw results:** `QA_Sim_2026-10-28_morale-bot.json` (runs labelled A, B, C).

| Run | Bot |
|---|---|
| A | Old careful bot: never does anything for happiness (`sim.js` at `6771e92`) |
| B | New careful bot: calls family, walks in the Park, and uses the Community Centre (volunteer, karaoke, night out) |
| C | New careful bot with `--no-comm`: calls family and walks in the Park only |

## Careful players (20 games each)

| | A: old bot | B: new bot | C: new bot, no Community Centre |
|---|---|---|---|
| Reached day 20 | **0** | **19** | **12** |
| Gave up on morale | 20 (all around day 11) | 0 | 7 |
| Other endings | none | 1 bankrupt (seed 20, day 14) | 1 bankrupt (seed 20, day 14) |
| Last day (mean) | 10.9 | 19.7 | 17.7 |
| Best rank | Comfortable 16, none 4 | **Wealthy 12**, Comfortable 7, none 1 | Wealthy 4, Comfortable 15, none 1 |
| Net worth at the end (mean / median) | $1,339 / $1,354 | **$5,216 / $5,284** | $3,660 / $3,982 |
| Happiness at the end (mean) | 1 | 36 | 15 |
| Morale activities used (all games) | none | call 159, Park walk 102, volunteer 58, karaoke 67, night out 16 | call 210, Park walk 200 |
| Most common final job | Nursing Aide 15 | Nurse 11, Senior Nurse 2 | Nursing Aide 12 |
| Page errors, broken invariants, stuck days, text/effect mismatches | none | none | none |

Random players: identical in all three runs (10 of 10 hospitalised around day 5); the random bot was not changed.

## Reading

- **Looking after morale is what keeps players going.** With the same game and the same seeds, the careful player reaches day 20 in 19 of 20 games (was 0), ends about four times richer, and reaches Wealthy in 12 games (was none).
- **The Community Centre does a lot of that work.** With only free home calls and Park walks (run C), 7 of 20 players still give up and only 4 reach Wealthy. The Centre's bigger lifts, plus the friend's job tips, add about $1,550 in net worth on average. More players also climb from Nursing Aide to Nurse, helped by easier interviews.
- **Morale is still tight.** Even with care, happiness ends at 36 on average. Every night (−5) and every shift and lesson (−5 each) pull it down, and the free lifts are capped once a day.
- **The one bankruptcy is a bot gap, not a game bug.** Seed 20's casual clothes wore out on day 6 and it could not afford new ones at the Clothes Mall ($100). With no clothes it cannot work (CHANGELOG 74), so it slid into bankruptcy by day 14. A used Smart Casual outfit at the Thrift Store (about $54) would have kept it working. The bot only buys at the Mall; teaching it the Thrift Store is the next bot fix.
- **The sims now cover the whole 20-day game.** They can show late-game effects (rank target days, the industry storyline's later phases, Tycoon) that earlier runs never reached.
