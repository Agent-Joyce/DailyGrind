# Daily Grind UI check, Package A (14 November 2026)

Version: `7a88a36` (CHANGELOG §108). Headless Chromium (Playwright) in the cloud container; phone width is Chromium emulation, not a real phone. Command: `node tools/qa/run-uicheck.js <scratch folder>`.

Earlier runs the same day: on the base `5ac693b`, 3,837 issues across both widths, all BUTTON COLOR from a rule older than the three button levels of §107 (the rule was updated). The second run (base plus the first §108 fixes and the five new situations) found 2 issues at 1280 px and 5 at 390 px: the broken-promise buttons off the phone screen (fixed), a button caught mid colour fade (a check artefact, fixed in the check) and a tutoring situation that asked for a class button its own setup removed (fixed in the check). Final result below.

## Final run

## desktop (1280×800)

16 buildings, 39 situations, 916 presses, 212 layout checks. No issues.


Presses that opened a pop-up (layout checked, numbers not compared): apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment

## phone (390×844)

16 buildings, 39 situations, 916 presses, 212 layout checks. No issues.


Presses that opened a pop-up (layout checked, numbers not compared): apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment; apt: Sleep at Apartment

## reload checks (1280×800)

0 buildings, 0 situations, 0 presses, 8 layout checks. No issues.

