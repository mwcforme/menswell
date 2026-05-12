import { useEffect } from "react";
import { UnifiedHeader } from "@/components/landing/unified/UnifiedHeader";
import { UnifiedStatBar } from "@/components/landing/unified/UnifiedStatBar";
import { UnifiedFooter } from "@/components/landing/unified/UnifiedFooter";
import { UnifiedMobileCTA } from "@/components/landing/unified/UnifiedMobileCTA";
import { WLUnifiedHero } from "@/components/landing/unified/wl/WLUnifiedHero";
import { WLUnifiedHowItWorks } from "@/components/landing/unified/wl/WLUnifiedHowItWorks";
import { WLUnifiedWhyUs } from "@/components/landing/unified/wl/WLUnifiedWhyUs";
import { WLUnifiedTestimonials } from "@/components/landing/unified/wl/WLUnifiedTestimonials";
import { WLUnifiedFinalCTA } from "@/components/landing/unified/wl/WLUnifiedFinalCTA";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Men's Wellness Centers",
  description: "Physician-supervised GLP-1 medical weight loss therapy at 3 Virginia centers. FDA-approved Semaglutide prescribed and monitored by licensed physicians.",
  url: "https://menswellnesscenters.com",
  telephone: "866-344-4955",
  email: "info@menswellnesscenters.com",
  medicalSpecialty: "Weight Loss Medicine",
  foundingDate: "2015",
  availableService: { "@type": "MedicalProcedure", name: "GLP-1 Medical Weight Loss", procedureType: "Therapeutic" },
  location: [
    { "@type": "MedicalClinic", name: "Men's Wellness Centers — Richmond", address: { "@type": "PostalAddress", streetAddress: "4050 Innslake Dr, Suite 360", addressLocality: "Glen Allen", addressRegion: "VA", postalCode: "23060" }, telephone: "804-346-4636" },
    { "@type": "MedicalClinic", name: "Men's Wellness Centers — Newport News", address: { "@type": "PostalAddress", streetAddress: "827 Diligence Drive, Suite 206", addressLocality: "Newport News", addressRegion: "VA", postalCode: "23606" }, telephone: "757-806-6263" },
    { "@type": "MedicalClinic", name: "Men's Wellness Centers — Virginia Beach", address: { "@type": "PostalAddress", streetAddress: "996 First Colonial Road", addressLocality: "Virginia Beach", addressRegion: "VA", postalCode: "23454" }, telephone: "757-806-6263" },
  ],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "200", bestRating: "5" },
};

const WeightLossV2LandingPage = () => {
  useEffect(() => {
    document.title = "Physician-Supervised Weight Loss | GLP-1 Therapy | Men's Wellness Centers";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "FDA-approved GLP-1 medications like Semaglutide prescribed by Virginia physicians. Real medical oversight. No mail-order shortcuts. Consultation.");

    if (!document.getElementById("wl-v2-lp-jsonld")) {
      const script = document.createElement("script");
      script.id = "wl-v2-lp-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => { document.getElementById("wl-v2-lp-jsonld")?.remove(); };
  }, []);

  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, system-ui, sans-serif", background: "#FFFFFF" }}>
      <UnifiedHeader />
      <WLUnifiedHero />
      <UnifiedStatBar />
      <WLUnifiedHowItWorks />
      <WLUnifiedWhyUs />
      <WLUnifiedTestimonials />
      <WLUnifiedFinalCTA />
      <UnifiedFooter />
      <UnifiedMobileCTA targetId="wl-hero-form" />
    </div>
  );
};

export default WeightLossV2LandingPage;
