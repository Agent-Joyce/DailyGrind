# Simulation runs: Meals, the fridge and chips

- **Date:** 2026-10-20
- **Build tested:** base commit `ffff991` (Merge branch 'rank-targets-news-tipoffs') plus the uncommitted change in CHANGELOG section 41, **Meals, the fridge and chips** (`index.html`, `tools/qa/sim.js`).
- **How:** `tools/qa/run-sims.ps1` (test copy built outside the repo, played in the desktop app's built-in browser with real clicks). 20 careful "survive" games (seeds 1–20) and 10 random games (seeds 101–110).
- **Raw data:** [QA_Sim_2026-10-20_meals-fridge.json](QA_Sim_2026-10-20_meals-fridge.json)

## Result

**No script errors, broken invariants, stuck days or log/effect mismatches.** The new checks (fridge holds at most 5 meals, no spoiled food in the fridge, chips at home within the limit) never fired.

| Player | Runs | Endings |
|---|---|---|
| Careful (survive) | 20 | 17 Comfortable, 2 Time's up (seeds 6, 17), 1 Bankrupt (seed 3, day 8) |
| Random | 10 | 10 Hospitalised (as in earlier builds) |

For comparison, CHANGELOG section 40 recorded the build before this change at 52 Comfortable, 3 Time's up and 5 Bankrupt over 60 careful seeds. The food change draws different random numbers, so the same seed does not replay the same game across builds.

## Careful player, per game

| Seed | Last day | Ending | Net worth | Job | Qualifications | Vitals (E/H/L/K) |
|---|---|---|---|---|---|---|
| 1 | 15 | Comfortable | $3,110 | Data Annotator | Technology Cert, Engineering Cert | 80/23/100/11 |
| 2 | 15 | Comfortable | $2,949 | Lab Technician | Technology Cert, Medicine Cert | 84/68/100/13 |
| 3 | 8 | Bankrupt | $411 | Teller | Finance Cert | 98/65/100/11 |
| 4 | 15 | Comfortable | $2,594 | Lab Technician | Technology Cert, Medicine Cert | 84/72/100/12 |
| 5 | 15 | Comfortable | $2,406 | Data Annotator | Technology Cert, Engineering Cert | 86/55/100/14 |
| 6 | 15 | Time's up | $834 | Bookkeeper | Finance Cert | 89/59/100/3 |
| 7 | 15 | Comfortable | $2,671 | Lab Technician | Technology Cert, Medicine Cert | 84/71/100/14 |
| 8 | 15 | Comfortable | $2,286 | Lab Technician | Technology Cert, Medicine Cert | 84/72/100/12 |
| 9 | 15 | Comfortable | $3,224 | Repair Technician | Technology Cert, Engineering Cert | 95/86/100/11 |
| 10 | 15 | Comfortable | $3,666 | Technician | Technology Cert, Engineering Cert | 91/41/100/11 |
| 11 | 15 | Comfortable | $2,258 | Data Annotator | Technology Cert, Medicine Cert | 80/54/100/15 |
| 12 | 15 | Comfortable | $2,237 | Lab Technician | Technology Cert, Medicine Cert | 84/58/100/12 |
| 13 | 15 | Comfortable | $2,056 | Delivery Driver | Technology Cert, Medicine Cert | 89/2/100/16 |
| 14 | 15 | Comfortable | $2,920 | Lab Technician | Technology Cert, Medicine Cert | 84/70/100/15 |
| 15 | 15 | Comfortable | $2,496 | Lab Technician | Technology Cert, Medicine Cert | 84/54/100/16 |
| 16 | 15 | Comfortable | $3,007 | Lab Technician | Technology Cert, Medicine Cert | 84/60/100/14 |
| 17 | 15 | Time's up | $1,936 | Lab Technician | Technology Cert, Medicine Cert | 93/40/100/16 |
| 18 | 15 | Comfortable | $2,948 | Technician | Technology Cert, Engineering Cert | 91/67/100/11 |
| 19 | 15 | Comfortable | $3,280 | Repair Technician | Technology Cert, Engineering Cert | 92/70/100/11 |
| 20 | 15 | Comfortable | $2,440 | Lab Technician | Technology Cert, Medicine Cert | 90/76/100/11 |

## Random player, per game

| Seed | Last day | Ending | Net worth | Job | Vitals (E/H/L/K) |
|---|---|---|---|---|---|
| 101 | 4 | Hospitalised | $4 | Shelf Stacker | 33/42/93/7 |
| 102 | 4 | Hospitalised | $88 | none | 34/15/62/7 |
| 103 | 4 | Hospitalised | $194 | Front Desk | 12/18/58/7 |
| 104 | 6 | Hospitalised | $2 | none | 42/35/62/5 |
| 105 | 6 | Hospitalised | $11 | none | 58/21/49/13 |
| 106 | 4 | Hospitalised | $102 | Stock Clerk | 0/14/59/15 |
| 107 | 4 | Hospitalised | $11 | none | 0/43/76/10 |
| 108 | 4 | Hospitalised | $158 | Sorter | 34/12/62/9 |
| 109 | 4 | Hospitalised | $163 | none | 0/67/92/7 |
| 110 | 4 | Hospitalised | $20 | none | 69/52/72/7 |
