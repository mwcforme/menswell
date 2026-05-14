## Goal
Show a small floating "ENV: STAGE" badge on funnels and landing pages whenever the app is not running against prod GHL, and let it open the existing env switcher.

## Scope
Visible on: `/`, `/wl`, `/ed`, `/quiz/*`, `/book/*`, and any `/lp/*`.
Hidden on: `/admin/*` (admin already has `EnvSwitcher` in the layout), legal pages, 404.

## Behavior
- Render only when `APP_ENV !== "prod"` OR `localStorage.mwc_env_override` is set (so an admin who forced `?env=stage` on the prod domain also sees it).
- Fixed-position pill, bottom-left on desktop, above the `MobileFooterBar` (56px) on mobile so it never overlaps existing CTAs.
- Click opens a small popover containing the same three actions as the admin `EnvSwitcher` (Stage / Prod / Auto), reusing its logic. Reload on selection (matches existing behavior).
- Color: amber/emerald pill for stage, red for prod-on-non-prod-host (manual override). Uses inline styles consistent with funnel chrome (no new tokens).
- Non-blocking: `pointer-events-auto` on the pill itself, `aria-label="Environment switcher"`.

## Files
- New `src/components/shared/EnvBadge.tsx` — floating pill + popover. Internally calls the same `setEnv` logic (extract to a tiny shared helper).
- New `src/lib/envOverride.ts` — exports `setEnvOverride(next)` and `hasEnvOverride()` so both `EnvBadge` and `admin/EnvSwitcher` share one source of truth.
- Edit `src/components/admin/EnvSwitcher.tsx` — use the shared helper (no behavior change).
- Edit `src/App.tsx` — mount `<EnvBadge />` next to `<MobileFooterBar />`. The badge component itself decides visibility based on route prefix + env, so App.tsx stays clean.

## Route allowlist (inside EnvBadge)
```
const ALLOWED_PREFIXES = ["/", "/wl", "/ed", "/quiz", "/book", "/lp"];
// match exact "/" or startsWith "<prefix>/" / "<prefix>"
// explicitly skip "/admin"
```

## Acceptance
- On `menswell.lovable.app/` a small "ENV: STAGE" pill is visible bottom-left.
- Clicking it opens a popover with Stage / Prod / Auto; choosing one reloads and updates the pill.
- On `book.menswellnesscenters.com/` (prod, no override) the badge does not render.
- On `/admin/*` the badge does not render (existing admin switcher remains).
- No layout shift; pill sits above mobile footer bar.
