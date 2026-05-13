## Goal

Ship two new paid-traffic landing pages, /new-wl (Weight Loss) and /new-ed (Erectile Dysfunction), cloned from the proven /new (TRT) structure. Copy and photo direction will be informed by a focused competitor scan, not invented.

## Phase 1 — Competitor research (read-only, ~10 min)

Scrape and analyze 4-5 top LPs per service so the copy is grounded, not generic. Use Firecrawl (`scrape` with `markdown` + `screenshot` formats) on:

**ED competitors**
- hims.com/ed
- ro.co/ed
- bluechew.com
- mosh.com.au/ed
- foreverwell / local Virginia ED comp if Semrush surfaces one

**Weight Loss competitors**
- hims.com/weight-loss
- ro.co/weight-loss (Ro Body)
- foundhealth.com
- formhealth.co
- henrymeds.com/weight-loss
- mochihealth.com

For each, capture:
- H1 + subhead (the headline pattern that works)
- Trust bar items (what social proof they lead with)
- Form fields above the fold
- Photo style (model age, setting, mood)
- Pricing or "first visit free" framing
- Top 3 objection-handling sections
- FAQ topics

Output a short internal brief (saved to `REFACTOR_NOTES.md` under "WL + ED LP research") so the copy choices are auditable.

Cross-check with Semrush `serp_analysis` on "trt virginia", "ed treatment near me", "weight loss clinic richmond va" to see which competitors actually rank and what intent they target.

## Phase 2 — Photography direction

`/new` currently has no large photography. WL and ED LPs convert better with one credible hero photo. Per brand memory, **no AI faces, no stock-photo cliché**. Two options:

- **A** — Source from existing MWC photo library (preferred). I'll list the `/public/` and `/src/assets/` folders and pick the best in-brand shot per page.
- **B** — Use a tasteful, age-appropriate (45-65) lifestyle photo from an authentic photography source. I will not generate AI faces.

I'll list what's available and pick A wherever possible. For ED specifically, copy-led design (no person photo) is often the right call to preserve discretion. I'll flag this in the research brief and decide per page.

## Phase 3 — Page builds

Clone the `/new` component structure under namespaced folders so we don't pollute TRT components:

```text
src/components/landing/wl/
  WLHero.tsx            (was TRTHero)
  WLHeroForm.tsx
  WLTrustBar.tsx
  WLHowItWorks.tsx
  WLResults.tsx
  WLManifesto.tsx
  WLPillars.tsx
  WLMarquee.tsx
  WLLocations.tsx       (re-exports TRTLocations, same content)
  WLFAQ.tsx
  WLFinalCTA.tsx
  WLMobileCTA.tsx
src/components/landing/ed/   (mirror)
src/pages/NewWeightLoss.tsx  → renders at /new-wl
src/pages/NewED.tsx          → renders at /new-ed
```

Shared chrome (`TRTHeader`, `TRTFooter`, `SectionReveal`) is reused as-is — it's not service-specific.

**Service-aware data flow**
- `TRTHeroForm` posts to GHL with TRT tags. Add a `service: "trt" | "wl" | "ed"` prop on the form so each LP tags the lead correctly in GHL.
- Conversion events: emit `lp_new_wl_cta_click` and `lp_new_ed_cta_click` per existing convention.
- Booking handoff stays `/book/schedule` (single funnel) but appends `?service=wl` / `?service=ed` so /book can show the right symptom phrasing.

**SEO**
- /new-wl: title "Medical Weight Loss in Virginia | Men's Wellness Centers", description grounded in research brief.
- /new-ed: title "ED Treatment in Virginia | Discreet, In-Person | Men's Wellness Centers".
- Both inherit existing `noindex, nofollow` from `SEO.tsx` (paid LP subdomain — same posture as /new).

## Phase 4 — Wire up the directory and routing

- `src/data/landingPages.ts` — add two `LIVE` entries for /new-wl and /new-ed with primaryCta `/book/schedule`.
- `src/App.tsx` — add `<Route path="/new-wl" ... />` and `<Route path="/new-ed" ... />`.
- Existing `/lp` directory already auto-renders any entry from `landingPages.ts`, so it picks them up for free.

## Out of scope (call out, don't do)

- No new service-specific booking flows (they share `/book/schedule`).
- No new email templates, no new edge functions, no DB changes.
- No edits to /new (TRT) — pure additive work.
- No AI-generated photography.

## Open question I'll resolve in Phase 1

Whether ED page uses a hero photo or stays copy-led. I'll decide based on what the top 3 ranking ED LPs do and how brand memory's "no AI faces, authentic photography only" applies given what's in the existing photo library.

## Deliverables

1. Research brief appended to REFACTOR_NOTES.md
2. Two new live LPs at /new-wl and /new-ed
3. Updated /lp directory
4. Service-aware lead tagging in the hero form
