"use client";

import { motion } from "framer-motion";
import { fadeIn, EASE_OUT } from "@/src/Hero/lib/variants";

export default function HeroCTA() {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.2 }}
      className="mt-8 flex flex-wrap items-center justify-center gap-3"
    >
      <motion.a
        whileHover={{
          scale: 1.04,
          boxShadow: "0px 0px 28px rgba(74,222,128,0.35)",
        }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
        href="#pricing"
        className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#4ADE80] px-6 py-2.5 text-sm font-semibold text-[#0A0A0A] transition-colors hover:bg-[#a3e635]"
      >
        Start Building Free
        <svg
          viewBox="0 0 16 16"
          fill="none"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path
            d="M3 8h10m0 0L9 4m4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.a>
      <motion.a
        whileHover={{
          scale: 1.04,
          backgroundColor: "rgba(255,255,255,0.1)",
          borderColor: "rgba(255,255,255,0.2)",
        }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
        href="/docs"
        className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-white/[0.03] border border-white/10 px-6 py-2.5 text-sm font-medium text-[#FFFBF4]"
      >
        View API Docs
      </motion.a>
    </motion.div>
  );
}