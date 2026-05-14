import { APP_ENV } from "@/lib/env";

const STORAGE_KEY = "mwc_env_override";

/**
 * Admin-only environment selector. Persists choice to localStorage and
 * reloads so all GHL proxy calls + calendar lookups pick up the new env.
 * "Auto" clears the override and reverts to host-based detection.
 */
export function EnvSwitcher() {
  const setEnv = (next: "prod" | "stage" | "auto") => {
    try {
      if (next === "auto") window.localStorage.removeItem(STORAGE_KEY);
      else window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    window.location.reload();
  };

  const options: Array<{ key: "stage" | "prod" | "auto"; activeClass: string }> = [
    { key: "stage", activeClass: "bg-emerald-500 text-white" },
    { key: "prod",  activeClass: "bg-red-500 text-white" },
    { key: "auto",  activeClass: "bg-white/20 text-white" },
  ];

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 p-1">
        <span className="px-2 text-[10px] uppercase tracking-wider text-white/50">
          Env
        </span>
        {options.map((o) => {
          const active = o.key !== "auto" && APP_ENV === o.key;
          return (
            <button
              key={o.key}
              type="button"
              onClick={() => setEnv(o.key)}
              className={`rounded px-2 py-1 text-xs font-semibold uppercase tracking-wide transition-colors ${
                active ? o.activeClass : "text-white/60 hover:text-white"
              }`}
            >
              {o.key}
            </button>
          );
        })}
      </div>
      <div className="text-[10px] uppercase tracking-wider text-white/40">
        Active: {APP_ENV}
      </div>
    </div>
  );
}
