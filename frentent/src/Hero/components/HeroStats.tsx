"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fadeIn } from "@/src/Hero/lib/variants";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 12, suffix: "k+", label: "Projects shipped" },
  { value: 5, suffix: "+", label: "Framework SDKs" },
  { value: 99.9, suffix: "%", label: "Uptime SLA" },
] as const;

function Counter({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      el.textContent = `${value}${suffix}`;
      return;
    }

    const state = { current: 0 };
    const tween = gsap.to(state, {
      current: value,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: { trigger: el, once: true, start: "top 85%" },
      onUpdate: () => {
        el.textContent = `${Math.round(state.current)}${suffix}`;
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}

export default function HeroStats() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <motion.dl
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.3 }}
      className="mt-10 grid w-full max-w-xl grid-cols-3 gap-4 sm:gap-8"
    >
      {STATS.map((stat, i) => (
        <div
          key={stat.label}
          className={`flex flex-col items-center ${
            i > 0 ? "border-l border-white/10" : ""
          }`}
        >
          <dd className="text-2xl font-bold text-[#FFFBF4] sm:text-3xl">
            {mounted ? <Counter value={stat.value} suffix={stat.suffix} /> : null}
          </dd>
          <dt className="mt-1 text-xs text-[#8A8578] sm:text-sm">
            {stat.label}
          </dt>
        </div>
      ))}
    </motion.dl>
  );
}