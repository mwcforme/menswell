import { useEffect } from "react";
import { UnifiedHeader } from "@/components/landing/unified/UnifiedHeader";
import { UnifiedStatBar } from "@/components/landing/unified/UnifiedStatBar";
import { UnifiedFooter } from "@/components/landing/unified/UnifiedFooter";
import { UnifiedMobileCTA } from "@/components/landing/unified/UnifiedMobileCTA";
import { OGTRTUnifiedHero } from "@/components/landing/og-trt/OGTRTUnifiedHero";
import { OGTRTUnifiedHowItWorks } from "@/components/landing/og-trt/OGTRTUnifiedHowItWorks";
import { OGTRTUnifiedWhyUs } from "@/components/landing/og-trt/OGTRTUnifiedWhyUs";
import { OGTRTUnifiedTestimonials } from "@/components/landing/og-trt/OGTRTUnifiedTestimonials";
import { OGTRTUnifiedFinalCTA } from "@/components/landing/og-trt/OGTRTUnifiedFinalCTA";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Men's Wellness Centers",
  description: "Physician-supervised testosterone replacement therapy at 3 Virginia clinic locations. Testing, results reviewed in-visit.",
  url: "https://menswellnesscenters.com",
  telephone: "866-344-4955",
  medicalSpecialty: "Men's Health",
  foundingDate: "2015",
  location: [
    { "@type": "MedicalClinic", name: "Men's Wellness Centers — Richmond", address: { "@type": "PostalAddress", streetAddress: "4050 Innslake Dr, Suite 360", addressLocality: "Glen Allen", addressRegion: "VA", postalCode: "23060" }, telephone: "804-346-4636" },
    { "@type": "MedicalClinic", name: "Men's Wellness Centers — Newport News", address: { "@type": "PostalAddress", streetAddress: "827 Diligence Drive, Suite 206", addressLocality: "Newport News", addressRegion: "VA", postalCode: "23606" }, telephone: "757-806-6263" },
    { "@type": "MedicalClinic", name: "Men's Wellness Centers — Virginia Beach", address: { "@type": "PostalAddress", streetAddress: "996 First Colonial Road", addressLocality: "Virginia Beach", addressRegion: "VA", postalCode: "23454" }, telephone: "757-806-6263" },
  ],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "200", bestRating: "5" },
};

const OGTRTLandingPage = () => {
  useEffect(() => {
    document.title = "TRT in Virginia | Testing | Men's Wellness Centers";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Physician-supervised testosterone replacement therapy at 3 Virginia locations. Testing, results reviewed in-visit. Walk in today.");

    if (!document.getElementById("og-trt-lp-jsonld")) {
      const script = document.createElement("script");
      script.id = "og-trt-lp-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
    return () => { document.getElementById("og-trt-lp-jsonld")?.remove(); };
  }, []);

  return (
    <div className="pt-[60px]">
      <UnifiedHeader />
      <OGTRTUnifiedHero />
      <UnifiedStatBar />
      <OGTRTUnifiedHowItWorks />
      <OGTRTUnifiedWhyUs />
      <OGTRTUnifiedTestimonials />
      <OGTRTUnifiedFinalCTA />
      <UnifiedFooter />
      <UnifiedMobileCTA />
    </div>
  );
};

export default OGTRTLandingPage;
