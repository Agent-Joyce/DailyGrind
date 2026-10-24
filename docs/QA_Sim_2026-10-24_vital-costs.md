# Simulation runs: vital costs

- **Date:** 2026-10-24
- **Build tested:** branch `vital-costs` at `79e3895` (CHANGELOG section 53, **Vital costs for study, work, walking, cooking and meals**).
- **Compared with:** `main` at `9535814` (CHANGELOG 52), same seeds, same environment.
- **How:** a Node port of `tools/qa/run-sims.ps1` in a cloud sandbox (test hook injected before `  if(!load())fresh();` in a throwaway copy outside the repo; `sim.js` plays with real clicks in headless Chromium, Playwright 1.56). 20 careful "survive" games (seeds 1–20) and 10 random games (seeds 101–110) per build.
- **Raw data:** [QA_Sim_2026-10-24_vital-costs.json](QA_Sim_2026-10-24_vital-costs.json) (`runs.base` = `9535814`, `runs.new` = `79e3895`).

## Result

**No script errors on either build.** The new costs make the game much harder.

| Player | Runs | `9535814` | `79e3895` |
|---|---|---|---|
| Careful (survive) | 20 | 14 Wealthy, 6 Comfortable · average $5,525 | 6 Comfortable, 6 Hospitalised, 6 Time’s up, 2 Bankrupt · average $484 |
| Random | 10 | 10 Hospitalised | 7 Hospitalised, 3 Exhaustion |

The careful player used to finish every game Comfortable or Wealthy. Now only 6 of 20 reach a rank, and 8 games end early. Several games run out of money around day 6–11: the player can no longer afford clothes for work, then cannot buy food, then is hospitalised or goes bankrupt.

Average net worth by day (careful player):

| Day | 1 | 3 | 5 | 7 | 9 | 11 | 13 | 15 |
|---|---|---|---|---|---|---|---|---|
| `9535814` | $222 | $610 | $829 | $1,221 | $2,171 | $3,041 | $4,212 | $5,525 |
| `79e3895` | $222 | $362 | $271 | $165 | $291 | $123 | $312 | $876 |

On the base build net worth climbs from day 2. On the new build it falls from day 3 to day 11 and only recovers in the last few days.

The random player already lost every game. It now loses by Exhaustion in three games (energy hits 0) and most others end with energy at 0.

## Likely causes

- **Walking** now costs 2% energy per 15 minutes. A day with four trips costs about 8–16% energy before any work.
- **Meals give less energy.** A cooked meal went from +22% to +15%, a ready-to-eat meal from +30% to +12%. Cooking also costs 5% per 3 hours.
- **Study and self-study** cost 5% energy and 5 happiness for every hour, on top of the time they take.
- **Work** now costs happiness (half the energy cost).

With less energy per day the player works fewer shifts, earns less, and cannot keep up with rent, clothes and food.

The careful bot in `sim.js` was tuned for the old costs. A real player who plans around the new costs may do better. Still, the gap is big enough that the values probably need softening.

## Careful player, per game

| Seed | Base ending | Base net worth | This change ending | Last day | Net worth | Job | Vitals E/H/L/K | Survival notes |
|---|---|---|---|---|---|---|---|---|
| 1 | Comfortable | $4,852 | Comfortable | 15 | $1,086 | Hospital Porter | 10 / 84 / 100 / 0 | – |
| 2 | Wealthy | $5,944 | Bankrupt | 14 | −$425 | none | 57 / 58 / 98 / 0 | clothes unaffordable, went hungry |
| 3 | Wealthy | $7,254 | Hospitalised | 13 | −$110 | Security Guard | 75 / 77 / 100 / 9 | clothes unaffordable, went hungry |
| 4 | Wealthy | $6,724 | Bankrupt | 14 | −$33 | Security Guard | 75 / 77 / 100 / 0 | clothes unaffordable, went hungry |
| 5 | Wealthy | $6,053 | Time’s up | 15 | $888 | Line Worker | 53 / 100 / 100 / 7 | – |
| 6 | Comfortable | $3,640 | Time’s up | 15 | $884 | Bookkeeper | 39 / 99 / 100 / 5 | – |
| 7 | Wealthy | $5,690 | Hospitalised | 14 | $0 | Delivery Driver | 80 / 82 / 100 / 2 | clothes unaffordable, went hungry |
| 8 | Wealthy | $5,731 | Hospitalised | 13 | −$154 | Delivery & Install | 75 / 77 / 100 / 7 | clothes unaffordable, went hungry |
| 9 | Wealthy | $6,336 | Comfortable | 15 | $1,094 | Repair Technician | 28 / 96 / 100 / 0 | – |
| 10 | Wealthy | $5,450 | Comfortable | 15 | $1,983 | Sales Clerk | 44 / 85 / 100 / 0 | – |
| 11 | Wealthy | $5,303 | Time’s up | 15 | $301 | Security Guard | 41 / 91 / 100 / 0 | – |
| 12 | Wealthy | $5,492 | Comfortable | 15 | $987 | Sales Clerk | 32 / 80 / 100 / 3 | – |
| 13 | Wealthy | $8,072 | Comfortable | 15 | $1,208 | Nursing Aide | 62 / 82 / 100 / 0 | clothes unaffordable, went hungry |
| 14 | Comfortable | $4,814 | Hospitalised | 11 | $13 | Cleaner | 80 / 82 / 100 / 8 | clothes unaffordable, went hungry |
| 15 | Wealthy | $5,117 | Hospitalised | 11 | $18 | Cleaner | 80 / 82 / 100 / 10 | clothes unaffordable, went hungry |
| 16 | Wealthy | $5,728 | Time’s up | 15 | $21 | Stock Clerk | 100 / 97 / 100 / 0 | clothes unaffordable |
| 17 | Comfortable | $4,644 | Hospitalised | 13 | −$148 | Delivery & Install | 50 / 77 / 100 / 0 | clothes unaffordable, went hungry |
| 18 | Wealthy | $5,599 | Comfortable | 15 | $1,031 | Line Worker | 51 / 100 / 100 / 10 | – |
| 19 | Comfortable | $3,953 | Time’s up | 15 | $993 | Line Worker | 36 / 98 / 100 / 9 | – |
| 20 | Comfortable | $4,099 | Time’s up | 15 | $38 | Stock Clerk | 100 / 96 / 100 / 0 | clothes unaffordable, went hungry |

## Random player, per game

| Seed | Base: last day, ending | This change: last day, ending | Vitals E/H/L/K |
|---|---|---|---|
| 101 | 4 Hospitalised | 4 Hospitalised | 48 / 76 / 97 / 7 |
| 102 | 4 Hospitalised | 4 Hospitalised | 0 / 32 / 67 / 7 |
| 103 | 4 Hospitalised | 4 Hospitalised | 0 / 40 / 64 / 11 |
| 104 | 8 Hospitalised | 7 Exhaustion | 0 / 59 / 84 / 4 |
| 105 | 4 Hospitalised | 4 Hospitalised | 0 / 44 / 69 / 8 |
| 106 | 4 Hospitalised | 3 Exhaustion | 0 / 7 / 70 / 15 |
| 107 | 4 Hospitalised | 3 Exhaustion | 0 / 50 / 90 / 8 |
| 108 | 4 Hospitalised | 4 Hospitalised | 0 / 21 / 67 / 7 |
| 109 | 4 Hospitalised | 4 Hospitalised | 20 / 66 / 78 / 10 |
| 110 | 4 Hospitalised | 4 Hospitalised | 52 / 70 / 85 / 7 |
