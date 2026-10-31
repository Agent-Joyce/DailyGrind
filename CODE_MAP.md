# Daily Grind code map

Where things are in `index.html`, and how to make the common changes safely. Line numbers move, so this map uses the
**numbered section banners** in the script (search for `1. CONFIG`, `7. PANELS`, …) and the names below.

## The file

`index.html` has three parts, in this order:

1. **`<style>`**: all CSS. A contents comment at the top lists the blocks. Later rules win: `.center`, `#log` and `.stat` are styled in more than one place on purpose (base look, then the overview restyle, then breakpoints), so check later rules before changing an early one.
2. **Markup**: the top bar (`#hud`), the town map (`#board`) with the centre window (`#center`: `#overview`, `#shop` for building panels, `#evwrap` for the end-of-day card), and the pop-ups: `#welcome`, `#rules`, `#goalpop`, `#certpop`, `#morning`, `#over` (game over), `#pvpop` (action preview), plus `#toasts`.
3. **`<script>`**: one closure, in twelve numbered sections (a contents comment at the top of the script lists them).

| # | Section | What is in it | Key names |
|---|---|---|---|
| 1 | CONFIG | Every tunable number, one top-level key per topic, each commented | `CONFIG` |
| 2 | World tables | Values derived from CONFIG and the fixed tables | `TIERS`, `DIFF`, `ICO`, `LOCS`, `HOUSE`, `ITEMS`, `JOBS`, `TRACKS`, `CAREERS`, `BOARD`; helpers `hm()`, `M()`, `sg()`, `vitSnap()`/`vitPar()` |
| 3 | State and saves | The state shape, new game, save status, loading old saves, game over | `blank()`, `fresh()`, `save()`, `SAVE_VERSION`, `MIGRATIONS`, `migrateSave()`, `hydrate()`, `load()`, `finish()` |
| 4 | Player actions | Everything a button can do | `spendMin()`, `done()`, `refuse()`, `work()`, `study()`, `buy()`, `cook()`, `enter()`, `gymSession()`, `leisure()`, `community()` (Community Centre), `factoryDo()` … |
| 5 | Health, stress, night | Illness, health, burnout, game-over checks, the overnight pipeline | `healthTick()`, `burnTick()`, `stressTick()`, `rollover()` |
| 6 | Events and economy | Content tables, effect tokens, macro trends, global and industry-specific storylines, the end-of-day card | `NEWS`, `CHOICES`, `MACRO`, `SAGAS`, `INDUSTRY`, `TWISTS`, `STORIES`, `applyFx()`, `trendTick()`, `indRole()`, `rolePay()`, `indTick()`, `pickNight()`, `endWeek()` |
| 7 | Panels | Compact card building blocks and one panel per building | `chip()`, `arow()`, `psec()`, `more()`, `boxed()`, `house()`, `panels` |
| 8 | Map art and dialogue | Building illustrations (inline SVG) and shopkeeper lines | `ART`, `GREET` |
| 9 | Render | Repaints the screen from `S` | `render()` → `renderStats()`, `renderPopups()`, `renderHud()`, `renderOverviewCards()`, `renderMap()`, `renderWindows()`, `renderPanel()`, `renderA11y()` |
| 10 | Map layout and input | Map geometry and roads, keyboard, the button table, Rules text from CONFIG | `BP`, `layout()`, `ACTIONS`, `shopAct()`, `timeText` |
| 11 | Add-ons | Clock and day bar, trend arrows, toasts, action preview, recap, starting traits | `HOOK`, `safe()`, `shortText()`, `vitIcons()`, `dryRun()`, `applyTrait()` |
| 12 | Start | Loads the saved game or starts a new one | `if(!load())fresh();` (the test hook is inserted just before this line; keep it unique) |

## How it runs

