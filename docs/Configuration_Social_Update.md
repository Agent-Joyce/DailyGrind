# Configuration for housing money and social contracts

Local update dated 2 November 2026, based on main `0863aa6b3e5d20f75c809c5b4efc45f0eb329b9a`. All keys below are inside `CONFIG.rivals` in `index.html`. This supplements the general [Word configuration guide](Daily%20Grind%20Config%20Guide.docx).

Probabilities are decimals (0.20 means 20%). Durations are game days, time costs are minutes, and dollar thresholds use the existing price multiplier `G()`. Positive friendship changes and penalties use the relationship systems already present. These new features are restricted to rival mode, apart from banking, button styles and the bungalow rule.

## Housing and greetings

| Prefix and keys | Defaults | Meaning |
|---|---|---|
| `together.flat.homeChance` | 0.40 | Daily housemate presence roll, once per day |
| `together.flat.noChance`, `noRel` | 0.20, −1 | Busy refusal of a shared activity; existing no-time/no-cash refusal preserved |
| `together.flat.offerChance`, `offerCooldown` | 0.18, 4 | Eligible housemate offer roll and days between a rival's offers |
| `together.flat.acceptRel`, `replaceRel` | +8, −10 | Accepted invitation affects new and former housemates; preview shown in Messages |
| `together.flat.inviteMinutes`, `kickMinutes`, `kickRel` | 30, 10, −10 | Existing invitation/removal costs retained |
| `social.friendAt` | 40 | Minimum friendship for AI housing invitations |
| `social.greetingMs` | 3000 | Automatic portrait greeting minimizes; focused controls and manual profiles are protected; message feedback has no timer |

Bungalows are single occupancy. The player must ask a remaining apartment housemate to move out before applying. AI bungalow residents cannot invite or join a shared household. Invitations can replace an existing housemate, subject to any Roommate Loyalty notice obligation. A new encounter expands the greeting again; a minimized greeting has a Show greeting control.

## Stakes and loans

| Prefix and keys | Defaults | Meaning |
|---|---|---|
| `money.bet.percent`, `min`, `max`, `reserve` | 0.10, 10, 500, 75 | Net-worth wager fraction and per-person cash safeguards |
| `politics.pact.percent`, `min`, `max`, `reserve` | 0.10, 10, 500, 75 | Savings pot sizing for player/AI and AI/AI pacts |
| `contracts.wealth.percent`, `min`, `max`, `reserve` | 0.30, 10, 2000, 75 | Wealth Challenge stake sizing |
| `money.messageChance` | 0.55 | Nightly money-message gate, after housing/pact offers |
| `money.loan.askChance`, `distressChance`, `cooldown` | 0.20, 0.80, 3 | Per-eligible-rival loan request roll, with distress preference and borrower cooldown |
| `money.loan.lendHappiness`, `lendRel`, `refuseRel` | +2, +6, −3 | Lending/declining consequences; existing tension rules apply to friendship gains |
| Existing `money.loan` repayment keys | retained | Interest 0.10, tenure 3, late allowance 2; difficulty/personality affect repayment and default |

For participants A and B, equal stakes are the whole-dollar minimum of:

- the configured fraction of the lower current net worth;
- the configured maximum;
- A's cash minus their configured reserve;
- B's cash minus their configured reserve.

Below the configured minimum, no stake is available. Acceptance rechecks every participant, including after an old offer remains on screen. Accepted stakes stay fixed. Legacy `money.bet.stake`, `politics.pact.pot` and `money.loan.easyAskChance` are superseded and removed; saved active dollar amounts are retained.

Bets retain the growth-based winner rule. All bet growth is snapshotted before any concurrent bet or challenge distribution. Ties, rival dropouts, pact termination and early-game cancellations refund held funds once. A future wager is cancelled at an early game ending; a wager already due is settled first. Existing savings pots still earn their configured bonus rate; a Wealth Challenge pot earns no separate bonus interest.

Loan records retain original `amt`, outstanding `owe`, due day and late state. Profiles and Messages show principal, terms, balance and counts of on-time/late/default outcomes. Reliability is descriptive; future repayment remains uncertain. Distress means cash plus bank is below the resident's rent plus `askBuffer`. Requests still respect the one-open-message and one-active-loan-per-direction constraints.

## Contract terms

Accepted typed contracts use `S.pact`, with a `kind` and a snapshot of `terms`; old untyped pacts keep their savings/tip behavior. Only one player pact can be active, matching the existing ally model.

