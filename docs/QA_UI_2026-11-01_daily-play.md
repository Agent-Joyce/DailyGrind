# Daily activity and map UI validation

Version: base `26c0bea` plus CHANGELOG section 96. Microsoft Edge via Playwright. Desktop and mobile were checked separately.

# Daily Grind UI check

## desktop (1280×800)

16 buildings, 34 situations, 821 presses, 202 layout checks. No issues.


Presses that opened a pop-up (layout checked, numbers not compared): apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment

## phone (390×844)

16 buildings, 34 situations, 821 presses, 202 layout checks. No issues.


Presses that opened a pop-up (layout checked, numbers not compared): apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment

## reload checks (1280×800)

0 buildings, 0 situations, 0 presses, 8 layout checks. No issues.



## Focused desktop/mobile checks

- 1280px: 21 passed; no script errors.
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
  - daily indicators do not overlap time/cash
  - no horizontal page overflow
- 390px: 21 passed; no script errors.
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
  - daily indicators do not overlap time/cash
  - no horizontal page overflow

All 22 existing bet/rent/scoring regression checks passed. No simulations were run.

The initial review found daily-header overlap on mobile and charts hidden in collapsed profiles; both were fixed and covered by focused checks. Final directory-label integration was covered by the focused navigation checks after the broad runner’s copy had been built. Copy-only refinements to the quiet-night message, device hint and Rules location followed the broad run.
