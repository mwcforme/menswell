## Re-evaluation of three elements

### 1. "Soonest opening" quick-pick — REMOVE

It was a smart pattern in isolation, but on this page it underperforms:

- **Truncates on 390px** ("Thu, May 14 · 8:00 ...") — defeats the entire purpose of a quick-pick, which is to convey the slot at a glance.
- **Redundant.** The calendar already auto-selects the first available day on load. The user is one tap away from the soonest slot via the time grid below — the quick-pick adds a parallel path to the same outcome.
- **Pushes the calendar below the fold.** On 390×844 the day pills now sit ~520px down. The headline goal of /book/schedule is "see days + see times." A 76px promotional row above them costs more conversion than it gains.
- **Two CTAs of equal visual weight** (orange-tint quick-pick + orange "Confirm" bar) split attention. Krug's rule: one obvious next action per screen.

**Decision:** delete the quick-pick block and `nextAvailable` computation. Keep the existing auto-select-first-available behavior — it already accomplishes the same job invisibly.

### 2. Chip labels — fixed by removing the row

The "SOONEST OPENING" + truncated date is the only label that doesn't fit. Day-pill chips ("FULL", "CLOSED", "7 OPEN") fit cleanly. So removing the quick-pick resolves the chip-fit problem at the same time. No further chip work needed.

### 3. Sticky footer — NOT best practice as currently shipped

On `/book/schedule` mobile there are **two competing sticky bars stacked**:

- Orange "CALL (866) 344-4955" bar from `BookSchedule.tsx` (line 158)
- "BOOK ONLINE / CHAT TO BOOK / CALL NOW" `MobileFooterBar`

The exclusion list in `MobileFooterBar.tsx` only matches `/book` exactly, not `/book/schedule`, so it slips through.

This violates two principles:
- **Don't yank users off the conversion page.** They came to schedule online; two "CALL" CTAs imply the online path is broken.
- **No competing sticky elements.** Stacked sticky bars eat ~140px of viewport on a 844px screen.

**Decision:**
- Broaden `EXCLUDED_ROUTES` matching in `MobileFooterBar` from exact-match to `pathname.startsWith("/book")` and `startsWith("/bookv2")` and `startsWith("/intake")`. This kills the BOOK/CHAT/CALL bar on every booking funnel step.
- **Keep** the single orange "CALL" fallback bar in `BookSchedule.tsx` — it's the right escape hatch for the 45-65 demo who may abandon the calendar. One sticky CTA, not two.

## Files

- `src/components/book/GHLDayView.tsx` — remove quick-pick JSX block (~67 lines), remove `Zap` import, remove `nextAvailable` useMemo, remove `handleQuickPick`, remove `quickPickMuted`, keep `advanceWeek` only if still referenced (otherwise drop).
- `src/components/shared/MobileFooterBar.tsx` — change exclusion check to prefix-match for `/book`, `/bookv2`, `/intake`.

## Out of scope

- Day-pill visual treatment (already cleaned up last turn).
- The orange CALL bar on `/book/schedule` stays as-is.
- No analytics-event removal needed — `booking_quickpick_click` simply stops firing.
