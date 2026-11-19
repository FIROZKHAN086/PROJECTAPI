"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, LoaderCircle, MailCheck, RotateCcw, ShieldCheck } from "@/src/Components/DynamicIcons";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/src/lib/hooks";
import { useVerifyOtp, useResendOtp, useAuth, clearOtpPending } from "@/src/hooks/useAuth";
import { cancelOtpVerification } from "@/src/lib/authSlice";
import { toast } from "@/src/lib/toastSlice";

interface OtpFormProps {
  redirectTarget: string;
  onBack: () => void;
}

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;

const emptyOtp = () => Array<string>(OTP_LENGTH).fill("");

export default function OtpForm({ redirectTarget, onBack }: OtpFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { pendingEmail } = useAuth();
  const verifyMutation = useVerifyOtp();
  const resendMutation = useResendOtp();

  const [otp, setOtp] = useState<string[]>(emptyOtp);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const isComplete = otp.every((digit) => digit !== "");

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [cooldown]);

  const triggerError = (message: string) => {
    setError(message);
    setOtp(emptyOtp());
    inputRefs.current[0]?.focus();
    setShake(true);
    window.setTimeout(() => setShake(false), 450);
  };

  const submit = (code: string) => {
    setError("");
    verifyMutation.mutate(
      { otp: code },
      {
        onSuccess: (data) => {
          clearOtpPending();
          toast.success(data.message || "Email verified successfully");
          router.push(redirectTarget);
        },
        onError: (err) => {
          if (
            err.code === "OTP_VERIFICATION_REQUIRED" ||
            err.code === "OTP_VERIFICATION_EXPIRED" ||
            err.code === "INVALID_OTP_VERIFICATION_TOKEN" ||
            err.status === 401
          ) {
            toast.error("Verification session expired. Please sign up again.");
            dispatch(cancelOtpVerification());
            onBack();
            return;
          }
          if (err.code === "OTP_EXPIRED") {
            triggerError("That code has expired. Send a new one below.");
            return;
          }
          triggerError(err.message || "Invalid code. Try again.");
        },
      }
    );
  };

  const handleChange = (index: number, raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, OTP_LENGTH - index);
    if (!digits) {
      const next = [...otp];
      next[index] = "";
      setOtp(next);
      return;
    }

    const next = [...otp];
    digits.split("").forEach((digit, offset) => {
      next[index + offset] = digit;
    });
    setOtp(next);
    setError("");

    const targetIndex = Math.min(index + digits.length, OTP_LENGTH - 1);
    inputRefs.current[targetIndex]?.focus();

    if (next.every((digit) => digit !== "")) {
      submit(next.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }
    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      event.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
    if (event.key === "Backspace") {
      event.preventDefault();
      const next = [...otp];
      if (next[index]) {
        next[index] = "";
      } else if (index > 0) {
        next[index - 1] = "";
        inputRefs.current[index - 1]?.focus();
      }
      setOtp(next);
      setError("");
    }
  };

  const handleResend = () => {
    resendMutation.mutate(undefined, {
      onSuccess: (data) => {
        toast.success(data.message || "A new code is on the way");
        setCooldown(RESEND_COOLDOWN);
        setOtp(emptyOtp());
        setError("");
        inputRefs.current[0]?.focus();
      },
      onError: (err) => {
        toast.error(err.message || "Could not resend the code");
        if (err.status === 401) {
          dispatch(cancelOtpVerification());
          onBack();
        }
      },
    });
  };

  const handleBack = () => {
    dispatch(cancelOtpVerification());
    onBack();
  };

  const progress = (cooldown / RESEND_COOLDOWN) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6"
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <motion.div
            className="absolute inset-0 rounded-2xl bg-[#4ADE80]/20 blur-xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
            className="relative flex size-14 items-center justify-center rounded-2xl border border-[#4ADE80]/30 bg-gradient-to-br from-[#4ADE80]/15 to-[#0A0A0A] shadow-[0_0_0_1px_rgba(74,222,128,0.08)_inset]"
          >
            <MailCheck className="size-6 text-[#4ADE80]" />
          </motion.div>
        </div>
        <p className="text-sm text-[#D8CFBC]">We sent a 6-digit code to</p>
        <p className="mt-1 max-w-full break-all text-sm font-medium text-[#FFFBF4]">
          {pendingEmail ?? "your email"}
        </p>
      </div>

      <motion.div
        animate={shake ? { x: [0, -10, 10, -8, 8, -4, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-6 gap-2 sm:gap-2.5"
        aria-label="One-time password"
      >
        {otp.map((digit, index) => (
          <motion.div
            key={index}
            animate={{ scale: digit ? 1.02 : 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative"
          >
            <input
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              type="text"
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              maxLength={OTP_LENGTH}
              value={digit}
              aria-label={`Digit ${index + 1}`}
              onChange={(event) => handleChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              className={`h-12 w-full min-w-0 rounded-xl border bg-[#0A0A0A]/90 text-center text-lg font-semibold text-[#FFFBF4] outline-none transition-all duration-200 placeholder:text-[#8A8578] focus:border-[#4ADE80]/60 focus:ring-2 focus:ring-[#4ADE80]/20 ${
                error
                  ? "border-[#F87171]/60"
                  : digit
                    ? "border-[#4ADE80]/45 shadow-[0_0_0_1px_rgba(74,222,128,0.08)_inset]"
                    : "border-white/10 hover:border-white/20"
              }`}
            />
            {digit && !error && (
              <motion.span
                className="pointer-events-none absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#4ADE80]/70"
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            className="overflow-hidden"
          >
            <p
              className="rounded-lg border border-[#F87171]/20 bg-[#F87171]/10 px-3 py-2 text-center text-xs text-[#F87171]"
              role="alert"
            >
              {error}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        disabled={!isComplete || verifyMutation.isPending}
        onClick={() => submit(otp.join(""))}
        whileHover={!isComplete || verifyMutation.isPending ? undefined : { y: -1 }}
        whileTap={!isComplete || verifyMutation.isPending ? undefined : { scale: 0.99 }}
        className="group relative flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#FBF7F4] text-sm font-semibold text-[#0A0A0A] transition-all hover:bg-[#FFFBF4] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#4ADE80]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {verifyMutation.isPending ? (
          <LoaderCircle className="size-4 animate-spin" />
        ) : (
          <>
            Verify & continue
            <ShieldCheck className="size-4 transition-transform duration-200 group-hover:scale-110" />
          </>
        )}
      </motion.button>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-[#D8CFBC]">
          <button
            type="button"
            onClick={handleBack}
            className="group inline-flex items-center gap-1.5 transition-colors hover:text-[#FFFBF4]"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back
          </button>

          {cooldown > 0 ? (
            <span className="tabular-nums text-[#8A8578]">
              Resend in {Math.floor(cooldown / 60)}:{String(cooldown % 60).padStart(2, "0")}
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resendMutation.isPending}
              className="inline-flex items-center gap-1.5 text-[#FFFBF4] transition-colors hover:text-[#4ADE80] disabled:opacity-60"
            >
              {resendMutation.isPending ? (
                <LoaderCircle className="size-3.5 animate-spin" />
              ) : (
                <RotateCcw className="size-3.5" />
              )}
              Resend code
            </button>
          )}
        </div>

        <div className="h-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#4ADE80] to-[#3B82F6]"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
