import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastState {
  toasts: Toast[];
}

const initialState: ToastState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: {
      reducer(state, action: PayloadAction<Toast>) {
        state.toasts.push(action.payload);
      },
      prepare(message: string, type: ToastType = "info", duration = 4000) {
        return { payload: { id: nanoid(), message, type, duration } };
      },
    },
    removeToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;

// Selector
export const selectToasts = (state: RootState) => state.toast.toasts;

// Convenience functions for dispatching from outside components
let _dispatch: (action: unknown) => void;

export function initToastDispatcher(dispatch: (action: unknown) => void) {
  _dispatch = dispatch;
}

export const toast = {
  success: (message: string, duration?: number) => {
    _dispatch?.(addToast(message, "success", duration));
  },
  error: (message: string, duration?: number) => {
    _dispatch?.(addToast(message, "error", duration));
  },
  info: (message: string, duration?: number) => {
    _dispatch?.(addToast(message, "info", duration));
  },
  warning: (message: string, duration?: number) => {
    _dispatch?.(addToast(message, "warning", duration));
  },
};
