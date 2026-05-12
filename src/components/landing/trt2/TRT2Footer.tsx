import { Link } from "react-router-dom";

export const TRT2Footer = () => {
  return (
    <footer className="py-10 pb-24 md:pb-10" style={{ background: "#000033", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <img
          src="/logos/Text_Logo_white.png"
          alt="Men's Wellness Centers"
          className="h-10 mx-auto"
          loading="lazy"
        />

        <p className="text-sm mt-4" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Inter, sans-serif" }}>
          Men's Wellness Centers · Richmond · Newport News · Virginia Beach
        </p>

        <a
          href="tel:8663444955"
          className="inline-block mt-3 text-sm font-semibold"
          style={{ color: "#FFFFFF", fontFamily: "Inter, sans-serif", textDecoration: "none" }}
        >
          866-344-4955
        </a>

        <p className="text-xs mt-4" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}>
          © {new Date().getFullYear()} Men's Wellness Centers. All rights reserved.
        </p>

        <div className="flex items-center justify-center gap-4 mt-3">
          <Link to="/privacy-policy" className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}>
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}>
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};
