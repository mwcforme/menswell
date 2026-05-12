import { Link } from "react-router-dom";
import { Check, Star, Plus, Minus, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import TreatmentCard from "@/components/services/TreatmentCard";
import { treatments, categories, faqData } from "@/data/treatments";

/* ─── Featured Photo Cards (same pattern as homepage Services.tsx) ─── */
const featuredServices = [
  {
    title: "Testosterone Therapy",
    subtitle: "Lab-Driven TRT Protocols",
    description: "Physician-monitored testosterone replacement therapy with on-site labs, personalized protocols, and ongoing optimization for men experiencing low T.",
    image: "/images/services/testosterone.jpg",
    alt: "Confident man in athletic wear outside wellness center",
    link: "/services/testosterone-therapy",
  },
  {
    title: "Medical Weight Loss",
    subtitle: "GLP-1 & Tirzepatide Programs",
    description: "Physician-supervised weight loss programs featuring GLP-1 medications, metabolic testing, and custom plans designed specifically for men's physiology.",
    image: "/images/services/weight-loss.jpg",
    alt: "Man running on trail at sunset",
    link: "/services/weight-loss",
  },
  {
    title: "Sexual Health",
    subtitle: "Physician-Prescribed ED Solutions",
    description: "Confidential erectile dysfunction treatment and sexual health solutions with proven medical therapies. Results you can count on.",
    image: "/images/services/sexual-wellness-couple.png",
    alt: "Couple relaxing together",
    link: "/services/sexual-health",
  },
  {
    title: "Wellness & Vitality",
    subtitle: "Peptide & Performance Optimization",
    description: "Custom wellness protocols including peptide therapy, NAD+, vitamin injections, and performance optimization for men who want more from life.",
    image: "/images/services/anti-aging-bridge.png",
    alt: "Man stretching on bridge before a run",
    link: "/services/wellness-vitality",
  },
];

const FeaturedCard = ({ s }: { s: typeof featuredServices[number] }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={s.link}
      className="rounded-xl md:rounded-2xl overflow-hidden group transition-all duration-300 ease-out block"
      style={{
        background: hovered ? "#E8670A" : "#FFFFFF",
        textDecoration: "none",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="p-3 md:p-5 pt-4 md:pt-6 flex items-start justify-between">
        <div>
          <h3
            className="font-bold uppercase text-[13px] md:text-[15px] tracking-wide leading-tight transition-colors duration-300"
            style={{ color: hovered ? "#FFFFFF" : "#000033" }}
          >
            {s.title}
          </h3>
          <p
            className="font-normal text-[11px] md:text-[13px] mt-1 md:mt-1.5 truncate transition-colors duration-300"
            style={{ color: hovered ? "rgba(255,255,255,0.85)" : "#666666" }}
          >
            {s.subtitle}
          </p>
        </div>
        <div
          className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300"
          style={{ background: hovered ? "#FFFFFF" : "#E8670A" }}
        >
          <ArrowRight
            size={14}
            className="transition-colors duration-300"
            style={{ color: hovered ? "#E8670A" : "#FFFFFF" }}
          />
        </div>
      </div>
      <div className="mx-2 mb-2 md:mx-3 md:mb-3 rounded-lg md:rounded-xl overflow-hidden aspect-[4/3]">
        <img
          src={s.image}
          alt={s.alt}
          className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = "none";
            const fallback = target.parentElement;
            if (fallback) {
              fallback.style.background = "linear-gradient(to bottom, #C8C6C1, #A8A59E)";
            }
          }}
        />
      </div>
      <div className="px-3 md:px-5 pb-4 md:pb-5">
        <p
          className="text-[13px] leading-relaxed transition-colors duration-300"
          style={{ color: hovered ? "rgba(255,255,255,0.9)" : "#4A4A4A" }}
        >
          {s.description}
        </p>
      </div>
    </Link>
  );
};
import HowItWorksSection from "@/components/services/sections/HowItWorksSection";

/* ─── FAQ Item ─── */
const FAQItem = ({ q, a, open, toggle }: { q: string; a: string; open: boolean; toggle: () => void }) => (
  <div style={{ borderBottom: "1px solid #E5E5E5" }}>
    <button onClick={toggle} className="flex items-center justify-between w-full text-left py-6 px-2 rounded transition-colors duration-150 cursor-pointer hover:bg-[#F9F9F9]" style={{ color: "#000033", fontSize: 17, fontWeight: 600, minHeight: 44 }}>
      {q}
      {open ? <Minus size={20} color="#E8670A" className="flex-shrink-0 ml-4" /> : <Plus size={20} color="#E8670A" className="flex-shrink-0 ml-4" />}
    </button>
    <div style={{ maxHeight: open ? 500 : 0, overflow: "hidden", transition: "max-height 0.3s ease" }}>
      <p className="px-2" style={{ paddingBottom: 24, fontSize: 15, color: "#4A4A4A", lineHeight: 1.7 }}>{a}</p>
    </div>
  </div>
);

