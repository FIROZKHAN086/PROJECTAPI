import { Badge, Check, Pencil, Sparkles } from "lucide-react";
import { ImageUploadSection } from "./ImageEdiSection";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2, Save, Trash2, FileText, Info, Tag, Star, Globe, GitBranch, Settings2 } from "lucide-react";
import { pulseAnimation, item } from "../../lib/variants";
import { CustomFieldsDrawer } from "../CustomFieldsDrawer";
import { glassInput } from "../data";
import { TechCombobox } from "../AddNew/TechCombobox";
import { Separator } from "@/components/ui/separator";


 export const EditForm = ({
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
    <div>
      <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl border border-[#4ADE80]/25 bg-[#4ADE80]/10">
            <Pencil className="size-4 text-[#4ADE80]" />
          </div>
          <div className="space-y-0.5">
            <h3 className="font-space-grotesk text-base font-bold text-[#FAFAFA]">
              Edit Project
            </h3>
            <p className="text-xs text-[#A3A3A3]">
              Modify your project details and configuration
            </p>
          </div>
        </div>
        <Badge className="gap-1.5 border border-[#4ADE80]/25 bg-[#4ADE80]/10 text-[#4ADE80]">
          <Sparkles className="size-3" />
          Editing
        </Badge>
      </div>

      <div className="space-y-5">
        <motion.div variants={item}>
          <ImageUploadSection
            currentImage={selectedProject?.image}
            imageFile={imageFile}
            setImageFile={setImageFile}
            isPending={isUpdating}
          />
        </motion.div>

        <motion.div variants={item} className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium text-[#D8CFBC]">
            <FileText className="size-4 text-[#FACC15]" />
            Project Title
          </Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isUpdating}
            className={glassInput}
            placeholder="Enter project title"
          />
        </motion.div>

        <motion.div variants={item} className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium text-[#D8CFBC]">
            <Info className="size-4 text-[#60A5FA]" />
            Description
          </Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            disabled={isUpdating}
            className={cn(glassInput, "resize-none")}
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <motion.div variants={item} className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-[#D8CFBC]">
              <Tag className="size-4 text-[#F87171]" />
              Category
            </Label>
            <Select
              value={category}
              onValueChange={(v) => v && setCategory(v)}
              disabled={isUpdating}
            >
              <SelectTrigger className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 pr-2 pl-3 text-[#FAFAFA] focus-visible:border-[#4ADE80]/50 focus-visible:ring-[#4ADE80]/20">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="border border-white/10 bg-[#0C0C12] text-[#D8CFBC]">
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
            <Label className="flex items-center gap-2 text-sm font-medium text-[#D8CFBC]">
              <Star className="size-4 text-[#FACC15]" />
              Featured
            </Label>
            <motion.button
              type="button"
              onClick={() => setFeatured(!featured)}
              disabled={isUpdating}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              className={cn(
                "flex w-full cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all disabled:opacity-50",
                featured
                  ? "border-[#FACC15] bg-[#FACC15]/10"
                  : "border-white/10 bg-white/[0.04] hover:border-white/25"
              )}
            >
              <motion.div
                animate={
                  featured
                    ? {
                        backgroundColor: "rgba(250,204,21,1)",
                        borderColor: "rgba(250,204,21,1)",
                      }
                    : {
                        backgroundColor: "rgba(255,255,255,0)",
                        borderColor: "rgba(255,255,255,0.2)",
                      }
                }
                transition={{ duration: 0.2 }}
                className="flex size-5 shrink-0 items-center justify-center rounded border-2"
              >
                {featured && <Check className="size-3 text-[#07070B]" />}
              </motion.div>
              <span className="text-sm text-[#D8CFBC]">
                {featured ? "Featured Project" : "Mark as Featured"}
              </span>
              {featured && (
                <motion.div animate={pulseAnimation} className="ml-auto">
                  <Sparkles className="size-4 text-[#FACC15]" />
                </motion.div>
              )}
            </motion.button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <motion.div variants={item} className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-[#D8CFBC]">
              <Globe className="size-4 text-[#4ADE80]" />
              Live Demo URL
            </Label>
            <Input
              value={liveDemo}
              onChange={(e) => setLiveDemo(e.target.value)}
              placeholder="https://myproject.vercel.app"
              disabled={isUpdating}
              className={glassInput}
            />
          </motion.div>

          <motion.div variants={item} className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-[#D8CFBC]">
              <GitBranch className="size-4 text-[#C084FC]" />
              GitHub URL
            </Label>
            <Input
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="https://github.com/user/repo"
              disabled={isUpdating}
              className={glassInput}
            />
          </motion.div>
        </div>

        <motion.div variants={item} className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium text-[#D8CFBC]">
            <Settings2 className="size-4 text-[#60A5FA]" />
            Custom Fields
            <Badge className="border border-white/10 bg-white/5 text-[9px] text-[#A3A3A3]">
              Optional
            </Badge>
          </Label>
          <p className="text-xs text-[#6B6B6B]">
            Add extra metadata like version, status, or any key-value pair
          </p>
          <CustomFieldsDrawer
            fields={customFields}
            onFieldsChange={setCustomFields}
            isPending={isUpdating}
          />
        </motion.div>

        <Separator className="bg-white/10" />

        <motion.div variants={item} className="flex flex-wrap items-center gap-3">
          <motion.button
            type="button"
            onClick={handleSave}
            disabled={isUpdating || isDeleting}
            whileHover={
              !(isUpdating || isDeleting) ? { y: -2, scale: 1.03 } : undefined
            }
            whileTap={!(isUpdating || isDeleting) ? { scale: 0.96 } : undefined}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] px-5 py-2.5 text-sm font-semibold text-[#07110A] shadow-[0_8px_24px_-8px_rgba(74,222,128,0.7)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isUpdating ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            {isUpdating ? "Saving..." : "Save Changes"}
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => (window.location.href = "/dashboard?path=project")}
            className="cursor-pointer rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-[#D8CFBC] transition-colors hover:border-white/25"
          >
            Cancel
          </motion.button>
          <motion.button
            type="button"
            onClick={handleDelete}
            disabled={isUpdating || isDeleting}
            whileHover={
              !(isUpdating || isDeleting) ? { y: -2, scale: 1.03 } : undefined
            }
            whileTap={!(isUpdating || isDeleting) ? { scale: 0.96 } : undefined}
            className="ml-auto flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-[#F87171] to-[#EF4444] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(248,113,113,0.7)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Trash2 className="size-4" />
            )}
            {isDeleting ? "Deleting..." : "Delete"}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};