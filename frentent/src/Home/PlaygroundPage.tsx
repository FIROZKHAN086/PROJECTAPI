"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Braces,
  LayoutGrid,
  FolderKanban,
  BarChart2,
  Terminal,
  Image,
  LayoutTemplate,
  Settings,
  LifeBuoy,
  Search,
  Bell,
  Plus,
  Copy,
  Menu,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ScrollReveal,
  StaggerGrid,
  StaggerItem,
  ScaleIn,
  LineDraw,
  AnimatedCounter,
} from "@/src/lib/animations";

function TypingCode() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const fullCode = `// fetch a featured project
const res = await fetch(
  'https://api.projectapi.dev/v1/projects/{apiKey}?featured=true'
);
const data = await res.json();
console.log(data);`;
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(fullCode.slice(0, i));
      if (i >= fullCode.length) clearInterval(timer);
    }, 18);
    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <pre ref={ref} className="font-mono text-[11px] sm:text-sm leading-relaxed text-[#8A8578] whitespace-pre-wrap">
      <span>{displayed}</span>
      {isInView && displayed.length < fullCode.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-[2px] h-4 bg-[#4ADE80] ml-[1px] align-middle"
        />
      )}
    </pre>
  );
}

export default function PlaygroundPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFBF4] font-sans antialiased overflow-x-hidden">
      <main className="mx-auto max-w-[1140px] px-4 sm:px-6 py-6 sm:py-8">
        {/* API Playground Showcase */}
        <section id="playground" className="flex flex-col gap-6 sm:gap-8">
          <div className="space-y-3 sm:space-y-4">
            <ScrollReveal direction="up" delay={0}>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-[#FFFBF4]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Test your API before you ship it.
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <p className="text-sm sm:text-base text-[#D8CFBC]">
                Live request, live response, one click to copy — in the format
                you actually use.
              </p>
            </ScrollReveal>
          </div>

          {/* Panel */}
          <ScrollReveal direction="up" delay={0.15} distance={40}>
            <div className="w-full rounded-2xl border border-white/10 bg-[#171717] p-4 sm:p-6">
              {/* Tabs - Scrollable on mobile */}
              <div className="flex items-center gap-4 sm:gap-6 border-b border-white/10 pb-2 overflow-x-auto scrollbar-hide">
                {["Fetch", "Axios", "React Hook", "Next.js"].map((tab, i) => (
                  <motion.button
                    key={tab}
                    whileHover={{ color: "#FFFBF4" }}
                    whileTap={{ scale: 0.97 }}
                    className={`border-b-2 pb-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      i === 0
                        ? "border-[#FFFBF4] text-[#FFFBF4]"
                        : "border-transparent text-[#D8CFBC]"
                    }`}
                  >
                    {tab}
                  </motion.button>
                ))}
              </div>

              {/* Code + Response */}
              <div className="mt-4 flex flex-col lg:flex-row gap-4">
                {/* Code Block */}
                <div className="relative flex-1 rounded-xl border border-white/10 bg-[#0A0A0A] p-3 sm:p-4 min-h-[200px]">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-1 sm:right-2 top-1 sm:top-2 size-6 sm:size-7 text-[#D8CFBC] hover:text-[#FFFBF4]"
                  >
                    <Copy className="size-3.5 sm:size-4" />
                  </Button>
                  <TypingCode />
                </div>

                {/* Live Response */}
                <ScaleIn delay={0.4} scale={0.95}>
                  <div className="relative w-full lg:w-[280px] flex-shrink-0 rounded-xl border border-white/10 bg-[#0A0A0A] p-3 sm:p-4">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-1 sm:right-2 top-1 sm:top-2 size-6 sm:size-7 text-[#D8CFBC] hover:text-[#FFFBF4]"
                    >
                      <Copy className="size-3.5 sm:size-4" />
                    </Button>

                    <div className="flex items-center gap-2">
                      <div className="relative flex size-2">
                        <motion.span
                          animate={{ scale: [1, 2.5], opacity: [0.75, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="absolute inline-flex size-full rounded-full bg-[#4ADE80]"
                        />
                        <span className="relative inline-flex size-2 rounded-full bg-[#4ADE80]" />
                      </div>
                      <Badge className="border-[#4ADE80]/30 bg-[#4ADE80]/15 font-mono text-[10px] sm:text-[11px] text-[#4ADE80]">
                        200 OK
                      </Badge>
                    </div>

                    <pre className="mt-3 font-mono text-[10px] sm:text-xs leading-relaxed text-[#8A8578] whitespace-pre-wrap">
                      {"{"}
                      {"\n"}
                      <span className="text-[#D8CFBC]">"id"</span>:{" "}
                      <span className="text-[#FFFBF4]">"prj_9x2a"</span>,
                      {"\n"}
                      <span className="text-[#D8CFBC]">"title"</span>:{" "}
                      <span className="text-[#FFFBF4]">"E-Commerce..."</span>,
                      {"\n"}
                      <span className="text-[#D8CFBC]">"stack"</span>: [
                      <span className="text-[#FFFBF4]">"Next.js"</span>],
                      {"\n"}
                      <span className="text-[#D8CFBC]">"featured"</span>:{" "}
                      <span className="text-[#FFFBF4]">true</span>
                      {"\n"}
                      {"}"}
                    </pre>
                  </div>
                </ScaleIn>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Dashboard Preview */}
        <section className="mt-12 sm:mt-16 flex flex-col items-center gap-6 sm:gap-8">
          <div className="text-center px-4">
            <ScrollReveal direction="up" delay={0}>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-[#FFFBF4]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                A dashboard that feels like home.
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <p className="mx-auto mt-3 sm:mt-4 max-w-[560px] text-sm sm:text-base text-[#D8CFBC]">
                Overview, analytics, API usage, and recent projects — all in one
                clean view.
              </p>
            </ScrollReveal>
          </div>

          {/* Dashboard Mockup */}
          <ScaleIn delay={0.2} scale={0.97}>
            <div className="w-full max-w-[980px] rounded-2xl border border-white/10 bg-[#171717] p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_0_60px_-10px_rgba(255,255,255,0.15)]">
              <div className="flex overflow-hidden rounded-xl bg-[#0A0A0A] flex-col md:flex-row">
                {/* Sidebar - Mobile Hamburger */}
                <div className="flex md:flex-col items-center justify-between md:justify-start border-b md:border-b-0 md:border-r border-white/10 bg-[#171717] px-4 py-3 md:p-0 md:w-16 md:px-0">
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: 0.3 }}
                    className="flex size-6 sm:size-7 items-center justify-center rounded-md bg-[#FFFBF4]"
                  >
                    <Braces className="size-3.5 sm:size-4 text-[#0A0A0A]" />
                  </motion.div>

                  {/* Desktop Icons */}
                  <div className="hidden md:flex md:flex-col md:items-center md:gap-6 md:py-6">
                    {[LayoutGrid, FolderKanban, BarChart2, Terminal, Image, LayoutTemplate, Settings, LifeBuoy].map(
                      (Icon, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + i * 0.05 }}
                        >
                          <Icon
                            className={`size-4 sm:size-5 ${
                              i === 0 ? "text-[#FFFBF4]" : "text-[#D8CFBC]"
                            }`}
                          />
                        </motion.div>
                      )
                    )}
                  </div>

                  {/* Mobile Menu Toggle */}
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden text-[#D8CFBC]"
                  >
                    {mobileMenuOpen ? (
                      <X className="size-5" />
                    ) : (
                      <Menu className="size-5" />
                    )}
                  </button>
                </div>

                {/* Mobile Sidebar Menu */}
                {mobileMenuOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="md:hidden flex flex-wrap gap-4 px-4 py-3 bg-[#171717] border-b border-white/10"
                  >
                    {[LayoutGrid, FolderKanban, BarChart2, Terminal, Image, LayoutTemplate, Settings, LifeBuoy].map(
                      (Icon, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <Icon
                            className={`size-4 ${
                              i === 0 ? "text-[#FFFBF4]" : "text-[#D8CFBC]"
                            }`}
                          />
                        </motion.div>
                      )
                    )}
                  </motion.div>
                )}

                {/* Main Content */}
                <div className="flex flex-1 flex-col min-w-0">
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 px-3 sm:px-5 py-3">
                    <div className="flex w-full sm:w-[220px] items-center gap-2 rounded-lg border border-white/10 bg-[#171717] px-3 py-1.5">
                      <Search className="size-3.5 text-[#D8CFBC]" />
                      <span className="text-xs text-[#D8CFBC] truncate">
                        Search projects...
                      </span>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <Bell className="size-4 text-[#D8CFBC]" />
                        <Avatar className="size-6 sm:size-7">
                          <AvatarFallback className="bg-[#262626] text-[9px] sm:text-[10px] text-[#FFFBF4]">
                            JD
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <Button size="sm" className="h-7 gap-1 bg-[#FBF7F4] text-[10px] sm:text-xs text-[#0A0A0A] hover:bg-[#FBF7F4]/90 px-2 sm:px-3">
                        <Plus className="size-3 sm:size-3.5" />
                        <span className="hidden xs:inline">Quick Create</span>
                        <span className="xs:hidden">Create</span>
                      </Button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 p-3 sm:p-5">
                    {[
                      { label: "Total Projects", value: 128, suffix: "" },
                      { label: "API Calls This Month", value: 42, suffix: ".3K" },
                      { label: "Active Portfolios", value: 7, suffix: "" },
                    ].map((stat, i) => (
                      <Card key={i} className="border-0 bg-[#171717] p-3 sm:p-4">
                        <CardHeader className="p-0">
                          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.4px] text-[#D8CFBC]">
                            {stat.label}
                          </span>
                        </CardHeader>
                        <CardContent className="p-0 pt-1">
                          <AnimatedCounter
                            target={stat.value}
                            suffix={stat.suffix}
                            className="text-xl sm:text-2xl font-bold text-[#FFFBF4]"
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Recent Projects */}
                  <Card className="mx-3 sm:mx-5 mb-3 sm:mb-5 flex-1 border-0 bg-[#171717]">
                    <CardHeader className="flex flex-row items-center justify-between p-3 sm:p-4">
                      <span className="text-xs sm:text-sm font-medium text-[#FFFBF4]">
                        Recent Projects
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-[#D8CFBC] cursor-pointer hover:text-[#FFFBF4] transition-colors">
                        View all
                      </span>
                    </CardHeader>
                    <CardContent className="p-0">
                      {[
                        { name: "E-Commerce Dashboard", fw: "Next.js", live: true },
                        { name: "Portfolio Site v2", fw: "Astro", live: true },
                        { name: "Client CMS Panel", fw: "Vue", live: false },
                      ].map((project, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                          className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-3 sm:px-4 py-2 sm:py-2.5"
                        >
                          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                            <div className="size-5 sm:size-6 rounded-md bg-[#262626] flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-[#FFFBF4] truncate">
                              {project.name}
                            </span>
                          </div>
                          <span className="font-mono text-[9px] sm:text-[11px] text-[#D8CFBC] flex-shrink-0">
                            {project.fw}
                          </span>
                          <Badge
                            className={
                              project.live
                                ? "border-[#4ADE80]/30 bg-[#4ADE80]/15 text-[9px] sm:text-[10px] text-[#4ADE80] flex-shrink-0"
                                : "border-white/10 bg-[#262626] text-[9px] sm:text-[10px] text-[#D8CFBC] flex-shrink-0"
                            }
                          >
                            {project.live ? "Live" : "Draft"}
                          </Badge>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </ScaleIn>
        </section>
      </main>
    </div>
  );
}