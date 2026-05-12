import { useEffect } from "react";
import { UnifiedHeader } from "@/components/landing/unified/UnifiedHeader";
import { UnifiedStatBar } from "@/components/landing/unified/UnifiedStatBar";
import { UnifiedFooter } from "@/components/landing/unified/UnifiedFooter";
import { UnifiedMobileCTA } from "@/components/landing/unified/UnifiedMobileCTA";
import { OGTRT2UnifiedHero } from "@/components/landing/og-trt2/OGTRT2UnifiedHero";
import { OGTRT2UnifiedSymptoms } from "@/components/landing/og-trt2/OGTRT2UnifiedSymptoms";
import { OGTRT2UnifiedHowItWorks } from "@/components/landing/og-trt2/OGTRT2UnifiedHowItWorks";
import { OGTRT2UnifiedTestimonials } from "@/components/landing/og-trt2/OGTRT2UnifiedTestimonials";
import { OGTRT2UnifiedFinalCTA } from "@/components/landing/og-trt2/OGTRT2UnifiedFinalCTA";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Men's Wellness Centers",
  description: "Physician-supervised testosterone replacement therapy at 3 Virginia clinic locations. Testing, results reviewed in-visit.",
  url: "https://menswellnesscenters.com",
  telephone: "866-344-4955",
  medicalSpecialty: "Men's Health",
  foundingDate: "2015",
  employee: [{ "@type": "Person", name: "Dr. Steven Papariello", jobTitle: "Medical Director" }],
  location: [
    { "@type": "MedicalClinic", name: "Men's Wellness Centers — Richmond", address: { "@type": "PostalAddress", streetAddress: "4050 Innslake Dr, Suite 360", addressLocality: "Glen Allen", addressRegion: "VA", postalCode: "23060" }, telephone: "804-346-4636" },
    { "@type": "MedicalClinic", name: "Men's Wellness Centers — Newport News", address: { "@type": "PostalAddress", streetAddress: "827 Diligence Drive, Suite 206", addressLocality: "Newport News", addressRegion: "VA", postalCode: "23606" }, telephone: "757-806-6263" },
    { "@type": "MedicalClinic", name: "Men's Wellness Centers — Virginia Beach", address: { "@type": "PostalAddress", streetAddress: "996 First Colonial Road", addressLocality: "Virginia Beach", addressRegion: "VA", postalCode: "23454" }, telephone: "757-806-6263" },
  ],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "200", bestRating: "5" },
};

const OGTRT2LandingPage = () => {
  useEffect(() => {
    document.title = "Testosterone Testing | Men's Wellness Centers Virginia";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Physician-supervised TRT at 3 Virginia centers. Testosterone testing, results reviewed in-visit. No referral needed.");

    if (!document.getElementById("og-trt2-lp-jsonld")) {
      const script = document.createElement("script");
      script.id = "og-trt2-lp-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => { document.getElementById("og-trt2-lp-jsonld")?.remove(); };
  }, []);

  return (
    <div className="pt-[60px]">
      <UnifiedHeader />
      <OGTRT2UnifiedHero />
      <UnifiedStatBar />
      <OGTRT2UnifiedSymptoms />
      <OGTRT2UnifiedHowItWorks />
      <OGTRT2UnifiedTestimonials />
      <OGTRT2UnifiedFinalCTA />
      <UnifiedFooter />
      <UnifiedMobileCTA targetId="og-trt2-lead-form" />
    </div>
  );
};

export default OGTRT2LandingPage;
