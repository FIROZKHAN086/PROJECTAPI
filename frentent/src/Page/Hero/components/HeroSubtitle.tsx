"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/src/Page/Hero/lib/variants";

export default function HeroSubtitle() {
  return (
    <div className="mt-6 flex flex-col items-center gap-4">
      <motion.p
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
        className="max-w-[620px] text-base leading-relaxed text-[#D8CFBC] sm:text-lg"
      >
        The headless CMS for developer portfolios. Manage your projects once,
        sync everywhere instantly. Build faster with REST APIs, webhooks, and
        framework-specific SDKs.
      </motion.p>

      {/* Feature highlights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-4 text-sm text-[#8A8578]"
      >
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="h-4 w-4 text-[#4ADE80]"
            aria-hidden="true"
          >
            <path
              d="M13 4L6 11 3 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>No credit card required</span>
        </div>
        <span className="h-4 w-px bg-white/10" aria-hidden="true" />
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="h-4 w-4 text-[#4ADE80]"
            aria-hidden="true"
          >
            <path
              d="M13 4L6 11 3 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Free forever plan</span>
        </div>
        <span className="h-4 w-px bg-white/10" aria-hidden="true" />
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="h-4 w-4 text-[#4ADE80]"
            aria-hidden="true"
          >
            <path
              d="M13 4L6 11 3 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>5 min setup</span>
        </div>
      </motion.div>
    </div>
  );
}
