import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { TooltipProvider } from "@/components/ui/tooltip";

import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>

      <TooltipProvider>

        <App />

        <Toaster
          position="top-right"
          reverseOrder={false}
        />

      </TooltipProvider>

      <ReactQueryDevtools initialIsOpen={false} />

    </QueryClientProvider>
  </StrictMode>
);