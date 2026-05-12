import { Battery, Dumbbell, Brain, TrendingDown, Scale, Frown } from "lucide-react";

export const OGTRT2ProblemAgitation = () => {
  const problems = [
    { icon: Battery, title: "Chronic Fatigue", description: "You sleep 8 hours and still drag through the day." },
    { icon: Dumbbell, title: "Muscle Loss", description: "You're working out but losing ground, not gaining." },
    { icon: Brain, title: "Irritability & Brain Fog", description: "Short temper, can't focus, feel like a different person." },
    { icon: TrendingDown, title: "Low Libido", description: "Your drive isn't what it used to be." },
    { icon: Scale, title: "Weight Gain", description: "Belly fat increasing no matter what you do." },
    { icon: Frown, title: "Low Mood", description: "Not depressed exactly, but you've lost your edge." },
  ];

  const scrollToForm = () => {
    const form = document.getElementById("lead-form") || document.getElementById("lead-form-bottom");
    form?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="problem-agitation" style={{ background: "#f8f9fa", padding: "clamp(48px, 8vw, 96px) 0" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#003366" }}>
            Low Testosterone Affects More Than You Think
          </h2>
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
          <p className="text-lg mb-4" style={{ color: "#555555" }}>If 2 or more of these sound familiar, low T could be the cause.</p>
          <button onClick={scrollToForm} className="text-base font-semibold cursor-pointer bg-transparent border-none underline transition-colors duration-200"
            style={{ color: "#004883" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#003366"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#004883"; }}
          >Find Out Today &rarr;</button>
        </div>
      </div>
    </section>
  );
};
