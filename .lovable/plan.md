## Root cause for `/admin/sync` not loading

The sidebar in `AdminLayout.tsx` links to `/admin/sync`, but no `AdminSync.tsx` page exists and no matching `<Route>` is registered in `src/App.tsx`. The path falls through to the `NotFound` route.

## Admin-section regression — issues found

| # | Area | Issue | Severity |
|---|---|---|---|
| 1 | Routing | `/admin/sync` route + page missing (sidebar links to it) | Bug — confirmed broken |
| 2 | `AdminOverview` "Cached open slots" stat | Counts every row in `ghl_free_slots`, including slots from the inactive env's calendars. Frontend reads filter by env calendar IDs, so the stat overstates what users actually see. | Inconsistency |
| 3 | `RequireAdmin` | Both `onAuthStateChange` and `getSession` race to call `setState`. Harmless today but can flash the loader after sign-out. | Minor |
| 4 | `EnvSwitcher` | Reload-on-toggle works, but there is no visual confirmation of which env actually loaded after the reload (it reads `APP_ENV`, fine), and there's no way to clear the override back to "auto". | Polish |
| 5 | `AdminLeads` | Filter dropdown options are `ok / pending / failed` but the table also shows other statuses (e.g. blank/`null`). Filtering hides rows with no status. | Minor |

## Fixes

### 1. Create `/admin/sync`
- New `src/pages/admin/AdminSync.tsx`:
  - Loads last 50 rows from `ghl_sync_runs` ordered by `started_at desc` (id, status, slot_count, started_at, finished_at, error).
  - Status pill: `ok` green, `running` amber, anything else red.
  - "Run sync now" button → `supabase.functions.invoke('ghl-sync')`, then refresh.
  - "Run validation" button → `supabase.functions.invoke('ghl-sync-validate')`, surfaces returned summary (env, expected vs actual calendar IDs, drift count) inline.
  - Refresh button + 30 s auto-poll while a run is `running`.
  - Wrapped in `<AdminLayout title="Sync">`.
- Register route in `src/App.tsx`:
  ```tsx
  <Route path="/admin/sync" element={<RequireAdmin><AdminSync /></RequireAdmin>} />
  ```

### 2. Overview "Cached open slots" accuracy
- Filter the count query by the active env's calendar IDs (import the same calendar list the booking funnel uses) so the number matches what the frontend actually serves. Add a tiny "(env: stage|prod)" caption under the stat.

### 3. RequireAdmin tightening
- Drop the redundant `getSession()` block; rely on `onAuthStateChange` (it fires immediately with the current session). Removes the race and simplifies the gate.

### 4. EnvSwitcher polish
- Add a third `Auto` button that clears `mwc_env_override` from localStorage then reloads, so admins can return to host-based detection.
- Add a small caption under the toggle: `Active: <APP_ENV>`.

### 5. AdminLeads filter
- Add `Other` option that filters to rows where `crm_status` is not in (`ok`,`pending`,`failed`), and include null/blank statuses in the default `All` view (already does — verify).

## Files touched

- `src/App.tsx` — add AdminSync route + import
- `src/pages/admin/AdminSync.tsx` — new
- `src/pages/admin/AdminOverview.tsx` — env-filtered slot count
- `src/components/admin/RequireAdmin.tsx` — simplify
- `src/components/admin/EnvSwitcher.tsx` — Auto button + caption
- `src/pages/admin/AdminLeads.tsx` — Other status filter

No DB migrations, no edge-function changes (existing `ghl-sync` and `ghl-sync-validate` already deployed and used as-is).

## Verification

- Navigate to `/admin/sync` while logged in as `eobrien@mwcforme.com` → table renders with recent runs; both buttons trigger their edge functions and the table refreshes.
- Toggle EnvSwitcher between Stage / Prod / Auto; confirm reload + caption update.
- Sign out from sidebar → bounces to `/admin` login (no loader flicker).
- `/admin/overview`, `/admin/leads`, `/admin/events` continue to load with no regressions.
