import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";

export const TRTv2Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBooking = () => {
    setMenuOpen(false);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(0,0,51,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        height: 64,
      }}
    >
      <div className="flex items-center justify-between px-6 mx-auto max-w-[1200px] h-full">
        <img src="/logos/Text_Logo_white.png" alt="Men's Wellness Centers" className="h-7 w-auto" />
        <div className="hidden md:flex items-center gap-4">
          <a href="tel:8663444955" className="text-sm font-medium hover:opacity-80" style={{ color: "#FFFFFF", fontFamily: "Inter, sans-serif" }}>
            866-344-4955
          </a>
          <button
            onClick={scrollToBooking}
            className="rounded-full px-5 py-2.5 text-xs font-bold uppercase cursor-pointer transition-colors duration-200"
            style={{ background: "#E8670A", color: "#FFFFFF", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#CF5B09"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; }}
          >
            Book My Consultation
          </button>
        </div>
        <button className="md:hidden cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 py-4 px-6 space-y-4" style={{ background: "rgba(0,0,51,0.98)" }}>
          <a href="tel:8663444955" className="block text-sm font-semibold" style={{ color: "#FFFFFF" }}>
            <Phone className="inline h-4 w-4 mr-2" />866-344-4955
          </a>
        </div>
      )}
    </header>
  );
};
