"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Play,
  Copy,
  Check,
  Sparkles,
  Zap,
  Code2,
  Rocket,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Cpu,
  GitBranch,
  ArrowRight,
  RefreshCw,
  Sliders,
} from "lucide-react";
import { ScrollReveal, StaggerGrid, StaggerItem, GlowCard } from "@/src/lib/animations";

const TEMPLATES = [
  {
    id: "portfolio",
    name: "Featured Projects",
    endpoint: "https://api.projectapi.dev/v1/projects?featured=true&limit=3",
    method: "GET",
    latency: "11ms",
    response: {
      status: "success",
      total: 3,
      page: 1,
      data: [
        {
          id: "proj_01",
          title: "AI Canvas Studio",
          slug: "ai-canvas-studio",
          category: "Generative AI",
          stack: ["Next.js 15", "WebGPU", "TypeScript", "TailwindCSS"],
          featured: true,
          demo_url: "https://canvas.dev",
          stars: 4820,
        },
        {
          id: "proj_02",
          title: "Distributed Edge Key-Value",
          slug: "edge-kv",
          category: "Infrastructure",
          stack: ["Rust", "Wasm", "Cloudflare Workers"],
          featured: true,
          demo_url: "https://edgekv.sh",
          stars: 2150,
        },
        {
          id: "proj_03",
          title: "Autonomous Agent Task Board",
          slug: "agent-task-board",
          category: "Developer Tools",
          stack: ["React", "FastAPI", "PostgreSQL", "Redis"],
          featured: true,
          demo_url: "https://agentboard.app",
          stars: 1890,
        },
      ],
    },
  },
  {
    id: "single",
    name: "Single Project Detail",
    endpoint: "https://api.projectapi.dev/v1/projects/ai-canvas-studio",
    method: "GET",
    latency: "9ms",
    response: {
      status: "success",
      data: {
        id: "proj_01",
        title: "AI Canvas Studio",
        slug: "ai-canvas-studio",
        description: "Infinite collaborative vector canvas powered by local neural models.",
        media: {
          thumbnail: "https://cdn.projectapi.dev/media/canvas_thumb.webp",
          gallery: [
            "https://cdn.projectapi.dev/media/canvas_01.avif",
            "https://cdn.projectapi.dev/media/canvas_02.avif",
          ],
        },
        client: "Autonomous Systems Inc.",
        year: 2026,
      },
    },
  },
  {
    id: "create",
    name: "Create Project (POST)",
    endpoint: "https://api.projectapi.dev/v1/projects",
    method: "POST",
    latency: "28ms",
    response: {
      status: "created",
      code: 201,
      message: "Project successfully registered and synchronized to global edge PoPs.",
      project_id: "proj_9941a_new",
      cdn_invalidation: "COMPLETED",
    },
  },
];

const SNIPPET_TABS = ["cURL", "Fetch", "Axios", "Next.js 15", "React Query"] as const;

