"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  KeyRound,
  Copy,
  Check,
  Eye,
  EyeOff,
  ShieldCheck,
  Zap,
  Activity,
  Code2,
  Lock,
} from "@/src/Components/DynamicIcons";
import { useAppSelector } from "@/src/lib/hooks";
import { toast } from "@/src/lib/toastSlice";
import { GlowCard, Reveal } from "@/src/Components/dashboard/ui";

const LIMITS = [
  {
    label: "Burst Rate Limit",
    current: 42,
    max: 100,
    unit: "req / min",
    desc: "Short-term burst protection threshold",
  },
  {
    label: "Standard Hourly",
    current: 310,
    max: 1000,
    unit: "req / hr",
    desc: "Rolling 60-minute window request allotment",
  },
  {
    label: "Daily Quota",
    current: 2450,
    max: 10000,
    unit: "req / day",
    desc: "Overall account capacity before soft throttle",
  },
];

const CODE_TABS = ["cURL", "Next.js 15", "React Hook", "Fetch API", "Node.js"] as const;

export default function ApiKey() {
  const { user } = useAppSelector((s) => s.auth);
  const oneTimeId = user?.OneTimeID ?? "";

  const [revealed, setRevealed] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<(typeof CODE_TABS)[number]>("Next.js 15");

  const maskedKey = oneTimeId
    ? oneTimeId.slice(0, 6) + "••••••••••••••••••••••••" + oneTimeId.slice(-4)
    : "proj_live_••••••••••••••••";

  const displayKey = revealed ? oneTimeId || "proj_live_demo_unassigned" : maskedKey;

  const handleCopyKey = async () => {
    if (!oneTimeId) {
      toast.error("No active API key found on your account");
      return;
    }
    try {
      await navigator.clipboard.writeText(oneTimeId);
      setCopiedKey(true);
      toast.success("API Key copied to clipboard");
      setTimeout(() => setCopiedKey(false), 2000);
    } catch {
      toast.error("Failed to copy key");
    }
  };

  const getCodeSnippet = () => {
    const key = oneTimeId || "YOUR_API_KEY";
    switch (activeCodeTab) {
      case "cURL":
        return `# Terminal Direct Test\ncurl -X GET "https://api.projectapi.dev/v1/projects" \\\n  -H "Authorization: Bearer ${key}" \\\n  -H "Accept: application/json"`;
      case "Next.js 15":
        return `// Next.js App Router (Server Component)\nexport default async function ProjectsPage() {\n  const res = await fetch("https://api.projectapi.dev/v1/projects", {\n    headers: {\n      Authorization: "Bearer \${process.env.PROJECTAPI_KEY || "${key}"}",\n    },\n    next: { revalidate: 3600 },\n  });\n  const { data } = await res.json();\n  return <ProjectGallery items={data} />;\n}`;
      case "React Hook":
        return `// React Query or useEffect\nimport { useQuery } from "@tanstack/react-query";\n\nexport function useProjects() {\n  return useQuery({\n    queryKey: ["projects"],\n    queryFn: async () => {\n      const res = await fetch("https://api.projectapi.dev/v1/projects", {\n        headers: { Authorization: "Bearer ${key}" },\n      });\n      return res.json();\n    },\n  });\n}`;
      case "Fetch API":
        return `const response = await fetch("https://api.projectapi.dev/v1/projects", {\n  method: "GET",\n  headers: {\n    "Authorization": "Bearer ${key}",\n    "Content-Type": "application/json"\n  }\n});\nconst data = await response.json();\nconsole.log(data);`;
      case "Node.js":
        return `import axios from "axios";\n\nconst client = axios.create({\n  baseURL: "https://api.projectapi.dev/v1",\n  headers: { Authorization: "Bearer ${key}" },\n});\n\nconst { data } = await client.get("/projects");`;
    }
  };

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopiedSnippet(true);
    toast.success("Code snippet copied");
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="space-y-8 text-[#FFFBF4]">
      {/* ─── Header ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#161712]/80 p-6 backdrop-blur-md shadow-xl">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#4ADE80]/30 bg-[#4ADE80]/10 px-3 py-1 text-xs font-mono text-[#4ADE80]">
            <KeyRound className="h-3.5 w-3.5" />
            <span>CREDENTIAL VAULT // LIVE TOKENS</span>
          </div>
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FFFBF4]"
            style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
          >
            API Keys &amp; Access Control
          </h1>
          <p className="text-xs sm:text-sm text-[#FFFBF4]/60">
            Authenticate your frontend client or backend services with zero-trust edge keys.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full border border-[#4ADE80]/40 bg-[#4ADE80]/10 px-3 py-1.5 text-xs font-mono font-semibold text-[#4ADE80]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
            TOKEN ACTIVE
          </span>
        </div>
      </div>

      {/* ─── Main Credential Card (Stageshow Encrypted Vault) ───────────────── */}
      <GlowCard glow="74, 222, 128">
        <div className="rounded-2xl border border-white/10 bg-[#161712]/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#FFFBF4] flex items-center gap-2">
                <Lock className="h-4 w-4 text-[#4ADE80]" />
                <span>Primary Public Secret</span>
              </h2>
              <p className="text-xs text-[#FFFBF4]/60 mt-0.5">
                Use this token in your <code className="font-mono text-[#4ADE80]">Authorization: Bearer</code> headers.
              </p>
            </div>
            <span className="text-[11px] font-mono text-[#FFFBF4]/50">
              Scope: READ_PROJECTS · WRITE_SELF
            </span>
          </div>

          {/* Key Display Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/60 p-3 sm:px-5 sm:py-3.5">
            <div className="flex items-center gap-3 overflow-hidden">
              <span className="h-2 w-2 rounded-full bg-[#4ADE80] shrink-0" />
              <span className="font-mono text-xs sm:text-sm tracking-wider text-[#FFFBF4] truncate select-all">
                {displayKey}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setRevealed(!revealed)}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-[#FFFBF4]/80 transition-colors hover:bg-white/10 hover:text-[#FFFBF4] cursor-pointer"
              >
                {revealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                <span>{revealed ? "Hide" : "Reveal"}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyKey}
                className="flex items-center gap-1.5 rounded-lg bg-[#4ADE80] px-4 py-2 text-xs font-bold text-[#0A0A0A] shadow-[0_0_15px_rgba(74,222,128,0.3)] transition-all hover:bg-[#86efac] cursor-pointer"
              >
                {copiedKey ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedKey ? "Copied" : "Copy Token"}</span>
              </button>
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-xs text-[#FFFBF4]/70">
            <ShieldCheck className="h-4 w-4 text-[#4ADE80] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-[#FFFBF4]">Zero-Exposure Security Practice</p>
              <p className="leading-relaxed text-[#FFFBF4]/60">
                Never commit secret keys into public GitHub repositories. Use environment variables like{" "}
                <code className="text-[#4ADE80] font-mono">PROJECTAPI_KEY</code> or Next.js server components so requests are dispatched on the server edge.
              </p>
            </div>
          </div>
        </div>
      </GlowCard>

      {/* ─── Rate Limits & Quota Telemetry ──────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {LIMITS.map((limit) => {
          const percent = Math.round((limit.current / limit.max) * 100);
          return (
            <div
              key={limit.label}
              className="rounded-2xl border border-white/10 bg-[#161712]/80 p-5 backdrop-blur-md shadow-lg space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#FFFBF4]">{limit.label}</span>
                <span className="font-mono text-xs text-[#4ADE80]">{limit.unit}</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between text-xs font-mono">
                  <span className="text-xl font-extrabold text-[#FFFBF4]">{limit.current}</span>
                  <span className="text-[#FFFBF4]/50">/ {limit.max} max</span>
                </div>

                {/* Progress track */}
                <div className="h-2 w-full overflow-hidden rounded-full bg-black/50 border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>

              <p className="text-[11px] text-[#FFFBF4]/50">{limit.desc}</p>
            </div>
          );
        })}
      </div>

      {/* ─── Framework Integration Studio ──────────────────────────────────── */}
      <div className="rounded-2xl border border-white/10 bg-[#161712]/80 p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#FFFBF4] flex items-center gap-2">
              <Code2 className="h-4 w-4 text-[#4ADE80]" />
              <span>Integration SDK Studio</span>
            </h3>
            <p className="text-xs text-[#FFFBF4]/60 mt-0.5">
              Copy ready-made code snippets with your active credential already injected.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopySnippet}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-[#FFFBF4] transition-colors hover:bg-white/10 cursor-pointer"
            >
              {copiedSnippet ? <Check className="h-3.5 w-3.5 text-[#4ADE80]" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedSnippet ? "Copied" : "Copy Snippet"}</span>
            </button>
          </div>
        </div>

        {/* Framework Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {CODE_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveCodeTab(tab)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-mono transition-all cursor-pointer ${
                activeCodeTab === tab
                  ? "bg-[#4ADE80] text-[#0A0A0A] font-bold shadow-md"
                  : "bg-white/[0.03] text-[#FFFBF4]/60 hover:text-[#FFFBF4] hover:bg-white/[0.08]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Code Content */}
        <div className="rounded-xl border border-white/10 bg-black/60 p-4 sm:p-5 font-mono text-xs leading-relaxed text-[#FFFBF4]/90 overflow-x-auto">
          <pre>
            <code>{getCodeSnippet()}</code>
          </pre>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#FFFBF4]/50">
          <span>Target Host: https://api.projectapi.dev/v1</span>
          <span className="text-[#4ADE80]">HTTP/3 Supported</span>
        </div>
      </div>
    </div>
  );
}
