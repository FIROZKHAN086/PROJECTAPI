"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { removeToast, selectToasts, initToastDispatcher, type ToastType } from "@/src/lib/toastSlice";
import {
  CheckCircle2,
  XCircle,
  Info,
  AlertTriangle,
  X,
} from "lucide-react";

const iconMap: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 className="size-4 text-[#4ADE80]" />,
  error: <XCircle className="size-4 text-[#F87171]" />,
  info: <Info className="size-4 text-[#60A5FA]" />,
  warning: <AlertTriangle className="size-4 text-[#FBBF24]" />,
};

const borderColorMap: Record<ToastType, string> = {
  success: "border-[#4ADE80]/30",
  error: "border-[#F87171]/30",
  info: "border-[#60A5FA]/30",
  warning: "border-[#FBBF24]/30",
};

function ToastItem({ toast }: { toast: { id: string; message: string; type: ToastType; duration?: number } }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeToast(toast.id));
    }, toast.duration || 4000);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, dispatch]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-[#141414] border ${borderColorMap[toast.type]} shadow-[0_8px_30px_rgba(0,0,0,0.4)] min-w-[280px] max-w-[400px]`}
    >
      <span className="shrink-0">{iconMap[toast.type]}</span>
      <span className="text-sm text-[#FFFBF4] flex-1">{toast.message}</span>
      <button
        onClick={() => dispatch(removeToast(toast.id))}
        className="shrink-0 text-[#8A8578] hover:text-[#FFFBF4] transition-colors cursor-pointer"
      >
        <X className="size-3.5" />
      </button>
    </motion.div>
  );
}

export default function ToastContainer() {
  const toasts = useAppSelector(selectToasts);
  const dispatch = useAppDispatch();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initToastDispatcher(dispatch);
      initialized.current = true;
    }
  }, [dispatch]);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 items-end">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} />
        ))}
      </AnimatePresence>
    </div>
  );
}
