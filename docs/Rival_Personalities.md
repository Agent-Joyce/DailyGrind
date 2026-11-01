# Rival personalities and remembered favours

Each rival has a personality as well as a difficulty level. The personality stays with them for the whole game. Open their row on the Overview leaderboard to see their character and what they remember about you.

| Personality | What to expect |
|---|---|
| Generous | More willing to lend, more reliable at repayment, more likely to share job tips, and less likely to let a tense conversation backfire. |
| Ambitious | More protective of their savings and more likely to take the last job opening. Dependable at repayment. |
| Reckless | Readier to lend or make a bet, but less reliable at repayment. |
| Vindictive | Harder to borrow from. Refusals and unpaid debts weigh more heavily; tense conversations are riskier. |

Difficulty still controls the rival's underlying skill. A generous expert remains an expert.

## What gets remembered

Rivals remember lending when they ask, refusing or ignoring their loan request, paying them back on time, and failing to repay them. They also remember your answer to five personal night cards: a lift to an interview, a birthday cake, covering a shift, soup during illness, and help moving.

Recent deeds affect remembered trust, separately from the relationship meter. By default, help or timely repayment adds one trust; refusal removes one and default removes two. Vindictive rivals multiply a negative change by two. Trust stays between -3 and +3, and each point changes their willingness to lend by four percentage points. Relationship, spare money and their personality still matter.

Profiles show the five most recent memories. Their bounded trust and any favour credits remain even when an older entry leaves that short history.

## A favour returned

Lending when asked, or helping on one of the five cards, earns one favour credit, up to three outstanding. On a later morning a rival may return a credit with a job introduction. This can happen even before you become friends, provided you are on speaking terms (relationship zero or above). It uses the normal job-tip benefit: your next interview is easier and has an opening until the tip expires.

A return consumes one credit. It never replaces an active tip, and it cannot happen on the day of the remembered deed. Rivals who are out of the race cannot return favours. Repeating a chat or call does not earn credits; the same deed cannot be counted twice on one day.

For example, bringing soup to an ill rival leaves a memory and one credit. On a later morning they may introduce you to someone hiring. Refusing a later loan request can reduce their trust and make borrowing harder, even though they still remember that earlier help.

## Configuration and saves

`CONFIG.rivals.personalities` holds the four personalities, dialogue, additive probability adjustments, job-tip/tension multipliers, grudge multiplier and favour-return chance. `CONFIG.rivals.memory` holds history, trust and credit limits and the trust changes for deeds. Loans retain their existing amounts, interest and due dates.

Save version 5 stores `personality` and `favours` on each rival. Existing saves receive stable personalities and empty memories without rerolling the game's random streams. New games deal distinct personalities using the rivals' own random stream. Single-player games are unaffected.

## Career preferences and interactions — draft PR #11 (2026-11-01)

`rivalTarget()` now applies a deterministic, small personality/career-specific multiplier to projected career earnings. The current multiplier is stronger for Ambitious rivals (up to ±7%), smaller for Generous (up to ±4%) and Vindictive (up to ±2%), and defaults to ±3.5% for other personality keys (including Reckless). The multiplier does not guarantee unique careers, and no simulation results have been established.

Medium rivals choose the closest eligible opponent ahead for sabotage; Expert rivals choose the highest-scoring eligible opponent. Relationship messages use the actual delta after clamping to −100/+100.

When a flatmate is home, each shared activity (cook, hangout, chores or clearAir) has a configurable chance of refusal (`CONFIG.rivals.together.flat.refuseChance`, default 20%). A refusal changes the relationship by `CONFIG.rivals.together.flat.refuseRel` (default −1) without spending time or money. This applies only to the draft PR until merged.
