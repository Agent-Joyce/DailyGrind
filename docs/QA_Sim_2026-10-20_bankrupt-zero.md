# Simulation runs: Bankrupt at $0

- **Date:** 2026-10-20
- **Build tested:** base commit `afcef28` (Merge branch 'meals-fridge-chips') plus the uncommitted change in CHANGELOG section 43, **Bankrupt at $0, clearer money-shame warning** (`index.html`: `CONFIG.bankrupt.netWorthBelow` 500 → 0, warning wording).
- **Compared with:** the meals, fridge and chips build, same seeds ([QA_Sim_2026-10-20_meals-fridge.md](QA_Sim_2026-10-20_meals-fridge.md); `ffff991` + CHANGELOG 41, before the section 42 wording changes, which do not affect play).
- **How:** `tools/qa/run-sims.ps1` (test copy built outside the repo, played in the desktop app's built-in browser with real clicks). 20 careful "survive" games (seeds 1–20) and 10 random games (seeds 101–110).
- **Raw data:** [QA_Sim_2026-10-20_bankrupt-zero.json](QA_Sim_2026-10-20_bankrupt-zero.json)

## Result

**No script errors, broken invariants, stuck days or log/effect mismatches.**

| Player | Runs | Previous build ($500 line) | This build ($0 line) |
|---|---|---|---|
| Careful (survive) | 20 | 17 Comfortable, 2 Time's up, 1 Bankrupt | **18 Comfortable**, 2 Time's up, **0 Bankrupt** |
| Random | 10 | 10 Hospitalised | 10 Hospitalised |

**Only seed 3 changed.** Under the old rule it went Bankrupt at the end of day 7 (net worth under $500 on days 5, 6 and 7: $229, $357, $411; the run records it as last day 8 because the game ends overnight). Its net worth never went below $0, so under the new rule it keeps playing and ends Comfortable on day 15 with $2,325 (net worth by day: 234, 337, 447, 373, 229, 357, 411, 668, 1,012, 914, 1,198, 1,542, 1,646, 1,995, 2,325). The other 29 games are identical to the previous build, game for game.

None of the 30 games had net worth below $0 at the end of any day from day 5, so this run never hits the new bankruptcy line. The random player is always Hospitalised (from hunger or health) by day 6, before money runs out. The $0 rule itself was checked separately in the browser (CHANGELOG section 43).

## Careful player, per game (this build)

| Seed | Last day | Ending | Net worth | Job | Qualifications | Vitals (E/H/L/K) |
|---|---|---|---|---|---|---|
| 1 | 15 | Comfortable | $3,110 | Data Annotator | Technology Cert, Engineering Cert | 80/23/100/11 |
| 2 | 15 | Comfortable | $2,949 | Lab Technician | Technology Cert, Medicine Cert | 84/68/100/13 |
| 3 | 15 | Comfortable *(was Bankrupt, end of day 7)* | $2,325 | Bookkeeper | Finance Cert | 91/56/100/0 |
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

## Random player, per game (this build, identical to the previous build)

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
