import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import TreatmentCard from "./TreatmentCard";
import {
  categories,
  comparisonData as defaultComparisonData,
  faqData as defaultFaqData,
  type Treatment,
  type ComparisonRow,
  type FAQ,
} from "@/data/treatments";
import {
  Shield, RefreshCw, Clock, Heart, Target, Flame,
  TrendingDown, Gauge, Zap, Battery, Dna, FlaskConical,
  Plus, Minus, Star, Sparkles, Layers, Droplet,
} from "lucide-react";

const iconMap: Record<string, any> = {
  Shield, RefreshCw, Clock, Heart, Target, Flame,
  TrendingDown, Gauge, Zap, Battery, Dna, FlaskConical,
  Sparkles, Layers, Droplet,
};

interface ServiceTestimonial {
  name: string;
  location: string;
  date: string;
  pill: string;
  quote: string;
}

interface ServicePageLayoutProps {
  title: string;
  subtitle: string;
  treatments: Treatment[];
  activeSlug: string;
  heroImage?: string;
  comparisonRows?: ComparisonRow[];
  faqs?: FAQ[];
  bottomCtaHeading?: string;
  bottomCtaSubtext?: string;
  testimonials?: ServiceTestimonial[];
  /* Content slots */
  afterHeroContent?: React.ReactNode;
  afterCardsContent?: React.ReactNode;
  afterComparisonContent?: React.ReactNode;
  beforeFaqContent?: React.ReactNode;
  replaceCardsContent?: React.ReactNode;
  replaceComparisonContent?: React.ReactNode;
}

/* ─── FAQ Item ─── */
const FAQItem = ({ q, a, open, toggle }: { q: string; a: string; open: boolean; toggle: () => void }) => (
  <div style={{ borderBottom: "1px solid #E5E5E5" }}>
    <button
      onClick={toggle}
      className="flex items-center justify-between w-full text-left py-6 px-2 rounded transition-colors duration-150 cursor-pointer hover:bg-[#F9F9F9]"
      style={{ color: "#000033", fontSize: 17, fontWeight: 600, minHeight: 44 }}
    >
      {q}
      {open ? <Minus size={20} color="#E8670A" className="flex-shrink-0 ml-4" /> : <Plus size={20} color="#E8670A" className="flex-shrink-0 ml-4" />}
    </button>
    <div
      style={{
        maxHeight: open ? 500 : 0,
        overflow: "hidden",
        transition: "max-height 0.3s ease",
      }}
    >
      <p className="px-2" style={{ paddingBottom: 24, fontSize: 15, color: "#4A4A4A", lineHeight: 1.7 }}>{a}</p>
    </div>
  </div>
);

