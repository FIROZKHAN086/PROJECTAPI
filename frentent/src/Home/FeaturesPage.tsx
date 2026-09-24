"use client";

import { motion } from "framer-motion";
import {
  LayoutGrid,
  SlidersHorizontal,
  Database,
  Globe,
  TerminalSquare,
  LockKeyhole,
  ArrowUpRight,
} from "lucide-react";
import { ScrollReveal, StaggerGrid, StaggerItem } from "@/src/lib/animations";

const features = [
  {
    icon: LayoutGrid,
    index: "01",
    title: "Project Manager",
    description: "Create, update, archive, duplicate, feature, search, filter and sort every project from one place — no hardcoded changes anywhere.",
  },
  {
    icon: SlidersHorizontal,
    index: "02",
    title: "Rich Project Fields",
    description: "Title, slug, description, images, stack, achievements and custom fields, served back to you as clean JSON.",
  },
  {
    icon: Database,
    index: "03",
    title: "Secure Media Storage",
    description: "Images, videos, GIFs and documents stored and served through ImageKit and Cloudinary, referenced directly from your data.",
  },
  {
    icon: Globe,
    index: "04",
    title: "Public REST API",
    description: "Get your project data as JSON at an auto-generated endpoint — every change flows to your site instantly.",
  },
  {
    icon: TerminalSquare,
    index: "05",
    title: "API Playground",
    description: "Test requests live and copy ready-made fetch, axios, React hook and Next.js snippets that consume your JSON.",
  },
  {
    icon: LockKeyhole,
    index: "06",
    title: "Auth & Access",
    description: "Email and Google sign-in with JWT-protected routes to keep your data yours alone.",
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
    <section
      id="features"
      className="relative overflow-hidden bg-[#0A0A0A] text-[#FFFBF4] font-sans antialiased"
    >
      <main className="max-w-[1140px] mx-auto px-6 py-24 sm:py-32">
        {/* Framework Strip */}
        <div className="flex flex-col items-center gap-8 pb-24">
          <ScrollReveal direction="up" delay={0}>
            <p className="text-sm text-[#FFFBF4]/60 tracking-widest uppercase">
              Works with everything you already use
            </p>
          </ScrollReveal>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {frameworks.map((fw, i) => (
              <ScrollReveal key={fw} direction="up" delay={0.1 + i * 0.05} distance={15}>
                <span className="group inline-flex cursor-default items-center gap-2 text-base font-medium text-[#FFFBF4]/70 transition-all duration-300 hover:text-[#FFFBF4]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FFFBF4]/20 transition-colors duration-300 group-hover:bg-[#FFFBF4]" />
                  {fw}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Feature Grid */}
        <div className="flex flex-col gap-16">
          <header className="flex flex-col items-center gap-6 text-center">
            <ScrollReveal direction="up" delay={0}>
              <div className="flex items-center justify-center gap-3">
                <span className="hidden h-px w-12 bg-[#FFFBF4]/30 sm:block" />
                <span className="text-xs font-medium tracking-[0.25em] uppercase text-[#FFFBF4]/60">
                  Features
                </span>
                <span className="hidden h-px w-12 bg-[#FFFBF4]/30 sm:block" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <h2
                className="max-w-4xl text-4xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-[1.08] text-[#FFFBF4]"
                style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
              >
                A complete site for managing
                <br />
                developer projects.
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2}>
              <p className="max-w-2xl text-lg leading-relaxed text-[#FFFBF4]/70">
                Developers get an API that returns their project data as JSON,
                so they never have to make hardcoded changes again.
              </p>
            </ScrollReveal>
          </header>

          <StaggerGrid className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => (
              <StaggerItem key={feature.title} className="h-full">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="group relative flex h-full flex-col justify-between gap-6 rounded-2xl border border-[#FFFBF4]/10 bg-[#FFFBF4]/[0.03] p-7 text-left transition-colors duration-300 hover:border-[#FFFBF4]/25"
                >
                  <span className="pointer-events-none absolute right-5 top-5 font-mono text-xs text-[#FFFBF4]/30 tabular-nums">
                    {feature.index}
                  </span>

                  <ArrowUpRight className="pointer-events-none absolute right-6 top-6 h-4 w-4 translate-x-1 translate-y-1 text-[#FFFBF4]/0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-[#FFFBF4]/70" />

                  <div className="flex items-center justify-between">
                    <motion.div
                      whileHover={{ rotate: -8, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="grid h-11 w-11 place-items-center rounded-lg border border-[#FFFBF4]/10 bg-[#FFFBF4]/[0.06]"
                    >
                      <feature.icon className="size-5 text-[#FFFBF4]" />
                    </motion.div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3
                      className="text-lg font-semibold text-[#FFFBF4]"
                      style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#FFFBF4]/60">
                      {feature.description}
                    </p>
                  </div>

                  <span className="block h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[#FFFBF4]/40 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </main>
    </section>
  );
}