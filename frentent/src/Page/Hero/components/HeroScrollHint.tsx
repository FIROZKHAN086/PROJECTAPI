"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

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

  const handleScrollDown = () => {
    const target = document.getElementById("journey");
    if (!target) return;
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center pointer-events-auto">
      <motion.div
        ref={gsapRef}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        onClick={handleScrollDown}
        className="flex flex-col items-center gap-2.5 cursor-pointer group select-none"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 bg-white/[0.03] p-1.5 backdrop-blur-xs transition-colors group-hover:border-[#4ADE80]/60">
          <motion.span
            animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-[#4ADE80] shadow-[0_0_8px_#4ADE80]"
          />
        </div>
        <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#FFFBF4]/50 group-hover:text-[#4ADE80] transition-colors">
          Scroll To Fly
        </span>
      </motion.div>
    </div>
  );
}
