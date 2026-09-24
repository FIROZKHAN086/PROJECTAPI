'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/src/Components/dashboard/Sidebar";

import { useAppSelector } from "@/src/lib/hooks";
import { Aurora } from "@/src/Components/dashboard/ui";
import { pageVariants, SECTIONS } from "./page";
import { Activity, ChevronRight, Radar } from "lucide-react";


export function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPath = searchParams.get("path") || "overview";
  const activeSection = SECTIONS[currentPath] || SECTIONS.overview;
const auth = useAppSelector((state) => state.auth);
  const handleNavigate = (path: string) => {
    router.push(`/dashboard?path=${path}`);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar currentPath={currentPath} onNavigate={handleNavigate} />

      <SidebarInset className="relative bg-transparent">
        <Aurora />

        {/* Mobile top bar */}
        <header className="sticky top-0 z-40 flex items-center gap-2 border-b border-white/10 bg-[#07070B]/80 backdrop-blur-md px-4 py-3 lg:hidden">
          <SidebarTrigger className="text-[#D8CFBC] hover:text-[#FFFBF4]" />
          <div className="flex items-center gap-1.5 text-sm text-[#A3A3A3]">
            <span className="font-medium text-[#FAFAFA]">{activeSection.title}</span>
          </div>
        </header>

        {/* Content Area */}
        <main className="min-h-screen overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPath}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* Desktop context header */}
              <div className="hidden lg:flex items-center justify-between border-b border-white/10 px-8 py-5">
                <div className="flex items-center gap-1.5 text-[13px] text-[#A3A3A3]">
                  <Radar className="size-4 text-[#4ADE80]" />
                  <span className="text-[#FAFAFA] font-medium">ProjectAPI</span>
                  <ChevronRight className="size-3.5 text-[#5A5A5A]" />
                  <span>Dashboard</span>
                  <ChevronRight className="size-3.5 text-[#5A5A5A]" />
                  <span className="text-[#D8CFBC]">{activeSection.title}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-[#4ADE80]/25 bg-[#4ADE80]/10 px-3 py-1.5 text-[11px] font-medium text-[#4ADE80]">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#4ADE80] opacity-75" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-[#4ADE80]" />
                    </span>
                    All systems operational
                  </div>
                  <div className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-[#4ADE80] to-[#22D3EE] font-space-grotesk text-xs font-bold text-[#07110A]">
                   { auth.user?.name?.charAt(0) || "D" }
                  </div>
                </div>
              </div>

              <div className="px-4 py-6 md:px-8 md:py-8">
                <div className="mx-auto max-w-7xl space-y-2">
                  <div className="mb-6 flex items-center gap-2 lg:hidden">
                    <Activity className="size-4 text-[#4ADE80]" />
                    <p className="text-sm text-[#A3A3A3]">{activeSection.description}</p>
                  </div>
                  {activeSection.component}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}