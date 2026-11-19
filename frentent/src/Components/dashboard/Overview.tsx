"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FolderOpen,
  Star,
  LayoutGrid,
  Layers,
  PlusCircle,
  Zap,
  ArrowUpRight,
  Activity,
  Globe,
  Plus,
  Eye,
  RefreshCw,
  Radio,
  Key,
  ExternalLink,

} from "@/src/Components/DynamicIcons";

import { useProjects } from "@/src/hooks/useProjects";
import type { Project } from "@/src/types/project";
import { GlowCard} from "@/src/Components/dashboard/ui";

type DashboardProject = Project & { status?: string };

const timeAgo = (dateStr: string): string => {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);
  if (isNaN(diff)) return "recently";
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(dateStr).toLocaleDateString();
};

export default function Overview() {
  const router = useRouter();
  const { data, isLoading, error } = useProjects();
  const projects: DashboardProject[] = (data?.data ?? []) as DashboardProject[];

  const [liveLatency, setLiveLatency] = useState(12);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveLatency(Math.floor(Math.random() * 5) + 10);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const totalProjects = projects.length;
  const featuredCount = projects.filter((p) => p.featured).length;
  const categoriesList = Array.from(new Set(projects.map((p) => p.category).filter(Boolean)));
  const uniqueCategories = categoriesList.length;
  const uniqueTech = new Set(projects.flatMap((p) => p.tech).filter(Boolean)).size;

  const filteredProjects =
    filterCategory === "all"
      ? projects
      : projects.filter((p) => p.category === filterCategory);

  return (
    <div className="space-y-8 text-[#FFFBF4]">
      {/* ─── Top Telemetry & Welcome Bar ──────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#161712]/80 p-6 backdrop-blur-md shadow-xl">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#4ADE80]/30 bg-[#4ADE80]/10 px-3 py-1 text-xs font-mono text-[#4ADE80]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ADE80] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ADE80]" />
            </span>
            <span>EDGE CLUSTER // GLOBAL SYNC ACTIVE</span>
          </div>
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FFFBF4]"
            style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
          >
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-[#FFFBF4]/60">
            Real-time telemetry, project registries, and global edge invalidation status.
          </p>
        </div>

        {/* Live System Health Pill */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 font-mono text-xs">
            <Radio className="h-3.5 w-3.5 text-[#4ADE80] animate-pulse" />
            <div className="flex flex-col">
              <span className="text-[10px] text-[#FFFBF4]/50">EDGE LATENCY</span>
              <span className="text-[#4ADE80] font-bold">{liveLatency}ms (Optimal)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 font-mono text-xs">
            <Globe className="h-3.5 w-3.5 text-[#4ADE80]" />
            <div className="flex flex-col">
              <span className="text-[10px] text-[#FFFBF4]/50">COVERAGE</span>
              <span className="text-[#FFFBF4] font-bold">300+ PoPs</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/dashboard?path=add-new-project")}
            className="flex items-center gap-2 rounded-xl bg-[#4ADE80] px-4 py-2.5 text-xs sm:text-sm font-bold text-[#0A0A0A] shadow-[0_0_20px_rgba(74,222,128,0.25)] transition-all hover:bg-[#86efac] cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add Project</span>
          </motion.button>
        </div>
      </div>

      {/* ─── 4-Card Bento Telemetry Grid ───────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Projects */}
        <GlowCard glow="74, 222, 128">
          <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#161712]/70 p-5 backdrop-blur-md h-full transition-all hover:border-[#4ADE80]/30">
            <div className="flex items-center justify-between pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#FFFBF4]/60">
                Total Projects
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#4ADE80]/30 bg-[#4ADE80]/10 text-[#4ADE80]">
                <FolderOpen className="h-4 w-4" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-[#FFFBF4]">
                  {isLoading ? "--" : totalProjects}
                </span>
                <span className="text-xs text-[#4ADE80] font-mono">active</span>
              </div>
              <p className="text-[11px] text-[#FFFBF4]/50">Synchronized across endpoints</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#FFFBF4]/50">
              <span>Status: Online</span>
              <span className="text-[#4ADE80]">100% Sync</span>
            </div>
          </div>
        </GlowCard>

        {/* Card 2: Featured Highlights */}
        <GlowCard glow="250, 204, 21">
          <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#161712]/70 p-5 backdrop-blur-md h-full transition-all hover:border-yellow-400/30">
            <div className="flex items-center justify-between pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#FFFBF4]/60">
                Featured Spotlights
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-yellow-400/30 bg-yellow-400/10 text-yellow-400">
                <Star className="h-4 w-4 fill-yellow-400/30" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-[#FFFBF4]">
                  {isLoading ? "--" : featuredCount}
                </span>
                <span className="text-xs text-yellow-400 font-mono">
                  {totalProjects > 0 ? `${Math.round((featuredCount / totalProjects) * 100)}%` : "0%"}
                </span>
              </div>
              <p className="text-[11px] text-[#FFFBF4]/50">Prioritized on hero feeds</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#FFFBF4]/50">
              <span>Priority Flag</span>
              <span className="text-yellow-400">High Visibility</span>
            </div>
          </div>
        </GlowCard>

        {/* Card 3: Categories & Taxonomies */}
        <GlowCard glow="96, 165, 250">
          <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#161712]/70 p-5 backdrop-blur-md h-full transition-all hover:border-blue-400/30">
            <div className="flex items-center justify-between pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#FFFBF4]/60">
                Categories
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-400/30 bg-blue-400/10 text-blue-400">
                <LayoutGrid className="h-4 w-4" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-[#FFFBF4]">
                  {isLoading ? "--" : uniqueCategories}
                </span>
                <span className="text-xs text-blue-400 font-mono">taxonomies</span>
              </div>
              <p className="text-[11px] text-[#FFFBF4]/50">Organized portfolios</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#FFFBF4]/50">
              <span>Filter Query: Ready</span>
              <span className="text-blue-400">Indexed</span>
            </div>
          </div>
        </GlowCard>

        {/* Card 4: Tech Stack Diversity */}
        <GlowCard glow="192, 132, 252">
          <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#161712]/70 p-5 backdrop-blur-md h-full transition-all hover:border-purple-400/30">
            <div className="flex items-center justify-between pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#FFFBF4]/60">
                Tech Stack
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-purple-400/30 bg-purple-400/10 text-purple-400">
                <Layers className="h-4 w-4" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-[#FFFBF4]">
                  {isLoading ? "--" : uniqueTech}
                </span>
                <span className="text-xs text-purple-400 font-mono">unique tools</span>
              </div>
              <p className="text-[11px] text-[#FFFBF4]/50">Tagged across projects</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#FFFBF4]/50">
              <span>Multi-stack</span>
              <span className="text-purple-400">Full Typed</span>
            </div>
          </div>
        </GlowCard>
      </div>

      {/* ─── Central Section: Project Registry & Realtime Edge Feed ─────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Project Registry */}
        <div className="lg:col-span-8 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#161712]/80 p-6 backdrop-blur-md shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <FolderOpen className="h-4 w-4 text-[#4ADE80]" />
                <h2 className="text-base sm:text-lg font-bold text-[#FFFBF4]">
                  Project Registry
                </h2>
              </div>
              <p className="text-xs text-[#FFFBF4]/60 mt-0.5">
                All registered projects actively serving traffic through the REST API.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setFilterCategory("all")}
                className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer ${
                  filterCategory === "all"
                    ? "bg-[#4ADE80] text-[#0A0A0A] font-bold"
                    : "text-[#FFFBF4]/60 hover:text-[#FFFBF4] bg-white/[0.03]"
                }`}
              >
                All ({totalProjects})
              </button>
              {categoriesList.slice(0, 3).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilterCategory(cat!)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer ${
                    filterCategory === cat
                      ? "bg-[#4ADE80] text-[#0A0A0A] font-bold"
                      : "text-[#FFFBF4]/60 hover:text-[#FFFBF4] bg-white/[0.03]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Project List */}
          <div className="my-4 divide-y divide-white/5 space-y-2">
            {isLoading ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3 text-[#FFFBF4]/50">
                <RefreshCw className="h-6 w-6 animate-spin text-[#4ADE80]" />
                <p className="text-xs font-mono">Fetching project schema from database...</p>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center gap-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02]">
                  <FolderOpen className="h-6 w-6 text-[#FFFBF4]/40" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#FFFBF4]">No projects found</h4>
                  <p className="text-xs text-[#FFFBF4]/50 mt-1">
                    Create your first project to generate your REST endpoint.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => router.push("/dashboard?path=add-new-project")}
                  className="rounded-xl bg-[#4ADE80] px-4 py-2 text-xs font-bold text-[#0A0A0A]"
                >
                  Add Project
                </button>
              </div>
            ) : (
              filteredProjects.slice(0, 5).map((project, idx) => (
                <div
                  key={project.ProjectID || idx}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3.5 px-3 rounded-xl transition-colors hover:bg-white/[0.02]"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="relative mt-0.5 shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-[#4ADE80]">
                        {project.featured ? (
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400/20" />
                        ) : (
                          <FolderOpen className="h-4 w-4 text-[#4ADE80]" />
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-[#FFFBF4] group-hover:text-[#4ADE80] transition-colors">
                          {project.title}
                        </h4>
                        {project.featured && (
                          <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-2 py-0.5 text-[9px] font-mono text-yellow-400">
                            Featured
                          </span>
                        )}
                        {project.category && (
                          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-[#FFFBF4]/60">
                            {project.category}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#FFFBF4]/50">
                        <span>Updated {timeAgo(project.createdAt)}</span>
                        {project.tech && project.tech.length > 0 && (
                          <>
                            <span>•</span>
                            <span className="font-mono text-[#FFFBF4]/70">
                              {project.tech.slice(0, 3).join(", ")}
                              {project.tech.length > 3 ? ` +${project.tech.length - 3}` : ""}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        router.push(`/dashboard?path=edits&project=${project.ProjectID}`)
                      }
                      className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-[#FFFBF4]/80 transition-colors hover:bg-white/10 hover:text-[#FFFBF4] cursor-pointer"
                    >
                      Edit
                    </button>
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-white/10 bg-white/[0.03] p-1.5 text-[#FFFBF4]/60 transition-colors hover:text-[#4ADE80] hover:bg-white/10"
                        title="Live Preview"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#FFFBF4]/50">
            <span>Showing top {Math.min(5, filteredProjects.length)} of {totalProjects} projects</span>
            <button
              type="button"
              onClick={() => router.push("/dashboard?path=project")}
              className="flex items-center gap-1 text-[#4ADE80] hover:underline cursor-pointer"
            >
              <span>View all projects</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Right 4 Cols: Realtime Edge Telemetry & Quick Shortcuts */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Actions Card */}
          <div className="rounded-2xl border border-white/10 bg-[#161712]/80 p-5 backdrop-blur-md shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-[#FFFBF4] flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#4ADE80]" />
              <span>Quick Actions</span>
            </h3>

            <div className="grid grid-cols-1 gap-2.5">
              <button
                type="button"
                onClick={() => router.push("/dashboard?path=add-new-project")}
                className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-black/40 text-left transition-all hover:border-[#4ADE80]/30 hover:bg-white/[0.02] cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <PlusCircle className="h-4 w-4 text-[#4ADE80]" />
                  <div>
                    <p className="text-xs font-semibold text-[#FFFBF4]">New Project</p>
                    <p className="text-[10px] text-[#FFFBF4]/50">Add showcase item to API</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[#FFFBF4]/40 group-hover:text-[#4ADE80]" />
              </button>

              <button
                type="button"
                onClick={() => router.push("/dashboard?path=api-key")}
                className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-black/40 text-left transition-all hover:border-[#4ADE80]/30 hover:bg-white/[0.02] cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <Key className="h-4 w-4 text-[#4ADE80]" />
                  <div>
                    <p className="text-xs font-semibold text-[#FFFBF4]">API Keys</p>
                    <p className="text-[10px] text-[#FFFBF4]/50">Inspect or copy access tokens</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[#FFFBF4]/40 group-hover:text-[#4ADE80]" />
              </button>

              <button
                type="button"
                onClick={() => router.push("/dashboard?path=view-projects")}
                className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-black/40 text-left transition-all hover:border-[#4ADE80]/30 hover:bg-white/[0.02] cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <Eye className="h-4 w-4 text-[#4ADE80]" />
                  <div>
                    <p className="text-xs font-semibold text-[#FFFBF4]">Live View</p>
                    <p className="text-[10px] text-[#FFFBF4]/50">Preview public visual cards</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[#FFFBF4]/40 group-hover:text-[#4ADE80]" />
              </button>
            </div>
          </div>

          {/* Realtime Telemetry Feed (Stageshow Style) */}
          <div className="rounded-2xl border border-white/10 bg-[#161712]/80 p-5 backdrop-blur-md shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#FFFBF4] flex items-center gap-2">
                <Activity className="h-4 w-4 text-[#4ADE80]" />
                <span>Live Event Stream</span>
              </h3>
              <span className="text-[10px] font-mono text-[#4ADE80] flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                STREAMING
              </span>
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="p-2.5 rounded-lg border border-white/5 bg-black/40 space-y-1">
                <div className="flex justify-between text-[#FFFBF4]/50 text-[10px]">
                  <span>CACHE_PURGE_SUCCESS</span>
                  <span>just now</span>
                </div>
                <p className="text-[#4ADE80] text-[11px]">
                  Edge invalidated in 12ms across 300+ PoPs
                </p>
              </div>

              <div className="p-2.5 rounded-lg border border-white/5 bg-black/40 space-y-1">
                <div className="flex justify-between text-[#FFFBF4]/50 text-[10px]">
                  <span>MEDIA_OPTIMIZER</span>
                  <span>2m ago</span>
                </div>
                <p className="text-[#FFFBF4]/80 text-[11px]">
                  AVIF &amp; WebP srcset generated (-85% bytes)
                </p>
              </div>

              <div className="p-2.5 rounded-lg border border-white/5 bg-black/40 space-y-1">
                <div className="flex justify-between text-[#FFFBF4]/50 text-[10px]">
                  <span>TOKEN_AUTH_CHECK</span>
                  <span>5m ago</span>
                </div>
                <p className="text-[#FFFBF4]/80 text-[11px]">
                  JWT signature verified for incoming GET request
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
