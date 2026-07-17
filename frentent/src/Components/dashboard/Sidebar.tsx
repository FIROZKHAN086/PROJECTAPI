"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  LayoutDashboard,
  FolderOpen,
  Plus,
  Pencil,
  Trash2,
  Key,
  Database,
  ChevronDown,
  Layout,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface menuBadge {
  text: string;
  className: string;
}

const navSections: NavSection[] = [
  {
    title: "MAIN",
    items: [{ label: "Overview", icon: LayoutDashboard, path: "overview" }],
  },
  {
    title: "PROJECTS",
    items: [
      { label: "All Projects", icon: FolderOpen, path: "project" },
      { label: "Add New", icon: Plus, path: "add-new-project" },
      { label: "Edit", icon: Pencil, path: "edits" },
      { label: "Delete", icon: Trash2, path: "delete-project" },
    ],
  },
  {
    title: "DEVELOPER",
    items: [
      { label: "API Keys", icon: Key, path: "api-key" },
      { label: "All Data", icon: Database, path: "get-all-data" },
    ],
  },
];

const menuBadges: Record<string, menuBadge> = {
  "All Data": {
    text: "Beta",
    className: "bg-yellow-500 text-black",
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 14,
    },
  },
};

const sectionVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { type: "spring" as const, stiffness: 150, damping: 20 },
      opacity: { duration: 0.2 },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { type: "spring" as const, stiffness: 150, damping: 20 },
      opacity: { duration: 0.15 },
    },
  },
};

const Sidebar = ({
  currentPath,
  onNavigate,
  isOpen,
  onClose,
}: SidebarProps) => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    MAIN: true,
    PROJECTS: true,
    DEVELOPER: true,
  });

  const toggleSection = useCallback((title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  }, []);

  const handleNav = useCallback(
    (path: string) => {
      onNavigate(path);
      onClose();
    },
    [onNavigate, onClose]
  );

  const sidebarInner = (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/10">
        <motion.div
          className="flex items-center gap-2.5 cursor-pointer group"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="text-[#ececec] font-bold font-mono flex items-center justify-center p-1.5 rounded-lg bg-[#141414] border border-white/10 group-hover:border-[#4ADE80]/50 group-hover:shadow-[0_0_15px_rgba(74,222,128,0.25)] transition-all duration-300">
            <Code2 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          </span>
          <span className="text-lg font-bold text-[#FFFBF4] tracking-tight font-sans">
            Project<span className="text-[#4ADE80]">API</span>
          </span>
        </motion.div>
      </div>

      <motion.nav
        className="flex-1 overflow-y-auto px-3 py-4 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {navSections.map((section) => (
          <motion.div key={section.title} variants={itemVariants}>
            <button
              onClick={() => toggleSection(section.title)}
              className="w-full flex items-center justify-between px-2 mb-1.5 cursor-pointer group"
            >
              <span className="text-[10px] font-semibold tracking-widest text-[#8A8578] uppercase select-none">
                {section.title}
              </span>
              <motion.span
                animate={{ rotate: expandedSections[section.title] ? 0 : -90 }}
                transition={{ duration: 0.2 }}
                className="text-[#8A8578] group-hover:text-[#D8CFBC] transition-colors"
              >
                <ChevronDown className="w-3 h-3" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {expandedSections[section.title] && (
                <motion.div
                  key={`content-${section.title}`}
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="overflow-hidden"
                >
                  <div className="space-y-0.5">
                    {section.items.map((item) => {
                      const isActive = currentPath === item.path;
                      const Icon = item.icon;

                      return (
                        <motion.button
                          key={item.path}
                          onClick={() => handleNav(item.path)}
                          className={`
                            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                            transition-all duration-200 relative group cursor-pointer
                            ${
                              isActive
                                ? "bg-[#4ADE80]/10 text-[#4ADE80] border-l-2 border-[#4ADE80] pl-[10px]"
                                : "text-[#D8CFBC] hover:text-[#FFFBF4] hover:bg-white/5 border-l-2 border-transparent pl-[10px]"
                            }
                          `}
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          variants={itemVariants}
                        >
                          <Icon
                            className={`w-4 h-4 flex-shrink-0 ${
                              isActive
                                ? "text-[#4ADE80]"
                                : "text-[#8A8578] group-hover:text-[#D8CFBC]"
                            }`}
                          />
                          <span>{item.label} </span>
                          {isActive && (
                            <motion.div
                              layoutId="sidebar-active-indicator"
                              className="absolute right-2 w-1.5 h-1.5 rounded-full bg-[#4ADE80]"
                              transition={{
                                type: "spring" as const,
                                stiffness: 300,
                                damping: 25,
                              }}
                            />
                          )}
                          {menuBadges[item.label] && (
                            <motion.span
                              className={`absolute right-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ${menuBadges[item.label].className}`}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                              }}
                            >
                              {menuBadges[item.label].text}
                            </motion.span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.nav>

      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-[#4ADE80]/15 border border-[#4ADE80]/30 flex items-center justify-center flex-shrink-0">
            <Layout className="w-4 h-4 text-[#4ADE80]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#FFFBF4] truncate">
              Dashboard
            </p>
            <p className="text-[10px] text-[#8A8578] truncate">
              Project Management
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop: static sidebar in flex layout */}
      <aside className="hidden md:flex w-[260px] shrink-0 bg-[#0A0A0A] border-r border-white/10 flex-col h-full">
        {sidebarInner}
      </aside>

      {/* Mobile: shadcn Sheet */}
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          side="left"
          className="w-[280px] p-0 bg-[#0A0A0A] border-r border-white/10 [&>button]:hidden"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
            <SheetDescription>Dashboard sidebar navigation</SheetDescription>
          </SheetHeader>
          {sidebarInner}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;
