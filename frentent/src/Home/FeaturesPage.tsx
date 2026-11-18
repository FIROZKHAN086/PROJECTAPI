"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  SlidersHorizontal,
  Database,
  Globe,
  TerminalSquare,
  LockKeyhole,
  ArrowUpRight,
  Sparkles,
  Zap,
  CheckCircle2,
  Copy,
  Check,
  Eye,
  Key,
  Shield,
  Layers,
} from "lucide-react";
import { ScrollReveal, StaggerGrid, StaggerItem, GlowCard } from "@/src/lib/animations";

const frameworks = [
  "Next.js",
  "React",
  "Astro",
  "Vue",
  "Svelte",
  "Nuxt",
  "Remix",
  "Vite",
  "TailwindCSS",
  "Static HTML",
];

const features = [
  {
    icon: LayoutGrid,
    index: "01",
    title: "Central Project Command",
    subtitle: "Manage entire portfolios visually",
    description:
      "Create, update, archive, duplicate, feature, and sort every project from one place. Every change synchronizes to your live API in milliseconds.",
    badge: "Instant Sync",
    type: "manager",
  },
  {
    icon: SlidersHorizontal,
    index: "02",
    title: "Dynamic Schema Fields",
    subtitle: "Custom data models without SQL",
    description:
      "Slug, markdown body, tech stacks, client deliverables, metrics, and custom metadata serialized into clean, validated JSON schemas.",
    badge: "Type Safe",
    type: "fields",
  },
  {
    icon: Database,
    index: "03",
    title: "High-Speed Media Vault",
    subtitle: "Cloudinary & ImageKit powered",
    description:
      "Upload project screenshots, GIFs, and demo videos. Automated AVIF/WebP conversion with responsive srcset optimization and multi-CDN edge delivery.",
    badge: "-85% Size",
    type: "media",
  },
  {
    icon: Globe,
    index: "04",
    title: "Ultra-Fast REST & GraphQL",
    subtitle: "Worldwide sub-15ms edge delivery",
    description:
      "Clean REST endpoints auto-generated per API key. Built-in pagination, query filtering, and instant edge cache invalidation across 300+ PoPs.",
    badge: "Sub-15ms Edge",
    type: "api",
  },
  {
    icon: TerminalSquare,
    index: "05",
    title: "Developer API Studio",
    subtitle: "Test endpoints live in browser",
    description:
      "Interactive request builder with real-time response inspection, latency tracking, and ready-made Next.js, React, and cURL snippets.",
    badge: "Zero Setup",
    type: "playground",
  },
  {
    icon: LockKeyhole,
    index: "06",
    title: "Scoped Security & RBAC",
    subtitle: "Zero-trust API key governance",
    description:
      "Generate read-only public tokens for portfolio sites and secret admin keys for backend integrations with JWT-protected session isolation.",
    badge: "Encrypted Keys",
    type: "auth",
  },
];

