# Daily Grind simulation guide

Status: implemented on 1 November 2026 (Singapore). The manifest-driven suite reuses the existing careful/random planner through an asserted adapter. The legacy runner retains its behaviour. This guide records the scenario specification and actual implementation limits; dated QA reports record execution results.

## Commands

The current launcher builds a temporary hooked HTML copy and loads `tools/qa/sim.js`. It supports careful (`survive`) and random players, rival level/count flags and JSON results. From the repository root, the existing default command is:

```sh
node tools/qa/run-sims.js <folder-outside-repo>
```

It defaults to 20 careful games from seed 1 and 10 random games from seed 101. Example of the existing mixed-rival option:

```sh
node tools/qa/run-sims.js <folder-outside-repo> 20 10 1 101 --rivals=mixed --rival-count=3
```

The two legacy commands above do not implement the matrix below. Use the new suite from the repository root:

```sh
node tools/qa/run-suite.js --validate
node tools/qa/run-suite.js <folder-outside-repo> --workers=3 --commit=<game-commit-sha>
node tools/qa/report-suite.js <folder-outside-repo> docs/QA_Sim_<date>_50-run-suite
# Regenerate summaries from the saved JSON evidence:
node tools/qa/report-suite.js docs/QA_Sim_<date>_50-run-suite.json <new-report-prefix>
```

Install Playwright and its Chromium browser in the execution environment first. `DG_BROWSER_EXECUTABLE` can select an installed Chromium-compatible executable. In the managed runtime, Playwright can also be found through `CODEX_PRIMARY_RUNTIME_NODE_MODULES`. No runtime dependencies or browser binaries are committed. The launcher records actual browser/Playwright versions.

`--workers=1..4` controls isolated contexts (default 3). `--action-ms` defaults to 20000 and `--game-ms` to 600000. `--resume` skips recorded completed/failed attempts and refuses changed build, manifest or harness hashes. It does not automatically retry a failure. `--recover-harness` explicitly permits a changed harness on the same game build/manifest/browser and records both execution phases; it does not silently discard an old result. Reports can be generated from partial checkpoint files without rerunning games. For an authorized retry, preserve the prior case JSON in `attempts/case-<id>-attempt-<n>.json`, preserve metadata/screenshots there, and use the same case ID; the runner increments its attempt number. Never delete the original failure.

## Architecture

| Component | Responsibility |
|---|---|
| `tools/qa/suite-manifest.json` | Machine-readable equivalent of all 50 rows below; validate totals and unique IDs before launch |
| `tools/qa/run-suite.js` | Isolated browser context per game, explicit welcome selections, per-game timeout and incremental checkpointing |
| `run-suite.js` / `build-suite-player.js` | Inject `window.__G` into the temporary HTTP-served copy; assert legacy-source anchors; drive visible controls using Playwright |
| `sim.js` / `suite-player.js` | Reuse careful/random policies, put study first for career, add a social routine; use a separate bot random stream |
| `suite-player.js` / `run-suite.js` | Observe actions and overnight effects; record snapshots, errors, physical attempts, feature coverage and PRNG states |
| `tools/qa/report-suite.js` / `suite-evidence.js` | Produce Markdown, lossless dictionary-encoded JSON and per-game CSV; decode saved evidence to regenerate summaries |

Reusable QA source belongs in `tools/qa/`. Temporary hooked copies, scratch scripts, browser profiles and debugging screenshots stay outside the repository. Final simulation reports belong in `docs/`; historical reports remain unchanged.

The adapter must use visible, actionable controls with mouse clicks on desktop and taps on mobile. Hidden legacy controls and direct DOM `element.click()` calls do not establish user reachability. The test hook reads state; ordinary simulations must not force states, alter gameplay probabilities or bypass action eligibility. Targeted forced-state tests are separate and do not count toward the 50 games.

## Settings and scope

