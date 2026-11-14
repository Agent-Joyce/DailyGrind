---
name: dg-sim
description: Run Daily Grind simulation games (careful and random bot players, single or against AI rivals) and save the report to docs/. Use when the user asks for simulations, a balance check or a before/after comparison of two builds. Always ask before running; it is not required for every change.
---

# Daily Grind simulations

**Ask the user before running.** Simulations take minutes and are not needed for every gameplay change.

## Commands

```bash
node tools/qa/run-sims.js <folder outside the repo>
```

Defaults: 20 careful games from seed 1 and 10 random games from seed 101, single mode. Optional positional arguments: `[careful] [random] [carefulSeed] [randomSeed] [page]`. Flags:

- `--rivals=easy|medium|expert|mixed` and `--rival-count=1..3`: 30-day games against AI rivals; each result lists the rivals' outcomes.
- `--no-comm`: keeps the careful player out of the Community Centre.
- `[page]`: another copy of `index.html`, for example the base build when comparing two builds (`git show <commit>:index.html > <outside folder>/base.html`).

The launcher builds the hooked copy and writes `results.json` into the folder.

## The report (required)

As soon as a run finishes, save to `docs/`, named `QA_Sim_<YYYY-MM-DD>_<change>`:

- `.json`: the raw results.
- `.md`: a readable report with the version tested (base commit, plus the CHANGELOG section of any uncommitted change), the run settings (players, seeds, flags), outcomes (endings, median net worth, rank reached), rival outcomes by level, and every issue the bots recorded. When two builds are compared, say which result belongs to which.

Then link the report from that change's CHANGELOG entry and commit only the two report files, never the hooked copy.

## Reading results

- A bot survival warning ("could not eat", "clothes ran out") is a balance signal, not a code failure. Report counts and the days they start.
- `TEXT≠EFFECT` means log text disagrees with the real change: check it, it is usually a real bug.
- Seeded runs repeat exactly; a change to rival logic or dice order makes a new baseline, so compare against the base build with the same seeds rather than against an old report.
