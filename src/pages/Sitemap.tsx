import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const corePages = [
  { path: "/", label: "Home" },
  { path: "/services", label: "Services", children: [
    { path: "/services/testosterone-therapy", label: "Testosterone Therapy" },
    { path: "/services/weight-loss", label: "Medical Weight Loss" },
    { path: "/services/sexual-health", label: "Sexual Health" },
    { path: "/services/wellness-vitality", label: "Wellness & Vitality" },
  ]},
  { path: "/locations", label: "Locations", children: [
    { path: "/locations/richmond-va", label: "Richmond, VA" },
    { path: "/locations/newport-news-va", label: "Newport News, VA" },
    { path: "/locations/virginia-beach-va", label: "Virginia Beach, VA" },
  ]},
  { path: "/how-it-works", label: "How It Works" },
  { path: "/providers", label: "Our Providers" },
  { path: "/book", label: "Book a Consultation" },
  { path: "/states-served", label: "States Served" },
];

const legalPages = [
  { path: "/privacy-policy", label: "Privacy Policy" },
  { path: "/terms-of-service", label: "Terms of Service" },
  { path: "/telehealth-consent", label: "Telehealth Consent" },
  { path: "/licensing", label: "Licensing & Accreditation" },
  { path: "/prescribing-policy", label: "Prescribing Policy" },
  { path: "/pharmacy-partners", label: "Pharmacy Partners" },
  { path: "/advertising-disclosure", label: "Advertising Disclosure" },
  { path: "/refund-policy", label: "Refund Policy" },
];

const SitemapLink = ({ path, label, indent = 0 }: { path: string; label: string; indent?: number }) => (
  <li style={{ paddingLeft: indent * 24 }}>
    <Link
      to={path}
      className="flex items-center justify-between py-3 px-4 rounded-lg text-[15px] font-medium transition-all duration-200 hover:bg-[#F8F7F4]"
      style={{ color: "#004883", textDecoration: "none", border: "1px solid rgba(0,0,0,0.04)" }}
    >
      <span>{indent > 0 && <span style={{ color: "#ccc", marginRight: 8 }}>└</span>}{label}</span>
      <span className="text-[12px] font-normal" style={{ color: "#999" }}>{path}</span>
    </Link>
  </li>
);

const Sitemap = () => {
  const sitemapSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Sitemap",
    description: "Complete sitemap for Men's Wellness Centers website.",
    url: "https://menswellnesscenters.com/sitemap/",
    dateModified: "2026-03-01",
    publisher: { "@id": "https://menswellnesscenters.com/#organization" },
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(sitemapSchema)}</script>
      </Helmet>
      <Header />

      {/* Mini-Hero */}
      <section
        className="flex items-center justify-center text-center"
        style={{ background: "#0D1B2A", minHeight: 200, paddingTop: 100, paddingBottom: 40 }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <h1
            className="font-extrabold uppercase leading-tight mb-3"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "#FFFFFF",
              letterSpacing: "0.03em",
            }}
          >
            Sitemap
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)" }}>All pages on Men's Wellness Centers</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div style={{ background: "#1A1A2E", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-[13px]" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link to="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }} className="hover:opacity-80">Home</Link>
            <span>›</span>
            <span style={{ color: "rgba(255,255,255,0.8)" }}>Sitemap</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <main style={{ background: "#FFFFFF" }}>
        <div className="max-w-[800px] mx-auto px-4 py-12 md:py-16">
          {/* Core Pages */}
          <div className="mb-10">
            <h2
              className="font-bold uppercase tracking-wide mb-4"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, color: "#000033", borderLeft: "3px solid #F97316", paddingLeft: 12 }}
            >
              Core Pages
            </h2>
            <ul className="space-y-1.5">
              {corePages.map((page) => (
                <div key={page.path}>
                  <SitemapLink path={page.path} label={page.label} />
                  {page.children?.map((child) => (
                    <SitemapLink key={child.path} path={child.path} label={child.label} indent={1} />
                  ))}
                </div>
              ))}
            </ul>
          </div>

          {/* Legal Pages */}
          <div>
            <h2
              className="font-bold uppercase tracking-wide mb-4"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, color: "#000033", borderLeft: "3px solid #F97316", paddingLeft: 12 }}
            >
              Legal & Policy
            </h2>
            <ul className="space-y-1.5">
              {legalPages.map((page) => (
                <SitemapLink key={page.path} path={page.path} label={page.label} />
              ))}
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sitemap;
