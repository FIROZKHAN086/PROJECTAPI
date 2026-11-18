"use client";

import { motion } from "framer-motion";
import { wordReveal, heroContainer } from "@/src/Page/Hero/lib/variants";

const LINE_ONE = ["One", "Dashboard.", "One", "API."];
const LINE_TWO = ["Unlimited", "Portfolios", "&", "Projects."];

export default function HeroTitle() {
  return (
    <motion.h1
      variants={heroContainer}
      initial="hidden"
      animate="visible"
      style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
      className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-[#FFFBF4] sm:text-5xl md:text-6xl lg:text-7xl"
    >
      <span className="block">
        {LINE_ONE.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden py-0.5 align-top"
          >
            <motion.span
              custom={i}
              variants={wordReveal}
              className={`inline-block ${
                word === "API."
                  ? "text-[#4ADE80] drop-shadow-[0_0_24px_rgba(74,222,128,0.4)]"
                  : "text-[#FFFBF4]"
              }`}
            >
              {word}
              {i < LINE_ONE.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </span>
      <span className="block mt-1 sm:mt-2">
        {LINE_TWO.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden py-0.5 align-top"
          >
            <motion.span
              custom={LINE_ONE.length + i}
              variants={wordReveal}
              className={`inline-block tracking-tight ${
                word === "&" ? "text-[#FFFBF4]/40 font-normal" : "text-[#FFFBF4]"
              }`}
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