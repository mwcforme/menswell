import { useLocation } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";

const BASE_URL = "https://mwcv2.lovable.app";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "Men's Wellness Centers",
  alternateName: "MWC",
  url: BASE_URL,
  logo: `${BASE_URL}/og-image.png`,
  description: "Virginia's premier physician-led men's health clinics specializing in testosterone therapy, medical weight loss, erectile dysfunction treatment, and wellness optimization for men 40+.",
  foundingDate: "2015",
  areaServed: { "@type": "State", name: "Virginia" },
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 15, maxValue: 25 },
  slogan: "Find Your Edge Over Age",
  knowsAbout: [
    "Testosterone Replacement Therapy",
    "Medical Weight Loss",
    "Erectile Dysfunction Treatment",
    "Peptide Therapy",
    "Men's Health",
    "Anti-Aging Medicine",
    "GLP-1 Weight Loss",
    "Sexual Wellness",
  ],
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+1-866-344-4955", contactType: "customer service", areaServed: "US", availableLanguage: "English" },
    { "@type": "ContactPoint", telephone: "+1-804-346-4636", contactType: "customer service", areaServed: { "@type": "City", name: "Richmond, VA" } },
    { "@type": "ContactPoint", telephone: "+1-757-806-6263", contactType: "customer service", areaServed: { "@type": "State", name: "Virginia" } },
  ],
  sameAs: [
    "https://www.facebook.com/menswellnesscenters",
    "https://www.instagram.com/menswellnesscenters",
  ],
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "LegitScript Certified" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "HIPAA Compliant" },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "CLIA Certified Laboratory" },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Men's Wellness Centers",
  url: BASE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

interface PageSEO {
  title: string;
  description: string;
  noindex?: boolean;
}

