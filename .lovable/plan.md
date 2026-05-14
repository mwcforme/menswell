# Virginia Beach (stage) calendar — file map and likely cause

## Backend (sync + proxy)

- `supabase/functions/ghl-sync/index.ts`
  Hardcodes the 6-calendar list (prod + stage). Stage Virginia Beach = `HbuYjmaupXDpYoiYzvUk` (line 38). Pulls `/calendars/<id>/free-slots` from GHL with the stage API key and writes rows to `ghl_free_slots` (`calendar_id`, `location`, `slot_start`, `slot_end`).
- `supabase/functions/ghl-sync-validate/index.ts`
  Hourly audit; same calendar id constants. Logs drift to `booking_event_log`.
- `supabase/functions/ghl-proxy/index.ts`
  Env-aware passthrough used for live GHL reads (and bookings). `Origin` decides prod vs stage credentials. Not used by DayView for slot reads — DayView reads the cache table directly.
- DB table `ghl_free_slots` (public read RLS).
  Currently holds **469 stage Virginia Beach rows under `HbuYjmaupXDpYoiYzvUk`** (verified just now), so the cache is healthy.

## Frontend (calendar selection + render)

- `src/lib/env.ts`
  Decides `IS_PROD`. Anything not on `book.menswellnesscenters.com` (or sister hosts) → `stage`. Override via `?env=prod|stage|auto` (persisted in localStorage as `mwc_env_override`).
- `src/lib/ghlCalendars.ts`
  `CENTER_CALENDARS` switches on `IS_PROD`. Stage Virginia Beach → `HbuYjmaupXDpYoiYzvUk`. Prod Virginia Beach → `4xmnBGMWJ6TVUKcAPpPb`.
- `src/lib/etDate.ts`
  ET-safe date helpers used by DayView/AccordionView for keying slots.
- `src/components/book/GHLDayView.tsx`
  Reads `CENTER_CALENDARS[location].calendarId` and queries `ghl_free_slots` directly via `supabase.from('ghl_free_slots')`. Renders the per-day badge ("Closed" for Sunday, "Full" when `slotsByDay[key]` is empty, else `N slots` / `Only N left`).
- `src/components/book/GHLAccordionView.tsx`
  Same data path, alternate UI.
- `src/pages/book/BookSchedule.tsx` / `BookSchedule2.tsx`
  Pages that mount the views and pass `location="virginia-beach"`.

## Why stage is showing Full / Closed even though slots exist

There is no missing/incorrect slot data — the cache has 469 rows for `HbuYjmaupXDpYoiYzvUk`. The most plausible reasons the UI still shows Full/Closed:

1. **The user is hitting prod calendar id by mistake.** If the browser has `mwc_env_override=prod` saved in localStorage (e.g. you ever opened `?env=prod`), `IS_PROD` becomes `true` and DayView queries `4xmnBGMWJ6TVUKcAPpPb`, which has only 78 rows and runs out of future days quickly. Visit `?env=auto` (or `?env=stage`) once to reset.
2. **Published vs preview.** The timezone fix in `etDate.ts` and the stage calendar id swap are only on the preview build until you click Publish. The public `menswell.lovable.app` URL still serves the older bundle that hashes against `r1IBpjVKT05qyfH2hcwv` (54 rows, ends 2026-05-22) — which would also explain why later weeks read as Full and earlier ones look thin.
3. **Past-time dropping in `dropPastSlots`.** DayView filters out any slot earlier than "now" in ET. Slots earlier today that already passed correctly render the day as Full once everything is in the past.

## Proposed verification (no edits in plan mode)

- Confirm `IS_PROD` in the live session: open devtools console on the failing page and run `window.localStorage.getItem('mwc_env_override')` and `location.hostname`.
- Confirm the bundle is reading the right calendar id: in devtools network panel, find the `ghl_free_slots?...calendar_id=eq.<id>` request — it should be `HbuYjmaupXDpYoiYzvUk` on stage.
- If both look right, query `ghl_free_slots` for `calendar_id=HbuYjmaupXDpYoiYzvUk` filtered to the visible week to make sure rows fall inside the week the UI is asking for.

## Most likely fix path

- Publish the project so `menswell.lovable.app` serves the current `ghlCalendars.ts` (`HbuYjmaupXDpYoiYzvUk`) and the ET date helpers.
- Have the user clear the `mwc_env_override` key (or visit `?env=auto`) to make sure they aren't pinned to prod on the stage host.
