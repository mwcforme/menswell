import { Check, Star, ArrowRight } from "lucide-react";
import { TRTHeroForm } from "@/components/landing/trt/TRTHeroForm";

const COLORS = {
  navyDeep: "#000814",
  cream: "#F5F1E8",
  orange: "#E8670A",
  orangeLight: "#F97316",
  gold: "#C9A961",
};

const trustChecks = [
  "No referral needed",
  "Same/next-day visits",
  "Face-to-face physician",
  "Licensed VA providers",
];

const NOISE_BG =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export const New2Hero = () => {
  const scrollToForm = () => {
    document.getElementById("hero-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden flex items-center"
      style={{ background: COLORS.navyDeep, minHeight: "92vh" }}
    >
      {/* Grain texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.06, backgroundImage: NOISE_BG, backgroundSize: "220px 220px" }}
      />

      {/* Subtle orange radial glow top-right */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 85% 10%, rgba(232,103,10,0.18) 0%, rgba(0,8,20,0) 60%)",
        }}
      />

      {/* Vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-5 sm:px-6 pt-28 pb-16 lg:pt-32 lg:pb-24 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-20 items-center">
        {/* LEFT */}
        <div>
          <div
            className="inline-block mb-6 uppercase"
            style={{
              color: COLORS.orange,
              fontFamily: "Inter, sans-serif",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.18em",
            }}
          >
            Testosterone Therapy. Virginia Centers.
          </div>

          <h1
            className="font-bold uppercase"
            style={{
              fontFamily: "Oswald, 'Bebas Neue', Anton, sans-serif",
              fontSize: "clamp(44px, 6.2vw, 88px)",
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
              color: COLORS.cream,
              fontWeight: 700,
            }}
          >
            Get Your Edge Back.{" "}
            <span
              style={{
                color: COLORS.orange,
                textDecoration: "underline",
                textDecorationColor: COLORS.orange,
                textDecorationThickness: "0.08em",
                textUnderlineOffset: "0.12em",
                textDecorationSkipInk: "none",
              }}
            >
              In One Visit.
            </span>
          </h1>

          <p
            className="mt-7 max-w-[540px]"
            style={{
              color: "rgba(245,241,232,0.72)",
              fontFamily: "Inter, sans-serif",
              fontSize: 18,
              lineHeight: 1.6,
            }}
          >
            No app. No questionnaire. A real Virginia care team. Same-day labs, a face-to-face physician, and a plan built around you. Your first visit is on us.
          </p>

          <div className="mt-6 flex items-center gap-3" style={{ fontFamily: "Inter, sans-serif" }}>
            <span className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4" fill={COLORS.gold} stroke={COLORS.gold} />
              ))}
            </span>
            <span style={{ color: "rgba(245,241,232,0.65)", fontSize: 13 }}>
              4.9 from 200+ verified Google reviews
            </span>
          </div>

          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 max-w-[560px]">
            {trustChecks.map((t) => (
              <li
                key={t}
                className="flex items-center gap-2.5"
                style={{ color: COLORS.cream, fontFamily: "Inter, sans-serif" }}
              >
                <Check className="h-[18px] w-[18px] flex-shrink-0" strokeWidth={3} style={{ color: COLORS.orange }} />
                <span style={{ fontSize: 15, fontWeight: 500 }}>{t}</span>
              </li>
            ))}
          </ul>

          {/* Mobile primary CTA */}
          <button
            onClick={scrollToForm}
            className="lg:hidden mt-8 inline-flex items-center justify-center gap-2 w-full uppercase font-bold cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
            style={{
              height: 56,
              background: `linear-gradient(135deg, ${COLORS.orangeLight} 0%, ${COLORS.orange} 100%)`,
              color: "#FFFFFF",
              fontSize: 14,
              border: "none",
              borderRadius: 999,
              letterSpacing: "0.1em",
              fontFamily: "Inter, sans-serif",
              boxShadow: "0 10px 30px rgba(232,103,10,0.35)",
            }}
          >
            Book My Consult <ArrowRight className="h-4 w-4" />
          </button>

          <div
            className="mt-7"
            style={{ color: "rgba(245,241,232,0.50)", fontFamily: "Inter, sans-serif", fontSize: 12 }}
          >
            Medically reviewed by licensed Virginia providers. Individual results vary.
          </div>
        </div>

        {/* RIGHT — form */}
        <div id="hero-form" className="w-full flex lg:justify-end">
          <TRTHeroForm />
        </div>
      </div>
    </section>
  );
};
