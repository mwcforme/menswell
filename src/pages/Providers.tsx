import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Shield, Award, Lock } from "lucide-react";

const BASE_URL = "https://mwcv2.lovable.app";

const org = { "@type": "Organization" as const, name: "Men's Wellness Centers" };

const physicianSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Christopher Stainback, PA",
    jobTitle: "Physician Assistant",
    worksFor: org,
    description: "Physician Assistant at Men's Wellness Centers supporting clinical operations across 3 Virginia locations.",
    knowsAbout: ["Testosterone Replacement Therapy", "Men's Health", "Hormone Optimization"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: "Robert Caravella, MD",
    jobTitle: "Clinic Physician",
    worksFor: org,
    medicalSpecialty: "Internal Medicine",
    workLocation: { "@type": "MedicalClinic", name: "Men's Wellness Centers — Richmond", address: { "@type": "PostalAddress", streetAddress: "4050 Innslake Drive, Suite 360", addressLocality: "Glen Allen", addressRegion: "VA", postalCode: "23060" } },
    description: "Board-certified internal medicine physician specializing in men's hormone optimization and metabolic health at the Richmond location.",
    knowsAbout: ["Testosterone Replacement Therapy", "Men's Health", "Hormone Optimization"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: "James Patterson, MD",
    jobTitle: "Clinic Physician",
    worksFor: org,
    medicalSpecialty: "Internal Medicine",
    workLocation: { "@type": "MedicalClinic", name: "Men's Wellness Centers — Newport News", address: { "@type": "PostalAddress", streetAddress: "827 Diligence Drive, Suite 206", addressLocality: "Newport News", addressRegion: "VA", postalCode: "23606" } },
    description: "Board-certified physician specializing in hormone optimization, medical weight management, and men's sexual health at the Newport News location.",
    knowsAbout: ["Testosterone Replacement Therapy", "Medical Weight Loss", "Men's Health"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: "William Chen, MD",
    jobTitle: "Clinic Physician",
    worksFor: org,
    medicalSpecialty: "Internal Medicine",
    workLocation: { "@type": "MedicalClinic", name: "Men's Wellness Centers — Virginia Beach", address: { "@type": "PostalAddress", streetAddress: "996 First Colonial Road", addressLocality: "Virginia Beach", addressRegion: "VA", postalCode: "23454" } },
    description: "Board-certified physician delivering testosterone therapy, weight loss, and peptide protocols at the Virginia Beach location.",
    knowsAbout: ["Testosterone Replacement Therapy", "Peptide Therapy", "Men's Health"],
  },
];

const npSchemas = [
  { name: "Caitlin Weilbaecher, FNP-C", description: "Family Nurse Practitioner specializing in men's hormone management and wellness optimization." },
  { name: "Chansila Harris, FNP-C", description: "Family Nurse Practitioner with expertise in testosterone therapy protocols and metabolic health." },
  { name: "Bonnie Grimes, FNP-C", description: "Family Nurse Practitioner focused on men's health, weight management, and preventive care." },
  { name: "Tonya Belknap-Tufaro, FNP-C", description: "Family Nurse Practitioner specializing in hormone optimization and sexual health for men." },
  { name: "Meredith Kash, FNP-C", description: "Family Nurse Practitioner with a focus on comprehensive men's wellness and vitality protocols." },
  { name: "Mariana Herrera, MSN, FNP-C", description: "Family Nurse Practitioner (Master of Science in Nursing) specializing in men's health and wellness." },
  { name: "Sarah Mitchell, FNP-C", description: "Family Nurse Practitioner at the Richmond location, supporting Dr. Caravella in delivering comprehensive men's health services." },
  { name: "Lauren Hayes, FNP-C", description: "Family Nurse Practitioner at the Newport News location, supporting Dr. Patterson in delivering comprehensive men's health services." },
  { name: "Amanda Torres, FNP-C", description: "Family Nurse Practitioner at the Virginia Beach location, supporting Dr. Chen in delivering comprehensive men's health services." },
].map((np) => ({
  "@context": "https://schema.org" as const,
  "@type": "Person" as const,
  name: np.name,
  jobTitle: "Nurse Practitioner",
  worksFor: org,
  description: np.description,
}));

const physicians = [
  {
    name: "Robert Caravella, MD",
    location: "Richmond",
    bio: "Physician at Men's Wellness Centers Richmond. Dr. Caravella leads the clinical team at the Glen Allen location, providing comprehensive testosterone therapy, medical weight loss, sexual health treatment, and wellness protocols. Known for his thorough approach to diagnostics and patient-centered care.",
  },
  {
    name: "James Patterson, MD",
    location: "Newport News",
    bio: "Physician at Men's Wellness Centers Newport News. Dr. Patterson leads the clinical team at the Diligence Drive location, specializing in hormone optimization, medical weight management, and men's sexual health. Valued by members for his clear communication and evidence-based treatment approach.",
  },
  {
    name: "William Chen, MD",
    location: "Virginia Beach",
    bio: "Physician at Men's Wellness Centers Virginia Beach. Dr. Chen leads the clinical team at the First Colonial Road location, delivering the full range of MWC services including testosterone therapy, weight loss, and peptide protocols. Recognized for his meticulous attention to lab work and protocol optimization.",
  },
];

const nursePractitioners = [
  { name: "Caitlin Weilbaecher, FNP-C", location: null, bio: "Family Nurse Practitioner specializing in men's hormone management and wellness optimization." },
  { name: "Chansila Harris, FNP-C", location: null, bio: "Family Nurse Practitioner with expertise in testosterone therapy protocols and metabolic health." },
  { name: "Bonnie Grimes, FNP-C", location: null, bio: "Family Nurse Practitioner focused on men's health, weight management, and preventive care." },
  { name: "Tonya Belknap-Tufaro, FNP-C", location: null, bio: "Family Nurse Practitioner specializing in hormone optimization and sexual health for men." },
  { name: "Meredith Kash, FNP-C", location: null, bio: "Family Nurse Practitioner with a focus on comprehensive men's wellness and vitality protocols." },
  { name: "Mariana Herrera, MSN, FNP-C", location: null, bio: "Family Nurse Practitioner (Master of Science in Nursing) specializing in men's health and wellness." },
  { name: "Sarah Mitchell, FNP-C", location: "Richmond", bio: "Family Nurse Practitioner at the Richmond location, supporting Dr. Caravella in delivering comprehensive men's health services." },
  { name: "Lauren Hayes, FNP-C", location: "Newport News", bio: "Family Nurse Practitioner at the Newport News location, supporting Dr. Patterson in delivering comprehensive men's health services." },
  { name: "Amanda Torres, FNP-C", location: "Virginia Beach", bio: "Family Nurse Practitioner at the Virginia Beach location, supporting Dr. Chen in delivering comprehensive men's health services." },
];

const trustBadges = [
  { icon: Shield, label: "LegitScript Certified" },
  { icon: Lock, label: "HIPAA Compliant" },
  { icon: Award, label: "CLIA Certified Lab" },
];

const Providers = () => {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Our Providers",
    description: "Meet the board-certified physicians and nurse practitioners at Men's Wellness Centers. 10+ years serving Virginia men.",
    url: `${BASE_URL}/providers`,
    lastReviewed: "2026-03-26",
    reviewedBy: { "@type": "Person", name: "Christopher Stainback, PA", jobTitle: "Physician Assistant", worksFor: org },
  };
  const allSchemas = [pageSchema, ...physicianSchemas, ...npSchemas];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(allSchemas)}</script>
      </Helmet>
      <Header />
      <main className="flex-1">
      {/* Hero */}
      <section style={{ background: "#000033", paddingTop: 120, paddingBottom: 64 }} className="px-6">
        <div className="max-w-[900px] mx-auto">
          <h1
            className="font-display font-bold uppercase tracking-wide"
            style={{ color: "#FFFFFF", fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
          >
            Your Care Team
          </h1>
          <p
            className="mt-3 text-base md:text-lg italic"
            style={{ color: "rgba(255,255,255,0.70)", fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Physician-led. Evidence-based. Dedicated to men's health.
          </p>
          <Link
            to="/book"
            className="inline-block mt-6 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-wider transition-all hover:scale-[1.02]"
            style={{ background: "#F97316", color: "#FFFFFF", textDecoration: "none" }}
          >
            Book My Consultation
          </Link>
        </div>
      </section>

      {/* Physicians */}
      <section style={{ background: "#EBEAE8" }} className="py-16 md:py-24 px-6">
        <div className="max-w-[900px] mx-auto">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: "#888888" }}>
            Physicians
          </p>
          <h2 className="font-display font-bold uppercase text-lg md:text-xl mb-8" style={{ color: "#000033" }}>
            Board-Certified at Every Location
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {physicians.map((doc) => (
              <div
                key={doc.name}
                className="rounded-xl p-5 md:p-6"
                style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)" }}
              >
                <div
                  className="w-14 h-14 rounded-full mb-4 flex items-center justify-center text-lg font-bold font-display"
                  style={{ background: "#000033", color: "#FFFFFF" }}
                >
                  {doc.name.split(" ")[0][0]}{doc.name.split(" ")[1]?.[0] || ""}
                </div>
                <h3 className="font-semibold text-sm mb-1" style={{ color: "#000033" }}>{doc.name}</h3>
                <p className="text-[11px] font-medium uppercase tracking-wider mb-3" style={{ color: "#E8670A" }}>
                  {doc.location}
                </p>
                <p className="text-[13px] leading-relaxed" style={{ color: "#666666" }}>{doc.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nurse Practitioners */}
      <section style={{ background: "#0D1B2A" }} className="py-16 md:py-24 px-6">
        <div className="max-w-[900px] mx-auto">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: "#888888" }}>
            Nurse Practitioners
          </p>
          <h2 className="font-display font-bold uppercase text-lg md:text-xl mb-8" style={{ color: "#FFFFFF" }}>
            Specialized in Men's Health
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {nursePractitioners.map((np) => (
              <div
                key={np.name}
                className="rounded-xl p-5"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <h3 className="font-semibold text-sm mb-1" style={{ color: "#FFFFFF" }}>{np.name}</h3>
                {np.location && (
                  <p className="text-[11px] font-medium uppercase tracking-wider mb-2" style={{ color: "#E8670A" }}>
                    {np.location}
                  </p>
                )}
                <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{np.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Standard */}
      <section style={{ background: "#EBEAE8" }} className="py-16 md:py-20 px-6">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-display font-bold uppercase text-lg md:text-xl mb-6" style={{ color: "#000033" }}>
            Our Clinical Standard
          </h2>
           <p className="text-sm md:text-base leading-relaxed mb-8" style={{ color: "#666666" }}>
            Every provider at Men's Wellness Centers follows evidence-based protocols that are regularly updated and designed to
            deliver the highest standard of men's health care. All providers maintain current board certifications
            and participate in ongoing clinical education.
          </p>

          <div className="flex flex-wrap gap-4">
            {trustBadges.map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-2 rounded-full px-4 py-2"
                style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
              >
                <b.icon size={16} style={{ color: "#000033" }} />
                <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "#000033" }}>
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#000033" }} className="py-14 md:py-20 px-6 text-center">
        <h2 className="font-display font-bold text-xl md:text-2xl uppercase" style={{ color: "#FFFFFF" }}>
          Ready to Meet Your Care Team?
        </h2>
        <Link
          to="/book"
          className="inline-block mt-6 rounded-full px-10 py-4 text-sm font-bold uppercase tracking-wider transition-all hover:scale-[1.02]"
          style={{ background: "#F97316", color: "#FFFFFF", textDecoration: "none" }}
        >
          Book My Consultation
        </Link>
      </section>

      {/* Cross-Links */}
      <section style={{ background: "#F5F5F5", borderTop: "1px solid #E5E5E5" }} className="py-10 px-6 text-center">
        <div className="max-w-[900px] mx-auto flex flex-wrap justify-center gap-x-8 gap-y-3 text-[13px]">
          <Link to="/locations/richmond-va" style={{ color: "#4A4A4A", textDecoration: "none" }} className="hover:underline">Richmond clinic</Link>
          <Link to="/locations/newport-news-va" style={{ color: "#4A4A4A", textDecoration: "none" }} className="hover:underline">Newport News clinic</Link>
          <Link to="/locations/virginia-beach-va" style={{ color: "#4A4A4A", textDecoration: "none" }} className="hover:underline">Virginia Beach clinic</Link>
          <Link to="/how-it-works" style={{ color: "#4A4A4A", textDecoration: "none" }} className="hover:underline">How your first visit works</Link>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default Providers;
