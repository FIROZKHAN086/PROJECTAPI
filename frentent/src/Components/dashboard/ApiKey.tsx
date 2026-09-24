"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  Eye,
  EyeOff,
  Check,
  Zap,
  KeyRound,
  ShieldCheck,
  Activity,
} from "lucide-react";
import { useAppSelector } from "@/src/lib/hooks";
import { toast } from "@/src/lib/toastSlice";
import {
  DashHeader,
  Reveal,
  GlowCard,
  Counter,
} from "@/src/Components/dashboard/ui";

const limits = [
  { label: "Per Minute", max: 100, unit: "req/min" },
  { label: "Per Hour", max: 1000, unit: "req/hour" },
  { label: "Per Day", max: 10000, unit: "req/day" },
];

const iconBtn =
  "flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#A3A3A3] transition-colors hover:border-white/25 hover:text-[#FAFAFA] disabled:pointer-events-none disabled:opacity-40 cursor-pointer";

const ApiKey = () => {
  const { user } = useAppSelector((s) => s.auth);
  const oneTimeId = user?.OneTimeID ?? "";

  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const maskedKey = oneTimeId
    ? oneTimeId.slice(0, 4) + "****" + oneTimeId.slice(-4)
    : "No key available";

  const displayKey = revealed ? oneTimeId : maskedKey;

  const handleCopy = async () => {
    if (!oneTimeId) return;
    try {
      await navigator.clipboard.writeText(oneTimeId);
      setCopied(true);
      toast.success("API key copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy key");
    }
  };

  const codeSnippet = `const response = await fetch("https://api.yourapp.com/v1/data", {
  method: "GET",
  headers: {
    "Authorization": "Bearer ${oneTimeId || "<YOUR_API_KEY>"}",
    "Content-Type": "application/json"
  }
});

const data = await response.json();
console.log(data);`;

  return (
    <div className="space-y-6">
      <Reveal>
        <DashHeader
          title="API Keys"
          subtitle="Your personal API key for authenticating requests"
          icon={KeyRound}
          accent="#4ADE80"
          right={
            <Badge className="gap-1.5 border border-[#4ADE80]/25 bg-[#4ADE80]/10 text-[#4ADE80]">
              <Activity className="size-3" />
              Active
            </Badge>
          }
        />
      </Reveal>

      <Reveal delay={0.06}>
        <GlowCard glow="74, 222, 128">
          <div className="p-6 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-space-grotesk text-base font-bold text-[#FAFAFA]">
                  Your API Key
                </h3>
                <p className="text-xs text-[#A3A3A3]">
                  Keep this key secret. Do not expose it in client-side code.
                </p>
              </div>
              <motion.div
                animate={{ y: [0, -5, 0], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#4ADE80]/25 bg-[#4ADE80]/10"
              >
                <Zap className="size-4 text-[#4ADE80]" />
              </motion.div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 font-mono">
              <ShieldCheck className="size-4 shrink-0 text-[#4ADE80]" />
              <span className="flex-1 break-all select-all text-sm text-[#FAFAFA]">
                {displayKey}
              </span>
              <div className="flex shrink-0 items-center gap-1.5">
                <motion.button
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setRevealed(!revealed)}
                  className={iconBtn}
                  aria-label={revealed ? "Hide API key" : "Reveal API key"}
                >
                  {revealed ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                </motion.button>
                <motion.button
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleCopy}
                  disabled={!oneTimeId}
                  className={iconBtn}
                  aria-label="Copy API key"
                >
                  {copied ? (
                    <Check className="size-3.5 text-[#4ADE80]" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </motion.button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="border border-[#4ADE80]/20 bg-[#4ADE80]/15 text-[10px] text-[#4ADE80]"
              >
                Active
              </Badge>
              <span className="text-[11px] text-[#6B6B6B]">
                Use this key in the Authorization header
              </span>
            </div>
          </div>
        </GlowCard>
      </Reveal>

      <Reveal delay={0.12}>
        <GlowCard>
          <div className="p-6 space-y-5">
            <div className="space-y-1">
              <h3 className="font-space-grotesk text-base font-bold text-[#FAFAFA]">
                Rate Limits
              </h3>
              <p className="text-xs text-[#A3A3A3]">
                Maximum requests allowed per time window
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {limits.map((l) => (
                <div
                  key={l.label}
                  className="space-y-2 rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-colors duration-300 hover:border-white/20"
                >
                  <p className="text-sm font-medium text-[#D8CFBC]">{l.label}</p>
                  <p className="font-space-grotesk text-2xl font-bold tracking-tight text-[#FAFAFA]">
                    <Counter to={l.max} />
                  </p>
                  <p className="text-[11px] text-[#6B6B6B]">{l.unit}</p>
                </div>
              ))}
            </div>
          </div>
        </GlowCard>
      </Reveal>

      <Reveal delay={0.18}>
        <GlowCard>
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl border border-[#FACC15]/25 bg-[#FACC15]/10">
                <Zap className="size-4 text-[#FACC15]" />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-space-grotesk text-base font-bold text-[#FAFAFA]">
                  Quick Start
                </h3>
                <p className="text-xs text-[#A3A3A3]">
                  Make your first API request using your key
                </p>
              </div>
            </div>
            <pre className="overflow-x-auto rounded-xl border border-white/10 bg-[#07070B] p-4 font-mono text-sm leading-relaxed text-[#D8CFBC]">
              <code>{codeSnippet}</code>
            </pre>
          </div>
        </GlowCard>
      </Reveal>
    </div>
  );
};

export default ApiKey;