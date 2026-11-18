"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function FlowArrow() {
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = arrowRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.6 },
        {
          opacity: 1,
          scale: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex items-center justify-center py-4 md:py-0 md:col-start-2 md:row-span-full">
      <motion.div
        ref={arrowRef}
        aria-hidden
        whileHover={{ scale: 1.15, rotate: 180 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative grid h-14 w-14 place-items-center rounded-full border border-[#4ADE80]/30 bg-[#161712] shadow-[0_0_20px_rgba(74,222,128,0.2)] cursor-pointer"
      >
        <span className="absolute inset-0 rounded-full animate-ping bg-[#4ADE80]/20" />
        <MoveRight
          className="relative z-10 h-6 w-6 rotate-90 text-[#4ADE80] md:rotate-0"
          strokeWidth={2}
        />
      </motion.div>
    </div>
  );
}
