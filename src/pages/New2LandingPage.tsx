import { useEffect } from "react";
import { TRTHeader } from "@/components/landing/trt/TRTHeader";
import { New2Hero } from "@/components/landing/new2/New2Hero";
import { New2POV } from "@/components/landing/new2/New2POV";
import { New2Press } from "@/components/landing/new2/New2Press";
import { New2Approach } from "@/components/landing/new2/New2Approach";
import { New2Cases } from "@/components/landing/new2/New2Cases";
import { New2Services } from "@/components/landing/new2/New2Services";
import { New2BigCTA } from "@/components/landing/new2/New2BigCTA";
import { New2Footer } from "@/components/landing/new2/New2Footer";
import { SectionReveal } from "@/components/landing/trt/SectionReveal";

const New2LandingPage = () => {
  useEffect(() => {
    document.title = "TRT in Virginia | Testing | Men's Wellness Centers";
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute(
        "content",
        "Provider-supervised testosterone replacement therapy at 3 Virginia locations. Testing and results reviewed in-visit. Walk in today."
      );
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "Inter, sans-serif", background: "#F5F1E8" }}>
      <TRTHeader />
      <main className="flex-1">
        <New2Hero />
        <SectionReveal><New2POV /></SectionReveal>
        <SectionReveal><New2Press /></SectionReveal>
        <SectionReveal><New2Approach /></SectionReveal>
        <SectionReveal><New2Cases /></SectionReveal>
        <SectionReveal><New2Services /></SectionReveal>
        <SectionReveal><New2BigCTA /></SectionReveal>
      </main>
      <New2Footer />
    </div>
  );
};

export default New2LandingPage;
