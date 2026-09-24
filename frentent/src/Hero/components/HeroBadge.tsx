"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/src/Hero/lib/variants";

export default function HeroBadge() {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-[#D8CFBC] backdrop-blur-sm"
    >
      <motion.span
        animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="relative flex h-2 w-2"
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ADE80] opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ADE80]" />
      </motion.span>
      Now supporting React, Vue, Next.js &amp; 5 more frameworks
    </motion.div>
  );
}