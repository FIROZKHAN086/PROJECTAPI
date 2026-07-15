"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { makeStore, type AppStore } from "@/src/lib/store";
import { fetchMe } from "@/src/lib/authSlice";
import { initToastDispatcher } from "@/src/lib/toastSlice";
import ToastContainer from "@/src/Components/ToastContainer";
import { useRef } from "react";

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

  useEffect(() => {
    storeRef.current?.dispatch(fetchMe());
    storeRef.current?.dispatch(initToastDispatcher as any);
  }, []);

  return (
    <Provider store={storeRef.current}>
      <QueryClientProvider client={queryClientRef.current}>
        {children}
        <ToastContainer />
      </QueryClientProvider>
    </Provider>
  );
}
