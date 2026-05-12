import { useEffect } from "react";
import GHLTRTHeader from "../ghl-trt/GHLTRTHeader";
import GHLTRTStatBar from "../ghl-trt/GHLTRTStatBar";
import GHLTRTDifference from "../ghl-trt/GHLTRTDifference";
import GHLHero from "./GHLHero";
import GHLSymptoms from "./GHLSymptoms";
import GHLHowItWorks from "./GHLHowItWorks";
import GHLResults from "./GHLResults";
import GHLMidCTA from "./GHLMidCTA";
import GHLTestimonials from "./GHLTestimonials";
import GHLFAQ from "./GHLFAQ";
import GHLFinalCTA from "./GHLFinalCTA";
import GHLFooter from "./GHLFooter";
import { GHLMobileCTA } from "./GHLMobileCTA";
import type { GHLVerticalConfig } from "@/data/ghl-config";

interface Props { config: GHLVerticalConfig }

const GHLPage = ({ config }: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      <GHLTRTHeader />
      <GHLHero config={config} />
      <GHLTRTStatBar />
      <GHLSymptoms config={config} />
      <GHLHowItWorks config={config} />
      <GHLTRTDifference />
      <GHLResults config={config} />
      <GHLMidCTA config={config} />
      <GHLTestimonials config={config} />
      <GHLFAQ config={config} />
      <GHLFinalCTA config={config} />
      <GHLFooter config={config} />
      <GHLMobileCTA config={config} />
    </div>
  );
};

export default GHLPage;
