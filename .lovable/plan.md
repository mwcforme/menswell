## What's heavy on iPhone (390px) right now

Above the calendar card, the page stacks 7 distinct vertical blocks before any time appears:

```
Back  ←  Step 3 of 3 · PICK YOUR TIME  ←  ▬▬▬ progress bar
"Pick a time that works."
"60-minute in-person visit at our Virginia clinic."
[📍 Richmond] [💪 Sexual health] [🕒 60 min · $0 today]
[Richmond clinic]   ← duplicate inside the white card
[< Prev   May 13–19, 2026   Next >]
```

On a 390x732 screen this consumes the full first viewport. The user has to scroll just to see day pills.

## Goal

One-screen schedule on iPhone: chrome → day pills → first time slot all visible without scrolling.

## Changes

### 1. `src/pages/book/BookSchedule.tsx` (collapse the dark header)

Replace the 5-block hero (Back + Step + progress + headline + paragraph + 3 chips) with one compact 2-row strip on mobile:

- **Row 1:** `← Back` (left) · thin 3-segment progress bar (right). Drop the "STEP 3 OF 3 · PICK YOUR TIME" label — the filled progress bar already conveys it.
- **Row 2:** Single line headline `Pick a time.` (or `{firstName}, pick a time.` when present), font-size 18 mobile / 22 desktop, no subtitle paragraph.
- **Drop the 3 context chips entirely on mobile.** The selected location is already implicit (calendar shows "Richmond clinic" via the inline meta line below — see step 2). The "60 min · $0 today" fact moves into a single grey meta line below the headline: `60-min consult · No charge today`.
- Drop the bottom "Need help picking a time? Call (866) 344-4955" footer line — keep only the floating header phone button (already visible top-right) so we don't add another row.
- Tighten outer padding: `py-4` → `py-2` on mobile, `space-y-4` → `space-y-2` on mobile.
- Desktop (`md:`) keeps the existing fuller layout intact.

### 2. `src/components/book/GHLDayView.tsx` (drop duplicate clinic header)

- Remove the `{cal.label} clinic` h2 block (lines ~354–362) and its bottom border. The location is already shown in the new compact meta line in step 1.
- Remove the `pt-6 md:pt-8` top padding on the card; week-nav row becomes the first row.
- Tighten week-nav padding `px-5 pt-5` → `px-4 pt-3` on mobile.

### 3. Recommended-slots band — mobile collapse

The orange "⚡ Earliest available for you" band (lines ~365–417) duplicates the time grid on mobile. Hide it under `md:` (desktop only). Mobile users get straight to day pills + grid; desktop keeps the urgency CTA.

## Net result on iPhone

```
←Back              ▬▬▬
Pick a time.
60-min consult · No charge today
─────────────────────────
< Prev   May 13–19   Next >
[Wed] [Thu•] [Fri] [Sat] →
─────────────────────────
8:00 AM    11:00 AM
12:00 PM   1:00 PM
```

Approximate height saved above the day pills: ~260px → ~110px (≈150px reclaimed, roughly two extra time slots visible without scrolling).

## Files touched

- `src/pages/book/BookSchedule.tsx` — header rewrite, drop chips/footer
- `src/components/book/GHLDayView.tsx` — drop clinic-name h2, mobile-hide recommended band, tighten padding

No copy added. No business logic, routing, or GHL data flow changes.
