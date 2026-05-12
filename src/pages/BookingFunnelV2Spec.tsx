import { Link } from "react-router-dom";
import { ArrowRight, Wrench, MousePointerClick, Eye, Layers } from "lucide-react";
import { SPEC_ANNOTATIONS, STEP_NAMES } from "@/components/booking-v2/spec/specAnnotations";

const font = "'Montserrat', sans-serif";
const headingFont = "'Bebas Neue', sans-serif";

// Editorial light palette — paper + ink with restrained accents
const PAPER = "#F7F4EF";        // warm off-white page bg
const PAPER_ALT = "#FFFFFF";    // section contrast
const INK = "#0B1029";          // primary text
const INK_SOFT = "#4B5563";     // secondary text
const HAIRLINE = "rgba(11,16,41,0.12)";
const ORANGE = "#E8670A";

// Aliases mapped to new editorial tokens
const NAVY = PAPER_ALT;         // was dark surface; now white card
const NAVY_DEEP = PAPER;        // was darkest bg; now warm paper
const MUTED = INK_SOFT;         // body muted now reads on light
const CREAM = PAPER;

// Entry points → Booking funnel
const entryPoints = [
  { group: "Wordpress Site", color: "#3B82F6", items: ["Homepage /", "How It Works", "Providers", "Locations Hub", "Service Pages"] },
  { group: "GHL Landing Pages", color: "#22C55E", items: ["General LP", "TRT LP", "ED LP", "Weight Loss LP", "Location - Richmond", "Location - Newport News", "Location - Virginia Beach"] },
];

// Funnel phases
const phases = [
  { name: "YOU", steps: [1], color: ORANGE, desc: "Identity + location captured." },
  { name: "YOUR VISIT", steps: [2, 3, 4], color: ORANGE, desc: "Clinical qualification: concern, duration, prior treatment." },
  { name: "YOUR TIME", steps: [5, 6], color: ORANGE, desc: "Email + appointment slot." },
  { name: "CONFIRMED", steps: [7, 8], color: ORANGE, desc: "Double opt-in verify, then confirmation screen." },
];

// Step-by-step
const stepDetails: Array<{ n: number; title: string; sub: string; bullets: string[]; outcome: string }> = [
  {
    n: 1,
    title: "Primary Concern",
    sub: "Card-based qualification of clinical intent.",
    bullets: [
      "Low Energy / Fatigue",
      "Low Sex Drive / ED",
      "Weight Gain",
      "Mood / Focus",
      "Other / Not Sure",
    ],
    outcome: "→ auto-advances 300ms after card tap",
  },
  {
    n: 2,
    title: "Duration",
    sub: "How long has this been going on?",
    bullets: ["< 6 months", "6–12 months", "1–2 years", "More than 2 years"],
    outcome: "→ auto-advances 300ms after card tap",
  },
  {
    n: 3,
    title: "Prior Treatment",
    sub: "Have you been treated for this before?",
    bullets: ["Yes (treated previously)", "No (first-time)"],
    outcome: "→ auto-advances 300ms after selection",
  },
  {
    n: 4,
    title: "Email",
    sub: "Captured late to lower drop-off.",
    bullets: ["Email (required, regex-validated)", "Stored to send confirmation + double opt-in link"],
    outcome: "→ advances to calendar on CTA click",
  },
  {
    n: 5,
    title: "Calendar & Time",
    sub: "Date picker + time slot grid.",
    bullets: [
      "Month navigator (prev/next)",
      "Calendar grid (disabled past + closed days)",
      "Time slots (morning / afternoon)",
      "SMS reminder toggle (default ON)",
      "Summary line shows selected date + time",
    ],
    outcome: "→ advances to Verify on Confirm",
  },
  {
    n: 6,
    title: "Verify (Double Opt-In)",
    sub: "Email + SMS verification screen.",
    bullets: [
      "Email card with masked address",
      "Phone card with masked number",
      "Resend link (rate-limited)",
      "User must click link in email OR reply YES to SMS",
    ],
    outcome: "→ advances to Confirmed once a verification webhook fires",
  },
  {
    n: 7,
    title: "Confirmed",
    sub: "Animated success + appointment summary.",
    bullets: [
      "Checkmark animation",
      "Summary: date, time, location, provider",
      "Add to Google / Apple / Outlook calendar",
      "Health intake form upsell (link to /intake)",
      "What to expect block + referral CTA + trust footer",
    ],
    outcome: "End of funnel.",
  },
];

