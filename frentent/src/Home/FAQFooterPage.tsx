"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Zap,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import { ScrollReveal } from "@/src/lib/animations";
import { useRouter } from "next/navigation";

const faqs = [
  {
    question: "Do I need to manage backend servers or databases?",
    answer:
      "No. ProjectAPI fully abstracts database provisioning, edge caching, and server management. You manage your content visually from the dashboard, and we generate global REST endpoints that serve JSON to your frontend applications.",
  },
  {
    question: "Which frontend frameworks are supported?",
    answer:
      "All of them! React, Next.js (App Router & Pages Router), Astro, Vue, Nuxt, Svelte, Remix, Vite, and plain static HTML. If your application or static site generator can send an HTTP GET request, ProjectAPI works out of the box.",
  },
  {
    question: "How does image and video optimization work?",
    answer:
      "Whenever you upload media through your dashboard, our media pipeline auto-converts files to modern AVIF and WebP formats, generates responsive srcset variants, and caches them at the edge through Cloudinary and ImageKit. File size is reduced by up to 85% with zero quality loss.",
  },
  {
    question: "Can I use custom domains for my API or portfolio?",
    answer:
      "Yes. Pro and Team plans support custom domain mapping. You can serve your project API under your own brand (e.g. api.yourname.dev/v1/projects) with automated SSL certification.",
  },
  {
    question: "How fast is the global edge API response time?",
    answer:
      "Our edge caching layer runs across 300+ Points of Presence globally. Typical cache-hit latency is between 8ms and 15ms. When you update a project in your dashboard, stale cache instances are purged worldwide in under 150ms.",
  },
  {
    question: "Are my API keys and project data secure?",
    answer:
      "Yes. We support separate read-only public tokens for static frontends and secret admin keys for backend integrations. All sessions are protected with JWT authentication and strict role-based access control.",
  },
];

const typePhrases = [
  "One Dashboard. One API.",
  "Every Framework. Zero Maintenance.",
  "Ship Projects. Everywhere At Once.",
  "Built For High-Velocity Developers.",
];

export default function FAQFooterPage() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [display, setDisplay] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const toggleFaq = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  /* Typewriter Loop */
  useEffect(() => {
    const phrase = typePhrases[phraseIndex];
    let timer: number | undefined;

    if (!deleting && display.length < phrase.length) {
      timer = window.setTimeout(
        () => setDisplay(phrase.slice(0, display.length + 1)),
        45
      );
    } else if (!deleting && display.length === phrase.length) {
      timer = window.setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && display.length > 0) {
      timer = window.setTimeout(
        () => setDisplay(phrase.slice(0, display.length - 1)),
        24
      );
    } else {
      timer = window.setTimeout(() => {
        setDeleting(false);
        setPhraseIndex((phraseIndex + 1) % typePhrases.length);
      }, 70);
    }

    return () => window.clearTimeout(timer);
  }, [display, deleting, phraseIndex]);

  return (
    <div id="faq" className="bg-[#0A0A0A] font-sans text-[#FFFBF4] py-24 sm:py-32">
      <main className="mx-auto flex w-full max-w-5xl flex-col px-6">
        {/* ============ FAQ Section ============ */}
        <section className="mx-auto flex w-full max-w-3xl flex-col items-center">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFFBF4]/15 bg-white/[0.03] px-4 py-1.5 text-xs text-[#FFFBF4]/80 backdrop-blur-md">
              <HelpCircle className="h-3.5 w-3.5 text-[#4ADE80]" />
              <span className="font-mono tracking-widest uppercase text-[11px]">
                FREQUENTLY ASKED QUESTIONS
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <h2
              className="mt-6 text-center text-3xl font-bold tracking-tight text-[#FFFBF4] sm:text-4xl md:text-5xl"
              style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
            >
              Questions, answered.
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <p className="mt-3 text-center text-sm sm:text-base text-[#FFFBF4]/70">
              Everything you need to know about setting up your developer API.
            </p>
          </ScrollReveal>

          {/* Accordion List */}
          <ScrollReveal direction="up" delay={0.2} className="w-full">
            <div className="mt-12 w-full space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                      isOpen
                        ? "border-[#4ADE80]/40 bg-[#161712]/95 shadow-[0_0_20px_rgba(74,222,128,0.06)]"
                        : "border-[#FFFBF4]/10 bg-[#141510]/60 hover:border-[#FFFBF4]/20"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
                    >
                      <span className="text-sm sm:text-base font-semibold text-[#FFFBF4]">
                        {faq.question}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                          isOpen
                            ? "border-[#4ADE80]/50 bg-[#4ADE80]/15 text-[#4ADE80]"
                            : "border-[#FFFBF4]/15 bg-white/[0.04] text-[#FFFBF4]/70"
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm leading-relaxed text-[#FFFBF4]/70 border-t border-[#FFFBF4]/5">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </section>

        {/* ============ Final Launchpad CTA ============ */}
        <section className="relative mt-28 rounded-3xl border border-[#4ADE80]/30 bg-gradient-to-b from-[#161912] to-[#0E0F0A] p-8 sm:p-14 lg:p-20 text-center shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Ambient Glow Horizon */}
          <div
            className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[550px] h-[350px] rounded-full bg-[#4ADE80]/15 blur-[120px]"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#4ADE80]/40 bg-[#4ADE80]/10 px-4 py-1 text-xs font-mono font-medium uppercase tracking-[0.2em] text-[#4ADE80]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ADE80] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ADE80]" />
              </span>
              READY TO SHIP FASTER?
            </span>

            {/* Typewriter Hero Headline */}
            <h3
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#FFFBF4] max-w-3xl leading-tight"
              style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
            >
              <span>{display}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="text-[#4ADE80] ml-1"
              >
                |
              </motion.span>
            </h3>

            <p className="max-w-xl text-sm sm:text-base leading-relaxed text-[#FFFBF4]/75">
              Create your project workspace in under 30 seconds. Connect your live
              REST API to any portfolio, agency client, or showcase site today.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <motion.button
                type="button"
                onClick={() => router.push("/login")}
                whileHover={{ scale: 1.04, boxShadow: "0 0 35px rgba(74,222,128,0.4)" }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 rounded-xl bg-[#4ADE80] px-8 py-3.5 text-sm font-bold text-[#0A0A0A] shadow-[0_0_20px_rgba(74,222,128,0.25)] transition-all hover:bg-[#86efac] cursor-pointer"
              >
                <span>Start Building for Free</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>

              <motion.button
                type="button"
                onClick={() => router.push("/docs")}
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.08)" }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 rounded-xl border border-[#FFFBF4]/15 bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-[#FFFBF4] backdrop-blur-sm transition-all cursor-pointer"
              >
                <BookOpen className="h-4 w-4 text-[#FFFBF4]/70" />
                <span>Read API Documentation</span>
              </motion.button>
            </div>

            {/* Trust Footer Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-mono text-[#FFFBF4]/50">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#4ADE80]" />
                Zero credit card required
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-[#4ADE80]" />
                Sub-15ms Edge Latency
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#4ADE80]" />
                99.99% Uptime SLA
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
