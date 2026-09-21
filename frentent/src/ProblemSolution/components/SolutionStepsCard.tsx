"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlusCircle, Zap, RefreshCw, Check } from "lucide-react";
import { staggerContainer, riseIn } from "@/src/ProblemSolution/lib/variants";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    icon: PlusCircle,
    title: "Add a project",
    description:
      "Fill in your project once — title, stack, links, media. No markup required.",
  },
  {
    icon: Zap,
    title: "We generate your API",
    description:
      "A secure endpoint like /api/v1/projects/{apiKey} updates automatically for you.",
  },
  {
    icon: RefreshCw,
    title: "Every site updates instantly",
    description:
      "React, Vue, Next.js, or plain HTML — all pull from the same source.",
  },
];

export default function SolutionStepsCard() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
        },
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
      className="relative flex h-full flex-col gap-7 rounded-2xl border border-[#FFFBF4]/15 bg-[#FFFBF4]/[0.04] p-7 sm:p-9"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#FFFBF4]/25 bg-[#FFFBF4]/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-[#FFFBF4]">
          After
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FFFBF4]/40">
          02
        </span>
      </div>

      <h3
        className="text-2xl font-bold leading-snug text-[#FFFBF4] sm:text-3xl"
        style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
      >
        The ProjectAPI way.
      </h3>

      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative flex flex-col gap-7"
      >
        <div
          ref={lineRef}
          className="absolute left-[15px] top-2 bottom-2 w-px bg-[#FFFBF4]/25"
        />

        {STEPS.map((step) => (
          <motion.li key={step.title} variants={riseIn} className="relative flex gap-4">
            <span className="relative z-10 grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full border border-[#FFFBF4]/25 bg-[#0A0A0A]">
              <step.icon className="h-4 w-4 text-[#FFFBF4]" strokeWidth={2} />
            </span>
            <div className="flex flex-col gap-1 pt-0.5">
              <span className="text-base font-semibold text-[#FFFBF4]">
                {step.title}
              </span>
              <span className="text-sm leading-relaxed text-[#FFFBF4]/65">
                {step.description}
              </span>
            </div>
            <Check
              className="ml-auto mt-1 h-4 w-4 shrink-0 text-[#FFFBF4]/80"
              strokeWidth={2.5}
            />
          </motion.li>
        ))}
      </motion.ol>
    </motion.div>
  );
}