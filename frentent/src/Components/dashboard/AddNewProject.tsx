"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FolderPlus,
  Loader2,
  Image,
  FileText,
  Settings2,
  Check,
  ChevronsUpDown,
  Upload,
  X,
  ImagePlus,
  Trash2,
  Sparkles,
  Zap,
  Shield,
  Clock,
  Globe,
  Tag,
  Star,
  Info,
  ArrowRight,
  RefreshCw,
  Send,
  Code,
  Palette,
  Smartphone,
  Monitor,
  Server,
  Database,
  Cloud,
  Lock,
  GitBranch,
  Plus,
  AlertCircle,
} from "lucide-react";
import { useCreateProject } from "@/src/hooks/useProjects";
import { toast } from "@/src/lib/toastSlice";
import { useRouter } from "next/navigation";
import { CustomFieldsDrawer } from "./CustomFieldsDrawer";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
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

// Tech Stack Options
const techOptions = [
  "React",
  "Next.js",
  "Vue.js",
  "Angular",
  "TypeScript",
  "JavaScript",
  "Python",
  "Django",
  "Flask",
  "Node.js",
  "Express",
  "Java",
  "Spring Boot",
  "C#",
  ".NET",
  "Go",
  "Rust",
  "Ruby on Rails",
  "PHP",
  "Laravel",
  "Tailwind CSS",
  "Bootstrap",
  "Material UI",
  "Chakra UI",
  "Framer Motion",
  "Three.js",
  "WebGL",
  "GraphQL",
  "REST API",
  "PostgreSQL",
  "MongoDB",
  "MySQL",
  "Redis",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "GCP",
  "Firebase",
  "Supabase",
  "Vercel",
  "Netlify",
  "Cloudflare",
];

// Category Options
const categoryOptions = [
  { value: "web-app", label: "Web App", icon: Monitor },
  { value: "mobile-app", label: "Mobile App", icon: Smartphone },
  { value: "api", label: "API", icon: Server },
  { value: "library", label: "Library", icon: Code },
  { value: "desktop-app", label: "Desktop App", icon: Monitor },
  { value: "game", label: "Game", icon: Palette },
  { value: "ai-ml", label: "AI/ML", icon: Database },
  { value: "blockchain", label: "Blockchain", icon: Lock },
  { value: "saas", label: "SaaS", icon: Cloud },
  { value: "open-source", label: "Open Source", icon: GitBranch  },
];

