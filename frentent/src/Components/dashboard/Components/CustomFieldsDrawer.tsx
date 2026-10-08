"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Plus,
  Trash2,
  Settings2,
  Save,
  Pencil,
  Check,
  X,
  Sparkles,
} from "lucide-react";

interface CustomFieldsDrawerProps {
  fields: Record<string, string>;
  onFieldsChange: (fields: Record<string, string>) => void;
  isPending?: boolean;
}

export function CustomFieldsDrawer({
  fields,
  onFieldsChange,
  isPending = false,
}: CustomFieldsDrawerProps) {
  const [open, setOpen] = useState(false);
  const [editKey, setEditKey] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const entries = Object.entries(fields);

  const handleAdd = () => {
    const key = editKey.trim();
    const value = editValue.trim();
    if (!key) return;

    if (editingIndex !== null) {
      const originalKey = entries[editingIndex][0];
      const newFields = { ...fields };
      if (originalKey !== key) delete newFields[originalKey];
      newFields[key] = value;
      onFieldsChange(newFields);
    } else {
      if (fields[key]) return;
      onFieldsChange({ ...fields, [key]: value });
    }

    setEditKey("");
    setEditValue("");
    setEditingIndex(null);
  };

  const handleDelete = (key: string) => {
    const newFields = { ...fields };
    delete newFields[key];
    onFieldsChange(newFields);
    if (editingIndex !== null) {
      setEditingIndex(null);
      setEditKey("");
      setEditValue("");
    }
  };

  const handleEdit = (index: number) => {
    const [key, value] = entries[index];
    setEditKey(key);
    setEditValue(value);
    setEditingIndex(index);
  };

  const handleCancel = () => {
    setEditKey("");
    setEditValue("");
    setEditingIndex(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
  
      <DialogTrigger
        disabled={isPending}
        className="flex h-auto min-h-10 w-full cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-[#FAFAFA] backdrop-blur-sm transition-colors hover:border-[#60A5FA]/40 hover:bg-white/[0.06] disabled:pointer-events-none disabled:opacity-50"
      >
        <div className="flex flex-1 items-center gap-2 text-left">
          <span className="flex size-7 items-center justify-center rounded-lg border border-[#60A5FA]/25 bg-[#60A5FA]/10">
            <Settings2 className="size-3.5 text-[#60A5FA]" />
          </span>
          <span className="text-sm">
            {entries.length > 0
              ? `${entries.length} custom field${entries.length > 1 ? "s" : ""}`
              : "Add custom fields"}
          </span>
          {entries.length > 0 && (
            <Badge className="ml-1 border border-[#60A5FA]/25 bg-[#60A5FA]/10 text-[10px] text-[#60A5FA]">
              {entries.length}
            </Badge>
          )}
        </div>
        <Plus className="ml-2 size-4 shrink-0 opacity-50" />
      </DialogTrigger>

    
      <DialogContent
        className={cn(
          "max-w-3xl border border-white/10 bg-[#0C0C12] p-0 text-[#FAFAFA] shadow-[0_24px_80px_-24px_rgba(96,165,250,0.35)]",
          "sm:max-w-3xl"
        )}
      >
        {/* Header */}
        <DialogHeader className="border-b border-white/10 px-6 py-5">
          <DialogTitle className="flex items-center gap-3 font-space-grotesk text-lg">
            <span className="flex size-9 items-center justify-center rounded-xl border border-[#60A5FA]/25 bg-[#60A5FA]/10">
              <Settings2 className="size-4 text-[#60A5FA]" />
            </span>
            <span className="flex flex-col">
              Custom Fields
              <span className="text-[11px] font-normal text-[#A3A3A3]">
                Add optional key-value metadata to your project
              </span>
            </span>
            <Badge className="ml-auto gap-1.5 border border-[#60A5FA]/25 bg-[#60A5FA]/10 text-[#60A5FA]">
              <Sparkles className="size-3" />
              {entries.length} total
            </Badge>
          </DialogTitle>
          <DialogDescription className="sr-only">
            Manage your project custom fields
          </DialogDescription>
        </DialogHeader>

        {/* Two-column body */}
        <div className="grid grid-cols-1 gap-0 md:grid-cols-[minmax(0,1fr)_320px]">
          {/* -------- Left: list of fields -------- */}
          <div className="border-b border-white/10 p-5 md:border-b-0 md:border-r">
            <Label className="mb-3 flex items-center gap-2 text-xs font-medium text-[#D8CFBC]">
              <span
                className="h-[3px] w-4 rounded-full"
                style={{
                  background: "linear-gradient(90deg, #60A5FA, transparent)",
                  boxShadow: "0 0 10px rgba(96,165,250,0.5)",
                }}
              />
              Existing Fields
              <span className="ml-auto text-[10px] text-[#6B6B6B]">
                {entries.length === 0
                  ? "None yet"
                  : `${entries.length} item${entries.length > 1 ? "s" : ""}`}
              </span>
            </Label>

            <div className="max-h-[360px] space-y-2 overflow-y-auto pr-1">
              <AnimatePresence mode="popLayout">
                {entries.map(([key, value], index) => {
                  const isEditing = editingIndex === index;
                  return (
                    <motion.div
                      key={key}
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className={cn(
                        "group flex items-center gap-3 rounded-xl border p-3 transition-all",
                        isEditing
                          ? "border-[#60A5FA]/50 bg-[#60A5FA]/10"
                          : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                      )}
                    >
                      <div
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-lg",
                          isEditing ? "bg-[#60A5FA]/20" : "bg-white/5"
                        )}
                      >
                        <Check
                          className={cn(
                            "size-3.5",
                            isEditing ? "text-[#60A5FA]" : "text-[#6B6B6B]"
                          )}
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="mb-0.5 truncate text-[10px] font-medium uppercase tracking-wider text-[#6B6B6B]">
                          {key}
                        </p>
                        <p className="truncate text-sm text-[#FAFAFA]">
                          {value || (
                            <span className="italic text-[#6B6B6B]">
                              No value
                            </span>
                          )}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-1">
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.92 }}
                          onClick={() => handleEdit(index)}
                          className="flex size-8 cursor-pointer items-center justify-center rounded-lg border border-white/10 text-[#6B6B6B] transition-colors hover:border-[#60A5FA]/30 hover:bg-[#60A5FA]/10 hover:text-[#60A5FA]"
                          aria-label={`Edit ${key}`}
                        >
                          <Pencil className="size-3.5" />
                        </motion.button>
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.92 }}
                          onClick={() => handleDelete(key)}
                          className="flex size-8 cursor-pointer items-center justify-center rounded-lg border border-white/10 text-[#6B6B6B] transition-colors hover:border-[#F87171]/30 hover:bg-[#F87171]/10 hover:text-[#F87171]"
                          aria-label={`Delete ${key}`}
                        >
                          <Trash2 className="size-3.5" />
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {entries.length === 0 && (
                <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.02] py-10 text-center text-[#A3A3A3]">
                  <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.04]">
                    <Settings2 className="size-6 opacity-40" />
                  </div>
                  <p className="text-sm">No custom fields yet</p>
                  <p className="mt-1 text-xs text-[#6B6B6B]">
                    Add your first key-value pair →
                  </p>
                </div>
              )}
            </div>
          </div>

         {/* // right section  */}
          <div className="p-5">
            <Label className="mb-3 flex items-center gap-2 text-xs font-medium text-[#D8CFBC]">
              <span
                className="h-[3px] w-4 rounded-full"
                style={{
                  background: "linear-gradient(90deg, #60A5FA, transparent)",
                  boxShadow: "0 0 10px rgba(96,165,250,0.5)",
                }}
              />
              {editingIndex !== null ? "Edit Field" : "Add New Field"}
            </Label>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-[#6B6B6B]">
                  Key
                </span>
                <Input
                  placeholder="e.g. version, status, repo"
                  value={editKey}
                  onChange={(e) => setEditKey(e.target.value)}
                  disabled={isPending}
                  className="h-10 rounded-xl border-white/10 bg-white/[0.04] text-sm text-[#FAFAFA] placeholder:text-[#6B6B6B] focus-visible:border-[#60A5FA]/50 focus-visible:ring-[#60A5FA]/20"
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-[#6B6B6B]">
                  Value
                </span>
                <Input
                  placeholder="e.g. 1.0.0, production, private"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAdd();
                  }}
                  disabled={isPending}
                  className="h-10 rounded-xl border-white/10 bg-white/[0.04] text-sm text-[#FAFAFA] placeholder:text-[#6B6B6B] focus-visible:border-[#60A5FA]/50 focus-visible:ring-[#60A5FA]/20"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <motion.button
                  type="button"
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdd}
                  disabled={!editKey.trim() || isPending}
                  className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#60A5FA] to-[#38BDF8] px-4 py-2.5 text-sm font-semibold text-[#07110A] shadow-[0_8px_24px_-8px_rgba(96,165,250,0.6)] transition-opacity disabled:pointer-events-none disabled:opacity-50"
                >
                  {editingIndex !== null ? (
                    <>
                      <Save className="size-3.5" />
                      Update Field
                    </>
                  ) : (
                    <>
                      <Plus className="size-3.5" />
                      Add Field
                    </>
                  )}
                </motion.button>

                {editingIndex !== null && (
                  <motion.button
                    type="button"
                    whileHover={{ y: -2, scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleCancel}
                    disabled={isPending}
                    className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-[#D8CFBC] transition-colors hover:border-white/25 hover:bg-white/10 disabled:pointer-events-none disabled:opacity-50"
                    aria-label="Cancel edit"
                  >
                    <X className="size-3.5" />
                  </motion.button>
                )}
              </div>
            </div>

            {/* hint */}
            <p className="mt-4 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-[11px] leading-relaxed text-[#6B6B6B]">
              Press{" "}
              <kbd className="rounded border border-white/10 bg-white/[0.06] px-1 py-0.5 font-mono text-[10px] text-[#D8CFBC]">
                Enter
              </kbd>{" "}
              to add quickly. Keys must be unique.
            </p>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="border-t border-white/10 bg-white/[0.02] px-6 py-4 sm:justify-between">
          <p className="text-[11px] text-[#6B6B6B]">
            {entries.length > 0
              ? `${entries.length} field${entries.length > 1 ? "s" : ""} configured`
              : "No fields configured yet"}
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


export function CustomFieldsDisplay({
  fields,
}: {
  fields: Record<string, unknown> | null;
}) {
  if (!fields || Object.keys(fields).length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {Object.entries(fields).map(([key, value]) => (
        <Badge
          key={key}
          className="border border-[#60A5FA]/25 bg-[#60A5FA]/10 px-1.5 py-0 text-[10px] text-[#60A5FA]"
        >
          {key}: {String(value)}
        </Badge>
      ))}
    </div>
  );
}