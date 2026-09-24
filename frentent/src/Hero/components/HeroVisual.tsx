"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { visualEntrance } from "@/src/Hero/lib/variants";

const CODE_BLOCK = `{
  "status": "success",
  "data": {
    "id": "proj_123",
    "title": "E-Commerce Dashboard",
    "framework": "Next.js",
    "version": "2.4.1",
    "endpoint": "/api/v1/projects/proj_123",
    "metadata": {
      "team": "frontend-core",
      "env": "production",
      "sync": "instant"
    }
  }
}`;

const TAGS = ["Next.js 14", "Stripe", "PostgreSQL", "Redis", "Tailwind"];

export default function HeroVisual() {
  const cardRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLPreElement>(null);
  const [typedLength, setTypedLength] = useState(0);
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      const frame = requestAnimationFrame(() => {
        setTypedLength(CODE_BLOCK.length);
        setTypingDone(true);
      });
      return () => cancelAnimationFrame(frame);
    }

    gsap.set(card, { transformPerspective: 1000 });

    const ctx = gsap.context(() => {
      const rotateX = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power2.out" });
      const rotateY = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power2.out" });

      const handleMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        rotateY(px * 6);
        rotateX(py * -6);
      };

      const handleLeave = () => {
        rotateX(0);
        rotateY(0);
      };

      card.addEventListener("mousemove", handleMove);
      card.addEventListener("mouseleave", handleLeave);

      const state = { current: 0 };
      const typeTimer = gsap.delayedCall(1.4, () => {
        gsap.to(state, {
          current: CODE_BLOCK.length,
          duration: 3.2,
          ease: "none",
          onUpdate: () => {
            setTypedLength(Math.round(state.current));
          },
          onComplete: () => setTypingDone(true),
        });
      });

      return () => {
        card.removeEventListener("mousemove", handleMove);
        card.removeEventListener("mouseleave", handleLeave);
        typeTimer.kill();
      };
    }, card);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      variants={visualEntrance}
      initial="hidden"
      animate="visible"
      className="mt-14 w-full max-w-[1140px]"
      style={{ perspective: 1200 }}
    >
      <div
        ref={cardRef}
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#141414] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          <span className="ml-4 hidden text-xs text-[#8A8578] sm:inline">
            projectapi.dev/api/v1/projects
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-[#4ADE80]/20 bg-[#4ADE80]/5 px-2 py-0.5 text-[10px] font-mono text-[#4ADE80]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4ADE80]" />
            LIVE
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 sm:gap-5 sm:p-5 md:grid-cols-2">
          <div className="flex flex-col rounded-xl border border-white/10 bg-[#0F0F0F] p-4 transition-colors group-hover:border-white/20 sm:p-5">
            <div className="relative mb-4 min-h-40 overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(74,222,128,0.12),transparent_55%)]" />
              <span className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 80 80" fill="none" className="h-16 w-16 opacity-40" aria-hidden="true">
                  <rect width="80" height="80" rx="18" fill="#1a1a1a" stroke="rgba(255,255,255,0.1)" />
                  <path d="M24 52V28l32 24V28" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <h3 className="text-base font-semibold text-[#FFFBF4] sm:text-lg">
              E-Commerce Dashboard
            </h3>
            <p className="mt-1 text-sm text-[#8A8578]">
              Real-time analytics &amp; order management
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-[#141414] px-3 py-1 text-xs text-[#D8CFBC]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-4 border-t border-white/10 pt-4 text-xs text-[#8A8578]">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#4ADE80]" />
                12 commits
              </span>
              <span>Updated: 2h ago</span>
            </div>
          </div>

          <div className="flex flex-col rounded-xl border border-white/10 bg-[#0F0F0F] p-4 transition-colors group-hover:border-white/20 sm:p-5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-3 text-[#D8CFBC]">
                <span className="rounded border border-[#4ADE80]/30 bg-[#4ADE80]/10 px-2 py-0.5 font-mono text-[#4ADE80]">
                  GET
                </span>
                <span className="hidden font-mono text-[#8A8578] sm:inline">
                  /api/v1/projects/
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-[#4ADE80]/20 bg-[#4ADE80]/5 px-2 py-0.5 text-[#4ADE80]">
                  200 OK
                </span>
              </div>
            </div>

            <pre
              ref={codeRef}
              className="mt-4 flex-1 overflow-x-auto rounded-lg border border-white/10 bg-[#0a0a0a] p-4 font-mono text-xs leading-relaxed text-[#D8CFBC] sm:text-sm"
            >
              {CODE_BLOCK.slice(0, typedLength)}
              <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-[#4ADE80]" />
            </pre>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-4 text-xs text-[#8A8578]">
              <span className="flex items-center gap-1.5">
                <span className="font-mono text-[#4ADE80]">●</span>
                API stable
              </span>
              <span className="hidden h-4 w-px bg-white/10 sm:block" />
              <span>Latency: {typingDone ? "142ms" : "—"}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 border-t border-white/10 bg-[#0F0F0F]/50 px-6 py-3 text-xs text-[#D8CFBC] sm:flex-row">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#141414] px-3 py-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4ADE80]" />
            syncs instantly
            <span className="text-[10px] font-mono text-[#4ADE80]">●</span>
          </div>
          <div className="hidden items-center gap-4 text-[10px] text-[#8A8578] md:flex">
            <span>Updated: just now</span>
            <span className="h-3 w-px bg-white/10" />
            <span>Running: connected</span>
            <span className="h-3 w-px bg-white/10" />
            <span>99.9% uptime</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}