# Daily Grind: continuation plan

Written 14 November 2026 for a new session that has not seen the earlier conversation. Read this, then `CLAUDE.md` and `CODE_MAP.md`. The running record of what changed is `CHANGELOG.md` (§104–107 are the recent rounds).

## 1. Where things stand

- **Branch:** all recent work is on `claude/vigilant-curie-a1kpwu`. It is **not merged to `main`**. Ask the owner before merging.
- **Source:** edit `src/`, never `index.html`. Run `node tools/build.js` after every change and commit `src/` with the regenerated `index.html`.
- **Checks:** `node tools/qa/run-all-checks.js <folder outside the repo>` runs ten fast scripts; all pass at the time of writing.
- **Goal:** make the game playable and sellable on the web (itch.io or the owner's site). Owner decisions so far: keep the title "Daily Grind"; keep the 16 map pictures (rename places, add none); an invented **pan-Asian** setting, with nothing Singapore-specific (for example, do not say "hawker centre").

### Built in the recent rounds

| Round | What | Changelog |
|---|---|---|
| Bug fixes | Rival dress-code lock, Wealth Challenge loophole, Rules text, silent pact ending, wording | §104 |
| Night and morning | "1 of N" night cards; morning pop-up in three groups, one line per topic | §104 |
| Modern content | Pathways Data & AI, Creative Media, Green Energy, Logistics; 16 roles; Gigs app, tutoring, Creator app | §105 |
| Build | `src/` split, `tools/build.js`, website build in `dist/` that installs and works offline | §106 |
| Interface | Compact header, map name layer, three button levels, new welcome screen, guided first day, game feel, settings | §107 |
| QA | Ten check scripts, seven repo skills in `.claude/skills/` | §104–107 |

### Debts on what is built (do these first; see Package A)

1. The **full UI check** has not been run since §103. Five rounds of interface and gameplay change are untested by it.
2. **No bot simulation** has been run since §103.
3. **Rival difficulty is untuned.** After the dress-code fix, medium and expert rivals reach about $13,000–$63,000 against a $10,000 top rank, and still all climb the Hospital ladder.
4. Balance of the 16 new roles and the three ways to earn is untested against a playing bot.
5. Nothing has been tried on a real phone.

### Known and accepted

- Principal Engineer pays more than Project Lead with less study: left by the owner; `check-tables.js` lists it as KNOWN.
- Two cross-line table warnings from new roles (Dispatch Coordinator, Machine Learning Lead): reported, not changed.
- The owner's account-level skills (`daily-grind-add-pathway`, `daily-grind-edit-jobs`, `daily-grind-checks`) still say to edit `index.html`. Follow their rules, but make the edits in `src/js/01-config.js` and `src/js/02-world.js`, and use `tools/qa/check-tables.js` in place of their checker script.

## 2. Which model to use

**Recommendation: Opus for most of what is left; Sonnet for the well-scoped content batches.**

The hard remaining work is the rival AI, the day planner, rivals on the map and balance tuning. Each touches many functions inside one 9,000-line closure and has quiet rules that are easy to break: two separate dice streams, save migrations, text that must match the logic, and morning notes that must not repeat. That is where a stronger model earns its cost. The content work (names, event cards, festivals, pathways, store text) follows patterns the repo already has, is covered by skills and checks, and is where a faster, cheaper model is the better fit.

| Use Opus for | Use Sonnet for |
|---|---|
| Package A: reading UI-check and simulation results, deciding the retune | Package A: running the checks and writing the reports |
| Package B: smarter rivals | Package D: the Asian retheme, family cards, festivals |
| Package C items 10, 12, 13, 14: planner, rivals on the map, conversations, contested moments | Package C items 15, 17, 18: Rivals tab, achievements, safety net |
| Package H: multiplayer | Package E: remaining modern content |
| Any bug hunt, any save-format change | Package G: store page, credits, export/import |

If only one model is used for everything, use Opus. Whichever model is used: one package per session, run the quick checks before committing, and stop to ask the owner where this plan says "ask".

## 3. How to work in this repo (short version)

```bash
node tools/build.js
```

```bash
node tools/qa/run-all-checks.js <folder outside the repo>
```

- Skills: `dg-build`, `dg-quick-checks`, `dg-ui-check`, `dg-sim`, `dg-sim-suite`, `dg-rival-audit`, `dg-bug-hunt`.
- **Ask before** the UI check after a change, any simulation, and merging to `main`.
- Every gameplay number lives in `CONFIG` (`src/js/01-config.js`). A new or changed number also needs: the Rules text (`cfg*` setters), `docs/Daily Grind Config Guide.docx`, and a `CHANGELOG.md` section.
- Player dice are `Math.random`; rival dice are `rrand()`. A single game must never call `rrand()`. Rendering must never roll dice.
- New `S` fields need a `blank()` default; renamed or removed ones need a `MIGRATIONS` step.
- Add a case to the matching check script with every fix or feature. Never skip a failing check.
- Throwaway files go outside the repo. Simulation reports go to `docs/QA_Sim_<date>_<change>.md` and `.json`.

## 4. Work packages, in recommended order

Effort: S = a session, M = two or three sessions, L = more. Item numbers match the earlier roadmap.

### Package A — Verify and retune (S–M) · do first

**Why:** everything after this builds on untested ground.

1. Ask the owner, then run the UI check (`dg-ui-check`). Expect findings from: the new welcome screen and guide, the header, the Gigs and Creator apps, tutoring, the morning pop-up. List every issue, say which are real, fix the real ones. Add `SITUATIONS` in `tools/qa/uicheck.js` for: a gig run, a creator post with followers, tutoring with a qualification, a typed contract with a session due, a broken-promise card.
2. Ask the owner, then run rival simulations (`dg-sim`): 10 careful games each at `--rivals=medium`, `expert`, `mixed`, and 20 careful + 10 random single games. Save reports to `docs/`.
3. From the results, propose a retune to the owner **before changing numbers**. Likely levers, all in `CONFIG.rivals.levels`: `studyHours`, `shifts`, `studyChance`. Targets: a careful bot wins some games at every level; expert > medium > easy on Life Score; no rival far above the top rank on most seeds.
4. Check the new roles' pay and the three ways to earn against the bots' income per hour; propose changes in `CONFIG.side` and the job tables if any dominates a normal job.
5. Update the legacy bot (`tools/qa/sim.js`) only if it cannot play the new content; it does not need to use gigs or the creator path.

**Done when:** UI check clean or every remaining issue explained; reports in `docs/`; the owner has approved or declined a retune.

### Package B — Smarter rivals (L) · Opus

Rivals are the selling point and currently the weakest system. Code: `src/js/06-events-economy.js` (`makeRivals`, `rivalTarget`, `careerPreference`, `diversifyRivals`, `rivalDay`, `rivalNight`, `rivalTick`, `rivalChance`, `lifeScore`, `LIFE_CATS`). Always finish with `dg-rival-audit` and, with the owner's agreement, a rival simulation.

Build in this order; each is its own commit and changelog section.

- **22 Distinct strategies (M).** Give each rival an archetype at creation, dealt with `rrand()` like personalities: careerist, scholar, investor, socialite, hustler. An archetype is a set of weights in `CONFIG.rivals.archetypes`: pathway tastes, hours split between work and study, savings and investing appetite, morale aim, social activity. `rivalTarget()` multiplies a role's value by the archetype's pathway weight, replacing most of what `careerPreference()` does today. Save: `prepareRival()` assigns one deterministically to old saves, with no dice, as it does for personality. Then remove or shrink `diversifyRivals()`. **Accept:** in `check-rival-careers.js`, most games end with at least two different career lines among surviving planning rivals; change its "information only" line into a real threshold.
- **20 Play to win the Life Score (M).** Today `rivalTarget()` maximises pay × days, but the game is scored on eight categories. Add `rivalStanding(r)`: the rival's place in each `LIFE_CATS` category, from `lifeScore()`'s inputs, computed once a night. Each day the rival spends spare time where a place is cheapest to gain: morale activities if a happiness place is close, the gym or an early night for health, study for education, a pact kept for reputation. Late game (last fifth), defend places that are close behind. Keep it explainable: store `r.aim` as a short phrase.
- **24 Explainable rivals (S).** Show `r.aim` on the rival's card on the Rivals tab and in the morning news when it changes ("Maya is saving for her Degree"). Tie mistakes to state (tired: skips class; broke: skips a meal) instead of the flat `mistakeChance` roll, keeping `mistakeChance` as the upper bound.
- **21 Awareness of the player and each other (M).** Use `rivalStanding` in social choices: the leader is the preferred target of job races and sabotage; a rival in trouble asks for help first from whoever it trusts; a rival you helped is less likely to betray. Do this by feeding standings into the existing chance functions (`rivalChance`, `betrayChance`, `sabTick` target choice) as bounded modifiers in `CONFIG`, not by rewriting them.
- **23 Use the full game (M).** Rivals choose meal type by need (cheap when poor, healthy when health is low), use the gym, pick a home (`r.home` exists but is always `apt`), use every investment product by archetype, and take a bank loan when a qualification's fee blocks a clearly better job. Reuse the player's formulas (`expRet`, `qualFee`, `G()`), never copies of the numbers.
- **19 Utility planner (L).** Only if the above still feels scripted: replace the fixed order in `rivalDay()` with candidate actions scored per minute. Do it last; it changes dice order and every seeded baseline.
- **25 Close-race option (S).** A welcome-screen toggle in the Custom game drawer that nudges rival noise to keep standings tight. Off by default.

**Risks:** every item changes rival outcomes, so re-baseline with a simulation after 22 and after 20, not only at the end. Single games must stay dice-identical: `check-rival-careers.js` asserts no rival dice in single games.

### Package C — Gameplay: less repetition, more interaction (L)

- **15 Rivals tab shows every move (S) · Sonnet.** On the Rivals screen each rival's card lists what you can do now (chat or call, lend, ask to borrow, bet, pact or contract, sabotage, accuse) with the same chips the phone apps show, each a button that opens the right app screen or runs the action. Reuse `callRows`, `msgsPanel`, `pactRows`, `contractOffers`, `sabRows`. Fixes the finding that bots and players never find these features.
- **18 Soften the death spiral (S) · Sonnet.** Once a game: emergency clothes and a meal at the Community Centre when you have neither and cannot afford them (`CONFIG.community.safetyNet`). Earlier, specific warnings in `stressList()`. Verify with the single-game simulation: fewer "clothes ran out" and "could not eat" runs.
- **13 Conversations with intent (M) · Opus.** Replace chat / hello / ignore in `encounterCard()` and `rivalMeet()` with three or four topics that depend on state: ask about their work (may yield a job tip), share a tip (costs you the tip, earns trust), ask a favour (spends a remembered favour), tease (tension roll), gossip about a third rival (moves `S.rivalRelations`). Replies come from the rival's personality and archetype; outcomes go through `relGain()` and `remember()`. Text tables in `CONFIG.rivals.talk`.
- **14 Shared and contested moments (M) · Opus.** Day-time cards on the Today screen: one opening two of you want (apply before they do), a rival asking you to cover a shift today, a group project at the School, a town contest. Built on the existing `S.raced`, study-group and rival-card code, but offered during the day with a deadline in minutes.
- **11 Decisions inside work and study (M).** Roughly one shift or lesson in four offers a quick choice with a small risk and reward through `applyFx()`, with a table per career line so a Bank day differs from a Factory day. Player dice only; the row gets the `chance` class.
- **10 Day planner (M) · Opus.** A timeline on the Today screen: drop work, class, meal, gym and social blocks, press Play, and the day runs through the normal `ACTIONS`, stopping when something needs a decision or fails. Manual play stays. Use `dryRun()` for the preview totals.
- **16 Mid-game goals and perks (M).** Weekly goals with small rewards; at each qualification or promotion pick one of three perks (`S.perks`), each a multiplier applied where the matching number is read.
- **17 Replay hooks (M) · Sonnet.** Achievements and a career album stored outside the save (`dailyGrind.album`); scenarios as presets of `CONFIG` overrides and starting state; a seeded daily challenge with a share card (`navigator.share` is already used). The daily challenge needs the player's dice seeded: see Package H item 31.
- **12 Rivals on the map during the day (L) · Opus.** Each rival gets a day schedule (place and minutes) generated at the start of the day on `rrand()`, and its portrait appears on the building it is in as your clock advances. Meeting becomes a choice. This moves part of `rivalDay()` from the overnight batch to a morning plan plus a night settlement; design it so the night result equals the plan's result, or seeded baselines and bets break. Do it after Package B.

### Package D — The Asian twist (M–L) · Sonnet, with Opus for 18h and 18i mechanics

Setting: an invented pan-Asian city. No real brands, places or government schemes. Plain English for rules and buttons; local flavour only in names and dialogue. Write with specific, affectionate detail and no stereotypes; ask the owner to have a cultural reader look at the text. Gambling as flavour only. Keep all 16 pictures.

- **18f The hook (S).** Rivals are the cousins and classmates your mother compares you to. Text changes only: welcome screen, the Rivals tab heading, rival news, and the ending. The ending screen becomes the **reunion dinner**: `lifeTable()`'s content presented as the aunties reading out each category. Tagline under the title: "Beat your cousins before the reunion dinner."
- **18g Names (M).** Rename places, shopkeepers (`GREET`), food, rival names (`CONFIG.rivals.names`) and item names. Propose a full before → after table to the owner and get a yes before editing; places are referred to by key, so `NAME`/`LOCS` text changes need no migration, but renamed **jobs or qualifications** do. Suggested direction: Fast Food → noodle bar or food street stall, Restaurant → family restaurant, Supermarket → fresh market and minimart, Community Centre → community hall, School → college with a cram-school flavour, Thrift Store → second-hand and repair shop.
- **18h Family (M).** Parents' allowance: each rent day a card asks you to send a share of the cycle's pay (`CONFIG.family.allowance`); sending raises happiness and reputation, skipping lowers them. "Aunties' questions" as a set of `CHOICES` cards. Optional family business card early in the game: take over a stall job line or go your own way.
- **18k Festivals and climate (M).** A calendar in `CONFIG.festivals`: dated cards (New Year red packets and reunion dinner, Mid-Autumn, open-house visits, a summer festival), each a choice trading money, time and relationships through `applyFx()`. Games are 20 or 30 days, so place two or three per game by day share, not real dates. Monsoon, haze and durian season as `NEWS` or short trends.
- **18i Money customs (M).** A rotating savings club built on the pact pot (`startPact`, `splitPot`, `rivalPactsTick`): members pay in each cycle and one collects, with a default risk. Forced savings: a share of each pay goes to a locked account usable for housing deposits and hospital bills (counts in `worth()`). Scholarship with a bond: a free qualification in exchange for N shifts at the sponsor, with a penalty for leaving. Stable public-sector roles exempt from `trendTick` layoffs at lower pay.
- **18j Exams and tuition (S–M).** A gating exam before Degree level with a pass chance from knowledge; cram sessions that raise it. Tutoring already exists (`CONFIG.side.tutor`).

Each of 18h, 18i and 18j is a gameplay change: new `CONFIG` keys, Rules text, Config Guide, a check script case, and rivals must face the same rule or be explicitly exempt, with the reason written in the changelog.

### Package E — Remaining modern content (M) · Sonnet

- **18c Ways to learn.** Online lessons from the phone or computer (study at home, slower), short bootcamps (one module, a narrow job unlock), apprenticeships (a paid, lower-wage role that grants module progress), a student loan for Degree fees (separate from the bank loan; `CONFIG.loan` must stay untouched by macro code).
- **18d rest.** Remote shifts for some Technology, Data and Creative roles when you own a computer (no walk, slightly lower pay); reselling Thrift Store finds online; a stall you own at the market with a daily decision. Rivals: let scholars tutor and socialites post, using the same `CONFIG.side` numbers on `rrand()`.
- **18a, 18e.** Fold renames into 18g. Subscriptions and buy-now-pay-later as `CHOICES` cards before building systems for them.

### Package F — Interface leftovers (M)

- Merge several toasts from one action into one; quieter chips (show only what changes).
- A proper settings sheet with light and dark themes (the styles currently force dark) and colour-blind-safe status colours.
- Music or ambient sound needs real audio files from the owner; the code can only synthesise tones.
- Stylesheet clean-up (item 4): delete the old hidden `#hud` once `renderStats()` and `renderHud()` paint the new header directly, then remove the superseded rules in `01`–`06` CSS files. Do it file by file, with the UI check after each, never as one rewrite.
- A real-phone pass on one iPhone and one Android phone, by the owner.

### Package G — Ready to sell on the web (S–M) · Sonnet

- **29 Save export and import** (a file, and a copy-paste code), so a cleared browser does not lose a paid player's game.
- **30 Credits and licences:** confirm the source and licence of the pictures in `src/img` and `assets/illustrated-town-v2/ASSETS.md`; add a Credits and Privacy panel to Settings.
- **26 Demo and full builds:** a build flag in `tools/build.js` (`--demo`) that limits to a single 10-day game.
- **27 Store page:** screenshots at both widths, short clips, a one-line pitch built on the cousins hook.
- **28 Feedback:** an in-game link; analytics only if opt-in and only after asking the owner.

### Package H — Online play (L) · Opus

- **31 Daily challenge with a leaderboard (M).** Replace the player's `Math.random` calls with one seeded stream (`prand()`), so a day's seed gives everyone the same town. That is a large mechanical change across `src/js/04`–`06`: do it alone, with before-and-after seeded simulations proving the same statistics. Then a tiny score service (ask the owner where to host) and a share card.
- **32–36 Rooms for two to four players.** Only after Package B. Needs the rules separated from the page (a headless engine a server can run), a human in a rival's seat, a room server (the owner must choose and pay for hosting), a short 10–12 day format with a day timer, and basic safety (name filter, kick). Write a design document and get the owner's approval before any code.

## 5. Suggested session sequence

1. Package A (verify, retune).
2. Package B items 22, 20, 24, then a rival simulation.
3. Package C items 15 and 18; Package D items 18f and 18g.
4. Package B items 21 and 23; Package C items 13 and 14.
5. Package D items 18h and 18k; Package G item 29 and 30.
6. Package C items 11, 10, 17; then a full 50-game suite (`dg-sim-suite`) and a UI check before a first public build.
7. Everything else by the owner's priority.

## 6. Questions to put to the owner when their package comes up

- Package A: approve the retune numbers.
- Package D: approve the rename table; who reads the text for cultural accuracy.
- Package F: light theme wanted? Real audio files?
- Package G: price, demo length, analytics yes or no.
- Package H: hosting for the score service and rooms.
- Any time: when to merge `claude/vigilant-curie-a1kpwu` into `main`.
