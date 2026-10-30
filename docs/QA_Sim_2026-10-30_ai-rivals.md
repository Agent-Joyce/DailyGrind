# Simulation run: AI rivals, step 1 (2026-10-30)

**What was tested:** CHANGELOG section 79, games with AI rivals.
- **Single-game check:** commit `3e920df`.
- **Rival calibration:** commit `315fc03`, where reaching Tycoon is a milestone in a rival game and the race runs to day 30.

**Settings:**
- `node tools/qa/run-sims.js`, with the careful test player as "you".
- **Single games:** 20 careful games from seed 1 and 10 random from seed 101.
- **Rival games:** 20 careful games from seed 1 for each level, using `--rivals=easy|medium|expert` (3 rivals per game, so 60 rivals per level), 30-day games.

**Raw results:** `QA_Sim_2026-10-30_ai-rivals.json`, with runs labelled `single`, `easy`, `medium` and `expert`.

## Single games are unchanged
All 30 single games match the last report game for game (`QA_Sim_2026-10-28_morale-bot.json`, run B): 0 differences. That covers endings, net worth, jobs and vitals. Rivals use their own dice and only run in rival games.

## Rival games: the careful test player against each level

| | Easy rivals | Medium rivals | Expert rivals |
|---|---|---|---|
| Rivals' net worth at the end (mean / median) | $1,459 / $1,418 | $9,312 / $8,233 | $17,887 / $16,257 |
| Rivals' range | −$127 to $2,876 | $4,333 to $21,877 | $11,313 to $42,848 |
| Best rank reached (of 60 rivals) | Comfortable 53, none 7 | Tycoon 15, Wealthy 44, Comfortable 1 | Tycoon 60 |
| Rivals who dropped out | 1 (no food) | 0 | 1 (no food) |
| The test player's place (20 games) | 1st in all 20 | 1st in all 20 | 1st in 6, 3rd in 2, **4th in 12** |
| The test player's net worth (mean / median) | $16,336 / $13,952 | $16,774 / $14,411 | $16,366 / $13,888 |

The test player plays all 30 days in every game (Tycoon is a milestone in rival games), reaching Tycoon in 18 to 19 games of 20.

## Reading
- **The levels are clearly apart:**
  - **Easy rivals** are beatable by any steady player: mostly Comfortable, seldom more.
  - **Medium rivals** reach Wealthy, a quarter of them Tycoon. They're a fair race for a careful player, who still finished first every time.
  - **Expert rivals** all reach Tycoon and usually beat the strong careful test player. They're kept that strong on purpose, as a stretch goal.
- **Expert results vary a lot** ($11k to $43k). Experts move half their savings into the ETF when the market is buoyant, so a long good run compounds.
- **No problems found:** no page errors, stuck days, broken invariants or text/effect mismatches. The few SURVIVAL notes are the test player's own cash timing (one missed meal, the same seeds in every run), not the rivals.
