import { ArrowRight } from "lucide-react";

const COLORS = {
  navy: "#000814",
  cream: "#F5F1E8",
  card: "#EFEAE0",
  orange: "#E8670A",
  muted: "rgba(0,8,20,0.65)",
};

const cards = [
  {
    eyebrow: "VISIT EXPERIENCE",
    stat: "60min",
    title: "Same-day labs and a real plan",
    body: "On-site testosterone testing, a face-to-face physician visit, and a personalized plan in a single appointment.",
    cta: "See how the visit works",
  },
  {
    eyebrow: "CLINICAL OUTCOMES",
    stat: "200+",
    title: "Verified Google reviews, 4.9 avg",
    body: "Men across Virginia trust us to help them feel like themselves again. Individual results vary.",
    cta: "Read the reviews",
  },
  {
    eyebrow: "ACCESS",
    stat: "0",
    title: "Referrals required to get started",
    body: "Cash-pay model. No insurance hoops. Walk in, get tested, get answers the same day.",
    cta: "How pricing works",
  },
  {
    eyebrow: "YOUR CARE TEAM",
    stat: "1:1",
    title: "Physician, PA, and coordinator on your case",
    body: "You see the same providers every visit. They know your labs, your goals, and what you tried last month. No app, no chatbot, no rotating prescribers.",
    cta: "Meet the team",
  },
];

export const New2POV = () => (
  <section style={{ background: COLORS.cream }} className="py-24 lg:py-32">
    <div className="max-w-[1240px] mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20">
      {/* LEFT */}
      <div>
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
          Our Point of View
        </div>
        <h2
          className="font-bold"
          style={{
            fontFamily: "Oswald, sans-serif",
            color: COLORS.navy,
            fontSize: "clamp(34px, 4.4vw, 60px)",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            textTransform: "uppercase",
          }}
        >
          A care team beats a care app. Every time.
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
          Telehealth apps prescribe blind. Big clinics treat you like a chart number. We do it differently. A physician, PA, and care coordinator who all know your name. Real labs, real conversations, real follow-through. Same day. Right here in Virginia.
        </p>
        <a
          href="#hero-form"
          className="inline-flex items-center gap-2 mt-8"
          style={{
            color: COLORS.orange,
            fontFamily: "Inter, sans-serif",
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          See how a visit works <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      {/* RIGHT — 2x2 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {cards.map((c) => (
          <div
            key={c.eyebrow}
            className="p-7 flex flex-col"
            style={{ background: COLORS.card, borderRadius: 12 }}
          >
            <div
              className="uppercase mb-5"
              style={{
                color: COLORS.orange,
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.16em",
              }}
            >
              {c.eyebrow}
            </div>
            <div
              style={{
                color: COLORS.orange,
                fontFamily: "Oswald, sans-serif",
                fontSize: "clamp(48px, 5vw, 72px)",
                lineHeight: 0.95,
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              {c.stat}
            </div>
            <div
              style={{
                color: COLORS.navy,
                fontFamily: "Inter, sans-serif",
                fontSize: 17,
                fontWeight: 700,
                lineHeight: 1.3,
                marginBottom: 10,
              }}
            >
              {c.title}
            </div>
            <p
              style={{
                color: COLORS.muted,
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                lineHeight: 1.55,
                flexGrow: 1,
              }}
            >
              {c.body}
            </p>
            <a
              href="#hero-form"
              className="inline-flex items-center gap-1.5 mt-5"
              style={{
                color: COLORS.orange,
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {c.cta} <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);
