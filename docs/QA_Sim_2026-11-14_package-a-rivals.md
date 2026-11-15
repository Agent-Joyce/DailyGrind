# Package A rival simulations, 14 November 2026

- **Builds:** base `5ac693b` (CHANGELOG §107 plus the roadmap; first run) and fixed `69abb92` (CHANGELOG §108: rivals no longer starve when their clothes run out). Each result below says which build it belongs to.
- **Runner:** `node tools/qa/run-sims.js <scratch folder> 10 0 1 101 --rivals=<level> --rival-count=3`, headless Chromium (Playwright) in the cloud container, network blocked. Careful player only: 10 games per level, seeds 1–10, 30-day games, three rivals, Competitive town (default).
- **Raw results:** [QA_Sim_2026-11-14_package-a-rivals.json](QA_Sim_2026-11-14_package-a-rivals.json) (all six batches, labelled).
- **Page errors:** none in any batch.

## Summary

| Build | Level | Bot exits before day 30 | Bot Life Score wins | Bot median net worth | Rival median net worth (30-day games) | Rival range (30-day games) | Rivals out of the race |
|---|---|---|---|---|---|---|---|
| 5ac693b | medium | 4 of 10 | 2 | $9192 | medium $6549 | medium $-173–$29305 | 7 of 30 |
| 5ac693b | expert | 2 of 10 | 1 | $9238 | expert $21081 | expert $-159–$35546 | 10 of 30 |
| 5ac693b | mixed | 2 of 10 | 1 | $10168 | easy $903, medium $11079, expert $22652 | easy $659–$1798, medium $-141–$41948, expert $-159–$63647 | 5 of 30 |
| 69abb92 | medium | 2 of 10 | 4 | $13411 | medium $11482 | medium $4436–$22315 | 0 of 30 |
| 69abb92 | expert | 2 of 10 | 1 | $9665 | expert $12520 | expert $7244–$23032 | 0 of 30 |
| 69abb92 | mixed | 4 of 10 | 2 | $9143 | easy $682, medium $9508, expert $12805 | easy $482–$1885, medium $2849–$20492, expert $5190–$19654 | 0 of 30 |

## Findings

1. **Rivals starved when their clothes ran out (bug, fixed in §108).** On the base build 22 of 90 rivals (medium 7, expert 10, mixed 5) left the race, all through bankruptcy or hospital for hunger; every dropout traced (in an overnight harness, 8 cases) followed days with no clothes. Paying a course fee, a rent night and paying for treatment after sick days each left a rival short of the $100 for a new set; without clothes a rival can neither work nor take delivery runs. On the fixed build no rival leaves the race.
2. **The careful bot falls into the same spiral (bot weakness, not changed).** It leaves early in 2–4 of 10 rival games on both builds. Every early exit follows a large spend (a degree fee) and then "clothes ran out and new ones were unaffordable". It does not happen in the 20-day single games (0 of 20). The legacy bot keeps no clothes reserve.
3. **Every planning rival still climbs one ladder.** Final jobs on the fixed build are mostly Junior Doctor, Specialist Doctor, Senior Nurse and Chief of Surgery (Medicine). Package B item 22 (archetypes) addresses this.
4. **Level spread.** On the fixed build easy rivals end at about $500–$1,900 (no threat), medium and expert rivals end close to each other (about $4,400–$23,000 against the $10,000 top rank), and in mixed games the medium rival out-scored the expert on median Life Score points (n=10). The retune proposal is built on these numbers and an overnight sweep (CHANGELOG §108).

## The bot's Life Score places (fixed build, median place per category)

- medium: wealth 1, career 1, happiness 4, education 2, health 1, stability 4, first 1, rep 2
- expert: wealth 3, career 1, happiness 4, education 1, health 1, stability 4, first 1, rep 3
- mixed: wealth 3, career 2, happiness 4, education 1, health 1, stability 4, first 1, rep 3

The bot places last on happiness and stability (crisis days) at every level; it does well on career, health and first to the line.

## base build, medium (`5ac693b`)

