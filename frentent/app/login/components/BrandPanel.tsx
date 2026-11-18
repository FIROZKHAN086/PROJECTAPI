"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Zap,
  Globe,
  Lock,
  Activity,
  Code,
  Users,
} from "@/src/Components/DynamicIcons";
import { authFeatures } from "@/app/login/lib/data";

const stats = [
  { label: "Developers", value: "10k+", icon: Users },
  { label: "Uptime", value: "99.9%", icon: Activity },
  { label: "Latency", value: "<50ms", icon: Zap },
];

const terminalLines = [
  { prompt: "$", text: "curl https://api.projectapi.dev/v1/projects", tone: "text-[#FFFBF4]" },
  { prompt: ">", text: "200 OK  •  42ms  •  application/json", tone: "text-[#4ADE80]" },
  { prompt: ">", text: '{ "status": "ready", "region": "global" }', tone: "text-[#D8CFBC]" },
];

export default function BrandPanel({ isSignUp }: { isSignUp: boolean }) {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-8"
      >
        <div className="space-y-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#4ADE80]/25 bg-[#4ADE80]/10 px-3.5 py-1.5 backdrop-blur-sm"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#4ADE80] opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-[#4ADE80]" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4ADE80]">
              API workspace for builders
            </span>
          </motion.div>

          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="max-w-xl font-space-grotesk text-4xl font-semibold leading-[1.05] text-[#FFFBF4] xl:text-5xl"
            >
              {isSignUp ? (
                <>
                  Build, test, and ship APIs from one{" "}
                  <span className="bg-gradient-to-r from-[#4ADE80] to-[#FFFBF4] bg-clip-text text-transparent">
                    beautiful workspace
                  </span>
                </>
              ) : (
                <>
                  Your projects, endpoints, and docs in one{" "}
                  <span className="bg-gradient-to-r from-[#4ADE80] to-[#FFFBF4]  bg-clip-text text-transparent">
                    focused dashboard
                  </span>
                </>
              )}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.55 }}
              className="max-w-lg text-base leading-relaxed text-[#D8CFBC]"
            >
              {isSignUp
                ? "Create an account to manage collections, monitor responses, and collaborate with a developer-first experience."
                : "Pick up where you left off. Inspect requests, track changes, and keep your API workflow moving."}
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#141414] to-[#0A0A0A] p-4 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.9)]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(500px_180px_at_10%_0%,rgba(74,222,128,0.12),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFFBF4]/20 to-transparent" />
          <div className="relative">
            <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#F87171]/80" />
                  <span className="size-2.5 rounded-full bg-[#FACC15]/80" />
                  <span className="size-2.5 rounded-full bg-[#4ADE80]/80" />
                </div>
                <span className="ml-2 text-xs font-medium text-[#8A8578]">projectapi — request</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-md border border-[#4ADE80]/20 bg-[#4ADE80]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#4ADE80]">
                Live
              </span>
            </div>
            <div className="space-y-2 font-mono text-[13px] leading-relaxed">
              {terminalLines.map((line, i) => (
                <motion.div
                  key={line.text}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.12, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <span className="w-4 shrink-0 text-[#8A8578]">{line.prompt}</span>
                  <span className={line.tone}>{line.text}</span>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ delay: 0.9, duration: 1.1, repeat: Infinity }}
                className="ml-7 h-4 w-2 rounded-sm bg-[#4ADE80]/70"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.08, duration: 0.45 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#141414]/70 p-3.5 backdrop-blur-sm"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#4ADE80]/0 to-[#4ADE80]/0 transition-colors duration-300 group-hover:from-[#4ADE80]/[0.06]" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-[#FFFBF4]">{stat.value}</p>
                    <p className="text-[11px] uppercase tracking-wider text-[#8A8578]">{stat.label}</p>
                  </div>
                  <span className="inline-flex size-8 items-center justify-center rounded-lg border border-white/10 bg-[#0A0A0A]/70 text-[#4ADE80]">
                    <Icon className="size-4" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {authFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.text}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#141414]/70 px-3.5 py-3 backdrop-blur-sm"
              >
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#4ADE80]/20 bg-[#4ADE80]/10 text-[#4ADE80]">
                  <Icon className="size-4" />
                </span>
                <span className="text-xs font-medium text-[#D8CFBC]">{feature.text}</span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-6 border-t border-white/10 pt-5">
          <div className="flex -space-x-2.5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex size-8 items-center justify-center rounded-full border-2 border-[#0A0A0A] bg-gradient-to-br from-[#D8CFBC] to-[#8A8578] text-[10px] font-semibold text-[#0A0A0A]"
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs font-medium text-[#FFFBF4]">10,000+ active developers</p>
            <p className="text-[11px] text-[#8A8578]">Building production APIs daily</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-[#8A8578]">
          <span className="inline-flex items-center gap-1.5">
            <Shield className="size-3.5 text-[#4ADE80]" /> SOC 2 Type II
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1.5">
            <Lock className="size-3.5 text-[#4ADE80]" /> End-to-end TLS
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1.5">
            <Globe className="size-3.5 text-[#4ADE80]" /> Global Edge
          </span>
        </div>
      </motion.div>
    </div>
  );
}
