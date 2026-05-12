import { Link } from "react-router-dom";

/**
 * Standardized footer compliance block: 3 disclaimers + legal links bar + copyright.
 * Drop into any footer to ensure sitewide compliance.
 */
export const FooterCompliance = () => (
  <>
    {/* 3 Disclaimers */}
    <div className="border-t border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-5 md:py-6 space-y-3 text-center">
        <p className="text-[11px] md:text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.40)" }}>
          The information presented on this website is provided for general informational purposes only and is not intended to constitute medical advice, diagnosis, or treatment. Men's Wellness Centers does not provide medical advice through this website, and nothing on this website should be relied upon as a substitute for an in-person evaluation, diagnosis, or consultation with a licensed healthcare professional.
        </p>
        <p className="text-[11px] md:text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.40)" }}>
          Men's Wellness Centers operates physical clinic locations only. Medical services are provided exclusively in person following an individualized evaluation and are rendered by licensed medical professionals exercising independent clinical judgment. All treatment protocols are selected based on each patient's health profile, lab results, and medical history. Men's Wellness Centers makes no representations, guarantees, or warranties regarding outcomes, effectiveness, or suitability of any treatment for any individual. Individual results and responses vary.
        </p>
        <p className="text-[11px] md:text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.40)" }}>
          Testimonials and reviews on this website reflect individual experiences only and are not intended to represent typical outcomes. Testimonials are not intended to make medical claims or to suggest that any service provided by Men's Wellness Centers diagnoses, treats, cures, mitigates, or prevents any disease or medical condition.
        </p>
      </div>
    </div>

    {/* Legal links bar */}
    <div className="border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5 flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.45)" }}>
          © 2026 Men's Wellness Centers. All Rights Reserved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-1 text-[11px]">
          {[
            { to: "/sitemap", label: "Site Map" },
            { to: "/prescribing-policy", label: "Safety Policy" },
            { to: "/terms-of-service", label: "Terms & Agreement" },
            { to: "/privacy-policy", label: "Notice of Privacy Practices" },
          ].map((link, i) => (
            <span key={link.label}>
              {i > 0 && <span style={{ color: "rgba(255,255,255,0.25)", margin: "0 6px" }}>|</span>}
              <Link
                to={link.to}
                className="uppercase tracking-wide font-medium transition-colors duration-200 hover:text-white/70"
                style={{ color: "rgba(255,255,255,0.50)", textDecoration: "none", letterSpacing: "0.05em" }}
              >
                {link.label}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </div>
  </>
);
