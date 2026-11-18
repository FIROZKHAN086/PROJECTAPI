"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fadeIn } from "@/src/Page/Hero/lib/variants";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 12, suffix: "k+", label: "Projects shipped" },
  { value: 14, suffix: "ms", label: "Edge response latency" },
  { value: 300, suffix: "+", label: "Global Edge PoPs" },
  { value: 99.9, suffix: "%", label: "Uptime SLA" },
] as const;

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      el.textContent = `${value}${suffix}`;
      return;
    }

    const state = { current: 0 };
    const tween = gsap.to(state, {
      current: value,
      duration: 1.8,
      ease: "power2.out",
      scrollTrigger: { trigger: el, once: true, start: "top 90%" },
      onUpdate: () => {
        if (value % 1 !== 0) {
          el.textContent = `${state.current.toFixed(1)}${suffix}`;
        } else {
          el.textContent = `${Math.round(state.current)}${suffix}`;
        }
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, suffix]);

  return (
    <span ref={ref} className="tabular-nums font-mono">
      0{suffix}
    </span>
  );
}

export default function HeroStats() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <motion.dl
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.3 }}
      className="mt-12 grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
    >
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center rounded-xl border border-[#FFFBF4]/10 bg-[#161712]/50 p-3.5 backdrop-blur-sm transition-all duration-300 hover:border-[#FFFBF4]/20"
        >
          <dd className="text-xl sm:text-2xl font-bold tracking-tight text-[#FFFBF4]">
            {mounted ? (
              <Counter value={stat.value} suffix={stat.suffix} />
            ) : (
              <span>
                {stat.value}
                {stat.suffix}
              </span>
            )}
          </dd>
          <dt className="mt-1 text-center text-[11px] leading-tight text-[#FFFBF4]/60">
            {stat.label}
          </dt>
        </div>
      ))}
    </motion.dl>
  );
}
