"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  LayoutDashboard,
  FolderOpen,
  Plus,
  Pencil,
  Trash2,
  Key,
  Database,
  Eye,
  FileSearch,
  LifeBuoy,
  Sparkles,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useAppSelector } from "@/src/lib/hooks";

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
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

const navSections: NavSection[] = [
  {
    title: "MAIN",
    items: [{ label: "Overview", icon: LayoutDashboard, path: "overview" }],
  },
  {
    title: "PROJECTS",
    items: [
      { label: "All Projects", icon: FolderOpen, path: "project" },
      { label: "View", icon: Eye, path: "view-projects" },
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
      { label: "Api-Data", icon: FileSearch, path: "Api-Data" },
    ],
  },
  {
    title: "SUPPORT",
    items: [
      { label: "Support", icon: LifeBuoy, path: "support" },
    ],
  },
];

const menuBadges: Record<string, { text: string; className: string }> = {
  "All Data": {
    text: "Beta",
    className: "bg-[#FACC15]/15 text-[#FACC15] border border-[#FACC15]/25",
  },
};

const groupVariants = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.45, ease: "easeOut" as const },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, x: -14 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 180, damping: 22 },
  },
};

const AppSidebar = ({ currentPath, onNavigate }: SidebarProps) => {

  const auth = useAppSelector((state) => state.auth);


  return (
    <Sidebar
      side="left"
      collapsible="offcanvas"
      className="relative border-r border-white/10 bg-[#0B0B10]/80 backdrop-blur-md"
    >
      {/* Header */}
      <SidebarHeader className="border-b border-white/10 p-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2.5"
        >
          <motion.div
            whileHover={{ rotate: 8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-[#4ADE80]/30 bg-gradient-to-br from-[#4ADE80]/25 to-[#22D3EE]/15 shadow-[0_0_20px_-6px_rgba(74,222,128,0.5)]"
          >
            <Code2 className="size-4.5 text-[#4ADE80]" />
          </motion.div>
          <span className="text-lg font-bold tracking-tight text-[#FAFAFA] font-space-grotesk group-data-[collapsible=icon]:hidden">
            Project<span className="bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] bg-clip-text text-transparent">API</span>
          </span>
        </motion.div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="px-2 py-4 space-y-4">
        {navSections.map((section, groupIndex) => (
          <motion.div
            key={section.title}
            custom={groupIndex}
            variants={groupVariants}
            initial="hidden"
            animate="show"
          >
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center gap-2 px-2 text-[10px] font-semibold tracking-[0.18em] text-[#6B6B6B] uppercase">
                <span className="h-px w-3 bg-gradient-to-r from-[#4ADE80]/70 to-transparent" />
                {section.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map((navItem) => {
                    const isActive = currentPath === navItem.path;
                    const Icon = navItem.icon;
                    const badge = menuBadges[navItem.label];

                    return (
                      <motion.div key={navItem.path} variants={itemVariants}>
                        <SidebarMenuItem>
                          <div className="relative">
                            {isActive && (
                              <motion.span
                                layoutId={`sidebar-active-${section.title}`}
                                className="absolute -left-1.5 top-1 bottom-1 w-[3px] rounded-full bg-gradient-to-b from-[#4ADE80] to-[#22D3EE] shadow-[0_0_12px_rgba(74,222,128,0.7)]"
                                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                              />
                            )}
                          </div>
                          <SidebarMenuButton
                            isActive={isActive}
                            onClick={() => onNavigate(navItem.path)}
                            tooltip={navItem.label}
                            className={
                              isActive
                                ? "bg-gradient-to-r from-[#4ADE80]/15 to-transparent text-[#4ADE80] border border-[#4ADE80]/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                                : "text-[#A3A3A3] hover:text-[#FAFAFA] hover:bg-white/[0.05] border border-transparent"
                            }
                          >
                            <motion.span
                              whileHover={{ scale: 1.12 }}
                              transition={{ type: "spring", stiffness: 350 }}
                            >
                              <Icon
                                className={
                                  isActive
                                    ? "text-[#4ADE80]"
                                    : "text-[#6B6B6B]"
                                }
                              />
                            </motion.span>
                            <span>{navItem.label}</span>
                          </SidebarMenuButton>
                          {badge && (
                            <SidebarMenuBadge className={badge.className}>
                              {badge.text}
                            </SidebarMenuBadge>
                          )}
                        </SidebarMenuItem>
                      </motion.div>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </motion.div>
        ))}
      </SidebarContent>

      <SidebarSeparator className="bg-white/10" />

      {/* Footer */}
      <SidebarFooter className="border-t border-white/10 p-3">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-3 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center"
        >
          <div className="pointer-events-none absolute -top-8 -right-8 size-20 rounded-full bg-[#4ADE80]/20 blur-2xl" />
          <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
            <div className="relative shrink-0">
              <div className="flex size-9 items-center justify-center rounded-full border border-[#4ADE80]/30 bg-gradient-to-br from-[#4ADE80] to-[#22D3EE] font-space-grotesk text-sm font-bold text-[#07110A]">
               { auth.user?.name?.charAt(0) || "D" }
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-[#4ADE80] border-2 border-[#0B0B10]" />
            </div>
            <div className="min-w-0 group-data-[collapsible=icon]:hidden">
              <p className="flex items-center gap-1 text-xs font-semibold text-[#FAFAFA] truncate">
                {auth.user?.name || "Dashboard Pro"}
                <Sparkles className="size-3 text-[#FACC15]" />
              </p>
              <p className="text-[10px] text-[#6B6B6B] truncate">
                Project Management Suite
              </p>
            </div>
          </div>
        </motion.div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;