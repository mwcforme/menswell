// ghl-sync — fetches free slots for all centers and upserts into the cache.
// Triggered hourly by pg_cron, or manually via POST.
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type, apikey",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const API_BASE = "https://services.leadconnectorhq.com";
const LOCATION_ID = "Ghstz8eIsHWLeXek47dk";
const API_VERSION = "2021-07-28";
const TIMEZONE = "America/New_York";

const CENTERS: { key: string; calendarId: string }[] = [
  { key: "richmond",        calendarId: "1Cfy5JnO2A4ggiZlMVvX" },
  { key: "virginia-beach",  calendarId: "4xmnBGMWJ6TVUKcAPpPb" },
  { key: "newport-news",    calendarId: "IBaRbjUpEmesxEloFBME" },
];

// Window we cache: now -> +21 days
const WINDOW_DAYS = 21;

interface FreeSlotsResponse {
  [key: string]: { slots?: string[] } | unknown;
  traceId?: string;
}

const json = (status: number, data: unknown) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

async function fetchSlots(calendarId: string, apiKey: string) {
  const start = Date.now();
  const end = start + WINDOW_DAYS * 24 * 60 * 60 * 1000;
  const url = `${API_BASE}/calendars/${calendarId}/free-slots?startDate=${start}&endDate=${end}&timezone=${encodeURIComponent(TIMEZONE)}`;
  const r = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Version: API_VERSION,
      Accept: "application/json",
    },
  });
  const text = await r.text();
  if (!r.ok) throw new Error(`GHL ${r.status}: ${text.slice(0, 300)}`);
  return JSON.parse(text) as FreeSlotsResponse;
}

function flatten(resp: FreeSlotsResponse): string[] {
  const out: string[] = [];
  for (const [k, v] of Object.entries(resp)) {
    if (k === "traceId" || !v || typeof v !== "object") continue;
    const slots = (v as { slots?: string[] }).slots;
    if (Array.isArray(slots)) out.push(...slots);
  }
  return out;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const apiKey = Deno.env.get("GHL_API_KEY");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!apiKey || !supabaseUrl || !serviceKey) {
    return json(500, { error: "Missing required environment" });
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  const { data: run, error: runErr } = await supabase
    .from("ghl_sync_runs")
    .insert({ status: "running" })
    .select("id")
    .single();
  if (runErr || !run) return json(500, { error: `run insert: ${runErr?.message}` });

  try {
    let total = 0;
    const cutoff = new Date().toISOString();

    for (const c of CENTERS) {
      const resp = await fetchSlots(c.calendarId, apiKey);
      const slots = flatten(resp);
      const rows = slots.map((iso) => {
        const startD = new Date(iso);
        const endD = new Date(startD.getTime() + 30 * 60 * 1000); // assume 30m, GHL doesn't return endTime here
        return {
          location: c.key,
          calendar_id: c.calendarId,
          slot_start: startD.toISOString(),
          slot_end: endD.toISOString(),
          fetched_at: cutoff,
        };
      });

      // Wipe stale rows for this calendar in our window, then insert fresh
      await supabase
        .from("ghl_free_slots")
        .delete()
        .eq("calendar_id", c.calendarId);

      if (rows.length) {
        // chunk to avoid payload limits
        for (let i = 0; i < rows.length; i += 500) {
          const chunk = rows.slice(i, i + 500);
          const { error } = await supabase
            .from("ghl_free_slots")
            .upsert(chunk, { onConflict: "calendar_id,slot_start" });
          if (error) throw new Error(`upsert: ${error.message}`);
        }
      }
      total += rows.length;
    }

    await supabase
      .from("ghl_sync_runs")
      .update({ status: "ok", slot_count: total, finished_at: new Date().toISOString() })
      .eq("id", run.id);

    return json(200, { ok: true, slot_count: total });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await supabase
      .from("ghl_sync_runs")
      .update({ status: "error", error: msg, finished_at: new Date().toISOString() })
      .eq("id", run.id);
    return json(500, { error: msg });
  }
});
