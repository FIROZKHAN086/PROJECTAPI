"use client";

import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ChevronDown,
  ArrowRight,
  Brackets,
} from "lucide-react";
import {
  ScrollReveal,
  StaggerGrid,
  StaggerItem,
  ScaleIn,
  ParallaxSection,
  LineDraw,
} from "@/src/lib/animations";

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

export default function FAQFooterPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans antialiased text-[#FFFBF4]">
      <main className="mx-auto flex w-full max-w-[1200px] flex-col px-6 py-16">
        {/* FAQ Section */}
        <section className="flex flex-col items-center">
          <ScrollReveal direction="up" delay={0}>
            <h2
              className="text-center text-4xl font-bold tracking-tight text-[#FFFBF4] md:text-5xl"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Questions, answered.
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15} distance={30}>
            <div className="mt-10 w-full max-w-[720px] overflow-hidden rounded-2xl border border-white/10 bg-transparent">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`bg-[#141414] ${
                    index < faqs.length - 1 ? "border-b border-white/10" : ""
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/5 cursor-pointer"
                    aria-expanded={openIndex === index}
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

          <ScrollReveal direction="up" delay={0.2}>
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
      </main>

      {/* Final CTA Band */}
      <ParallaxSection speed={0.05}>
        <section className="mt-16 w-full bg-[#141414] py-16">
          <div className="mx-auto flex max-w-[1200px] flex-col items-center px-6 text-center">
            <ScrollReveal direction="up" delay={0}>
              <h2
                className="text-4xl font-bold tracking-tight text-[#FFFBF4] md:text-5xl"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Your projects deserve a real home.
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <p className="mt-4 max-w-[560px] text-lg leading-relaxed text-[#D8CFBC]">
                Set up your first API endpoint in under 5 minutes.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2}>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 30px rgba(251,247,244,0.2)",
                }}
                whileTap={{ scale: 0.97 }}
                className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-[#FBF7F4] px-8 text-sm font-semibold text-[#0A0A0A] transition-colors hover:bg-[#FBF7F4]/90 cursor-pointer"
              >
                Get Started Free
              </motion.button>
            </ScrollReveal>
          </div>
        </section>
      </ParallaxSection>
    </div>
  );
}
