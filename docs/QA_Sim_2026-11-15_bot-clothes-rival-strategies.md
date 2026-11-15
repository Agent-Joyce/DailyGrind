# Bot clothes reserve and rival strategies: simulations, 15 November 2026

- **What is compared:** the careful bot and AI rivals before and after (1) the bot's clothes reserve (`tools/qa/sim.js`, commit `37fdc37`, approved by the owner) and (2) rival archetypes and playing for Life Score places (CHANGELOG §109, §110).
- **Builds:** before = game `69abb92` (§108) with the old bot (results from [QA_Sim_2026-11-14_package-a-rivals](QA_Sim_2026-11-14_package-a-rivals.md)); after = game `6990c46` (§110) with the bot as committed in `37fdc37` (the bot change was in the working tree, unchanged since, when the runs started). §111 (aims and slips) and §112 (meals from savings) came after these runs and are not in them.
- **Runner:** `node tools/qa/run-sims.js <scratch folder> 10 0 1 101 --rivals=<level> --rival-count=3` (careful player, seeds 1–10, 30 days, three rivals, Competitive town) and `node tools/qa/run-sims.js <scratch folder>` (single: 20 careful from seed 1, 10 random from seed 101). Headless Chromium, network blocked. Page errors: none.
- **Raw results:** [QA_Sim_2026-11-15_bot-clothes-rival-strategies.json](QA_Sim_2026-11-15_bot-clothes-rival-strategies.json).
- Rival dice differ between the builds from the first night, so compare totals, not seed by seed.

## Rival games

| Build | Level | Bot exits before day 30 | Bot Life Score wins | Bot median place | Bot median net worth | Rival median net worth (30-day games) | Rival range | Rivals out | Distinct rival final jobs |
|---|---|---|---|---|---|---|---|---|---|
| 69abb92 | medium | 2 of 10 | 4 | 2 | $13411 | medium $11482 | medium $4436–$22315 | 0 of 30 | 9 |
| 69abb92 | expert | 2 of 10 | 1 | 4 | $9665 | expert $12520 | expert $7244–$23032 | 0 of 30 | 10 |
| 69abb92 | mixed | 4 of 10 | 2 | 3 | $9143 | easy $682, medium $9508, expert $12805 | easy $482–$1885, medium $2849–$20492, expert $5190–$19654 | 0 of 30 | 13 |
| 6990c46 | medium | 0 of 10 | 1 | 2 | $13244 | medium $6459 | medium $953–$29878 | 0 of 30 | 17 |
| 6990c46 | expert | 0 of 10 | 2 | 2 | $11954 | expert $13403 | expert $490–$47630 | 1 of 30 | 17 |
| 6990c46 | mixed | 0 of 10 | 2 | 2 | $12880 | easy $1306, medium $7080, expert $9568 | easy $220–$4018, medium $3116–$24989, expert $3646–$30027 | 0 of 30 | 19 |

Median Life Score points of rivals (after): medium:medium 63, expert:expert 74, mixed:expert 90, mixed:medium 69, mixed:easy 42.

## Findings

1. **The bot no longer drops out.** Early exits went from 8 of 30 rival games to 0 of 30. Seven of the eight earlier exits followed "clothes ran out and new ones were unaffordable" (the eighth gave up on morale on day 9); replacing clothes on their last day and keeping their price back from course fees removed it. The bot's rival-game results are now a fair yardstick.
2. **The bot wins 1–2 of 10 games at every level and places 2nd at the median** (before: 1–4 wins, median place 2–4). It still places last on happiness at every level (median place 4); rivals keep their happiness high and now play for it (§110).
3. **Rivals spread over many careers.** Distinct final jobs across the 30 rivals of a level rose (table, last column); see §109 for the career-line check.
4. **Expert out-scores medium, medium out-scores easy** on Life Score points in mixed games after the change.
5. **One expert rival left the race** (seed 5, day 22, hospitalised for hunger as a Junior Doctor with about $500). Cause: rivals ate only from cash in hand in the morning. Fixed in §112 (meals from savings, or after work).
6. **Single games:** the careful bot reaches day 20 in all 20 games (table below); random players are hospitalised early, as always.

## Single games (after)

