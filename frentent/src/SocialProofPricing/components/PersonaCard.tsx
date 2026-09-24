"use client";

import { motion } from "framer-motion";
import { GlowCard, StaggerItem, TextReveal } from "@/src/lib/animations";
import { LucideIcon } from "lucide-react";

interface PersonaProps {
  persona: {
    icon: LucideIcon;
    title: string;
    description: string;
  };
}

export default function PersonaCard({ persona }: PersonaProps) {
  return (
    <StaggerItem>
      <GlowCard className="h-full">
        <motion.div
          whileHover={{
            y: -8,
            borderColor: "rgba(74,222,128,0.3)",
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-[#0A0A0A] backdrop-blur-sm p-6 cursor-default h-full"
        >
          <motion.div
            whileHover={{ rotate: -15, scale: 1.15 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-[#0A0A0A] text-[#4ADE80] shadow-inner"
          >
            <persona.icon className="size-5" />
          </motion.div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-[#FFFBF4] tracking-tight">
              {persona.title}
            </h3>
            <TextReveal 
              text={persona.description} 
              className="text-sm leading-relaxed text-[#D8CFBC]/60"
            />
          </div>
        </motion.div>
      </GlowCard>
    </StaggerItem>
  );
}
