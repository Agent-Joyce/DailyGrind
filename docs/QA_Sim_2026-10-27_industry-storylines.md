# Simulation run: industry-specific storylines (2026-10-27)

**Version tested:** base commit `5f32095`, plus the uncommitted change in CHANGELOG section 73 (industry-specific storylines).
**Compared with:** the base commit `5f32095` on its own.
**Settings (both builds):** `node tools/qa/run-sims.js`, 20 careful players from seed 1 and 10 random players from seed 101. Both builds ran with the same `tools/qa/sim.js`, which includes one fix made for this run: the random bot used to cancel the action preview by pressing a "No" button that no longer exists, and now clicks outside the box, as a player does.
**Raw results:** `QA_Sim_2026-10-27_industry-storylines.json` (both builds, labelled `new` and `base`).

## Results

| | New build (with industry storylines) | Base build |
|---|---|---|
| Careful players: ending | 20 of 20 "You gave up" (morale) | 20 of 20 "You gave up" (morale) |
| Careful players: last day (mean) | 11.2 | 10.9 |
| Careful players: net worth (mean / median) | $1,640 / $1,644 | $1,540 / $1,589 |
| Careful players: rank reached | Comfortable 20 | Comfortable 19, none 1 |
| Careful players: final job | Nursing Aide 17, Security Guard, Data Annotator, Delivery Driver | Nursing Aide 15, Security Guard 3, Hospital Porter 2 |
| Random players: ending | 10 of 10 Hospitalised | 10 of 10 Hospitalised |
| Random players: last day (mean) | 5.0 | 5.6 |
| Random players: net worth (mean / median) | $59 / $41 | −$18 / $10 |
| Page errors / UI notes | none | none |

## Reading

- **No new problems.** Neither build has script errors or UI notes. Endings are the same in both: the careful bot always gives up on morale around day 11, and the random bot is always hospitalised (it doesn't eat reliably).
- **The morale endings are not caused by this change.** They happen identically on the base build. The careful bot doesn't look after happiness well enough since the nightly happiness change (−5 a night) and the other happiness rules. It's worth teaching the bot to manage happiness so the sims can reach the end of a 20-day game again.
- **Limited view of the new storylines.** The industry-specific storyline starts on a random day from 3 to 17, and these games end around day 11, so in many of them the storyline started late or not at all before the bot gave up. Within that, outcomes moved a little (mean net worth +$100 for careful players, and a few more different final jobs), which is in the range of normal seed-to-seed noise.
