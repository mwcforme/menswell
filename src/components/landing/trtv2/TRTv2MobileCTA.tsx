import { useState, useEffect } from "react";
import { Phone } from "lucide-react";

export const TRTv2MobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    const hero = document.getElementById("hero");
    if (hero) observer.observe(hero);
    return () => { if (hero) observer.unobserve(hero); };
  }, []);

  const scrollToForm = () => {
    const form = document.getElementById("lead-form") || document.getElementById("lead-form-bottom");
    form?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.dispatchEvent(new CustomEvent("lp_trt_v2_cta_click", { detail: { location: "mobile-sticky" } }));
  };

  if (!isVisible) return null;

  return (
    <div
      className="md:hidden"
      style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000,
        background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)",
        borderTop: "1px solid #e9ecef", boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
        padding: "12px 16px", display: "flex", gap: 12, alignItems: "center",
      }}
    >
      <button
        onClick={scrollToForm}
        style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          padding: "14px 20px", fontFamily: "'Montserrat', sans-serif", fontSize: 15, fontWeight: 700,
          border: "none", borderRadius: 8, cursor: "pointer", minHeight: 48,
          background: "#E8670A", color: "#ffffff", boxShadow: "0 2px 8px rgba(232,103,10,0.3)", transition: "all 180ms ease",
        }}
      >
        Book Consult
      </button>
      <a
        href="tel:8663444955"
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 48, height: 48, borderRadius: "50%",
          background: "#004883", color: "#ffffff", textDecoration: "none",
          boxShadow: "0 2px 8px rgba(0,72,131,0.3)",
        }}
      >
        <Phone size={20} />
      </a>
    </div>
  );
};
