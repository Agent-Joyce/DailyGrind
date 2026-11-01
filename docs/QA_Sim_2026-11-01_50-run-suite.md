# Daily Grind: 50-game simulation suite

- Generated: 01/11/2026, 23:48:01 SGT.
- Game base: `efaa56198e63564f61b3d2da4a4d1695da78bb5f`; no gameplay changes. Harness additions are documented in CHANGELOG section 101.
- index.html SHA-256: `8dc15fac5a5ce2a657b5e410a04abc3ff9ec385be3aeb4320a5228abbd1465d8`.
- Harness SHA-256: `0bd1eede0f0124f75bb0fbfa998b61523eaddcf7e8d0eefe7c64738ac89c3ff7`; manifest SHA-256: `0ebb35edb87c4c5c4908f66a929e52d03e695e1e50dcec898a471333d74c08da`.
- Version scope: Tested efaa561 only. Two later visual/portrait/background commits were not included. Publication preserves those newer changes.
- Runtime: Chromium 153.0.8010.0, Playwright 1.62.1; isolated contexts, external requests blocked.
- Limits: action 20000 ms; game 600000 ms; 220 bot actions/day and configured game length + 2 day cycles.
- Actual profile values, PRNG states, per-action traces and daily snapshots are in [raw JSON](QA_Sim_2026-11-01_50-run-suite.json); [CSV summary](QA_Sim_2026-11-01_50-run-suite.csv).

## Executive result

50/50 scheduled games completed; 0 failed; 0 not completed. 0 games had page errors. 0 runtime-check issue types and 2 legacy text/effect candidates were recorded. Confirmed gameplay findings: 1; confirmed UI findings: 1. These classifications require review; a bot survival warning is not a code failure.

24 earlier failed/interrupted case attempts are retained in JSON, with their original metadata. Preliminary launches encountered software-GPU and redundant-scroll automation timeouts; execution was stopped and Chromium was relaunched with GPU disabled. Later banking-selector failures and short mobile-input timeouts are retained as well. Worker counts, timeout limits and harness fingerprints are recorded by execution phase. They are additional attempts of the same IDs, not extra distinct scenarios. No earlier failure was removed from the report.

## Coverage and outcomes

| Dimension | Planned | Completed | Failed |
| --- | --- | --- | --- |
| desktop | 30 | 30 | 0 |
| mobile | 20 | 20 | 0 |

| Setup | Completed | Reached day limit | Player first places | Ranked rival games | Median player worth |
| --- | --- | --- | --- | --- | --- |
| single | 10 | 6 | 0 | — | 6,102 |
| easy | 9 | 6 | 6 | 9 | 14,020 |
| medium | 9 | 5 | 3 | 9 | 11,592 |
| expert | 9 | 6 | 4 | 9 | 11,830 |
| mixed | 13 | 8 | 5 | 13 | 10,296 |

| Town | Completed | Player first places | Median player worth |
| --- | --- | --- | --- |
| friendly | 14 | 6 | 11,711 |
| competitive | 13 | 4 | 150 |
| cutthroat | 13 | 8 | 14,611 |

| Strategy | Planned | Completed |
| --- | --- | --- |
| balanced | 20 | 20 |
| career | 10 | 10 |
| social | 10 | 10 |
| random | 10 | 10 |

| Strategy | Mode | Completed | Early endings | Median worth |
| --- | --- | --- | --- | --- |
| balanced | single | 4 | 0 | 7,012 |
| balanced | rivals | 16 | 2 | 13,969 |
| career | single | 2 | 2 | -152 |
| career | rivals | 8 | 4 | 9,772 |
| social | single | 2 | 0 | 7,021 |
| social | rivals | 8 | 1 | 14,382 |
| random | single | 2 | 2 | 105 |
| random | rivals | 8 | 8 | 80 |

| Ending | Games |
| --- | --- |
| 💼 Final rank: Wealthy | 8 |
| Hospitalised | 17 |
| Bankrupt | 2 |
| 👑 Final rank: Tycoon | 23 |

## Rival analysis

| Difficulty | Rival outcomes | Early exits | Median rival worth |
| --- | --- | --- | --- |
| easy | 40 | 1 | 834 |
| medium | 40 | 0 | 7,081 |
| expert | 40 | 0 | 12,334 |

| Personality | Starting rivals |
| --- | --- |
| vindictive | 32 |
| ambitious | 30 |
| generous | 30 |
| reckless | 28 |

