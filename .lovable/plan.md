# Plan: Paid-LP SEO hardening + Sentry integration

Note on Lovable workflow: edits apply to the preview as I make them — there is no separate "diff-only" mode. Nothing is published to your live domain until you click Publish. I'll list every change below; approve and I'll execute, then you can review in preview before publishing.

## Part 1 — SEO / indexing

**`index.html`**
- Add high in `<head>` (after charset/viewport):
  - `<meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />`
  - `<meta name="googlebot" content="noindex, nofollow" />`
  - `<meta name="bingbot" content="noindex, nofollow" />`
- Leave existing GTM/GA, OG tags, fonts in place.

**`public/robots.txt`** — replace contents with:
```
User-agent: *
Disallow: /

User-agent: AdsBot-Google
Allow: /

User-agent: AdsBot-Google-Mobile
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /
```

**`public/sitemap.xml`** — delete.

**`src/components/SEO.tsx`** — new component using `react-helmet-async` (already installed). Props: `title`, `description`, `ogImage?`. Emits self-referencing canonical to `https://book.menswellnesscenters.com${pathname}`, og:url/type/site_name/title/description/image, twitter:card. Adds noindex meta as belt-and-suspenders.

**Per-page wiring**
- Replace `GlobalSchema` usage with `<SEO>` per route page: `NewLandingPage`, `TRTQuiz`, `TRTQuizApproved`, `BookSchedule`, `BookSymptom`, `BookDuration`, `BookConfirmed`, `BookLetsTalk`, `LpDirectory`, all 4 legal pages, `NotFound`.
- Delete `src/components/GlobalSchema.tsx` and remove from `App.tsx`.

**Strip JSON-LD / schema.org**
- Remove `organizationSchema` (was in `GlobalSchema`).
- Remove FAQPage JSON-LD from `src/components/landing/trt/TRTFAQ.tsx`.
- Grep for any other `application/ld+json` or `@context` and remove.

**OG image**
- Reference `/og-image.png` (already used in `SEOHead`). If the file doesn't exist in `public/`, I'll generate a 1200×630 brand image. Confirm in step below.

## Part 2 — Sentry

**Install**: `@sentry/react`, `@sentry/vite-plugin`.

**`src/lib/sentry.ts`** — exact init you specified (router v6 browser tracing, replay with `maskAllInputs: true`, traces 1.0, replay session 0.1 / on-error 1.0, `sendDefaultPii: true`, propagation targets for the booking subdomain).

**`src/main.tsx`** — `import "./lib/sentry";` as the first line, before React imports.

**`src/App.tsx`** — wrap root in `Sentry.ErrorBoundary` with the fallback UI you specified (refresh + call message). I'll use `(804) 215-0517` unless you give me a different number — confirm below.

**Sentry test trigger**
- New `src/components/SentryTestTrigger.tsx`: when `window.location.search` includes `sentry_test=1`, renders a fixed bottom-right low-z-index button that throws `new Error("Sentry test error from MWC booking LP - " + new Date().toISOString())`.
- Mount inside `App.tsx` so it works on every route (you said "root route" but query-param gating already restricts it; mounting once is cleaner).

**`vite.config.ts`** — add `sentryVitePlugin` gated on `process.env.SENTRY_AUTH_TOKEN`, `build.sourcemap: true`. I need your Sentry **org slug** to fill in (project will be `mwc-booking-lp`).

**Env vars** (you'll add via Lovable settings after approval):
- `VITE_SENTRY_DSN` — Sentry → Project → Settings → Client Keys (DSN). Public, ships to client.
- `VITE_SENTRY_RELEASE` — bump per deploy, e.g. `lp-2026-05-13-001`.
- `SENTRY_AUTH_TOKEN` — Sentry → Settings → Account → Auth Tokens, scopes `project:releases` + `org:read`. Build-time only.

I'll also need to relax `src/config/env.ts` — currently it rejects unknown env vars via `safeParse`; Sentry vars are optional so no schema change needed (zod ignores extras), but I'll verify.

## Two confirmations before I start
1. **Sentry org slug** for `vite.config.ts`?
2. **Phone number** for the ErrorBoundary fallback (your prompt has `(804) XXX-XXXX`)?

If you want me to proceed with placeholders (`REPLACE_WITH_SENTRY_ORG_SLUG` and `(804) 215-0517`) and you'll edit them after, say "go with placeholders."

## Files touched
- Modified: `index.html`, `public/robots.txt`, `src/App.tsx`, `src/main.tsx`, `vite.config.ts`, `src/components/landing/trt/TRTFAQ.tsx`, plus every route page (~13 files) for `<SEO>` wiring, `package.json`/lockfile.
- Created: `src/components/SEO.tsx`, `src/lib/sentry.ts`, `src/components/SentryTestTrigger.tsx`.
- Deleted: `public/sitemap.xml`, `src/components/GlobalSchema.tsx`. (`src/components/SEOHead.tsx` superseded by new `SEO.tsx` — I'll delete it too unless you want both.)

## Test URL post-publish
`https://book.menswellnesscenters.com/?sentry_test=1` → click the bottom-right button → check Sentry Issues.
