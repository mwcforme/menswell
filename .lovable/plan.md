
## Goal

Two deliverables:
1. A private internal directory at `/lp` listing every landing page, booking step, and utility route. For QA and stakeholder review only. Noindex.
2. A concrete paid-traffic readiness checklist (with code-level fixes) so the site can absorb $8k/day in ad spend without leaking conversions, breaking on mobile, or violating compliance.

---

## Part 1 — Internal LP Directory (`/lp`)

### Route

- New route `/lp` in `src/App.tsx`, component `src/pages/internal/LpDirectory.tsx`.
- Page sets `<meta name="robots" content="noindex,nofollow">` via `SEOHead` and is added to `PAGE_META` in `GlobalSchema.tsx`.
- Add `Disallow: /lp` to `public/robots.txt` and remove `/lp` from `public/sitemap.xml` (it should never be there).

### Layout

Single dark page, brand-consistent (Oswald headings, Inter body, OLED navy bg, orange accents). Sections:

1. **Header strip** — title "Landing Page Directory", subtitle "Internal QA index. Do not share. Noindex.", build timestamp, current git-equivalent commit (read from `import.meta.env`).
2. **Live landing pages** — card grid. One card per LP. Each card shows:
   - Slug (`/new`)
   - Service tag (`trt`)
   - Status pill: Live / Draft / Scaffold
   - Last-modified date (hardcoded per entry initially, easy to update)
   - Primary CTA target (`/book/symptom`)
   - Open buttons: "View desktop", "View mobile" (opens `?viewport=mobile` or just opens in a new tab; we will use plain new-tab links)
   - Quick-copy UTM-tagged URL (clicking copies to clipboard with toast)
3. **Booking funnel routes** — table of `/book/*` steps with one-line description of each step.
4. **Utility / compliance pages** — Privacy, Terms, TCPA disclosure (linked even if not built yet so we see gaps).
5. **Tracking + integration health** — small panel that calls a couple of read-only checks at runtime:
   - "GA4 dataLayer present" (checks `window.dataLayer`)
   - "Meta pixel loaded" (checks `window.fbq`)
   - "Supabase client reachable" (lightweight `select 1` style ping or just env var presence)
   - "GHL proxy reachable" (HEAD/OPTIONS to `ghl-proxy`)
   Each renders a green/red dot. Read-only, no writes.
6. **Recent leads** (optional, behind a simple shared-secret query param `?key=…` matched against an env var). Skipped in v1 unless you want it; flagged in plan.

### Data source

Single typed array `src/data/landingPages.ts`:

```ts
export interface LandingPageEntry {
  slug: string;          // "/new"
  name: string;          // "TRT Hero (v1)"
  service: "trt" | "ed" | "weight-loss" | "general";
  status: "live" | "draft" | "scaffold";
  primaryCta: string;    // "/book/symptom"
  notes?: string;
  updatedAt: string;     // ISO
}
```

Currently one entry (`/new` → TRT). Adding ED/Weight-Loss LPs later is one append per LP. The directory renders from this array.

---

## Part 2 — $8k/day Paid-Traffic Readiness

Findings from a quick audit of the current code, ordered by ROI. Each item is small, scoped, and implementable in a follow-up build pass.

### A. Conversion tracking (highest priority — currently almost nothing fires)

Today only two `dataLayer.push` calls exist (both in the booking flow). For paid traffic you need:

1. **GTM container in `index.html`** (`<head>` + `<body>` snippet). One container is enough; manage GA4 + Meta CAPI through it.
2. **Meta Pixel + Conversions API** — Pixel script in `index.html`, server-side CAPI via a new edge function `meta-capi` that accepts `{ event, eventId, userData, customData }` and forwards to Graph with the access token (stored as secret `META_CAPI_TOKEN`, `META_PIXEL_ID`). Always send `event_id` so client + server dedupe.
3. **GA4** via GTM, Measurement Protocol mirror in the same edge function for resilience.
4. **Standard event coverage**, fired from existing controllers (no UI changes needed):
   - `Lead` — fires inside `useLeadSubmitController.onSuccess`.
   - `Schedule` — fires inside `useConfirmAppointment` on successful booking.
   - `InitiateCheckout` — on `/book/symptom` mount.
   - `ViewContent` — on every LP mount with `content_name = service`.
   - `phone_click`, `cta_click` — already partially scaffolded; finish via a single `analytics.track()` wrapper and route to GTM `dataLayer.push`.
