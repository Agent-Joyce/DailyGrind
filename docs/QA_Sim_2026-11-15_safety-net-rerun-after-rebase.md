# QA simulation: safety net re-run after the rebase (CHANGELOG 116)

Date 15 November 2026. Single games only (no AI rivals). This re-runs the two earlier safety-net reports ([normal](QA_Sim_2026-11-14_safety-net.md), [hard times](QA_Sim_2026-11-15_safety-net-hard-times.md)) on the rebased code, which those reports said was not done.

## Versions and settings

| | Commit | Page |
|---|---|---|
| Base | `ebf0b99` (the branch point after the rebase) | `index.html` as committed at `ebf0b99` |
| New | `210eb50` (10 commits above the base, no uncommitted changes) | `index.html` at `210eb50` |

- Both builds were played by the same `tools/qa/sim.js` from `210eb50`.
- Careful bot: 20 games, seeds 1 to 20. Random bot: 10 games, seeds 101 to 110 (normal difficulty only). The same seeds on both builds.
- Three scenarios: normal; `--start=broke` (about $20, no savings, one day of clothes, no food; a constructed scenario); `--difficulty=hard`.
- Commands: `node tools/qa/run-sims.js <folder> 20 10 1 101 [base page]`, and `... 20 0 1 101 [base page] --start=broke` / `--difficulty=hard`.
- The first attempt ran all six jobs at once on the 4-core container and every job hit the 30-minute timeout. The runs here were redone in two waves of three. No results from the failed attempt are used.
- Raw results: [QA_Sim_2026-11-15_safety-net-rerun-after-rebase.json](QA_Sim_2026-11-15_safety-net-rerun-after-rebase.json), keyed `<build>-<scenario>`.

## Results

| Scenario | Bot | Build | Finished | Ended early | Mean / median net worth | "Could not eat" flags |
|---|---|---|---|---|---|---|
| Normal | Careful | Base | 20 / 20 | none | $5,339 / $5,251 | 1 game (seed 2) |
| Normal | Careful | New | 20 / 20 | none | $5,339 / $5,251 | 1 game (seed 2) |
| Normal | Random | Base | 0 / 10 | 9 Hospitalised, 1 Bankrupt | median $14 | 0 |
| Normal | Random | New | 0 / 10 | 9 Hospitalised, 1 Bankrupt | median $14 | 0 |
| Broke start | Careful | Base | 20 / 20 | none | $4,154 / $3,996 | 1 game (seed 16) |
| Broke start | Careful | New | 20 / 20 | none | $4,181 / $3,996 | 0 |
| Hard | Careful | Base | 20 / 20 | none | $4,979 / $4,244 | 2 games (seeds 3, 6) |
| Hard | Careful | New | 20 / 20 | none | $5,095 / $4,423 | 1 game (seed 6) |

## Reading the results

- **The earlier gap does not reproduce.** The hard-times report had the base finishing 13 / 20 (broke) and 8 / 20 (hard) and the safety net finishing 18 / 20. On the rebased code both builds finish 20 / 20 in every careful scenario. The base branch moved between the two sets of runs (Package A and B, and the bot clothes-reserve change), and the careful bot now survives hard times without the net. The earlier figures therefore measure the net against an older base and should not be quoted as the net's effect on current code.
- **What the net still changes:** it removes three of the four "could not eat" flags in the broke and hard scenarios (seed 16 broke; seed 3 hard). Hard net worth is a little higher (median $4,423 against $4,244). These are single runs of 20 seeds with one bot, so treat the net-worth difference as small and unproven.
- **Normal difficulty is unchanged**, as expected: identical results on every careful and random game. Net worth is the same in all 30 games, so the net does not fire in normal play.
- **Random bot:** all 10 games end early on both builds (9 Hospitalised, 1 Bankrupt, median day about 5). The safety net does not rescue a bot that plays randomly, so this is not a regression.
- **Seed 2 (normal) and seed 6 (hard)** still flag "could not eat" on one day, with both builds. These are not fixed by the net. The seed 2 flag has cash 20 with 1,185 minutes left on the new build against 1,230 on the base, so the hours differ slightly between builds.

## Caveats

- One run per cell; 20 careful seeds. Only the careful and random bots were used; no AI rival games.
- Mobile Chromium and physical devices were not involved; the runs are headless desktop.
- The "could not eat" flags come from the bot's own survival check, not from a player-visible failure. I have not looked at what the bot did on those days.