const categoryData = [
  {
    slug: "testosterone-therapy",
    title: "HORMONE & MEN'S HEALTH",
    intro: "Services for men dealing with fatigue, low drive, and hormonal changes. Our Virginia physicians run the right labs and build a plan that actually fits.",
  },
  {
    slug: "sexual-health",
    title: "SEXUAL HEALTH & CONFIDENCE",
    intro: "Discreet, effective treatment for ED and sexual performance. From oral medications to advanced injectable therapies — dispensed on-site, today.",
  },
  {
    slug: "weight-loss",
    title: "WEIGHT LOSS & METABOLIC HEALTH",
    intro: "Physician-supervised weight loss with GLP-1 medications and metabolic support. Each plan is customized to your body, your goals, and your lifestyle.",
  },
  {
    slug: "wellness-vitality",
    title: "WELLNESS & ENERGY SUPPORT",
    intro: "Intramuscular vitamin injections for energy, immunity, and longevity. Faster absorption, better results than oral supplements.",
  },
];

const whyMWCFeatures = [
  "Specialized Men's Health Care",
  "ED, TRT & Weight Loss Programs",
  "Licensed Medical Providers",
  "Discreet In-Person Consultations",
  "Simple Prescription Refills",
  "Real-World, Proven Results",
  "Transparent Pricing",
  "Top-Rated Men's Centers",
  "U.S.-Based, Member-Focused Care",
];

