import { RefreshCw, Dna, UtensilsCrossed, Zap, BarChart3, UserX } from "lucide-react";

export const OGWLProblemAgitation = () => {
  const problems = [
    { icon: RefreshCw, title: "Yo-Yo Dieting", description: "You've lost weight before, only to gain it all back." },
    { icon: Dna, title: "Hormonal Resistance", description: "Low testosterone and metabolic dysfunction make fat loss nearly impossible without medical help." },
    { icon: UtensilsCrossed, title: "Constant Hunger", description: "Willpower isn't the problem. Your hunger hormones are working against you." },
    { icon: Zap, title: "Low Energy", description: "Too exhausted to work out consistently. The cycle keeps repeating." },
    { icon: BarChart3, title: "Stubborn Belly Fat", description: "No matter what you try, the midsection won't budge." },
    { icon: UserX, title: "Losing Confidence", description: "Your weight is affecting how you feel about yourself every single day." },
  ];

  const scrollToForm = () => {
    const form = document.getElementById("lead-form") || document.getElementById("lead-form-bottom");
    form?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="problem-agitation" style={{ background: "#f8f9fa", padding: "clamp(48px, 8vw, 96px) 0" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#003366" }}>Why Diets Alone Haven't Worked</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {problems.map((p, i) => (
            <div key={i} className="rounded-xl p-6 transition-all duration-200 hover:-translate-y-1" style={{ background: "#ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <p.icon size={28} style={{ color: "#003366", marginBottom: 16 }} />
              <h3 className="text-lg font-semibold mb-2" style={{ color: "#003366" }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#555555" }}>{p.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-lg mb-4" style={{ color: "#555555" }}>If this sounds like you, GLP-1 therapy could be the missing piece.</p>
          <button onClick={scrollToForm} className="text-base font-semibold cursor-pointer bg-transparent border-none underline transition-colors duration-200"
            style={{ color: "#004883" }} onMouseEnter={(e) => { e.currentTarget.style.color = "#003366"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "#004883"; }}>
            Learn How It Works &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};
