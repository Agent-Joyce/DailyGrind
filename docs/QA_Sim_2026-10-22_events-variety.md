# Simulation runs: one storyline a game, no repeats, more stories

- **Date:** 2026-10-22
- **Build tested:** branch `events-variety` at `8f854b6` (CHANGELOG section 45, **One storyline a game, no repeats, 100 mini stories and 30 storylines**).
- **Compared with:** `main` at `c460c42` (CHANGELOG 44), same seeds, same environment.
- **How:** a Node port of `tools/qa/run-sims.ps1` in a cloud sandbox (test hook injected before `  if(!load())fresh();` in a throwaway copy outside the repo; `sim.js` plays with real clicks in headless Chromium, Playwright 1.56). 20 careful "survive" games (seeds 1–20) and 10 random games (seeds 101–110) per build.
- **Raw data:** [QA_Sim_2026-10-22_events-variety.json](QA_Sim_2026-10-22_events-variety.json) (`runs.base` = `c460c42`, `runs.new` = `8f854b6`).

## Result

**No script errors, broken invariants, stuck days or log/effect mismatches on either build.**

| Player | Runs | `c460c42` | `8f854b6` |
|---|---|---|---|
| Careful (survive) | 20 | 11 Wealthy, 9 Comfortable · average $5,136 | 10 Comfortable, 10 Wealthy · average $5,270 |
| Random | 10 | 10 Hospitalised | 10 Hospitalised |

The event changes alter which nights bring which events, so every game takes a different path from the base build. The careful player ends with similar results: still Comfortable or Wealthy in every game. Random seed 104 now lasts until day 8 (was day 6).

## Bug found and fixed during this QA

The first run of this change (branch at `cbe689e`) got **stuck in random seed 104**. The new mini story "A surprise party" offered only paid choices ($40 party, $15 cake). With −$164 cash both were disabled, so the end-of-day card could not be closed ("event card with no enabled button" ×70, "day 6 never ended" ×35).

Fixed in `8f854b6`:
- **Content:** every story step now has a free choice (15 steps in 14 new stories), and the content check enforces this.
- **Safety net:** a story card with no affordable choice shows **Leave it**.

This run is on the fixed build.

## Careful player, per game

| Seed | Base ending | Base net worth | This change ending | Net worth | Job | Vitals E/H/L/K |
|---|---|---|---|---|---|---|
| 1 | Wealthy | $5,243 | Comfortable | $3,235 | Repair Technician | 95//91//100//11 |
| 2 | Wealthy | $6,505 | Wealthy | $6,090 | Lab Technician | 76//92//100//12 |
| 3 | Comfortable | $3,852 | Wealthy | $5,796 | Bookkeeper | 81//93//100//3 |
| 4 | Wealthy | $6,603 | Comfortable | $4,729 | Lab Technician | 84//90//100//11 |
| 5 | Comfortable | $2,907 | Wealthy | $6,263 | Technician | 86//95//100//11 |
| 6 | Comfortable | $4,712 | Comfortable | $3,517 | Bookkeeper | 86//98//100//0 |
| 7 | Comfortable | $3,858 | Comfortable | $4,438 | Lab Technician | 76//89//100//13 |
| 8 | Wealthy | $6,148 | Wealthy | $5,737 | Lab Technician | 80//81//100//11 |
| 9 | Wealthy | $6,095 | Wealthy | $7,384 | Technician | 99//100//100//13 |
| 10 | Wealthy | $5,431 | Wealthy | $6,172 | Technician | 86//94//100//12 |
| 11 | Comfortable | $4,371 | Comfortable | $4,577 | Lab Technician | 76//82//100//11 |
| 12 | Comfortable | $3,565 | Wealthy | $5,769 | Lab Technician | 76//81//100//16 |
| 13 | Comfortable | $4,139 | Wealthy | $9,398 | Lab Technician | 76//92//100//12 |
| 14 | Comfortable | $4,857 | Comfortable | $3,936 | Lab Technician | 76//78//100//11 |
| 15 | Wealthy | $6,589 | Wealthy | $5,027 | Lab Technician | 90//79//100//13 |
| 16 | Wealthy | $5,819 | Comfortable | $4,882 | Lab Technician | 76//91//100//11 |
| 17 | Comfortable | $4,812 | Comfortable | $3,868 | Lab Technician | 84//84//100//11 |
| 18 | Wealthy | $6,938 | Wealthy | $5,383 | Repair Technician | 87//51//100//11 |
| 19 | Wealthy | $5,204 | Comfortable | $4,909 | Repair Technician | 87//91//100//12 |
| 20 | Wealthy | $5,072 | Comfortable | $4,284 | Lab Technician | 76//95//100//14 |

## Random player, per game

| Seed | Base: last day, ending | This change: last day, ending | Vitals E/H/L/K |
|---|---|---|---|
| 101 | 4 Hospitalised | 4 Hospitalised | 58//76//97//7 |
| 102 | 4 Hospitalised | 4 Hospitalised | 55//32//71//7 |
| 103 | 4 Hospitalised | 4 Hospitalised | 49//40//68//11 |
| 104 | 6 Hospitalised | 8 Hospitalised | 52//45//81//3 |
| 105 | 6 Hospitalised | 4 Hospitalised | 49//43//73//8 |
| 106 | 4 Hospitalised | 4 Hospitalised | 25//27//69//15 |
| 107 | 4 Hospitalised | 4 Hospitalised | 3//33//87//7 |
| 108 | 4 Hospitalised | 4 Hospitalised | 80//62//78//8 |
| 109 | 4 Hospitalised | 4 Hospitalised | 71//67//78//11 |
| 110 | 4 Hospitalised | 4 Hospitalised | 80//70//85//7 |
