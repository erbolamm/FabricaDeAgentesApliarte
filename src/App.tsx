import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./context/AuthContext";

import { Index } from "./pages/Index";
import { Catalog } from "./pages/Catalog";
import { AgentDetail } from "./pages/AgentDetail";
import { Connectors } from "./pages/Connectors";
import { Pricing } from "./pages/Pricing";
import { MyExecutions } from "./pages/MyExecutions";
import { CreatorAgentForm } from "./pages/CreatorAgentForm";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/agentes" element={<Catalog />} />
            <Route path="/agentes/:slug" element={<AgentDetail />} />
            <Route path="/conectores" element={<Connectors />} />
            <Route path="/apoyar" element={<Pricing />} />
            <Route path="/precios" element={<Pricing />} />
            <Route path="/mis-ejecuciones" element={<MyExecutions />} />
            <Route path="/crear" element={<CreatorAgentForm />} />
            <Route path="/creadores" element={<CreatorAgentForm />} />
            <Route path="/creadores/nuevo" element={<CreatorAgentForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
