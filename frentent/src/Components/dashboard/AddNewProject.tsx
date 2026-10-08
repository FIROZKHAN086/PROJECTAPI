"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FolderPlus,
  Loader2,
  FileText,
  Settings2,
  Zap,
  Shield,
  Tag,
  ArrowRight,
  Send,
} from "lucide-react";
import { Image as ImageIcon } from "lucide-react";
import { useCreateProject } from "@/src/hooks/useProjects";
import { ApiError } from "@/src/lib/api";
import { toast } from "@/src/lib/toastSlice";
import { useRouter } from "next/navigation";
import { DashHeader, Reveal, GlowCard } from "@/src/Components/dashboard/ui";

import { ImageUploadSection } from "./Components/AddNew/ImageUploadSection";
import { TechCombobox } from "./Components/AddNew/TechCombobox";
import { CategoryCombobox } from "./Components/AddNew/CategoryCombobox";
import { FormSkeleton } from "./Components/FormSkeleton";
import { FeaturedToggle } from "./Components/FeaturedToggle";
import { ProjectDetailsSection } from "./Components/AddNew/ProjectDetailsSection";
import { CustomFieldsDrawer } from "./Components/CustomFieldsDrawer";

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export const floatAnimation = {
  y: [0, -6, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};




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
        customFields:
          Object.keys(customFields).length > 0
            ? JSON.stringify(customFields)
            : undefined,
      },
      {
        onSuccess: () => {
          toast.success("Project created successfully!");
          router.push("/dashboard?path=project");
        },
        onError: (err: ApiError) => {
          toast.error(err?.message || "Failed to create project");
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <Reveal>
        <DashHeader
          title="Add New Project"
          subtitle="Fill in the details to create your project"
          icon={FolderPlus}
          accent="#4ADE80"
          right={
            <div className="flex items-center gap-2">
              <Badge className="gap-1.5 border border-[#4ADE80]/25 bg-[#4ADE80]/10 text-[#4ADE80]">
                <Zap className="size-3" />
                New
              </Badge>
              <Badge className="gap-1.5 border border-white/10 bg-white/[0.04] text-[#A3A3A3]">
                <Shield className="size-3 text-[#4ADE80]" />
                Required fields marked with *
              </Badge>
            </div>
          }
        />
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mx-auto max-w-4xl">
          <GlowCard glow="74, 222, 128">
            <div className="p-0">
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
                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <div className="border-b border-white/10 px-6 pt-6">
                      <TabsList className="h-auto w-full gap-0 rounded-none border-b border-white/10 bg-transparent p-0">
                        <TabsTrigger
                          value="image"
                          className="flex-1 gap-2 rounded-none border-b-2 border-transparent px-4 py-3 text-[#6B6B6B] transition-all duration-300 data-[state=active]:border-[#4ADE80] data-[state=active]:bg-transparent data-[state=active]:text-[#FAFAFA] hover:text-[#D8CFBC] md:flex-none"
                        >
                          <ImageIcon className="size-4" />
                          <span className="hidden sm:inline">Image</span>
                          <Badge className="ml-1 border border-[#4ADE80]/20 bg-[#4ADE80]/10 text-[9px] text-[#4ADE80]">
                            1
                          </Badge>
                        </TabsTrigger>
                        <TabsTrigger
                          value="details"
                          className="flex-1 gap-2 rounded-none border-b-2 border-transparent px-4 py-3 text-[#6B6B6B] transition-all duration-300 data-[state=active]:border-[#4ADE80] data-[state=active]:bg-transparent data-[state=active]:text-[#FAFAFA] hover:text-[#D8CFBC] md:flex-none"
                        >
                          <FileText className="size-4" />
                          <span className="hidden sm:inline">Details</span>
                          <Badge className="ml-1 border border-[#FACC15]/20 bg-[#FACC15]/10 text-[9px] text-[#FACC15]">
                            2
                          </Badge>
                        </TabsTrigger>
                        <TabsTrigger
                          value="advanced"
                          className="flex-1 gap-2 rounded-none border-b-2 border-transparent px-4 py-3 text-[#6B6B6B] transition-all duration-300 data-[state=active]:border-[#4ADE80] data-[state=active]:bg-transparent data-[state=active]:text-[#FAFAFA] hover:text-[#D8CFBC] md:flex-none"
                        >
                          <Settings2 className="size-4" />
                          <span className="hidden sm:inline">Advanced</span>
                          <Badge className="ml-1 border border-[#C084FC]/20 bg-[#C084FC]/10 text-[9px] text-[#C084FC]">
                            3
                          </Badge>
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <div className="p-6">
                      <TabsContent value="image" className="mt-0">
                        <ImageUploadSection
                          imageFile={imageFile}
                          setImageFile={setImageFile}
                          isPending={isPending}
                        />
                        <motion.div
                          variants={itemVariants}
                          className="mt-6 flex justify-end"
                        >
                          <motion.button
                            type="button"
                            whileHover={{ y: -2, scale: 1.03 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => setActiveTab("details")}
                            className="flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] px-5 py-2.5 text-sm font-semibold text-[#07110A] shadow-[0_8px_24px_-8px_rgba(74,222,128,0.7)]"
                          >
                            Next Step
                            <ArrowRight className="size-4" />
                          </motion.button>
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
                          className="mt-6 flex items-center justify-between"
                        >
                          <motion.button
                            type="button"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveTab("image")}
                            className="cursor-pointer rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-[#D8CFBC] transition-colors hover:border-white/25"
                          >
                            Back
                          </motion.button>
                          <motion.button
                            type="button"
                            whileHover={{ y: -2, scale: 1.03 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => setActiveTab("advanced")}
                            className="flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] px-5 py-2.5 text-sm font-semibold text-[#07110A] shadow-[0_8px_24px_-8px_rgba(74,222,128,0.7)]"
                          >
                            Next Step
                            <ArrowRight className="size-4" />
                          </motion.button>
                        </motion.div>
                      </TabsContent>

                      <TabsContent value="advanced" className="mt-0">
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="space-y-5"
                        >
                          <TechCombobox
                            tech={tech}
                            setTech={setTech}
                            isPending={isPending}
                          />

                          <motion.div
                            variants={itemVariants}
                            className="space-y-2"
                          >
                            <Label className="flex items-center gap-2 text-sm font-medium text-[#D8CFBC]">
                              <Tag className="size-4 text-[#F87171]" />
                              Category
                            </Label>
                            <CategoryCombobox
                              category={category}
                              setCategory={setCategory}
                              isPending={isPending}
                            />
                          </motion.div>

                          <FeaturedToggle
                            featured={featured}
                            setFeatured={setFeatured}
                            isPending={isPending}
                          />

                          <motion.div
                            variants={itemVariants}
                            className="space-y-2"
                          >
                            <Label className="flex items-center gap-2 text-sm font-medium text-[#D8CFBC]">
                              <Settings2 className="size-4 text-[#60A5FA]" />
                              Custom Fields
                              <Badge className="border border-white/10 bg-white/5 text-[9px] text-[#A3A3A3]">
                                Optional
                              </Badge>
                            </Label>
                            <p className="text-xs text-[#6B6B6B]">
                              Add extra metadata like version, status, or any
                              key-value pair
                            </p>
                            <CustomFieldsDrawer
                              fields={customFields}
                              onFieldsChange={setCustomFields}
                              isPending={isPending}
                            />
                          </motion.div>
                        </motion.div>

                        <motion.div
                          variants={itemVariants}
                          className="mt-6 flex items-center justify-between border-t border-white/10 pt-6"
                        >
                          <motion.button
                            type="button"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveTab("details")}
                            className="cursor-pointer rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-[#D8CFBC] transition-colors hover:border-white/25"
                          >
                            Back
                          </motion.button>
                          <div className="flex items-center gap-3">
                            <motion.button
                              type="button"
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() =>
                                router.push("/dashboard?path=project")
                              }
                              disabled={isPending}
                              className="cursor-pointer rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-[#D8CFBC] transition-colors hover:border-white/25 disabled:opacity-50"
                            >
                              Cancel
                            </motion.button>
                            <motion.button
                              type="button"
                              onClick={handleSubmit}
                              disabled={isPending}
                              whileHover={
                                !isPending ? { y: -2, scale: 1.03 } : undefined
                              }
                              whileTap={
                                !isPending ? { scale: 0.96 } : undefined
                              }
                              className="flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] px-5 py-2.5 text-sm font-semibold text-[#07110A] shadow-[0_8px_24px_-8px_rgba(74,222,128,0.7)] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {isPending ? (
                                <Loader2 className="size-4 animate-spin" />
                              ) : (
                                <Send className="size-4" />
                              )}
                              {isPending ? "Creating..." : "Create Project"}
                            </motion.button>
                          </div>
                        </motion.div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </motion.div>
              )}
            </div>
          </GlowCard>
        </div>
      </Reveal>
    </div>
  );
}
