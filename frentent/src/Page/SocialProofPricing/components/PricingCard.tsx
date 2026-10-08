"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard, ScaleIn, TextReveal } from "@/src/lib/animations";

interface PricingPlanProps {
  plan: {
    name: string;
    price: string;
    description: string;
    featured?: boolean;
    badge?: string;
    features?: string[];
  };
}

export default function PricingCard({ plan }: PricingPlanProps) {
  const features = plan.features || [
    "Unlimited projects",
    "Custom domain support",
    "Advanced analytics",
    "Priority support",
    "Early access features",
  ];

  return (
    <ScaleIn delay={0.1}>
      <GlowCard className="h-full">
        <motion.div
          whileHover={{ y: -12 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`relative flex h-full flex-col gap-8 overflow-hidden rounded-[2rem] border ${
            plan.featured
              ? "border-[#4ADE80]/40 bg-[#111111]"
              : "border-white/5 bg-[#0D0D0D]"
          } p-8 transition-colors duration-500 hover:border-white/20`}
        >
          {plan.featured && (
            <div className="absolute top-0 right-0">
              <div className="bg-[#4ADE80] text-[#0A0A0A] text-[10px] font-black px-5 py-1.5 rounded-bl-2xl uppercase tracking-[0.1em] flex items-center gap-1.5 shadow-lg">
                <Sparkles className="size-3" />
                {plan.badge || "Most Popular"}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#FFFBF4] tracking-tight">{plan.name}</h3>
            <div className="flex items-baseline gap-1.5">
              <span className="text-5xl font-black tracking-tighter text-[#FFFBF4]">
                {plan.price}
              </span>
              {plan.price !== "Custom" && plan.price !== "$0" && (
                <span className="text-sm font-medium text-[#D8CFBC]/40">/mo</span>
              )}
            </div>
            <div className="min-h-[40px]">
              <TextReveal 
                text={plan.description} 
                className="text-sm leading-relaxed text-[#D8CFBC]/70"
              />
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="space-y-4 flex-grow">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className={`flex size-5 items-center justify-center rounded-full ${
                  plan.featured ? "bg-[#4ADE80]/15 text-[#4ADE80]" : "bg-white/10 text-[#D8CFBC]"
                }`}>
                  <Check className="size-3" />
                </div>
                <span className="text-sm text-[#D8CFBC]/90 font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>

          <Button
            className={`w-full h-14 rounded-2xl font-bold text-base transition-all duration-300 relative group overflow-hidden ${
              plan.featured
                ? "bg-[#4ADE80] text-[#0A0A0A] hover:bg-[#4ADE80]/90"
                : "bg-white/5 text-[#FFFBF4] border border-white/10 hover:bg-white/10"
            }`}
          >
            <span className="relative z-10">Get Started Now</span>
            {plan.featured && (
              <motion.div 
                className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"
              />
            )}
          </Button>
        </motion.div>
      </GlowCard>
    </ScaleIn>
  );
}
