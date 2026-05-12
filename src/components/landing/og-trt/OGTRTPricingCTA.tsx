import imgDoctor from "@/assets/lp/dr-popariello.jpeg";

export const OGTRTPricingCTA = () => {
  const scrollToForm = () => { document.getElementById("book")?.scrollIntoView({ behavior: "smooth" }); };

  const trust = [
    { icon: "✓", label: "Physician-Led" },
    { icon: "✓", label: "LegitScript Certified" },
    { icon: "✓", label: "HIPAA Compliant" },
    { icon: "✓", label: "3 Virginia Centers" },
  ];

  return (
    <section id="pricing-cta" style={{ background: "#004883", padding: "clamp(48px, 8vw, 80px) 0" }}>
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#FFFFFF" }}>First Visit Is At No Cost.</h2>
          <p className="text-base mt-3 leading-[1.6]" style={{ color: "rgba(255,255,255,0.90)" }}>
            Walk into any of our 3 Virginia centers. Testosterone test, physician consultation, results reviewed in-visit. No commitment, no credit card.
          </p>
          <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.70)" }}>Treatment plans start at $199/month after approval.</p>
          <button onClick={scrollToForm} className="mt-6 rounded-lg px-8 py-4 font-bold text-sm uppercase cursor-pointer transition-colors duration-200"
            style={{ background: "#FFFFFF", color: "#003366", letterSpacing: "0.08em", border: "none" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.90)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#FFFFFF"; }}>
            Book My Consultation
          </button>
          <div className="flex flex-wrap gap-6 mt-4">
            {trust.map((t) => (
              <span key={t.label} className="text-xs flex items-center gap-1" style={{ color: "rgba(255,255,255,0.80)" }}>{t.icon} {t.label}</span>
            ))}
          </div>
        </div>
        <div>
          <img src={imgDoctor} alt="Dr. Popariello, Medical Director" className="rounded-xl object-cover object-top h-[360px] w-full" loading="lazy" />
        </div>
      </div>
    </section>
  );
};