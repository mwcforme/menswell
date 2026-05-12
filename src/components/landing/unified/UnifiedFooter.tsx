import { FooterCompliance } from "@/components/ui/FooterCompliance";

const locations = [
  { city: "Richmond", address: "4050 Innslake Dr, Suite 360, Glen Allen, VA 23060", phone: "804-346-4636" },
  { city: "Newport News", address: "827 Diligence Dr, Suite 206, Newport News, VA 23606", phone: "757-806-6263" },
  { city: "Virginia Beach", address: "996 First Colonial Rd, Virginia Beach, VA 23454", phone: "757-806-6263" },
];

export const UnifiedFooter = () => {
  return (
    <footer style={{ background: "#1B2A4A" }} className="text-white pb-16 md:pb-0">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        {/* Logo + Tagline */}
        <div className="mb-12">
          <img
            src="/logos/Text_Logo_white.png"
            alt="Men's Wellness Centers"
            className="h-10 w-auto mb-4"
          />
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
            Giving Men's Sexual and Restorative Healthcare a Good Name
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {locations.map((loc) => (
            <div key={loc.city}>
              <h3 className="font-bold text-base mb-2">{loc.city}</h3>
              <p className="text-sm mb-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                {loc.address}
              </p>
              <a
                href={`tel:${loc.phone.replace(/-/g, "")}`}
                className="text-sm font-medium"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                {loc.phone}
              </a>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mb-8">
          <p className="text-sm mb-1">
            <a href="tel:8663444955" className="font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>
              866-344-4955
            </a>
            <span className="mx-3" style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
            <a href="mailto:info@menswellnesscenters.com" style={{ color: "rgba(255,255,255,0.7)" }}>
              info@menswellnesscenters.com
            </a>
          </p>
        </div>

        {/* Compliance Badges */}
        <div className="flex flex-wrap gap-6 mb-8">
          {["CLIA CERTIFIED", "LEGITSCRIPT VERIFIED", "HIPAA COMPLIANT"].map((badge) => (
            <span
              key={badge}
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      <FooterCompliance />
    </footer>
  );
};
