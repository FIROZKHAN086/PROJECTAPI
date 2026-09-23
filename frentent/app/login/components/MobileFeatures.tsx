"use client";

import { motion } from "framer-motion";
import { authFeatures } from "@/app/login/lib/data";

export default function MobileFeatures() {
  return (
    <div className="lg:hidden mt-4 grid grid-cols-2 gap-2">
      {authFeatures.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            className="flex items-center gap-2 p-2 bg-[#141414] border border-white/10 rounded-lg"
          >
            <Icon className="size-3.5 text-[#4ADE80] flex-shrink-0" />
            <span className="text-[10px] text-[#D8CFBC] truncate">{feature.text}</span>
          </motion.div>
        );
      })}
    </div>
  );
}