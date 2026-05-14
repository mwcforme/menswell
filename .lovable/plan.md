# `/book/schedule` Overhaul Plan

Scope: rebuild the calendar/time-picker step end-to-end. P0 bugs first, then CRO additions, then polish. Brand palette + 2-stage flow preserved.

---

## Phase 0 — P0 bug fixes (ship first, behind no flag)

1. **Saturday open (B1)** — `GHLDayView.tsx` currently renders only Mon–Fri (5-col grid, week skips Sat/Sun) and treats Sunday as the only closed day. Switch to a 6-day visible window (Mon–Sat) on desktop / scrollable on mobile, drive `openDays` from `src/data/locations.ts` (already `[1..6]`). Sunday is the only closed state. Add vitest covering all 3 clinics × Saturday → `isClosed === false`.
2. **"TODAY" in ET (B2)** — already partially correct (`isTodayET` uses `Intl` with `America/New_York`). Audit: ensure `weekStart`/`days` are derived from ET-current-date, not `new Date()` local midnight (current code uses local midnight → drifts for PT visitors near midnight). Add `useClinicTimezone` hook returning today-in-ET as `YYYY-MM-DD` and use everywhere. Add caption `Eastern Time · Virginia clinics` under date range.
3. **Kill inline orange CALL bar (B3)** — remove the full-bleed sticky `<a>` at the bottom of `BookSchedule.tsx`. Replace with `MobileBottomBar` (see Phase 2) that shows Confirm-CTA when slot selected, support row when not. Desktop: small sticky pill bottom-right.
4. **Selected day visibility (B4)** — restyle selected chip: white fill, navy text, 2px orange ring + orange dot, `aria-pressed`. Unselected stays navy fill / white text.
5. **Footer phones from `locations.ts` (B5)** — refactor wherever the footer hardcodes phones to `LOCATIONS.map(l => l.phone)`. (No number edits.)
6. **Progress bar (B6)** — already 3 orange segments; rename label to `STEP 3 OF 3 · PICK YOUR TIME`, add `← Back` link above (preserves all `useSearchParams` keys via `toQueryString`).

---

## Phase 1 — Personalization + Recommended Slot (biggest CRO lever)

1. **`ScheduleHeader.tsx`** — H1 uses first name from `?name` (URL-decoded, escaped via React text node). Sub-line: clinic + lead physician (new `physicians` field on `LOCATIONS`, fall back to "Board-certified Virginia physician"). Static chip row from `location`/`service`/`symptom` using a new `src/data/symptoms.ts` map.
2. **`RecommendedSlotCard.tsx`** — when `urgencyTier ∈ {early, urgent}`, surface next 2 slots from `slotsByDay` (already filtered by `dropPastSlots`). Tap → calls `confirmCtl.confirm` directly, skipping the day/time tap (records `is_recommended: true`). Hidden when `urgencyTier=flexible` or no slots.

---

## Phase 2 — Picker restructure

1. **`DayStrip.tsx`** (extracted from GHLDayView)
   - Mobile: horizontal scroll, `scroll-snap-type: x mandatory`, 4 chips visible + 5th peek.
   - Desktop: 7-day visible.
   - Chip rows: weekday, optional `TODAY`/`TOMORROW` pill, `MAY 14`, availability text (`8 slots`, `Only 2 left` orange when ≤3, `Full`, `Closed` Sun-only).
   - States per spec §3c.
