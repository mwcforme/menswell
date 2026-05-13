import * as Sentry from "@sentry/react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ServicesProvider } from "@/app/providers/ServicesProvider";
import NotFound from "./pages/NotFound";
import NewLandingPage from "./pages/NewLandingPage";
import NewWeightLoss from "./pages/NewWeightLoss";
import NewED from "./pages/NewED";
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
import { SentryTestTrigger } from "./components/SentryTestTrigger";

const queryClient = new QueryClient();

const ErrorFallback = ({ resetError }: { resetError: () => void }) => (
  <div
    role="alert"
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#000814",
      color: "#fff",
      fontFamily: "Inter, sans-serif",
      padding: "24px",
      textAlign: "center",
    }}
  >
    <div style={{ maxWidth: 480 }}>
      <h1 style={{ fontFamily: "Oswald, sans-serif", fontSize: 32, marginBottom: 12 }}>
        Something went wrong
      </h1>
      <p style={{ opacity: 0.8, marginBottom: 24 }}>
        Please refresh the page or call us at <a href="tel:8043334434" style={{ color: "#E8670A" }}>(804) XXX-XXXX</a>.
      </p>
      <button
        type="button"
        onClick={resetError}
        style={{
          background: "#E8670A",
          color: "#fff",
          border: "none",
          borderRadius: 999,
          padding: "12px 28px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  </div>
);

const App = () => (
  <Sentry.ErrorBoundary
    fallback={({ resetError }) => <ErrorFallback resetError={resetError} />}
    showDialog={false}
  >
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ServicesProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/new" replace />} />
              <Route path="/new" element={<NewLandingPage />} />
              <Route path="/new-wl" element={<NewWeightLoss />} />
              <Route path="/new-ed" element={<NewED />} />
              <Route path="/quiz" element={<TRTQuiz />} />
              <Route path="/quiz/approved" element={<TRTQuizApproved />} />
              <Route path="/book" element={<Navigate to="/book/schedule" replace />} />
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
            <SentryTestTrigger />
          </ServicesProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Sentry.ErrorBoundary>
);

export default App;
