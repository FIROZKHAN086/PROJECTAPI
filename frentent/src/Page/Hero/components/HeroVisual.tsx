"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import {
  Terminal,
  Play,
  Copy,
  Check,
  Sparkles,
  Zap,
  Globe2,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { visualEntrance } from "@/src/Page/Hero/lib/variants";

const CODE_DATA: Record<string, string> = {
  json: `{
  "status": "success",
  "latency": "12ms",
  "data": {
    "id": "proj_9941a",
    "title": "Autonomous Agent Workspace",
    "slug": "autonomous-agent-workspace",
    "category": "developer-tools",
    "stack": ["Next.js", "TypeScript", "TailwindCSS", "PostgreSQL"],
    "endpoint": "/api/v1/projects/proj_9941a",
    "metrics": {
      "github_stars": 3420,
      "cache_status": "HIT",
      "edge_region": "iad1"
    }
  }
}`,
  typescript: `import { createClient } from "@projectapi/sdk";

// Initialize with zero config
const api = createClient({ apiKey: process.env.PROJECTAPI_KEY });

// Typed project fetch with auto-revalidation
export const { data, error } = await api.projects.getFeatured({
  limit: 6,
  tags: ["fullstack", "ai"]
});`,
  nextjs: `// Next.js 15 Server Component
import { ProjectCard } from "@/components/ProjectCard";

export default async function Showcase() {
  const res = await fetch("https://api.projectapi.dev/v1/projects", {
    headers: { Authorization: \`Bearer \${process.env.API_KEY}\` },
    next: { revalidate: 3600 }
  });
  const { data } = await res.json();

  return (
    <div className="grid grid-cols-3 gap-6">
      {data.map(item => <ProjectCard key={item.id} {...item} />)}
    </div>
  );
}`,
};

const FLOATING_CHIPS = [
  { name: "Next.js 15", pos: "top-[-18px] left-[10%]" },
  { name: "React 19", pos: "top-[-14px] right-[12%]" },
  { name: "TypeScript", pos: "bottom-[-16px] left-[15%]" },
  { name: "Astro", pos: "bottom-[-14px] right-[18%]" },
];

export default function HeroVisual() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"json" | "typescript" | "nextjs">("json");
  const [isExecuting, setIsExecuting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentLatency, setCurrentLatency] = useState(12);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.set(card, { transformPerspective: 1200 });

    const rotateX = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power2.out" });
    const rotateY = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power2.out" });

    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY(px * 10);
      rotateX(py * -10);
    };

    const handleLeave = () => {
      rotateX(0);
      rotateY(0);
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", handleLeave);

    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_DATA[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setCurrentLatency(Math.floor(Math.random() * 5) + 10);
      setIsExecuting(false);
    }, 450);
  };

  return (
    <motion.div
      variants={visualEntrance}
      initial="hidden"
      animate="visible"
      className="relative mt-12 w-full max-w-3xl"
    >
      {/* Floating Ambient Badges */}
      {FLOATING_CHIPS.map((chip, idx) => (
        <motion.div
          key={chip.name}
          animate={{ y: [0, -6, 0] }}
          transition={{
            repeat: Infinity,
            duration: 3 + idx * 0.5,
            ease: "easeInOut",
          }}
          className={`absolute ${chip.pos} z-30 hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#FFFBF4]/15 bg-[#161712]/90 px-3 py-1 text-[11px] font-mono text-[#FFFBF4]/90 shadow-lg backdrop-blur-md`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
          {chip.name}
        </motion.div>
      ))}

      {/* Main 3D Interactive Console Card */}
      <div
        ref={cardRef}
        className="group relative rounded-2xl border border-[#FFFBF4]/15 bg-[#11120D]/95 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-shadow duration-500 hover:border-[#4ADE80]/40 hover:shadow-[0_25px_80px_rgba(74,222,128,0.12)] overflow-hidden text-left"
      >
        {/* Top Console Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#FFFBF4]/10 bg-white/[0.02] px-4 py-3 sm:px-6">
          {/* macOS window dots */}
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-2 font-mono text-xs text-[#FFFBF4]/50 hidden sm:inline">
              projectapi-console // edge-v1
            </span>
          </div>

          {/* Interactive Mode Tabs */}
          <div className="flex items-center gap-1 rounded-lg border border-[#FFFBF4]/10 bg-black/40 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("json")}
              className={`rounded-md px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer ${
                activeTab === "json"
                  ? "bg-[#4ADE80] text-[#0A0A0A] font-bold shadow-sm"
                  : "text-[#FFFBF4]/60 hover:text-[#FFFBF4]"
              }`}
            >
              Response JSON
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("typescript")}
              className={`rounded-md px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer ${
                activeTab === "typescript"
                  ? "bg-[#4ADE80] text-[#0A0A0A] font-bold shadow-sm"
                  : "text-[#FFFBF4]/60 hover:text-[#FFFBF4]"
              }`}
            >
              SDK Client
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("nextjs")}
              className={`rounded-md px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer ${
                activeTab === "nextjs"
                  ? "bg-[#4ADE80] text-[#0A0A0A] font-bold shadow-sm"
                  : "text-[#FFFBF4]/60 hover:text-[#FFFBF4]"
              }`}
            >
              Next.js 15
            </button>
          </div>

          {/* Copy & Run triggers */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExecute}
              disabled={isExecuting}
              className="flex items-center gap-1.5 rounded-lg border border-[#4ADE80]/30 bg-[#4ADE80]/15 px-3 py-1 text-xs font-mono font-medium text-[#4ADE80] transition-all hover:bg-[#4ADE80]/25 cursor-pointer disabled:opacity-50"
            >
              <Play className={`h-3 w-3 ${isExecuting ? "animate-spin text-[#4ADE80]" : "fill-current"}`} />
              <span>{isExecuting ? "Sending..." : "Test Run"}</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1 rounded-lg border border-[#FFFBF4]/10 bg-white/[0.03] px-2.5 py-1 text-xs text-[#FFFBF4]/70 transition-colors hover:bg-white/10 hover:text-[#FFFBF4] cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#4ADE80]" />
                  <span className="text-[#4ADE80]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Console URL Bar */}
        <div className="flex items-center justify-between border-b border-[#FFFBF4]/10 bg-black/40 px-4 py-2 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#FFFBF4]/80 overflow-hidden">
            <span className="rounded bg-[#4ADE80]/20 px-1.5 py-0.5 text-[10px] font-bold text-[#4ADE80]">
              GET
            </span>
            <span className="truncate">https://api.projectapi.dev/v1/projects/featured</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="flex items-center gap-1 text-[11px] text-[#4ADE80]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
              200 OK
            </span>
            <span className="text-[11px] text-[#FFFBF4]/50">{currentLatency}ms</span>
          </div>
        </div>

        {/* Code Content Box */}
        <div className="p-4 sm:p-6 overflow-x-auto bg-[#0D0E09]/90 max-h-[340px]">
          <pre className="font-mono text-xs sm:text-sm leading-relaxed text-[#FFFBF4]/90">
            <code>{CODE_DATA[activeTab]}</code>
          </pre>
        </div>

        {/* Console Status Footer */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#FFFBF4]/10 bg-[#161712]/50 px-4 py-2 text-[11px] font-mono text-[#FFFBF4]/50">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[#4ADE80]">
              <CheckCircle2 className="h-3 w-3" />
              Cache HIT (Edge L1)
            </span>
            <span>Brotli Compressed</span>
          </div>
          <span>Updated just now</span>
        </div>
      </div>
    </motion.div>
  );
}