const ServicePageLayout = ({
  title, subtitle, treatments, activeSlug, heroImage,
  comparisonRows, faqs,
  bottomCtaHeading = "See What Your Levels Say",
  bottomCtaSubtext,
  testimonials: customTestimonials,
  afterHeroContent, afterCardsContent, afterComparisonContent,
  beforeFaqContent, replaceCardsContent, replaceComparisonContent,
}: ServicePageLayoutProps) => {
  const [openFaq, setOpenFaq] = useState(0);
  const resolvedHeroImage = heroImage || "https://images.pexels.com/photos/1547248/pexels-photo-1547248.jpeg?auto=compress&cs=tinysrgb&w=1600";
  const resolvedComparison = comparisonRows || defaultComparisonData;
  const resolvedFaqs = faqs || defaultFaqData;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: resolvedFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const specialtyMap: Record<string, { specialty: string; condition: string }> = {
    "testosterone-therapy": { specialty: "Endocrinology", condition: "Hypogonadism" },
    "weight-loss": { specialty: "Bariatrics", condition: "Obesity" },
    "sexual-health": { specialty: "Urology", condition: "Erectile Dysfunction" },
    "wellness-vitality": { specialty: "Preventive Medicine", condition: "Aging-Related Decline" },
  };
  const spec = specialtyMap[activeSlug];
  const medicalWebPageSchema = activeSlug && spec ? {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: title,
    description: `Physician-supervised ${title.toLowerCase()} at Men's Wellness Centers in Virginia. On-site labs, in-person care, real results.`,
    url: `https://mwcv2.lovable.app/services/${activeSlug}`,
    lastReviewed: "2026-03-26",
    reviewedBy: {
      "@type": "Person",
      name: "Christopher Stainback, PA",
      jobTitle: "Physician Assistant",
      worksFor: { "@type": "Organization", name: "Men's Wellness Centers" },
    },
    specialty: { "@type": "MedicalSpecialty", name: spec.specialty },
    about: { "@type": "MedicalCondition", name: spec.condition },
  } : null;
  const sectionTitle =
    activeSlug === ""
      ? "All Services & Treatments"
      : `${categories.find((c) => c.slug === activeSlug)?.name ?? ""} Treatments`;

  useEffect(() => {
    const pageTitle = activeSlug
      ? `${categories.find((c) => c.slug === activeSlug)?.name ?? title} | Men's Wellness Centers`
      : "Services & Treatments | Men's Wellness Centers";
    document.title = pageTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    const descText = activeSlug
      ? `Physician-supervised ${title.toLowerCase()} at Men's Wellness Centers in Virginia. On-site labs, in-person care, real results.`
      : "Explore all physician-supervised treatments at Men's Wellness Centers. TRT, ED medications, weight loss, and wellness injections across Virginia.";
    if (metaDesc) {
      metaDesc.setAttribute("content", descText);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = descText;
      document.head.appendChild(meta);
    }
  }, [activeSlug, title]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        {medicalWebPageSchema && <script type="application/ld+json">{JSON.stringify(medicalWebPageSchema)}</script>}
      </Helmet>
      <Header />
      <main className="flex-1">
      {/* ═══ SECTION 1: HERO + TAB BAR ═══ */}
      <section className="relative min-h-[280px] md:min-h-[340px]">
        <img
          src={resolvedHeroImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(0,0,51,0.70), rgba(0,0,51,0.50), transparent)" }}
        />
        <div className="relative max-w-[1280px] mx-auto px-6 md:px-8 flex flex-col justify-center min-h-[280px] md:min-h-[340px]" style={{ paddingTop: 120, paddingBottom: 80 }}>
          <p className="text-base md:text-lg mb-3" style={{ color: "rgba(255,255,255,0.80)" }}>
            {subtitle}
          </p>
          <h1
            className="font-bold uppercase tracking-wide text-4xl md:text-5xl lg:text-[clamp(40px,5vw,60px)]"
            style={{ color: "#FFFFFF" }}
          >
            {title}
          </h1>
        </div>

        {/* Tab Bar */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8 flex items-center gap-6 md:gap-8 overflow-x-auto scrollbar-hide whitespace-nowrap">
            {categories.map((cat) => {
              const isActive = cat.slug === activeSlug;
              const to = cat.slug ? `/services/${cat.slug}` : "/services";
              return (
                <Link
                  key={cat.slug}
                  to={to}
                  className="pb-4 text-[15px] transition-colors duration-200 cursor-pointer"
                  style={{
                    color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.70)",
                    fontWeight: isActive ? 500 : 400,
                    borderBottom: isActive ? "3px solid #E8670A" : "3px solid transparent",
                    textDecoration: "none",
                    minHeight: 44,
                    display: "flex",
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.90)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.70)";
                  }}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ MEDICALLY REVIEWED CREDIT ═══ */}
      {activeSlug && (
        <div style={{ background: "#F5F5F5", borderBottom: "1px solid #E5E5E5" }} className="px-6 md:px-8 py-3">
          <p className="max-w-[1280px] mx-auto text-[13px]" style={{ color: "#6B7280" }}>
            Medically reviewed by Christopher Stainback, PA | Last updated March 2026
          </p>
        </div>
      )}

      {/* ═══ SLOT: AFTER HERO ═══ */}
      {afterHeroContent}

      {/* ═══ SECTION 2: SERVICE CARDS GRID ═══ */}
      {replaceCardsContent || (
        <section style={{ background: "#F5F5F5" }} className="pt-12 pb-20 px-6 md:px-8">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="font-bold text-2xl mb-10" style={{ color: "#000033" }}>
              {sectionTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {treatments.map((t, i) => (
                <TreatmentCard key={t.slug} treatment={t} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ SLOT: AFTER CARDS ═══ */}
      {afterCardsContent}

      {/* ═══ SECTION 3: COMPARISON TABLE ═══ */}
      {replaceComparisonContent || (
        <section style={{ background: "#FFFFFF" }} className="py-16 px-6 md:px-8 overflow-hidden">
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-8">
              <h2 className="font-bold text-xl" style={{ color: "#000033" }}>
                {activeSlug ? `Compare ${categories.find((c) => c.slug === activeSlug)?.name ?? ""} Treatments` : "Compare All Treatments"}
              </h2>
            </div>

            <div className="overflow-x-auto max-w-full -mx-6 px-6 md:mx-0 md:px-0">
              <table className="w-full text-left" style={{ minWidth: 900 }}>
                <thead>
                  <tr>
                    <th className="px-4 py-3" style={{ background: "#F5F5F5", minWidth: 100 }} />
                    {resolvedComparison.map((row) => {
                      const Icon = iconMap[row.icon];
                      return (
                        <th
                          key={row.service}
                          className="px-4 py-3 text-center"
                          style={{ background: "#F5F5F5", minWidth: 160 }}
                        >
                          <div className="flex flex-col items-center gap-2">
                            {Icon && <Icon size={28} color="#000033" />}
                            <span className="text-[13px] font-semibold uppercase" style={{ color: "#000033" }}>
                              {row.service}
                            </span>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {(["administration", "benefits", "howItWorks", "timeline"] as const).map((key) => (
                    <tr key={key}>
                      <td
                        className="px-4 py-3 text-[14px] font-semibold"
                        style={{ color: "#000033", background: "#F5F5F5" }}
                      >
                        {key === "howItWorks" ? "How It Works" : key.charAt(0).toUpperCase() + key.slice(1)}
                      </td>
                      {resolvedComparison.map((row) => (
                        <td
                          key={row.service + key}
                          className="px-4 py-4 text-[13px] leading-relaxed"
                          style={{ color: "#666666", borderBottom: "1px solid #F0F0F0" }}
                        >
                          {row[key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ═══ SLOT: AFTER COMPARISON ═══ */}
      {afterComparisonContent}

      {/* ═══ SECTION 5: TESTIMONIALS ═══ */}
      <section style={{ background: "#F5F5F5" }} className="py-16 px-6 md:px-8">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="font-bold text-3xl uppercase" style={{ color: "#000033" }}>
            What Our Members Say
          </h2>
          <p className="text-base mt-3" style={{ color: "#666666" }}>
            Real men. Real results. 200+ five-star reviews.
          </p>
          <div className="flex gap-6 mt-10 text-left overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-3 md:overflow-visible md:snap-none md:pb-0">
            {(customTestimonials || [
              { name: "Marty H.", location: "Richmond, VA", date: "", pill: "", quote: "Men's Wellness is great. I have been a member for 5 years now. I feel and recover better after workouts. The staff is all great and very professional." },
              { name: "James T.", location: "Newport News, VA", date: "", pill: "", quote: "After struggling with fatigue for years, I finally have my energy back. The physicians here actually listen and the results reviewed in-visit made all the difference." },
              { name: "Robert M.", location: "Virginia Beach, VA", date: "", pill: "", quote: "Professional, discreet, and effective. I was hesitant at first but the team made me feel comfortable. Best decision I've made for my health." },
            ]).map((t) => (
              <div
                key={t.name}
                className="rounded-[14px] p-8 snap-center flex-shrink-0 w-[300px] md:w-auto"
                style={{ background: "#FFFFFF", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={18} fill="#D4A017" color="#D4A017" />
                    ))}
                  </div>
                  {t.pill && (
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: "#E8670A", color: "#FFFFFF" }}>{t.pill}</span>
                  )}
                </div>
                <p className="italic text-[15px] leading-[1.7] mb-6" style={{ color: "#4A4A4A" }}>
                  "{t.quote}"
                </p>
                <p className="font-bold text-sm uppercase" style={{ color: "#000033" }}>
                  {t.name}
                </p>
                <p className="text-xs mt-1" style={{ color: "#888888" }}>
                  {t.location}{t.date ? ` · ${t.date}` : ""}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: LOCATIONS CTA ═══ */}
      <section style={{ background: "#000033" }} className="py-16 px-6 md:px-8">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:max-w-[500px]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm uppercase tracking-[0.1em]" style={{ color: "rgba(255,255,255,0.60)" }}>
                Walk In Today
              </span>
            </div>
            <h2
              className="font-bold uppercase tracking-wide text-3xl md:text-4xl"
              style={{ color: "#FFFFFF" }}
            >
              3 Virginia Centers Ready to See You
            </h2>
            <p className="text-lg mt-4" style={{ color: "rgba(255,255,255,0.70)" }}>
              Richmond · Newport News · Virginia Beach
            </p>
            <Link
              to="/book"
              className="inline-block mt-8 rounded-lg px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer"
              style={{ background: "#FFFFFF", color: "#000033", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.90)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#FFFFFF")}
            >
              Find My Nearest Center
            </Link>
          </div>

          <div className="hidden lg:flex flex-col gap-3 w-full max-w-[400px]">
            {[
              { name: "Richmond", address: "4050 Innslake Dr, Suite 360, Glen Allen, VA 23060" },
              { name: "Newport News", address: "827 Diligence Drive, Suite 206, Newport News, VA 23606" },
              { name: "Virginia Beach", address: "996 First Colonial Road, Virginia Beach, VA 23454" },
            ].map((loc) => (
              <div
                key={loc.name}
                className="rounded-lg p-4"
                style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.10)" }}
              >
                <p className="font-semibold text-base" style={{ color: "#FFFFFF" }}>{loc.name}</p>
                <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.60)" }}>{loc.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SLOT: BEFORE FAQ ═══ */}
      {beforeFaqContent}

      {/* ═══ SECTION 6: FAQ ACCORDION ═══ */}
      <section style={{ background: "#FFFFFF" }} className="py-16 px-6 md:px-8">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-bold text-2xl md:text-3xl uppercase" style={{ color: "#000033" }}>
            Frequently Asked Questions
          </h2>
          <div className="mt-10">
            {resolvedFaqs.map((item, i) => (
              <FAQItem
                key={i}
                q={item.question}
                a={item.answer}
                open={openFaq === i}
                toggle={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 7: BOTTOM CTA BAR ═══ */}
      <section style={{ background: "#000033" }} className="py-12 px-6 text-center">
        <h2 className="font-bold text-2xl md:text-3xl uppercase" style={{ color: "#FFFFFF" }}>
          {bottomCtaHeading}
        </h2>
        {bottomCtaSubtext && (
          <p className="mt-3 text-base max-w-[600px] mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
            {bottomCtaSubtext}
          </p>
        )}
        <Link
          to="/book"
          className="block sm:inline-block mt-6 rounded-full px-10 py-4 text-sm font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer"
          style={{ background: "#E8670A", color: "#FFFFFF", textDecoration: "none", minHeight: 44 }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#CF5B09")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#E8670A")}
        >
          Book My Consultation
        </Link>
        <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.60)" }}>
          Or call:{" "}
          <a href="tel:8663444955" style={{ color: "rgba(255,255,255,0.60)", textDecoration: "underline" }}>
            866-344-4955
          </a>
        </p>
      </section>

      {/* ═══ SECTION 8: CROSS-LINKS ═══ */}
      <section style={{ background: "#F5F5F5", borderTop: "1px solid #E5E5E5" }} className="py-10 px-6 md:px-8">
        <div className="max-w-[1280px] mx-auto flex flex-wrap justify-center gap-x-8 gap-y-3 text-[13px]">
          <Link to="/providers" style={{ color: "#4A4A4A", textDecoration: "none" }} className="hover:underline">Meet our board-certified providers</Link>
          <Link to="/how-it-works" style={{ color: "#4A4A4A", textDecoration: "none" }} className="hover:underline">How your first visit works</Link>
          <Link to="/locations" style={{ color: "#4A4A4A", textDecoration: "none" }} className="hover:underline">Find a Virginia location near you</Link>
          {activeSlug !== "testosterone-therapy" && <Link to="/services/testosterone-therapy" style={{ color: "#4A4A4A", textDecoration: "none" }} className="hover:underline">Testosterone therapy</Link>}
          {activeSlug !== "weight-loss" && <Link to="/services/weight-loss" style={{ color: "#4A4A4A", textDecoration: "none" }} className="hover:underline">Medical weight loss</Link>}
          {activeSlug !== "sexual-health" && <Link to="/services/sexual-health" style={{ color: "#4A4A4A", textDecoration: "none" }} className="hover:underline">Erectile dysfunction treatment</Link>}
          {activeSlug !== "wellness-vitality" && <Link to="/services/wellness-vitality" style={{ color: "#4A4A4A", textDecoration: "none" }} className="hover:underline">Wellness & vitality</Link>}
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicePageLayout;
