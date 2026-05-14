
# Booking Flow PHI & Architecture Audit

> Audit only — no code modified. Findings cite real files/lines from the current `book.menswellnesscenters.com` build.

---

## 1. Current Booking Flow Map

Routes are declared in `src/App.tsx` (lines 95–101). The funnel is shared across all services (TRT/ED/WL all funnel to `/book`).

| # | Route | File | Fields collected on this step | Forward mechanism |
|---|---|---|---|---|
| 0 | LP hero forms (`/`, `/wl`, `/ed`) | `src/components/landing/trt/TRTHeroForm.tsx` etc. via `heroLeadSchema` | `name`, `phone`, `email`, `location`, `tcpa` | Calls `useLeadSubmitController` → upserts contact in GHL **and** writes `lead_captures` row, then `nav.go("/book/symptom?…")` carrying name/phone/email/location in URL |
| 1 | `/book/symptom` | `src/pages/book/BookSymptom.tsx` | `symptom` (energy / sexual / weight / other) + free-text `note` if "other" | `navigate('/book/duration?' + toQueryString(state))` (URL) + `sessionStorage` (`mwc_booking_state_v1`) |
| 2 | `/book/duration` | `src/pages/book/BookDuration.tsx` | `duration`, derived `urgencyTier` | URL + sessionStorage |
| 3 | `/book/schedule` (and `/book/schedule2`) | `src/pages/book/BookSchedule.tsx`, `GHLDayView.tsx` | Slot selection only | URL + sessionStorage; on confirm calls `useConfirmAppointment` |
| 3b | `/book/lets-talk` | `BookLetsTalk.tsx` | none (phone CTA) | terminal page for "other" symptom |
| 4 | `/book/confirmed` | `BookConfirmed.tsx` | none | reads from URL + sessionStorage |

Final destinations (parallel writes, all initiated client-side):

- **Supabase `lead_captures`** — written first by `useLeadSubmitController` (`src/domain/leads/useLeadSubmitController.ts:97`).
- **GoHighLevel** — `contacts/upsert` then `calendars/events/appointments` via the `ghl-proxy` edge function (`useConfirmAppointment.ts:140–163`). Notes string concatenates `Concern: <symptom> | Duration: <duration> | Urgency: <tier> | <free-text note>` (`BookSchedule.tsx:128–133`).
- **Meta CAPI + GA4** — `meta-capi` edge function fired from `trackConversion("Lead" | "Schedule")` (`src/lib/capi.ts`).
- **GTM dataLayer** — `cro_click`, `lead`, `schedule`, etc.
- **Supabase `booking_event_log`** — used for backend events (cron sync only based on the table name; not seen written from the funnel).

---

## 2. PII / PHI Exposure Inventory

The funnel passes essentially **the whole intake payload through every URL query string** via `toQueryString()` (`src/lib/bookingState.ts:67–76`). Every navigation from step 0 → 4 puts the following on `window.location.search`:

`name, phone, email, location, service, source, symptom, duration, urgencyTier, note, appointmentTime`

