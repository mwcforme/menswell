/**
 * Runtime environment detection.
 *
 * PRODUCTION = the live custom domain only (book.menswellnesscenters.com).
 * Everything else (lovable.app preview, menswell.lovable.app, localhost) = STAGE.
 *
 * The same edge functions are deployed once and pick the matching GHL
 * credentials + location + calendars based on the request `Origin` header.
 * Keep this list in sync with the server-side detector in
 * `supabase/functions/_shared/ghlEnv.ts`.
 */

const PROD_HOSTS = new Set<string>([
  "book.menswellnesscenters.com",
  "menswellnesscenters.com",
  "www.menswellnesscenters.com",
]);

function detect(): "prod" | "stage" {
  if (typeof window === "undefined") return "stage";
  const host = window.location.hostname.toLowerCase();
  return PROD_HOSTS.has(host) ? "prod" : "stage";
}

export const APP_ENV: "prod" | "stage" = detect();
export const IS_PROD = APP_ENV === "prod";
export const IS_STAGE = APP_ENV === "stage";
