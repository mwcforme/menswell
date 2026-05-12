import { useEffect } from "react";
import { UnifiedHeader } from "@/components/landing/unified/UnifiedHeader";
import { UnifiedStatBar } from "@/components/landing/unified/UnifiedStatBar";
import { UnifiedFooter } from "@/components/landing/unified/UnifiedFooter";
import { UnifiedMobileCTA } from "@/components/landing/unified/UnifiedMobileCTA";
import { OGEDUnifiedHero } from "@/components/landing/og-ed/OGEDUnifiedHero";
import { OGEDUnifiedHowItWorks } from "@/components/landing/og-ed/OGEDUnifiedHowItWorks";
import { OGEDUnifiedWhyUs } from "@/components/landing/og-ed/OGEDUnifiedWhyUs";
import { OGEDUnifiedTestimonials } from "@/components/landing/og-ed/OGEDUnifiedTestimonials";
import { OGEDUnifiedFinalCTA } from "@/components/landing/og-ed/OGEDUnifiedFinalCTA";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Men's Wellness Centers",
  description: "Confidential, physician-supervised erectile dysfunction treatment at 3 Virginia center locations.",
  url: "https://menswellnesscenters.com",
  telephone: "866-344-4955",
  email: "info@menswellnesscenters.com",
  medicalSpecialty: "Men's Health",
  availableService: {
    "@type": "MedicalProcedure",
    name: "Erectile Dysfunction Treatment",
    procedureType: "Therapeutic",
  },
  location: [
    {
      "@type": "MedicalClinic",
      name: "Men's Wellness Centers — Richmond",
      address: { "@type": "PostalAddress", streetAddress: "4050 Innslake Dr, Suite 360", addressLocality: "Glen Allen", addressRegion: "VA", postalCode: "23060" },
      telephone: "804-346-4636",
    },
    {
      "@type": "MedicalClinic",
      name: "Men's Wellness Centers — Newport News",
      address: { "@type": "PostalAddress", streetAddress: "827 Diligence Drive, Suite 206", addressLocality: "Newport News", addressRegion: "VA", postalCode: "23606" },
      telephone: "757-806-6263",
    },
    {
      "@type": "MedicalClinic",
      name: "Men's Wellness Centers — Virginia Beach",
      address: { "@type": "PostalAddress", streetAddress: "996 First Colonial Road", addressLocality: "Virginia Beach", addressRegion: "VA", postalCode: "23454" },
      telephone: "757-806-6263",
    },
  ],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "500", bestRating: "5" },
};

const OGEDLandingPage = () => {
  useEffect(() => {
    document.title = "Confidential ED Treatment | Men's Wellness Centers Virginia";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Discreet, physician-supervised erectile dysfunction treatment at 3 Virginia centers. Personalized care from licensed providers. Confidential consultation.");

    if (!document.getElementById("og-ed-lp-jsonld")) {
      const script = document.createElement("script");
      script.id = "og-ed-lp-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => { document.getElementById("og-ed-lp-jsonld")?.remove(); };
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#FFFFFF" }}>
      <UnifiedHeader />
      <div className="pt-[60px]">
        <OGEDUnifiedHero />
        <UnifiedStatBar />
        <OGEDUnifiedHowItWorks />
        <OGEDUnifiedWhyUs />
        <OGEDUnifiedTestimonials />
        <OGEDUnifiedFinalCTA />
      </div>
      <UnifiedFooter />
      <UnifiedMobileCTA targetId="og-ed-lead-form" />
    </div>
  );
};

export default OGEDLandingPage;
