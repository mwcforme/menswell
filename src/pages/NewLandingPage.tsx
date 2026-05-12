import { useEffect } from "react";
import { TRTHeader } from "@/components/landing/trt/TRTHeader";
import { TRTHero } from "@/components/landing/trt/TRTHero";
import { TRTTrustBar } from "@/components/landing/trt/TRTTrustBar";
import { TRTHowItWorks } from "@/components/landing/trt/TRTHowItWorks";
import { TRTResults } from "@/components/landing/trt/TRTResults";
import { TRTManifesto } from "@/components/landing/trt/TRTManifesto";
import { TRTMarquee } from "@/components/landing/trt/TRTMarquee";
import { TRTPillars } from "@/components/landing/trt/TRTPillars";
import { TRTFinalCTA } from "@/components/landing/trt/TRTFinalCTA";
import { TRTLocations } from "@/components/landing/trt/TRTLocations";
import { TRTFAQ } from "@/components/landing/trt/TRTFAQ";
import { TRTFooter } from "@/components/landing/trt/TRTFooter";
import { TRTMobileCTA } from "@/components/landing/trt/TRTMobileCTA";
import { SectionReveal } from "@/components/landing/trt/SectionReveal";

const NewLandingPage = () => {
  useEffect(() => {
    document.title = "TRT in Virginia | Testing | Men's Wellness Centers";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Provider-supervised testosterone replacement therapy at 3 Virginia locations. Testing and results reviewed in-visit. Walk in today.");
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>
      <TRTHeader />
      <main className="flex-1">
        <TRTHero />
        <SectionReveal><TRTTrustBar /></SectionReveal>
        <SectionReveal><TRTHowItWorks /></SectionReveal>
        <SectionReveal><TRTManifesto /></SectionReveal>
        <SectionReveal><TRTResults /></SectionReveal>
        <SectionReveal><TRTPillars /></SectionReveal>
        <SectionReveal><TRTMarquee /></SectionReveal>
        <SectionReveal><TRTLocations /></SectionReveal>
        <SectionReveal><TRTFAQ /></SectionReveal>
        <SectionReveal><TRTFinalCTA /></SectionReveal>
      </main>
      <TRTFooter />
      <TRTMobileCTA />
      <div className="md:hidden" style={{ height: 56 }} aria-hidden="true" />
    </div>
  );
};

export default NewLandingPage;