| Seed | Last day | Ending | Bot net worth | Bot job | Bot place | Rivals (name, level, net worth, job, out) |
|---|---|---|---|---|---|---|
| 1 | 11 | Hospitalised | $20 | Hospital Porter | 4 | Maya medium $-129 Nursing Aide; Leo medium $511 Nurse; Sam medium $501 Nurse |
| 2 | 11 | Hospitalised | $16 | none | 4 | Maya medium $187 Sales Clerk; Leo medium $714 Sales Clerk; Sam medium $186 Sales Clerk |
| 3 | 9 | You gave up | $230 | Hospital Porter | 4 | Maya medium $495 Nursing Aide; Leo medium $507 Nursing Aide; Sam medium $570 Nursing Aide |
| 4 | 30 | 💼 Final rank: Wealthy | $9192 | Security Guard | 3 | Maya medium $-163 Nursing Aide (out day 11: was hospitalised (no food)); Leo medium $16596 Specialist Doctor; Sam medium $13332 Specialist Doctor |
| 5 | 30 | 👑 Final rank: Tycoon | $13607 | Junior Doctor | 3 | Maya medium $12522 Junior Doctor; Leo medium $15491 Specialist Doctor; Sam medium $16082 Specialist Doctor |
| 6 | 30 | 👑 Final rank: Tycoon | $11868 | Junior Doctor | 1 | Maya medium $-131 Nursing Aide (out day 12: went bankrupt); Leo medium $4815 Data Annotator; Sam medium $4158 Data Annotator |
| 7 | 30 | 👑 Final rank: Tycoon | $15653 | Junior Doctor | 2 | Maya medium $-141 Nursing Aide (out day 12: went bankrupt); Leo medium $-169 Nursing Aide (out day 12: went bankrupt); Sam medium $29143 Chief of Surgery |
| 8 | 30 | 👑 Final rank: Tycoon | $15150 | Junior Doctor | 1 | Maya medium $7042 Repair Technician; Leo medium $6549 Repair Technician; Sam medium $-135 Delivery & Install (out day 11: went bankrupt) |
| 9 | 14 | Bankrupt | $-92 | Nursing Aide | 3 | Maya medium $-146 Nursing Aide (out day 12: went bankrupt); Leo medium $443 Nurse; Sam medium $300 Nursing Aide |
| 10 | 30 | 👑 Final rank: Tycoon | $11276 | Junior Doctor | 3 | Maya medium $27119 Chief of Surgery; Leo medium $-173 Nursing Aide (out day 12: went bankrupt); Sam medium $29305 Chief of Surgery |

Bot notes: SURVIVAL: clothes ran out and new ones were unaffordable (day N) ×26; SURVIVAL: could not eat on day N ×14.

## base build, expert (`5ac693b`)

| Seed | Last day | Ending | Bot net worth | Bot job | Bot place | Rivals (name, level, net worth, job, out) |
|---|---|---|---|---|---|---|
| 1 | 30 | 👑 Final rank: Tycoon | $10990 | Warehouse Picker | 3 | Maya expert $-130 Nursing Aide (out day 12: went bankrupt); Leo expert $35546 Chief of Surgery; Sam expert $33255 Chief of Surgery |
| 2 | 11 | Hospitalised | $19 | Cleaner | 4 | Maya expert $310 Sales Clerk; Leo expert $199 Sales Clerk; Sam expert $227 Sales Clerk |
| 3 | 18 | Hospitalised | $-145 | Nursing Aide | 4 | Maya expert $-154 Nursing Aide (out day 12: went bankrupt); Leo expert $243 Nurse; Sam expert $24 Nursing Aide (out day 9: was hospitalised (no food)) |
| 4 | 30 | 💼 Final rank: Wealthy | $9238 | Junior Doctor | 4 | Maya expert $22662 Chief of Surgery; Leo expert $23625 Chief of Surgery; Sam expert $23707 Chief of Surgery |
| 5 | 30 | 💼 Final rank: Wealthy | $6235 | General Manager | 4 | Maya expert $25731 none; Leo expert $32205 Chief of Surgery; Sam expert $28601 Chief of Surgery |
| 6 | 30 | 👑 Final rank: Tycoon | $13672 | Junior Doctor | 3 | Maya expert $31799 Chief of Surgery; Leo expert $17411 Machine Learning Lead; Sam expert $-127 Data Annotator (out day 12: went bankrupt) |
| 7 | 30 | 👑 Final rank: Tycoon | $17805 | Junior Doctor | 2 | Maya expert $-130 Repair Technician (out day 10: was hospitalised (no food)); Leo expert $33440 Chief of Surgery; Sam expert $-150 Repair Technician (out day 26: was hospitalised (no food)) |
| 8 | 30 | 👑 Final rank: Tycoon | $14613 | Junior Doctor | 1 | Maya expert $8 Repair Technician (out day 9: was hospitalised (no food)); Leo expert $7175 Repair Technician; Sam expert $-144 Delivery & Install (out day 12: went bankrupt) |
| 9 | 30 | 👑 Final rank: Tycoon | $11234 | Junior Doctor | 4 | Maya expert $22813 Chief of Surgery; Leo expert $20759 Chief of Surgery; Sam expert $21081 Chief of Surgery |
| 10 | 30 | 💼 Final rank: Wealthy | $6281 | Delivery & Install | 2 | Maya expert $23467 Chief of Surgery; Leo expert $-123 Nursing Aide (out day 12: went bankrupt); Sam expert $-159 Nursing Aide (out day 12: went bankrupt) |

