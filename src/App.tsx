import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GlobalSchema } from "@/components/GlobalSchema";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Licensing from "./pages/Licensing";
import HowItWorks from "./pages/HowItWorks";
import Providers from "./pages/Providers";

import PrescribingPolicy from "./pages/PrescribingPolicy";
import PharmacyPartners from "./pages/PharmacyPartners";
import StatesServed from "./pages/StatesServed";
import AdvertisingDisclosure from "./pages/AdvertisingDisclosure";
import Sitemap from "./pages/Sitemap";
import TelehealthConsent from "./pages/TelehealthConsent";
import RefundPolicy from "./pages/RefundPolicy";
import TRTLandingPage from "./pages/TRTLandingPage";
import NewLandingPage from "./pages/NewLandingPage";
import BookSymptom from "./pages/book/BookSymptom";
import BookDuration from "./pages/book/BookDuration";
import BookSchedule from "./pages/book/BookSchedule";
import BookConfirmed from "./pages/book/BookConfirmed";
import BookLetsTalk from "./pages/book/BookLetsTalk";
import New2LandingPage from "./pages/New2LandingPage";
import TRTv2CompliantLandingPage from "./pages/TRTv2CompliantLandingPage";
import TRT2LandingPage from "./pages/TRT2LandingPage";
import TRT2ThankYou from "./pages/TRT2ThankYou";
import EDLandingPage from "./pages/EDLandingPage";
import WeightLossLandingPage from "./pages/WeightLossLandingPage";
import WeightLossV2LandingPage from "./pages/WeightLossV2LandingPage";
import WeightLossV2ThankYou from "./pages/WeightLossV2ThankYou";
import TRTv2LandingPage from "./pages/TRTv2LandingPage";
import TRTv2ThankYou from "./pages/TRTv2ThankYou";
import LPIndex from "./pages/LPIndex";
import ServicesIndex from "./pages/services/ServicesIndex";
import TestosteroneService from "./pages/services/TestosteroneService";
import SexualHealthService from "./pages/services/SexualHealthService";
import WeightLossService from "./pages/services/WeightLossService";
import WellnessVitalityService from "./pages/services/WellnessVitalityService";
import OGEDLandingPage from "./pages/OGEDLandingPage";
import OGTRT2LandingPage from "./pages/OGTRT2LandingPage";
import OGWeightLossV2LandingPage from "./pages/OGWeightLossV2LandingPage";
import OGTRTLandingPage from "./pages/OGTRTLandingPage";
import OGWeightLossLandingPage from "./pages/OGWeightLossLandingPage";
import BookingFunnel from "./pages/BookingFunnel";
import GHLTRTLandingPage from "./pages/GHLTRTLandingPage";
import GHLEDLandingPage from "./pages/GHLEDLandingPage";
import GHLWLLandingPage from "./pages/GHLWLLandingPage";
import GHLGeneralLandingPage from "./pages/GHLGeneralLandingPage";
import IntakePage from "./pages/IntakePage";
import IntakeThanksPage from "./pages/IntakeThanksPage";
import BrandComparison from "./pages/BrandComparison";
import BookingFunnelV2 from "./pages/BookingFunnelV2";
import BookingFunnelV2Spec from "./pages/BookingFunnelV2Spec";
import BookingFunnelV3 from "./pages/BookingFunnelV3";
import SurveyPage from "./pages/SurveyPage";
import SurveyThanksPage from "./pages/SurveyThanksPage";
import SurveyMockupIntro from "./pages/SurveyMockupIntro";
import { MobileFooterBar } from "./components/shared/MobileFooterBar";
import LocationsHub from "./pages/locations/LocationsHub";
import RichmondLocation from "./pages/locations/RichmondLocation";
import NewportNewsLocation from "./pages/locations/NewportNewsLocation";
import VirginiaBeachLocation from "./pages/locations/VirginiaBeachLocation";
import NewportNewsTRT from "./pages/locations/NewportNewsTRT";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GlobalSchema />
        <Routes>
          <Route path="/" element={<Index />} />
          
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/licensing" element={<Licensing />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/providers" element={<Providers />} />
          <Route path="/prescribing-policy" element={<PrescribingPolicy />} />
          <Route path="/pharmacy-partners" element={<PharmacyPartners />} />
          <Route path="/states-served" element={<StatesServed />} />
          <Route path="/advertising-disclosure" element={<AdvertisingDisclosure />} />
          <Route path="/telehealth-consent" element={<TelehealthConsent />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/services" element={<ServicesIndex />} />
          <Route path="/services/testosterone-therapy" element={<TestosteroneService />} />
          <Route path="/services/sexual-health" element={<SexualHealthService />} />
          <Route path="/services/weight-loss" element={<WeightLossService />} />
          <Route path="/services/wellness-vitality" element={<WellnessVitalityService />} />
          <Route path="/lp" element={<LPIndex />} />
          <Route path="/lp/testosterone" element={<TRTLandingPage />} />
          <Route path="/new" element={<NewLandingPage />} />
          <Route path="/book/symptom" element={<BookSymptom />} />
          <Route path="/book/duration" element={<BookDuration />} />
          <Route path="/book/schedule" element={<BookSchedule />} />
          <Route path="/book/confirmed" element={<BookConfirmed />} />
          <Route path="/book/lets-talk" element={<BookLetsTalk />} />
          <Route path="/new2" element={<New2LandingPage />} />
          <Route path="/lp/testosterone-v2" element={<TRTv2CompliantLandingPage />} />
          <Route path="/lp/trt" element={<TRTLandingPage />} />
          <Route path="/lp/trt2" element={<TRT2LandingPage />} />
          <Route path="/lp/trt2/thank-you" element={<TRT2ThankYou />} />
          <Route path="/lp/ed" element={<EDLandingPage />} />
          <Route path="/lp/weight-loss" element={<WeightLossLandingPage />} />
          <Route path="/lp/weight-loss-v2" element={<WeightLossV2LandingPage />} />
          <Route path="/lp/weight-loss-v2/thank-you" element={<WeightLossV2ThankYou />} />
          <Route path="/lp/trt-v2" element={<TRTv2LandingPage />} />
          <Route path="/lp/trt-v2/thank-you" element={<TRTv2ThankYou />} />
          <Route path="/lp/OG-ed" element={<OGEDLandingPage />} />
          <Route path="/lp/OG-trt2" element={<OGTRT2LandingPage />} />
          <Route path="/lp/OG-weight-loss-v2" element={<OGWeightLossV2LandingPage />} />
          <Route path="/lp/OG-trt" element={<OGTRTLandingPage />} />
          <Route path="/lp/OG-weight-loss" element={<OGWeightLossLandingPage />} />
          <Route path="/book" element={<BookingFunnel />} />
          <Route path="/bookv2" element={<BookingFunnelV2 />} />
          <Route path="/bookv2/spec" element={<BookingFunnelV2Spec />} />
          <Route path="/book3" element={<BookingFunnelV3 />} />
          <Route path="/bookv3" element={<BookingFunnelV3 />} />
          <Route path="/lp/ghl-trt" element={<GHLTRTLandingPage />} />
          <Route path="/lp/ghl-ed" element={<GHLEDLandingPage />} />
          <Route path="/lp/ghl-wl" element={<GHLWLLandingPage />} />
          <Route path="/lp/ghl-general" element={<GHLGeneralLandingPage />} />
          <Route path="/intake" element={<IntakePage />} />
          <Route path="/intake/thanks" element={<IntakeThanksPage />} />
          <Route path="/survey" element={<SurveyMockupIntro />} />
          <Route path="/survey/start" element={<SurveyPage />} />
          <Route path="/survey/thanks" element={<SurveyThanksPage />} />
          <Route path="/brand" element={<BrandComparison />} />
          <Route path="/locations" element={<LocationsHub />} />
          <Route path="/locations/richmond-va" element={<RichmondLocation />} />
          <Route path="/locations/newport-news-va" element={<NewportNewsLocation />} />
          <Route path="/locations/virginia-beach-va" element={<VirginiaBeachLocation />} />
          <Route path="/locations/newport-news-va/testosterone-therapy" element={<NewportNewsTRT />} />
          <Route path="/locations/richmond" element={<Navigate to="/locations/richmond-va" replace />} />
          <Route path="/locations/newport-news" element={<Navigate to="/locations/newport-news-va" replace />} />
          <Route path="/locations/virginia-beach" element={<Navigate to="/locations/virginia-beach-va" replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <MobileFooterBar />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
