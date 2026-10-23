"use client";

import { motion } from "framer-motion";
import { authFeatures } from "@/app/login/lib/data";
import { Sparkles, TrendingUp, Users, Zap, ShieldCheck, Star } from "lucide-react";

export default function BrandPanel({ isSignUp }: { isSignUp: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, type: "spring" }}
      className="hidden lg:block space-y-10 relative"
    >
      {/* Floating Background Elements */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-[#4ADE80]/10 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-gradient-to-tl from-[#3B82F6]/10 to-transparent rounded-full blur-3xl -z-10" />

      {/* Header Section */}
      <div className="space-y-6 relative">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-[#4ADE80]/20 to-[#3B82F6]/20 backdrop-blur-sm border border-white/20 rounded-full shadow-lg"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-[#4ADE80]/30 rounded-full"
            />
            <TrendingUp className="size-4 text-[#4ADE80]" />
          </div>
          <span className="text-sm font-semibold bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] bg-clip-text text-transparent">
            Trusted by 10,000+ developers worldwide
          </span>
          <Sparkles className="size-3.5 text-[#3B82F6]" />
        </motion.div>

        {/* Main Title */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-bold leading-tight text-[#FFFBF4] font-space-grotesk"
          >
            {isSignUp ? (
              <>
                Build amazing things{" "}
                <span className="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] bg-clip-text text-transparent">
                  with confidence
                </span>
              </>
            ) : (
              <>
                Welcome back to{" "}
                <span className="bg-gradient-to-r from-[#4ADE80] to-[#3B82F6] bg-clip-text text-transparent">
                  ProjectAPI
                </span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-[#D8CFBC]/80 leading-relaxed"
          >
            {isSignUp
              ? "Join a thriving community of developers building the future with powerful, reliable API tools. Get started in seconds."
              : "Continue building amazing things with our suite of powerful development tools and APIs."}
          </motion.p>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-6 py-4"
        >
          {[
            { icon: Users, label: "Active Developers", value: "10K+" },
            { icon: Zap, label: "API Uptime", value: "99.9%" },
            { icon: ShieldCheck, label: "Security Score", value: "A+" },
            { icon: Star, label: "Satisfaction", value: "4.9/5" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -3 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <stat.icon className="size-4 text-[#4ADE80]" />
                <div className="text-2xl font-bold text-[#FFFBF4]">{stat.value}</div>
              </div>
              <div className="text-xs text-[#D8CFBC]/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-2 gap-4"
      >
        {authFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative"
            >
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#4ADE80]/10 to-[#3B82F6]/10 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity" />

              <div className="relative p-5 bg-gradient-to-br from-[#1A1A1A]/80 to-[#0F0F0F]/80 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Icon className="size-5 text-[#4ADE80]" />
                    <div className="absolute -inset-2 bg-[#4ADE80]/10 blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-[#FFFBF4] mb-1">
                      {feature.text.split(' ')[0]}
                    </h3>
                    <p className="text-xs text-[#D8CFBC]/70 leading-relaxed">
                      {feature.text.split(' ').slice(1).join(' ')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Community Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="pt-6 border-t border-white/10"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Animated Avatars */}
            <div className="flex -space-x-3">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  whileHover={{ y: -3 }}
                  className="relative size-10 rounded-full bg-gradient-to-br from-[#D8CFBC] to-[#8A8578] border-2 border-[#0A0A0A] flex items-center justify-center shadow-lg"
                >
                  <span className="text-xs font-bold text-[#0A0A0A]">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <div className="absolute -inset-1 bg-gradient-to-br from-[#4ADE80]/20 to-[#3B82F6]/20 rounded-full blur opacity-0 hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>

            <div>
              <p className="text-sm font-medium text-[#FFFBF4]">
                Join our growing community
              </p>
              <p className="text-xs text-[#D8CFBC]/60">
                Developers from startups to enterprises
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-xs font-medium bg-gradient-to-r from-[#4ADE80]/20 to-[#3B82F6]/20 border border-white/20 rounded-full text-[#D8CFBC] hover:text-[#FFFBF4] transition-all"
          >
            View testimonials →
          </motion.button>
        </div>

        {/* CTA Cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-6 grid grid-cols-2 gap-3"
        >
          <div className="p-3 bg-gradient-to-br from-[#4ADE80]/5 to-transparent border border-[#4ADE80]/20 rounded-xl">
            <p className="text-xs font-medium text-[#FFFBF4]">🚀 Lightning Fast</p>
            <p className="text-[10px] text-[#D8CFBC]/60">Average response time: 50ms</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-[#3B82F6]/5 to-transparent border border-[#3B82F6]/20 rounded-xl">
            <p className="text-xs font-medium text-[#FFFBF4]">🔒 Enterprise Secure</p>
            <p className="text-[10px] text-[#D8CFBC]/60">SOC 2 compliant</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
