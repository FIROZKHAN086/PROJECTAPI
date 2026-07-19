"use client";

import { useState, useEffect, useRef } from "react";
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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Pencil,
  Trash2,
  AlertTriangle,
  ArrowRightLeft,
  Archive,
  Loader2,
  Code,
  Check,
  ChevronsUpDown,
  X,
  Info,
  Plus,
  FolderOpen,
  Star,
  Globe,
  Save,
  Sparkles,
  Zap,
  Clock,
  GitBranch,
  Image,
  ImagePlus,
  Upload,
  RefreshCw,
  FileText,
  Tag,
  Settings2,
} from "lucide-react";
import { useProjects, useUpdateProject, useDeleteProject } from "@/src/hooks/useProjects";
import { toast } from "@/src/lib/toastSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { CustomFieldsDrawer } from "./CustomFieldsDrawer";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
    },
  },
};

const floatAnimation = {
  y: [0, -6, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

const pulseAnimation = {
  scale: [1, 1.03, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

const techOptions = [
  "React", "Next.js", "Vue.js", "Angular", "TypeScript", "JavaScript",
  "Python", "Django", "Flask", "Node.js", "Express", "Java",
  "Spring Boot", "C#", ".NET", "Go", "Rust", "Ruby on Rails",
  "PHP", "Laravel", "Tailwind CSS", "Bootstrap", "Material UI",
  "Chakra UI", "Framer Motion", "Three.js", "WebGL", "GraphQL",
  "REST API", "PostgreSQL", "MongoDB", "MySQL", "Redis", "Docker",
  "Kubernetes", "AWS", "Azure", "GCP", "Firebase", "Supabase",
  "Vercel", "Netlify", "Cloudflare",
];

const TechCombobox = ({
  tech,
  setTech,
  isPending,
}: {
  tech: string;
  setTech: (value: string) => void;
  isPending: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [customTech, setCustomTech] = useState("");

  useEffect(() => {
    if (tech) {
      const techArray = tech.split(", ").filter(Boolean);
      setSelectedTech(techArray);
    }
  }, [tech]);

  const handleSelect = (value: string) => {
    let newSelected;
    if (selectedTech.includes(value)) {
      newSelected = selectedTech.filter((t) => t !== value);
    } else {
      newSelected = [...selectedTech, value];
    }
    setSelectedTech(newSelected);
    setTech(newSelected.join(", "));
  };

  const handleAddCustomTech = () => {
    if (customTech.trim() && !selectedTech.includes(customTech.trim())) {
      const newSelected = [...selectedTech, customTech.trim()];
      setSelectedTech(newSelected);
      setTech(newSelected.join(", "));
      setCustomTech("");
      setOpen(false);
      toast.success(`Added "${customTech.trim()}" to tech stack`);
    } else if (selectedTech.includes(customTech.trim())) {
      toast.error("Technology already added");
    } else {
      toast.error("Please enter a technology name");
    }
  };

  const handleRemoveTech = (techToRemove: string) => {
    const newSelected = selectedTech.filter((t) => t !== techToRemove);
    setSelectedTech(newSelected);
    setTech(newSelected.join(", "));
  };

  return (
    <div className="space-y-2">
      <Label className="text-[#D8CFBC] text-sm font-medium flex items-center gap-2">
        <Code className="w-4 h-4 text-[#C084FC]" />
        Tech Stack
      </Label>

      <Drawer open={open} onOpenChange={setOpen} swipeDirection="right">
        <DrawerTrigger
          render={
            <button
              type="button"
              className="w-full justify-between bg-[#0A0A0A] border border-white/10 rounded-md text-[#FFFBF4] hover:bg-white/5 hover:text-[#FFFBF4] h-auto min-h-10 py-2 px-4 flex items-center disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              disabled={isPending}
            />
          }
        >
            <div className="flex flex-wrap items-center gap-1.5 flex-1">
              {selectedTech.length > 0 ? (
                selectedTech.slice(0, 3).map((t) => (
                  <Badge
                    key={t}
                    className="bg-[#C084FC]/10 text-[#C084FC] border border-[#C084FC]/20 text-[10px]"
                  >
                    {t}
                  </Badge>
                ))
              ) : (
                <span className="text-[#8A8578]">Select technologies...</span>
              )}
              {selectedTech.length > 3 && (
                <Badge className="bg-white/5 text-[#8A8578] border border-white/10 text-[10px]">
                  +{selectedTech.length - 3} more
                </Badge>
              )}
            </div>
            <ChevronsUpDown className="h-4 w-4 opacity-50 flex-shrink-0" />
        </DrawerTrigger>

        <DrawerContent className="bg-[#141414] border-white/10">
          <DrawerHeader>
            <DrawerTitle className="text-[#FFFBF4] flex items-center gap-2">
              <Code className="w-5 h-5 text-[#C084FC]" />
              Choose Technologies
            </DrawerTitle>
            <DrawerDescription className="text-[#8A8578]">
              Select from the list or add your own technology
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Add custom technology..."
                value={customTech}
                onChange={(e) => setCustomTech(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddCustomTech();
                  }
                }}
                className="flex-1 bg-[#0A0A0A] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:border-[#4ADE80] focus-visible:ring-[#4ADE80]/20"
              />
              <Button
                onClick={handleAddCustomTech}
                className="bg-[#4ADE80] hover:bg-[#4ADE80]/90 text-[#0A0A0A] font-semibold"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {selectedTech.length > 0 && (
              <div className="flex flex-wrap gap-2 p-3 rounded-lg bg-[#0A0A0A] border border-white/5">
                {selectedTech.map((techItem) => (
                  <Badge
                    key={techItem}
                    className="bg-[#C084FC]/10 text-[#C084FC] border border-[#C084FC]/20 flex items-center gap-1.5 py-1.5 px-3"
                  >
                    {techItem}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-[#F87171] transition-colors"
                      onClick={() => handleRemoveTech(techItem)}
                    />
                  </Badge>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
              {techOptions.map((techOption) => {
                const isSelected = selectedTech.includes(techOption);
                return (
                  <motion.button
                    key={techOption}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      isSelected
                        ? "border-[#4ADE80] bg-[#4ADE80]/10 text-[#FFFBF4]"
                        : "border-white/10 bg-[#0A0A0A] text-[#D8CFBC] hover:border-white/20"
                    }`}
                    onClick={() => handleSelect(techOption)}
                  >
                    <div
                      className={`p-1.5 rounded-md ${
                        isSelected ? "bg-[#4ADE80]/20" : "bg-white/5"
                      }`}
                    >
                      <Code
                        className={`w-4 h-4 ${
                          isSelected ? "text-[#4ADE80]" : "text-[#8A8578]"
                        }`}
                      />
                    </div>
                    <span className="text-sm font-medium flex-1 text-left">{techOption}</span>
                    {isSelected && <Check className="w-4 h-4 ml-auto text-[#4ADE80]" />}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <DrawerFooter>
            <DrawerClose
              render={
                <button
                  type="button"
                  className="border border-white/10 text-[#D8CFBC] rounded-md px-4 py-2 text-sm hover:bg-white/5 cursor-pointer"
                />
              }
            >
              Done
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

const ImageUploadSection = ({
  currentImage,
  imageFile,
  setImageFile,
  isPending,
}: {
  currentImage?: string;
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  isPending: boolean;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [imageFile]);

  const handleFileChange = (file: File | null) => {
    if (file) {
      setImageFile(file);
    } else {
      setImageFile(null);
      setPreviewUrl(null);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        handleFileChange(file);
      } else {
        toast.error("Please upload an image file");
      }
    }
  };

  const removeImage = () => {
    handleFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const displayImage = previewUrl || currentImage;

  return (
    <div className="space-y-3">
      <Label className="text-[#D8CFBC] text-sm font-medium flex items-center gap-2">
        <Image  className="w-4 h-4 text-[#4ADE80] " />
        Project Image
        {(imageFile || currentImage) && (
          <Badge className="bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/20 text-[10px] ml-auto">
            <Check className="w-3 h-3 mr-1" />
            {imageFile ? "New image ready" : "Current image"}
          </Badge>
        )}
      </Label>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        disabled={isPending}
        className="hidden"
      />

      {displayImage ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group"
        >
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0A0A0A]">
            <img
              src={displayImage}
              alt="Project preview"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-[#0A0A0A]/80 border-white/10 text-[#D8CFBC] hover:bg-white/10"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Change
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={removeImage}
                  className="bg-[#0A0A0A]/80 border-red-500/20 text-[#F87171] hover:bg-red-500/10"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 cursor-pointer ${
            dragActive
              ? "border-[#4ADE80] bg-[#4ADE80]/5"
              : "border-white/10 bg-[#0A0A0A] hover:border-white/20"
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <motion.div
              animate={floatAnimation}
              className="w-16 h-16 rounded-full bg-[#4ADE80]/10 flex items-center justify-center"
            >
              <ImagePlus className="w-8 h-8 text-[#4ADE80]" />
            </motion.div>
            <div>
              <p className="text-sm font-medium text-[#D8CFBC]">
                {dragActive ? "Drop your image here" : "Upload project image"}
              </p>
              <p className="text-xs text-[#8A8578] mt-1">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-white/10 text-[#D8CFBC] hover:bg-white/5"
            >
              <Upload className="w-3 h-3 mr-1" />
              Choose File
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const ProjectSelector = ({
  projects,
  selectedProjectId,
  setSelectedProjectId,
  isLoading,
  isPending,
}: {
  projects: Array<{
    ProjectID: string;
    title: string;
    category?: string;
    featured: boolean;
    tech?: string[];
  }>;
  selectedProjectId: string;
  setSelectedProjectId: (id: string) => void;
  isLoading: boolean;
  isPending: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedProject = projects.find((p) => p.ProjectID === selectedProjectId);

  return (
    <motion.div variants={item} className="space-y-3">
      <Label className="text-[#D8CFBC] text-sm font-medium flex items-center gap-2">
        <FolderOpen className="w-4 h-4 text-[#60A5FA]" />
        Select Project
      </Label>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger
          render={
            <button
              type="button"
              className="w-full justify-between bg-[#0A0A0A] border border-white/10 rounded-md text-[#FFFBF4] hover:bg-white/5 hover:text-[#FFFBF4] h-auto min-h-12 py-3 px-4 flex items-center disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              disabled={isLoading || isPending}
            />
          }
        >
            {selectedProject ? (
              <div className="flex items-center gap-3 flex-1">
                <div className="w-8 h-8 rounded-lg bg-[#4ADE80]/10 flex items-center justify-center">
                  <FolderOpen className="w-4 h-4 text-[#4ADE80]" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">{selectedProject.title}</p>
                  <p className="text-xs text-[#8A8578]">
                    {selectedProject.category || "Uncategorized"}
                  </p>
                </div>
                {selectedProject.featured && (
                  <Badge className="bg-[#FACC15]/10 text-[#FACC15] border border-[#FACC15]/20 text-[9px]">
                    <Star className="w-2.5 h-2.5 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
            ) : (
              <span className="text-[#8A8578]">Choose a project to edit...</span>
            )}
            <ChevronsUpDown className="h-4 w-4 opacity-50 flex-shrink-0" />
        </DrawerTrigger>

        <DrawerContent className="bg-[#141414] border-white/10">
          <DrawerHeader>
            <DrawerTitle className="text-[#FFFBF4] flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-[#60A5FA]" />
              Your Projects
            </DrawerTitle>
            <DrawerDescription className="text-[#8A8578]">
              Select a project to edit its details
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-4 space-y-2 max-h-[400px] overflow-y-auto">
            {projects.length === 0 ? (
              <div className="text-center py-8 text-[#8A8578]">
                <FolderOpen className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No projects found</p>
                <p className="text-xs">Create a new project to get started</p>
              </div>
            ) : (
              projects.map((project) => {
                const isSelected = selectedProjectId === project.ProjectID;
                return (
                  <motion.button
                    key={project.ProjectID}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-all ${
                      isSelected
                        ? "border-[#4ADE80] bg-[#4ADE80]/10"
                        : "border-white/10 bg-[#0A0A0A] hover:border-white/20"
                    }`}
                    onClick={() => {
                      setSelectedProjectId(project.ProjectID);
                      setIsOpen(false);
                    }}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSelected ? "bg-[#4ADE80]/20" : "bg-white/5"
                      }`}
                    >
                      <FolderOpen
                        className={`w-5 h-5 ${
                          isSelected ? "text-[#4ADE80]" : "text-[#8A8578]"
                        }`}
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-[#FFFBF4]">
                        {project.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-[#8A8578]">
                          {project.category || "Uncategorized"}
                        </span>
                        {project.featured && (
                          <Badge className="bg-[#FACC15]/10 text-[#FACC15] border border-[#FACC15]/20 text-[9px]">
                            <Star className="w-2.5 h-2.5 mr-1" />
                            Featured
                          </Badge>
                        )}
                        {project.tech && project.tech.length > 0 && (
                          <Badge className="bg-[#C084FC]/10 text-[#C084FC] border border-[#C084FC]/20 text-[9px]">
                            <Code className="w-2.5 h-2.5 mr-1" />
                            {project.tech.length} tech
                          </Badge>
                        )}
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#4ADE80] flex items-center justify-center">
                        <Check className="w-3 h-3 text-[#0A0A0A]" />
                      </div>
                    )}
                  </motion.button>
                );
              })
            )}
          </div>

          <DrawerFooter>
            <DrawerClose
              render={
                <button
                  type="button"
                  className="border border-white/10 text-[#D8CFBC] rounded-md px-4 py-2 text-sm hover:bg-white/5 cursor-pointer"
                />
              }
            >
              Close
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </motion.div>
  );
};

const EditForm = ({
  selectedProject,
  title,
  setTitle,
  description,
  setDescription,
  tech,
  setTech,
  liveDemo,
  setLiveDemo,
  github,
  setGithub,
  category,
  setCategory,
  featured,
  setFeatured,
  imageFile,
  setImageFile,
  customFields,
  setCustomFields,
  isUpdating,
  isDeleting,
  handleSave,
  handleDelete,
}: {
  selectedProject: { image?: string } | undefined;
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  tech: string;
  setTech: (v: string) => void;
  liveDemo: string;
  setLiveDemo: (v: string) => void;
  github: string;
  setGithub: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  featured: boolean;
  setFeatured: (v: boolean) => void;
  imageFile: File | null;
  setImageFile: (v: File | null) => void;
  customFields: Record<string, string>;
  setCustomFields: (v: Record<string, string>) => void;
  isUpdating: boolean;
  isDeleting: boolean;
  handleSave: () => void;
  handleDelete: () => void;
}) => {
  return (
    <motion.div variants={item}>
      <Card className="bg-[#141414] border-white/10 overflow-hidden">
        <CardHeader className="border-b border-white/5">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#FFFBF4] text-lg flex items-center gap-2">
                <Pencil className="w-5 h-5 text-[#4ADE80]" />
                Edit Project
              </CardTitle>
              <CardDescription className="text-[#8A8578] text-sm">
                Modify your project details and configuration
              </CardDescription>
            </div>
            <Badge className="bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/20">
              <Sparkles className="w-3 h-3 mr-1" />
              Editing
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-5"
          >
            <motion.div variants={item}>
              <ImageUploadSection
                currentImage={selectedProject?.image}
                imageFile={imageFile}
                setImageFile={setImageFile}
                isPending={isUpdating}
              />
            </motion.div>

            <motion.div variants={item} className="space-y-2">
              <Label className="text-[#D8CFBC] text-sm font-medium flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#FACC15]" />
                Project Title
              </Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isUpdating}
                className="bg-[#0A0A0A] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:border-[#4ADE80] focus-visible:ring-[#4ADE80]/20"
                placeholder="Enter project title"
              />
            </motion.div>

            <motion.div variants={item} className="space-y-2">
              <Label className="text-[#D8CFBC] text-sm font-medium flex items-center gap-2">
                <Info className="w-4 h-4 text-[#60A5FA]" />
                Description
              </Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                disabled={isUpdating}
                className="bg-[#0A0A0A] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:border-[#4ADE80] focus-visible:ring-[#4ADE80]/20 resize-none"
                placeholder="Describe your project..."
              />
            </motion.div>

            <motion.div variants={item}>
              <TechCombobox
                tech={tech}
                setTech={setTech}
                isPending={isUpdating}
              />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div variants={item} className="space-y-2">
                <Label className="text-[#D8CFBC] text-sm font-medium flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#F87171]" />
                  Category
                </Label>
                <Select
                  value={category}
                  onValueChange={(v) => v && setCategory(v)}
                  disabled={isUpdating}
                >
                  <SelectTrigger className="w-full bg-[#0A0A0A] border-white/10 text-[#FFFBF4] focus-visible:border-[#4ADE80] focus-visible:ring-[#4ADE80]/20">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#141414] text-[#D8CFBC] border-white/10">
                    <SelectItem value="Web App">Web App</SelectItem>
                    <SelectItem value="Mobile App">Mobile App</SelectItem>
                    <SelectItem value="API">API</SelectItem>
                    <SelectItem value="Library">Library</SelectItem>
                    <SelectItem value="Desktop App">Desktop App</SelectItem>
                    <SelectItem value="Game">Game</SelectItem>
                    <SelectItem value="AI/ML">AI/ML</SelectItem>
                    <SelectItem value="Blockchain">Blockchain</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div variants={item} className="space-y-2">
                <Label className="text-[#D8CFBC] text-sm font-medium flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#FACC15]" />
                  Featured
                </Label>
                <button
                  type="button"
                  onClick={() => setFeatured(!featured)}
                  disabled={isUpdating}
                  className={`flex items-center gap-3 p-3 w-full rounded-lg border transition-all ${
                    featured
                      ? "border-[#FACC15] bg-[#FACC15]/10"
                      : "border-white/10 bg-[#0A0A0A] hover:border-white/20"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      featured
                        ? "bg-[#FACC15] border-[#FACC15]"
                        : "border-white/20 bg-transparent"
                    }`}
                  >
                    {featured && (
                      <Check className="w-3 h-3 text-[#0A0A0A]" />
                    )}
                  </div>
                  <span className="text-sm text-[#D8CFBC]">
                    {featured ? "Featured Project" : "Mark as Featured"}
                  </span>
                  {featured && (
                    <motion.div
                      animate={pulseAnimation}
                      className="ml-auto"
                    >
                      <Sparkles className="w-4 h-4 text-[#FACC15]" />
                    </motion.div>
                  )}
                </button>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div variants={item} className="space-y-2">
                <Label className="text-[#D8CFBC] text-sm font-medium flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#4ADE80]" />
                  Live Demo URL
                </Label>
                <Input
                  value={liveDemo}
                  onChange={(e) => setLiveDemo(e.target.value)}
                  placeholder="https://myproject.vercel.app"
                  disabled={isUpdating}
                  className="bg-[#0A0A0A] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:border-[#4ADE80] focus-visible:ring-[#4ADE80]/20"
                />
              </motion.div>

              <motion.div variants={item} className="space-y-2">
                <Label className="text-[#D8CFBC] text-sm font-medium flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-[#C084FC]" />
                  GitHub URL
                </Label>
                <Input
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="https://github.com/user/repo"
                  disabled={isUpdating}
                  className="bg-[#0A0A0A] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:border-[#4ADE80] focus-visible:ring-[#4ADE80]/20"
                />
              </motion.div>
            </div>

            <motion.div variants={item} className="space-y-2">
              <Label className="text-[#D8CFBC] text-sm font-medium flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-[#60A5FA]" />
                Custom Fields
                <Badge className="bg-white/5 text-[#8A8578] border border-white/10 text-[9px]">
                  Optional
                </Badge>
              </Label>
              <p className="text-xs text-[#8A8578]">
                Add extra metadata like version, status, or any key-value pair
              </p>
              <CustomFieldsDrawer
                fields={customFields}
                onFieldsChange={setCustomFields}
                isPending={isUpdating}
              />
            </motion.div>

            <Separator className="bg-white/5" />

            <motion.div variants={item} className="flex flex-wrap items-center gap-3">
              <Button
                onClick={handleSave}
                disabled={isUpdating || isDeleting}
                className="bg-[#4ADE80] hover:bg-[#4ADE80]/90 text-[#0A0A0A] font-semibold gap-2"
              >
                {isUpdating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = "/dashboard?path=project"}
                className="border-white/10 text-[#D8CFBC] hover:bg-white/5"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isUpdating || isDeleting}
                className="bg-[#F87171] hover:bg-[#F87171]/90 text-white font-semibold gap-2 ml-auto"
              >
                {isDeleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const DangerZone = () => {
  return (
    <motion.div variants={item}>
      <Card className="bg-[#141414] border border-[#F87171]/30 overflow-hidden">
        <CardHeader className="border-b border-[#F87171]/10">
          <CardTitle className="text-[#F87171] text-base flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </CardTitle>
          <CardDescription className="text-[#8A8578] text-sm">
            Irreversible and destructive actions
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <motion.div
            variants={item}
            className="flex items-center justify-between p-4 rounded-lg border border-[#F87171]/20 bg-[#F87171]/5"
          >
            <div>
              <p className="text-sm font-medium text-[#FFFBF4] flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-[#F87171]" />
                Transfer Ownership
              </p>
              <p className="text-xs text-[#8A8578] mt-0.5">
                Transfer this project to another user or organization
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled
              className="border-[#F87171]/30 text-[#F87171] hover:bg-[#F87171]/10 hover:text-[#F87171] cursor-not-allowed opacity-50"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 mr-1" />
              Transfer
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="flex items-center justify-between p-4 rounded-lg border border-[#F87171]/20 bg-[#F87171]/5"
          >
            <div>
              <p className="text-sm font-medium text-[#FFFBF4] flex items-center gap-2">
                <Archive className="w-4 h-4 text-[#F87171]" />
                Archive Project
              </p>
              <p className="text-xs text-[#8A8578] mt-0.5">
                Archive this project to hide it from your dashboard
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled
              className="border-[#F87171]/30 text-[#F87171] hover:bg-[#F87171]/10 hover:text-[#F87171] cursor-not-allowed opacity-50"
            >
              <Archive className="w-3.5 h-3.5 mr-1" />
              Archive
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [customFields, setCustomFields] = useState<Record<string, string>>({});

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
      if (selectedProject.customFields && typeof selectedProject.customFields === "object") {
        const converted: Record<string, string> = {};
        for (const [k, v] of Object.entries(selectedProject.customFields)) {
          converted[k] = String(v);
        }
        setCustomFields(converted);
      } else {
        setCustomFields({});
      }
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
          .map((t) => t.trim())
          .filter(Boolean)
          .join(", "),
        liveDemo: liveDemo.trim() || undefined,
        github: github.trim() || undefined,
        category,
        featured: String(featured),
        image: imageFile ?? undefined,
        customFields: Object.keys(customFields).length > 0 ? JSON.stringify(customFields) : undefined,
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
    if (!window.confirm(`Are you sure you want to delete "${selectedProject.title}"? This action cannot be undone.`)) return;

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
      <div className="min-h-screen bg-[#0A0A0A] text-[#FFFBF4] font-sans antialiased">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 animate-pulse" />
              <div className="space-y-2">
                <div className="h-7 w-40 bg-white/5 rounded animate-pulse" />
                <div className="h-4 w-56 bg-white/5 rounded animate-pulse" />
              </div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-[#141414] border border-white/10 rounded-xl p-6 space-y-4">
                  <div className="h-5 w-32 bg-white/5 rounded animate-pulse" />
                  <div className="h-10 w-full bg-white/5 rounded animate-pulse" />
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <motion.div variants={item} className="flex items-center gap-4">
            <motion.div
              animate={floatAnimation}
              className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#4ADE80]/10 border border-[#4ADE80]/20"
            >
              <Pencil className="w-6 h-6 text-[#4ADE80]" />
            </motion.div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FFFBF4] flex items-center gap-2">
                Edit Project
                <Badge className="bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/20 text-[10px]">
                  <Zap className="w-3 h-3 mr-1" />
                  Update
                </Badge>
              </h1>
              <p className="text-sm text-[#8A8578] flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                Update your project settings and configuration
              </p>
            </div>
          </motion.div>

          <ProjectSelector
            projects={projects}
            selectedProjectId={selectedProjectId}
            setSelectedProjectId={setSelectedProjectId}
            isLoading={isLoading}
            isPending={isUpdating || isDeleting}
          />

          {selectedProject && (
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
          )}

          <DangerZone />
        </motion.div>
      </main>
    </div>
  );
}
