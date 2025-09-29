import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";
import { HealthcareSidebar } from "@/components/HealthcareSidebar";
import Dashboard from "./pages/Dashboard";
import ProductionTracker from "./pages/ProductionTracker";
import SOPPage from "./pages/SOPPage";
import MultiCalculator from "./pages/MultiCalculator";
import CurrencyConverter from "./pages/CurrencyConverter";
import LiveDashboards from "./pages/LiveDashboards";
import UsefulLinks from "./pages/UsefulLinks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const { theme, setTheme, isDark } = useTheme();

  const toggleDarkMode = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      <HealthcareSidebar darkMode={isDark} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-1 p-6 md:pl-0 md:ml-64 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/production" element={<ProductionTracker />} />
            <Route path="/sop" element={<SOPPage />} />
            <Route path="/calculator" element={<MultiCalculator />} />
            <Route path="/currency" element={<CurrencyConverter />} />
            <Route path="/dashboards" element={<LiveDashboards />} />
            <Route path="/links" element={<UsefulLinks />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="healthcare-portal-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
