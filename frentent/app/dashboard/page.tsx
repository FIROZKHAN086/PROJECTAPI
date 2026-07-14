"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  Folder,
  BarChart2,
  Terminal,
  Image,
  LayoutTemplate,
  Settings,
  LifeBuoy,
  BookOpen,
  Code2,
  ChevronDown,
  Search,
  Bell,
  Plus,
  Star,
  MoreHorizontal,
  Filter,
  ArrowUpDown,
  X,
  Upload,
  List
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Types
type ProjectStatus = "Live" | "Draft" | "Archived";

interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  techStack: string[];
  tags: string[];
  featured: boolean;
  updatedAt: string;
}

// Mock data
const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Dashboard",
    description: "A polished storefront admin for managing products and orders.",
    status: "Live",
    techStack: ["Next.js", "Stripe", "Postgres"],
    tags: ["Full Stack", "E-Commerce"],
    featured: true,
    updatedAt: "2h ago",
  },
  {
    id: "2",
    title: "Portfolio Site v2",
    description: "Minimal portfolio with CMS-driven case studies and testimonials.",
    status: "Draft",
    techStack: ["Astro", "MDX"],
    tags: ["Frontend", "CMS"],
    featured: false,
    updatedAt: "1d ago",
  },
  {
    id: "3",
    title: "Client CMS Panel",
    description: "Internal content workflow for a small creative studio.",
    status: "Live",
    techStack: ["Vue", "Supabase"],
    tags: ["CMS", "Admin"],
    featured: false,
    updatedAt: "3d ago",
  },
  {
    id: "4",
    title: "Marketing Microsite",
    description: "Campaign landing page with lead capture and performance tracking.",
    status: "Live",
    techStack: ["Next.js", "Vercel"],
    tags: ["Marketing", "Landing Page"],
    featured: false,
    updatedAt: "8h ago",
  },
  {
    id: "5",
    title: "API Reference Hub",
    description: "Developer docs and endpoint explorer for partner integrations.",
    status: "Draft",
    techStack: ["Docs", "OpenAPI"],
    tags: ["API", "Documentation"],
    featured: false,
    updatedAt: "2d ago",
  },
  {
    id: "6",
    title: "Design System Kit",
    description: "Reusable UI primitives and tokens for product teams and contractors.",
    status: "Live",
    techStack: ["Storybook", "Tokens"],
    tags: ["Design", "UI"],
    featured: true,
    updatedAt: "3d ago",
  },
];

// Sidebar navigation items
const mainNavItems = [
  { icon: LayoutGrid, label: "Overview", active: false },
  { icon: Folder, label: "Projects", active: true },
  { icon: BarChart2, label: "Analytics", active: false },
  { icon: Terminal, label: "API", active: false },
  { icon: Image, label: "Media", active: false },
  { icon: LayoutTemplate, label: "Templates", active: false },
  { icon: Settings, label: "Settings", active: false },
];

const secondaryNavItems = [
  { icon: LifeBuoy, label: "Support" },
  { icon: BookOpen, label: "Documentation" },
];

const filterChips = ["All", "Featured", "Archived", "Draft", "Full Stack", "Frontend", "API"];

