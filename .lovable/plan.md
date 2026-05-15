## Frontend cleanup pass

A reference audit (`rg` for every `/lovable-uploads`, `/images`, `/logos`, `/videos`, `@/assets`, plus name-grep for every `.tsx` in `landing/`, `quiz/`, `services/`) turned up a fairly large pile of orphaned assets and a couple of dead components left over from the booking refactor. Nothing here changes runtime behavior — it's pure deletion + a small lint tightening.

### 1. Delete unused public assets

Confirmed zero references in `src/` or `index.html`:

```text
public/favicon.ico                       (only favicon.png is linked)
public/placeholder.svg
public/lovable-uploads/4dad80ee-…webp
public/lovable-uploads/9510c713-…png
public/logos/Primary_Logo_blue.png
public/logos/Primary_Logo_dark.png
public/logos/Primary_Logo_white.png
public/logos/Primary_Logo_white.svg
public/logos/Symbol_Logo_blue.png
public/logos/Symbol_Logo_dark.png
public/logos/Symbol_Logo_white.png
public/logos/Text_Logo_blue.png
public/logos/Text_Logo_dark.png
public/images/hero-still.jpg
public/images/ghl/footer-logo.png
public/images/ghl/legitscript-badge.png
public/images/landing/trt-hero-bg.png
public/images/locations/richmond-hero.jpg
public/images/locations/richmond-why.jpg
public/images/services/anti-aging-bridge.png
public/images/services/community.jpg
public/images/services/custom-protocols.jpg
public/images/services/hair-loss.jpg
public/images/services/labs-porch.png
public/images/services/labs.jpg
public/images/services/peptides.jpg
public/images/services/sexual-wellness.jpg
public/images/services/testosterone.jpg
public/videos/hero-bg-1.mp4
public/videos/hero-bg-2.mp4
```

Kept (still referenced): `favicon.png`, `og-image.png`, `robots.txt`, `llms.txt`, `logos/Text_Logo_white.png`, `images/badges/{clia,hipaa,legitscript}.png`, `images/services/{sexual-wellness-couple.png,weight-loss.jpg}`, `videos/what-to-expect.mp4`, plus all five files in `src/assets/lp/`.

### 2. Delete dead source components

Name-grep across the project shows zero importers:

- `src/components/landing/trt/TRTMobileCTA.tsx` (superseded by `StickyMobileCTA`)
- `src/components/landing/trt/TRTTrustBar.tsx` (superseded by `CredibilityBand`)

### 3. Delete leftover scratch docs

- `.lovable/plan.md` — temporary planning artifact
- `REFACTOR_NOTES.md` — internal notes from the PHI refactor; superseded by inline JSDoc

(`QA.md` and `a11y/contrast-audit.md` kept — they document live policy.)

### 4. Tighten ESLint

`eslint.config.js` currently sets `@typescript-eslint/no-unused-vars: "off"`, which masks exactly the kind of dead-import drift we just cleaned up. Switch to `warn` with the standard ignore patterns:

```js
"@typescript-eslint/no-unused-vars": ["warn", {
  argsIgnorePattern: "^_",
  varsIgnorePattern: "^_",
  caughtErrorsIgnorePattern: "^_",
}],
```

### 5. Out of scope (flagged, not changed)

- `vite.config.ts` still has `org: "REPLACE_WITH_SENTRY_ORG_SLUG"` — needs the real org slug from you before source maps upload works. Leaving the literal in place so the build keeps no-op'ing instead of failing.
- `App.tsx` `ErrorFallback` uses inline hex colors. That's intentional — it's the boundary that renders if CSS fails to load — so it stays.

### Verification

After deletions: build (auto-runs), `node scripts/check-banned-wording.mjs`, and a quick `rg` for any of the deleted filenames to confirm no stragglers.