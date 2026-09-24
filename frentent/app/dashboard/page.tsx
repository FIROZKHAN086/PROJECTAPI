
import { Suspense } from "react";
import Overview from "@/src/Components/dashboard/Overview";
import Projects from "@/src/Components/dashboard/Projects";
import ApiKey from "@/src/Components/dashboard/ApiKey";
import AddNewProject from "@/src/Components/dashboard/AddNewProject";
import EditProject from "@/src/Components/dashboard/EditProject";
import GetAllData from "@/src/Components/dashboard/GetAllData";
import DeleteProject from "@/src/Components/dashboard/DeleteProject";
import ViewProjects from "@/src/Components/dashboard/ViewProjects";
import ApiLook from "@/src/Components/dashboard/ApiLook";
import { SupportContent } from "@/src/Components/support/SupportContent";
import { DashboardContent } from "./DashboardContent";

 export const pageVariants = {
  initial: { opacity: 0, y: 18, scale: 0.995 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 90, damping: 20, mass: 0.9 },
  },
  exit: { opacity: 0, y: -14, filter: "blur(4px)", transition: { duration: 0.25 } },
};

 export const SECTIONS: Record<string, { title: string; description: string; component: React.ReactNode }> = {
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
  support: {
    title: "Support",
    description: "Get help and report issues",
    component: <SupportContent />,
  },
};



export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#07070B] flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="size-6 border-2 border-[#4ADE80]/30 border-t-[#4ADE80] rounded-full animate-spin" />
            <span className="text-sm text-[#A3A3A3]">Loading dashboard...</span>
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}