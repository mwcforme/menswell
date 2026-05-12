import { Helmet } from "react-helmet-async";
import type { LocationData } from "@/data/locations";

interface Props {
  location: LocationData;
}

const BASE_URL = "https://mwcv2.lovable.app";

const availableService = [
  { "@type": "MedicalTherapy", name: "Testosterone Replacement Therapy (TRT)", description: "Physician-supervised testosterone optimization for men with clinically low testosterone levels." },
  { "@type": "MedicalTherapy", name: "Medical Weight Loss", description: "GLP-1 medications (semaglutide, tirzepatide), lipotropic injections, and metabolic optimization programs." },
  { "@type": "MedicalTherapy", name: "Erectile Dysfunction Treatment", description: "PT-141, TriMix, oral medications, and combination ED therapy protocols." },
  { "@type": "MedicalTherapy", name: "Peptide Therapy", description: "Custom peptide protocols for anti-aging, recovery, and performance optimization." },
  { "@type": "MedicalTherapy", name: "Vitamin Injections", description: "Physician-grade B12, D3, glutathione, MIC, Tri-Immune, and NAD+ injections." },
  { "@type": "MedicalTherapy", name: "Labs & Diagnostics", description: "Comprehensive hormone panels and metabolic blood work with results reviewed in-visit." },
];

const LOCATION_CONFIG: Record<string, {
  name: string; alternateName: string; telephone: string; description: string;
  streetAddress: string; addressLocality: string; postalCode: string;
  lat: number; lng: number; hasMap: string;
  employee: object[];
}> = {
  "richmond-va": {
    name: "Men's Wellness Centers — Richmond",
    alternateName: "MWC Richmond",
    telephone: "+1-804-346-4636",
    description: "Board-certified men's health clinic in Glen Allen (Richmond), VA specializing in testosterone therapy, medical weight loss, ED treatment, peptide therapy, and wellness optimization. Led by Robert Caravella, MD.",
    streetAddress: "4050 Innslake Drive, Suite 360",
    addressLocality: "Glen Allen",
    postalCode: "23060",
    lat: 37.6607,
    lng: -77.5622,
    hasMap: "https://maps.google.com/?q=4050+Innslake+Drive+Suite+360+Glen+Allen+VA+23060",
    employee: [
      { "@type": "Physician", name: "Robert Caravella, MD", jobTitle: "Clinic Physician", medicalSpecialty: "Internal Medicine", description: "Board-certified internal medicine physician specializing in men's hormone optimization and metabolic health." },
      { "@type": "Person", name: "Sarah Mitchell, FNP-C", jobTitle: "Nurse Practitioner", description: "Family nurse practitioner specializing in men's health, testosterone therapy, and wellness optimization." },
    ],
  },
  "newport-news-va": {
    name: "Men's Wellness Centers — Newport News",
    alternateName: "MWC Newport News",
    telephone: "+1-757-806-6263",
    description: "Board-certified men's health clinic in Newport News, VA specializing in testosterone therapy, medical weight loss, ED treatment, peptide therapy, and wellness optimization. Led by James Patterson, MD.",
    streetAddress: "827 Diligence Drive, Suite 206",
    addressLocality: "Newport News",
    postalCode: "23606",
    lat: 37.0871,
    lng: -76.4730,
    hasMap: "https://maps.google.com/?q=827+Diligence+Drive+Suite+206+Newport+News+VA+23606",
    employee: [
      { "@type": "Physician", name: "James Patterson, MD", jobTitle: "Clinic Physician", medicalSpecialty: "Internal Medicine" },
      { "@type": "Person", name: "Lauren Hayes, FNP-C", jobTitle: "Nurse Practitioner" },
    ],
  },
  "virginia-beach-va": {
    name: "Men's Wellness Centers — Virginia Beach",
    alternateName: "MWC Virginia Beach",
    telephone: "+1-757-806-6263",
    description: "Board-certified men's health clinic in Virginia Beach, VA specializing in testosterone therapy, medical weight loss, ED treatment, peptide therapy, and wellness optimization. Led by William Chen, MD.",
    streetAddress: "996 First Colonial Road",
    addressLocality: "Virginia Beach",
    postalCode: "23454",
    lat: 36.8529,
    lng: -76.0127,
    hasMap: "https://maps.google.com/?q=996+First+Colonial+Road+Virginia+Beach+VA+23454",
    employee: [
      { "@type": "Physician", name: "William Chen, MD", jobTitle: "Clinic Physician", medicalSpecialty: "Internal Medicine" },
      { "@type": "Person", name: "Amanda Torres, FNP-C", jobTitle: "Nurse Practitioner" },
    ],
  },
};

export const LocationSchema = ({ location }: Props) => {
  const config = LOCATION_CONFIG[location.slug];
  if (!config) return null;

  const clinicSchema = {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "MedicalBusiness"],
    name: config.name,
    alternateName: config.alternateName,
    url: `${BASE_URL}/locations/${location.slug}`,
    telephone: config.telephone,
    description: config.description,
    image: `${BASE_URL}/og-image.png`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: config.streetAddress,
      addressLocality: config.addressLocality,
      addressRegion: "VA",
      postalCode: config.postalCode,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: config.lat,
      longitude: config.lng,
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" },
    ],
    medicalSpecialty: ["Endocrinology", "Urology", "InternalMedicine"],
    availableService,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      ratingCount: "200",
      reviewCount: "200",
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Men's Wellness Centers",
      url: BASE_URL,
    },
    isAcceptedPaymentMethod: ["Cash", "CreditCard", "DebitCard", "HSA", "FSA"],
    hasMap: config.hasMap,
    employee: config.employee,
  };

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Men's Health Center in ${location.city}, VA`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".hero-answer-block", ".first-visit-answer-block", ".pricing-answer-block"],
    },
    url: `${BASE_URL}/locations/${location.slug}`,
  };

  const reviewSchemas = location.testimonials.slice(0, 3).map((t) => {
    const monthMap: Record<string, string> = { January: "01", February: "02", March: "03" };
    const month = Object.entries(monthMap).find(([m]) => t.location.includes(m))?.[1] || "01";
    return {
      "@context": "https://schema.org",
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      datePublished: `2026-${month}-01`,
      reviewBody: t.quote,
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      itemReviewed: { "@type": "MedicalClinic", name: config.name },
    };
  });

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(clinicSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(speakableSchema)}</script>
      {reviewSchemas.length > 0 && (
        <script type="application/ld+json">{JSON.stringify(reviewSchemas)}</script>
      )}
    </Helmet>
  );
};
