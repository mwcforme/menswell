import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GlobalSchema } from "@/components/GlobalSchema";
import NotFound from "./pages/NotFound";
import NewLandingPage from "./pages/NewLandingPage";
import BookSymptom from "./pages/book/BookSymptom";
import BookDuration from "./pages/book/BookDuration";
import BookSchedule from "./pages/book/BookSchedule";
import BookConfirmed from "./pages/book/BookConfirmed";
import BookLetsTalk from "./pages/book/BookLetsTalk";
import { MobileFooterBar } from "./components/shared/MobileFooterBar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GlobalSchema />
        <Routes>
          <Route path="/" element={<Navigate to="/new" replace />} />
          <Route path="/new" element={<NewLandingPage />} />
          <Route path="/book" element={<Navigate to="/book/symptom" replace />} />
          <Route path="/book/symptom" element={<BookSymptom />} />
          <Route path="/book/duration" element={<BookDuration />} />
          <Route path="/book/schedule" element={<BookSchedule />} />
          <Route path="/book/confirmed" element={<BookConfirmed />} />
          <Route path="/book/lets-talk" element={<BookLetsTalk />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <MobileFooterBar />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
