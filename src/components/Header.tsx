import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, ChevronDown, ArrowUpRight, MessageSquare, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ServicesMegaMenu, megaMenuCategories } from "./ServicesMegaMenu";
import { LocationsMegaMenu } from "./LocationsMegaMenu";

const navLinks = [
  { label: "Services", to: "/#services", hasMega: "services" },
  { label: "Locations", to: "/locations", hasMega: "locations" },
  { label: "How It Works", to: "/how-it-works" },
];

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileLocationsOpen, setMobileLocationsOpen] = useState(false);
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Force menu closed on mount
  useEffect(() => { setMenuOpen(false); }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ESC closes both menus
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMegaOpen(null); setMenuOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Scroll lock when mobile menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (!megaOpen) return;
    const onClick = () => setMegaOpen(null);
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [megaOpen]);

  const handleMegaEnter = useCallback((type: string) => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setMegaOpen(type);
  }, []);

  const handleMegaLeave = useCallback(() => {
    megaTimeout.current = setTimeout(() => setMegaOpen(null), 150);
  }, []);

  const handleNav = (to: string) => {
    setMenuOpen(false);
    setMegaOpen(null);
    if (to.startsWith("/#")) {
      const id = to.replace("/#", "");
      if (window.location.pathname !== "/") {
        navigate("/");
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(to);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-3">
        <nav
          aria-label="Main navigation"
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

          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) =>
              link.hasMega ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => handleMegaEnter(link.hasMega!)}
                  onMouseLeave={handleMegaLeave}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="flex items-center gap-1 text-[13px] font-medium uppercase transition-colors duration-200 cursor-pointer bg-transparent border-none relative"
                    style={{ color: megaOpen === link.hasMega ? "#FFFFFF" : "rgba(255,255,255,0.85)", padding: 0, fontWeight: 500, letterSpacing: "0.08em", fontSize: 13 }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#FFFFFF"; }}
                    onMouseLeave={(e) => { if (megaOpen !== link.hasMega) e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
                  >
                    {link.label}
                    <ChevronDown
                      size={12}
                      className="transition-transform duration-200"
                      style={{ transform: megaOpen === link.hasMega ? "rotate(180deg)" : "rotate(0)" }}
                    />
                    {megaOpen === link.hasMega && (
                      <span
                        className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-1 h-1 rounded-full"
                        style={{ background: "#FFFFFF" }}
                      />
                    )}
                  </button>
                  {/* Invisible bridge to keep hover zone continuous */}
                  {megaOpen === link.hasMega && (
                    <div className="absolute left-1/2 -translate-x-1/2 w-[200px] h-8 top-full" />
                  )}
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.to}
                  onClick={(e) => { e.preventDefault(); handleNav(link.to); }}
                  className="text-[13px] uppercase transition-colors duration-200 cursor-pointer"
                  style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontWeight: 500, letterSpacing: "0.08em", fontSize: 13 }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#FFFFFF"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => {
                const el = document.getElementById("booking");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white uppercase hover:bg-white hover:text-[#000033] transition-all duration-300 whitespace-nowrap cursor-pointer bg-transparent"
              style={{ border: "1.5px solid rgba(255,255,255,0.7)", fontWeight: 700, fontSize: 13, letterSpacing: "0.06em" }}
            >
              CHAT TO BOOK
              <MessageSquare size={16} strokeWidth={2.5} />
            </button>
            <a
              href="tel:8663444955"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white hover:bg-white hover:text-[#000033] transition-all duration-300 whitespace-nowrap"
              style={{ textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.7)", fontWeight: 700, fontSize: 13, letterSpacing: "0.06em" }}
            >
              (866) 344-4955
              <Phone size={16} strokeWidth={2.5} />
            </a>
            <a
              href="/book"
              className="flex items-center px-6 py-2.5 rounded-full bg-white text-[#000033] uppercase hover:bg-white/90 transition-all duration-300 whitespace-nowrap"
              style={{ textDecoration: "none", fontWeight: 700, fontSize: 13, letterSpacing: "0.06em" }}
            >
              NO COST CONSULTATION
            </a>
          </div>
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden bg-transparent border-none cursor-pointer p-1"
            style={{ color: "#FFFFFF" }}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </nav>
      </header>

      <ServicesMegaMenu isOpen={megaOpen === "services"} onClose={() => setMegaOpen(null)} onMouseEnter={() => handleMegaEnter("services")} onMouseLeave={handleMegaLeave} />
      <LocationsMegaMenu isOpen={megaOpen === "locations"} onClose={() => setMegaOpen(null)} onMouseEnter={() => handleMegaEnter("locations")} onMouseLeave={handleMegaLeave} />

      <div
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6 overflow-y-auto py-20 transition-all duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto visible"
            : "opacity-0 pointer-events-none invisible"
        }`}
        style={{
          background: "rgba(0, 0, 51, 0.95)",
          backdropFilter: "blur(24px) saturate(150%)",
          WebkitBackdropFilter: "blur(24px) saturate(150%)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        aria-hidden={!menuOpen}
      >
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 right-5 bg-transparent border-none cursor-pointer w-11 h-11 flex items-center justify-center"
            style={{ color: "#FFFFFF" }}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          <img src="/logos/Text_Logo_white.png" alt="Men's Wellness Centers" className="h-8 w-auto mb-4" />

          {navLinks.map((link) =>
            link.hasMega === "services" ? (
              <div key={link.label} className="flex flex-col items-center w-full max-w-xs">
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex items-center gap-2 text-xl font-medium uppercase tracking-wide cursor-pointer bg-transparent border-none"
                  style={{ color: "#FFFFFF" }}
                >
                  {link.label}
                  <ChevronDown
                    size={16}
                    className="transition-transform duration-200"
                    style={{ transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0)" }}
                  />
                </button>
                {mobileServicesOpen && (
                  <div className="mt-4 space-y-3 w-full">
                    {megaMenuCategories.map((cat) => (
                      <a
                        key={cat.title}
                        href="/#services"
                        onClick={(e) => { e.preventDefault(); handleNav("/#services"); }}
                        className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide cursor-pointer"
                        style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}
                      >
                        <ArrowUpRight size={14} style={{ color: "#E8670A" }} />
                        {cat.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : link.hasMega === "locations" ? (
              <div key={link.label} className="flex flex-col items-center w-full max-w-xs">
                <button
                  onClick={() => setMobileLocationsOpen(!mobileLocationsOpen)}
                  className="flex items-center gap-2 text-xl font-medium uppercase tracking-wide cursor-pointer bg-transparent border-none"
                  style={{ color: "#FFFFFF" }}
                >
                  {link.label}
                  <ChevronDown
                    size={16}
                    className="transition-transform duration-200"
                    style={{ transform: mobileLocationsOpen ? "rotate(180deg)" : "rotate(0)" }}
                  />
                </button>
                {mobileLocationsOpen && (
                  <div className="mt-4 space-y-3 w-full">
                    {[
                      { name: "Richmond, VA", to: "/locations/richmond-va" },
                      { name: "Newport News, VA", to: "/locations/newport-news-va" },
                      { name: "Virginia Beach, VA", to: "/locations/virginia-beach-va" },
                    ].map((loc) => (
                      <a
                        key={loc.name}
                        href={loc.to}
                        onClick={(e) => { e.preventDefault(); handleNav(loc.to); }}
                        className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide cursor-pointer"
                        style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}
                      >
                        <ArrowUpRight size={14} style={{ color: "#E8670A" }} />
                        {loc.name}
                      </a>
                    ))}
                    <a
                      href="/locations"
                      onClick={(e) => { e.preventDefault(); handleNav("/locations"); }}
                      className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide cursor-pointer mt-2"
                      style={{ color: "#E8670A", textDecoration: "none" }}
                    >
                      <ArrowUpRight size={14} />
                      Find a Center
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <a
                key={link.label}
                href={link.to}
                onClick={(e) => { e.preventDefault(); handleNav(link.to); }}
                className="text-xl font-medium uppercase tracking-wide cursor-pointer"
                style={{ color: "#FFFFFF", textDecoration: "none" }}
              >
                {link.label}
              </a>
            )
          )}

          <div className="flex flex-col items-center gap-3 w-full max-w-xs mt-4">
            <button
              onClick={() => { setMenuOpen(false); setTimeout(() => { const el = document.getElementById("booking"); if (el) el.scrollIntoView({ behavior: "smooth" }); }, 100); }}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-white uppercase hover:bg-white hover:text-[#000033] transition-all duration-300 cursor-pointer bg-transparent"
              style={{ border: "1.5px solid rgba(255,255,255,0.7)", fontWeight: 700, fontSize: 13, letterSpacing: "0.06em" }}
            >
              CHAT TO BOOK
              <MessageSquare size={16} strokeWidth={2.5} />
            </button>
            <a
              href="tel:8663444955"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-white hover:bg-white hover:text-[#000033] transition-all duration-300"
              style={{ textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.7)", fontWeight: 700, fontSize: 13, letterSpacing: "0.06em" }}
            >
              (866) 344-4955
              <Phone size={16} strokeWidth={2.5} />
            </a>
            <a
              href="/book"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center w-full py-3 rounded-full bg-white text-[#000033] uppercase hover:bg-white/90 transition-all duration-300"
              style={{ textDecoration: "none", fontWeight: 700, fontSize: 13, letterSpacing: "0.06em" }}
            >
              CONSULTATION
            </a>
          </div>
      </div>

      <div
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center lg:hidden"
        style={{ height: 56, background: "#000033", borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <a
          href="/book"
          className="uppercase cursor-pointer bg-transparent border-none"
          style={{ color: "#FFFFFF", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", minHeight: 44, display: "flex", alignItems: "center", textDecoration: "none" }}
        >
          Consultation
        </a>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes megaMenuIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </>
  );
};
