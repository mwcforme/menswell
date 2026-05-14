import { APP_ENV } from "@/lib/env";

const STORAGE_KEY = "mwc_env_override";

/**
 * Admin-only environment selector. Persists choice to localStorage and
 * reloads so all GHL proxy calls + calendar lookups pick up the new env.
 */
export function EnvSwitcher() {
  const setEnv = (next: "prod" | "stage") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 p-1">
      <span className="px-2 text-[10px] uppercase tracking-wider text-white/50">
        Env
      </span>
      {(["stage", "prod"] as const).map((e) => {
        const active = APP_ENV === e;
        return (
          <button
            key={e}
            type="button"
            onClick={() => setEnv(e)}
            className={`rounded px-2 py-1 text-xs font-semibold uppercase tracking-wide transition-colors ${
              active
                ? e === "prod"
                  ? "bg-red-500 text-white"
                  : "bg-emerald-500 text-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            {e}
          </button>
        );
      })}
    </div>
  );
}
