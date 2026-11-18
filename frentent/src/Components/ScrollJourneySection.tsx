"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Database,
  Globe2,
  Image as ImageIcon,
  Code2,
  Zap,
  CheckCircle2,
  Copy,
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Layers,
  Cpu,
  ArrowUpRight,
  ShieldCheck,
  Activity,
} from "lucide-react";
import Lenis from "lenis";

interface JourneyStation {
  id: string;
  stationNum: string;
  eyebrow: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  accent: string;
}

const STATIONS: JourneyStation[] = [
  {
    id: "schema",
    stationNum: "01",
    eyebrow: "STATION 01 // DATA CORE",
    title: "Zero-Migration Dynamic Schema",
    tagline: "Your project models, configured visually in seconds.",
    description:
      "Define rich developer project fields, media galleries, git repos, tech stacks, and custom JSON metadata without touching a database migration or writing boilerplate SQL schemas.",
    tags: ["Visual Schema", "Typed Fields", "Instant Serialization", "Version History"],
    metrics: [
      { label: "Schema Setup", value: "30 sec" },
      { label: "Data Integrity", value: "Strict Type Check" },
    ],
    accent: "#4ADE80",
  },
  {
    id: "edge",
    stationNum: "02",
    eyebrow: "STATION 02 // GLOBAL DISTRIBUTION",
    title: "Global Edge REST Engine",
    tagline: "Ultra-low latency across 300+ Edge Points of Presence.",
    description:
      "Every project update auto-invalidates worldwide cache keys. Query your data with advanced filters, pagination, category sorting, and full-text search with sub-15ms edge response times.",
    tags: ["Worldwide PoPs", "Instant Cache Purge", "Brotli/Gzip", "Auto Pagination"],
    metrics: [
      { label: "Edge Latency", value: "< 14ms" },
      { label: "Global Coverage", value: "300+ PoPs" },
    ],
    accent: "#4ADE80",
  },
  {
    id: "media",
    stationNum: "03",
    eyebrow: "STATION 03 // ASSET ACCELERATION",
    title: "Automated Media Transformation",
    tagline: "Next-gen AVIF & WebP delivery straight from edge CDN.",
    description:
      "Upload high-res screenshots, demo screencasts, and SVG icons. ProjectAPI compresses, converts, and generates fluid responsive srcset attributes automatically via Cloudinary and ImageKit.",
    tags: ["AVIF / WebP Auto", "Lossless Comp", "-85% File Size", "Adaptive Bitrate"],
    metrics: [
      { label: "Bandwidth Saved", value: "85%" },
      { label: "Format Transcode", value: "Realtime" },
    ],
    accent: "#4ADE80",
  },
  {
    id: "sdk",
    stationNum: "04",
    eyebrow: "STATION 04 // UNIVERSAL CONSUMPTION",
    title: "One Snippet. Every Modern Stack.",
    tagline: "Copy typed queries into React, Next.js, Astro, or Svelte.",
    description:
      "No custom API client dependencies required. Copy ready-made, type-safe code snippets that hydrate your portfolio, agency showcase, or client sites with automatic revalidation.",
    tags: ["Next.js Server Actions", "React Hook", "Astro SSG", "Zero-Config Types"],
    metrics: [
      { label: "TypeScript Ready", value: "100%" },
      { label: "Client Bundle", value: "0 KB" },
    ],
    accent: "#4ADE80",
  },
];