Bot notes: SURVIVAL: clothes ran out and new ones were unaffordable (day N) ×26; SURVIVAL: could not eat on day N ×12.

## base build, mixed (`5ac693b`)

| Seed | Last day | Ending | Bot net worth | Bot job | Bot place | Rivals (name, level, net worth, job, out) |
|---|---|---|---|---|---|---|
| 1 | 30 | 💼 Final rank: Wealthy | $9692 | General Manager | 2 | Maya easy $1196 Solar Installer; Leo medium $-129 Nursing Aide (out day 12: went bankrupt); Sam expert $28104 Chief of Surgery |
| 2 | 14 | Bankrupt | $-126 | none | 4 | Maya easy $837 Sales Clerk; Leo medium $95 Hospital Porter; Sam expert $545 Sales Clerk |
| 3 | 30 | 👑 Final rank: Tycoon | $12709 | Junior Doctor | 1 | Maya easy $1798 Thrift Store Manager; Leo medium $26 Security Guard (out day 14: was hospitalised (no food)); Sam expert $-122 Security Guard (out day 15: was hospitalised (no food)) |
| 4 | 30 | 👑 Final rank: Tycoon | $10168 | Junior Doctor | 2 | Maya easy $753 Security Guard; Leo medium $-141 Nursing Aide (out day 11: was hospitalised (no food)); Sam expert $22652 Chief of Surgery |
| 5 | 30 | 👑 Final rank: Tycoon | $16065 | Specialist Doctor | 2 | Maya easy $742 Gym Instructor; Leo medium $13589 Specialist Doctor; Sam expert $22359 Specialist Doctor |
| 6 | 30 | 👑 Final rank: Tycoon | $16287 | Junior Doctor | 3 | Maya easy $903 Delivery & Install; Leo medium $41948 Chief of Surgery; Sam expert $63647 Chief of Surgery |
| 7 | 10 | Bankrupt | $-206 | none | 4 | Maya easy $445 Delivery & Install; Leo medium $605 Nursing Aide; Sam expert $628 Nursing Aide |
| 8 | 30 | 👑 Final rank: Tycoon | $16062 | Junior Doctor | 2 | Maya easy $1048 Gym Instructor; Leo medium $19593 Specialist Doctor; Sam expert $-159 Delivery & Install (out day 10: went bankrupt) |
| 9 | 30 | 💼 Final rank: Wealthy | $9567 | Junior Doctor | 3 | Maya easy $916 Grill Cook; Leo medium $11079 Specialist Doctor; Sam expert $25522 Chief of Surgery |
| 10 | 30 | 👑 Final rank: Tycoon | $17727 | Specialist Doctor | 3 | Maya easy $659 Sales Clerk; Leo medium $34321 Chief of Surgery; Sam expert $42953 Chief of Surgery |

