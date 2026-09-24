"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Star,
  Search,
  LayoutGrid,
  Rows3,
  Eye,
  Code,
  Globe,
  GitBranch,
  GitBranchIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects } from "@/src/hooks/useProjects";
import type { Project } from "@/src/types/project";
import { CustomFieldsDisplay } from "./Components/CustomFieldsDrawer";
import {
  Reveal,
  GlowCard,
  DashHeader,
  GradientText,
} from "@/src/Components/dashboard/ui";

const viewOptions = [
  { mode: "grid" as const, icon: LayoutGrid, label: "Grid" },
  { mode: "list" as const, icon: Rows3, label: "List" },
];

function ProjectImage({
  image,
  title,
  className = "",
}: {
  image: string;
  title: string;
  className?: string;
}) {
  const withImage = image ? "bg-cover bg-center" : "";
  return (
    <div
      role="img"
      aria-label={image ? title : undefined}
      className={`${className} ${withImage} ${
        image
          ? ""
          : "flex items-center justify-center bg-gradient-to-br from-[#0B0B10] to-[#14181C]"
      }`}
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      {!image && (
        <div className="flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
          <Code className="size-7 text-[#6B6B6B]" />
        </div>
      )}
    </div>
  );
}

const ViewProjects = () => {
  const { data, isLoading, error } = useProjects();
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const projects = data?.data ?? [];

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  const heroProject = filtered[0];
  const gridProjects = filtered.slice(1);
  const featuredCount = filtered.filter((p) => p.featured).length;

  if (error) {
    return (
      <div className="space-y-6">
        <Reveal>
          <GlowCard glow="248, 113, 113" className="w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-6 py-16">
              <div className="flex size-14 items-center justify-center rounded-full border border-[#F87171]/30 bg-[#F87171]/10">
                <Eye className="size-7 text-[#F87171]" />
              </div>
              <p className="font-medium text-[#FAFAFA] font-space-grotesk">
                Failed to load projects
              </p>
              <p className="text-sm text-[#A3A3A3]">
                {error.message ?? "Please try again later."}
              </p>
            </div>
          </GlowCard>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Reveal>
        <DashHeader
          icon={Eye}
          title="View Projects"
          subtitle="Preview how your projects look"
          accent="#4ADE80"
        />
      </Reveal>

      <Reveal delay={0.05}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#6B6B6B]" />
            <Input
              placeholder="Search projects by name, description, or tech..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 rounded-xl border-white/10 bg-white/[0.04] pl-9 text-[#FAFAFA] placeholder:text-[#6B6B6B] focus-visible:ring-[#4ADE80]/40 focus-visible:border-[#4ADE80]/40 backdrop-blur-sm"
            />
          </div>
          <div className="flex w-fit gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-1 backdrop-blur-sm">
            {viewOptions.map((opt) => (
              <button
                key={opt.mode}
                type="button"
                onClick={() => setViewMode(opt.mode)}
                className="relative flex cursor-pointer items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium"
              >
                {viewMode === opt.mode && (
                  <motion.span
                    layoutId="viewprojects-mode-pill"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#4ADE80] to-[#22D3EE]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <opt.icon
                  className={`relative z-10 size-3.5 transition-colors ${
                    viewMode === opt.mode ? "text-[#07110A]" : "text-[#6B6B6B]"
                  }`}
                />
                <span
                  className={`relative z-10 transition-colors ${
                    viewMode === opt.mode
                      ? "font-semibold text-[#07110A]"
                      : "text-[#A3A3A3]"
                  }`}
                >
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="flex items-center gap-4 text-xs text-[#6B6B6B]">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-[#4ADE80] shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
            <GradientText className="font-bold">
              {filtered.length}
            </GradientText>
            project{filtered.length !== 1 ? "s" : ""}
          </span>
          {featuredCount > 0 && (
            <span className="flex items-center gap-1.5">
              <Star className="size-3 text-[#FACC15]" />
              {featuredCount} featured
            </span>
          )}
        </div>
      </Reveal>

      {isLoading ? (
        <div
          className={viewMode === "grid" ? "grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3" : "space-y-3"}
        >
          {Array.from({ length: 6 }).map((_, i) =>
            viewMode === "grid" ? (
              <div key={i} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
                <Skeleton className="h-44 w-full rounded-none bg-white/[0.06]" />
                <div className="space-y-3 p-5">
                  <Skeleton className="h-5 w-40 rounded bg-white/[0.06]" />
                  <Skeleton className="h-4 w-full rounded bg-white/[0.06]" />
                  <Skeleton className="h-4 w-3/4 rounded bg-white/[0.06]" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16 rounded-full bg-white/[0.06]" />
                    <Skeleton className="h-6 w-16 rounded-full bg-white/[0.06]" />
                  </div>
                </div>
              </div>
            ) : (
              <div key={i} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <Skeleton className="size-16 shrink-0 rounded-lg bg-white/[0.06]" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32 rounded bg-white/[0.06]" />
                  <Skeleton className="h-3 w-48 rounded bg-white/[0.06]" />
                </div>
              </div>
            )
          )}
        </div>
      ) : filtered.length === 0 ? (
        <Reveal>
          <div className="flex flex-col items-center justify-center gap-4 py-16">
            <div className="flex size-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
              <Search className="size-7 text-[#6B6B6B]" />
            </div>
            <p className="text-sm text-[#A3A3A3]">No projects found</p>
            {search && (
              <p className="text-xs text-[#6B6B6B]">Try a different search term</p>
            )}
          </div>
        </Reveal>
      ) : viewMode === "grid" ? (
        <div className="space-y-5">
          {heroProject && (
            <Reveal>
              <ProjectHeroCard project={heroProject} />
            </Reveal>
          )}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {gridProjects.map((project, i) => (
              <Reveal key={project.ProjectID} delay={i * 0.06} y={20}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((project, i) => (
            <Reveal key={project.ProjectID} delay={i * 0.05} y={14}>
              <ProjectRow project={project} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
};

const ProjectHeroCard = ({ project }: { project: Project }) => {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 250, damping: 22 }}>
      <GlowCard className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-[#4ADE80]/15 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-28 -left-16 size-64 rounded-full bg-[#22D3EE]/10 blur-[100px]" />
        <div className="relative z-10 grid gap-6 p-6 sm:p-8 md:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {project.featured && (
                <Badge className="border border-[#FACC15]/30 bg-[#FACC15]/15 text-[10px] text-[#FACC15] backdrop-blur-sm">
                  <Star className="mr-0.5 size-2.5" />
                  Featured Project
                </Badge>
              )}
              {project.category && (
                <Badge className="border border-white/10 bg-white/[0.06] text-[10px] text-[#D8CFBC] backdrop-blur-sm">
                  {project.category}
                </Badge>
              )}
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-[#6B6B6B]">
                Created {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-[#FAFAFA] font-space-grotesk leading-tight sm:text-3xl">
              {project.title}
            </h3>
            <p className="max-w-xl text-sm leading-relaxed text-[#D8CFBC]">
              {project.description}
            </p>
            {project.tech.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {project.tech.slice(0, 6).map((t) => (
                  <Badge
                    key={t}
                    className="border border-[#C084FC]/25 bg-[#C084FC]/10 px-2 py-0 text-[10px] text-[#C084FC]"
                  >
                    {t}
                  </Badge>
                ))}
                {project.tech.length > 6 && (
                  <Badge className="border border-white/10 bg-white/[0.04] px-2 py-0 text-[10px] text-[#6B6B6B]">
                    +{project.tech.length - 6}
                  </Badge>
                )}
              </div>
            )}
            <CustomFieldsDisplay fields={project.customFields} />
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {project.liveDemo && (
                <motion.a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] px-4 py-2 text-xs font-semibold text-[#07110A] shadow-[0_8px_24px_-8px_rgba(74,222,128,0.7)]"
                >
                  <Globe className="size-3.5" />
                  Live Demo
                </motion.a>
              )}
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-[#D8CFBC] transition-colors hover:border-white/25 hover:bg-white/10"
                >
                  <GitBranchIcon className="size-3.5" />
                  Source
                </motion.a>
              )}
              {!project.liveDemo && !project.github && (
                <span className="text-xs italic text-[#6B6B6B]">No links available</span>
              )}
            </div>
          </div>
          <ProjectImage
            image={project.image}
            title={project.title}
            className="h-56 rounded-2xl border border-white/10 md:h-auto"
          />
        </div>
      </GlowCard>
    </motion.div>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <GlowCard className="h-full overflow-hidden">
        <div className="relative">
          <ProjectImage
            image={project.image}
            title={project.title}
            className="h-44 w-full"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0B10] via-transparent to-transparent opacity-60" />
          <div className="absolute right-3 top-3 flex gap-1.5">
            {project.featured && (
              <Badge className="border border-[#FACC15]/30 bg-[#FACC15]/15 text-[10px] text-[#FACC15] backdrop-blur-sm">
                <Star className="mr-0.5 size-2.5" />
                Featured
              </Badge>
            )}
          </div>
          {project.category && (
            <div className="absolute bottom-3 left-3">
              <Badge className="border border-white/10 bg-[#0B0B10]/80 text-[10px] text-[#D8CFBC] backdrop-blur-sm">
                {project.category}
              </Badge>
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="mb-1.5 text-base font-semibold text-[#FAFAFA] font-space-grotesk transition-colors group-hover:text-[#4ADE80]">
            {project.title}
          </h3>
          <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-[#A3A3A3]">
            {project.description}
          </p>
          {project.tech.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {project.tech.slice(0, 4).map((t) => (
                <Badge
                  key={t}
                  className="border border-[#C084FC]/25 bg-[#C084FC]/10 px-2 py-0 text-[10px] text-[#C084FC]"
                >
                  {t}
                </Badge>
              ))}
              {project.tech.length > 4 && (
                <Badge className="border border-white/10 bg-white/[0.04] px-2 py-0 text-[10px] text-[#6B6B6B]">
                  +{project.tech.length - 4}
                </Badge>
              )}
            </div>
          )}
          <CustomFieldsDisplay fields={project.customFields} />
          <div className="flex items-center gap-2 border-t border-white/10 pt-3">
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-[#4ADE80]/10 px-2.5 py-1.5 text-[11px] font-medium text-[#4ADE80] transition-colors hover:bg-[#4ADE80]/20"
              >
                <Globe className="size-3" />
                Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-[11px] font-medium text-[#D8CFBC] transition-colors hover:bg-white/10"
              >
                <GitBranchIcon className="size-3" />
                Source
              </a>
            )}
            {!project.liveDemo && !project.github && (
              <span className="text-[11px] italic text-[#6B6B6B]/60">No links available</span>
            )}
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
};

const ProjectRow = ({ project }: { project: Project }) => {
  return (
    <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}>
      <GlowCard hoverable={false} className="flex cursor-default items-center gap-4 p-4 transition-colors hover:border-[#4ADE80]/30">
        <ProjectImage
          image={project.image}
          title={project.title}
          className="size-16 shrink-0 rounded-xl border border-white/5"
        />
        <div className="min-w-0 flex-1">
          <div className="mb-0.5 flex items-center gap-2">
            <h3 className="truncate text-sm font-medium text-[#FAFAFA] transition-colors group-hover:text-[#4ADE80]">
              {project.title}
            </h3>
            {project.featured && <Star className="size-3 shrink-0 text-[#FACC15]" />}
            {project.category && (
              <Badge className="shrink-0 border border-white/10 bg-white/[0.04] text-[9px] text-[#6B6B6B]">
                {project.category}
              </Badge>
            )}
          </div>
          <p className="truncate text-xs text-[#6B6B6B]">{project.description}</p>
        </div>
        <div className="hidden shrink-0 items-center gap-1.5 lg:flex">
          {project.tech.slice(0, 3).map((t) => (
            <Badge
              key={t}
              className="border border-[#C084FC]/25 bg-[#C084FC]/10 px-1.5 py-0 text-[9px] text-[#C084FC]"
            >
              {t}
            </Badge>
          ))}
          {project.tech.length > 3 && (
            <Badge className="border border-white/10 bg-white/[0.04] px-1.5 py-0 text-[9px] text-[#6B6B6B]">
              +{project.tech.length - 3}
            </Badge>
          )}
        </div>
        {project.customFields && Object.keys(project.customFields).length > 0 && (
          <div className="hidden shrink-0 items-center gap-1.5 xl:flex">
            {Object.entries(project.customFields).slice(0, 2).map(([key, value]) => (
              <Badge
                key={key}
                className="border border-[#60A5FA]/25 bg-[#60A5FA]/10 px-1.5 py-0 text-[9px] text-[#60A5FA]"
              >
                {key}: {String(value)}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex shrink-0 items-center gap-1.5">
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[#4ADE80]/10 p-2 text-[#4ADE80] transition-colors hover:bg-[#4ADE80]/20"
            >
              <ExternalLink className="size-3.5" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-white/[0.04] p-2 text-[#D8CFBC] transition-colors hover:bg-white/10"
            >
              <GitBranch className="size-3.5" />
            </a>
          )}
        </div>
      </GlowCard>
    </motion.div>
  );
};

export default ViewProjects;