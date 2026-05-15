## WCAG AA contrast pass for `/` (root landing page)

Scope: every component rendered by `src/pages/NewLandingPage.tsx` — `TRTHeader`, `TRTHero`, `TRTHeroForm`, `CredibilityBand`, `TRTHowItWorks`, `TRTManifesto`, `TRTResults`, `TRTPillars`, `TRTMarquee`, `TRTLocations`, `TRTFAQ`, `TRTFinalCTA`, `TRTFooter`, `StickyMobileCTA`, `SectionReveal`. Tokens are defined globally in `index.css` so any other surface that opts in benefits, but no other route's components are edited.

### 1. Failing pairs found

Computed per WCAG 2.1 §1.4.3 (text) and §1.4.11 (non-text). Translucent pairs were alpha-blended against the painted background before measurement.

| # | Where | FG | BG | Ratio | Required | Fail |
|---|---|---|---|---:|---:|---|
| 1 | Every primary CTA label (TRTHeader desktop CTA, TRTHero CTA, TRTHowItWorks CTA, TRTResults CTA, TRTManifesto CTA, TRTLocations "Book", TRTFinalCTA submit, StickyMobileCTA right tile, TRTHeroForm submit) | `#FFFFFF` 15–16px bold | `#E8670A` | 3.29 | 4.5 | ✗ |
| 2 | TRTMarquee scrolling text | `#FFFFFF` 14px | `#E8670A` | 3.29 | 4.5 | ✗ |
| 3 | TRTMarquee `◆` separators | `rgba(255,255,255,0.40)` → `#F4B580` | `#E8670A` | 1.66 | 3.0 | ✗ |
| 4 | TRTHowItWorks step pill text | `#E8670A` | `rgba(232,103,10,0.12)` on cream → `#F1DBC4` | 3.13 | 4.5 | ✗ |
| 5 | TRTHowItWorks final-step circle digit | `#FFFFFF` Oswald 16px bold | `#E8670A` | 3.29 | 4.5 | ✗ |
| 6 | TRTLocations "Open today" / hours chevron text | `#E8670A` 12px | `#FFFFFF` | 3.29 | 4.5 | ✗ |
| 7 | TRTFAQ chevron-button orange caret label | `#E8670A` small | `#FFFFFF` | 3.29 | 4.5 | ✗ (when text-sized; icon-only is 3:1 OK) |
| 8 | TRTFinalCTA placeholder text | `#999999` | `#FFFFFF` | 2.85 | 4.5 | ✗ |
| 9 | TRTFinalCTA input borders | `#C8C6C1` | `#FFFFFF` | 1.51 | 3.0 | ✗ |
| 10 | TRTHeroForm input borders | `rgba(245,240,235,0.20)` → `#3F4456` | `#0B1029` | 1.50 | 3.0 | ✗ |
| 11 | TRTPillars card borders | `rgba(255,255,255,0.10)` → `#191B45` | `#000033` | 1.25 | 3.0 | ✗ |
| 12 | StickyMobileCTA divider + top border | `rgba(245,240,235,0.12)` → `#22264A` | `#0B1029` | 1.41 | 3.0 | ✗ |
| 13 | TRTFooter top border + section dividers | `rgba(255,255,255,0.08)` → `#15184A` | `#000033` | 1.18 | 3.0 | ✗ |
| 14 | TRTResults / TRTLocations / TRTFAQ card borders | `#E5E5EA` | `#FFFFFF` | 1.18 | 3.0 | ✗ |
| 15 | TRTHeader disabled-CTA "soon" pill | `#FFFFFF` on `rgba(232,103,10,0.5)` → `#F4B385` | `#FFFFFF` | 1.41 | 4.5 | ✗ |
| 16 | TRTFinalCTA error helper text | `#CC4444` | `#FFFFFF` | 4.16 | 4.5 | ✗ (just under) |
| 17 | TRTHeroForm error helper text | `#FF8A8A` | `#0B1029` | 6.62 | 4.5 | ✓ (kept) |
| 18 | Focus ring (`:focus-visible` outline) | `#000033` | most cream/white surfaces | 17+ | 3.0 | ✓ (kept) but invisible on navy backgrounds — needs second-color fallback |

