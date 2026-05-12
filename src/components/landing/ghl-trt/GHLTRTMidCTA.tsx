const GHLTRTMidCTA = () => {
  const scrollToForm = () => {
    document.getElementById("ghl-hero-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="py-12 md:py-20 text-center"
      style={{ backgroundColor: "#000033" }}
    >
      <div className="max-w-[1170px] mx-auto px-4">
        <h2
          style={{ fontFamily: "'Bebas Neue', cursive" }}
           className="text-[32px] md:text-[48px] text-white leading-tight mb-4"
        >
          You Know Something's Off. Let's Find Out Why.
        </h2>
        <p className="text-white/80 text-[15px] max-w-xl mx-auto mb-8">
          This is not about vanity. It's about remaining who you've always been: driven, confident, and high-functioning.
        </p>
        <button
          onClick={scrollToForm}
          className="px-8 py-4 rounded-full text-white font-semibold uppercase text-sm tracking-wide transition-colors"
          style={{ backgroundColor: "#E8670A", fontFamily: "Inter, sans-serif" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#CF5B09")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#E8670A")}
        >
          Book My Appointment
        </button>
      </div>
    </section>
  );
};

export default GHLTRTMidCTA;
