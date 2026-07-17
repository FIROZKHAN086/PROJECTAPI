"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FolderOpen,
  Star,
  LayoutGrid,
  Layers,
  PlusCircle,
  AlertTriangle,
  TrendingUp,
  Clock,
  GitBranch,
  Users,
  Zap,
  Shield,
  Database,
  Cloud,
  Code,
  Sparkles,
  ArrowUpRight,
  BarChart3,
  Activity,
  Globe,
  Server,
  Cpu,
  Rocket,
  Target,
  Award,
} from "lucide-react";
import { useProjects } from "@/src/hooks/useProjects";



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
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
      mass: 0.8,
    },
  },
};

const floatAnimation = {
  y: [0, -8, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut" as const  ,
  },
};

// Typewriter Text Component
const TypewriterText: React.FC<{ text: string; delay?: number; className?: string }> = ({
  text,
  delay = 0,
  className = "",
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsComplete(true);
      }
    }, 30);

    return () => clearTimeout(timer);
  }, [currentIndex, text]);

  useEffect(() => {
    setDisplayText("");
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  return (
    <span className={`relative ${className}`}>
      {displayText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-[2px] h-5 bg-[#4ADE80] ml-0.5"
        />
      )}
    </span>
  );
};

// Glow Card with original theme
const GlowCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl ${className}`}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute inset-0 bg-[#141414] border border-white/10 rounded-xl" />
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(74,222,128,0.05) 0%, transparent 50%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

// Stat Card with original theme
const StatCard: React.FC<{
  stat: any;
  index: number;
  isLoading: boolean;
}> = ({ stat, index, isLoading }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      custom={index}
      className="relative"
    >
      <GlowCard className="h-full">
        <CardContent className="p-5 space-y-3">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="w-10 h-10 rounded-lg bg-white/5" />
              <Skeleton className="w-16 h-8 bg-white/5" />
              <Skeleton className="w-24 h-4 bg-white/5" />
            </div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start justify-between"
              >
                <div className="relative">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}10` }}
                  >
                    <motion.div
                      animate={floatAnimation}
                      className="relative z-10"
                    >
                      <Icon className="w-5 h-5" style={{ color: stat.color }} />
                    </motion.div>
                  </div>
                  <motion.div
                    className="absolute -inset-1 rounded-lg"
                    style={{ backgroundColor: `${stat.color}10` }}
                    animate={pulseAnimation}
                  />
                </div>
                {stat.trend !== undefined && (
                  <Badge
                    variant="secondary"
                    className={`text-[10px] ${
                      stat.trend > 0 ? "bg-[#4ADE80]/10 text-[#4ADE80]" : "bg-[#F87171]/10 text-[#F87171]"
                    } border border-white/10`}
                  >
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.trend > 0 ? "+" : ""}{stat.trend}%
                  </Badge>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                className="space-y-1"
              >
                <p className="text-2xl font-bold text-[#FFFBF4] tracking-tight">
                  {stat.value}
                </p>
                <p className="text-sm text-[#8A8578]">{stat.label}</p>
              </motion.div>

              <motion.div
                className="h-0.5 w-full rounded-full bg-white/5 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: stat.color }}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : { width: 0 }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                />
              </motion.div>
            </>
          )}
        </CardContent>
      </GlowCard>
    </motion.div>
  );
};

