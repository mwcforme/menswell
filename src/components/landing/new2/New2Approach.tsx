import { ArrowRight } from "lucide-react";

const COLORS = {
  cream: "#F5F1E8",
  navy: "#000814",
  orange: "#E8670A",
  muted: "rgba(0,8,20,0.65)",
};

const links = [
  "How a first visit works",
  "What testosterone testing covers",
  "Pricing and what's included",
];

export const New2Approach = () => (
  <section style={{ background: COLORS.cream }} className="py-24 lg:py-32" id="approach">
    <div className="max-w-[1100px] mx-auto px-5 sm:px-6 text-center">
      <div
        className="uppercase mb-6"
        style={{
          color: COLORS.orange,
          fontFamily: "Inter, sans-serif",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.18em",
        }}
      >
        Our Approach to Men's Care
      </div>
      <h2
        className="font-bold mx-auto"
        style={{
          fontFamily: "Oswald, sans-serif",
          color: COLORS.navy,
          fontSize: "clamp(36px, 5vw, 64px)",
          lineHeight: 1.05,
          letterSpacing: "-0.01em",
          textTransform: "uppercase",
          maxWidth: 900,
        }}
      >
        You don't need another app.{" "}
        <span style={{ borderBottom: `4px solid ${COLORS.orange}` }}>
          You need a team.
        </span>
      </h2>
      <p
        className="mt-8 mx-auto"
        style={{
          color: COLORS.muted,
          fontFamily: "Inter, sans-serif",
          fontSize: 18,
          lineHeight: 1.65,
          maxWidth: 720,
        }}
      >
        Apps push pills. Teams build plans. Yours starts with a real lab draw and a real conversation with a Virginia-licensed physician, backed by a PA and a care coordinator who pick up the phone when you call. No questionnaire-only prescribing. No 90-day delays. We adjust the plan as your body responds.
      </p>

      <div className="mt-12 flex flex-col items-center gap-4">
        {links.map((l) => (
          <a
            key={l}
            href="#hero-form"
            className="inline-flex items-center gap-2"
            style={{
              color: COLORS.orange,
              fontFamily: "Inter, sans-serif",
              fontSize: 17,
              fontWeight: 600,
            }}
          >
            {l} <ArrowRight className="h-4 w-4" />
          </a>
        ))}
      </div>
    </div>
  </section>
);
