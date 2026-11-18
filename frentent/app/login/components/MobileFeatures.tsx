"use client";

import { motion } from "framer-motion";
import { authFeatures } from "@/app/login/lib/data";

export default function MobileFeatures() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.45 }}
      className="mt-5 grid grid-cols-2 gap-2.5 lg:hidden"
    >
      {authFeatures.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <motion.div
            key={feature.text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 + index * 0.06, duration: 0.35 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#141414]/70 px-3 py-2.5 backdrop-blur-sm"
          >
            <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg border border-[#4ADE80]/20 bg-[#4ADE80]/10 text-[#4ADE80]">
              <Icon className="size-3.5" />
            </span>
            <span className="truncate text-xs font-medium text-[#D8CFBC]">{feature.text}</span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
