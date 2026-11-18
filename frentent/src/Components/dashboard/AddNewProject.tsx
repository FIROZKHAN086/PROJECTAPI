"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FolderPlus,
  Loader2,
  FileText,
  Image as ImageIcon,
  Tag,
  ExternalLink,
  GitBranch,
  Star,
  Plus,
  Trash2,
  Send,
  Eye,
  Code2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  UploadCloud,
  X,
  Layers,
} from "lucide-react";
import { useCreateProject } from "@/src/hooks/useProjects";
import { toast } from "@/src/lib/toastSlice";
import { GlowCard } from "@/src/Components/dashboard/ui";

// Exported for child subcomponents if needed
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export const floatAnimation = {
  y: [0, -6, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

const CATEGORIES = [
  "Web Application",
  "Mobile App",
  "API & Microservice",
  "AI & Machine Learning",
  "Open Source Library",
  "Infrastructure & Cloud",
  "Design System",
  "Developer Tool",
];

const SUGGESTED_STACKS = [
  "Next.js",
  "React",
  "TypeScript",
  "TailwindCSS",
  "Node.js",
  "PostgreSQL",
  "Python",
  "FastAPI",
  "Rust",
  "GraphQL",
  "Docker",
  "Redis",
];

export default function AddNewProject() {
  const router = useRouter();
  const { mutate: createProject, isPending } = useCreateProject();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("Next.js, TypeScript, TailwindCSS");
  const [liveDemo, setLiveDemo] = useState("");
  const [github, setGithub] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [featured, setFeatured] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [customKey, setCustomKey] = useState("");
  const [customVal, setCustomVal] = useState("");
  const [customFields, setCustomFields] = useState<Record<string, string>>({});
  const [previewTab, setPreviewTab] = useState<"card" | "json">("card");

  useEffect(() => {
    if (!imageFile) {
      setImagePreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleAddCustomField = () => {
    if (!customKey.trim() || !customVal.trim()) return;
    setCustomFields((prev) => ({ ...prev, [customKey.trim()]: customVal.trim() }));
    setCustomKey("");
    setCustomVal("");
  };

  const handleRemoveCustomField = (key: string) => {
    setCustomFields((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleAddTechBadge = (t: string) => {
    const list = tech
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
    if (!list.includes(t)) {
      list.push(t);
      setTech(list.join(", "));
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!title.trim()) {
      toast.error("Project title is required");
      return;
    }
    if (!description.trim()) {
      toast.error("Description is required");
      return;
    }
    if (!imageFile) {
      toast.error("Project cover image is required");
      return;
    }

    createProject(
      {
        title: title.trim(),
        description: description.trim(),
        tech: tech.trim(),
        liveDemo: liveDemo.trim() || "",
        github: github.trim() || "",
        category,
        featured: String(featured),
        image: imageFile,
        customFields:
          Object.keys(customFields).length > 0
            ? JSON.stringify(customFields)
            : undefined,
      },
      {
        onSuccess: () => {
          toast.success("Project created and synchronized to Edge API!");
          router.push("/dashboard?path=project");
        },
        onError: (err: { message?: string }) => {
          toast.error(err?.message || "Failed to create project");
        },
      }
    );
  };

  const techArray = tech
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const previewJson = {
    status: "success",
    data: {
      id: "proj_draft_new",
      title: title || "Untitled Project",
      category,
      description: description || "No description provided yet...",
      tech: techArray,
      featured,
      liveDemo: liveDemo || null,
      github: github || null,
      customFields,
      media: {
        cover: imagePreviewUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
        format: "AVIF/WebP auto-optimized",
      },
    },
  };

  return (
    <div className="space-y-8 text-[#FFFBF4]">
      {/* ─── Header ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#161712]/80 p-6 backdrop-blur-md shadow-xl">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#4ADE80]/30 bg-[#4ADE80]/10 px-3 py-1 text-xs font-mono text-[#4ADE80]">
            <FolderPlus className="h-3.5 w-3.5" />
            <span>PROJECT COMPOSER // REST REGISTRY</span>
          </div>
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FFFBF4]"
            style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
          >
            Add New Project
          </h1>
          <p className="text-xs sm:text-sm text-[#FFFBF4]/60">
            Publish an item to your central registry. Changes deploy live to all client sites.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/dashboard?path=project")}
            disabled={isPending}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-[#FFFBF4]/80 transition-colors hover:bg-white/10 cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSubmit()}
            disabled={isPending}
            className="flex items-center gap-2 rounded-xl bg-[#4ADE80] px-5 py-2 text-xs sm:text-sm font-bold text-[#0A0A0A] shadow-[0_0_20px_rgba(74,222,128,0.3)] transition-all hover:bg-[#86efac] cursor-pointer disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span>{isPending ? "Publishing..." : "Publish Project"}</span>
          </motion.button>
        </div>
      </div>

      {/* ─── Dual-Pane Workspace (Stageshow Architecture) ───────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Cols: The Interactive Form Studio */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Core Details */}
          <GlowCard glow="74, 222, 128">
            <div className="rounded-2xl border border-white/10 bg-[#161712]/90 p-6 backdrop-blur-xl shadow-xl space-y-5">
              <h2 className="text-sm font-bold text-[#FFFBF4] flex items-center gap-2 border-b border-white/10 pb-3">
                <FileText className="h-4 w-4 text-[#4ADE80]" />
                <span>1. Core Project Metadata</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#FFFBF4]/70 mb-1.5">
                    Project Title <span className="text-[#4ADE80]">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Autonomous AI Canvas"
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-[#FFFBF4] placeholder:text-[#FFFBF4]/30 focus:border-[#4ADE80] focus:outline-none focus:ring-1 focus:ring-[#4ADE80]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#FFFBF4]/70 mb-1.5">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-[#FFFBF4] focus:border-[#4ADE80] focus:outline-none"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat} className="bg-[#161712]">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#FFFBF4]/70 mb-1.5">
                      Spotlight Priority
                    </label>
                    <button
                      type="button"
                      onClick={() => setFeatured(!featured)}
                      className={`w-full flex items-center justify-between rounded-xl border px-4 py-2.5 text-sm transition-all cursor-pointer ${
                        featured
                          ? "border-yellow-400/40 bg-yellow-400/10 text-yellow-400 font-semibold"
                          : "border-white/10 bg-black/50 text-[#FFFBF4]/70 hover:border-white/20"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Star className={`h-4 w-4 ${featured ? "fill-yellow-400" : ""}`} />
                        <span>Featured Item</span>
                      </span>
                      <span className="text-xs font-mono">{featured ? "YES" : "NO"}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#FFFBF4]/70 mb-1.5">
                    Project Summary &amp; Scope <span className="text-[#4ADE80]">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what this project does, its architecture, and key outcomes..."
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-[#FFFBF4] placeholder:text-[#FFFBF4]/30 focus:border-[#4ADE80] focus:outline-none focus:ring-1 focus:ring-[#4ADE80]"
                  />
                </div>
              </div>
            </div>
          </GlowCard>

          {/* Card 2: Tech Stack & Live Links */}
          <GlowCard glow="96, 165, 250">
            <div className="rounded-2xl border border-white/10 bg-[#161712]/90 p-6 backdrop-blur-xl shadow-xl space-y-5">
              <h2 className="text-sm font-bold text-[#FFFBF4] flex items-center gap-2 border-b border-white/10 pb-3">
                <Layers className="h-4 w-4 text-blue-400" />
                <span>2. Tech Stack &amp; External Repos</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#FFFBF4]/70 mb-1.5">
                    Technologies (comma separated)
                  </label>
                  <input
                    type="text"
                    value={tech}
                    onChange={(e) => setTech(e.target.value)}
                    placeholder="Next.js, TypeScript, TailwindCSS"
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-[#FFFBF4] placeholder:text-[#FFFBF4]/30 focus:border-[#4ADE80] focus:outline-none"
                  />
                  {/* Suggested pills */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {SUGGESTED_STACKS.slice(0, 8).map((stk) => (
                      <button
                        key={stk}
                        type="button"
                        onClick={() => handleAddTechBadge(stk)}
                        className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] font-mono text-[#FFFBF4]/60 hover:text-[#4ADE80] hover:border-[#4ADE80]/30 transition-colors cursor-pointer"
                      >
                        + {stk}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#FFFBF4]/70 mb-1.5 flex items-center gap-1.5">
                      <ExternalLink className="h-3.5 w-3.5 text-[#4ADE80]" />
                      <span>Live Demo URL</span>
                    </label>
                    <input
                      type="url"
                      value={liveDemo}
                      onChange={(e) => setLiveDemo(e.target.value)}
                      placeholder="https://myproject.dev"
                      className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-2 text-sm text-[#FFFBF4] placeholder:text-[#FFFBF4]/30 focus:border-[#4ADE80] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#FFFBF4]/70 mb-1.5 flex items-center gap-1.5">
                      <GitBranch className="h-3.5 w-3.5 text-[#FFFBF4]/80" />
                      <span>GitHub Repository</span>
                    </label>
                    <input
                      type="url"
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-2 text-sm text-[#FFFBF4] placeholder:text-[#FFFBF4]/30 focus:border-[#4ADE80] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </GlowCard>

          {/* Card 3: Media Upload */}
          <GlowCard glow="192, 132, 252">
            <div className="rounded-2xl border border-white/10 bg-[#161712]/90 p-6 backdrop-blur-xl shadow-xl space-y-4">
              <h2 className="text-sm font-bold text-[#FFFBF4] flex items-center gap-2 border-b border-white/10 pb-3">
                <ImageIcon className="h-4 w-4 text-purple-400" />
                <span>3. Project Cover Media</span> <span className="text-[#4ADE80]">*</span>
              </h2>

              {imagePreviewUrl ? (
                <div className="relative rounded-xl border border-white/15 overflow-hidden group">
                  <img
                    src={imagePreviewUrl}
                    alt="Upload preview"
                    className="w-full h-48 object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setImageFile(null)}
                      className="flex items-center gap-1 rounded-lg bg-red-500/80 px-3 py-1.5 text-xs font-bold text-white shadow-md hover:bg-red-500 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/15 bg-black/40 p-8 text-center cursor-pointer transition-colors hover:border-[#4ADE80]/50 hover:bg-white/[0.02]">
                  <UploadCloud className="h-10 w-10 text-[#4ADE80]/70 mb-2" />
                  <p className="text-xs sm:text-sm font-semibold text-[#FFFBF4]">
                    Click or drag project screenshot here
                  </p>
                  <p className="text-[11px] text-[#FFFBF4]/50 mt-1">
                    PNG, JPG, or WEBP up to 10MB · Auto-compressed to AVIF at edge
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setImageFile(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </GlowCard>

          {/* Card 4: Custom Fields (JSON Metadata) */}
          <div className="rounded-2xl border border-white/10 bg-[#161712]/90 p-6 backdrop-blur-xl shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-[#FFFBF4] flex items-center justify-between border-b border-white/10 pb-3">
              <span className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-[#4ADE80]" />
                <span>4. Custom Metadata (Key-Value)</span>
              </span>
              <span className="text-[10px] font-mono text-[#FFFBF4]/40">OPTIONAL</span>
            </h2>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Key (e.g. client, year)"
                value={customKey}
                onChange={(e) => setCustomKey(e.target.value)}
                className="flex-1 rounded-xl border border-white/10 bg-black/50 px-3.5 py-2 text-xs text-[#FFFBF4] placeholder:text-[#FFFBF4]/30 focus:border-[#4ADE80] focus:outline-none"
              />
              <input
                type="text"
                placeholder="Value (e.g. Acme Corp)"
                value={customVal}
                onChange={(e) => setCustomVal(e.target.value)}
                className="flex-1 rounded-xl border border-white/10 bg-black/50 px-3.5 py-2 text-xs text-[#FFFBF4] placeholder:text-[#FFFBF4]/30 focus:border-[#4ADE80] focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddCustomField}
                className="rounded-xl border border-[#4ADE80]/40 bg-[#4ADE80]/15 px-3 py-2 text-xs font-bold text-[#4ADE80] hover:bg-[#4ADE80]/25 transition-colors cursor-pointer"
              >
                Add
              </button>
            </div>

            {Object.keys(customFields).length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {Object.entries(customFields).map(([k, v]) => (
                  <span
                    key={k}
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/40 px-2.5 py-1 text-xs font-mono text-[#FFFBF4]/80"
                  >
                    <span className="text-[#4ADE80]">{k}:</span>
                    <span>{v}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCustomField(k)}
                      className="ml-1 text-red-400 hover:text-red-300"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right 5 Cols: Live Stageshow Realtime Preview */}
        <div className="lg:col-span-5 sticky top-20 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#4ADE80]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>LIVE EDGE PREVIEW // STAGESHOW</span>
            </div>

            <div className="flex gap-1 rounded-lg border border-white/10 bg-black/50 p-0.5">
              <button
                type="button"
                onClick={() => setPreviewTab("card")}
                className={`rounded px-2.5 py-1 text-[11px] font-mono transition-colors cursor-pointer ${
                  previewTab === "card"
                    ? "bg-[#4ADE80] text-[#0A0A0A] font-bold"
                    : "text-[#FFFBF4]/60 hover:text-[#FFFBF4]"
                }`}
              >
                Card UI
              </button>
              <button
                type="button"
                onClick={() => setPreviewTab("json")}
                className={`rounded px-2.5 py-1 text-[11px] font-mono transition-colors cursor-pointer ${
                  previewTab === "json"
                    ? "bg-[#4ADE80] text-[#0A0A0A] font-bold"
                    : "text-[#FFFBF4]/60 hover:text-[#FFFBF4]"
                }`}
              >
                JSON Schema
              </button>
            </div>
          </div>

          {previewTab === "card" ? (
            /* Live Card UI Preview */
            <div className="rounded-2xl border border-white/15 bg-[#161712]/95 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden transition-all">
              {/* Media Header */}
              <div className="relative h-48 w-full bg-black/60 overflow-hidden flex items-center justify-center">
                {imagePreviewUrl ? (
                  <img
                    src={imagePreviewUrl}
                    alt={title || "Cover"}
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-[#FFFBF4]/40">
                    <ImageIcon className="h-8 w-8" />
                    <span className="text-xs font-mono">Upload cover to preview</span>
                  </div>
                )}

                {featured && (
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-[10px] font-mono font-bold uppercase text-black shadow-md">
                      <Star className="h-3 w-3 fill-current" />
                      Featured
                    </span>
                  </div>
                )}

                <div className="absolute bottom-3 left-3">
                  <span className="rounded-md border border-white/20 bg-black/70 px-2.5 py-0.5 text-[11px] font-mono text-[#FFFBF4] backdrop-blur-md">
                    {category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#FFFBF4]">
                    {title || "Untitled Project"}
                  </h3>
                  <p className="text-xs text-[#FFFBF4]/65 line-clamp-3 mt-1.5 leading-relaxed">
                    {description || "Provide a description in the form to preview the card layout..."}
                  </p>
                </div>

                {/* Tech Pills */}
                {techArray.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {techArray.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-[#4ADE80]/30 bg-[#4ADE80]/10 px-2 py-0.5 text-[10px] font-mono text-[#4ADE80]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Link Buttons */}
                <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                  {liveDemo && (
                    <span className="flex items-center gap-1 text-xs text-[#4ADE80] font-medium">
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Live Site</span>
                    </span>
                  )}
                  {github && (
                    <span className="flex items-center gap-1 text-xs text-[#FFFBF4]/70 font-medium ml-3">
                      <GitBranch className="h-3.5 w-3.5" />
                      <span>Source</span>
                    </span>
                  )}
                  {!liveDemo && !github && (
                    <span className="text-xs font-mono text-[#FFFBF4]/40">
                      Add demo or github links to preview actions
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Live JSON Schema Preview */
            <div className="rounded-2xl border border-white/15 bg-black/80 p-4 font-mono text-xs leading-relaxed text-[#FFFBF4]/90 max-h-[460px] overflow-auto shadow-2xl">
              <pre>
                <code>{JSON.stringify(previewJson, null, 2)}</code>
              </pre>
            </div>
          )}

          {/* Realtime API status tip */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#FFFBF4]/50 px-2">
            <span>Target Route: POST /v1/projects</span>
            <span className="text-[#4ADE80]">Edge Validated</span>
          </div>
        </div>
      </div>
    </div>
  );
}
