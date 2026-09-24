"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Key,
  Copy,
  Check,
  Eye,
  EyeOff,
  Clock,
  Lock,
  Info,
  Terminal,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Loader2,
  Zap,
  Star,
  Send,
  FileJson,
  Table,
  Grid,
  Activity,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DashHeader,
  Reveal,
  GlowCard,
  Counter,
} from "@/src/Components/dashboard/ui";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tech: string[];
  featured: boolean;
  createdAt: string;
  updatedAt?: string;
  liveDemo?: string;
  github?: string;
  image?: string;
}

interface ApiResponse {
  success: boolean;
  source?: string;
  total?: number;
  data?: Project[];
  message?: string;
}

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/public`;

export default function ApiLook() {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeView, setActiveView] = useState<"json" | "table" | "grid">("json");
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleFetchProjects = async () => {
    if (!apiKey.trim()) {
      setError("Please enter your API key");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResponse(null);
    setResponseTime(null);
    setStatusCode(null);

    const startTime = Date.now();

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "accesskey": apiKey.trim(),
          "Content-Type": "application/json",
        },
      });

      const endTime = Date.now();
      setResponseTime(endTime - startTime);
      setStatusCode(res.status);

      const data = await res.json();

      if (res.ok) {
        setResponse(data);
      } else {
        setError(data.message || `Error ${res.status}: Failed to fetch projects`);
        setResponse(data);
      }
    } catch (err) {
      const endTime = Date.now();
      setResponseTime(endTime - startTime);
      setError(
        err instanceof Error
          ? err.message
          : "Network error. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-emerald-400 bg-emerald-500/10";
    if (status >= 300 && status < 400) return "text-blue-400 bg-blue-500/10";
    if (status >= 400 && status < 500) return "text-amber-400 bg-amber-500/10";
    if (status >= 500) return "text-red-400 bg-red-500/10";
    return "text-[#D8CFBC] bg-white/5";
  };

  const renderResponseContent = () => {
    if (!response) return null;

    if (response.success && response.data) {
      switch (activeView) {
        case "json":
          return (
            <pre className="max-h-[500px] overflow-x-auto overflow-y-auto rounded-xl border border-white/10 bg-[#07070B] p-4">
              <code className="whitespace-pre font-mono text-sm text-[#D8CFBC]">
                {JSON.stringify(response, null, 2)}
              </code>
            </pre>
          );
        case "table":
          return (
            <div className="max-h-[500px] overflow-x-auto overflow-y-auto rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10 border-b border-white/10 bg-[#0C0C12]">
                  <tr>
                    <th className="p-3 text-left font-medium text-[#D8CFBC]">Title</th>
                    <th className="p-3 text-left font-medium text-[#D8CFBC]">Category</th>
                    <th className="p-3 text-left font-medium text-[#D8CFBC]">Tech Stack</th>
                    <th className="p-3 text-left font-medium text-[#D8CFBC]">Created</th>
                    <th className="p-3 text-left font-medium text-[#D8CFBC]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {response.data.map((project) => (
                    <tr
                      key={project.id}
                      className="border-b border-white/5 transition-colors hover:bg-white/[0.04]"
                    >
                      <td className="p-3 text-[#FAFAFA]">{project.title}</td>
                      <td className="p-3 text-[#D8CFBC]">{project.category}</td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {project.tech.slice(0, 3).map((t) => (
                            <Badge
                              key={t}
                              className="border border-[#C084FC]/20 bg-[#C084FC]/10 text-[9px] text-[#C084FC]"
                            >
                              {t}
                            </Badge>
                          ))}
                          {project.tech.length > 3 && (
                            <Badge className="border border-white/10 bg-white/5 text-[9px] text-[#D8CFBC]">
                              +{project.tech.length - 3}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-xs text-[#D8CFBC]">
                        {formatDate(project.createdAt)}
                      </td>
                      <td className="p-3">
                        {project.featured ? (
                          <Badge className="border border-[#FACC15]/20 bg-[#FACC15]/10 text-[#FACC15]">
                            <Star className="mr-1 size-3" />
                            Featured
                          </Badge>
                        ) : (
                          <Badge className="border border-[#4ADE80]/20 bg-[#4ADE80]/10 text-[#4ADE80]">
                            Active
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        case "grid":
          return (
            <div className="grid max-h-[500px] grid-cols-1 gap-4 overflow-y-auto p-1 sm:grid-cols-2">
              {response.data.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-all hover:border-white/25 hover:bg-white/[0.06]"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <h4 className="text-sm font-medium text-[#FAFAFA]">{project.title}</h4>
                    {project.featured && <Star className="size-4 text-[#FACC15]" />}
                  </div>
                  <p className="mb-2 line-clamp-2 text-xs text-[#D8CFBC]">
                    {project.description}
                  </p>
                  <div className="mb-2 flex flex-wrap gap-1">
                    {project.tech.slice(0, 3).map((t) => (
                      <Badge
                        key={t}
                        className="border border-[#C084FC]/20 bg-[#C084FC]/10 text-[9px] text-[#C084FC]"
                      >
                        {t}
                      </Badge>
                    ))}
                    {project.tech.length > 3 && (
                      <Badge className="border border-white/10 bg-white/5 text-[9px] text-[#D8CFBC]">
                        +{project.tech.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className="border border-[#4ADE80]/20 bg-[#4ADE80]/10 text-[9px] text-[#4ADE80]">
                      {project.category}
                    </Badge>
                    <span className="text-[10px] text-[#6B6B6B]">
                      {formatDate(project.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          );
        default:
          return null;
      }
    }

    if (response.message) {
      return (
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center gap-3">
            {response.success ? (
              <CheckCircle2 className="size-5 text-emerald-400" />
            ) : (
              <AlertCircle className="size-5 text-amber-400" />
            )}
            <p className="text-sm text-[#D8CFBC]">{response.message}</p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6">
      <Reveal>
        <DashHeader
          title="API Public Access"
          subtitle="Use your API key to fetch public project data"
          icon={Key}
          accent="#4ADE80"
          right={
            <Badge className="gap-1.5 border border-[#4ADE80]/25 bg-[#4ADE80]/10 text-[#4ADE80]">
              <Activity className="size-3" />
              Live Endpoint
            </Badge>
          }
        />
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
        <div className="space-y-6 lg:col-span-2">
          <Reveal delay={0.08}>
            <GlowCard glow="74, 222, 128">
              <div className="p-6">
                <div className="mb-5 flex items-center gap-3 border-b border-white/10 pb-5">
                  <div className="flex size-9 items-center justify-center rounded-xl border border-[#4ADE80]/25 bg-[#4ADE80]/10">
                    <Lock className="size-4 text-[#4ADE80]" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-space-grotesk text-base font-bold text-[#FAFAFA]">
                      Authentication
                    </h3>
                    <p className="text-xs text-[#A3A3A3]">
                      Enter your OneTimeID access key to fetch your projects
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                      <Input
                        type={showKey ? "text" : "password"}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your access key..."
                        className="rounded-xl border border-white/10 bg-white/[0.04] py-2 pr-20 pl-3 text-[#FAFAFA] placeholder:text-[#6B6B6B] focus-visible:border-[#4ADE80]/50 focus-visible:ring-[#4ADE80]/20"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleFetchProjects();
                          }
                        }}
                      />
                      <div className="absolute top-1/2 right-1 flex -translate-y-1/2 items-center gap-1">
                        <motion.button
                          whileHover={{ y: -2, scale: 1.03 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => setShowKey(!showKey)}
                          className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[#A3A3A3] transition-colors hover:text-[#FAFAFA]"
                          aria-label={showKey ? "Hide access key" : "Show access key"}
                        >
                          {showKey ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </motion.button>
                        {apiKey && (
                          <motion.button
                            whileHover={{ y: -2, scale: 1.03 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => handleCopy(apiKey)}
                            className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[#A3A3A3] transition-colors hover:text-[#FAFAFA]"
                            aria-label="Copy access key"
                          >
                            {copied ? (
                              <Check className="size-4 text-emerald-400" />
                            ) : (
                              <Copy className="size-4" />
                            )}
                          </motion.button>
                        )}
                      </div>
                    </div>
                    <motion.button
                      onClick={handleFetchProjects}
                      disabled={isLoading || !apiKey.trim()}
                      whileHover={
                        !isLoading && apiKey.trim() ? { y: -2, scale: 1.02 } : undefined
                      }
                      whileTap={!isLoading && apiKey.trim() ? { scale: 0.98 } : undefined}
                      className="flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-[#4ADE80] to-[#22D3EE] px-5 py-2.5 text-sm font-semibold text-[#07110A] shadow-[0_8px_24px_-8px_rgba(74,222,128,0.7)] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                    >
                      {isLoading ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Send className="size-4" />
                      )}
                      {isLoading ? "Fetching..." : "Send Request"}
                    </motion.button>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#6B6B6B]">
                    <Info className="size-3.5 text-[#60A5FA]" />
                    <span>Example: pk_live_abc123def456ghi789jkl</span>
                  </div>
                </div>
              </div>
            </GlowCard>
          </Reveal>

          {(response || error || isLoading) && (
            <Reveal delay={0.14}>
              <GlowCard glow="96, 165, 250">
                <div className="p-6">
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-xl border border-[#60A5FA]/25 bg-[#60A5FA]/10">
                        <Terminal className="size-4 text-[#60A5FA]" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-space-grotesk text-base font-bold text-[#FAFAFA]">
                          Response
                        </h3>
                        <div className="flex flex-wrap items-center gap-2">
                          {statusCode && (
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs ${getStatusColor(statusCode)}`}
                            >
                              Status: {statusCode}
                            </span>
                          )}
                          {responseTime && (
                            <span className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3]">
                              <Clock className="size-3" />
                              {responseTime}ms
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {response && response.data && (
                      <div className="flex items-center gap-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger
                              render={
                                <motion.button
                                  whileHover={{ y: -2, scale: 1.03 }}
                                  whileTap={{ scale: 0.96 }}
                                  onClick={() => setActiveView("json")}
                                  className={`flex size-8 items-center justify-center rounded-lg border transition-colors cursor-pointer ${
                                    activeView === "json"
                                      ? "border-[#4ADE80]/30 bg-[#4ADE80]/10 text-[#4ADE80]"
                                      : "border-white/10 bg-white/[0.04] text-[#A3A3A3] hover:text-[#FAFAFA]"
                                  }`}
                                />
                              }
                            >
                              <FileJson className="size-4" />
                            </TooltipTrigger>
                            <TooltipContent>JSON View</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger
                              render={
                                <motion.button
                                  whileHover={{ y: -2, scale: 1.03 }}
                                  whileTap={{ scale: 0.96 }}
                                  onClick={() => setActiveView("table")}
                                  className={`flex size-8 items-center justify-center rounded-lg border transition-colors cursor-pointer ${
                                    activeView === "table"
                                      ? "border-[#4ADE80]/30 bg-[#4ADE80]/10 text-[#4ADE80]"
                                      : "border-white/10 bg-white/[0.04] text-[#A3A3A3] hover:text-[#FAFAFA]"
                                  }`}
                                />
                              }
                            >
                              <Table className="size-4" />
                            </TooltipTrigger>
                            <TooltipContent>Table View</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger
                              render={
                                <motion.button
                                  whileHover={{ y: -2, scale: 1.03 }}
                                  whileTap={{ scale: 0.96 }}
                                  onClick={() => setActiveView("grid")}
                                  className={`flex size-8 items-center justify-center rounded-lg border transition-colors cursor-pointer ${
                                    activeView === "grid"
                                      ? "border-[#4ADE80]/30 bg-[#4ADE80]/10 text-[#4ADE80]"
                                      : "border-white/10 bg-white/[0.04] text-[#A3A3A3] hover:text-[#FAFAFA]"
                                  }`}
                                />
                              }
                            >
                              <Grid className="size-4" />
                            </TooltipTrigger>
                            <TooltipContent>Grid View</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        {response.data && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger
                                render={
                                  <motion.button
                                    whileHover={{ y: -2, scale: 1.03 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={() => handleCopy(JSON.stringify(response, null, 2))}
                                    className="flex size-8 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#A3A3A3] transition-colors hover:text-[#FAFAFA]"
                                  />
                                }
                              >
                                {copied ? (
                                  <Check className="size-4 text-emerald-400" />
                                ) : (
                                  <Copy className="size-4" />
                                )}
                              </TooltipTrigger>
                              <TooltipContent>Copy Response</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    )}
                  </div>

                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="mb-4 flex size-10 items-center justify-center"
                      >
                        <Loader2 className="size-6 text-[#4ADE80]" />
                      </motion.div>
                      <p className="text-sm text-[#D8CFBC]">Fetching your projects...</p>
                    </div>
                  ) : error ? (
                    <div className="rounded-xl border border-[#F87171]/30 bg-[#F87171]/[0.06] p-4">
                      <div className="flex items-start gap-3">
                        <XCircle className="mt-0.5 size-5 text-red-400" />
                        <div>
                          <p className="text-sm font-medium text-red-400">Error</p>
                          <p className="mt-1 text-sm text-[#D8CFBC]">{error}</p>
                        </div>
                      </div>
                    </div>
                  ) : response ? (
                    <div className="space-y-4">
                      {response.success && response.data && (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-center">
                            <p className="font-space-grotesk text-2xl font-bold text-[#4ADE80]">
                              <Counter to={response.data.length} />
                            </p>
                            <p className="mt-1 text-xs text-[#A3A3A3]">Projects</p>
                          </div>
                          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-center">
                            <p className="font-space-grotesk text-2xl font-bold text-emerald-400">
                              {response.success ? "✓" : "✗"}
                            </p>
                            <p className="mt-1 text-xs text-[#A3A3A3]">Success</p>
                          </div>
                          {response.source && (
                            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-center">
                              <p className="font-space-grotesk text-sm font-bold text-[#60A5FA] uppercase">
                                {response.source}
                              </p>
                              <p className="mt-1 text-xs text-[#A3A3A3]">Source</p>
                            </div>
                          )}
                          {response.total && (
                            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-center">
                              <p className="font-space-grotesk text-2xl font-bold text-[#C084FC]">
                                <Counter to={response.total} />
                              </p>
                              <p className="mt-1 text-xs text-[#A3A3A3]">Total</p>
                            </div>
                          )}
                        </div>
                      )}

                      {renderResponseContent()}
                    </div>
                  ) : null}
                </div>
              </GlowCard>
            </Reveal>
          )}
        </div>

        <div className="space-y-6">
          <Reveal delay={0.18}>
            <GlowCard glow="74, 222, 128">
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-[#4ADE80]/25 bg-[#4ADE80]/10">
                    <Zap className="size-4 text-[#4ADE80]" />
                  </div>
                  <div>
                    <h4 className="font-space-grotesk text-sm font-semibold text-[#FAFAFA]">
                      Quick Tips
                    </h4>
                    <ul className="mt-3 space-y-2.5 text-xs text-[#D8CFBC]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-3 text-emerald-400" />
                        Keep your API key secure
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-3 text-emerald-400" />
                        Use environment variables
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-3 text-emerald-400" />
                        Regenerate if compromised
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </GlowCard>
          </Reveal>
        </div>
      </div>
    </div>
  );
}