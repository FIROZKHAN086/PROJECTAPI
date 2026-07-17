"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Trash2, AlertTriangle, ArrowRightLeft, Archive, Loader2 } from "lucide-react";
import { useProjects, useUpdateProject, useDeleteProject } from "@/src/hooks/useProjects";
import { toast } from "@/src/lib/toastSlice";
import { useRouter, useSearchParams } from "next/navigation";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
};

export default function EditProject() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedId = searchParams.get("project");

  const { data: projectsData, isLoading } = useProjects();
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

  const projects = projectsData?.data ?? [];

  const [selectedProjectId, setSelectedProjectId] = useState(preselectedId || "");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [liveDemo, setLiveDemo] = useState("");
  const [github, setGithub] = useState("");
  const [category, setCategory] = useState("Web App");
  const [featured, setFeatured] = useState(false);

  const selectedProject = projects.find((p) => p.ProjectID === selectedProjectId);

  useEffect(() => {
    if (selectedProject) {
      setTitle(selectedProject.title);
      setDescription(selectedProject.description);
      setTech(selectedProject.tech?.join(", ") || "");
      setLiveDemo(selectedProject.liveDemo || "");
      setGithub(selectedProject.github || "");
      setCategory(selectedProject.category || "Web App");
      setFeatured(selectedProject.featured);
    }
  }, [selectedProject]);

  useEffect(() => {
    if (preselectedId && projects.length > 0) {
      setSelectedProjectId(preselectedId);
    }
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
          .map((t: string) => t.trim())
          .filter(Boolean)
          .join(", "),
        liveDemo: liveDemo.trim() || undefined,
        github: github.trim() || undefined,
        category,
        featured: String(featured),
      },
      {
        onSuccess: () => {
          toast.success("Project updated successfully!");
          router.push("/dashboard?path=project");
        },
        onError: (err: any) => {
          toast.error(err?.message || "Failed to update project");
        },
      }
    );
  };

  const handleDelete = () => {
    if (!selectedProject) return;
    if (!window.confirm(`Are you sure you want to delete "${selectedProject.title}"? This action cannot be undone.`)) return;

    deleteProject(selectedProject.ProjectID, {
      onSuccess: () => {
        toast.success("Project deleted successfully!");
        router.push("/dashboard?path=project");
      },
      onError: (err: any) => {
        toast.error(err?.message || "Failed to delete project");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-[#FFFBF4] font-sans antialiased">
        <main className="max-w-2xl mx-auto px-6 py-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-10 rounded-xl bg-white/5 animate-pulse" />
              <div className="space-y-2">
                <div className="h-6 w-32 bg-white/5 rounded animate-pulse" />
                <div className="h-4 w-48 bg-white/5 rounded animate-pulse" />
              </div>
            </div>
            <div className="h-10 w-full bg-white/5 rounded-lg animate-pulse" />
            <div className="bg-[#141414] border border-white/10 rounded-xl p-6 space-y-5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-20 bg-white/5 rounded animate-pulse" />
                  <div className="h-10 w-full bg-white/5 rounded-lg animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFBF4] font-sans antialiased">
      <main className="max-w-2xl mx-auto px-6 py-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <motion.div variants={item} className="mb-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center size-10 rounded-xl bg-[#4ADE80]/10 border border-[#4ADE80]/20">
                <Pencil className="size-5 text-[#4ADE80]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-[#FFFBF4]">
                  Edit Project
                </h1>
                <p className="text-sm text-[#8A8578]">
                  Update your project settings and configuration
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <Label className="text-[#D8CFBC] mb-2 block">Select Project</Label>
            <Select
              value={selectedProjectId}
              onValueChange={(v) => v && setSelectedProjectId(v)}
              disabled={isUpdating || isDeleting}
            >
              <SelectTrigger className="w-full bg-[#141414] border-white/10 text-[#FFFBF4] focus-visible:border-[#4ADE80] focus-visible:ring-[#4ADE80]/20">
                <SelectValue placeholder="Choose a project" />
              </SelectTrigger>
              <SelectContent className="bg-[#141414] border-white/10">
                {projects.map((p) => (
                  <SelectItem key={p.ProjectID} value={p.ProjectID}>
                    <span className="flex items-center gap-2 text-[#FFFBF4] ">
                      {p.title}
                      {p.featured && (
                        <Badge variant="secondary" className="bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/20 text-[10px]">
                          Featured
                        </Badge>
                      )}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          {selectedProject && (
            <motion.div variants={item}>
              <Card className="bg-[#141414] border-white/10">
                <CardHeader>
                  <CardTitle className="text-[#FFFBF4] text-base">Project Details</CardTitle>
                  <CardDescription className="text-[#8A8578] text-xs">
                    Modify the details of your project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col gap-5"
                  >
                    <motion.div variants={item} className="flex flex-col gap-2">
                      <Label htmlFor="edit-title" className="text-[#D8CFBC]">
                        Title
                      </Label>
                      <Input
                        id="edit-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={isUpdating}
                        className="bg-[#0A0A0A] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:border-[#4ADE80] focus-visible:ring-[#4ADE80]/20"
                      />
                    </motion.div>

                    <motion.div variants={item} className="flex flex-col gap-2">
                      <Label htmlFor="edit-desc" className="text-[#D8CFBC]">
                        Description
                      </Label>
                      <Textarea
                        id="edit-desc"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        disabled={isUpdating}
                        className="bg-[#0A0A0A] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:border-[#4ADE80] focus-visible:ring-[#4ADE80]/20 resize-none"
                      />
                    </motion.div>

                    <motion.div variants={item} className="flex flex-col gap-2">
                      <Label className="text-[#D8CFBC]">Category</Label>
                      <Select value={category} onValueChange={(v) => v && setCategory(v)} disabled={isUpdating}>
                        <SelectTrigger className="w-full bg-[#0A0A0A] border-white/10 text-[#FFFBF4] focus-visible:border-[#4ADE80] focus-visible:ring-[#4ADE80]/20">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#141414] border-white/10">
                          <SelectItem value="Web App">Web App</SelectItem>
                          <SelectItem value="Mobile App">Mobile App</SelectItem>
                          <SelectItem value="API">API</SelectItem>
                          <SelectItem value="Library">Library</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>

                    <motion.div variants={item} className="flex flex-col gap-2">
                      <Label htmlFor="edit-tech" className="text-[#D8CFBC]">
                        Tech Stack
                      </Label>
                      <Input
                        id="edit-tech"
                        value={tech}
                        onChange={(e) => setTech(e.target.value)}
                        placeholder="comma-separated tech"
                        disabled={isUpdating}
                        className="bg-[#0A0A0A] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:border-[#4ADE80] focus-visible:ring-[#4ADE80]/20"
                      />
                    </motion.div>

                    <motion.div variants={item} className="flex flex-col gap-2">
                      <Label htmlFor="edit-live" className="text-[#D8CFBC]">
                        Live Demo URL
                      </Label>
                      <Input
                        id="edit-live"
                        value={liveDemo}
                        onChange={(e) => setLiveDemo(e.target.value)}
                        placeholder="https://myproject.vercel.app"
                        disabled={isUpdating}
                        className="bg-[#0A0A0A] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:border-[#4ADE80] focus-visible:ring-[#4ADE80]/20"
                      />
                    </motion.div>

                    <motion.div variants={item} className="flex flex-col gap-2">
                      <Label htmlFor="edit-github" className="text-[#D8CFBC]">
                        GitHub URL
                      </Label>
                      <Input
                        id="edit-github"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        placeholder="https://github.com/user/repo"
                        disabled={isUpdating}
                        className="bg-[#0A0A0A] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:border-[#4ADE80] focus-visible:ring-[#4ADE80]/20"
                      />
                    </motion.div>

                    <motion.div variants={item}>
                      <button
                        type="button"
                        onClick={() => setFeatured(!featured)}
                        disabled={isUpdating}
                        className="flex items-center gap-3 p-3 w-full rounded-lg border border-white/10 bg-[#0A0A0A] hover:border-white/20 transition-colors text-left cursor-pointer disabled:opacity-50"
                      >
                        <div
                          className={`size-5 rounded border-2 flex items-center justify-center transition-colors ${
                            featured
                              ? "bg-[#4ADE80] border-[#4ADE80]"
                              : "border-white/20 bg-transparent"
                          }`}
                        >
                          {featured && (
                            <svg className="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm text-[#D8CFBC]">Featured</span>
                      </button>
                    </motion.div>

                    <motion.div variants={item}>
                      <Separator className="bg-white/5 my-1" />
                    </motion.div>

                    <motion.div variants={item} className="flex items-center gap-3 pt-1">
                      <Button
                        onClick={handleSave}
                        disabled={isUpdating || isDeleting}
                        className="bg-[#4ADE80] hover:bg-[#4ADE80]/90 text-[#0A0A0A] font-semibold cursor-pointer"
                      >
                        {isUpdating ? (
                          <Loader2 className="size-4 mr-1 animate-spin" />
                        ) : null}
                        {isUpdating ? "Saving..." : "Save Changes"}
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isUpdating || isDeleting}
                        className="bg-[#F87171] hover:bg-[#F87171]/90 text-white font-semibold cursor-pointer"
                      >
                        {isDeleting ? (
                          <Loader2 className="size-4 mr-1 animate-spin" />
                        ) : (
                          <Trash2 className="size-4 mr-1" />
                        )}
                        {isDeleting ? "Deleting..." : "Delete Project"}
                      </Button>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <motion.div variants={item}>
            <Card className="bg-[#141414] border border-[#F87171]/30">
              <CardHeader>
                <CardTitle className="text-[#F87171] text-base flex items-center gap-2">
                  <AlertTriangle className="size-4" />
                  Danger Zone
                </CardTitle>
                <CardDescription className="text-[#8A8578] text-xs">
                  Irreversible and destructive actions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <motion.div variants={item}>
                  <div className="flex items-center justify-between p-3 rounded-lg border border-[#F87171]/20 bg-[#F87171]/5">
                    <div>
                      <p className="text-sm font-medium text-[#FFFBF4]">Transfer Ownership</p>
                      <p className="text-xs text-[#8A8578]">Transfer this project to another user or organization</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="border-[#F87171]/30 text-[#F87171] hover:bg-[#F87171]/10 hover:text-[#F87171] cursor-pointer shrink-0 opacity-50"
                    >
                      <ArrowRightLeft className="size-3.5 mr-1" />
                      Transfer
                    </Button>
                  </div>
                </motion.div>
                <motion.div variants={item}>
                  <div className="flex items-center justify-between p-3 rounded-lg border border-[#F87171]/20 bg-[#F87171]/5">
                    <div>
                      <p className="text-sm font-medium text-[#FFFBF4]">Archive Project</p>
                      <p className="text-xs text-[#8A8578]">Archive this project to hide it from your dashboard</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="border-[#F87171]/30 text-[#F87171] hover:bg-[#F87171]/10 hover:text-[#F87171] cursor-pointer shrink-0 opacity-50"
                    >
                      <Archive className="size-3.5 mr-1" />
                      Archive
                    </Button>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
