"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/src/lib/hooks";
import { useAuth } from "@/src/hooks/useAuth";
import BrandPanel from "./components/BrandPanel";
import AuthForm from "./components/AuthForm";
import MobileFeatures from "./components/MobileFeatures";
import HeroParticles from "./components/HeroParticles";

interface AuthPageProps {
  initialAuth?: string;
  nextPath?: string;
}

const isSafePath = (value?: string) =>
  !!value && value.startsWith("/") && !value.startsWith("//");

export default function AuthPage({ initialAuth, nextPath }: AuthPageProps) {
  const isSignUp = initialAuth === "signup";
  const redirectTarget = isSafePath(nextPath)
    ? (nextPath as string)
    : "/dashboard";
  const router = useRouter();
  const { user, isLoading: authLoading } = useAppSelector((s) => s.auth);
  const { otpRequired, pendingEmail } = useAuth();

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    if (!authLoading && user?.userVerified) {
      router.replace(redirectTarget);
    }
  }, [user, authLoading, router, redirectTarget]);

  return (
    <div
      ref={containerRef}
      suppressHydrationWarning={true}
      className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#151515] flex items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Animated Background Particles */}
      <HeroParticles />

      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y: backgroundY, opacity }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#4ADE80]/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#3B82F6]/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-[#4ADE80]/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-l from-[#3B82F6]/5 to-transparent rounded-full blur-3xl" />
      </motion.div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #4ADE80 1px, transparent 1px),
                             linear-gradient(to bottom, #4ADE80 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)'
          }}
        />
      </div>

      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <BrandPanel isSignUp={isSignUp} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[460px] mx-auto lg:mx-0 relative"
        >
          {/* Glowing Border Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4ADE80]/30 via-[#3B82F6]/30 to-[#4ADE80]/30 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000" />

          <div className="relative bg-gradient-to-br from-[#1A1A1A]/95 to-[#0F0F0F]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 lg:p-12 overflow-hidden">
            {/* Animated Corner Accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-[#4ADE80]/30 rounded-tl-3xl" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#3B82F6]/30 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#4ADE80]/30 rounded-bl-3xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-[#3B82F6]/30 rounded-br-3xl" />

            {/* Floating Logo for Mobile */}
            <div className="lg:hidden mb-8 text-center">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 2
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4ADE80]/20 to-[#3B82F6]/20 border border-white/10 rounded-full"
              >
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex size-full rounded-full bg-[#4ADE80] opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-[#4ADE80]" />
                </span>
                <span className="text-sm font-semibold bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] bg-clip-text text-transparent">
                  ProjectAPI
                </span>
              </motion.div>
            </div>

            {/* Header with Typing Effect */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-[#FFFBF4] font-space-grotesk leading-tight">
                {otpRequired ? (
                  <>
                    <span className="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] bg-clip-text text-transparent">
                      Verify your email
                    </span>
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="ml-1"
                    >
                      ✨
                    </motion.span>
                  </>
                ) : isSignUp ? (
                  <>
                    Start your{" "}
                    <span className="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] bg-clip-text text-transparent">
                      journey
                    </span>
                  </>
                ) : (
                  <>
                    Welcome{" "}
                    <span className="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] bg-clip-text text-transparent">
                      back
                    </span>
                  </>
                )}
              </h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm sm:text-base text-[#D8CFBC]/80 mt-2 leading-relaxed"
              >
                {otpRequired
                  ? `Check your inbox! We sent a 6-digit code to ${pendingEmail ?? "your email"}`
                  : isSignUp
                    ? "Create your account and unlock access to powerful API tools."
                    : "Sign in to access your dashboard and manage your projects."}
              </motion.p>
            </motion.div>

            <AuthForm isSignUp={isSignUp} redirectTarget={redirectTarget} />
          </div>

          <MobileFeatures />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-[#D8CFBC]/60">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-4 h-8 border-2 border-white/20 rounded-full flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 bg-gradient-to-b from-[#4ADE80] to-[#3B82F6] rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
