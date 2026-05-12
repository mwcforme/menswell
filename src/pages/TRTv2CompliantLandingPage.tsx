import { useEffect } from "react";
import { TRTv2Header } from "@/components/landing/trt-v2/TRTv2Header";
import { TRTv2Hero } from "@/components/landing/trt-v2/TRTv2Hero";
import { TRTv2TrustBar } from "@/components/landing/trt-v2/TRTv2TrustBar";
import { TRTv2SymptomsAndVisit } from "@/components/landing/trt-v2/TRTv2SymptomsAndVisit";
import { TRTv2FirstVisitIncluded } from "@/components/landing/trt-v2/TRTv2FirstVisitIncluded";
import { TRTv2ReviewsOutcomes } from "@/components/landing/trt-v2/TRTv2ReviewsOutcomes";
import { TRTv2Locations } from "@/components/landing/trt-v2/TRTv2Locations";
import { TRTv2Commitment } from "@/components/landing/trt-v2/TRTv2Commitment";
import { TRTv2FAQ } from "@/components/landing/trt-v2/TRTv2FAQ";
import { TRTv2BookingForm } from "@/components/landing/trt-v2/TRTv2BookingForm";
import { TRTv2Footer } from "@/components/landing/trt-v2/TRTv2Footer";
import { TRTv2MobileCTA } from "@/components/landing/trt-v2/TRTv2MobileCTA";

const TRTv2CompliantLandingPage = () => {
  useEffect(() => {
    document.title = "Testosterone Therapy in Virginia | In-Person Men's Health Clinics | MWC";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Physician-led testosterone care at 3 in-person Virginia clinics. On-site labs, face-to-face consultation, personalized care plan in under 60 minutes. Same-day appointments.");
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>
      <TRTv2Header />
      <main className="flex-1">
        <TRTv2Hero />
        <TRTv2TrustBar />
        <TRTv2SymptomsAndVisit />
        <TRTv2FirstVisitIncluded />
        <TRTv2ReviewsOutcomes />
        <TRTv2Locations />
        <TRTv2Commitment />
        <TRTv2FAQ />
        <TRTv2BookingForm />
      </main>
      <TRTv2Footer />
      <TRTv2MobileCTA />
    </div>
  );
};

export default TRTv2CompliantLandingPage;
