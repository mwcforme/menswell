import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { LocationData } from "@/data/locations";

const getSteps = (city: string, phone: string) => [
  {
    num: "1",
    title: "Meet Your Physician",
    body: `Schedule online or call ${phone}. Walk into our ${city} center and sit down with a Virginia-licensed physician. No referral needed.`,
  },
  {
    num: "2",
    title: "Same-Day Lab Results",
    body: "Walk down the hall, get your blood drawn, and have actionable lab results back before you leave the building. No outside lab visits.",
  },
  {
    num: "3",
    title: "Leave With a Plan",
    body: "Your physician builds a protocol around your labs, your goals, and your lifestyle. If you qualify, medication is dispensed on-site so you can start the same day.",
  },
];

interface Props {
  location: LocationData;
}

export const LocationProcess = ({ location }: Props) => {
  const steps = getSteps(location.city, location.phone);
  const gridRef = useScrollReveal({ staggerChildren: true, staggerDelay: 150 });

  return (
    <section style={{ background: "#EBEAE8", padding: "80px 0" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-4 md:mb-6 gap-4">
          <h2
            className="font-bold uppercase leading-tight max-w-xl"
            style={{ color: "#000033", fontSize: "clamp(1.15rem, 3vw, 1.75rem)" }}
          >
            WHAT HAPPENS AT YOUR FIRST VISIT TO MWC {location.city.toUpperCase()}?
          </h2>
          <button
            onClick={() => document.getElementById("location-cta")?.scrollIntoView({ behavior: "smooth" })}
            className="hidden md:inline-flex items-center justify-center rounded-full font-semibold uppercase cursor-pointer border-none transition-all duration-200 hover:scale-[1.02]"
            style={{
              background: "#F97316",
              color: "#FFFFFF",
              padding: "16px 32px",
              fontSize: 13,
              letterSpacing: "0.05em",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#EA580C")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#F97316")}
          >
            Book My Consultation
          </button>
        </div>

        <p className="first-visit-answer-block text-[13px] md:text-sm leading-relaxed max-w-3xl mb-8 md:mb-12" style={{ color: "#666", fontStyle: "italic" }}>
          Your first visit to Men's Wellness Centers takes 60-90 minutes. You meet with a board-certified physician, receive comprehensive blood work with results reviewed in-visit from our CLIA-certified lab, and can start treatment the same day. No referral needed. Consultation. Located at {location.address}, {location.cityStateZip}.
        </p>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 items-stretch">
          {steps.map((step) => (
            <div key={step.num} className="flex flex-col">
              {/* Number badge */}
              <div
                className="flex items-center justify-center rounded-full mb-4"
                style={{
                  width: 48,
                  height: 48,
                  background: "#F97316",
                  color: "#FFFFFF",
                  fontSize: 20,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {step.num}
              </div>
              <h3 className="font-bold text-[15px] md:text-base uppercase tracking-[0.04em] mb-2" style={{ color: "#000033" }}>
                {step.title}
              </h3>
              <p className="font-normal text-[13px] leading-relaxed" style={{ color: "#666666" }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
