import { useState, useEffect } from "react";
import { Phone } from "lucide-react";

export const TRT2MobileCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      if (hero) {
        setVisible(window.scrollY > hero.offsetHeight);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fireCTA = () => {
    window.dispatchEvent(new CustomEvent("lp_trt2_cta_click", { detail: { location: "mobile-sticky" } }));
    document.getElementById("final-form")?.scrollIntoView({ behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center gap-2 px-4"
      style={{
        height: 56,
        background: "#000033",
        boxShadow: "0 -2px 12px rgba(0,0,0,0.3)",
      }}
    >
      <button
        onClick={fireCTA}
        className="flex-1 rounded-full font-bold text-sm uppercase cursor-pointer"
        style={{
          height: 44,
          background: "#E8670A",
          color: "#FFFFFF",
          letterSpacing: "0.08em",
          fontFamily: "Inter, sans-serif",
          border: "none",
        }}
      >
        Book Consult
      </button>
      <a
        href="tel:8663444955"
        className="flex items-center justify-center rounded-full flex-shrink-0"
        style={{
          width: 44,
          height: 44,
          background: "rgba(255,255,255,0.15)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <Phone className="h-5 w-5" style={{ color: "#FFFFFF" }} />
      </a>
    </div>
  );
};
