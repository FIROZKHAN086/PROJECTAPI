"use client";

import React from "react";
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
  Layout,
  FileSearch,
  LifeBuoy,
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
    className: "bg-yellow-500 text-black",
  },
};

const AppSidebar = ({ currentPath, onNavigate }: SidebarProps) => {
  return (
    <Sidebar
      side="left"
      collapsible="offcanvas"
      className="bg-[#0A0A0A]  min-h-screen  border-r border-white/10"
    >
      {/* Header */}
      <SidebarHeader className="border-b   border-white/10 p-4 ">
        <div className="flex items-center gap-2.5">
          
          <span className="text-lg font-bold text-[#FFFBF4] tracking-tight font-sans group-data-[collapsible=icon]:hidden">
            Project<span className="text-[#4ADE80]">API</span>
          </span>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="px-2 py-4">
        {navSections.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="text-[10px] font-semibold tracking-widest text-[#8A8578] uppercase">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((navItem) => {
                  const isActive = currentPath === navItem.path;
                  const Icon = navItem.icon;
                  const badge = menuBadges[navItem.label];

                  return (
                    <SidebarMenuItem key={navItem.path}>
                      <SidebarMenuButton
                        isActive={isActive}
                        onClick={() => onNavigate(navItem.path)}
                        tooltip={navItem.label}
                        className={
                          isActive
                            ? "bg-[#4ADE80]/10 text-[#4ADE80] border-l-2 border-[#4ADE80]"
                            : "text-[#D8CFBC] hover:text-[#FFFBF4] hover:bg-white/5 border-l-2 border-transparent"
                        }
                      >
                        <Icon
                          className={
                            isActive
                              ? "text-[#4ADE80]"
                              : "text-[#8A8578]"
                          }
                        />
                        <span>{navItem.label}</span>
                      </SidebarMenuButton>
                      {badge && (
                        <SidebarMenuBadge className={badge.className}>
                          {badge.text}
                        </SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarSeparator className="bg-white/10" />

      {/* Footer */}
      <SidebarFooter className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <div className="w-8 h-8 rounded-full bg-[#4ADE80]/15 border border-[#4ADE80]/30 flex items-center justify-center shrink-0">
            <Layout className="w-4 h-4 text-[#4ADE80]" />
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="text-xs font-semibold text-[#FFFBF4] truncate">
              Dashboard
            </p>
            <p className="text-[10px] text-[#8A8578] truncate">
              Project Management
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
