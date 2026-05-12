import { ArrowRight } from "lucide-react";

export const TRT2UrgencyBanner = () => {
  const fireCTA = () => {
    window.dispatchEvent(new CustomEvent("lp_trt2_cta_click", { detail: { location: "urgency" } }));
    document.getElementById("final-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-10 md:py-14" style={{ background: "#E8670A" }}>
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
          Testosterone Testing
        </h2>
        <p className="text-base mt-3" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "Inter, sans-serif" }}>
          Appointments available at all 3 Virginia locations. Limited appointment availability.
        </p>
        <button
          onClick={fireCTA}
          className="mt-6 inline-flex items-center gap-2 rounded-full px-8 font-bold text-sm uppercase cursor-pointer transition-all duration-200 hover:scale-[1.02]"
          style={{
            height: 52,
            background: "#FFFFFF",
            color: "#000033",
            letterSpacing: "0.08em",
            fontFamily: "Inter, sans-serif",
            border: "none",
          }}
        >
          Book My Testosterone Test Today <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
};
