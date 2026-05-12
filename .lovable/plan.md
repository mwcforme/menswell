## Goal

Stop showing the "Looks like you started in the middle. Start over." banner. Instead, when someone lands on a later step (`/book/duration` or `/book/schedule`) without completing prior steps, silently redirect them to `/book/symptom` so they always start at step 1.

## Changes

1. **`src/pages/book/BookSchedule.tsx`**
   - Remove the `MissingParamBanner` import and render.
   - If `!state.symptom || !state.duration`, call `navigate("/book/symptom", { replace: true })` inside a `useEffect` and render `null` until redirect fires.

2. **`src/pages/book/BookDuration.tsx`**
   - Apply the same pattern: if `!state.symptom`, redirect to `/book/symptom` (replace) and render nothing.
   - Remove its `MissingParamBanner` usage if present.

3. **`src/components/book/MissingParamBanner.tsx`**
   - Delete the file (no longer referenced).

4. **Preserve query string forwarding**: redirect uses `replace: true` so back button doesn't trap users on the broken step.

## Out of scope

- No changes to `BookSymptom`, `BookConfirmed`, `BookLetsTalk`, GHL sync, or calendar logic.
- No copy changes elsewhere.
