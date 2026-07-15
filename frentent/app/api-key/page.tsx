"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Key,
  Copy,
  Check,
  Eye,
  EyeOff,
  RefreshCw,
  Shield,
  Clock,
  Server,
  Database,
  Globe,
  Lock,
  Unlock,
  Info,
  ChevronDown,
  Code2,
  Terminal,
  ArrowRight,
  ExternalLink,
  Download,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Loader2,
  Menu,
  X,
  LogIn,
  User,
  Settings,
  HelpCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Zap,
  Sparkles,
  BookOpen,
  LayoutGrid,
  Folder,
  BarChart2,
  Image,
  LayoutTemplate,
  LifeBuoy,
  Search,
  Bell,
  Plus,
  MoreHorizontal,
  Filter,
  ArrowUpDown,
  Star,
  Upload,
  List,
  Globe as GlobeIcon,
  Link,
  RefreshCw as RefreshIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollReveal, ParallaxSection, StaggerGrid, StaggerItem } from "@/src/lib/animations";
import { useAppSelector, useAppDispatch } from "@/src/lib/hooks";

// Types
interface User {
  id: string;
  email: string;
  name: string;
  OneTimeID: string;
  createdAt: string;
}

// Mock user data (replace with actual Redux state)
const mockUser: User = {
  id: "usr_12345",
  email: "developer@projectapi.dev",
  name: "John Developer",
  OneTimeID: "pk_live_abc123def456ghi789jkl",
  createdAt: "2024-01-15T10:30:00Z",
};

// Stats data
const stats = [
  { label: "Total Projects", value: "24", icon: Folder, color: "text-emerald-400" },
  { label: "API Calls Today", value: "1,247", icon: Server, color: "text-blue-400" },
  { label: "Active Portfolios", value: "8", icon: Globe, color: "text-purple-400" },
  { label: "Uptime", value: "99.9%", icon: Shield, color: "text-emerald-400" },
];

// Code snippet for API usage
const apiCodeSnippets = {
  fetch: `fetch('https://api.projectapi.dev/v1/projects', {
  headers: {
    'accesskey': 'YOUR_API_KEY_HERE'
  }
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));`,

  axios: `import axios from 'axios';

const response = await axios.get(
  'https://api.projectapi.dev/v1/projects',
  {
    headers: {
      'accesskey': 'YOUR_API_KEY_HERE'
    }
  }
);

console.log(response.data);`,

  curl: `curl -X GET 'https://api.projectapi.dev/v1/projects' \\
  -H 'accesskey: YOUR_API_KEY_HERE'`,

  react: `import { useEffect, useState } from 'react';

function Projects() {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    fetch('https://api.projectapi.dev/v1/projects', {
      headers: {
        'accesskey': 'YOUR_API_KEY_HERE'
      }
    })
    .then(res => res.json())
    .then(setProjects);
  }, []);
  
  return (
    <div>
      {projects.map(p => (
        <div key={p.id}>{p.title}</div>
      ))}
    </div>
  );
}`,
};

const navLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { name: "Projects", href: "/projects", icon: Folder },
  { name: "Analytics", href: "/analytics", icon: BarChart2 },
  { name: "API", href: "/api", icon: Terminal },
  { name: "Media", href: "/media", icon: Image },
  { name: "Templates", href: "/templates", icon: LayoutTemplate },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function ApiKeyPage() {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [showRegenerateDialog, setShowRegenerateDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<"fetch" | "axios" | "curl" | "react">("fetch");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  // In a real app, you'd get this from Redux
  // const { user } = useAppSelector((s) => s.auth);
  const user = mockUser;

  const copyRef = useRef<HTMLDivElement>(null);
  const keyRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(user.OneTimeID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsRegenerating(false);
      setShowRegenerateDialog(false);
      // In real app, you'd update the key in Redux
    }, 1500);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    // You could add a toast notification here
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

  return (
    <div className="min-h-screen bg-[#11120D] text-[#FFFBF4] font-sans antialiased">
     

      {/* Main Content */}
      <main className="pt-[72px] min-h-screen">
        <div className="max-w-[1200px] mx-auto px-6 py-8 lg:py-12">
          {/* Page Header */}
          <ScrollReveal direction="up" delay={0}>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <Key className="size-8 text-[#4ADE80]" />
                <h1 className="text-3xl lg:text-4xl font-bold text-[#FFFBF4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  API Key Management
                </h1>
              </div>
              <p className="text-[#D8CFBC] max-w-2xl">
                Your API key is used to authenticate requests to the ProjectAPI. Keep it secure and never share it publicly.
              </p>
            </div>
          </ScrollReveal>

          

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - API Key Display */}
            <div className="lg:col-span-2">
              <ScrollReveal direction="up" delay={0.1}>
                <Card className="border-white/5 bg-[#141414] overflow-hidden">
                  <CardHeader className="border-b border-white/5 pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-[#FFFBF4] text-xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          Your API Key
                        </CardTitle>
                        <CardDescription className="text-[#D8CFBC]">
                          Use this key to authenticate your API requests
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                        <CheckCircle2 className="size-3 mr-1.5" />
                        Active
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    {/* Key Display */}
                    <div className="relative">
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0A0A0A] border border-white/5">
                        <div className="p-2 rounded-lg bg-[#4ADE80]/10">
                          <Key className="size-5 text-[#4ADE80]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <code className="text-sm font-mono text-[#FFFBF4] break-all">
                            {getMaskedKey(user.OneTimeID)}
                          </code>
                        </div>
                        <div className="flex items-center gap-1">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setShowKey(!showKey)}
                                  className="text-[#D8CFBC] hover:text-[#FFFBF4]"
                                >
                                  {showKey ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{showKey ? "Hide API Key" : "Show API Key"}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={handleCopy}
                                  className="text-[#D8CFBC] hover:text-[#FFFBF4]"
                                >
                                  {copied ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{copied ? "Copied!" : "Copy API Key"}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          
                        </div>
                      </div>
                    </div>

                    {/* API Key Info */}
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-[#0A0A0A] border border-white/5">
                        <div className="flex items-center gap-2 text-sm text-[#D8CFBC]">
                          <Clock className="size-4" />
                          <span>Created</span>
                        </div>
                        <p className="text-sm font-medium text-[#FFFBF4] mt-1">
                          {new Date(user.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#0A0A0A] border border-white/5">
                        <div className="flex items-center gap-2 text-sm text-[#D8CFBC]">
                          <Shield className="size-4" />
                          <span>Security Level</span>
                        </div>
                        <p className="text-sm font-medium text-emerald-400 mt-1">High</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Usage Instructions */}
              <ScrollReveal direction="up" delay={0.2}>
                <Card className="border-white/5 bg-[#141414] mt-6">
                  <CardHeader>
                    <CardTitle className="text-[#FFFBF4] text-xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      How to Use Your API Key
                    </CardTitle>
                    <CardDescription className="text-[#D8CFBC]">
                      Include your API key in the request headers to authenticate
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Code Tabs */}
                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                      {Object.keys(apiCodeSnippets).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab as any)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                            activeTab === tab
                              ? "bg-[#FBF7F4] text-[#0A0A0A]"
                              : "bg-[#0A0A0A] text-[#D8CFBC] hover:bg-[#1A1A1A]"
                          }`}
                        >
                          {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                      ))}
                    </div>

                    <div className="relative">
                      <pre className="p-4 rounded-xl bg-[#0A0A0A] border border-white/5 overflow-x-auto">
                        <code className="text-sm font-mono text-[#D8CFBC] whitespace-pre">
                          {apiCodeSnippets[activeTab]}
                        </code>
                      </pre>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyCode(apiCodeSnippets[activeTab])}
                        className="absolute top-2 right-2 text-[#D8CFBC] hover:text-[#FFFBF4]"
                      >
                        <Copy className="size-4" />
                      </Button>
                    </div>

                    <div className="mt-4 p-4 rounded-xl bg-[#4ADE80]/5 border border-emerald-500/10">
                      <div className="flex items-start gap-3">
                        <Info className="size-5 text-emerald-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-[#FFFBF4]">Important</p>
                          <p className="text-sm text-[#D8CFBC] mt-1">
                            Never expose your API key in client-side code. Always use environment variables 
                            or server-side authentication.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>

            {/* Right Column - Sidebar Info */}
            <div className="space-y-6">
              <ScrollReveal direction="up" delay={0.15}>
                <Card className="border-white/5 bg-[#141414]">
                  <CardHeader>
                    <CardTitle className="text-[#FFFBF4] text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      <div className="flex items-center gap-2">
                        <User className="size-4" />
                        Account Info
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-xs text-[#D8CFBC]">Name</Label>
                      <p className="text-sm font-medium text-[#FFFBF4] mt-1">{user.name}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-[#D8CFBC]">Email</Label>
                      <p className="text-sm font-medium text-[#FFFBF4] mt-1">{user.email}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-[#D8CFBC]">User ID</Label>
                      <p className="text-xs font-mono text-[#D8CFBC] mt-1">{user.id}</p>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.2}>
                <Card className="border-white/5 bg-[#141414]">
                  <CardHeader>
                    <CardTitle className="text-[#FFFBF4] text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      <div className="flex items-center gap-2">
                        <Shield className="size-4" />
                        Security Tips
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-[#0A0A0A] border border-white/5">
                      <div className="p-1.5 rounded-lg bg-emerald-500/10">
                        <CheckCircle2 className="size-4 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-[#FFFBF4]">Keep it Secret</p>
                        <p className="text-xs text-[#D8CFBC]">Never share your API key publicly</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-[#0A0A0A] border border-white/5">
                      <div className="p-1.5 rounded-lg bg-emerald-500/10">
                        <RefreshCw className="size-4 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-[#FFFBF4]">Rotate Regularly</p>
                        <p className="text-xs text-[#D8CFBC]">Regenerate your key periodically</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-[#0A0A0A] border border-white/5">
                      <div className="p-1.5 rounded-lg bg-emerald-500/10">
                        <Server className="size-4 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-[#FFFBF4]">Use Environment Variables</p>
                        <p className="text-xs text-[#D8CFBC]">Store keys in .env files</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
              

              <ScrollReveal direction="up" delay={0.25}>
                <Card className="border-white/5 bg-gradient-to-r from-[#141414] to-[#1A1A1A]">
                  <CardContent className="p-6 text-center">
                    <div className="p-3 rounded-full bg-[#4ADE80]/10 inline-flex mb-4">
                      <Zap className="size-6 text-[#4ADE80]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#FFFBF4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Need Help?
                    </h3>
                    <p className="text-sm text-[#D8CFBC] mt-2">
                      Check our documentation for more examples and best practices.
                    </p>
                    <Button className="mt-4 bg-[#FBF7F4] text-[#0A0A0A] hover:bg-[#FBF7F4]/90 w-full">
                      <BookOpen className="size-4 mr-2" />
                      View Documentation
                    </Button>
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