# Harsh Critique & Fix Plan — Booking Funnel & GHL Calendar

I went through `BookingFunnel`, `StepOne–StepFour`, `GHLDayView`, `bookingState`, `ghlCalendars`, and the `ghl-proxy` edge function. Below is everything I'd attack in a code review, ordered by how badly it can hurt you in production.

---

## P0 — Will fail in production (data loss, double-bookings, lost leads)

### 1. The "calendar" is a lie
`GHLDayView` calls `getFreeSlots(...)` then **throws the response away** and renders a hard-coded 8a–5p slate. Then `bookAppointment` posts to GHL on whatever ISO the user picked.

Failure modes:
- Two users pick 10:00 AM → both get booked → provider double-booked.
- Slot is outside calendar's actual availability window → GHL rejects → user sees "Booking failed" after committing emotionally.
- Holidays, blocked time, lunch breaks, vacations — invisible to the UI.
- "Updated 12s ago" is theater; it's the API call's freshness, not the data shown.

**Fix:** Render slots from `getFreeSlots` data. Keep the "overbook visual" only as a soft padding on top of real availability (e.g. show real free + 1–2 visual placeholders that fall back to `lets-talk` if GHL rejects). Stop rendering hours that GHL has actually returned as taken.

### 2. `StepThree` is a fake calendar still wired into the funnel
`StepThree.tsx` hard-codes "March 2026", 31 days, 4 time slots, with no GHL call. `BookingFunnel` routes step 3 to this component — not `GHLDayView`. So the live calendar work in `/book/schedule` is bypassed entirely on `/book` (the funnel users actually land in).

**Fix:** Replace `StepThree`'s body with `GHLDayView` (passing `firstName/phone/email/location`) or delete the legacy funnel and consolidate on `/book/*` pages. Right now you have **two parallel booking flows** drifting apart.

### 3. No phone validation, no email required in StepOne
`StepOne.validate()` is `return true`. Empty name, empty phone, empty location all pass. `StepThree` then displays `Booking for: undefined · undefined · undefined`. `upsertContact` will create junk contacts in GHL with `firstName: "Guest"`.

**Fix:** Required-field validation, E.164 phone normalization, disable CTA until valid.

### 4. `upsertContact` swallows failures silently for the user
If GHL upsert succeeds but `bookAppointment` fails, you've created an orphan contact and shown a generic "Booking failed." No retry, no fallback to `/book/lets-talk`, no logging. Lead is lost.

**Fix:** On `bookAppointment` failure → auto-route to `BookLetsTalk` with the contactId + intended slot in state, and log the failure (Supabase table or PostHog).

### 5. Edge function has no auth, no rate limit, no input validation
`ghl-proxy` accepts arbitrary `path`, `method`, `body`, `query` from any anonymous client. Anyone with your anon key can:
- Enumerate every contact via `/contacts/`
- Delete appointments via DELETE
- Spam your GHL quota
- Pivot to any LeadConnector endpoint

`verify_jwt` is presumably off (Lovable default). The `path` allowlist is missing.

**Fix:**
- Whitelist allowed `(method, pathPattern)` pairs (e.g. only `GET /calendars/{id}/free-slots`, `POST /contacts/upsert`, `POST /calendars/events/appointments`).
- Reject everything else with 403.
- Add Zod validation on body shape per route.
- Add per-IP rate limiting (Deno KV or upstash) — e.g. 30 req/min.
- Strip/ignore client-sent `locationId`; always inject server-side.

---

## P1 — Compliance, legal, and tracking

### 6. TCPA consent is pre-checked
`StepOne` initializes `consent = true`. TCPA requires **express written consent** — pre-checked boxes are not valid express consent under FCC and recent FCC 2024 rule. Litigation risk for a high-volume men's health funnel is real.

**Fix:** `useState(false)`, gate CTA on `consent === true`, store consent timestamp + IP + exact disclosure text with the lead.

### 7. No HIPAA-grade handling of PHI
Symptom + duration + screener answers (cancer, ED, etc.) are written to `sessionStorage` in plain JSON, sent to a non-BAA edge function, and forwarded to GHL. Confirm:
- BAA exists with GHL and Supabase.
- `sessionStorage` is acceptable per your privacy policy (recommend not persisting screeners — keep in-memory only).

**Fix:** Move screener answers out of `sessionStorage`, scrub on unmount, audit BAAs.

### 8. Hard-coded scarcity that contradicts the actual UI
`scarcityDisplayCount` shows "2 OPEN" while the grid shows 9 slots. A skeptical man (your stated audience) will notice instantly and lose trust. This also exposes you to FTC deceptive-practice claims for fabricated urgency on a healthcare site.

**Fix:** Either show real remaining slot counts, or remove the badge entirely. Don't fabricate scarcity on a medical product. The "Appointments are available today" banner in `StepThree` is similarly always-on and should be conditional.

### 9. No analytics on the funnel
No PostHog/GA events for step views, abandonment, screener DQ, slot selection, booking success/failure. You cannot diagnose drop-off or measure CRO changes.

**Fix:** Standardized `lp_book_step_view`, `lp_book_step_complete`, `lp_book_dq`, `lp_book_confirmed` events per memory rule.

