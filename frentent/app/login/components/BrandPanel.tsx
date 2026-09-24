"use client";

import { motion } from "framer-motion";
import { authFeatures } from "@/app/login/lib/data";

export default function BrandPanel({ isSignUp }: { isSignUp: boolean }) {
  return (
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 gap-3"
      >
        {authFeatures.map((feature, index) => {
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
  );
}