"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  BookOpen,
  Star,
  
  RefreshCw as RefreshIcon,
  Send,
  FileJson,
  Table,
  Grid,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollReveal, ParallaxSection, StaggerGrid, StaggerItem } from "@/src/lib/animations";

// Types
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

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
};

const floatAnimation = {
  y: [0, -6, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const pulseAnimation = {
  scale: [1, 1.03, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

// API Endpoint
const API_URL = "http://localhost:5000/api/project/public";

export default function ApiKeyPage() {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeView, setActiveView] = useState<"json" | "table" | "grid">("json");
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  // Mock user data for display
  const user = {
    id: "usr_12345",
    email: "developer@projectapi.dev",
    name: "John Developer",
    OneTimeID: "pk_live_abc123def456ghi789jkl",
    createdAt: "2024-01-15T10:30:00Z",
  };

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
    } catch (err: any) {
      const endTime = Date.now();
      setResponseTime(endTime - startTime);
      setError(err.message || "Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getMaskedKey = (key: string) => {
    if (!showKey) {
      const parts = key.split('_');
      if (parts.length > 1) {
        return `${parts[0]}_${'•'.repeat(12)}${parts[1].slice(-4)}`;
      }
      return `${key.slice(0, 8)}${'•'.repeat(8)}${key.slice(-4)}`;
    }
    return key;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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
            <pre className="p-4 rounded-xl bg-[#0A0A0A] border border-white/5 overflow-x-auto max-h-[500px] overflow-y-auto">
              <code className="text-sm font-mono text-[#D8CFBC] whitespace-pre">
                {JSON.stringify(response, null, 2)}
              </code>
            </pre>
          );
        case "table":
          return (
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-[#141414] border-b border-white/5">
                  <tr>
                    <th className="text-left p-3 text-[#D8CFBC] font-medium">Title</th>
                    <th className="text-left p-3 text-[#D8CFBC] font-medium">Category</th>
                    <th className="text-left p-3 text-[#D8CFBC] font-medium">Tech Stack</th>
                    <th className="text-left p-3 text-[#D8CFBC] font-medium">Created</th>
                    <th className="text-left p-3 text-[#D8CFBC] font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {response.data.map((project) => (
                    <tr key={project.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-3 text-[#FFFBF4]">{project.title}</td>
                      <td className="p-3 text-[#D8CFBC]">{project.category}</td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {project.tech.slice(0, 3).map((t) => (
                            <Badge key={t} className="bg-[#C084FC]/10 text-[#C084FC] border border-[#C084FC]/20 text-[9px]">
                              {t}
                            </Badge>
                          ))}
                          {project.tech.length > 3 && (
                            <Badge className="bg-white/5 text-[#D8CFBC] border border-white/10 text-[9px]">
                              +{project.tech.length - 3}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-[#D8CFBC] text-xs">{formatDate(project.createdAt)}</td>
                      <td className="p-3">
                        {project.featured ? (
                          <Badge className="bg-[#FACC15]/10 text-[#FACC15] border border-[#FACC15]/20">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        ) : (
                          <Badge className="bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/20">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto p-1">
              {response.data.map((project) => (
                <div
                  key={project.id}
                  className="p-4 rounded-xl bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-medium text-[#FFFBF4]">{project.title}</h4>
                    {project.featured && (
                      <Star className="w-4 h-4 text-[#FACC15]" />
                    )}
                  </div>
                  <p className="text-xs text-[#D8CFBC] line-clamp-2 mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.tech.slice(0, 3).map((t) => (
                      <Badge key={t} className="bg-[#C084FC]/10 text-[#C084FC] border border-[#C084FC]/20 text-[9px]">
                        {t}
                      </Badge>
                    ))}
                    {project.tech.length > 3 && (
                      <Badge className="bg-white/5 text-[#D8CFBC] border border-white/10 text-[9px]">
                        +{project.tech.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/20 text-[9px]">
                      {project.category}
                    </Badge>
                    <span className="text-[10px] text-[#8A8578]">{formatDate(project.createdAt)}</span>
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
        <div className="p-4 rounded-xl bg-[#0A0A0A] border border-white/5">
          <div className="flex items-center gap-3">
            {response.success ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-400" />
            )}
            <p className="text-[#D8CFBC]">{response.message}</p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-[#11120D] text-[#FFFBF4] font-sans antialiased">
      {/* Main Content */}
      <main className="min-h-screen">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 lg:py-12">
          {/* Page Header */}
          <ScrollReveal direction="up" delay={0}>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-xl bg-[#4ADE80]/10 border border-[#4ADE80]/20">
                  <Key className="size-6 text-[#4ADE80]" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-[#FFFBF4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    API Public Access
                  </h1>
                  <p className="text-[#D8CFBC]">
                    Use your API key to fetch public project data
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column - API Key Input & Response */}
            <div className="lg:col-span-2 space-y-6">
              {/* API Key Input */}
              <ScrollReveal direction="up" delay={0.1}>
                <Card className="border-white/5 bg-[#141414] overflow-hidden">
                  <CardHeader className="border-b border-white/5 pb-4">
                    <CardTitle className="text-[#FFFBF4] text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      <div className="flex items-center gap-2">
                        <Lock className="size-5 text-[#4ADE80]" />
                        Authentication
                      </div>
                    </CardTitle>
                    <CardDescription className="text-[#D8CFBC]">
                      Enter your OneTimeID access key to fetch your projects
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 relative">
                          <Input
                            type={showKey ? "text" : "password"}
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="Enter your access key..."
                            className="bg-[#0A0A0A] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:border-[#4ADE80] focus-visible:ring-[#4ADE80]/20 pr-20"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleFetchProjects();
                              }
                            }}
                          />
                          <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowKey(!showKey)}
                              className="h-8 px-2 text-[#D8CFBC] hover:text-[#FFFBF4]"
                            >
                              {showKey ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </Button>
                            {apiKey && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCopy(apiKey)}
                                className="h-8 px-2 text-[#D8CFBC] hover:text-[#FFFBF4]"
                              >
                                {copied ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
                              </Button>
                            )}
                          </div>
                        </div>
                        <Button
                          onClick={handleFetchProjects}
                          disabled={isLoading || !apiKey.trim()}
                          className="bg-[#4ADE80] hover:bg-[#4ADE80]/90 text-[#0A0A0A] font-semibold gap-2 whitespace-nowrap"
                        >
                          {isLoading ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <Send className="size-4" />
                          )}
                          {isLoading ? "Fetching..." : "Send Request"}
                        </Button>
                      </div>

                      {/* Example Key Hint */}
                      <div className="flex items-center gap-2 text-xs text-[#8A8578]">
                        <Info className="size-3.5" />
                        <span>Example: pk_live_abc123def456ghi789jkl</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Response Section */}
              {(response || error || isLoading) && (
                <ScrollReveal direction="up" delay={0.2}>
                  <Card className="border-white/5 bg-[#141414] overflow-hidden">
                    <CardHeader className="border-b border-white/5 pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-[#FFFBF4] text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            <div className="flex items-center gap-2">
                              <Terminal className="size-5 text-[#60A5FA]" />
                              Response
                            </div>
                          </CardTitle>
                          <CardDescription className="text-[#D8CFBC]">
                            {statusCode && (
                              <span className={`inline-flex items-center gap-2 px-2 py-0.5 rounded ${getStatusColor(statusCode)}`}>
                                Status: {statusCode}
                              </span>
                            )}
                            {responseTime && (
                              <span className="inline-flex items-center gap-2 ml-2 text-[#8A8578]">
                                <Clock className="size-3" />
                                {responseTime}ms
                              </span>
                            )}
                          </CardDescription>
                        </div>
                        {response && response.data && (
                          <div className="flex items-center gap-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setActiveView("json")}
                                    className={`h-8 w-8 p-0 ${activeView === "json" ? "bg-white/10 text-[#FFFBF4]" : "text-[#8A8578]"}`}
                                  >
                                    <FileJson className="size-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>JSON View</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setActiveView("table")}
                                    className={`h-8 w-8 p-0 ${activeView === "table" ? "bg-white/10 text-[#FFFBF4]" : "text-[#8A8578]"}`}
                                  >
                                    <Table className="size-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Table View</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setActiveView("grid")}
                                    className={`h-8 w-8 p-0 ${activeView === "grid" ? "bg-white/10 text-[#FFFBF4]" : "text-[#8A8578]"}`}
                                  >
                                    <Grid className="size-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Grid View</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            {response.data && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleCopy(JSON.stringify(response, null, 2))}
                                      className="h-8 w-8 p-0 text-[#8A8578] hover:text-[#FFFBF4]"
                                    >
                                      <Copy className="size-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Copy Response</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                          <Loader2 className="size-8 animate-spin text-[#4ADE80] mb-4" />
                          <p className="text-[#D8CFBC]">Fetching your projects...</p>
                        </div>
                      ) : error ? (
                        <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                          <div className="flex items-start gap-3">
                            <XCircle className="size-5 text-red-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-red-400">Error</p>
                              <p className="text-sm text-[#D8CFBC] mt-1">{error}</p>
                            </div>
                          </div>
                        </div>
                      ) : response ? (
                        <div className="space-y-4">
                          {/* Response Stats */}
                          {response.success && response.data && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              <div className="p-3 rounded-lg bg-[#0A0A0A] border border-white/5 text-center">
                                <p className="text-2xl font-bold text-[#FFFBF4]">{response.data.length}</p>
                                <p className="text-xs text-[#8A8578]">Projects</p>
                              </div>
                              <div className="p-3 rounded-lg bg-[#0A0A0A] border border-white/5 text-center">
                                <p className="text-2xl font-bold text-emerald-400">{response.success ? "✓" : "✗"}</p>
                                <p className="text-xs text-[#8A8578]">Success</p>
                              </div>
                              {response.source && (
                                <div className="p-3 rounded-lg bg-[#0A0A0A] border border-white/5 text-center">
                                  <p className="text-sm font-bold text-[#60A5FA] uppercase">{response.source}</p>
                                  <p className="text-xs text-[#8A8578]">Source</p>
                                </div>
                              )}
                              {response.total && (
                                <div className="p-3 rounded-lg bg-[#0A0A0A] border border-white/5 text-center">
                                  <p className="text-2xl font-bold text-[#C084FC]">{response.total}</p>
                                  <p className="text-xs text-[#8A8578]">Total</p>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Response Content */}
                          {renderResponseContent()}
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                </ScrollReveal>
              )}
            </div>

            {/* Right Column - API Info & Documentation */}
            <div className="space-y-6">
             

            

              {/* Quick Tips */}
              <ScrollReveal direction="up" delay={0.25}>
                <Card className="border-white/5 bg-gradient-to-r from-[#141414] to-[#1A1A1A]">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-[#4ADE80]/10">
                        <Zap className="size-5 text-[#4ADE80]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#FFFBF4]">Quick Tips</h4>
                        <ul className="mt-2 space-y-1.5 text-xs text-[#D8CFBC]">
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
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}