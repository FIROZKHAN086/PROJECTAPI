"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function FlowArrow() {
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = arrowRef.current;
    if (!el) return;

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, x: -30, scaleX: 0.4 },
        {
          opacity: 1,
          x: 0,
          scaleX: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex items-center justify-center md:col-start-2 md:row-span-full">
      <motion.div
        ref={arrowRef}
        aria-hidden
        className="grid h-14 w-14 place-items-center rounded-full border border-[#FFFBF4]/25 bg-[#FFFBF4]/[0.05]"
      >
        <MoveRight
          className="h-6 w-6 rotate-90 text-[#FFFBF4] md:rotate-0"
          strokeWidth={1.8}
        />
      </motion.div>
    </div>
  );
}