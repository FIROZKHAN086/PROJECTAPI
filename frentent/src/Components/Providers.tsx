"use client";

import { useEffect, useState } from "react";
import type { AnyAction } from "redux";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { makeStore, type AppStore } from "@/src/lib/store";
import { fetchMe } from "@/src/lib/authSlice";
import { initToastDispatcher } from "@/src/lib/toastSlice";
import ToastContainer from "@/src/Components/ToastContainer";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [store] = useState<AppStore>(() => makeStore());

  const [queryClient] = useState<QueryClient>(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
        },
      })
  );

  useEffect(() => {
    store.dispatch(fetchMe());
    initToastDispatcher((action: unknown) =>
      store.dispatch(action as AnyAction)
    );
  }, [store]);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ToastContainer />
      </QueryClientProvider>
    </Provider>
  );
}