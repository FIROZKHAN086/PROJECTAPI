"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "@/src/lib/store";
import ToastContainer from "@/src/Components/ToastContainer";

export default function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  const queryClientRef = useRef<QueryClient>(undefined);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
          retry: 1,
        },
      },
    });
  }

  return (
    <Provider store={storeRef.current}>
      <QueryClientProvider client={queryClientRef.current}>
        {children}
        <ToastContainer />
      </QueryClientProvider>
    </Provider>
  );
}
