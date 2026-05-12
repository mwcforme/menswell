import { useState, useEffect } from "react";
import { PhoneCall01 } from "@untitledui/icons";

export const GHLTRTMobileCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const hero = document.getElementById("ghl-hero");
    if (hero) observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  const scrollToForm = () => {
    document.getElementById("ghl-hero-form")?.scrollIntoView({ behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center px-4 pt-2 pb-3"
      style={{
        background: "#000033",
        boxShadow: "0 -2px 12px rgba(0,0,0,0.3)",
      }}
    >
      {/* CRO-11: urgency micro-copy */}
      <span className="text-xs text-white/70 mb-1.5">Appointments available</span>
      <div className="flex items-center gap-2 w-full">
        <button
          onClick={scrollToForm}
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
          aria-label="Call 866-344-4955"
          className="flex items-center justify-center rounded-full flex-shrink-0"
          style={{
            width: 44,
            height: 44,
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <PhoneCall01 className="h-5 w-5" style={{ color: "#FFFFFF" }} />
        </a>
      </div>
    </div>
  );
};
