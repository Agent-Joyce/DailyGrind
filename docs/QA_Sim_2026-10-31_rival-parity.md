# Simulation run: rivals face your pressures (2026-10-31)

**Game version tested:** commit `6c44ef0` (CHANGELOG 81).
**Compared with:** `QA_Sim_2026-10-30_life-score` (commit `9fe5e10`, before the change).

**Settings:**
- **Rival games:** `node tools/qa/run-sims.js <folder> 20 0 1 101 --rivals=<level>`: 20 careful test-player games from seed 1, each against 3 rivals, 30 days.
- **Single games:** the default 20 careful from seed 1 and 10 random from seed 101.

**Raw results:** `QA_Sim_2026-10-31_rival-parity.json`, with runs labelled `easy`, `medium`, `expert` and `single`.

## Single games are unchanged
All 30 games match `QA_Sim_2026-10-28_morale-bot` run B exactly (0 differences).

## Rival games, before → after

| | Easy rivals | Medium rivals | Expert rivals |
|---|---|---|---|
| Test player's place | 1st in 17 → **1st in 20** | 1st in 2 → **1st in 15**, 2nd in 5 | 1st in 1 → **1st in 4**, 3rd in 2, 4th in 14 |
| Test player's points / rivals' | 84 / 57 → 93 / 53 | 71 / 66 → 87 / 61 | 57 / 79 → 63 / 73 |
| Happiness won by the test player | 0 → 0 | 2 → 10 | 0 → 0 |
| Stability won by the test player | 0 → 20 | 0 → 20 | 0 → 20 |
| Health won by the test player | 0 → 0 | 0 → 0 | 0 → 0 |
| Rivals' average net worth | $1,459 → $1,255 (2 went bankrupt) | $9,312 → $8,117 | $17,887 → $17,776 |

## Reading
- **The levels now play as intended:**
  - easy rivals are always beaten by a careful player;
  - medium rivals are a real but winnable race (the test player wins 3 games in 4);
  - expert rivals are the stretch goal (it wins 1 in 5).
- **Stability now counts:** rivals have crisis days of their own (illness, debt after a bad event, no clothes). The careful test player, who eats every day and never falls into arrears, wins it every time.
- **Happiness is a real trade-off:**
  - easy rivals, who work one shift and sleep long, are the happiest in town (about 99) and the poorest;
  - against medium rivals, the test player wins it half the time;
  - expert rivals, who invest in the Community Centre, keep it.
- **Health hardly separates anyone.** Everyone, the test player included, ends around 97–99, so the category is decided by a point or two. Health could carry less weight, or measure something with more spread (such as sick days). That's left for a later change.
