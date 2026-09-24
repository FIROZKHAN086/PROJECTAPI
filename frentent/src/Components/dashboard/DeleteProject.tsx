"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertTriangle,
  Trash2,
  FolderOpen,
  Calendar,
  Shield,
  Loader2,
} from "lucide-react";
import { useProjects, useDeleteProject } from "@/src/hooks/useProjects";
import { ApiError } from "@/src/lib/api";
import { toast } from "@/src/lib/toastSlice";
import { useRouter } from "next/navigation";
import {
  DashHeader,
  Reveal,
  GlowCard,
} from "@/src/Components/dashboard/ui";

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
    const timer = window.setTimeout(() => {
      setConfirmChecked(false);
      setConfirmName("");
    }, 0);
    return () => window.clearTimeout(timer);
  }, [selectedProjectId]);

  const handleDelete = () => {
    if (!project || !isConfirmed) return;

    deleteProject(project.ProjectID, {
      onSuccess: () => {
        toast.success("Project deleted successfully!");
        router.push("/dashboard?path=project");
      },
      onError: (err: ApiError) => {
        toast.error(err?.message || "Failed to delete project");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="size-11 rounded-xl bg-white/[0.06]" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-40 bg-white/[0.06]" />
            <Skeleton className="h-4 w-64 bg-white/[0.06]" />
          </div>
        </div>
        <Skeleton className="h-20 w-full rounded-2xl bg-white/[0.06]" />
        <Skeleton className="h-11 w-full rounded-xl bg-white/[0.06]" />
        <GlowCard>
          <div className="space-y-4 p-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24 bg-white/[0.06]" />
                <Skeleton className="h-10 w-full rounded-xl bg-white/[0.06]" />
              </div>
            ))}
          </div>
        </GlowCard>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Reveal>
        <DashHeader
          title="Delete Project"
          subtitle="Permanently remove a project and all of its data"
          icon={Trash2}
          accent="#F87171"
          right={
            <Badge className="gap-1.5 border border-[#F87171]/25 bg-[#F87171]/10 text-[#F87171]">
              <AlertTriangle className="size-3" />
              Irreversible
            </Badge>
          }
        />
      </Reveal>

      <Reveal delay={0.06}>
        <div className="flex items-start gap-4 rounded-2xl border border-[#F87171]/30 bg-[#F87171]/[0.06] p-5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#F87171]/30 bg-[#F87171]/10">
            <AlertTriangle className="size-5 text-[#F87171]" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-[#FAFAFA]">
              Warning: This action is irreversible
            </p>
            <p className="text-xs leading-relaxed text-[#D8CFBC]">
              Deleting a project will permanently remove all associated data,
              files, API logs, and configuration. This action cannot be undone.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <GlowCard glow="248, 113, 113">
          <div className="space-y-4 p-6">
            <Label className="block text-sm font-medium text-[#D8CFBC]">
              Select Project to Delete
            </Label>
            <Select
              value={selectedProjectId}
              onValueChange={(v) => v && setSelectedProjectId(v)}
              disabled={isPending}
            >
              <SelectTrigger className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 pr-2 pl-3 text-[#FAFAFA] focus-visible:border-[#F87171]/50 focus-visible:ring-[#F87171]/20">
                <SelectValue placeholder="Choose a project" />
              </SelectTrigger>
              <SelectContent className="border border-white/10 bg-[#0C0C12] text-[#D8CFBC]">
                {projects.map((p) => (
                  <SelectItem key={p.ProjectID} value={p.ProjectID}>
                    <span className="flex items-center gap-2">
                      {p.title}
                      {p.featured && (
                        <Badge
                          variant="secondary"
                          className="border border-[#4ADE80]/20 bg-[#4ADE80]/10 text-[10px] text-[#4ADE80]"
                        >
                          Featured
                        </Badge>
                      )}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </GlowCard>
      </Reveal>

      {project && (
        <>
          <Reveal delay={0.1}>
            <GlowCard>
              <div className="space-y-5 p-6">
                <div className="space-y-1">
                  <h3 className="font-space-grotesk text-base font-bold text-[#FAFAFA]">
                    Project Details
                  </h3>
                  <p className="text-xs text-[#A3A3A3]">
                    Review the project that will be deleted
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="relative flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#4ADE80]/25 bg-[#4ADE80]/10">
                    <FolderOpen className="size-4 text-[#4ADE80]" />
                    <motion.span
                      animate={{ scale: [1, 1.3, 1], opacity: [0.9, 0.4, 0.9] }}
                      transition={{ duration: 2.4, repeat: Infinity }}
                      className="absolute -top-0.5 -right-0.5 size-2 rounded-full border-2 border-[#0B0B10] bg-[#4ADE80]"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#FAFAFA]">
                      {project.title}
                    </p>
                    <p className="mt-0.5 break-words text-xs text-[#A3A3A3]">
                      {project.description}
                    </p>
                  </div>
                </div>

                <Separator className="bg-white/10" />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs text-[#A3A3A3]">
                    <Shield className="size-3.5 text-[#60A5FA]" />
                    <span>
                      Category:{" "}
                      <span className="text-[#D8CFBC]">{project.category}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs text-[#A3A3A3]">
                    <Calendar className="size-3.5 text-[#4ADE80]" />
                    <span>
                      Created:{" "}
                      <span className="text-[#D8CFBC]">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    </span>
                  </div>
                </div>

                {project.tech && project.tech.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="border border-white/10 bg-white/5 text-[10px] text-[#D8CFBC]"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                )}

                {project.featured && (
                  <Badge
                    variant="secondary"
                    className="border border-[#4ADE80]/20 bg-[#4ADE80]/10 text-[10px] text-[#4ADE80]"
                  >
                    Featured
                  </Badge>
                )}
              </div>
            </GlowCard>
          </Reveal>

          <Reveal delay={0.18}>
            <GlowCard glow="248, 113, 113">
              <div className="space-y-5 p-6">
                <div className="space-y-1">
                  <h3 className="flex items-center gap-2 font-space-grotesk text-base font-bold text-[#F87171]">
                    <AlertTriangle className="size-4" />
                    Confirm Deletion
                  </h3>
                  <p className="text-xs text-[#A3A3A3]">
                    You must confirm before this project can be deleted
                  </p>
                </div>

                <motion.button
                  onClick={() => setConfirmChecked(!confirmChecked)}
                  disabled={isPending}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-colors disabled:opacity-50 cursor-pointer border-white/10 bg-white/[0.04] hover:border-white/25"
                >
                  <motion.div
                    animate={
                      confirmChecked
                        ? {
                            backgroundColor: "rgba(248,113,113,1)",
                            borderColor: "rgba(248,113,113,1)",
                          }
                        : {
                            backgroundColor: "rgba(255,255,255,0)",
                            borderColor: "rgba(255,255,255,0.2)",
                          }
                    }
                    transition={{ duration: 0.2 }}
                    className="flex size-5 shrink-0 items-center justify-center rounded border-2"
                  >
                    <AnimatePresence>
                      {confirmChecked && (
                        <motion.svg
                          key="check"
                          initial={{ scale: 0, rotate: -60 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 22 }}
                          className="size-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </motion.svg>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  <span className="text-sm text-[#D8CFBC]">
                    I understand this action cannot be undone
                  </span>
                </motion.button>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="confirm-name" className="text-sm text-[#D8CFBC]">
                    Type project title to confirm:{" "}
                    <span className="font-mono text-[#F87171]">{project.title}</span>
                  </Label>
                  <Input
                    id="confirm-name"
                    placeholder={project.title}
                    value={confirmName}
                    onChange={(e) => setConfirmName(e.target.value)}
                    disabled={isPending}
                    className="rounded-xl border border-white/10 bg-white/[0.04] text-[#FAFAFA] placeholder:text-[#6B6B6B] focus-visible:border-[#F87171]/50 focus-visible:ring-[#F87171]/20"
                  />
                </div>

                <Separator className="bg-white/10" />

                <div className="space-y-2">
                  <motion.button
                    onClick={handleDelete}
                    disabled={!isConfirmed || isPending}
                    whileHover={
                      isConfirmed && !isPending
                        ? { y: -2, scale: 1.01 }
                        : undefined
                    }
                    whileTap={isConfirmed && !isPending ? { scale: 0.98 } : undefined}
                    className={`flex w-full cursor-pointer items-center justify-center rounded-xl py-3 text-sm font-semibold transition-all ${
                      isConfirmed && !isPending
                        ? "bg-gradient-to-r from-[#F87171] to-[#EF4444] text-white shadow-[0_8px_24px_-8px_rgba(248,113,113,0.7)]"
                        : "border border-white/10 bg-white/[0.04] text-[#6B6B6B]"
                    } disabled:cursor-not-allowed disabled:opacity-40`}
                  >
                    {isPending ? (
                      <Loader2 className="mr-2 size-4 animate-spin" />
                    ) : (
                      <Trash2 className="mr-2 size-4" />
                    )}
                    {isPending ? "Deleting..." : "Delete Project"}
                  </motion.button>
                  {!isConfirmed && selectedProjectId && !isPending && (
                    <p className="mt-2 text-center text-xs text-[#6B6B6B]">
                      Check the confirmation box and type the project title to
                      enable deletion
                    </p>
                  )}
                </div>
              </div>
            </GlowCard>
          </Reveal>
        </>
      )}
    </div>
  );
}