Career/education snapshots at midpoint and finish, including pivot preferences, are in the JSON `diversity` section. Duplicate end paths are descriptive signals; feasibility is not independently established by this harness.

| Run | Midpoint active rivals | Pivot preferences recorded | Final active rivals | Distinct final job + completed qualifications |
| --- | --- | --- | --- | --- |
| 011 | 0 | 0 | 3 | 2 |
| 012 | 2 | 1 | 2 | 2 |
| 013 | 3 | 2 | 3 | 3 |
| 014 | 0 | 0 | 3 | 2 |
| 015 | 0 | 0 | 3 | 1 |
| 016 | 3 | 0 | 3 | 3 |
| 017 | 3 | 1 | 3 | 3 |
| 018 | 3 | 1 | 3 | 3 |
| 019 | 3 | 0 | 3 | 3 |
| 020 | 0 | 0 | 3 | 1 |
| 021 | 3 | 2 | 3 | 2 |
| 022 | 0 | 0 | 3 | 2 |
| 023 | 3 | 2 | 3 | 2 |
| 024 | 3 | 2 | 3 | 3 |
| 025 | 0 | 0 | 3 | 1 |
| 026 | 3 | 2 | 3 | 3 |
| 027 | 3 | 2 | 3 | 3 |
| 028 | 3 | 2 | 3 | 3 |
| 029 | 3 | 2 | 3 | 1 |
| 030 | 0 | 0 | 3 | 1 |
| 031 | 3 | 2 | 3 | 1 |
| 032 | 3 | 2 | 3 | 1 |
| 033 | 0 | 0 | 3 | 1 |
| 034 | 3 | 2 | 3 | 1 |
| 035 | 0 | 0 | 3 | 1 |
| 036 | 3 | 2 | 3 | 1 |
| 037 | 3 | 2 | 3 | 1 |
| 038 | 3 | 1 | 3 | 3 |
| 039 | 3 | 1 | 3 | 3 |
| 040 | 0 | 0 | 3 | 2 |
| 041 | 3 | 2 | 3 | 3 |
| 042 | 3 | 1 | 3 | 3 |
| 043 | 0 | 0 | 3 | 3 |
| 044 | 3 | 1 | 3 | 3 |
| 045 | 0 | 0 | 3 | 2 |
| 046 | 3 | 1 | 3 | 3 |
| 047 | 3 | 1 | 3 | 3 |
| 048 | 0 | 0 | 3 | 2 |
| 049 | 3 | 1 | 3 | 3 |
| 050 | 0 | 0 | 3 | 2 |

## Feature coverage

| Action | Games | Successful physical inputs | Coverage |
| --- | --- | --- | --- |
| work | 42 | 1707 | exercised |
| class | 40 | 1299 | exercised |
| enrol | 40 | 94 | exercised |
| cook | 40 | 600 | exercised |
| eatc | 40 | 891 | exercised |
| treat | 17 | 67 | exercised |
| rcall | 13 | 232 | exercised |
| flat | 11 | 25 | exercised |
| fdo | 7 | 126 | exercised |
| msg | 7 | 52 | exercised |
| pact | 7 | 12 | exercised |
| prenew | 5 | 9 | exercised |
| pbetray | 0 | 0 | not exercised |
| rborrow | 0 | 0 | not exercised |
| rbet | 7 | 19 | exercised |
| sab | 1 | 6 | exercised |
| accuse | 0 | 0 | not exercised |

Shared-action physical attempts: 126; busy refusals observed: 28. This is an observed sample, not a calibrated probability test.

Observed busy-refusal cost checks: 28/28 preserved both time and cash. Per-action rival relationship state was not captured, so the exact relationship delta is not independently verified here.

## Save/reload checks

| Run | Result | Changed saved fields | Unsaved fields before reload |
| --- | --- | --- | --- |
| 004 | passed | — | — |
| 007 | passed | — | — |
| 012 | passed | — | — |
| 019 | passed | — | — |
| 023 | passed | — | — |
| 028 | passed | — | — |
| 034 | passed | — | — |
| 039 | passed | — | — |
| 043 | passed | — | — |
| 047 | passed | — | — |

Persistent field comparison excludes the expected Welcome back log entry. Pre-reload unsaved fields are recorded separately and need interpretation; the runner does not overwrite the game save to force equality.

## Issues and failed attempts

