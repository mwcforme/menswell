import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { LocationData } from "@/data/locations";

const getServices = (city: string) => [
  {
    title: "Testosterone Therapy",
    subtitle: `Physician-supervised TRT at our ${city} center`,
    description: "Testosterone Replacement Therapy restores your testosterone to optimal levels through physician-supervised protocols. We don't just prescribe. We monitor, adjust, and optimize your levels with regular lab work and face-to-face consultations.",
    includes: ["Comprehensive hormone panel (not just total T)", "Multiple delivery options (injections, creams, pellets)", "Ongoing lab monitoring every 90 days", "Unlimited follow-up visits with your physician"],
    results: "Increased energy within 2-4 weeks, improved mood and mental clarity, better sleep quality, enhanced muscle recovery and body composition changes within 8-12 weeks.",
    link: "/services/testosterone-therapy",
    image: "/images/services/testosterone.jpg",
    alt: `Man after testosterone therapy at Men's Wellness Centers ${city}`,
  },
  {
    title: "ED Treatment",
    subtitle: `Discreet, effective prescriptions in ${city}`,
    description: "We treat the root cause of erectile dysfunction, not just the symptoms. Our physicians evaluate cardiovascular health, hormone levels, and lifestyle factors to create a multi-modal treatment approach that goes far beyond a pill.",
    includes: ["Diagnostic evaluation including cardiovascular screening", "Prescription oral medications", "Injectable therapies (trimix, bi-mix)", "Hormone optimization as underlying treatment"],
    results: "Improved performance and confidence, spontaneous function restoration in many cases, reduced reliance on on-demand medications over time.",
    link: "/services/sexual-health",
    image: "/images/services/sexual-wellness-couple.png",
    alt: `Couple after ED treatment at Men's Wellness Centers ${city}`,
  },
  {
    title: "Medical Weight Loss",
    subtitle: `GLP-1 programs monitored in ${city}`,
    description: "Our physician-supervised weight loss programs combine FDA-noted GLP-1 medications with metabolic testing, nutrition guidance, and hormone optimization. This is not a diet. It's a medical protocol designed for men whose weight won't respond to willpower alone.",
    includes: ["Metabolic and thyroid panel testing", "GLP-1 medication options", "Body composition analysis", "Combined with TRT when clinically appropriate"],
    results: "Average 15-20% body weight reduction over 6-12 months, reduced visceral fat, improved energy and cardiovascular markers, sustainable results through ongoing medical support.",
    link: "/services/weight-loss",
    image: "/images/services/weight-loss.jpg",
    alt: `Man running after weight loss program in ${city}`,
  },
  {
    title: "Peptide Therapy",
    subtitle: `Performance peptides prescribed in ${city}`,
    description: "Peptides are short-chain amino acids that signal your body to optimize specific functions, from growth hormone production to tissue repair to immune response. Our physicians prescribe targeted peptide protocols based on your goals and bloodwork.",
    includes: ["BPC-157, CJC-1295/Ipamorelin, and other clinically studied peptides", "Customized to individual labs and goals", "Injectable and oral options", "Monitored by your physician"],
    results: "Improved recovery from training and injury, deeper sleep quality, enhanced immune function, accelerated healing.",
    link: "/services/wellness-vitality",
    image: "/images/services/peptides.jpg",
    alt: `Man after peptide therapy at Men's Wellness Centers ${city}`,
  },
  {
    title: "Anti-Aging & Longevity",
    subtitle: "NAD+ infusions and hormone optimization",
    description: "Our anti-aging protocols go beyond surface-level treatment. We use advanced biomarkers, comprehensive metabolic panels, and targeted therapies to slow biological aging and optimize how you feel, perform, and recover, from the inside out.",
    includes: ["Advanced biomarker testing (inflammation, oxidative stress)", "NAD+ and IV therapy options", "Peptide stacking protocols", "Quarterly health optimization reviews"],
    results: "Measurable improvements in biological age markers, increased vitality and cognitive sharpness, improved cardiovascular and metabolic indicators.",
    link: "/services/wellness-vitality",
    image: "/images/services/anti-aging-bridge.png",
    alt: `Man stretching before run near ${city} wellness center`,
  },
  {
    title: "Labs & Diagnostics",
    subtitle: `Results reviewed in-visit on-site in ${city}`,
    description: "We run the most comprehensive men's health panel available, and you get results the same day, not in a week. Our in-house CLIA-certified lab tests over 40 biomarkers including complete hormone panels, metabolic markers, cardiovascular indicators, and more.",
    includes: ["Same-day in-house results (CLIA certified)", "40+ biomarkers tested", "Complete hormone panel (free T, total T, SHBG, estradiol, DHEA, cortisol)", "PSA screening, vitamin and nutrient levels"],
    results: "Clear understanding of your health baseline, identification of previously undiagnosed issues, data-driven treatment decisions with your physician.",
    link: "/services/testosterone-therapy",
    image: "/images/services/labs-porch.png",
    alt: `On-site labs at Men's Wellness Centers ${city}`,
  },
];

