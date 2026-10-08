"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FolderOpen,
  Star,
  LayoutGrid,
  Layers,
  PlusCircle,
  AlertTriangle,
  TrendingUp,
  Clock,
  Users,
  Zap,
  Shield,
  Database,
  Code,
  ArrowUpRight,
  Activity,
  Globe,
  Target,
  Plus,
  Eye,
  RefreshCw,
} from "lucide-react";
import {
  Reveal,
  Counter,
  GrowBar,
  GlowCard,
  StatCard,
  GradientText,
  FadeItem,
  PageIntro,
} from "@/src/Components/dashboard/ui";
import { useProjects } from "@/src/hooks/useProjects";
import type { Project } from "@/src/types/project";
import type { LucideIcon } from "lucide-react";

type Stat = {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
};

type DashboardProject = Project & { status?: string };

const VIEWERS = Math.floor(Math.random() * 50 + 10);

const TypewriterText: React.FC<{ text: string; className?: string }> = ({
  text,
  className = "",
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsComplete(true);
      }
    }, 30);

    return () => clearTimeout(timer);
  }, [currentIndex, text]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayText("");
      setCurrentIndex(0);
      setIsComplete(false);
    }, 0);

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <span className={`relative ${className}`}>
      {displayText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-[2px] h-5 rounded bg-gradient-to-b from-[#4ADE80] to-[#22D3EE] ml-0.5"
        />
      )}
    </span>
  );
};

const timeAgo = (dateStr: string): string => {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(dateStr).toLocaleDateString();
};

