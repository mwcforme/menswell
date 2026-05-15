# Restore Brand Orange, Re-Achieve WCAG AA Without Changing Orange

## Constraint
Brand orange `#E8670A` (and `--accent-orange` / `--brand-accent`) is a hard brand rule. The previous pass replaced CTA fills with `#C2410C` / `#A6360A` — that violates brand. Revert orange, then meet AA through other levers.

## Strategy: legal AA paths that keep #E8670A
WCAG AA passes for "large text" at **3:1**. Large = ≥18px regular OR ≥14px bold. White on `#E8670A` = **3.29:1**, which already passes as large text. So the fix is not the color — it's the text spec on orange surfaces. For non-text UI (borders, icons), the bar is 3:1, so orange-on-white at 3.29:1 also passes; only small orange labels on white need a different treatment.

## Fix matrix (revised, brand-safe)

| # | Surface | Old fix (revert) | New brand-safe fix |
|---|---|---|---|
| 1 | Primary CTAs (Header, Hero, HeroForm, Manifesto, Results, Locations, FinalCTA, StickyMobile, HowItWorks) | bg `#C2410C` | bg `#E8670A`; ensure label is **white, ≥16px, font-weight ≥700, letter-spacing ≥0.04em** → qualifies as large text → 3.29:1 passes AA. Audit each button for size/weight, bump where needed. |
| 2 | TRTMarquee scrolling text on orange | darker bg | Keep `#E8670A` bg; set text to **15px / 700** (already large) → passes. Verify weight in component. |
| 3 | TRTMarquee `◆` separators on orange | n/a | Non-text decorative → exempt from contrast. Add `aria-hidden`. (Keep `rgba(255,255,255,0.40)`.) |
| 4 | HowItWorks step pill: orange text on tinted-orange chip | n/a | Replace tinted-orange chip bg with **navy `#000033` chip + white text** OR keep orange text but on **white** chip (4.83:1, passes for any size). Choose white chip for minimal visual change. |
| 5 | HowItWorks final-step circle digit (white on orange) | darker bg | Digit is 16px bold → already large text → 3.29:1 passes. Confirm `font-weight:700`. |
| 6 | TRTLocations "Open today" / hours small orange-on-white | darker orange | Switch these **small labels** to navy `#000033` (17:1) and reserve orange for icons only (icons are non-text, 3:1 → passes at 3.29:1). |
| 7 | TRTFAQ chevron caret label small orange-on-white | darker orange | Same as #6 — use navy for the text glyph; keep orange only on the chevron icon stroke. |
| 8 | TRTFinalCTA placeholder `#999` on white | `#5A6072` | Keep `--placeholder-light: #5A6072` (6.04:1) — does not touch orange. |
| 9 | TRTFinalCTA input borders `#C8C6C1` | `#949494` | Keep `--border-on-light: #949494` (3.07:1). |
| 10 | TRTHeroForm input borders on navy | `#6B7299` | Keep `--border-on-dark: #6B7299` (3.10:1). |
| 11 | TRTPillars card borders | brighter | Keep `--border-on-dark`. |
| 12 | StickyMobileCTA divider | brighter | Keep `--border-on-dark`. |
| 13 | TRTFooter dividers | brighter | Keep `--border-on-dark`. |
| 14 | White-card borders | `#949494` | Keep `--border-on-light`. |
| 15 | Header "soon" pill (white on 50%-orange = `#F4B385`) | n/a | Set pill bg to **solid `#E8670A`** (drop the 0.5 opacity), label 12px bold uppercase ≥14px? If <14px bold, switch label to navy `#000033` text on orange (8.0:1, passes any size). |
| 16 | TRTFinalCTA error helper `#CC4444` (4.16:1) | n/a | Use `--error-on-light: #A7211C` (7.4:1). Non-orange. |
| 17 | TRTHeroForm error helper on navy | already passes | Keep. |
| 18 | Focus ring | already passes | Keep dual-tone. |

## Token changes in `src/index.css`
- **Delete** `--brand-cta` and `--brand-cta-hover` (or alias both to `#E8670A` and a brand-approved hover such as `#D45E08` darkening only ~5%, used **only** on hover state which is allowed). Confirm with user if any hover darkening is permitted; default plan keeps hover identical and uses opacity/transform for affordance.
- **Keep** `--placeholder-light`, `--border-on-light`, `--border-on-dark`, `--error-on-light`, `--success-on-dark`, dual-tone focus ring.
- Re-affirm `--accent-orange: #E8670A` and `--brand-accent: #E8670A` as the only orange.

## Component edits
1. Global find/replace `var(--brand-cta)` → `var(--accent-orange)` and `var(--brand-cta-hover)` → `var(--accent-orange)` (or hover variant if approved) across the 15 TRT components.
2. Per-component label audits:
   - **TRTHeader / TRTHero / TRTHeroForm / TRTManifesto / TRTResults / TRTLocations / TRTFinalCTA / StickyMobileCTA / TRTHowItWorks**: ensure CTA `<span>` label is `font-weight:700`, `font-size:≥16px`, `letter-spacing:≥0.04em`. Add where missing.
   - **TRTMarquee**: confirm text is 15px/700; add `aria-hidden` to `◆`.
   - **TRTHowItWorks**: change step pill bg from `rgba(232,103,10,0.12)` to `#FFFFFF` with `border:1px solid #E8670A`; keep orange text.
   - **TRTLocations / TRTFAQ**: small orange labels → navy `#000033`; orange remains on the icon only.
   - **TRTHeader "soon" pill**: bg solid `#E8670A`, text navy `#000033` 11px/700 uppercase.
   - **TRTFinalCTA**: error text uses `var(--error-on-light)`.

## Out of scope
`/wl`, `/ed`, `/quiz`, `/book/*`, `/admin/*`, legal pages. Tokens stay globally available so other routes can opt in later without code changes here.

## Deliverable
1. Reverted brand orange across all CTAs and accents.
2. AA achieved through text-size/weight rules and swapping small orange-on-white labels to navy where they can't qualify as large text.
3. Updated `a11y/landing-contrast-audit.md` showing every pair, the brand-safe remediation, and the new ratio (≥3:1 for large/UI, ≥4.5:1 for normal text).
