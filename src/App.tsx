
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute, AdminRoute } from "@/components/auth/ProtectedRoutes";

// Pages
import Dashboard from "./pages/Dashboard";
import NudgeRules from "./pages/NudgeRules";
import Templates from "./pages/Templates";
import Channels from "./pages/Channels";
import Scheduling from "./pages/Scheduling";
import CreateRule from "./pages/CreateRule";
import CreateTemplate from "./pages/CreateTemplate";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import UserGroups from "./pages/UserGroups";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Admin routes */}
            <Route path="/" element={<AdminRoute><Dashboard /></AdminRoute>} />
            <Route path="/rules" element={<AdminRoute><NudgeRules /></AdminRoute>} />
            <Route path="/rules/new" element={<AdminRoute><CreateRule /></AdminRoute>} />
            <Route path="/templates" element={<AdminRoute><Templates /></AdminRoute>} />
            <Route path="/templates/new" element={<AdminRoute><CreateTemplate /></AdminRoute>} />
            <Route path="/channels" element={<AdminRoute><Channels /></AdminRoute>} />
            <Route path="/scheduling" element={<AdminRoute><Scheduling /></AdminRoute>} />
            <Route path="/user-groups" element={<AdminRoute><UserGroups /></AdminRoute>} />
            <Route path="/analytics" element={<AdminRoute><Analytics /></AdminRoute>} />
            <Route path="/settings" element={<AdminRoute><Settings /></AdminRoute>} />
            
            {/* User routes */}
            <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
            
            {/* Default redirect to login */}
            <Route path="/index" element={<Navigate to="/login" />} />
            
            {/* 404 catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
