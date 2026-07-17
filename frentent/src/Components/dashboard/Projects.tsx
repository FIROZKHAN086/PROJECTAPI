"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Pencil, Trash2, Eye, Star, AlertTriangle } from "lucide-react";
import { useProjects, useDeleteProject } from "@/src/hooks/useProjects";
import { toast } from "@/src/lib/toastSlice";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
};

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
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6 p-6"
      >
        <motion.div variants={item}>
          <Card className="bg-[#141414] border border-[#F87171]/30">
            <CardContent className="flex flex-col items-center justify-center py-12 gap-3">
              <AlertTriangle className="w-8 h-8 text-[#F87171]" />
              <p className="text-[#F87171] font-medium">Failed to load projects</p>
              <p className="text-sm text-[#8A8578]">{error.message ?? "Please try again later."}</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 p-6"
    >
      <motion.div variants={item}>
        <Card className="bg-[#141414] border border-white/10">
          <CardHeader>
            <CardTitle className="text-[#FFFBF4] text-xl">Projects</CardTitle>
            <CardDescription className="text-[#8A8578]">
              Manage all your projects
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>

      <motion.div variants={item} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8578]" />
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-[#141414] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:ring-[#4ADE80]/50"
          />
        </div>
        <div className="flex gap-2">
          {filters.map((f) => (
            <Badge
              key={f.value}
              variant="secondary"
              onClick={() => setActiveFilter(f.value)}
              className={`cursor-pointer text-xs px-3 py-1.5 transition-all ${
                activeFilter === f.value
                  ? "bg-[#4ADE80]/15 text-[#4ADE80] border border-[#4ADE80]/30"
                  : "bg-white/5 text-[#8A8578] border border-white/10 hover:bg-white/10 hover:text-[#D8CFBC]"
              }`}
            >
              {f.label}
            </Badge>
          ))}
        </div>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="bg-[#141414] border border-white/10 h-full">
              <CardContent className="p-5 flex flex-col h-full gap-3">
                <div className="flex items-start justify-between">
                  <Skeleton className="h-5 w-32 rounded bg-white/5" />
                  <Skeleton className="h-5 w-16 rounded bg-white/5" />
                </div>
                <Skeleton className="h-4 w-full rounded bg-white/5" />
                <Skeleton className="h-4 w-3/4 rounded bg-white/5" />
                <Skeleton className="h-3 w-24 rounded bg-white/5" />
                <div className="flex gap-2 mt-auto">
                  <Skeleton className="h-8 w-16 rounded bg-white/5" />
                  <Skeleton className="h-8 w-16 rounded bg-white/5" />
                  <Skeleton className="h-8 w-16 rounded bg-white/5" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
            >
              <Card className="bg-[#141414] border border-white/10 hover:border-[#4ADE80]/30 transition-colors h-full">
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-[#FFFBF4] font-semibold text-base truncate mr-2">
                      {project.title}
                    </h3>
                    <div className="flex gap-1.5 shrink-0">
                      {project.featured && (
                        <Badge
                          variant="secondary"
                          className="bg-[#FACC15]/15 text-[#FACC15] border border-[#FACC15]/20 text-[10px]"
                        >
                          <Star className="w-2.5 h-2.5 mr-0.5" />
                          Featured
                        </Badge>
                      )}
                      {project.category && (
                        <Badge
                          variant="secondary"
                          className="bg-white/5 text-[#8A8578] border border-white/10 text-[10px]"
                        >
                          {project.category}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-[#8A8578] line-clamp-2 mb-3 flex-1">
                    {project.description}
                  </p>
                  {project.tech.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tech.slice(0, 4).map((t) => (
                        <Badge
                          key={t}
                          variant="secondary"
                          className="bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/20 text-[10px] px-1.5 py-0"
                        >
                          {t}
                        </Badge>
                      ))}
                      {project.tech.length > 4 && (
                        <Badge
                          variant="secondary"
                          className="bg-white/5 text-[#8A8578] border border-white/10 text-[10px] px-1.5 py-0"
                        >
                          +{project.tech.length - 4}
                        </Badge>
                      )}
                    </div>
                  )}
                  <p className="text-[11px] text-[#8A8578] mb-4">
                    Created {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    {project.liveDemo && (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-white/5 border border-white/10 text-[#D8CFBC] hover:bg-[#4ADE80]/10 hover:text-[#4ADE80] hover:border-[#4ADE80]/20 text-xs"
                        onClick={() => window.open(project.liveDemo!, "_blank")}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    )}
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white/5 border border-white/10 text-[#D8CFBC] hover:bg-white/10 hover:text-[#FFFBF4] text-xs"
                      onClick={() => router.push(`/dashboard?path=edits&project=${project.ProjectID}`)}
                    >
                      <Pencil className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={isPending}
                      className="bg-white/5 border border-white/10 text-[#D8CFBC] hover:bg-[#F87171]/10 hover:text-[#F87171] hover:border-[#F87171]/20 text-xs"
                      onClick={() => handleDelete(project.ProjectID, project.title)}
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {!isLoading && filtered.length === 0 && (
        <motion.div variants={item} className="text-center py-12">
          <p className="text-[#8A8578] text-sm">No projects found matching your criteria.</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Projects;
