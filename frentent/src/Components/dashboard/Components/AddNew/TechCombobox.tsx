"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  Check,
  X,
  Code,
  Code2,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";

import { techOptions, glassInput } from "../data";

export interface TechComboboxProps {
  tech: string;
  setTech: (value: string) => void;
  isPending?: boolean;
}

export function TechCombobox({
  tech,
  setTech,
  isPending = false,
}: TechComboboxProps) {
  const [open, setOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [customTech, setCustomTech] = useState("");
  const [query, setQuery] = useState("");

  
  useEffect(() => {
    if (!tech) {
      const t = window.setTimeout(() => setSelectedTech([]), 0);
      return () => window.clearTimeout(t);
    }
    const arr = tech.split(", ").filter(Boolean);
    const t = window.setTimeout(() => setSelectedTech(arr), 0);
    return () => window.clearTimeout(t);
  }, [tech]);

  
  const filteredTech = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return techOptions;
    return techOptions.filter((o) => o.toLowerCase().includes(q));
  }, [query]);


  const toggleTech = (value: string) => {
    const next = selectedTech.includes(value)
      ? selectedTech.filter((t) => t !== value)
      : [...selectedTech, value];
    setSelectedTech(next);
    setTech(next.join(", "));
  };

  const removeTech = (value: string) => {
    const next = selectedTech.filter((t) => t !== value);
    setSelectedTech(next);
    setTech(next.join(", "));
  };

  const addCustomTech = () => {
    const value = customTech.trim();
    if (!value) {
      toast.error("Please enter a technology name");
      return;
    }
    if (selectedTech.includes(value)) {
      toast.error("Technology already added");
      return;
    }
    const next = [...selectedTech, value];
    setSelectedTech(next);
    setTech(next.join(", "));
    setCustomTech("");
    toast.success(`Added "${value}" to tech stack`);
  };

  const handleClose = () => {
   
    setQuery("");
    setCustomTech("");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) handleClose();
      }}
    >
  
      <DialogTrigger
        disabled={isPending}
        className="flex h-auto min-h-10 w-full cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-[#FAFAFA] transition-colors hover:border-white/25 disabled:pointer-events-none disabled:opacity-50"
      >
        <div className="flex flex-1 flex-wrap items-center gap-1.5 text-left">
          {selectedTech.length > 0 ? (
            selectedTech.slice(0, 3).map((t) => (
              <Badge
                key={t}
                className="border border-[#C084FC]/20 bg-[#C084FC]/10 text-[10px] text-[#C084FC]"
              >
                {t}
              </Badge>
            ))
          ) : (
            <span className="text-sm text-[#6B6B6B]">
              Select technologies...
            </span>
          )}
          {selectedTech.length > 3 && (
            <Badge className="border border-white/10 bg-white/5 text-[10px] text-[#A3A3A3]">
              +{selectedTech.length - 3} more
            </Badge>
          )}
        </div>
        <Plus className="ml-2 size-4 shrink-0 opacity-50" />
      </DialogTrigger>

   
      <DialogContent
        className={cn(
          "max-w-2xl border border-white/10 bg-[#0C0C12] p-0 text-[#FAFAFA]",
          "shadow-[0_24px_80px_-24px_rgba(192,132,252,0.35)] sm:max-w-2xl"
        )}
      >
        {/* header */}
        <DialogHeader className="border-b border-white/10 px-6 py-5">
          <DialogTitle className="flex items-center gap-3 font-space-grotesk text-lg">
            <span className="flex size-9 items-center justify-center rounded-xl border border-[#C084FC]/25 bg-[#C084FC]/10">
              <Code2 className="size-4 text-[#C084FC]" />
            </span>
            <span className="flex flex-col">
              Tech Stack
              <span className="text-[11px] font-normal text-[#A3A3A3]">
                Pick from the list or add your own
              </span>
            </span>
            {selectedTech.length > 0 && (
              <Badge className="ml-auto gap-1.5 border border-[#C084FC]/25 bg-[#C084FC]/10 text-[#C084FC]">
                <Sparkles className="size-3" />
                {selectedTech.length} selected
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Choose technologies for your project
          </DialogDescription>
        </DialogHeader>

        {/* selected chips row */}
        {selectedTech.length > 0 && (
          <div className="border-b border-white/10 px-6 py-3">
            <div className="mb-2 text-[10px] uppercase tracking-wider text-[#6B6B6B]">
              Selected
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedTech.map((t) => (
                <Badge
                  key={t}
                  className="flex items-center gap-1.5 border border-[#C084FC]/20 bg-[#C084FC]/10 px-3 py-1.5 text-[#C084FC]"
                >
                  {t}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeTech(t);
                    }}
                    className="ml-0.5 cursor-pointer rounded-full text-[#C084FC] transition-colors hover:bg-red-500/10 hover:text-[#F87171]"
                    aria-label={`Remove ${t}`}
                  >
                    <X className="size-3" />
                  </motion.button>
                </Badge>
              ))}
            </div>
          </div>
        )}

   
        <div className="space-y-3 border-b border-white/10 px-6 py-4">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-[#6B6B6B]" />
            <Input
              placeholder="Search technologies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isPending}
              className={cn(glassInput, "pl-9")}
            />
          </div>

          <div className="flex items-center gap-2">
            <Input
              placeholder="Or add a custom technology..."
              value={customTech}
              onChange={(e) => setCustomTech(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCustomTech();
                }
              }}
              disabled={isPending}
              className={glassInput}
            />
            <motion.button
              type="button"
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={addCustomTech}
              disabled={isPending || !customTech.trim()}
              className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] text-[#07110A] shadow-[0_8px_24px_-8px_rgba(74,222,128,0.7)] disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Add custom tech"
            >
              <Plus className="size-4" />
            </motion.button>
          </div>
        </div>


        <div className="max-h-[340px] overflow-y-auto px-6 py-4">
          {filteredTech.length === 0 ? (
            <div className="py-10 text-center text-xs text-[#6B6B6B]">
              No technology found for “{query}”.
              <br />
              Try adding it as a custom tech above.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {filteredTech.map((option) => {
                const isSelected = selectedTech.includes(option);
                return (
                  <motion.button
                    key={option}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleTech(option)}
                    disabled={isPending}
                    className={cn(
                      "flex cursor-pointer items-center gap-2.5 rounded-lg border p-2.5 text-left text-sm transition-all disabled:cursor-not-allowed disabled:opacity-50",
                      isSelected
                        ? "border-[#C084FC]/60 bg-[#C084FC]/10 text-[#FAFAFA]"
                        : "border-white/10 bg-white/[0.03] text-[#D8CFBC] hover:border-white/25 hover:bg-white/[0.05]"
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-6 shrink-0 items-center justify-center rounded-md",
                        isSelected ? "bg-[#C084FC]/20" : "bg-white/5"
                      )}
                    >
                      <Code
                        className={cn(
                          "size-3.5",
                          isSelected ? "text-[#C084FC]" : "text-[#6B6B6B]"
                        )}
                      />
                    </span>
                    <span className="flex-1 truncate">{option}</span>
                    {isSelected && (
                      <Check className="size-4 shrink-0 text-[#C084FC]" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>

        {/* footer */}
        <DialogFooter className="border-t border-white/10 bg-white/[0.02] px-6 py-4 sm:justify-between">
          <p className="text-[11px] text-[#6B6B6B]">
            {selectedTech.length > 0
              ? `${selectedTech.length} technolog${selectedTech.length > 1 ? "ies" : "y"} selected`
              : "No technologies selected yet"}
          </p>

          <DialogClose
            disabled={isPending}
            className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] px-5 py-2.5 text-sm font-semibold text-[#07110A] shadow-[0_8px_24px_-8px_rgba(74,222,128,0.7)] transition-all hover:brightness-105 disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
          >
            Done
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TechCombobox;