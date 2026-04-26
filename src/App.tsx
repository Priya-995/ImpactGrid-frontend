import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/context/AppContext";
import VolunteerProfilePage from "./pages/VolunteerProfilePage";

import LandingPage from "./pages/LandingPage";
import ReportNeedPage from "./pages/ReportNeedPage";
import VolunteerPage from "./pages/VolunteerPage";
import DashboardPage from "./pages/DashboardPage";
import MatchingPage from "./pages/MatchingPage";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/report" element={<ReportNeedPage />} />
          <Route path="/volunteer" element={<VolunteerPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/match/:id" element={<MatchingPage />} />
            <Route path="/volunteer-profile/:id" element={<VolunteerProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
