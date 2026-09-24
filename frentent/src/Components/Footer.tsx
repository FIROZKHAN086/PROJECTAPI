"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Github01Icon, NewTwitterIcon } from "@hugeicons/core-free-icons";
import { Brackets, ArrowUpRight, Heart } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ScrollReveal,
  CharReveal,
} from "@/src/lib/animations";

gsap.registerPlugin(ScrollTrigger);

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
  const footerRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  const [display, setDisplay] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // typewriter
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
      timer = window.setTimeout(() => {
        setDeleting(false);
        setPhraseIndex((phraseIndex + 1) % typePhrases.length);
      }, 60);
    }

    return () => window.clearTimeout(timer);
  }, [display, deleting, phraseIndex]);

  // GSAP animations
  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      gsap.fromTo(
        ".footer-scan",
        { xPercent: -150 },
        {
          xPercent: 250,
          duration: 7,
          repeat: -1,
          ease: "none",
        }
      );

      gsap.fromTo(
        ".footer-col",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".footer-cols",
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".footer-bottom",
        { opacity: 0, y: 14, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".footer-bottom",
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#0A0A0A]"
    >
      {/* parallax glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-x-0 -bottom-24 h-[460px]"
        style={{
          background:
            "radial-gradient(620px 320px at 50% 100%, rgba(74,222,128,0.14), transparent 68%)",
        }}
      />

      {/* scan line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden">
        <div className="footer-scan h-px w-1/3 bg-gradient-to-r from-transparent via-[#4ADE80]/70 to-transparent" />
      </div>

      {/* vertical grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
        <div className="mx-auto h-full max-w-[1200px] px-6">
          <div className="grid h-full grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="border-l border-white" />
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6 pb-10 pt-16">
        {/* top */}
        <ScrollReveal delay={0.05}>
          <div className="mb-12 flex max-w-2xl flex-col gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#4ADE80]/80">
              {"// built for builders"}
            </span>
            <div className="flex min-h-[3rem] items-center gap-2 text-2xl font-semibold tracking-tight text-[#FFFBF4] md:text-3xl">
              <span className="text-[#4ADE80]">{"$"}</span>
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

        {/* columns */}
        <div className="footer-cols grid grid-cols-2 gap-10 md:grid-cols-4">
          {/* brand */}
          <div className="footer-col flex flex-col gap-5 md:justify-self-start">
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

            <div className="flex items-center gap-3">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[#D8CFBC] transition-colors hover:text-[#FFFBF4]"
                aria-label="GitHub"
              >
                <HugeiconsIcon icon={Github01Icon} className="size-4" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[#D8CFBC] transition-colors hover:text-[#FFFBF4]"
                aria-label="Twitter"
              >
                <HugeiconsIcon icon={NewTwitterIcon} className="size-4" />
              </motion.a>
            </div>
          </div>

          {/* link columns */}
          {footerColumns.map((column) => (
            <div key={column.title} className="footer-col flex flex-col gap-3">
              <motion.a
                href={column.href}
                whileHover={{ x: 4 }}
                className="group relative flex w-fit items-center gap-1 text-sm font-semibold text-[#FFFBF4]"
              >
                {column.title}
                <ArrowUpRight className="size-3.5 text-[#4ADE80] opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#4ADE80]/60 transition-transform duration-300 group-hover:scale-x-100" />
              </motion.a>
              {column.links.map((link) => (
                <motion.a
                  key={link}
                  href="#"
                  whileHover={{ x: 5 }}
                  className="group relative w-fit text-sm text-[#D8CFBC] transition-colors hover:text-[#FFFBF4]"
                >
                  <span className="relative">
                    {link}
                    <span className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#4ADE80]/50 transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                </motion.a>
              ))}
            </div>
          ))}
        </div>

        {/* bottom bar */}
        <div className="footer-bottom mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 text-xs text-[#D8CFBC] md:flex-row">
          <p className="flex items-center gap-1.5">
            <motion.span
              animate={{ scale: [1, 1.18, 1] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
              className="inline-flex"
            >
              <Heart className="size-3.5 fill-[#4ADE80] text-[#4ADE80]" />
            </motion.span>
            Crafted with vision — © 2026{" "}
            <span className="font-semibold text-[#FFFBF4]">ProjectAPI</span>
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
      </div>
    </footer>
  );
}