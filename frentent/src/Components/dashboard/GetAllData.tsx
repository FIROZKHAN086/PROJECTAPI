"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Database,
  Copy,
  Check,
  BarChart3,
  Layers,
  Tag,
  Sparkles,
  Star,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useProjects } from "@/src/hooks/useProjects";
import { toast } from "@/src/lib/toastSlice";
import {
  Reveal,
  GlowCard,
  DashHeader,
  StatCard,
  PageIntro,
  FadeItem,
} from "@/src/Components/dashboard/ui";

const tabs = ["Projects", "Project IDs", "Stats"] as const;
type Tab = (typeof tabs)[number];

type StatConfig = {
  label: string;
  badge: string;
  accent: string;
  icon: LucideIcon;
  value: number;
};

export default function GetAllData() {
  const [activeTab, setActiveTab] = useState<Tab>("Projects");
  const [copied, setCopied] = useState(false);
  const { data: projectsData, isLoading } = useProjects();

  const projects = useMemo(() => projectsData?.data ?? [], [projectsData]);

  const stats = useMemo(() => {
    const uniqueCategories = new Set(projects.map((p) => p.category));
    const totalTechItems = projects.reduce((acc, p) => acc + (p.tech?.length || 0), 0);
    const featuredCount = projects.filter((p) => p.featured).length;

    return {
      totalProjects: projects.length,
      featuredCount,
      uniqueCategories: uniqueCategories.size,
      totalTechItems,
    };
  }, [projects]);

  const handleCopyTitles = () => {
    const titles = projects.map((p) => p.title).join("\n");
    navigator.clipboard.writeText(titles).then(() => {
      setCopied(true);
      toast.success("Project titles copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const statCards: StatConfig[] = [
    {
      label: "Total Projects",
      badge: "Total",
      accent: "#4ADE80",
      icon: Layers,
      value: stats.totalProjects,
    },
    {
      label: "Featured Count",
      badge: "Featured",
      accent: "#FACC15",
      icon: Sparkles,
      value: stats.featuredCount,
    },
    {
      label: "Unique Categories",
      badge: "Unique",
      accent: "#60A5FA",
      icon: BarChart3,
      value: stats.uniqueCategories,
    },
    {
      label: "Total Tech Items",
      badge: "Items",
      accent: "#F87171",
      icon: Tag,
      value: stats.totalTechItems,
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="size-10 rounded-xl bg-white/[0.06]" />
          <Skeleton className="h-6 w-40 rounded bg-white/[0.06]" />
          <Skeleton className="h-4 w-72 rounded bg-white/[0.06]" />
        </div>
        <Skeleton className="h-10 w-64 rounded-xl bg-white/[0.06]" />
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex gap-4 border-b border-white/5 px-5 py-4 last:border-b-0"
            >
              <Skeleton className="h-4 flex-1 rounded bg-white/[0.06]" />
              <Skeleton className="h-4 w-20 rounded bg-white/[0.06]" />
              <Skeleton className="h-4 w-16 rounded bg-white/[0.06]" />
              <Skeleton className="h-4 w-24 rounded bg-white/[0.06]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Reveal>
        <DashHeader
          icon={Database}
          title="All Data"
          subtitle="View and export your project data and statistics"
          accent="#4ADE80"
          right={
            <motion.button
              type="button"
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleCopyTitles}
              className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-[#D8CFBC] backdrop-blur-sm transition-colors hover:border-[#4ADE80]/30 hover:bg-[#4ADE80]/10 hover:text-[#4ADE80]"
            >
              {copied ? (
                <Check className="size-3.5 text-[#4ADE80]" />
              ) : (
                <Copy className="size-3.5" />
              )}
              {copied ? "Copied!" : "Copy All Titles"}
            </motion.button>
          }
        />
      </Reveal>

      <Reveal delay={0.05}>
        <div className="flex w-fit gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-1 backdrop-blur-sm">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className="relative cursor-pointer rounded-lg px-4 py-2 text-sm font-medium"
            >
              {activeTab === tab && (
                <motion.span
                  layoutId="getalldata-tab-pill"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#4ADE80] to-[#22D3EE]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 transition-colors ${
                  activeTab === tab
                    ? "font-semibold text-[#07110A]"
                    : "text-[#A3A3A3] hover:text-[#D8CFBC]"
                }`}
              >
                {tab}
              </span>
            </button>
          ))}
        </div>
      </Reveal>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === "Projects" && (
            <Reveal>
              <GlowCard className="overflow-hidden">
                <div className="overflow-x-auto">
                  <div className="min-w-[720px]">
                    <div className="grid grid-cols-[2fr_1fr_1.6fr_0.8fr_1fr] items-center gap-4 border-b border-white/10 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6B6B6B]">
                      <span>Title</span>
                      <span>Category</span>
                      <span>Tech</span>
                      <span>Featured</span>
                      <span>Created</span>
                    </div>
                    {projects.map((p, i) => (
                      <Reveal
                        key={p.ProjectID}
                        delay={Math.min(i * 0.04, 0.4)}
                        y={12}
                        className="grid grid-cols-[2fr_1fr_1.6fr_0.8fr_1fr] items-center gap-4 border-b border-white/5 px-5 py-3.5 transition-colors last:border-b-0 hover:bg-white/[0.03]"
                      >
                        <span className="truncate text-sm font-medium text-[#FAFAFA]">
                          {p.title}
                        </span>
                        <span>
                          <Badge
                            variant="secondary"
                            className="border border-white/10 bg-white/[0.04] text-[10px] text-[#D8CFBC]"
                          >
                            {p.category}
                          </Badge>
                        </span>
                        <span>
                          <div className="flex flex-wrap gap-1">
                            {p.tech?.slice(0, 3).map((t) => (
                              <Badge
                                key={t}
                                variant="secondary"
                                className="border border-white/10 bg-white/[0.04] text-[10px] text-[#D8CFBC]"
                              >
                                {t}
                              </Badge>
                            ))}
                            {(p.tech?.length || 0) > 3 && (
                              <Badge
                                variant="secondary"
                                className="border border-white/10 bg-white/[0.04] text-[10px] text-[#6B6B6B]"
                              >
                                +{(p.tech?.length || 0) - 3}
                              </Badge>
                            )}
                          </div>
                        </span>
                        <span>
                          {p.featured ? (
                            <Badge
                              variant="secondary"
                              className="border border-[#FACC15]/25 bg-[#FACC15]/10 text-[10px] text-[#FACC15]"
                            >
                              <Star className="mr-0.5 size-2.5" />
                              Yes
                            </Badge>
                          ) : (
                            <span className="text-xs text-[#6B6B6B]">No</span>
                          )}
                        </span>
                        <span className="text-xs text-[#6B6B6B]">
                          {new Date(p.createdAt).toLocaleDateString()}
                        </span>
                      </Reveal>
                    ))}
                    {projects.length === 0 && (
                      <div className="px-5 py-8 text-center text-sm text-[#6B6B6B]">
                        No projects found
                      </div>
                    )}
                  </div>
                </div>
              </GlowCard>
            </Reveal>
          )}

          {activeTab === "Project IDs" && (
            <Reveal>
              <GlowCard className="overflow-hidden">
                <div className="overflow-x-auto">
                  <div className="min-w-[720px]">
                    <div className="grid grid-cols-[2fr_1.2fr_1.6fr_1.6fr] items-center gap-4 border-b border-white/10 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6B6B6B]">
                      <span>Title</span>
                      <span>ProjectID</span>
                      <span>Live Demo</span>
                      <span>GitHub</span>
                    </div>
                    {projects.map((p, i) => (
                      <Reveal
                        key={p.ProjectID}
                        delay={Math.min(i * 0.04, 0.4)}
                        y={12}
                        className="grid grid-cols-[2fr_1.2fr_1.6fr_1.6fr] items-center gap-4 border-b border-white/5 px-5 py-3.5 transition-colors last:border-b-0 hover:bg-white/[0.03]"
                      >
                        <span className="truncate text-sm font-medium text-[#FAFAFA]">
                          {p.title}
                        </span>
                        <span>
                          <code className="rounded-md border border-[#4ADE80]/20 bg-[#4ADE80]/5 px-1.5 py-0.5 font-mono text-xs text-[#4ADE80]">
                            {p.ProjectID}
                          </code>
                        </span>
                        <span>
                          {p.liveDemo ? (
                            <a
                              href={p.liveDemo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block max-w-[200px] truncate text-xs text-[#4ADE80] hover:underline"
                            >
                              {p.liveDemo}
                            </a>
                          ) : (
                            <span className="text-xs text-[#6B6B6B]">-</span>
                          )}
                        </span>
                        <span>
                          {p.github ? (
                            <a
                              href={p.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block max-w-[200px] truncate text-xs text-[#4ADE80] hover:underline"
                            >
                              {p.github}
                            </a>
                          ) : (
                            <span className="text-xs text-[#6B6B6B]">-</span>
                          )}
                        </span>
                      </Reveal>
                    ))}
                    {projects.length === 0 && (
                      <div className="px-5 py-8 text-center text-sm text-[#6B6B6B]">
                        No projects found
                      </div>
                    )}
                  </div>
                </div>
              </GlowCard>
            </Reveal>
          )}

          {activeTab === "Stats" && (
            <PageIntro className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {statCards.map((stat) => (
                <FadeItem key={stat.label} className="h-full">
                  <StatCard
                    icon={stat.icon}
                    label={stat.label}
                    value={stat.value}
                    accent={stat.accent}
                    badge={stat.badge}
                  />
                </FadeItem>
              ))}
            </PageIntro>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}