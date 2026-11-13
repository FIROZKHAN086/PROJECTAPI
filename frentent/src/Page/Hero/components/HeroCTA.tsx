"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { fadeIn, EASE_OUT } from "@/src/Page/Hero/lib/variants";
import { useRouter } from "next/navigation";
export default function HeroCTA() {
  const router = useRouter();
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.2 }}
      className="mt-8 flex flex-wrap items-center justify-center gap-3"
    >
      <motion.button
        whileHover={{
          scale: 1.04,
          boxShadow: "0px 0px 28px rgba(74,222,128,0.35)",
        }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
        onClick={() => router.push("/login")}
        className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#4ADE80] px-6 py-2.5 text-sm font-semibold text-[#0A0A0A] transition-colors hover:bg-[#a3e635]"
      >
        <span className="absolute inset-0 -z-10 bg-gradient-to-r from-[#4ADE80] via-[#a3e635] to-[#4ADE80] bg-[length:200%_100%]" />
        <span className="relative z-10">Start Building Free</span>
        <svg
          viewBox="0 0 16 16"
          fill="none"
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        >
          <path
            d="M3 8h10m0 0L9 4m4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>
      <motion.a
        whileHover={{
          scale: 1.04,
          backgroundColor: "rgba(255,255,255,0.1)",
          borderColor: "rgba(255,255,255,0.2)",
        }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
        href="/docs"
        className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-white/[0.03] border border-white/10 px-6 py-2.5 text-sm font-medium text-[#FFFBF4]"
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path
            d="M8 3v10m0 0l4-4m-4 4L4 9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
          />
          <path
            d="M2 2h12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
        View API Docs
      </motion.a>
    </motion.div>
  );
}
