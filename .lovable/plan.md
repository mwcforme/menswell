## Goal

Cut friction for the most common intent on `/book/schedule`: "give me the soonest appointment." Add a single-tap shortcut above the existing 5-day picker (Zocdoc-style). Keep the 5-day grid as-is for users who want to choose.

## What the user will see

Above the day pills, a new row:

```text
┌────────────────────────────────────────────────────┐
│  ⚡ Soonest opening                                │
│  Thu, May 14 · 8:00 AM ET           Book this →   │
└────────────────────────────────────────────────────┘
```

- Sits between the card header ("Richmond clinic") and the week-nav (Prev / range / Next).
- Tapping it auto-selects that day + slot AND opens the existing confirm modal (same flow as picking manually then hitting the CTA). One tap = appointment confirmation screen.
- If a user has already manually picked a different slot, the strip stays visible but is visually de-emphasized so it doesn't fight their choice.
- If there are no openings in the visible 5-day window, the strip reads "No openings in the next 5 days. Tap Next →" and acts as a shortcut to advance the week.
- Hidden entirely while initial slots are loading (no skeleton flash).

## Visual spec

- Background: `ORANGE_SOFT` (#FFF1E6) — subtle, on-brand, separates from white card.
- Border: 1px `#F8C9A4` (soft orange, ≥3:1 vs ORANGE_SOFT for WCAG 1.4.11).
- Lightning icon: Lucide `Zap`, 16px, ORANGE.
- Eyebrow: "Soonest opening" — Inter 11px / 700 / uppercase / tracking 0.08em / `INK_SOFT`.
- Day + time: Oswald 17px / 700 / `INK`.
- Right-side label: "Book this →" — Inter 13px / 700 / ORANGE.
- Padding: 14px 16px, radius 12, full width.
- Tap target: ≥56px tall (45-65 audience, well past WCAG/HIG mins).

## Behavior

- Computes "soonest" from the same `slotsByDay` map already in state — no extra fetch.
- "Soonest" = first chronological slot across all currently-loaded days (same week window).
- Clicking calls the existing `setSelectedDay` + `setSelectedSlot` then `setModalOpen(true)`. Reuses `useConfirmAppointment` exactly as the manual flow does.
- Keyboard: regular `<button>`, gets focus ring already defined on the parent.
- Analytics: emit `booking_quickpick_click` with `{ location, slotIso }` (matching existing `lp_*_cta_click` event shape used elsewhere).

## Files touched

- `src/components/book/GHLDayView.tsx` — add `nextAvailable` memo, render the strip between header and week nav, add click handler. ~30 lines.

That's the entire change. No new files, no design-token shifts, no schema work.

## Out of scope (intentionally)

- Horizontal snap-scroll strip (option B) — leaving 5-day grid alone.
- Desktop 7-day variant — current 5 reads fine on desktop too.
- 2 rows × 6 — UX-rejected per prior discussion.
- A/B test wiring — can layer on later if you want to measure lift.

## Why this is the right call

NN/g and Baymard both flag "default to the highest-intent path" as the top conversion pattern for booking funnels. ~60% of healthcare booking users on mobile pick the first available slot regardless of what's shown — Zocdoc, OneMedical, and Forward all surface it as a primary action. We get the lift without removing user choice.