| Field | URL query | URL path | URL fragment | localStorage | sessionStorage | Cookies | Console | 3rd-party payload |
|---|---|---|---|---|---|---|---|---|
| First name | ✅ `name`, also `mwc_attr` cookie auto-fills `first_name`/`last_name` (90-day cookie) | – | – | – | ✅ `mwc_booking_state_v1`, `mwc_attr` | ✅ `mwc_attr` (clear-text JSON, 90 days) | – | GTM dataLayer push includes `page_location` containing the URL → name leaks to GTM/GA4/any GTM tag; Sentry replay (PII enabled) |
| Last name | ✅ (when present in `?ln=` / `mwc_attr`) | – | – | – | ✅ | ✅ | – | same |
| Phone | ✅ `phone` | – | – | – | ✅ | – | – | same; sent server-hashed to Meta CAPI (`meta-capi/index.ts:73`); sent raw to GHL via proxy |
| Email | ✅ `email` | – | – | – | ✅ | – | – | same |
| Symptom (PHI — health condition) | ✅ `symptom` | – | – | – | ✅ | – | – | leaks via `page_location` to GA4/GTM and to Sentry replays; passed to GHL appointment notes |
| Free-text health note | ✅ `note` | – | – | – | ✅ | – | – | same |
| Duration of condition (PHI) | ✅ `duration` | – | – | – | ✅ | – | – | same |
| Urgency tier | ✅ `urgencyTier` | – | – | – | ✅ | – | – | same |
| Location/clinic | ✅ `location` | – | – | – | ✅ | – | – | same |
| Appointment time | ✅ `appointmentTime` | – | – | – | ✅ | – | – | same |
| `fbp`/`fbc` Meta cookies | – | – | – | – | – | ✅ (Meta-set) | – | sent to Meta CAPI |
| Env override | – | – | – | ✅ `mwc_env_override` (`src/lib/env.ts:22`) | – | – | – | – |
| Sentry replay | – | – | – | – | – | – | – | `replaysSessionSampleRate: 0.1`, `maskAllInputs: true`, `maskAllText: false`, `sendDefaultPii: true` (`src/lib/sentry.ts:25–34`) → page URL + visible text (which renders the user's first name in the headline) **is captured** |

🔴 **High-impact PHI exposures**:
1. `symptom`, `note`, `duration` are categorical health data. They appear in the URL on every step from `/book/duration` through `/book/confirmed`, which means GTM/GA4/Sentry/any future tag-manager pixel sees them in `page_location`.
2. `mwc_attr` cookie stores `first_name` + `last_name` in clear text for 90 days, scoped `Path=/`, accessible to any JS on the domain.
3. Sentry session replay (10% sample) captures DOM text including the personalized "{firstName}, pick a time." headline rendered in `BookSchedule.tsx:78`.

---

## 3. Backend & Data Storage

- **Backend**: Lovable Cloud (managed Supabase, ref `stmyztkmioobdbxliktn`).
- **Tables holding form data**:
  - `lead_captures` (full PII + `attribution` JSON) — RLS: anon can INSERT, only admins (`current_user_is_admin()`) can SELECT/UPDATE. ✅
  - `booking_event_log` — admin SELECT only, anon INSERT. ✅
  - `ghl_free_slots`, `ghl_sync_runs` — public SELECT (non-PII). ✅
  - `env_change_log` — admin only.
- **Edge functions** (server-side, deployed automatically):
  - `ghl-proxy` (`supabase/functions/ghl-proxy/index.ts`) — env-aware, allowlists 3 GHL endpoints, validates body shapes.
  - `lead-intake` — external WP/Gravity intake; persists to `lead_captures` then forwards to GHL.
  - `meta-capi` — hashes PII (SHA-256, normalized) and forwards to Meta + GA4 MP.
  - `ghl-sync`, `ghl-sync-validate` — caches free slots.
- **Session/token mechanism**: **None** for the booking visitor. Every step writes directly. There is no per-session "draft booking" record; the visitor's identity travels in URL/sessionStorage. Admin auth uses Supabase auth + email allowlist (`is_admin_email`).

---

## 4. Third-Party Integrations Present

| Service | Location | Notes |
|---|---|---|
| **GTM** | `index.html:14–20` | Container `GTM-5X9DB23T` loaded on every page including `/book/*`. Receives every URL change → PHI leakage vector. |
| **GA4 (gtag)** | `index.html:22–29` | Measurement ID `G-KHD64CYC2G`, `send_page_view: true` → page_location with PII goes to GA4 by default. |
| **GA4 Measurement Protocol (server)** | `meta-capi` edge function | Server fallback, fires `generate_lead`/`schedule` events. |
| **Meta Pixel (browser)** | Not in `index.html`, but `dataLayer.push({event: "lead"|"schedule", …})` in `src/lib/capi.ts:62–70` is presumably wired to fire Meta Pixel via GTM. **Unable to determine GTM container contents from the codebase.** |
| **Meta Conversions API (server)** | `supabase/functions/meta-capi/index.ts` | Properly hashes em/ph/fn/ln/ct/st/zp; passes `event_id` for browser↔server dedupe; reads `META_PIXEL_ID`, `META_CAPI_TOKEN`. **Pixel ID is not visible in the secrets list provided** — unable to confirm it's set. |
| **GoHighLevel** | server-side via `ghl-proxy` | Calls `/contacts/upsert`, `/calendars/.../free-slots`, `/calendars/events/appointments`. PIT lives in `GHL_API_KEY` / `GHL_API_KEY_STAGE_1` secrets. **Notes field carries symptom + free-text → PHI flowing into a non-BAA-by-default CRM.** |
| **Sentry** | `src/lib/sentry.ts` | DSN from `VITE_SENTRY_DSN`. `sendDefaultPii: true`. Session replay sampling 10%. |
| **Lovable Cloud Auth** | `@lovable.dev/cloud-auth-js` | Admin login only. |
| **Google Fonts** | `index.html:9–11` | Standard. |
| **Google Maps embed** | `BookConfirmed.tsx:251` | Iframe — sends user's IP to Google. Acceptable for confirmation page. |

GHL events fired:
- `Lead` → on every hero form submit (`useLeadSubmitController.ts:131`).
- `Schedule` → on successful appointment booking (`useConfirmAppointment.ts:165`).

CAPI parameters: hashed em, ph, fn, ln, st (always "VA"), external_id (GHL contact id), plus `fbp`/`fbc`, plus custom_data `content_name`, `lp_slug`.

---

## 5. Attribution & Marketing Data

- **UTM capture**: `src/lib/attribution.ts:22–34`. Reads `utm_source/medium/campaign/content/term`, `gclid`, `msclkid`, `fbclid`, `first_name`, `last_name`, `page_id` from URL on first load. URL wins over cookie. Persisted to `mwc_attr` cookie (90-day, SameSite=Lax, Secure) **and** to sessionStorage.
- **`fbp`**: read from cookie in `src/lib/capi.ts:56`. Set by Meta Pixel (presumed via GTM).
- **`fbc`**: read from `_fbc` cookie (`capi.ts:57`). The codebase relies on Meta Pixel to write `_fbc` from `fbclid`; **there is no client code that constructs `_fbc` itself**. If Pixel is blocked or not in GTM, `fbc` will be empty.
- **Where attribution lands**:
  - `lead_captures.attribution` JSONB.
  - GHL contact tags via `attributionTags()` (`attribution.ts:128`) — one tag per non-empty key (e.g. `utm_source:google`).
  - `meta-capi` `custom_data.source/medium/campaign`.
  - GTM `dataLayer` push with `utm_source`, `utm_campaign`, `lp_slug`.

---

## 6. Security Posture

| Check | Status |
|---|---|
| Service credentials in client bundle | ✅ Only Supabase **publishable** anon key + project URL ship to the browser. GHL PIT, Meta CAPI token, GA4 API secret are server-only. |
| HTTPS | ✅ Custom domain enforces HTTPS; CAPI cookie `Secure` flag set when on HTTPS (`attribution.ts:75`). |
| CORS on edge functions | ⚠️ All four edge functions return `Access-Control-Allow-Origin: *`. The `ghl-proxy` is anon-callable from any origin — mitigated by a strict (method, path) allowlist + body shape validation, but **there is no origin allowlist**. |
| CSRF | ⚠️ N/A in the strict sense (edge functions are stateless and don't trust cookies for auth), but the anon `ghl-proxy` is callable cross-origin, so a malicious site could fire `contacts/upsert`. The locationId is server-injected, so attacker can't target other GHL tenants — worst case is contact pollution / appointment spam in MWC's GHL. |
| Rate limiting | ⚠️ Only `lead-intake` has it (in-memory, per-IP, 10/min/instance). `ghl-proxy`, `meta-capi`, `ghl-sync` have **none**. |
| RLS | ✅ All tables have RLS enabled. Policies look correct (admin-gated reads, anon insert-only on capture/log tables, public read only on non-PII slot cache). |
| `mwc_env_override` localStorage flag | ⚠️ Lets any visitor force the prod environment (`src/lib/env.ts:30`) by adding `?env=prod`. Stage data could be polluted into prod CRM if a staff QA forgets to reset, and a user clicking a tampered preview link would be silently re-pointed. Low severity but worth a note. |
| Sentry PII | 🔴 `sendDefaultPii: true` plus session replays at 10% with `maskAllText: false`. Captures URLs (which carry name + symptom). |
| GA4/GTM | 🔴 Default `send_page_view: true` + page_location includes PII. Fires on every booking page. |

---

## 7. Existing Tech Stack & Dependencies

- React 18.3.1, Vite 5.4.19, TypeScript 5.8.3, React Router 6.30.1, Tailwind 3.4.17.
- State: React useState + custom `bookingState.ts` (sessionStorage); Zustand 5.0.12 is installed but not used in the booking flow.
- Forms: React Hook Form 7.61 + `@hookform/resolvers`, Zod 3.25 schemas in `src/domain/leads/leadFormSchema.ts`.
- HTTP: `@supabase/supabase-js` 2.105 for all backend calls; native `fetch` inside edge functions.
- Crypto/hashing: only in `meta-capi` edge function (`crypto.subtle.digest("SHA-256")`); no client-side hashing utility.
- Backend SDK: `@supabase/supabase-js@2`, `@lovable.dev/cloud-auth-js@1.1.2`.
- Observability: `@sentry/react@10.53` with `@sentry/vite-plugin@5.3`.
- Analytics: pure dataLayer pushes; no GA/Meta SDKs imported in JS bundle.

---

## 8. Risk Assessment (Top 5)

| # | Risk | Why it matters | Fix size |
|---|---|---|---|
| 1 | **Health condition + free-text in URL query strings** (`symptom`, `note`, `duration`, plus `name`/`phone`/`email`) on every `/book/*` step | HIPAA: PHI in URLs is captured by browser history, server access logs, every analytics tag, the Referer header on outbound clicks, and Meta if Pixel reads `page_location`. Meta "Core Setup" violation: Pixel + GA4 see categorical health data tied to PII. This is the single largest exposure. | **Large** — requires moving to a server-side draft-booking record keyed by an opaque token in the URL, removing PII/PHI from `toQueryString`, and reading state from `sessionStorage` + token-fetched server state. |
| 2 | **GTM/GA4 firing default `page_view` on URLs containing PII/PHI** | Even if other pixels are removed, GA4 by default ingests `page_location` → PII in Google. Plus any third-party tag added via GTM later inherits this leak. | **Small** server-side, **medium** end-to-end — strip PII params before `gtag('config', …)`, configure GTM to override `page_location` on `/book/*` routes, and after fix #1 this becomes a non-issue. |
| 3 | **Sentry replays (10% sample) with `sendDefaultPii: true` and unmasked text** capturing personalized names + URLs | Replays are PHI under HIPAA when they include condition data. No BAA with Sentry by default. | **Small** — disable replays on `/book/*`, or set `maskAllText: true` and drop `sendDefaultPii`. |
| 4 | **GHL appointment notes carry symptom + free-text** ("Concern: sexual \| Duration: 1to2yr \| <user note>") | PHI in CRM notes requires a HIPAA BAA with GHL. If no BAA is in place, this is a HIPAA violation. Also passes through the `ghl-proxy` request body validation, which only length-caps the string. | **Small to medium** — strip clinical content from notes, store the structured fields in custom GHL fields under a BAA, or move clinical context to a server-only record visible only to clinicians. |
| 5 | **`mwc_attr` cookie stores first/last name in clear text for 90 days, `Path=/`, no `HttpOnly`** | Any same-origin script (e.g. a future GTM tag, a compromised dependency) can read raw names. Persists across sessions on shared devices. | **Small** — store an opaque token instead and resolve names server-side; or drop name from attribution entirely (it's only used to override visible form fields, which is itself questionable). |

Honorable mentions: anon-callable `ghl-proxy` with no origin check; no rate limit on CAPI/GHL endpoints; `?env=prod` override toggling cross-environment.

---

## 9. Open Questions for You

1. **Mid-flow refresh**: should a visitor returning to `/book/schedule` (e.g. closed tab) resume their progress, or should we restart them at `/book/symptom`? Drives whether we need a server-persisted draft record vs. a short-lived, opaque token + sessionStorage hydration.
2. **Abandoned-booking remarketing**: do you want to remarket on incomplete funnels? If yes, we still need to fire a `Lead` event when the LP form submits, but we must not include the symptom/duration in the audience signal. If no, we can simplify by deferring CAPI fires until the appointment is booked.
3. **One funnel vs. many**: confirmed there is currently a single shared booking flow (`/book/symptom → duration → schedule → confirmed`) regardless of TRT/ED/WL entry point. Do you want to keep it shared, or split per service so per-service variants of the symptom prompt can ship?
4. **Patient-portal future**: is this funnel intended to also serve as the foundation for an authenticated patient portal (chart, labs, intake forms post-booking), or strictly anonymous booking? The answer changes whether to introduce real auth (Lovable Cloud Auth) and a `bookings` table now, or keep it anonymous + token-only.
5. **HIPAA BAAs in place**: do we currently have BAAs with Supabase (Lovable Cloud), GHL, Meta, Google, and Sentry? The answer determines which integrations must stop receiving PHI immediately versus which can stay as-is.
6. **GTM container access**: I cannot see what tags fire inside `GTM-5X9DB23T`. Can you confirm whether Meta Pixel, Hotjar, LinkedIn Insight, or any other pixels are loaded via GTM? That affects the PII-exposure inventory.
7. **Should `note`/`symptom`/`duration` continue to be included in CAPI `custom_data` or GHL tags?** Currently neither does — but it's worth confirming intent before refactor.

---

## 10. Recommended Sequencing

A 4-phase plan, each phase shippable independently:

**Phase 1 — Stop PHI/PII bleeding into URLs and analytics (highest urgency).**
- Remove `name`, `phone`, `email`, `symptom`, `note`, `duration`, `urgencyTier` from the query string. Keep only an opaque `bid` (booking-id token) in the URL.
- Server-persist a `booking_drafts` row keyed by `bid` (Supabase, RLS: anon insert/update by `bid` only, never select).
- Override `gtag('config', …)` `page_location` on `/book/*` to a sanitized URL (e.g. `/book/symptom`).
- Disable Sentry replays + drop `sendDefaultPii` on `/book/*`.
- Closes risks #1, #2, #3.

**Phase 2 — Lock down the CRM payload to non-PHI.**
- Strip clinical content from GHL appointment `notes`. Push structured symptom/duration into custom GHL fields only if a BAA is in place; otherwise drop entirely and keep clinical context server-side.
- Replace clear-text name in `mwc_attr` cookie with an opaque token.
- Closes risks #4, #5.

**Phase 3 — Harden public edge functions.**
- Add origin allowlist + per-IP rate limit to `ghl-proxy` and `meta-capi`.
- Remove the `?env=prod` localStorage override on production hosts; restrict to non-prod hostnames only.

**Phase 4 — Foundations for future patient portal (optional, only if the answer to Q4 is "yes").**
- Promote the `booking_drafts` token into a real anonymous-then-claimable booking record.
- Wire Lovable Cloud Auth for post-booking account creation.
- Move all PHI display (confirmation page details, intake forms) behind authenticated session.

---

## Executive Summary

Today, a visitor's name, phone, email, and **the health concern they came in with** travel through the URL on every step of the booking funnel and are seen by Google Analytics, Google Tag Manager, and Sentry session replays. Their first name is also stored in a clear-text cookie for 90 days, and a free-text health note is forwarded into the GoHighLevel CRM as part of the appointment record. The Supabase database itself is locked down properly with row-level security, and the server-to-Meta Conversions API path correctly hashes personal data — so the back-end plumbing is fine. The leak is entirely in what the browser does before that plumbing kicks in. Fixing it means removing personal and health data from URLs (replacing them with an opaque booking token), telling Google Analytics to ignore the personalized URL, turning off Sentry session recording on the booking pages, and stripping the symptom and free-text note from the CRM appointment record unless a HIPAA business associate agreement is in place with GoHighLevel. None of this requires a rewrite — it's targeted plumbing changes that can ship in four small phases.
