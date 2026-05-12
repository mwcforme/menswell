import { CalendarCheck, ShieldCheck, Wallet } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { LocationData } from "@/data/locations";

const pricingCards = [
  {
    title: "No Cost Consultation",
    description: "Your first visit, blood work, and physician consultation are on us. No obligation.",
    icon: CalendarCheck,
  },
  {
    title: "All-Inclusive Plans",
    description: "Medication, labs, unlimited follow-ups, and physician oversight. One transparent monthly investment.",
    icon: ShieldCheck,
  },
  {
    title: "FSA/HSA Accepted",
    description: "Use your pre-tax healthcare dollars. We provide all documentation needed for reimbursement.",
    icon: Wallet,
  },
];

interface Props {
  location: LocationData;
}

export const LocationPricing = ({ location }: Props) => {
  const contentRef = useScrollReveal();

  return (
    <section style={{ background: "#FFFFFF", padding: "80px 0" }}>
      <div ref={contentRef} className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-14">
          <h2
            className="font-bold uppercase leading-tight mb-4"
            style={{ color: "#000033", fontSize: "clamp(1.15rem, 3vw, 1.75rem)" }}
          >
            TRANSPARENT, ALL-INCLUSIVE PRICING
          </h2>
          <p className="pricing-answer-block text-[14px] md:text-base leading-relaxed max-w-2xl mx-auto" style={{ color: "#666" }}>
            Men's Wellness Centers uses all-inclusive, transparent pricing with no hidden fees. Your initial consultation and blood work are included at no extra cost. Treatment plans include medication, ongoing lab monitoring, and unlimited physician follow-ups. FSA and HSA accepted. No insurance billing. No contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-14">
          {pricingCards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl p-6 md:p-8 text-center"
              style={{ background: "#FFFFFF" }}
            >
              <h3 className="font-bold text-[14px] md:text-base uppercase tracking-wide mb-3" style={{ color: "#000033" }}>
                {card.title}
              </h3>
              <p className="text-[13px] leading-relaxed" style={{ color: "#666" }}>
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tier 1 CTA */}
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
            Book Your Consultation
          </button>
          <p className="mt-3 text-[13px]" style={{ color: "#888" }}>
            Or call{" "}
            <a
              href={`tel:${location.phone.replace(/[^0-9]/g, "")}`}
              className="font-semibold transition-opacity hover:opacity-80"
              style={{ color: "#000033", textDecoration: "none" }}
            >
              {location.phone}
            </a>{" "}
            to discuss pricing with our team
          </p>
        </div>
      </div>
    </section>
  );
};
