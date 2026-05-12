import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Check, X } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { allLocations } from "@/data/locations";

const hubLocations = [
  {
    ...allLocations[0],
    hoursSummary: "Mon-Sat 9-5",
    description: "Our flagship center serving Richmond, Short Pump, Henrico, and the greater metro area since 2015.",
  },
  {
    ...allLocations[1],
    hoursSummary: "Mon, Tue, Thu-Sat 9-5, Wed Closed",
    description: "Serving the Hampton Roads peninsula including Hampton, Williamsburg, and York County.",
  },
  {
    ...allLocations[2],
    hoursSummary: "Mon-Sat 9-5",
    description: "Our coastal center serving Virginia Beach, Norfolk, Chesapeake, and the entire Southside.",
  },
];

const comparisonRows = [
  { feature: "Lab Work", us: "Same-day, on-site, 15-min results", them: "Mail-in kit, 5-10 day wait" },
  { feature: "Provider Visit", us: "Face-to-face, every time", them: "Video call, rotating providers" },
  { feature: "Physical Exam", us: "Comprehensive, in-person", them: "None" },
  { feature: "Treatment Start", us: "Same day as first visit", them: "2-4 weeks after ordering" },
  { feature: "Follow-Up Care", us: "Unlimited in-person visits", them: "Scheduled video calls" },
  { feature: "Pricing", us: "All-inclusive, no hidden fees", them: "Monthly subscription + add-ons" },
  { feature: "Emergency Questions", us: "Call your center directly", them: "Submit a ticket" },
];

const processSteps = [
  { num: "01", title: "Meet Your Physician", body: "Schedule online or call any center. Walk in and sit down with a Virginia-licensed physician. No referral needed." },
  { num: "02", title: "Same-Day Lab Results", body: "Walk down the hall, get your blood drawn, and have actionable lab results back before you leave. No outside lab visits." },
  { num: "03", title: "Leave With a Plan", body: "Your physician builds a protocol around your labs, your goals, and your lifestyle. If you qualify, medication is dispensed on-site." },
];