// Activity Item
const ActivityItem: React.FC<{ project: any; index: number }> = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.03)" }}
      className="group"
    >
      <div className="flex items-center gap-3 py-2.5 px-2 rounded-lg transition-colors">
        <motion.div
          className="relative flex-shrink-0"
          whileHover={{ scale: 1.1, rotate: 90 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-8 h-8 rounded-md bg-[#4ADE80]/10 flex items-center justify-center">
            {project.featured ? (
              <Star className="w-4 h-4 text-[#FACC15]" />
            ) : (
              <PlusCircle className="w-4 h-4 text-[#4ADE80]" />
            )}
          </div>
          <motion.div
            className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#4ADE80] border-2 border-[#141414]"
            animate={pulseAnimation}
          />
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm text-[#D8CFBC] truncate">
              {project.title}
            </p>
            {project.featured && (
              <Badge className="bg-[#FACC15]/10 text-[#FACC15] border border-[#FACC15]/20 text-[9px]">
                <Star className="w-2.5 h-2.5 mr-1" />
                Featured
              </Badge>
            )}
            {project.status === "active" && (
              <Badge className="bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/20 text-[9px]">
                <Activity className="w-2.5 h-2.5 mr-1" />
                Active
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-3 mt-0.5">
            <span className="text-[11px] text-[#8A8578] flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {timeAgo(project.createdAt)}
            </span>
            {project.category && (
              <span className="text-[11px] text-[#8A8578] flex items-center gap-1">
                <FolderOpen className="w-3 h-3" />
                {project.category}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {project.tech && project.tech.length > 0 && (
            <div className="flex -space-x-1">
              {project.tech.slice(0, 3).map((tech: string, i: number) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full bg-[#1A1A1A] border border-white/10 flex items-center justify-center text-[8px] text-[#8A8578]"
                >
                  {tech.charAt(0).toUpperCase()}
                </div>
              ))}
              {project.tech.length > 3 && (
                <div className="w-5 h-5 rounded-full bg-[#1A1A1A] border border-white/10 flex items-center justify-center text-[8px] text-[#8A8578]">
                  +{project.tech.length - 3}
                </div>
              )}
            </div>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1 rounded hover:bg-white/5 transition-colors opacity-0 group-hover:opacity-100"
          >
            <ArrowUpRight className="w-3.5 h-3.5 text-[#8A8578]" />
          </motion.button>
        </div>
      </div>
      {index < 4 && <Separator className="bg-white/5" />}
    </motion.div>
  );
};

// Usage Bar
const UsageBar: React.FC<{
  label: string;
  value: number;
  count: string;
  index: number;
  isLoading: boolean;
}> = ({ label, value, count, index, isLoading }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const color = value > 80 ? "#F87171" : value > 60 ? "#FACC15" : "#4ADE80";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="space-y-2"
    >
      {isLoading ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24 bg-white/5" />
            <Skeleton className="h-4 w-16 bg-white/5" />
          </div>
          <Skeleton className="h-2 w-full bg-white/5" />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#D8CFBC] flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: color }}
              />
              {label}
            </span>
            <span className="text-sm font-medium text-[#FFFBF4]">{count}</span>
          </div>
          <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-0 h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${color}40, ${color})`,
                width: `${value}%`,
              }}
              initial={{ width: 0 }}
              animate={isInView ? { width: `${value}%` } : { width: 0 }}
              transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
            />
          </div>
          {value > 80 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-[10px] text-[#F87171] flex items-center gap-1"
            >
              <AlertTriangle className="w-3 h-3" />
              Approaching limit
            </motion.p>
          )}
        </>
      )}
    </motion.div>
  );
};

const timeAgo = (dateStr: string): string => {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(dateStr).toLocaleDateString();
};

// Main Component
const Overview = () => {
  const { data, isLoading, error } = useProjects();
  const projects = data?.data ?? [];
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);
  const headerScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98]);

  // Calculate stats
  const totalProjects = projects.length;
  const featuredCount = projects.filter((p: any) => p.featured).length;
  const uniqueCategories = new Set(projects.map((p: any) => p.category).filter(Boolean)).size;
  const uniqueTech = new Set(projects.flatMap((p: any) => p.tech).filter(Boolean)).size;
  const activeProjects = projects.filter((p: any) => p.status === "active").length || totalProjects;
  const totalTechUsed = projects.reduce((acc: number, p: any) => acc + (p.tech?.length || 0), 0);
  const completionRate = totalProjects > 0 ? Math.round((activeProjects / totalProjects) * 100) : 0;

  const stats = [
    {
      label: "Total Projects",
      value: totalProjects,
      icon: FolderOpen,
      color: "#4ADE80",
      trend: 12,
    },
    {
      label: "Featured",
      value: featuredCount,
      icon: Star,
      color: "#FACC15",
      trend: 8,
    },
    {
      label: "Categories",
      value: uniqueCategories,
      icon: LayoutGrid,
      color: "#60A5FA",
      trend: 5,
    },
    {
      label: "Tech Stack",
      value: uniqueTech,
      icon: Layers,
      color: "#C084FC",
      trend: 15,
    },
  ];

  const advancedStats = [
    {
      label: "Total Tech Usage",
      value: totalTechUsed,
      icon: Code,
      color: "#F472B6",
    },
    {
      label: "Active Projects",
      value: activeProjects,
      icon: Activity,
      color: "#34D399",
    },
    {
      label: "Categories Used",
      value: `${uniqueCategories} / 10`,
      icon: Database,
      color: "#FBBF24",
    },
    {
      label: "Completion Rate",
      value: `${completionRate}%`,
      icon: Target,
      color: "#818CF8",
    },
  ];

  const recentProjects = [...projects]
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const usages = [
    {
      label: "Projects",
      value: Math.min(Math.round((totalProjects / 20) * 100), 100),
      count: `${totalProjects} / 20`,
    },
    {
      label: "Categories",
      value: Math.min(Math.round((uniqueCategories / 10) * 100), 100),
      count: `${uniqueCategories} / 10`,
    },
    {
      label: "Tech Stack",
      value: Math.min(Math.round((uniqueTech / 30) * 100), 100),
      count: `${uniqueTech} / 30`,
    },
  ];

  if (error) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="min-h-screen flex items-center justify-center p-6 bg-[#0A0A0A]"
      >
        <motion.div variants={itemVariants} className="max-w-md w-full">
          <GlowCard>
            <CardContent className="flex flex-col items-center justify-center py-12 px-6 gap-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <AlertTriangle className="w-12 h-12 text-[#F87171]" />
              </motion.div>
              <h3 className="text-xl font-semibold text-[#FFFBF4]">Failed to Load Data</h3>
              <p className="text-sm text-[#8A8578] text-center">
                {error.message || "Please try again later."}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 rounded-lg bg-[#4ADE80] text-[#0A0A0A] text-sm font-medium"
                onClick={() => window.location.reload()}
              >
                Retry
              </motion.button>
            </CardContent>
          </GlowCard>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-[#0A0A0A] p-4 sm:p-6 lg:p-8"
    >
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header Section */}
        <motion.div
          style={{ opacity: headerOpacity, scale: headerScale }}
          className="relative"
        >
          <GlowCard className="p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center gap-3"
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-lg bg-[#4ADE80]/10 flex items-center justify-center">
                      <Rocket className="w-5 h-5 text-[#4ADE80]" />
                    </div>
                    <motion.div
                      className="absolute -inset-1 rounded-lg bg-[#4ADE80]/10"
                      animate={pulseAnimation}
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#FFFBF4]">
                      <TypewriterText text="Dashboard Overview" />
                    </h1>
                    <p className="text-sm text-[#8A8578] flex items-center gap-2 flex-wrap">
                      <Globe className="w-3.5 h-3.5" />
                      <span>Real-time insights & analytics</span>
                      <Badge className="bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/20 text-[10px]">
                        <Zap className="w-2.5 h-2.5 mr-1" />
                        Live
                      </Badge>
                      <Badge className="bg-white/5 text-[#8A8578] border border-white/10 text-[10px]">
                        <Clock className="w-2.5 h-2.5 mr-1" />
                        Updated now
                      </Badge>
                    </p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center gap-3 flex-wrap"
              >
                <Badge className="bg-white/5 text-[#8A8578] border border-white/10 px-4 py-2">
                  <Users className="w-3.5 h-3.5 mr-2" />
                  {Math.floor(Math.random() * 50 + 10)} viewers
                </Badge>
                <Badge className="bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/20 px-4 py-2">
                  <ArrowUpRight className="w-3.5 h-3.5 mr-2" />
                  +12% growth
                </Badge>
                <Badge className="bg-[#FACC15]/10 text-[#FACC15] border border-[#FACC15]/20 px-4 py-2">
                  <Award className="w-3.5 h-3.5 mr-2" />
                  Top 10%
                </Badge>
              </motion.div>
            </div>
          </GlowCard>
        </motion.div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} isLoading={isLoading} />
          ))}
        </div>

        {/* Advanced Stats */}
        <motion.div variants={itemVariants}>
          <GlowCard>
            <CardHeader>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between"
              >
                <div>
                  <CardTitle className="text-[#FFFBF4] text-lg flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#60A5FA]" />
                    Advanced Analytics
                  </CardTitle>
                  <CardDescription className="text-[#8A8578]">
                    Detailed project metrics and insights
                  </CardDescription>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"
                >
                  <Server className="w-4 h-4 text-[#8A8578]" />
                </motion.div>
              </motion.div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {advancedStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.03)" }}
                      className="flex flex-col items-center p-4 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                        style={{ backgroundColor: `${stat.color}10` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: stat.color }} />
                      </div>
                      <span className="text-xl font-bold text-[#FFFBF4]">{stat.value}</span>
                      <span className="text-xs text-[#8A8578] text-center">{stat.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </GlowCard>
        </motion.div>

        {/* Recent Activity & Usage Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <motion.div variants={itemVariants}>
            <GlowCard>
              <CardHeader>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-between"
                >
                  <div>
                    <CardTitle className="text-[#FFFBF4] text-lg flex items-center gap-2">
                      <Activity className="w-5 h-5 text-[#4ADE80]" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription className="text-[#8A8578]">
                      Latest projects and updates
                    </CardDescription>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"
                  >
                    <GitBranch className="w-4 h-4 text-[#8A8578]" />
                  </motion.div>
                </motion.div>
              </CardHeader>
              <CardContent className="space-y-1">
                {isLoading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3 py-2.5 px-2">
                        <Skeleton className="w-8 h-8 rounded-md bg-white/5" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-32 bg-white/5" />
                          <Skeleton className="h-3 w-24 bg-white/5" />
                        </div>
                        <Skeleton className="w-16 h-6 rounded-full bg-white/5" />
                      </div>
                    ))
                  : recentProjects.map((project: any, index: number) => (
                      <ActivityItem key={project.id} project={project} index={index} />
                    ))}
                {!isLoading && recentProjects.length === 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-[#8A8578] py-8 text-center"
                  >
                    No recent activity to display.
                  </motion.p>
                )}
              </CardContent>
            </GlowCard>
          </motion.div>

          {/* Usage Section */}
          <motion.div variants={itemVariants}>
            <GlowCard>
              <CardHeader>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-between"
                >
                  <div>
                    <CardTitle className="text-[#FFFBF4] text-lg flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-[#C084FC]" />
                      Resource Usage
                    </CardTitle>
                    <CardDescription className="text-[#8A8578]">
                      Current consumption and limits
                    </CardDescription>
                  </div>
                  <motion.div
                    animate={floatAnimation}
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"
                  >
                    <Cloud className="w-4 h-4 text-[#8A8578]" />
                  </motion.div>
                </motion.div>
              </CardHeader>
              <CardContent className="space-y-6">
                {usages.map((usage, index) => (
                  <UsageBar
                    key={usage.label}
                    label={usage.label}
                    value={usage.value}
                    count={usage.count}
                    index={index}
                    isLoading={isLoading}
                  />
                ))}

                {!isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="pt-4 border-t border-white/5"
                  >
                    <div className="flex items-center justify-between text-xs text-[#8A8578]">
                      <span>Last updated: {new Date().toLocaleTimeString()}</span>
                      <span className="flex items-center gap-1">
                        <Shield className="w-3 h-3 text-[#4ADE80]" />
                        All systems operational
                      </span>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Overview;