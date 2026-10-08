"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/src/lib/animations";
import { useRouter } from "next/navigation";

const faqs = [
  {
    question: "Do I need to know how to code to use ProjectAPI?",
    answer:
      "No. You can manage projects from the dashboard and connect them to your portfolio without writing code. If you want to customize the integration, the API is there when you need it.",
  },
  {
    question: "What frameworks does the API work with?",
    answer:
      "It works with React, Vue, Next.js, Astro, Nuxt, Svelte, and static HTML. Anything that can fetch JSON can use ProjectAPI.",
  },
  {
    question: "Is my data and media stored securely?",
    answer:
      "Yes. Your content is stored with secure media infrastructure and protected API access. We keep the experience simple while handling the security details behind the scenes.",
  },
  {
    question: "Can I use my own domain for my portfolio?",
    answer:
      "Absolutely. Custom domains are supported so your portfolio can live on your own brand. You can connect it during setup and update it later anytime.",
  },
  {
    question: "What happens to my API if I upgrade or downgrade?",
    answer:
      "Your API stays active, and your access adjusts to the plan you choose. You can upgrade or downgrade without rebuilding your portfolio.",
  },
];

const footerColumns = [
  {
    title: "Product",
    links: ["Overview", "Pricing", "API Docs", "Changelog"],
  },
  {
    title: "Developers",
    links: ["Quickstart", "SDKs", "Examples", "Status"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Contact"],
  },
];

const typePhrases = [
  "one API",
  "every framework",
  "zero maintenance",
  "everywhere at once",
];

export default function FAQFooterPage() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const [display, setDisplay] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const toggleFaq = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  /* ================= typewriter loop ================= */
  useEffect(() => {
    const phrase = typePhrases[phraseIndex];
    let timer: number | undefined;

    if (!deleting && display.length < phrase.length) {
      timer = window.setTimeout(
        () => setDisplay(phrase.slice(0, display.length + 1)),
        45
      );
    } else if (!deleting && display.length === phrase.length) {
      timer = window.setTimeout(() => setDeleting(true), 1700);
    } else if (deleting && display.length > 0) {
      timer = window.setTimeout(
        () => setDisplay(phrase.slice(0, display.length - 1)),
        22
      );
    } else {
      timer = window.setTimeout(() => {
        setDeleting(false);
        setPhraseIndex((phraseIndex + 1) % typePhrases.length);
      }, 60);
    }

    return () => window.clearTimeout(timer);
  }, [display, deleting, phraseIndex]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans text-[#FFFBF4]">
      <main className="mx-auto flex w-full max-w-[1200px] flex-col px-6 py-16">
        {/* ============ FAQ ============ */}
        <section className="mx-auto flex w-full max-w-[720px] flex-col items-center">
          <ScrollReveal direction="up">
            <h2
              className="text-center text-4xl font-bold tracking-tight text-[#FFFBF4] md:text-5xl"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Questions, answered.
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <div className="mt-10 w-full overflow-hidden rounded-2xl border border-white/10">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`bg-[#141414] ${
                    index < faqs.length - 1 ? "border-b border-white/10" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openIndex === index}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/5 cursor-pointer"
                  >
                    <span className="text-[15px] font-medium text-[#FFFBF4]">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <ChevronDown className="size-4 shrink-0 text-[#D8CFBC]" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-5 pb-4">
                          <motion.p
                            initial={{ y: -8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="max-w-[620px] text-[15px] leading-relaxed text-[#D8CFBC]"
                          >
                            {faq.answer}
                          </motion.p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.25}>
            <motion.a
              href="#"
              whileHover={{ x: 4, color: "#FFFBF4" }}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#D8CFBC] transition-colors"
            >
              View full FAQ
              <ArrowRight className="size-4" />
            </motion.a>
          </ScrollReveal>
        </section>

        {/* ============ CTA + Typewriter ============ */}
        <section className="mt-20 flex flex-col items-center text-center">
          <ScrollReveal direction="up">
            <span className="inline-flex items-center rounded-full border border-[#4ADE80]/30 bg-[#4ADE80]/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[#4ADE80]">
              <span className="relative mr-2 flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#4ADE80] opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-[#4ADE80]" />
              </span>
              Powered by a real API
            </span>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <motion.h2
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="mt-4 text-4xl font-bold tracking-tight text-[#FFFBF4] md:text-5xl"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className="sr-only">{typePhrases[phraseIndex]}</span>
              <span aria-hidden="true" className="tabular-nums">
                {display}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.9 }}
                  className="text-[#4ADE80]"
                >
                  |
                </motion.span>
              </span>
            </motion.h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <motion.button
              type="button"
              onClick={() => router.push("/login?auth=login")}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#FFFBF4] px-8 text-sm font-semibold text-[#0A0A0A] transition-colors hover:bg-[#FFFBF4]/90 cursor-pointer"
            >
              Get Started Free
              <ArrowRight className="size-4" />
            </motion.button>
          </ScrollReveal>
        </section>
      </main>

     
    </div>
  );
}
