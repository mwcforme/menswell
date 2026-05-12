import { Link } from "react-router-dom";
import { FooterCompliance } from "@/components/ui/FooterCompliance";

export const LandingFooter = () => (
  <footer className="relative" style={{ background: "#000033" }}>
    <div className="py-8 text-center px-4">
      <div className="space-y-3">
        <img
          src="/logos/Text_Logo_white.png"
          alt="Men's Wellness Centers"
          className="h-6 w-auto mx-auto"
        />
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.60)" }}>
          Richmond · Newport News · Virginia Beach
        </p>
        <a
          href="tel:8663444955"
          className="block text-sm font-semibold"
          style={{ color: "#FFFFFF" }}
        >
          866-344-4955
        </a>
      </div>
    </div>
    <FooterCompliance />
  </footer>
);
