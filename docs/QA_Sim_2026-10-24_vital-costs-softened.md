# Simulation runs: vital costs, softened

- **Date:** 2026-10-24
- **Build tested:** branch `vital-costs` at `1ae49d2` (CHANGELOG section 53 as now written: walking 1% energy per 15 minutes, cooked and ready-to-eat meals +20% energy).
- **Compared with:** `main` at `9535814` (CHANGELOG 52) and the first vital-costs build `79e3895` (walking 2%, cooked meal +15%, ready-to-eat +12%; see [QA_Sim_2026-10-24_vital-costs.md](QA_Sim_2026-10-24_vital-costs.md)). Same seeds, same environment.
- **How:** a Node port of `tools/qa/run-sims.ps1` in a cloud sandbox (test hook injected before `  if(!load())fresh();` in a throwaway copy outside the repo; `sim.js` plays with real clicks in headless Chromium, Playwright 1.56). 20 careful "survive" games (seeds 1–20) and 10 random games (seeds 101–110) per build.
- **Raw data:** [QA_Sim_2026-10-24_vital-costs-softened.json](QA_Sim_2026-10-24_vital-costs-softened.json) (`runs.base` = `9535814`, `runs.first` = `79e3895`, `runs.new` = `1ae49d2`).

## Result

**No script errors.** Money is no longer the problem, but happiness is.

| Player | Runs | `9535814` (main) | `79e3895` (first) | `1ae49d2` (softened) |
|---|---|---|---|---|
| Careful (survive) | 20 | 14 Wealthy, 6 Comfortable · average $5,525 | 6 Comfortable, 6 Hospitalised, 6 Time’s up, 2 Bankrupt · average $484 | 17 You gave up, 3 Comfortable · average $1,531 |
| Random | 10 | 10 Hospitalised | 7 Hospitalised, 3 Exhaustion | 8 Hospitalised, 2 Exhaustion |

Average net worth by day (careful player):

| Build | Day 1 | Day 3 | Day 5 | Day 7 | Day 9 | Day 11 | Day 13 | Day 15 |
|---|---|---|---|---|---|---|---|---|
| `9535814` | $222 | $610 | $829 | $1,221 | $2,171 | $3,041 | $4,212 | $5,525 |
| `79e3895` | $222 | $362 | $271 | $165 | $291 | $123 | $312 | $876 |
| `1ae49d2` | $222 | $609 | $620 | $697 | $1,155 | $1,244 | $1,591 | $1,968 |

The softer walking and meal values fixed the money problem: no game ran out of cash for food or clothes, and net worth climbs again, though more slowly than on main. Most careful games (17 of 20) now end with **You gave up** (happiness at 10 or less for three days). Final happiness in these games is 0–10, against 69–98 on main. Study now costs 5 happiness an hour and every shift costs happiness. The bot studies and works most of the day, so happiness falls faster than sleep and fun bring it back.

The careful bot in `sim.js` does not plan around happiness, so a real player who books some fun will do better. Still, a player who studies and works full days now loses the game on morale.

## Careful player, per game