const Pill = ({ children, bg = ORANGE, fg = "#FFFFFF" }: { children: React.ReactNode; bg?: string; fg?: string }) => (
  <span
    style={{
      display: "inline-block",
      padding: "4px 10px",
      borderRadius: 999,
      backgroundColor: bg,
      color: fg,
      fontFamily: font,
      fontWeight: 700,
      fontSize: 11,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    }}
  >
    {children}
  </span>
);

const SectionHeading = ({ eyebrow, title }: { eyebrow?: string; title: string }) => (
  <div className="mb-10">
    {eyebrow && (
      <div style={{ fontFamily: font, fontWeight: 700, fontSize: 12, letterSpacing: "0.18em", color: ORANGE, textTransform: "uppercase", marginBottom: 12 }}>
        {eyebrow}
      </div>
    )}
    <h2 className="uppercase" style={{ fontFamily: headingFont, fontSize: "clamp(32px, 5vw, 56px)", color: INK, letterSpacing: "0.04em", lineHeight: 1.05 }}>
      {title}
    </h2>
  </div>
);

// ────────────────────────────────────────────────────────
// Visual flow chart (SVG + nodes)
// ────────────────────────────────────────────────────────
const StepNode = ({ n, label, success }: { n: number; label: string; success?: boolean }) => (
  <div
    style={{
      backgroundColor: success ? "#F0FDF4" : PAPER_ALT,
      border: `1.5px solid ${success ? "#16A34A" : ORANGE}`,
      borderRadius: 10,
      padding: "10px 12px",
      minWidth: 110,
      textAlign: "center",
    }}
  >
    <div style={{ fontFamily: headingFont, fontSize: 22, color: success ? "#16A34A" : ORANGE, lineHeight: 1 }}>
      {String(n).padStart(2, "0")}
    </div>
    <div style={{ fontFamily: font, fontWeight: 600, fontSize: 11, color: INK, marginTop: 4, lineHeight: 1.3 }}>
      {label}
    </div>
  </div>
);

const Arrow = () => <div className="flex items-center" style={{ color: INK_SOFT, fontSize: 14 }}>→</div>;

const LegendDot = ({ color, label }: { color: string; label: string }) => (
  <span className="inline-flex items-center gap-2">
    <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: color, display: "inline-block" }} />
    {label}
  </span>
);

