"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Pencil, Zap } from "lucide-react";
import {
  useProjects,
  useUpdateProject,
  useDeleteProject,
} from "@/src/hooks/useProjects";
import { toast } from "@/src/lib/toastSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { DashHeader, Reveal, GlowCard } from "@/src/Components/dashboard/ui";
import { EditForm } from "./Components/Edti/EditForm";
import { ProjectSelector } from "./Components/Edti/ProjectSelector";
import { container } from "./lib/variants";

export default function EditProject() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedId = searchParams.get("project");

  const { data: projectsData, isLoading } = useProjects();
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

  const projects = projectsData?.data ?? [];

  const [selectedProjectId, setSelectedProjectId] = useState(
    preselectedId || ""
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [liveDemo, setLiveDemo] = useState("");
  const [github, setGithub] = useState("");
  const [category, setCategory] = useState("Web App");
  const [featured, setFeatured] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [customFields, setCustomFields] = useState<Record<string, string>>({});

  const selectedProject = projects.find(
    (p) => p.ProjectID === selectedProjectId
  );

  useEffect(() => {
    if (!selectedProject) return;
    const timer = window.setTimeout(() => {
      setTitle(selectedProject.title);
      setDescription(selectedProject.description);
      setTech(selectedProject.tech?.join(", ") || "");
      setLiveDemo(selectedProject.liveDemo || "");
      setGithub(selectedProject.github || "");
      setCategory(selectedProject.category || "Web App");
      setFeatured(selectedProject.featured);
      if (
        selectedProject.customFields &&
        typeof selectedProject.customFields === "object"
      ) {
        const converted: Record<string, string> = {};
        for (const [k, v] of Object.entries(selectedProject.customFields)) {
          converted[k] = String(v);
        }
        setCustomFields(converted);
      } else {
        setCustomFields({});
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [selectedProject]);

  useEffect(() => {
    if (!preselectedId || projects.length === 0) return;
    const timer = window.setTimeout(
      () => setSelectedProjectId(preselectedId),
      0
    );
    return () => window.clearTimeout(timer);
  }, [preselectedId, projects.length]);

  const handleSave = () => {
    if (!selectedProject) return;

    updateProject(
      {
        id: selectedProject.ProjectID,
        title: title.trim(),
        description: description.trim(),
        tech: tech
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
          .join(", "),
        liveDemo: liveDemo.trim() || undefined,
        github: github.trim() || undefined,
        category,
        featured: String(featured),
        image: imageFile ?? undefined,
        customFields:
          Object.keys(customFields).length > 0
            ? JSON.stringify(customFields)
            : undefined,
      },
      {
        onSuccess: () => {
          toast.success("Project updated successfully!");
          setImageFile(null);
          router.push("/dashboard?path=project");
        },
        onError: (err) => {
          toast.error(err?.message || "Failed to update project");
        },
      }
    );
  };

  const handleDelete = () => {
    if (!selectedProject) return;
    if (
      !window.confirm(
        `Are you sure you want to delete "${selectedProject.title}"? This action cannot be undone.`
      )
    )
      return;

    deleteProject(selectedProject.ProjectID, {
      onSuccess: () => {
        toast.success("Project deleted successfully!");
        router.push("/dashboard?path=project");
      },
      onError: (err) => {
        toast.error(err?.message || "Failed to delete project");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center gap-4">
          <div className="space-y-2">
            <div className="h-7 w-40 animate-pulse rounded bg-white/[0.06]" />
            <div className="h-4 w-56 animate-pulse rounded bg-white/[0.06]" />
          </div>
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6"
          >
            <div className="h-5 w-32 animate-pulse rounded bg-white/[0.06]" />
            <div className="h-10 w-full animate-pulse rounded-xl bg-white/[0.06]" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div suppressHydrationWarning className="space-y-6">
      <Reveal>
        <DashHeader
          title="Edit Project"
          subtitle="Update your project settings and configuration"
          icon={Pencil}
          accent="#4ADE80"
          right={
            <Badge className="gap-1.5 border border-[#4ADE80]/25 bg-[#4ADE80]/10 text-[#4ADE80]">
              <Zap className="size-3" />
              Update
            </Badge>
          }
        />
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mx-auto max-w-4xl">
          <GlowCard glow="96, 165, 250">
            <div className="p-6">
              <ProjectSelector
                projects={projects}
                selectedProjectId={selectedProjectId}
                setSelectedProjectId={setSelectedProjectId}
                isLoading={isLoading}
                isPending={isUpdating || isDeleting}
              />
            </div>
          </GlowCard>
        </div>
      </Reveal>

      {selectedProject && (
        <Reveal delay={0.12}>
          <div className="mx-auto max-w-4xl">
            <GlowCard glow="74, 222, 128">
              <div className="p-6 sm:p-8">
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  <EditForm
                    selectedProject={selectedProject}
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    tech={tech}
                    setTech={setTech}
                    liveDemo={liveDemo}
                    setLiveDemo={setLiveDemo}
                    github={github}
                    setGithub={setGithub}
                    category={category}
                    setCategory={setCategory}
                    featured={featured}
                    setFeatured={setFeatured}
                    imageFile={imageFile}
                    setImageFile={setImageFile}
                    customFields={customFields}
                    setCustomFields={setCustomFields}
                    isUpdating={isUpdating}
                    isDeleting={isDeleting}
                    handleSave={handleSave}
                    handleDelete={handleDelete}
                  />
                </motion.div>
              </div>
            </GlowCard>
          </div>
        </Reveal>
      )}
    </div>
  );
}
