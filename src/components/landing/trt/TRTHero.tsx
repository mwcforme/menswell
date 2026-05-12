import { Check, Star } from "lucide-react";
import { TRTHeroForm } from "./TRTHeroForm";

const trustChecks = [
  "No referral needed",
  "Same/next-day visits",
  "Face-to-face physician",
  "Licensed VA providers",
];

const COLORS = {
  navyDeep: "#0B1029",
  navy: "#1B2B4B",
  cream: "#F5F0EB",
  orange: "#E8670A",
  gold: "#C9A961",
};

export const TRTHero = () => {
  const scrollToForm = () => {
    document.getElementById("hero-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden flex items-start lg:items-center"
      style={{
        background: COLORS.navyDeep,
        minHeight: 720,
      }}
    >
      <a
        href="#hero-form"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:bg-white focus:text-black focus:rounded"
      >
        Skip to lead form
      </a>

      {/* Grain texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.06,
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "220px 220px",
        }}
      />

      {/* Subtle orange radial glow top-right */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 85% 10%, rgba(232,103,10,0.18) 0%, rgba(11,16,41,0) 60%)",
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

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 sm:px-6 pt-24 pb-12 lg:pt-32 lg:pb-24 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-16 items-center">
        {/* LEFT */}
        <div>
          <h1
            className="font-bold uppercase"
            style={{
              fontFamily: "Oswald, 'Bebas Neue', Anton, sans-serif",
              fontSize: "clamp(48px, 6vw, 96px)",
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
              color: COLORS.cream,
              fontWeight: 700,
            }}
          >
            Get Your Edge Back.
            <br />
            <span style={{ color: COLORS.orange }}>In One Visit.</span>
          </h1>

          <p
            className="mt-6 max-w-[520px]"
            style={{
              color: "rgba(245,240,235,0.85)",
              fontFamily: "Inter, sans-serif",
              fontSize: 18,
              lineHeight: 1.5,
            }}
          >
            Same-day labs, a face-to-face Virginia physician, and a personalized plan. Your first visit is on us.
          </p>

          <div
            className="mt-5 flex flex-col items-start gap-1.5"
            style={{ color: COLORS.cream, fontFamily: "Inter, sans-serif" }}
          >
            <span className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4" fill={COLORS.gold} stroke={COLORS.gold} />
              ))}
            </span>
            <span style={{ fontSize: 14 }}>4.9 average from 200+ verified Google reviews</span>
          </div>

          <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 max-w-[560px]">
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

          {/* Mobile primary CTA (hidden on lg+) */}
          <button
            onClick={scrollToForm}
            className="lg:hidden mt-7 w-full uppercase font-bold cursor-pointer"
            style={{
              height: 56,
              background: COLORS.orange,
              color: "#FFFFFF",
              fontSize: 14,
              border: "none",
              borderRadius: 8,
              letterSpacing: "0.08em",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Book My Consult
          </button>

          <div
            className="mt-6"
            style={{ color: "rgba(245,240,235,0.60)", fontFamily: "Inter, sans-serif", fontSize: 12 }}
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
