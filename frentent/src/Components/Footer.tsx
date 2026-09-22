"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Github01Icon, NewTwitterIcon } from "@hugeicons/core-free-icons";
import { Brackets, ArrowUpRight, Heart, Command } from "lucide-react";
import {
  ScrollReveal,
  StaggerGrid,
  StaggerItem,
  CharReveal,
} from "@/src/lib/animations";

const typePhrases = [
  "Your ideas, shipped.",
  "Cool by default. Built for you.",
  "Show the world what you're building.",
];

const footerColumns = [
  {
    title: "Product",
    href: "/docs",
    links: ["Features", "Pricing", "Playground", "Extensions"],
  },
  {
    title: "Developers",
    href: "/docs",
    links: ["Documentation", "API Reference", "Status", "Changelog"],
  },
  {
    title: "Company",
    href: "/support",
    links: ["About", "Support", "Privacy", "Terms"],
  },
];

export default function Footer() {
  const [display, setDisplay] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = typePhrases[phraseIndex];
    let timer: number | undefined;

    if (!deleting && display.length < phrase.length) {
      timer = window.setTimeout(
        () => setDisplay(phrase.slice(0, display.length + 1)),
        46
      );
    } else if (!deleting && display.length === phrase.length) {
      timer = window.setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && display.length > 0) {
      timer = window.setTimeout(
        () => setDisplay(phrase.slice(0, display.length - 1)),
        24
      );
    } else {
      setDeleting(false);
      setPhraseIndex((phraseIndex + 1) % typePhrases.length);
    }

    return () => window.clearTimeout(timer);
  }, [display, deleting, phraseIndex]);

  return (
    <div className="relative">
      <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#0A0A0A]">
        {/* radial brand glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.4 }}
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(620px 320px at 50% 108%, rgba(74,222,128,0.12), transparent 68%)",
          }}
        />

        <div className="relative mx-auto max-w-[1200px] px-6 pb-10 pt-16">
          {/* ---- Cool top strip: typewriter + mini status ---- */}
          <ScrollReveal delay={0.05}>
            <div className="mb-12 flex max-w-2xl flex-col gap-3">
              
              <div className="flex min-h-[3rem] items-center gap-2 text-2xl font-semibold tracking-tight text-[#FFFBF4] md:text-3xl">
               
                <span>
                  {display}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.9 }}
                    className="ml-1 inline-block h-6 w-[3px] translate-y-1 bg-[#4ADE80] md:h-7"
                  />
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* ---- Main grid ---- */}
          <StaggerGrid className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {/* Brand */}
            <StaggerItem>
              <div className="flex flex-col gap-5 md:justify-self-start">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="flex w-fit items-center gap-2.5"
                >
                  <motion.span
                    whileHover={{ rotate: -10 }}
                    className="flex size-9 items-center justify-center rounded-xl border border-[#4ADE80]/25 bg-[#141414] text-[#4ADE80]"
                  >
                    <Brackets className="size-4" />
                  </motion.span>
                  <CharReveal
                    text={"ProjectAPI"}
                    className="text-base font-bold tracking-tight text-[#FFFBF4]"
                  />
                </motion.div>
                <p className="max-w-[240px] text-sm leading-relaxed text-[#D8CFBC]">
                  The platform that turns your ideas into products people
                  remember — with an API for everything.
                </p>

                {/* socials */}
                <div className="flex items-center gap-3">
                  <motion.a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -3, color: "#FFFBF4" }}
                    whileTap={{ scale: 0.9 }}
                    className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[#D8CFBC]"
                    aria-label="GitHub"
                  >
                    <HugeiconsIcon icon={Github01Icon} className="size-4" />
                  </motion.a>
                  <motion.a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -3, color: "#FFFBF4" }}
                    whileTap={{ scale: 0.9 }}
                    className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[#D8CFBC]"
                    aria-label="Twitter"
                  >
                    <HugeiconsIcon icon={NewTwitterIcon} className="size-4" />
                  </motion.a>
                </div>
              </div>
            </StaggerItem>

            {/* Link columns */}
            {footerColumns.map((column) => (
              <StaggerItem key={column.title}>
                <div className="flex flex-col gap-3">
                  <motion.a
                    href={column.href}
                    whileHover={{ x: 4, color: "#FFFBF4" }}
                    className="group flex w-fit items-center gap-1 text-sm font-semibold text-[#FFFBF4]"
                  >
                    {column.title}
                    <ArrowUpRight className="size-3.5 text-[#4ADE80] opacity-0 transition-opacity group-hover:opacity-100" />
                  </motion.a>
                  {column.links.map((link) => (
                    <motion.a
                      key={link}
                      href="#"
                      whileHover={{ x: 5, color: "#FFFBF4" }}
                      className="w-fit text-sm text-[#D8CFBC] transition-colors"
                    >
                      {link}
                    </motion.a>
                  ))}
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>

          {/* ---- Bottom bar ---- */}
          <ScrollReveal direction="up" delay={0.2} className="mt-14">
            <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 text-xs text-[#D8CFBC] md:flex-row">
              <p className="flex items-center gap-1.5">
                <Heart className="size-3.5 fill-[#4ADE80] text-[#4ADE80]" />
                Crafted with vision — © 2026 ProjectAPI
              </p>
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(74,222,128,0)",
                      "0 0 12px rgba(74,222,128,0.55)",
                      "0 0 0px rgba(74,222,128,0)",
                    ],
                  }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                  className="size-1.5 rounded-full bg-[#4ADE80]"
                />
                <span>All systems cool.</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </footer>
    </div>
  );
}
