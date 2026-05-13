## Goal

Stand up a single headless intake endpoint that any external system (WordPress + Gravity Forms today, Zapier / cURL / partner sites tomorrow) can POST a lead to. It must:

1. Never lose the submission — write to `lead_captures` first, **then** forward to GHL.
2. Accept Gravity Forms' weird `input_3`, `input_23.1` field names without code changes per form.
3. Be safe to expose publicly (validation, rate-limit, optional shared-secret).

## Endpoint

`POST https://{project}.functions.supabase.co/lead-intake`
(also reachable through the existing Supabase functions URL the frontend already uses)

Accepts three content types:
- `application/json` — canonical shape, easiest for partners
- `application/x-www-form-urlencoded` — Gravity Forms native postback
- `multipart/form-data` — Gravity Forms when files/checkboxes present

Returns:
- `200 { ok: true, capture_id, crm_contact_id? }` on success
- `4xx { ok:false, error }` on validation failure
- `502 { ok:false, capture_id, error }` if capture saved but GHL forward failed (so caller still knows the lead is safe)

## Field mapping

A single mapping table inside the function normalizes inbound payloads to one canonical shape:

```text
canonical          ← gravity (form_id=1)        ← json keys (any of)
fullName           ← input_23                    ← fullName | name | full_name
email              ← input_3                     ← email
phone              ← input_4                     ← phone | phoneNumber
location           ← input_5                     ← location | city
consent (bool)     ← input_26.1 (presence)      ← consent | tcpa
utm_source         ← input_12                    ← utm_source
utm_medium         ← input_13                    ← utm_medium
utm_campaign_id    ← input_14                    ← utm_campaign | utm_campaign_id
utm_adgroup_id     ← input_15                    ← utm_adgroup_id
gclid              ← input_16                    ← gclid
fbclid             ← input_17                    ← fbclid
landing_page_url   ← input_20 / referer header   ← page_url
form_source_label  ← input_11 (e.g. "8828")     ← source
```

Additional Gravity hidden inputs (`input_18`, `input_19`, `input_21`) are stashed verbatim into `attribution.raw` so we never drop data we don't yet understand. Mapping lives in `supabase/functions/lead-intake/mapping.ts` so adding another form/source = one entry, no other changes.

## Persistence (zero data loss)

Step order inside the function:

1. Parse body by content-type → raw object.
2. Apply mapping → canonical object.
3. Zod-validate canonical (name + (email||phone) required, length caps, email/phone regex).
4. **Insert into `lead_captures`** with `crm_status='pending'` using the service-role key (server-side, bypasses RLS). Capture the row id.
5. Forward to GHL via the existing `ghl-proxy` upsert path (re-uses location id, version, allowlist).
6. Update the row to `crm_status='synced'` + `crm_contact_id`, or `crm_status='failed'` + `crm_error`.

If step 4 fails we return 500 — caller should retry. If 4 succeeds but 5 fails we still return 200/502 with `capture_id` so the lead is recoverable from Cloud.

A small migration adds a service-role-only UPDATE policy on `lead_captures` so step 6 actually persists.

## Security

- **CORS**: `Access-Control-Allow-Origin: *` so a browser-side WP form can post cross-origin. Methods: `POST, OPTIONS` only.
- **Optional shared secret**: header `X-Intake-Token` checked against `LEAD_INTAKE_TOKEN` Supabase secret. If the secret is set, missing/wrong token → 401. If the secret is unset, endpoint is open (useful while wiring up WP). Recommended: set it once WP is configured.
- **Honeypot**: if Gravity's `input_27` (or generic `phone_hp`) is non-empty → silently 200 and drop. (Gravity already labels field 27 as the honeypot in the markup provided.)
- **Rate limit**: in-memory per-IP token bucket (10 req / 60s). Good enough for an anon public endpoint; if abused we move it to Supabase later.
- **Input validation**: Zod schema with strict length caps; UTM/gclid stored as opaque strings.
- **No SQL injection surface** — only parameterized inserts via `@supabase/supabase-js`.

## WordPress wiring (docs we'll hand the user, no code change on our side)

Two options, both supported by the same endpoint:

1. **Gravity Forms → Webhooks Add-On (recommended)** — point the webhook at `/lead-intake`, format `Form Data`, no field remapping needed because our function already understands `input_*`.
2. **Front-end JS shim** — a tiny `<script>` on the WP page that intercepts `gform_confirmation_loaded` (or the submit event) and `fetch()`'s the same payload to `/lead-intake`. Useful if they don't want to install the Webhooks add-on.

We'll deliver both snippets in the function's README.

## Files to add / change

- `supabase/migrations/<ts>_lead_intake.sql` — service-role UPDATE policy on `lead_captures`; index on `crm_status` already exists.
- `supabase/functions/lead-intake/index.ts` — handler (CORS, parse, map, validate, insert, forward, update).
- `supabase/functions/lead-intake/mapping.ts` — canonical mapping table + helpers.
- `supabase/functions/lead-intake/README.md` — WP setup instructions and example cURL.
- (Optional) `supabase/config.toml` — add `[functions.lead-intake] verify_jwt = false` so external systems without a Supabase JWT can post.

## Out of scope (call out, don't build now)

- Per-source dashboards / admin viewer for `lead_captures`.
- Async retry queue for failed GHL forwards (today's flow returns 502 with `capture_id`; retry can be a follow-up cron edge function).
- Per-form mapping UI — mapping stays code-defined until a 2nd partner needs it.
