export const TRTv2UrgencyBanner = () => {
  const scrollToForm = () => {
    const form = document.getElementById("lead-form") || document.getElementById("lead-form-bottom");
    form?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section style={{ background: "#E8670A", color: "white", padding: "clamp(32px, 5vw, 48px) 0", textAlign: "center" }}>
      <div className="max-w-[800px] mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-3">
          Testosterone Testing
        </h2>
        <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.9)" }}>
          Appointments available at all 3 Virginia locations. Limited appointment availability.
        </p>
        <button
          onClick={scrollToForm}
          className="inline-flex items-center gap-2 rounded-full px-8 font-bold text-sm uppercase cursor-pointer transition-all duration-200 hover:scale-[1.02] border-none"
          style={{ height: 52, background: "#ffffff", color: "#E8670A", letterSpacing: "0.08em" }}
        >
          Book My Testosterone Test Today
        </button>
      </div>
    </section>
  );
};
