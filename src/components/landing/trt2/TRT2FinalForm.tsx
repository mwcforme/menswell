import { TRT2LeadForm } from "./TRT2LeadForm";

export const TRT2FinalForm = () => {
  return (
    <section id="final-form" className="py-14 md:py-20" style={{ background: "#000033" }}>
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <h2
          className="font-bold uppercase"
          style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: "clamp(26px, 4vw, 40px)",
            color: "#FFFFFF",
            fontWeight: 700,
          }}
        >
          Ready to Talk to a Physician?
        </h2>
        <p className="text-base mt-2 mb-8" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Inter, sans-serif" }}>
          Consultation. On-site labs. Walk in today.
        </p>

        <div className="max-w-[480px] mx-auto">
          <TRT2LeadForm heading="Book My Consultation" />
        </div>

        <p className="text-sm mt-6">
          <a
            href="tel:8663444955"
            className="font-bold transition-colors duration-200"
            style={{ color: "#FFFFFF", fontFamily: "Inter, sans-serif", textDecoration: "none" }}
          >
            Or call: 866-344-4955
          </a>
        </p>
      </div>
    </section>
  );
};
