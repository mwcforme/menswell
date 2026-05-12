import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TickerStrip } from "@/components/shared/TickerStrip";
import { BreadcrumbBar } from "@/components/shared/BreadcrumbBar";
import { CalendarCheck, TestTube, Stethoscope, ClipboardList, TrendingUp, Plus, Users, FlaskConical, Repeat, MapPin, Phone } from "lucide-react";

const BASE_URL = "https://menswellnesscenters.com";

const steps = [
  {
    icon: CalendarCheck,
    num: "01",
    title: "Schedule Your Consultation",
    description: "Book online in under 60 seconds or call any of our three Virginia locations. No referral needed. Same-day and next-day appointments are often available. Choose Richmond, Newport News, or Virginia Beach.",
  },
  {
    icon: TestTube,
    num: "02",
    title: "Comprehensive Lab Work",
    description: "At your first visit, we draw a comprehensive panel tailored to your concerns. For testosterone therapy, this includes Total T, Free T, Estradiol, PSA, CBC, CMP, Lipids, and Thyroid. Results are often available the same day.",
  },
  {
    icon: Stethoscope,
    num: "03",
    title: "Physician Evaluation",
    description: "A licensed physician reviews your lab results, symptoms, medical history, and goals. This is a real conversation, not a 5-minute checkout. Your provider explains what your labs mean, discusses treatment options, and answers every question. There's zero obligation to start treatment.",
  },
  {
    icon: ClipboardList,
    num: "04",
    title: "Your Personalized Protocol",
    description: "If treatment is appropriate, your physician designs a protocol customized to your body, your labs, and your goals. Whether it's testosterone therapy, a weight loss program, sexual health treatment, or a wellness protocol, every plan is individualized. You'll know exactly what to expect, when, and why.",
  },
  {
    icon: TrendingUp,
    num: "05",
    title: "Ongoing Optimization",
    description: "Your care doesn't end when you walk out the door. Regular follow-up labs, provider check-ins, and protocol adjustments ensure your results improve over time. We track your biomarkers, listen to your feedback, and optimize continuously. This is long-term health partnership, not one-and-done medicine.",
  },
];

const differences = [
  { icon: Users, title: "Physician-Led Care", text: "Every protocol is designed and supervised by a board-certified physician. Not just NPs. Not just telemedicine." },
  { icon: FlaskConical, title: "On-Site Labs", text: "Walk in, get labs drawn, get results, often the same day. No 2-week wait for a follow-up appointment." },
  { icon: ClipboardList, title: "No Cookie-Cutter Protocols", text: "Your treatment is based on YOUR labs, YOUR symptoms, YOUR goals. Not a one-size-fits-all subscription." },
  { icon: Repeat, title: "Ongoing Monitoring", text: "Regular lab work and provider check-ins. Adjustments based on data, not guesswork." },
  { icon: MapPin, title: "Three Virginia Locations", text: "Richmond (Glen Allen), Newport News, Virginia Beach. Plus a national scheduling line: 866-344-4955." },
];

const faqs = [
  { q: "How long does the first visit take?", a: "Plan for about 45-60 minutes. This includes lab work, a physical evaluation, and a consultation with your provider. We don't rush." },
  { q: "Do I need to prepare anything before my visit?", a: "No special preparation is needed. If you have recent lab work from another provider, bring it along, but it's not required. We'll draw our own comprehensive panel." },
  { q: "Is there a cost for the consultation?", a: "The initial consultation is at no cost. Lab work is included. You'll receive transparent pricing for any recommended treatment before making a decision." },
  { q: "What if I decide not to start treatment?", a: "That's completely fine. There's zero obligation. You'll leave with a clear understanding of your health status and options, whether or not you proceed with treatment." },
  { q: "Can I bring someone with me?", a: "Of course. Many men bring their spouse or partner. We're happy to include them in the conversation." },
];

