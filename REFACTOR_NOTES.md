# Refactor Notes — SOLID Pass

Status: **Phase 1 (scaffolding) complete.** Phases 2–6 deferred pending approval.

## Spec ↔ Codebase mismatches (resolved by adapting to real code)

The pasted spec described a different app than what is in the repo. Where the spec contradicted the working code, the working code wins. Every deviation is listed below.

| Spec asserted | Reality | Decision |
|---|---|---|
| Symptom selection at `/book` | `/book` redirects to `/book/symptom`; symptom UI lives at `/book/symptom` | Keep current routes. |
| Urgency tiers `early`\|`mid`\|`late` | `early`\|`building`\|`overdue`\|`long_overdue` (`src/lib/bookingState.ts`) | Keep 4-tier enum. Changing it would break GHL tag mapping downstream. |
| Duration IDs `lt6mo`/`6to12mo`/`gt1yr` | `lt6mo`/`6to12mo`/`1to2yr`/`gt2yr` | Keep 4-option set. |
| `gt1yr → late` mapping | No such ID exists | N/A — current mapping preserved. |
| Two duplicated lead forms (hero + bottom CTA) | Only `TRTHeroForm` is mounted on the landing page. No bottom-CTA form duplicate exists. | Phase 3 LeadFormView split still worthwhile (reuse on `/book/lets-talk`, future LPs) but not for de-duplication. |
| Components call `ghl-proxy` directly | Already abstracted via `src/lib/ghl.ts` single entry point + `src/lib/ghlCalendars.ts` typed helpers | Wrapped these as the concrete impl behind `ILeadSubmitter` / `IAppointmentBooker`. |
| Step state lives only in URL params | Already centralized in `useBookingSync` + sessionStorage | Keep `bookingState.ts`; Phase 4 will rename to `useBookingFlowState` and add a `BookingNavigator` on top. |
| Symptom value `libido` | Already normalized to `sexual` | No change. |
| Lead `source: "landing-page"` | Currently `source: "landing-page-hero"` | Keep current value (analytics segmentation depends on it). |
| Bundle-size win from removing `@supabase/auth-js` | Auth IS used: `client.ts` enables `persistSession`/`autoRefreshToken`; admin/RLS flows may rely on session | Defer until usage audit. Will be revisited in Phase 5. |
| Footer 404 links (`/locations/*`, legal) | Confirmed missing | No change this pass (per spec's own guardrail). |

## Phase 1 — what landed

**New files:**
- `src/config/env.ts` — Zod-validated `import.meta.env` access.
- `src/services/contracts/ILeadSubmitter.ts`
- `src/services/contracts/IAppointmentBooker.ts`
- `src/services/contracts/IAnalytics.ts`
- `src/services/contracts/INavigationService.ts`
- `src/services/impl/GhlProxyLeadSubmitter.ts` — wraps `upsertContact`.
- `src/services/impl/GhlProxyAppointmentBooker.ts` — wraps `getFreeSlots` + `bookAppointment`.
- `src/services/impl/NoopAnalytics.ts` — placeholder; no analytics in client today.
- `src/services/impl/ReactRouterNavigationService.ts`
- `src/app/providers/ServicesProvider.tsx` — single instantiation site; `useServices()` hook.

**Modified files:**
- `src/App.tsx` — wraps the route tree in `<ServicesProvider>` (inside `BrowserRouter` so `useNavigate` is available).

**Behavior delta:** none. All existing components continue to import `ghl.ts`/`ghlCalendars.ts`/`supabase` directly. The new layer is dormant until Phase 3+ migrates consumers onto `useServices()`.

## Deferred phases (need explicit go-ahead)

- **Phase 2 — Config catalogs.** Move locations/symptoms/durations/testimonials/FAQs/stats into `src/config/`. Locations already partly centralized in `ghlCalendars.ts`; will consolidate.
- **Phase 3 — Lead form split.** `LeadFormView` + `useLeadFormController` + `leadFormSchema`. Migrate `TRTHeroForm` to consume `useServices().leads`.
- **Phase 4 — Booking step registry + `BookingNavigator`.** Rename `useBookingSync` → `useBookingFlowState`; add explicit `requires` guards (today the redirect-on-missing logic exists ad hoc in each step).
- **Phase 5 — Route-level code splitting.** `lazy()` per page + audit auth usage before tree-shaking.
- **Phase 6 — Polish.** Strict `tsc`, `og:description`, ARIA improvements that fall out of the refactor.

## Bundle delta

Phase 1 adds ~1 KB of contracts + provider. No consumer migration yet, so the dormant code tree-shakes against itself only if/when impls are referenced. Real bundle measurement deferred to Phase 5.

## Acceptance criteria status (Phase 1 only)

- [x] `ServicesProvider` is the only place concrete service implementations are instantiated. — `src/app/providers/ServicesProvider.tsx`
- [x] `ILeadSubmitter` and `IAppointmentBooker` are separate interfaces. — `src/services/contracts/`
- [x] No new `any` / `@ts-ignore` introduced.
- [ ] Other criteria (LeadFormView purity, no direct `useSearchParams`, step registry, bundle shrink, screenshot parity) — pending Phases 3–5.
