import { OGTRT2LeadForm } from "./OGTRT2LeadForm";

export const OGTRT2FinalCTA = () => (
  <section style={{ background: "#f8f9fa", textAlign: "center", padding: "clamp(48px, 8vw, 96px) 0" }} id="book">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="text-center max-w-[640px] mx-auto mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#003366" }}>Find Out What Your Testosterone Levels Say</h2>
      </div>
      <OGTRT2LeadForm heading="Get Started, At No Cost" formId="bottom" />
    </div>
  </section>
);