export const UnifiedHeader = () => {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8"
      style={{ background: "#1B2A4A", height: 60 }}
    >
      <a href="/" aria-label="Men's Wellness Centers home">
        <img
          src="/logos/Text_Logo_white.png"
          alt="Men's Wellness Centers"
          className="h-8 md:h-9 w-auto"
        />
      </a>
      <a
        href="tel:8663444955"
        className="text-white font-semibold text-sm md:text-base tracking-wide"
        style={{ letterSpacing: "0.03em" }}
      >
        866-344-4955
      </a>
    </header>
  );
};
