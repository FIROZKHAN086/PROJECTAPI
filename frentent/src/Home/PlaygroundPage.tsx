"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Brackets, Check, Copy, Code2, Rocket, Sparkles, Terminal, Zap, Cpu, GitBranch, Layers, ShieldCheck } from "lucide-react";
import { ScrollReveal, StaggerGrid, StaggerItem, CharReveal, AnimatedCounter } from "@/src/lib/animations";

const typePhrases = [
  "Try the playground. Build it live.",
  "Test endpoints with zero setup.",
  "Ship your first template in minutes.",
];

const glowVariants = {
  idle: { opacity: 0, scale: 0.7 },
  hover: { opacity: 1, scale: 1.2 },
};

const codeLines = [
  { text: "const api = await ProjectAPI.create()", color: "text-[#FFFBF4]" },
  { text: 'api.playground("portfolio-cms")', color: "text-[#4ADE80]" },
  { text: "// live endpoint is ready → try it now", color: "text-[#D8CFBC]/60" },
];

const templateCards = [
  {
    icon: Terminal,
    title: "API Playground",
    desc: "Test your endpoints live with a cool request builder.",
    tag: "Workflow",
  },
  {
    icon: Layers,
    title: "Portfolio CMS",
    desc: "Showcase your work with a typed content model.",
    tag: "Templates",
  },
  {
    icon: GitBranch,
    title: "Versioned Docs",
    desc: "Ship documentation that evolves with your API.",
    tag: "Workflow",
  },
  {
    icon: Cpu,
    title: "Realtime Console",
    desc: "Watch requests stream in — every keystroke, live.",
    tag: "Live",
  },
  {
    icon: Zap,
    title: "Instant Deploy",
    desc: "One click from playground to production.",
    tag: "Deploy",
  },
  {
    icon: ShieldCheck,
    title: "Keys by Default",
    desc: "Scoped API keys with a cool, safe-by-design flow.",
    tag: "Security",
  },
];

const features = [
  { icon: Zap, title: "Zero-setup", desc: "No config. Start typing, it just works." },
  { icon: Code2, title: "Typed API", desc: "Full TypeScript types generated for you." },
  { icon: Rocket, title: "Ship-ready", desc: "Go from idea to deployed in one session." },
];

