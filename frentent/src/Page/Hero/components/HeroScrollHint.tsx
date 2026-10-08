"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroScrollHint() {
  const gsapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gsapRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        autoAlpha: 0,
        y: -24,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top 75%",
          end: "top 25%",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div className="pointer-events-none absolute bottom-8 left-0 right-0 z-10 flex justify-center">
      <motion.div
        ref={gsapRef}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="flex flex-col items-center gap-3"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/15 p-1.5">
          <motion.span
            animate={{ y: [0, 16, 0], opacity: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]"
          />
        </div>
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A8578]">
          Scroll
        </span>
      </motion.div>
    </div>
  );
}