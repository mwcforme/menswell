import { TRTHeader } from "@/components/landing/trt/TRTHeader";
import { TRTTrustBar } from "@/components/landing/trt/TRTTrustBar";
import { TRTPillars } from "@/components/landing/trt/TRTPillars";
import { TRTMarquee } from "@/components/landing/trt/TRTMarquee";
import { TRTLocations } from "@/components/landing/trt/TRTLocations";
import { TRTResults } from "@/components/landing/trt/TRTResults";
import { TRTFooter } from "@/components/landing/trt/TRTFooter";
import { TRTMobileCTA } from "@/components/landing/trt/TRTMobileCTA";
import { SectionReveal } from "@/components/landing/trt/SectionReveal";
import { SEO } from "@/components/SEO";
import { EDHero } from "@/components/landing/ed/EDHero";
import { EDHowItWorks } from "@/components/landing/ed/EDHowItWorks";
import { EDManifesto } from "@/components/landing/ed/EDManifesto";
import { EDFAQ } from "@/components/landing/ed/EDFAQ";
import { ServiceFinalCTA } from "@/components/landing/shared/ServiceFinalCTA";

const NewED = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>
      <SEO
        title="ED Treatment in Virginia | Discreet, In-Person | Men's Wellness Centers"
        description="In-person ED treatment with a Virginia physician. Sildenafil, Tadalafil, TriMix, and PT-141 when clinically appropriate. 100% confidential."
      />
      <TRTHeader />
      <main className="flex-1">
        <EDHero />
        <SectionReveal><TRTTrustBar /></SectionReveal>
        <SectionReveal><EDHowItWorks /></SectionReveal>
        <SectionReveal><EDManifesto /></SectionReveal>
        <SectionReveal><TRTResults /></SectionReveal>
        <SectionReveal><TRTPillars /></SectionReveal>
        <SectionReveal><TRTMarquee /></SectionReveal>
        <SectionReveal><TRTLocations /></SectionReveal>
        <SectionReveal><EDFAQ /></SectionReveal>
        <SectionReveal>
          <ServiceFinalCTA
            service="ed"
            headline="READY TO HANDLE THIS THE RIGHT WAY?"
            subhead="One discreet visit. Real labs. The right protocol for you."
            cardTitle="Book My Discreet Visit"
            ctaLabel="Book My Discreet Visit"
            intro="No mail-order pills. No rotating clinicians. A Virginia physician who diagnoses the cause and prescribes what actually works for your case."
            bullets={["100% confidential", "Face-to-face with a physician", "Same-day visits available"]}
          />
        </SectionReveal>
      </main>
      <TRTFooter />
      <TRTMobileCTA />
      <div className="md:hidden" style={{ height: 56 }} aria-hidden="true" />
    </div>
  );
};

export default NewED;
