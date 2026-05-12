import { useState, useEffect } from "react";
import { Phone } from "lucide-react";

export const WLMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when hero is no longer visible
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const heroSection = document.getElementById("hero");
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      if (heroSection) {
        observer.unobserve(heroSection);
      }
    };
  }, []);

  const scrollToForm = () => {
    const form = document.getElementById("lead-form") || document.getElementById("lead-form-bottom");
    if (form) {
      form.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    // Track CTA click
    window.dispatchEvent(
      new CustomEvent("lp_weightloss_cta_click", {
        detail: { location: "mobile-sticky", action: "book-consult" },
      })
    );

    // Optional analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click', {
        event_category: 'Weight Loss',
        event_label: 'Mobile Sticky CTA'
      });
    }
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', { content_category: 'Weight Loss' });
    }
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid #e9ecef",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
        padding: "12px 16px",
        display: "flex",
        gap: 12,
        alignItems: "center",
      }}
      className="md:hidden"
    >
      {/* Book Consult Button */}
      <button
        onClick={scrollToForm}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "14px 20px",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 15,
          fontWeight: 700,
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          minHeight: 48,
          background: "#E8670A",
          color: "#ffffff",
          boxShadow: "0 2px 8px rgba(232,103,10,0.3)",
          transition: "all 180ms ease",
        }}
        onTouchStart={(e) => {
          e.currentTarget.style.background = "#d35a00";
          e.currentTarget.style.transform = "scale(0.98)";
        }}
        onTouchEnd={(e) => {
          e.currentTarget.style.background = "#E8670A";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        Book Consult
      </button>

      {/* Phone Button */}
      <a
        href="tel:8663444955"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "#004883",
          color: "#ffffff",
          textDecoration: "none",
          boxShadow: "0 2px 8px rgba(0,72,131,0.3)",
          transition: "all 180ms ease",
        }}
        onTouchStart={(e) => {
          e.currentTarget.style.background = "#003a6b";
          e.currentTarget.style.transform = "scale(0.95)";
        }}
        onTouchEnd={(e) => {
          e.currentTarget.style.background = "#004883";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <Phone size={20} />
      </a>
    </div>
  );
};