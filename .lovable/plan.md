# Booking funnel refinement plan

Scope: `/new` (entry), `/book/symptom`, `/book/duration`, `/book/schedule`. No new routes. Existing brand colors, fonts, and overall layout preserved. Booking state already persists via `sessionStorage` in `src/lib/bookingState.ts` — extend it rather than replace.

---

## 1. Shared progress bar + state

**`src/components/book/SurveyCard.tsx`**
- Replace the existing "Step X of Y" label + 2-segment bar with a 3-segment bar.
- New props: `progressLabel: string`, `filledSegments: 1 | 2 | 3` (replace `step`/`total`). Remove the half-fill behavior — segments are either filled (`#E8670A`) or empty (`#E5E7EB`).
- Render `progressLabel` above the bar in the existing uppercase style.

**`src/lib/bookingState.ts`**
- Add `note?: string` and `urgencyTier?: "early" | "building" | "overdue" | "long_overdue"` to `BookingState` and `FIELDS`.
- Rename symptom value `libido` → `sexual` (with a back-compat read mapping `libido → sexual` so old sessions/URLs keep working). Update `LABELS.symptom`.
- Existing `useBookingSync` hook already pre-fills from URL + session, satisfying back-button persistence (browser back works because URLs always carry the full state via `toQueryString`). No new context/Zustand needed.

---

## 2. `/book/symptom` — `src/pages/book/BookSymptom.tsx`

- Use new `SurveyCard` props: `progressLabel="Almost done — 2 quick questions"`, `filledSegments={1}`.
- Add second subhead under existing subtitle: "This helps us prepare your personalized consultation." (small, muted gray, centered). Cleanest path: pass a new optional `helperText` prop to `SurveyCard`.
- Options array: change `libido` → `{ value: "sexual", label: "Sexual health concerns", icon: Heart }`.
- "Something else" branch: instead of navigating, set local state `showOtherPanel=true`. Render an inline panel below the option list:
  - Heading "Tell us a bit more"
  - `<textarea>` with placeholder, required, min 3 chars
  - Continue button (disabled until valid). On click: `updateBookingState({ symptom: "other", note })` → navigate to `/book/duration?...`.
- Back link: change label to "Back", keep navigate to `/` (which is `NewLandingPage` at `/new`? confirm — route is `/new`; change target to `/new` per spec since user came from quiz). State is preserved via session.

## 3. `/book/duration` — `src/pages/book/BookDuration.tsx`

- New `SurveyCard` props: `progressLabel="Almost done — 2 quick questions"`, `filledSegments={2}`.
- Add reassurance banner above options (inside `SurveyCard` children, before `OPTIONS.map`):
  - `bg-orange-50 border-l-4 border-orange-500 p-3` with `ShieldCheck` icon + copy "Most men wait over 2 years to get help. You're not alone. Let's fix that today." (period instead of em-dash per memory).
- On select, also store `urgencyTier` derived from value:
  - `lt6mo → early`, `6to12mo → building`, `1to2yr → overdue`, `gt2yr → long_overdue`.

## 4. `/book/schedule` — calendar fixes

**`src/components/book/GHLNeoCalendarMock.tsx`**
- Initial state: `selectedDay = null`, `selectedTime = null` (no auto-selection of current time or first slot).
- When user picks a day, do NOT auto-pick a time. Time slots render only when day is selected; otherwise show empty-state hint "Pick a date to see available times."
- Confirm button:
  - Disabled when no time: `bg-gray-300 text-gray-500 cursor-not-allowed`, label "Select a time to continue", remove orange shadow.
  - Enabled when time selected: existing orange style, label `CONFIRM ${selectedTime}`.
- Selected time slot uses orange (`#E8670A` bg, white text) instead of current navy.
- Replace footer "Powered by LeadConnector" with "Secure booking by Men's Wellness Centers."
- Confirm click no longer calls `onConfirm` directly. Instead opens a new `ConfirmAppointmentModal` (sibling component, defined inline or as `src/components/book/ConfirmAppointmentModal.tsx`):
  - Title "Confirm your appointment"
  - Summary card: "New Patient Consultation (30 min)", `[Day, Month Date] at [Time] ET`, `[Location] — In-person`, `Under the name: [First] [Last]` (pull from `useBookingSync().name`; if missing, omit that line).
  - Cancellation policy block with `CalendarClock` icon, heading "Free to reschedule or cancel", body per spec (no em-dash — rewrite as "Need to change plans? You can reschedule or cancel up to 2 hours before your appointment, no fees, no questions. We'll send you a confirmation email and text with a one-click reschedule link.").
  - Buttons: ghost "← Change time" (closes modal, slot stays selected) and full-width orange "Confirm booking" (fires the original `onConfirm(slot)` → existing navigate to `/book/confirmed`).
- Modal built with existing `@/components/ui/dialog` (shadcn) for accessibility.

**`src/pages/book/BookSchedule.tsx`**
- Add personalized header block above `<GHLNeoCalendarMock>`:
  - Headline: `You're a strong candidate for ${SERVICE_LABEL}.`
  - Subhead by `urgencyTier` per spec (rewritten without em-dashes per brand memory: e.g. overdue → "You've waited long enough. Most men in your situation see results within 6 to 8 weeks.").
  - SERVICE_LABEL map: `energy → "TRT evaluation"`, `sexual → "men's sexual health"`, `weight → "medical weight loss"`, `other → "a personalized consultation"`. Default to "a personalized consultation" if symptom missing.
- Pass `firstName`/`lastName` (split from `state.name`) and `locationLabel` to the calendar so the modal can render them.

---

## 5. Acceptance test pass

After implementing, manually walk: `/new` → symptom (verify new copy, sexual rename, "other" inline panel) → duration (banner, urgency stored) → schedule (header copy reflects symptom + duration, confirm disabled, slot click enables, modal opens with full summary, "Change time" closes preserving slot, "Confirm booking" routes to `/book/confirmed?...`). Back navigation at any step preserves prior fields via existing `useBookingSync`.

---

## Technical notes

- No new dependencies. Reuse `lucide-react` (`ShieldCheck`, `CalendarClock`) and existing shadcn `Dialog`.
- `bookingState.ts` `FIELDS` array drives URL serialization, so adding `note` + `urgencyTier` there auto-propagates them through every funnel step and the final confirmed payload — no LeadConnector schema change beyond two added fields, as requested.
- Backward compatibility: legacy `symptom=libido` URLs are mapped to `sexual` on read so existing GHL links keep working.
- Brand memory compliance: no em-dashes in any new user-facing copy; "men" not "guys"; "Men's Wellness Centers" not "MWC" in user copy.
