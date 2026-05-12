import { Phone } from "lucide-react";

const V2Header = () => (
  <header
    className="sticky top-0 z-50 flex items-center justify-between px-5"
    style={{ backgroundColor: "#0B1029", height: 60, borderBottom: "1px solid rgba(255,255,255,0.12)" }}
  >
    <div
      className="flex flex-col leading-none uppercase"
      style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#fff", letterSpacing: "0.08em" }}
    >
      <span style={{ fontSize: 15 }}>Men's</span>
      <span style={{ fontSize: 15, marginTop: -2 }}>Wellness Centers</span>
    </div>
    <a
      href="tel:8663444955"
      className="flex items-center gap-2"
      style={{ color: "#B0ADA8", fontFamily: "'Montserrat', sans-serif", fontSize: 14, fontWeight: 500 }}
      aria-label="Call 866-344-4955"
    >
      <Phone className="h-5 w-5" />
      <span className="hidden md:inline">866-344-4955</span>
    </a>
  </header>
);

export default V2Header;
