# Rival personalities and remembered favours simulations single

- Date: 1 November 2026 (Singapore).
- Base: 19d9c5a59b13b0afbc0aa0599f62d58f403c9e48 plus CHANGELOG section 89: Rival personalities and remembered favours.
- index.html SHA-256: f21e91890ded3cc95565eef357359e188b636b220199de300f2024c3210ac763.
- Runtime: Installed Chrome headless on Windows; original tools/qa/sim.js driven unchanged in a fresh browser for each game; external HTTP blocked.
- Settings: 20 careful games, seeds 1–20; 10 random games, seeds 101–110; single-player.
- Raw data: [QA_Sim_2026-11-01_personalities-favours-single.json](QA_Sim_2026-11-01_personalities-favours-single.json).
- Completion: 30/30 games.
- Edge batch attempts closed before completion; this report contains only complete Chrome games. The original simulation bot and checks are unchanged.
- Compared with [the previous build’s single-player results](QA_Sim_2026-10-31_settlement-rent-life-single.md): all 30 saved gameplay results match, including daily net-worth histories, endings, jobs, qualifications, vitals, morale activity counts and issues. Only the clicks field differs in 19 games under browser isolation.

## Technical result

0 technical issue types; 0 top-level page errors.

- survive: 20 games; 💼 Final rank: Wealthy: 12; 🙂 Final rank: Comfortable: 7; Bankrupt: 1. Mean net worth $5216.
- random: 10 games; Hospitalised: 10. Mean net worth $53.

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

## Notes

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

SURVIVAL notes describe the bot missing meals or clothes, a balance signal distinct from technical failures. These runs supplement targeted tests; they do not guarantee every remembered-favour interaction is exercised.
