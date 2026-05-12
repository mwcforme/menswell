import { useState, useEffect, useRef } from "react";
import { Phone, X } from "lucide-react";
import type { LocationData } from "@/data/locations";

interface Props {
  location: LocationData;
}

export const LocationStickyMobileCTA = ({ location }: Props) => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [formInView, setFormInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Check sessionStorage for dismissal
    if (sessionStorage.getItem("mwc-mobile-cta-dismissed") === "true") {
      setDismissed(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      if (hero) setVisible(window.scrollY > hero.offsetHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const formEl = document.getElementById("location-cta");
    if (!formEl) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => setFormInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observerRef.current.observe(formEl);
    return () => observerRef.current?.disconnect();
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("mwc-mobile-cta-dismissed", "true");
  };

  if (!visible || dismissed || formInView) return null;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-stretch"
      style={{
        height: 56,
        boxShadow: "0 -2px 10px rgba(0,0,0,0.15)",
      }}
    >
      <a
        href={`tel:${location.phone.replace(/[^0-9]/g, "")}`}
        className="flex-1 flex items-center justify-center gap-2 text-[12px] font-bold uppercase tracking-[0.06em]"
        style={{
          background: "#1A1A2E",
          color: "#FFFFFF",
          textDecoration: "none",
          borderRight: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Phone size={14} /> Call Now
      </a>
      <button
        onClick={() => document.getElementById("location-cta")?.scrollIntoView({ behavior: "smooth" })}
        className="flex-1 flex items-center justify-center text-[12px] font-bold uppercase tracking-[0.06em] cursor-pointer border-none"
        style={{ background: "#EA580C", color: "#FFFFFF" }}
      >
        Book Online
      </button>
      <button
        onClick={handleDismiss}
        className="flex items-center justify-center cursor-pointer border-none"
        style={{ background: "#1A1A2E", color: "rgba(255,255,255,0.6)", width: 36 }}
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
};