const ServicesIndex = () => {
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Header />
      <main className="flex-1">
      {/* ═══ HERO + TAB BAR ═══ */}
      <section className="relative min-h-[280px] md:min-h-[340px]">
        <img src="https://images.pexels.com/photos/1547248/pexels-photo-1547248.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="All Services" className="absolute inset-0 w-full h-full object-cover object-center" fetchPriority="high" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,51,0.70), rgba(0,0,51,0.50), transparent)" }} />
        <div className="relative max-w-[1280px] mx-auto px-6 md:px-8 flex flex-col justify-center min-h-[280px] md:min-h-[340px]" style={{ paddingTop: 120, paddingBottom: 80 }}>
          <p className="text-base md:text-lg mb-3" style={{ color: "rgba(255,255,255,0.80)" }}>Trusted Men's Health Care Since 2015</p>
          <h1 className="font-bold uppercase tracking-wide text-4xl md:text-5xl lg:text-[clamp(40px,5vw,60px)]" style={{ color: "#FFFFFF" }}>ALL SERVICES</h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8 flex items-center gap-6 md:gap-8 overflow-x-auto scrollbar-hide whitespace-nowrap">
            {categories.map((cat) => {
              const isActive = cat.slug === "";
              const to = cat.slug ? `/services/${cat.slug}` : "/services";
              return (
                <Link key={cat.slug} to={to} className="pb-4 text-[15px] transition-colors duration-200 rounded-full px-4 py-1.5" style={{ color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.70)", fontWeight: isActive ? 600 : 400, background: isActive ? "rgba(232,103,10,0.25)" : "transparent", borderBottom: "3px solid transparent", textDecoration: "none", minHeight: 44, display: "flex", alignItems: "center" }}>
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ TRUST BADGES ═══ */}
      <section style={{ background: "#FFFFFF" }} className="py-6 px-6 md:px-8 border-b">
        <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-center gap-8">
          {[
            { label: "HIPAA Compliant", url: "/privacy-policy" },
            { label: "LegitScript Certified", url: "https://www.legitscript.com" },
            { label: "Virginia Licensed", url: "/licensing" },
            { label: "200+ Five-Star Reviews", url: "/#testimonials" },
          ].map((badge) => (
            <a key={badge.label} href={badge.url} className="text-xs uppercase tracking-[0.15em] font-semibold hover:underline" style={{ color: "#000033", textDecoration: "none" }} target={badge.url.startsWith("http") ? "_blank" : undefined} rel={badge.url.startsWith("http") ? "noopener noreferrer" : undefined}>{badge.label}</a>
          ))}
        </div>
      </section>

      {/* ═══ FEATURED SERVICE CARDS ═══ */}
      <section style={{ background: "#EBEAE8" }} className="py-14 md:py-20 px-6 md:px-8">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-center text-xl md:text-2xl font-light tracking-normal mb-3" style={{ color: "#1a1a1a" }}>
            Physician-Led Treatments for Virginia Men
          </h2>
          <p className="text-center text-sm mb-10 md:mb-14" style={{ color: "#666666" }}>
            Every protocol is physician-prescribed and monitored with regular lab work.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {featuredServices.map((s) => (
              <FeaturedCard key={s.title} s={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CATEGORY SECTIONS ═══ */}
      {categoryData.map((cat, idx) => {
        const catTreatments = treatments.filter((t) => t.categorySlug === cat.slug);
        return (
          <section key={cat.slug} style={{ background: idx % 2 === 0 ? "#F5F5F5" : "#FFFFFF" }} className="py-16 px-6 md:px-8">
            <div className="max-w-[1200px] mx-auto">
              <h2 className="font-bold uppercase tracking-wide text-2xl md:text-3xl text-center" style={{ color: "#000033" }}>{cat.title}</h2>
              <p className="mt-3 text-base text-center max-w-[650px] mx-auto" style={{ color: "#4A4A4A" }}>{cat.intro}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-10">
                {catTreatments.map((t, i) => (
                  <TreatmentCard key={t.slug} treatment={t} index={i} />
                ))}
              </div>
              <div className="text-center mt-10">
                <Link to={`/services/${cat.slug}`} className="inline-block rounded-full px-10 py-4 text-sm font-bold uppercase tracking-wider" style={{ background: "#000033", color: "#FFFFFF", textDecoration: "none" }}>
                  EXPLORE {cat.title}
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      {/* ═══ WHY MWC COMPARISON ═══ */}
      <section style={{ background: "#EBEAE8" }} className="py-20 px-6 md:px-8">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-bold uppercase tracking-wide text-2xl md:text-3xl text-center" style={{ color: "#000033" }}>WHY MEN'S WELLNESS CENTERS</h2>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left px-4 py-3 text-[13px] font-semibold uppercase" style={{ color: "#000033" }}>Feature</th>
                  <th className="text-center px-4 py-3 text-[13px] font-semibold uppercase" style={{ color: "#000033" }}>Men's Wellness Centers</th>
                  <th className="text-center px-4 py-3 text-[13px] font-semibold uppercase" style={{ color: "#000033" }}>Others</th>
                </tr>
              </thead>
              <tbody>
                {whyMWCFeatures.map((f) => (
                  <tr key={f}>
                    <td className="px-4 py-3 text-sm" style={{ color: "#000033", borderBottom: "1px solid #E5E5E5" }}>{f}</td>
                    <td className="px-4 py-3 text-center" style={{ borderBottom: "1px solid #E5E5E5" }}><Check size={18} color="#2ECC71" className="mx-auto" /></td>
                    <td className="px-4 py-3 text-center" style={{ borderBottom: "1px solid #E5E5E5" }}><span style={{ color: "#CCC", fontSize: 18 }}>✕</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section style={{ background: "#F5F5F5" }} className="py-16 px-6 md:px-8">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="font-bold text-3xl uppercase" style={{ color: "#000033" }}>What Our Members Say</h2>
          <p className="text-base mt-3" style={{ color: "#666666" }}>Real men. Real results. 200+ five-star reviews.</p>
          <div className="flex gap-6 mt-10 text-left overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-3 md:overflow-visible md:snap-none md:pb-0">
            {[
              { name: "David R.", location: "Glen Allen, VA", date: "March 2026", pill: "TRT", quote: "I spent years bouncing between my regular doctor and specialists, never getting real answers about why I felt so run down. MWC was different from the first visit. They ran comprehensive labs, explained everything clearly, and had me on a plan within a week. Six months later, I feel like I have my life back." },
              { name: "Thomas K.", location: "Newport News, VA", date: "February 2026", pill: "Weight Loss", quote: "The weight loss program at Men's Wellness Centers isn't some cookie-cutter plan. Dr. Caravella looked at my bloodwork, my metabolism, my lifestyle \u2014 everything. The GLP-1 medication combined with their monitoring protocol made a difference I couldn't achieve on my own. Down 35 pounds and counting." },
              { name: "Brian W.", location: "Virginia Beach, VA", date: "January 2026", pill: "Wellness", quote: "I was skeptical about the peptide therapy, but the science behind it convinced me to try. Three months into my protocol and my recovery after workouts is noticeably faster, my sleep is deeper, and I have sustained energy throughout the day. The team at Virginia Beach made the whole process easy." },
            ].map((t) => (
              <div key={t.name} className="rounded-[14px] p-8 snap-center flex-shrink-0 w-[300px] md:w-auto" style={{ background: "#FFFFFF", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-1">{[1, 2, 3, 4, 5].map((s) => <Star key={s} size={18} fill="#D4A017" color="#D4A017" />)}</div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: "#E8670A", color: "#FFFFFF" }}>{t.pill}</span>
                </div>
                <p className="italic text-[15px] leading-[1.7] mb-6" style={{ color: "#4A4A4A" }}>"{t.quote}"</p>
                <p className="font-bold text-sm uppercase" style={{ color: "#000033" }}>{t.name}</p>
                <p className="text-xs mt-1" style={{ color: "#888888" }}>{t.location} · {t.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <HowItWorksSection />

      {/* ═══ FIRST VISIT CALLOUT ═══ */}
      <section style={{ background: "#1A1A2E" }} className="py-16 px-6 md:px-8 text-center">
        <div className="max-w-[800px] mx-auto">
          <h2 className="font-bold uppercase tracking-wide text-2xl md:text-3xl" style={{ color: "#FFFFFF" }}>YOUR FIRST VISIT TAKES AN HOUR</h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.70)" }}>
            Walk in, get your labs drawn, and talk to a physician who specializes in men's health. No referrals. No waiting weeks for results. Most men leave with a plan — and their medication — the same day.
          </p>
          <Link to="/book" className="inline-block mt-8 rounded-full px-10 py-4 text-sm font-bold uppercase tracking-wider" style={{ background: "#FFFFFF", color: "#000033", textDecoration: "none" }}>
            BOOK MY CONSULTATION
          </Link>
        </div>
      </section>

      {/* ═══ LOCATIONS CTA ═══ */}
      <section style={{ background: "#000033" }} className="py-16 px-6 md:px-8">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:max-w-[500px]">
            <span className="text-sm uppercase tracking-[0.1em]" style={{ color: "rgba(255,255,255,0.60)" }}>Walk In Today</span>
            <h2 className="font-bold uppercase tracking-wide text-3xl md:text-4xl" style={{ color: "#FFFFFF" }}>3 Virginia Centers Ready to See You</h2>
            <p className="text-lg mt-4" style={{ color: "rgba(255,255,255,0.70)" }}>Richmond · Newport News · Virginia Beach</p>
            <Link to="/locations" className="inline-block mt-8 rounded-lg px-8 py-4 text-sm font-semibold uppercase tracking-wider" style={{ background: "#FFFFFF", color: "#000033", textDecoration: "none" }}>Find My Nearest Center</Link>
          </div>
          <div className="hidden lg:flex flex-col gap-3 w-full max-w-[400px]">
            {[
              { name: "Richmond", address: "4050 Innslake Dr, Suite 360, Glen Allen, VA 23060" },
              { name: "Newport News", address: "827 Diligence Drive, Suite 206, Newport News, VA 23606" },
              { name: "Virginia Beach", address: "996 First Colonial Road, Virginia Beach, VA 23454" },
            ].map((loc) => (
              <div key={loc.name} className="rounded-lg p-4" style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.10)" }}>
                <p className="font-semibold text-base" style={{ color: "#FFFFFF" }}>{loc.name}</p>
                <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.60)" }}>{loc.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section style={{ background: "#FFFFFF" }} className="py-16 px-6 md:px-8">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-bold text-2xl md:text-3xl uppercase" style={{ color: "#000033" }}>Frequently Asked Questions</h2>
          <div className="mt-10">
            {faqData.map((item, i) => (
              <FAQItem key={i} q={item.question} a={item.answer} open={openFaq === i} toggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section style={{ background: "#000033" }} className="py-12 px-6 text-center">
        <h2 className="font-bold text-2xl md:text-3xl uppercase" style={{ color: "#FFFFFF" }}>See What Your Levels Say</h2>
        <Link to="/book" className="block sm:inline-block mt-6 rounded-full px-10 py-4 text-sm font-bold uppercase tracking-wider" style={{ background: "#E8670A", color: "#FFFFFF", textDecoration: "none", minHeight: 44 }}>Book My Consultation</Link>
        <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.60)" }}>Or call: <a href="tel:8663444955" style={{ color: "rgba(255,255,255,0.60)", textDecoration: "underline" }}>866-344-4955</a></p>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesIndex;
