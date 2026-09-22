"use client";

import { ScrollReveal,  LineDraw } from "@/src/lib/animations";
import { EASE_OUT } from "@/src/ProblemSolution/lib/variants";
import { motion, Variants } from "framer-motion";

export default function PricingHeader() {
   const riseIn: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};
  return (
    <div className="space-y-4">
      <ScrollReveal direction="up" delay={0}>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D8CFBC]">
          WHO IT&apos;S FOR
        </p>
      </ScrollReveal>
      
      <div className="max-w-[900px]">
       
         
          <motion.h2
        variants={riseIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: 0.1 }}
        className="max-w-4xl text-2xl font-bold tracking-tight leading-[1.08] text-[#FFFBF4] sm:text-5xl md:text-6xl"
        style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
      >
        For developers who manage projects once and showcase them everywhere.
      </motion.h2>
       
      </div>

      <LineDraw 
        className="mt-6 h-px bg-gradient-to-r from-[#4ADE80]/60 via-[#4ADE80]/20 to-transparent w-64" 
        delay={0.5} 
      />
    </div>
  );
}
