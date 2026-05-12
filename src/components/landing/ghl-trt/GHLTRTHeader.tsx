import { PhoneCall01 } from "@untitledui/icons";

const GHLTRTHeader = () => {
  const scrollToForm = () => {
    document.getElementById("ghl-hero-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#000033]/95 backdrop-blur-sm">
      <div className="max-w-[1170px] mx-auto px-4 py-3 flex items-center justify-between">
        <img
          src="/logos/Text_Logo_white.png"
          alt="Men's Wellness Centers"
          className="h-10"
        />
        <div className="flex items-center gap-4">
          {/* Mobile: phone icon – 44px touch target (CRO-07) */}
          <a
            href="tel:8663444955"
            aria-label="Call 866-344-4955"
            className="md:hidden flex items-center justify-center rounded-full"
            style={{
              width: 44,
              height: 44,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <PhoneCall01 size={18} style={{ color: "#FFFFFF" }} />
          </a>
          {/* Desktop: phone number */}
          <a
            href="tel:8663444955"
            className="hidden md:flex items-center gap-2 text-white text-sm font-medium"
          >
            <PhoneCall01 size={16} />
            866-344-4955
          </a>
        </div>
      </div>
    </header>
  );
};

export default GHLTRTHeader;
