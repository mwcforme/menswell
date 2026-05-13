import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Phone, CalendarCheck, MessageSquare } from "lucide-react";

/** Routes where this bar should NOT appear (they have their own mobile CTAs) */
const EXCLUDED_ROUTES = ["/book", "/bookv2", "/intake", "/", "/wl", "/ed"];

export const MobileFooterBar = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  // Hide on excluded routes & landing pages with dedicated CTAs
  const isExcluded =
    EXCLUDED_ROUTES.includes(pathname.toLowerCase()) || pathname.startsWith("/lp/");

  useEffect(() => {
    if (isExcluded) return;

    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isExcluded]);

  if (isExcluded || !visible) return null;

  const openGHLChat = () => {
    // GoHighLevel chat widget trigger
    // GHL injects a global `window.LC_API` or similar — adjust to your widget's API
    const chatWidget = document.querySelector(
      '[data-ghl-chat], .ghl-chat-widget, #ghl-chat-widget'
    ) as HTMLElement | null;

    if (chatWidget) {
      chatWidget.click();
      return;
    }

    // Fallback: try common GHL chat open methods
    if ((window as any).GHL_CHAT?.open) {
      (window as any).GHL_CHAT.open();
    } else if ((window as any).LC_API?.open_chat_window) {
      (window as any).LC_API.open_chat_window();
    } else {
      // Ultimate fallback — scroll to booking form or navigate
      window.location.href = "/book";
    }
  };

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-stretch"
      style={{
        height: 56,
        background: "#000033",
        boxShadow: "0 -2px 12px rgba(0,0,0,0.25)",
      }}
      aria-label="Mobile quick actions"
    >
      {/* BOOK ONLINE */}
      <a
        href="/book"
        className="flex-1 flex flex-col items-center justify-center gap-1 no-underline cursor-pointer"
        style={{ color: "#FFFFFF", borderRight: "1px solid rgba(255,255,255,0.1)" }}
      >
        <CalendarCheck size={18} strokeWidth={1.8} />
        <span
          style={{
            fontSize: 10,
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Book Online
        </span>
      </a>

      {/* CHAT TO BOOK */}
      <button
        onClick={openGHLChat}
        className="flex-1 flex flex-col items-center justify-center gap-1 cursor-pointer"
        style={{
          color: "#FFFFFF",
          background: "transparent",
          border: "none",
          borderRight: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <MessageSquare size={18} strokeWidth={1.8} />
        <span
          style={{
            fontSize: 10,
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Chat to Book
        </span>
      </button>

      {/* CALL NOW */}
      <a
        href="tel:8663444955"
        className="flex-1 flex flex-col items-center justify-center gap-1 no-underline cursor-pointer"
        style={{ color: "#FFFFFF" }}
      >
        <Phone size={18} strokeWidth={1.8} />
        <span
          style={{
            fontSize: 10,
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Call Now
        </span>
      </a>
    </nav>
  );
};