// Project Card Component
const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const statusColors = {
    Live: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    Draft: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    Archived: "border-gray-500/20 bg-gray-500/10 text-gray-400",
  };

  const statusDotColors = {
    Live: "bg-emerald-400",
    Draft: "bg-amber-400",
    Archived: "bg-gray-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.2)" }}
      className="rounded-xl border border-white/10 bg-[#141414] p-4 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
    >
      <Card className="border-0 bg-transparent">
        <CardContent className="p-0">
          {/* Thumbnail */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-white/10 bg-[#0A0A0A]">
            {project.featured && (
              <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-black/80 px-2 py-1 text-[11px] text-[#FFFBF4] backdrop-blur-sm">
                <Star className="size-3" />
                Featured
              </div>
            )}
            {/* Placeholder gradient */}
            <div className="h-full w-full bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A]" />
          </div>

          {/* Title & Status */}
          <div className="mt-3 flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="text-base font-semibold text-[#FFFBF4]">{project.title}</h3>
              <p className="mt-1 line-clamp-1 text-sm text-[#D8CFBC]">{project.description}</p>
            </div>
            <div className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs ${statusColors[project.status]}`}>
              <span className={`size-1.5 rounded-full ${statusDotColors[project.status]}`} />
              {project.status}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-[#0A0A0A] px-2.5 py-1 text-[11px] text-[#8A8578]"
              >
                {tech}
              </span>
            ))}
          </div>
        </CardContent>

        <CardFooter className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 px-0">
          <span className="text-xs text-[#8A8578]">Updated {project.updatedAt}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-[#8A8578] hover:text-[#FFFBF4]">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#141414] border-white/10">
              <DropdownMenuItem className="text-[#D8CFBC] hover:text-[#FFFBF4] hover:bg-white/5 cursor-pointer">
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[#D8CFBC] hover:text-[#FFFBF4] hover:bg-white/5 cursor-pointer">
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[#D8CFBC] hover:text-[#FFFBF4] hover:bg-white/5 cursor-pointer">
                Pin
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[#D8CFBC] hover:text-[#FFFBF4] hover:bg-white/5 cursor-pointer">
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[#F87171] hover:text-[#F87171] hover:bg-white/5 cursor-pointer">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// New Project Drawer Component
const NewProjectDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");

  const drawerVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { type: "spring", damping: 30, stiffness: 200 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black"
          />

          {/* Drawer */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 z-50 flex h-full w-[480px] flex-col border-l border-white/10 bg-[#141414]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <h2 className="text-xl font-semibold text-[#FFFBF4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                New Project
              </h2>
              <button
                onClick={onClose}
                className="flex size-9 items-center justify-center rounded-full text-[#D8CFBC] hover:bg-white/5 hover:text-[#FFFBF4] transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <motion.div variants={itemVariants} className="space-y-4">
                {/* Title */}
                <div className="space-y-1.5">
                  <Label className="text-sm text-[#D8CFBC]">Title</Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Project title"
                    className="border-white/10 bg-[#0A0A0A] text-[#FFFBF4] placeholder:text-[#8A8578] focus:border-white/20"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-1.5">
                  <Label className="text-sm text-[#D8CFBC]">Slug</Label>
                  <Input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="project-title"
                    className="border-white/10 bg-[#0A0A0A] text-[#FFFBF4] placeholder:text-[#8A8578] focus:border-white/20"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <Label className="text-sm text-[#D8CFBC]">Short Description</Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the project in one or two sentences"
                    className="min-h-[96px] border-white/10 bg-[#0A0A0A] text-[#FFFBF4] placeholder:text-[#8A8578] focus:border-white/20 resize-none"
                  />
                </div>

                {/* GitHub URL */}
                <div className="space-y-1.5">
                  <Label className="text-sm text-[#D8CFBC]">GitHub URL</Label>
                  <Input
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="border-white/10 bg-[#0A0A0A] text-[#FFFBF4] placeholder:text-[#8A8578] focus:border-white/20"
                  />
                </div>

                {/* Live Demo URL */}
                <div className="space-y-1.5">
                  <Label className="text-sm text-[#D8CFBC]">Live Demo URL</Label>
                  <Input
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://..."
                    className="border-white/10 bg-[#0A0A0A] text-[#FFFBF4] placeholder:text-[#8A8578] focus:border-white/20"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <Label className="text-sm text-[#D8CFBC]">Category</Label>
                  <Select>
                    <SelectTrigger className="border-white/10 bg-[#0A0A0A] text-[#8A8578] focus:border-white/20">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="border-white/10 bg-[#0A0A0A]">
                      <SelectItem value="full-stack" className="text-[#D8CFBC] hover:bg-white/5 focus:bg-white/5">
                        Full Stack
                      </SelectItem>
                      <SelectItem value="frontend" className="text-[#D8CFBC] hover:bg-white/5 focus:bg-white/5">
                        Frontend
                      </SelectItem>
                      <SelectItem value="backend" className="text-[#D8CFBC] hover:bg-white/5 focus:bg-white/5">
                        Backend
                      </SelectItem>
                      <SelectItem value="mobile" className="text-[#D8CFBC] hover:bg-white/5 focus:bg-white/5">
                        Mobile
                      </SelectItem>
                      <SelectItem value="other" className="text-[#D8CFBC] hover:bg-white/5 focus:bg-white/5">
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tags */}
                <div className="space-y-1.5">
                  <Label className="text-sm text-[#D8CFBC]">Tags</Label>
                  <div className="min-h-10 rounded-lg border border-white/10 bg-[#0A0A0A] p-2 flex flex-wrap gap-1.5">
                    <span className="rounded-full border border-white/10 bg-[#141414] px-2.5 py-1 text-xs text-[#D8CFBC]">
                      Design
                    </span>
                    <span className="rounded-full border border-white/10 bg-[#141414] px-2.5 py-1 text-xs text-[#D8CFBC]">
                      CMS
                    </span>
                    <span className="text-sm text-[#8A8578]">Add tag...</span>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="space-y-1.5">
                  <Label className="text-sm text-[#D8CFBC]">Tech Stack</Label>
                  <div className="min-h-10 rounded-lg border border-white/10 bg-[#0A0A0A] p-2 flex flex-wrap gap-1.5">
                    <span className="rounded-full border border-white/10 bg-[#141414] px-2.5 py-1 text-xs text-[#D8CFBC]">
                      Next.js
                    </span>
                    <span className="rounded-full border border-white/10 bg-[#141414] px-2.5 py-1 text-xs text-[#D8CFBC]">
                      Supabase
                    </span>
                    <span className="text-sm text-[#8A8578]">Add stack...</span>
                  </div>
                </div>

                {/* Thumbnail Upload */}
                <div className="space-y-1.5">
                  <Label className="text-sm text-[#D8CFBC]">Thumbnail</Label>
                  <div className="flex min-h-[140px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-white/20 bg-[#0A0A0A] p-6 text-center transition-colors hover:border-white/30">
                    <Upload className="size-6 text-[#8A8578]" />
                    <p className="mt-2 text-sm text-[#D8CFBC]">Drag and drop or click to upload</p>
                    <p className="mt-1 text-xs text-[#8A8578]">PNG, JPG, or WebP up to 10MB</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 flex items-center justify-between border-t border-white/10 bg-[#141414] px-6 py-4">
              <Button
                variant="ghost"
                onClick={onClose}
                className="text-[#D8CFBC] hover:bg-white/5 hover:text-[#FFFBF4]"
              >
                Cancel
              </Button>
              <Button className="bg-[#FBF7F4] text-[#0A0A0A] hover:bg-[#FBF7F4]/90">
                Create Project
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Main Dashboard Component
export default function Dashboard() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans antialiased text-[#FFFBF4]">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="flex w-64 shrink-0 flex-col border-r border-white/10 bg-[#0D0D0D]">
          {/* Logo */}
          <div className="flex h-18 items-center border-b border-white/10 px-4">
            <div className="flex items-center gap-2">
              <Code2 className="size-4 text-[#FFFBF4]" />
              <span className="text-lg font-semibold text-[#FFFBF4] tracking-tight">ProjectAPI</span>
            </div>
          </div>

          {/* Workspace */}
          <div className="border-b border-white/10 px-4 py-4">
            <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#141414] px-3 py-2">
              <Avatar className="size-8">
                <AvatarFallback className="bg-[#0A0A0A] text-xs text-[#FFFBF4]">FW</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="truncate text-sm font-medium text-[#FFFBF4]">Firoz's Workspace</div>
                <div className="truncate text-xs text-[#8A8578]">Personal workspace</div>
              </div>
              <ChevronDown className="size-4 text-[#8A8578]" />
            </div>
          </div>

          {/* Main Nav */}
          <nav className="flex-1 space-y-0.5 px-4 py-4">
            {mainNavItems.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  item.active
                    ? "bg-[#141414] text-[#FFFBF4] border-l-2 border-[#FBF7F4]"
                    : "text-[#D8CFBC] hover:bg-white/5 hover:text-[#FFFBF4]"
                }`}
              >
                <item.icon className="size-5" />
                <span>{item.label}</span>
              </div>
            ))}
          </nav>

          {/* Secondary Nav */}
          <div className="border-t border-white/10 px-4 py-4">
            {secondaryNavItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#D8CFBC] transition-all duration-200 hover:bg-white/5 hover:text-[#FFFBF4] cursor-pointer"
              >
                <item.icon className="size-5" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Add New Project Button */}
          <div className="border-t border-white/10 px-4 py-4">
            <Button
              onClick={() => setIsDrawerOpen(true)}
              className="w-full justify-start gap-2 bg-[#FBF7F4] text-[#0A0A0A] hover:bg-[#FBF7F4]/90"
            >
              <Plus className="size-4" />
              Add New Project
            </Button>
            <div className="mt-3 flex items-center gap-3 rounded-lg px-2 py-1.5">
              <Avatar className="size-7">
                <AvatarFallback className="bg-[#141414] text-xs text-[#FFFBF4]">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="truncate text-sm font-medium text-[#FFFBF4]">Jordan Doe</div>
              </div>
              <ChevronDown className="size-4 text-[#8A8578]" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {/* Top Bar */}
          <div className="sticky top-0 z-20 border-b border-white/10 bg-[#0A0A0A]/90 backdrop-blur-sm">
            <div className="flex h-16 items-center justify-between px-6">
              <h1 className="text-xl font-semibold text-[#FFFBF4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Projects
              </h1>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8A8578]" />
                  <Input
                    placeholder="Search projects, docs, keys..."
                    className="w-[280px] border-white/10 bg-[#141414] pl-9 text-[#FFFBF4] placeholder:text-[#8A8578] focus:border-white/20"
                  />
                  <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-white/10 bg-[#0A0A0A] px-1.5 py-0.5 text-[11px] text-[#8A8578]">
                    ⌘K
                  </kbd>
                </div>
                <button className="flex size-9 items-center justify-center rounded-full text-[#D8CFBC] hover:bg-white/5 hover:text-[#FFFBF4] transition-colors">
                  <Bell className="size-4" />
                </button>
                <Avatar className="size-9">
                  <AvatarFallback className="bg-[#141414] text-sm text-[#FFFBF4]">JD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-6">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-[#8A8578]">24 projects</span>
              <div className="flex items-center gap-2">
                <div className="flex rounded-lg border border-white/10 bg-[#141414] p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`rounded-md p-1.5 transition-colors ${
                      viewMode === "grid"
                        ? "bg-[#0A0A0A] text-[#FFFBF4]"
                        : "text-[#8A8578] hover:text-[#D8CFBC]"
                    }`}
                  >
                    <LayoutGrid className="size-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`rounded-md p-1.5 transition-colors ${
                      viewMode === "list"
                        ? "bg-[#0A0A0A] text-[#FFFBF4]"
                        : "text-[#8A8578] hover:text-[#D8CFBC]"
                    }`}
                  >
                    <List className="size-4" />
                  </button>
                </div>
                <Button variant="outline" className="border-white/10 bg-[#141414] text-[#D8CFBC] hover:bg-white/5">
                  <Filter className="size-4 mr-1.5" />
                  Filter
                </Button>
                <Button variant="outline" className="border-white/10 bg-[#141414] text-[#D8CFBC] hover:bg-white/5">
                  <ArrowUpDown className="size-4 mr-1.5" />
                  Sort: Recently updated
                </Button>
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
              {filterChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => setActiveFilter(chip)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeFilter === chip
                      ? "border-white/20 bg-[#141414] text-[#FFFBF4]"
                      : "border-white/10 bg-transparent text-[#D8CFBC] hover:bg-white/5"
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* New Project Drawer */}
      <NewProjectDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
}