| Seed | Main ending | Main net worth | First ending | Softened ending | Last day | Net worth | Job | Vitals E/H/L/K |
|---|---|---|---|---|---|---|---|---|
| 1 | Comfortable | $4,852 | Comfortable | You gave up | 14 | $1,216 | Repair Technician | 38 / 2 / 100 / 13 |
| 2 | Wealthy | $5,944 | Bankrupt | You gave up | 12 | $853 | Hospital Porter | 1 / 0 / 89 / 11 |
| 3 | Wealthy | $7,254 | Hospitalised | You gave up | 15 | $1,713 | Bookkeeper | 59 / 5 / 100 / 4 |
| 4 | Wealthy | $6,724 | Bankrupt | You gave up | 10 | $646 | Nursing Aide | 30 / 0 / 100 / 13 |
| 5 | Wealthy | $6,053 | Time’s up | You gave up | 15 | $2,205 | Technician | 53 / 4 / 100 / 14 |
| 6 | Comfortable | $3,640 | Time’s up | Comfortable | 15 | $1,735 | none | 31 / 5 / 100 / 0 |
| 7 | Wealthy | $5,690 | Hospitalised | You gave up | 15 | $2,609 | Lab Technician | 39 / 0 / 100 / 14 |
| 8 | Wealthy | $5,731 | Hospitalised | You gave up | 11 | $1,020 | Lab Technician | 37 / 7 / 100 / 16 |
| 9 | Wealthy | $6,336 | Comfortable | You gave up | 9 | $874 | Line Worker | 52 / 4 / 100 / 18 |
| 10 | Wealthy | $5,450 | Comfortable | You gave up | 14 | $1,931 | Technician | 28 / 0 / 100 / 13 |
| 11 | Wealthy | $5,303 | Time’s up | Comfortable | 15 | $2,084 | Security Guard | 52 / 10 / 100 / 18 |
| 12 | Wealthy | $5,492 | Comfortable | You gave up | 14 | $1,940 | Lab Technician | 44 / 1 / 100 / 15 |
| 13 | Wealthy | $8,072 | Comfortable | You gave up | 14 | $1,593 | Lab Technician | 46 / 0 / 100 / 13 |
| 14 | Comfortable | $4,814 | Hospitalised | You gave up | 11 | $627 | Nursing Aide | 47 / 10 / 100 / 13 |
| 15 | Wealthy | $5,117 | Hospitalised | You gave up | 15 | $1,404 | Sales Clerk | 70 / 8 / 100 / 11 |
| 16 | Wealthy | $5,728 | Time’s up | You gave up | 10 | $803 | Nursing Aide | 14 / 1 / 100 / 13 |
| 17 | Comfortable | $4,644 | Hospitalised | You gave up | 15 | $1,477 | Nursing Aide | 68 / 0 / 100 / 8 |
| 18 | Wealthy | $5,599 | Comfortable | You gave up | 11 | $1,351 | Repair Technician | 52 / 5 / 100 / 17 |
| 19 | Comfortable | $3,953 | Time’s up | You gave up | 15 | $2,599 | Repair Technician | 20 / 0 / 100 / 12 |
| 20 | Comfortable | $4,099 | Time’s up | Comfortable | 15 | $1,943 | Hospital Porter | 66 / 8 / 100 / 0 |

## Random player, per game

| Seed | Main | First | Softened | Vitals E/H/L/K |
|---|---|---|---|---|
| 101 | 4 Hospitalised | 4 Hospitalised | 4 Hospitalised | 53 / 76 / 97 / 7 |
| 102 | 4 Hospitalised | 4 Hospitalised | 4 Hospitalised | 4 / 32 / 69 / 7 |
| 103 | 4 Hospitalised | 4 Hospitalised | 4 Hospitalised | 0 / 40 / 66 / 11 |
| 104 | 8 Hospitalised | 7 Exhaustion | 8 Hospitalised | 0 / 35 / 83 / 4 |
| 105 | 4 Hospitalised | 4 Hospitalised | 4 Hospitalised | 0 / 43 / 71 / 8 |
| 106 | 4 Hospitalised | 3 Exhaustion | 3 Exhaustion | 0 / 0 / 68 / 16 |
| 107 | 4 Hospitalised | 3 Exhaustion | 3 Exhaustion | 0 / 50 / 90 / 8 |
| 108 | 4 Hospitalised | 4 Hospitalised | 4 Hospitalised | 25 / 57 / 76 / 8 |
| 109 | 4 Hospitalised | 4 Hospitalised | 4 Hospitalised | 46 / 67 / 78 / 11 |
| 110 | 4 Hospitalised | 4 Hospitalised | 4 Hospitalised | 79 / 70 / 85 / 7 |
