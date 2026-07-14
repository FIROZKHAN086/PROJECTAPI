"use client";

import { motion } from "framer-motion";
import {
  LayoutGrid,
  SlidersHorizontal,
  Database,
  Globe,
  TerminalSquare,
  LockKeyhole,
} from "lucide-react";
import {
  ScrollReveal,
  TextReveal,
  StaggerGrid,
  StaggerItem,
  LineDraw,
} from "@/src/lib/animations";

const features = [
  {
    icon: LayoutGrid,
    title: "Project Manager",
    description: "create, update, archive, duplicate, feature, search, filter, sort",
  },
  {
    icon: SlidersHorizontal,
    title: "Rich Project Fields",
    description: "title, slug, description, Images, stack, achievements, custom fields",
  },
  {
    icon: Database,
    title: "Secure Media Storage",
    description: "images, videos, GIFs, documents stored via ImageKit/Cloudinary",
  },
  {
    icon: Globe,
    title: "Public REST API",
    description: "auto-generated endpoint, filtering, sorting, search",
  },
  {
    icon: TerminalSquare,
    title: "API Playground",
    description: "test requests live, copy fetch/axios/React hook/Next.js snippets",
  },
  {
    icon: LockKeyhole,
    title: "Auth & Access",
    description: "Email, Google,  JWT-protected routes",
  },
];

const frameworks = [
  "React",
  "Next.js",
  "Vue",
  "Angular",
  "Astro",
  "Nuxt",
  "Svelte",
  "Static HTML",
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFBF4] font-sans antialiased">
      <main className="max-w-[1140px] mx-auto px-6 py-12 flex flex-col gap-16">
        {/* Framework Strip */}
        <section className="flex flex-col items-center gap-6 pt-8">
          <ScrollReveal direction="up" delay={0}>
            <p className="text-sm font-medium text-[#D8CFBC] tracking-widest uppercase">
              Works with everything you already use
            </p>
          </ScrollReveal>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 opacity-60 text-[#D8CFBC] text-sm font-medium">
            {frameworks.map((fw, i) => (
              <ScrollReveal key={fw} direction="up" delay={0.1 + i * 0.05} distance={15}>
                <motion.span
                  whileHover={{ color: "#4ADE80", scale: 1.08 }}
                  className="inline-block cursor-default transition-colors"
                >
                  {fw}
                </motion.span>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="flex flex-col gap-8">
          <div className="space-y-3">
            <ScrollReveal direction="left" delay={0}>
              <p className="text-xs font-medium text-[#D8CFBC] uppercase tracking-[0.2em]">
                Everything you need
              </p>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.1}>
              <h2
                className="max-w-3xl text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] text-[#FFFBF4]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Built for how developers actually ship.
              </h2>
            </ScrollReveal>
            <LineDraw className="mt-2 h-px bg-gradient-to-r from-[#4ADE80]/40 via-[#4ADE80]/20 to-transparent w-48" delay={0.3} />
          </div>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <motion.div
                  whileHover={{
                    y: -4,
                    borderColor: "rgba(74,222,128,0.2)",
                    boxShadow: "0 8px 30px rgba(74,222,128,0.06)",
                  }}
                  transition={{ duration: 0.25 }}
                  className="rounded-xl border border-white/10 bg-[#141414] p-6 flex flex-col gap-3 transition-colors cursor-default h-full"
                >
                  <motion.div
                    whileHover={{ rotate: -8, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <feature.icon className="size-5 text-[#FFFBF4]" />
                  </motion.div>
                  <h3
                    className="text-lg font-semibold text-[#FFFBF4]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#D8CFBC] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </section>
      </main>
    </div>
  );
}
