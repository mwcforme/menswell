import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import type { LocationData } from "@/data/locations";

interface Props {
  location: LocationData;
}

export const LocationMobileCTA = ({ location }: Props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      if (hero) setVisible(window.scrollY > hero.offsetHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-stretch"
      style={{ height: 56 }}
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
        style={{ background: "#E8670A", color: "#FFFFFF" }}
      >
        Book Consult
      </button>
    </div>
  );
};
