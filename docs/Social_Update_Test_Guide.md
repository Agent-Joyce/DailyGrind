# Social update regression guide

This local update is based on main `0863aa6b3e5d20f75c809c5b4efc45f0eb329b9a`, with changes described in CHANGELOG section 103. Implemented on feature branch `feature/social-finance-local`; publication directly to `main` was subsequently authorized by the user.

Run only the isolated code regression checks:

```bash
node tools/qa/check-social-rules.js
```

The script parses the real inline JavaScript using the parser bundled with the existing Playwright QA dependency. It loads actual configuration, world tables, qualification initialization and function declarations into fresh Node VM contexts. It does not import/launch a browser, execute the page startup, drive a UI, play days through the game loop, or run simulations. Action services such as logging and time spending have small controlled substitutes. Tests check state transitions and money conservation, rather than claiming browser integration coverage.

Latest local result: **49 checks passed**. Inline JavaScript parsing and `git diff --check` also passed.

Coverage includes housing eligibility and replacement effects; invitation and loan cooldowns; per-person wager sizing, reserve checks and duplicate deductions; tie/dropout/refund conservation; early-ending cancellations; locked wealth stakes, winner/tie/no-target rules and final-night deadlines; study/rescheduling, royalty contributions and unaffordable emergency help; loyalty notice; broken-promise compensation/termination; repayment reliability; unknown-source restrictions and reconciliation; fractional banking presets and interest calculations; career feasibility and utility floors; and legacy save preservation/JSON contract round trips.

## Deferred verification

Per the user instruction, **no simulations, desktop/mobile UI checks, screenshots or physical-device tests have run**. Existing historical reports describe their original builds and are not proof for this update. The code-level results do not establish layout, click wiring, focus behavior in an actual browser, real-world event frequency, career outcome diversity or gameplay balance.

When separately authorized, add browser fixtures for:

1. Replacement housemate invitations, loyalty notice and blocked bungalow application; AI bungalow refusal; a legacy shared-bungalow save.
2. Every typed pact, each obligation/conflict/reschedule path and a broken savings promise; expired decisions and partner dropout; save/reload during each.
3. Final-three-day wealth reminders, simultaneous targets, unmet targets, payout/cancellation and early endings.
4. Current-balance/affordability changes between offer and acceptance, AI-to-AI pots and multiple simultaneous settlements.
5. Pending/accepted loans, late/default histories, borrower cooldown and distress-driven requests.
6. Unknown/confirmed rumours and betrayal, AI-pair relationship changes, confrontation/forgiveness/reconciliation, expiry and cooldown.
7. Fractional balances, repeated dollar/25% selections, manual values, product minimums, unavailable products and savings/fixed-deposit projections.
8. Three-second automatic portrait minimization, focused controls, manual profiles, message feedback, reopening and new encounters.
9. Teal/disabled button contrast, focus indication, labels and wrapping on desktop/mobile and light/dark backgrounds.
10. Career choices across personalities, education, difficulty, openings and time horizons. Matching careers are valid if alternatives are inferior.

Use the existing [Simulation Guide](Simulation_Guide.md) only after simulation authorization. The browser runners are unchanged; they do not yet cover every new contract decision. Update their fixtures/policies before claiming new-feature coverage or a completed end-to-end regression pass.
