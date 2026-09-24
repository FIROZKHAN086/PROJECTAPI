"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  Pencil,
  Trash2,
  Eye,
  Star,
  AlertTriangle,
  FolderOpen,
} from "lucide-react";
import { useProjects, useDeleteProject } from "@/src/hooks/useProjects";
import { toast } from "@/src/lib/toastSlice";
import { CustomFieldsDisplay } from "./Components/CustomFieldsDrawer";
import {
  Reveal,
  GlowCard,
  DashHeader,
  PageIntro,
  FadeItem,
} from "@/src/Components/dashboard/ui";

type FilterType = "All" | "Featured";

const filters: { label: string; value: FilterType }[] = [
  { label: "All", value: "All" },
  { label: "Featured", value: "Featured" },
];

const Projects = () => {
  const router = useRouter();
  const { data, isLoading, error } = useProjects();
  const { mutate: deleteProject, isPending } = useDeleteProject();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  const projects = data?.data ?? [];

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "All" || (activeFilter === "Featured" && p.featured);
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (projectID: string, title: string) => {
    if (!window.confirm(`Delete project "${title}"? This cannot be undone.`)) return;
    deleteProject(projectID, {
      onSuccess: () => toast.success(`"${title}" deleted`),
      onError: () => toast.error("Failed to delete project"),
    });
  };

  if (error) {
    return (
      <div className="space-y-6">
        <Reveal>
          <GlowCard glow="248, 113, 113" className="w-full">
            <div className="flex flex-col items-center justify-center gap-3 px-6 py-12">
              <motion.div
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="flex size-12 items-center justify-center rounded-2xl border border-[#F87171]/30 bg-[#F87171]/10"
              >
                <AlertTriangle className="size-6 text-[#F87171]" />
              </motion.div>
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
          icon={FolderOpen}
          title="Projects"
          subtitle="Manage all your projects"
          accent="#4ADE80"
        />
      </Reveal>

      <Reveal delay={0.05}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#6B6B6B]" />
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 rounded-xl border-white/10 bg-white/[0.04] pl-9 text-[#FAFAFA] placeholder:text-[#6B6B6B] focus-visible:ring-[#4ADE80]/40 focus-visible:border-[#4ADE80]/40 backdrop-blur-sm"
            />
          </div>
          <div className="flex w-fit gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-1 backdrop-blur-sm">
            {filters.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setActiveFilter(f.value)}
                className="relative cursor-pointer rounded-lg px-4 py-2 text-xs font-medium"
              >
                {activeFilter === f.value && (
                  <motion.span
                    layoutId="projects-filter-pill"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#4ADE80] to-[#22D3EE]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors ${
                    activeFilter === f.value
                      ? "font-semibold text-[#07110A]"
                      : "text-[#A3A3A3] hover:text-[#D8CFBC]"
                  }`}
                >
                  {f.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5"
            >
              <div className="flex items-start justify-between">
                <Skeleton className="h-5 w-32 rounded bg-white/[0.06]" />
                <Skeleton className="h-5 w-14 rounded bg-white/[0.06]" />
              </div>
              <Skeleton className="h-4 w-full rounded bg-white/[0.06]" />
              <Skeleton className="h-4 w-3/4 rounded bg-white/[0.06]" />
              <div className="flex gap-1.5 pt-1">
                <Skeleton className="h-5 w-12 rounded-full bg-white/[0.06]" />
                <Skeleton className="h-5 w-12 rounded-full bg-white/[0.06]" />
              </div>
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-7 w-14 rounded-lg bg-white/[0.06]" />
                <Skeleton className="h-7 w-14 rounded-lg bg-white/[0.06]" />
                <Skeleton className="h-7 w-14 rounded-lg bg-white/[0.06]" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <PageIntro className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <FadeItem key={project.id} className="h-full">
              <motion.div
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
                className="h-full"
              >
                <GlowCard className="h-full">
                  <div className="flex h-full flex-col p-5">
                    <div className="mb-3 flex items-start justify-between">
                      <h3 className="mr-2 truncate font-semibold text-base text-[#FAFAFA] font-space-grotesk">
                        {project.title}
                      </h3>
                      <div className="flex shrink-0 gap-1.5">
                        {project.featured && (
                          <Badge
                            variant="secondary"
                            className="border border-[#FACC15]/25 bg-[#FACC15]/10 text-[10px] text-[#FACC15]"
                          >
                            <Star className="mr-0.5 size-2.5" />
                            Featured
                          </Badge>
                        )}
                        {project.category && (
                          <Badge
                            variant="secondary"
                            className="border border-white/10 bg-white/[0.04] text-[10px] text-[#D8CFBC]"
                          >
                            {project.category}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="mb-3 line-clamp-2 flex-1 text-sm text-[#A3A3A3]">
                      {project.description}
                    </p>
                    {project.tech.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-1">
                        {project.tech.slice(0, 4).map((t) => (
                          <Badge
                            key={t}
                            variant="secondary"
                            className="border border-[#4ADE80]/20 bg-[#4ADE80]/10 px-1.5 py-0 text-[10px] text-[#4ADE80]"
                          >
                            {t}
                          </Badge>
                        ))}
                        {project.tech.length > 4 && (
                          <Badge
                            variant="secondary"
                            className="border border-white/10 bg-white/[0.04] px-1.5 py-0 text-[10px] text-[#6B6B6B]"
                          >
                            +{project.tech.length - 4}
                          </Badge>
                        )}
                      </div>
                    )}
                    <CustomFieldsDisplay fields={project.customFields} />
                    <p className="mb-4 text-[11px] text-[#6B6B6B]">
                      Created {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2">
                      {project.liveDemo && (
                        <motion.button
                          type="button"
                          whileHover={{ y: -2, scale: 1.03 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => window.open(project.liveDemo!, "_blank")}
                          className="flex cursor-pointer items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[11px] font-medium text-[#D8CFBC] hover:border-[#4ADE80]/30 hover:bg-[#4ADE80]/10 hover:text-[#4ADE80] transition-colors"
                        >
                          <Eye className="size-3" />
                          View
                        </motion.button>
                      )}
                      <motion.button
                        type="button"
                        whileHover={{ y: -2, scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() =>
                          router.push(`/dashboard?path=edits&project=${project.ProjectID}`)
                        }
                        className="flex cursor-pointer items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[11px] font-medium text-[#D8CFBC] hover:border-white/25 hover:bg-white/10 hover:text-[#FAFAFA] transition-colors"
                      >
                        <Pencil className="size-3" />
                        Edit
                      </motion.button>
                      <motion.button
                        type="button"
                        whileHover={{ y: -2, scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        disabled={isPending}
                        onClick={() => handleDelete(project.ProjectID, project.title)}
                        className="flex cursor-pointer items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[11px] font-medium text-[#D8CFBC] hover:border-[#F87171]/30 hover:bg-[#F87171]/10 hover:text-[#F87171] transition-colors disabled:pointer-events-none disabled:opacity-50"
                      >
                        <Trash2 className="size-3" />
                        Delete
                      </motion.button>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            </FadeItem>
          ))}
        </PageIntro>
      )}

      {!isLoading && filtered.length === 0 && (
        <Reveal>
          <div className="py-14 text-center">
            <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
              <Search className="size-5 text-[#6B6B6B]" />
            </div>
            <p className="text-sm text-[#A3A3A3]">
              No projects found matching your criteria.
            </p>
          </div>
        </Reveal>
      )}
    </div>
  );
};

export default Projects;