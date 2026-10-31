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
13. [Job list update](#13-job-list-update)
14. [Interface and gameplay updates](#14-interface-and-gameplay-updates)
15. [Illness, food, shops and windows](#15-illness-food-shops-and-windows)
16. [Layout and window tidy-up](#16-layout-and-window-tidy-up)
17. [Customer Service pathway](#17-customer-service-pathway)
18. [Review merge: DeepSeek, ChatGPT, Grok](#18-review-merge-deepseek-chatgpt-grok)
19. [Running stories: realistic daily effects](#19-running-stories-realistic-daily-effects-and-plainer-wording)
20. [Reset button fix](#20-reset-button-fix)
21. [Start energy, tuition, study button and happiness icon](#21-start-energy-certificate-tuition-study-button-and-happiness-icon)

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
- The top-bar button reads **Sleep outside** whenever you are not at home; at home it reads **Sleep in Apartment** (see section 14).

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

---

## 13. Job list update

The full job list and qualifications now follow the list supplied for this game (`CONFIG.jobs.pick`, mirrored in `CAREERS`). 71 roles in total.

- Removed: Quality Inspector, Logistics Manager (Factory); Busser, Host, Sommelier (Restaurant); Butcher, Buyer (Supermarket); Stockroom Assistant, Personal Stylist (Clothes Mall); the Bank Security Guard, Financial Analyst, Investment Associate, Branch Manager (Bank); Receptionist, Hospital Administrator (Hospital).
- Added: Product Promoter ($190, Sales Degree) at the Supermarket; Sales Promoter ($150, Sales Certificate) at the Clothes Mall; Internal Auditor ($150), Market Risk Analyst ($240), Rates Trader ($330), Head Trader ($450) at the Bank; General Manager ($330) at the Hospital.
- Renamed: Specialist Registrar is now Specialist Doctor.
- Changed qualifications: Master Chef (Food & Beverage Degree + Sales Degree), Teller (Finance Certificate, $110), AI Engineer (Technology Degree + Engineering Certificate), Gym Instructor (Sales Certificate instead of Medicine).
- Second job lines renamed to match what is left: Restaurant (Management), Supermarket (Delivery & Promotions), Clothes Mall (Promotions). Factory (Logistics) now only has Forklift Driver.
- The Bank no longer has an entry job: Teller, its lowest role, needs a Finance Certificate.
- Pawn Shop Security Guard is now the only Security Guard, so its config line no longer needs the card name. Repair Technician (Thrift Store and Electronics Store) still does.
- Unchanged rules still apply on top of the list: knowledge needed by job level, dress codes, work experience for jobs over $150 and the ±5% per-game pay variation.
- Old saves: a saved job that no longer exists is dropped on load with a message to re-apply. The game now also remembers the job's name, so future reshuffles are caught too.

---

## 14. Interface and gameplay updates

### Gameplay
- Job pay varies by up to ±5% at random each game (`CONFIG.jobs.payVary`), fixed for that game and kept in the save.
- Each new game starts with a random price index between 94% and 106% (`CONFIG.limits.startPriceMin` / `startPriceMax`), on top of the difficulty's prices. Shift pay follows the price index as before.
- Work experience: jobs paying more than $150 a shift (as shown on the board) need 5 shifts already worked at the same workplace, any role there (`CONFIG.jobs.experience`). Without them the interview still takes 1h and fails with "Not enough relevant working experience". The job board shows "5 shifts worked at the Factory (you have N)".
- Self-study online gives +2 more knowledge: computer 6, tablet 5, phone 4 (Bookworm: 8, 6, 5).

### Top bar
- Icons only, no words: net worth (new, money bag), cash (dollar note), energy (blue bolt), happiness (sun), health (heart), knowledge (new, grad cap), time (clock).
- All six stat cells are the same width with smaller numbers. Cash and net worth of $1,000+ show as $12.3K / $1.3M (hover shows the exact amount).
- Hover (computer) or tap (phone) any stat for an instant description. Score has an "i" icon that shows the score formula and your current breakdown.
- Compact layouts so the bar stays on one row on phones and on 641–1023px windows (buttons drop below the stats only when there is no room).
- The home button reads "Sleep in Apartment" (was "End day"), for either home.

### Stat icons everywhere
- Every building's option lines show icon + number, e.g. clock 1h 30m, bolt +12%, sun +1, heart −8. Also used in each window's top strip, the action preview pop-up, the floating +/− numbers and the tired/poor-health warnings. The Daily log stays as words.

### Overview window
- Net worth now shows Loan as a negative amount (and Bills owed when you owe medical bills or rent arrears), so the parts add up to the total. Legend squeezed onto one row (Cash, Bank, Invest, Assets, Loan).
- The Net worth box moved below the Vitals / Life & learning / Rent & clothing row.
- The window is only as tall as that row, centred on the map, and scrolls for Net worth and the Daily log, so buildings around it stay clickable.

### Messages
- Toasts show the full message (no more one-sentence, 90-character or 3-line cut-off), stay up longer for longer text (up to 15s) and pause while hovered. "Not enough relevant working experience" and "No openings now" now pop up too.
- Floating +/− numbers after an action stay on screen 3.5s (was 1.4s), set by `CONFIG.ui.floaterSeconds`.

### Employment Office
- The job board picks 1–5 columns to fit the window (each at least 175px), so cards and Apply buttons no longer overflow on narrower screens.

---

## 15. Illness, food, shops and windows

Earlier changes in this release that were not logged yet. Settings are in `CONFIG.hospital`, `CONFIG.food` and `CONFIG.gadgets`.

### Illness and the Hospital
- While sick you cannot work. Each sick day you either get treated at the Hospital or recover naturally.
- Natural recovery: a nightly chance to recover (cold 50%, flu 30%, dengue 15%, pneumonia 10%), with a maximum length of 3, 4, 6 and 7 days. Each 2h rest at home while sick adds 15% (up to 45% a day) and sleeping at home adds 10%. The Apartment shows a "Getting better" box with tonight's chance.
- Dengue and pneumonia no longer rush you to hospital automatically; they use the same choice, with bigger bills and slower recovery.
- Treatment: nothing to pay at the time. 80% chance you are warded for the whole next day (`admitChance`, `wardDays`), with no time to act and meals provided; otherwise you are cured and sent home the same day.
- The bill (treatment + $120 a ward day) is deducted from cash on the morning after release, and the start-of-day message names the amount.
- Bills you cannot cover work like rent arrears: the shortfall + 10% interest is repaid from cash over 5 days, with a 5% late fee on a missed instalment (`billInterest`, `billPlanDays`, `billLateFee`). This replaces the old medical debt that grew 5% a day. Food-poisoning bills use the same plan.
- Health check-up: $400 (was $60), halves the chance of falling ill for 10 days (was 4).
- Recovery ward: $370 (was $120), +30 health (was +12), +14% energy (was +50%), +8 happiness.
- Health insurance is now **Life insurance**: $620 (was $80), pays 80% of bills for the rest of the game (was 4 days), bought once.

### Food
- Burger: 1h (was about 2h 30m), −5 health. Burger combo: 1h 30m (was about 3h), −8 health. Per-item `minutes` and `health` in `CONFIG.food`.
- A fridge keeps food 4 days (was 3).
- Without a fridge, expired food stays in the kitchen marked spoiled instead of being binned. You can still cook it (it makes spoiled meals) or eat it: it counts as a meal and gives the usual energy, but costs 8 health and 3 happiness, with a 25% chance of food poisoning. "Throw out spoiled food" clears it. The old random spoil-on-cook chance is gone.
- Supermarket lines now say what you get **when eaten**, including the health gain (buying only costs money and time).

### Gym
- Yoga $12, 1h, −5% energy, +2 health, +2 happiness. Pilates $18, 1h, −6%, +4, +2. Strength training $23, 2h, −18%, +18, +6. Spin $30, 30m, −20%, +10, +8.
- Each class shows its description next to its name, and classes are listed cheapest first.

### Thrift Store and Electronics Store
- New prices: second-hand TV $150, used phone $340, old tablet $430, old computer $520; coffee machine $290, game console $150, tablet $640, computer $710, phone $460, refrigerator $660, microwave $320, Smart TV $450.
- Devices add each day: phone (new or used) +4 knowledge and +2 happiness; tablet (new or old) +6 and +5; computer (new or old) +9 and +6 (`CONFIG.gadgets.daily`).
- TVs and the console now reward rest instead of a flat daily boost: for each hour you rest or sleep at home, a TV (either kind) gives +0.2 happiness and +0.1 knowledge and the console +0.8 happiness (`CONFIG.gadgets.perRestHour`). The second-hand TV now breaks down more often.
- Every phone, tablet and computer says it lets you trade ETFs and study online.

### Bank
- Savings and each investment are equal-size cards with matching Deposit and Withdraw buttons.
- Each investment shows **Cost** and **Current** value.
- Amounts are set with −/+ buttons in $50 steps instead of typing, never below the product's minimum. Asking to withdraw more than you hold withdraws everything.

### Apartment
- Actions are grouped: Your things, Getting better (when sick), Kitchen and meals, Rest and sleep, Study and work from home, Rent and bills.

### Windows and screens
- Pressing any button in a window or the end-of-day event scrolls that window back to the top, so the new message is seen.
- Clicking or tapping the map outside an open window closes it, like Leave (buildings still walk you there). Events, the morning message and pop-ups are not affected.
- Employment Office: "Show every role and rank" is now **Show all** / **Show fewer**.
- School: each pathway reads "Qualification: Certificate", then "2 modules (3 × 1h lessons)". Tuition shows on the Enrol button only.

---

## 16. Layout and window tidy-up

### Overview window
- Space added below Getting started (and below warnings and the day recap).
- The Vitals, Life & learning and Rent & clothing cards rearrange when they are narrow, so labels never run into numbers: vitals show the label on top with the bar and number below; life and rent values sit under their labels and wrap instead of being cut off.
- Vitals numbers share one right edge and the bars are the same length; the Vitals card gets a little more width than the other two.
- Clicking the map outside the overview hides it so the map is clear. A **📋 Overview** button in the top bar brings it back, and it reopens by itself each new day. Clicking a building opens it directly either way. (Not on phones, where the overview sits below the map.)
- **New game** button removed (↺ Reset still starts a fresh game). The Daily log has an **Expand log** / **Collapse log** button and can be dragged taller by its corner.

### Building windows
- The strip under each window title (day, time left, cash, energy, happiness, health) is removed; the top bar already shows it.
- Number-key shortcut badges are switched off in windows with more than 9 buttons (for example the Employment Office), where the numbers jumped around. Shorter windows keep them.

### School
- "Now studying" reads **Modules: 1 of 2** (the module you are on).
- Each module pill is a progress bar: the module in progress fills **green** as you attend its lessons and shows a lesson count (e.g. 1/2), finished modules are **blue** with a tick, later ones stay white. The "Current module … lessons attended" line is removed.

### Action preview
- "Don't ask me again" is ticked by default, so pressing Do it on the first preview turns previews off (turn them back on with 🔎 Preview).

### Checked
- An automatic scan of every screen (welcome, top bar, overview, all 15 building windows, Employment Office "Show all", rules, end-of-day event, morning message) at 375, 684, 828, 1024 and 1440px found no overlapping elements, cut-off text or sideways scrolling.

---

## 17. Customer Service pathway

20 October 2026.

### New pathway
- **Customer Service** (`TRACKS.cus`): a Certificate only. One module, **Customer Care Essentials**, of 3 lessons × 3 hours = **9 hours** of study. Tuition $50.
- Other Certificates are 4 hours (2 modules × 2 × 1h), so this one is deliberately heavier. A 3-hour lesson means one lesson a day keeps a player under the 5-hour study burnout line.
- Pathways can now set their own lessons per module and hours per lesson by level (`les:{Certificate:3}`, `hrs:{Certificate:3}` on the pathway). `lesCount` and `lesHours` read these and fall back to the usual defaults.
- Rule change: a level may now have **1 to 4 modules** (was 2 to 4).
- Sales Certificate module "Customer Service" renamed **Customer Relations**, so the names don't overlap.

### Jobs switched from Sales Certificate to Customer Service Certificate
| Role | Building | Needs now | Pay |
|---|---|---|---|
| Waiter | Restaurant | Customer Service Cert | $105 |
| Store Supervisor | Supermarket | Customer Service Cert | $140 |
| Visual Merchandiser | Clothes Mall | Customer Service Cert | $150 |
| Sales Promoter | Clothes Mall | Customer Service Cert | $150 |
| Thrift Store Manager | Thrift Store | Customer Service Cert | $130 to **$140** |
| Sales Assistant | Electronics Store | Customer Service Cert | $130 to **$170** |
| Store Manager | Fast Food | Food & Beverage Cert + Customer Service Cert | $180 |

- Thrift Store Manager and Sales Assistant were raised so they no longer pay less than easier jobs in the same building (Repair Technician, Data Annotator). Both keep 4h45 shifts.
- Gym Instructor and Appraiser still use the Sales Certificate.

### Code housekeeping
- Very old saves (version 3) skip pathways added later instead of crashing (`if(!o)return;` in the save converter).
- MASTER CONFIG comment lists the right pathway names ("Medical Health" corrected to "Medicine").

### Checked
- Rule checker: 7 pathways, 71 roles, no errors or warnings.
- Browser test (118 checks): no script errors, every building opens, School and Employment Office list everything, Customer Service enrols and its module completes lesson by lesson, older saves load with the pathway at 0, all switched jobs can be applied for once qualified, and the two raised jobs show 4h 45m shifts.

## 18. Review merge: DeepSeek, ChatGPT, Grok

Changes merged from three AI-written variants of `index.html` (see `docs/Other AI inputs/`).

### Fixes and housekeeping
- Removed the stray duplicate document shell at the top of the file and the duplicate `</body></html>` at the end (ChatGPT and DeepSeek both flagged it).
- The rent cycle, game length and win/time-limit text on the welcome and Rules screens now say 5 days, 15 days (matching `CONFIG.time`). The welcome-screen buttons were still saying 10 days.
- `.tag` styling for the map is scoped to `.tags .tag`, so overview chips no longer pick up the boxed map-tag style.
- The "Sleep in Apartment" label now shows "Sleep at Bungalow" when the bungalow is home.
- Reset asks for a second click (the button reads "Click again to wipe" for 4 seconds) before wiping the save. It no longer uses a browser confirm box, which some embedded browsers block silently, so the button appeared to do nothing.
- The text-to-icon regex no longer uses a lookbehind, which older Safari cannot parse.
- The mobile event popup sits above the action bar, and the action bar is hidden while a popup is pending.
- Food that will spoil overnight is warned about in the Daily log.
- The "you are here" tile on the map pulses.

### Economy
- New `CONFIG.macro.priceReversion` (0.03): each night prices drift 3% of the way back towards the difficulty's base price, so news cannot push them away for ever.
- The "show all jobs" toggle is removed: the Employment Office always lists every rank, with locked ones greyed out.

### Interface
- A 📍 Places button (phone width only) opens a list of every location sorted by walking distance, with a Go button for each.
- A short confetti burst plays when you rank up.
- A one-line summary of the top activities sits under the day bar on phones.
- The job board shows a ⚠ warning when a job needs experience you do not have yet.

### Not included
- The debug test harness (`window.__DG`) from the Grok variant: it belongs in a throwaway test copy, not the shipped file (see CLAUDE.md).
- The Grok "Next steps" panel and optional side goals (score bonuses).

### Checked
- Loaded in headless Chrome: no script errors on the welcome screen, the Places list (15 rows, one per location), the day summary line, or about 4 simulated days of End day / event clicks. Baseline gave the same result. The rank-up and experience-warning paths were not reached in that run, so they need a play-through.

## 19. Running stories: realistic daily effects and plainer wording

Problem: multi-day news and storylines (oil crisis, war, pandemic...) applied the same fixed daily change to prices, pay and interest for the whole run, and the screens listed exact numbers and "job-loss risk" / "closure risk" that do not affect you directly.

### Changes
- A running story's daily effect now follows a curve: it builds, peaks mid-story and fades, with a random swing each day (`trendGain()`). The story's listed size is its average, not a constant. Its `t.age` counter is saved with the story.
- New `CONFIG.macro` keys: `curveLow` (0.5, effect on the first and last day), `curvePeak` (1.4, effect at the middle day) and `dailyJitter` (0.3, plus or minus per day).
- Stories no longer show exact daily numbers. Morning notes, the "Still going" line on storyline cards, the Daily log, the news card and the Bank tooltip use a short description instead (`trendNow()`), e.g. "prices rising fast, pay falling, interest rates rising, markets under pressure".
- "Job-loss risk" and "workplace-closure risk" are no longer listed. The risks still apply in the background; a closure is still reported when it happens.
- The news-card line "Each day: ..." is now "Effects: ...".
- The helper `trendTxt()` is removed (replaced by `trendNow()`).

### Checked
- Headless Chrome: no script errors on the welcome screen, the Places list, or the day summary. The new daily curve and descriptions were not exercised in a play-through; they need one.

## 20. Reset button fix

- The Reset button used `window.confirm()`. Some embedded browsers block that box silently, so the button did nothing. It now takes two clicks: the first changes the label to "Click again to wipe" for 4 seconds, and the second wipes the save.
- Checked in headless Chrome: the first click does not reset, the second click returns to the welcome screen, with no script errors.

## 21. Start energy, Certificate tuition, study button and happiness icon

### Changes
- New game starts with 85% energy (was 100). Set in `CONFIG.start.energy`.
- Certificate tuition is now set per track in `CONFIG.education.certFee`: Technology $52, Food & Beverage $45, Medicine $55, Customer Service $95, Sales $43, Finance $79, Engineering $58. These are the first-level (Certificate) fees only. Degree, Honours and Masters fees still use the old per-module formula.
- Each new game moves every track's Certificate fee by up to `CONFIG.education.certVariance` (5%) either way, stored per save as `S.certVar`. The daily price index still applies on top.
- The study button reads "📖 Study" with the time and energy cost shown with the game's icons instead of plain text.
- The happiness icon is now a white smiley face (it was a sun-shaped icon). It is drawn once in the icon set, so the top bar, vitals and text all use it.

### Checked
- Headless Chrome: new game shows 85% energy, the happiness icon is the white smiley, and there are no script errors. The School fee and study button were not opened in that run.

## 22. Study button text and bungalow sleep label

- The study button reads just **Study**. Its time and energy cost ("[time icon] 1h · [energy icon] −2% energy") is shown as text next to the button instead of inside it.
- The top-bar sleep button read "Sleep in Apartment" in this copy because `sleepLabel()` returned a fixed string. It now reads "Sleep at Bungalow" when the bungalow is your home, and "Sleep at Apartment" otherwise. (The `DailyGrind/` copy already had this fix.)
- Checked in headless Chrome: moving into the bungalow changes the button to "Sleep at Bungalow", with no script errors. The study button was not opened in that run.

## 23. UI changes carried over from the root copy

- **Loans: no same-day repayment.** On the day you take a loan, the Repay and Pay in full buttons are disabled and the card says "You can start repaying tomorrow". The repay action also refuses if it is triggered anyway. The Rules text now says you can repay from cash any day after the one you borrowed.
- **Supermarket and fast-food buttons.** The white buttons (Bag of chips "Buy", Lottery "Buy ticket" and the fast-food burger "Buy") are now the same green as the other Buy buttons.
- **Happiness icon.** Now a pink smiley face (was a yellow sun; later changed to a white smiley, see section 21), everywhere the icon appears. In the top bar it moved to sit right after the cash icon, so the order is net worth, cash, happiness, energy, health, knowledge.
- **School "Now studying".** The button now just says "Study". The lesson length and energy cost moved to a line in the same section, shown with the time and energy icons: "1h" and "−2% energy per lesson".


## 24. Buy buttons match the other green buttons

- The Bag of chips "Buy" and Lottery "Buy ticket" in the Supermarket, and the snack "Buy" in Fast Food, were white (the secondary style). They now use the same green as the other Buy buttons.
- Checked in headless Chrome: no script errors. The buttons were not visually inspected in that run.

## 25. Investment minimums stay fixed

- The minimum amounts for the Fixed deposit ($100), Index ETF ($50), Hedge fund ($500) and Cryptocurrency ($20) no longer move with the daily price index. They are the values in `INV` (`min`), used directly in the investment card and in the "Amount too low" check.
- Checked in headless Chrome: no script errors. The minimums were not tested by entering amounts.

## 26. Event odds in CONFIG

- The chances used to pick each end-of-day event moved from hard-coded numbers in `pickEvent()` and `sagaEvent()` into `CONFIG.events`: `saga` (0.5, new saga on a night none is running), `macro` (0.18), `macroMaxTrends` (3, macro shocks only while fewer trends run), `story` (0.2), `item` (0.3), `basic` (0.15) and `news` (0.4). Whatever is left becomes a Yes/No decision. Same odds as before, so default play is unchanged.
- Checked in headless Chrome: no script errors. Event frequencies were not measured after the move.

## 27. Night events: macro shock rules and new weights

- **Macro shocks are no longer one of the picks.** Each night a macro shock may start with `CONFIG.events.macro` (0.1). At most `CONFIG.events.macroMax` (1) macro shocks can run at once. A macro shock that starts that night is that night's event card.
- **Otherwise exactly one event is picked** from story, item, news, basic and decision, with the relative weights `CONFIG.events` story 0.3, item 0.3, news 0.2, basic 0.2 and decision 0. The decision (Yes/No) event is kept but set to 0, so it never comes up unless you raise its weight. If an item event is picked but none applies, the pick is redone from the other types.
- Other events can still happen while a macro shock is running.
- Macro shock trends are marked `macro` so the running-shock limit can count them. Saves made before this change have no mark, so their running shocks are not counted until they end.
- The saga chance (`saga`, 0.5) still runs first and is unchanged.
- Checked in headless Chrome: no script errors. Event frequencies were not measured.

## 28. Big events, daily events and one-card-a-day rules

### Big events (saga or macro shock)
- Each day a big event may start with `CONFIG.events.bigChance` (0.2), but only when no saga or macro shock is running and `bigGap` (3) days have passed since the last one ended. Only one can run at a time.
- A big event is a saga with chance `sagaShare` (0.5), otherwise a macro shock.
- Macro shocks now last `macroDays` (3 to 5 days, was 7 to 14). They are marked `macro` and no longer have a separate limit (`macroMax` is removed).
- Saga chapters play one per day, as before. A saga no longer starts itself, so the old `saga` and `sagaGap` keys are gone.

### Daily events
- Each day one daily event may happen: story 0.2, item 0.2, news 0.1, decision 0.3, none 0.2 (`CONFIG.events`). Basic events are set to 0 (`basic:0`) and can be turned back on there.
- The daily event is rolled even while a saga or macro shock is running.
- A "none" roll is shown as a short "Quiet night" card, so the end-of-day step stays the same.

### Cards at night
- A night can show two cards: the big event's card (saga chapter or new big event) first, then the daily event. The second card shows after you press **Next**.
- Checked in headless Chrome: no script errors. Event frequencies were not measured.

## 29. Day-change arrows moved to the morning window

- The ▲/▼ arrows next to energy, happiness and health in the top bar are gone.
- The morning window ("☀️ Day N of 15") now ends with a "📊 Your day" line showing how energy, happiness, health and knowledge changed over the day that just ended, with arrows. Small changes (under 1 point) are not shown.
- The day's change is measured from the start of the day to the moment you close the day, before overnight effects such as rent, hunger and sleep, so it shows what happened during the day.
- Checked in headless Chrome: no script errors. The morning line was not checked on screen.

## 30. Top-bar arrows flash on the new day

- The ▲/▼ arrows next to energy, happiness and health in the top bar are back. They appear at the moment a new day starts, the same time as the "☀️ Day N of 15" morning window, and show the change over the night (sleep, rent, hunger and other overnight effects).
- They stay on for about 2.5 seconds, then disappear. On a day with nothing to report, they still flash, because they don't depend on the morning window.
- The "📊 Your day" line from section 29 is removed. The arrows replace it.
- Checked in headless Chrome: at the start of day 2 the arrows showed the overnight change, and they were gone 2.5 seconds later.

## 31. Employment Office: experience text removed, buttons say Apply

- The "Experience: x/5 shifts at <building> (interview still costs 1h)" line and the completed "shifts worked" line are removed from every job's requirements.
- The "⚠ need experience" tag is removed from job rows.
- Every job button now reads just "Apply" (the "Apply (need exp)" label is gone).
- Interview failure messages in the log still explain why an interview went wrong.
- Checked in headless Chrome: no script errors. The Employment Office was not opened in that run.

## 32. Employment Office: Show all / Show fewer restored

- Reverts the removal of the "show all jobs" toggle (section 25 of the earlier history). The Employment Office again hides less relevant jobs by default:
  - ranks you have already passed ("Past rank") are hidden;
  - for each career, only the first job you cannot yet apply for is shown, so the list does not show the whole ladder at once.
- The **Show all** button under the list shows every rank, locked ones included, and changes to **Show fewer** to hide them again.
- Checked in headless Chrome: 38 rows by default, 71 after Show all, and the button label switches. No script errors.

## 33. Vitals moved into the Current pay box

- The Vitals card (Energy, Happy, Health, Know and the "No meal yet today" line) now sits inside the Current pay box in the overview, under the pay line. It is no longer a separate card, so the row of cards below has Life & learning and Rent & clothing.
- The vitals keep their element IDs, so their numbers and the arrows still update.
- Checked with headless Chrome screenshots at 390px and 1280px: the box lays out without overlaps. Not checked with a day in progress (arrows and pending events).

## 34. Life & learning and Rent & clothing share the row equally

- The two cards below the Current pay box now each take half the row, so they are the same width. Before, the row was set for three cards.
- Checked with headless Chrome screenshots at 390px and 1280px: the two cards are equal width and nothing overlaps.

## 35. Vitals always show %, coloured by value

- Energy, Happy, Health and Know always show a % sign, in the Vitals box and in the top bar (the top-bar Know now shows %).
- The number's colour follows its value: red below 10%, amber from 10% to 29%, yellow from 30% to 60%, green above 60%. Set in `vitColor()`.
- Checked in a headless Chrome screenshot at 390px: green (85%, 70%, 80%) and amber (10%) show correctly. Yellow and red were not seen on screen.

## 36. Score number in blue

- The score number in the top bar is blue (`#6aa9ff`) instead of gold.

## 37. QA pass: layout, log text vs real effects, 30 simulated runs

Tested on a throwaway copy with a test hook, driven by real clicks (tiles, building buttons, the top-bar Sleep button, event buttons and pop-ups), at 375×812, 768×1024, 700×900, 1024×768 and 1400×900. Every building was opened and every enabled button clicked once (about 100–220 screens per game state: a fresh game, a well-off mid-game and a broke, sick late game), and every night-event type was forced and played through.

### Log text and floaters now match what really happened

- Log lines used to print the listed amount even when a vital was already at 0 or 100, for example "+26% energy" from the tasting menu when energy rose only 4. Meals out, home meals, spoiled food, food poisoning, chips, resting, self-study, the gym, the check-up, the recovery ward, treatment and the first investment now print the real change (new helpers `vitSnap()`, `vitTxt()`, `vitPar()`).
- Health changes now get a floating number like cash, energy, happiness and knowledge. Before, health never floated.
- A work shift now says what it cost in energy, and a school lesson says its energy cost and knowledge gain (the module-complete line includes the module bonus). Chips now state the health they cost.
- Overnight energy and happiness: every night took 15% energy and 10 happiness, but no text said so, and going to bed said "Tomorrow you start with +30% energy and +10 happiness" when you actually woke up +15% and +0. The amounts are now `CONFIG.sleep.nightEnergy` (−15) and `CONFIG.sleep.nightHappiness` (−10). The bedtime line, the "Sleep and end the day" row and a new **Every night** line on the rules screen (`cfgNight`) all mention them. A morning log line, "Overnight energy … happiness …", shows the real change and its parts (nightly drop, sleep, bed, gadgets, coffee, hunger).
- The Classy Bungalow's +10 bed happiness was only given when you used the Sleep button inside the house. "Sleep at Bungalow" in the top bar and the E key lost it. Any bedtime at home now counts.
- The "In debt" warning said "Bankruptcy at −$200". It now gives the real rule from `CONFIG.bankrupt` (net worth under $500 for three days in a row) and mentions the 5% energy cost of the shame.
- News "Recession declared; layoffs sweep the factories" said "You are laid off" but closes your workplace for a few days. Renamed to "Recession declared; firms shut their doors" with matching text. "Tech giant opens a regional hub" now says closed workplaces reopen sooner (it shortens closures).
- Six decisions named a price but never charged it on the good outcome: gym membership ($40), branded sneakers ($40), pest control ($40), second-hand TV ($40), dating app ($20). The expired-snacks box ($15) even paid you $5. They now charge the stated price.
- Checked: night-event chips (stories, decisions, news, sagas, macro shocks, belongings events) match the real cash, bank and vital changes in 99 random choices. A twist that touches the same vital as the outcome still shows two separate chips (for example "−3 happiness, +3 happiness"); the total is correct.

### Layout

- Fixed a CSS typo (`@media@media`) that switched off the two-column rule for the overview cards.
- Belongings ("13 items · 🍲2 cooked · 4 groceries …") was cut off with "…" at every width. It now wraps.
- Phones: with any investment, the top bar overflowed and the Invest and Score cells overlapped. The Invest cell is left out of the phone top bar (it is in the Net worth box), and Net worth and Score get a little more room. The net-worth parts (Cash, Bank, Invest, Assets, Loan, Bills) wrap instead of cutting off "−$1,400".
- Tablets (641–1023px): the panel was 60% wide, so the Electronics Store's two columns overflowed. It is now 86% wide. The top bar wrapped onto two rows; it is squeezed (smaller icon cells, no "Score" label or Invest P/L line, smaller buttons) and stays on one row at 768px. Below about 720px it still wraps with an Invest cell, without overlap.
- Wide windows: with an Invest cell and the Leave button showing, the top bar wrapped by a few pixels; the cell gap is now 4px from 1024px up.
- Employment Office: the "Your job" tag could push past the card edge on a long role name; it may now wrap.
- The welcome screen's difficulty buttons and the game-over card's New game button are sticky footers: the content scrolls under them on purpose.

### 30 simulated games (seeded, real clicks)

- **20 careful games** (eat every day, cooking basic groceries two days at a time; buy the outfit the job needs as soon as clothes run out, withdrawing savings if needed; aim study at the best-paid job reachable in the days left; avoid study and work burnout; switch jobs when the workplace closes; decline risky offers). All 20 reached the end of day 15 with no bankruptcy, hospital or burnout ending: 17 finished Comfortable ($2,061–$3,045), 3 finished just short ($1,145–$1,922). Typical end jobs: Lab Technician, Technician, Repair Technician, Bookkeeper, Teller, Nursing Aide.
- **10 random games** (random buildings, buttons, preview answers and event choices): 9 ended Hospitalised (three days without a meal) on day 4 to 7 and 1 ended Bankrupt on day 10, all at the right time and with the right message.
- In all 30: no script errors, no vital outside 0–100, no negative bank or clothes, no NaN, no more than one job, no stuck day or event card, and (after the fixes above) no action whose log line disagreed with the real change.
- Observations, not changed: in an earlier version of the careful bot, a 4-day workplace closure inside the day-5-to-7 bankruptcy window was enough to bankrupt a player who did not switch jobs. Knowledge falls to 0 by day 15 for a player who owns no device and stops studying (−1 a night).

New `CONFIG` keys: `sleep.nightEnergy`, `sleep.nightHappiness`. None removed.

### Re-running the simulations

- `tools/qa/run-sims.ps1` rebuilds the test copy (with the `window.__G` hook) outside the repo and opens it in your browser; `tools/qa/sim.js` then plays the 20 careful and 10 random seeded games with real clicks and shows a report table (plus a JSON download). Run it from the repo folder with `powershell -ExecutionPolicy Bypass -File tools\qa\run-sims.ps1`; options `-Survive`, `-Random`, `-SurviveSeed`, `-RandomSeed`, `-OutDir`. It needs no Node or Python.

## 38. Event chips merged, no "top score" for 0 points

- When a decision's twist touches the same thing as its outcome, the event card and the Daily log now show one chip with the total instead of two (for example "+3% energy, +5% energy" becomes "+8% energy", and "−3 happiness, +3 happiness" becomes "±0 happiness"). Cash and bank amounts are merged the same way. New helper `mergeFx()`, used by `decide()`. Story rounds keep their separate chips (paying in, then the payout).
- The game-over card no longer says "Congratulations! New top score!" for a 0-point game, and a 0-point game is not saved as the top score. On a first game that scores 0, no top-score line is shown.
- Checked in Chromium with the test hook: in 150 forced decision nights every chip total matched the real cash, energy and happiness change, and no item appeared twice; a 0-point loan default on a first game showed no top-score line and saved nothing, and with a saved best of 1,500 it showed "Top score so far: 1,500".

## 39. 41 new personal yes/no decisions

- Added 41 new personal yes/no decisions to `CHOICES` (the daily events section for personal, economic news and yes/no decisions in `index.html`). Each one uses the existing `[question, [weight, yes text, yes effects, no text, no effects], [1, pass text, pass effects]]` shape and only the existing effect tokens (`c`, `h`, `e`, `l`, `n`).
- Lighter, more everyday choices: pets and pests, flatmates, family dinners, gym memberships, bubble tea queues, hawker-centre lunches, MRT durian sellers, HDB lift waits, busking, dentists and laundry.
- No code, rules text or `CONFIG` values changed. `CHOICES` now has 141 entries (the 100 existing ones plus these 41).

## 40. Rank target days, news tip-offs, investment odds and better feedback

### Rank target days
- Each rank has a target day and a score bonus in `CONFIG.ranks` (`byDay`, `bonus`): 🙂 Comfortable by day 8 (+500), 💼 Wealthy by day 12 (+1,000), 👑 Tycoon by day 15 (+2,000). Reaching a rank by the end of its day adds the bonus as a new **On-time ranks** row in the score. A rank reached later still counts as the rank (and Comfortable still wins the game), without the bonus.
- The day each rank is reached is saved in `S.rankDay`. Gains made overnight (interest, investments) count for the day that just ended.
- The net-worth line shows the target ("next: Wealthy $5,000 by day 12"). A warning appears in the last 3 days before a target with the amount still needed. The morning after a missed target says the bonus is gone and names the next target. The rank-up window and log say whether each rank was on time.
- The Rules screen has a new **Target days** line built from `CONFIG.ranks` (`cfgOnTime`), and the score tooltip mentions the bonuses.

### News tip-offs
- Each morning the game decides whether that night's daily event is economic news, with the same odds as before (`CONFIG.events.news` against the other weights), and draws the headline. When it is news, it is tipped off with chance `CONFIG.events.forecast` (0.7): a morning note and a line on the Bank screen give the headline and its likely effect (prices, pay, savings rates, closures, cash handouts, markets up or down). That night the tipped headline is the news event, so the player has the day to move savings and investments.
- Saved in `S.newsPlan`. A save from before this change has no plan for the current day and rolls that night's event the old way.
- Measured over 4,000 mornings: news on 9.3% of nights (weight 0.1 of 1.0), tipped off on 69% of those.

### Investment odds on the Bank screen
- A **How they compare today** table above the investment cards lists, for savings and each investment: the expected change a day, the usual range (2 days in 3: expected ± volatility, within the daily caps) and how often it loses money. It uses the same numbers as the overnight investment step (`expRet`, `VOL`, `CAP`).
- Each investment card now says the same in words ("A usual day is between −1.9% and +4.1%, and about 36% of days lose money") instead of "± 3%".

### Feedback
- **First week checklist:** the getting-started box lists every step with a tick, adds "Pay your rent", and says to finish by day 5, when the bankruptcy count starts (`CONFIG.bankrupt.fromDay`). After day 5 it says you are behind.
- **Earlier bankruptcy warning with a way out:** with net worth under the bankruptcy line, a warning shows from `CONFIG.bankrupt.warnDaysBefore` (2) days before the count starts (day 3). It gives the amount needed, whether tonight counts, and a way out: about how many shifts at your current pay, or to get a job if you have none, and to hold off on spending. It is amber before the count starts and red once each night counts.
- **Day recap wins:** the morning day recap now lists the day's wins (qualifications earned, new job or promotion, ranks reached and whether on time) and marks a **🏆 Best day yet** when net worth grew more than on any earlier day.

New `CONFIG` keys: `events.forecast`, `bankrupt.warnDaysBefore`, `ranks[].byDay`, `ranks[].bonus`. None removed. New save fields: `rankDay`, `bestDay`, `newsPlan` (older saves get them from `blank()`).

- Checked in the built-in browser with the test hook (injected into the page in memory, no copy on disk): no script errors; the bankruptcy warning appears on day 3 (amber) and day 5 (red) but not day 2, and gives "about 3 shifts at $72" for a Crew Member; Comfortable reached on day 6 recorded as on time with +500, Wealthy reached overnight on day 7 credited to day 7 with +1,000; a forced tip-off was shown in the morning and its headline was that night's event; a missed day-8 target produced the morning note; the recap showed the wins and Best day yet; the comparison table fits a 480px-wide pane without scrolling.
- `tools/qa` simulations, 60 careful-bot seeds (1–20 and 21–60) plus the 10 random games, run against this build and against the unchanged previous build (same seeds). Both: no script errors, broken invariants, stuck days or log/effect mismatches; all 10 random games end Hospitalised in both. Careful bot: previous build 56 Comfortable, 3 Time's up, 1 Bankrupt (seed 23); this build 52 Comfortable, 3 Time's up, 5 Bankrupt (seeds 1, 3, 6, 42, 44, all on day 8 or 9). The morning news plan draws extra random numbers, so every seeded game plays out differently, and the bot does not read any of the new text. The bankrupt seeds differ between builds, which points to chance rather than a rule change, but 5 against 1 is not conclusive: a larger run would settle it.
- `docs/Daily Grind Config Guide.docx` updated: the `ranks` and `bankrupt` descriptions, a new `events` row, and rows for `ranks.byDay`, `ranks.bonus`, `events.forecast` and `bankrupt.warnDaysBefore`.

## 41. Meals, the fridge and chips

### Names, icons and the Supermarket
- **Basic groceries** are now **Meal prep** (🥕, must be cooked) and **Premium fresh groceries** are now **Ready-to-eat meals** (🍱, no cooking). Cooked meals keep 🍲. The new names are used everywhere in the game, including the Frugal trait and the shopkeeper's lines. The `CONFIG.food.basic` / `CONFIG.food.premium` keys keep their names.
- The Supermarket lists its food cheapest first (chips, meal prep, ready-to-eat meal, then the two 3-day bundles). The lottery ticket has its own **Lottery** section underneath, since it is not food.
- Shorter descriptions: meal prep and its bundle say **Cook at home**, ready-to-eat meals and their bundle say **Eat at home**, followed by the buy time and what eating one does.

### How long food keeps
- Food keeps **3 days outside the fridge** and **6 days in a working fridge**, counting the day you buy it (`keepDaysRoom`, `keepDaysFridge`). A cooked meal starts again from the day it is cooked. Bundles keep the same as single meals (the longer-lasting "sealed packs" are gone).
- Each food item tracks the keep-days it has used: a night in the fridge uses 1, a night outside uses 6 ÷ 3 = 2. Moving a meal in or out of the fridge is fair either way.
- Food that runs out, in or out of the fridge, becomes 🤢 spoiled and stays in the kitchen outside the fridge (before, a fridge threw expired food away). Eating spoiled food still costs health and may cause food poisoning; it can be thrown out at home.
- The **Power cut** event now spoils the food in the fridge (before, it threw away all groceries).

### The fridge
- A fridge holds **5 meals** (`fridgeSpace`): meal prep, ready-to-eat meals and cooked meals. Chips need no fridge. With 5 meals or fewer, they all go in automatically. With more, the ones closest to going off go in and the rest stay on the kitchen counter, where they keep 3 days.
- At home, with more food than fridge space, each food card has a **❄️ Put in** / **Take out** button. Your picks stay in until eaten or spoiled; a broken fridge holds nothing until it is repaired.
- There is no longer any limit on kitchen space (`kitchenSpace` and `cookedSpace` are removed).

### Cooking, reheating and the microwave
- Cooking takes 3h for the first meal and 30 min for each extra one, with or without a microwave (`cookFirstMicrowave` and `cookExtraMicrowave` are removed).
- A cooked meal that spends a night in the fridge is **cold**. With a working microwave you can **Reheat & eat** it (30 min more, `reheatMinutes`) with the usual happiness. Without one, or to save time, you **Eat cold**: the usual meal with **3 less happiness** (`coldHappiness`). The Microwave's shop description now says this.
- When eating or cooking, the meal with the fewest days left is used first.

### Chips
- Buying a bag of chips no longer changes your vitals. It goes home with you (up to **5 bags a day**, **10 kept at home**) and never goes off. **Eat a bag of chips** at your Apartment or Bungalow takes **15 min** and gives the usual +8 happiness, −3% energy, −2 health and counts as junk food. Chips are a snack, not a meal.

### Home screen
- **Your things** is split into shelves: 🔌 Belongings, 🧊 Fridge (spaces used, days left on each meal), 🌡️ Kitchen counter, 🤢 Spoiled, 🥔 Snacks and 🎟️ Lottery tickets. Each food card shows its icon, name, what it needs (cook first / ready to eat / cold), and days left.
- **Kitchen & meals** shows whether you have eaten today and your home meals (x / 3), then only the actions you can take: eat a cooked meal, reheat or eat cold, eat a ready-to-eat meal, cook meal prep (Cook 1, Cook 2, …), eat chips, eat spoiled food, throw out spoiled food.
- On a phone, food cards sit three to a row.

New `CONFIG.food` keys: `keepDaysRoom`, `keepDaysFridge`, `fridgeSpace`, `reheatMinutes`, `coldHappiness`, `chips.eatMinutes`, `chips.maxPerDay`, `chips.maxStored`. Removed: `kitchenSpace`, `cookedSpace`, `cookFirstMicrowave`, `cookExtraMicrowave`, `freshDaysFridge`, `freshDaysNoFridge`, `bundleDaysFridge`, `bundleDaysNoFridge`. Save fields: `food`, `chips`, `chipsDay` replace `pantry` and `cooked`. An older save's groceries and cooked meals are moved into `food` when it loads (spoiled stays spoiled; fresh food counts the days since it was bought as fridge days).

`tools/qa/sim.js` uses the new food list: the careful bot eats a warm, reheated or cold cooked meal, then a ready-to-eat meal, then buys and cooks meal prep. The kitchen-capacity checks are replaced by "fridge holds at most 5", "no spoiled food in the fridge" and "chips at home within the limit".

- Checked in the built-in browser with the test hook on a throwaway copy (`D:\AI\dg_scratch`, deleted afterwards), no script errors: the Supermarket order is chips $6, meal prep $30, ready-to-eat $55, bundles $77 and $140, with the lottery last; the 6th bag of chips in a day is refused and buying leaves vitals unchanged; eating a bag takes 15 min and changes them; with 7 meals and a fridge, 5 go in and the other 2 show 3 days left; Put in / Take out swap meals as expected; one night ages fridge food by 1 day and counter food by 2, and cooked meals from the fridge turn cold; Eat cold gives +0 happiness instead of +3, Reheat & eat takes 1h and gives +3; a broken fridge empties onto the counter; fridge food that runs out (and a Power cut) leaves spoiled food on the counter; a save made by the previous build, holding groceries, a spoiled grocery and cooked meals, loads with all of them moved into the new food list. Phone width (375px): no sideways scrolling.
- `tools/qa` simulations on this build (report: `docs/QA_Sim_2026-10-20_meals-fridge.md`, raw data in the `.json` beside it), 20 careful-bot seeds (1–20) and 10 random games: no script errors, broken invariants, stuck days or log/effect mismatches. Careful bot: 17 Comfortable, 2 Time's up, 1 Bankrupt (seed 3, day 8). All 10 random games end Hospitalised, as before.
- `docs/Daily Grind Config Guide.docx` updated: the `food` description, "Make meal prep cheaper", the Frugal trait, and new rows for `food.keepDaysRoom`, `food.keepDaysFridge`, `food.fridgeSpace` and `food.chips.maxPerDay`.

## 42. Shorter screen text

Wording only; no rules or `CONFIG` values changed. Every number still comes from `CONFIG`.
- **Supermarket intro:** "Meal prep needs to be cooked at home. Food stays fresh for 3 days (without fridge) and 6 days (in fridge), today inclusive." plus a label "Fridge stores maximum 5 meals" (blue with a working fridge, orange without). Meal prep and its 3-day bundle now say **Cook/Eat at home**.
- **Home, Cook meal prep:** "Each cooked meal keeps fresh for 3 days (or 6 in the fridge) from today. Cooking more at once saves time per meal."
- **School intro:** "Each pathway is a ladder of qualifications (Certificate → Degree → … → Masters). You pay tuition once when you enrol in a qualification. Earn the qualification by completing all its modules. You can study several pathways at once."
- **Employment Office intro:** "Base pay - your actual wage depends on your knowledge and well-being. Apply here then go to the workplace to work your shifts. Openings come and go. You can only hold one job at a time. Good luck!" (Your current job is still named after it.)
- **Bank loan line:** "…you would owe $X if you repay on the due date. Simple interest N% a day but will compound 8% a day if overdue. Game ends if not repaid within 5 days after the due date."
- **Bank, How they compare today:** columns renamed **Expected return**, **Usual daily range** and **Probability of Loss**, and the note under the table explains them under the new names.
- **Clothes Mall intro:** "Casual Clothes last 5 days while Smart Casual and Business Suit last 6 days. Return to buy again. Bargaining takes 30m - be careful, you may end up paying more!" (If Smart Casual and the Business Suit are given different lifetimes in `CONFIG.clothes`, it names each one's days.)
- **Refrigerators:** "Holds 5 meals for 6 days instead of 3" (Electronics Store) and "…, but breaks down more often" (Thrift Store).
- Checked in the built-in browser on a hooked throwaway copy: every text above shows as written on its screen, with no script errors.

## 43. Bankrupt at $0, clearer money-shame warning

- **Bankrupt:** net worth under **$0** at the end of 3 days in a row, still counted from day 5 (`CONFIG.bankrupt.netWorthBelow` 500 → 0; `daysInARow` 3 and `fromDay` 5 unchanged). The Rules screen, the bankruptcy warning (with the gap and a way out), the first-week checklist and the game-over text all read the setting, so they now say $0.
- **Money shame** is unchanged as a rule: it was, and still is, applied once overnight from your net worth when you end the day (under $100: −3 happiness; under $0: −8 happiness and −5% energy). Only the wording changed, because the daytime warning read as if it cost you during the day. Now it says "💸 Nearly broke ($X): if your net worth is still under $100 when you end the day, shame costs 3 happiness" (and the same for "In debt"). The Rules screen says "checked when you end the day … Nothing is taken during the day". The "In debt" warning no longer repeats the bankruptcy rule, because the bankruptcy warning shows next to it.
- `docs/Daily Grind Config Guide.docx`: `bankrupt.netWorthBelow` is now 0 in the settings list and the quick-changes table.
- Checked in the built-in browser on a hooked throwaway copy: $300 net worth for five nights from day 4 no longer ends the game; with net worth under $0 from day 4, day 4 does not count, days 5, 6 and 7 do, and the game ends Bankrupt at the end of day 7 ("under $0 for three days in a row"); the Nearly broke warning shows the new wording and happiness does not change during the day.
- `tools/qa` simulations (report: `docs/QA_Sim_2026-10-20_bankrupt-zero.md`, raw data in the `.json` beside it), 20 careful-bot seeds (1–20) and 10 random games, compared with the section 41 build on the same seeds: no script errors, broken invariants, stuck days or log/effect mismatches. Careful bot 18 Comfortable, 2 Time's up, 0 Bankrupt (was 17 / 2 / 1). Only seed 3 changed: it was Bankrupt at the end of day 7 with net worth $229–$411 and now ends Comfortable with $2,325. The other 29 games are identical. No game in this run went below $0.

## 44. Housing bubble, sleep, shorter shifts, burnout and illness

### Housing bubble: you can lose your home
- When a housing bubble starts (the **Housing bubble bursts** shock or the **Housing bubble pops** headline), there is a **50%** chance you lose your Apartment or Bungalow (`CONFIG.housing.loseChance`). It is rolled once, when the event fires, and the event card and the morning notes say so.
- With no home: no rent is due (the rent day logs "No rent was due tonight"), every night counts as sleeping outside, and you cannot rest, cook, eat at home, eat chips or self-study there. Your fridge, coffee machine and gadgets are in storage: no fridge space (food keeps 3 days), no gadget or coffee bonus. Your things still count in net worth. Rent arrears and medical bills are still collected.
- **Apply again** at either home: the Apartment asks for a **$150 deposit** (`aptDeposit`), the Bungalow its usual **$300** move-in fee, both moved by the price index (`G()`), and applying takes **1h** (`applyMinutes`). The Bungalow still needs a job. Rent then carries on on the usual 5-day cycle.
- The HUD shows **No home** and "Rent: None (no home)". The map drops the Home tag, and the end-day button reads **Sleep outside** everywhere. A 🏚️ warning stays in the overview until you have a home again. "Lost your home" is a toast and an end-of-run moment.

### Sleep gives 1.5× as much
- A night's sleep at home now gives 1.5 times the energy, happiness and health it did, caps included. Energy: the rest rate × **1.5** (`sleep.energyX`), up to **52%** (`maxEnergy`, was 35). Happiness: **1.5** per full hour (`happinessPerHour`, was 1). Health: **1.5** per hour up to **15** (`health.sleep`, was 1 and 10).
- Sleeping outside still gives `awayShare` (half) of those, so it goes up 1.5× too. The 2h rest, the Bungalow's bed bonus and the nightly −15% energy / −10 happiness are unchanged.

### Shifts are an hour shorter
- Every shift band is one hour shorter, for the same pay and energy: under $130 **4h30** (was 5h30), $130–249 **3h45** (4h45), $250–449 **3h15** (4h15), $450+ **2h30** (3h30). Freelance coding at home is **2h30** (was 3h30, `time.freelanceMinutes`).
- Shift length is now set in minutes (`time.shifts[].minutes`), because the 36-minute units could not give these lengths. Pay per hour still rises with pay (rule checker passes).

### Burnout: more than 10 hours of work and study, 3 days running
- Burnout now counts **shifts, school lessons and self-study together**. More than **10 hours** in a day (`burnout.loadMinutes` 600), **3 days in a row** (`daysInARow`), burns you out for **3 days** (`lastsDays`). Exactly 10h does not count. The one-off hits (−15 health, −10% energy, −8 happiness), the 20% pay cut, the nightly health loss and the extra illness risk are unchanged.
- This replaces the two separate rules (study over 5h a day, or work 9h or more a day). The workplace, School and home screens show "Work and study today: Xh" with the streak. The warning the day before burnout and the overview warning use the combined total.
- The **Bookworm** trait's drawback is now "burnout starts after 9 hours of work and study a day" (`burnout.loadMinutes` 540, was `burnout.studyMinutes` 240).

### Illness
- **Low energy has to last.** The energy table only applies once you have gone to bed with energy under **30** on **3 of the last 5** nights (`illness.lowEnergyBelow`, `lowNights`, `lowWindow`). Until then you get the "everyone else" chance (about 0.5% a night before health, diet and gym). The overview warns when tonight would count as a low night.
- **Which illness:** cold **30%**, flu **40%**, dengue **15%**, pneumonia **15%** (`illness.mix`), whatever your energy. Before, flu and cold dominated and the mix depended on energy.
- **Pandemics:** while a pandemic or lockdown story runs, illness is **30%** more likely (`illness.pandemicX` 1.3). This is applied once, however many such stories are running. Removed `macro.illnessStrength` and `macro.outbreakIllness`, which scaled these stories much harder (about 3.4–3.8×, and they stacked).
- **Every illness costs 10 health a night** (`health.nightly.sick`, was 6).
- **Flu:** lasts up to **3 days** (was 4) and costs **2h** (was 7h15) and **5 happiness** (was 10) a day (`hospital.flu.minutes`, `happiness`, `days`).
- **Cold and flu can be slept off:** each night you sleep at home while sick there is an **80%** chance you recover (`hospital.homeRecover`). If that roll fails, only Hospital treatment will cure it. A cold or flu you never roll on (you slept outside) still clears after its `days`.
- **Dengue and pneumonia need the Hospital.** They never clear on their own.
- **Hospital treatment always cures you**, as before (with the 80% chance of a ward day first, unchanged).
- The 2h rest no longer adds to the recovery chance. Removed `hospital.restRecover`, `restRecoverMax`, `sleepRecover` and each illness's `recover`. The home, Hospital, overview and work-refusal messages say what cures the illness you have.

### Screen text, CONFIG and saves
- The Rules screen's Tired, Burnout and Illness lines and a new **Housing bubble** line are all written from `CONFIG`.
- New `CONFIG` keys: `housing` (`loseChance`, `aptDeposit`, `applyMinutes`), `sleep.energyX`, `time.shifts[].minutes` (replaces `units`), `time.freelanceMinutes`, `burnout.loadMinutes`, `illness.lowEnergyBelow`, `lowNights`, `lowWindow`, `pandemicX`, `mix`, `hospital.homeRecover`, `hospital.cold.rest` / `flu.rest`, `hospital.flu.minutes`. Changed: `sleep.maxEnergy` 35 → 52, `sleep.happinessPerHour` 1 → 1.5, `health.sleep` 1/10 → 1.5/15, `health.nightly.sick` −6 → −10, flu `days` 4 → 3 and `happiness` 10 → 5. Removed: `burnout.studyMinutes`, `workMinutes`, `workDaysInARow`, `macro.illnessStrength`, `macro.outbreakIllness`, `hospital.restRecover`, `restRecoverMax`, `sleepRecover`, the illnesses' `recover`, and dengue's and pneumonia's `days`.
- Save fields: `loadStreak`, `lowE` (low-energy nights) and `homeless` are new. `studyStreak`, `workStreak` and `sickRest` are dropped when an older save loads. An older save loads with a fresh streak and no low-energy history.
- `docs/Daily Grind Config Guide.docx`: the illness, hospital, burnout, time and sleep rows, a new housing row, new quick-change rows (`sleep.energyX`, `illness.mix`, `hospital.homeRecover`, `housing.loseChance`, shift minutes), `burnout.loadMinutes` in place of `studyMinutes`, the Bookworm drawback, and the line numbers.
- `tools/qa/sim.js`: the careful bot keeps work and study under 10h on the last day of a streak, no longer naps while sick, re-applies at the Apartment if it loses its home, and does not try to cook while homeless. `run-sims.ps1` also exposes `homeFee` to it.

### Checks
- Checked in headless Chromium on a hooked throwaway copy (cloud sandbox, outside the repo), 41 checks, no script errors:
  - **Shifts and sleep:** shift minutes by pay band 270/225/195/150; a Crew Member shift shows 4h 30m and uses 270 minutes. 10h asleep at the Apartment gives +45% energy, +15 happiness and +15 health; outside, +23/+8/+8.
  - **Burnout:** exactly 10h of work and study does not start a streak; three days of 10h15 burn you out for 3 days; a short day resets the streak; study alone over 10h counts.
  - **Illness odds:** energy 5 with no low-energy history gives the base chance (0.4%); 2 low nights in 5 still give the base chance, 3 give 32%; a low night 6 days ago no longer counts. One or two pandemic stories give exactly 1.3×. 4,000 forced illnesses split 30/39/15/15.
  - **Recovery:** sleeping at home cures the flu 80.8% of the time over 2,000 tries, and none recovered later after a failed roll. Flu without a roll clears after 3 days and costs 2h and 5 happiness a day. Dengue is still there after 10 nights at home. The Hospital treats a flu that failed its roll.
  - **Housing:** a roll of 0.6 keeps the home and 0.4 loses it. With no home, the button reads Sleep outside at the Apartment, the panel shows the notice and **Apply to rent**, there are no rest or sleep buttons, the HUD says No home, and the rent day is skipped. Re-applying by click charges G($150) and 1h. The Bungalow is refused without a job. The "Housing bubble pops" headline can also take the home.
  - **Rules screen and old saves:** the Rules screen shows the new lines. An older save with study and work streaks loads.
- Rule checker (`daily-grind-checks`, adjusted for shift minutes and the combined burnout line): passes on the base and on this change. The only warning (Gym Instructor's pick comment says $150, pay is $120) was already there.
- `tools/qa` simulations (report: [`docs/QA_Sim_2026-10-21_housing-sleep-shifts-illness.md`](docs/QA_Sim_2026-10-21_housing-sleep-shifts-illness.md), raw data in the `.json` beside it), 20 careful-bot seeds (1–20) and 10 random games on base `c9f7963` and on this change: no script errors, broken invariants, stuck days or log/effect mismatches.
  - Careful bot: **11 Wealthy, 9 Comfortable**, average $5,136 (base: 18 Comfortable, 2 Time's up, average $2,822), mostly because shorter shifts fit more paid work into a day. Random games: all Hospitalised on the same days, as before.
  - In these 30 games, illness came up once (pneumonia, treated) and burnout and the housing bubble never did. Extra runs with the home removed on day 3 and the flu given on day 6 played through with no errors: the bot re-applied the same day and every game finished Comfortable or Wealthy.

## 45. One storyline a game, no repeats, 100 mini stories and 30 storylines

### One storyline a game
- Every game now has **exactly one** multi-day storyline. It starts on the evening of a random day from **day 2 to day 8** (`CONFIG.events.storyline.fromDay`, `toDay`). After it ends, no new storyline starts for **15 days** (`gapDays`), so with 15-day games there is one per game. Before, a storyline had a 10% chance each night, so a game had none, one or two.
- **Macro shocks** keep their own nightly chance of **10%** (`events.macroChance`). As before, they never start while a storyline or another shock is running, or within 3 days of one ending (`bigGap`). They also never start so close to the storyline's start day that the two would overlap.
- Removed `events.bigChance` and `events.sagaShare`.
- A storyline that starts on day 8 and runs 9 days is cut short when the game ends on day 15, so its last chapter is not shown.

### No repeats
- **Mini stories, macro shocks and storylines** are now dealt from a shuffled deck, as decisions and news already were. None repeats until all have been seen. Before, they were picked at random with repeats allowed: about half of all games showed the same mini story twice.
- **No chapter repeats within a storyline.** Each night's chapter is picked from the ones in its phase that have not been shown yet. Before, only yesterday's chapter was avoided, so a week-long storyline could show the same headline twice in a few days.
- **More chapters.** Each of the 7 original storylines gets 2 more chapters per phase: start 4, escalation 5, peak 5, easing 4. Every storyline now has enough chapters to never repeat, even at its longest, 9 days.

### More content
- **Mini stories: 9 → 100.** The 91 new ones are everyday situations, each played out in one night with 1 to 3 steps. Examples: a garage sale, a scam call from "the bank", tutoring a neighbour's kid, a cracked phone, a karaoke contest, a sneaker drop, a stray kitten, a cousin who needs money (three options), a sunrise hike, a weekend stock audit.
- **Storylines: 7 → 30.** The 23 new ones are housing bubble, currency crisis, food crisis, general strike, cyber attack on the banks, green energy boom, tourism boom, haze season, monsoon floods, chip shortage, government stimulus, recession, crypto mania, shipping crisis, automation wave, credit card crunch, heatwave, election season, commodity boom, bird flu outbreak, big sports event, retail shake-up and water shortage.
  - Each has 15 chapters (start 3, escalation 5, peak 4, easing 3), including two yes/no choices, and its own daily economic effects and explained economics term.
  - The **Housing bubble** storyline rolls the home-loss chance (`CONFIG.housing.loseChance`, 50%) once, on its first evening, like the existing shock and headline.
  - The **Bird flu outbreak** storyline makes illness more likely like a pandemic (`illness.pandemicX`). The Rules screen now says "pandemic, outbreak or lockdown".
- In total there are 471 storyline chapters (was 70).
- **Every story step has a free choice** (decline, walk away, put it off). A story option is disabled when you cannot afford its worst case, so a step with only paid choices froze the end-of-day card for a player with no cash. The QA sims caught this ("A surprise party", random seed 104), and 15 steps in 14 new stories were fixed.
  - **Safety net:** if a story card ever has no affordable choice, it now shows a **Leave it** button that ends the story with no effect.

### Decision cards
- Decision cards no longer all read "❓ You face a choice". The heading and icon now follow what the question is about: 💼 work, 💰 money, 👥 friends and family, 🩺 health, 🛍️ shopping, 🎉 going out, 🏠 everyday life. Each topic has 3 headings that rotate. Questions that fit no topic keep "❓ You face a choice" (16 of the 141).
- **Twists** (the extra line sometimes added to a safe answer): 6 → 30.

### Saves and the guide
- New save fields: `sagaNext` (the day the next storyline starts) and `deckS`, `deckM`, `deckG` (the story, shock and storyline decks). A running storyline also remembers its shown chapters (`saga.used`).
  - An older save that already had a storyline waits 15 days for the next one.
  - An older save that had none gets a start day from the window, or today if the window has passed.
- `docs/Daily Grind Config Guide.docx`: the events row, new quick-change rows (storyline window, `gapDays`, `macroChance`), the date and line numbers.

### Checks
- **Content check** (scratch script): 100 stories and 30 storylines pass.
  - Every effect token is valid, every story step can be reached and leads to a step that exists, and every option has outcomes.
  - Every choice chapter has the right shape. Every storyline has 4 phases with enough chapters never to repeat (at least 1/4/3/1).
  - Every story step has a choice that costs nothing.
  - Separately, a test story whose choices all cost money, played with −$50 cash, shows **Leave it**, which closes the card.
  - No duplicate chapter titles within a storyline or across storylines, and no duplicate story titles.
- **500 simulated 15-day games** (the game's own night-event code in headless Chromium), compared with the section 44 build:

  | | Section 44 build | This change |
  |---|---|---|
  | Storylines per game | 0: 166, 1: 274, 2: 60 | 1 in all 500 |
  | Storyline start day | Any day 1–15 | Days 2–8, about evenly (58–82 games each) |
  | Repeated storyline chapters | 224 | 0 |
  | Repeated mini stories | 368 (257 games) | 0 |
  | Repeated macro shocks | 5 | 0 |
  | Decision headings | 1 | 22 |
  | Macro shocks per game | About 1.1 | About 0.23 (387 games none, 112 one, 1 two), because the storyline now fills more of the game |

- **Clicked through in headless Chromium:**
  - "Your cousin needs money" shows its three options, and picking one shows its outcome.
  - The boss overtime question gets a 💼 work heading.
  - On its start day the Housing bubble storyline opens with "Housing bubble · day 1 of 5" and, with the loss chance at 100% for the test, "You lost the Low-End Apartment". No script errors.
- The section 44 mechanic checks (41) and the rule checker still pass.
- `tools/qa` simulations (report: [`docs/QA_Sim_2026-10-22_events-variety.md`](docs/QA_Sim_2026-10-22_events-variety.md), raw data in the `.json` beside it): 20 careful-bot seeds (1–20) and 10 random games on `main` `c460c42` and on this branch at `8f854b6`. No script errors, broken invariants, stuck days or log/effect mismatches.
  - Careful bot: 10 Wealthy, 10 Comfortable, average $5,270 (was 11 Wealthy, 9 Comfortable, average $5,136).
  - Random games: all Hospitalised, as before.
  - The first run, before the free-choice fix, froze on "A surprise party" in random seed 104. That is how the bug above was found.

## 46. Morning pop-up: no repeated warnings, fits a phone screen

- **Repeated warning fixed.** "You have worked and studied more than 10 hours…" showed twice in the morning pop-up. The overnight burnout check added it as a note, and the warnings list added it again. Now it comes only from the warnings list.
- **Burnout start.** On the day burnout starts, the pop-up also showed "🔥 Burnout (3 days left)" under the "🔥 BURNOUT!" note. That line is now left out on the first day (it still shows on the overview and on later days).
- **Pop-ups fit the screen.** Every pop-up card is now at most the screen's height and scrolls inside itself. Before, the morning pop-up had no height limit: with a long list on a phone it ran off the top and bottom of the screen, and "Got it" could not be reached. In the morning pop-up, **Got it** stays pinned to the bottom of the card while the list scrolls. On phones (640px or narrower), pop-ups have less padding around them.
- **Checked in headless Chromium on an iPhone 13-sized screen** (390×664), on a day with 13 morning notes. Before: the warning shows twice, the card runs from 335px above the screen to 335px below it, "Got it" is off-screen and a tap cannot close it. After: the warning shows once, the card fits the screen (10–654px) and scrolls, and a tap on "Got it" closes it. On a burnout-start day only the BURNOUT! note shows. No script errors. The section 44 mechanic checks still pass.

## 47. Comfortable at $1,000

- The first rank, **🙂 Comfortable**, is now reached at **$1,000** net worth (`CONFIG.ranks[0].netWorth` 2000 → 1000). It is still due by the end of **day 8** for its +500 on-time bonus. Wealthy ($5,000 by day 12) and Tycoon ($10,000 by day 15) are unchanged.
- Reaching Comfortable is also what wins the game, so the win line is now $1,000. The welcome screen, Rules ("Net worth reaches $1,000", "Time's up… still under $1,000"), HUD ("next: Comfortable $1,000 by day 8") and goal pop-up all read the setting. The HTML placeholder text was updated to match.
- A shopkeeper's "Doing well for yourself, I hear." line used a fixed $2,000. It now follows the first rank.
- `docs/Daily Grind Config Guide.docx`: the ranks row and the "Make the first goal easier to reach" row now say 1000.
- Checked in headless Chromium: the welcome screen, Rules and HUD show $1,000, with no script errors.
- `tools/qa` simulations (report: [`docs/QA_Sim_2026-10-22_comfortable-1000.md`](docs/QA_Sim_2026-10-22_comfortable-1000.md), raw data in the `.json` beside it), 20 careful and 10 random games against `main` `21b8f81`. No script errors, broken invariants or stuck days.
  - Every careful game already passed $2,000, so no ending flips.
  - The careful bot now ends with 14 Wealthy and 6 Comfortable, average $5,525 (was 10 and 10, average $5,270). It reaches the first rank earlier and plays on from there.
  - The random games never reach $1,000 and are identical.

## 48. Compact card layout on every screen

Layout and wording only; no rules or `CONFIG` values change. It was tried first on the Apartment, Bungalow and Bank, then carried to every building.
- **Actions are one row:** a name, the numbers as small icon chips (time, energy, happiness, health, knowledge, cash) and the button. Sentences under buttons are gone. For example, "Sleep the remaining 15h: +52% energy, +15 health and +23 happiness (1.5 per full hour), against the nightly −15%…" is now `⏱ 15h ⚡ +52% ❤ +15 🙂 +23`.
- **Rules move behind ⓘ:** each section heading (Your home, Your things, Kitchen, Rest & sleep, Study & work, Rent & bills, Savings and investments) has an ⓘ that opens its explanation, with the same numbers as before, all from `CONFIG`. Status sits on the right of the heading as chips (Eaten today, Meals 1/3, Comfort 0/5, today's work and study against 10h, Market steady). Each Bank card and the loan have their own "Details" / "How loans work". An open ⓘ stays open after you press a button.
- **Shorter labels:** for example "Eat a ready-to-eat meal · 1" becomes "Ready-to-eat × 1", "Fridge: no fridge · a refrigerator keeps 5 meals for 6 days" becomes "Fridge: none", and "Rent of $150 is due at the end of day 5…" becomes a "Due end of day 5" chip.
- **Bank:**
  - The loan shows its limit and one line, "Borrow $50 → repay $56 by the end of day 7"; the rules are under "How loans work".
  - Each product card shows what it is worth (or "Not invested"), its expected return a day and how often it loses, as chips.
  - The comparison table stays; its explanation is under the section's ⓘ.
  - The news tip-off keeps its own line.
- **Shopkeeper:** on these three screens the quote is one quiet italic line instead of a boxed panel.
- **Each section is its own card:** a white box with a border and a tinted heading band with an icon (🏠 Your home, 📦 Your things, 🍳 Kitchen, 😴 Rest & sleep, 📚 Study & work, 🧾 Rent & bills; 💳 Loan, 📈 Savings and investments). The section's status chips sit on the band, and its rows sit inside the card. The Bank's investment cards now sit inside the Savings and investments card. The loan rules moved from "How loans work" to the Loan heading's ⓘ, like the other sections. On a phone, the heading chips wrap under the title.
- On these screens the visible text drops by about half: Apartment 376 → 188 words, Bank 477 → 188, in the same game state.
- **Every other building uses the same layout:**
  - **Employment Office:** a 💼 Job board card. Each job lists its requirements as chips, with the ones you already meet in green, plus knowledge, dress code and "5 shifts here" for work experience. Jobs sit in three columns instead of five; the board rules are under ⓘ.
  - **Workplaces:** a 💼 Your shift card with today's work against 12h and work + study against 10h. The shift row shows time, energy, dress code and any pay penalty as chips, with the reason in one line.
  - **School:** 📘 Now studying (lesson time and energy as chips) and 🎓 Pathways (next level, modules, lesson length and fee). The school rules are under ⓘ.
  - **Supermarket:** 🛒 Food (fridge state and buy time on the heading; each item's effects as chips; bundle saving) and 🎟️ Lottery.
  - **Fast Food and Restaurant:** a menu card with effect chips and Junk / Healthy tags. Fast Food shows your junk count for the last 5 days.
  - **Electronics Store and Thrift Store:** 🔧 Repairs and 🛍️ For sale / Second-hand. Items are one row each, in one column, with a short description.
  - **Hospital:** 🏥 Your health (health, illness or Healthy, insurance, check-up on the heading) and 🩺 Treatment, with how treatment and billing work under ⓘ.
  - **Clothes Mall:** 👔 Clothes (how long each outfit lasts, days left on yours, buy and bargain). **Pawn Shop:** what each thing pays, and your pawn tickets. **Gym:** classes with effect chips and your visits in 5 days. **Factory:** a single heading.
- **Shopkeeper lines** are one quiet italic line on every screen.
- **Bank table on phones:** the comparison table now fits a phone screen, with all four columns. Long ranges wrap onto two lines instead of the last column being cut off.
- Checked in headless Chromium on desktop (1440×900) and phone (iPhone 13): every building opens in the new layout with no old-style rows and no sideways overflow. 98 different buttons across all buildings were pressed once each with no script errors. The section 44 mechanic checks pass.
- All buttons keep their `data-act` names, so keyboard shortcuts and `tools/qa/sim.js` still work. The section 44 mechanic checks pass (they click rest, sleep, the home application and others).

## 49. School: a shorter "Now studying" card

Layout only; no rules change.
- Each course in progress is now **one row**: its name, one chip for where you are ("Module 1/2 · Food Hygiene 1/2"), lesson time and energy, a thin progress bar for the level and the Study button on the right. The row of module pills is gone. Hover the bar to see the modules (✓ done, ▸ current).
- On phones the Study button stays beside the course instead of dropping to a full-width bar underneath.
- The card is about a third shorter with two courses in progress: 302 → 198px on desktop, 395 → 269px on a phone (iPhone 13).
- Checked in headless Chromium: Study opens the action preview, which still reads "Go to class: Food & Beverage Certificate", and confirming it attends the lesson. No script errors. The section 44 mechanic checks pass.

## 50. A more compact Employment Office job board

Layout and wording only; no rules change.
- **"Work exp needed":** jobs that still need work experience (`CONFIG.jobs.experience`, 5 shifts at that workplace) show a red **Work exp needed** chip instead of "5 shifts here". Hovering over it says how many shifts are needed and how many you have.
- **Name and pay on one line:** the role's name and its pay (in teal), followed by its requirement chips, so most jobs fit on one line.
- **Shorter qualification chips:** "F&B", "Cust. Service", "Eng.", "Tech", "Cert" and "Hons", for example "Cust. Service Cert" or "F&B Degree". The full name shows on hover.
- **Removed chips:** "No qualification" is gone, since a job with no requirement chips is open to anyone. The Casual dress chip is gone too; only Smart casual and Suit show, and the board's ⓘ explains that the rest need ordinary clothes.
- **Tighter rows and phones:** chips, buttons and rows are smaller. On phones the Apply button stays beside the job.
- The board is shorter: 990 → 820px on desktop, 2,709 → 1,957px on a phone (iPhone 13), in the same game state.
- Checked in headless Chromium: Apply still hires (Kitchen Hand), and "Show all" still expands the board from 38 to all 71 jobs. No script errors.

## 51. A more compact welcome screen and status page

Layout and wording only; no rules change.
- **Welcome screen:**
  - **Starting trait** collapses to one line, "🎭 Starting trait: No trait · optional · tap to change". Tap it to open the trait list (two per row on desktop). The line then shows your pick, for example "🦉 Night Owl".
  - **The four rule bullets** become four short tiles: 24 hours a day, Eat once a day, Rent every 5 days, Clothes last 5 days. The numbers are still filled in from `CONFIG`. The longer explanation is under **More about how to play**.
  - The card is about half as tall: 977 → 502px on desktop, 1,477 → 711px on a phone (iPhone 13).
- **Status page:**
  - Current pay sits on one line, for example "$116/shift · Shift Supervisor · Fast Food".
  - The vitals are a 2×2 grid. On phones each bar sits under its label and value.
  - "Life & learning" and "Rent & clothing" become one **Home & life** card (home, rent, belongings, clothes, education). Clothes are small chips, for example "Casual 5d", "Smart —" or "Suit —"; hover for the full name and days left.
  - The **First week** checklist keeps its original text.
  - The vitals label reads **Knowledge** where it fits and **Know** on phone-width screens (440px or narrower).
  - The page is shorter: 868 → 773px on desktop, 1,186 → 1,096px on a phone.
- Checked in headless Chromium on desktop and phones (iPhone 13 and iPhone SE). On a phone the trait line opens with a tap, choosing Night Owl updates it, and the game starts with that trait. "Knowledge" fits on desktop and laptop, and "Know" shows on phones without overlapping. No script errors. The section 44 mechanic checks pass.

## 52. Phones: buttons beside the text

Layout only; no rules change.
- On phones (640px or narrower), a row's button (Buy, Buy 1, Buy bundle, Join in, Book, Eat, Study, Apply…) now sits on the right of its row, beside the name and chips, as on desktop. Before, it dropped to a full-width bar underneath. Row buttons are a little smaller on phones to leave room for the text.
- This applies to every building. Rows with two buttons side by side, such as Cook 1 / Cook 2 at home or Buy / Bargain at the Clothes Mall, still stack under the text because they do not fit beside it.
- Panels are shorter on a phone (iPhone 13): Supermarket 963 → 696px, Apartment 1,537 → 1,272px, Gym 655 → 527px, Hospital 478 → 334px.

## 53. Vital costs for study, work, walking, cooking and meals

- **School lessons** cost 5% energy and 5 happiness for every hour of the lesson. New `CONFIG.education.lessonEnergyPerHour` (−5) and `lessonHappinessPerHour` (−5).
- **Self-study at home** costs 5% energy and 5 happiness an hour, and still costs 3 health a session. New `CONFIG.selfStudy.energyPerHour` (−5) and `happinessPerHour` (−5). They replace the flat `selfStudy.energy` (−3), which is removed. The Bookworm trait now sets `selfStudy.energyPerHour` to −8.
- **Work** also costs happiness: half the shift's energy cost, rounded up (a shift that costs 10% energy costs 5 happiness). Freelance coding counts as work. New `CONFIG.time.workHappinessShare` (0.5).
- **Walking** to another building costs 1% energy for every 15 minutes of walking. The move message shows it, e.g. "(30m, −2% energy)". New `CONFIG.time.walkEnergy` (−1).
- **Cooking** costs 5% energy for every 3 hours, in proportion (3h30 = −6%). New `CONFIG.food.cookEnergy` (−5).
- **Meals:** a cooked meal now gives +20% energy and +10 health (was +22% and +1). A ready-to-eat meal gives +20% energy and +5 health (was +30% and +2). Happiness is unchanged.
- **Chef's tasting menu** gives +18% energy (was +26%). Its price, happiness and health are unchanged.
- **Business Suit** gives +2 happiness when bought. New `CONFIG.clothes.suit.happiness` (any outfit can have one).
- Rows show the new costs as chips (work, freelance, self-study, Now studying, meal prep, the suit), the welcome screen says walking costs 1% energy per building, and the ⓘ notes in the Kitchen, Study & work and School sections mention the new costs. The Config Guide has the new keys.
- **Simulation runs:** first values (walking 2%, cooked meal +15%, ready-to-eat +12%): [docs/QA_Sim_2026-10-24_vital-costs.md](docs/QA_Sim_2026-10-24_vital-costs.md). The careful player went from 14 Wealthy and 6 Comfortable (average $5,525) to 6 Comfortable, 6 Time's up, 6 Hospitalised and 2 Bankrupt (average $484). Softened values (as above): [docs/QA_Sim_2026-10-24_vital-costs-softened.md](docs/QA_Sim_2026-10-24_vital-costs-softened.md). Money recovers (average $1,531, nobody runs out of cash), but 17 of 20 careful games end with You gave up because happiness runs out. No script errors in either run.

## 54. Free time: home activities, the Park, and coffee and cake

New ways to lift happiness, so that a long day of work and study does not have to end in "You gave up".
- **Home, new "🎈 Free time" card** (Apartment or Bungalow, not while homeless):
  - **Watch a show** (or **Play games** if you only have a console): 1 hour, free, +4 happiness. Needs a working TV or game console.
  - **Call your family:** 30 minutes, free, +3 happiness, once a day.
  - The existing **Rest** (nap) stays as it was.
- **New building: the Park** 🌳, a free green space between the Low-End Apartment and the Clothes Mall (15 minutes from either; it replaces the small decorative park that was there). Walking times between the other buildings are unchanged.
  - **Walk in the park:** 1 hour, free, +5 happiness, +1 health.
  - **Go for a jog:** 1 hour, free, −8% energy, +4 happiness, +3 health. Not under 15% energy.
- **Restaurant: coffee and cake.** 45 minutes, $12 (moves with prices), +3% energy, +6 happiness. It is a snack, so it does not count as your daily meal.
- New `CONFIG.leisure` group (Group 8): `screen` {minutes 60, happiness 4}, `call` {minutes 30, happiness 3, perDay 1}, `walk` {minutes 60, happiness 5, health 1}, `jog` {minutes 60, energy −8, happiness 4, health 3, minEnergy 15}. New `CONFIG.food.cafe` {minutes 45, cost 12, energy 3, happiness 6, snack true}; `snack: true` means a Restaurant item does not count as a meal.
- New save field `S.calls` (calls made today). Old saves load with it empty.
- Rules: a new "Free time" line, filled in from `CONFIG.leisure` and `CONFIG.food.cafe`, and the Health line now mentions the Park. The day chart has a new "Leisure" colour. The Config Guide has the new keys.

## 55. Interview pop-ups leave a second sooner

Display only; no rules change.
- The "You passed the interview" and "Didn’t pass the interview" pop-ups now stay on screen one second less than other pop-ups of the same length (for example 3.4 seconds instead of 4.4).
- New `CONFIG.ui.toasts.shorter` {seconds 1, words [the two interview phrases]}. A pop-up never shows for less than 1 second. The Config Guide has the new key.

## 56. Watch a show, shorter self-study, new gym classes, Factory options without a job

- **Watch a show / Play games** (home): now −1% energy and +7 happiness (was +4 happiness, no energy). `CONFIG.leisure.screen` {energy −1, happiness 7}.
- **Self-study** takes 2 hours instead of 3, and its costs drop to match: −10% energy, −10 happiness, −2 health a session (was −15%, −15, −3). Knowledge per session is unchanged (computer +6, tablet +5, phone +4). `CONFIG.selfStudy.minutes` (120) replaces `selfStudy.units` (5), which is removed; `selfStudy.health` goes from −3 to −2.
- **Gym:** five classes, each with its own purpose. Pilates is removed.

  | Class | Time | Cost | Energy | Health | Happiness | Workouts |
  |---|---|---|---|---|---|---|
  | Yoga & stretch | 1h | $12 | +4% | +2 | +6 | 1 |
  | Boxing class (new) | 1h | $20 | −12% | +5 | +10 | 1 |
  | Strength training | 2h | $23 | −18% | +15 | +3 | 2 |
  | Spin (HIIT) | 30m | $25 | −15% | +8 | +5 | 1 |
  | Sauna & massage (new) | 1h30 | $40 | +10% | +1 | +10 | 0 |

  "Workouts" is how many gym visits a class counts as for a lower chance of falling ill. Strength training counts as two; the sauna does not count. Under 15% energy you are too tired for a class that costs energy, but yoga and the sauna are still open. The gym's header now counts workouts instead of visits. The classes moved from a table in the code into the new `CONFIG.gym` (`minEnergy` 15, `classes`).
- **Factory, for anyone without a job there** (hidden once you hold a Factory job):
  - **Day labour on the loading dock:** 4 hours, once a day, no dress code. Pays 60% of the lowest Factory wage (Forklift Driver, $110, so about $66 before the pay index, knowledge and morale). Costs 10% energy and 5 happiness. Counts towards the daily work limit and burnout, but not as work experience. Not while sick or while the Factory is closed.
  - **Safety course:** 3 hours, $30, +3 knowledge, once a game. Counts as 1 shift of Factory work experience.
  - **Factory tour:** 1 hour, $5, +2 knowledge, +2 happiness, once a game.
  - New `CONFIG.factory` {`dayLabour` {minutes 240, payShare 0.6, energy −10, perDay 1}, `course` {minutes 180, cost 30, knowledge 3, expShifts 1}, `tour` {minutes 60, cost 5, knowledge 2, happiness 2}}. New save field `S.fac` (day labour today, course and tour done); old saves load with it empty.
- Rules: a new "Factory without a job" line and the updated Free time line, both filled in from `CONFIG`. The Config Guide has the new and changed keys.

## 57. A bonus with every qualification

- Earning a qualification (the moment the certificate pops up) now adds knowledge and happiness, growing with the level: **+5 each for a Certificate, +10 for a Degree, +15 for Honours, +20 for a Masters.** This comes on top of the knowledge from lessons and modules. The certificate shows the bonus (for example "Bonus: +10 happiness, +10 knowledge"), and so does the "Qualification earned" line in the log. Both show the real change, so a bonus that would take a vital over 100 shows less.
- New `CONFIG.education.certKnowledge` and `certHappiness`, each {Certificate 5, Degree 10, Honours 15, Masters 20}. The School line in the Rules lists them, filled in from `CONFIG`. The Config Guide has the new keys.

## 58. Shorter classes for Degree, Honours and Masters

- Total class time per qualification: **Degree 24h → 12h, Honours 36h → 8h, Masters 48h → 6h.** Lessons are shorter; the number of lessons per module stays the same, except Masters, which goes from 4 to 3.

  | Level | Lessons per module | Lesson length | Lessons in all | Class time |
  |---|---|---|---|---|
  | Certificate | 2 | 1h | 4 | 4h (unchanged) |
  | Degree | 3 | 1h (was 2h) | 12 | 12h |
  | Honours | 3 | 40m (was 3h) | 12 | 8h |
  | Masters | 3 (was 4) | 30m (was 3h) | 12 (was 16) | 6h |

- Lesson costs are per hour, so they drop with the time (rounded per lesson): a 40-minute lesson costs 3% energy and 3 happiness, a 30-minute lesson 2 and 2. From first lesson to certificate (with the bonus from section 57): Degree −60% energy, −50 happiness, +34 knowledge; Honours −36%, −21, +43; Masters −24%, −4, +48 (Finance, Technology) or +52 (Medicine, Engineering). Masters gives 4 less knowledge than before because it has 4 fewer lessons.
- Customer Service (its own 3 × 3h Certificate) is unchanged. Saves part-way through a Masters module carry on: a module whose 3rd lesson is already done finishes at the next lesson.
- The lesson tables (`LES_N`, `LES_H`) are next to `TRACKS`, not in `CONFIG`.

## 59. Gentler nights, smaller comfort bonus

- **The fixed nightly change** (before sleep is added back) is now: energy 0% (was −15%), happiness −5 (was −10), health 0 (was −1), knowledge −2 (was −1). `CONFIG.sleep.nightEnergy` 0, `sleep.nightHappiness` −5, `health.nightly.always` 0, `selfStudy.nightlyLoss` −2.
  - Example, in bed at the Apartment with 8 hours left and fed: energy +36% (was +21%), happiness +7 (was +2), health +12 (was +11), knowledge −2 (was −1).
- **Comfort items** (TV, console, fridge, coffee machine, computer) now each make resting and sleep restore 5% more energy (was 10%). New `CONFIG.sleep.comfortBonus` (0.05) replaces the 10% written in the code.
- **Night Owl** keeps its drawback of 1 extra health lost a night: it now sets `health.nightly.always` to −1 (was −2, when everyone lost 1).
- **Bookworm**'s "stop forgetting overnight" now saves 2 knowledge a night instead of 1.
- Text: the Rules "Every night" line, the bedtime message and the overnight log lines are built from these values and leave out anything that is 0. The Apartment, Bungalow, rest and coffee machine texts take the comfort bonus from `CONFIG`. The Config Guide has the new keys.

## 60. Toasts for every action, a quieter certificate, and a list of your belongings

Display only; no rules change.
- **Every button's message is now a toast.** The line that used to appear at the top of a building panel ("You called your family (30m, +3 happiness)") is gone, and the panel no longer scrolls back to the top after a button. Instead, every message an action writes to the log pops up as a toast, including refusals (red), the walk to a building, and actions confirmed in the preview. The end-of-day event card still scrolls to its next card.
- **Toasts are short; the log keeps the full line.** A toast shows the first sentence (plus a short second one when the first is very short), with bracketed detail dropped and the time and vital changes at the end: "You called your family · 30m · [happiness] +3", "Module complete: "Customer Relations" · [energy] −5% [happiness] −5 [knowledge] +3". Brackets that explain a refusal stay ("Not enough time left today (that takes 1h, you have 30m)"). Only the bracket that reports the real change moves to the end; numbers written in the sentence itself, such as "+9 knowledge and +6 happiness a day" when you buy a computer, stay where they are (as icons), so a purchase no longer looks like an instant gain.
- **Vitals in toasts are icons:** "+3 happiness" shows as the happiness icon and +3, likewise energy, health and knowledge.
- **Certificate:** the pop-up no longer lists the bonus. Instead a toast ("🎓 Certificate bonus: [happiness] +5, [knowledge] +5") appears on top of it. Other toasts are cleared while a pop-up is open, as before; the bonus toast is the one exception.
- **Status page, Home & life:** an ⓘ beside Belongings opens a list of everything you own: belongings (with broken ones marked), meals by kind, chips and lottery tickets, plus anything at the Pawn Shop and a note when your things are in storage. Click anywhere else to close it.

## 61. Knowledge arrow fix, and a UI check

- **Fix:** on the morning after a night, the knowledge figure on the status page showed "▼NaN" for a few seconds (the overnight arrows did not record knowledge). It now shows the real overnight change, like energy, happiness and health.
- **New QA tool: the UI check** (`tools/qa/uicheck.js`, run with `tools/qa/run-uicheck.ps1` in the browser, or `node tools/qa/run-uicheck.js` where Node and Playwright exist). At desktop (1280×800) and phone (390×844) width it presses every button in every building, plus the status page, the action preview, a certificate and ending the day, and reports script errors, dead buttons, missing toasts, log text / toast icons / row chips that disagree with the real change, layout problems and "NaN"/"undefined" on screen. CLAUDE.md says to run it whenever asked. It was tested on deliberately broken copies of the game (wrong chip, wrong log text, dead button, missing toast, overflowing and clipped layout, NaN on screen, a game that fails to load) and caught each one.
- First run, on this build: 98 presses at each width, no issues left after the two fixes above (the knowledge arrow, and purchase toasts showing "a day" amounts as instant gains, now part of section 60).

## 62. UI check: more situations

QA only; no game change.
- The UI check (`tools/qa/uicheck.js`) now also sets up six situations the main test game does not have, and presses every button they bring up: sick with the flu and owing medical bills (Hospital: treatment, check-up, insurance, pay bills), sick with dengue (Hospital: the ward), sick at home (Apartment), rent arrears (Apartment: pay arrears), a loan taken the day before (Bank: repay, pay in full) and a pawned TV (Pawn Shop: redeem). Each one also reports MISSING if its buttons do not appear.
- Run on this build: 158 presses at each width (was 98), no issues.

## 63. Enrolment message grammar

- Enrolling in a one-module qualification (Customer Service Certificate) said "All 1 modules and their lessons are now free to attend". It now says "Its module and lessons are now free to attend". Text only.

## 64. Review fixes: recap day, preview, save status, personal best, first goal, overview, map highlights

- **Recap chart:** a game that ends overnight (time's up after day 15, or bankrupt, exhausted and so on) recorded its final net worth on the next day (day 16). It now records it on the last day played, and the recap and share text say that day too. New save field `S.endDay` (set when the game ends).
- **Action preview:** one button, **Ok**, which carries out the action and closes the preview; "Not now" is gone. The "Don't ask me again" box decides whether the preview shows next time. To cancel, click or tap outside the box (or press Esc). The preview's title now shows just the action's name ("Yoga & stretch · $12?"), not the whole row with its chips and note.
- **Save status:** the top bar no longer says "Auto-saved" no matter what. It shows **💾 Saved 2:41 pm** (the time of the last save that worked), **⚠️ Saving failed — progress may be lost** in red when the browser refuses a save (hover for the last good save time), or **⚠️ Save unavailable in this browser** when the browser does not let the page store anything at all (checked when the page opens).
- **Personal best on a loss:** the end card said "Congratulations! New top score!" even after losing, and played the win sound. It now says **🏆 New personal-best score!** under the win or loss heading, and the win sound only plays when you have won.
- **First-week goal:** "Eat a meal (Fast Food, Restaurant, or cook at home)" is now "Eat a meal before the day ends (Fast Food, Restaurant, or Supermarket food eaten at home)". Snacks (chips, coffee and cake) still do not count.
- **Overview panel (desktop):** a **Hide ✕** button and a line at the top, "Click outside this panel to explore the town. 📋 Overview brings it back". When hidden, the 📋 Overview button in the top bar is teal and pulses twice so it is easy to find. Phones are unchanged (the panel sits below the map there).
- **Map highlights:** where you are now has a solid gold outline around the building (plus the glow) and a gold ring on its name. The building whose panel is open also gets a teal ring outside the gold outline and a teal name label.

## 65. Compact Gym, Thrift Store and Electronics Store

Layout only; no rules change.
- **Gym:** each class is its name, price and chips (time, energy, health, happiness, "Counts ×2" / "Not a workout"); the one-line description under each class has moved into the Classes ⓘ.
- **Thrift Store and Electronics Store:** each item now shows what it does as icon chips instead of a sentence: knowledge and happiness a day (phone, tablet, computer), happiness and knowledge for each hour of rest (TV, console), fridge space and keep time, the coffee machine's morning energy, the microwave's reheat time, the gloves' extra pay a shift, "ETFs · study online" and "Freelance · hedge fund", a green "Comfort" chip for comfort items and a red "Breaks often" chip for second-hand items. The full descriptions are listed in the section's ⓘ. The Electronics Store ⓘ also says how much each comfort item adds.
- The work gloves' $15 a shift is now one value (`GLOVES_PAY`) used by both the pay and the text.
- **Factory:** without a job there, the empty "🏭 Factory floor" card is gone; its text is now at the start of the "No job here? You can still" card's ⓘ, and that card shows "Closed" when the Factory is closed. With a Factory job the "Factory floor" card stays as before.
- Checked every building: all 16 panels use the compact card layout.

## 66. No "nearly broke" nagging in the first five days

- Net worth under $100 no longer shows the "💸 Nearly broke" warning or costs 3 happiness overnight on days 1–5. Both start on day 6. Being in debt (net worth under $0) still costs 8 happiness and 5% energy from day 1.
- The money-shame numbers moved from the code into the new `CONFIG.shame` {nearlyBrokeBelow 100, nearlyBrokeHappiness −3, nearlyBrokeFromDay 6, debtHappiness −8, debtEnergy −5}. The Rules "Money shame" line is filled in from it. The Config Guide has the new keys.

## 67. Faster sleep at home

- A night's sleep at home now restores **6.5% energy for each hour left in the day in the Apartment (was 4.5%) and 9% in the Bungalow (was 6.75%)**, before comfort items and the Night Owl trait. The most one night can give rises from 52% to **75%** (`CONFIG.sleep.maxEnergy`). Examples: 4 hours left gives +26% in the Apartment (was +18%) and +36% in the Bungalow (was +27%); 8 hours left gives +52% in the Apartment (was +36%) and +72% in the Bungalow (was +52%). The cap is reached with about 11½ hours left in the Apartment and 8⅓ in the Bungalow.
- The 2-hour Rest is unchanged (3% an hour in the Apartment, 4.5% in the Bungalow).
- `CONFIG.sleep.perHour` {apt 6.5, bung 9} replaces `sleep.energyX` (1.5), which is removed. Sleeping away from home still gives `sleep.awayShare` of it.
- The home cards now show both rates ("3%/h rest", "6.5%/h sleep"), and the Rest & sleep ⓘ gives the sleep rate (it also had the old "every night costs −15% energy" wording; it now uses the current nightly change). The Config Guide has the new key.

## 68. Evening falls on the town

Display only; no rules change.
- With less than 10 hours left in the day, the town map darkens to show evening, getting darker as the day runs out (a dark blue layer at 25% with 10 hours left, rising to 50% as time runs out). The panels, top bar and pop-ups stay bright, and the map can still be clicked. It lights up again the next morning, when the clock resets (as the morning card appears).
- New `CONFIG.ui.evening` {fromMinutes 600, darkest 0.5}; `fromMinutes: 0` turns it off.

## 69. Kitchen buttons and fewer toasts at once

Display only; no rules change.
- **Cook buttons** at home all have the same teal background (Cook 1, Cook 2, Cook 3…); before, only Cook 1 was filled and the others were white.
- **Eat buttons** say how much they eat: "Eat 1" (cooked, ready-to-eat, chips), "Eat 1 cold", "Reheat & eat 1 · …", "Eat 1 cooked" / "Eat 1 ready meal" for spoiled food.
- **Toasts:** at most 2 on screen at a time (was 3); a new one pushes out the oldest. `CONFIG.ui.toasts.max` 2.

## 70. Work and study wear down health; home meals heal less

- **Every hour of work or study costs 1 health:** shifts, freelance coding and Factory day labour, School lessons and self-study. It is worked out per action from its length and rounded, a half counting as a whole point: a 4h30 shift −5, 2h30 freelance coding −3, 4h day labour −4, a 1h lesson −1, a 40- or 30-minute Honours or Masters lesson −1, a 2h self-study session −2 (unchanged; it was −2 a session). The rows show it as a health chip.
- New `CONFIG.time.workHealthPerHour` (−1), `CONFIG.education.lessonHealthPerHour` (−1) and `CONFIG.selfStudy.healthPerHour` (−1), which replaces `selfStudy.health` (−2 a session).
- **Home meals:** a cooked meal now gives +5 health (was +10), a ready-to-eat meal +1 (was +5). `CONFIG.food.basic.health` 5, `food.premium.health` 1.
- The Rules Health line, the Study & work and School ⓘ texts and the Config Guide describe the new costs.

## 71. Maintenance: easier to read and change (no gameplay change)

Prompted by a maintainability review. Nothing a player sees or plays has changed: every step was checked against the previous version for identical panels (all buildings, status page, top bar, at desktop and phone width), identical content tables, identical results for 30 seeded simulation games, and a clean UI check.
- **Content data:** `NEWS` and `CHOICES` have one record per line (they were single lines of 9 KB and 27 KB), so an edit to one headline or decision shows as a one-line change.
- **One button table:** a single `ACTIONS` table says what each panel button runs, its day-bar colour and whether the action preview may try it. It replaces the long if/else chain in the click handler, the preview's own list (`PV_RUN`) and the day bar's list (`ACT_KIND`), which could drift apart.
- **Saves:** loading is split into named `MIGRATIONS` steps (run in order), `migrateSave()` and `hydrate()`, with a `SAVE_VERSION` constant. Old v1–v3 saves load exactly as before (checked with hand-made saves of each version). New: a save that cannot be loaded is kept as `dailyGrind.save.v1.broken` instead of being overwritten, and a warning goes to the browser console.
- **Rendering:** `render()` calls named parts in order (stats, pop-ups, top bar, overview cards, map, windows, panel, accessibility) instead of being one 120-line function.
- **Comments:** the script has a contents list and twelve numbered section banners; version-history labels ("Version 39 add-ons", "pilot") are replaced by what the code does now; the CONFIG header lists the real groups; the CSS has a contents comment and component labels. New `CODE_MAP.md` explains where everything is and how to add an action, building, event, CONFIG value or save change.
- **Errors:** the Rules-text setup and the action preview now report a failure in the browser console instead of failing silently (the Rules one hid a real bug once).
- **Tests:** the UI check now also starts a game at each difficulty and with a trait, saves and reloads mid-game, and loads a damaged save. New `tools/qa/run-sims.js` runs the simulations from Node (it builds the test copy with the hook `sim.js` needs).

## 72. Games last 20 days; one storyline, kept apart from macro shocks

- **Game length 20 days** (was 15), at every difficulty. `CONFIG.time.gameDays` 20. The day counter, Time's up, the difficulty buttons and the Rules follow it. A game saved mid-way becomes a 20-day game when loaded.
- **Rank target days scaled:** Comfortable by day 10 (was 8), Wealthy by day 16 (was 12), Tycoon by day 20 (was 15). `CONFIG.ranks` `byDay` 10/16/20.
- **Exactly one storyline a game**, starting on the evening of a random day from day 3 to 3 days before the end (day 3 to day 17). `CONFIG.events.storyline` is now `{fromDay:3, daysBeforeEnd:3}`; `toDay` (was 8) and `gapDays` (was 15) are removed. When the storyline ends, no other is scheduled. Old saves: one whose storyline has finished gets no second one; one that has not had it yet keeps its start day (or gets one in the window).
- **Storyline and macro shocks never overlap and keep 2 clear days between them**, both ways. New `CONFIG.events.storylineGap` (2). A shock only starts if even its longest run (`macroDays[1]`) would end 2 days before the storyline's start day, and none starts in the 2 days after the storyline ends. The storyline also waits out a running shock and the 2 days after it (only matters for old saves; new games are scheduled so it never has to). `bigGap` (3, i.e. 2 clear days between two shocks) is unchanged.
- Checked over 3,000 seeded games: storyline start days spread evenly over 3–17, never two storylines, never a shock within 2 days of one.

## 73. Industry-specific storylines

Every game now has two storylines. The existing one is called the **global storyline** (its cards are tagged 🌐) and moves prices, pay and interest for everyone, as before. The new **industry-specific storyline** (tagged 🏭) hits particular workplaces and roles, so the job that is the safe pick one day can be the one that gets cut a few days later.
- **Ten storylines**, one a game, picked at random: AI chip shortage (Factory, electronics sales, repair technicians), Banks go all-in on AI (tech roles up, then tellers, auditors and analysts cut), Delivery app price war, Self-checkout rollout, Nursing shortage, Food poisoning scandal, Online shopping hits the mall (Thrift Store booms), Gold rush (Pawn Shop), Viral fitness craze (Gym), Robots on the factory floor (engineers up, line workers cut).
- **How it runs:** it starts on the evening of a random day from day 3 to day 17 (picked separately from the global storyline) and lasts 5 or 6 nights over four phases, one chapter a night. Each phase's effects hold until the next chapter; the last one holds one more day. It may overlap the global storyline. Macro shocks now keep 2 clear days from both storylines (`storylineGap`), so they are rarer: in about 28% of games (was about half).
- **Pay:** each game rolls one swing between 20% and 50%. Each phase moves its roles by the full swing or half of it, up or down. The job board, the shift row, the interview message and real shift earnings all include it; day labour follows the lowest Factory wage. Shift length and the work-experience threshold stay on base pay.
- **Hiring:** in a hiring freeze each affected role has no openings 80% of the time (normally 25%); roles that are hiring always have openings.
- **Cuts:** each night your own job is in a phase with cuts, there is a 6% chance you are laid off (the job is gone) and otherwise a 15% chance your workplace suspends work for 1 to 3 days (the job is kept). The food scandal only suspends.
- **Employment Office:** a new 📊 Industry outlook card shows a rumour the day before it starts, then one line per affected group of roles with today's pay change and Hiring freeze / Hiring now / Cuts chips. The job board and your shift row show the same chips (▲35%, ▼20%, Freeze, Hiring, Cuts).
- **Rules:** a new Storylines line, filled in from CONFIG.
- New `CONFIG.industry`: `fromDay` 3, `daysBeforeEnd` 3, `days` [5,6], `paySwing` [0.2,0.5], `layoffChance` 0.06, `suspendChance` 0.15, `suspendDays` [1,3], `freezeShare` 0.8, `rumourDays` 1.
- **Saves:** a game saved before this gets an industry-specific storyline if its window has not passed.
- **UI check:** three new situations (the outlook at a storyline's peak, your own job hit, the rumour).
- Checked over 3,000 seeded games: start days spread evenly over 3–17, exactly one a game, all ten storylines about equally often, and no macro shock within 2 days of either storyline.
- **QA:** UI check clean at desktop and phone width (193 presses each, 9 situations, reload checks). Simulation report: [QA_Sim_2026-10-27_industry-storylines](docs/QA_Sim_2026-10-27_industry-storylines.md) (same endings as the base build; careful bots still give up on morale around day 11 in both builds). `tools/qa/sim.js`: the random bot cancels the action preview by clicking outside it (the old "No" button no longer exists).

## 74. Used clothes at the Thrift Store; waking up with no clothes

- **Used clothes:** the Thrift Store has a new 👕 Used clothes card selling a used Smart Casual outfit and a used Business Suit at 30% of the Clothes Mall price (about $54 and $90 before the price index), lasting 3 days. They meet the same dress codes as new ones; a used suit gives no happiness lift, and there is no haggling. Buying replaces the outfit of the same kind you already have, as at the Mall. New `CONFIG.clothes.used` {priceShare 0.3, days 3}.
- **Out of clothes:** if all your clothes have worn out, you can't work any shift away from home (every job, including those with no dress code, and Factory day labour) until you buy some. Freelance coding at home still works. The shift and day-labour rows show a "No clothes" chip and the button is disabled.
- **Shame:** each morning you wake up with no clothes costs 5 happiness (part of the overnight happiness line, "−5 no clothes"), and the morning pop-up opens with "👕 You are out of clothes…". New `CONFIG.shame.noClothesHappiness` (−5). The Rules line "Money shame" is now "Shame" and describes it.
- **UI check:** two new situations (out of clothes at the Thrift Store; out of clothes with a job).

## 75. The Bank is worth using: higher returns, a Bank app, a morning money briefing and one-day offers

The Bank's products paid too little to matter (savings 1% a day, about $10 a day on $1,000) and finding out cost a walk.
- **Higher returns.** Savings now pay about 2% a day (`CONFIG.market.rateBase` 1 → 2) and a fixed deposit 1.25× the savings rate (was 1.4× of a lower rate: about 2.5% a day, was 1.4%). The ETF, hedge fund and crypto expect about 2%, 3% and 4% a day in a steady market (were 0.9%, 1.4% and 2%), moving with the market mood as before; their daily swings are unchanged. The formula's numbers moved from the code into the new `CONFIG.market.returns` {fdOverSavings 1.25, etf {base 2, mood 0.8}, hf {base 3, mood 1.6}, cry {base 4, mood 3}}. $1,000 saved from day 5 is about $1,350 by day 20 (was about $1,160). Loans (4–6% a day) stay dearer than any safe return. A new game now starts at the normal savings rate (`rateBase`) instead of a fixed 1%.
- **📱 Bank app.** With a working phone, tablet or computer, a 📱 Bank app button on the Overview (Net worth card) opens the Bank's savings, investments and offers wherever you are, with no walk. Each action takes its usual time. Loans still need a visit to the Bank. Without a device the button is disabled and says what it needs.
- **Morning money briefing.** Each morning says what your money made overnight ("💰 Your money made +$23 overnight (savings +$20, investments +$3)"), today's savings, fixed deposit and ETF rates with the market mood, and the best expected return open to you given your knowledge and devices.
- **One-day offers.** Some mornings from day 3 (15% chance), the Bank offers a promo deposit for that day only: 3–3.5% a day for 3 days, $300 to $1,000, locked until it matures and then paid into your cash with its interest. It shows in the morning notes, at the Bank and in the app; one at a time; it counts in net worth while you hold it. New `CONFIG.bank.offers` {chance 0.15, fromDay 3, rate [3, 3.5], days 3, min 300, max 1000}.
- **Rules:** a new Bank line, filled in from CONFIG.
- **UI check:** three new situations (an offer at the Bank, the Bank app with an offer, a promo deposit held).

## 76. 📱 Phone and 💻 Computer: the Bank app and a new Jobs app

- **📱 Phone** (was the "📱 Bank app" button on the Overview, under Net worth): with a working phone or tablet it opens your phone's home screen, with two apps. Without one the button is disabled ("Needs a phone or tablet"; with only a computer it adds that your computer at home has the apps).
- **💻 Computer** at home: a new card in your Apartment or Bungalow opens the same home screen. It is enabled only with a working computer, and works at home.
- **🏦 Bank app**: as before (savings, investments, offers; loans need a visit to the Bank). It no longer opens from a computer away from home.
- **💼 Jobs app** (new): the same job board as the Employment Office, with the industry outlook. You can apply online; an application takes the same 1h as an interview and follows the same rules.
- **← Phone / ← Computer:** the Bank app and the Jobs app have a back button at the top that returns to the home screen of the device they were opened on (no time). ← Leave still closes everything.
- **Computer card wording:** its row now reads "Bank and job hunt from home" with 🏦 Savings & investments and 💼 Job board chips (was "Bank app and Jobs app"); the header chip says "Online at home".
- The morning money briefing and the Rules Bank line describe where the apps are.
- **UI check:** two new situations (the phone home screen; the Jobs app). Its first run found the phone home screen showing "Your job: undefined" when a saved game had no job title stored; the Jobs app row now reads the title from the job itself.

## 77. A Community Centre; the Pawn Shop becomes the Thrift Store's pawn counter

Morale is what ends most games (in every simulation build the careful players give up on low happiness around day 11), and the only ways to lift it were solo and small. The Pawn Shop overlapped with the Thrift Store.
- **🤝 Community Centre** (new building, on the Pawn Shop's spot on the map). Once a day each:
  - **Night out with friends:** 3h, $25, −10% energy, +15 happiness.
  - **Karaoke night:** 2h, $10, −5% energy, +9 happiness.
  - **Volunteer:** 3h, free, −10% energy, +8 happiness, +2 knowledge.
  - **A friend's job tip:** a night out (20%) or volunteering (30%) can get you one. For 3 days (counting today), your next job interview, in person or in the Jobs app, is 30% more likely to pass (still capped at 95%) and never fails for "no openings". The interview uses it up, pass or fail. It shows as a toast, a "🤝 Tip" chip on the job board and a morning reminder.
  - New `CONFIG.community` {nightOut, karaoke, volunteer, tip}. A new Rules line, filled in from CONFIG.
- **Pawn Shop → Thrift Store.** Pawning and redeeming move to a **💍 Sell & pawn** card at the Thrift Store, with the same rules (Sal pays half, a quarter if broken; buy back within 3 days for 15% more). The Pawn Shop's jobs move too:
  - **"Thrift Store (Pawn counter)":** Counter Assistant, Appraiser, Pawnbroker.
  - **"Thrift Store (Back office)":** Security Guard, Bookkeeper.

  Their shifts are worked at the Thrift Store and count as Thrift Store work experience. In the Gold rush storyline, the "Pawn counter jobs" are the ones hit. The Online-shopping storyline's "Thrift Store jobs" are the Thrift Store's own lines only.
- **Saves:** a game saved at the Pawn Shop opens at the Thrift Store; a closure and work experience there move to the Thrift Store; jobs and pawn tickets carry over unchanged.
- **UI check:** the pawned-item situation moves to the Thrift Store; new situation "a friend's job tip".
- **QA:** UI check clean at desktop and phone width (324 presses each, 17 situations, reload checks). Simulation report: [QA_Sim_2026-10-27_community-centre](docs/QA_Sim_2026-10-27_community-centre.md) (no regressions; the sim bots don't use the Community Centre yet, so its morale effect isn't measured).

## 78. QA: the careful simulation player looks after its morale (no game change)

- `tools/qa/sim.js`: the careful player gets a `moraleStep()`. When happiness is under 30 in the morning it gets a lift before work, and before the night it tops happiness up towards 60. It uses the cheapest lift first (call family, a walk in the Park, then the Community Centre: volunteer, karaoke, night out), and only with time, energy and cash to spare. Each game's results record the activities used (`morale`).
- `tools/qa/run-sims.js`: `--no-comm` keeps the careful player out of the Community Centre, to measure what it adds.
- **Result** ([QA_Sim_2026-10-28_morale-bot](docs/QA_Sim_2026-10-28_morale-bot.md)), same game, same seeds:

  | | Reached day 20 | Gave up on morale | Mean net worth | Reached Wealthy |
  |---|---|---|---|---|
  | Old bot | 0 of 20 | 20 | $1,339 | 0 |
  | New bot | 19 of 20 | 0 | $5,216 | 12 |
  | New bot without the Community Centre | 12 of 20 | 7 | $3,660 | 4 |

  The one failure (seed 20) went bankrupt after its clothes wore out: it couldn't afford new ones at the Mall, and the bot doesn't know about used clothes at the Thrift Store yet.

## 79. AI rivals (step 1): a 30-day game against easy, medium and expert rivals

- **Two ways to play,** chosen on the welcome screen:
  - **🎯 Single game:** 20 days, scored as before.
  - **🏁 With AI rivals:** 30 days. Pick 1 to 3 rivals and their level (Easy, Medium, Expert or Mixed). The difficulty buttons show the game's length.
- **The rival game:**
  - **Length:** 30 days (`CONFIG.rivals.gameDays`).
  - **Storylines:** their start windows stretch to day 27, and there are two industry-specific storylines (`industryStorylines` 2, at least `industryGapDays` 5 apart), different ones.
  - **Rank target days:** stretch to 15/24/30.
  - **Tycoon:** reaching it is a milestone, not the end. Everyone plays all 30 days. A single game still ends at Tycoon.
- **Rivals live the same days you do,** played overnight by `rivalTick()`. They eat, apply for jobs (sharing your job openings), work, study towards the best job they can reach, look after their morale, save, and (experts) invest. They use the same pay, prices, fees, economy, storylines, layoffs and endings as you. They roll their own dice, so a single game plays exactly as before.
  - **Easy:** often makes mistakes, studies little, keeps cash.
  - **Medium:** plans a career, saves.
  - **Expert:** plans by today's pay, works 3 shifts, invests in a good market, uses the Community Centre.
  - New `CONFIG.rivals` {gameDays 30, industryStorylines 2, industryGapDays 5, dayOverheadMinutes 180, names, icons, levels}.
- **Where you see them:**
  - a **🏁 Town leaderboard** on the Overview (you and your rivals by net worth, job and today's change; tap a rival for their story);
  - **🏁 lines in the morning news** (new jobs, promotions, qualifications, ranks, layoffs, drop-outs);
  - the **town standings** on the end screen.
- **Rules:** a new "AI rivals" line, and the ranks line says Tycoon ends only a single game.
- **Code:** `gameLen()` is now the one source of the game length. `maxDays()`, the storyline windows, `tierDue()` and the save step read it.
- **QA:**
  - `run-sims.js --rivals=level [--rival-count=n]` plays rival games, and each result lists the rivals.
  - The UI check looks at the town leaderboard.
  - **Simulations** ([QA_Sim_2026-10-30_ai-rivals](docs/QA_Sim_2026-10-30_ai-rivals.md)):
    - single games are unchanged, game for game;
    - against the careful test player over 30 days, easy rivals average $1,459, medium $9,312 and expert $17,887;
    - the test player finished first against easy and medium every time, and last against experts in 12 of 20 games. Experts are kept that strong as a stretch goal.
- **Still to come (the design's next steps):** the Life Score (ranking by wealth, career, happiness, education and more), competing for job openings, interactions, alliances, betrayals and sabotage.

## 80. AI rivals (step 2): the Life Score

A game with AI rivals is now won on the **Life Score**, not on money alone.
- **Places and points:** in each category, everyone (you and each rival) gets a place, and ties share the better place. A place earns 10 / 6 / 3 / 1 points (1st to 4th) × the category's weight. The most points wins.
- **The categories:**

  | Category | Weight | How it's measured |
  |---|---|---|
  | 💰 Wealth | ×3 | Net worth |
  | 💼 Career | ×2 | The best-paid job held during the game |
  | 😊 Happiness | ×2 | Average over the nights played |
  | 🎓 Education | ×2 | Qualification levels earned; knowledge breaks ties |
  | ❤️ Health | ×1 | Average over the nights played |
  | 🛡️ Stability | ×1 | Fewest crisis days: no meal, rent arrears, an overdue loan, illness, no clothes (for rivals: no meal or in debt) |
  | 🏁 First to the line | ×1 | Reaching Comfortable, then Wealthy, then Tycoon earliest |

- **On the Overview,** the town leaderboard now ranks by Life Score points, showing each player's place, job, net worth and today's change. Tap anyone (you too) for their place in every category, and a rival for their story.
- **At the end,** the end screen shows the Life Score standings, a table of every category (place, points and measure for each player, winners highlighted) and "Best at" badges, instead of the single-game score. The share recap shows your place and points. A rival game keeps its own best finish (`dailyGrind.bestRivals`) and no longer touches the single-game top score.
- **Config:** new `CONFIG.rivals.scoring` {placePoints [10,6,3,1], categories: wealth ×3, career ×2, happiness ×2, education ×2, health ×1, stability ×1, first ×1, each with `on` and `weight`}.
- **Rules:** the "AI rivals" Rules line describes the scoring from CONFIG.
- **Saves:** each player keeps a small record (`S.life` and each rival's `life`, `rankDay`, `bestJob`). Rival saves from step 1 load and start their records from that day.
- **QA:** the UI check is clean (it caught a "knowledge NaN" for a rival record without knowledge, now guarded). Simulation report: [QA_Sim_2026-10-30_life-score](docs/QA_Sim_2026-10-30_life-score.md). The scoring works, but rivals win happiness, health and stability almost every time because they don't face events, illness or shame, which section 81 fixes.

## 81. AI rivals face your pressures

Rivals had an easier life than you on happiness, health and stability, so they won those Life Score categories almost every time.
- **Storyline chapters:** tonight's global and industry storyline chapters change every rival's happiness and health as they change yours.
- **Their own small life events:** each night, with `chance` 0.6, one of `outcomes` (effect tokens such as `h-2~6`, `h-5 c-15~40`, `l-2~4`, `c+10~30 h+2`).
- **Illness:** rivals fall ill at your nightly chance (`CONFIG.illness`: low-energy nights, health, difficulty, pandemics). `illMix` decides which illness. While ill, a rival can't work or study and loses health each night. A rival who can afford it pays for treatment.
- **Money shame and low-energy health loss:** rivals get the same rules as you.
- **Crisis days:** counted the same way as yours (no meal, in debt, ill, no clothes for the job).
- **Config:** new `CONFIG.rivals.lifeEvents` {chance 0.6, outcomes} and `CONFIG.rivals.illMix` {cold 0.5, flu 0.35, dengue 0.1, pneu 0.05}. All of it runs on the rivals' own dice, so single games are unchanged (checked game for game).
- **Result** ([QA_Sim_2026-10-31_rival-parity](docs/QA_Sim_2026-10-31_rival-parity.md)), the careful test player's Life Score wins against 3 rivals:

  | Rival level | Before | After |
  |---|---|---|
  | Easy | 17 of 20 | 20 of 20 |
  | Medium | 2 of 20 | 15 of 20 |
  | Expert | 1 of 20 | 4 of 20 |

  Stability now goes to the steady player, and happiness is a real trade-off. Health still hardly separates anyone (everyone ends at about 97–99).

## 82. AI rivals: a fair Health category, and the job race

- **Health counts unwell nights, not average health.** Everyone used to average 97–99 health, so the category was decided by a point or two. It now counts the nights a player spent ill or ended under the "poor health" line (`CONFIG.health.poorBelow`). Fewer is better, and players with the same count share the place, so it only separates people who really got sick or run down. Shown as "no unwell nights" / "3 unwell nights".
- **The job race (step 3 of the design).** When a medium or expert rival gets a job, there's a 50% chance it took the last opening.
  - That role then has no openings for you the next day. The job board (Employment Office and Jobs app) shows a "🏁 Taken by Maya" chip, a morning note tells you, and applying anyway costs the usual hour with "Maya got there first".
  - At most 3 times a game, never the same role twice running. Easy rivals don't race.
  - New `CONFIG.rivals.jobRace` {chance 0.5, maxPerGame 3, levels medium, expert}, rolled on the rivals' own dice, so single games are unchanged.
- **Rules:** the AI rivals line describes both.
- **UI check:** new situation "a rival took the last opening".
