import { useEffect } from "react";
import { UnifiedHeader } from "@/components/landing/unified/UnifiedHeader";
import { UnifiedStatBar } from "@/components/landing/unified/UnifiedStatBar";
import { UnifiedFooter } from "@/components/landing/unified/UnifiedFooter";
import { UnifiedMobileCTA } from "@/components/landing/unified/UnifiedMobileCTA";
import { EDUnifiedHero } from "@/components/landing/unified/ed/EDUnifiedHero";
import { EDUnifiedHowItWorks } from "@/components/landing/unified/ed/EDUnifiedHowItWorks";
import { EDUnifiedWhyUs } from "@/components/landing/unified/ed/EDUnifiedWhyUs";
import { EDUnifiedTestimonials } from "@/components/landing/unified/ed/EDUnifiedTestimonials";
import { EDUnifiedFinalCTA } from "@/components/landing/unified/ed/EDUnifiedFinalCTA";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Men's Wellness Centers",
  description: "Confidential, physician-supervised erectile dysfunction treatment at 3 Virginia centers.",
  url: "https://menswellnesscenters.com",
  telephone: "866-344-4955",
  email: "info@menswellnesscenters.com",
  medicalSpecialty: "Men's Health",
  availableService: { "@type": "MedicalProcedure", name: "Erectile Dysfunction Treatment", procedureType: "Therapeutic" },
  location: [
    { "@type": "MedicalClinic", name: "Men's Wellness Centers — Richmond", address: { "@type": "PostalAddress", streetAddress: "4050 Innslake Dr, Suite 360", addressLocality: "Glen Allen", addressRegion: "VA", postalCode: "23060" }, telephone: "804-346-4636" },
    { "@type": "MedicalClinic", name: "Men's Wellness Centers — Newport News", address: { "@type": "PostalAddress", streetAddress: "827 Diligence Drive, Suite 206", addressLocality: "Newport News", addressRegion: "VA", postalCode: "23606" }, telephone: "757-806-6263" },
    { "@type": "MedicalClinic", name: "Men's Wellness Centers — Virginia Beach", address: { "@type": "PostalAddress", streetAddress: "996 First Colonial Road", addressLocality: "Virginia Beach", addressRegion: "VA", postalCode: "23454" }, telephone: "757-806-6263" },
  ],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "500", bestRating: "5" },
};

const EDLandingPage = () => {
  useEffect(() => {
    document.title = "Confidential ED Treatment | Men's Wellness Centers Virginia";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Discreet, physician-supervised erectile dysfunction treatment at 3 Virginia centers. Personalized care from licensed providers. Confidential consultation.");

    if (!document.getElementById("ed-lp-jsonld")) {
      const script = document.createElement("script");
      script.id = "ed-lp-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => { document.getElementById("ed-lp-jsonld")?.remove(); };
  }, []);

  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, system-ui, sans-serif", background: "#FFFFFF" }}>
      <UnifiedHeader />
      <EDUnifiedHero />
      <UnifiedStatBar />
      <EDUnifiedHowItWorks />
      <EDUnifiedWhyUs />
      <EDUnifiedTestimonials />
      <EDUnifiedFinalCTA />
      <UnifiedFooter />
      <UnifiedMobileCTA targetId="ed-hero-form" />
    </div>
  );
};

export default EDLandingPage;