| Careful: reached day 20 | Careful median net worth | Careful final ranks | Random endings |
|---|---|---|---|
| 20 of 20 | $5194 | 11 Wealthy, 8 Comfortable, 1 Tycoon | 9 Hospitalised, 1 Bankrupt |

## after: archetypes and playing to win, new bot, medium (`6990c46`)

| Seed | Last day | Ending | Bot net worth | Bot job | Bot place | Rivals (name, level, net worth, job, out) |
|---|---|---|---|---|---|---|
| 1 | 30 | 👑 Final rank: Tycoon | $13267 | Junior Doctor | 2 | Maya medium $12016 Specialist Doctor; Leo medium $1806 Teller; Sam medium $3152 AI Engineer |
| 2 | 30 | 👑 Final rank: Tycoon | $21067 | Junior Doctor | 2 | Maya medium $29878 Regional Logistics Manager; Leo medium $2740 Teller; Sam medium $10519 Social Media Manager |
| 3 | 30 | 👑 Final rank: Tycoon | $13244 | Junior Doctor | 2 | Maya medium $5884 Lab Technician; Leo medium $3775 Data Annotator; Sam medium $15260 AI Engineer |
| 4 | 30 | 👑 Final rank: Tycoon | $13432 | Junior Doctor | 3 | Maya medium $25518 Chief of Surgery; Leo medium $3903 Gym Instructor; Sam medium $25871 Regional Logistics Manager |
| 5 | 30 | 💼 Final rank: Wealthy | $9955 | Junior Doctor | 1 | Maya medium $1028 Teller; Leo medium $953 Repair Technician; Sam medium $2702 Content Assistant |
| 6 | 30 | 👑 Final rank: Tycoon | $16894 | Specialist Doctor | 2 | Maya medium $6675 Lab Technician; Leo medium $7970 Lab Technician; Sam medium $12214 Specialist Doctor |
| 7 | 30 | 👑 Final rank: Tycoon | $12963 | Junior Doctor | 2 | Maya medium $6459 AI Engineer; Leo medium $8931 Regional Logistics Manager; Sam medium $2245 Bookkeeper |
| 8 | 30 | 👑 Final rank: Tycoon | $15287 | Junior Doctor | 2 | Maya medium $17252 Junior Doctor; Leo medium $3341 Data Annotator; Sam medium $6243 Appraiser |
| 9 | 30 | 👑 Final rank: Tycoon | $13201 | Junior Doctor | 3 | Maya medium $11771 Brand Director; Leo medium $15875 Energy Systems Engineer; Sam medium $13502 Specialist Doctor |
| 10 | 30 | 👑 Final rank: Tycoon | $11399 | Junior Doctor | 2 | Maya medium $2256 Repair Technician; Leo medium $14612 Junior Doctor; Sam medium $1505 Supply Chain Planner |

Bot notes: SURVIVAL: clothes ran out and new ones were unaffordable (day N) ×2; SURVIVAL: could not eat on day N ×1.

## after: archetypes and playing to win, new bot, expert (`6990c46`)

