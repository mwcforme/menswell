import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    num: "01",
    title: "Meet Your Physician",
    body: "Sit down with a Virginia-licensed physician who focuses exclusively on men's health. Discuss your symptoms, review your history, and get honest answers without the runaround.",
  },
  {
    num: "02",
    title: "Same-Day Lab Results",
    body: "Walk down the hall, get your blood drawn, and have actionable lab results back before you leave the building. No outside lab visits, no waiting days for a callback.",
  },
  {
    num: "03",
    title: "Leave With a Plan",
    body: "Your physician builds a protocol around your labs, your goals, and your lifestyle. If you qualify, medication is dispensed on-site so you can start the same day.",
  },
];

export const StepsSection = () => {
  const gridRef = useScrollReveal({ staggerChildren: true, staggerDelay: 150 });

  return (
    <section id="process" className="py-20 md:py-24" style={{ background: "#EBEAE8" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 md:mb-14 gap-4">
          <h2
            className="font-bold uppercase leading-tight"
            style={{
              fontFamily: "Oswald, sans-serif",
              color: "#000033",
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              letterSpacing: "0.04em",
            }}
          >
            How It Works
          </h2>
          <a
            href="/book"
            className="hidden md:inline-block rounded-full px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] transition-all duration-200 cursor-pointer hover:scale-[1.02]"
            style={{ background: "#EA580C", color: "#FFFFFF", textDecoration: "none" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#C2410C"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#EA580C"; }}
          >
            Book My Consultation
          </a>
        </div>

        {/* Desktop: card grid */}
        <div ref={gridRef} className="hidden md:grid grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="rounded-xl p-7"
              style={{
                background: "#FFFFFF",
                boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
              }}
            >
              <span
                className="font-bold text-2xl block mb-4"
                style={{ color: "#E8670A", fontFamily: "Oswald, sans-serif" }}
              >
                {step.num}
              </span>
              <h3
                className="font-bold text-lg uppercase tracking-[0.03em] mb-3"
                style={{ color: "#000033", fontFamily: "Oswald, sans-serif" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#334155", fontFamily: "Inter, sans-serif" }}
              >
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: bordered list */}
        <div ref={gridRef} className="md:hidden flex flex-col">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="py-6"
              style={{
                borderBottom: i < steps.length - 1 ? "1px solid rgba(0,0,51,0.1)" : "none",
              }}
            >
              <span
                className="font-bold text-xl block mb-2"
                style={{ color: "#E8670A", fontFamily: "Oswald, sans-serif" }}
              >
                {step.num}
              </span>
              <h3
                className="font-bold text-base uppercase tracking-[0.03em] mb-2"
                style={{ color: "#000033", fontFamily: "Oswald, sans-serif" }}
              >
                {step.title}
              </h3>
              <p
                className="text-[13px] leading-relaxed"
                style={{ color: "#334155", fontFamily: "Inter, sans-serif" }}
              >
                {step.body}
              </p>
            </div>
          ))}

          <a
            href="/book"
            className="mt-6 self-center rounded-full px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] transition-all duration-200 cursor-pointer hover:scale-[1.02] text-center"
            style={{ background: "#EA580C", color: "#FFFFFF", textDecoration: "none" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#C2410C"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#EA580C"; }}
          >
            Book My Consultation
          </a>
        </div>
      </div>
    </section>
  );
};