5. **Promote `IAnalytics` from Noop to real impl** — `GtmAnalytics` that pushes to `window.dataLayer` and fires `meta-capi` for revenue-relevant events. Wire in `ServicesProvider`.
6. **Click ID capture** — on first page load grab `gclid`, `fbclid`, `gbraid`, `wbraid`, `msclkid`, `ttclid`, all `utm_*`, `referrer`, `landing_path` from `window.location` and persist to `sessionStorage` + first-party cookie (90 days). Send with every lead submission so the CRM (GHL) can attribute. Add as hidden fields in `GhlProxyLeadSubmitter`.
7. **GHL contact tags** — auto-tag leads with `source:{utm_source}`, `campaign:{utm_campaign}`, `lp:{slug}` so paid attribution works inside GHL.

### B. Performance (LCP/CLS) — Google Ads Quality Score and Meta CPM both sensitive

1. **Replace Google Fonts `<link>` with `font-display: swap` + preload of Oswald and Inter only** (Bebas Neue and Montserrat are loaded but only used on `/bookv2` which doesn't exist — drop them from `index.html`).
2. **Self-host fonts** (vite-plugin-fonts or static `/fonts`) to remove the third-party DNS round-trip on first paint.
3. **Hero image**: TRTHero currently has SVG noise + radial gradients only (no raster), which is good. If a hero photo is added later, mark it `fetchpriority="high"` and use AVIF/WebP via `<picture>`.
4. **Remove unused script src in `index.html`** — confirm no leftover Lovable script tags pulling on prod build.
5. **Lazy-mount below-the-fold sections** — `SectionReveal` already does this for animation; convert to `React.lazy` + `Suspense` for `TRTFAQ`, `TRTLocations`, `TRTFooter` to shrink first JS chunk.
6. **Add `<link rel="preconnect">` for the GHL/Supabase domains** used by the booking calendar.
7. **Set explicit `width`/`height` on every `<img>` / `<svg>`** to keep CLS at 0.

### C. Mobile-first hardening (paid traffic is 70%+ mobile)

1. Audit all CTAs for ≥48px tap targets (button system memory already enforces this; verify on `TRTMobileCTA`).
2. Confirm sticky mobile CTA does not overlap form submit at the bottom of `TRTHero` on small screens.
3. `inputMode` and `autoComplete` are correct in `TRTHeroForm`. Add `enterKeyHint="next"` / `"send"` for keyboard polish.
4. Keep the keyboard from hiding the submit button: scroll the focused field into view on iOS Safari (`scroll-margin-bottom`).

### D. Compliance / legal (must-have before spending)

1. **TCPA**: hero form copy is correct but the consent checkbox does NOT gate submit. Per memory rule, TCPA must be unchecked by default AND required. Add `tcpa` to `heroLeadSchema` as `z.literal(true, { errorMap: () => ({ message: "Required to receive a call." })})`. Today validation passes without it (only the ED/WL forms enforce it).
2. **Privacy Policy** and **Terms** routes (`/privacy`, `/terms`) are required by Meta and Google ad policy. Currently absent. Add minimal markdown-rendered pages and link in footer.
3. **HIPAA**: form posts go through `ghl-proxy` (good). Do not log PHI in `console.*` — quick grep + scrub.
4. **Medical disclaimers**: "Individual results vary" present in hero. Add to results sections too.
5. **Ad-policy claims sweep**: no "guaranteed", no "cure", no "#1", no before/after photos without disclaimers. Run a regex sweep before launch.

### E. A/B test infrastructure

1. Add a tiny `useExperiment(slug, variants)` hook backed by a deterministic hash of `gclid || fbclid || crypto.randomUUID()` stored in cookie. Reports the chosen variant via `analytics.track('experiment_assigned', { slug, variant })`.
2. Each LP reads its variant via this hook and swaps headline/CTA copy from a config map. Lets you ship hero copy tests without a vendor.
3. Server-side, propagate the variant to GHL as a contact tag for downstream lift analysis.

### F. Reliability + capacity

1. **Error tracking** — add Sentry (browser SDK in `main.tsx`, edge SDK in `ghl-proxy`). At $8k/day even a 0.5% error rate on submits costs hundreds of leads.
2. **Edge function rate limiting & retry** — `ghl-proxy` should retry on 429/5xx with exponential backoff, and queue to a `pending_leads` table on terminal failure so no lead is lost. Today a transient GHL outage drops the lead.
3. **Cloud instance size** — bump from default to at least the next tier before launch; check `cloud_status` is `ACTIVE_HEALTHY`.
4. **Health endpoint** — add `/api/health` (edge function) returning `{ ghl: ok, supabase: ok }` for uptime monitor (UptimeRobot, Better Uptime).
5. **Logging** — structured `console.log({ event, leadId, ... })` in edge functions so Supabase analytics queries are useful.

### G. SEO / indexing hygiene for paid landing pages

Even though traffic is paid, search bots crawl LPs and incorrect setup can hurt brand search:
1. Each LP has unique `<title>`, meta description, canonical (already partly done in `GlobalSchema`).
2. `noindex` for the booking funnel and `/lp` (booking is already noindex; add `/lp`).
3. Add `LocalBusiness` JSON-LD on the TRT LP since it serves Virginia centers — helps local pack visibility.
4. `og:image` in `index.html` currently points to a stale preview screenshot — replace with a 1200x630 brand image in `public/`.
5. `description` in `index.html` mentions "MWC GHL Live builds branded Elementor WordPress sites" — that is leftover internal copy, must be replaced before launch.

### H. Form abandonment recovery

1. On any lead form, fire a `partial_lead` event to GHL after the user fills email OR phone and blurs out (debounced). Captures ~15-25% extra leads who bounce mid-form.
2. Store partial in `sessionStorage` so refresh restores fields.

### I. Click-fraud / bot defense

1. Add Cloudflare Turnstile (free) on lead forms — invisible mode so it does not hurt CR. Validate token in `ghl-proxy` before forwarding.
2. Block obvious bot UAs in the proxy.
3. Honeypot field (`website` input hidden via CSS) — drop submissions where it is non-empty.

### J. Operational dashboard (post-launch)

1. Lightweight admin route `/admin/leads` (auth required) reading from a `leads` table that `ghl-proxy` writes to in parallel with GHL. Lets you see today's count, source breakdown, last 50 leads without logging into GHL. Optional v2.

---

## Implementation order (recommended)

1. **Index page `/lp`** — small, isolated, ships first.
2. **Compliance gaps**: TCPA gating, /privacy + /terms, og:image, fix `index.html` description. Blocks ad approval.
3. **Tracking foundation**: GTM + Pixel + click-ID capture + `GtmAnalytics` impl. Blocks attribution.
4. **Meta CAPI edge function + Lead/Schedule events**.
5. **Sentry + ghl-proxy retry/queue**.
6. **Performance: font self-host, lazy sections**.
7. **Turnstile + honeypot**.
8. **A/B harness**.
9. **Partial-lead capture**.
10. **Admin leads dashboard** (optional).

---

## Technical notes

- Tracking IDs (`META_PIXEL_ID`, `META_CAPI_TOKEN`, `GTM_ID`) go in Lovable Cloud secrets; only `GTM_ID` and `META_PIXEL_ID` need to be exposed to the browser via a small `/api/public-config` edge function or build-time env (`VITE_GTM_ID`).
- The new `IAnalytics` impl stays behind the existing contract — no UI changes required, only `ServicesProvider` swap.
- `useLeadSubmitController` already has an `onSuccess` hook — that is where `Lead` event + click-ID payload is added, in one place.
- `useConfirmAppointment` already has a redirect controller — that is where `Schedule` event is added.

## Out of scope for this plan

- Building ED and Weight Loss landing pages (separate task).
- CRM workflow design inside GHL.
- Paid creative production.