| Seed | Last day | Ending | Bot net worth | Bot job | Bot place | Rivals (name, level, net worth, job, out) |
|---|---|---|---|---|---|---|
| 1 | 30 | 👑 Final rank: Tycoon | $17237 | Senior Nurse | 1 | Maya expert $13875 Junior Doctor; Leo expert $10325 Appraiser; Sam expert $3331 Repair Technician |
| 2 | 30 | 👑 Final rank: Tycoon | $22760 | Junior Doctor | 2 | Maya expert $6422 Sales Clerk; Leo expert $10432 Appraiser; Sam expert $18985 Social Media Manager |
| 3 | 30 | 💼 Final rank: Wealthy | $9337 | Senior Nurse | 4 | Maya expert $19965 Senior Nurse; Leo expert $16239 AI Engineer; Sam expert $20570 Pawnbroker |
| 4 | 30 | 👑 Final rank: Tycoon | $10347 | Junior Doctor | 4 | Maya expert $15648 Junior Doctor; Leo expert $13145 Senior Nurse; Sam expert $26603 Regional Logistics Manager |
| 5 | 30 | 👑 Final rank: Tycoon | $11954 | Data Annotator | 3 | Maya expert $490 Junior Doctor (out day 22: was hospitalised (no food)); Leo expert $13698 Chief Technologist; Sam expert $12732 Brand Director |
| 6 | 30 | 👑 Final rank: Tycoon | $26340 | Junior Doctor | 3 | Maya expert $24696 UX Designer; Leo expert $33645 Data Scientist; Sam expert $18033 Data Analyst |
| 7 | 30 | 👑 Final rank: Tycoon | $27077 | Junior Doctor | 2 | Maya expert $13403 Repair Technician; Leo expert $47630 Regional Logistics Manager; Sam expert $5278 Teller |
| 8 | 30 | 💼 Final rank: Wealthy | $9402 | Junior Doctor | 1 | Maya expert $9214 Nurse; Leo expert $3210 Data Annotator; Sam expert $6872 Appraiser |
| 9 | 30 | 💼 Final rank: Wealthy | $8194 | Junior Doctor | 4 | Maya expert $16016 Chief Technologist; Leo expert $13979 Regional Logistics Manager; Sam expert $9645 Junior Doctor |
| 10 | 30 | 👑 Final rank: Tycoon | $12092 | Junior Doctor | 2 | Maya expert $4149 Repair Technician; Leo expert $14362 Junior Doctor; Sam expert $1643 Sales Clerk |

Bot notes: SURVIVAL: could not eat on day N ×4; SURVIVAL: clothes ran out and new ones were unaffordable (day N) ×2.

## after: archetypes and playing to win, new bot, mixed (`6990c46`)

| Seed | Last day | Ending | Bot net worth | Bot job | Bot place | Rivals (name, level, net worth, job, out) |
|---|---|---|---|---|---|---|
| 1 | 30 | 👑 Final rank: Tycoon | $11668 | Junior Doctor | 3 | Maya easy $1306 Grill Cook; Leo medium $8500 General Manager; Sam expert $17544 Chief Technologist |
| 2 | 30 | 👑 Final rank: Tycoon | $22904 | Junior Doctor | 2 | Maya easy $4018 Sales Clerk; Leo medium $4031 Security Guard; Sam expert $24193 Brand Director |
| 3 | 30 | 👑 Final rank: Tycoon | $15185 | Specialist Doctor | 1 | Maya easy $1802 Security Guard; Leo medium $5096 Content Assistant; Sam expert $4853 Bookkeeper |
| 4 | 30 | 💼 Final rank: Wealthy | $8186 | Junior Doctor | 2 | Maya easy $1144 Security Guard; Leo medium $3116 Content Assistant; Sam expert $12950 Regional Logistics Manager |
| 5 | 30 | 👑 Final rank: Tycoon | $18009 | Junior Doctor | 2 | Maya easy $1305 Nursing Aide; Leo medium $7080 Lead Architect; Sam expert $8570 Lead Architect |
| 6 | 30 | 👑 Final rank: Tycoon | $20847 | Junior Doctor | 3 | Maya easy $1467 Delivery & Install; Leo medium $14454 General Manager; Sam expert $30027 Specialist Doctor |
| 7 | 30 | 👑 Final rank: Tycoon | $12880 | Junior Doctor | 2 | Maya easy $1413 Solar Installer; Leo medium $24989 Regional Logistics Manager; Sam expert $3646 Data Analyst |
| 8 | 30 | 👑 Final rank: Tycoon | $15897 | Junior Doctor | 1 | Maya easy $1464 Security Guard; Leo medium $5398 AI Engineer; Sam expert $7257 Appraiser |
| 9 | 30 | 💼 Final rank: Wealthy | $8958 | Junior Doctor | 3 | Maya easy $752 Grill Cook; Leo medium $15009 Regional Logistics Manager; Sam expert $13335 Specialist Doctor |
| 10 | 30 | 👑 Final rank: Tycoon | $10723 | Junior Doctor | 2 | Maya easy $220 Sales Clerk; Leo medium $13604 Junior Doctor; Sam expert $9568 Repair Technician |

Bot notes: SURVIVAL: clothes ran out and new ones were unaffordable (day N) ×4; SURVIVAL: could not eat on day N ×2.
