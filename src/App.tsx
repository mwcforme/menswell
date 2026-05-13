import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GlobalSchema } from "@/components/GlobalSchema";
import { ServicesProvider } from "@/app/providers/ServicesProvider";
import NotFound from "./pages/NotFound";
import NewLandingPage from "./pages/NewLandingPage";
import TRTQuiz from "./pages/TRTQuiz";
import TRTQuizApproved from "./pages/TRTQuizApproved";
import BookSymptom from "./pages/book/BookSymptom";
import BookDuration from "./pages/book/BookDuration";
import BookSchedule from "./pages/book/BookSchedule";
import BookConfirmed from "./pages/book/BookConfirmed";
import BookLetsTalk from "./pages/book/BookLetsTalk";
import LpDirectory from "./pages/internal/LpDirectory";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import TcpaDisclosure from "./pages/legal/TcpaDisclosure";
import PrescribingPolicy from "./pages/legal/PrescribingPolicy";
import { MobileFooterBar } from "./components/shared/MobileFooterBar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ServicesProvider>
        <GlobalSchema />
        <Routes>
          <Route path="/" element={<Navigate to="/new" replace />} />
          <Route path="/new" element={<NewLandingPage />} />
          <Route path="/quiz" element={<TRTQuiz />} />
          <Route path="/quiz/approved" element={<TRTQuizApproved />} />
          <Route path="/book" element={<Navigate to="/book/symptom" replace />} />
          <Route path="/book/symptom" element={<BookSymptom />} />
          <Route path="/book/duration" element={<BookDuration />} />
          <Route path="/book/schedule" element={<BookSchedule />} />
          <Route path="/book/confirmed" element={<BookConfirmed />} />
          <Route path="/book/lets-talk" element={<BookLetsTalk />} />
          <Route path="/lp" element={<LpDirectory />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/tcpa" element={<TcpaDisclosure />} />
          <Route path="/prescribing-policy" element={<PrescribingPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <MobileFooterBar />
        </ServicesProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