(Pairs not listed all already pass — body copy, headings, hero check icons, success badge, etc.)

### 2. Corrected tokens + new ratios

Add to `:root` in `src/index.css` and mirror in `tailwind.config.ts` `extend.colors`:

```
/* Brand surfaces (unchanged hues) */
--brand-navy:        240 100% 10%;  /* #000033 */
--brand-navy-deep:   230  58% 11%;  /* #0B1029 */
--brand-cream:        30  33% 94%;  /* #F5F0EB */

/* Accent — display only (≥24px or ≥18.66px bold, or icon vs dark) */
--brand-accent:       21  91% 47%;  /* #E8670A */

/* CTA fill — same hue, darkened so white@bold passes 4.5:1 */
--brand-cta:          19  87% 40%;  /* #C2410C, white = 5.18:1   */
--brand-cta-hover:    19  87% 34%;  /* #A6360A, white = 6.85:1   */

/* Text on light surfaces */
--text-on-light:       240 100% 10%;  /* #000033, 17:1 on white */
--text-on-light-muted: 220   8% 28%;  /* #424857, 9.5:1 on white */
--placeholder-light:   220   8% 38%;  /* #5A6072, 6.0:1 on white */

/* Text on dark surfaces */
--text-on-dark:        0 0% 100%;
--text-on-dark-muted:  30 25% 88%;    /* #E7DDD2, 13:1 on navy   */
--text-on-dark-subtle: 30 12% 75%;    /* #C5BFB7, 9.4:1 on navy  */

/* Borders / dividers (functional UI ≥ 3:1) */
--border-on-light:    0   0% 58%;     /* #949494, 3.07:1 on white */
--border-on-dark:     230 18% 50%;    /* #6B7299, 3.10:1 on navy  */

/* Status */
--success-on-dark:   145 60% 60%;     /* #5DD68A, 6.4:1 on navy */
--error-on-light:      0 72% 38%;     /* #A7211C, 7.4:1 on white */
--error-on-dark:       0 95% 78%;     /* #FF8A8A, 6.6:1 on navy */
```

Resulting fixed ratios:

| # | New value | New ratio | Pass |
|---|---|---:|---|
| 1, 5 | CTA fill `#C2410C`, label `#FFFFFF` | 5.18 | ✓ |
| 2 | Marquee bg → `#C2410C`, label `#FFFFFF` | 5.18 | ✓ |
| 3 | Marquee `◆` → `#FFFFFF` @ 0.65 alpha → `#DBA787` on `#C2410C` | 3.06 | ✓ (UI) |
| 4 | Step pill bg → `#FFFFFF`, label `#C2410C` on white | 5.18 | ✓ |
| 6, 7 | "Open today" + FAQ caret label → `#C2410C` on white | 5.18 | ✓ |
| 8 | Placeholder → `var(--placeholder-light)` `#5A6072` | 6.04 | ✓ |
| 9 | Input border → `var(--border-on-light)` `#949494` | 3.07 | ✓ |
| 10 | Hero form input border → `var(--border-on-dark)` `#6B7299` on `#0B1029` | 3.10 | ✓ |
| 11 | Pillar card border → `#6B7299` (dark) | 3.10 | ✓ |
| 12 | Sticky CTA divider → `#6B7299` | 3.10 | ✓ |
| 13 | Footer dividers → `#6B7299` | 3.10 | ✓ |
| 14 | White-card borders → `#949494` | 3.07 | ✓ |
| 15 | Header "soon" pill → bg `#7A360D` (40% L of brand), label `#FFFFFF` | 7.06 | ✓ |
| 16 | Error helper → `var(--error-on-light)` `#A7211C` | 7.4 | ✓ |
| 18 | Focus ring → 2px solid `var(--brand-accent)` + 2px white offset (works on both navy and cream) | ≥3 on every surface | ✓ |

### 3. How the fixes are applied