Bot notes: SURVIVAL: clothes ran out and new ones were unaffordable (day N) ×22; SURVIVAL: could not eat on day N ×10.

## fixed build, medium (`69abb92`)

| Seed | Last day | Ending | Bot net worth | Bot job | Bot place | Rivals (name, level, net worth, job, out) |
|---|---|---|---|---|---|---|
| 1 | 30 | 💼 Final rank: Wealthy | $9002 | General Manager | 4 | Maya medium $11482 Specialist Doctor; Leo medium $12230 Specialist Doctor; Sam medium $12263 Specialist Doctor |
| 2 | 30 | 👑 Final rank: Tycoon | $20911 | Junior Doctor | 1 | Maya medium $4436 Sales Clerk; Leo medium $9786 Content Assistant; Sam medium $9191 Content Assistant |
| 3 | 9 | You gave up | $279 | Security Guard | 4 | Maya medium $464 Security Guard; Leo medium $459 Security Guard; Sam medium $517 Security Guard |
| 4 | 30 | 👑 Final rank: Tycoon | $14924 | Specialist Doctor | 1 | Maya medium $11808 Specialist Doctor; Leo medium $9750 Specialist Doctor; Sam medium $11751 Specialist Doctor |
| 5 | 30 | 💼 Final rank: Wealthy | $8806 | General Manager | 4 | Maya medium $10855 Specialist Doctor; Leo medium $10557 Specialist Doctor; Sam medium $11387 Specialist Doctor |
| 6 | 30 | 👑 Final rank: Tycoon | $18590 | Junior Doctor | 4 | Maya medium $14085 Junior Doctor; Leo medium $22315 Machine Learning Lead; Sam medium $20691 Lead Architect |
| 7 | 30 | 👑 Final rank: Tycoon | $16561 | Specialist Doctor | 1 | Maya medium $14212 Specialist Doctor; Leo medium $14434 Specialist Doctor; Sam medium $14232 Specialist Doctor |
| 8 | 30 | 👑 Final rank: Tycoon | $23575 | Specialist Doctor | 1 | Maya medium $16400 Specialist Doctor; Leo medium $16084 Specialist Doctor; Sam medium $6348 Repair Technician |
| 9 | 18 | Hospitalised | $-155 | Warehouse Picker | 4 | Maya medium $633 Nurse; Leo medium $561 Nurse; Sam medium $898 Nurse |
| 10 | 30 | 👑 Final rank: Tycoon | $13411 | Junior Doctor | 2 | Maya medium $10403 Junior Doctor; Leo medium $8587 Junior Doctor; Sam medium $8652 Junior Doctor |

Bot notes: SURVIVAL: clothes ran out and new ones were unaffordable (day N) ×14; SURVIVAL: could not eat on day N ×6.

## fixed build, expert (`69abb92`)

| Seed | Last day | Ending | Bot net worth | Bot job | Bot place | Rivals (name, level, net worth, job, out) |
|---|---|---|---|---|---|---|
| 1 | 30 | 👑 Final rank: Tycoon | $17064 | Specialist Doctor | 2 | Maya expert $13162 Specialist Doctor; Leo expert $18016 Specialist Doctor; Sam expert $14221 Specialist Doctor |
| 2 | 30 | 👑 Final rank: Tycoon | $22132 | Junior Doctor | 4 | Maya expert $23032 Boutique Manager; Leo expert $16031 Boutique Manager; Sam expert $16567 Boutique Manager |
| 3 | 30 | 👑 Final rank: Tycoon | $11810 | Junior Doctor | 3 | Maya expert $9625 Junior Doctor; Leo expert $9853 Senior Nurse; Sam expert $11666 Senior Nurse |
| 4 | 12 | Hospitalised | $-132 | Nursing Aide | 4 | Maya expert $908 Nursing Aide; Leo expert $395 Nursing Aide; Sam expert $862 Nursing Aide |
| 5 | 30 | 🙂 Final rank: Comfortable | $3801 | Teller | 4 | Maya expert $11880 Senior Nurse; Leo expert $10104 Junior Doctor; Sam expert $13287 Senior Nurse |
| 6 | 14 | Bankrupt | $-152 | Nursing Aide | 4 | Maya expert $761 Nurse; Leo expert $576 Nursing Aide; Sam expert $544 Nursing Aide |
| 7 | 30 | 💼 Final rank: Wealthy | $9840 | Junior Doctor | 4 | Maya expert $12769 Design Engineer; Leo expert $17378 Specialist Doctor; Sam expert $16682 AI Engineer |
| 8 | 30 | 💼 Final rank: Wealthy | $9665 | Junior Doctor | 3 | Maya expert $8355 Repair Technician; Leo expert $15568 Senior Nurse; Sam expert $9759 Repair Technician |
| 9 | 30 | 💼 Final rank: Wealthy | $9661 | Junior Doctor | 1 | Maya expert $8039 Junior Doctor; Leo expert $7244 Senior Nurse; Sam expert $7903 Senior Nurse |
| 10 | 30 | 👑 Final rank: Tycoon | $12361 | Junior Doctor | 4 | Maya expert $12520 none; Leo expert $16717 Specialist Doctor; Sam expert $12411 Junior Doctor |

