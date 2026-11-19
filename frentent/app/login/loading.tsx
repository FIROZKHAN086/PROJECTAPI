"use client";

import { motion } from "framer-motion";
import { LoaderCircle, Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#151515] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#4ADE80]/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-to-r from-[#4ADE80]/5 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-gradient-to-l from-[#3B82F6]/5 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left Panel Skeleton */}
        <div className="hidden lg:block space-y-8">
          {/* Badge Skeleton */}
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full animate-pulse">
            <div className="size-4 bg-white/10 rounded" />
            <div className="h-3 w-32 bg-white/10 rounded" />
            <div className="size-3.5 bg-white/10 rounded" />
          </div>

          {/* Title Skeleton */}
          <div className="space-y-4">
            <div className="h-12 bg-white/10 rounded-xl w-3/4 animate-pulse" />
            <div className="h-4 bg-white/10 rounded w-full animate-pulse delay-100" />
            <div className="h-4 bg-white/10 rounded w-2/3 animate-pulse delay-200" />
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-4 gap-4 py-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center animate-pulse">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <div className="size-4 bg-white/10 rounded" />
                  <div className="h-6 w-8 bg-white/10 rounded" />
                </div>
                <div className="h-2 w-16 bg-white/10 rounded mx-auto" />
              </div>
            ))}
          </div>

          {/* Features Skeleton */}
          <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl animate-pulse">
                <div className="flex items-start gap-3">
                  <div className="size-5 bg-white/10 rounded" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-16 bg-white/10 rounded" />
                    <div className="h-2 w-24 bg-white/10 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel Skeleton */}
        <div className="w-full max-w-[460px] mx-auto lg:mx-0 relative">
          {/* Form Container Skeleton */}
          <div className="relative bg-gradient-to-br from-[#1A1A1A]/50 to-[#0F0F0F]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 lg:p-12 overflow-hidden">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-white/10 rounded-tl-3xl" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-white/10 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-white/10 rounded-bl-3xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-white/10 rounded-br-3xl" />

            {/* Header */}
            <div className="mb-8 space-y-4">
              <div className="flex items-center justify-center gap-2 animate-pulse">
                <div className="size-8 bg-gradient-to-r from-[#4ADE80]/20 to-[#3B82F6]/20 rounded-full" />
                <div className="h-4 w-24 bg-white/10 rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-8 bg-white/10 rounded-xl animate-pulse" />
                <div className="h-3 w-48 bg-white/10 rounded animate-pulse delay-100" />
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2 animate-pulse">
                  <div className="h-3 w-20 bg-white/10 rounded" />
                  <div className="h-12 bg-white/5 border border-white/10 rounded-xl" />
                </div>
              ))}

              {/* Submit Button */}
              <div className="h-12 bg-gradient-to-r from-[#4ADE80]/20 to-[#3B82F6]/20 rounded-xl animate-pulse" />

              {/* Toggle Link */}
              <div className="flex items-center justify-center gap-2 animate-pulse">
                <div className="h-3 w-32 bg-white/10 rounded" />
                <div className="h-3 w-12 bg-white/10 rounded" />
              </div>
            </div>
          </div>

          {/* Loading Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 rounded-3xl"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-flex items-center justify-center size-16 bg-gradient-to-r from-[#4ADE80]/20 to-[#3B82F6]/20 border border-white/20 rounded-2xl mb-4"
              >
                <LoaderCircle className="size-8 text-[#4ADE80]" />
                <Sparkles className="absolute -top-1 -right-1 size-4 text-[#3B82F6]" />
              </motion.div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-[#FFFBF4]">
                  Preparing your experience
                </p>
                <p className="text-xs text-[#D8CFBC]/60">
                  Loading beautiful things... ✨
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Loading Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
      >
        <div className="flex flex-col items-center gap-2">
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