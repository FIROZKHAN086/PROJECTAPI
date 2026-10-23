"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, LoaderCircle, ArrowRight, Sparkles, Mail, Lock, User } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { toast } from "@/src/lib/toastSlice";
import OtpForm from "./OtpForm";

interface AuthFormProps {
  isSignUp: boolean;
  redirectTarget: string;
}

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
  const [isHovered, setIsHovered] = useState(false);

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
      newErrors.name = "Please enter your name";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
              toast.success("Verification code sent! Check your email ✨");
              router.push("/login?auth=otp");
              return;
            }
            toast.success("Welcome aboard! 🚀");
            dispatch(setUser(data.user));
            router.push(redirectTarget);
          },
          onError: (err) => {
            toast.error(err.message || "Registration failed. Please try again.");
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
            toast.success("Welcome back! 👋");
            dispatch(setUser(data.user));
            router.push(redirectTarget);
          },
          onError: (err) => {
            toast.error(err.message || "Login failed. Please check your credentials.");
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

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence>
          {isSignUp && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="relative"
            >
              <div className="mb-2">
                <label className="text-sm font-medium text-[#D8CFBC] flex items-center gap-2">
                  <User className="size-4" />
                  Full name
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className={`w-full h-12 px-4 pl-11 bg-white/5 backdrop-blur-sm border-2 ${
                    errors.name
                      ? "border-red-500/60 focus:border-red-500"
                      : "border-white/10 focus:border-[#4ADE80]/60"
                  } rounded-xl text-sm text-[#FFFBF4] placeholder:text-[#8A8578]/60 outline-none transition-all duration-300`}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <User className="size-5 text-[#D8CFBC]/60" />
                </div>
              </div>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-400 mt-2 flex items-center gap-1"
                >
                  <span className="size-1.5 bg-red-400 rounded-full" />
                  {errors.name}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          <div className="mb-2">
            <label className="text-sm font-medium text-[#D8CFBC] flex items-center gap-2">
              <Mail className="size-4" />
              Email address
            </label>
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              className={`w-full h-12 px-4 pl-11 bg-white/5 backdrop-blur-sm border-2 ${
                errors.email
                  ? "border-red-500/60 focus:border-red-500"
                  : "border-white/10 focus:border-[#4ADE80]/60"
              } rounded-xl text-sm text-[#FFFBF4] placeholder:text-[#8A8578]/60 outline-none transition-all duration-300`}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Mail className="size-5 text-[#D8CFBC]/60" />
            </div>
          </div>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-400 mt-2 flex items-center gap-1"
            >
              <span className="size-1.5 bg-red-400 rounded-full" />
              {errors.email}
            </motion.p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-[#D8CFBC] flex items-center gap-2">
              <Lock className="size-4" />
              Password
            </label>
            {!isSignUp && (
              <button
                type="button"
                className="text-xs text-[#D8CFBC]/80 hover:text-[#FFFBF4] transition-colors hover:underline"
              >
                Forgot password?
              </button>
            )}
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className={`w-full h-12 px-4 pl-11 pr-11 bg-white/5 backdrop-blur-sm border-2 ${
                errors.password
                  ? "border-red-500/60 focus:border-red-500"
                  : "border-white/10 focus:border-[#4ADE80]/60"
              } rounded-xl text-sm text-[#FFFBF4] placeholder:text-[#8A8578]/60 outline-none transition-all duration-300`}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Lock className="size-5 text-[#D8CFBC]/60" />
            </div>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#D8CFBC]/60 hover:text-[#FFFBF4] transition-colors rounded-lg hover:bg-white/5"
            >
              {showPassword ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-400 mt-2 flex items-center gap-1"
            >
              <span className="size-1.5 bg-red-400 rounded-full" />
              {errors.password}
            </motion.p>
          )}
        </div>

        <AnimatePresence>
          {isSignUp && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="relative"
            >
              <div className="mb-2">
                <label className="text-sm font-medium text-[#D8CFBC] flex items-center gap-2">
                  <Lock className="size-4" />
                  Confirm password
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className={`w-full h-12 px-4 pl-11 bg-white/5 backdrop-blur-sm border-2 ${
                    errors.confirmPassword
                      ? "border-red-500/60 focus:border-red-500"
                      : "border-white/10 focus:border-[#4ADE80]/60"
                  } rounded-xl text-sm text-[#FFFBF4] placeholder:text-[#8A8578]/60 outline-none transition-all duration-300`}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Lock className="size-5 text-[#D8CFBC]/60" />
                </div>
              </div>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-400 mt-2 flex items-center gap-1"
                >
                  <span className="size-1.5 bg-red-400 rounded-full" />
                  {errors.confirmPassword}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          disabled={isPending}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileTap={{ scale: 0.98 }}
          className="w-full h-12 bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-lg hover:shadow-[#4ADE80]/20 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer group relative overflow-hidden"
        >
          {/* Background shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: isHovered ? "100%" : "-100%" }}
            transition={{ duration: 0.8 }}
          />

          {/* Content */}
          {isPending ? (
            <>
              <LoaderCircle className="size-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>{isSignUp ? "Create account" : "Sign in"}</span>
              <motion.div
                animate={{ x: isHovered ? 2 : 0 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ArrowRight className="size-5" />
              </motion.div>
              {isSignUp && (
                <Sparkles className="size-4 absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </>
          )}
        </motion.button>

        {/* Terms and conditions for signup */}
        {isSignUp && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xs text-center text-[#D8CFBC]/60 mt-4"
          >
            By creating an account, you agree to our{" "}
            <button type="button" className="text-[#FFFBF4]/80 hover:text-[#4ADE80] transition-colors underline underline-offset-2">
              Terms of Service
            </button>{" "}
            and{" "}
            <button type="button" className="text-[#FFFBF4]/80 hover:text-[#4ADE80] transition-colors underline underline-offset-2">
              Privacy Policy
            </button>
          </motion.p>
        )}

        {/* Form toggle for desktop */}
        <div className="hidden lg:block absolute bottom-6 right-8 text-sm text-[#D8CFBC]/80">
          <div className="flex items-center gap-2">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <motion.button
              onClick={toggleForm}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-medium bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] bg-clip-text text-transparent hover:underline underline-offset-4 transition-all"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </motion.button>
          </div>
        </div>
      </form>

      {/* Form toggle for mobile */}
      <div className="lg:hidden mt-8 pt-6 border-t border-white/10">
        <div className="text-center text-sm text-[#D8CFBC]/80">
          <span>{isSignUp ? "Already have an account?" : "Don't have an account?"}</span>
          <motion.button
            onClick={toggleForm}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-2 font-medium bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] bg-clip-text text-transparent hover:underline underline-offset-4 transition-all"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </motion.button>
        </div>

        {/* Social login options */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-[#1A1A1A] text-[#D8CFBC]/60">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="h-10 bg-white/5 border border-white/10 rounded-xl text-sm text-[#D8CFBC] hover:text-[#FFFBF4] hover:border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <svg className="size-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="h-10 bg-white/5 border border-white/10 rounded-xl text-sm text-[#D8CFBC] hover:text-[#FFFBF4] hover:border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
}