| Finding | Severity / status | Runs | Evidence and proposed change |
| --- | --- | --- | --- |
| GAME-01 Midgame diversification does not ensure different final career/qualification paths | medium / unfixed | 029, 031, 032, 034, 036, 037 | Full 30-day games ended with all three active rivals on the same job and completed qualifications despite avoidCareer/avoidTrack pivot preferences. Early game-over cases before the pivot window are excluded. Code review suggests rivalDay retains an existing r.study even after the target changes, requires positive pay gain for alternative jobs, and schedules work before allocating study time. In several expert snapshots study progress was zero and knowledge had decayed to zero. These are inferred contributing causes, not isolated causal tests. Add a targeted pivot regression case; reconcile active study with the new target, reserve study time in the work budget and assess feasible alternate jobs explicitly. |

| Finding | Severity / status | Runs | Evidence and proposed change |
| --- | --- | --- | --- |
| UI-01 Mobile toast overlaps the phone-app shortcut | low / unfixed | 034 | Playwright physical-input evidence identifies a toast intercepting taps on #townDevice beyond the original five-second action timeout. Reposition the toast stack away from interactive map controls, or allow input through noninteractive notification content. Waiting for normal expiry is a harness accommodation, not a game fix. |

No final-attempt execution failures.

| Recorded issue | Occurrences | Runs | Assessment |
| --- | --- | --- | --- |
| SURVIVAL: clothes ran out and new ones were unaffordable (day 6) | 14 | 003, 008, 011, 014, 022, 043, 048 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: clothes ran out and new ones were unaffordable (day 7) | 14 | 003, 008, 011, 014, 022, 043, 048 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: clothes ran out and new ones were unaffordable (day 8) | 14 | 003, 008, 011, 014, 022, 043, 048 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: clothes ran out and new ones were unaffordable (day 9) | 16 | 003, 008, 014, 018, 022, 033, 043, 048 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: clothes ran out and new ones were unaffordable (day 10) | 12 | 003, 008, 014, 022, 043, 048 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: could not eat on day 10 (cash 2, time left 1440m) | 1 | 003 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: could not eat on day 10 (cash 2, time left 1350m) | 1 | 003 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: clothes ran out and new ones were unaffordable (day 11) | 14 | 003, 008, 014, 022, 023, 033, 048 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: could not eat on day 11 (cash 0, time left 1440m) | 8 | 003, 008, 022, 048 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: clothes ran out and new ones were unaffordable (day 12) | 10 | 003, 014, 022, 023, 033 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: could not eat on day 12 (cash 0, time left 1440m) | 4 | 003, 022 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: could not eat on day 9 (cash 12, time left 1440m) | 2 | 008 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: could not eat on day 10 (cash 0, time left 1440m) | 2 | 008 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: could not eat on day 8 (cash 0, time left 1440m) | 3 | 011, 043 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: could not eat on day 8 (cash 0, time left 1320m) | 1 | 011 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: could not eat on day 10 (cash 5, time left 1410m) | 2 | 014 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: could not eat on day 11 (cash 0, time left 1410m) | 2 | 014 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: could not eat on day 12 (cash 0, time left 1410m) | 2 | 014 | Bot survival/balance signal; not a technical failure |
| TEXT≠EFFECT: buy says happy 2 but it changed 0 | 7 | 019, 024, 029, 034, 039, 044, 049 | Reviewed legacy-parser false positive: periodic phone benefits |
| TEXT≠EFFECT: buy says know 4 but it changed 0 | 7 | 019, 024, 029, 034, 039, 044, 049 | Reviewed legacy-parser false positive: periodic phone benefits |
| SURVIVAL: clothes ran out and new ones were unaffordable (day 17) | 4 | 021, 023 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: could not eat on day 10 (cash 7, time left 1440m) | 2 | 022 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: clothes ran out and new ones were unaffordable (day 13) | 4 | 023, 033 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: clothes ran out and new ones were unaffordable (day 14) | 2 | 023 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: clothes ran out and new ones were unaffordable (day 15) | 2 | 023 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: could not eat on day 15 (cash 1, time left 1440m) | 2 | 023 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: clothes ran out and new ones were unaffordable (day 16) | 2 | 023 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: could not eat on day 16 (cash 0, time left 1440m) | 2 | 023 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: could not eat on day 17 (cash 0, time left 1440m) | 2 | 023 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: could not eat on day 4 (cash 12, time left 1440m) | 1 | 031 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: could not eat on day 13 (cash 0, time left 1440m) | 2 | 033 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: could not eat on day 9 (cash 8, time left 1440m) | 2 | 043 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: could not eat on day 10 (cash 6, time left 1440m) | 2 | 043 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: could not eat on day 24 (cash 20, time left 1230m) | 1 | 047 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: could not eat on day 24 (cash 20, time left 1110m) | 1 | 047 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: could not eat on day 9 (cash 5, time left 1440m) | 2 | 048 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: could not eat on day 10 (cash 5, time left 1440m) | 2 | 048 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: could not eat on day 30 (cash 15, time left 1210m) | 1 | 049 | Bot survival/balance signal; not a technical failure |
| SURVIVAL: could not eat on day 30 (cash 871, time left 85m) | 1 | 049 | Bot survival/balance signal; not a technical failure |