export default function PlaygroundPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [activeTab, setActiveTab] = useState<(typeof SNIPPET_TABS)[number]>("Next.js 15");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedResponse, setCopiedResponse] = useState(false);
  const [liveResponse, setLiveResponse] = useState(TEMPLATES[0].response);
  const [currentLatency, setCurrentLatency] = useState(TEMPLATES[0].latency);

  const handleSelectTemplate = (template: (typeof TEMPLATES)[number]) => {
    setSelectedTemplate(template);
    setIsLoading(true);
    setTimeout(() => {
      setLiveResponse(template.response);
      setCurrentLatency(template.latency);
      setIsLoading(false);
    }, 300);
  };

  const handleTriggerRun = () => {
    setIsLoading(true);
    setTimeout(() => {
      const randomLatency = Math.floor(Math.random() * 8) + 8;
      setCurrentLatency(`${randomLatency}ms`);
      setIsLoading(false);
    }, 400);
  };

  const copySnippet = () => {
    let snippet = "";
    if (activeTab === "cURL") {
      snippet = `curl -X ${selectedTemplate.method} "${selectedTemplate.endpoint}" \\\n  -H "Authorization: Bearer proj_live_demo_key" \\\n  -H "Accept: application/json"`;
    } else if (activeTab === "Fetch") {
      snippet = `const response = await fetch("${selectedTemplate.endpoint}", {\n  headers: { "Authorization": "Bearer proj_live_demo_key" }\n});\nconst data = await response.json();`;
    } else if (activeTab === "Axios") {
      snippet = `import axios from "axios";\n\nconst { data } = await axios.get("${selectedTemplate.endpoint}", {\n  headers: { Authorization: "Bearer proj_live_demo_key" }\n});`;
    } else if (activeTab === "Next.js 15") {
      snippet = `// In your Next.js Server Component or Action\nexport default async function Page() {\n  const res = await fetch("${selectedTemplate.endpoint}", {\n    headers: { Authorization: "Bearer \${process.env.PROJECTAPI_KEY}" },\n    next: { revalidate: 3600 }\n  });\n  const { data } = await res.json();\n  return <ProjectsList data={data} />;\n}`;
    } else if (activeTab === "React Query") {
      snippet = `import { useQuery } from "@tanstack/react-query";\n\nexport function useProjects() {\n  return useQuery({\n    queryKey: ["projects"],\n    queryFn: () => fetch("${selectedTemplate.endpoint}").then(r => r.json())\n  });\n}`;
    }
    navigator.clipboard.writeText(snippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyResponseJson = () => {
    navigator.clipboard.writeText(JSON.stringify(liveResponse, null, 2));
    setCopiedResponse(true);
    setTimeout(() => setCopiedResponse(false), 2000);
  };

  return (
    <section
      id="playground"
      className="relative overflow-hidden bg-[#0A0A0A] py-24 sm:py-32 text-[#FFFBF4]"
      aria-label="Interactive Developer Playground"
    >
      {/* Ambient Radial Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(800px 400px at 50% 10%, rgba(74,222,128,0.12), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        {/* Header */}
        <div className="flex flex-col items-center gap-6 text-center pb-16">
          <ScrollReveal direction="up" delay={0}>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#4ADE80]/30 bg-[#4ADE80]/10 px-4 py-1.5 text-xs text-[#4ADE80] font-mono tracking-widest uppercase">
              <Terminal className="h-3.5 w-3.5" />
              <span>LIVE API STUDIO // SANDBOX</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <h2
              className="max-w-3xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-[#FFFBF4]"
              style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
            >
              Test requests live.
              <br />
              <span className="text-[#4ADE80]">Zero setup required.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-[#FFFBF4]/70">
              Select any endpoint preset, trigger real requests against our simulated
              edge network, and copy ready-made client snippets in one click.
            </p>
          </ScrollReveal>

          {/* Template Selector Pills */}
          <ScrollReveal direction="up" delay={0.25}>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => handleSelectTemplate(tpl)}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                    selectedTemplate.id === tpl.id
                      ? "border-[#4ADE80] bg-[#4ADE80]/15 text-[#4ADE80] shadow-[0_0_15px_rgba(74,222,128,0.25)]"
                      : "border-[#FFFBF4]/10 bg-[#161712]/70 text-[#FFFBF4]/70 hover:text-[#FFFBF4] hover:border-[#FFFBF4]/25"
                  }`}
                >
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-mono font-bold ${
                      tpl.method === "POST" ? "bg-amber-400/20 text-amber-400" : "bg-[#4ADE80]/20 text-[#4ADE80]"
                    }`}
                  >
                    {tpl.method}
                  </span>
                  <span>{tpl.name}</span>
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Main Interactive Studio Card */}
        <ScrollReveal delay={0.15}>
          <div className="relative rounded-2xl sm:rounded-3xl border border-[#FFFBF4]/15 bg-[#12130E]/95 shadow-[0_20px_70px_rgba(0,0,0,0.85)] backdrop-blur-xl overflow-hidden">
            {/* Top URL Request Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-[#FFFBF4]/10 bg-black/50 p-4 sm:px-6">
              <div className="flex items-center gap-2 flex-1 rounded-xl border border-[#FFFBF4]/10 bg-[#161712] px-3.5 py-2 font-mono text-xs">
                <span
                  className={`rounded px-2 py-0.5 text-[11px] font-bold ${
                    selectedTemplate.method === "POST"
                      ? "bg-amber-400/20 text-amber-400"
                      : "bg-[#4ADE80]/20 text-[#4ADE80]"
                  }`}
                >
                  {selectedTemplate.method}
                </span>
                <span className="text-[#FFFBF4]/90 truncate">
                  {selectedTemplate.endpoint}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleTriggerRun}
                  disabled={isLoading}
                  className="flex items-center gap-2 rounded-xl bg-[#4ADE80] px-5 py-2 text-xs sm:text-sm font-bold text-[#0A0A0A] shadow-[0_0_20px_rgba(74,222,128,0.3)] transition-all hover:bg-[#86efac] cursor-pointer disabled:opacity-50"
                >
                  <Play className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : "fill-current"}`} />
                  <span>{isLoading ? "Executing..." : "Send Request"}</span>
                </button>
              </div>
            </div>

            {/* Split Body: Left Code Snippets + Right JSON Response */}
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#FFFBF4]/10">
              {/* Left Column: Code Integration Snippets */}
              <div className="flex flex-col justify-between p-5 sm:p-6 bg-[#141510]/60">
                <div className="flex items-center justify-between pb-3 border-b border-[#FFFBF4]/10">
                  <div className="flex flex-wrap gap-1">
                    {SNIPPET_TABS.map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer ${
                          activeTab === tab
                            ? "bg-[#4ADE80]/20 text-[#4ADE80] font-semibold border border-[#4ADE80]/30"
                            : "text-[#FFFBF4]/60 hover:text-[#FFFBF4]"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={copySnippet}
                    className="flex items-center gap-1.5 rounded-lg border border-[#FFFBF4]/10 bg-white/[0.03] px-3 py-1 text-xs text-[#FFFBF4]/80 transition-colors hover:bg-white/10 cursor-pointer"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="h-3 w-3 text-[#4ADE80]" />
                        <span className="text-[#4ADE80]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Code Block Content */}
                <div className="my-4 max-h-[300px] overflow-auto rounded-xl border border-[#FFFBF4]/10 bg-black/60 p-4 font-mono text-xs leading-relaxed text-[#FFFBF4]/90">
                  {activeTab === "cURL" && (
                    <pre>
                      <code>
                        <span className="text-[#FFFBF4]/50"># Terminal Request</span>{"\n"}
                        curl -X {selectedTemplate.method} &quot;{selectedTemplate.endpoint}&quot; \{"\n"}
                        {"  "}-H &quot;Authorization: Bearer proj_live_demo_key&quot; \{"\n"}
                        {"  "}-H &quot;Accept: application/json&quot;
                      </code>
                    </pre>
                  )}
                  {activeTab === "Fetch" && (
                    <pre>
                      <code>
                        <span className="text-[#FFFBF4]/50">// Standard Web Fetch API</span>{"\n"}
                        <span className="text-[#4ADE80]">const</span> res ={" "}
                        <span className="text-[#4ADE80]">await</span> fetch(&quot;{selectedTemplate.endpoint}&quot;, &#123;{"\n"}
                        {"  "}headers: &#123;{"\n"}
                        {"    "}&quot;Authorization&quot;: &quot;Bearer proj_live_demo_key&quot;{"\n"}
                        {"  "}&#125;{"\n"}
                        &#125;);{"\n"}
                        <span className="text-[#4ADE80]">const</span> data ={" "}
                        <span className="text-[#4ADE80]">await</span> res.json();
                      </code>
                    </pre>
                  )}
                  {activeTab === "Axios" && (
                    <pre>
                      <code>
                        <span className="text-[#FFFBF4]/50">// Axios Client Request</span>{"\n"}
                        <span className="text-[#4ADE80]">import</span> axios from &quot;axios&quot;;{"\n\n"}
                        <span className="text-[#4ADE80]">const</span> &#123; data &#125; ={" "}
                        <span className="text-[#4ADE80]">await</span> axios.{selectedTemplate.method.toLowerCase()}(&quot;{selectedTemplate.endpoint}&quot;, &#123;{"\n"}
                        {"  "}headers: &#123; Authorization: &quot;Bearer proj_live_demo_key&quot; &#125;{"\n"}
                        &#125;);
                      </code>
                    </pre>
                  )}
                  {activeTab === "Next.js 15" && (
                    <pre>
                      <code>
                        <span className="text-[#FFFBF4]/50">// Next.js App Router (Server Component)</span>{"\n"}
                        <span className="text-[#4ADE80]">export default async function</span> Showcase() &#123;{"\n"}
                        {"  "}
                        <span className="text-[#4ADE80]">const</span> res ={" "}
                        <span className="text-[#4ADE80]">await</span> fetch(&quot;{selectedTemplate.endpoint}&quot;, &#123;{"\n"}
                        {"    "}headers: &#123; Authorization: \`Bearer \$&#123;process.env.API_KEY&#125;\` &#125;,{"\n"}
                        {"    "}next: &#123; revalidate: 3600 &#125;{"\n"}
                        {"  "}&#125;);{"\n"}
                        {"  "}
                        <span className="text-[#4ADE80]">const</span> &#123; data &#125; ={" "}
                        <span className="text-[#4ADE80]">await</span> res.json();{"\n"}
                        {"  "}
                        <span className="text-[#4ADE80]">return</span> &lt;ProjectsGrid items=&#123;data&#125; /&gt;;{"\n"}
                        &#125;
                      </code>
                    </pre>
                  )}
                  {activeTab === "React Query" && (
                    <pre>
                      <code>
                        <span className="text-[#FFFBF4]/50">// TanStack React Query</span>{"\n"}
                        <span className="text-[#4ADE80]">import</span> &#123; useQuery &#125; from &quot;@tanstack/react-query&quot;;{"\n\n"}
                        <span className="text-[#4ADE80]">export function</span> useProjects() &#123;{"\n"}
                        {"  "}return useQuery(&#123;{"\n"}
                        {"    "}queryKey: [&quot;projects&quot;],{"\n"}
                        {"    "}queryFn: () =&gt; fetch(&quot;{selectedTemplate.endpoint}&quot;).then(r =&gt; r.json()){"\n"}
                        {"  "}&#125;);{"\n"}
                        &#125;
                      </code>
                    </pre>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-[#FFFBF4]/50">
                  <span>Type Definition: Generated</span>
                  <span className="text-[#4ADE80]">Zero dependencies</span>
                </div>
              </div>

              {/* Right Column: Live Simulated Edge Response */}
              <div className="flex flex-col justify-between p-5 sm:p-6 bg-[#0D0E09]/90">
                <div className="flex items-center justify-between pb-3 border-b border-[#FFFBF4]/10">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#4ADE80] animate-pulse" />
                    <span className="text-xs font-mono font-bold text-[#4ADE80]">
                      200 OK · {currentLatency}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={copyResponseJson}
                    className="flex items-center gap-1.5 rounded-lg border border-[#FFFBF4]/10 bg-white/[0.03] px-3 py-1 text-xs text-[#FFFBF4]/80 transition-colors hover:bg-white/10 cursor-pointer"
                  >
                    {copiedResponse ? (
                      <>
                        <Check className="h-3 w-3 text-[#4ADE80]" />
                        <span className="text-[#4ADE80]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy JSON</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Response Viewer */}
                <div className="my-4 max-h-[300px] overflow-auto rounded-xl border border-[#FFFBF4]/10 bg-black/60 p-4 font-mono text-xs leading-relaxed text-[#FFFBF4]/90">
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-3 text-[#FFFBF4]/60">
                      <RefreshCw className="h-6 w-6 animate-spin text-[#4ADE80]" />
                      <span className="text-xs font-mono">Routing through nearest Edge PoP...</span>
                    </div>
                  ) : (
                    <pre>
                      <code>{JSON.stringify(liveResponse, null, 2)}</code>
                    </pre>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-[#FFFBF4]/50">
                  <span>Server: ProjectAPI-Edge/2.4</span>
                  <span className="text-[#4ADE80]">Cache: HIT (L1)</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
