# Booking Funnel PHI Refactor — Phases 1 + 2

Eliminate PHI/PII leakage from URLs, cookies, GA4/GTM, and Sentry on `/book/*` routes. Move clinical data to GHL custom fields. Anonymous flow only — refresh resets.

## 1. New booking state store (Zustand)

**Create `src/domain/booking/bookingStore.ts`** — Zustand store backed by `sessionStorage` key `mwc_booking_state_v2`. Shape:

```text
{ symptom, note, duration, urgencyTier, location, appointmentTime, service,
  identity?: { firstName, lastName?, phone, email, ghlContactId? } }
```

Exports: `useBookingStore`, `bookingStore.getState/setState`, `reset()`, `setIdentity()`, `setService()`, granular setters per field. Persists every mutation; hydrates on import.

**Create `src/domain/booking/bookingEntry.ts`** — `enterBookingFunnel({...})` resets store, sets identity + service, then `navigate('/book/symptom')` (no query string).

**Create `src/domain/booking/bookingRouteGuard.tsx`** — wrapper for `/book/*`:
- On mount: if no `identity`, redirect to `/` (or service-appropriate LP via `service` if known via referrer fallback to `/`).
- If on a step whose prereqs are missing (e.g. `/book/duration` without `symptom`), redirect to `/book/symptom`.
- On every route change inside `/book/*`: call `sanitizeAnalyticsForBookingRoute(pathname)`, set Sentry tag `booking_route=true`, stop Replay if running.

## 2. Route + page refactor

Modify all `/book/*` pages to read from `useBookingStore()` and navigate without query strings:
- `src/pages/book/BookSymptom.tsx`
- `src/pages/book/BookDuration.tsx`
- `src/pages/book/BookSchedule.tsx`
- `src/pages/book/BookSchedule2.tsx`
- `src/pages/book/BookLetsTalk.tsx`
- `src/pages/book/BookConfirmed.tsx`
- `src/components/book/GHLDayView.tsx` — props sourced from store; `onBooked` writes `appointmentTime` to store and navigates to `/book/confirmed` with no query.

`src/App.tsx` — wrap the `/book/*` route group with `<BookingRouteGuard>`.

Delete `toQueryString`, `fromQueryString`, `useBookingSync` from `src/lib/bookingState.ts` once unreferenced. Keep `labelFor` if still used; otherwise delete the file.

## 3. Hero-form handoff

`src/domain/leads/useLeadSubmitController.ts` — after successful CRM upsert + CAPI `Lead`, call `enterBookingFunnel({ firstName, lastName, phone, email, ghlContactId: result.contactId, service })` instead of building a query-string URL. Drop `nav.go` URL construction.

`src/components/landing/trt/TRTHeroForm.tsx` (and WL/ED equivalents) — remove attribution-based name prefill; users type their name. Keep all other fields/schemas.

## 4. Attribution cookie hardening

`src/lib/attribution.ts`:
- Bump cookie name to `mwc_attr_v2`. Ignore old `mwc_attr` on read.
- Drop `first_name`/`last_name` from `ATTRIBUTION_KEYS`, from URL/cookie writes, and from `attributionTags()`.
- Strip `fn`/`ln` URL aliases.

## 5. Analytics sanitization

**Create `src/lib/analyticsGuard.ts`** with `sanitizeAnalyticsForBookingRoute(pathname)` — calls `gtag('config', 'G-KHD64CYC2G', { page_location: origin+pathname, page_path: pathname, send_page_view: true })` and pushes a sanitized `dataLayer` event. Wired into `BookingRouteGuard`.

`index.html` — change default `gtag('config', ...)` to `{ send_page_view: false }`. No initial unsanitized page_view.

`src/main.tsx`:
- Legacy cleanup: clear `mwc_attr` cookie, remove `mwc_booking_state_v1` from sessionStorage.
- After React mounts (or via a small `RouteAnalytics` component inside `App`), fire a manual `page_view` for non-`/book/*` routes; for `/book/*`, the guard handles it.

