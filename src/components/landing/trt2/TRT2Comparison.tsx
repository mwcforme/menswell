import { Check, X, ArrowRight } from "lucide-react";

const features = [
  { label: "Care model", them: "Telehealth only", us: "Face-to-face consultations" },
  { label: "Lab work", them: "Mail-in kits, wait days", us: "Same-day, in-clinic results" },
  { label: "Treatment plans", them: "Cookie-cutter protocols", us: "Customized plan lengths" },
  { label: "Support", them: "Chatbot or email", us: "One-on-one support from medical experts" },
  { label: "Follow-up", them: "Limited", us: "Unlimited office visits with providers" },
  { label: "Service level", them: "Transactional", us: "Concierge service" },
  { label: "Providers", them: "Unknown telehealth docs", us: "State-licensed medical providers" },
];

export const TRT2Comparison = () => {
  const fireCTA = () => {
    window.dispatchEvent(new CustomEvent("lp_trt2_cta_click", { detail: { location: "comparison" } }));
    document.getElementById("final-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-14 md:py-20" style={{ background: "#F5F0EB" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <h2
          className="font-bold uppercase text-center"
          style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: "clamp(24px, 4vw, 40px)",
            color: "#000033",
            fontWeight: 700,
          }}
        >
          Why Virginia Men Choose MWC Over Online TRT Mills
        </h2>

        {/* Comparison table */}
        <div className="mt-10 overflow-x-auto">
          <table className="w-full border-collapse" style={{ fontFamily: "Inter, sans-serif", minWidth: 600 }}>
            <thead>
              <tr>
                <th className="text-left text-sm font-medium px-4 py-3" style={{ color: "#888888" }}>Feature</th>
                <th className="text-left text-sm font-medium px-4 py-3" style={{ color: "#888888" }}>Online TRT Services</th>
                <th className="text-left text-sm font-bold px-4 py-3" style={{ color: "#000033" }}>Men's Wellness Centers</th>
              </tr>
            </thead>
            <tbody>
              {features.map((f, i) => (
                <tr key={i} style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                  <td className="px-4 py-4 text-sm font-medium" style={{ color: "#000033" }}>{f.label}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <X className="h-4 w-4 flex-shrink-0" style={{ color: "#CC4444" }} />
                      <span className="text-sm" style={{ color: "#888888" }}>{f.them}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 flex-shrink-0" style={{ color: "#2ECC71" }} />
                      <span className="text-sm font-medium" style={{ color: "#000033" }}>{f.us}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-10">
          <button
            onClick={fireCTA}
            className="inline-flex items-center gap-2 rounded-full px-8 font-bold text-sm uppercase cursor-pointer transition-all duration-200 hover:scale-[1.02]"
            style={{
              height: 52,
              background: "#E8670A",
              color: "#FFFFFF",
              letterSpacing: "0.08em",
              fontFamily: "Inter, sans-serif",
              border: "none",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#CF5B09"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; }}
          >
            Experience the MWC Difference <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
