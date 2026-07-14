"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Brackets,
  Code2,
  FileText,
  Copy,
  RefreshCw,
  PlusCircle,
  Zap,
} from "lucide-react";
import {
  ScrollReveal,
  TextReveal,
  StaggerGrid,
  StaggerItem,
  SlideReveal,
  LineDraw,
} from "@/src/lib/animations";

const painPoints = [
  {
    icon: Code2,
    label: "Hardcoded project cards Data",
  },
  {
    icon: FileText,
    label: "Manually editing JSON files",
  },
  {
    icon: Copy,
    label: "Copy-pasting data between sites",
  },
  {
    icon: RefreshCw,
    label: "Rebuilding portfolios after every project",
  },
];

const solutionSteps = [
  {
    icon: PlusCircle,
    title: "Add a project",
    description: "Fill in your project once — title, stack, links, media.",
  },
  {
    icon: Zap,
    title: "We generate your API",
    description:
      "A secure endpoint like /api/v1/projects/{apiKey} updates automatically.",
  },
  {
    icon: RefreshCw,
    title: "Every site updates instantly",
    description:
      "React, Vue, Next.js, or plain HTML — all pull from the same source.",
  },
];

export default function ProblemSolutionPage() {
  const stepLineRef = useRef(null);
  const stepLineInView = useInView(stepLineRef, { once: true, margin: "-60px" });

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans antialiased text-[#FFFBF4]">
      <main className="mx-auto flex w-full max-w-[1140px] flex-col gap-12 px-6 py-12">
        {/* Problem Section */}
        <section className="grid grid-cols-1 gap-8 pt-8 md:grid-cols-2">
          {/* Left Column */}
          <ScrollReveal direction="left" delay={0} distance={30}>
            <div className="flex flex-col gap-4">
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#D8CFBC]">
                THE PROBLEM
              </p>
              <h2
                className="max-w-[520px] text-4xl font-bold leading-[1.1] tracking-tight text-[#FFFBF4] md:text-5xl"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Your portfolio shouldn&apos;t be this much work.
              </h2>
              <LineDraw className="mt-2 h-px bg-gradient-to-r from-[#7a3b3b]/60 to-transparent w-32" delay={0.4} />
            </div>
          </ScrollReveal>

          {/* Right Column - Pain Points */}
          <StaggerGrid className="flex flex-col gap-3">
            {painPoints.map((point, index) => (
              <StaggerItem key={point.label}>
                <motion.div
                  whileHover={{
                    x: 6,
                    borderColor: "rgba(122,59,59,0.4)",
                    backgroundColor: "rgba(20,20,20,0.8)",
                  }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#141414] p-4 cursor-default"
                >
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="h-full w-1 shrink-0 rounded-full bg-[#7a3b3b]"
                  />
                  <point.icon className="size-5 shrink-0 text-[#D8CFBC]" />
                  <span className="text-sm text-[#FFFBF4]">{point.label}</span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </section>

        {/* Solution Section */}
        <section className="flex flex-col gap-6 pt-8">
          <div>
            <ScrollReveal direction="up" delay={0}>
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#D8CFBC]">
                THE SOLUTION
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <h2
                className="max-w-[860px] text-4xl font-bold leading-[1.1] tracking-tight text-[#FFFBF4] md:text-5xl"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                One dashboard. One database. One API. Unlimited portfolios Projects.
              </h2>
            </ScrollReveal>
            <LineDraw className="mt-3 h-px bg-gradient-to-r from-[#4ADE80]/40 via-[#4ADE80]/20 to-transparent w-48" delay={0.3} />
          </div>

          {/* Steps */}
          <div ref={stepLineRef} className="relative grid grid-cols-1 gap-6 pt-4 md:grid-cols-3">
            {/* Animated dashed line connector */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={stepLineInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute left-[16.5%] right-[16.5%] top-[30px] hidden border-t border-white/10 border-dashed md:block origin-left"
            />

            {solutionSteps.map((step, index) => (
              <ScrollReveal key={step.title} direction="up" delay={0.2 + index * 0.15} distance={30}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-3"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.4 + index * 0.15,
                      }}
                      className="flex items-center justify-center"
                    >
                      <step.icon className="size-5 text-[#4ADE80]" />
                    </motion.div>
                    <span className="text-base font-medium text-[#FFFBF4]">
                      {step.title}
                    </span>
                  </div>
                  <p className="max-w-[300px] text-sm leading-relaxed text-[#D8CFBC]">
                    {step.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
