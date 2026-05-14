
## 0. Cleanup (first, before touching anything else)

Delete the 4 unused files from the shelved SOLID refactor:
- `src/lib/booking/dateTime.ts`
- `src/lib/booking/freeSlotsRepo.ts`
- `src/lib/booking/tokens.ts`
- `src/hooks/useFocusOnTruthy.ts`

`/book/schedule` and `/book/schedule2` keep their inlined helpers and stay untouched. Stage env: confirmed no-op (preview already routes to stage GHL via hostname detection).

## 1. Auth gate

- Enable Google OAuth via Lovable Cloud managed (`configure_social_auth`).
- Hardcoded email allowlist in `src/lib/admin/allowlist.ts` (you give me the list; placeholder = `["chris@menswellnesscenters.com"]`).
- Server-side allowlist mirror in a Postgres function `public.is_admin_email(text)` so RLS policies can enforce it.
- Frontend route guard `<RequireAdmin>` — checks session + email against allowlist; bounces unauthorized to `/admin/login`.
- Edge functions independently re-verify caller JWT + email on every request. Never trust the client.

## 2. Database changes (one migration)

```text
+ FUNCTION public.is_admin_email(email text) → boolean      (SECURITY DEFINER, hardcoded list)
+ FUNCTION public.current_user_is_admin() → boolean         (wraps above using auth.jwt())
+ POLICY "admins read leads"      ON lead_captures      FOR SELECT
+ POLICY "admins update leads"    ON lead_captures      FOR UPDATE
+ POLICY "admins read events"     ON booking_event_log  FOR SELECT
  (ghl_sync_runs + ghl_free_slots already public-read, no change)
```

No new tables. No data ownership change for end users (lead inserts stay anon).

## 3. Routes & UI

```text
/admin/login        Google sign-in screen, Lovable dark/orange aesthetic
/admin              Overview: KPI cards (24h leads, pending CRM pushes,
                    last sync status, free slot freshness)
/admin/leads        Searchable + filterable lead_captures table.
                    Filters: crm_status, service, location, date range.
                    Row click → drawer with full record + attribution JSON.
                    Actions: Retry CRM push, Mark as contacted (tag).
/admin/events       booking_event_log feed. Filters: event_type, location,
                    date range, has-error. Drawer for meta JSON.
                    Action: Resend confirmation (for confirmed events).
/admin/sync         ghl_sync_runs history table. Action: Trigger sync now.
                    Live-tail the most recent run.
```

Layout: persistent sidebar (Leads / Events / Sync), top bar with signed-in email + sign-out. shadcn DataTable, Sheet for drawers, Toaster for action results. CSV export per table.

## 4. Edge functions (4 new)

All deploy with `verify_jwt = true`-equivalent in-code (read JWT, look up email, call `is_admin_email`, 403 otherwise). All return CORS headers.

```text
admin-retry-crm-push     POST { lead_id } → re-runs the CRM push for one lead.
                          Updates crm_status / crm_error / crm_contact_id.
admin-trigger-ghl-sync   POST {} → invokes the existing sync routine,
                          inserts a row into ghl_sync_runs.
admin-mark-lead          POST { lead_id, tags: string[] } → appends tags.
admin-resend-confirmation POST { event_id } → re-sends the GHL confirmation
                          for a booked appointment.
```

If any backing logic doesn't already exist (e.g. there may be no current "resend confirmation" path), the function will return a clear 501 with a TODO note rather than fake success. I'll flag those in the final summary.

## 5. Out of scope

- No CMS for treatments/locations/providers (kept in `src/data/*.ts`, would be a separate project).
- No multi-role hierarchy (single "admin" tier via allowlist).
- No audit log of admin actions in v1 (booking_event_log already captures booking-side mutations).
- No password reset / non-Google sign-in.
- No mobile-optimized admin layout (desktop-first, usable on tablet).

## Technical notes

- New folder structure: `src/pages/admin/*`, `src/components/admin/*`, `src/lib/admin/*`, `supabase/functions/admin-*`.
- Admin pages bypass the marketing site's nav/footer — own minimal `<AdminLayout>`.
- Allowlist file is the single source of truth for who's an admin; updating it requires a code edit + a one-line SQL change to `is_admin_email`. (Acceptable for v1; can be moved to a DB table later.)
- All admin queries use the existing `supabase` client with the user's JWT — RLS enforces access. No service-role key in the browser.
- Edge function pattern: parse JWT → fetch email → `if (!isAdmin(email)) return 403` → do work.

## What I need from you before starting

1. **Email allowlist** — which emails get admin? (I'll use `chris@menswellnesscenters.com` as placeholder if you don't say.)
2. **CRM push logic** — is there an existing edge function that does the GHL contact upsert, or do I need to write the retry from scratch by reading `lead_captures` and calling the GHL proxy?
3. **GHL sync routine** — which existing function/cron does the slot sync? (I see `ghl_sync_runs` table but need to find the actual sync code.)

I can start step 0 (cleanup) and steps 1–3 (auth + DB + read-only UI) immediately while you answer 1–3 for the action wiring.

## Order of execution

1. Delete refactor files.
2. Enable Google OAuth.
3. Migration (functions + policies).
4. AdminLayout + RequireAdmin + login page.
5. Read-only Leads / Events / Sync pages with filters and drawers.
6. CSV export.
7. Four edge functions + wired action buttons.
8. QA pass: sign in as allowlisted email, sign in as non-allowlisted (must 403), trigger each action.

