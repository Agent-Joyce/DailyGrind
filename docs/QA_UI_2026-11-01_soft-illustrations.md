# Soft illustrated town and portrait validation

Version: base `87c2e4e` plus CHANGELOG section 99. Microsoft Edge via Playwright. Desktop and mobile checked separately.

# Daily Grind UI check

## desktop (1280×800)

16 buildings, 34 situations, 821 presses, 202 layout checks. No issues.


Presses that opened a pop-up (layout checked, numbers not compared): apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment

## phone (390×844)

16 buildings, 34 situations, 821 presses, 202 layout checks. No issues.


Presses that opened a pop-up (layout checked, numbers not compared): apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment

## reload checks (1280×800)

0 buildings, 0 situations, 0 presses, 8 layout checks. No issues.



## Final focused checks

1280px: 43 passed, no script errors.

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
- portrait click opens the matching character card
- viewing a portrait does not change game state
- character card can be dismissed
- portrait opens from the keyboard
- Escape dismisses the portrait
- meeting a rival automatically pops up their portrait
- all sixteen illustrated building assets are embedded
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
- successful calls automatically display the character portrait
- refused calls do not show a successful-interaction portrait

390px: 43 passed, no script errors.

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
- portrait click opens the matching character card
- viewing a portrait does not change game state
- character card can be dismissed
- portrait opens from the keyboard
- Escape dismisses the portrait
- meeting a rival automatically pops up their portrait
- all sixteen illustrated building assets are embedded
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
- successful calls automatically display the character portrait
- refused calls do not show a successful-interaction portrait

All 22 bet/rent/scoring and 19 personality/memory checks passed. No simulations, per user preference.

After the broad runner copy was built, automatic portrait feedback was restricted to successful interactions; final focused checks covered both successful and refused calls. Map geometry and gameplay settings are unchanged. All sixteen embedded image assets loaded offline.