const PAGE_META: Record<string, PageSEO> = {
  "/": {
    title: "Men's Wellness Centers | Virginia's Premier Men's Health Clinics",
    description: "Physician-led testosterone therapy, medical weight loss, ED treatment & sexual wellness at 3 Virginia locations. On-site labs. Consultation. Call (866) 344-4955.",
  },
  "/services": {
    title: "Men's Health Services | TRT, Weight Loss, ED Treatment | Men's Wellness Centers",
    description: "Explore physician-led treatments for men 40+: testosterone therapy, GLP-1 weight loss, erectile dysfunction solutions, peptide therapy & vitamin injections at 3 Virginia clinics.",
  },
  "/services/testosterone-therapy": {
    title: "Testosterone Replacement Therapy (TRT) in Virginia | Men's Wellness Centers",
    description: "Board-certified TRT for men with low testosterone. Same-day lab results, personalized protocols, ongoing optimization. 3 Virginia locations. Consultation.",
  },
  "/services/weight-loss": {
    title: "Medical Weight Loss for Men | GLP-1, Semaglutide & Fat-Burning Injections | MWC",
    description: "Physician-supervised weight loss programs including GLP-1 (semaglutide/tirzepatide), lipotropic injections & metabolic optimization. 3 Virginia locations.",
  },
  "/services/sexual-health": {
    title: "Erectile Dysfunction Treatment in Virginia | Men's Wellness Centers",
    description: "Discreet, effective ED treatment from board-certified physicians. PT-141, TriMix, oral medications & combination therapy. Same-day consultations at 3 Virginia clinics.",
  },
  "/services/wellness-vitality": {
    title: "Wellness & Vitality Treatments | Vitamin Injections, Peptides, NAD+ | MWC",
    description: "Boost energy, immunity & performance with physician-grade vitamin injections (B12, D3, glutathione), peptide therapy, NAD+ & anti-aging protocols at Men's Wellness Centers.",
  },
  "/locations": {
    title: "Men's Health Clinic Locations in Virginia | Men's Wellness Centers",
    description: "Visit Men's Wellness Centers in Richmond (Glen Allen), Newport News, or Virginia Beach. Board-certified providers, on-site labs, consultations. Walk-ins welcome.",
  },
  "/locations/richmond-va": {
    title: "Men's Health Clinic in Richmond, VA (Glen Allen) | Men's Wellness Centers",
    description: "Richmond's premier men's health clinic at 4050 Innslake Dr, Glen Allen. TRT, weight loss, ED treatment. Dr. Robert Caravella, MD. Call (804) 346-4636. Consultation.",
  },
  "/locations/newport-news-va": {
    title: "Men's Health Clinic in Newport News, VA | Men's Wellness Centers",
    description: "Newport News men's health clinic at 827 Diligence Dr. Testosterone therapy, weight loss, ED treatment. Dr. James Patterson, MD. Call (757) 806-6263. Consultation.",
  },
  "/locations/virginia-beach-va": {
    title: "Men's Health Clinic in Virginia Beach, VA | Men's Wellness Centers",
    description: "Virginia Beach men's health clinic at 996 First Colonial Rd. TRT, weight loss, ED treatment. Dr. William Chen, MD. Call (757) 806-6263. Consultation.",
  },
  "/how-it-works": {
    title: "How It Works | Your First Visit to Men's Wellness Centers",
    description: "From no-cost consultation to personalized treatment in 3 simple steps. Same-day lab results, physician evaluation, ongoing optimization. See how easy it is.",
  },
  "/providers": {
    title: "Our Physicians & Providers | Board-Certified Men's Health Team | MWC",
    description: "Meet the board-certified physicians and nurse practitioners at Men's Wellness Centers. 10+ years serving Virginia men.",
  },
  "/book": {
    title: "Book Your Consultation | Men's Wellness Centers",
    description: "Schedule your men's health consultation at any of our 3 Virginia locations. Same-day lab results available. Call (866) 344-4955 or book online.",
    noindex: true,
  },
  "/states-served": {
    title: "States We Serve | Men's Wellness Centers Telehealth Coverage",
    description: "Men's Wellness Centers serves patients across Virginia with in-person visits at 3 locations. Learn about our service areas and telehealth coverage.",
  },
  "/sitemap": {
    title: "Sitemap | Men's Wellness Centers",
    description: "Complete sitemap of Men's Wellness Centers website. Find all our services, locations, providers, and resources.",
    noindex: true,
  },
  "/privacy-policy": {
    title: "Privacy Policy | Men's Wellness Centers",
    description: "How Men's Wellness Centers collects, uses, and protects your personal and health information. HIPAA-compliant privacy practices.",
    noindex: true,
  },
  "/terms-of-service": {
    title: "Terms of Service | Men's Wellness Centers",
    description: "Terms and conditions governing your use of the Men's Wellness Centers website and telehealth services.",
    noindex: true,
  },
  "/telehealth-consent": {
    title: "Telehealth Consent | Men's Wellness Centers",
    description: "Informed consent for telehealth consultations and virtual visits at Men's Wellness Centers.",
    noindex: true,
  },
  "/licensing": {
    title: "Licensing & Accreditation | Men's Wellness Centers",
    description: "Licensing, accreditation, and regulatory compliance information for Men's Wellness Centers in Virginia.",
    noindex: true,
  },
  "/prescribing-policy": {
    title: "Prescribing Policy | Men's Wellness Centers",
    description: "Men's Wellness Centers prescribing policies, clinical protocols, and medication safety standards.",
    noindex: true,
  },
  "/pharmacy-partners": {
    title: "Pharmacy Partners | Men's Wellness Centers",
    description: "Our trusted compounding and specialty pharmacy partners ensuring quality medications for Men's Wellness Centers patients.",
    noindex: true,
  },
  "/advertising-disclosure": {
    title: "Advertising Disclosure | Men's Wellness Centers",
    description: "Advertising, sponsorship, and affiliate disclosure for Men's Wellness Centers website content.",
    noindex: true,
  },
  "/refund-policy": {
    title: "Refund Policy | Men's Wellness Centers",
    description: "Refund, cancellation, and billing policies for Men's Wellness Centers services and treatments.",
    noindex: true,
  },
};

