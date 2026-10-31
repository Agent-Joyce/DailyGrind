# Simulation results for settlement rent and Life Score fixes rivals

- Date: 2026-10-31 (Singapore).
- Base commit: 49010c43b07441ba04e41ffb42ee80245effe094.
- Change tested: CHANGELOG section 88: Bet settlements, rent prepayments and nightly Life Score fixes.
- index.html SHA-256: 1e9be1071252d8d048f2668546893c02dc60ef31db72a1a0f02b986b834483b0.
- Runtime: Playwright with headless Microsoft Edge on Windows; HTTP requests blocked.
- Settings: 20 careful games, seeds 1–20; no random games; 3 mixed rivals (easy, medium, expert), 30-day games.
- Raw results: [QA_Sim_2026-10-31_settlement-rent-life-rivals.json](QA_Sim_2026-10-31_settlement-rent-life-rivals.json).
- This report tests the changed build only; no baseline comparison was run.

## Technical checks

No script errors, broken invariants, stuck days or log/effect mismatches were recorded by the simulation harness.

All 20 games completed. Top-level browser errors are also checked in the launcher console.

## Outcomes

- survive: 20 games; 💼 Final rank: Wealthy: 2; 👑 Final rank: Tycoon: 18. Average net worth $14713.
- Player Life Score places: 1: 12; 2: 6; 3: 2.

## Per game

| Mode | Seed | Last day | Ending | Net worth | Job | Vitals |
|---|---|---|---|---|---|---|
| survive | 1 | 30 | 💼 Final rank: Wealthy | $9908 | Junior Doctor | E91 H57 L98 K51 |
| survive | 2 | 30 | 👑 Final rank: Tycoon | $10489 | Junior Doctor | E60 H54 L94 K57 |
| survive | 3 | 30 | 👑 Final rank: Tycoon | $13605 | Junior Doctor | E100 H77 L100 K42 |
| survive | 4 | 30 | 👑 Final rank: Tycoon | $13434 | Junior Doctor | E100 H68 L100 K44 |
| survive | 5 | 30 | 👑 Final rank: Tycoon | $13823 | Junior Doctor | E61 H55 L94 K58 |
| survive | 6 | 30 | 👑 Final rank: Tycoon | $19445 | Junior Doctor | E42 H54 L94 K59 |
| survive | 7 | 30 | 👑 Final rank: Tycoon | $12960 | Junior Doctor | E60 H44 L94 K60 |
| survive | 8 | 30 | 👑 Final rank: Tycoon | $14985 | none | E91 H60 L98 K52 |
| survive | 9 | 30 | 👑 Final rank: Tycoon | $17964 | Junior Doctor | E84 H55 L98 K57 |
| survive | 10 | 30 | 💼 Final rank: Wealthy | $7604 | Junior Doctor | E93 H94 L100 K59 |
| survive | 11 | 30 | 👑 Final rank: Tycoon | $13398 | Junior Doctor | E62 H46 L100 K40 |
| survive | 12 | 30 | 👑 Final rank: Tycoon | $10958 | Junior Doctor | E52 H55 L98 K51 |
| survive | 13 | 30 | 👑 Final rank: Tycoon | $18256 | Junior Doctor | E35 H45 L94 K54 |
| survive | 14 | 30 | 👑 Final rank: Tycoon | $15821 | Junior Doctor | E96 H64 L98 K52 |
| survive | 15 | 30 | 👑 Final rank: Tycoon | $11948 | Junior Doctor | E60 H51 L94 K55 |
| survive | 16 | 30 | 👑 Final rank: Tycoon | $32291 | Junior Doctor | E55 H63 L100 K47 |
| survive | 17 | 30 | 👑 Final rank: Tycoon | $15490 | Senior Nurse | E100 H65 L100 K23 |
| survive | 18 | 30 | 👑 Final rank: Tycoon | $10362 | Junior Doctor | E76 H73 L100 K43 |
| survive | 19 | 30 | 👑 Final rank: Tycoon | $17308 | Junior Doctor | E92 H64 L100 K40 |
| survive | 20 | 30 | 👑 Final rank: Tycoon | $14216 | Security Guard | E71 H56 L98 K54 |

## All notes

- SURVIVAL: could not eat on day 26 (cash 20, time left 1230m) (2)
- SURVIVAL: could not eat on day 25 (cash 15, time left 1350m) (1)

SURVIVAL notes describe the bot missing meals or clothes and are balance signals; they are distinct from technical failures. Targeted regression checks separately cover simultaneous bets, bill-specific rent, overnight recovery and arrears, final-night sampling, and save/reload. These simulations do not guarantee every new social interaction was exercised.
