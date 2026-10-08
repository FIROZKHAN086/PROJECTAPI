"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, LoaderCircle, MailCheck, RotateCcw } from "lucide-react";
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
            toast.error(
              "Verification session expired. Please sign up again."
            );
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

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="flex justify-center"
      >
        <div className="relative flex size-14 items-center justify-center rounded-2xl border border-[#4ADE80]/30 bg-[#4ADE80]/10">
          <MailCheck className="size-6 text-[#4ADE80]" />
          <span className="absolute -inset-1 -z-10 rounded-3xl bg-[#4ADE80]/10 blur-xl" />
        </div>
      </motion.div>

      <div className="text-center">
        <p className="text-sm text-[#D8CFBC]">
          We sent a 6-digit code to
        </p>
        <p className="text-sm font-medium text-[#FFFBF4] mt-0.5 break-all">
          {pendingEmail ?? "your email"}
        </p>
      </div>

      <motion.div
        animate={shake ? { x: [0, -10, 10, -8, 8, -4, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className="flex justify-between gap-1.5 sm:gap-2"
        aria-label="One-time password"
      >
        {otp.map((digit, index) => (
          <input
            key={index}
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
            className={`h-12 w-full min-w-0 rounded-lg border bg-[#0A0A0A] text-center text-lg font-semibold text-[#FFFBF4] outline-none transition-all duration-200 placeholder:text-[#8A8578] focus:border-[#4ADE80]/60 focus:ring-2 focus:ring-[#4ADE80]/20 ${
              error
                ? "border-[#F87171]/60"
                : digit
                  ? "border-[#4ADE80]/50"
                  : "border-white/10"
            }`}
          />
        ))}
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-[#F87171] text-center"
          role="alert"
        >
          {error}
        </motion.p>
      )}

      <button
        type="button"
        disabled={!isComplete || verifyMutation.isPending}
        onClick={() => submit(otp.join(""))}
        className="w-full h-11 bg-[#FBF7F4] text-[#0A0A0A] font-semibold text-sm rounded-lg flex items-center justify-center gap-2 transition-all duration-200 hover:bg-[#e8e4df] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer group"
      >
        {verifyMutation.isPending ? (
          <LoaderCircle className="size-4 animate-spin" />
        ) : (
          <>
            Verify email
            <MailCheck className="size-4 transition-transform group-hover:scale-110" />
          </>
        )}
      </button>

      <div className="flex items-center justify-between text-xs text-[#D8CFBC]">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-1 hover:text-[#FFFBF4] transition-colors cursor-pointer"
        >
          <ArrowLeft className="size-3.5" />
          Back to sign up
        </button>

        {cooldown > 0 ? (
          <span className="tabular-nums">
            Resend in {Math.floor(cooldown / 60)}:
            {String(cooldown % 60).padStart(2, "0")}
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={resendMutation.isPending}
            className="flex items-center gap-1 text-[#FFFBF4] hover:text-[#4ADE80] transition-colors disabled:opacity-60 cursor-pointer"
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
    </div>
  );
}
