import { Check, ArrowRight } from "lucide-react";

const inclusions = [
  "Comprehensive hormone panel and metabolic blood work",
  "On-site blood draw — no separate lab visit required",
  "Face-to-face consultation with a licensed Virginia physician",
  "Same-day review of your lab results",
  "Personalized care plan based on your evaluation",
  "Ongoing dose monitoring and lab follow-ups (if treatment is prescribed)",
  "Direct access to your care team between visits",
  "No referrals required, no insurance prior authorization needed",
];

export const TRTv2FirstVisitIncluded = () => {
  const scrollToBooking = () => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section style={{ background: "#FFFFFF" }}>
      <div className="max-w-[900px] mx-auto px-6 py-16 md:py-24">
        <h2 className="font-bold uppercase text-center" style={{ fontFamily: "Oswald, sans-serif", color: "#000033", fontSize: "clamp(26px, 3vw, 38px)", letterSpacing: "0.02em" }}>
          What's Included In Your First Visit
        </h2>

        <div className="mt-10 rounded-2xl p-8 md:p-10" style={{ border: "1px solid #E5E5EA", background: "#FFFFFF" }}>
          <ul className="space-y-4">
            {inclusions.map((label) => (
              <li key={label} className="flex items-start gap-3">
                <Check className="h-[20px] w-[20px] mt-0.5 flex-shrink-0" style={{ color: "#2ECC71" }} />
                <span className="text-base leading-relaxed" style={{ color: "#1a1a2e", fontFamily: "Inter, sans-serif" }}>{label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-6 border-t" style={{ borderColor: "#E5E5EA" }}>
            <p className="text-base font-semibold" style={{ color: "#000033", fontFamily: "Inter, sans-serif" }}>
              First visit: <span style={{ color: "#E8670A" }}>[$XX]</span>. Ongoing care from <span style={{ color: "#E8670A" }}>[$XX]/month</span> if treatment is prescribed. No long-term contracts.
            </p>
            <p className="mt-3 text-xs" style={{ color: "#7a7a8e", fontFamily: "Inter, sans-serif" }}>
              Treatment is prescribed only when clinically appropriate based on lab results and physician evaluation.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={scrollToBooking}
            className="inline-flex items-center gap-2 rounded-full px-8 font-bold text-sm uppercase cursor-pointer transition-all duration-200 hover:scale-[1.02]"
            style={{ height: 52, background: "#E8670A", color: "#FFFFFF", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif", border: "none" }}
          >
            Book My Consultation <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
