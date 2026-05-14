## Goal

After reverting the last edit, redesign the "selected" state for day pills and time slots on `/book/schedule` to match the visual language of iOS 18 system pickers (Calendar app date picker, Clock app time picker, Reminders date chips).

## How iOS handles "selected" today

iOS 18 pickers use a **single, decisive cue: a solid filled shape in the system accent color, with high-contrast white text inside it**. There is no border, no glow, no dot, no ring. Unselected items are flat text or a near-invisible chip; the selected item is the only filled element on screen.

Key properties:
- **Fill, not outline.** Selection = solid accent background. Outlines are reserved for "focus" (keyboard) or "today" markers.
- **Single shape.** Pill or rounded-rect, no inner badge, no second indicator.
- **High contrast text.** White on the accent fill. Numerals stay the same weight/size — selection does not resize or rescale.
- **Today vs Selected are visually distinct.** "Today" is accent-colored *text* on a transparent background. "Selected" is white text on an accent *fill*. If today is also selected, the fill wins and white text reads on accent.
- **No motion on commit.** A 120ms cross-fade between fill colors. No bounce, no shadow swell.

## Apply to /book/schedule

### Day pills (week strip)

States, after revert + redesign:

| State | Background | Text | Border |
|---|---|---|---|
| Default (available, dark navy card) | `INK` (navy) | white | `INK` (invisible) |
| Disabled (Sunday / Full) | `#F1F2F6` light grey | `MUTED` | `LINE` |
| **Selected** | `ORANGE` solid fill | `#FFFFFF` | none |
| Today (not selected) | transparent over navy | `ORANGE` text on the TODAY pill, white numerals | none |
| Tomorrow (not selected) | transparent | white numerals, hairline white pill around "TMRW" | none |

The TODAY/TMRW micro-pill stays, but when the day itself is selected the micro-pill simplifies to white text with no border (it's redundant decoration on top of the orange fill — exactly what iOS avoids).

The "X slots" / "Full" / "Closed" badge text color when selected becomes `rgba(255,255,255,0.85)` so it reads on orange.

No shadow, no ring, no scale change.

### Time slots (grid below)

| State | Background | Text | Border |
|---|---|---|---|
| Default | `SURFACE` (white card) | `INK` numerals, `MUTED` AM/PM | `1px solid BORDER` |
| **Selected** | `ORANGE` solid fill | white numerals, `rgba(255,255,255,0.9)` AM/PM | none |

Drop the colored drop-shadow we had previously — iOS does not shadow filled selections in pickers. Border on default cards stays at 1px hairline (not 2px) so the unselected grid stays calm and the orange fill is the only thing that "pops."

### Why this differs from "orange border only"

The orange-border-only version we just shipped reads as a *focus ring* in iOS grammar, not a selection. iOS users expect the chosen value to be the visually heaviest element. A 2px outline on an otherwise-identical card looks like the cursor landed there, not like a commitment. Filled accent restores that commitment cue with one shape, one color, one weight — still a single visual cue, just the right one.

### Accessibility / contrast

- White on `ORANGE` (`#E8670A`): ~4.7:1 — passes WCAG AA for normal text and AA Large for the 22px Oswald numerals.
- White on `INK` navy: well above 7:1.
- `MUTED` on `#F1F2F6`: existing disabled treatment, unchanged.
- `aria-pressed={selected}` on the day buttons stays; add `aria-pressed` to time slot buttons too (currently missing) so screen readers announce selection independent of color.

## Files

- `src/components/book/GHLDayView.tsx` — day pill style block (~lines 486–555) and time slot style block (~lines 578–608).

No changes to `BookSchedule.tsx`, no token changes, no new assets.

## Out of scope

- Progress bar, back button, header layout (already settled in earlier turns).
- Confirm bar styling.
- Modal styling.
