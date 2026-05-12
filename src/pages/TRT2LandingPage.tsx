import { useEffect } from "react";
import { TRT2Hero } from "@/components/landing/trt2/TRT2Hero";
import { TRT2ProblemAgitation } from "@/components/landing/trt2/TRT2ProblemAgitation";
import { TRT2HowItWorks } from "@/components/landing/trt2/TRT2HowItWorks";
import { TRT2Comparison } from "@/components/landing/trt2/TRT2Comparison";
import { TRT2Testimonials } from "@/components/landing/trt2/TRT2Testimonials";
import { TRT2FAQ } from "@/components/landing/trt2/TRT2FAQ";
import { TRT2UrgencyBanner } from "@/components/landing/trt2/TRT2UrgencyBanner";
import { TRT2FinalForm } from "@/components/landing/trt2/TRT2FinalForm";
import { TRT2Footer } from "@/components/landing/trt2/TRT2Footer";
import { TRT2MobileCTA } from "@/components/landing/trt2/TRT2MobileCTA";

const TRT2LandingPage = () => {
  useEffect(() => {
    document.title = "Testosterone Testing | Men's Wellness Centers Virginia";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Physician-supervised testosterone replacement therapy at 3 Virginia locations. Testing, results reviewed in-visit. No referral needed. Book your no-cost consultation today.");

    // JSON-LD
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      name: "Men's Wellness Centers",
      description: "Testosterone Replacement Therapy in Virginia",
      foundingDate: "2015",
      telephone: "+18663444955",
      url: "https://menswellnesscenters.com",
      medicalSpecialty: "Men's Health",
      address: [
        { "@type": "PostalAddress", addressLocality: "Richmond", addressRegion: "VA", addressCountry: "US" },
        { "@type": "PostalAddress", addressLocality: "Newport News", addressRegion: "VA", addressCountry: "US" },
        { "@type": "PostalAddress", addressLocality: "Virginia Beach", addressRegion: "VA", addressCountry: "US" },
      ],
      employee: [
        { "@type": "Person", name: "Dr. Steven Papariello", jobTitle: "Medical Director" },
        { "@type": "Person", name: "Matthew Bott", jobTitle: "Director of Operations" },
      ],
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>
      <main className="flex-1">
        <TRT2Hero />
        <TRT2ProblemAgitation />
        <TRT2HowItWorks />
        <TRT2Comparison />
        <TRT2Testimonials />
        <TRT2FAQ />
        <TRT2UrgencyBanner />
        <TRT2FinalForm />
      </main>
      <TRT2Footer />
      <TRT2MobileCTA />
    </div>
  );
};

export default TRT2LandingPage;