2. **`TimeGrid.tsx`**
   - Group slots into MORNING (<12 ET) / AFTERNOON (≥12 ET) using `Intl.DateTimeFormat` parts (no UTC math regressions).
   - Per-chip badges: `Earliest today/tomorrow`, `Last in morning`, `Most popular` (most-popular = static rule: 9 AM and 1 PM tagged when present — no historical data yet, document as v1).
   - Booked-out chips render greyed + strikethrough (we'll need full-day slot inventory; today we only get free slots — gate this behind a follow-up; v1 just shows free slots).
   - Persistent `🕒 60-minute appointment · $0 today` line above MORNING.
3. **30-min granularity** — verify with `ghl-sync` (currently caches whatever GHL returns at calendar's slot interval). Add note in plan: if GHL calendar is set to 60-min, we need the team to flip it to 30-min in GHL admin; code already passes through.

---

## Phase 3 — CTA + sticky bar

1. **`ConfirmBar.tsx`** — disabled state copy `Tap a time above to continue`, bouncing chevron (CSS `@keyframes`, respects `prefers-reduced-motion`). Active: orange fill, dynamic copy `CONFIRM THU MAY 14 · 9:00 AM →`. Above when active: green-check `Your spot will be held for 5 minutes once you confirm`. Submitting: spinner + `Reserving your slot…`.
2. **`MobileBottomBar.tsx`** — slides up on first slot select. Two states per spec §9. Replaces the deleted §B3 inline call bar.

---

## Phase 4 — Trust + roadmap

1. **`LiveAvailabilityBadge.tsx`** — relocate under day strip; pulsing green dot (CSS keyframes); refresh interval drops from 30 min to 30 sec; relative-time formatter (`just now` → `30 sec ago` → `1 min ago`); on refresh-detected slot vanish, shake the chip the user is hovering and grey it (track via `onMouseEnter` ref).
2. **`TrustStrip.tsx`** — 3 icons row between TimeGrid and ConfirmBar.
3. **Physician credibility line** under Confirm CTA, fed by `LOCATIONS[loc].physicians[0]`.
4. **`WhatHappensNext.tsx`** — 3-step roadmap below trust strip.

---

## Phase 5 — URL hydration, header, perf, a11y, analytics

1. **`src/lib/urlParams.ts`** — central parser: decodes name, normalizes symptom (existing `normalizeSymptom` in `bookingState.ts` extended), validates `urgencyTier` enum, sanitizes for render. Missing `location` → render inline location switcher (already exists in `BookSchedule.tsx` else-branch — keep, but elevate above the calendar).
2. **Header (§12)** — replace circular orange phone with `📞 (866) 344-4955` text+icon `<a href="tel:+18663444955">` chip. Mobile: visible icon + abbreviated number.
3. **Perf (§13)**
   - Preload Inter + Oswald woff2 in `index.html`, `font-display: swap`.
   - Defer GA4/Meta/GHL chat behind `requestIdleCallback` (wrap existing loader; falls back to `setTimeout(_, 2000)`).
   - Reserve `min-height` on DayStrip (96px) + TimeGrid (320px).
   - Server-rendered initial 7 days: not feasible with Vite SPA; mitigation = pre-fetch `ghl_free_slots` cache via static `loader` pattern + show skeleton with reserved height.
   - Remove the floating Lovable/translate badge **on `/book/schedule` only** (it's the Lovable preview badge — gated by route in `App.tsx` if present, otherwise hide via CSS on this route).
4. **A11y (§14)** — `aria-pressed`, `aria-disabled`, `aria-label`, arrow-key navigation (`useKeyboardNav` hook on the picker container), `aria-live="polite"` announcer, `:focus-visible` rings. Verify orange-on-white CTA text passes AA — spec'd `#F26B1F` on white needs 18px+ bold for AA; current `#E8670A` is brand. Switch CTA text to white **on** orange (not orange on white) which already passes (4.5:1 for 18px bold). Document the contrast math in `a11y/contrast-audit.md`.
5. **Analytics (§15)** — new `useScheduleAnalytics.ts` hook fires all 10 events to `dataLayer`; CAPI-side via existing `trackConversion()` for `schedule_confirm_success` (uses shared `event_id`). Forward `gclid/gbraid/wbraid/fbclid` via existing `getAttribution()`.
6. **Confirmation pre-state (§16)** — extend `useConfirmAppointment`: optimistic ring, `Hold placed · finalizing your appointment…`, 1.2s spinner, 5s "still working" banner with `tel:` link, on error stay on page with retry button + Sentry log including `slot_iso`.

---

## File tree (new + edited)

```text
src/
  data/
    locations.ts              EDIT: + physicians[]
    symptoms.ts               NEW
  components/schedule/        NEW dir
    ScheduleHeader.tsx
    RecommendedSlotCard.tsx
    DayStrip.tsx
    TimeGrid.tsx
    ConfirmBar.tsx
    LiveAvailabilityBadge.tsx
    TrustStrip.tsx
    WhatHappensNext.tsx
    MobileBottomBar.tsx
  components/book/GHLDayView.tsx  REFACTOR: becomes thin orchestrator wiring sub-components above
  hooks/
    useClinicTimezone.ts      NEW
    useAvailability.ts        NEW (extracted from GHLDayView)
    useScheduleAnalytics.ts   NEW
    useKeyboardNav.ts         NEW
  lib/
    timeFormatting.ts         NEW (centralize ET formatters from GHLDayView)
    urlParams.ts              NEW
  pages/book/BookSchedule.tsx EDIT: remove inline call bar, mount new layout
  domain/booking/useConfirmAppointment.ts  EDIT: optimistic + retry states
index.html                    EDIT: font preloads, defer 3rd-party
```

Tests: vitest for Saturday-open per clinic, ET-today across 4 timezones, urgency-tier → recommended-card visibility, symptom→chip mapping, `urlParams` decode/escape.

---

## Open questions before build

1. **30-min slot granularity** — is the GHL calendar configured for 30-min or 60-min? If 60, who flips it (or do we keep 60-min UI)?
2. **Physician names per clinic** — provide names/credentials/years for Richmond, Newport News, Virginia Beach, or use the generic fallback?
3. **"Most popular" badge** — keep as static rule (9 AM / 1 PM) for v1, or wait until we have booking history?
4. **Lovable badge removal on this route** — confirm OK to hide the published-app badge on `/book/schedule` only (paid-traffic page).
