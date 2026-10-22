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
