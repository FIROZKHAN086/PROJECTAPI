import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Check,
  Upload,
    ImagePlus,
    Trash2,
    RefreshCw,
    Image as ImageIcon,
} from "lucide-react";  
import { floatAnimation } from "../../AddNewProject";



 export const ImageUploadSection = ({
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
      const timer = window.setTimeout(() => setPreviewUrl(url), 0);
      return () => {
        window.clearTimeout(timer);
        URL.revokeObjectURL(url);
      };
    }
    const timer = window.setTimeout(() => setPreviewUrl(null), 0);
    return () => window.clearTimeout(timer);
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
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (file.type.startsWith("image/")) handleFileChange(file);
    else toast.error("Please upload an image file");
  };

  const removeImage = () => {
    handleFileChange(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const displayImage = previewUrl || currentImage;

  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2 text-sm font-medium text-[#D8CFBC]">
        <ImageIcon className="size-4 text-[#4ADE80]" />
        Project Image
        {(imageFile || currentImage) && (
          <Badge className="ml-auto border border-[#4ADE80]/20 bg-[#4ADE80]/10 text-[10px] text-[#4ADE80]">
            <Check className="mr-1 size-3" />
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
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#07070B]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displayImage}
              alt="Project preview"
              className="h-48 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07070B] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute right-0 bottom-0 left-0 flex translate-y-full items-center gap-2 p-4 transition-transform duration-300 group-hover:translate-y-0">
              <motion.button
                type="button"
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => fileInputRef.current?.click()}
                className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 bg-[#07070B]/80 px-3 py-1.5 text-xs text-[#D8CFBC] hover:bg-white/10"
              >
                <RefreshCw className="size-3" />
                Change
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={removeImage}
                className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#F87171]/30 bg-[#07070B]/80 px-3 py-1.5 text-xs text-[#F87171] hover:bg-red-500/10"
              >
                <Trash2 className="size-3" />
                Remove
              </motion.button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={cn(
            "relative cursor-pointer rounded-xl border-2 border-dashed p-8 transition-all duration-300",
            dragActive
              ? "border-[#4ADE80] bg-[#4ADE80]/5"
              : "border-white/10 bg-white/[0.03] hover:border-white/25"
          )}
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <motion.div
              animate={floatAnimation}
              className="flex size-16 items-center justify-center rounded-full bg-[#4ADE80]/10"
            >
              <ImagePlus className="size-8 text-[#4ADE80]" />
            </motion.div>
            <div>
              <p className="text-sm font-medium text-[#D8CFBC]">
                {dragActive ? "Drop your image here" : "Upload project image"}
              </p>
              <p className="mt-1 text-xs text-[#6B6B6B]">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
            <motion.button
              type="button"
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-[#D8CFBC] transition-colors hover:border-white/25"
            >
              <Upload className="size-3" />
              Choose File
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};