| Keys inside `contracts` | Defaults | Obligations and decisions |
|---|---|---|
| `days`, `minutes`, `keepRel`, `missRel`, `honourRel`, `rewardHappy` | 6, 10, +6, −5, +2, +3 | Duration, proposal cost, completion and missed-obligation effects |
| `wealth.growth`, `wealth.reminderDays` | 0.25, 3 | Shared target is 125% of the higher starting net worth; reminders in comparison stats in final 3 days |
| `study.sessions`, `minutes`, `gap` | 3, 60, 2 | Joint study sessions, first scheduled next day, then every 2 days |
| `study.energy`, `knowledge` | −5, +1 | Per attended session; both participants gain knowledge |
| `study.maxReschedules`, `rescheduleChance`, `cancelChance`, `noticeChance` | 1, 0.80, 0.12, 0.50 | Ask to reschedule; agreement is required; partner may cancel with circumstances/notice |
| `conflictChance`, `conflictShift`, `conflictSocialHappy` | 0.30, 80, +4 | A shift/social/fatigue choice competes with study; taking it records a missed session |
| `noticeDays` | 2 | Roommate Loyalty requires explicit notice, then waiting, before leaving/replacing |
| `emergency.chance`, `amount`, `minutes`, `reserve` | 0.15, 60, 30, 75 | Genuine illness/poor-health/rent-distress requests; unaffordable money or time is excused |
| `royalty.amount`, `minutes`, `everyDays` | 20, 20, 2 | Preferential household use plus contribution; honour or miss, no automatic charge |
| `brokenChance`, `problemCooldown`, `problemDays` | 0.08, 4, 2 | Occasional broken savings commitment, cooldown, response window |
| `compensation`, `forgiveRel`, `challengeRel` | 30, +2, −2 | Ask partner for affordable compensation, forgive, challenge, or terminate |

Wealth Challenge winner: the first participant to reach the shared target on or before the deadline. Arrivals on the same game day tie; neither reaching the target refunds both stakes. Player actions and the completed final overnight pipeline record progress; spending, lending and investments remain available. The accepted target, stake and deadline are retained on reload. Early withdrawal refunds stakes and applies the agreed missed-obligation friendship effect.

Missed sessions and unanswered obligations affect progress/consequences. A cancelled study session records illness, fatigue or work conflict and advance/late notice; late notice can waste available study time. Promise termination splits any held pot once. Expired unresolved promise decisions terminate the agreement. Household pacts require the current housemate when proposed. Lost partners cancel their agreements.

## Careers and hidden events

| Prefix and keys | Defaults | Meaning |
|---|---|---|
| `career.alternativeFloor`, `recheckDays` | 0.90, 3 | Alternatives must retain at least 90% of best target utility; recheck every 3 days from midgame |
| `career.closedWeight`, `experienceWeight`, `targetBonus` | 0.75, 0.80, 10 | Current opportunity/experience discounts and target workplace application bonus |
| `career.preferences`, `educationWeight` | per-personality map, 0.025 | Small preferences plus completed relevant qualifications; remaining study and eligibility still constrain choices |
| `socialEvents.chance`, `cooldown`, `expiryDays`, `maxHistory` | 0.08, 4, 6, 12 | Shared occasional-event gate, cooldown, discovery/response lifetime, bounded records |
| `socialEvents.discoveryChance` | 0.45 | Evidence can reveal a source on a later morning before expiry |
| `socialEvents.rumourRel`, `rumourOtherRel`, `betrayRel` | −3, −4, −12 | Damage to player trust, AI-pair trust, and discovered betrayal relationship |
| `socialEvents.confrontRel`, `forgiveRel`, `reconcileRel`, `minutes` | −4, +4, +8, 20 | Discovered-event responses; reconciliation follows confrontation |

The shared pay-times-remaining-days objective caused career convergence, while the previous diversity fallback could select substantially worse careers. New targets include personality, completed education, required study time, knowledge, experience, industry pay and openings. Applications retain eligibility/dress/experience gates and do not take a lower raw-paying job for diversity. Identical outcomes remain possible when the same career is clearly best; diversity is not forced.

Rumours can damage trust between AI characters other than the source; profiles show the resulting pair trust and it can inhibit new AI alliances. Trusted friends may secretly leak plans to help competitors. Unknown sources are not named until evidence appears. Confirmed betrayal from the existing pact system also offers confrontation, forgiveness and reconciliation. Friendly towns retain their no-betrayal policy.

## Banking and compatibility

Bank fixed-dollar presets add to the selection. Percentage presets accumulate fractions against the balance at the start of that selection; fractional dollars are rounded after accumulation. Funds, mode and day changes reset the selection base. Product minimums, device/knowledge requirements and available funds still gate transactions. Savings shows one-day whole-dollar interest; fixed deposits show a four-day compounded projection for the selected amount. Both state the current daily game rate and assume that rate persists; actual rates can change.

Save version 8 adds social records, AI residence defaults and repayment history without changing active legacy loan/bet/pot amounts. A legacy bungalow-plus-housemate household is restored together at the apartment, with a note; nobody is evicted. Existing inventories and education remain intact. New contract terms, notice, evidence and progress are serializable. Single-player games gain no rival social events.

Validation: [Social update test guide](Social_Update_Test_Guide.md). No browser simulations or UI checks were run for this local update.
