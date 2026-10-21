# Simulation runs: housing bubble, sleep, shorter shifts, burnout and illness

- **Date:** 2026-10-21
- **Build tested:** base commit `c9f7963` (manual: bankrupt at $0, CHANGELOG 43) plus the change in CHANGELOG section 44, **Housing bubble, sleep, shorter shifts, burnout and illness** (`index.html`, `tools/qa/sim.js`, `tools/qa/run-sims.ps1`; uncommitted when the runs were made).
- **Compared with:** the base commit `c9f7963` on the same seeds, run in the same environment (its own `index.html` and `tools/qa/sim.js`).
- **How:** a Node port of `tools/qa/run-sims.ps1` in a cloud sandbox: the same test hook injected before `  if(!load())fresh();` in a throwaway copy outside the repo, `sim.js` playing with real clicks in headless Chromium (Playwright 1.56). 20 careful "survive" games (seeds 1–20) and 10 random games (seeds 101–110) per build.
- **Raw data:** [QA_Sim_2026-10-21_housing-sleep-shifts-illness.json](QA_Sim_2026-10-21_housing-sleep-shifts-illness.json) (`runs.base` = base build, `runs.new` = this change, plus the event counts and the forced runs described below).

The base build's net worth figures here differ from the 2026-10-20 report for the same commit and seeds (that run used the desktop app's built-in browser). The endings match (18 Comfortable, 2 Time's up; 10 Hospitalised). Compare the two builds within this report only.

## Result

**No script errors, broken invariants, stuck days or log/effect mismatches on either build.** The careful player hit no SURVIVAL notes on either build.

| Player | Runs | Base `c9f7963` | This change |
|---|---|---|---|
| Careful (survive) | 20 | 18 Comfortable, 2 Time's up · average $2,822 | **11 Wealthy, 9 Comfortable**, 0 Time's up · average **$5,136** |
| Random | 10 | 10 Hospitalised | 10 Hospitalised (same days) |

**Why the careful player is so much richer:** shifts are an hour shorter for the same pay, so the bot fits more shifts into each day (up to the 12h work limit and the new 10h burnout line). Every careful game improved, by $380 (seed 5) to $4,125 (seed 15). Bigger nights of sleep also leave it with more energy and happiness (happiness at the end is 45–98, against 23–86 before). This is a balance shift worth deciding on. It is not a bug.

**Random player:** the same endings on the same days (hunger, by day 4–6), with higher vitals because sleep gives more. Seed 106 ended with $12 instead of $102.

## How often the new rules fired (this change, same 30 seeds)

Counted from the full Daily log of each game (a scratch copy with the 200-line log limit raised; gameplay and results are identical to `runs.new`):

- **Illness:** 1 case in 30 games (seed 5, pneumonia, treated at the Hospital). The careful bot rarely goes to bed under 30% energy, so the new "3 low nights in 5" rule almost never lets the energy table apply. The random games end too early to get there.
- **Burnout:** 0. The careful bot keeps work and study under 10 hours on the last day of a streak.
- **Housing bubble:** 0. Neither the shock nor the headline came up in these 30 games, so nobody lost a home.
- **Pandemic stories:** ran in seeds 11 and 12 without anyone falling ill.

So these runs show that nothing breaks. They say little about how the new rules play. The rules themselves were checked one by one (CHANGELOG section 44).

## Forced runs: home lost on day 3, flu on day 6

To push the homeless and illness paths through a whole game with real clicks, a scratch copy of `sim.js` removed the home at the start of day 3 and gave the flu on day 6 (5 careful games, seeds 1–5; 3 random games, seeds 101–103):

- No script errors, broken invariants, stuck days or log/effect mismatches.
- All 5 careful games re-applied at the Apartment the same day (click on **Apply to rent**) and finished: 4 Comfortable, 1 Wealthy ($2,960–$5,464). The flu was treated at the Hospital each time. Three of them noted "could not eat on day 8 (cash 0)", the morning the hospital bill was charged.
- Random seed 103 re-applied by clicking at random. All 3 random games ended Hospitalised on day 4, as in the normal run.

## Careful player, per game

| Seed | Base ending | Base net worth | Base job | This change ending | This change net worth | Job | Vitals E/H/L/K |
|---|---|---|---|---|---|---|---|
| 1 | Comfortable | $3,544 | Data Annotator | Wealthy | $5,243 | Repair Technician | 87/80/100/11 |
| 2 | Comfortable | $3,723 | Lab Technician | Wealthy | $6,505 | Lab Technician | 76/94/100/13 |
| 3 | Comfortable | $2,358 | Bookkeeper | Comfortable | $3,852 | Teller | 85/79/100/7 |
| 4 | Comfortable | $2,735 | Lab Technician | Wealthy | $6,603 | Lab Technician | 76/90/100/11 |
| 5 | Comfortable | $2,527 | Stock Clerk | Comfortable | $2,907 | Technician | 99/45/100/13 |
| 6 | Time’s up | $906 | Bookkeeper | Comfortable | $4,712 | Bookkeeper | 86/89/100/0 |
| 7 | Comfortable | $2,817 | Lab Technician | Comfortable | $3,858 | none | 84/91/100/11 |
| 8 | Comfortable | $2,586 | Lab Technician | Wealthy | $6,148 | Lab Technician | 84/88/100/11 |
| 9 | Comfortable | $3,366 | Repair Technician | Wealthy | $6,095 | Security Guard | 85/91/100/11 |
| 10 | Comfortable | $4,162 | Technician | Wealthy | $5,431 | Technician | 86/77/100/11 |
| 11 | Comfortable | $2,849 | Data Annotator | Comfortable | $4,371 | Lab Technician | 84/92/100/14 |
| 12 | Comfortable | $2,156 | Lab Technician | Comfortable | $3,565 | Lab Technician | 84/77/100/11 |
| 13 | Comfortable | $3,152 | Data Annotator | Comfortable | $4,139 | Lab Technician | 84/54/100/11 |
| 14 | Comfortable | $2,545 | Lab Technician | Comfortable | $4,857 | Lab Technician | 76/90/100/11 |
| 15 | Comfortable | $2,464 | Lab Technician | Wealthy | $6,589 | Lab Technician | 76/88/100/13 |
| 16 | Comfortable | $2,525 | none | Wealthy | $5,819 | Lab Technician | 84/88/100/11 |
| 17 | Time’s up | $1,823 | Lab Technician | Comfortable | $4,812 | Lab Technician | 84/69/100/11 |
| 18 | Comfortable | $3,348 | Technician | Wealthy | $6,938 | Data Annotator | 95/98/100/11 |
| 19 | Comfortable | $3,472 | Repair Technician | Wealthy | $5,204 | Technician | 100/86/100/13 |
| 20 | Comfortable | $3,379 | none | Wealthy | $5,072 | Lab Technician | 80/64/100/11 |

All careful games reached day 15 on both builds.

## Random player, per game

| Seed | Base: last day, ending | Base vitals E/H/L/K | This change: last day, ending | Vitals E/H/L/K |
|---|---|---|---|---|
| 101 | 4 Hospitalised | 33/42/93/7 | 4 Hospitalised | 58/64/97/7 |
| 102 | 4 Hospitalised | 34/15/62/7 | 4 Hospitalised | 58/29/71/7 |
| 103 | 4 Hospitalised | 12/18/58/7 | 4 Hospitalised | 29/28/67/7 |
| 104 | 6 Hospitalised | 42/35/62/5 | 6 Hospitalised | 65/63/79/5 |
| 105 | 6 Hospitalised | 58/21/49/13 | 6 Hospitalised | 80/47/66/13 |
| 106 | 4 Hospitalised | 0/14/59/15 | 4 Hospitalised | 19/20/67/15 |
| 107 | 4 Hospitalised | 0/43/76/10 | 4 Hospitalised | 0/56/87/10 |
| 108 | 4 Hospitalised | 34/12/62/9 | 4 Hospitalised | 58/25/71/9 |
| 109 | 4 Hospitalised | 0/67/92/7 | 4 Hospitalised | 7/85/95/7 |
| 110 | 4 Hospitalised | 69/52/72/7 | 4 Hospitalised | 80/77/85/7 |
