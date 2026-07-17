"use client";

import { useState, useRef } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FolderPlus, Plus, Loader2 } from "lucide-react";
import { useCreateProject } from "@/src/hooks/useProjects";
import { toast } from "@/src/lib/toastSlice";
import { useRouter } from "next/navigation";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function AddNewProject() {
  const router = useRouter();
  const { mutate: createProject, isPending } = useCreateProject();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [liveDemo, setLiveDemo] = useState("");
  const [github, setGithub] = useState("");
  const [category, setCategory] = useState("Web App");
  const [featured, setFeatured] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

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

    createProject({
      title: title.trim(),
      description: description.trim(),
      tech: tech
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .join(", "),
      liveDemo: liveDemo.trim(),
      github: github.trim(),
      category,
      featured: String(featured),
      image: imageFile,
    }, {
      onSuccess: () => {
        toast.success("Project created successfully!");
        router.push("/dashboard?path=project");
      },
      onError: (err: any) => {
        toast.error(err?.message || "Failed to create project");
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFBF4] font-sans antialiased">
      <main className="max-w-2xl mx-auto px-6 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center size-10 rounded-xl bg-[#4ADE80]/10 border border-[#4ADE80]/20">
                <FolderPlus className="size-5 text-[#4ADE80]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-[#FFFBF4]">
                  Add New Project
                </h1>
                <p className="text-sm text-[#8A8578]">
                  Create a new project to get started
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-[#141414] border-white/10">
              <CardContent>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col gap-5"
                >
                  <motion.div variants={itemVariants} className="flex flex-col gap-2">
                    <Label htmlFor="project-title" className="text-[#D8CFBC]">
                      Project Title
                    </Label>
                    <Input
                      id="project-title"
                      placeholder="My Awesome Project"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      disabled={isPending}
                      className="bg-[#0A0A0A] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:border-[#4ADE80] focus-visible:ring-[#4ADE80]/20"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex flex-col gap-2">
                    <Label htmlFor="description" className="text-[#D8CFBC]">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="A brief description of your project..."
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      disabled={isPending}
                      className="bg-[#0A0A0A] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:border-[#4ADE80] focus-visible:ring-[#4ADE80]/20 resize-none"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex flex-col gap-2">
                    <Label className="text-[#D8CFBC]">Category</Label>
                    <Select value={category} onValueChange={(v) => v && setCategory(v)} disabled={isPending}>
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

                  <motion.div variants={itemVariants} className="flex flex-col gap-2">
                    <Label htmlFor="tech" className="text-[#D8CFBC]">
                      Tech Stack
                    </Label>
                    <Input
                      id="tech"
                      placeholder="react, next.js, tailwindcss"
                      value={tech}
                      onChange={(e) => setTech(e.target.value)}
                      disabled={isPending}
                      className="bg-[#0A0A0A] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:border-[#4ADE80] focus-visible:ring-[#4ADE80]/20"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex flex-col gap-2">
                    <Label htmlFor="live-demo" className="text-[#D8CFBC]">
                      Live Demo URL
                    </Label>
                    <Input
                      id="live-demo"
                      placeholder="https://myproject.vercel.app"
                      value={liveDemo}
                      onChange={(e) => setLiveDemo(e.target.value)}
                      disabled={isPending}
                      className="bg-[#0A0A0A] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:border-[#4ADE80] focus-visible:ring-[#4ADE80]/20"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex flex-col gap-2">
                    <Label htmlFor="github" className="text-[#D8CFBC]">
                      GitHub URL
                    </Label>
                    <Input
                      id="github"
                      placeholder="https://github.com/user/repo"
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      disabled={isPending}
                      className="bg-[#0A0A0A] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:border-[#4ADE80] focus-visible:ring-[#4ADE80]/20"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex flex-col gap-2">
                    <Label htmlFor="image" className="text-[#D8CFBC]">
                      Project Image
                    </Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      disabled={isPending}
                      className="bg-[#0A0A0A] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:border-[#4ADE80] focus-visible:ring-[#4ADE80]/20 file:text-[#8A8578] file:bg-transparent file:border-0"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <button
                      type="button"
                      onClick={() => setFeatured(!featured)}
                      disabled={isPending}
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
                      <span className="text-sm text-[#D8CFBC]">Mark as Featured</span>
                    </button>
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex items-center gap-3 pt-2">
                    <Button
                      onClick={handleSubmit}
                      disabled={isPending}
                      className="bg-[#4ADE80] hover:bg-[#4ADE80]/90 text-[#0A0A0A] font-semibold cursor-pointer"
                    >
                      {isPending ? (
                        <Loader2 className="size-4 mr-1 animate-spin" />
                      ) : (
                        <Plus className="size-4 mr-1" />
                      )}
                      {isPending ? "Creating..." : "Create Project"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => router.push("/dashboard?path=project")}
                      disabled={isPending}
                      className="border-white/10 text-[#D8CFBC] hover:bg-white/5 hover:text-[#FFFBF4] cursor-pointer"
                    >
                      Cancel
                    </Button>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