// Image Upload Component
const ImageUploadSection = ({
  imageFile,
  setImageFile,
  isPending,
}: {
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  isPending: boolean;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
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

  return (
    <motion.div variants={itemVariants} className="space-y-4">
      <div className="flex items-center gap-2">
        <Image className="w-4 h-4 text-[#4ADE80]" />
        <Label className="text-[#D8CFBC] text-sm font-medium">Project Image</Label>
        {imageFile && (
          <Badge className="bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/20 text-[10px] ml-auto">
            <Check className="w-3 h-3 mr-1" />
            Uploaded
          </Badge>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        disabled={isPending}
        className="hidden"
      />

      {previewUrl ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group"
        >
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0A0A0A]">
            <img
              src={previewUrl}
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
          variants={itemVariants}
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
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
            disabled={isPending}
            className="hidden"
          />
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
              className="border-white text-[#000000] hover:bg-white"
            >
              <Upload className="w-3 h-3 mr-1" />
              Choose File
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// Tech Stack Combobox
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

  // Initialize selectedTech from props
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
      
      <Drawer open={open} onOpenChange={setOpen} swipeDirection="right" >
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
            {/* Add Custom Tech Input */}
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

            {/* Selected Tech Badges */}
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

            {/* Tech Options Grid */}
            <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-scroll overflow-x-hidden">
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
                  className="bg-[#FFFBF4] text-[#0A0A0A] rounded-md px-4 py-2 text-sm font-medium hover:bg-[#FFFBF4]/90 cursor-pointer"
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

// Category Drawer
const CategoryDrawer = ({
  category,
  setCategory,
  isPending,
}: {
  category: string;
  setCategory: (value: string) => void;
  isPending: boolean;
}) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    setCategory(value);
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen} swipeDirection="right">
      <DrawerTrigger
        render={
          <button
            type="button"
            className="w-full justify-between bg-[#0A0A0A] border border-white/10 rounded-md text-[#FFFBF4] hover:bg-white/5 hover:text-[#FFFBF4] px-4 py-2 flex items-center disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            disabled={isPending}
          />
        }
      >
          <span className="flex items-center gap-2">
            {categoryOptions.find((c) => c.value === category)?.icon && (
              <span className="text-[#60A5FA]">
                {(() => {
                  const Icon = categoryOptions.find((c) => c.value === category)?.icon;
                  return Icon ? <Icon className="w-4 h-4" /> : null;
                })()}
              </span>
            )}
            {categoryOptions.find((c) => c.value === category)?.label || "Select category"}
          </span>
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
      </DrawerTrigger>
      <DrawerContent className="bg-[#141414] border-white/10">
        <DrawerHeader>
          <DrawerTitle className="text-[#FFFBF4]">Choose Category</DrawerTitle>
          <DrawerDescription className="text-[#8A8578]">
            Select the best category for your project
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 grid grid-cols-2 gap-2">
          {categoryOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = category === option.value;
            return (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  isSelected
                    ? "border-[#4ADE80] bg-[#4ADE80]/10 text-[#FFFBF4]"
                    : "border-white/10 bg-[#0A0A0A] text-[#D8CFBC] hover:border-white/20"
                }`}
                onClick={() => handleSelect(option.value)}
              >
                <div
                  className={`p-1.5 rounded-md ${
                    isSelected ? "bg-[#4ADE80]/20" : "bg-white/5"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isSelected ? "text-[#4ADE80]" : "text-[#8A8578]"
                    }`}
                  />
                </div>
                <span className="text-sm font-medium">{option.label}</span>
                {isSelected && <Check className="w-4 h-4 ml-auto text-[#4ADE80]" />}
              </motion.button>
            );
          })}
        </div>
        <DrawerFooter>
          <DrawerClose
            render={
              <button
                type="button"
                className="border border-white/10 bg-[#D8CFBC] rounded-md px-4 py-2 text-sm hover:bg-[#a49a86] cursor-pointer"
              />
            }
          >
            Cancel
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

// Project Details Section
const ProjectDetailsSection = ({
  title,
  setTitle,
  description,
  setDescription,
  liveDemo,
  setLiveDemo,
  github,
  setGithub,
  isPending,
}: {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  liveDemo: string;
  setLiveDemo: (value: string) => void;
  github: string;
  setGithub: (value: string) => void;
  isPending: boolean;
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-[#D8CFBC] text-sm font-medium flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#FACC15]" />
          Project Title
        </Label>
        <Input
          placeholder="My Awesome Project"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isPending}
          className="bg-[#0A0A0A] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:border-[#4ADE80] focus-visible:ring-[#4ADE80]/20"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-[#D8CFBC] text-sm font-medium flex items-center gap-2">
          <Info className="w-4 h-4 text-[#60A5FA]" />
          Description
        </Label>
        <Textarea
          placeholder="A brief description of your project..."
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isPending}
          className="bg-[#0A0A0A] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:border-[#4ADE80] focus-visible:ring-[#4ADE80]/20 resize-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-[#D8CFBC] text-sm font-medium flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#4ADE80]" />
            Live Demo URL
          </Label>
          <Input
            placeholder="https://myproject.vercel.app"
            value={liveDemo}
            onChange={(e) => setLiveDemo(e.target.value)}
            disabled={isPending}
            className="bg-[#0A0A0A] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:border-[#4ADE80] focus-visible:ring-[#4ADE80]/20"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[#D8CFBC] text-sm font-medium flex items-center gap-2">
            <GitBranch  className="w-4 h-4 text-[#C084FC]" />
            GitHub URL
          </Label>
          <Input
            placeholder="https://github.com/user/repo"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            disabled={isPending}
            className="bg-[#0A0A0A] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:border-[#4ADE80] focus-visible:ring-[#4ADE80]/20"
          />
        </div>
      </div>
    </div>
  );
};

// Featured Toggle
const FeaturedToggle = ({
  featured,
  setFeatured,
  isPending,
}: {
  featured: boolean;
  setFeatured: (value: boolean) => void;
  isPending: boolean;
}) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.01 }}
      className="relative"
    >
      <button
        type="button"
        onClick={() => setFeatured(!featured)}
        disabled={isPending}
        className="flex items-center gap-4 p-4 w-full rounded-xl border border-white/10 bg-[#0A0A0A] hover:border-white/20 transition-all text-left cursor-pointer disabled:opacity-50 group"
      >
        <div
          className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${
            featured ? "bg-[#4ADE80]" : "bg-white/10"
          }`}
        >
          <motion.div
            className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-lg"
            animate={{
              x: featured ? 24 : 2,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Star className={`w-4 h-4 ${featured ? "text-[#FACC15]" : "text-[#8A8578]"}`} />
            <span className="text-sm font-medium text-[#D8CFBC]">
              {featured ? "Featured Project" : "Mark as Featured"}
            </span>
          </div>
          <p className="text-xs text-[#8A8578] mt-0.5">
            {featured
              ? "This project will be highlighted in your portfolio"
              : "Feature this project to make it stand out"}
          </p>
        </div>
        {featured && (
          <motion.div
            animate={pulseAnimation}
            className="px-2 py-1 rounded bg-[#FACC15]/10 text-[#FACC15] text-[10px] font-medium"
          >
            <Sparkles className="w-3 h-3 inline mr-1" />
            Featured
          </motion.div>
        )}
      </button>
    </motion.div>
  );
};

// Form Skeleton
const FormSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-6 w-32 bg-white/5" />
        <Skeleton className="h-20 w-full bg-white/5" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-6 w-32 bg-white/5" />
        <Skeleton className="h-32 w-full bg-white/5" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <Skeleton className="h-6 w-32 bg-white/5" />
          <Skeleton className="h-10 w-full bg-white/5" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-6 w-32 bg-white/5" />
          <Skeleton className="h-10 w-full bg-white/5" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-6 w-32 bg-white/5" />
        <Skeleton className="h-20 w-full bg-white/5" />
      </div>
    </div>
  );
};

// Main Component
export default function AddNewProject() {
  const router = useRouter();
  const { mutate: createProject, isPending } = useCreateProject();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [liveDemo, setLiveDemo] = useState("");
  const [github, setGithub] = useState("");
  const [category, setCategory] = useState("web-app");
  const [featured, setFeatured] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState("image");
  const [customFields, setCustomFields] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!description.trim()) {
      toast.error("Description is required");
      return;
    }
    if (!imageFile) {
      toast.error("Project image is required");
      return;
    }

    createProject(
      {
        title: title.trim(),
        description: description.trim(),
        tech: tech.trim(),
        liveDemo: liveDemo.trim(),
        github: github.trim(),
        category,
        featured: String(featured),
        image: imageFile,
        customFields: Object.keys(customFields).length > 0 ? JSON.stringify(customFields) : undefined,
      },
      {
        onSuccess: () => {
          toast.success("Project created successfully!");
          router.push("/dashboard?path=project");
        },
        onError: (err: any) => {
          toast.error(err?.message || "Failed to create project");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFBF4] font-sans antialiased">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center gap-4 mb-2">
              <motion.div
                animate={floatAnimation}
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#4ADE80]/10 border border-[#4ADE80]/20"
              >
                <FolderPlus className="w-6 h-6 text-[#4ADE80]" />
              </motion.div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FFFBF4] flex items-center gap-2">
                  Add New Project
                  <Badge className="bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/20 text-[10px]">
                    <Zap className="w-3 h-3 mr-1" />
                    New
                  </Badge>
                </h1>
                <p className="text-sm text-[#8A8578] flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  Fill in the details to create your project
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#8A8578]">
              <Shield className="w-3 h-3" />
              <span>All fields marked with * are required</span>
            </div>
          </motion.div>

          {/* Main Form Card */}
          <motion.div variants={itemVariants}>
            <Card className="bg-[#141414] border-white/10 overflow-hidden">
              <CardContent className="p-0">
                {isPending ? (
                  <div className="p-6">
                    <FormSkeleton />
                  </div>
                ) : (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {/* Tabs Navigation */}
                    <Tabs
                      value={activeTab}
                      onValueChange={setActiveTab}
                      className="w-full"
                    >
                      <div className="px-6 pt-6 border-b border-white/5">
                        <TabsList className="w-full bg-transparent border-b border-white/10 rounded-none h-auto p-0 gap-0">
                          <TabsTrigger
                            value="image"
                            className="flex-1 md:flex-none px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-[#4ADE80] data-[state=active]:bg-transparent data-[state=active]:text-[#FFFBF4] text-[#8A8578] hover:text-[#D8CFBC] transition-all duration-300 gap-2"
                          >
                            <Image className="w-4 h-4" />
                            <span className="hidden sm:inline">Image</span>
                            <Badge className="bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/20 text-[9px] ml-1">
                              1
                            </Badge>
                          </TabsTrigger>
                          <TabsTrigger
                            value="details"
                            className="flex-1 md:flex-none px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-[#4ADE80] data-[state=active]:bg-transparent data-[state=active]:text-[#FFFBF4] text-[#8A8578] hover:text-[#D8CFBC] transition-all duration-300 gap-2"
                          >
                            <FileText className="w-4 h-4" />
                            <span className="hidden sm:inline">Details</span>
                            <Badge className="bg-[#FACC15]/10 text-[#FACC15] border border-[#FACC15]/20 text-[9px] ml-1">
                              2
                            </Badge>
                          </TabsTrigger>
                          <TabsTrigger
                            value="advanced"
                            className="flex-1 md:flex-none px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-[#4ADE80] data-[state=active]:bg-transparent data-[state=active]:text-[#FFFBF4] text-[#8A8578] hover:text-[#D8CFBC] transition-all duration-300 gap-2"
                          >
                            <Settings2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Advanced</span>
                            <Badge className="bg-[#C084FC]/10 text-[#C084FC] border border-[#C084FC]/20 text-[9px] ml-1">
                              3
                            </Badge>
                          </TabsTrigger>
                        </TabsList>
                      </div>

                      {/* Tab Content */}
                      <div className="p-6">
                        <TabsContent value="image" className="mt-0">
                          <ImageUploadSection
                            imageFile={imageFile}
                            setImageFile={setImageFile}
                            isPending={isPending}
                          />
                          <motion.div
                            variants={itemVariants}
                            className="flex justify-end mt-6"
                          >
                            <Button
                              onClick={() => setActiveTab("details")}
                              className="bg-[#4ADE80] hover:bg-[#4ADE80]/90 text-[#0A0A0A] font-semibold gap-2"
                            >
                              Next Step
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        </TabsContent>

                        <TabsContent value="details" className="mt-0">
                          <ProjectDetailsSection
                            title={title}
                            setTitle={setTitle}
                            description={description}
                            setDescription={setDescription}
                            liveDemo={liveDemo}
                            setLiveDemo={setLiveDemo}
                            github={github}
                            setGithub={setGithub}
                            isPending={isPending}
                          />
                          <motion.div
                            variants={itemVariants}
                            className="flex justify-between mt-6"
                          >
                            <Button
                              variant="outline"
                              onClick={() => setActiveTab("image")}
                              className="border-white/10 text-[#11120D] hover:bg-white"
                            >
                              Back
                            </Button>
                            <Button
                              onClick={() => setActiveTab("advanced")}
                              className="bg-[#4ADE80] hover:bg-[#4ADE80]/90 text-[#0A0A0A] font-semibold gap-2"
                            >
                              Next Step
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        </TabsContent>

                        <TabsContent value="advanced" className="mt-0">
                          <div className="space-y-6">
                            <TechCombobox
                              tech={tech}
                              setTech={setTech}
                              isPending={isPending}
                            />

                            <div className="space-y-2">
                              <Label className="text-[#D8CFBC] text-sm font-medium flex items-center gap-2">
                                <Tag className="w-4 h-4 text-[#F87171]" />
                                Category
                              </Label>
                              <CategoryDrawer
                                category={category}
                                setCategory={setCategory}
                                isPending={isPending}
                              />
                            </div>

                            <FeaturedToggle
                              featured={featured}
                              setFeatured={setFeatured}
                              isPending={isPending}
                            />

                            <div className="space-y-2">
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
                                isPending={isPending}
                              />
                            </div>
                          </div>

                          <motion.div
                            variants={itemVariants}
                            className="flex justify-between mt-6 pt-6 border-t border-white/5"
                          >
                            <Button
                              variant="outline"
                              onClick={() => setActiveTab("details")}
                              className="border-white/10 text-[#11120D] hover:bg-white/60"
                            >
                              Back
                            </Button>
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                onClick={() => router.push("/dashboard?path=project")}
                                disabled={isPending}
                                className="border-white/10 text-[#11120D] hover:bg-[#F5F5F5]"
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={handleSubmit}
                                disabled={isPending}
                                className="bg-[#4ADE80] hover:bg-[#4ADE80]/90 text-[#0A0A0A] font-semibold gap-2"
                              >
                                {isPending ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Send className="w-4 h-4" />
                                )}
                                {isPending ? "Creating..." : "Create Project"}
                              </Button>
                            </div>
                          </motion.div>
                        </TabsContent>
                      </div>
                    </Tabs>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}