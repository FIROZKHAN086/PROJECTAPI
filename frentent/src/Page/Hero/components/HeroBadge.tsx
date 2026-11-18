"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/src/Page/Hero/lib/variants";
import { Sparkles } from "lucide-react";

export default function HeroBadge() {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="inline-flex items-center gap-2.5 rounded-full border border-[#FFFBF4]/15 bg-[#161712]/80 px-4 py-1.5 text-xs text-[#FFFBF4]/90 backdrop-blur-md shadow-lg transition-all hover:border-[#4ADE80]/40"
    >
      <span className="rounded-full bg-[#4ADE80]/20 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#4ADE80]">
        v2.4 Live
      </span>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ADE80] opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ADE80]" />
      </span>
      <span className="text-[#FFFBF4]/80">
        Supporting Next.js, React, Astro, Vue &amp; static HTML
      </span>
    </motion.div>
  );
}
