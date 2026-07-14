"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ScrollReveal,
  TextReveal,
  ParallaxSection,
  StaggerGrid,
  StaggerItem,
  LineDraw,
} from "@/src/lib/animations";

export default function HeroPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div ref={heroRef} className="min-h-screen bg-[#0A0A0A] text-[#FFFBF4] font-sans antialiased overflow-hidden">
      <main className="max-w-[1140px] mx-auto px-6 py-12 md:py-24 flex flex-col items-center text-center">
        {/* Eyebrow pill */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#141414] border border-white/10 text-xs text-[#D8CFBC]"
        >
          <motion.span
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-2 h-2 rounded-full bg-[#4ADE80] shadow-[0_0_0_4px_rgba(74,222,128,0.12)]"
          />
          <span>Now supporting React, Vue, Next.js & 5 more frameworks</span>
        </motion.div>

        {/* Heading with text reveal */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="mt-6"
        >
          <h1 className="max-w-[780px] text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-[#FFFBF4]">
            <TextReveal text="One Dashboard. One API." delay={0.4} staggerDelay={0.03} />
            <br />
            <TextReveal text="Unlimited Portfolios Projects." delay={0.8} staggerDelay={0.03} />
          </h1>
        </motion.div>

        {/* Subhead */}
        <ScrollReveal direction="up" delay={0.9} distance={20}>
          <p className="mt-5 max-w-[560px] text-lg leading-relaxed text-[#D8CFBC]">
            ProjectAPI is a headless CMS for developer portfolios. Manage every project once — every connected website updates instantly.
          </p>
        </ScrollReveal>

        {/* CTA Buttons */}
        <ScrollReveal direction="up" delay={1.0} distance={20}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0px 0px 25px rgba(251,247,244,0.2)" }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-2.5 bg-[#FBF7F4] text-[#0A0A0A] rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
              Start Building Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.08)" }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-2.5 bg-transparent border border-white/10 text-[#FFFBF4] rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
              View API Docs
            </motion.button>
          </div>
        </ScrollReveal>

        {/* Hero Visual Card */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ boxShadow: "0 0 80px rgba(74,222,128,0.08)" }}
          className="mt-12 w-full max-w-[1140px] rounded-2xl border border-white/10 bg-[#141414] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Left: Project Card Preview */}
            <motion.div
              whileHover={{ borderColor: "rgba(255,255,255,0.2)" }}
              className="rounded-xl border border-white/10 bg-[#0F0F0F] p-5 flex flex-col transition-all duration-300"
            >
              <div className="relative flex-1 rounded-lg border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] h-40 mb-4 overflow-hidden">
                <div className="absolute inset-0 p-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "5rem" }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="h-2 bg-[#4ADE80]/20 rounded-full"
                      />
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "8rem" }}
                        transition={{ duration: 0.8, delay: 1.3 }}
                        className="h-2 bg-white/10 rounded-full"
                      />
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "6rem" }}
                        transition={{ duration: 0.8, delay: 1.4 }}
                        className="h-2 bg-white/10 rounded-full"
                      />
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="grid grid-cols-3 gap-2">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 1.5 + i * 0.1 }}
                          className="h-8 rounded bg-white/5 border border-white/10"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.6 }}
                  className="absolute top-2 right-2 px-2 py-1 rounded bg-[#4ADE80]/10 border border-[#4ADE80]/20 text-[#4ADE80] text-[10px] font-mono"
                >
                  LIVE
                </motion.div>
              </div>
              
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-[#FFFBF4]">E-Commerce Dashboard</h3>
                  <p className="text-sm text-[#8A8578] mt-1">Real-time analytics & order management</p>
                </div>
                <span className="px-2 py-1 rounded-full bg-[#141414] border border-white/10 text-[10px] text-[#D8CFBC]">v2.4.1</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {["Next.js 14", "Stripe", "PostgreSQL", "Redis", "Tailwind"].map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.7 + i * 0.05 }}
                    whileHover={{ borderColor: "rgba(74,222,128,0.3)" }}
                    className="px-3 py-1 rounded-full bg-[#141414] border border-white/10 text-xs text-[#D8CFBC] transition-colors cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
              
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-1 text-xs text-[#8A8578]">
                  <span className="w-2 h-2 rounded-full bg-[#4ADE80]"></span>
                  12 commits
                </div>
                <div className="flex items-center gap-1 text-xs text-[#8A8578]">
                  <span>Updated: 2h ago</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Code Panel */}
            <motion.div
              whileHover={{ borderColor: "rgba(255,255,255,0.2)" }}
              className="rounded-xl border border-white/10 bg-[#0F0F0F] p-5 flex flex-col transition-all duration-300"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-[#D8CFBC]">
                  <span className="font-mono bg-[#1a1a1a] px-2 py-1 rounded border border-white/10">GET</span>
                  <span className="font-mono text-[#8A8578]">/api/v1/projects/</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded-full border border-[#4ADE80]/20 text-[#4ADE80] bg-[#4ADE80]/5">200 OK</span>
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-2 h-2 rounded-full bg-[#4ADE80]"
                  />
                </div>
              </div>
              
              <pre className="mt-4 text-sm text-[#8A8578] font-mono overflow-auto bg-[#0a0a0a] p-4 rounded-lg border border-white/10">
                <code>{`{
  "status": "success",
  "data": {
    "id": "proj_123",
    "title": "E-Commerce Dashboard",
    "framework": "Next.js",
    "version": "2.4.1",
    "endpoint": "/api/v1/projects/proj_123",
    "metadata": {
      "created": "2024-01-15T10:30:00Z",
      "updated": "2024-01-20T08:45:00Z",
      "team": "frontend-core",
      "environment": "production"
    }
  }
}`}</code>
              </pre>
              
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-[#8A8578]">
                  <span className="font-mono text-[#4ADE80]">●</span>
                  <span>API stable</span>
                </div>
                <div className="h-4 w-px bg-white/10"></div>
                <div className="flex items-center gap-2 text-xs text-[#8A8578]">
                  <span>Latency: 142ms</span>
                </div>
                <div className="h-4 w-px bg-white/10"></div>
                <div className="flex items-center gap-2 text-xs text-[#8A8578]">
                  <span>Rate: 2.4k/min</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Connecting line with metrics */}
          <div className="flex items-center justify-center gap-3 py-3 px-6 text-xs text-[#D8CFBC] border-t border-white/10 bg-[#0F0F0F]/50">
            <div className="flex items-center gap-2">
              <span className="w-20 h-px bg-gradient-to-r from-transparent to-white/10"></span>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-[#141414]">
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]"
                />
                <span>syncs instantly</span>
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-[#4ADE80] text-[10px] font-mono"
                >
                  ● LIVE
                </motion.span>
              </div>
              <span className="w-20 h-px bg-gradient-to-l from-transparent to-white/10"></span>
            </div>
            
            <div className="flex items-center gap-4 text-[10px] text-[#8A8578]">
              <span>Updated: just now</span>
              <span className="w-px h-3 bg-white/10"></span>
              <span>Running: connected</span>
              <span className="w-px h-3 bg-white/10"></span>
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-[#4ADE80]"></span>
                <span>99.9% uptime</span>
              </span>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
