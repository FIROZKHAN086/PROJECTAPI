"use client";

import { motion } from "framer-motion";
import { riseIn } from "@/src/ProblemSolution/lib/variants";

export default function ProblemHeader() {
  return (
    <header className="flex flex-col items-center gap-6 text-center">
      <motion.div
        variants={riseIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="flex items-center justify-center gap-3"
      >
        <span className="h-px w-12 bg-[#FFFBF4]/30" />
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#FFFBF4]/60">
          The Problem → Solution
        </span>
        <span className="h-px w-12 bg-[#FFFBF4]/30" />
      </motion.div>

      <motion.h2
        variants={riseIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: 0.1 }}
        className="max-w-4xl text-4xl font-bold tracking-tight leading-[1.08] text-[#FFFBF4] sm:text-5xl md:text-6xl"
        style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
      >
        Your portfolio shouldn&apos;t
        <br />
        be this much{" "}
        <span className="text-[#FFFBF4]/50">work.</span>
      </motion.h2>

      <motion.p
        variants={riseIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl text-lg leading-relaxed text-[#FFFBF4]/70"
      >
        Stop hardcoding and copy-pasting. One dashboard, one API — your data
        flows to every site as clean JSON, automatically.
      </motion.p>
    </header>
  );
}