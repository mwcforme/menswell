import { ArrowRight } from "lucide-react";

const COLORS = {
  cream: "#F5F1E8",
  navy: "#000814",
  orange: "#E8670A",
  muted: "rgba(0,8,20,0.65)",
  divider: "rgba(0,8,20,0.10)",
};

const services = [
  "Testosterone Replacement Therapy",
  "Erectile Dysfunction Care",
  "Weight Loss with GLP-1",
  "Peptide Therapy",
  "Wellness and Vitality",
  "Comprehensive Lab Panels",
];

export const New2Services = () => (
  <section style={{ background: COLORS.cream }} className="py-24 lg:py-32" id="services">
    <div className="max-w-[1240px] mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-24 items-start">
      {/* LEFT */}
      <div>
        <h2
          className="font-bold"
          style={{
            fontFamily: "Oswald, sans-serif",
            color: COLORS.navy,
            fontSize: "clamp(34px, 4.6vw, 60px)",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            textTransform: "uppercase",
          }}
        >
          One Team.{" "}
          <span style={{ borderBottom: `4px solid ${COLORS.orange}` }}>
            Every Part of Men's Health.
          </span>
        </h2>
        <p
          className="mt-7 max-w-[460px]"
          style={{
            color: COLORS.muted,
            fontFamily: "Inter, sans-serif",
            fontSize: 17,
            lineHeight: 1.65,
          }}
        >
          Physicians, PAs, and care coordinators under one roof. The same people manage your testosterone, weight, ED care, and labs. Walk into the same office. See the same provider. Build a plan that actually fits your life.
        </p>
      </div>

      {/* RIGHT — service list */}
      <div>
        {services.map((s, i) => (
          <a
            key={s}
            href="#hero-form"
            className="flex items-center justify-between py-5 group"
            style={{
              borderBottom: i === services.length - 1 ? "none" : `1px solid ${COLORS.divider}`,
              borderTop: i === 0 ? `1px solid ${COLORS.divider}` : "none",
              color: COLORS.navy,
              fontFamily: "Oswald, sans-serif",
              fontSize: "clamp(22px, 2.6vw, 32px)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              transition: "color 200ms ease, padding 200ms ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = COLORS.orange; e.currentTarget.style.paddingLeft = "8px"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = COLORS.navy; e.currentTarget.style.paddingLeft = "0"; }}
          >
            <span>{s}</span>
            <ArrowRight className="h-5 w-5" style={{ color: COLORS.orange }} />
          </a>
        ))}
      </div>
    </div>
  </section>
);
