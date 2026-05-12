import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface LPHeaderProps {
  ctaTarget?: string;
}

export const LPHeader = ({ ctaTarget = "#book" }: LPHeaderProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-3">
        <nav
          className="max-w-[1340px] mx-auto rounded-2xl px-6 h-[64px] flex items-center justify-between"
          style={{
            background: scrolled ? "rgba(0, 0, 51, 0.82)" : "rgba(0, 0, 51, 0.2)",
            backdropFilter: scrolled ? "blur(24px)" : "blur(0px)",
            WebkitBackdropFilter: scrolled ? "blur(24px)" : "blur(0px)",
            border: `1px solid rgba(255,255,255,${scrolled ? "0.1" : "0.06"})`,
            boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.2)" : "none",
            transition: "all 500ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <Link to="/" className="flex-shrink-0">
            <img src="/logos/Text_Logo_white.png" alt="Men's Wellness Centers" className="h-8 md:h-9 w-auto" />
          </Link>
        </nav>
      </header>

      {/* Mobile sticky bottom CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center lg:hidden"
        style={{ height: 56, background: "#E8670A", borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <button
          onClick={() => scrollTo(ctaTarget)}
          className="uppercase cursor-pointer bg-transparent border-none"
          style={{ color: "#FFFFFF", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", minHeight: 44, display: "flex", alignItems: "center" }}
        >
          Consultation
        </button>
      </div>
    </>
  );
};
