import { useEffect, useState } from "react";
import { Phone, Calendar } from "lucide-react";

export const TRTv2MobileCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 grid grid-cols-2 gap-2"
      style={{ background: "rgba(0,0,51,0.98)", borderTop: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}
    >
      <a
        href="tel:8663444955"
        className="flex items-center justify-center gap-2 rounded-full py-3 text-xs font-bold uppercase"
        style={{ background: "transparent", color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.4)", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif" }}
      >
        <Phone className="h-4 w-4" /> Call
      </a>
      <button
        onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
        className="flex items-center justify-center gap-2 rounded-full py-3 text-xs font-bold uppercase cursor-pointer"
        style={{ background: "#E8670A", color: "#FFFFFF", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif", border: "none" }}
      >
        <Calendar className="h-4 w-4" /> Book Consultation
      </button>
    </div>
  );
};
