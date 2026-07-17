"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Database,
  Copy,
  Check,
  BarChart3,
  Layers,
  Tag,
  Sparkles,
} from "lucide-react";
import { useProjects } from "@/src/hooks/useProjects";
import { toast } from "@/src/lib/toastSlice";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
};

const tabs = ["Projects", "Project IDs", "Stats"] as const;
type Tab = (typeof tabs)[number];

export default function GetAllData() {
  const [activeTab, setActiveTab] = useState<Tab>("Projects");
  const [copied, setCopied] = useState(false);
  const { data: projectsData, isLoading } = useProjects();

  const projects = projectsData?.data ?? [];

  const stats = useMemo(() => {
    const uniqueCategories = new Set(projects.map((p) => p.category));
    const totalTechItems = projects.reduce((acc, p) => acc + (p.tech?.length || 0), 0);
    const featuredCount = projects.filter((p) => p.featured).length;

    return {
      totalProjects: projects.length,
      featuredCount,
      uniqueCategories: uniqueCategories.size,
      totalTechItems,
    };
  }, [projects]);

  const handleCopyTitles = () => {
    const titles = projects.map((p) => p.title).join("\n");
    navigator.clipboard.writeText(titles).then(() => {
      setCopied(true);
      toast.success("Project titles copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-[#FFFBF4] font-sans antialiased">
        <main className="max-w-4xl mx-auto px-6 py-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-10 rounded-xl bg-white/5 animate-pulse" />
              <div className="space-y-2">
                <div className="h-6 w-24 bg-white/5 rounded animate-pulse" />
                <div className="h-4 w-64 bg-white/5 rounded animate-pulse" />
              </div>
            </div>
            <div className="flex gap-2 w-fit">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-9 w-24 bg-white/5 rounded-lg animate-pulse" />
              ))}
            </div>
            <div className="bg-[#141414] border border-white/10 rounded-xl p-0">
              <div className="space-y-0">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex gap-4 p-4 border-b border-white/5">
                    <div className="h-4 flex-1 bg-white/5 rounded animate-pulse" />
                    <div className="h-4 w-20 bg-white/5 rounded animate-pulse" />
                    <div className="h-4 w-16 bg-white/5 rounded animate-pulse" />
                    <div className="h-4 w-24 bg-white/5 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFBF4] font-sans antialiased">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-10 rounded-xl bg-[#4ADE80]/10 border border-[#4ADE80]/20">
                <Database className="size-5 text-[#4ADE80]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-[#FFFBF4]">
                  All Data
                </h1>
                <p className="text-sm text-[#8A8578]">
                  View and export your project data and statistics
                </p>
              </div>
            </div>
            <motion.div variants={item} className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyTitles}
                className="border-white/10 text-[#D8CFBC] hover:bg-white/5 hover:text-[#FFFBF4] cursor-pointer"
              >
                {copied ? (
                  <Check className="size-3.5 mr-1.5 text-[#4ADE80]" />
                ) : (
                  <Copy className="size-3.5 mr-1.5" />
                )}
                {copied ? "Copied!" : "Copy All Titles"}
              </Button>
            </motion.div>
          </motion.div>

          <motion.div variants={item} className="flex gap-1 p-1 rounded-lg bg-[#141414] border border-white/10 w-fit">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === tab
                    ? "bg-[#4ADE80] text-[#0A0A0A]"
                    : "text-[#8A8578] hover:text-[#D8CFBC] hover:bg-white/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>

          {activeTab === "Projects" && (
            <motion.div
              key="projects"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={item}>
                <Card className="bg-[#141414] border-white/10 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left py-3 px-4 text-[#8A8578] font-medium text-xs uppercase tracking-wider">Title</th>
                            <th className="text-left py-3 px-4 text-[#8A8578] font-medium text-xs uppercase tracking-wider">Category</th>
                            <th className="text-left py-3 px-4 text-[#8A8578] font-medium text-xs uppercase tracking-wider">Tech</th>
                            <th className="text-left py-3 px-4 text-[#8A8578] font-medium text-xs uppercase tracking-wider">Featured</th>
                            <th className="text-left py-3 px-4 text-[#8A8578] font-medium text-xs uppercase tracking-wider">Created</th>
                          </tr>
                        </thead>
                        <tbody>
                          {projects.map((p) => (
                            <motion.tr
                              key={p.ProjectID}
                              variants={item}
                              className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors"
                            >
                              <td className="py-3 px-4 text-[#FFFBF4] font-medium">{p.title}</td>
                              <td className="py-3 px-4">
                                <Badge variant="secondary" className="bg-white/5 text-[#D8CFBC] border border-white/10 text-[10px]">
                                  {p.category}
                                </Badge>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex flex-wrap gap-1">
                                  {p.tech?.slice(0, 3).map((t) => (
                                    <Badge key={t} variant="secondary" className="bg-white/5 text-[#D8CFBC] border border-white/10 text-[10px]">
                                      {t}
                                    </Badge>
                                  ))}
                                  {(p.tech?.length || 0) > 3 && (
                                    <Badge variant="secondary" className="bg-white/5 text-[#8A8578] border border-white/10 text-[10px]">
                                      +{(p.tech?.length || 0) - 3}
                                    </Badge>
                                  )}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                {p.featured ? (
                                  <Badge variant="secondary" className="bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/20 text-[10px]">
                                    Yes
                                  </Badge>
                                ) : (
                                  <span className="text-[#8A8578] text-xs">No</span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-[#8A8578]">
                                {new Date(p.createdAt).toLocaleDateString()}
                              </td>
                            </motion.tr>
                          ))}
                          {projects.length === 0 && (
                            <tr>
                              <td colSpan={5} className="py-8 text-center text-[#8A8578]">
                                No projects found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "Project IDs" && (
            <motion.div
              key="project-ids"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={item}>
                <Card className="bg-[#141414] border-white/10 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left py-3 px-4 text-[#8A8578] font-medium text-xs uppercase tracking-wider">Title</th>
                            <th className="text-left py-3 px-4 text-[#8A8578] font-medium text-xs uppercase tracking-wider">ProjectID</th>
                            <th className="text-left py-3 px-4 text-[#8A8578] font-medium text-xs uppercase tracking-wider">Live Demo</th>
                            <th className="text-left py-3 px-4 text-[#8A8578] font-medium text-xs uppercase tracking-wider">GitHub</th>
                          </tr>
                        </thead>
                        <tbody>
                          {projects.map((p) => (
                            <motion.tr
                              key={p.ProjectID}
                              variants={item}
                              className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors"
                            >
                              <td className="py-3 px-4 text-[#FFFBF4] font-medium">{p.title}</td>
                              <td className="py-3 px-4">
                                <code className="text-xs font-mono text-[#4ADE80] bg-[#4ADE80]/5 px-1.5 py-0.5 rounded">
                                  {p.ProjectID}
                                </code>
                              </td>
                              <td className="py-3 px-4">
                                {p.liveDemo ? (
                                  <a
                                    href={p.liveDemo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-[#4ADE80] hover:underline truncate max-w-[200px] block"
                                  >
                                    {p.liveDemo}
                                  </a>
                                ) : (
                                  <span className="text-[#8A8578] text-xs">-</span>
                                )}
                              </td>
                              <td className="py-3 px-4">
                                {p.github ? (
                                  <a
                                    href={p.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-[#4ADE80] hover:underline truncate max-w-[200px] block"
                                  >
                                    {p.github}
                                  </a>
                                ) : (
                                  <span className="text-[#8A8578] text-xs">-</span>
                                )}
                              </td>
                            </motion.tr>
                          ))}
                          {projects.length === 0 && (
                            <tr>
                              <td colSpan={4} className="py-8 text-center text-[#8A8578]">
                                No projects found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "Stats" && (
            <motion.div
              key="stats"
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <motion.div variants={item}>
                <Card className="bg-[#141414] border border-white/10 hover:border-white/20 transition-colors">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#4ADE80]/10">
                        <Layers className="w-5 h-5 text-[#4ADE80]" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/20 text-[10px]"
                      >
                        Total
                      </Badge>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#FFFBF4]">{stats.totalProjects}</p>
                      <p className="text-sm text-[#8A8578]">Total Projects</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className="bg-[#141414] border border-white/10 hover:border-white/20 transition-colors">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#FBBF24]/10">
                        <Sparkles className="w-5 h-5 text-[#FBBF24]" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-[#FBBF24]/10 text-[#FBBF24] border border-[#FBBF24]/20 text-[10px]"
                      >
                        Featured
                      </Badge>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#FFFBF4]">{stats.featuredCount}</p>
                      <p className="text-sm text-[#8A8578]">Featured Count</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className="bg-[#141414] border border-white/10 hover:border-white/20 transition-colors">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/10">
                        <BarChart3 className="w-5 h-5 text-blue-400" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-blue-500/10 text-blue-400 border border-blue-400/20 text-[10px]"
                      >
                        Unique
                      </Badge>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#FFFBF4]">{stats.uniqueCategories}</p>
                      <p className="text-sm text-[#8A8578]">Unique Categories</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className="bg-[#141414] border border-white/10 hover:border-white/20 transition-colors">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#F87171]/10">
                        <Tag className="w-5 h-5 text-[#F87171]" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-[#F87171]/10 text-[#F87171] border border-[#F87171]/20 text-[10px]"
                      >
                        Items
                      </Badge>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#FFFBF4]">{stats.totalTechItems}</p>
                      <p className="text-sm text-[#8A8578]">Total Tech Items</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
