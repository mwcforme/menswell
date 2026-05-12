import { useEffect, useMemo, useState, useCallback } from "react";
import { X, ChevronRight } from "lucide-react";
import {
  SPEC_ANNOTATIONS,
  STEP_NAMES,
  type SpecAnnotation,
  getAnnotationsForStep,
} from "./specAnnotations";

interface SpecOverlayProps {
  currentStep: number; // 1-8
}

const font = "'Montserrat', sans-serif";
const display = "'Bebas Neue', sans-serif";

interface BadgePos {
  ann: SpecAnnotation;
  top: number;
  left: number;
}

const BADGE_OFFSET = 8;

const useSpecModeOn = () => {
  const [on, setOn] = useState<boolean>(
    typeof document !== "undefined" && document.body.classList.contains("spec-mode-on"),
  );
  useEffect(() => {
    const obs = new MutationObserver(() => {
      setOn(document.body.classList.contains("spec-mode-on"));
    });
    obs.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return on;
};

const SpecOverlay = ({ currentStep }: SpecOverlayProps) => {
  const specOn = useSpecModeOn();
  const [positions, setPositions] = useState<BadgePos[]>([]);
  const [active, setActive] = useState<SpecAnnotation | null>(null);
  const [showList, setShowList] = useState(false);

  const relevant = useMemo(
    () => getAnnotationsForStep(currentStep),
    [currentStep],
  );

  const recompute = useCallback(() => {
    if (!specOn) return;
    const next: BadgePos[] = [];
    for (const ann of relevant) {
      const el = document.querySelector<HTMLElement>(`[data-spec-id="${ann.id}"]`);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) continue;
      next.push({
        ann,
        top: rect.top + window.scrollY - 12,
        left: rect.right + window.scrollX + BADGE_OFFSET,
      });
    }
    setPositions(next);
  }, [relevant, specOn]);

  useEffect(() => {
    if (!specOn) {
      setPositions([]);
      setActive(null);
      setShowList(false);
      return;
    }
    // initial + delayed (transitions in funnel ~250ms)
    recompute();
    const t1 = window.setTimeout(recompute, 80);
    const t2 = window.setTimeout(recompute, 320);

    const onScroll = () => recompute();
    const onResize = () => recompute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const observer = new MutationObserver(() => recompute());
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, [specOn, recompute, currentStep]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null);
        setShowList(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!specOn) return null;

  const stepAnnotations = SPEC_ANNOTATIONS.filter(
    (a) => a.step === currentStep || a.step === 0,
  );

  return (
    <>
      {/* Numbered badges */}
      {positions.map(({ ann, top, left }) => (
        <button
          key={ann.id}
          type="button"
          onClick={() => {
            setActive(ann);
            setShowList(false);
          }}
          aria-label={`Spec ${ann.number}: ${ann.label}`}
          style={{
            position: "absolute",
            top,
            left,
            zIndex: 2147482000,
            width: 24,
            height: 24,
            borderRadius: "50%",
            backgroundColor: "#E8670A",
            color: "#FFFFFF",
            border: "2px solid #FFFFFF",
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            fontFamily: font,
            fontWeight: 700,
            fontSize: 12,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            transition: "transform 150ms ease-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {ann.number}
        </button>
      ))}

      {/* Floating "All callouts" trigger */}
      <button
        type="button"
        onClick={() => {
          setShowList(true);
          setActive(null);
        }}
        aria-label="Show all callouts for this step"
        style={{
          position: "fixed",
          right: 16,
          bottom: 72,
          zIndex: 2147483000,
          height: 40,
          paddingInline: 14,
          borderRadius: 999,
          backgroundColor: "rgba(11,16,41,0.92)",
          color: "#FFFFFF",
          border: "1px solid rgba(255,255,255,0.18)",
          fontFamily: font,
          fontWeight: 600,
          fontSize: 12,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          cursor: "pointer",
          boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
        }}
      >
        All callouts ({stepAnnotations.length})
        <ChevronRight className="h-3.5 w-3.5" />
      </button>

      {/* Side panel */}
      {(active || showList) && (
        <>
          {/* Click-out scrim (transparent, just for dismiss) */}
          <div
            onClick={() => {
              setActive(null);
              setShowList(false);
            }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 2147483100,
              backgroundColor: "rgba(0,0,0,0.35)",
            }}
          />
          <aside
            role="dialog"
            aria-label="Spec annotation"
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(380px, 92vw)",
              zIndex: 2147483200,
              backgroundColor: "#0B1029",
              borderLeft: "1px solid rgba(232,103,10,0.4)",
              boxShadow: "-12px 0 40px rgba(0,0,0,0.5)",
              color: "#FFFFFF",
              fontFamily: font,
              overflowY: "auto",
              padding: "20px 22px 32px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span
                style={{
                  fontFamily: display,
                  fontSize: 18,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#E8670A",
                }}
              >
                /bookv2 Spec
              </span>
              <button
                type="button"
                onClick={() => {
                  setActive(null);
                  setShowList(false);
                }}
                aria-label="Close panel"
                style={{
                  background: "none",
                  border: "none",
                  color: "#FFFFFF",
                  cursor: "pointer",
                  padding: 4,
                }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#AEB5BF",
                marginBottom: 16,
              }}
            >
              {STEP_NAMES[currentStep] ?? `Step ${currentStep}`}
            </p>

            {!active && showList && (
              <div>
                <p
                  style={{
                    fontFamily: display,
                    fontSize: 22,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  All Callouts
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
                  {stepAnnotations.map((a) => (
                    <li key={a.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setActive(a);
                          setShowList(false);
                        }}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          display: "flex",
                          gap: 12,
                          alignItems: "flex-start",
                          padding: "10px 12px",
                          borderRadius: 8,
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#FFFFFF",
                          fontFamily: font,
                          cursor: "pointer",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            backgroundColor: "#E8670A",
                            color: "#FFFFFF",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: 11,
                            flexShrink: 0,
                          }}
                        >
                          {a.number}
                        </span>
                        <span style={{ flex: 1, minWidth: 0 }}>
                          <span style={{ display: "block", fontSize: 13, fontWeight: 600 }}>
                            {a.label}
                          </span>
                          <span
                            style={{
                              display: "block",
                              fontSize: 11,
                              color: "#AEB5BF",
                              textTransform: "uppercase",
                              letterSpacing: "0.06em",
                              marginTop: 2,
                            }}
                          >
                            {a.type}
                            {a.step === 0 ? " · chrome" : ""}
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {active && (
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setActive(null);
                    setShowList(true);
                  }}
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#AEB5BF",
                    background: "none",
                    border: "none",
                    padding: 0,
                    marginBottom: 14,
                    cursor: "pointer",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  ← All callouts for this step
                </button>

                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span
                    style={{
                      display: "inline-flex",
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      backgroundColor: "#E8670A",
                      color: "#FFFFFF",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: 13,
                    }}
                  >
                    {active.number}
                  </span>
                  <span
                    style={{
                      fontFamily: display,
                      fontSize: 22,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      lineHeight: 1.1,
                    }}
                  >
                    {active.label}
                  </span>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  <Chip>{active.type}</Chip>
                  {active.required === true && <Chip tone="orange">required</Chip>}
                  {active.required === false && <Chip tone="muted">optional</Chip>}
                </div>

                {active.validation && (
                  <Section label="Validation">{active.validation}</Section>
                )}
                {active.behavior && (
                  <Section label="Behavior">{active.behavior}</Section>
                )}
                {active.copyRationale && (
                  <Section label="Copy rationale">{active.copyRationale}</Section>
                )}
                {active.notes && <Section label="Notes">{active.notes}</Section>}

                <p
                  style={{
                    marginTop: 18,
                    fontSize: 11,
                    color: "#6B7280",
                    fontFamily: "ui-monospace, SFMono-Regular, monospace",
                  }}
                >
                  data-spec-id="{active.id}"
                </p>
              </div>
            )}
          </aside>
        </>
      )}
    </>
  );
};

const Chip = ({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "orange" | "muted" }) => {
  const bg =
    tone === "orange" ? "#E8670A" : tone === "muted" ? "rgba(255,255,255,0.06)" : "rgba(232,103,10,0.18)";
  const border =
    tone === "orange" ? "#E8670A" : tone === "muted" ? "rgba(255,255,255,0.12)" : "rgba(232,103,10,0.45)";
  const color = tone === "orange" ? "#FFFFFF" : tone === "muted" ? "#AEB5BF" : "#FFD7B5";
  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "4px 8px",
        borderRadius: 6,
        backgroundColor: bg,
        border: `1px solid ${border}`,
        color,
      }}
    >
      {children}
    </span>
  );
};

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 14 }}>
    <p
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "#E8670A",
        marginBottom: 4,
      }}
    >
      {label}
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.55, color: "#E8E6E3" }}>{children}</p>
  </div>
);

export default SpecOverlay;
