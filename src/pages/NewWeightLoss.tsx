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
import { WLHero } from "@/components/landing/wl/WLHero";
import { WLHowItWorks } from "@/components/landing/wl/WLHowItWorks";
import { WLManifesto } from "@/components/landing/wl/WLManifesto";
import { WLFAQ } from "@/components/landing/wl/WLFAQ";
import { ServiceFinalCTA } from "@/components/landing/shared/ServiceFinalCTA";

const NewWeightLoss = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>
      <SEO
        title="Medical Weight Loss for Men in Virginia | Men's Wellness Centers"
        description="Physician-supervised GLP-1 weight loss in Virginia. Semaglutide, tirzepatide, and a real provider you actually meet. FSA and HSA accepted."
      />
      <TRTHeader />
      <main className="flex-1">
        <WLHero />
        <SectionReveal><TRTTrustBar /></SectionReveal>
        <SectionReveal><WLHowItWorks /></SectionReveal>
        <SectionReveal><WLManifesto /></SectionReveal>
        <SectionReveal><TRTResults /></SectionReveal>
        <SectionReveal><TRTPillars /></SectionReveal>
        <SectionReveal><TRTMarquee /></SectionReveal>
        <SectionReveal><TRTLocations /></SectionReveal>
        <SectionReveal><WLFAQ /></SectionReveal>
        <SectionReveal>
          <ServiceFinalCTA
            service="wl"
            headline="READY TO START LOSING THE WEIGHT?"
            subhead="Book your first visit. We will handle the rest."
            cardTitle="See If I Qualify"
            ctaLabel="See If I Qualify"
            intro="No more cycles of strict diets and bounce-back. A Virginia physician, real labs, and the right medication for your body."
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

export default NewWeightLoss;
