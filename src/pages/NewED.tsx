import { TRTHeader } from "@/components/landing/trt/TRTHeader";
import { CredibilityBand } from "@/components/landing/trt/CredibilityBand";
import { TRTPillars } from "@/components/landing/trt/TRTPillars";
import { TRTMarquee } from "@/components/landing/trt/TRTMarquee";
import { TRTLocations } from "@/components/landing/trt/TRTLocations";
import { TRTResults } from "@/components/landing/trt/TRTResults";
import { TRTFooter } from "@/components/landing/trt/TRTFooter";
import { StickyMobileCTA } from "@/components/landing/trt/StickyMobileCTA";
import { SectionReveal } from "@/components/landing/trt/SectionReveal";
import { SEO } from "@/components/SEO";
import { useScrollDepth } from "@/hooks/useAnalytics";
import { EDHero } from "@/components/landing/ed/EDHero";
import { EDHowItWorks } from "@/components/landing/ed/EDHowItWorks";
import { EDManifesto } from "@/components/landing/ed/EDManifesto";
import { EDFAQ } from "@/components/landing/ed/EDFAQ";
import { ServiceFinalCTA } from "@/components/landing/shared/ServiceFinalCTA";

const NewED = () => { useScrollDepth();
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>
      <SEO
        title="ED Treatment in Virginia | Discreet, In-Person | Men's Wellness Centers"
        description="In-person ED treatment with a Virginia physician. Sildenafil, Tadalafil, TriMix, and PT-141 when clinically appropriate. 100% confidential."
      />
      <TRTHeader />
      <main className="flex-1">
        <EDHero />
        <SectionReveal><CredibilityBand /></SectionReveal>
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
            subhead="Free consult. Same- or next-day visits."
            cardTitle="Book My Discreet Visit"
            ctaLabel="Book My Discreet Visit"
            intro="No mail-order pills. No rotating clinicians. A Virginia physician who diagnoses the cause and prescribes what actually works for your case."
            bullets={[
              "100% private. Your employer or insurance is never notified.",
              "Cancel or reschedule free, anytime.",
              "If ED treatment isn't right for you, our providers will tell you. Treatment is only prescribed when clinically appropriate.",
            ]}
          />
        </SectionReveal>
      </main>
      <TRTFooter />
      <StickyMobileCTA />
      <div className="md:hidden" style={{ height: 56 }} aria-hidden="true" />
    </div>
  );
};

export default NewED;
