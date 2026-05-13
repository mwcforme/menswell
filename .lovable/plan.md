# CRO + UI/UX Overhaul — book.menswellnesscenters.com

Single-page paid-media lander for TRT / ED / Weight Loss across 3 VA clinics. Goal: lift form submits without touching either lead form, while preserving brand voice, Saturday hours, and current phone numbers.

## Hard constraints (verified before each commit)

1. **Forms are frozen.** `TRTHeroForm.tsx` and the form card inside `ServiceFinalCTA.tsx` / `TRTFinalCTA.tsx` get zero changes — fields, labels, placeholders, validation, submit handler, consent copy, button text, aria, styling all untouched. Card *wrapper* (border-left accent, min-height) is fair game; everything inside the form is not.
2. **Saturday stays open.** All 3 clinics keep `Mon–Sat 9:00 AM – 5:00 PM` everywhere it renders, plus in new JSON-LD and "Open now" logic.
3. **Phone numbers unchanged**, including the duplicate `(757) 806-6263` on Newport News + Virginia Beach. Seed `locations.ts` with current strings exactly.

## Phase 0 — Foundations

- **`src/data/locations.ts`** — single source of truth: `{ slug, name, region, address, cityStateZip, phone, phoneHref, hours: "Mon–Sat 9:00 AM – 5:00 PM", mapUrl, minsFromHighway, parking }`. Seed verbatim from current `TRTLocations.tsx`.
- **`src/data/faqs.ts`** — FAQ items in new priority order (insurance → process → safety → vs-Hims → fit → first-visit → included → timeline). Question text unchanged from current `TRTFAQ.tsx`.
- **`src/data/testimonials.ts`** — `{ name, city, monthYear, rating, quote, source: "google" | "verified_patient" }`. Includes one 4★ entry with honest caveat.
- **`src/lib/schema.ts`** — emits `LocalBusiness` (per location, Saturday in `dayOfWeek`) and `FAQPage` JSON-LD as `<script type="application/ld+json">` blocks via `react-helmet-async`.
- **`src/hooks/useAnalytics.ts`** — `trackCro(slug)` wrapper that pushes `{ event: 'cro_click', cro }` to `dataLayer`. Non-form only.
- **`src/hooks/useGeoLocation.ts`** — best-effort nearest-clinic guess (timezone + optional `navigator.geolocation` with silent failure); defaults to Glen Allen.
- **Scroll-reveal fix** — patch `useScrollReveal` so initial state is `opacity:1`. Reveal transform is applied only inside `@media (prefers-reduced-motion: no-preference)`, with an immediate-fire fallback when the element is already in the viewport on mount. Excluded from any node inside a form card.

## Phase 1 — Hero (non-form)

- Sub-headline → `Your first visit is on us — $0 today, $0 obligation.`
- Star row enlarged, wrapped in `<a target="_blank" rel="noopener">` to GBP reviews URL, Google "G" mark left of rating.
- Add 5th orange check: `$0 first visit`.
- Add credibility strip line: `BOARD-CERTIFIED PHYSICIANS · LICENSED BY THE VIRGINIA BOARD OF MEDICINE · 10,000+ MEN TREATED SINCE 2019`.
- Hero background: radial gradient `#0B1530 → #0A1024` behind H1.
- Form card wrapper gets `border-left: 4px solid rgba(232,103,10,0.6)` and a reserved `min-height` to prevent CLS. **No edits inside the form.**
- Optional muted right-aligned portrait at 8% opacity (AVIF/WebP <80KB, preloaded). Gated on availability.

### Header (`TRTHeader.tsx`)
- Logo → `Link to="/"`.
- Header phone wrapped in `<a href="tel:+18663444955">`.
- Sticky variant after 600px scroll: `backdrop-blur-md bg-[#0A1024]/85`, BOOK MY CONSULT visible.

## Phase 2 — Sticky mobile CTA (`StickyMobileCTA.tsx`)

- `<768px`, fixed bottom bar, `height:64px`, `padding-bottom: env(safe-area-inset-bottom)`.
- Left: tap-to-call nearest clinic from `useGeoLocation`.
- Right: orange BOOK MY CONSULT — smooth-scroll to hero form **card** and call `.focus()` on its existing first input via `querySelector`. No DOM/prop changes to the form.
- Hides via `IntersectionObserver` when either form card is visible.
- Replaces existing `TRTMobileCTA.tsx`.

## Phase 3 — Credibility band (`CredibilityBand.tsx`)

Replaces `TRTTrustBar`. 4 stats: `10,000+ men treated since 2019`, `3 Virginia centers`, `4.9★ Google · 200+ reviews`, `$0 first visit`. Each is a `<button>` that scrolls to testimonials / locations / hero (not into the form).

## Phase 4 — Symptoms + process (`SymptomsProcess.tsx`)

- Replace red ✕ with orange `–` dash glyph.
- Sentence-case, no trailing period.
- Step-number circles enlarged with orange ring; step 3 gets faint orange fill/glow.
- Existing CTA copy preserved.

## Phase 5 — Philosophy (`Philosophy.tsx` from `TRTManifesto`)

- Right-side portrait: swap when a better asset exists; otherwise overlay `mix-blend-multiply` navy at 20% so headline pops.
- Pull-quote: enlarge orange quote glyph, offset top-left, add small `✓ Verified` badge by patient name.

## Phase 6 — Testimonials (`Testimonials.tsx`)

- Bound to `testimonials.ts`. Mix in one 4★ with honest caveat.
- Each card shows `Name · City, VA · Mon YYYY`.
- Google "G" only on cards with `source: "google"`; others labeled `Verified Patient`.
- Below grid: `Read all 200+ reviews on Google →` outbound link.
- Existing `Join 10,000+ Virginia men…` block + CTA copy preserved.

