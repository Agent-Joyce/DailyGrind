# Simulation run: Health counts unwell nights, and the job race (2026-10-31)

**Game version tested:** commit `8ec3a84` (CHANGELOG 82).
**Compared with:** `QA_Sim_2026-10-31_rival-parity` (commit `6c44ef0`).

**Settings:**
- **Rival games:** `node tools/qa/run-sims.js <folder> 20 0 1 101 --rivals=<level>`: 20 careful test-player games from seed 1, 3 rivals, 30 days.
- **Single games:** the default 20 careful from seed 1 and 10 random from seed 101.

**Raw results:** `QA_Sim_2026-10-31_job-race.json`, with runs labelled `easy`, `medium`, `expert` and `single`.

## Single games are unchanged
All 30 games match `QA_Sim_2026-10-28_morale-bot` run B exactly (0 differences).

## Rival games, before → after

| | Easy rivals | Medium rivals | Expert rivals |
|---|---|---|---|
| Test player's Life Score wins (of 20) | 20 → 20 | 15 → **19** | 4 → 5 (3rd in 8, 4th in 7; was 4th in 14) |
| Test player's points / rivals' | 93 / 53 → 100 / 55 | 87 / 61 → 96 / 63 | 63 / 73 → 71 / 76 |
| Health won or shared by the test player | 0 → 17 | 0 → 17 | 0 → 16 |
| Games where everyone shared 1st in Health | n/a → 13 | n/a → 14 | n/a → 14 |
| Page errors | none | none | none |

The few notes in the raw results are the test player's own SURVIVAL notes (cash timing), as in earlier runs.

## Reading
- **Health now works as intended.** In about two games in three nobody had an unwell night, so everyone shares 1st and the category doesn't swing the result. When it does separate players, it's because someone fell ill or ran their health down.
- **The job race happened in these games** (medium and expert rivals took openings), but it didn't change who won, since the careful test player rarely chases the exact roles a rival just took.
- **Medium rivals are now a little easy:** the test player wins 19 of 20, up from 15, mostly because Health stopped handing rivals a near-certain win. If medium should be a closer race, the simplest dials are its `moraleAim` (happier rivals), `shifts` or `mistakeChance` in `CONFIG.rivals.levels.medium`.
- **Expert stays the stretch goal:** the test player wins 1 in 4 and finishes last in about a third.
