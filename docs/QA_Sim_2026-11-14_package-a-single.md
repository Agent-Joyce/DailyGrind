# Package A single-game simulations, 14 November 2026

- **Builds:** base `5ac693b` (§107 plus the roadmap) and fixed `69abb92` (§108). The §108 fixes change rival games and add a bank-screen guard; single games draw the same dice on both builds.
- **Runner:** `node tools/qa/run-sims.js <scratch folder>` (defaults: 20 careful games from seed 1, 10 random from seed 101, single mode, 20 days), headless Chromium, network blocked.
- **Raw results:** [QA_Sim_2026-11-14_package-a-single.json](QA_Sim_2026-11-14_package-a-single.json).

## Summary

| Build | Page errors | Careful: reached day 20 | Careful: final ranks | Careful median net worth | Random: endings |
|---|---|---|---|---|---|
| 5ac693b | 4 × "Cannot read properties of null (reading 'classList')" in 3 random games (fixed in §108) | 20 of 20 | 8 Wealthy, 11 Comfortable, 1 Tycoon | $4699 | 9 Hospitalised, 1 Bankrupt |
| 69abb92 | none | 20 of 20 | 8 Wealthy, 11 Comfortable, 1 Tycoon | $4699 | 9 Hospitalised, 1 Bankrupt |

## Findings

1. **Script error on the bank screen (bug, fixed in §108).** The random player pressed Deposit or Withdraw on a bank product card that was not on show; `modernPaintAmount()` then read a missing amount hint. A person cannot press a hidden button, but the handler now ignores such a card.
2. **The careful player is comfortable in a single game.** All 20 reach day 20, with final jobs in nursing and medicine. Two games record a missed meal on day 17.
3. **Random players are hospitalised by day 4–9**, as in every earlier report (they do not eat on purpose). Not a bug.

## Per game (fixed build `69abb92`)

| Mode | Seed | Last day | Ending | Net worth | Job | Vitals | Notes |
|---|---|---|---|---|---|---|---|
| survive | 1 | 20 | 💼 Final rank: Wealthy | $5977 | Senior Nurse | E50 H11 L97 K42 |  |
| survive | 2 | 20 | 💼 Final rank: Wealthy | $5094 | Lab Technician | E29 H27 L99 K15 |  |
| survive | 3 | 20 | 🙂 Final rank: Comfortable | $4492 | Junior Doctor | E55 H47 L93 K73 |  |
| survive | 4 | 20 | 🙂 Final rank: Comfortable | $4699 | Nurse | E63 H46 L91 K40 |  |
| survive | 5 | 20 | 💼 Final rank: Wealthy | $5744 | Nurse | E73 H49 L100 K25 |  |
| survive | 6 | 20 | 🙂 Final rank: Comfortable | $4429 | Nurse | E40 H45 L94 K18 |  |
| survive | 7 | 20 | 🙂 Final rank: Comfortable | $3723 | Nurse | E52 H27 L91 K31 |  |
| survive | 8 | 20 | 💼 Final rank: Wealthy | $8293 | Senior Nurse | E49 H32 L100 K45 | SURVIVAL: could not eat on day 17 (cash 13, time left 1440m) |
| survive | 9 | 20 | 🙂 Final rank: Comfortable | $4589 | Senior Nurse | E46 H60 L100 K48 |  |
| survive | 10 | 20 | 🙂 Final rank: Comfortable | $4695 | Lab Technician | E80 H60 L94 K16 |  |
| survive | 11 | 20 | 🙂 Final rank: Comfortable | $4666 | Nurse | E61 H42 L100 K25 |  |
| survive | 12 | 20 | 💼 Final rank: Wealthy | $6185 | Senior Nurse | E94 H59 L100 K28 |  |
| survive | 13 | 20 | 🙂 Final rank: Comfortable | $4058 | Nurse | E68 H22 L91 K33 |  |
| survive | 14 | 20 | 🙂 Final rank: Comfortable | $4755 | Senior Nurse | E50 H51 L100 K36 | SURVIVAL: could not eat on day 17 (cash 0, time left 1440m) |
| survive | 15 | 20 | 💼 Final rank: Wealthy | $6347 | Senior Nurse | E76 H55 L100 K26 |  |
| survive | 16 | 20 | 🙂 Final rank: Comfortable | $2511 | Nurse | E100 H92 L100 K32 |  |
| survive | 17 | 20 | 💼 Final rank: Wealthy | $7255 | Senior Nurse | E54 H14 L97 K39 |  |
| survive | 18 | 20 | 💼 Final rank: Wealthy | $7199 | Senior Nurse | E56 H26 L97 K39 |  |
| survive | 19 | 20 | 👑 Final rank: Tycoon | $10475 | Nurse | E61 H40 L93 K23 |  |
| survive | 20 | 20 | 🙂 Final rank: Comfortable | $4200 | Junior Doctor | E55 H44 L100 K66 |  |
| random | 101 | 4 | Hospitalised | $208 | none | E80 H63 L74 K6 |  |
| random | 102 | 4 | Hospitalised | $23 | none | E80 H47 L74 K7 |  |
| random | 103 | 9 | Bankrupt | $-58 | Delivery & Install | E58 H71 L89 K1 |  |
| random | 104 | 4 | Hospitalised | $137 | Kitchen Hand | E53 H46 L68 K9 |  |
| random | 105 | 4 | Hospitalised | $123 | none | E51 H75 L82 K4 |  |
| random | 106 | 4 | Hospitalised | $0 | none | E80 H85 L100 K4 |  |
| random | 107 | 4 | Hospitalised | $4 | none | E80 H77 L83 K4 |  |
| random | 108 | 4 | Hospitalised | $0 | Counter Assistant | E55 H74 L62 K11 |  |
| random | 109 | 7 | Hospitalised | $-65 | Counter Assistant | E75 H69 L79 K5 |  |
| random | 110 | 4 | Hospitalised | $140 | none | E80 H85 L87 K4 |  |
