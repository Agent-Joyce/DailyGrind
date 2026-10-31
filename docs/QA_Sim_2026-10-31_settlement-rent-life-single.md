# Simulation results for settlement rent and Life Score fixes single

- Date: 2026-10-31 (Singapore).
- Base commit: 49010c43b07441ba04e41ffb42ee80245effe094.
- Change tested: CHANGELOG section 88: Bet settlements, rent prepayments and nightly Life Score fixes.
- index.html SHA-256: 1e9be1071252d8d048f2668546893c02dc60ef31db72a1a0f02b986b834483b0.
- Runtime: Playwright with headless Microsoft Edge on Windows; HTTP requests blocked.
- Settings: 20 careful games, seeds 1–20; 10 random games, seeds 101–110; single-player mode.
- Raw results: [QA_Sim_2026-10-31_settlement-rent-life-single.json](QA_Sim_2026-10-31_settlement-rent-life-single.json).
- This report tests the changed build only; no baseline comparison was run.

## Technical checks

No script errors, broken invariants, stuck days or log/effect mismatches were recorded by the simulation harness.

All 30 games completed. Top-level browser errors are also checked in the launcher console.

## Outcomes

- survive: 20 games; 💼 Final rank: Wealthy: 12; 🙂 Final rank: Comfortable: 7; Bankrupt: 1. Average net worth $5216.
- random: 10 games; Hospitalised: 10. Average net worth $53.

## Per game

| Mode | Seed | Last day | Ending | Net worth | Job | Vitals |
|---|---|---|---|---|---|---|
| survive | 1 | 20 | 💼 Final rank: Wealthy | $5315 | Nurse | E73 H42 L93 K30 |
| survive | 2 | 20 | 🙂 Final rank: Comfortable | $4684 | Data Annotator | E54 H34 L93 K23 |
| survive | 3 | 20 | 💼 Final rank: Wealthy | $5253 | Security Guard | E58 H22 L97 K30 |
| survive | 4 | 20 | 💼 Final rank: Wealthy | $5580 | Nurse | E44 H25 L94 K11 |
| survive | 5 | 20 | 💼 Final rank: Wealthy | $5742 | Repair Technician | E56 H57 L94 K15 |
| survive | 6 | 20 | 💼 Final rank: Wealthy | $6331 | Nurse | E59 H21 L93 K29 |
| survive | 7 | 20 | 🙂 Final rank: Comfortable | $4238 | Nurse | E79 H59 L98 K25 |
| survive | 8 | 20 | 💼 Final rank: Wealthy | $5336 | Nurse | E49 H58 L94 K13 |
| survive | 9 | 20 | 💼 Final rank: Wealthy | $6214 | Nurse | E47 H38 L93 K31 |
| survive | 10 | 20 | 🙂 Final rank: Comfortable | $4545 | Nurse | E40 H39 L96 K24 |
| survive | 11 | 20 | 💼 Final rank: Wealthy | $9456 | Senior Nurse | E44 H20 L94 K43 |
| survive | 12 | 20 | 💼 Final rank: Wealthy | $5426 | Nursing Aide | E55 H37 L96 K12 |
| survive | 13 | 20 | 🙂 Final rank: Comfortable | $4483 | Nurse | E55 H14 L93 K29 |
| survive | 14 | 20 | 🙂 Final rank: Comfortable | $4882 | Data Annotator | E64 H24 L100 K37 |
| survive | 15 | 20 | 💼 Final rank: Wealthy | $6193 | Nurse | E41 H59 L94 K16 |
| survive | 16 | 20 | 🙂 Final rank: Comfortable | $4350 | Nursing Aide | E47 H34 L97 K7 |
| survive | 17 | 20 | 💼 Final rank: Wealthy | $7635 | Senior Nurse | E68 H25 L100 K38 |
| survive | 18 | 20 | 💼 Final rank: Wealthy | $5023 | Nurse | E78 H23 L93 K30 |
| survive | 19 | 20 | 🙂 Final rank: Comfortable | $3774 | Nurse | E54 H28 L95 K27 |
| survive | 20 | 14 | Bankrupt | $-139 | Cleaner | E75 H65 L100 K33 |
| random | 101 | 6 | Hospitalised | $76 | Cleaner | E79 H63 L76 K0 |
| random | 102 | 4 | Hospitalised | $130 | Hospital Porter | E33 H40 L69 K7 |
| random | 103 | 4 | Hospitalised | $0 | Crew Member | E0 H75 L88 K11 |
| random | 104 | 4 | Hospitalised | $21 | none | E68 H48 L74 K4 |
| random | 105 | 4 | Hospitalised | $163 | none | E58 H84 L82 K4 |
| random | 106 | 4 | Hospitalised | $49 | Stock Clerk | E34 H76 L92 K4 |
| random | 107 | 6 | Hospitalised | $6 | none | E80 H75 L92 K1 |
| random | 108 | 4 | Hospitalised | $30 | Sorter | E58 H83 L66 K11 |
| random | 109 | 7 | Hospitalised | $1 | Cashier | E71 H82 L36 K0 |
| random | 110 | 4 | Hospitalised | $50 | none | E80 H83 L81 K4 |

## All notes

- SURVIVAL: clothes ran out and new ones were unaffordable (day 6) (2)
- SURVIVAL: clothes ran out and new ones were unaffordable (day 7) (2)
- SURVIVAL: clothes ran out and new ones were unaffordable (day 8) (2)
- SURVIVAL: clothes ran out and new ones were unaffordable (day 9) (2)
- SURVIVAL: clothes ran out and new ones were unaffordable (day 10) (2)
- SURVIVAL: clothes ran out and new ones were unaffordable (day 11) (2)
- SURVIVAL: could not eat on day 11 (cash 0, time left 1440m) (2)
- SURVIVAL: clothes ran out and new ones were unaffordable (day 12) (2)
- SURVIVAL: could not eat on day 12 (cash 0, time left 1440m) (2)
- SURVIVAL: clothes ran out and new ones were unaffordable (day 13) (2)
- SURVIVAL: could not eat on day 13 (cash 0, time left 1440m) (2)

SURVIVAL notes describe the bot missing meals or clothes and are balance signals; they are distinct from technical failures. Targeted regression checks separately cover simultaneous bets, bill-specific rent, overnight recovery and arrears, final-night sampling, and save/reload. These simulations do not guarantee every new social interaction was exercised.
