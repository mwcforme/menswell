## What's wrong

Two redundancies on `/book/schedule` (see screenshots):

1. **`EASTERN TIME · VIRGINIA CLINICS`** subtitle under the week range — repeats info already shown by the location chip and the "All times shown in ET" line below.
2. **`Thursday, May 14` / `All times shown in ET` / `Updated 25s ago`** band above the time grid — the selected day card already shows "THU MAY 14", so the heading and ET sub-line are duplicates eating ~80px of vertical space on mobile.

(The faint "7 slots" inside the dark Fri May 15 card is intentional contrast for unselected days, leaving as-is.)

## Changes (single file: `src/components/book/GHLDayView.tsx`)

1. Remove the `Eastern Time · Virginia clinics` `<div>` under the week range (lines ~442–444). Keep only the date range line.
2. Collapse the times-section header (lines ~592–638):
   - Drop the big `Thursday, May 14` heading and the `All times shown in ET.` sub-line.
   - Keep only a single right-aligned **`Updated Xs ago`** refresh pill (existing button, unchanged behavior, with its existing tooltip explaining ET + refresh cadence).
   - Reduce the section's top padding from 22 → 14 so the time grid sits closer to the day pills.
3. Move the "ET" reassurance into the refresh pill's `aria-label`/`title` only (already present in tooltip), so the visible UI stays clean but screen-reader / hover users still get it.

## Result

Mobile users see day-pills → time grid with no duplicate date heading and no repeated timezone copy, recovering ~80px above the fold so more time slots are visible without scrolling.
