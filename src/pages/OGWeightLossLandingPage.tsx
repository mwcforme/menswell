import { useEffect } from "react";
import { LPLayout } from "@/components/landing/shared/LPLayout";
import { OGWLv1Hero } from "@/components/landing/og-wl-v1/OGWLv1Hero";
import { OGWLv1StatBar } from "@/components/landing/og-wl-v1/OGWLv1StatBar";
import { OGWLv1HowItWorks } from "@/components/landing/og-wl-v1/OGWLv1HowItWorks";
import { OGWLv1Benefits } from "@/components/landing/og-wl-v1/OGWLv1Benefits";
import { OGWLv1Testimonials } from "@/components/landing/og-wl-v1/OGWLv1Testimonials";
import { OGWLv1FinalCTA } from "@/components/landing/og-wl-v1/OGWLv1FinalCTA";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Men's Wellness Centers",
  description: "Physician-supervised medical weight loss programs for men at 3 Virginia clinic locations.",
  url: "https://menswellnesscenters.com",
  telephone: "866-344-4955",
  medicalSpecialty: "Weight Loss Medicine",
  foundingDate: "2015",
  location: [
    { "@type": "MedicalClinic", name: "Men's Wellness Centers — Richmond", address: { "@type": "PostalAddress", streetAddress: "4050 Innslake Dr, Suite 360", addressLocality: "Glen Allen", addressRegion: "VA", postalCode: "23060" }, telephone: "804-346-4636" },
    { "@type": "MedicalClinic", name: "Men's Wellness Centers — Newport News", address: { "@type": "PostalAddress", streetAddress: "827 Diligence Drive, Suite 206", addressLocality: "Newport News", addressRegion: "VA", postalCode: "23606" }, telephone: "757-806-6263" },
    { "@type": "MedicalClinic", name: "Men's Wellness Centers — Virginia Beach", address: { "@type": "PostalAddress", streetAddress: "996 First Colonial Road", addressLocality: "Virginia Beach", addressRegion: "VA", postalCode: "23454" }, telephone: "757-806-6263" },
  ],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "200", bestRating: "5" },
};

const OGWeightLossLandingPage = () => {
  useEffect(() => {
    document.title = "Medical Weight Loss Virginia | Physician-Supervised | Men's Wellness Centers";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Physician-supervised weight loss programs for men in Virginia. Nutrient-rich vitamin injections, metabolic testing, and custom protocols.");

    if (!document.getElementById("og-wl-lp-jsonld")) {
      const script = document.createElement("script");
      script.id = "og-wl-lp-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
    return () => { document.getElementById("og-wl-lp-jsonld")?.remove(); };
  }, []);

  return (
    <LPLayout ctaTarget="#book">
      <OGWLv1Hero />
      <OGWLv1StatBar />
      <OGWLv1HowItWorks />
      <OGWLv1Benefits />
      <OGWLv1Testimonials />
      <OGWLv1FinalCTA />
    </LPLayout>
  );
};

export default OGWeightLossLandingPage;
