# Dusk neighbourhood and HUD validation

Version: base `8179dac` plus CHANGELOG section 97. Microsoft Edge via Playwright, desktop and phone tested separately.

# Daily Grind UI check

## desktop (1280×800)

16 buildings, 34 situations, 821 presses, 202 layout checks. No issues.


Presses that opened a pop-up (layout checked, numbers not compared): apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment

## phone (390×844)

16 buildings, 34 situations, 821 presses, 202 layout checks. No issues.


Presses that opened a pop-up (layout checked, numbers not compared): apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment

## reload checks (1280×800)

0 buildings, 0 situations, 0 presses, 8 layout checks. No issues.



## Focused final checks

1280px: 34 passed; no script errors.

- travel preserves the 15–120 minute range and is symmetric
- longer physical routes never have shorter travel times
- actual tile walking spends the displayed geometry-based minutes
- meal/work/study indicators
- under eight hours is orange
- under three hours is red
- dimming resets in the morning
- current location and apartment markers
- closed workplace marker
- bungalow marker
- highest completed qualification for every pathway
- phone removed from Life shortcuts
- outside sleep label
- phone visible and enabled on map
- map phone button opens apps
- all characters have visible wealth/career charts
- chart text is valid
- Comfortable continues without checkpoint modal
- Wealthy continues without checkpoint modal
- Tycoon continues without checkpoint modal
- morning omits repeated market briefing
- all visible enabled buttons use teal: 
- all requested controls live in the HUD
- HUD preview toggle remains wired
- HUD sound toggle remains wired
- HUD rules button opens rules
- HUD log button opens a visible log drawer
- log drawer closes
- reading log preserves the open building
- Escape closes log without leaving the building
- rich panel palette is active
- HUD rows fit inside header
- daily indicators do not overlap time/cash
- no horizontal page overflow

390px: 34 passed; no script errors.

- travel preserves the 15–120 minute range and is symmetric
- longer physical routes never have shorter travel times
- actual tile walking spends the displayed geometry-based minutes
- meal/work/study indicators
- under eight hours is orange
- under three hours is red
- dimming resets in the morning
- current location and apartment markers
- closed workplace marker
- bungalow marker
- highest completed qualification for every pathway
- phone removed from Life shortcuts
- outside sleep label
- phone visible and enabled on map
- map phone button opens apps
- all characters have visible wealth/career charts
- chart text is valid
- Comfortable continues without checkpoint modal
- Wealthy continues without checkpoint modal
- Tycoon continues without checkpoint modal
- morning omits repeated market briefing
- all visible enabled buttons use teal: 
- all requested controls live in the HUD
- HUD preview toggle remains wired
- HUD sound toggle remains wired
- HUD rules button opens rules
- HUD log button opens a visible log drawer
- log drawer closes
- reading log preserves the open building
- Escape closes log without leaving the building
- rich panel palette is active
- HUD rows fit inside header
- daily indicators do not overlap time/cash
- no horizontal page overflow

All 22 bet/rent/scoring checks and 19 personality/memory checks passed. Optional balance simulations were not run. Across 240 ordered routes, mean walk time changed from 60.5 to 58.375 minutes; the range remains 15–120 minutes.

After the full runner copy was built, Rules/Sound labels, low-vital highlighting, sun/moon accents and drawer click/Escape isolation were refined; focused checks were rerun against the final version.
