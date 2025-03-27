
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NudgeRules from "./pages/NudgeRules";
import Templates from "./pages/Templates";
import Channels from "./pages/Channels";
import Scheduling from "./pages/Scheduling";
import CreateRule from "./pages/CreateRule";
import CreateTemplate from "./pages/CreateTemplate";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/rules" element={<NudgeRules />} />
          <Route path="/rules/new" element={<CreateRule />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/templates/new" element={<CreateTemplate />} />
          <Route path="/channels" element={<Channels />} />
          <Route path="/scheduling" element={<Scheduling />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
