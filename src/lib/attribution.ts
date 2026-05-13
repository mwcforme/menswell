/**
 * Marketing attribution capture.
 *
 * On first page load, reads URL params and persists them to a first-party
 * cookie + sessionStorage so they survive across the funnel and follow the
 * user into GHL on lead submit. URL values always win over stored values
 * (a fresh ad click should clobber a stale session).
 *
 * Hidden fields (per spec) auto-populated from URL/cookies:
 *   first_name, last_name, page_id,
 *   utm_source, utm_medium, utm_campaign, utm_content, utm_term,
 *   gclid, msclkid, fbclid
 *
 * When `first_name` / `last_name` are present in attribution, they OVERRIDE
 * whatever the user typed in the visible form (this is by request, e.g. when
 * a CRM-pre-filled link drops the user on the LP).
 */

const COOKIE_NAME = "mwc_attr";
const COOKIE_MAX_AGE_DAYS = 90;

export const ATTRIBUTION_KEYS = [
  "first_name",
  "last_name",
  "page_id",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "msclkid",
  "fbclid",
] as const;

export type AttributionKey = typeof ATTRIBUTION_KEYS[number];
export type Attribution = Partial<Record<AttributionKey, string>>;

const MAX_VAL_LEN = 200;

const safe = (v: unknown): string | undefined => {
  if (typeof v !== "string") return undefined;
  const trimmed = v.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, MAX_VAL_LEN);
};

const readCookie = (): Attribution => {
  if (typeof document === "undefined") return {};
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));
  if (!match) return {};
  try {
    const raw = decodeURIComponent(match.slice(COOKIE_NAME.length + 1));
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      const out: Attribution = {};
      for (const k of ATTRIBUTION_KEYS) {
        const v = safe((parsed as Record<string, unknown>)[k]);
        if (v) out[k] = v;
      }
      return out;
    }
  } catch {
    /* fall through */
  }
  return {};
};

const writeCookie = (attr: Attribution) => {
  if (typeof document === "undefined") return;
  const value = encodeURIComponent(JSON.stringify(attr));
  const maxAge = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${value}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
};

const readUrl = (): Attribution => {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: Attribution = {};
  for (const k of ATTRIBUTION_KEYS) {
    const v = safe(params.get(k));
    if (v) out[k] = v;
  }
  // Common alias: ?fn=, ?ln= — accept as fallback for short URLs.
  if (!out.first_name) {
    const fn = safe(params.get("fn"));
    if (fn) out.first_name = fn;
  }
  if (!out.last_name) {
    const ln = safe(params.get("ln"));
    if (ln) out.last_name = ln;
  }
  return out;
};

let cached: Attribution | null = null;

/**
 * Initialise attribution capture. Call once on app boot. URL params win,
 * cookie fills gaps, result is persisted back to cookie + sessionStorage.
 */
export function initAttribution(): Attribution {
  const fromCookie = readCookie();
  const fromUrl = readUrl();
  // URL wins per-key; missing URL keys fall back to cookie.
  const merged: Attribution = { ...fromCookie, ...fromUrl };
  cached = merged;
  if (Object.keys(merged).length > 0) {
    writeCookie(merged);
    try {
      sessionStorage.setItem(COOKIE_NAME, JSON.stringify(merged));
    } catch {
      /* ignore quota */
    }
  }
  return merged;
}

export function getAttribution(): Attribution {
  if (cached) return cached;
  return initAttribution();
}

/** Build the GHL tag list from attribution (one tag per non-empty key). */
export function attributionTags(attr: Attribution = getAttribution()): string[] {
  const tags: string[] = [];
  for (const k of ATTRIBUTION_KEYS) {
    const v = attr[k];
    if (!v) continue;
    if (k === "first_name" || k === "last_name") continue; // not useful as tags
    // GHL tag length cap is generous; truncate defensively.
    tags.push(`${k}:${v}`.slice(0, 100));
  }
  return tags;
}
