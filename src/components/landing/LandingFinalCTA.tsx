interface LandingFinalCTAProps {
  headline: string;
  subheadline: string;
}

export const LandingFinalCTA = ({ headline, subheadline }: LandingFinalCTAProps) => {
  const scrollToForm = () => {
    document.getElementById("consultation-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-14 md:py-20" style={{ background: "#000033" }}>
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <h2 className="font-bold text-3xl mb-4" style={{ color: "#FFFFFF" }}>
          {headline}
        </h2>
        <p
          className="text-base max-w-[500px] mx-auto mb-8"
          style={{ color: "rgba(255,255,255,0.70)" }}
        >
          {subheadline}
        </p>

        <button
          onClick={scrollToForm}
          className="rounded-full px-8 py-4 font-bold text-sm uppercase tracking-[0.08em] cursor-pointer transition-colors duration-200 hover:bg-white/90"
          style={{ background: "#FFFFFF", color: "#000033" }}
        >
          Book My Consultation
        </button>

        <p className="mt-4">
          <a
            href="tel:8663444955"
            className="text-sm"
            style={{ color: "rgba(255,255,255,0.60)" }}
          >
            Or call 866-344-4955
          </a>
        </p>
      </div>
    </section>
  );
};
