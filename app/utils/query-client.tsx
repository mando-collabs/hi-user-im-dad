import { QueryClient, QueryClientProvider } from "react-query";
import type { PropsWithChildren } from "react";
import type React from "react";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const ClientProvider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
