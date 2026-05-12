import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface TocItem {
  id: string;
  label: string;
}

interface Props {
  title: string;
  subtitle: string;
  path: string;
  metaDescription: string;
  toc?: TocItem[];
  schemaExtra?: object;
  children: React.ReactNode;
}

export const LegalPageLayout = ({ title, subtitle, path, metaDescription, toc, schemaExtra, children }: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: metaDescription,
    url: `https://menswellnesscenters.com${path}/`,
    dateModified: "2026-03-01",
    publisher: { "@id": "https://menswellnesscenters.com/#organization" },
    ...schemaExtra,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://menswellnesscenters.com/" },
      { "@type": "ListItem", position: 2, name: title, item: `https://menswellnesscenters.com${path}/` },
    ],
  };


  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
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
            {title}
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)" }}>{subtitle}</p>
        </div>
      </section>

      {/* Breadcrumb bar */}
      <div style={{ background: "#1A1A2E", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-[13px]" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link to="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }} className="hover:opacity-80">
              Home
            </Link>
            <span>›</span>
            <span style={{ color: "rgba(255,255,255,0.8)" }}>{title}</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <main style={{ background: "#FFFFFF" }}>
        <div className="max-w-[800px] mx-auto px-4 py-12 md:py-16">
          {/* Last Updated badge */}
          <div className="mb-8">
            <span
              className="inline-block rounded-full text-[12px] font-medium"
              style={{ background: "#F3F4F6", color: "#4B5563", padding: "5px 14px" }}
            >
              Last Updated: March 2026
            </span>
          </div>

          {/* Table of Contents */}
          {toc && toc.length > 0 && (
            <div
              className="mb-10 rounded-xl p-5 md:p-6"
              style={{ background: "#F8F7F4", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <h2
                className="font-bold uppercase tracking-wide mb-4"
                style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, color: "#000033" }}
              >
                Table of Contents
              </h2>
              <ol className="space-y-2 list-decimal list-inside">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-[14px] hover:opacity-70 transition-opacity"
                      style={{ color: "#004883", textDecoration: "none" }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Page content */}
          <div className="legal-content">{children}</div>
        </div>
      </main>

      <Footer />

      <style>{`
        .legal-content h2 {
          font-family: 'Oswald', sans-serif;
          font-size: clamp(1.3rem, 3vw, 1.6rem);
          font-weight: 600;
          color: #000033;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        .legal-content h3 {
          font-family: 'Oswald', sans-serif;
          font-size: clamp(1.1rem, 2.5vw, 1.35rem);
          font-weight: 600;
          color: #000033;
          margin-top: 1.8rem;
          margin-bottom: 0.75rem;
        }
        .legal-content p {
          font-size: 16px;
          line-height: 1.7;
          color: #444;
          margin-bottom: 1.25em;
        }
        .legal-content ul, .legal-content ol {
          padding-left: 1.5rem;
          margin-bottom: 1.25em;
        }
        .legal-content li {
          font-size: 16px;
          line-height: 1.7;
          color: #444;
          margin-bottom: 0.5em;
        }
        .legal-content strong {
          color: #000033;
        }
        .legal-content a {
          color: #004883;
          text-decoration: underline;
          text-decoration-color: rgba(0,72,131,0.3);
        }
        .legal-content a:hover {
          text-decoration-color: rgba(0,72,131,0.8);
        }
        .legal-content section:first-child h2 {
          margin-top: 0;
        }
      `}</style>
    </div>
  );
};

/* Reusable callout boxes */
export const WarningCallout = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-lg my-6" style={{ background: "#FFF7ED", borderLeft: "4px solid #F97316", padding: "16px 20px" }}>
    <p className="font-semibold text-[15px] mb-2" style={{ color: "#000033" }}>⚠️ {title}</p>
    <div className="text-[15px] leading-relaxed" style={{ color: "#555" }}>{children}</div>
  </div>
);

export const InfoCallout = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-lg my-6" style={{ background: "#E6EEF5", borderLeft: "4px solid #004883", padding: "16px 20px" }}>
    <p className="font-semibold text-[15px] mb-2" style={{ color: "#000033" }}>ℹ️ {title}</p>
    <div className="text-[15px] leading-relaxed" style={{ color: "#555" }}>{children}</div>
  </div>
);

export const ComplianceCallout = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-lg my-6" style={{ background: "#F0FDF4", borderLeft: "4px solid #16A34A", padding: "16px 20px" }}>
    <p className="font-semibold text-[15px] mb-2" style={{ color: "#000033" }}>✓ {title}</p>
    <div className="text-[15px] leading-relaxed" style={{ color: "#555" }}>{children}</div>
  </div>
);

export const ContactCard = () => (
  <div className="rounded-xl my-6" style={{ background: "#F8F7F4", border: "1px solid rgba(0,0,0,0.08)", padding: "20px 24px" }}>
    <h3 className="font-bold text-[15px] mb-3" style={{ fontFamily: "'Oswald', sans-serif", color: "#000033" }}>Contact Us</h3>
    <p className="text-[15px] mb-1" style={{ color: "#444" }}>For questions about this policy:</p>
    <p className="text-[15px] mb-1" style={{ color: "#444" }}>
      <strong>Email:</strong>{" "}
      <a href="mailto:info@menswellnesscenters.com" style={{ color: "#004883" }}>info@menswellnesscenters.com</a>
    </p>
    <p className="text-[15px] mb-1" style={{ color: "#444" }}>
      <strong>Phone:</strong>{" "}
      <a href="tel:+18663444955" style={{ color: "#004883" }}>866-344-4955</a>
    </p>
    <p className="text-[15px]" style={{ color: "#444" }}>
      <strong>Address:</strong> 4050 Innslake Dr, Suite 360, Glen Allen, VA 23060
    </p>
  </div>
);