export default function ScrollJourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [selectedSdkTab, setSelectedSdkTab] = useState<"nextjs" | "react" | "astro" | "curl">("nextjs");
  const [livePingActive, setLivePingActive] = useState(false);
  const [edgeLatency, setEdgeLatency] = useState(12);

  // Scroll tracking across the 400vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Calculate active station from scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const index = Math.min(
        STATIONS.length - 1,
        Math.floor(latest * STATIONS.length)
      );
      setActiveStationIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Jump to specific station smoothly
  const jumpToStation = (index: number) => {
    if (!containerRef.current) return;
    const start = containerRef.current.offsetTop;
    const height = containerRef.current.offsetHeight - window.innerHeight;
    const targetY = start + (index / (STATIONS.length - 1)) * height;

    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) {
      lenis.scrollTo(targetY, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const triggerLivePing = () => {
    setLivePingActive(true);
    setEdgeLatency(Math.floor(Math.random() * 6) + 11);
    setTimeout(() => setLivePingActive(false), 800);
  };

  const currentStation = STATIONS[activeStationIndex];

  // 3D Camera flight transform based on smooth progress
  const cameraZ = useTransform(smoothProgress, [0, 1], [0, -120]);
  const cameraRotateX = useTransform(smoothProgress, [0, 0.5, 1], [3, 0, -3]);
  const stageScale = useTransform(smoothProgress, [0, 0.5, 1], [0.98, 1, 0.98]);

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative h-[380vh] bg-[#0E0F0A] text-[#FFFBF4]"
      aria-label="Interactive Cinematic Journey"
    >
      {/* Sticky Fullscreen Chamber Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-14">
        {/* Background glow and subtle perspective grid */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full blur-[140px] opacity-25 transition-all duration-700"
            style={{
              background: `radial-gradient(circle, ${currentStation.accent} 0%, rgba(17,18,13,0) 70%)`,
            }}
          />
          {/* Subtle horizon line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFFBF4]/10 to-transparent" />
        </div>

        {/* Top Chamber Bar: Station Indicator & Progress */}
        <div className="relative z-20 flex items-center justify-between border-b border-[#FFFBF4]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#4ADE80]/30 bg-[#4ADE80]/10 font-mono text-xs font-bold text-[#4ADE80]">
              {currentStation.stationNum}
            </span>
            <div>
              <p className="text-[10px] font-mono tracking-widest uppercase text-[#FFFBF4]/50">
                CINEMATIC ENGINE // FLIGHT
              </p>
              <h2 className="text-xs sm:text-sm font-semibold tracking-wide text-[#FFFBF4]">
                {currentStation.title}
              </h2>
            </div>
          </div>

          {/* Station Tabs */}
          <div className="hidden md:flex items-center gap-1.5 rounded-full border border-[#FFFBF4]/10 bg-[#161712]/80 p-1 backdrop-blur-md">
            {STATIONS.map((station, i) => (
              <button
                key={station.id}
                type="button"
                onClick={() => jumpToStation(i)}
                className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 cursor-pointer ${
                  activeStationIndex === i
                    ? "bg-[#4ADE80] text-[#0A0A0A] font-semibold shadow-[0_0_12px_rgba(74,222,128,0.4)]"
                    : "text-[#FFFBF4]/60 hover:text-[#FFFBF4] hover:bg-white/[0.04]"
                }`}
              >
                <span>{station.stationNum}</span>
                <span className="hidden xl:inline">{station.title.split(" ")[0]}</span>
              </button>
            ))}
          </div>

          {/* Quick jump navigation */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={activeStationIndex === 0}
              onClick={() => jumpToStation(Math.max(0, activeStationIndex - 1))}
              aria-label="Previous station"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#FFFBF4]/10 bg-white/[0.02] text-[#FFFBF4]/70 transition-all hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              disabled={activeStationIndex === STATIONS.length - 1}
              onClick={() => jumpToStation(Math.min(STATIONS.length - 1, activeStationIndex + 1))}
              aria-label="Next station"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#FFFBF4]/10 bg-white/[0.02] text-[#FFFBF4]/70 transition-all hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Central Stage: Left Copy Narrative + Right 3D Visual Chamber */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-6">
          {/* Left Narrative Column */}
          <motion.div
            key={currentStation.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col gap-5"
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#4ADE80]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{currentStation.eyebrow}</span>
            </div>

            <h3
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FFFBF4] leading-tight"
              style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
            >
              {currentStation.title}
            </h3>

            <p className="text-sm sm:text-base font-medium text-[#FFFBF4]/90">
              {currentStation.tagline}
            </p>

            <p className="text-xs sm:text-sm leading-relaxed text-[#FFFBF4]/60">
              {currentStation.description}
            </p>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {currentStation.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#FFFBF4]/15 bg-white/[0.03] px-3 py-1 text-xs text-[#FFFBF4]/80 backdrop-blur-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Station Metrics Card */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#FFFBF4]/10">
              {currentStation.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-[#FFFBF4]/10 bg-[#161712]/60 p-3"
                >
                  <p className="text-[11px] font-mono uppercase text-[#FFFBF4]/50">
                    {metric.label}
                  </p>
                  <p className="text-base sm:text-lg font-bold text-[#FFFBF4] mt-0.5">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right 3D Visual Chamber */}
          <motion.div
            style={{
              scale: stageScale,
              rotateX: cameraRotateX,
              transformPerspective: 1200,
            }}
            className="lg:col-span-7 relative w-full h-[360px] sm:h-[420px] lg:h-[480px] rounded-2xl sm:rounded-3xl border border-[#FFFBF4]/15 bg-[#141510]/90 p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden flex flex-col justify-between"
          >
            {/* Ambient inner mesh glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#4ADE80]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Stage Visual Based on Station */}
            {activeStationIndex === 0 && (
              /* Station 1: Schema & Data Model Visualizer */
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-between pb-3 border-b border-[#FFFBF4]/10">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#FFFBF4]/70">
                    <Database className="h-4 w-4 text-[#4ADE80]" />
                    <span>Schema Explorer // ProjectAPI</span>
                  </div>
                  <span className="rounded-full bg-[#4ADE80]/10 px-2 py-0.5 text-[10px] font-mono text-[#4ADE80]">
                    Schema Ready
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-auto py-2">
                  <div className="rounded-xl border border-[#FFFBF4]/15 bg-black/40 p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#FFFBF4]">project.title</span>
                      <span className="text-[10px] font-mono text-[#4ADE80]">String · Required</span>
                    </div>
                    <div className="rounded-md bg-white/[0.04] p-2 text-xs font-mono text-[#FFFBF4]/80">
                      &quot;Fintech Analytics Platform&quot;
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#FFFBF4]/15 bg-black/40 p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#FFFBF4]">project.stack</span>
                      <span className="text-[10px] font-mono text-[#4ADE80]">Array&lt;Tag&gt;</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {["Next.js", "TypeScript", "Tailwind", "Postgres"].map((s) => (
                        <span key={s} className="rounded bg-[#4ADE80]/15 px-2 py-0.5 text-[10px] text-[#4ADE80]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#FFFBF4]/15 bg-black/40 p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#FFFBF4]">project.media</span>
                      <span className="text-[10px] font-mono text-[#4ADE80]">MediaGallery</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#FFFBF4]/60">
                      <ImageIcon className="h-3.5 w-3.5 text-[#4ADE80]" />
                      <span>4 Assets (WebP, AVIF auto-converted)</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#FFFBF4]/15 bg-black/40 p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#FFFBF4]">project.metrics</span>
                      <span className="text-[10px] font-mono text-[#4ADE80]">JSON Custom</span>
                    </div>
                    <div className="text-[11px] font-mono text-[#FFFBF4]/70">
                      {`{ "stars": 1420, "license": "MIT" }`}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#FFFBF4]/10 text-xs text-[#FFFBF4]/60">
                  <span className="font-mono">Sync Mode: Real-time Multi-tenant</span>
                  <span className="text-[#4ADE80] flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Auto-validated
                  </span>
                </div>
              </div>
            )}

            {activeStationIndex === 1 && (
              /* Station 2: Global Edge REST Engine */
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-between pb-3 border-b border-[#FFFBF4]/10">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#FFFBF4]/70">
                    <Globe2 className="h-4 w-4 text-[#4ADE80]" />
                    <span>Edge Network Monitor // 300+ PoPs</span>
                  </div>
                  <button
                    type="button"
                    onClick={triggerLivePing}
                    className="flex items-center gap-1.5 rounded-full border border-[#4ADE80]/40 bg-[#4ADE80]/15 px-2.5 py-1 text-[11px] font-mono text-[#4ADE80] transition-colors hover:bg-[#4ADE80]/25 cursor-pointer"
                  >
                    <Activity className={`h-3 w-3 ${livePingActive ? "animate-spin" : ""}`} />
                    <span>Ping Edge ({edgeLatency}ms)</span>
                  </button>
                </div>

                <div className="my-auto space-y-3 py-2">
                  <div className="rounded-xl border border-[#FFFBF4]/15 bg-black/50 p-3 font-mono text-xs">
                    <div className="flex items-center justify-between text-[#FFFBF4]/60 mb-1">
                      <span>ENDPOINT ROUTE</span>
                      <span className="text-[#4ADE80]">HTTP/3 200 OK</span>
                    </div>
                    <p className="text-[#FFFBF4] break-all">
                      GET https://api.projectapi.dev/v1/projects?featured=true
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { code: "iad1", name: "US East", ping: `${edgeLatency}ms`, status: "OPTIMAL" },
                      { code: "fra1", name: "EU Central", ping: "18ms", status: "OPTIMAL" },
                      { code: "sin1", name: "AP South", ping: "24ms", status: "OPTIMAL" },
                      { code: "hkg1", name: "AP East", ping: "22ms", status: "OPTIMAL" },
                    ].map((node) => (
                      <div
                        key={node.code}
                        className="rounded-lg border border-[#FFFBF4]/10 bg-white/[0.02] p-2.5 text-center"
                      >
                        <p className="text-[10px] font-mono text-[#FFFBF4]/50">{node.code.toUpperCase()}</p>
                        <p className="text-xs font-bold text-[#FFFBF4]">{node.name}</p>
                        <p className="text-xs font-mono font-semibold text-[#4ADE80] mt-1">{node.ping}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#FFFBF4]/10 text-xs text-[#FFFBF4]/60">
                  <span>Cache-Control: public, s-maxage=86400, stale-while-revalidate</span>
                  <span className="font-mono text-[#4ADE80]">HIT (Edge L1)</span>
                </div>
              </div>
            )}

            {activeStationIndex === 2 && (
              /* Station 3: Automated Media Engine */
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-between pb-3 border-b border-[#FFFBF4]/10">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#FFFBF4]/70">
                    <ImageIcon className="h-4 w-4 text-[#4ADE80]" />
                    <span>Media Engine // Auto Transcode &amp; Optimize</span>
                  </div>
                  <span className="rounded-full bg-[#4ADE80]/10 px-2 py-0.5 text-[10px] font-mono text-[#4ADE80]">
                    -86% Saved
                  </span>
                </div>

                <div className="my-auto space-y-3 py-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-xl border border-red-500/20 bg-red-950/10 p-3.5 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#FFFBF4]">Original Upload</span>
                        <span className="text-[10px] font-mono text-red-400">Unoptimized PNG</span>
                      </div>
                      <p className="text-xl font-mono font-bold text-[#FFFBF4]">3.8 MB</p>
                      <p className="text-[11px] text-[#FFFBF4]/50">Slow initial load, high CDN bandwidth consumption</p>
                    </div>

                    <div className="rounded-xl border border-[#4ADE80]/30 bg-[#4ADE80]/10 p-3.5 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#FFFBF4]">ProjectAPI Output</span>
                        <span className="text-[10px] font-mono text-[#4ADE80]">AVIF / WebP Auto</span>
                      </div>
                      <p className="text-xl font-mono font-bold text-[#4ADE80]">380 KB (-90%)</p>
                      <p className="text-[11px] text-[#FFFBF4]/70">Zero quality loss, progressive decode, instant paint</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#FFFBF4]/10 bg-black/40 p-3">
                    <p className="text-[10px] font-mono text-[#FFFBF4]/50 mb-1.5">
                      GENERATED RESPONSIVE SRCSET
                    </p>
                    <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
                      <span className="rounded bg-white/[0.06] px-2 py-0.5 text-[#FFFBF4]/80">480w</span>
                      <span className="rounded bg-white/[0.06] px-2 py-0.5 text-[#FFFBF4]/80">768w</span>
                      <span className="rounded bg-white/[0.06] px-2 py-0.5 text-[#FFFBF4]/80">1200w</span>
                      <span className="rounded bg-[#4ADE80]/20 px-2 py-0.5 text-[#4ADE80]">2048w (Retina)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#FFFBF4]/10 text-xs text-[#FFFBF4]/60">
                  <span>Encrypted Storage: Cloudinary &amp; ImageKit multi-cloud</span>
                  <span className="text-[#4ADE80]">CDN Verified</span>
                </div>
              </div>
            )}

            {activeStationIndex === 3 && (
              /* Station 4: Universal Multi-Framework Hydration */
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-between pb-3 border-b border-[#FFFBF4]/10">
                  <div className="flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-[#4ADE80]" />
                    <div className="flex gap-1">
                      {(["nextjs", "react", "astro", "curl"] as const).map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setSelectedSdkTab(tab)}
                          className={`rounded-md px-2.5 py-0.5 text-xs font-mono transition-colors cursor-pointer ${
                            selectedSdkTab === tab
                              ? "bg-[#4ADE80] text-[#0A0A0A] font-bold"
                              : "text-[#FFFBF4]/60 hover:text-[#FFFBF4]"
                          }`}
                        >
                          {tab === "nextjs" ? "Next.js" : tab === "react" ? "React" : tab === "astro" ? "Astro" : "cURL"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(
                        selectedSdkTab === "nextjs"
                          ? `// In your Next.js page or component\nexport default async function Page() {\n  const res = await fetch('https://api.projectapi.dev/v1/projects', {\n    headers: { 'Authorization': 'Bearer YOUR_API_KEY' },\n    next: { revalidate: 3600 }\n  });\n  const { data: projects } = await res.json();\n  return <ProjectsGrid items={projects} />;\n}`
                          : `curl -X GET https://api.projectapi.dev/v1/projects \\\n  -H "Authorization: Bearer YOUR_API_KEY"`
                      )
                    }
                    className="flex items-center gap-1 rounded-md border border-[#FFFBF4]/20 bg-white/[0.04] px-2.5 py-1 text-xs text-[#FFFBF4] transition-colors hover:bg-white/10 cursor-pointer"
                  >
                    {copiedSnippet ? (
                      <>
                        <Check className="h-3 w-3 text-[#4ADE80]" />
                        <span className="text-[#4ADE80]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="my-auto py-2">
                  <pre className="rounded-xl border border-[#FFFBF4]/10 bg-black/60 p-3.5 font-mono text-[11px] sm:text-xs leading-relaxed text-[#FFFBF4]/90 overflow-x-auto">
                    {selectedSdkTab === "nextjs" && (
                      <code>
                        <span className="text-[#FFFBF4]/50">// Next.js App Router (Server Component)</span>{"\n"}
                        <span className="text-[#4ADE80]">export default async function</span>{" "}
                        <span className="text-[#FFFBF4]">Portfolio()</span> {"{\n"}
                        {"  "}
                        <span className="text-[#4ADE80]">const</span> res ={" "}
                        <span className="text-[#4ADE80]">await</span> fetch(
                        <span className="text-[#D8CFBC]">&apos;https://api.projectapi.dev/v1/projects&apos;</span>, {"{\n"}
                        {"    "}headers: {"{ "}
                        <span className="text-[#D8CFBC]">&apos;Authorization&apos;</span>:{" "}
                        <span className="text-[#D8CFBC]">&apos;Bearer proj_live_sec_99a&apos;</span>
                        {" },\n"}
                        {"    "}next: {"{ revalidate: 60 }\n"}
                        {"  }"});{"\n"}
                        {"  "}
                        <span className="text-[#4ADE80]">const</span> {"{ data: projects }"} ={" "}
                        <span className="text-[#4ADE80]">await</span> res.json();{"\n"}
                        {"  "}
                        <span className="text-[#4ADE80]">return</span> &lt;
                        <span className="text-[#4ADE80]">ProjectShowcase</span> items={"{"}projects{"}"} /&gt;;{"\n"}
                        {"}"}
                      </code>
                    )}
                    {selectedSdkTab === "react" && (
                      <code>
                        <span className="text-[#FFFBF4]/50">// React Query Hook</span>{"\n"}
                        <span className="text-[#4ADE80]">import</span> {"{ useQuery }"} from{" "}
                        <span className="text-[#D8CFBC]">&apos;@tanstack/react-query&apos;</span>;{"\n\n"}
                        <span className="text-[#4ADE80]">export function</span> useProjects() {"{\n"}
                        {"  "}return useQuery({"{ \n"}
                        {"    "}queryKey: [<span className="text-[#D8CFBC]">&apos;projects&apos;</span>],{"\n"}
                        {"    "}queryFn: () =&gt; fetch(
                        <span className="text-[#D8CFBC]">&apos;https://api.projectapi.dev/v1/projects&apos;</span>
                        ).then(r =&gt; r.json()){"\n"}
                        {"  }"});{"\n"}
                        {"}"}
                      </code>
                    )}
                    {selectedSdkTab === "astro" && (
                      <code>
                        <span className="text-[#FFFBF4]/50">---</span>{"\n"}
                        <span className="text-[#FFFBF4]/50">// src/pages/projects.astro</span>{"\n"}
                        <span className="text-[#4ADE80]">const</span> response ={" "}
                        <span className="text-[#4ADE80]">await</span> fetch(
                        <span className="text-[#D8CFBC]">&apos;https://api.projectapi.dev/v1/projects&apos;</span>);{"\n"}
                        <span className="text-[#4ADE80]">const</span> {"{ data: projects }"} ={" "}
                        <span className="text-[#4ADE80]">await</span> response.json();{"\n"}
                        <span className="text-[#FFFBF4]/50">---</span>{"\n"}
                        &lt;Layout title=&quot;Works&quot;&gt;{"\n"}
                        {"  "}&#123;projects.map(p =&gt; &lt;ProjectCard key=&#123;p.id&#125; &#123;...p&#125; /&gt;)&#125;{"\n"}
                        &lt;/Layout&gt;
                      </code>
                    )}
                    {selectedSdkTab === "curl" && (
                      <code>
                        <span className="text-[#FFFBF4]/50"># Direct Terminal Test</span>{"\n"}
                        curl -X GET https://api.projectapi.dev/v1/projects \{"\n"}
                        {"  "}-H &quot;Authorization: Bearer proj_live_demo_key&quot; \{"\n"}
                        {"  "}-H &quot;Accept: application/json&quot;
                      </code>
                    )}
                  </pre>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#FFFBF4]/10 text-xs text-[#FFFBF4]/60">
                  <span>TypeScript Types Exported: Project, Media, Tag, Meta</span>
                  <span className="text-[#4ADE80]">Type-safe</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Bottom Interactive Chamber Scrub Bar */}
        <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#FFFBF4]/10 pt-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#FFFBF4]/60">
            <span className="inline-block h-2 w-2 rounded-full bg-[#4ADE80] animate-pulse" />
            <span>SCROLL DRIVES THE FLIGHT // SCRUB TIMELINE</span>
          </div>

          {/* Interactive Scrub Timeline */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {STATIONS.map((station, i) => (
              <button
                key={station.id}
                type="button"
                onClick={() => jumpToStation(i)}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-mono transition-all duration-300 cursor-pointer ${
                  activeStationIndex === i
                    ? "border-[#4ADE80] bg-[#4ADE80]/15 text-[#4ADE80] shadow-[0_0_10px_rgba(74,222,128,0.3)]"
                    : "border-[#FFFBF4]/10 bg-white/[0.02] text-[#FFFBF4]/50 hover:text-[#FFFBF4] hover:bg-white/[0.05]"
                }`}
              >
                <span>{station.stationNum}</span>
                <span className="hidden md:inline">{station.id.toUpperCase()}</span>
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-[#FFFBF4]/50">
            <span>Stage {activeStationIndex + 1} of {STATIONS.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
