"use client";

import { motion } from "framer-motion";
import { X, AlertCircle, FileX, RefreshCw } from "lucide-react";
import {
  staggerContainer,
  riseIn,
} from "@/src/Page/ProblemSolution/lib/variants";

const PAIN_POINTS = [
  {
    title: "Hardcoded project cards on every site",
    detail: "Every project addition means opening 3 repositories and manually editing arrays.",
  },
  {
    title: "Manually formatting and syncing JSON files",
    detail: "One stray comma or syntax error breaks your entire production build.",
  },
  {
    title: "Copy-pasting assets between multiple portfolios",
    detail: "Stale screenshots, outdated links, and mismatching descriptions across clients.",
  },
  {
    title: "Rebuilding and redeploying for a single typo",
    detail: "Wasted CI/CD minutes and continuous deployment friction just to update a link.",
  },
];

export default function PainPointsCard() {
  return (
    <motion.div
      variants={riseIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: 0.15 }}
      className="relative flex h-full flex-col justify-between gap-6 rounded-2xl sm:rounded-3xl border border-red-500/20 bg-[#161313]/50 p-6 sm:p-8 backdrop-blur-md transition-all hover:border-red-500/40"
    >
      <div>
        {/* Header Badge */}
        <div className="flex items-center justify-between pb-4 border-b border-[#FFFBF4]/10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.15em] text-red-400">
            <AlertCircle className="h-3 w-3" />
            The Fragile Way
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FFFBF4]/30">
            BEFORE
          </span>
        </div>

        <h3
          className="mt-5 text-2xl font-bold leading-snug text-[#FFFBF4] sm:text-3xl"
          style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
        >
          High friction.
          <br />
          <span className="text-red-400/80">Endless maintenance.</span>
        </h3>

        {/* List of Pain Points */}
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-6 flex flex-col gap-4"
        >
          {PAIN_POINTS.map((point) => (
            <motion.li
              key={point.title}
              variants={riseIn}
              className="flex items-start gap-3.5 rounded-xl border border-white/[0.04] bg-black/30 p-3 transition-colors hover:border-red-500/20"
            >
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-red-500/30 bg-red-500/10 text-red-400">
                <X className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-[#FFFBF4]/90">
                  {point.title}
                </p>
                <p className="mt-0.5 text-[11px] sm:text-xs leading-relaxed text-[#FFFBF4]/50">
                  {point.detail}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <div className="pt-4 border-t border-[#FFFBF4]/10 flex items-center justify-between text-xs text-red-400/70 font-mono">
        <span>Average time to update: 45 mins</span>
        <span>Build status: FRAGILE</span>
      </div>
    </motion.div>
  );
}
