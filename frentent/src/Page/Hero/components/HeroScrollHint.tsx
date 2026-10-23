"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroScrollHint() {
  const gsapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gsapRef.current;
    const glow = glowRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Fade out on scroll
      gsap.to(el, {
        autoAlpha: 0,
        y: -24,
        scale: 0.8,
        ease: "power2.in",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top 75%",
          end: "top 25%",
          scrub: true,
        },
      });

      // Glow pulse
      if (glow) {
        gsap.to(glow, {
          scale: 1.5,
          opacity: 0,
          duration: 2,
          repeat: -1,
          ease: "power2.out",
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div className="pointer-events-none absolute bottom-8 left-0 right-0 z-10 flex justify-center">
      <motion.div
        ref={gsapRef}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="flex flex-col items-center gap-3"
      >
        <div className="relative flex h-10 w-6 items-start justify-center rounded-full border border-white/15 bg-white/[0.02] p-1.5 backdrop-blur-sm">
          {/* Glow effect */}
          <div
            ref={glowRef}
            className="absolute inset-0 rounded-full bg-[#4ADE80]/30 blur-md"
          />

          {/* Animated dot */}
          <motion.span
            animate={{ y: [0, 16, 0], opacity: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="relative z-10 h-1.5 w-1.5 rounded-full bg-[#4ADE80] shadow-[0_0_8px_rgba(74,222,128,0.6)]"
          />
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#8A8578]">
            Scroll
          </span>
          <motion.svg
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            viewBox="0 0 12 8"
            fill="none"
            className="h-2 w-3 text-[#4ADE80]/60"
            aria-hidden="true"
          >
            <path
              d="M1 1l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </div>
      </motion.div>
    </div>
  );
}