- Exactly 50 scheduled games: 10 single-player and 40 with three AI rivals.
- Mixed means one easy, one medium and one expert rival; rival difficulty is separate from the player's game difficulty.
- Explicitly select the player's Normal difficulty and no starting trait for every case.
- Read durations from CONFIG rather than overriding them: currently 20 single-player days and 30 rival days.
- Desktop: Playwright Chromium, 1280 × 800 viewport, desktop mode, mouse input.
- Mobile: Playwright Chromium, 390 × 844 viewport, mobile mode and touch enabled, tap input. Record the actual user agent and device scale factor (use 1 for both profiles).
- Mobile emulation is not a physical iPhone or Safari/WebKit test. The suite does not replace comprehensive visual UI QA.
- Game seed = 1000 + run number; bot seed = 2000 + run number. Seed the game before its initialization, capture the resulting rival random state, and record all stream states needed for replay.
- Clear all game localStorage and reset welcome selections in each isolated context.
- The ten reload cases below reload once at the start of day 10 after the morning popup is dismissed, before ordinary actions. If the game ends sooner, report reload coverage as not exercised. Preserve the game/bot PRNG states across reload and compare saved gameplay fields before/after; do not expect transient DOM state to persist.
- Rotate naturally generated rival personalities through seeds; report actual representation, without claiming equal personality coverage.

## Strategies

| Strategy | Runs | Policy |
|---|---:|---|
| Balanced | 20 | Maintain meals, housing and wellbeing while working, studying and saving |
| Career | 10 | Prioritize feasible qualifications and promotions while retaining basic survival safeguards |
| Social | 10 | Prioritize eligible relationships, flatmates, loans, pacts and favours; in single-player cases prioritize available leisure/community activities |
| Random | 10 | Random legal actions and event choices, with bounded action loops |

All policies operate without knowledge of future random draws. Record reasons for refused actions and policy decisions relevant to failures. Unexpected popups must be reported, not silently removed.

## Exact 50-game manifest

Game/bot seeds are distinct columns. Reload means the planned day-10 check described above. The cycle of strategies is Balanced, Balanced, Career, Social, Random.

| Run | Setup | Town mood | Device | Strategy | Game seed | Bot seed | Reload |
|---|---|---|---|---|---:|---:|---|
| 001 | Single | — | Desktop | Balanced | 1001 | 2001 | No |
| 002 | Single | — | Desktop | Balanced | 1002 | 2002 | No |
| 003 | Single | — | Desktop | Career | 1003 | 2003 | No |
| 004 | Single | — | Desktop | Social | 1004 | 2004 | Yes |
| 005 | Single | — | Desktop | Random | 1005 | 2005 | No |
| 006 | Single | — | Desktop | Balanced | 1006 | 2006 | No |
| 007 | Single | — | Mobile | Balanced | 1007 | 2007 | Yes |
| 008 | Single | — | Mobile | Career | 1008 | 2008 | No |
| 009 | Single | — | Mobile | Social | 1009 | 2009 | No |
| 010 | Single | — | Mobile | Random | 1010 | 2010 | No |
| 011 | Easy ×3 | Friendly | Desktop | Balanced | 1011 | 2011 | No |
| 012 | Easy ×3 | Friendly | Desktop | Balanced | 1012 | 2012 | Yes |
| 013 | Easy ×3 | Friendly | Mobile | Career | 1013 | 2013 | No |
| 014 | Easy ×3 | Competitive | Desktop | Social | 1014 | 2014 | No |
| 015 | Easy ×3 | Competitive | Desktop | Random | 1015 | 2015 | No |
| 016 | Easy ×3 | Competitive | Mobile | Balanced | 1016 | 2016 | No |
| 017 | Easy ×3 | Cutthroat | Desktop | Balanced | 1017 | 2017 | No |
| 018 | Easy ×3 | Cutthroat | Mobile | Career | 1018 | 2018 | No |
| 019 | Easy ×3 | Cutthroat | Mobile | Social | 1019 | 2019 | Yes |
| 020 | Medium ×3 | Friendly | Desktop | Random | 1020 | 2020 | No |
| 021 | Medium ×3 | Friendly | Mobile | Balanced | 1021 | 2021 | No |
| 022 | Medium ×3 | Friendly | Mobile | Balanced | 1022 | 2022 | No |
| 023 | Medium ×3 | Competitive | Desktop | Career | 1023 | 2023 | Yes |
| 024 | Medium ×3 | Competitive | Desktop | Social | 1024 | 2024 | No |
| 025 | Medium ×3 | Competitive | Mobile | Random | 1025 | 2025 | No |
| 026 | Medium ×3 | Cutthroat | Desktop | Balanced | 1026 | 2026 | No |
| 027 | Medium ×3 | Cutthroat | Desktop | Balanced | 1027 | 2027 | No |
| 028 | Medium ×3 | Cutthroat | Mobile | Career | 1028 | 2028 | Yes |
| 029 | Expert ×3 | Friendly | Desktop | Social | 1029 | 2029 | No |
| 030 | Expert ×3 | Friendly | Desktop | Random | 1030 | 2030 | No |
| 031 | Expert ×3 | Friendly | Mobile | Balanced | 1031 | 2031 | No |
| 032 | Expert ×3 | Competitive | Desktop | Balanced | 1032 | 2032 | No |
| 033 | Expert ×3 | Competitive | Mobile | Career | 1033 | 2033 | No |
| 034 | Expert ×3 | Competitive | Mobile | Social | 1034 | 2034 | Yes |
| 035 | Expert ×3 | Cutthroat | Desktop | Random | 1035 | 2035 | No |
| 036 | Expert ×3 | Cutthroat | Desktop | Balanced | 1036 | 2036 | No |
| 037 | Expert ×3 | Cutthroat | Mobile | Balanced | 1037 | 2037 | No |
| 038 | Mixed | Friendly | Desktop | Career | 1038 | 2038 | No |
| 039 | Mixed | Friendly | Desktop | Social | 1039 | 2039 | Yes |
| 040 | Mixed | Friendly | Desktop | Random | 1040 | 2040 | No |
| 041 | Mixed | Friendly | Mobile | Balanced | 1041 | 2041 | No |
| 042 | Mixed | Friendly | Mobile | Balanced | 1042 | 2042 | No |
| 043 | Mixed | Competitive | Desktop | Career | 1043 | 2043 | Yes |
| 044 | Mixed | Competitive | Desktop | Social | 1044 | 2044 | No |
| 045 | Mixed | Competitive | Desktop | Random | 1045 | 2045 | No |
| 046 | Mixed | Competitive | Mobile | Balanced | 1046 | 2046 | No |
| 047 | Mixed | Cutthroat | Desktop | Balanced | 1047 | 2047 | Yes |
| 048 | Mixed | Cutthroat | Desktop | Career | 1048 | 2048 | No |
| 049 | Mixed | Cutthroat | Desktop | Social | 1049 | 2049 | No |
| 050 | Mixed | Cutthroat | Mobile | Random | 1050 | 2050 | No |