## 6. Sentry scoping

`src/lib/sentry.ts`:
- Global defaults: `sendDefaultPii: false`, replay `maskAllText: true`, `maskAllInputs: true`.
- Add `beforeSend` and `beforeSendTransaction` that return `null` when `event.request?.url` (or `window.location.pathname`) matches `/book/`.
- Keep `replaysSessionSampleRate: 0.1` globally.
- Expose Replay integration so `BookingRouteGuard` can call `Sentry.getReplay()?.stop()` on `/book/*`.

## 7. GHL payload refactor

`src/components/book/GHLDayView.tsx` + `src/domain/booking/useConfirmAppointment.ts`:
- Drop the `Concern: ... | Duration: ... | Urgency: ... | note` notes string.
- Set appointment `notes` to `"Booked via web funnel"` (operational, non-clinical).
- During contact upsert, include structured `customFields` map for the six keys: `mwc_symptom`, `mwc_symptom_duration`, `mwc_urgency_tier`, `mwc_clinical_note` (≤500 chars), `mwc_funnel_service`, `mwc_lp_slug`.

`supabase/functions/ghl-proxy/index.ts` — extend `/contacts/upsert` validator to accept an optional `customFields` object, accepting only the six `mwc_*` keys (string values, ≤500 chars). Forward verbatim. Allowlist otherwise unchanged.

`src/services/contracts/ILeadSubmitter.ts` + `src/lib/ghlCalendars.ts` (`upsertContact`) — extend `LeadInput` with optional `customFields: Record<MwcKey, string>` and forward to proxy.

## 8. Files summary

**Create:** `src/domain/booking/bookingStore.ts`, `bookingRouteGuard.tsx`, `bookingEntry.ts`, `src/lib/analyticsGuard.ts`.

**Modify:** `src/App.tsx`, `src/main.tsx`, `index.html`, `src/lib/sentry.ts`, `src/lib/attribution.ts`, `src/lib/bookingState.ts` (prune), `src/lib/ghlCalendars.ts`, `src/services/contracts/ILeadSubmitter.ts`, `src/domain/leads/useLeadSubmitController.ts`, `src/domain/booking/useConfirmAppointment.ts`, `src/components/book/GHLDayView.tsx`, `src/components/landing/trt/TRTHeroForm.tsx` (+ WL/ED hero forms), all `src/pages/book/*.tsx`, `supabase/functions/ghl-proxy/index.ts`.

## 9. Acceptance verification

After implementation, walk the full funnel and confirm:
- No PII/PHI in any `/book/*` URL.
- `mwc_attr` cleared; `mwc_attr_v2` has no name fields.
- `mwc_booking_state_v1` removed; `mwc_booking_state_v2` resets on refresh via guard redirect.
- Refresh of `/book/duration` redirects to `/`.
- Hero `Lead` + final `Schedule` CAPI events still fire.
- GHL appointment `notes` contains no clinical content; structured fields land on the contact.
- Sentry events from `/book/*` are dropped.
- GA4 `page_view` on `/book/*` has clean `page_location`.
- No remaining imports of `toQueryString`/`fromQueryString`.

## 10. Out of scope (Phase 3 backlog)

`ghl-proxy` origin allowlist + rate limits, `?env=prod` lockdown, `meta-capi` origin gating, Sentry release tagging — separate PR.

## Decisions taken autonomously

- LP-specific redirect target on guard miss: default to `/` (no reliable referrer-derived service signal). If `service` happens to be in the store, route to that LP.
- Keep `BookSchedule2.tsx` if still routed; otherwise remove on cleanup pass.
- `customFields` shape uses GHL `customFields: [{ key, field_value }]` array (per LeadConnector v2 API); the proxy validator will accept the six allowed keys and reshape if needed.
