import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import toastReducer from "./toastSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      toast: toastReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
