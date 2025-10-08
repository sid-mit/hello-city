import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner, toast } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Onboarding from "./pages/Onboarding";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import PitchIndex from "./pages/pitch/PitchIndex";
import Slide1 from "./pages/pitch/Slide1";
import Slide2 from "./pages/pitch/Slide2";
import Slide3 from "./pages/pitch/Slide3";
import Slide4 from "./pages/pitch/Slide4";
import Slide5 from "./pages/pitch/Slide5";
import Slide6 from "./pages/pitch/Slide6";
import { initializeVoices } from "@/utils/voicePreloader";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const initVoices = async () => {
      try {
        await initializeVoices();
      } catch (error) {
        console.error("Failed to initialize voices:", error);
        toast.error("Failed to initialize text-to-speech. Some audio features may not work properly.");
      }
    };
    
    initVoices();
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/home" element={<Index />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<About />} />
          <Route path="/pitch" element={<PitchIndex />} />
          <Route path="/pitch/slide-1" element={<Slide1 />} />
          <Route path="/pitch/slide-2" element={<Slide2 />} />
          <Route path="/pitch/slide-3" element={<Slide3 />} />
          <Route path="/pitch/slide-4" element={<Slide4 />} />
          <Route path="/pitch/slide-5" element={<Slide5 />} />
          <Route path="/pitch/slide-6" element={<Slide6 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
