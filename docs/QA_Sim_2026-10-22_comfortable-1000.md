# Simulation runs: Comfortable at $1,000

- **Date:** 2026-10-22
- **Build tested:** branch `comfortable-1000` at `5d067e5` (CHANGELOG section 47, **Comfortable at $1,000**).
- **Compared with:** `main` at `21b8f81` (CHANGELOG 45), same seeds, same environment.
- **How:** a Node port of `tools/qa/run-sims.ps1` in a cloud sandbox (hooked throwaway copy outside the repo, real clicks in headless Chromium). 20 careful games (seeds 1–20) and 10 random games (seeds 101–110) per build.
- **Raw data:** [QA_Sim_2026-10-22_comfortable-1000.json](QA_Sim_2026-10-22_comfortable-1000.json) (`runs.base` = `21b8f81`, `runs.new` = `5d067e5`).

## Result

**No script errors, broken invariants, stuck days or log/effect mismatches on either build.**

| Player | Runs | `21b8f81` ($2,000) | `5d067e5` ($1,000) |
|---|---|---|---|
| Careful | 20 | 10 Comfortable, 10 Wealthy · average $5,270 | 6 Comfortable, 14 Wealthy · average $5,525 |
| Random | 10 | 10 Hospitalised | 10 Hospitalised (identical games) |

Every careful game already passed $2,000, so the lower line changes no ending to a win or a loss. The games still take different paths, because reaching the first rank earlier changes what the careful bot does next. Its final net worth is higher on average, and 14 of 20 games reach Wealthy (was 10). The random games never reach $1,000 and are identical on both builds.

## Careful player, per game

| Seed | $2,000 build ending | Net worth | $1,000 build ending | Net worth |
|---|---|---|---|---|
| 1 | Comfortable | $3,235 | Comfortable | $4,852 |
| 2 | Wealthy | $6,090 | Wealthy | $5,944 |
| 3 | Wealthy | $5,796 | Wealthy | $7,254 |
| 4 | Comfortable | $4,729 | Wealthy | $6,724 |
| 5 | Wealthy | $6,263 | Wealthy | $6,053 |
| 6 | Comfortable | $3,517 | Comfortable | $3,640 |
| 7 | Comfortable | $4,438 | Wealthy | $5,690 |
| 8 | Wealthy | $5,737 | Wealthy | $5,731 |
| 9 | Wealthy | $7,384 | Wealthy | $6,336 |
| 10 | Wealthy | $6,172 | Wealthy | $5,450 |
| 11 | Comfortable | $4,577 | Wealthy | $5,303 |
| 12 | Wealthy | $5,769 | Wealthy | $5,492 |
| 13 | Wealthy | $9,398 | Wealthy | $8,072 |
| 14 | Comfortable | $3,936 | Comfortable | $4,814 |
| 15 | Wealthy | $5,027 | Wealthy | $5,117 |
| 16 | Comfortable | $4,882 | Wealthy | $5,728 |
| 17 | Comfortable | $3,868 | Comfortable | $4,644 |
| 18 | Wealthy | $5,383 | Wealthy | $5,599 |
| 19 | Comfortable | $4,909 | Comfortable | $3,953 |
| 20 | Comfortable | $4,284 | Comfortable | $4,099 |
