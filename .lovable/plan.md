# Plan — Unified Lead Submit Controller

## Why

Today two places capture leads with different UX:

| Entry point | Validation | Loading state | Error UX | Submits to CRM? |
|---|---|---|---|---|
| `TRTHeroForm` (landing hero) | Inline `validatePhone`/`validateEmail` | None (instant nav) | Per-field red text | **No** — only persists to `sessionStorage` and routes to `/book/symptom` |
| `GHLDayView.handleFinalConfirm` (booking modal) | None (assumes upstream form data) | `submitting` flag + spinner | Inline `submitError` string + 1.8s redirect on slot-taken | **Yes** — `upsertContact` + `bookAppointment` |

Each future LP form would have to re-implement these patterns. The Phase 1 `ILeadSubmitter` contract exists but has no consumers. This plan wires it in via one reusable controller.

## Deliverables

### 1. Shared validation schema — `src/domain/leads/leadFormSchema.ts`

Single zod schema with the canonical rules already enforced ad hoc in `TRTHeroForm`:

- `name`: trimmed, 1–100 chars
- `phone`: 10 digits after stripping non-digits
- `email`: valid email, ≤255 chars (optional unless caller marks required)
- `location`: enum of `richmond | newport-news | virginia-beach` (optional unless required)
- `tcpa`: literal `true`

Exported as composable pieces so the booking confirm path (which doesn't re-collect tcpa) can reuse the field rules without re-asserting tcpa.

### 2. Controller hook — `src/domain/leads/useLeadSubmitController.ts`

```ts
type Status = "idle" | "submitting" | "success" | "error";

interface Options {
  source?: string;                     // default "landing-page-hero"
  tags?: string[];
  onSuccess?: (result: { contactId: string }, input: LeadInput) => void;
  navigateTo?: string;                 // optional post-success route
  toastOnError?: boolean;              // default true
}

interface Returned {
  status: Status;
  error: string | null;
  fieldErrors: Record<string, string>; // zod-derived
  submit: (raw: unknown) => Promise<void>;
  reset: () => void;
}
```

Behavior:

- Calls `useServices().leads.submitLead(input)` (existing `GhlProxyLeadSubmitter`).
- Validates with `leadFormSchema` first; populates `fieldErrors` and short-circuits if invalid.
- Sets `status = "submitting"` during the call; flips to `"success"` or `"error"`.
- On error: stores message, optionally fires `sonner` toast (`toast.error`), keeps button enabled for retry.
- On success: optionally navigates via `useServices().nav.go(navigateTo)`.
- Idempotent — re-submitting while `submitting` is a no-op.
- Persists captured fields to `bookingState` via `updateBookingState` (preserves current TRTHeroForm side effect).

### 3. Booking-confirm composition — `src/domain/booking/useConfirmAppointment.ts`

`GHLDayView`'s confirm flow is "lead + book" — not just lead. Extract the lead half so it goes through `useLeadSubmitController`, then chain `useServices().booking.bookAppointment`:

```ts
const { submitLead } = useLeadSubmitController({ source: "mwc-book-funnel", toastOnError: false });
// hook returns confirm({ slot, location, notes }) which:
//  1) submits lead → contactId
//  2) booking.bookAppointment(...)
//  3) on slot-taken → persists failed-intent to sessionStorage + redirects /book/lets-talk
//  4) on success → onBooked(slot)
```

Keeps the existing UX (1.8s "slot taken" message + redirect) but moves orchestration out of the view.

### 4. Migrations

- **`src/components/landing/trt/TRTHeroForm.tsx`** — replace ad-hoc validation + navigation with `useLeadSubmitController({ source: "landing-page-hero", navigateTo: state-aware /book/symptom URL })`. Remove inline `validatePhone`/`validateEmail`. Keep all visual styling unchanged.
- **`src/components/book/GHLDayView.tsx`** — `handleFinalConfirm` becomes a one-liner that calls `useConfirmAppointment().confirm(...)`. `submitting` / `submitError` state moves out of the component; consume `status` / `error` from the hook.

### 5. Toast wiring

Project already includes both `sonner` and the legacy `useToast`. The controller uses `sonner`'s `toast.error` (one import, no provider plumbing needed — `<Sonner />` is already mounted in `App.tsx`).

## File map

```
src/
  domain/
    leads/
      leadFormSchema.ts          NEW — zod schema + types
      useLeadSubmitController.ts NEW — the hook
    booking/
      useConfirmAppointment.ts   NEW — composes lead + book
  components/
    landing/trt/TRTHeroForm.tsx  EDIT — adopt controller
    book/GHLDayView.tsx          EDIT — adopt confirm hook
```

No new dependencies. `zod` and `sonner` are already installed.

## Behavior parity

- Hero form: same fields, same red error text, same post-submit URL → no visual diff at 1440px or 390px.
- Booking modal: same spinner, same "Booking..." button label, same 1.8s slot-taken redirect, same `onBooked` callback contract.
- `bookingState` sessionStorage shape unchanged.
- Lead `source` strings preserved (`"landing-page-hero"`, `"mwc-book-funnel"`).
- TCPA gating unchanged — schema requires it on hero, booking confirm doesn't re-check (already accepted upstream).

## Out of scope

- No new lead-form entry points created in this pass. The controller is built so adding `/book/lets-talk`-style forms later is a 10-line component.
- No analytics events (`IAnalytics` stays no-op for now).
- No change to the GHL proxy, calendar IDs, or edge functions.
- `REFACTOR_NOTES.md` gets a Phase 3 entry; Phases 2/4/5/6 still deferred.

## Acceptance checks

1. Submitting the hero form with a missing field shows the same inline error styling as before.
2. Submitting the booking modal with no network shows the same spinner → inline error → button re-enables.
3. Slot-taken path still persists `mwc_booking_failed_intent_v1` and bounces to `/book/lets-talk` after ~1.8s.
4. No component imports `upsertContact` or `bookAppointment` directly anymore — only the new hooks do.
5. `tsc --noEmit` passes; no `any` introduced.