const BREADCRUMB_LABELS: Record<string, string> = {
  services: "Services",
  locations: "Locations",
  "testosterone-therapy": "Testosterone Therapy",
  "weight-loss": "Medical Weight Loss",
  "sexual-health": "Sexual Health",
  "wellness-vitality": "Wellness & Vitality",
  "richmond-va": "Richmond, VA",
  "newport-news-va": "Newport News, VA",
  "virginia-beach-va": "Virginia Beach, VA",
  "how-it-works": "How It Works",
  providers: "Our Providers",
  book: "Book My Consultation",
  "privacy-policy": "Privacy Policy",
  "terms-of-service": "Terms of Service",
  "telehealth-consent": "Telehealth Consent",
  licensing: "Licensing",
  "prescribing-policy": "Prescribing Policy",
  "pharmacy-partners": "Pharmacy Partners",
  "advertising-disclosure": "Advertising Disclosure",
  "refund-policy": "Refund Policy",
  sitemap: "Sitemap",
  "states-served": "States Served",
};

const SERVICE_SCHEMAS: Record<string, object> = {
  "/services": {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Men's Health Services",
    url: "https://menswellnesscenters.com/services/",
    description: "Explore physician-led treatments for men 40+: testosterone therapy, GLP-1 weight loss, erectile dysfunction solutions, peptide therapy & vitamin injections at 3 Virginia clinics.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        { "@type": "ListItem", position: 1, item: { "@type": "MedicalTherapy", name: "Testosterone Replacement Therapy", url: "https://menswellnesscenters.com/services/testosterone-therapy/", description: "Physician-monitored TRT with on-site labs, personalized protocols, and ongoing optimization.", medicalSpecialty: { "@type": "MedicalSpecialty", name: "Endocrinology" } } },
        { "@type": "ListItem", position: 2, item: { "@type": "MedicalTherapy", name: "Medical Weight Loss", url: "https://menswellnesscenters.com/services/weight-loss/", description: "Physician-supervised weight loss with GLP-1 medications, metabolic testing, and personalized plans.", medicalSpecialty: { "@type": "MedicalSpecialty", name: "Bariatric Medicine" } } },
        { "@type": "ListItem", position: 3, item: { "@type": "MedicalTherapy", name: "Sexual Health", url: "https://menswellnesscenters.com/services/sexual-health/", description: "Confidential erectile dysfunction treatment and sexual health solutions with proven medical therapies.", medicalSpecialty: { "@type": "MedicalSpecialty", name: "Urology" } } },
        { "@type": "ListItem", position: 4, item: { "@type": "MedicalTherapy", name: "Wellness & Vitality", url: "https://menswellnesscenters.com/services/wellness-vitality/", description: "Custom wellness protocols including peptide therapy, NAD+, and vitamin injections.", medicalSpecialty: { "@type": "MedicalSpecialty", name: "Preventive Medicine" } } },
      ],
    },
  },
  "/services/testosterone-therapy": {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Testosterone Replacement Therapy (TRT)",
    url: "https://menswellnesscenters.com/services/testosterone-therapy/",
    description: "Board-certified TRT for men with low testosterone. Same-day lab results, personalized protocols, ongoing optimization.",
    about: { "@type": "MedicalTherapy", name: "Testosterone Replacement Therapy", alternateName: "TRT", medicalSpecialty: "Endocrinology", relevantSpecialty: { "@type": "MedicalSpecialty", name: "Men's Health" }, indication: { "@type": "MedicalIndication", name: "Low Testosterone (Hypogonadism)" } },
    provider: { "@type": "MedicalOrganization", name: "Men's Wellness Centers", "@id": "https://menswellnesscenters.com/#organization" },
  },
  "/services/sexual-health": {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Sexual Health & Erectile Dysfunction Treatment",
    url: "https://menswellnesscenters.com/services/sexual-health/",
    description: "Discreet, effective ED treatment from board-certified physicians. PT-141, TriMix, oral medications & combination therapy.",
    about: { "@type": "MedicalTherapy", name: "Erectile Dysfunction Treatment", medicalSpecialty: "Urology", relevantSpecialty: { "@type": "MedicalSpecialty", name: "Sexual Medicine" }, indication: { "@type": "MedicalIndication", name: "Erectile Dysfunction" } },
    provider: { "@type": "MedicalOrganization", name: "Men's Wellness Centers", "@id": "https://menswellnesscenters.com/#organization" },
  },
  "/services/weight-loss": {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Medical Weight Loss Program",
    url: "https://menswellnesscenters.com/services/weight-loss/",
    description: "Physician-supervised weight loss programs including GLP-1 (semaglutide/tirzepatide), lipotropic injections & metabolic optimization.",
    about: { "@type": "MedicalTherapy", name: "Medical Weight Loss", alternateName: "GLP-1 Weight Loss Program", medicalSpecialty: "Bariatrics", relevantSpecialty: { "@type": "MedicalSpecialty", name: "Men's Health" }, drug: [{ "@type": "Drug", name: "Semaglutide", alternateName: "GLP-1 Receptor Agonist" }, { "@type": "Drug", name: "Tirzepatide", alternateName: "GLP-1/GIP Receptor Agonist" }] },
    provider: { "@type": "MedicalOrganization", name: "Men's Wellness Centers", "@id": "https://menswellnesscenters.com/#organization" },
  },
  "/services/wellness-vitality": {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Wellness & Vitality Programs",
    url: "https://menswellnesscenters.com/services/wellness-vitality/",
    description: "Boost energy, immunity & performance with physician-grade vitamin injections, peptide therapy, NAD+ & anti-aging protocols.",
    about: { "@type": "MedicalTherapy", name: "Wellness & Vitality Optimization", medicalSpecialty: "Preventive Medicine", relevantSpecialty: { "@type": "MedicalSpecialty", name: "Men's Health" } },
    provider: { "@type": "MedicalOrganization", name: "Men's Wellness Centers", "@id": "https://menswellnesscenters.com/#organization" },
  },
};

