# Sleep parity between the careful bot and AI rivals, 15 November 2026

**Question:** why does the careful bot place last on happiness in every rival game? Rivals use the player's sleep and work formulas, so the check was how long each side sleeps.

**Versions tested**

| Run | Game | Bot |
|---|---|---|
| Before | `d00f221` (CHANGELOG up to §117) | `tools/qa/sim.js` at `d00f221` |
| After | `d00f221` plus CHANGELOG §122 (uncommitted when run): rivals' `dayOverheadMinutes` 180 → 360, sleep happiness for at most 12 hours | `sim.js` going to bed with about 7 hours left (`SLEEP_MIN` 420) |

**Settings:** careful bot, 3 games, seeds 1–3, 30 days, three medium rivals, Competitive town, normal difficulty. A scratch copy of `run-sims.js` also saved each night's sleep: the bot's minutes left when it ends the day, and each rival's `1440 − used − 60`. Headless Chromium, network blocked, no page errors. Raw data: [QA_Sim_2026-11-15_sleep-parity.json](QA_Sim_2026-11-15_sleep-parity.json).

## Results

| | Before | After |
|---|---|---|
| Bot: average sleep | 5h16 | 6h56 |
| Bot: sleep happiness a night | +7.3 | +9.8 |
| Rivals: average sleep | 11h41 | 8h15 |
| Rivals: sleep happiness a night | +17.1 | +11.8 (capped at 12 hours) |
| Gap in sleep happiness a night | 9.8 | 2.0 |

Nights by length:

| | Under 4h | 4–6h | 6–8h | 8–10h | 10–12h | 12h or more |
|---|---|---|---|---|---|---|
| Bot, before (90 nights) | 16 | 61 | 6 | 5 | 0 | 2 |
| Bot, after | 0 | 18 | 58 | 11 | 3 | 0 |
| Rivals, before (270 nights) | 0 | 1 | 14 | 44 | 91 | 120 |
| Rivals, after | 3 | 53 | 78 | 38 | 96 | 2 |

Per game:

| Seed | Before: bot net worth, job, Life Score place, happiness place | After |
|---|---|---|
| 1 | $8,584 Junior Doctor, 2nd, 4th | $8,566 Senior Nurse, 3rd, 4th |
| 2 | $16,887 Junior Doctor, 2nd, 4th | $8,569 Lab Technician, 2nd, 3rd |
| 3 | $11,881 Junior Doctor, 1st, 4th | $8,685 Senior Nurse, 4th, 4th |

## Reading

- **Before:** no rule was free for rivals; the gap came from time use. A medium rival's day used about 11½ hours (work, study, meals, 3 hours of errands), so it slept about 11h41. The bot worked and studied near the 10-hour limit and slept 5h16.
- **After:** the sleep-happiness gap per night falls from 9.8 to 2.0. Rivals' sleep is bimodal (4–6h on busy days, 10–12h on light ones); the 12-hour cap now bites on only 2 of 270 nights.
- **Cost to the bot:** keeping 7 hours for sleep leaves it less time to study and for morale activities (calls fell from 15–19 a game to 6–10; no Community Centre visits). It ended all three games near $8,600 as a Senior Nurse or Lab Technician, not a Junior Doctor, and its average Life Score place fell from 1.7 to 3. It still places 3rd–4th on happiness.
- **Limits:** three games, one level. Not run: expert, mixed, single games, the random bot, the UI check.