const HowItWorks = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How Men's Wellness Centers Works",
    description: "Your path to optimized health in 5 straightforward steps, from no-cost consultation to ongoing care.",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.description,
    })),
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify([howToSchema, faqSchema])}</script>
      </Helmet>
      <Header />
      <main className="flex-1">
      {/* Hero */}
      <section className="relative" style={{ background: "#000033", paddingTop: 120, paddingBottom: 64 }}>
        <div className="px-6">
          <div className="max-w-[900px] mx-auto">
            <h1
              className="font-display font-bold uppercase tracking-wide"
              style={{ color: "#FFFFFF", fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
            >
              How It Works
            </h1>
            <p
              className="mt-3 text-base md:text-lg italic"
              style={{ color: "rgba(255,255,255,0.70)", fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Your path to optimized health — in 5 straightforward steps.
            </p>
            <Link
              to="/book"
              className="inline-block mt-6 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-wider transition-all hover:scale-[1.02]"
              style={{ background: "#F97316", color: "#FFFFFF", textDecoration: "none" }}
            >
              Book My Consultation
            </Link>
          </div>
        </div>
        <div className="mt-10">
          <TickerStrip
            items={[
              "SAME-DAY LAB RESULTS",
              "EST. 2015",
              "10,000+ MEN TREATED",
              "4.9★ GOOGLE RATING",
              "3 VIRGINIA LOCATIONS",
              "NO COST CONSULTATION",
            ]}
          />
        </div>
      </section>

      {/* Breadcrumb */}
      <BreadcrumbBar
        items={[
          { label: "Home", to: "/" },
          { label: "How It Works" },
        ]}
      />

      {/* 5-Step Process */}
      <section style={{ background: "#EBEAE8" }} className="py-16 md:py-24 px-6">
        <div className="max-w-[900px] mx-auto">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isDark = i === 2;
            return (
              <div
                key={step.num}
                className={`flex gap-5 md:gap-8 py-8 md:py-10 ${isDark ? "rounded-xl px-6 md:px-8 -mx-2 md:-mx-4 mb-2" : ""}`}
                style={{
                  borderBottom: !isDark && i < steps.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none",
                  background: isDark ? "#0D1B2A" : "transparent",
                }}
              >
                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                  <span
                    className="text-xl md:text-2xl font-bold font-display"
                    style={{ color: isDark ? "#F97316" : "#E8670A" }}
                  >
                    {step.num}
                  </span>
                  <Icon size={22} style={{ color: isDark ? "rgba(255,255,255,0.5)" : "#888888" }} />
                </div>
                <div className="flex-1">
                  <h3
                    className="font-display font-bold text-base md:text-lg uppercase tracking-wide mb-2"
                    style={{ color: isDark ? "#FFFFFF" : "#000033" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-[13px] md:text-sm leading-relaxed"
                    style={{ color: isDark ? "rgba(255,255,255,0.75)" : "#666666" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* What Makes MWC Different */}
      <section style={{ background: "#0D1B2A" }} className="py-16 md:py-24 px-6">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-display font-bold uppercase text-lg md:text-xl mb-10" style={{ color: "#FFFFFF" }}>
            What Makes MWC Different
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {differences.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.title}
                  className="rounded-xl p-5"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <Icon size={20} className="mb-3" style={{ color: "#F97316" }} />
                  <h3 className="font-semibold text-sm mb-2" style={{ color: "#FFFFFF" }}>{d.title}</h3>
                  <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{d.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#EBEAE8" }} className="py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-base md:text-lg uppercase tracking-[0.08em] text-center mb-8 md:mb-12" style={{ color: "#000033" }}>
            Frequently Asked Questions
          </h2>

          <div>
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.10)" }}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="py-4 md:py-5 flex justify-between items-center cursor-pointer w-full bg-transparent border-none hover:bg-[#E5E3DE] rounded-lg px-2 -mx-2 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-[14px] md:text-base text-left pr-4" style={{ color: "#000033" }}>
                      {faq.q}
                    </span>
                    <Plus
                      size={20}
                      strokeWidth={2.5}
                      className="flex-shrink-0"
                      style={{
                        color: "#000033",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 200ms ease",
                      }}
                    />
                  </button>
                  <div
                    style={{
                      maxHeight: isOpen ? "400px" : "0",
                      opacity: isOpen ? 1 : 0,
                      overflow: "hidden",
                      transition: "max-height 300ms ease, opacity 200ms ease",
                    }}
                  >
                    <p className="text-[13px] md:text-sm leading-relaxed pb-4 md:pb-5 px-2" style={{ color: "#666666" }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#000033" }} className="py-14 md:py-20 px-6 text-center">
        <h2 className="font-display font-bold text-xl md:text-2xl uppercase" style={{ color: "#FFFFFF" }}>
          Ready to Get Started?
        </h2>
        <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
          Consultation. On-site labs. Three Virginia locations.
        </p>
        <Link
          to="/book"
          className="inline-block mt-6 rounded-full px-10 py-4 text-sm font-bold uppercase tracking-wider transition-all hover:scale-[1.02]"
          style={{ background: "#F97316", color: "#FFFFFF", textDecoration: "none" }}
        >
          Book My Consultation
        </Link>
        <p className="mt-4">
          <a href="tel:8663444955" className="text-sm underline underline-offset-4" style={{ color: "rgba(255,255,255,0.7)" }}>
            <Phone size={14} className="inline mr-1" />
            866-344-4955
          </a>
        </p>
      </section>

      {/* Cross-Links */}
      <section style={{ background: "#F5F5F5", borderTop: "1px solid #E5E5E5" }} className="py-10 px-6 text-center">
        <div className="max-w-[900px] mx-auto flex flex-wrap justify-center gap-x-8 gap-y-3 text-[13px]">
          <Link to="/services" style={{ color: "#4A4A4A", textDecoration: "none" }} className="hover:underline">Explore our services</Link>
          <Link to="/locations" style={{ color: "#4A4A4A", textDecoration: "none" }} className="hover:underline">Find a Virginia location</Link>
          <Link to="/providers" style={{ color: "#4A4A4A", textDecoration: "none" }} className="hover:underline">Meet our board-certified providers</Link>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
