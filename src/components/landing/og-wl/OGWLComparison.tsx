import { Check, X } from "lucide-react";

export const OGWLComparison = () => {
  const features = [
    { feature: "Medical oversight", online: "Telehealth questionnaire", mwc: "In-person physician evaluation" },
    { feature: "Lab work", online: "Rarely required", mwc: "Comprehensive monthly labs" },
    { feature: "Medications", online: "One-size-fits-all", mwc: "Customized GLP-1 protocol" },
    { feature: "Follow-up", online: "Email check-ins", mwc: "Unlimited in-person visits" },
    { feature: "Side effect mgmt", online: "DIY", mwc: "Physician-managed adjustments" },
    { feature: "Accountability", online: "Self-directed", mwc: "Concierge medical support" },
    { feature: "Legitimacy", online: "Questionable sources", mwc: "LegitScript Certified provider" },
  ];

  const scrollToForm = () => { (document.getElementById("lead-form") || document.getElementById("lead-form-bottom"))?.scrollIntoView({ behavior: "smooth", block: "center" }); };

  return (
    <section id="comparison" style={{ background: "#ffffff", padding: "clamp(48px, 8vw, 96px) 0" }}>
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#003366" }}>Why Virginia Men Choose Men's Wellness Centers Over Online Providers</h2>
        </div>
        <div className="rounded-xl overflow-hidden mb-12" style={{ background: "#f8f9fa" }}>
          <div className="hidden md:grid" style={{ gridTemplateColumns: "2fr 1fr 1fr" }}>
            <div className="p-5 text-base font-bold" style={{ color: "#888888" }}>Feature</div>
            <div className="p-5 text-center text-base font-bold" style={{ color: "#888888", borderLeft: "1px solid rgba(0,0,0,0.06)" }}>Online Clinics</div>
            <div className="p-5 text-center text-base font-bold rounded-tr-xl" style={{ color: "#FFFFFF", background: "#004883", borderLeft: "1px solid rgba(0,0,0,0.06)" }}>Men's Wellness Centers</div>
          </div>
          {features.map((item, i) => (
            <div key={i}>
              <div className="hidden md:grid" style={{ gridTemplateColumns: "2fr 1fr 1fr", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="p-4 px-5 text-[15px] font-semibold" style={{ color: "#333333" }}>{item.feature}</div>
                <div className="p-4 px-5 flex items-center justify-center gap-2" style={{ borderLeft: "1px solid rgba(0,0,0,0.06)" }}>
                  <X size={14} style={{ color: "#dc3545", flexShrink: 0 }} /><span className="text-[13px] text-center" style={{ color: "#888888" }}>{item.online}</span>
                </div>
                <div className="p-4 px-5 flex items-center justify-center gap-2" style={{ background: "rgba(0,72,131,0.03)", borderLeft: "1px solid rgba(0,0,0,0.06)" }}>
                  <Check size={14} style={{ color: "#28a745", flexShrink: 0 }} /><span className="text-[13px] font-medium text-center" style={{ color: "#003366" }}>{item.mwc}</span>
                </div>
              </div>
              <div className="md:hidden p-4" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="text-[15px] font-semibold mb-2" style={{ color: "#333333" }}>{item.feature}</div>
                <div className="flex items-center gap-2 mb-1"><X size={14} style={{ color: "#dc3545", flexShrink: 0 }} /><span className="text-[13px]" style={{ color: "#888888" }}>{item.online}</span></div>
                <div className="flex items-center gap-2"><Check size={14} style={{ color: "#28a745", flexShrink: 0 }} /><span className="text-[13px] font-medium" style={{ color: "#003366" }}>{item.mwc}</span></div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button onClick={scrollToForm} className="inline-flex items-center gap-2 rounded-lg px-8 font-bold text-sm uppercase cursor-pointer transition-all duration-200 hover:scale-[1.02] border-none"
            style={{ height: 52, background: "#E8670A", color: "#FFFFFF", letterSpacing: "0.08em" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#CF5B09"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; }}>
            Start My Consultation
          </button>
        </div>
      </div>
    </section>
  );
};