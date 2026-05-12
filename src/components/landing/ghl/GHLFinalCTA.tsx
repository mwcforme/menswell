import { Check } from "@untitledui/icons";
import GHLTRTLeadForm from "../ghl-trt/GHLTRTLeadForm";
import type { GHLVerticalConfig } from "@/data/ghl-config";

const locations = [
  { name: "Richmond, VA", url: "https://maps.google.com/?q=Men's+Wellness+Centers+Richmond+VA" },
  { name: "Newport News, VA", url: "https://maps.google.com/?q=Men's+Wellness+Centers+Newport+News+VA" },
  { name: "Virginia Beach, VA", url: "https://maps.google.com/?q=Men's+Wellness+Centers+Virginia+Beach+VA" },
];

interface Props { config: GHLVerticalConfig }

const GHLFinalCTA = ({ config }: Props) => {
  const { finalCTA } = config;

  return (
    <section style={{ backgroundColor: "#000033" }} className="py-12 md:py-20">
      <div className="max-w-[1170px] mx-auto px-4 grid md:grid-cols-2 gap-12 items-start">
        <div>
          <p className="text-white/70 text-sm uppercase tracking-widest mb-2">{finalCTA.preTitle}</p>
          <h2 style={{ fontFamily: "'Bebas Neue', cursive" }} className="text-[40px] md:text-[48px] text-white leading-none mb-6">
            {finalCTA.headline}
          </h2>
          <p className="text-white/80 text-[15px] leading-relaxed mb-8">{finalCTA.body}</p>

          <ul className="space-y-3 mb-10">
            {["No obligation", "Appointments", "100% confidential"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-white/90 text-sm">
                <Check size={16} className="text-[#2ECC71]" />
                {item}
              </li>
            ))}
          </ul>

          <div>
            <p className="text-white/70 text-[13px] uppercase tracking-widest mb-3">Center Locations</p>
            <ul className="space-y-1.5">
              {locations.map((loc, i) => (
                <li key={i}>
                  <a href={loc.url} target="_blank" rel="noopener noreferrer" className="text-white/80 text-sm hover:text-[#E8670A] transition-colors underline underline-offset-2">
                    • {loc.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <GHLTRTLeadForm id={`ghl-final-form`} />
      </div>
    </section>
  );
};

export default GHLFinalCTA;
