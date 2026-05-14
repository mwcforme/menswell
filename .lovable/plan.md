## Goal

Hide `MobileFooterBar` on every landing-page / funnel route. Keep it on browse-and-research pages only.

## Current state

`src/components/shared/MobileFooterBar.tsx` already excludes:
- Exact: `/`, `/wl`, `/ed`
- Prefix: `/book`, `/bookv2`, `/intake`, `/lp/`

Routes registered in `App.tsx` that are NOT yet excluded but qualify as funnel/LP:
- `/quiz` and `/quiz/approved` — TRT quiz funnel, single-purpose, has its own CTA flow.

Routes that should keep the bar (browsing, no dedicated single CTA):
- `/privacy-policy`, `/terms-of-service`, `/tcpa`, `/prescribing-policy` — legal pages, low-intent reading where a Call/Book shortcut is helpful.
- `/lp` (directory index) — currently excluded only by the `/lp/` prefix, so the bare `/lp` page still shows the bar. That's fine since it's a directory, not an LP.

## Change

Add the quiz funnel to the prefix exclusion list:

```ts
const EXCLUDED_PREFIXES = ["/book", "/bookv2", "/intake", "/lp/", "/quiz"];
```

Single-line edit. No other component or route changes.

## Files

- `src/components/shared/MobileFooterBar.tsx` (line 8)

## Memory update

Update `mem://features/mobile-footer-bar` to record the final exclusion rule: hidden on `/`, `/wl`, `/ed`, and any route starting with `/book`, `/bookv2`, `/intake`, `/lp/`, `/quiz`.

## Out of scope

- Restructuring the bar into a single Call-only variant on LPs.
- Changing the 200px scroll-trigger threshold.
- Visual/style changes to the bar itself.
