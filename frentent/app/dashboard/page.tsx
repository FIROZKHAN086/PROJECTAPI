"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/src/lib/hooks";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import AppSidebar from "@/src/Components/dashboard/Sidebar";
import Overview from "@/src/Components/dashboard/Overview";
import Projects from "@/src/Components/dashboard/Projects";
import ApiKey from "@/src/Components/dashboard/ApiKey";
import AddNewProject from "@/src/Components/dashboard/AddNewProject";
import EditProject from "@/src/Components/dashboard/EditProject";
import GetAllData from "@/src/Components/dashboard/GetAllData";
import DeleteProject from "@/src/Components/dashboard/DeleteProject";
import ViewProjects from "@/src/Components/dashboard/ViewProjects";
import ApiLook from "@/src/Components/dashboard/ApiLook";

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.15 } },
};

const SECTIONS: Record<string, { title: string; description: string; component: React.ReactNode }> = {
  overview: {
    title: "Overview",
    description: "Your project dashboard at a glance",
    component: <Overview />,
  },
  project: {
    title: "Projects",
    description: "Manage all your projects",
    component: <Projects />,
  },
  "view-projects": {
    title: "View Projects",
    description: "Preview how your projects look",
    component: <ViewProjects />,
  },
  "api-key": {
    title: "API Keys",
    description: "Manage your API keys and access tokens",
    component: <ApiKey />,
  },
  "add-new-project": {
    title: "Add New Project",
    description: "Create a new project to get started",
    component: <AddNewProject />,
  },
  edits: {
    title: "Edit Project",
    description: "Update your project settings",
    component: <EditProject />,
  },
  "get-all-data": {
    title: "All Data",
    description: "View and export all your data",
    component: <GetAllData />,
  },
  "delete-project": {
    title: "Delete Project",
    description: "Permanently remove a project",
    component: <DeleteProject />,
  },
  "Api-Data": {
    title: "Api Data",
    description: "View your API Data",
    component: <ApiLook />,
  },
};

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAppSelector((s) => s.auth);

  const currentPath = searchParams.get("path") || "overview";
  const activeSection = SECTIONS[currentPath] || SECTIONS.overview;

  const handleNavigate = (path: string) => {
    router.push(`/dashboard?path=${path}`);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar currentPath={currentPath} onNavigate={handleNavigate} />

      <SidebarInset className="bg-[#0A0A0A]">
        {/* Top bar with sidebar trigger */}
        <header className="flex items-center gap-2 border-b border-white/10 px-4 py-3 md:hidden">
          <SidebarTrigger className="text-[#D8CFBC] hover:text-[#FFFBF4]" />
          <span className="text-sm font-medium text-[#FFFBF4]">
            {activeSection.title}
          </span>
        </header>

        {/* Content Area */}
        <main className="min-h-screen overflow-y-scroll p-4 md:p-6 lg:p-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPath}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#FFFBF4] font-space-grotesk">
                  {activeSection.title}
                </h1>
                <p className="text-sm text-[#8A8578] mt-1">
                  {activeSection.description}
                </p>
              </div>
              {activeSection.component}
            </motion.div>
          </AnimatePresence>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-[#4ADE80]/30 border-t-[#4ADE80] rounded-full animate-spin" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
