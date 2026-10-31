# Simulation run: medium rivals tuned into a real race (2026-10-31)

**Game version tested:** commit `5d3e207` (CHANGELOG 83).
**Compared with:** `QA_Sim_2026-10-31_job-race` (commit `8ec3a84`).

**Settings:**
- **Rival games:** `node tools/qa/run-sims.js <folder> 20 0 1 101 --rivals=<level>`: 20 careful test-player games from seed 1, 3 rivals, 30 days.
- **Single games:** the default 20 careful from seed 1 and 10 random from seed 101.

**Raw results:** `QA_Sim_2026-10-31_medium-tuning.json`, with runs labelled `easy`, `medium`, `expert` and `single`. The easy and expert runs were repeated after a container restart lost the first attempt; the medium run is the one that set the tuning.

## Tuning tried for medium (test player's Life Score wins of 20)

| Medium settings | Wins | Medium rivals' net worth |
|---|---|---|
| Before: 8% mistakes, 2 shifts, 1 interview a day, aim 45, no Community Centre | 19 | $8,117 |
| 3% mistakes, 2 interviews, aim 55, Community Centre | 17 | $9,954 |
| …and 3 shifts | 8 | $17,739 (as strong as expert) |
| …and 2.5 shifts | 9 | $14,168 |
| **…and 2.25 shifts (chosen)** | **12** | **$12,240** |

## Results at `5d3e207`

| | Easy rivals | Medium rivals | Expert rivals |
|---|---|---|---|
| Test player's place | 1st in all 20 | **1st in 12**, 2nd in 5, 3rd in 3 | 1st in 6, 2nd in 1, 3rd in 4, 4th in 9 |
| Test player's points / rivals' | 102 / 56 | 80 / 68 | 74 / 75 |
| Rivals' average net worth | $1,400 | $12,240 | $17,930 |
| Rivals who dropped out (of 60) | 2 | 1 | 0 |
| Page errors | none | none | none |

**Single games:** all 30 match `QA_Sim_2026-10-28_morale-bot` run B exactly (0 differences).

The notes in the raw results are the test player's own SURVIVAL notes (cash timing), as in earlier runs.

## Reading
- **The three levels now form a clear ladder:**
  - **easy:** always beaten by a steady player;
  - **medium:** a real race, won 3 times in 5;
  - **expert:** the stretch goal, won about 1 time in 3 to 4, last almost half the time.
- **Medium's strength comes mostly from money:** the occasional third shift. Fewer mistakes and better morale alone barely moved the result, because wealth is weighted ×3.
