# Rival personalities and remembered favours simulations rivals

- Date: 1 November 2026 (Singapore).
- Base: 19d9c5a59b13b0afbc0aa0599f62d58f403c9e48 plus CHANGELOG section 89: Rival personalities and remembered favours.
- index.html SHA-256: f21e91890ded3cc95565eef357359e188b636b220199de300f2024c3210ac763.
- Runtime: Installed Chrome headless on Windows; original tools/qa/sim.js driven unchanged in a fresh browser for each game; external HTTP blocked.
- Settings: 20 careful games, seeds 1–20; 0 random games, seeds 101–110; 3 mixed rivals (easy, medium, expert), 30-day games.
- Raw data: [QA_Sim_2026-11-01_personalities-favours-rivals.json](QA_Sim_2026-11-01_personalities-favours-rivals.json).
- Completion: 20/20 games.
- No baseline comparison. Edge batch attempts closed before completion; this report contains only complete Chrome games. The original simulation bot and checks are unchanged.

## Technical result

0 technical issue types; 0 top-level page errors.

- survive: 20 games; 👑 Final rank: Tycoon: 17; 💼 Final rank: Wealthy: 2; Bankrupt: 1. Mean net worth $13955.
- Test-player Life Score place: 1: 10; 2: 9; 3: 1.

## Per game

| Mode | Seed | Last day | Ending | Net worth | Job | Vitals |
|---|---|---|---|---|---|---|
| survive | 1 | 30 | 👑 Final rank: Tycoon | $16732 | Junior Doctor | E55 H36 L98 K51 |
| survive | 2 | 30 | 👑 Final rank: Tycoon | $18917 | Junior Doctor | E64 H54 L94 K53 |
| survive | 3 | 30 | 👑 Final rank: Tycoon | $15367 | Junior Doctor | E60 H40 L94 K57 |
| survive | 4 | 30 | 👑 Final rank: Tycoon | $17022 | Junior Doctor | E100 H65 L100 K40 |
| survive | 5 | 30 | 👑 Final rank: Tycoon | $15631 | Junior Doctor | E60 H41 L94 K56 |
| survive | 6 | 30 | 👑 Final rank: Tycoon | $13732 | Junior Doctor | E45 H33 L94 K55 |
| survive | 7 | 30 | 💼 Final rank: Wealthy | $9212 | Delivery & Install | E91 H50 L99 K64 |
| survive | 8 | 30 | 👑 Final rank: Tycoon | $11589 | Junior Doctor | E43 H40 L94 K59 |
| survive | 9 | 30 | 👑 Final rank: Tycoon | $15389 | Junior Doctor | E71 H60 L100 K41 |
| survive | 10 | 30 | 💼 Final rank: Wealthy | $8834 | Junior Doctor | E98 H64 L100 K53 |
| survive | 11 | 30 | 👑 Final rank: Tycoon | $15046 | Junior Doctor | E91 H60 L98 K50 |
| survive | 12 | 30 | 👑 Final rank: Tycoon | $13561 | Junior Doctor | E60 H43 L94 K58 |
| survive | 13 | 30 | 👑 Final rank: Tycoon | $12798 | Junior Doctor | E54 H41 L98 K57 |
| survive | 14 | 30 | 👑 Final rank: Tycoon | $18170 | Junior Doctor | E91 H61 L100 K50 |
| survive | 15 | 14 | Bankrupt | $-91 | Nursing Aide | E75 H48 L100 K58 |
| survive | 16 | 30 | 👑 Final rank: Tycoon | $19188 | Junior Doctor | E91 H86 L98 K54 |
| survive | 17 | 30 | 👑 Final rank: Tycoon | $12635 | Junior Doctor | E65 H37 L94 K60 |
| survive | 18 | 30 | 👑 Final rank: Tycoon | $18629 | Junior Doctor | E91 H71 L98 K51 |
| survive | 19 | 30 | 👑 Final rank: Tycoon | $14253 | Junior Doctor | E97 H67 L100 K38 |
| survive | 20 | 30 | 👑 Final rank: Tycoon | $12483 | Junior Doctor | E64 H55 L94 K59 |

## Notes

- SURVIVAL: clothes ran out and new ones were unaffordable (day 11) (2)
- SURVIVAL: clothes ran out and new ones were unaffordable (day 12) (2)
- SURVIVAL: clothes ran out and new ones were unaffordable (day 13) (2)
- SURVIVAL: could not eat on day 13 (cash 0, time left 1440m) (1)
- SURVIVAL: could not eat on day 13 (cash 0, time left 1215m) (1)
- SURVIVAL: could not eat on day 25 (cash 20, time left 1230m) (1)

SURVIVAL notes describe the bot missing meals or clothes, a balance signal distinct from technical failures. These runs supplement targeted tests; they do not guarantee every remembered-favour interaction is exercised.