Totals: 30 desktop / 20 mobile; 10 single / 9 easy / 9 medium / 9 expert / 13 mixed. Rival towns: 14 Friendly / 13 Competitive / 13 Cutthroat. Each homogeneous rival group has 5 desktop and 4 mobile cases; mixed has 9 desktop and 4 mobile; single has 6 desktop and 4 mobile.

## Validation specification and implementation limits

| Area | Evidence/check |
|---|---|
| Stability | Page errors, invalid numbers, timeouts, stuck days, unexpected or inaccessible popups |
| State | CONFIG-derived limits for vitals, time, inventory, employment and qualifications; finite balances and net worth |
| Survival | Fed state, work/study minutes, sleep, illness, burnout and early-ending reason per day |
| Money | Independently reconcile components of net worth and transaction deltas for rent shares, loans and bets; allow unrelated earnings/expenses |
| Progression | Milestones do not end play; final endings and Life Score agree with recorded state |
| Rivals | Daily difficulty/personality, jobs, qualifications, targets and exits; midpoint and final diversity |
| Diversification | Record duplicate paths, pivot decisions and feasible alternatives; flag failed feasible pivots, do not assume every duplicate is a bug |
| Social | Eligible attempts, acceptance/refusal, relationship changes, memory bounds, favour credits, repayments and pact outcomes |
| Town mood | Check mood-specific restrictions, including that Friendly does not prohibit burglary |
| Feedback | Where an effect is stated, compare displayed deltas with actual changes, allowing documented caps/rounding |
| Reload | Compare persistent gameplay state and continued actions in the ten selected games |
| Coverage | Count eligible attempts and outcomes; absent features are not exercised, not passed |

Capture snapshots without drawing random numbers or changing game state. Interpret chance-based outcomes with their eligible-attempt denominator; a small sample is not evidence that a configured probability is incorrect.

## Counting, failures and replay

A legitimate game-over before the time limit is a completed simulation. A crash, timeout or stalled game is a failed simulation, retained in the 50-case report. Record completion status separately from game outcome and assertion status.

Checkpoint each game's result immediately. Use bounded per-action/per-day guards and a configurable per-game timeout; record the configured limits. Keep the last valid state, current day, error/stack, action trace and failure screenshot location. Stop loops without changing state to manufacture completion.

The primary batch has 50 planned attempts. A retry keeps the original run ID and gets a separate attempt number; it must not erase the first failure or count as a 51st distinct scenario. A replay/retry is additional execution and requires authorization unless already included in the user's execution instruction. Recovery from harness failures while fulfilling an instruction to run the suite must retain original attempts and be disclosed in the report; it must not be presented as 50 clean first attempts.

