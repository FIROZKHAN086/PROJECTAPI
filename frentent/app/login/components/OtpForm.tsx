"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, LoaderCircle, MailCheck, RotateCcw, Mail, Sparkles, Inbox, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/src/lib/hooks";
import {
  useVerifyOtp,
  useResendOtp,
  useAuth,
  clearOtpPending,
} from "@/src/hooks/useAuth";
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
  const [success, setSuccess] = useState(false);
  const [showEmailTip, setShowEmailTip] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const isComplete = otp.every((digit) => digit !== "");

  useEffect(() => {
    inputRefs.current[0]?.focus();

    // Show email tip after 5 seconds
    const timer = setTimeout(() => {
      setShowEmailTip(true);
    }, 5000);

    return () => clearTimeout(timer);
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
        onSuccess: () => {
          setSuccess(true);
          setTimeout(() => {
            clearOtpPending();
            toast.success("Email verified successfully! 🎉");
            router.push(redirectTarget);
          }, 1500);
        },
        onError: (err) => {
          if (
            err.code === "OTP_VERIFICATION_REQUIRED" ||
            err.code === "OTP_VERIFICATION_EXPIRED" ||
            err.code === "INVALID_OTP_VERIFICATION_TOKEN" ||
            err.status === 401
          ) {
            toast.error("Session expired. Please sign up again.");
            dispatch(cancelOtpVerification());
            onBack();
            return;
          }
          if (err.code === "OTP_EXPIRED") {
            triggerError("Code expired! Please request a new one below.");
            return;
          }
          triggerError(err.message || "Invalid code. Please try again.");
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
      onSuccess: () => {
        setCooldown(RESEND_COOLDOWN);
        setOtp(emptyOtp());
        setError("");
        inputRefs.current[0]?.focus();
      },
      onError: (err) => {
        toast.error(err.message || "Couldn't resend code. Please try again.");
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
    <div className="space-y-8">
      {/* Success Animation */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-gradient-to-br from-[#4ADE80] to-[#3B82F6] p-8 rounded-3xl text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <CheckCircle className="size-16 text-white mx-auto mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">Verified! 🎉</h3>
              <p className="text-white/80">Redirecting you now...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-flex items-center justify-center size-16 rounded-2xl bg-gradient-to-br from-[#4ADE80]/20 to-[#3B82F6]/20 border border-[#4ADE80]/30 mb-4"
        >
          <MailCheck className="size-8 text-[#4ADE80]" />
          <Sparkles className="absolute -top-1 -right-1 size-4 text-[#3B82F6]" />
        </motion.div>

        <h2 className="text-2xl font-bold text-[#FFFBF4] mb-2">
          <span className="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] bg-clip-text text-transparent">
            Verify your email
          </span>
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="ml-2"
          >
            ✨
          </motion.span>
        </h2>

        <div className="space-y-2">
          <p className="text-sm text-[#D8CFBC]/80">
            We&apos;ve sent a 6-digit code to:
          </p>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10"
          >
            <Mail className="size-4 text-[#4ADE80]" />
            <code className="text-sm font-mono font-medium text-[#FFFBF4] break-all">
              {pendingEmail ?? "your email"}
            </code>
          </motion.div>
        </div>
      </motion.div>

      {/* Email Check Reminder */}
      <AnimatePresence>
        {showEmailTip && !success && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gradient-to-r from-[#3B82F6]/10 to-[#4ADE80]/10 border border-[#3B82F6]/30 rounded-xl p-4"
          >
            <div className="flex items-start gap-3">
              <Inbox className="size-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-sm font-medium text-[#FFFBF4] mb-1">
                  📬 Check your inbox carefully!
                </p>
                <p className="text-xs text-[#D8CFBC]/80 leading-relaxed">
                  Your verification code should arrive within 2 minutes.{" "}
                  <span className="font-medium text-[#FFFBF4]">
                    Don&apos;t forget to check your spam or junk folder!
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OTP Input with Glow Effect */}
      <motion.div
        animate={shake ? { x: [0, -10, 10, -8, 8, -4, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-[#4ADE80]/20 to-[#3B82F6]/20 rounded-2xl blur opacity-30" />
        <div className="flex justify-between gap-2 sm:gap-3 relative bg-[#1A1A1A]/50 backdrop-blur-sm rounded-2xl p-4">
          {otp.map((digit, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex-1"
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
                className={`w-full h-14 rounded-xl border-2 text-center text-2xl font-bold text-[#FFFBF4] outline-none transition-all duration-200 bg-white/5 backdrop-blur-sm ${
                  error
                    ? "border-red-500/60 focus:border-red-500"
                    : digit
                      ? "border-[#4ADE80]/60 focus:border-[#4ADE80]"
                      : "border-white/10 focus:border-[#3B82F6]/60"
                }`}
              />
              {digit && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#4ADE80] rounded-full"
                />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl"
        >
          <AlertCircle className="size-5 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-400">{error}</p>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="space-y-4">
        <motion.button
          type="button"
          disabled={!isComplete || verifyMutation.isPending}
          onClick={() => submit(otp.join(""))}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full h-12 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-lg hover:shadow-[#4ADE80]/20 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer group relative overflow-hidden"
        >
          {/* Background shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
          />

          {verifyMutation.isPending ? (
            <>
              <LoaderCircle className="size-5 animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <span>Verify email</span>
              <MailCheck className="size-5 group-hover:scale-110 transition-transform" />
            </>
          )}
        </motion.button>

        {/* Helper Text */}
        <div className="text-center">
          <p className="text-xs text-[#D8CFBC]/60">
            Enter the 6-digit code from your email to complete verification
          </p>
          <p className="text-xs text-[#D8CFBC]/40 mt-1">
            Your OTP was sent to:{" "}
            <span className="text-[#FFFBF4]/80">{pendingEmail ?? "your email"}</span>
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <motion.button
            type="button"
            onClick={handleBack}
            whileHover={{ x: -2 }}
            className="flex items-center gap-2 text-sm text-[#D8CFBC]/80 hover:text-[#FFFBF4] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            Back to sign up
          </motion.button>

          {cooldown > 0 ? (
            <motion.div
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
              className="flex items-center gap-2 text-sm text-[#D8CFBC]/60"
            >
              <Clock className="size-4" />
              <span className="tabular-nums font-medium">
                {Math.floor(cooldown / 60)}:{String(cooldown % 60).padStart(2, "0")}
              </span>
            </motion.div>
          ) : (
            <motion.button
              type="button"
              onClick={handleResend}
              disabled={resendMutation.isPending}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] bg-clip-text text-transparent hover:underline underline-offset-4 transition-all disabled:opacity-60 cursor-pointer"
            >
              {resendMutation.isPending ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <RotateCcw className="size-4" />
              )}
              Resend code
            </motion.button>
          )}
        </div>

        {/* Email Folder Tips */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <p className="text-xs text-[#D8CFBC]/60 mb-2 flex items-center gap-1">
            <span className="size-1.5 bg-[#3B82F6] rounded-full" />
            Can&apos;t find the email? Try:
          </p>
          <ul className="text-xs text-[#D8CFBC]/40 space-y-1 ml-3">
            <li className="flex items-center gap-1">
              <span className="size-1 bg-[#D8CFBC]/40 rounded-full" />
              Check your <span className="text-[#FFFBF4]/80 font-medium">spam/junk</span> folder
            </li>
            <li className="flex items-center gap-1">
              <span className="size-1 bg-[#D8CFBC]/40 rounded-full" />
              Search for &quot;ProjectAPI&quot; or &quot;verification code&quot;
            </li>
            <li className="flex items-center gap-1">
              <span className="size-1 bg-[#D8CFBC]/40 rounded-full" />
              Wait a few more minutes before resending
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
