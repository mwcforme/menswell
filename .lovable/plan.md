# Fix "Failed to send a request to the Edge Function" on Admin → Sync

## Diagnosis

`AdminSync.tsx` calls `supabase.functions.invoke("ghl-sync")` and awaits the response. The edge-function logs show the function boots but never logs completion, and the browser surfaces "Failed to send a request to the Edge Function" — classic symptom of the client closing the connection before the function returns.

`ghl-sync` walks 6 calendars (3 prod + 3 stage) sequentially via the GHL API plus chunked Supabase upserts. From a browser invoke, that easily exceeds the gateway wait window, even though the cron-triggered run from the database succeeds (rows show `ok` in the table).

The work itself is fine — only the "wait for full result" pattern from the admin UI is wrong.

## Fix

Make manual triggers fire-and-forget:

1. **`supabase/functions/ghl-sync/index.ts`**
   - Insert the `ghl_sync_runs` row (status `running`) synchronously so the UI sees it immediately.
   - Move the per-env / per-center sync loop into an async function and schedule it with `EdgeRuntime.waitUntil(...)` (Deno Deploy / Supabase Edge supports this for background work after the response is returned).
   - Return `202 { ok: true, run_id, status: "running" }` right away.
   - The existing finalization (update row to `ok` / `error`) stays inside the background task. The hourly cron path is unaffected — it doesn't care whether we await.

2. **`src/pages/admin/AdminSync.tsx`**
   - After `invoke("ghl-sync")` returns, immediately call `load()` (already done) and start the existing 30s poll loop until no row is `running`.
   - Treat HTTP 202 as success; only show the red error banner on a real `error` from `invoke`.
   - Optional small touch: disable the button for a few seconds after click to prevent double-fire.

## Acceptance criteria

- Clicking "Run sync now" on `/admin/sync` returns within ~1s with no error banner.
- A new row appears in the table with status `running`, then flips to `ok` (and slot count) within ~30–60s via the auto-poll.
- The hourly cron job continues to populate `ghl_sync_runs` exactly as before.
- `ghl-sync-validate` button is unchanged (it's already fast).

## Out of scope

- No schema changes.
- No change to GHL credentials, calendars, or env routing.
- No change to the `EnvBadge` / `EnvSwitcher` work from the previous turns.
