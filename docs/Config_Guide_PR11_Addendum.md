# Daily Grind configuration guide — PR #11 addendum

This Markdown addendum records new settings introduced in draft PR #11. It supplements the existing binary `Daily Grind Config Guide.docx`, which is unchanged. Merge these notes into the DOCX during the next document-editing pass.

## `CONFIG.rivals.together.flat`

| Key | Default | Meaning |
| --- | --- | --- |
| `refuseChance` | `0.2` | Probability (0–1) that an otherwise available flatmate declines a shared activity. |
| `refuseRel` | `-1` | Relationship adjustment applied when the flatmate refuses; actual change is clamped to the allowed relationship range. |

Applies to cooking, hanging out, chores, and clearing the air. The refusal roll occurs after eligibility checks and before time or money is spent. A refusal is logged and ends the action without spending resources. Existing `homeChance` controls whether the flatmate is home; it is distinct from refusal probability.

## Behaviour changes without new configuration fields

- Relationship helper results reflect actual changes after clamping to [-100, 100].
- Burglary uses `burglaryRisk(S.home)` as the chance threshold.
- Medium rival sabotage targets the nearest eligible competitor ahead in Life Score; Expert targets the highest-scoring eligible competitor.
- `rivalTarget()` uses a small deterministic personality/career preference multiplier on projected earnings. This multiplier is currently hardcoded, not exposed as a CONFIG field. It does not ensure unique careers.

## Verification status

These changes are on branch `review-fixes-2026-11-01` in draft PR #11. No browser/UI checks or simulations have been run for the changes. This addendum does not supersede earlier QA reports.