function buildBreadcrumb(pathname: string) {
  if (pathname === "/") return null;
  const segments = pathname.replace(/\/$/, "").split("/").filter(Boolean);
  const items = [
    { "@type": "ListItem" as const, position: 1, name: "Home", item: `${BASE_URL}/` },
  ];
  let path = "";
  segments.forEach((seg, i) => {
    path += `/${seg}`;
    items.push({
      "@type": "ListItem",
      position: i + 2,
      name: BREADCRUMB_LABELS[seg] || seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      item: `${BASE_URL}${path}`,
    });
  });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

export const GlobalSchema = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const meta = PAGE_META[pathname];

  // Build JSON-LD schemas
  const schemas: object[] = [];
  if (isHome) {
    schemas.push(organizationSchema, websiteSchema);
  }
  const serviceSchema = SERVICE_SCHEMAS[pathname];
  if (serviceSchema) schemas.push(serviceSchema);
  const breadcrumb = buildBreadcrumb(pathname);
  if (breadcrumb) schemas.push(breadcrumb);

  if (!meta) return schemas.length > 0 ? <SEOHead title="Men's Wellness Centers" description="Virginia's premier men's health clinics." canonical={`${BASE_URL}${pathname}`} jsonLd={schemas.length === 1 ? schemas[0] : schemas} /> : null;

  return (
    <SEOHead
      title={meta.title}
      description={meta.description}
      canonical={`${BASE_URL}${pathname === "/" ? "/" : pathname}`}
      noindex={meta.noindex}
      jsonLd={schemas.length > 0 ? (schemas.length === 1 ? schemas[0] : schemas) : undefined}
    />
  );
};
