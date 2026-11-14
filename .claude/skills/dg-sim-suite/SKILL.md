---
name: dg-sim-suite
description: Run the Daily Grind 50-game simulation suite (30 desktop and 20 phone-emulated games, four bot strategies, ten save/reload cases) and generate its report. Use only when the user explicitly authorises the full suite, for a release check or after large gameplay or rival changes.
---

# Daily Grind 50-game suite

The full specification (scenario IDs, device and strategy allocation, seeds, validation limits, report schema) is `docs/Simulation_Guide.md`. Read it before changing anything. Run only when the user authorises it; it is long.

```bash
node tools/qa/run-suite.js --validate
```

```bash
node tools/qa/run-suite.js <folder outside the repo> --workers=3 --commit=<game commit SHA>
```

```bash
node tools/qa/report-suite.js <folder outside the repo> docs/QA_Sim_<YYYY-MM-DD>_50-run-suite
```

## Rules

- Commit the game first (or note the uncommitted CHANGELOG section) so `--commit` names the build tested.
- Keep the original failed or interrupted attempts in the evidence; do not present retries as clean first runs.
- Distinguish in the report: confirmed game findings, confirmed UI findings, bot survival signals, features not exercised, and harness problems.
- Commit only the final report files (`.md`, `.json`, `.csv`), never hooked game copies.
- Phone runs are Chromium emulation, not physical devices.
- Link the report from the CHANGELOG entry of the change it tested.