Occurrence totals can include repeated observation of one condition; use affected runs and action traces to assess severity. Legacy TEXT≠EFFECT checks parse log text and may produce false positives around rounding or additional effects.

## Per-game summary

| Run | Device | Setup | Town | Strategy | Attempt | Status | Last day | Ending | Worth | Player place | Issues |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 001 | desktop | single | — | balanced | 4 | completed | 20 | 💼 Final rank: Wealthy | 7,755 | — | 0 |
| 002 | desktop | single | — | balanced | 4 | completed | 20 | 💼 Final rank: Wealthy | 6,207 | — | 0 |
| 003 | desktop | single | — | career | 3 | completed | 13 | Hospitalised | -151 | — | 11 |
| 004 | desktop | single | — | social | 2 | completed | 20 | 💼 Final rank: Wealthy | 5,996 | — | 0 |
| 005 | desktop | single | — | random | 2 | completed | 4 | Hospitalised | 200 | — | 0 |
| 006 | desktop | single | — | balanced | 2 | completed | 20 | 💼 Final rank: Wealthy | 7,812 | — | 0 |
| 007 | mobile | single | — | balanced | 2 | completed | 20 | 💼 Final rank: Wealthy | 6,268 | — | 0 |
| 008 | mobile | single | — | career | 2 | completed | 12 | Hospitalised | -153 | — | 9 |
| 009 | mobile | single | — | social | 2 | completed | 20 | 💼 Final rank: Wealthy | 8,046 | — | 0 |
| 010 | mobile | single | — | random | 1 | completed | 6 | Hospitalised | 9 | — | 0 |
| 011 | desktop | easy | friendly | balanced | 1 | completed | 9 | Bankrupt | -45 | 4 | 5 |
| 012 | desktop | easy | friendly | balanced | 1 | completed | 30 | 👑 Final rank: Tycoon | 23,167 | 1 | 0 |
| 013 | mobile | easy | friendly | career | 1 | completed | 30 | 👑 Final rank: Tycoon | 37,739 | 1 | 0 |
| 014 | desktop | easy | competitive | social | 1 | completed | 13 | Hospitalised | -149 | 4 | 10 |
| 015 | desktop | easy | competitive | random | 2 | completed | 6 | Hospitalised | 150 | 4 | 0 |
| 016 | mobile | easy | competitive | balanced | 1 | completed | 30 | 👑 Final rank: Tycoon | 14,020 | 1 | 0 |
| 017 | desktop | easy | cutthroat | balanced | 1 | completed | 30 | 👑 Final rank: Tycoon | 13,918 | 1 | 0 |
| 018 | mobile | easy | cutthroat | career | 1 | completed | 30 | 👑 Final rank: Tycoon | 27,117 | 1 | 1 |
| 019 | mobile | easy | cutthroat | social | 1 | completed | 30 | 👑 Final rank: Tycoon | 16,598 | 1 | 2 |
| 020 | desktop | medium | friendly | random | 2 | completed | 6 | Hospitalised | 278 | 4 | 0 |
| 021 | mobile | medium | friendly | balanced | 1 | completed | 30 | 👑 Final rank: Tycoon | 11,592 | 2 | 1 |
| 022 | mobile | medium | friendly | balanced | 1 | completed | 13 | Hospitalised | -145 | 4 | 10 |
| 023 | desktop | medium | competitive | career | 1 | completed | 18 | Hospitalised | -131 | 4 | 10 |
| 024 | desktop | medium | competitive | social | 1 | completed | 30 | 👑 Final rank: Tycoon | 14,733 | 1 | 2 |
| 025 | mobile | medium | competitive | random | 2 | completed | 7 | Hospitalised | -161 | 4 | 0 |
| 026 | desktop | medium | cutthroat | balanced | 1 | completed | 30 | 👑 Final rank: Tycoon | 16,532 | 1 | 0 |
| 027 | desktop | medium | cutthroat | balanced | 1 | completed | 30 | 👑 Final rank: Tycoon | 17,860 | 2 | 0 |
| 028 | mobile | medium | cutthroat | career | 1 | completed | 30 | 👑 Final rank: Tycoon | 19,526 | 1 | 0 |
| 029 | desktop | expert | friendly | social | 1 | completed | 30 | 👑 Final rank: Tycoon | 16,080 | 1 | 2 |
| 030 | desktop | expert | friendly | random | 2 | completed | 4 | Hospitalised | 89 | 4 | 0 |
| 031 | mobile | expert | friendly | balanced | 2 | completed | 30 | 👑 Final rank: Tycoon | 11,830 | 3 | 1 |
| 032 | desktop | expert | competitive | balanced | 1 | completed | 30 | 👑 Final rank: Tycoon | 20,165 | 1 | 0 |
| 033 | mobile | expert | competitive | career | 1 | completed | 14 | Bankrupt | -40 | 4 | 5 |
| 034 | mobile | expert | competitive | social | 2 | completed | 30 | 💼 Final rank: Wealthy | 9,616 | 2 | 2 |
| 035 | desktop | expert | cutthroat | random | 1 | completed | 8 | Hospitalised | -25 | 4 | 0 |
| 036 | desktop | expert | cutthroat | balanced | 1 | completed | 30 | 👑 Final rank: Tycoon | 29,844 | 1 | 0 |
| 037 | mobile | expert | cutthroat | balanced | 1 | completed | 30 | 👑 Final rank: Tycoon | 14,611 | 1 | 0 |
| 038 | desktop | mixed | friendly | career | 1 | completed | 30 | 👑 Final rank: Tycoon | 24,676 | 1 | 0 |
| 039 | desktop | mixed | friendly | social | 1 | completed | 30 | 👑 Final rank: Tycoon | 14,030 | 1 | 2 |
| 040 | desktop | mixed | friendly | random | 2 | completed | 7 | Hospitalised | -57 | 4 | 0 |
| 041 | mobile | mixed | friendly | balanced | 1 | completed | 30 | 💼 Final rank: Wealthy | 7,412 | 3 | 0 |
| 042 | mobile | mixed | friendly | balanced | 1 | completed | 30 | 👑 Final rank: Tycoon | 15,767 | 1 | 0 |
| 043 | desktop | mixed | competitive | career | 1 | completed | 11 | Hospitalised | 18 | 4 | 8 |
| 044 | desktop | mixed | competitive | social | 1 | completed | 30 | 👑 Final rank: Tycoon | 33,048 | 1 | 2 |
| 045 | desktop | mixed | competitive | random | 2 | completed | 6 | Hospitalised | 142 | 4 | 0 |
| 046 | mobile | mixed | competitive | balanced | 2 | completed | 30 | 👑 Final rank: Tycoon | 10,296 | 2 | 0 |
| 047 | desktop | mixed | cutthroat | balanced | 2 | completed | 30 | 👑 Final rank: Tycoon | 11,305 | 3 | 2 |
| 048 | desktop | mixed | cutthroat | career | 1 | completed | 12 | Hospitalised | -145 | 4 | 9 |
| 049 | desktop | mixed | cutthroat | social | 1 | completed | 30 | 👑 Final rank: Tycoon | 11,355 | 1 | 4 |
| 050 | mobile | mixed | cutthroat | random | 1 | completed | 5 | Hospitalised | 70 | 4 | 0 |

## Limits of this batch

- Desktop and mobile scenarios use different seeds; there is no matched device comparison. Mobile Chromium emulation is not physical iPhone or Safari testing.
- Player difficulty is Normal, with no trait; rival difficulty varies separately. Single-player scores and rival Life Scores have different meanings.
- The balanced/career/social players reuse the legacy planner, with study-first ordering for career and an added social routine for social. All strategies disable action previews. Random selects legal UI actions, including refusals; it does not model a typical player.
- Tests independently reconcile net-worth components and Life Score aggregation, enforce state/memory limits and check daily meal feedback. They do not independently verify every rent/loan/bet settlement formula or every UI effect. Unexercised actions are not passed.
- Natural generation does not guarantee coverage of every personality interaction, favour return, betrayal, sabotage, theft, illness, storyline or failed feasible career pivot. Snapshots permit investigation; no forced outcomes were inserted.
- No replay equivalence or statistical probability claim is made. Timer-triggered renders can affect the game random stream; reproduction needs the recorded build, browser, settings and action sequence, not seeds alone.
- Preliminary harness issues and retries are retained. Game source was not fixed or rebalanced during this batch.
