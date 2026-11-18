"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlusCircle, Zap, RefreshCw, CheckCircle2, Sparkles } from "lucide-react";
import {
  staggerContainer,
  riseIn,
} from "@/src/Page/ProblemSolution/lib/variants";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    icon: PlusCircle,
    stepNum: "01",
    title: "Add or edit in visual dashboard",
    description:
      "Fill in your project once: title, stack, links, media gallery, and metrics. Zero markup, zero database migrations.",
  },
  {
    icon: Zap,
    stepNum: "02",
    title: "Instant Edge API & auto-revalidation",
    description:
      "A globally distributed endpoint like /api/v1/projects/:key updates worldwide in sub-15ms with automatic cache purging.",
  },
  {
    icon: RefreshCw,
    stepNum: "03",
    title: "Every website updates automatically",
    description:
      "Next.js, React, Astro, Vue, or static HTML — all hydrate from the single source of truth without redeploying code.",
  },
];

export default function SolutionStepsCard() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: line.parentElement,
            start: "top 70%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
    }, line);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      variants={riseIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: 0.2 }}
      className="relative flex h-full flex-col justify-between gap-6 rounded-2xl sm:rounded-3xl border border-[#4ADE80]/30 bg-[#161912]/80 p-6 sm:p-8 backdrop-blur-md shadow-[0_15px_40px_rgba(74,222,128,0.06)] transition-all hover:border-[#4ADE80]/50"
    >
      <div>
        {/* Header Badge */}
        <div className="flex items-center justify-between pb-4 border-b border-[#FFFBF4]/10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#4ADE80]/40 bg-[#4ADE80]/15 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.15em] text-[#4ADE80]">
            <Sparkles className="h-3 w-3" />
            The ProjectAPI Way
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4ADE80]">
            AFTER
          </span>
        </div>

        <h3
          className="mt-5 text-2xl font-bold leading-snug text-[#FFFBF4] sm:text-3xl"
          style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
        >
          Zero friction.
          <br />
          <span className="text-[#4ADE80]">Instant edge delivery.</span>
        </h3>

        {/* List of Steps */}
        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative mt-6 flex flex-col gap-5"
        >
          <div
            ref={lineRef}
            className="absolute left-[17px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#4ADE80] via-[#4ADE80]/50 to-transparent"
          />

          {STEPS.map((step) => (
            <motion.li
              key={step.title}
              variants={riseIn}
              className="relative flex gap-4 rounded-xl border border-white/[0.04] bg-black/30 p-3.5 transition-colors hover:border-[#4ADE80]/30"
            >
              <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#4ADE80]/40 bg-[#11120D] text-[#4ADE80] shadow-[0_0_10px_rgba(74,222,128,0.25)]">
                <step.icon className="h-4 w-4" strokeWidth={2.2} />
              </span>
              <div className="flex flex-col gap-0.5 pt-0.5">
                <span className="text-xs sm:text-sm font-semibold text-[#FFFBF4]">
                  {step.title}
                </span>
                <span className="text-[11px] sm:text-xs leading-relaxed text-[#FFFBF4]/65">
                  {step.description}
                </span>
              </div>
              <CheckCircle2
                className="ml-auto mt-0.5 h-4 w-4 shrink-0 text-[#4ADE80]"
                strokeWidth={2}
              />
            </motion.li>
          ))}
        </motion.ol>
      </div>

      <div className="pt-4 border-t border-[#FFFBF4]/10 flex items-center justify-between text-xs text-[#4ADE80] font-mono">
        <span>Average sync latency: &lt; 14ms</span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
          ALWAYS LIVE
        </span>
      </div>
    </motion.div>
  );
}
