import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { LocationData } from "@/data/locations";

const lowTSigns = [
  "Persistent fatigue that sleep doesn't fix",
  "Loss of motivation and mental sharpness (brain fog)",
  "Decreased muscle mass despite regular exercise",
  "Increased body fat, especially around the midsection",
  "Low sex drive or diminished performance",
  "Irritability, mood swings, or mild depression",
  "Poor sleep quality or insomnia",
  "Longer recovery time after workouts",
];

const programSigns = [
  "ED or inconsistent sexual performance",
  "Weight that won't respond to diet and exercise alone",
  "Feeling like you've lost your competitive edge",
  "Joint pain, low energy, or slow recovery",
  "You've been told \"it's just aging\" by other physicians",
  "You've tried online TRT services and got generic care",
];

interface Props {
  location: LocationData;
}

export const LocationSymptoms = ({ location }: Props) => {
  const contentRef = useScrollReveal();

  return (
    <section style={{ background: "#FFFFFF", padding: "64px 0" }}>
      <div ref={contentRef} className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-14">
          <h2
            className="font-bold uppercase leading-tight mb-4"
            style={{ color: "#000033", fontSize: "clamp(1.15rem, 3vw, 1.75rem)" }}
          >
            DO YOU RECOGNIZE THESE SIGNS?
          </h2>
          <p className="text-[14px] md:text-base leading-relaxed max-w-2xl mx-auto" style={{ color: "#666" }}>
            Most men live with these symptoms for years before realizing there's a medical solution.
          </p>
        </div>

        <p className="text-[14px] leading-relaxed max-w-3xl mx-auto text-center mb-10 md:mb-14" style={{ color: "#555", fontStyle: "italic" }}>
          Low testosterone affects approximately 40% of men over age 45. Common symptoms include persistent fatigue, decreased sex drive, weight gain around the midsection, brain fog, irritability, and loss of muscle mass. Men's Wellness Centers in {location.city} tests over 40 biomarkers to accurately diagnose and treat hormonal imbalance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto mb-10 md:mb-14">
          <div>
            <h3 className="font-bold text-[13px] md:text-sm uppercase tracking-wide mb-5" style={{ color: "#000033" }}>
              Signs of Low Testosterone
            </h3>
            <ul className="space-y-3">
              {lowTSigns.map((sign) => (
                <li key={sign} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#E8670A" }} />
                  <span className="text-[13px] md:text-sm leading-relaxed" style={{ color: "#555" }}>{sign}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-[13px] md:text-sm uppercase tracking-wide mb-5" style={{ color: "#000033" }}>
              Signs You May Benefit From Our Programs
            </h3>
            <ul className="space-y-3">
              {programSigns.map((sign) => (
                <li key={sign} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#E8670A" }} />
                  <span className="text-[13px] md:text-sm leading-relaxed" style={{ color: "#555" }}>{sign}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-3xl mx-auto rounded-xl p-6 md:p-8 mb-10" style={{ background: "#F5F4F2" }}>
          <h3 className="font-bold text-[13px] uppercase tracking-wide mb-3" style={{ color: "#000033" }}>
            What causes low testosterone in men over 40?
          </h3>
          <p className="text-[13px] md:text-sm leading-relaxed" style={{ color: "#555" }}>
            Testosterone levels naturally decline approximately 1-2% per year after age 30 (Source: American Urological Association). By age 45, nearly 40% of men experience clinically low testosterone levels. Common causes include age-related decline, obesity, chronic stress, poor sleep, certain medications, and underlying health conditions. At Men's Wellness Centers in {location.city}, we use comprehensive blood panels, not just a single total testosterone number, to identify the root cause and create a targeted treatment plan.
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={() => document.getElementById("location-cta")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center justify-center rounded-full font-semibold uppercase cursor-pointer border-none transition-all duration-200 hover:scale-[1.02]"
            style={{
              background: "#F97316",
              color: "#FFFFFF",
              padding: "16px 32px",
              fontSize: 13,
              letterSpacing: "0.05em",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#EA580C")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#F97316")}
            data-location={location.slug.replace("-va", "")}
            data-cta-type="book"
          >
            BOOK MY CONSULTATION
          </button>
        </div>
      </div>
    </section>
  );
};
