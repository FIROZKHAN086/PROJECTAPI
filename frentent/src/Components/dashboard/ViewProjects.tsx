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
  Sparkles,
  GitBranchIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects } from "@/src/hooks/useProjects";
import type { Project } from "@/src/types/project";
import { CustomFieldsDisplay } from "./CustomFieldsDrawer";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 16 },
  },
};

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

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-16 h-16 rounded-full bg-[#F87171]/10 flex items-center justify-center">
          <Eye className="w-8 h-8 text-[#F87171]" />
        </div>
        <p className="text-[#F87171] font-medium">Failed to load projects</p>
        <p className="text-sm text-[#8A8578]">{error.message ?? "Please try again later."}</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Controls */}
      <motion.div variants={item} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8578]" />
          <Input
            placeholder="Search projects by name, description, or tech..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-[#141414] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:ring-[#4ADE80]/50"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
              viewMode === "grid"
                ? "bg-[#4ADE80]/10 border-[#4ADE80]/30 text-[#4ADE80]"
                : "bg-[#141414] border-white/10 text-[#8A8578] hover:text-[#D8CFBC]"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Grid
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
              viewMode === "list"
                ? "bg-[#4ADE80]/10 border-[#4ADE80]/30 text-[#4ADE80]"
                : "bg-[#141414] border-white/10 text-[#8A8578] hover:text-[#D8CFBC]"
            }`}
          >
            <Rows3 className="w-3.5 h-3.5" />
            List
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="flex items-center gap-4 text-xs text-[#8A8578]">
        <span className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
          {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        </span>
        {filtered.filter((p) => p.featured).length > 0 && (
          <span className="flex items-center gap-1.5">
            <Star className="w-3 h-3 text-[#FACC15]" />
            {filtered.filter((p) => p.featured).length} featured
          </span>
        )}
      </motion.div>

      {/* Loading */}
      {isLoading ? (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5" : "space-y-3"}>
          {Array.from({ length: 6 }).map((_, i) =>
            viewMode === "grid" ? (
              <div key={i} className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden">
                <Skeleton className="h-44 w-full bg-white/5 rounded-none" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-5 w-40 bg-white/5" />
                  <Skeleton className="h-4 w-full bg-white/5" />
                  <Skeleton className="h-4 w-3/4 bg-white/5" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16 rounded-full bg-white/5" />
                    <Skeleton className="h-6 w-16 rounded-full bg-white/5" />
                  </div>
                </div>
              </div>
            ) : (
              <div key={i} className="flex items-center gap-4 bg-[#141414] border border-white/10 rounded-xl p-4">
                <Skeleton className="h-16 w-16 rounded-lg bg-white/5 shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32 bg-white/5" />
                  <Skeleton className="h-3 w-48 bg-white/5" />
                </div>
              </div>
            )
          )}
        </div>
      ) : filtered.length === 0 ? (
        <motion.div variants={item} className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
            <Search className="w-7 h-7 text-[#8A8578]" />
          </div>
          <p className="text-[#8A8578] text-sm">No projects found</p>
          {search && (
            <p className="text-[#8A8578]/60 text-xs">
              Try a different search term
            </p>
          )}
        </motion.div>
      ) : viewMode === "grid" ? (
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((project) => (
            <ProjectCard key={project.ProjectID} project={project} />
          ))}
        </motion.div>
      ) : (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
          {filtered.map((project) => (
            <ProjectRow key={project.ProjectID} project={project} />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      variants={item}
      whileHover={{ y: -4 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
      className="group bg-[#141414] border border-white/10 rounded-2xl overflow-hidden hover:border-[#4ADE80]/30 transition-colors duration-300"
    >
      {/* Image */}
      <div className="relative h-44 bg-gradient-to-br from-[#0A0A0A] to-[#1a1a1a] overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center">
              <Code className="w-7 h-7 text-[#8A8578]" />
            </div>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-60" />

        {/* Badges */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          {project.featured && (
            <Badge className="bg-[#FACC15]/20 text-[#FACC15] border border-[#FACC15]/30 text-[10px] backdrop-blur-sm">
              <Star className="w-2.5 h-2.5 mr-0.5" />
              Featured
            </Badge>
          )}
        </div>

        {/* Category */}
        {project.category && (
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-[#0A0A0A]/80 text-[#D8CFBC] border border-white/10 text-[10px] backdrop-blur-sm">
              {project.category}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-[#FFFBF4] font-semibold text-base mb-1.5 group-hover:text-[#4ADE80] transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-[#8A8578] line-clamp-2 mb-3 leading-relaxed">
          {project.description}
        </p>

        {/* Tech */}
        {project.tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 4).map((t) => (
              <Badge
                key={t}
                className="bg-[#C084FC]/10 text-[#C084FC] border border-[#C084FC]/20 text-[10px] px-2 py-0"
              >
                {t}
              </Badge>
            ))}
            {project.tech.length > 4 && (
              <Badge className="bg-white/5 text-[#8A8578] border border-white/10 text-[10px] px-2 py-0">
                +{project.tech.length - 4}
              </Badge>
            )}
          </div>
        )}

        {/* Custom Fields */}
        <CustomFieldsDisplay fields={project.customFields} />

        {/* Links */}
        <div className="flex items-center gap-2 pt-3 border-t border-white/5">
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#4ADE80]/10 text-[#4ADE80] text-[11px] font-medium hover:bg-[#4ADE80]/20 transition-colors"
            >
              <Globe className="w-3 h-3" />
              Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 text-[#D8CFBC] text-[11px] font-medium hover:bg-white/10 transition-colors"
            >
              <GitBranchIcon className="w-3 h-3" />
              Source
            </a>
          )}
          {!project.liveDemo && !project.github && (
            <span className="text-[11px] text-[#8A8578]/50 italic">No links available</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectRow = ({ project }: { project: Project }) => {
  return (
    <motion.div
      variants={item}
      whileHover={{ x: 4 }}
      className="group flex items-center gap-4 bg-[#141414] border border-white/10 rounded-xl p-4 hover:border-[#4ADE80]/30 transition-colors duration-300 cursor-default"
    >
      {/* Thumbnail */}
      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#0A0A0A] to-[#1a1a1a] overflow-hidden shrink-0 border border-white/5">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Code className="w-6 h-6 text-[#8A8578]" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="text-[#FFFBF4] font-medium text-sm truncate group-hover:text-[#4ADE80] transition-colors">
            {project.title}
          </h3>
          {project.featured && (
            <Star className="w-3 h-3 text-[#FACC15] shrink-0" />
          )}
          {project.category && (
            <Badge className="bg-white/5 text-[#8A8578] border border-white/10 text-[9px] shrink-0">
              {project.category}
            </Badge>
          )}
        </div>
        <p className="text-xs text-[#8A8578] truncate">{project.description}</p>
      </div>

      {/* Tech */}
      <div className="hidden lg:flex items-center gap-1.5 shrink-0">
        {project.tech.slice(0, 3).map((t) => (
          <Badge
            key={t}
            className="bg-[#C084FC]/10 text-[#C084FC] border border-[#C084FC]/20 text-[9px] px-1.5 py-0"
          >
            {t}
          </Badge>
        ))}
        {project.tech.length > 3 && (
          <Badge className="bg-white/5 text-[#8A8578] border border-white/10 text-[9px] px-1.5 py-0">
            +{project.tech.length - 3}
          </Badge>
        )}
      </div>

      {/* Custom Fields */}
      {project.customFields && Object.keys(project.customFields).length > 0 && (
        <div className="hidden xl:flex items-center gap-1.5 shrink-0">
          {Object.entries(project.customFields).slice(0, 2).map(([key, value]) => (
            <Badge
              key={key}
              className="bg-[#60A5FA]/10 text-[#60A5FA] border border-[#60A5FA]/20 text-[9px] px-1.5 py-0"
            >
              {key}: {String(value)}
            </Badge>
          ))}
        </div>
      )}

      {/* Links */}
      <div className="flex items-center gap-1.5 shrink-0">
        {project.liveDemo && (
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[#4ADE80]/10 text-[#4ADE80] hover:bg-[#4ADE80]/20 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white/5 text-[#D8CFBC] hover:bg-white/10 transition-colors"
          >
            <GitBranch className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ViewProjects;
