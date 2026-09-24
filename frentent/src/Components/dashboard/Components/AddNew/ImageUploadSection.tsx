import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { floatAnimation, itemVariants } from "../../AddNewProject";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

import { ImageIcon } from "lucide-react";

import {
  Check,
  Upload,
  ImagePlus,
  Trash2,
  RefreshCw,
} from "lucide-react";



const letterVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.02 * i, duration: 0.3, ease: "easeOut" as const },
  }),
};


function AnimatedLabel({ text }: { text: string }) {
  return (
    <span
      className="inline-flex text-sm font-medium text-[#F4F1EA]"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={letterVariants}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}


function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) window.clearInterval(timer);
    }, 18);
    return () => window.clearInterval(timer);
  }, [text]);

  const isTyping = displayed.length < text.length;

  return (
    <span className="font-mono text-[11px] text-[#9A96A6] sm:text-xs">
      {displayed}
      {isTyping && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="ml-[1px] inline-block h-3 w-[2px] translate-y-[1px] bg-[#FF8A4C]"
        />
      )}
    </span>
  );
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const ImageUploadSection = ({
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
    <motion.div variants={itemVariants} className="space-y-3 sm:space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <ImageIcon className="size-4 shrink-0 text-[#FF8A4C]" />
        <Label >
          <AnimatedLabel text="Project image" />
        </Label>
        <AnimatePresence>
          {imageFile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="ml-auto"
            >
              <Badge className="border border-[#7FBF97]/25 bg-[#7FBF97]/10 text-[10px] text-[#7FBF97]">
                <Check className="mr-1 size-3" />
                Uploaded
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        disabled={isPending}
        className="hidden"
      />

      <AnimatePresence mode="wait">
        {previewUrl && imageFile ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="group relative"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B10]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Project preview"
                className="h-40 w-full object-cover sm:h-48 md:h-56"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0B0B10] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

         
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-linear-to-t from-[#0B0B10]/90 to-transparent px-3 py-2 sm:translate-y-full sm:opacity-0 sm:transition-all sm:duration-300 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                <TypewriterText
                  text={`${imageFile.name} · ${formatBytes(imageFile.size)}`}
                />
              </div>

              <div className="absolute right-0 bottom-0 left-0 flex translate-y-full flex-wrap items-center gap-2 p-3 transition-transform duration-300 group-hover:translate-y-0 sm:p-4">
                <motion.button
                  type="button"
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 bg-[#0B0B10]/80 px-3 py-1.5 text-xs text-[#D8CFBC] backdrop-blur-sm hover:bg-white/10"
                >
                  <RefreshCw className="size-3" />
                  Change
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={removeImage}
                  className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#F2777A]/30 bg-[#0B0B10]/80 px-3 py-1.5 text-xs text-[#F2777A] backdrop-blur-sm hover:bg-[#F2777A]/10"
                >
                  <Trash2 className="size-3" />
                  Remove
                </motion.button>
              </div>
            </div>

            
            <div className="mt-2 truncate sm:hidden">
              <TypewriterText
                text={`${imageFile.name} · ${formatBytes(imageFile.size)}`}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="dropzone"
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-6 transition-all duration-300 sm:p-8 ${
              dragActive
                ? "border-[#FF8A4C] bg-[#FF8A4C]/5"
                : "border-white/10 bg-white/[0.03] hover:border-white/25"
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
                className="flex size-14 items-center justify-center rounded-full bg-[#FF8A4C]/10 sm:size-16"
              >
                <ImagePlus className="size-7 text-[#FF8A4C] sm:size-8" />
              </motion.div>
              <div>
                <p className="text-sm font-medium text-[#F4F1EA]">
                  {dragActive ? "Drop your image here" : "Upload project image"}
                </p>
                <p className="mt-1 text-xs text-[#736E80]">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
              <motion.button
                type="button"
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-[#D8CFBC] transition-colors hover:border-white/25"
              >
                <Upload className="size-3" />
                Choose file
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};