"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Trash2,
  GripVertical,
  Settings2,
  X,
  Save,
  Pencil,
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
      if (originalKey !== key) {
        delete newFields[originalKey];
      }
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
        <div className="flex items-center gap-2 flex-1">
          <Settings2 className="w-4 h-4 text-[#60A5FA]" />
          <span className="text-sm">
            {entries.length > 0
              ? `${entries.length} custom field${entries.length > 1 ? "s" : ""}`
              : "Add custom fields"}
          </span>
          {entries.length > 0 && (
            <Badge className="bg-[#60A5FA]/10 text-[#60A5FA] border border-[#60A5FA]/20 text-[10px] ml-1">
              {entries.length}
            </Badge>
          )}
        </div>
        <Plus className="h-4 w-4 opacity-50" />
      </DrawerTrigger>

      <DrawerContent className="bg-[#141414] border-white/10">
        <DrawerHeader>
          <DrawerTitle className="text-[#FFFBF4] flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-[#60A5FA]" />
            Custom Fields
          </DrawerTitle>
          <DrawerDescription className="text-[#8A8578]">
            Add optional key-value metadata to your project
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4 space-y-4 overflow-y-auto max-h-[60vh]">
          {/* Existing fields */}
          <AnimatePresence mode="popLayout">
            {entries.map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  editingIndex === index
                    ? "border-[#60A5FA]/50 bg-[#60A5FA]/5"
                    : "border-white/10 bg-[#0A0A0A]"
                }`}
              >
                <GripVertical className="w-4 h-4 text-[#8A8578] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-[#8A8578] font-medium mb-0.5">
                    {key}
                  </p>
                  <p className="text-sm text-[#FFFBF4] truncate">
                    {value || <span className="italic text-[#8A8578]">No value</span>}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(index)}
                    className="h-7 w-7 p-0 text-[#8A8578] hover:text-[#60A5FA] hover:bg-[#60A5FA]/10"
                  >
                    <Pencil className="w-3 h-3" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(key)}
                    className="h-7 w-7 p-0 text-[#8A8578] hover:text-[#F87171] hover:bg-[#F87171]/10"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {entries.length === 0 && (
            <div className="text-center py-8 text-[#8A8578]">
              <Settings2 className="w-10 h-10 mx-auto mb-3 opacity-20" />
              <p className="text-sm">No custom fields yet</p>
              <p className="text-xs mt-1">Add key-value pairs below</p>
            </div>
          )}

          {/* Add / Edit form */}
          <div className="space-y-3 pt-2 border-t border-white/5">
            <Label className="text-[#D8CFBC] text-xs font-medium">
              {editingIndex !== null ? "Edit Field" : "Add New Field"}
            </Label>
            <div className="space-y-2">
              <Input
                placeholder="Key (e.g. version, status, repo)"
                value={editKey}
                onChange={(e) => setEditKey(e.target.value)}
                disabled={isPending}
                className="bg-[#0A0A0A] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:border-[#60A5FA] focus-visible:ring-[#60A5FA]/20 text-sm"
              />
              <Input
                placeholder="Value (e.g. 1.0.0, production, private)"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAdd();
                }}
                disabled={isPending}
                className="bg-[#0A0A0A] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:border-[#60A5FA] focus-visible:ring-[#60A5FA]/20 text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                onClick={handleAdd}
                disabled={!editKey.trim() || isPending}
                className="bg-[#60A5FA] hover:bg-[#60A5FA]/90 text-[#0A0A0A] font-semibold text-sm gap-1.5"
              >
                {editingIndex !== null ? (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    Update
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    Add
                  </>
                )}
              </Button>
              {editingIndex !== null && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isPending}
                  className="border-white/10 text-[#D8CFBC] hover:bg-white/5 text-sm"
                >
                  Cancel
                </Button>
              )}
            </div>
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
          className="bg-[#60A5FA]/10 text-[#60A5FA] border border-[#60A5FA]/20 text-[10px] px-1.5 py-0"
        >
          {key}: {String(value)}
        </Badge>
      ))}
    </div>
  );
}