const ActivityItem: React.FC<{ project: DashboardProject; index: number }> = ({
  project,
  index,
}) => {
  return (
    <Reveal delay={index * 0.06} y={16}>
      <div className="group flex items-start gap-3.5 px-2 py-3 rounded-xl transition-colors hover:bg-white/[0.03]">
        <div className="relative mt-0.5 shrink-0">
          <div
            className="flex size-9 items-center justify-center rounded-xl border"
            style={{
              backgroundColor: project.featured ? "#FACC1514" : "#4ADE8014",
              borderColor: project.featured ? "#FACC1526" : "#4ADE8026",
            }}
          >
            {project.featured ? (
              <Star className="size-4 text-[#FACC15]" />
            ) : (
              <PlusCircle className="size-4 text-[#4ADE80]" />
            )}
          </div>
          <motion.span
            animate={{ scale: [1, 1.35, 1], opacity: [0.9, 0.4, 0.9] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.3 }}
            className="absolute -top-0.5 -right-0.5 size-2 rounded-full border-2 border-[#0B0B10]"
            style={{
              backgroundColor: project.featured ? "#FACC15" : "#4ADE80",
            }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-medium text-[#FAFAFA] truncate">
              {project.title}
            </p>
            {project.status === "active" && (
              <span className="rounded-full border border-[#4ADE80]/25 bg-[#4ADE80]/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#4ADE80]">
                Active
              </span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-3 text-[11px] text-[#6B6B6B]">
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {timeAgo(project.createdAt)}
            </span>
            {project.category && (
              <span className="flex items-center gap-1">
                <FolderOpen className="size-3" />
                {project.category}
              </span>
            )}
            {project.tech && project.tech.length > 0 && (
              <span className="hidden sm:flex items-center gap-1">
                <Layers className="size-3" />
                {project.tech.slice(0, 2).join(", ")}
                {project.tech.length > 2 ? ` +${project.tech.length - 2}` : ""}
              </span>
            )}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.12, rotate: 45 }}
          whileTap={{ scale: 0.9 }}
          className="mt-1 p-1.5 rounded-lg border border-white/10 text-[#6B6B6B] hover:text-[#4ADE80] hover:border-[#4ADE80]/30 hover:bg-[#4ADE80]/10 transition-colors opacity-0 group-hover:opacity-100"
        >
          <ArrowUpRight className="size-3.5" />
        </motion.button>
      </div>
    </Reveal>
  );
};

const Overview = () => {
  const router = useRouter();
  const { data, isLoading, error } = useProjects();
  const projects: DashboardProject[] = (data?.data ?? []) as DashboardProject[];

  const totalProjects = projects.length;
  const featuredCount = projects.filter((p) => p.featured).length;
  const uniqueCategories = new Set(projects.map((p) => p.category).filter(Boolean)).size;
  const uniqueTech = new Set(projects.flatMap((p) => p.tech).filter(Boolean)).size;
  const activeProjects =
    projects.filter((p) => p.status === "active").length || totalProjects;
  const totalTechUsed = projects.reduce((acc: number, p) => acc + (p.tech?.length || 0), 0);
  const completionRate =
    totalProjects > 0 ? Math.round((activeProjects / totalProjects) * 100) : 0;

  const stats: Stat[] = [
    { label: "Total Projects", value: totalProjects, icon: FolderOpen, color: "#4ADE80" },
    { label: "Featured", value: featuredCount, icon: Star, color: "#FACC15" },
    { label: "Categories", value: uniqueCategories, icon: LayoutGrid, color: "#60A5FA" },
    { label: "Tech Stack", value: uniqueTech, icon: Layers, color: "#C084FC" },
  ];

  const miniStats = [
    { label: "Total Tech Usage", value: totalTechUsed, icon: Code, color: "#F472B6" },
    { label: "Active Projects", value: activeProjects, icon: Activity, color: "#34D399" },
    { label: "Categories Used", value: uniqueCategories, icon: Database, color: "#FBBF24" },
    { label: "Completion Rate", value: completionRate, icon: Target, color: "#818CF8", suffix: "%" },
  ];

  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const usages = [
    {
      label: "Projects",
      color: "#4ADE80",
      value: Math.min(Math.round((totalProjects / 20) * 100), 100),
      count: `${totalProjects} / 20`,
    },
    {
      label: "Categories",
      color: "#60A5FA",
      value: Math.min(Math.round((uniqueCategories / 10) * 100), 100),
      count: `${uniqueCategories} / 10`,
    },
    {
      label: "Tech Stack",
      color: "#C084FC",
      value: Math.min(Math.round((uniqueTech / 30) * 100), 100),
      count: `${uniqueTech} / 30`,
    },
  ];

  const quickActions = [
    { label: "Add Project", icon: Plus, path: "add-new-project", accent: "#4ADE80" },
    { label: "View Projects", icon: Eye, path: "project", accent: "#60A5FA" },
    { label: "All Data", icon: Database, path: "get-all-data", accent: "#C084FC" },
  ];

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <GlowCard glow="248, 113, 113, " className="w-full max-w-md">
          <div className="flex flex-col items-center py-12 px-6 gap-4">
            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="flex size-14 items-center justify-center rounded-2xl border border-[#F87171]/30 bg-[#F87171]/10"
            >
              <AlertTriangle className="size-7 text-[#F87171]" />
            </motion.div>
            <h3 className="text-lg font-bold text-[#FAFAFA] font-space-grotesk">
              Failed to Load Data
            </h3>
            <p className="text-sm text-[#A3A3A3] text-center">
              {error.message || "Please try again later."}
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] px-5 py-2 text-sm font-semibold text-[#07110A] shadow-[0_8px_24px_-8px_rgba(74,222,128,0.7)]"
            >
              <RefreshCw className="size-4" />
              Retry
            </motion.button>
          </div>
        </GlowCard>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero */}
      <Reveal>
        <GlowCard className="relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-[#4ADE80]/15 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-28 -left-16 size-64 rounded-full bg-[#22D3EE]/10 blur-[100px]" />
          <div className="relative z-10 p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#4ADE80]/25 bg-[#4ADE80]/10 px-3 py-1.5 text-[11px] font-medium text-[#4ADE80]"
                >
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#4ADE80] opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-[#4ADE80]" />
                  </span>
                  Live dashboard
                </motion.div>

                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FAFAFA] font-space-grotesk leading-tight">
                  <TypewriterText text="Dashboard Overview" />
                </h1>

                <div className="flex items-center gap-2 text-sm text-[#A3A3A3] flex-wrap">
                  <Globe className="size-3.5 text-[#4ADE80]" />
                  <span>Real-time insights & analytics</span>
                  <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px]">
                    <Zap className="size-2.5 text-[#FACC15]" />
                    +12% growth
                  </span>
                  <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-[#6B6B6B]">
                    <Clock className="size-2.5" />
                    Updated now
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {quickActions.map((action, i) => (
                    <motion.button
                      key={action.path}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.12 }}
                      whileHover={{ y: -2, scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => router.push(`/dashboard?path=${action.path}`)}
                      className="flex items-center gap-2 rounded-xl border px-4 py-2 text-[13px] font-medium text-[#D8CFBC] transition-colors"
                      style={{ borderColor: `${action.accent}33`, backgroundColor: `${action.accent}12` }}
                    >
                      <action.icon className="size-4" style={{ color: action.accent }} />
                      {action.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex items-center gap-3 flex-wrap lg:shrink-0"
              >
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <div className="flex -space-x-1.5">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex size-7 items-center justify-center rounded-full border-2 border-[#141414] bg-gradient-to-br from-[#D8CFBC] to-[#8A8578] text-[9px] font-bold text-[#0A0A0A]"
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#FAFAFA] leading-none">
                      {VIEWERS} <span className="text-[#6B6B6B] font-normal">live</span>
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-[10px] text-[#6B6B6B]">
                      <Users className="size-2.5" />
                      viewers right now
                    </p>
                  </div>
                </div>
                <div className="hidden xl:flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <div className="flex size-9 items-center justify-center rounded-xl border border-[#4ADE80]/30 bg-[#4ADE80]/10">
                    <Shield className="size-4 text-[#4ADE80]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#FAFAFA] leading-none">
                      <GradientText>99.9%</GradientText>
                    </p>
                    <p className="mt-0.5 text-[10px] text-[#6B6B6B]">uptime guarantee</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </GlowCard>
      </Reveal>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <Skeleton className="h-4 w-20 bg-white/[0.06]" />
                  <Skeleton className="size-11 rounded-xl bg-white/[0.06]" />
                </div>
                <Skeleton className="h-8 w-16 bg-white/[0.06]" />
                <Skeleton className="h-1 w-full bg-white/[0.06]" />
              </div>
            ))
          : stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.08} y={24}>
                <StatCard
                  icon={stat.icon}
                  label={stat.label}
                  value={stat.value}
                  accent={stat.color}
                  badge={index === 0 ? "All time" : index === 1 ? "Top rated" : undefined}
                />
              </Reveal>
            ))}
      </div>

      {/* Analytics panel */}
      <Reveal>
        <GlowCard>
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between mb-7">
              <div>
                <h3 className="flex items-center gap-2 text-lg font-bold text-[#FAFAFA] font-space-grotesk">
                  <span className="flex size-8 items-center justify-center rounded-lg border border-[#60A5FA]/30 bg-[#60A5FA]/10">
                    <Activity className="size-4 text-[#60A5FA]" />
                  </span>
                  Analytics & Usage
                </h3>
                <p className="mt-1 text-sm text-[#A3A3A3]">Project health at a glance</p>
              </div>
              <span className="hidden sm:flex items-center gap-1.5 rounded-full border border-[#4ADE80]/25 bg-[#4ADE80]/10 px-3 py-1 text-[10px] font-medium text-[#4ADE80]">
                <TrendingUp className="size-3" />
                +12.4% this week
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
              {/* Mini metrics */}
              <div className="lg:col-span-3 grid grid-cols-2 gap-3.5">
                {miniStats.map((stat) => (
                  <PageIntro key={stat.label}>
                    <FadeItem>
                      <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex size-9 items-center justify-center rounded-lg border"
                            style={{
                              backgroundColor: `${stat.color}14`,
                              borderColor: `${stat.color}26`,
                            }}
                          >
                            <stat.icon className="size-4" style={{ color: stat.color }} />
                          </div>
                          <div>
                            <p className="text-lg font-bold text-[#FAFAFA] font-space-grotesk leading-none">
                              {typeof stat.value === "number" ? (
                                <Counter to={stat.value} suffix={stat.suffix ?? ""} />
                              ) : (
                                stat.value
                              )}
                            </p>
                            <p className="mt-0.5 text-[11px] text-[#6B6B6B]">{stat.label}</p>
                          </div>
                        </div>
                      </div>
                    </FadeItem>
                  </PageIntro>
                ))}
              </div>

              {/* Donut + usage */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center gap-5">
                  <div className="relative size-32 shrink-0">
                    <svg viewBox="0 0 128 128" className="size-32 -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="54"
                        fill="none"
                        stroke="rgba(255,255,255,0.07)"
                        strokeWidth="12"
                      />
                      <motion.circle
                        cx="64"
                        cy="64"
                        r="54"
                        fill="none"
                        stroke="url(#donutGrad)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 54}
                        initial={{ strokeDashoffset: 2 * Math.PI * 54 }}
                        whileInView={{ strokeDashoffset: 2 * Math.PI * 54 * (1 - completionRate / 100) }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
                      />
                      <defs>
                        <linearGradient id="donutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#4ADE80" />
                          <stop offset="100%" stopColor="#22D3EE" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-2xl font-bold text-[#FAFAFA] font-space-grotesk leading-none">
                        <Counter to={completionRate} suffix="%" />
                      </p>
                      <p className="mt-1 text-[10px] text-[#6B6B6B]">completion</p>
                    </div>
                  </div>
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs text-[#A3A3A3]">
                      <span className="size-2 rounded-full bg-[#4ADE80]" />
                      Healthy projects
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#A3A3A3]">
                      <span className="size-2 rounded-full bg-[#FACC15]" />
                      Needs attention
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#A3A3A3]">
                      <span className="size-2 rounded-full bg-[#F87171]" />
                      At limit
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {isLoading
                    ? Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Skeleton className="h-3 w-20 bg-white/[0.06]" />
                            <Skeleton className="h-3 w-10 bg-white/[0.06]" />
                          </div>
                          <Skeleton className="h-2 w-full bg-white/[0.06]" />
                        </div>
                      ))
                    : usages.map((usage) => (
                        <div key={usage.label} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[#D8CFBC] flex items-center gap-2">
                              <span
                                className="size-1.5 rounded-full"
                                style={{ backgroundColor: usage.color, boxShadow: `0 0 8px ${usage.color}` }}
                              />
                              {usage.label}
                            </span>
                            <span className="font-medium text-[#FAFAFA]">{usage.count}</span>
                          </div>
                          <GrowBar to={usage.value} color={usage.color} height="h-2" />
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </div>
        </GlowCard>
      </Reveal>

      {/* Recent activity */}
      <Reveal>
        <GlowCard>
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="flex items-center gap-2 text-lg font-bold text-[#FAFAFA] font-space-grotesk">
                  <span className="flex size-8 items-center justify-center rounded-lg border border-[#4ADE80]/30 bg-[#4ADE80]/10">
                    <Activity className="size-4 text-[#4ADE80]" />
                  </span>
                  Recent Activity
                </h3>
                <p className="mt-1 text-sm text-[#A3A3A3]">Latest projects and updates</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => router.push("/dashboard?path=project")}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-[#D8CFBC] hover:border-[#4ADE80]/30 hover:text-[#4ADE80] transition-colors"
              >
                View all
                <ArrowUpRight className="size-3.5" />
              </motion.button>
            </div>

            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3.5 px-2 py-3">
                    <Skeleton className="size-9 rounded-xl bg-white/[0.06]" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-3.5 w-40 bg-white/[0.06]" />
                      <Skeleton className="h-3 w-24 bg-white/[0.06]" />
                    </div>
                    <Skeleton className="size-7 rounded-lg bg-white/[0.06]" />
                  </div>
                ))
              : recentProjects.map((project, index) => (
                  <ActivityItem key={project.id} project={project} index={index} />
                ))}

            {!isLoading && recentProjects.length === 0 && (
              <p className="py-10 text-center text-sm text-[#6B6B6B]">
                No recent activity to display.
              </p>
            )}

            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-white/10 pt-4 text-[11px] text-[#6B6B6B]">
              <span>Last synced {new Date().toLocaleTimeString()}</span>
              <span className="flex items-center gap-1.5">
                <Shield className="size-3 text-[#4ADE80]" />
                All systems operational
              </span>
            </div>
          </div>
        </GlowCard>
      </Reveal>
    </div>
  );
};

export default Overview;