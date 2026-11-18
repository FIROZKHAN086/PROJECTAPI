"use client";

import { motion } from "framer-motion";
import { fadeIn, EASE_OUT } from "@/src/Page/Hero/lib/variants";
import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen, ShieldCheck, Zap } from "lucide-react";

export default function HeroCTA() {
  const router = useRouter();

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.2 }}
      className="mt-8 flex flex-col items-center gap-4"
    >
      <div className="flex flex-wrap items-center justify-center gap-3.5">
        <motion.button
          whileHover={{
            scale: 1.04,
            boxShadow: "0px 0px 32px rgba(74,222,128,0.45)",
          }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
          onClick={() => router.push("/login")}
          className="group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#4ADE80] px-7 py-3 text-sm font-bold text-[#0A0A0A] shadow-[0_4px_20px_rgba(74,222,128,0.3)] transition-all hover:bg-[#86efac]"
        >
          <span>Start Building Free</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.03,
            backgroundColor: "rgba(255,255,255,0.08)",
            borderColor: "rgba(255,255,255,0.25)",
          }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
          onClick={() => router.push("/docs")}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#FFFBF4]/15 bg-white/[0.03] px-6 py-3 text-sm font-medium text-[#FFFBF4] backdrop-blur-sm transition-all"
        >
          <BookOpen className="h-4 w-4 text-[#FFFBF4]/70" />
          <span>Explore Documentation</span>
        </motion.button>
      </div>

      {/* Trust micro-banner */}
      <div className="flex items-center gap-4 text-xs text-[#FFFBF4]/50">
        <span className="flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5 text-[#4ADE80]" />
          Instant Setup (30s)
        </span>
        <span className="text-[#FFFBF4]/20">•</span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-[#4ADE80]" />
          No credit card required
        </span>
      </div>
    </motion.div>
  );
}
