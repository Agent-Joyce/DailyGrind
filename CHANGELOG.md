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
