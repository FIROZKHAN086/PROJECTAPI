"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Pencil,
  Save,
  Trash2,
  FolderOpen,
  Image as ImageIcon,
  Tag,
  ExternalLink,
  GitBranch,
  Star,
  Plus,
  X,
  Loader2,
  AlertTriangle,
  Layers,
  Sparkles,
  CheckCircle2,
  UploadCloud,
  FileText,
  Search,
} from "lucide-react";
import {
  useProjects,
  useUpdateProject,
  useDeleteProject,
} from "@/src/hooks/useProjects";
import { toast } from "@/src/lib/toastSlice";
import { GlowCard } from "@/src/Components/dashboard/ui";

const CATEGORIES = [
  "Web Application",
  "Mobile App",
  "API & Microservice",
  "AI & Machine Learning",
  "Open Source Library",
  "Infrastructure & Cloud",
  "Design System",
  "Developer Tool",
];

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
  const [category, setCategory] = useState("Web Application");
  const [featured, setFeatured] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [customFields, setCustomFields] = useState<Record<string, string>>({});
  const [customKey, setCustomKey] = useState("");
  const [customVal, setCustomVal] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Auto-select first project if none preselected
  useEffect(() => {
    if (!selectedProjectId && projects.length > 0) {
      setSelectedProjectId(preselectedId || projects[0].ProjectID);
    }
  }, [projects, selectedProjectId, preselectedId]);

  const selectedProject = projects.find(
    (p) => p.ProjectID === selectedProjectId
  );

  useEffect(() => {
    if (!selectedProject) return;
    setTitle(selectedProject.title || "");
    setDescription(selectedProject.description || "");
    setTech(selectedProject.tech?.join(", ") || "");
    setLiveDemo(selectedProject.liveDemo || "");
    setGithub(selectedProject.github || "");
    setCategory(selectedProject.category || "Web Application");
    setFeatured(Boolean(selectedProject.featured));
    setImagePreviewUrl(selectedProject.image || null);
    setImageFile(null);

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
  }, [selectedProject]);

  useEffect(() => {
    if (!imageFile) return;
    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleAddCustomField = () => {
    if (!customKey.trim() || !customVal.trim()) return;
    setCustomFields((prev) => ({ ...prev, [customKey.trim()]: customVal.trim() }));
    setCustomKey("");
    setCustomVal("");
  };

  const handleRemoveCustomField = (key: string) => {
    setCustomFields((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSave = () => {
    if (!selectedProject) return;
    if (!title.trim()) {
      toast.error("Title cannot be empty");
      return;
    }

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
          toast.success("Project updated and edge cache purged!");
        },
        onError: (err: { message?: string }) => {
          toast.error(err?.message || "Failed to update project");
        },
      }
    );
  };

  const handleDelete = () => {
    if (!selectedProject) return;
    deleteProject(selectedProject.ProjectID, {
      onSuccess: () => {
        toast.success("Project removed from registry");
        setDeleteModalOpen(false);
        setSelectedProjectId("");
        router.push("/dashboard?path=project");
      },
      onError: (err: { message?: string }) => {
        toast.error(err?.message || "Failed to delete project");
      },
    });
  };

  const techArray = tech
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <div className="space-y-8 text-[#FFFBF4]">
      {/* ─── Header ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#161712]/80 p-6 backdrop-blur-md shadow-xl">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#4ADE80]/30 bg-[#4ADE80]/10 px-3 py-1 text-xs font-mono text-[#4ADE80]">
            <Pencil className="h-3.5 w-3.5" />
            <span>PROJECT EDITOR // LIVE REVISION</span>
          </div>
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FFFBF4]"
            style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
          >
            Edit Project
          </h1>
          <p className="text-xs sm:text-sm text-[#FFFBF4]/60">
            Select any registered project, modify properties, and invalidate edge cache.
          </p>
        </div>

        {selectedProject && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDeleteModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Delete</span>
            </button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSave}
              disabled={isUpdating}
              className="flex items-center gap-2 rounded-xl bg-[#4ADE80] px-5 py-2 text-xs sm:text-sm font-bold text-[#0A0A0A] shadow-[0_0_20px_rgba(74,222,128,0.3)] transition-all hover:bg-[#86efac] cursor-pointer disabled:opacity-50"
            >
              {isUpdating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>{isUpdating ? "Saving..." : "Save Changes"}</span>
            </motion.button>
          </div>
        )}
      </div>

      {/* ─── Project Selector Bar ──────────────────────────────────────────── */}
      <div className="rounded-2xl border border-white/10 bg-[#161712]/90 p-5 backdrop-blur-xl shadow-lg space-y-3">
        <label className="block text-xs font-mono uppercase tracking-wider text-[#FFFBF4]/70">
          Select Target Project
        </label>
        <select
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-[#FFFBF4] focus:border-[#4ADE80] focus:outline-none cursor-pointer"
        >
          {projects.map((p) => (
            <option key={p.ProjectID} value={p.ProjectID} className="bg-[#161712]">
              {p.title} ({p.category || "General"}) {p.featured ? "★ Featured" : ""}
            </option>
          ))}
        </select>
      </div>

      {/* ─── Dual-Pane Editor ──────────────────────────────────────────────── */}
      {selectedProject ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Cols: The Form */}
          <div className="lg:col-span-7 space-y-6">
            <GlowCard glow="74, 222, 128">
              <div className="rounded-2xl border border-white/10 bg-[#161712]/90 p-6 backdrop-blur-xl shadow-xl space-y-5">
                <h2 className="text-sm font-bold text-[#FFFBF4] flex items-center gap-2 border-b border-white/10 pb-3">
                  <FileText className="h-4 w-4 text-[#4ADE80]" />
                  <span>Metadata &amp; Scope</span>
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#FFFBF4]/70 mb-1.5">
                      Project Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-[#FFFBF4] focus:border-[#4ADE80] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#FFFBF4]/70 mb-1.5">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-[#FFFBF4] focus:border-[#4ADE80] focus:outline-none"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat} className="bg-[#161712]">
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#FFFBF4]/70 mb-1.5">
                        Spotlight Priority
                      </label>
                      <button
                        type="button"
                        onClick={() => setFeatured(!featured)}
                        className={`w-full flex items-center justify-between rounded-xl border px-4 py-2.5 text-sm transition-all cursor-pointer ${
                          featured
                            ? "border-yellow-400/40 bg-yellow-400/10 text-yellow-400 font-semibold"
                            : "border-white/10 bg-black/50 text-[#FFFBF4]/70 hover:border-white/20"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Star className={`h-4 w-4 ${featured ? "fill-yellow-400" : ""}`} />
                          <span>Featured Item</span>
                        </span>
                        <span className="text-xs font-mono">{featured ? "YES" : "NO"}</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#FFFBF4]/70 mb-1.5">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-[#FFFBF4] focus:border-[#4ADE80] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </GlowCard>

            {/* Links and Stack */}
            <div className="rounded-2xl border border-white/10 bg-[#161712]/90 p-6 backdrop-blur-xl shadow-xl space-y-4">
              <h2 className="text-sm font-bold text-[#FFFBF4] flex items-center gap-2 border-b border-white/10 pb-3">
                <Layers className="h-4 w-4 text-blue-400" />
                <span>Tech Stack &amp; External URLs</span>
              </h2>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#FFFBF4]/70 mb-1.5">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={tech}
                  onChange={(e) => setTech(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-2 text-sm text-[#FFFBF4] focus:border-[#4ADE80] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#FFFBF4]/70 mb-1.5">
                    Live Demo Link
                  </label>
                  <input
                    type="url"
                    value={liveDemo}
                    onChange={(e) => setLiveDemo(e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-2 text-sm text-[#FFFBF4] focus:border-[#4ADE80] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#FFFBF4]/70 mb-1.5">
                    GitHub Link
                  </label>
                  <input
                    type="url"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-2 text-sm text-[#FFFBF4] focus:border-[#4ADE80] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Media Replace */}
            <div className="rounded-2xl border border-white/10 bg-[#161712]/90 p-6 backdrop-blur-xl shadow-xl space-y-4">
              <h2 className="text-sm font-bold text-[#FFFBF4] flex items-center gap-2 border-b border-white/10 pb-3">
                <ImageIcon className="h-4 w-4 text-purple-400" />
                <span>Replace Cover Media</span>
              </h2>

              <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/15 bg-black/40 p-6 text-center cursor-pointer transition-colors hover:border-[#4ADE80]/50 hover:bg-white/[0.02]">
                <UploadCloud className="h-8 w-8 text-[#4ADE80]/70 mb-2" />
                <p className="text-xs font-semibold text-[#FFFBF4]">
                  Upload new screenshot or asset
                </p>
                <p className="text-[10px] text-[#FFFBF4]/50 mt-0.5">
                  Replaces the current thumbnail on the CDN
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImageFile(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />
              </label>
            </div>

            {/* Custom Metadata */}
            <div className="rounded-2xl border border-white/10 bg-[#161712]/90 p-6 backdrop-blur-xl shadow-xl space-y-4">
              <h2 className="text-sm font-bold text-[#FFFBF4] flex items-center gap-2 border-b border-white/10 pb-3">
                <Tag className="h-4 w-4 text-[#4ADE80]" />
                <span>Custom Key-Value Attributes</span>
              </h2>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Key"
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                  className="flex-1 rounded-xl border border-white/10 bg-black/50 px-3.5 py-2 text-xs text-[#FFFBF4] focus:border-[#4ADE80] focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={customVal}
                  onChange={(e) => setCustomVal(e.target.value)}
                  className="flex-1 rounded-xl border border-white/10 bg-black/50 px-3.5 py-2 text-xs text-[#FFFBF4] focus:border-[#4ADE80] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddCustomField}
                  className="rounded-xl border border-[#4ADE80]/40 bg-[#4ADE80]/15 px-3.5 py-2 text-xs font-bold text-[#4ADE80] hover:bg-[#4ADE80]/25 transition-colors cursor-pointer"
                >
                  Add
                </button>
              </div>

              {Object.keys(customFields).length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {Object.entries(customFields).map(([k, v]) => (
                    <span
                      key={k}
                      className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/40 px-2.5 py-1 text-xs font-mono text-[#FFFBF4]/80"
                    >
                      <span className="text-[#4ADE80]">{k}:</span>
                      <span>{v}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomField(k)}
                        className="ml-1 text-red-400 hover:text-red-300"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right 5 Cols: Realtime Preview Card */}
          <div className="lg:col-span-5 sticky top-20 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono text-[#4ADE80] flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>LIVE PREVIEW OF CHANGES</span>
              </span>
              <span className="text-[11px] font-mono text-[#FFFBF4]/50">
                ID: {selectedProject.ProjectID.slice(0, 8)}...
              </span>
            </div>

            <div className="rounded-2xl border border-white/15 bg-[#161712]/95 shadow-2xl overflow-hidden">
              <div className="relative h-48 w-full bg-black/60 overflow-hidden flex items-center justify-center">
                {imagePreviewUrl ? (
                  <img
                    src={imagePreviewUrl}
                    alt={title}
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <ImageIcon className="h-8 w-8 text-[#FFFBF4]/30" />
                )}

                {featured && (
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-[10px] font-mono font-bold uppercase text-black shadow-md">
                      <Star className="h-3 w-3 fill-current" />
                      Featured
                    </span>
                  </div>
                )}

                <div className="absolute bottom-3 left-3">
                  <span className="rounded-md border border-white/20 bg-black/70 px-2.5 py-0.5 text-[11px] font-mono text-[#FFFBF4] backdrop-blur-md">
                    {category}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#FFFBF4]">{title}</h3>
                  <p className="text-xs text-[#FFFBF4]/65 line-clamp-3 mt-1.5 leading-relaxed">
                    {description}
                  </p>
                </div>

                {techArray.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {techArray.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-[#4ADE80]/30 bg-[#4ADE80]/10 px-2 py-0.5 text-[10px] font-mono text-[#4ADE80]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                  {liveDemo && (
                    <span className="flex items-center gap-1 text-xs text-[#4ADE80] font-medium">
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Live Site</span>
                    </span>
                  )}
                  {github && (
                    <span className="flex items-center gap-1 text-xs text-[#FFFBF4]/70 font-medium ml-3">
                      <GitBranch className="h-3.5 w-3.5" />
                      <span>Source</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-2 text-xs font-mono text-[#FFFBF4]/70">
              <div className="flex justify-between">
                <span>Cache Strategy:</span>
                <span className="text-[#4ADE80]">Immediate Revalidation</span>
              </div>
              <div className="flex justify-between">
                <span>Endpoint Invalidation:</span>
                <span className="text-[#4ADE80]">Global Purge on Save</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-center">
          <FolderOpen className="h-10 w-10 text-[#FFFBF4]/30" />
          <p className="text-sm text-[#FFFBF4]/60">No projects available to edit.</p>
        </div>
      )}

      {/* ─── Delete Confirmation Modal ─────────────────────────────────────── */}
      <AnimatePresence>
        {deleteModalOpen && selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl border border-red-500/30 bg-[#161313] p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-3 text-red-400">
                <AlertTriangle className="h-6 w-6" />
                <h3 className="text-lg font-bold text-[#FFFBF4]">Delete Project?</h3>
              </div>

              <p className="text-xs sm:text-sm text-[#FFFBF4]/70 leading-relaxed">
                Are you sure you want to delete <strong className="text-[#FFFBF4]">{selectedProject.title}</strong>? This will permanently remove the item from your REST API endpoints.
              </p>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setDeleteModalOpen(false)}
                  disabled={isDeleting}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-[#FFFBF4]/80 hover:bg-white/10 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2 text-xs font-bold text-white hover:bg-red-500 shadow-lg cursor-pointer"
                >
                  {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  <span>{isDeleting ? "Deleting..." : "Permanently Delete"}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
