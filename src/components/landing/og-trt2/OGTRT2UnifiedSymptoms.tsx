export const OGTRT2UnifiedSymptoms = () => {
  const symptoms = [
    { title: "Chronic Fatigue", description: "You sleep 8 hours and still drag through the day." },
    { title: "Muscle Loss", description: "You are working out but losing ground, not gaining." },
    { title: "Irritability and Brain Fog", description: "Short temper, poor focus. You feel like a different person." },
    { title: "Low Libido", description: "Your drive is not what it used to be. In or out of the bedroom." },
    { title: "Weight Gain", description: "Belly fat increasing no matter what you do." },
    { title: "Low Mood", description: "Not depressed exactly, but you have lost your edge." },
  ];

  const scrollToForm = () => {
    const form = document.getElementById("og-trt2-lead-form") || document.getElementById("og-trt2-final-form");
    form?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section style={{ background: "#f8f9fa", padding: "clamp(48px, 8vw, 96px) 0" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#1B2A4A" }}>
            More Common Than Most Men Admit
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {symptoms.map((s, i) => (
            <div
              key={i}
              className="rounded-xl p-6"
              style={{ background: "#ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
            >
              <h3 className="text-lg font-semibold mb-2" style={{ color: "#1B2A4A" }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#555555" }}>{s.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg mb-6" style={{ color: "#555555" }}>
            If 2 or more of these sound familiar, low testosterone could be the cause.
          </p>
          <button
            onClick={scrollToForm}
            className="px-8 h-[52px] rounded-full font-bold text-sm uppercase tracking-wider cursor-pointer transition-colors duration-200 border-none"
            style={{ background: "#E8670A", color: "#FFFFFF" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#CF5B09"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; }}
          >
            BOOK MY CONSULTATION
          </button>
        </div>
      </div>
    </section>
  );
};
