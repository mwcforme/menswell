import { Instagram, Facebook, Linkedin, ShieldCheck, BadgeCheck, Lock } from "lucide-react";
import { FooterCompliance } from "@/components/ui/FooterCompliance";

const certBadges = [
  { icon: ShieldCheck, label: "CLIA Certified" },
  { icon: BadgeCheck, label: "LegitScript Verified" },
  { icon: Lock, label: "HIPAA Compliant" },
];

export const LPFooter = () => (
  <footer className="relative pb-20 lg:pb-0" style={{ background: "#000033" }}>
    {/* Glow divider */}
    <div
      className="absolute top-0"
      style={{
        left: "10%",
        right: "10%",
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent)",
      }}
    />

    {/* Main content */}
    <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
          <img src="/logos/Text_Logo_white.png" alt="Men's Wellness Centers" className="h-8 w-auto opacity-80" />
          <p className="mt-4 text-[13px] italic leading-relaxed max-w-[280px]" style={{ color: "rgba(255,255,255,0.55)" }}>
            Giving Men's Sexual and Restorative Healthcare a Good Name
          </p>
          <div className="flex gap-3 mt-5">
            {[
              { Icon: Instagram, url: "https://www.instagram.com/menswellnesscenters/", label: "Instagram" },
              { Icon: Facebook, url: "https://www.facebook.com/menswellnesscentersinc/", label: "Facebook" },
              { Icon: Linkedin, url: "https://www.linkedin.com/company/menswellnesscenters/", label: "LinkedIn" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.55)" }}
              >
                <s.Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div>
          <h4 className="uppercase mb-5 font-semibold text-[13px] tracking-[0.1em]" style={{ color: "#FFFFFF" }}>
            3 Locations Across Virginia
          </h4>
          {[
            { name: "Richmond, VA", phone: "804-346-4636" },
            { name: "Newport News, VA", phone: "757-806-6263" },
            { name: "Virginia Beach, VA", phone: "757-806-6263" },
          ].map((loc) => (
            <div key={loc.name} className="mb-4">
              <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.65)" }}>{loc.name}</p>
              <a href={`tel:${loc.phone.replace(/-/g, "")}`} className="text-[11px] hover:text-white/60 transition-colors" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>
                {loc.phone}
              </a>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 className="uppercase mb-5 font-semibold text-[13px] tracking-[0.1em]" style={{ color: "#FFFFFF" }}>
            Contact
          </h4>
          <a href="tel:8663444955" className="block text-[15px] font-semibold mb-2" style={{ color: "#E8670A", textDecoration: "none" }}>
            866-344-4955
          </a>
          <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.55)" }}>
            info@menswellnesscenters.com
          </p>
        </div>
      </div>
    </div>

    {/* Trust Badges */}
    <div className="border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {certBadges.map((b) => {
          const Icon = b.icon;
          return (
            <div key={b.label} className="flex items-center gap-2">
              <Icon size={22} style={{ color: "rgba(255,255,255,0.50)" }} />
              <span className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.55)" }}>{b.label}</span>
            </div>
          );
        })}
      </div>
    </div>

    <FooterCompliance />
  </footer>
);