## Phase 7 — Services (`Services.tsx`)

- Apply consistent slight desaturation / orange duotone to the 4 circular images so the row reads as one set.
- Tile 2 caption: `Labs run on-site.`
- Marquee: slower scroll, pause-on-hover, disabled under `prefers-reduced-motion`.

## Phase 8 — Locations (`LocationsGrid.tsx`)

- Bound to `locations.ts`. **Hours and phones unchanged.**
- Add lazy-loaded Google Static Maps thumbnail (~200×120) per card.
- Add `Directions` link → maps deep link.
- Add `Free parking on-site` if confirmed (flag in `locations.ts`).
- Mobile: CALL is primary visual, BOOK secondary. Desktop: flipped (current behavior).
- `Open now / Opens [next day] at 9:00 AM` badge using `Mon–Sat 09:00–17:00`. Saturday treated as open. Pure function, unit-tested for Sat 2pm = open, Sat 6pm = "Opens Monday".
- Emit `LocalBusiness` JSON-LD per location with Saturday in `dayOfWeek`.

## Phase 9 — FAQ (`FAQ.tsx`)

- Reorder per spec; question text unchanged.
- Each open answer ends with inline orange text link `→ Book a free consult` that scrolls to hero form card (no focus change inside form).
- Emit `FAQPage` JSON-LD via `lib/schema.ts`.
- Verify `aria-expanded` / `aria-controls` / Enter+Space toggling.

## Phase 10 — Final CTA (`FinalCTA.tsx`)

- Add sub-line under heading: `$0 today. Same- or next-day visits.`
- Replace 3 bullets with the 3 new trust points (privacy, free reschedule, "we decline patients when not appropriate" — included only if ops confirms).
- Form card inside this section is untouched.

## Phase 11 — Footer (`Footer.tsx` for landers = `TRTFooter.tsx`)

- Wrap any footer phone in `tel:` (already done — verify).
- Add `Licensed by the Virginia Board of Medicine` line.
- Add Google "G" + `4.9 from 200+ reviews` row linking to GBP.
- LegitScript badge already present and clickable — keep.
- Existing legal links unchanged. If hours render in footer they stay Mon–Sat 9–5.

## Phase 12 — Performance + CWV

- Cut Google Fonts to: 1 display weight (Oswald 700) + Inter 400/600. Self-host woff2 in `/public/fonts/`, `font-display: swap`, preload.
- Section images: `loading="lazy"`, `decoding="async"`, explicit `width`/`height`.
- Defer GA4 + Meta Pixel until `requestIdleCallback` or first interaction.
- Reserve `min-height` on form card wrapper to keep CLS < 0.05.

## Phase 13 — Accessibility

- `aria-label` on every non-form icon-only button.
- Verify orange-on-navy contrast ≥ 4.5:1 (CTA + header phone).
- `:focus-visible` rings on; mouse focus suppressed.
- Form input aria untouched.

## Phase 14 — Analytics

- `data-cro` slug + `trackCro(slug)` on every non-form CTA: `hero_phone_click`, `mobile_sticky_call`, `mobile_sticky_book_scroll`, `credibility_band_*`, `locations_card_call_<slug>`, `locations_card_book_<slug>`, `locations_card_directions_<slug>`, `faq_inline_book_<slug>`, `final_cta_section_view`, `footer_phone_click`, `footer_reviews_click`.
- Scroll-depth events at 25/50/75/100% via single IntersectionObserver-based hook.
- Form submit / field analytics deliberately NOT touched.

## Phase 15 — Compliance

- Confirm medical disclaimer present in footer; add if missing.
- Verify HTTPS-only and that no third-party tag reads form-field values; if Meta Pixel does, flag in PR — do not fix in this pass.

## Acceptance gates (all must pass before ship)

1. `git diff` of `TRTHeroForm.tsx` and the form-card subtree of `ServiceFinalCTA`/`TRTFinalCTA` = empty.
2. All 3 location cards render `Mon–Sat 9:00 AM – 5:00 PM`.
3. `LocalBusiness` JSON-LD ×3 includes Saturday — validated in Rich Results Test.
4. Open-now badge unit tests: Sat 14:00 ET → "Open now"; Sat 18:00 ET → "Opens Monday at 9:00 AM"; Sun 11:00 ET → "Opens Monday".
5. Phone strings byte-identical to current production (NN/VB duplicate kept).
6. JS-disabled view shows all content.
7. `prefers-reduced-motion: reduce` disables marquee + reveals + >200ms transitions.
8. Lighthouse mobile ≥ 90/95/95/95.
9. Sticky CTA: shows <768px after hero, hides when either form card visible, respects safe-area inset.
10. tel: links work in header, every location card, sticky bar, footer.
11. `FAQPage` JSON-LD validates.
12. WCAG AA contrast on all non-form text.

## Apply-to scope

All three landers (`/`, `/wl`, `/ed`) share `TRTHeader`, `TRTFooter`, locations, FAQ, final CTA, and credibility band. Hero/Manifesto/HowItWorks/FAQ variants per vertical (`TRT*`, `WL*`, `ED*`) get the same non-form upgrades applied symmetrically.

## Open questions before implementation

1. Confirmed Google Business Profile URL for the reviews link?
2. OK to ship the "we decline patients when not clinically appropriate" trust bullet? (Only include if true.)
3. Is `Free parking on-site` true for all 3 clinics, or per-location?
4. Do you have a Google Static Maps API key we can use, or should the map thumbnails use an unkeyed embed/static fallback?
5. Real 4★ Google review text we can quote, or should I draft a placeholder for your approval?
