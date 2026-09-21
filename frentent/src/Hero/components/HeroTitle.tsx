"use client";

import { motion } from "framer-motion";
import { wordReveal, heroContainer } from "@/src/Hero/lib/variants";

const LINE_ONE = ["One", "Dashboard.", "One", "API."];
const LINE_TWO = ["Unlimited", "Portfolios", "Projects."];

export default function HeroTitle() {
  return (
    <motion.h1
      variants={heroContainer}
      initial="hidden"
      animate="visible"
      className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-[#FFFBF4] sm:text-5xl md:text-6xl lg:text-7xl"
    >
      <span className="block">
        {LINE_ONE.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden py-0.5 align-top">
            <motion.span
              custom={i}
              variants={wordReveal}
              className={`inline-block ${i === 1 || i === 3 ? "text-[#FFFBF4]" : ""}`}
            >
              {word}
              {i < LINE_ONE.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </span>
      <span className="block">
        {LINE_TWO.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden py-0.5 align-top">
            <motion.span
              custom={LINE_ONE.length + i}
              variants={wordReveal}
              className={`inline-block tracking-tight text-[#FFFBF4]  `}
            >
              {word}
              {i < LINE_TWO.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </motion.h1>
  );
}