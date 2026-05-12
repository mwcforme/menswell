import { useEffect } from "react";
import GHLTRTHeader from "@/components/landing/ghl-trt/GHLTRTHeader";
import GHLTRTHero from "@/components/landing/ghl-trt/GHLTRTHero";

import GHLTRTStatBar from "@/components/landing/ghl-trt/GHLTRTStatBar";
import GHLTRTSymptoms from "@/components/landing/ghl-trt/GHLTRTSymptoms";
import GHLTRTHowItWorks from "@/components/landing/ghl-trt/GHLTRTHowItWorks";
import GHLTRTDifference from "@/components/landing/ghl-trt/GHLTRTDifference";
import GHLTRTResults from "@/components/landing/ghl-trt/GHLTRTResults";

import GHLTRTMidCTA from "@/components/landing/ghl-trt/GHLTRTMidCTA";
import GHLTRTTestimonial from "@/components/landing/ghl-trt/GHLTRTTestimonial";
import GHLTRTFAQ from "@/components/landing/ghl-trt/GHLTRTFAQ";
import GHLTRTFinalCTA from "@/components/landing/ghl-trt/GHLTRTFinalCTA";
import GHLTRTFooter from "@/components/landing/ghl-trt/GHLTRTFooter";
import { GHLTRTMobileCTA } from "@/components/landing/ghl-trt/GHLTRTMobileCTA";

const GHLTRTLandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      <GHLTRTHeader />
      <GHLTRTHero />
      
      <GHLTRTStatBar />
      <GHLTRTSymptoms />
      <GHLTRTHowItWorks />
      <GHLTRTDifference />
      <GHLTRTResults />
      
      <GHLTRTMidCTA />
      <GHLTRTTestimonial />
      <GHLTRTFAQ />
      <GHLTRTFinalCTA />
      <GHLTRTFooter />
      <GHLTRTMobileCTA />
    </div>
  );
};

export default GHLTRTLandingPage;