const LocationsHub = () => {
  const cardsRef = useScrollReveal({ staggerChildren: true, staggerDelay: 150 });
  const stepsRef = useScrollReveal({ staggerChildren: true, staggerDelay: 150 });
  const compRef = useScrollReveal({ staggerChildren: true, staggerDelay: 60 });

  const locationsSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Men's Wellness Centers",
    url: "https://menswellnesscenters.com",
    telephone: "866-344-4955",
    location: allLocations.map((loc) => ({
      "@type": "MedicalClinic",
      name: loc.centerName,
      telephone: loc.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: loc.address,
        addressLocality: loc.cityStateZip.split(",")[0],
        addressRegion: "VA",
        postalCode: loc.cityStateZip.match(/\d{5}/)?.[0] || "",
        addressCountry: "US",
      },
      geo: { "@type": "GeoCoordinates", latitude: loc.lat, longitude: loc.lng },
    })),
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(locationsSchema)}</script>
      </Helmet>
      <Header />
      <main>
      {/* 1. Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20" style={{ background: "#151933" }}>
        <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.25em] mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
            3 Centers Across Virginia
          </p>
          <h1
            className="font-extrabold uppercase leading-tight mb-5"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#FFFFFF", letterSpacing: "0.02em" }}
          >
            Find Your Men's Wellness Center
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto mb-8" style={{ color: "rgba(255,255,255,0.7)" }}>
            Same-day testosterone testing, ED treatment, and physician-led weight loss at three Virginia locations. Every visit is face-to-face. Every consultation is at no cost.
          </p>
          <a
            href="tel:8663444955"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[13px] font-bold uppercase tracking-[0.06em] transition-all duration-200 hover:bg-white hover:text-[#151933]"
            style={{ color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.4)", textDecoration: "none" }}
            aria-label="Call Men's Wellness Centers at 866-344-4955"
          >
            <Phone size={16} /> Or Call Now: 866-344-4955
          </a>
        </div>
      </section>

      {/* 2. Location Cards */}
      <section className="py-14 md:py-20" style={{ background: "#EBEAE8" }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
            {hubLocations.map((loc) => {
              const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${loc.address}, ${loc.cityStateZip}`)}`;
              return (
                <div
                  key={loc.slug}
                  className="rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{ background: "#FFFFFF" }}
                >
                  <div className="p-5 md:p-6">
                    <Link to={`/locations/${loc.slug}`} className="block" style={{ textDecoration: "none" }}>
                      <h2 className="text-lg font-bold uppercase tracking-wide hover:opacity-80 transition-opacity mb-1" style={{ color: "#000033" }}>
                        {loc.city}, VA
                      </h2>
                    </Link>

                    <p className="text-[12px] mb-0.5" style={{ color: "#888" }}>{loc.address}</p>
                    <p className="text-[12px] mb-3" style={{ color: "#888" }}>{loc.cityStateZip}</p>

                    <a
                      href={`tel:${loc.phone.replace(/[^0-9]/g, "")}`}
                      className="flex items-center gap-1.5 text-[13px] font-semibold mb-2"
                      style={{ color: "#000033", textDecoration: "none", minHeight: 48 }}
                      aria-label={`Call Men's Wellness Centers ${loc.city} at ${loc.phone}`}
                      data-location={loc.slug.replace("-va", "")}
                      data-cta-type="call"
                    >
                      <Phone size={14} /> {loc.phone}
                    </a>

                    <p className="text-[11px] mb-3" style={{ color: "#999" }}>{loc.hoursSummary}</p>
                    <p className="text-[13px] leading-relaxed mb-5" style={{ color: "#666" }}>{loc.description}</p>

                    <Link
                      to={`/locations/${loc.slug}`}
                      className="block w-full text-center py-3 rounded-full text-[12px] font-semibold uppercase tracking-[0.06em] transition-opacity duration-200 hover:opacity-90 mb-3"
                      style={{ background: "#E8670A", color: "#FFFFFF", textDecoration: "none" }}
                      data-location={loc.slug.replace("-va", "")}
                      data-cta-type="book"
                    >
                      View {loc.city} Center
                    </Link>

                    <div className="flex gap-2">
                      <a
                        href={googleMapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-wide transition-all duration-200 hover:bg-[#000033] hover:text-white"
                        style={{ border: "1px solid #000033", color: "#000033", textDecoration: "none" }}
                        data-cta-type="directions"
                      >
                        Get Directions
                      </a>
                      <a
                        href={`tel:${loc.phone.replace(/[^0-9]/g, "")}`}
                        className="flex-1 text-center py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-wide transition-all duration-200 hover:bg-[#000033] hover:text-white"
                        style={{ border: "1px solid #000033", color: "#000033", textDecoration: "none" }}
                        data-cta-type="call"
                      >
                        Call Now
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Coverage */}
      <section className="py-14 md:py-20" style={{ background: "#FFFFFF" }}>
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2
            className="font-bold uppercase leading-tight mb-6"
            style={{ color: "#000033", fontSize: "clamp(1.15rem, 3vw, 1.75rem)" }}
          >
            We Serve All of Virginia
          </h2>

          <div className="flex items-center justify-center gap-0 mb-8 overflow-x-auto py-2">
            {[
              { city: "Richmond", slug: "richmond-va" },
              { dist: "70 mi" },
              { city: "Newport News", slug: "newport-news-va" },
              { dist: "25 mi" },
              { city: "Virginia Beach", slug: "virginia-beach-va" },
            ].map((item, i) =>
              "city" in item ? (
                <Link
                  key={i}
                  to={`/locations/${item.slug}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-bold flex-shrink-0"
                  style={{ background: "#000033", color: "#FFFFFF", textDecoration: "none" }}
                >
                  <MapPin size={12} /> {item.city}
                </Link>
              ) : (
                <div key={i} className="flex items-center flex-shrink-0 mx-1">
                  <div className="w-8 md:w-16 h-px" style={{ background: "#ccc" }} />
                  <span className="text-[10px] font-medium px-2" style={{ color: "#999" }}>{item.dist}</span>
                  <div className="w-8 md:w-16 h-px" style={{ background: "#ccc" }} />
                </div>
              )
            )}
          </div>

          <p className="text-[14px] leading-relaxed max-w-2xl mx-auto mb-4" style={{ color: "#666" }}>
            With three centers spanning from Richmond to Virginia Beach, there's a Men's Wellness Centers location within driving distance for most Virginia men. Each center offers the same physician-led care, on-site labs, and consultations.
          </p>
          <p className="text-[13px]" style={{ color: "#999" }}>
            Don't see your city? We welcome members from anywhere in Virginia. Call{" "}
            <a href="tel:8663444955" className="font-semibold" style={{ color: "#000033", textDecoration: "none" }}>866-344-4955</a>{" "}
            to find your nearest center.
          </p>
        </div>
      </section>

      {/* 4. Process */}
      <section className="py-14 md:py-20" style={{ background: "#EBEAE8" }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 md:mb-12 gap-4">
            <h2
              className="font-bold uppercase leading-tight max-w-xl"
              style={{ color: "#000033", fontSize: "clamp(1.15rem, 3vw, 1.75rem)" }}
            >
              What to Expect at Any Location
            </h2>
            <Link
              to="/book"
              className="hidden md:inline-block rounded-full px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.06em] transition-all duration-200 hover:bg-[#000033] hover:text-white"
              style={{ background: "transparent", border: "1px solid #000033", color: "#000033", textDecoration: "none" }}
            >
              Book at Any Location
            </Link>
          </div>
          <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {processSteps.map((step) => (
              <div key={step.num}>
                <span className="font-bold text-sm mb-3 block" style={{ color: "#000033" }}>{step.num}</span>
                <h3 className="font-bold text-[15px] md:text-base uppercase tracking-[0.04em] mb-2" style={{ color: "#000033" }}>
                  {step.title}
                </h3>
                <p className="font-normal text-[13px] leading-relaxed" style={{ color: "#666666" }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Comparison */}
      <section id="comparison" className="py-14 md:py-20" style={{ background: "#EBEAE8" }}>
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2
              className="font-bold uppercase leading-tight"
              style={{ color: "#000033", fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}
            >
              The Difference Is in the Details
            </h2>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-hidden rounded-xl" style={{ background: "#FFFFFF" }}>
            <div className="grid grid-cols-3 px-6 py-4" style={{ background: "#000033" }}>
              <span className="font-semibold text-xs uppercase tracking-[0.12em]" style={{ color: "#FFFFFF" }}>Feature</span>
              <span className="font-semibold text-xs uppercase tracking-[0.12em]" style={{ color: "#FFFFFF" }}>Men's Wellness Centers</span>
              <span className="font-medium text-xs uppercase tracking-[0.12em]" style={{ color: "rgba(255,255,255,0.5)" }}>Online TRT Services</span>
            </div>
            <div ref={compRef}>
              {comparisonRows.map((row, i) => (
                <div key={i} className="grid grid-cols-3 px-6 py-4 items-center" style={{ borderBottom: i < comparisonRows.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
                  <span className="font-semibold text-sm" style={{ color: "#000033" }}>{row.feature}</span>
                  <span className="text-sm font-semibold" style={{ color: "#000033" }}>{row.us}</span>
                  <span className="text-sm italic" style={{ color: "#999" }}>{row.them}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile stacked */}
          <div className="md:hidden space-y-3">
            {comparisonRows.map((row) => (
              <div key={row.feature} className="rounded-xl p-4" style={{ background: "#FFFFFF" }}>
                <p className="font-semibold text-[14px] leading-snug" style={{ color: "#000033" }}>{row.us}</p>
                <p className="text-[13px] italic mt-1.5" style={{ color: "#999" }}>vs. {row.them}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-10">
            <Link
              to="/book"
              className="inline-block rounded-full px-10 py-3.5 text-[13px] font-semibold uppercase cursor-pointer transition-opacity duration-200 hover:opacity-90"
              style={{ background: "#E8670A", color: "#FFFFFF", textDecoration: "none" }}
              data-cta-type="book"
            >
              Book My Visit
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Trust */}
      <section className="py-10 md:py-14" style={{ background: "#FFFFFF" }}>
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <p className="text-[11px] md:text-xs font-medium tracking-[0.15em] uppercase mb-4" style={{ color: "#999" }}>
            CLIA Certified · LegitScript Verified · HIPAA Compliant · FSA/HSA Accepted · 4.9 Star Google Reviews
          </p>
          <p className="text-[13px] leading-relaxed max-w-xl mx-auto" style={{ color: "#888" }}>
            Men's Wellness Centers is a LegitScript-certified healthcare provider. All centers are CLIA-certified for on-site laboratory testing and fully HIPAA compliant.
          </p>
        </div>
      </section>

      {/* 7. Hub CTA */}
      <section className="py-14 md:py-20" style={{ background: "#151933" }}>
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2
            className="font-bold uppercase leading-tight mb-4"
            style={{ color: "#FFFFFF", fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}
          >
            Find Your Center
          </h2>
          <p className="text-[14px] mb-10" style={{ color: "rgba(255,255,255,0.55)" }}>
            Choose a location to book your no-cost consultation
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-8">
            {allLocations.map((loc) => (
              <Link
                key={loc.slug}
                to={`/locations/${loc.slug}#location-cta`}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full text-[13px] font-semibold uppercase tracking-[0.06em] transition-opacity duration-200 hover:opacity-90 text-center"
                style={{ background: "#E8670A", color: "#FFFFFF", textDecoration: "none" }}
                data-location={loc.slug.replace("-va", "")}
                data-cta-type="book"
              >
                Book {loc.city}
              </Link>
            ))}
          </div>

          <p className="text-[14px]" style={{ color: "rgba(255,255,255,0.45)" }}>
            Or call{" "}
            <a href="tel:8663444955" className="font-semibold" style={{ color: "#FFFFFF", textDecoration: "none" }}>
              866-344-4955
            </a>{" "}
            to speak with our team
          </p>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default LocationsHub;
