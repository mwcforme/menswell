import { useEffect, useState } from "react";
import { Wrench } from "lucide-react";

const STORAGE_KEY = "bookv2-spec-mode";
const BODY_CLASS = "spec-mode-on";

const font = "'Montserrat', sans-serif";

const readInitial = (): boolean => {
  if (typeof window === "undefined") return true;
  const params = new URLSearchParams(window.location.search);
  if (params.get("spec") === "1") return true;
  if (params.get("spec") === "0") return false;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "0") return false;
    return true; // default ON
  } catch {
    return true;
  }
};

const SpecModeToggle = () => {
  const [on, setOn] = useState<boolean>(readInitial);

  useEffect(() => {
    const body = document.body;
    if (on) body.classList.add(BODY_CLASS);
    else body.classList.remove(BODY_CLASS);
    try {
      localStorage.setItem(STORAGE_KEY, on ? "1" : "0");
    } catch {
      /* ignore */
    }
    return () => body.classList.remove(BODY_CLASS);
  }, [on]);

  return (
    <button
      type="button"
      onClick={() => setOn((v) => !v)}
      aria-pressed={on}
      aria-label={on ? "Turn spec mode off" : "Turn spec mode on"}
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        zIndex: 2147483000,
        height: 44,
        paddingInline: 16,
        borderRadius: 999,
        backgroundColor: on ? "#E8670A" : "rgba(11,16,41,0.92)",
        color: "#FFFFFF",
        border: on ? "1px solid #E8670A" : "1px solid rgba(255,255,255,0.18)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
        fontFamily: font,
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
      }}
    >
      <Wrench className="h-4 w-4" />
      Spec Mode: {on ? "On" : "Off"}
    </button>
  );
};

export default SpecModeToggle;
