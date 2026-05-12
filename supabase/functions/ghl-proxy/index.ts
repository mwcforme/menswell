// ghl-proxy v2 — manual CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const API_BASE = "https://services.leadconnectorhq.com";
const LOCATION_ID = "Ghstz8eIsHWLeXek47dk";
const API_VERSION = "2021-07-28";

interface ProxyRequest {
  path: string;                          // e.g. "/contacts/" or "/calendars/events"
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  query?: Record<string, string | number | boolean>;
  body?: unknown;
  injectLocationId?: boolean;            // default true; injects locationId into body or query
}

const json = (status: number, data: unknown) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const apiKey = Deno.env.get("GHL_API_KEY");
  if (!apiKey) return json(500, { error: "GHL_API_KEY is not configured" });

  let payload: ProxyRequest;
  try {
    payload = await req.json();
  } catch {
    return json(400, { error: "Invalid JSON body" });
  }

  const { path, method = "GET", query = {}, body, injectLocationId = true } = payload;
  if (!path || typeof path !== "string" || !path.startsWith("/")) {
    return json(400, { error: "`path` must start with /" });
  }

  const search = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) search.set(k, String(v));
  if (injectLocationId && (method === "GET" || method === "DELETE") && !search.has("locationId")) {
    search.set("locationId", LOCATION_ID);
  }
  const url = `${API_BASE}${path}${search.toString() ? `?${search}` : ""}`;

  let outBody: string | undefined;
  if (body !== undefined && method !== "GET" && method !== "DELETE") {
    const merged =
      injectLocationId && body && typeof body === "object" && !Array.isArray(body)
        ? { locationId: LOCATION_ID, ...(body as Record<string, unknown>) }
        : body;
    outBody = JSON.stringify(merged);
  }

  try {
    const upstream = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Version: API_VERSION,
        Accept: "application/json",
        ...(outBody ? { "Content-Type": "application/json" } : {}),
      },
      body: outBody,
    });

    const text = await upstream.text();
    const data = text ? safeJson(text) : null;
    return json(upstream.status, { ok: upstream.ok, status: upstream.status, data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return json(502, { error: `GHL request failed: ${message}` });
  }
});

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
