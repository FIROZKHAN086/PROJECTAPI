"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/src/Hero/lib/variants";

export default function HeroSubtitle() {
  return (
    <motion.p
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.1 }}
      className="mt-5 max-w-[560px] text-base leading-relaxed text-[#D8CFBC] sm:text-lg"
    >
      ProjectAPI is a headless CMS for developer portfolios. Manage every project
      once — every connected website updates instantly.
    </motion.p>
  );
}