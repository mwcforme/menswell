import { useState, useEffect } from "react";
import { Phone } from "lucide-react";

export const EDMobileCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => {
      if (window.innerWidth > 768) { setVisible(false); return; }
      const hero = document.getElementById("hero");
      if (hero) {
        setVisible(hero.getBoundingClientRect().bottom < 0);
      }
    };
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(12px)",
        padding: "10px 16px",
        boxShadow: "0 -2px 12px rgba(0,0,0,0.1)",
        zIndex: 100,
        display: "flex",
        gap: 10,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <a
        href="#lead-form-bottom"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("lead-form-bottom")?.scrollIntoView({ behavior: "smooth" });
        }}
        style={{
          flex: 1,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px 16px",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 14,
          fontWeight: 700,
          textDecoration: "none",
          border: "none",
          borderRadius: 8,
          minHeight: 44,
          background: "#E8670A",
          color: "#ffffff",
          boxShadow: "0 4px 14px rgba(232,103,10,0.3)",
        }}
      >
        Book Confidential Consult
      </a>
      <a
        href="tel:8663444955"
        aria-label="Call us"
        style={{
          flex: "0 0 44px",
          width: 44,
          height: 44,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 9999,
          background: "#004883",
          color: "#ffffff",
          textDecoration: "none",
        }}
      >
        <Phone size={20} />
      </a>
    </div>
  );
};
