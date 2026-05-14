## Goal

Bring `/book/confirmed` in line with the project's post-conversion + funnel rules and fix the broken appointment-time display.

## Issues observed (from current screenshots)

1. **Time renders as raw ISO** — "2026-05-16T12:00:00+00:00" instead of a human-readable format.
2. **Sticky orange "CALL …" footer is pinned to every viewport scroll position** — violates the post-conversion rule (no re-pitch primary CTA on confirmation).
3. **Header still shows a circular phone CTA** — same re-pitch problem; mobile CRO rule says no header CTAs on mobile, and post-conversion pages should drop primary CTAs entirely.
4. **Footer also shows the orange CALL bar** — duplicate of the sticky bar, same rule violation.
5. Minor: appointment metadata line uses a thin `|` divider with the raw timestamp shouting in uppercase — looks broken once the time is unformatted.

## Changes

### 1. Format the appointment time
In `src/pages/book/BookConfirmed.tsx`, parse `state.appointmentTime` as an ISO date and render with `Intl.DateTimeFormat` (America/New_York, since all centers are VA):

```
Saturday, May 16 · 12:00 PM ET
```

Fallback: if parsing fails or the value is missing, show "Time to be confirmed" rather than the raw string. Keep the existing default-string path only for the dev/no-state case.

### 2. Remove the sticky mobile CALL bar
Delete the `<a … className="md:hidden fixed inset-x-0 bottom-0 …">CALL …</a>` block at the bottom of `BookConfirmed.tsx`. Also drop the `pb-28` mobile padding compensation on the content wrapper (becomes `pb-12` across breakpoints).

The "Need to reschedule? Call or text {number}" line in the body already gives them the number — that's the correct, non-pushy post-conversion treatment.

### 3. Strip primary CTAs from header/footer on this page
`BookLayout` wraps the page in `TRTHeader` + `TRTFooter`, which both expose phone CTAs. Two options — recommend **A**:

**A. Add a `variant="confirmation"` prop to `BookLayout`** that, when set, renders a minimal header (logo + "Appointment Confirmed" small text, no phone button) and a minimal footer (legal links + disclaimer only, no orange CALL bar). Pass `variant="confirmation"` from `BookConfirmed`.

**B.** Conditionally hide the phone CTA inside `TRTHeader`/`TRTFooter` based on `useLocation().pathname === "/book/confirmed"`.

A is cleaner and reusable for future post-conversion pages (e.g., intake done, refer-a-friend).

### 4. Tighten the appointment metadata line
Replace the all-caps NAME `|` TIME line with two stacked lines:

```
Eric O'Brien
Saturday, May 16 · 12:00 PM ET
```

Name in Inter 600 18px white; time in Oswald 500 22px white. Drops the broken pipe-divider visual.

### 5. Confirm `MobileFooterBar` is already excluded
`MobileFooterBar` already excludes `/book` prefix, so no change needed there. (Just verifying; the visible orange bar on the screenshot is the page-local one from #2, not the global footer bar.)

## Files

- `src/pages/book/BookConfirmed.tsx` — format time, remove sticky CALL block, restructure metadata line, pass `variant="confirmation"`.
- `src/components/book/BookLayout.tsx` — add `variant?: "default" | "confirmation"` prop; pass through to header/footer.
- `src/components/landing/trt/TRTHeader.tsx` — accept optional `minimal` prop; when true, hide phone CTA.
- `src/components/landing/trt/TRTFooter.tsx` — accept optional `minimal` prop; when true, hide orange CALL bar (keep legal links + disclaimer).

## Out of scope

- Calendar (.ics) download, "Add to calendar" button, refer-a-friend block — could be added later as **secondary** post-conversion actions, but not part of this fix.
- Changing the map embed, video, or address card styling.
- Routing/state changes.

## Memory update after build

Add a leaf `mem://features/post-conversion-pages` capturing: confirmation/thank-you pages use `BookLayout variant="confirmation"`, no primary CTAs in header/footer/sticky, phone number appears only as inline reschedule text. Reference it from `mem://index.md`.
