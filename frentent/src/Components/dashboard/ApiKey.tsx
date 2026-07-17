"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Copy, Eye, EyeOff, Check, Zap } from "lucide-react";
import { useAppSelector } from "@/src/lib/hooks";
import { toast } from "@/src/lib/toastSlice";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
};

const limits = [
  { label: "Per Minute", max: 100, unit: "req/min" },
  { label: "Per Hour", max: 1000, unit: "req/hour" },
  { label: "Per Day", max: 10000, unit: "req/day" },
];

const ApiKey = () => {
  const { user } = useAppSelector((s) => s.auth);
  const oneTimeId = (user as any)?.OneTimeID ?? "";

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
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 p-6"
    >
      <motion.div variants={item}>
        <Card className="bg-[#141414] border border-white/10">
          <CardHeader>
            <CardTitle className="text-[#FFFBF4] text-xl">API Keys</CardTitle>
            <CardDescription className="text-[#8A8578]">
              Your personal API key for authenticating requests.
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="bg-[#141414] border border-white/10">
          <CardHeader>
            <CardTitle className="text-[#FFFBF4] text-base">Your API Key</CardTitle>
            <CardDescription className="text-[#8A8578] text-xs">
              Keep this key secret. Do not expose it in client-side code.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 font-mono">
              <span className="text-sm text-[#FFFBF4] flex-1 break-all select-all">
                {displayKey}
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 text-[#8A8578] hover:text-[#4ADE80] hover:bg-[#4ADE80]/10"
                  onClick={() => setRevealed(!revealed)}
                >
                  {revealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 text-[#8A8578] hover:text-[#4ADE80] hover:bg-[#4ADE80]/10"
                  onClick={handleCopy}
                  disabled={!oneTimeId}
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#4ADE80]" /> : <Copy className="w-3.5 h-3.5" />}
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-[#4ADE80]/15 text-[#4ADE80] border border-[#4ADE80]/20 text-[10px]"
              >
                Active
              </Badge>
              <span className="text-[11px] text-[#8A8578]">Use this key in the Authorization header</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="bg-[#141414] border border-white/10">
          <CardHeader>
            <CardTitle className="text-[#FFFBF4] text-base">Rate Limits</CardTitle>
            <CardDescription className="text-[#8A8578] text-xs">
              Maximum requests allowed per time window
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {limits.map((l) => (
              <div key={l.label} className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-2">
                <p className="text-sm font-medium text-[#FFFBF4]">{l.label}</p>
                <p className="text-2xl font-bold text-[#4ADE80]">{l.max.toLocaleString()}</p>
                <p className="text-[11px] text-[#8A8578]">{l.unit}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="bg-[#141414] border border-white/10">
          <CardHeader>
            <CardTitle className="text-[#FFFBF4] text-base flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#4ADE80]" />
              Quick Start
            </CardTitle>
            <CardDescription className="text-[#8A8578] text-xs">
              Make your first API request using your key
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="p-4 rounded-lg bg-white/5 border border-white/10 text-sm text-[#D8CFBC] overflow-x-auto font-mono leading-relaxed">
              <code>{codeSnippet}</code>
            </pre>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ApiKey;
