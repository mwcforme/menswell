# Required GHL scopes for the stage API key

The `ghl-proxy` edge function only calls three GHL endpoints. For each, here is the exact scope GHL requires on a Private Integration Token (Settings → Private Integrations → New).

## Mandatory scopes (check these)

| Purpose | Endpoint | Scope (View) | Scope (Edit) |
|---|---|---|---|
| Load free slots on /book/schedule | `GET /calendars/{calendarId}/free-slots` | `calendars/events.readonly` | — |
| Upsert the lead as a GHL contact | `POST /contacts/upsert` | `contacts.readonly` | `contacts.write` |
| Create the confirmed appointment | `POST /calendars/events/appointments` | `calendars/events.readonly` | `calendars/events.write` |
| (Implicit) resolve the location the calendars belong to | n/a | `locations.readonly` | — |

So in the PIT scope picker, tick:

- `View Calendars`  → `calendars.readonly`
- `View Calendar Events` → `calendars/events.readonly`
- `Edit Calendar Events` → `calendars/events.write`
- `View Contacts` → `contacts.readonly`
- `Edit Contacts` → `contacts.write`
- `View Locations` → `locations.readonly`

That is the full set the current proxy code exercises. Nothing else is needed.

## Critical: token must be issued from the right subaccount

The PIT must be created **inside the same subaccount that owns the three calendars** (`CpcOAez2bv3tQTvTdRkO`, `r1IBpjVKT05qyfH2hcwv`, `6cSOOYintvb8y0B42uTc`). A token from any other subaccount will keep returning `"Calendar does not belong to this location"` — which is exactly the error our diagnostic test surfaced, regardless of scopes.

While you are in that subaccount, also copy its Location ID (Settings → Business Profile → Location ID) and confirm it matches `GHL_LOCATION_ID_STAGE_1`.

## After you generate the new key

1. Update the secret `GHL_API_KEY_STAGE` with the new PIT.
2. Confirm `GHL_LOCATION_ID_STAGE_1` is the Location ID of that same subaccount.
3. Tell me when done and I will:
   - Re-run the diagnostic POST against `/calendars/events/appointments` and the GET against `/free-slots` for all three stage calendars.
   - Confirm we get `200` / `201` responses.
   - Report back with the verdict (and clean up the temporary `upstreamBody` debug field on the proxy if everything is green).

No code changes are required for this step — only the secret and PIT scopes.
