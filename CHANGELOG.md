# Daily Grind: Changelog

Changes made in this project. The game is the single file `index.html`. (`Daily Grind v42.html`, an identical copy kept earlier, has been removed from the repo.)

Everything adjustable lives in the `CONFIG` block near the top of the script: `CONFIG.time`, `CONFIG.food`, `CONFIG.burnout`, `CONFIG.loan`, `CONFIG.bankrupt`, `CONFIG.market`, `CONFIG.sleep`, `CONFIG.health`.

## Contents

1. [Jobs: School and Bank](#1-jobs-school-and-bank)
2. [Qualification review](#2-qualification-review)
3. [School pathways](#3-school-pathways)
4. [Pay](#4-pay)
5. [Work, burnout and food](#5-work-burnout-and-food)
6. [Loans](#6-loans)
7. [Bankrupt rule](#7-bankrupt-rule)
8. [UI fixes](#8-ui-fixes)
9. [Testing done](#9-testing-done)
10. [Economy, events and health](#10-economy-events-and-health)
11. [Known open issues](#11-known-open-issues)
12. [2,000-game re-run](#12-2000-game-re-run)

---

## 1. Jobs: School and Bank

- Removed all School jobs: School (Janitor, Lab Assistant, Tutor, Lecturer) and School (Staff) (Library Assistant, Admin Clerk, Careers Counsellor). The School building stays for lessons.
- Removed the Bank (Branch) job line (Customer Service Officer, Loan Officer).
- Bank ladder is now: Security Guard, Teller, Financial Analyst, Investment Associate, Tech Developer (was Fund Manager), Branch Manager (now the top bank role).
- Old saves: Fund Manager becomes Tech Developer; jobs on removed lines are dropped so the game does not crash on load.

## 2. Qualification review

Unrelated filler qualifications were removed and supporting ones added where they fit the job.

| Role | Qualifications |
|---|---|
| Teller | Finance Cert + Sales Cert |
| Investment Associate | Finance Degree + Sales Degree + Tech Cert |
| Tech Developer | Tech Masters + Finance Degree |
| Branch Manager | Finance Masters + Sales Degree + Tech Cert |
| Waiter | Sales Cert |
| Master Chef | F&B Degree + Finance Degree |
| Restaurant Manager | F&B Degree + Sales Degree + Finance Cert |
| Store Manager (Fast Food) | F&B Cert + Sales Cert |
| Appraiser | Finance Cert + Sales Cert |
| Quality Inspector | Eng Cert + Tech Cert |
| Repair Technician (Electronics) | Eng Cert + Tech Cert |
| Nurse | Medicine Degree |
| Senior Nurse | Medicine Degree + Tech Cert |
| Junior Doctor | Medicine Honours |
| Specialist Registrar | Medicine Masters + Tech Cert |
| Consultant | Medicine Masters + Finance Degree |
| Chief of Surgery | Medicine Masters + Finance Degree + Tech Cert |
| Lab Technician | Medicine Cert + Tech Cert |
| Hospital Administrator | Finance Degree + Medicine Degree + Tech Cert |
| Software Developer | Tech Degree |
| AI Engineer | Tech Degree + Finance Cert |
| Lead Architect | Tech Masters + Eng Degree + Finance Cert |
| Chief Technologist | Tech Masters + Eng Honours + Finance Cert |
| Senior Engineer | Eng Degree + Tech Degree + Finance Cert |
| Principal Engineer | Eng Masters + Tech Cert + Finance Cert |
| Chief Engineer | Eng Masters + Tech Degree + Finance Cert |
| Project Lead | Eng Honours + Tech Degree + Finance Cert |

## 3. School pathways

- Removed Doctorate (Technology, Engineering, Medicine) and Specialist (Medicine). Every course now ends at Masters (Sales and Food & Beverage end at Degree).
- Merged Diploma into Degree and removed Diploma everywhere (courses, job requirements, text).
- Modules per level: 2 to 4. Merged Degrees have 4 modules (Sales gained "Merchandising").
- Lessons per module: 2 to 4 (Certificate 2, Degree 3, Honours 3, Masters 4), each lesson 1 to 3 hours.
- Job knowledge requirement follows the highest qualification: Degree 20, Honours 35, Masters 50 (`CONFIG.jobs.knowledgeByLevel`).
- Old saves are converted (Diploma holders become Degree holders; part-done study is reset).
- Starting education label: "High School Diploma" became "High School".
- Expulsion: the "enrolled" flag clears overnight when no qualification is in progress, so graduates are no longer warned or expelled. Students who skip lessons are still warned on day 3 and expelled on day 5 to 6.

## 4. Pay

Pay was rebalanced so a job that pays more needs at least as much study.

**Main changes (old to new, per shift):** Visual Merchandiser 160 to 150, Data Annotator 160 to 150, Personal Stylist 180 to 150, Technician 200 to 180, Lab Technician 190 to 180, Store Manager 170 to 180, Software Developer 240 to 210, Sommelier 200 to 210, Design Engineer 260 to 250, Boutique Manager 260 to 250, Logistics Manager 290 to 250, Operations Assistant 260 to 250, AI Engineer 320 to 290, Pawnbroker 250 to 290, Restaurant Manager 280 to 310, Junior Doctor 380 to 330, Senior Engineer 320 to 330, Sales Director 330 to 350, Tech Developer 440 to 410, Specialist Registrar 470 to 430 then 460, Project Lead 380 to 430 then 400, Branch Manager 360 to 480 to 450, Lead Architect 420 to 450, Principal Engineer 450 to 500 to 480.

**Large raises for the four top roles (formerly Doctorate / Specialist):**

| Role | Old | New |
|---|---|---|
| Consultant | 450 | 620 |
| Chief Technologist | 500 | 660 |
| Chief Engineer | 560 | 700 |
| Chief of Surgery | 720 | 900 |

**Shift length** (`CONFIG.time.shifts`): senior roles now work shorter shifts, so pay per hour always rises with pay (checked across all 79 roles and every ladder).

| Shift pay | Shift length | Energy | Pay per hour |
|---|---|---|---|
| under $130 | 5h30 | 10% | $12 to $23 |
| $130 to $249 | 4h45 | 8% | $27 to $52 |
| $250 to $449 | 4h15 | 8% | $59 to $106 |
| $450 and up | 3h30 | 6% | $129 and up |

Before, shifts got longer with pay (up to 9h), so a $250 job paid less per hour than a $240 job.

## 5. Work, burnout and food

- **Work cap:** at most 12 hours of shifts a day (`CONFIG.time.maxWorkMinutes = 720`). A refused shift explains why. Each workplace shows "Worked today: Xh of 12h".
- **Burnout from overwork:** working 9 hours or more a day for 3 days in a row triggers burnout, like heavy studying (-15 health, -20% pay for 3 days). Warning the day before. `CONFIG.burnout.workMinutes = 540`, `workDaysInARow = 3`.
- **Meals give about 35% less energy** (`CONFIG.food`): basic groceries 35 to 22, premium 45 to 30, burger 10 to 6, combo 20 to 12, dinner 25 to 16, tasting menu 40 to 26.
- Rules screen text for the work limit and burnout is built from the config.

## 6. Loans

New Loan card on the Bank screen. All settings are in `CONFIG.loan`.

- Borrow in $50 steps. Credit limit = $1,000 + 2 x (cash + savings + investments), never more than $5,000. The limit and formula are shown on the card.
- Choose 3, 5 or 10 days at 4%, 5% or 6% simple interest a day on the principal still owed, only for the days you keep the loan.
- Repay any time, in part or in full, from cash only (interest first, then principal).
- After the due date the whole balance grows 8% a day, compounding.
- **Loan default (game over)** if you owe more than $10,000, or have not repaid in full 5 days after the due date.
- One loan at a time; no new loan until it is paid off.
- What you owe is subtracted from net worth, so borrowing does not inflate the score.
- The card shows the amount borrowed, what you owe now (principal + interest), the due date and any overdue warning. Morning notes and warnings track the due date. The Rules screen explains loans and default.
- Arranging a loan takes 15 minutes. Interest is rounded to whole dollars a night.

## 7. Bankrupt rule

- **Old:** net worth of -$200 or lower ended the game at once.
- **New** (`CONFIG.bankrupt`): net worth under $500 at the end of 3 days in a row, counted from day 5 (`fromDay = 5`; the earliest bankruptcy is the end of day 7). Warnings appear after the first and second day.
- Counted from day 1, this ended about 60% of simulated games on day 4, which is why a start day was added.

## 8. UI fixes

- Removed the permanently hidden bottom-sheet toggle (`#sheetbar`) with its styling and code.
- Removed two hidden duplicate "End day" buttons. The top-bar "End day" and "Leave" buttons remain and work at 0 minutes left.
- **Negative cash bug fixed** (it froze the game or starved the player):
  - "Rent increase" now takes at most the cash you have.
  - Free actions (work, study, interviews, rest) no longer check cash when they cost nothing.
  - Story and Yes/No events treat negative cash as $0, so the free "decline" options stay clickable and the day can always end.
- **Pay shown now matches pay received.** The Work row and Preview popup show the real shift pay: base x wage/price index x (1 + knowledge/400) x any penalty (tired, hungry, low morale, ill, burnout, poor health) + $15 with work gloves. When a penalty applies the row says "(includes x85% penalty)". The job board keeps showing base pay, with the note "Base pay. Your actual pay varies with knowledge and condition."

## 9. Testing done

- 287 enabled buttons clicked in 34 game states; 285 real-mouse clicks at desktop and phone sizes; all 15 buildings, popups and 23 daily event types worked.
- 225 text-vs-logic checks (217 matched at the time).
- 2,000 simulated games with a bot (91% reached $2,000, 8.8% ended early). This was the first build, before sections 5 to 8.
- 21 loan checks and 3 bankrupt-rule checks passed.
- A QA report page was published as a private artifact. It describes the build before sections 5 to 8. A copy is in the repo at [`docs/QA_Report.html`](docs/QA_Report.html).

## 10. Economy, events and health

### Savings and investments follow the economy (loan stays fixed)

- Every macro shock and storyline now moves the savings rate (before, only about half did). Wars, tightening, inflation and currency crises push it up; QE, pandemics, housing crashes, deflation and financial crises push it down.
- Fixed deposit follows the savings rate (rate x 1.4). ETF, hedge fund and crypto follow market mood and are also pulled down when interest is above normal (and lifted when below): `CONFIG.market.rateBeta` (ETF 0.3, hedge fund 0.4, crypto 0.6 per point above normal).
- With no news pushing interest, the rate drifts back to normal (`rateBase = 1.0`, `rateReversion` = 10% of the gap each morning). Before, a rate moved by news stayed there forever.
- The Bank screen has a news line: which story is moving rates and markets, the market mood, and that loan rates are fixed. The Savings and investment cards say their return moves with the economy.
- Loan rates (`CONFIG.loan`) are never touched by news. Checked over 740 simulated days.

### End-of-day events vs your stats

- Audited 1,500 random end-of-day events. The cash, happiness, energy and knowledge numbers shown matched the real change every time.
- Gap found: no event could change health. Added a health effect and used it on health-themed outcomes: gym membership (+3), masks and sanitiser (+2, or -2 if skipped), hospitals overwhelmed (-2), vaccine approved (+3).

### "I slept all day but health stayed at 80"

Not a sleep bug. Sleeping at home gives +10 health, but every night also costs -1, and -10 if you did not eat that day: +10 - 1 - 10 = -1. Fed and sleeping at home you gain +9 (tested: 80 to 89); unfed, 80 to 79. The game never said so. Now going to bed unfed shows a warning, the log lists every reason for the overnight change (for example "Overnight health +9 (-1 every night, +10 slept at home)"), and the morning recap has a health figure.

### Sleep rework

| Time left | At the apartment (energy / health / happiness) | Anywhere else |
|---|---|---|
| 8h | +24 / +8 / +8 | +12 / +4 / +4 |
| 16h | +35 / +10 / +16 | +18 / +5 / +8 |
| 24h | +35 / +10 / +24 | +18 / +5 / +12 |

- At the apartment: energy 3% per hour left, capped at +35 (was +75). Health +1 per hour left, capped at +10 (was a flat +10). Happiness +1 per full hour left.
- Anywhere else: half of the apartment figures for all three (`CONFIG.sleep.awayShare = 0.5`).
- Settings: `CONFIG.sleep.maxEnergy`, `awayShare`; `CONFIG.health.sleep.perHour` and `max`. Removed: `CONFIG.sleep.awayMax`, `CONFIG.health.nightly.sleptAtHome`. The Night Owl trait now sets `awayShare` to 0.75.
- The top-bar button reads **Sleep outside** whenever you are not at home; at home it stays **End day**.

## 11. Known open issues

**Fixed in the latest round**

- Rules cold text now reads "Low energy also raises your chance of falling ill overnight: about 40% a night under 11 energy, 29% under 20, 16% under 30, 5% under 45". Built from `CONFIG.illness`.
- Net-worth rule now says "minus hospital debt, rent arrears and any loan you owe".
- Restaurant meals show their health (+1 dinner, +2 tasting menu) on screen and in the log.
- School Study button shows its energy cost.
- Coffee machine description says +6% energy each morning and that it counts as a comfort item (+10% faster rest and sleep).

**Still open**

- The economy is much harder than the first version: 54% of games reached $2,000 in a 316-game replay after the shift and work-cap changes (it was 92%). See section 12 for the full 2,000-game re-run after the latest changes.

## 12. 2,000-game re-run

Latest build, bankrupt rule counted from day 5. Same bot and same 2,000 jobs as the first stress test (eats daily, keeps clothes fresh, one focused study pathway, a different target job each time).

| Outcome | Games | Share |
|---|---|---|
| Reached $2,000 or more (win) | 992 (Comfortable 983, Wealthy 13) | 49.6% |
| Time's up, under $2,000 | 664 | 33.2% |
| Bankrupt | 222 | 11.1% |
| Hospitalised | 118 | 5.9% |
| **Ended early (total)** | **340** | **17.0%** |

- Wins by difficulty: Easy 59.8%, Normal 46.7%, Hard 42.9%.
- Finishing games (1,660): average score 3,500, net worth $2,242, health 100, happiness 98.
- The $2,000 line was first crossed on day 12.6 on average (fastest: day 8).
- Compared with the first run (92% reached $2,000), the economy is much tighter.
- Bankruptcies came on days 8 to 14 (average day 8.5), from players stuck near $370 of cash with net worth under $500, not from skipped food. Every hospitalisation was a deliberate 3-day food lapse by the bot.
- Best pathways: Mall Manager, Supermarket Manager, Boutique Manager, Operations Assistant, Senior Nurse, AI Engineer, Logistics Manager. The 32-hour study jobs paying $230 to $290 did best.
- The very top jobs (Chief of Surgery, Consultant, Chief Engineer and so on, 100+ study hours) were never reached within 15 days, so their pay does not matter inside the day limit.
- Test note: an earlier run of this bot forced the bankrupt start day back to day 1 (a leftover in the test script), giving 59% bankruptcies on day 4. That was a test fault, not a game bug, and is fixed.
