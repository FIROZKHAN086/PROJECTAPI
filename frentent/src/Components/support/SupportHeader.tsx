"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LifeBuoy,
  ArrowRight,
  Clock,
  MessageCircle,
  Shield,
} from "lucide-react";

const floatAnimation = {
  y: [0, -6, 0],
  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
};

export function SupportHeader({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <div className="text-center mb-12">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="inline-flex items-center gap-2 bg-[#4ADE80]/10 text-[#4ADE80] px-4 py-2 rounded-full mb-6 border border-[#4ADE80]/20"
      >
        <Shield className="h-4 w-4" />
        <span className="text-sm font-medium">Support Center</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#FFFBF4] mb-4"
      >
        How can we help you?
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg text-[#8A8578] max-w-2xl mx-auto mb-8"
      >
        Found a bug? Have a suggestion? Need help? Create a ticket and we&apos;ll
        get back to you.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap justify-center gap-4"
      >
        <Button
          onClick={onCreateClick}
          className="bg-[#4ADE80] hover:bg-[#4ADE80]/90 cursor-pointer text-[#0A0A0A] font-semibold gap-2 px-6"
        >
          <MessageCircle className="h-4 w-4" />
          Create Ticket
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="border-white/10 bg-transparent cursor-pointer text-[#D8CFBC]  gap-2 px-6"
          onClick={() =>
            document.getElementById("faq-section")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <LifeBuoy className="h-4 w-4" />
          Browse FAQs
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap justify-center gap-6 mt-10"
      >
        {[
          { icon: Clock, label: "Fast Response", sub: "Within 24 hours" },
          { icon: MessageCircle, label: "Direct Support", sub: "From the dev team" },
          { icon: Shield, label: "Bug Reports", sub: "Tracked & fixed" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-[#8A8578]">
            <item.icon className="w-4 h-4 text-[#4ADE80]" />
            <span className="text-[#D8CFBC] font-medium">{item.label}</span>
            <span className="hidden sm:inline">· {item.sub}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