`index.css` and `tailwind.config.ts`:
- Add the token block above. Keep legacy `--bg-*` / `--text-*` / `--accent-orange` vars as aliases pointing at the new tokens so unrelated routes don't break.
- Update `body` color to `hsl(var(--text-on-light))` (currently `#605E5D` mid-grey, 4.96:1 — passes but barely; bump to the new token).
- Update `:focus-visible` to the new dual-tone ring.

Per-component edits — replace inline hex with `var(--token)` so the audit stays enforceable. Specifically:

- `TRTHeader.tsx` — desktop CTA + mobile sticky header CTA → `var(--brand-cta)` / `var(--brand-cta-hover)`. "Soon" disabled pill → `#7A360D`.
- `TRTHero.tsx` — main CTA → `var(--brand-cta)`. Inline `COLORS.orange` kept for the headline word and check-icon (large-text + icon, both pass 3:1 on navy).
- `TRTHeroForm.tsx` — submit button → `var(--brand-cta)`. Input border (default + focused-but-not-error) → `var(--border-on-dark)`. Error helper text stays at `#FF8A8A` (passes).
- `CredibilityBand.tsx` — divider `rgba(255,255,255,0.10)` → `var(--border-on-dark)`.
- `TRTHowItWorks.tsx` — step-pill bg → `#FFFFFF`, label `var(--brand-cta)`. Final-step circle bg → `var(--brand-cta)`. CTA → `var(--brand-cta)`.
- `TRTManifesto.tsx` — CTA → `var(--brand-cta)`. Pull-quote mark stays accent (decorative, large).
- `TRTResults.tsx` — card border → `var(--border-on-light)`. CTA → `var(--brand-cta)`. City subtext `#7a7a8e` → `var(--text-on-light-muted)`.
- `TRTPillars.tsx` — card border → `var(--border-on-dark)`. Avatar ring → same.
- `TRTMarquee.tsx` — bg → `var(--brand-cta)`. Diamond separators → `rgba(255,255,255,0.65)`.
- `TRTLocations.tsx` — card border + divider → `var(--border-on-light)`. "Open today" / hours-chevron text → `var(--brand-cta)`. "Book" button → `var(--brand-cta)`. Outline button border → `var(--text-on-light)`. Subtext `#7a7a8e` → `var(--text-on-light-muted)`.
- `TRTFAQ.tsx` — card border → `var(--border-on-light)`. Caret-button label → `var(--brand-cta)` (kept icon at accent).
- `TRTFinalCTA.tsx` — CTA → `var(--brand-cta)`. Card border `#C8C6C1` → `var(--border-on-light)`. Placeholder + select-empty → `var(--placeholder-light)`. Error red `#CC4444` → `var(--error-on-light)`. Body subcopy `#999999` → `var(--text-on-light-muted)`. Star ★ kept (`#D4A017` on `#000033` = 8:1).
- `TRTFooter.tsx` — top border + bottom strip border → `var(--border-on-dark)`. Microcopy `rgba(255,255,255,0.55)` → `var(--text-on-dark-subtle)`.
- `StickyMobileCTA.tsx` — top border + middle divider → `var(--border-on-dark)`. Right tile → `var(--brand-cta)`.

Body styles in `index.css` already exempt — bumped one token. No JSX behaviour changes; same hover/focus interactions, same fonts, same layouts.

### 4. Verification

After edits:
- Build (auto-runs).
- Re-run a small node script that re-computes the 18 pairs above against the new values and prints a pass/fail table (similar to the existing `a11y/contrast-audit.md`); save the new report as `a11y/landing-contrast-audit.md`.
- Spot-check the live preview at `/` desktop + mobile for any regressed-looking surface (orange shifts from `#E8670A` to `#C2410C` on CTA fills only — same hue, slightly darker; kept `#E8670A` everywhere it was already passing).

### Out of scope (flagged, not changed)

- `/wl`, `/ed`, `/quiz`, `/book/*`, `/admin/*`, legal pages — request was scoped to the root LP. The new tokens are defined globally so those routes can opt in later by swapping their inline hex for the same `var(--…)` references.
- The `.dark` token block in `index.css` already passes its primary pairs (verified during the booking audit dated 2026‑05‑13). Not retouched.