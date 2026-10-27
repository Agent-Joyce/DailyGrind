# Simulation run: Community Centre and the Pawn Shop merge (2026-10-27)

**Version tested:** base commit `d5df236`, plus the uncommitted change in CHANGELOG section 77 (Community Centre; Pawn Shop merged into the Thrift Store).
**Compared with:** the base commit `d5df236` on its own.
**Settings (both builds):** `node tools/qa/run-sims.js`, 20 careful players from seed 1 and 10 random players from seed 101.
**Raw results:** `QA_Sim_2026-10-27_community-centre.json` (both builds, labelled `new` and `base`).

## Results

| | New build | Base build |
|---|---|---|
| Careful players: ending | 20 of 20 "You gave up" (morale) | 20 of 20 "You gave up" (morale) |
| Careful players: last day (mean) | 10.9 | 10.8 |
| Careful players: net worth (mean) | $1,339 | $1,302 |
| Careful players: reached Comfortable | 16 | 14 |
| Random players | 10 of 10 Hospitalised, day 4.7, $53 | identical |
| Page errors / text-effect mismatches / UI notes | none | none |

## Reading

- **No regressions.** Nothing broke in either build, and the former Pawn Shop jobs (Security Guard and others) are still taken and worked.
- **The new building isn't tested by these bots.** The careful bot follows a fixed routine that doesn't know the Community Centre, so it still gives up on morale around day 11, as in every recent build. The random bot is hospitalised by day 5, before it wanders in. The small differences between the builds are seed-to-seed noise from the changed random sequence.
- **To see the morale effect,** the careful bot needs teaching to use the Community Centre (and to look after happiness generally). That would let the sims reach the end of a 20-day game again.
