import { ArrowRight } from "lucide-react";

const COLORS = {
  cream: "#F5F1E8",
  navy: "#000814",
  orange: "#E8670A",
  orangeLight: "#F97316",
  card: "#FFFFFF",
  muted: "rgba(0,8,20,0.65)",
};

const ctaCards = [
  {
    title: "Book Your First Visit",
    body: "Same-day labs, face-to-face physician, plan built by your care team. Your first visit is on us.",
    cta: "Get started",
    href: "#hero-form",
  },
  {
    title: "Talk to Our Team",
    body: "Questions about cost, what's tested, or what to expect? Call us. A real person on our care team picks up.",
    cta: "Call 866-344-4955",
    href: "tel:8663444955",
  },
];

export const New2BigCTA = () => (
  <section style={{ background: COLORS.cream }} className="pb-24 lg:pb-32">
    <div className="max-w-[1240px] mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-center">
      {/* LEFT — stacked CTA cards */}
      <div className="flex flex-col gap-5 order-2 lg:order-1">
        {ctaCards.map((c) => (
          <div
            key={c.title}
            className="p-8"
            style={{ background: COLORS.card, borderRadius: 16, boxShadow: "0 4px 30px rgba(0,8,20,0.06)" }}
          >
            <h3
              style={{
                fontFamily: "Oswald, sans-serif",
                color: COLORS.navy,
                fontSize: 26,
                fontWeight: 700,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              {c.title}
            </h3>
            <p
              style={{
                color: COLORS.muted,
                fontFamily: "Inter, sans-serif",
                fontSize: 15,
                lineHeight: 1.6,
                marginBottom: 18,
              }}
            >
              {c.body}
            </p>
            <a
              href={c.href}
              className="inline-flex items-center gap-2"
              style={{
                color: COLORS.orange,
                fontFamily: "Inter, sans-serif",
                fontSize: 15,
                fontWeight: 700,
              }}
            >
              {c.cta} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>

      {/* RIGHT — huge orange display */}
      <div className="order-1 lg:order-2">
        <div
          style={{
            fontFamily: "Oswald, sans-serif",
            background: `linear-gradient(135deg, ${COLORS.orangeLight} 0%, ${COLORS.orange} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize: "clamp(80px, 13vw, 200px)",
            lineHeight: 0.88,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
          }}
        >
          Let's<br />Get<br />Going.
        </div>
      </div>
    </div>
  </section>
);
