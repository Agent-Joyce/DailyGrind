# Simulation run: the Life Score (2026-10-30)

**Game version tested:** commit `9fe5e10` (CHANGELOG 80, the Life Score decides a rival game).
**Settings:** `node tools/qa/run-sims.js <folder> 20 0 1 101 --rivals=<level>`: 20 careful test-player games from seed 1, each against 3 rivals of one level, 30-day games.
**Raw results:** `QA_Sim_2026-10-30_life-score.json`, with runs labelled `easy`, `medium` and `expert`. Each game lists every player's Life Score place, points and category places.

## Results

| | Easy rivals | Medium rivals | Expert rivals |
|---|---|---|---|
| Test player's place | 1st in 17, 2nd in 3 | 1st in 2, 2nd in 12, 3rd in 6 | 1st in 1, 2nd in 5, 3rd in 1, 4th in 13 |
| Test player's average points / rivals' average | 84 / 57 | 71 / 66 | 57 / 79 |
| Categories the test player won (of 20 games) | wealth 20, career 20, education 20, first to the line 20; happiness 0, health 0, stability 0 | wealth 20, career 20, first 19, happiness 2; education 0, health 0, stability 0 | career 20, education 20, wealth 6; happiness 0, health 0, stability 0, first 0 |
| Page errors | none | none | none |

The few notes in the raw results are the test player's own SURVIVAL notes (a missed meal from cash timing), as in earlier runs.

## Reading
- **The scoring works:** places, ties, weights and totals behave as designed, and the levels separate.
- **But it isn't fair yet.** The test player almost never wins happiness, health or stability, even against easy rivals. Rivals live an easier life on those three:
  - **No events:** they skip the nightly cards and storyline chapters (many cost happiness) and the money shame.
  - **No illness:** they never fall ill.
  - **Narrower crisis days:** theirs count only no meal or debt.

  They average 95–99 health against the test player's ~85, and that puts 4 of the 7 categories' weight out of reach.
- **Next:** give rivals the same happiness, health and stability pressures as you (events, illness, shame, the same crisis days), then run the same three runs again (CHANGELOG 81).
