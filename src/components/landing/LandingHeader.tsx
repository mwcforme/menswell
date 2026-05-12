import { Phone } from "lucide-react";

export const LandingHeader = () => (
  <header className="sticky top-0 z-50" style={{ background: "#000033" }}>
    <div className="flex items-center justify-between px-6 mx-auto max-w-[1200px] h-16">
      <img
        src="/logos/Text_Logo_white.png"
        alt="Men's Wellness Centers"
        className="h-8 w-auto"
      />
      <a
        href="tel:8663444955"
        className="flex items-center gap-2 text-sm font-semibold tracking-wide transition-opacity duration-200 hover:opacity-80"
        style={{ color: "#FFFFFF" }}
      >
        <Phone className="h-4 w-4" />
        866-344-4955
      </a>
    </div>
  </header>
);
