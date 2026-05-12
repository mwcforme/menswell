import { Phone } from "lucide-react";
import { Link } from "react-router-dom";

const BookingHeader = () => {
  return (
    <header className="sticky top-0 z-50 px-4 pt-3 pb-2" style={{ backgroundColor: "#EBEAE8" }}>
      <nav
        className="mx-auto flex h-[64px] max-w-[1340px] items-center justify-between rounded-2xl px-6"
        style={{
          background: "rgba(0, 0, 51, 0.82)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
      >
        <Link to="/" className="flex-shrink-0">
          <img
            src="/logos/Text_Logo_white.png"
            alt="Men's Wellness Centers"
            className="h-8 w-auto md:h-9"
          />
        </Link>
        <a
          href="tel:8663444955"
          className="flex items-center gap-2 rounded-full px-5 py-2.5 text-white transition-all duration-300 hover:bg-white hover:text-[#000033]"
          style={{
            textDecoration: "none",
            border: "1.5px solid rgba(255,255,255,0.7)",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "0.06em",
          }}
        >
          <span className="hidden sm:inline">866-344-4955</span>
          <Phone size={16} strokeWidth={2.5} />
        </a>
      </nav>
    </header>
  );
};

export default BookingHeader;