Bot notes: SURVIVAL: clothes ran out and new ones were unaffordable (day N) ×19; SURVIVAL: could not eat on day N ×9.

## fixed build, mixed (`69abb92`)

| Seed | Last day | Ending | Bot net worth | Bot job | Bot place | Rivals (name, level, net worth, job, out) |
|---|---|---|---|---|---|---|
| 1 | 24 | Bankrupt | $-154 | Nurse | 3 | Maya easy $1027 Repair Technician; Leo medium $2000 Security Guard; Sam expert $4536 Junior Doctor |
| 2 | 13 | Hospitalised | $-118 | Hospital Porter | 4 | Maya easy $564 Sales Clerk; Leo medium $938 Sales Clerk; Sam expert $502 Sales Clerk |
| 3 | 30 | 👑 Final rank: Tycoon | $14350 | Junior Doctor | 1 | Maya easy $1885 Repair Technician; Leo medium $6881 Appraiser; Sam expert $13900 Appraiser |
| 4 | 30 | 👑 Final rank: Tycoon | $14475 | Junior Doctor | 2 | Maya easy $682 Security Guard; Leo medium $14292 Specialist Doctor; Sam expert $11892 Junior Doctor |
| 5 | 30 | 👑 Final rank: Tycoon | $10099 | Junior Doctor | 2 | Maya easy $657 Sales Clerk; Leo medium $9508 Senior Nurse; Sam expert $12868 Specialist Doctor |
| 6 | 14 | Bankrupt | $-4 | Nursing Aide | 3 | Maya easy $820 Delivery & Install; Leo medium $837 Nursing Aide; Sam expert $919 Lab Technician |
| 7 | 30 | 💼 Final rank: Wealthy | $9143 | Junior Doctor | 4 | Maya easy $482 Delivery & Install; Leo medium $20492 Chief of Surgery; Sam expert $19654 Specialist Doctor |
| 8 | 30 | 👑 Final rank: Tycoon | $11791 | Senior Nurse | 1 | Maya easy $903 Content Assistant; Leo medium $2849 Repair Technician; Sam expert $5190 Repair Technician |
| 9 | 18 | Hospitalised | $-141 | Security Guard | 3 | Maya easy $894 Security Guard; Leo medium $1690 Senior Nurse; Sam expert $1122 Nurse |
| 10 | 30 | 💼 Final rank: Wealthy | $9462 | Junior Doctor | 3 | Maya easy $874 Content Assistant; Leo medium $11553 Junior Doctor; Sam expert $12805 Senior Nurse |

Bot notes: SURVIVAL: clothes ran out and new ones were unaffordable (day N) ×54; SURVIVAL: could not eat on day N ×20.

SURVIVAL notes describe the bot missing meals or clothes, a balance signal, not a script failure. Seeded runs repeat exactly on the same build; the two builds draw rival dice differently once a rival first replaces its clothes early, so compare them by totals, not seed by seed.