---

## P2 — UX bugs that quietly cost conversions

### 10. Timezone math runs on every render
`etOffsetMinutes` calls `Intl.DateTimeFormat` twice per `etWallToDate` call, called per hour per day per render. Memoize per `ymdStr`.

### 11. Refresh interval re-creates timer on every `weekStart` change
Cleanup is correct, but `refreshNonce` triggers a full re-fetch + reset of `selectedDay` to first-with-slots, even after the user already picked a day. Manual refresh nukes their selection.

**Fix:** Preserve `selectedDay` and `selectedSlot` across timer/manual refresh.

### 12. "Tab focus" refresh fires on every focus
Open devtools, alt-tab back, lose your selection. Throttle to `>= 5 min since lastUpdated`.

### 13. Past-day slots when crossing midnight
`today` is captured once via `useMemo([])`. If the page sits open past midnight, the user can still book "today" 8am which is now in the past.

**Fix:** Recompute `today` on focus or via a 1-min interval.

### 14. `selectedSlot` ISO loses TZ semantics on confirm
Modal renders `fmtFullDay(new Date(selectedSlot))` using `TIMEZONE`, but `BookConfirmed` likely renders with browser TZ. Verify end-to-end consistency.

### 15. `StepTwo` form is a wall
~12 fields visible at once on a single screen. Memory says: "Mobile CRO — prioritize headlines before forms." Split into 2–3 micro-steps or progressive reveal.

### 16. `goTo` 300ms blanket delay
Every step transition blocks input for 300ms. Feels laggy on mobile; remove or reduce to 150ms with `prefers-reduced-motion` opt-out.

### 17. Accessibility gaps
- Custom radios are `<label>` wrapping hidden inputs but no visible focus ring.
- `aria-pressed` on day pills is good, but time slot buttons have no `aria-label` describing date+time.
- Confirm CTA color contrast on disabled `#F1F2F5/#9AA0AC` is below WCAG AA.

### 18. SEO/meta on `/book` routes
Booking pages have no `<SEOHead>`. `noindex` should be set explicitly for funnel steps to keep them out of search results.

---

## P3 — Architectural smells

### 19. Inline styles everywhere
`GHLDayView` and the `Step*` files use 100% inline `style={{}}` with hard-coded hex colors — directly violates the project's `use-semantic-tokens` rule (memory: Color Palette, Booking v2 UI System). Refactor to Tailwind tokens (`bg-background`, `text-foreground`, `border-border`, etc.).

### 20. Two booking funnels
`/book` (`BookingFunnel` 4-step) and `/book/symptom → /book/schedule` (URL-driven). Pick one as canonical and redirect the other. The split is why `StepThree` has fake data — nobody updates it.

### 21. `bookingState` only saves to `sessionStorage`
Lost on tab close. For a 60-min consult with a 4-step funnel, you should persist contactId server-side after StepOne to recover abandoned leads (lead nurture is the real revenue driver).

### 22. No error boundary
A single thrown error in `GHLDayView` blanks the page. Add a route-level `<ErrorBoundary fallback={<BookLetsTalk />} />`.

---

## Suggested execution order (what I'd ship)

```text
Sprint 1 (this week, P0):
  1. Lock down ghl-proxy: route allowlist + Zod + rate limit
  2. Wire GHLDayView to render real free-slots from API
  3. Validate StepOne fields (name/phone/location) + E.164 phone
  4. Replace StepThree fake calendar with GHLDayView
  5. On booking failure: route to /book/lets-talk with state, log error

Sprint 2 (P1):
  6. TCPA: default unchecked, gate CTA, store consent record
  7. PostHog event taxonomy across funnel
  8. Remove or replace fake scarcity badge
  9. Audit BAAs; stop persisting screener answers to sessionStorage

Sprint 3 (P2/P3):
  10. Memoize TZ math; preserve selection on refresh; throttle focus refresh
  11. Recompute "today" past midnight
  12. Refactor inline styles to Tailwind tokens
  13. Consolidate to one funnel (delete the loser)
  14. Add ErrorBoundary + SEOHead with noindex on /book/*
```

## Technical notes (for the engineer)

- `ghl-proxy` allowlist pattern:
  ```ts
  const ALLOW = [
    { m: "GET",  re: /^\/calendars\/[A-Za-z0-9]+\/free-slots$/ },
    { m: "POST", re: /^\/contacts\/upsert$/ },
    { m: "POST", re: /^\/calendars\/events\/appointments$/ },
  ];
  ```
- Rate limit via Deno KV: key on `req.headers.get("x-forwarded-for")`, sliding window 60s/30 req.
- For real availability: replace the `out[ymd(d)] = buildFullDaySlots(d)` line with parsing of `getFreeSlots` response (`data[date].slots[]` ISO strings already in `TIMEZONE`).
- For TCPA consent record, create `lead_consents` table with `phone, ip, user_agent, disclosure_text_hash, consented_at`.
- Clock skew: GHL slot ISOs are authoritative — don't recompute, just display them with `toLocaleTimeString({ timeZone: TIMEZONE })`.

This list is opinionated and harsh on purpose — most items are real bugs, not preferences. Approve and I'll start at the top.