Record game commit, index.html SHA-256, harness revision, manifest checksum, browser/Playwright versions, actual settings and start/end timestamps (include Singapore time). Reproduction requires the same build, settings and random streams; seeds alone do not guarantee identical results across code changes.

## Report outputs

After execution, save these together:

- `docs/QA_Sim_<date>_50-run-suite.md`: readable findings, coverage and limitations.
- `docs/QA_Sim_<date>_50-run-suite.json`: metadata, all 50 case records, attempts, snapshots, feature counters, assertions and failure traces.
- `docs/QA_Sim_<date>_50-run-suite.csv`: one summary row per scheduled case, retaining failure status and attempt count.

Use a unique suffix rather than overwrite a prior batch. Link outputs from the relevant CHANGELOG entry. Preserve failed/partial results when a batch is interrupted; do not publish only successful games.

The Markdown report must include:

1. Build identity, run settings, planned/attempted/completed/failed counts and any departures from the manifest.
2. Technical failures separately from balance concerns, bot limitations and not-exercised features.
3. Coverage by game mode, town, rival difficulty/personality, device, strategy and feature.
4. Survival, ending distributions, player placement, score and median net worth, with sample sizes; keep single/rival scoring separate.
5. Midpoint/final rival career and qualification diversity, including infeasible pivots.
6. Eligible-attempt and outcome counts for random social mechanics.
7. Per-game summary: ID, seeds, setup, strategy, device, last day, ending, player place, finances and issue count.
8. Issue register: severity, affected runs, expected/actual behaviour, reproduction evidence and uncertainty.
9. Limitations: small samples, unequal group sizes, strategy/device confounding, unexercised paths and emulation scope.

Results compare different scenarios, not matched desktop/mobile pairs. Difficulty, personality and device comparisons are descriptive; 50 games do not establish statistical conclusions or prove the absence of bugs.

## Implementation acceptance criteria

- Manifest checks confirm all counts, IDs, device allocations, strategies and reload assignments above.
- Existing legacy runner commands remain supported and documented.
- A missing selector, unclosed popup or incomplete batch cannot produce an all-pass report.
- No game changes, artificial benefits or forced social outcomes are introduced by the harness.
- Raw evidence can regenerate the Markdown and CSV summaries.
- Validate implementation with targeted harness checks before an explicitly authorized 50-game execution. Implementation approval alone does not imply execution approval.



## Current implementation limits

- Previews are disabled through the saved UI preference in all strategies. Random action selection therefore does not exercise preview cancellation.
- Chromium is launched with GPU disabled after a packaged headless build encountered software-GPU input timeouts. Games still render and physical input remains subject to Playwright actionability checks.
- Normal policies are inherited from the legacy planner. The social routine calls the best-related active rival, attempts eligible flatmate/shared activities, buys a phone when affordable, answers messages, proposes/renews pacts and occasionally offers a bet. It does not force relationships or events.
- Independent checks currently cover player/rival net-worth components, Life Score aggregation/placement, state/memory bounds, Friendly sabotage state and the meal indicator. Legacy log/effect mismatches are candidates needing review. The harness does not independently validate every rent/loan/bet formula, all work/study display text or the feasibility of every career pivot. Report these limits rather than claiming the entire validation specification passed.
- Reload compares saved state except the expected Welcome back log. Unsaved pre-reload fields are recorded separately. Random state is restored after page initialization; matched replay equivalence is not established.
- The report JSON includes the exact manifest, per-case attempts, daily rival career/education snapshots, action traces and earlier failed/interrupted attempts. Screenshots remain external debugging artifacts; JSON records their filenames.
- Natural events that do not occur remain not exercised. Full UI checks, forced-state cases and physical-device tests are separate.

The JSON evidence uses lossless per-case log and observation dictionaries to avoid storing repeated messages on every action. `tools/qa/suite-evidence.js` decodes observations back to their original values; report-suite.js accepts either checkpoints or the saved JSON. Reviewed parser false positives remain in raw evidence with a separate assessment.

Bank amount controls are selected by stable input/delta prefixes because current min/max values change on render. Product selection and deposit/withdraw modes use actual controls. When opening an inactive product reveals that a choice is disabled, the harness records it as skipped, rather than forcing the button. The longer default input timeout permits normal notification expiry; notification overlap remains a separately reported UI finding.
