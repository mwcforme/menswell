import { ArrowRight } from "lucide-react";

const steps = [
  { num: "01", title: "Walk In, Get Tested", desc: "Book a visit at any of our 3 Virginia centers. We draw blood and run your testosterone panel at our on-site lab." },
  { num: "02", title: "See Your Physician", desc: "Meet face-to-face with a licensed Virginia physician. Your results are back before you leave. No waiting days." },
  { num: "03", title: "Start Treatment", desc: "Your doctor builds your protocol and you start the same visit. Follow-ups keep you dialed in." },
];

export const OGTRTHowItWorks = () => {
  const scrollToForm = () => { document.getElementById("book")?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <section id="how-it-works" style={{ background: "#f8f9fa", padding: "clamp(48px, 8vw, 96px) 0" }}>
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#003366" }}>How It Works</h2>
          <p className="mt-2 text-sm italic" style={{ color: "#888888" }}>Walk in. Get tested. Start treatment. Same day.</p>
          <button onClick={scrollToForm} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold cursor-pointer rounded-lg px-6 py-3 transition-all duration-200"
            style={{ color: "#003366", background: "transparent", border: "1px solid rgba(0,51,102,0.25)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,51,102,0.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
            BOOK NOW <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {steps.map((s) => (
            <div key={s.num} className="flex gap-4 rounded-xl p-6" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ border: "2px solid #004883" }}>
                <span className="font-bold text-sm" style={{ color: "#004883" }}>{s.num}</span>
              </div>
              <div>
                <h3 className="font-bold text-base" style={{ color: "#003366" }}>{s.title}</h3>
                <p className="text-sm mt-1 leading-relaxed" style={{ color: "#555555" }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};