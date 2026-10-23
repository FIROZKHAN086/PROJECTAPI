"use client";

import { motion } from "framer-motion";
import { authFeatures } from "@/app/login/lib/data";
import { Sparkles } from "lucide-react";

export default function MobileFeatures() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="lg:hidden mt-8"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1A1A1A]/50 to-[#0F0F0F]/50 backdrop-blur-sm p-4">
        {/* Background pattern */}
        <div className="absolute inset-0 -z-10 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(45deg, #4ADE80 1px, transparent 1px),
                               linear-gradient(-45deg, #3B82F6 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
            }}
          />
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-[#4ADE80]" />
            <h3 className="text-sm font-semibold text-[#FFFBF4]">
              Why choose ProjectAPI?
            </h3>
          </div>
          <div className="flex items-center gap-1">
            <span className="size-1.5 bg-[#4ADE80] rounded-full animate-pulse" />
            <span className="size-1.5 bg-[#3B82F6] rounded-full animate-pulse" />
            <span className="size-1.5 bg-[#4ADE80] rounded-full animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {authFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -2 }}
                className="flex items-start gap-2 p-3 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/10 transition-all group"
              >
                <div className="relative">
                  <Icon className="size-4 text-[#4ADE80] flex-shrink-0 mt-0.5" />
                  <div className="absolute -inset-1 bg-[#4ADE80]/10 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <span className="text-xs font-medium text-[#FFFBF4] block leading-tight">
                    {feature.text.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-[#D8CFBC]/80 block leading-tight">
                    {feature.text.split(' ').slice(1).join(' ')}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between"
        >
          <div className="text-center">
            <div className="text-sm font-bold text-[#FFFBF4]">10K+</div>
            <div className="text-[10px] text-[#D8CFBC]/60">Developers</div>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div className="text-center">
            <div className="text-sm font-bold text-[#FFFBF4]">99.9%</div>
            <div className="text-[10px] text-[#D8CFBC]/60">Uptime</div>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div className="text-center">
            <div className="text-sm font-bold text-[#FFFBF4]">24/7</div>
            <div className="text-[10px] text-[#D8CFBC]/60">Support</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