export default function FeaturesPage() {
  const [copiedKey, setCopiedKey] = useState(false);
  const [sampleProjectStatus, setSampleProjectStatus] = useState(true);

  const copySampleKey = () => {
    navigator.clipboard.writeText("proj_live_99f2b8471c4a0");
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#0A0A0A] text-[#FFFBF4] font-sans antialiased py-24 sm:py-32"
    >
      <main className="max-w-[1140px] mx-auto px-6">
        {/* Framework Marquee & Strip */}
        <div className="flex flex-col items-center gap-8 pb-20">
          <ScrollReveal direction="up" delay={0}>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFFBF4]/15 bg-white/[0.03] px-4 py-1.5 text-xs text-[#FFFBF4]/80 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-[#4ADE80]" />
              <span className="tracking-widest uppercase text-[11px] font-mono">
                UNIVERSAL STACK COMPATIBILITY
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl">
              {frameworks.map((fw) => (
                <span
                  key={fw}
                  className="group inline-flex items-center gap-2 rounded-xl border border-[#FFFBF4]/10 bg-[#161712]/70 px-4 py-2 text-xs sm:text-sm font-medium text-[#FFFBF4]/80 transition-all duration-300 hover:border-[#4ADE80]/40 hover:bg-[#161712] hover:text-[#FFFBF4]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]/60 group-hover:bg-[#4ADE80] transition-colors" />
                  {fw}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Section Header */}
        <div className="flex flex-col items-center gap-6 text-center pb-16">
          <ScrollReveal direction="up" delay={0}>
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[#FFFBF4]/30" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#4ADE80]">
                ARCHITECTURE &amp; CAPABILITIES
              </span>
              <span className="h-px w-10 bg-[#FFFBF4]/30" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <h2
              className="max-w-3xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-[#FFFBF4]"
              style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
            >
              Engineered for velocity.
              <br />
              <span className="text-[#FFFBF4]/80">Zero maintenance.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-[#FFFBF4]/70">
              Stop rebuilding your portfolio and clients&apos; projects from scratch.
              Manage your content once in a polished dashboard and let your live API
              handle the rest.
            </p>
          </ScrollReveal>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <ScrollReveal
              key={feature.title}
              direction="up"
              delay={0.1 + (i % 3) * 0.08}
              className="h-full"
            >
              <GlowCard className="h-full">
                <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-[#FFFBF4]/10 bg-[#161712]/60 p-7 backdrop-blur-md transition-all duration-300 hover:border-[#4ADE80]/40 hover:bg-[#161712]/90 hover:shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
                  {/* Top Bar: Icon, Index & Badge */}
                  <div className="flex items-center justify-between pb-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl border border-[#FFFBF4]/15 bg-white/[0.04] text-[#4ADE80] transition-transform duration-300 group-hover:scale-110 group-hover:border-[#4ADE80]/40">
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full border border-[#4ADE80]/30 bg-[#4ADE80]/10 px-2.5 py-0.5 text-[10px] font-mono font-medium text-[#4ADE80]">
                        {feature.badge}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#FFFBF4]/40 tabular-nums">
                      {feature.index}
                    </span>
                  </div>

                  {/* Micro-Interactive Mockup Inside Bento Card */}
                  <div className="my-4 rounded-xl border border-[#FFFBF4]/10 bg-black/40 p-3.5 text-xs font-mono">
                    {feature.type === "manager" && (
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 truncate">
                          <span className="h-2 w-2 rounded-full bg-[#4ADE80]" />
                          <span className="text-[#FFFBF4] truncate font-sans text-xs font-medium">
                            Portfolio Showcase v2
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSampleProjectStatus(!sampleProjectStatus)}
                          className={`rounded px-2 py-0.5 text-[10px] font-mono transition-colors cursor-pointer ${
                            sampleProjectStatus
                              ? "bg-[#4ADE80]/20 text-[#4ADE80]"
                              : "bg-white/10 text-[#FFFBF4]/60"
                          }`}
                        >
                          {sampleProjectStatus ? "PUBLISHED" : "DRAFT"}
                        </button>
                      </div>
                    )}

                    {feature.type === "fields" && (
                      <div className="space-y-1.5 text-[11px]">
                        <div className="flex justify-between text-[#FFFBF4]/70">
                          <span>slug:</span>
                          <span className="text-[#4ADE80]">&quot;ai-canvas-builder&quot;</span>
                        </div>
                        <div className="flex justify-between text-[#FFFBF4]/70">
                          <span>stack:</span>
                          <span className="text-[#FFFBF4]/90">[&quot;Next.js&quot;, &quot;WebGL&quot;]</span>
                        </div>
                      </div>
                    )}

                    {feature.type === "media" && (
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#FFFBF4]/70">hero_banner.png</span>
                        <span className="rounded bg-[#4ADE80]/15 px-1.5 py-0.5 text-[#4ADE80]">
                          AVIF (420 KB)
                        </span>
                      </div>
                    )}

                    {feature.type === "api" && (
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="truncate text-[#FFFBF4]/80">GET /api/v1/projects</span>
                        <span className="text-[#4ADE80] shrink-0 font-bold">12ms · 200 OK</span>
                      </div>
                    )}

                    {feature.type === "playground" && (
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#4ADE80]">curl -X GET /v1/projects</span>
                        <ArrowUpRight className="h-3 w-3 text-[#FFFBF4]/50" />
                      </div>
                    )}

                    {feature.type === "auth" && (
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#FFFBF4]/70">proj_live_99f2b8...</span>
                        <button
                          type="button"
                          onClick={copySampleKey}
                          className="flex items-center gap-1 text-[#4ADE80] hover:underline cursor-pointer"
                        >
                          {copiedKey ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          <span>{copiedKey ? "Copied" : "Copy"}</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2">
                    <h3
                      className="text-lg font-bold text-[#FFFBF4] tracking-tight"
                      style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-xs font-medium text-[#4ADE80]">
                      {feature.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#FFFBF4]/60">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bottom Hover Line */}
                  <div className="pt-4">
                    <span className="block h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[#4ADE80] to-transparent transition-transform duration-300 group-hover:scale-x-100" />
                  </div>
                </div>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>
      </main>
    </section>
  );
}
