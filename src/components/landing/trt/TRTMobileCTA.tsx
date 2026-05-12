import { useState, useEffect } from "react";
import { Phone } from "lucide-react";

export const TRTMobileCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      if (hero) setVisible(window.scrollY > hero.offsetHeight * 0.6);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById("hero-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-stretch transition-opacity duration-300"
      style={{
        height: 64,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        background: "rgba(10,22,40,0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(245,240,235,0.12)",
      }}
    >
      <button
        onClick={scrollToForm}
        className="flex-1 flex items-center justify-center text-[13px] font-bold uppercase tracking-[0.08em] cursor-pointer border-none"
        style={{ background: "#E87722", color: "#FFFFFF", fontFamily: "Inter, sans-serif" }}
      >
        Book Now
      </button>
      <a
        href="tel:8663444955"
        className="flex-1 flex items-center justify-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em]"
        style={{
          background: "transparent",
          color: "#F5F0EB",
          textDecoration: "none",
          fontFamily: "Inter, sans-serif",
          borderLeft: "1px solid rgba(245,240,235,0.12)",
        }}
      >
        <Phone size={14} /> Call Us
      </a>
    </div>
  );
};
