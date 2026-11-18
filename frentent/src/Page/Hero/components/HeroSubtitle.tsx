"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/src/Page/Hero/lib/variants";

export default function HeroSubtitle() {
  return (
    <motion.p
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.1 }}
      className="mt-6 max-w-xl text-base leading-relaxed text-[#FFFBF4]/80 sm:text-lg"
    >
      The headless API and developer command center for modern portfolios.
      Manage your projects once in a visual dashboard — every connected website
      hydrates in real time via global Edge REST endpoints.
    </motion.p>
  );
}
