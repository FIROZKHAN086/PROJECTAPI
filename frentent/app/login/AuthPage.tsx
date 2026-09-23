"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/src/lib/hooks";
import BrandPanel from "./components/BrandPanel";
import AuthForm from "./components/AuthForm";
import MobileFeatures from "./components/MobileFeatures";

interface AuthPageProps {
  initialAuth?: string;
  nextPath?: string;
}

const isSafePath = (value?: string) =>
  !!value && value.startsWith("/") && !value.startsWith("//");

export default function AuthPage({ initialAuth, nextPath }: AuthPageProps) {
  const isSignUp = initialAuth === "signup";
  const redirectTarget = isSafePath(nextPath) ? (nextPath as string) : "/dashboard";
  const router = useRouter();
  const { user, isLoading: authLoading } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (!authLoading && user) {
      router.replace(redirectTarget);
    }
  }, [user, authLoading, router, redirectTarget]);

  return (
    <div className="min-h-full md:my-16  my-14 bg-[#0A0A0A] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#141414] to-[#0A0A0A] -z-10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFFBF4]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4ADE80]/5 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-[1120px] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <BrandPanel isSignUp={isSignUp} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[420px] mx-auto lg:mx-0"
        >
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
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

            <AuthForm isSignUp={isSignUp} redirectTarget={redirectTarget} />
          </div>

          <MobileFeatures />
        </motion.div>
      </div>
    </div>
  );
}