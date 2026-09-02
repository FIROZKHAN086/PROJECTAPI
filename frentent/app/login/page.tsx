"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, LoaderCircle, CheckCircle, ArrowRight, Shield, Zap, Users, Code } from "lucide-react";
import { useLogin, useRegister } from "@/src/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { fetchMe } from "@/src/lib/authSlice";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "@/src/lib/toastSlice";

const AuthPageContent = () => {
  const searchParams = useSearchParams();
  const auth = searchParams.get("auth");
  const isSignUp = auth === "signup";
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isLoading: authLoading } = useAppSelector((s) => s.auth);
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

  useEffect(() => {
    if (!authLoading && user) {
      router.push("/");
    }
  }, [user, authLoading, router]);

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
            router.push("/dashboard");
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
            router.push("/dashboard");
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

  const features = [
    { icon: Shield, text: "Enterprise-grade security" },
    { icon: Zap, text: "Lightning fast API responses" },
    { icon: Users, text: "Trusted by 10,000+ developers" },
    { icon: Code, text: "Beautiful developer experience" },
  ];

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <LoaderCircle className="size-6 text-[#D8CFBC] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#141414] to-[#0A0A0A] -z-10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFFBF4]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4ADE80]/5 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-[1120px] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Column - Brand & Features */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block space-y-8"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#4ADE80]/10 border border-[#4ADE80]/20 rounded-full"
            >
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex size-full rounded-full bg-[#4ADE80] opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-[#4ADE80]" />
              </span>
              <span className="text-xs font-medium text-[#4ADE80]">Trusted by developers worldwide</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold leading-tight text-[#FFFBF4] font-space-grotesk"
            >
              {isSignUp ? "Start building with confidence" : "Welcome back to ProjectAPI"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base text-[#D8CFBC] leading-relaxed"
            >
              {isSignUp
                ? "Join thousands of developers who trust ProjectAPI for their projects. Get started in minutes."
                : "Continue managing your projects, testing APIs, and building amazing applications."}
            </motion.p>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 gap-3"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-2 p-3 bg-[#141414] border border-white/10 rounded-lg hover:border-white/20 transition-colors"
                >
                  <Icon className="size-4 text-[#4ADE80] flex-shrink-0" />
                  <span className="text-sm text-[#D8CFBC]">{feature.text}</span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-6 pt-4 border-t border-white/10"
          >
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="size-8 rounded-full bg-gradient-to-br from-[#D8CFBC] to-[#8A8578] border-2 border-[#0A0A0A] flex items-center justify-center"
                >
                  <span className="text-[10px] font-medium text-[#0A0A0A]">
                    {String.fromCharCode(65 + i)}
                  </span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-medium text-[#FFFBF4]">10,000+ developers</p>
              <p className="text-xs text-[#8A8578]">Trusted by teams worldwide</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Auth Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[420px] mx-auto lg:mx-0"
        >
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
            {/* Mobile Brand */}
            <div className="lg:hidden mb-6">
              <span className="text-2xl font-semibold tracking-tight text-[#FFFBF4] font-space-grotesk">
                ProjectAPI
              </span>
            </div>

            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#FFFBF4] font-space-grotesk leading-tight">
                {isSignUp ? "Create account" : "Welcome back"}
              </h2>
              <p className="text-sm text-[#D8CFBC] mt-1">
                {isSignUp
                  ? "Start building with ProjectAPI today."
                  : "Log in to manage your projects and API."}
              </p>
            </div>

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
              {/* Desktop Toggle - Bottom Right */}
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

          {/* Mobile Toggle */}
            <div className="lg:hidden mt-6 text-center text-sm text-[#D8CFBC] cursor-pointer">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={toggleForm}
                className="text-[#FFFBF4] underline underline-offset-4 hover:opacity-80 transition-opacity"
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </button>
            </div>
          </div>

          {/* Mobile Features */}
          <div className="lg:hidden mt-4 grid grid-cols-2 gap-2">
            {features.slice(0, 4).map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-2 p-2 bg-[#141414] border border-white/10 rounded-lg"
                >
                  <Icon className="size-3.5 text-[#4ADE80] flex-shrink-0" />
                  <span className="text-[10px] text-[#D8CFBC] truncate">{feature.text}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      
    </div>
  );
};

const AuthPage = () => (
  <Suspense
    fallback={
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <LoaderCircle className="size-6 text-[#D8CFBC] animate-spin" />
      </div>
    }
  >
    <AuthPageContent />
  </Suspense>
);

export default AuthPage;