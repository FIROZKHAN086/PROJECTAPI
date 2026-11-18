"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Easing } from "framer-motion";
import { Eye, EyeOff, LoaderCircle, ArrowRight, Mail, Lock, User } from "@/src/Components/DynamicIcons";
import { useRouter } from "next/navigation";
import {
  useLogin,
  useRegister,
  useAuth,
  saveOtpPending,
  readOtpPending,
  clearOtpPending,
} from "@/src/hooks/useAuth";
import { useAppDispatch } from "@/src/lib/hooks";
import { setUser, beginOtpVerification } from "@/src/lib/authSlice";
import { toast } from "@/src/lib/toastSlice";
import OtpForm from "./OtpForm";

interface AuthFormProps {
  isSignUp: boolean;
  redirectTarget: string;
}

const fieldMotion = {
  initial: { opacity: 0, y: 8, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -6, filter: "blur(4px)" },
  transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as Easing },
};

export default function AuthForm({ isSignUp, redirectTarget }: AuthFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const { otpRequired } = useAuth();

  useEffect(() => {
    const pendingEmail = readOtpPending();
    if (pendingEmail) {
      dispatch(beginOtpVerification(pendingEmail));
    }
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (isSignUp && !formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    if (isSignUp && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (isSignUp && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (isSignUp) {
      registerMutation.mutate(
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        },
        {
          onSuccess: (data) => {
            if (data.code === "OTP_REQUIRED" || !data.user.userVerified) {
              saveOtpPending(data.user.email);
              dispatch(beginOtpVerification(data.user.email));
              toast.success(data.message || "OTP sent to your email");
              router.push("/login?auth=otp");
              return;
            }
            toast.success(data.message || "Account created successfully");
            dispatch(setUser(data.user));
            router.push(redirectTarget);
          },
          onError: (err) => {
            toast.error(err.message || "Registration failed");
          },
        }
      );
    } else {
      loginMutation.mutate(
        {
          email: formData.email.trim(),
          password: formData.password,
        },
        {
          onSuccess: (data) => {
            clearOtpPending();
            toast.success(data.message || "Logged in successfully");
            dispatch(setUser(data.user));
            router.push(redirectTarget);
          },
          onError: (err) => {
            toast.error(err.message || "Login failed");
          },
        }
      );
    }
  };

  const toggleForm = () => {
    router.push(isSignUp ? "/login?auth=login" : "/login?auth=signup");
    setErrors({});
    setFormData({ email: "", password: "", confirmPassword: "", name: "" });
  };

  const isPending = loginMutation.isPending || registerMutation.isPending;

  if (otpRequired) {
    return (
      <OtpForm
        redirectTarget={redirectTarget}
        onBack={() => {
          clearOtpPending();
          setErrors({});
        }}
      />
    );
  }

  const inputBase =
    "w-full h-11 bg-[#0A0A0A]/80 border rounded-xl pl-10 pr-3 text-sm text-[#FFFBF4] placeholder:text-[#8A8578] outline-none transition-all duration-200 focus:border-[#4ADE80]/50 focus:ring-2 focus:ring-[#4ADE80]/15 focus:bg-[#0A0A0A]";
  const inputError = "border-[#F87171]/70 focus:border-[#F87171]/70 focus:ring-[#F87171]/15";
  const inputOk = "border-white/10 hover:border-white/20";

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <AnimatePresence mode="popLayout">
        {isSignUp && (
          <motion.div key="name" {...fieldMotion} layout>
            <label className="mb-1.5 block text-xs font-medium text-[#D8CFBC]">
              Full name
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8A8578]" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                autoComplete="name"
                className={`${inputBase} ${errors.name ? inputError : inputOk}`}
              />
            </div>
            <AnimatePresence>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="mt-1.5 text-xs text-[#F87171]"
                >
                  {errors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div {...fieldMotion} layout>
        <label className="mb-1.5 block text-xs font-medium text-[#D8CFBC]">Email</label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8A8578]" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="you@example.com"
            autoComplete="email"
            className={`${inputBase} ${errors.email ? inputError : inputOk}`}
          />
        </div>
        <AnimatePresence>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-1.5 text-xs text-[#F87171]"
            >
              {errors.email}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div {...fieldMotion} layout>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="text-xs font-medium text-[#D8CFBC]">Password</label>
          {!isSignUp && (
            <button
              type="button"
              className="text-xs text-[#D8CFBC] hover:text-[#FFFBF4] transition-colors"
            >
              Forgot?
            </button>
          )}
        </div>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8A8578]" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="••••••••"
            autoComplete={isSignUp ? "new-password" : "current-password"}
            className={`${inputBase} pr-10 ${errors.password ? inputError : inputOk}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D8CFBC] hover:text-[#FFFBF4] transition-colors"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        <AnimatePresence>
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-1.5 text-xs text-[#F87171]"
            >
              {errors.password}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence mode="popLayout">
        {isSignUp && (
          <motion.div key="confirmPassword" {...fieldMotion} layout>
            <label className="mb-1.5 block text-xs font-medium text-[#D8CFBC]">
              Confirm password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8A8578]" />
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                autoComplete="new-password"
                className={`${inputBase} ${
                  errors.confirmPassword ? inputError : inputOk
                }`}
              />
            </div>
            <AnimatePresence>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="mt-1.5 text-xs text-[#F87171]"
                >
                  {errors.confirmPassword}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={isPending}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="group relative flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#FBF7F4] text-sm font-semibold text-[#0A0A0A] transition-all duration-200 hover:bg-[#e8e4df] disabled:opacity-70 cursor-pointer overflow-hidden shadow-lg"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-[#4ADE80]/0 via-[#4ADE80]/15 to-[#4ADE80]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {isPending ? (
          <LoaderCircle className="size-4 animate-spin" />
        ) : (
          <>
            <span className="relative z-10">{isSignUp ? "Create account" : "Log in"}</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 relative z-10" />
          </>
        )}
      </motion.button>

      <div className="hidden lg:block absolute bottom-5 right-8 text-sm text-[#D8CFBC] cursor-pointer">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={toggleForm}
          className="text-[#FFFBF4] underline underline-offset-4 hover:opacity-80 transition-opacity cursor-pointer font-medium"
        >
          {isSignUp ? "Sign in" : "Sign up"}
        </button>
      </div>

      <div className="lg:hidden mt-6 text-center text-sm text-[#D8CFBC] cursor-pointer">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={toggleForm}
          className="text-[#FFFBF4] underline underline-offset-4 hover:opacity-80 transition-opacity cursor-pointer font-medium"
        >
          {isSignUp ? "Sign in" : "Sign up"}
        </button>
      </div>
    </motion.form>
  );
}
