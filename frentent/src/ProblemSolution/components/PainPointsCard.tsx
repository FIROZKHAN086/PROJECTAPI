"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { staggerContainer, riseIn } from "@/src/ProblemSolution/lib/variants";

const PAIN_POINTS = [
  "Hardcoded project card data on every site",
  "Manually editing JSON files by hand",
  "Copy-pasting data between portfolio sites",
  "Rebuilding pages after every single project",
];

export default function PainPointsCard() {
  return (
    <motion.div
      variants={riseIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: 0.15 }}
      className="relative flex h-full flex-col gap-7 rounded-2xl border border-[#FFFBF4]/10 bg-[#FFFBF4]/[0.02] p-7 sm:p-9"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#FFFBF4]/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-[#FFFBF4]/60">
          Before
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FFFBF4]/30">
          01
        </span>
      </div>

      <h3
        className="text-2xl font-bold leading-snug text-[#FFFBF4] sm:text-3xl"
        style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
      >
        The messy way.
      </h3>

      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="flex flex-col gap-4"
      >
        {PAIN_POINTS.map((point) => (
          <motion.li
            key={point}
            variants={riseIn}
            className="flex items-start gap-3"
          >
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[#FFFBF4]/20 bg-[#FFFBF4]/[0.05]">
              <X className="h-3.5 w-3.5 text-[#FFFBF4]/70" strokeWidth={2.5} />
            </span>
            <span className="text-sm leading-relaxed text-[#FFFBF4]/75 sm:text-base">
              {point}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}