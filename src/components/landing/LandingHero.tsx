import { Check } from "lucide-react";
import { ConsultationForm } from "./ConsultationForm";

interface LandingHeroProps {
  headline: string;
  subheadline: string;
  benefits: string[];
  bgImageUrl: string;
}

const badges = [
  "LegitScript Certified",
  "HIPAA Compliant",
  "Virginia Board Certified",
];

export const LandingHero = ({ headline, subheadline, benefits, bgImageUrl }: LandingHeroProps) => (
  <section className="relative overflow-hidden py-14 md:py-20" style={{ background: "#000033" }}>
    <img
      src={bgImageUrl}
      alt=""
      className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none"
      loading="eager"
    />

    <div className="relative max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-[1fr_420px] gap-12 items-center">
      {/* Left column */}
      <div>
        <div className="flex items-center gap-1.5 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} style={{ color: "#D4A017", fontSize: "18px" }}>★</span>
          ))}
          <span className="text-sm font-medium ml-1" style={{ color: "rgba(255,255,255,0.70)" }}>1,500+ Raving Reviews</span>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {badges.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
              style={{ background: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.70)" }}
            >
              ✓ {b}
            </span>
          ))}
        </div>

        <h1
          className="font-bold leading-[1.1] max-w-[600px]"
          style={{ color: "#FFFFFF", fontSize: "clamp(28px, 5vw, 52px)" }}
        >
          {headline}
        </h1>

        <p
          className="mt-4 text-base leading-relaxed max-w-[520px]"
          style={{ color: "rgba(255,255,255,0.70)" }}
        >
          {subheadline}
        </p>

        <ul className="mt-8 space-y-3">
          {benefits.map((b) => (
            <li key={b} className="flex items-center gap-3">
              <Check className="h-5 w-5 flex-shrink-0" style={{ color: "#2ECC71" }} />
              <span className="text-base font-medium" style={{ color: "#FFFFFF" }}>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right column */}
      <div className="flex justify-center md:justify-end">
        <ConsultationForm />
      </div>
    </div>
  </section>
);