const FlowChart = () => {
  const sources = [
    { label: "Wordpress Site", color: "#3B82F6", sub: "Captures Name · Phone · Location, then hands off to /bookv2" },
    { label: "GHL Landing Pages", color: "#22C55E", sub: "Captures Name · Phone · Location, then hands off to /bookv2" },
  ];

  return (
    <section style={{ padding: "80px 24px 40px", backgroundColor: PAPER }}>
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading eyebrow="Architecture · Flow Chart" title="The Funnel at a Glance" />

        <div
          style={{
            backgroundColor: PAPER_ALT,
            border: `1px solid ${HAIRLINE}`,
            borderRadius: 16,
            padding: "32px 24px",
            overflowX: "auto",
          }}
        >
          {/* Sources */}
          <div className="grid gap-4 mx-auto" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))", maxWidth: 720 }}>
            {sources.map((s) => (
              <div
                key={s.label}
                style={{
                  borderLeft: `4px solid ${s.color}`,
                  backgroundColor: PAPER,
                  padding: "14px 18px",
                  borderRadius: 8,
                }}
              >
                <div style={{ fontFamily: font, fontWeight: 700, fontSize: 13, color: s.color, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {s.label}
                </div>
                <div style={{ fontFamily: font, fontSize: 12, color: INK_SOFT, marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* V-converge connectors */}
          <div className="my-6 flex justify-center">
            <svg width="320" height="56" viewBox="0 0 320 56" style={{ overflow: "visible" }}>
              <line x1="80" y1="0" x2="160" y2="48" stroke={INK_SOFT} strokeWidth="1" />
              <line x1="240" y1="0" x2="160" y2="48" stroke={INK_SOFT} strokeWidth="1" />
              <polygon points="160,56 154,46 166,46" fill={ORANGE} />
            </svg>
          </div>

          {/* Convergence node */}
          <div className="flex justify-center" style={{ marginBottom: 8 }}>
            <div
              style={{
                backgroundColor: ORANGE,
                color: "#FFFFFF",
                fontFamily: headingFont,
                fontSize: 20,
                letterSpacing: "0.06em",
                padding: "12px 28px",
                borderRadius: 999,
                textTransform: "uppercase",
              }}
            >
              /bookv2
            </div>
          </div>

          {/* Down arrow */}
          <div className="my-4 flex justify-center">
            <svg width="2" height="40" style={{ overflow: "visible" }}>
              <line x1="1" y1="0" x2="1" y2="36" stroke={INK_SOFT} strokeWidth="1" strokeDasharray="3 3" />
              <polygon points="1,40 -4,32 6,32" fill={ORANGE} />
            </svg>
          </div>

          {/* Phase swimlanes */}
          <div className="grid gap-3" style={{ gridTemplateColumns: "3fr 2fr 2fr", minWidth: 680 }}>
            {["YOUR VISIT", "YOUR TIME", "CONFIRMED"].map((phase) => (
              <div
                key={phase}
                style={{
                  fontFamily: headingFont,
                  fontSize: 14,
                  letterSpacing: "0.12em",
                  color: ORANGE,
                  textAlign: "center",
                  padding: "8px 0",
                  borderBottom: `2px solid ${ORANGE}`,
                  textTransform: "uppercase",
                }}
              >
                {phase}
              </div>
            ))}

            <div className="flex justify-center gap-2 pt-4">
              <StepNode n={1} label="Concern" />
              <Arrow />
              <StepNode n={2} label="Duration" />
              <Arrow />
              <StepNode n={3} label="Prior Tx" />
            </div>
            <div className="flex justify-center gap-2 pt-4">
              <StepNode n={4} label="Email" />
              <Arrow />
              <StepNode n={5} label="Calendar" />
            </div>
            <div className="flex justify-center gap-2 pt-4">
              <StepNode n={6} label="Verify" />
              <Arrow />
              <StepNode n={7} label="Confirmed" success />
            </div>
          </div>

          {/* Down to outcome */}
          <div className="my-6 flex justify-center">
            <svg width="2" height="40" style={{ overflow: "visible" }}>
              <line x1="1" y1="0" x2="1" y2="36" stroke={INK_SOFT} strokeWidth="1" />
              <polygon points="1,40 -4,32 6,32" fill="#16A34A" />
            </svg>
          </div>

          <div className="flex justify-center">
            <div
              style={{
                border: `1px solid #16A34A`,
                backgroundColor: "#F0FDF4",
                color: "#15803D",
                fontFamily: headingFont,
                fontSize: 18,
                letterSpacing: "0.08em",
                padding: "12px 24px",
                borderRadius: 8,
                textTransform: "uppercase",
              }}
            >
              ✓ Lead → GHL · Appointment booked · Intake upsell
            </div>
          </div>

          {/* Legend */}
          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
            style={{ fontFamily: font, fontSize: 12, color: INK_SOFT, paddingTop: 16, borderTop: `1px solid ${HAIRLINE}` }}
          >
            <LegendDot color={ORANGE} label="Funnel step" />
            <LegendDot color="#3B82F6" label="Wordpress entry" />
            <LegendDot color="#22C55E" label="GHL entry" />
            <LegendDot color="#16A34A" label="Success" />
            <span>·</span>
            <span>Solid = sequential · Dashed = system handoff</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const BookingFunnelV2Spec = () => {
  return (
    <div style={{ backgroundColor: PAPER, minHeight: "100vh", color: INK }}>
      {/* Top bar */}
      <header
        style={{
          padding: "20px 24px",
          borderBottom: `1px solid ${HAIRLINE}`,
          backgroundColor: PAPER_ALT,
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between">
          <div className="flex items-center gap-3">
            <Wrench style={{ color: ORANGE }} className="h-5 w-5" />
            <span style={{ fontFamily: font, fontWeight: 700, fontSize: 13, letterSpacing: "0.16em", color: "#FFFFFF", textTransform: "uppercase" }}>
              /bookv2 — Mockup Spec for Dev Team
            </span>
          </div>
          <Link
            to="/bookv2?spec=1"
            style={{
              backgroundColor: ORANGE,
              color: "#FFFFFF",
              padding: "10px 18px",
              borderRadius: 999,
              fontFamily: font,
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Open Live Funnel <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section style={{ padding: "80px 24px 60px" }}>
        <div className="mx-auto max-w-[1100px]">
          <Pill>Spec Document · v2</Pill>
          <h1
            className="mt-5 uppercase"
            style={{
              fontFamily: headingFont,
              fontSize: "clamp(44px, 7vw, 88px)",
              color: INK,
              letterSpacing: "0.02em",
              lineHeight: 1,
            }}
          >
            The /bookv2 Booking Funnel
          </h1>
          <p
            className="mt-6 max-w-[720px]"
            style={{ fontFamily: font, fontSize: 17, lineHeight: 1.6, color: MUTED }}
          >
            A progressive 8-step lead-capture and appointment funnel for Men's Wellness Centers.
            This page is a clickable spec: every screen, field, validation rule, behavior and copy
            decision is annotated on the live funnel via Spec Mode (already enabled by default).
          </p>

          {/* Quick reference */}
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { icon: Layers, title: "8 steps · 4 phases", desc: "YOU → YOUR VISIT → YOUR TIME → CONFIRMED" },
              { icon: MousePointerClick, title: "Auto-advance on cards", desc: "Steps 2, 3, 4 advance 300ms after tap. No CTA needed." },
              { icon: Eye, title: "Spec Mode default ON", desc: "Numbered orange badges anchor every annotated element." },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                style={{
                  backgroundColor: PAPER_ALT,
                  border: `1px solid ${HAIRLINE}`,
                  borderRadius: 16,
                  padding: 24,
                }}
              >
                <Icon className="h-6 w-6" style={{ color: ORANGE }} />
                <div className="mt-3" style={{ fontFamily: font, fontWeight: 700, fontSize: 15, color: INK }}>{title}</div>
                <div className="mt-1" style={{ fontFamily: font, fontSize: 13, color: MUTED, lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual flow chart */}
      <FlowChart />

      {/* Flow diagram (cards detail) */}
      <section style={{ padding: "60px 24px", backgroundColor: PAPER_ALT }}>
        <div className="mx-auto max-w-[1280px]">
          <SectionHeading eyebrow="Architecture · Detail" title="Traffic Flow → Funnel → Confirmation" />

          {/* Entry points row */}
          <div className="mb-8">
            <div style={{ fontFamily: font, fontWeight: 700, fontSize: 12, letterSpacing: "0.14em", color: MUTED, textTransform: "uppercase", marginBottom: 16 }}>
              ① Entry points (all routes that send traffic to /bookv2)
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {entryPoints.map((ep) => (
                <div
                  key={ep.group}
                  style={{
                    backgroundColor: PAPER_ALT,
                    border: `1px solid ${HAIRLINE}`,
                    borderTop: `3px solid ${ep.color}`,
                    borderRadius: 12,
                    padding: 20,
                  }}
                >
                  <div style={{ fontFamily: font, fontWeight: 700, fontSize: 13, color: ep.color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
                    {ep.group}
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {ep.items.map((it) => (
                      <li
                        key={it}
                        style={{
                          fontFamily: font,
                          fontSize: 13,
                          color: INK,
                          padding: "6px 0",
                          borderBottom: `1px solid ${HAIRLINE}`,
                        }}
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Down arrow */}
          <div className="my-6 flex justify-center">
            <div style={{ fontFamily: font, fontSize: 24, color: ORANGE }}>↓</div>
          </div>

          {/* CTA convergence */}
          <div
            className="mx-auto mb-8 max-w-[640px] text-center"
            style={{
              backgroundColor: ORANGE,
              borderRadius: 16,
              padding: "20px 24px",
              fontFamily: headingFont,
              fontSize: 22,
              letterSpacing: "0.06em",
              color: "#FFFFFF",
              textTransform: "uppercase",
            }}
          >
            All "Book My Free Consultation" CTAs → /bookv2
          </div>

          <div className="my-6 flex justify-center">
            <div style={{ fontFamily: font, fontSize: 24, color: ORANGE }}>↓</div>
          </div>

          {/* Phases */}
          <div style={{ fontFamily: font, fontWeight: 700, fontSize: 12, letterSpacing: "0.14em", color: MUTED, textTransform: "uppercase", marginBottom: 16 }}>
            ② Funnel phases (8 steps grouped into 4 narrative chunks)
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            {phases.map((ph) => (
              <div
                key={ph.name}
                style={{
                  backgroundColor: PAPER_ALT,
                  borderRadius: 14,
                  padding: 20,
                  border: `1px solid ${HAIRLINE}`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, backgroundColor: ph.color }} />
                <div style={{ fontFamily: headingFont, fontSize: 26, color: INK, letterSpacing: "0.04em", lineHeight: 1 }}>{ph.name}</div>
                <div className="mt-2" style={{ fontFamily: font, fontSize: 12, color: ORANGE, fontWeight: 700, letterSpacing: "0.1em" }}>
                  STEP{ph.steps.length > 1 ? "S" : ""} {ph.steps.join(", ")}
                </div>
                <div className="mt-3" style={{ fontFamily: font, fontSize: 13, color: MUTED, lineHeight: 1.5 }}>
                  {ph.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="my-6 flex justify-center">
            <div style={{ fontFamily: font, fontSize: 24, color: ORANGE }}>↓</div>
          </div>

          {/* End state */}
          <div
            className="mx-auto max-w-[640px] text-center"
            style={{
              backgroundColor: PAPER_ALT,
              border: "1px solid #16A34A",
              borderRadius: 16,
              padding: "20px 24px",
            }}
          >
            <div style={{ fontFamily: headingFont, fontSize: 22, color: "#15803D", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              ✓ Lead booked + double opt-in verified
            </div>
            <div className="mt-2" style={{ fontFamily: font, fontSize: 13, color: INK_SOFT }}>
              Pushed to GHL with appointment + intake-form upsell shown.
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-step */}
      <section style={{ padding: "80px 24px" }}>
        <div className="mx-auto max-w-[1100px]">
          <SectionHeading eyebrow="Screen-by-screen" title="The 8 Steps in Detail" />

          <div>
            {stepDetails.map((s, idx) => (
              <div
                key={s.n}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr",
                  gap: 32,
                  padding: "40px 0",
                  borderTop: idx === 0 ? `1px solid ${HAIRLINE}` : "none",
                  borderBottom: `1px solid ${HAIRLINE}`,
                  alignItems: "start",
                }}
              >
                <div
                  style={{
                    fontFamily: headingFont,
                    fontSize: 56,
                    color: ORANGE,
                    lineHeight: 0.9,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {String(s.n).padStart(2, "0")}
                </div>
                <div>
                  <h3
                    className="uppercase"
                    style={{
                      fontFamily: headingFont,
                      fontSize: 28,
                      color: INK,
                      letterSpacing: "0.04em",
                      lineHeight: 1.05,
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="mt-2"
                    style={{ fontFamily: font, fontSize: 14, color: MUTED, lineHeight: 1.6 }}
                  >
                    {s.sub}
                  </p>
                  <ul className="mt-5 space-y-1.5">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        style={{
                          fontFamily: font,
                          fontSize: 14,
                          color: INK,
                          paddingLeft: 18,
                          position: "relative",
                          lineHeight: 1.6,
                        }}
                      >
                        <span style={{ position: "absolute", left: 0, color: ORANGE }}>›</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div
                    className="mt-5"
                    style={{
                      fontFamily: font,
                      fontWeight: 600,
                      fontSize: 12,
                      color: MUTED,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.outcome}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spec mode usage */}
      <section style={{ padding: "60px 24px", backgroundColor: PAPER_ALT }}>
        <div className="mx-auto max-w-[1100px]">
          <SectionHeading eyebrow="How to use this spec" title="Spec Mode on /bookv2" />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div
              style={{
                backgroundColor: PAPER_ALT,
                border: `1px solid ${HAIRLINE}`,
                borderRadius: 14,
                padding: 24,
              }}
            >
              <div style={{ fontFamily: font, fontWeight: 700, fontSize: 14, color: INK, marginBottom: 10 }}>
                ① Open the live funnel
              </div>
              <p style={{ fontFamily: font, fontSize: 14, color: MUTED, lineHeight: 1.6 }}>
                Spec Mode is on by default. You'll see numbered orange badges floating next to every annotated element across all 8 steps. Toggle it off via the pill in the bottom-right corner if you want a clean preview.
              </p>
            </div>
            <div
              style={{
                backgroundColor: PAPER_ALT,
                border: `1px solid ${HAIRLINE}`,
                borderRadius: 14,
                padding: 24,
              }}
            >
              <div style={{ fontFamily: font, fontWeight: 700, fontSize: 14, color: INK, marginBottom: 10 }}>
                ② Click any badge
              </div>
              <p style={{ fontFamily: font, fontSize: 14, color: MUTED, lineHeight: 1.6 }}>
                A right-side panel slides in with the field's spec: type, validation, behavior, copy rationale, and notes. Press Esc or click outside to close.
              </p>
            </div>
            <div
              style={{
                backgroundColor: PAPER_ALT,
                border: `1px solid ${HAIRLINE}`,
                borderRadius: 14,
                padding: 24,
              }}
            >
              <div style={{ fontFamily: font, fontWeight: 700, fontSize: 14, color: INK, marginBottom: 10 }}>
                ③ Force ON / OFF via URL
              </div>
              <p style={{ fontFamily: font, fontSize: 14, color: MUTED, lineHeight: 1.6 }}>
                Append <code style={{ color: ORANGE }}>?spec=1</code> to force spec mode on, or <code style={{ color: ORANGE }}>?spec=0</code> to force it off — useful for screen-shotting clean states.
              </p>
            </div>
            <div
              style={{
                backgroundColor: PAPER_ALT,
                border: `1px solid ${HAIRLINE}`,
                borderRadius: 14,
                padding: 24,
              }}
            >
              <div style={{ fontFamily: font, fontWeight: 700, fontSize: 14, color: INK, marginBottom: 10 }}>
                ④ Read the registry
              </div>
              <p style={{ fontFamily: font, fontSize: 14, color: MUTED, lineHeight: 1.6 }}>
                Every annotation lives in <code style={{ color: ORANGE }}>src/components/booking-v2/spec/specAnnotations.ts</code> — a single typed file you can grep, export, or paste into Linear / Notion.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/bookv2?spec=1"
              style={{
                backgroundColor: ORANGE,
                color: "#FFFFFF",
                padding: "16px 32px",
                borderRadius: 999,
                fontFamily: font,
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              Launch Spec-Annotated Funnel <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Annotation index */}
      <section style={{ padding: "60px 24px" }}>
        <div className="mx-auto max-w-[1100px]">
          <SectionHeading eyebrow="Reference" title={`Annotation Registry (${SPEC_ANNOTATIONS.length} entries)`} />
          <p style={{ fontFamily: font, fontSize: 14, color: MUTED, lineHeight: 1.6, marginBottom: 32, maxWidth: 720 }}>
            Flat list of every annotation for offline review. Each entry corresponds to a numbered badge on the live funnel.
          </p>

          {Object.entries(STEP_NAMES).map(([stepKey, stepName]) => {
            const step = Number(stepKey);
            const items = SPEC_ANNOTATIONS.filter((a) => a.step === step);
            if (items.length === 0) return null;
            return (
              <div key={step} className="mb-8">
                <div
                  style={{
                    fontFamily: headingFont,
                    fontSize: 22,
                    color: INK,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    paddingBottom: 10,
                    borderBottom: `2px solid ${ORANGE}`,
                    marginBottom: 14,
                  }}
                >
                  {stepName}
                  <span style={{ fontFamily: font, fontSize: 12, color: MUTED, marginLeft: 12, letterSpacing: 0, textTransform: "none" }}>
                    {items.length} annotation{items.length === 1 ? "" : "s"}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {items.map((a) => (
                    <div
                      key={a.id}
                      style={{
                        backgroundColor: PAPER_ALT,
                        border: `1px solid ${HAIRLINE}`,
                        borderRadius: 10,
                        padding: "12px 16px",
                        display: "grid",
                        gridTemplateColumns: "32px 1fr auto",
                        gap: 14,
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          backgroundColor: ORANGE,
                          color: "#FFFFFF",
                          fontFamily: font,
                          fontWeight: 700,
                          fontSize: 12,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {a.number}
                      </div>
                      <div>
                        <div style={{ fontFamily: font, fontWeight: 700, fontSize: 14, color: INK }}>{a.label}</div>
                        <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginTop: 2 }}>
                          <code style={{ color: ORANGE }}>{a.id}</code>
                          {a.required && <span style={{ marginLeft: 10, color: "#F87171" }}>· required</span>}
                        </div>
                      </div>
                      <Pill bg="rgba(232,103,10,0.12)" fg={ORANGE}>{a.type}</Pill>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "32px 24px",
          borderTop: `1px solid ${HAIRLINE}`,
          backgroundColor: PAPER_ALT,
          textAlign: "center",
        }}
      >
        <div style={{ fontFamily: font, fontSize: 12, color: MUTED, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Internal spec · Men's Wellness Centers · /bookv2 v2
        </div>
      </footer>
    </div>
  );
};

export default BookingFunnelV2Spec;