const ServiceCard = ({ s, isExpanded, onToggle }: {
  s: ReturnType<typeof getServices>[number];
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  return (
    <div
      className="flex flex-col rounded-xl md:rounded-2xl overflow-hidden transition-all duration-200 ease-out"
      style={{
        background: "#FFFFFF",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.10)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
      }}
    >
      {/* Image — fixed 16:9 */}
      <Link to={s.link} className="block" style={{ textDecoration: "none" }}>
        <div className="w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <img
            src={s.image}
            alt={s.alt}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = "none";
              const fallback = target.parentElement;
              if (fallback) fallback.style.background = "linear-gradient(to bottom, #C8C6C1, #A8A59E)";
            }}
          />
        </div>
      </Link>

      {/* Card body — flex:1 pushes toggle to bottom */}
      <div className="flex flex-col flex-1">
        <div className="px-4 md:px-5 pt-4 pb-2 flex-1">
          <h3
            className="font-bold uppercase text-[13px] md:text-[15px] tracking-wide leading-tight"
            style={{ color: "#000033" }}
          >
            {s.title}
          </h3>
          <p className="text-[11px] md:text-[12px] mt-1" style={{ color: "#999" }}>
            {s.subtitle}
          </p>
          <p className="mt-3 text-[12px] md:text-[13px] leading-relaxed" style={{ color: "#555" }}>
            {s.description.split(". ").slice(0, 2).join(". ")}.
          </p>
        </div>

        {/* Expandable details */}
        <div
          style={{
            maxHeight: isExpanded ? 600 : 0,
            opacity: isExpanded ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 300ms ease-out, opacity 200ms ease-out",
          }}
        >
          <div className="px-4 md:px-5 pt-1 pb-2">
            <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.12em] mb-2" style={{ color: "#999" }}>
              What's included
            </p>
            <ul className="space-y-1 mb-3">
              {s.includes.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#E8670A" }} />
                  <span className="text-[11px] md:text-[12px] leading-relaxed" style={{ color: "#666" }}>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[11px] md:text-[12px] leading-relaxed mb-3" style={{ color: "#888" }}>
              <span className="font-semibold" style={{ color: "#555" }}>Members commonly report:</span> {s.results}
            </p>
            <Link
              to={s.link}
              className="inline-flex items-center gap-1 text-[11px] md:text-[12px] font-semibold uppercase tracking-wide"
              style={{ color: "#E8670A", textDecoration: "none" }}
            >
              Full service details <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Toggle — pinned to bottom via mt-auto */}
        <button
          type="button"
          onClick={onToggle}
          className="mt-auto w-full flex items-center justify-center gap-1.5 py-3 cursor-pointer bg-transparent border-none transition-colors hover:bg-[#F5F4F2]"
          style={{
            borderTop: "1px solid rgba(0,0,0,0.06)",
            color: "#E8670A",
          }}
        >
          <ChevronDown
            size={14}
            strokeWidth={2.5}
            style={{
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 200ms ease",
            }}
          />
          <span className="text-[11px] md:text-[12px] font-semibold uppercase tracking-wide">
            {isExpanded ? "Show Less" : "Learn More"}
          </span>
        </button>
      </div>
    </div>
  );
};

interface Props {
  location: LocationData;
}

export const LocationServices = ({ location }: Props) => {
  const services = getServices(location.city);
  const gridRef = useScrollReveal({ staggerChildren: true, staggerDelay: 80 });
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggleCard = (title: string) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  return (
    <section style={{ background: "#EBEAE8", padding: "80px 0" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-4">
          <h2
            className="font-bold text-base md:text-lg uppercase tracking-wide"
            style={{ color: "#000033" }}
          >
            WHAT TREATMENTS ARE AVAILABLE AT MEN'S WELLNESS CENTERS IN {location.city.toUpperCase()}?
          </h2>
        </div>

        <p className="text-center mb-10 md:mb-14 text-[13px] md:text-sm font-normal max-w-3xl mx-auto leading-relaxed" style={{ color: "#666666" }}>
          Men's Wellness Centers in {location.city}, VA offers six core treatment programs: Testosterone Replacement Therapy (TRT), Erectile Dysfunction (ED) Treatment, Medical Weight Loss with GLP-1 medications, Peptide Therapy, Anti-Aging &amp; Longevity Medicine, and Comprehensive Lab Diagnostics. All treatments are physician-supervised with same-day lab results at our CLIA-certified {location.city === "Richmond" ? "Glen Allen" : location.city} facility.
        </p>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: 24 }}
        >
          {services.map((s) => (
            <ServiceCard
              key={s.title}
              s={s}
              isExpanded={expandedCards.has(s.title)}
              onToggle={() => toggleCard(s.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
