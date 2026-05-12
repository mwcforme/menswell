const COLORS = {
  navy: "#000814",
  cream: "#F5F1E8",
  muted: "rgba(245,241,232,0.55)",
};

const links: { label: string; href: string }[] = [
  { label: "Book a Visit", href: "#hero-form" },
  { label: "Call 866-344-4955", href: "tel:8663444955" },
];

export const New2Footer = () => (
  <footer style={{ background: COLORS.navy }} className="py-20">
    <div className="max-w-[1240px] mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 items-start">
      <div>
        <h3
          style={{
            fontFamily: "Oswald, sans-serif",
            color: COLORS.cream,
            fontSize: "clamp(32px, 4vw, 52px)",
            lineHeight: 1.05,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
          }}
        >
          3 Virginia Centers.<br />200+ Five-Star Reviews.<br />One Visit to Get Started.
        </h3>
        <div
          className="mt-8"
          style={{ color: COLORS.muted, fontFamily: "Inter, sans-serif", fontSize: 13, lineHeight: 1.6, maxWidth: 600 }}
        >
          Medically reviewed by licensed Virginia providers. Individual results vary. Information on this page is for educational purposes and is not a substitute for medical advice.
        </div>
      </div>
      <div className="flex flex-col items-start lg:items-end gap-4">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            style={{
              color: COLORS.cream,
              fontFamily: "Oswald, sans-serif",
              fontSize: 22,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
            }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </div>
    <div
      className="max-w-[1240px] mx-auto px-5 sm:px-6 mt-16 pt-6 flex flex-col sm:flex-row justify-between gap-3"
      style={{ borderTop: "1px solid rgba(245,241,232,0.08)", color: COLORS.muted, fontFamily: "Inter, sans-serif", fontSize: 12 }}
    >
      <span>© {new Date().getFullYear()} Men's Wellness Centers. All rights reserved.</span>
      <span>Privacy · Terms · Telehealth Consent</span>
    </div>
  </footer>
);
