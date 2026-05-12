import { useEffect } from "react";
import { UnifiedHeader } from "@/components/landing/unified/UnifiedHeader";
import { UnifiedStatBar } from "@/components/landing/unified/UnifiedStatBar";
import { UnifiedFooter } from "@/components/landing/unified/UnifiedFooter";
import { UnifiedMobileCTA } from "@/components/landing/unified/UnifiedMobileCTA";
import { TRTv2UnifiedHero } from "@/components/landing/unified/trt/TRTv2UnifiedHero";
import { TRTv2UnifiedHowItWorks } from "@/components/landing/unified/trt/TRTv2UnifiedHowItWorks";
import { TRTv2UnifiedWhyUs } from "@/components/landing/unified/trt/TRTv2UnifiedWhyUs";
import { TRTv2UnifiedTestimonials } from "@/components/landing/unified/trt/TRTv2UnifiedTestimonials";
import { TRTv2UnifiedFinalCTA } from "@/components/landing/unified/trt/TRTv2UnifiedFinalCTA";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Men's Wellness Centers",
  description: "Physician-supervised testosterone replacement therapy at 3 Virginia centers. Testing, results reviewed in-visit.",
  url: "https://menswellnesscenters.com",
  telephone: "866-344-4955",
  email: "info@menswellnesscenters.com",
  medicalSpecialty: "Men's Health",
  foundingDate: "2015",
  location: [
    {
      "@type": ["MedicalClinic", "LocalBusiness"],
      name: "Men's Wellness Centers — Richmond",
      address: { "@type": "PostalAddress", streetAddress: "4050 Innslake Dr, Suite 360", addressLocality: "Glen Allen", addressRegion: "VA", postalCode: "23060" },
      telephone: "804-346-4636",
    },
    {
      "@type": ["MedicalClinic", "LocalBusiness"],
      name: "Men's Wellness Centers — Newport News",
      address: { "@type": "PostalAddress", streetAddress: "827 Diligence Drive, Suite 206", addressLocality: "Newport News", addressRegion: "VA", postalCode: "23606" },
      telephone: "757-806-6263",
    },
    {
      "@type": ["MedicalClinic", "LocalBusiness"],
      name: "Men's Wellness Centers — Virginia Beach",
      address: { "@type": "PostalAddress", streetAddress: "996 First Colonial Road", addressLocality: "Virginia Beach", addressRegion: "VA", postalCode: "23454" },
      telephone: "757-806-6263",
    },
  ],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "200", bestRating: "5" },
};

const TRTv2LandingPage = () => {
  useEffect(() => {
    document.title = "Testosterone Testing | Men's Wellness Centers Virginia";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Physician-supervised TRT at 3 Virginia centers. Testosterone testing, results reviewed in-visit. No referral needed. Book your no-cost consultation today.");

    if (!document.getElementById("trt-v2-lp-jsonld")) {
      const script = document.createElement("script");
      script.id = "trt-v2-lp-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => { document.getElementById("trt-v2-lp-jsonld")?.remove(); };
  }, []);

  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, system-ui, sans-serif", background: "#FFFFFF" }}>
      <UnifiedHeader />
      <TRTv2UnifiedHero />
      <UnifiedStatBar />
      <TRTv2UnifiedHowItWorks />
      <TRTv2UnifiedWhyUs />
      <TRTv2UnifiedTestimonials />
      <TRTv2UnifiedFinalCTA />
      <UnifiedFooter />
      <UnifiedMobileCTA targetId="trt-hero-form" />
    </div>
  );
};

export default TRTv2LandingPage;