export default function PlaygroundPage() {
  const [display, setDisplay] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [typedLine, setTypedLine] = useState(0);

  useEffect(() => {
    const phrase = typePhrases[phraseIndex];
    let timer: number | undefined;

    if (!deleting && display.length < phrase.length) {
      timer = window.setTimeout(
        () => setDisplay(phrase.slice(0, display.length + 1)),
        44
      );
    } else if (!deleting && display.length === phrase.length) {
      timer = window.setTimeout(() => setDeleting(true), 1700);
    } else if (deleting && display.length > 0) {
      timer = window.setTimeout(
        () => setDisplay(phrase.slice(0, display.length - 1)),
        22
      );
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDeleting(false);
      setPhraseIndex((phraseIndex + 1) % typePhrases.length);
    }
    return () => window.clearTimeout(timer);
  }, [display, deleting, phraseIndex]);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setTypedLine((typedLine + 1) % (codeLines.length + 1)),
      900
    );
    return () => window.clearTimeout(timer);
  }, [typedLine]);

  const copyCode = () => {
    navigator.clipboard.writeText(codeLines.map((l) => l.text).join("\n"));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="relative">
      <section className="relative overflow-hidden bg-[#0A0A0A] py-24">
        {/* ambient glow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.55 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(720px 360px at 30% -10%, rgba(74,222,128,0.14), transparent 65%), radial-gradient(640px 320px at 90% 20%, rgba(255,255,255,0.04), transparent 60%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-[1200px] px-6">
          {/* ---- Typewriter hero ---- */}
          <ScrollReveal className="mb-16 max-w-3xl">
            <div className="flex flex-col gap-5">
              <motion.div
                whileHover={{ x: 6 }}
                className="flex w-fit items-center gap-2 rounded-full border border-[#4ADE80]/25 bg-[#4ADE80]/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.28em] text-[#4ADE80]"
              >
                <Sparkles className="size-3.5" />
                Playground
              </motion.div>

              <div className="flex min-h-[3rem] items-center gap-2 text-3xl font-semibold tracking-tight text-[#FFFBF4] md:text-5xl">
                  <span>
                  {display}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="ml-0.5 inline-block h-6 w-[3px] translate-y-0.5 bg-[#4ADE80] md:h-8"
                  />
                </span>
              </div>

              <p className="text-lg leading-relaxed text-[#D8CFBC]">
                A playground where ideas become endpoints. Try the live
                terminal, test a request builder, and see exactly what your
                users get to experience — before you ship a single line.
              </p>
            </div>
          </ScrollReveal>

          {/* ---- Glass terminal mock ---- */}
          <ScrollReveal delay={0.1}>
            <motion.div
              variants={glowVariants}
              initial="idle"
              whileHover="hover"
              transition={{ duration: 0.3 }}
              className="absolute -inset-px rounded-2xl bg-[#4ADE80]/10 blur-xl"
            />
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 24px 80px rgba(0,0,0,0.55), 0 0 40px rgba(74,222,128,0.08)" }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0F0F0F]"
            >
              {/* window chrome */}
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <motion.span animate={{ backgroundColor: ["#FF5F57", "#FF5F57", "#FF5F57"] }} className="size-3 rounded-full bg-[#FF5F57]" data-lettter />
                  <span className="size-3 rounded-full bg-[#FEBC2E]" />
                  <span className="size-3 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-[#D8CFBC]">
                  <Brackets className="size-3.5 text-[#4ADE80]" />
                  playground — ProjectAPI
                </div>
                <motion.button
                  onClick={copyCode}
                  whileTap={{ scale: 0.92 }}
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-[#D8CFBC] hover:text-[#FFFBF4] cursor-pointer"
                >
                  {copied ? <Check className="size-3.5 text-[#4ADE80]" /> : <Copy className="size-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </motion.button>
              </div>

              {/* code body with sequential lines + blinking cursor */}
              <div className="flex flex-col gap-4 px-5 py-6 font-mono text-sm leading-7 md:px-7 md:py-8">
                {codeLines.map((line, i) => {
                  const shown = typedLine > i;
                  if (!shown)
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-[#FFFBF4]/25">{i + 1}</span>
                        <motion.span className="size-3 rounded-sm bg-[#4ADE80]/40" />
                      </div>
                    );
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3"
                    >
                      <span className="text-[#FFFBF4]/25">{i + 1}</span>
                      <span className={line.color}>{line.text}</span>
                    </motion.div>
                  );
                })}
                <div className="flex items-center gap-3">
                  <span className="text-[#FFFBF4]/25">{codeLines.length + 1}</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="inline-block h-4 w-[2px] bg-[#4ADE80]"
                  />
                </div>
              </div>

              {/* status footer */}
              <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.02] px-5 py-3 text-xs text-[#D8CFBC]">
                <span className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[#4ADE80] shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                  Live playground active
                </span>
                <span className="font-mono">200 OK · 0ms</span>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* ---- Template / cool grid ---- */}
          <div className="mt-16">
            <ScrollReveal className="mb-8 flex items-end justify-between">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#4ADE80]">Start with a vibe</p>
                <h3 className="text-2xl font-bold text-[#FFFBF4] md:text-3xl">
                  Cool templates, ready to run.
                </h3>
              </div>
            </ScrollReveal>

            <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {templateCards.map((card) => {
                const Icon = card.icon;
                return (
                  <StaggerItem key={card.title}>
                    <motion.div
                      whileHover={{ y: -6, borderColor: "rgba(74,222,128,0.4)" }}
                      className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors"
                    >
                      {/* hover glow */}
                      <motion.div
                        variants={glowVariants}
                        initial="idle"
                        whileHover="hover"
                        className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                        style={{ background: "radial-gradient(240px 160px at 30% 0%, rgba(74,222,128,0.12), transparent 65%)" }}
                      />
                      <div className="relative flex items-start justify-between">
                        <motion.span
                          whileHover={{ rotate: -8, scale: 1.1 }}
                          className="flex size-11 items-center justify-center rounded-xl border border-[#4ADE80]/25 bg-[#4ADE80]/10 text-[#4ADE80]"
                        >
                          <Icon className="size-5" />
                        </motion.span>
                        <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-[#D8CFBC]">
                          {card.tag}
                        </span>
                      </div>
                      <div className="relative mt-auto">
                        <h4 className="flex items-center gap-1.5 text-base font-semibold text-[#FFFBF4]">
                          {card.title}
                          <ArrowUpRight className="size-4 text-[#4ADE80] opacity-0 transition-opacity group-hover:opacity-100" />
                        </h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-[#D8CFBC]">{card.desc}</p>
                      </div>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerGrid>
          </div>

          {/* ---- Feature row with animated counters ---- */}
          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <ScrollReveal key={feature.title} delay={0.08 * i}>
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#4ADE80]">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h5 className="text-base font-semibold text-[#FFFBF4]">{feature.title}</h5>
                      <p className="mt-1 text-sm text-[#D8CFBC]">{feature.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* ---- CTA ---- */}
          <ScrollReveal delay={0.1}>
            <div className="mt-24 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#121212] to-[#0A0A0A] p-10 text-center md:p-14">
              <motion.div
                className="pointer-events-none absolute -top-20 left-1/2 h-40 w-[560px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ repeat: Infinity, duration: 4 }}
                style={{ background: "radial-gradient(closest-side, rgba(74,222,128,0.25), transparent)" }}
              />
              <div className="relative">
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="inline-flex size-14 items-center justify-center rounded-2xl border border-[#4ADE80]/30 bg-[#4ADE80]/10 text-[#4ADE80]"
                >
                  <Rocket className="size-6" />
                </motion.span>
                <h3 className="mt-6 text-2xl font-bold text-[#FFFBF4] md:text-4xl">
                  Stop planning. <CharReveal text="Start building." className="text-[#4ADE80]" staggerDelay={0.03} />
                </h3>
                <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#D8CFBC]">
                  Jump into the playground, try a template, and see your
                  product come to life — the exact way your users will.
                </p>
                <motion.a
                  href="/login"
                  whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(74,222,128,0.4)" }}
                  whileTap={{ scale: 0.96 }}
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#4ADE80] px-7 py-3.5 text-sm font-semibold text-[#0A0A0A]"
                >
                  Open the playground
                  <ArrowUpRight className="size-4" />
                </motion.a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
