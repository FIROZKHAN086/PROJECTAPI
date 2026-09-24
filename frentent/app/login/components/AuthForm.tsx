"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, LoaderCircle, ArrowRight } from "lucide-react";
import { useLogin, useRegister } from "@/src/hooks/useAuth";
import { useAppDispatch } from "@/src/lib/hooks";
import { fetchMe } from "@/src/lib/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "@/src/lib/toastSlice";

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

  const loginMutation = useLogin();
  const registerMutation = useRegister();

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
            toast.success(data.message || "Account created successfully");
            dispatch(fetchMe());
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
            toast.success(data.message || "Logged in successfully");
            dispatch(fetchMe());
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

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <AnimatePresence>
          {isSignUp && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <label className="text-xs text-[#D8CFBC] block mb-1.5">
                Full name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className={`w-full h-11 px-3 bg-[#0A0A0A] border ${
                  errors.name ? "border-[#F87171]" : "border-white/10"
                } rounded-lg text-sm text-[#FFFBF4] placeholder:text-[#8A8578] outline-none focus:border-white/30 transition-colors`}
              />
              {errors.name && (
                <p className="text-xs text-[#F87171] mt-1">{errors.name}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <label className="text-xs text-[#D8CFBC] block mb-1.5">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="you@example.com"
            className={`w-full h-11 px-3 bg-[#0A0A0A] border ${
              errors.email ? "border-[#F87171]" : "border-white/10"
            } rounded-lg text-sm text-[#FFFBF4] placeholder:text-[#8A8578] outline-none focus:border-white/30 transition-colors`}
          />
          {errors.email && (
            <p className="text-xs text-[#F87171] mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs text-[#D8CFBC]">Password</label>
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
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className={`w-full h-11 px-3 pr-10 bg-[#0A0A0A] border ${
                errors.password ? "border-[#F87171]" : "border-white/10"
              } rounded-lg text-sm text-[#FFFBF4] placeholder:text-[#8A8578] outline-none focus:border-white/30 transition-colors`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D8CFBC] hover:text-[#FFFBF4] transition-colors"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-[#F87171] mt-1">{errors.password}</p>
          )}
        </div>

        <AnimatePresence>
          {isSignUp && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <label className="text-xs text-[#D8CFBC] block mb-1.5">
                Confirm password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className={`w-full h-11 px-3 bg-[#0A0A0A] border ${
                  errors.confirmPassword
                    ? "border-[#F87171]"
                    : "border-white/10"
                } rounded-lg text-sm text-[#FFFBF4] placeholder:text-[#8A8578] outline-none focus:border-white/30 transition-colors`}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-[#F87171] mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={isPending}
          className="w-full h-11 bg-[#FBF7F4] text-[#0A0A0A] font-semibold text-sm rounded-lg flex items-center justify-center gap-2 transition-all duration-200 hover:bg-[#e8e4df] disabled:opacity-70 cursor-pointer group"
        >
          {isPending ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <>
              {isSignUp ? "Create account" : "Log in"}
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        <div className="hidden lg:block absolute bottom-5 right-8  text-sm text-[#D8CFBC] cursor-pointer">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={toggleForm}
            className="text-[#FFFBF4] underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </div>
      </form>

      <div className="lg:hidden mt-6 text-center text-sm text-[#D8CFBC] cursor-pointer">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          onClick={toggleForm}
          className="text-[#FFFBF4] underline underline-offset-4 hover:opacity-80 transition-opacity"
        >
          {isSignUp ? "Sign in" : "Sign up"}
        </button>
      </div>
    </>
  );
}