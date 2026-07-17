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
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  Trash2,
  FolderOpen,
  Calendar,
  Shield,
  Loader2,
} from "lucide-react";
import { useProjects, useDeleteProject } from "@/src/hooks/useProjects";
import { toast } from "@/src/lib/toastSlice";
import { useRouter } from "next/navigation";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
};

export default function DeleteProject() {
  const router = useRouter();
  const { data: projectsData, isLoading } = useProjects();
  const { mutate: deleteProject, isPending } = useDeleteProject();

  const projects = projectsData?.data ?? [];

  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [confirmName, setConfirmName] = useState("");

  const project = projects.find((p) => p.ProjectID === selectedProjectId);
  const isConfirmed = confirmChecked && project && confirmName === project.title;

  useEffect(() => {
    setConfirmChecked(false);
    setConfirmName("");
  }, [selectedProjectId]);

  const handleDelete = () => {
    if (!project || !isConfirmed) return;

    deleteProject(project.ProjectID, {
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
                <div className="h-6 w-36 bg-white/5 rounded animate-pulse" />
                <div className="h-4 w-56 bg-white/5 rounded animate-pulse" />
              </div>
            </div>
            <div className="h-20 w-full bg-white/5 rounded-lg animate-pulse" />
            <div className="h-10 w-full bg-white/5 rounded-lg animate-pulse" />
            <div className="bg-[#141414] border border-white/10 rounded-xl p-6 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-24 bg-white/5 rounded animate-pulse" />
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
              <div className="flex items-center justify-center size-10 rounded-xl bg-[#F87171]/10 border border-[#F87171]/20">
                <Trash2 className="size-5 text-[#F87171]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-[#FFFBF4]">
                  Delete Project
                </h1>
                <p className="text-sm text-[#8A8578]">
                  Permanently remove a project and all of its data
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <div className="flex items-start gap-3 p-4 rounded-lg border border-[#F87171]/30 bg-[#F87171]/5">
              <AlertTriangle className="size-5 text-[#F87171] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#FFFBF4]">Warning: This action is irreversible</p>
                <p className="text-xs text-[#8A8578] mt-1">
                  Deleting a project will permanently remove all associated data, files, API logs, and configuration.
                  This action cannot be undone.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <Label className="text-[#D8CFBC] mb-2 block">Select Project to Delete</Label>
            <Select
              value={selectedProjectId}
              onValueChange={(v) => v && setSelectedProjectId(v)}
              disabled={isPending}
            >
              <SelectTrigger className="w-full bg-[#141414] border-white/10 text-[#FFFBF4] focus-visible:border-[#F87171] focus-visible:ring-[#F87171]/20">
                <SelectValue placeholder="Choose a project" />
              </SelectTrigger>
              <SelectContent className="bg-[#141414] border-white/10">
                {projects.map((p) => (
                  <SelectItem key={p.ProjectID} value={p.ProjectID}>
                    <span className="flex items-center gap-2">
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

          {project && (
            <motion.div
              variants={item}
              initial="hidden"
              animate="show"
            >
              <Card className="bg-[#141414] border-white/10">
                <CardHeader>
                  <CardTitle className="text-[#FFFBF4] text-base">Project Details</CardTitle>
                  <CardDescription className="text-[#8A8578] text-xs">
                    Review the project that will be deleted
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center size-9 rounded-lg bg-[#4ADE80]/10">
                        <FolderOpen className="size-4 text-[#4ADE80]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#FFFBF4]">{project.title}</p>
                        <p className="text-xs text-[#8A8578]">{project.description}</p>
                      </div>
                    </div>

                    <Separator className="bg-white/5" />

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-xs text-[#8A8578]">
                        <Shield className="size-3.5" />
                        <span>Category: <span className="text-[#D8CFBC]">{project.category}</span></span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#8A8578]">
                        <Calendar className="size-3.5" />
                        <span>Created: <span className="text-[#D8CFBC]">{new Date(project.createdAt).toLocaleDateString()}</span></span>
                      </div>
                    </div>

                    {project.tech && project.tech.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <Badge key={t} variant="secondary" className="bg-white/5 text-[#D8CFBC] border border-white/10 text-[10px]">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {project.featured && (
                      <Badge
                        variant="secondary"
                        className="bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/20 text-[10px]"
                      >
                        Featured
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {project && (
            <motion.div variants={item}>
              <Card className="bg-[#141414] border border-[#F87171]/30">
                <CardHeader>
                  <CardTitle className="text-[#F87171] text-base flex items-center gap-2">
                    <AlertTriangle className="size-4" />
                    Confirm Deletion
                  </CardTitle>
                  <CardDescription className="text-[#8A8578] text-xs">
                    You must confirm before this project can be deleted
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <motion.div variants={item}>
                    <button
                      onClick={() => setConfirmChecked(!confirmChecked)}
                      disabled={isPending}
                      className="flex items-center gap-3 p-3 w-full rounded-lg border border-white/10 bg-[#0A0A0A] hover:border-white/20 transition-colors text-left cursor-pointer disabled:opacity-50"
                    >
                      <div
                        className={`size-5 rounded border-2 flex items-center justify-center transition-colors ${
                          confirmChecked
                            ? "bg-[#F87171] border-[#F87171]"
                            : "border-white/20 bg-transparent"
                        }`}
                      >
                        {confirmChecked && (
                          <svg className="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-[#D8CFBC]">
                        I understand this action cannot be undone
                      </span>
                    </button>
                  </motion.div>

                  <motion.div variants={item} className="flex flex-col gap-2">
                    <Label htmlFor="confirm-name" className="text-[#D8CFBC]">
                      Type project title to confirm: <span className="text-[#F87171] font-mono">{project.title}</span>
                    </Label>
                    <Input
                      id="confirm-name"
                      placeholder={project.title}
                      value={confirmName}
                      onChange={(e) => setConfirmName(e.target.value)}
                      disabled={isPending}
                      className="bg-[#0A0A0A] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:border-[#F87171] focus-visible:ring-[#F87171]/20"
                    />
                  </motion.div>

                  <motion.div variants={item}>
                    <Separator className="bg-white/5" />
                  </motion.div>

                  <motion.div variants={item}>
                    <Button
                      disabled={!isConfirmed || isPending}
                      onClick={handleDelete}
                      className={`w-full font-semibold cursor-pointer ${
                        isConfirmed && !isPending
                          ? "bg-[#F87171] hover:bg-[#F87171]/90 text-white"
                          : "bg-white/5 text-[#8A8578] cursor-not-allowed"
                      }`}
                    >
                      {isPending ? (
                        <Loader2 className="size-4 mr-2 animate-spin" />
                      ) : (
                        <Trash2 className="size-4 mr-2" />
                      )}
                      {isPending ? "Deleting..." : "Delete Project"}
                    </Button>
                    {!isConfirmed && selectedProjectId && !isPending && (
                      <p className="text-xs text-[#8A8578] mt-2 text-center">
                        Check the confirmation box and type the project title to enable deletion
                      </p>
                    )}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