- **Start:** the script defines everything, the add-ons wrap `render()`, `log()` and `finish()`, `timeText` fills the Rules text from CONFIG, then `load()` restores a save or `fresh()` starts a game.
- **A button:** a click on any `#shop [data-act]` goes to `shopAct()`, which looks the name up in `ACTIONS` and runs it. The action changes `S`, logs what happened and calls `done()`, which calls `render()`. While the click runs, every log line becomes a toast.
- **The night:** "End day" → `endWeek()` (where you slept, tonight's cards in `S.pending`: the global storyline or a macro shock, the industry-specific storyline, then the daily event) → the player taps through the cards → `rollover()` (rent, wear, sleep, hunger, food, macro trends, investments, health, burnout, school, loans, game-over checks, interest, the morning notes). CLAUDE.md lists the order in detail.
- **State:** everything about a game is in `S` (shape: `blank()`), saved to `localStorage` under `dailyGrind.save.v1`. Other keys: `dailyGrind.best` (top score), `dailyGrind.mute`, `dailyGrind.preview`, and `dailyGrind.save.v1.broken` (a save that could not be loaded).

## How to…

**Add a button / action**
1. Put `btn('name', arg, 'Label')` in the panel (section 7). Use `arow()` for the row and `chip()` for its numbers.
2. Add one line to `ACTIONS` (section 10): `name: {run: function(g){ myAction(g) }, kind: 'work'|'study'|…, dry: true}`. `kind` is its colour in the day bar; `dry: true` lets the action preview try it.
3. Write `myAction()` in section 4: check and refuse with `refuse('reason')`, spend time and money with `spendMin()`, take `v0 = vitSnap()`, change `S`, `log('What happened' + vitPar(v0) + '.')`, then `done()`. Writing the change with `vitPar` keeps the log, the toast and the real change in step.
4. If it needs a game state to be pressable, add that to `setup()` or `SITUATIONS` in `tools/qa/uicheck.js`.

**Device and app screens** are screens, not places: `view` changes and `loc` does not (`APPS` lists them). The 📱 Phone button on the Overview (`openDevice('phone')`, needs a working phone or tablet) and the 💻 Computer card at home (`openDevice('pc')`, needs a working computer and being at home) open a home screen (`appHome`) with two apps, opened by `openApp()`: `bankapp` is `panels.bank(true)` (the Bank screen without the loan card) and `jobsapp` is `panels.jobs()` (the Employment Office board; applying works the same). Changes to those panels show in the apps too.

**AI rivals** (section 6, before the macro shocks): `makeRivals()`, `rivalDay()` and `rivalNight()` (one rival's day and night), `rivalTick()` (called from `rollover`; it also runs the job race, `S.raced`, and friends' tips), relationships (`relLabel()`, `relGain()` with tension, `argue()` (an argument's happiness cost), `maybeEncounter()`/`encounterCard()`/`rivalMeet()`, `rivalCall()`/`callRows()` and the `callsapp` screen, `congratulate()`), `rrand()` (the rivals' own dice), the Life Score (`LIFE_CATS` for the categories, `lifeSample()`, `lifeScore()`, `lifeTable()`; add a category by adding it to `LIFE_CATS` and `CONFIG.rivals.scoring.categories`), `rivalBoard()` (section 9, the Overview leaderboard). Tune them in `CONFIG.rivals.levels`. Read the game length through `gameLen()`.

**Add a building**: a `LOCS` entry, a position in `BP`, a road spur in `SPUR`, art in `ART`, lines in `GREET`, a panel in `panels`, and walking distance (`ORDER` or `dist()`).

**Add an event**: add a record to the right table in section 6. Outcomes are effect-token strings (`c` cash, `e` energy, `h` happiness, `l` health, `n` knowledge, …), applied through `applyFx()`, never by writing to `S` directly.

**Add an industry-specific storyline**: add an entry to `INDUSTRY` (section 6): `id`, `ic`, `n`, `term`, a rumour (`rum`), who it affects (`hit`) and four phases. Each phase lists its effects with `ie(group, label, pay, hire, cut)` (groups of roles are in `IW`: add one there if needed) and two or more chapters. Pay is a share of the game's swing (`CONFIG.industry.paySwing`), so −1 means down by the full swing. No other code changes are needed.

**Add or change a CONFIG value**: put it in `CONFIG`, use it from there, update the matching `cfg…` Rules text (in `timeText`), the Config Guide (`docs/Daily Grind Config Guide.docx`) and `CHANGELOG.md`.

**Change the save format**: add a step to `MIGRATIONS` at the right place (they run in order), keep old saves loadable, and raise `SAVE_VERSION` for a version-specific change.

**Add a toast for a message outside a button press**: add a phrase to `CONFIG.ui.toasts.words`.

## Checking a change

- `node tools/qa/run-uicheck.js <folder outside the repo>`: presses every button at desktop and phone width, the pop-ups, extra situations, and the reload checks (difficulties, a trait, save and reload, a damaged save).
- Simulations (`tools/qa/sim.js`): 30 seeded games; ask before running them (CLAUDE.md).
- For a change that must not alter behaviour (a refactor), compare against the version before it: the same seeded sim results, the same panel HTML for a seeded game, and the same content tables.
