"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Brackets, Sparkles, ScrollText, CircleDot, ArrowUpRight, MessageCircle, LifeBuoy, Headset } from "lucide-react";
import { SubmitTicketDialog } from "./SubmitTicketDialog";
import { SupportHeader } from "./SupportHeader"; 
 import { Reveal } from "@/src/Components/dashboard/ui";
import { TicketList } from "./TicketList";
import { SectionLabel } from "./SectionLabel";
import { FAQSection } from "./FAQSection";
import { useRouter } from "next/navigation";


 export function SupportContent() {
  const [dialogOpen, setDialogOpen] = useState(false);
    const router = useRouter();

  const quickActions = [
    {
      label: "Create a Ticket",
      sub: "Report a bug or request a feature",
      icon: MessageCircle,
      onClick: (open: (v: boolean) => void) => open(true),
      hint: "⌘K",
    },
    {
      label: "Browse FAQs",
      sub: "Quick answers to common questions",
      icon: LifeBuoy,
      onClick: () =>
        document
          .getElementById("faq-section")
          ?.scrollIntoView({ behavior: "smooth" }),
      hint: "↓",
    },
    {
      label: "Support Team",
      sub: "Direct help from the dev team",
      icon: Headset,
      onClick: () => {
        router.push("https://api.whatsapp.com/send/?phone=916377047189&text&type=phone_number&app_absent=0");
      },
      hint: "→",
    },
  ];


const INK = "#FFFBF4";
const ACCENT = "#4ADE80";

  const trigger = (fn: (open: (v: boolean) => void) => void) =>
    fn(setDialogOpen);

  return (
    <>
      <div className="space-y-10">
        {/* ─────────────────────── hero header ─────────────────────── */}
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08]">
            {/* dotted texture — same accent, low opacity */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(${ACCENT}22 1px, transparent 1px)`,
                backgroundSize: "22px 22px",
                opacity: 0.5,
              }}
            />

            {/* top hairline */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${ACCENT}80, transparent)`,
              }}
            />

            <div className="relative z-10 p-6 sm:p-10">
              {/* brand row */}
              <div className="mb-6 flex items-center gap-2.5">
                <span
                  className="flex size-9 items-center justify-center rounded-xl border"
                  style={{
                    borderColor: `${ACCENT}40`,
                    background: `${ACCENT}14`,
                    color: ACCENT,
                  }}
                >
                  <Brackets className="size-4" />
                </span>
                <span
                  className="font-space-grotesk text-sm font-semibold tracking-tight"
                  style={{ color: INK }}
                >
                  Support Console
                </span>

                <span
                  className="ml-auto inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider"
                  style={{
                    borderColor: `${ACCENT}40`,
                    background: `${ACCENT}10`,
                    color: ACCENT,
                  }}
                >
                  <motion.span
                    animate={{ opacity: [1, 0.35, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className="inline-block size-1.5 rounded-full"
                    style={{ background: ACCENT }}
                  />
                  online
                </span>
              </div>

              <SupportHeader onCreateClick={() => setDialogOpen(true)} />
            </div>

            {/* bottom hairline */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${ACCENT}55, transparent)`,
              }}
            />
          </div>
        </Reveal>

      
        <Reveal delay={0.08}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {quickActions.map((action, i) => {
              const Icon = action.icon;
              return (
                <Reveal key={action.label} delay={0.1 + i * 0.06} y={16}>
                  <motion.button
                    type="button"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => trigger(action.onClick)}
                    className="group relative w-full cursor-pointer overflow-hidden rounded-2xl border p-5 text-left transition-colors"
                    style={{
                      borderColor: "rgba(255,251,244,0.10)",
                      background: "rgba(255,251,244,0.02)",
                    }}
                  >
              
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(240px 120px at 0% 0%, ${ACCENT}1a, transparent 60%)`,
                      }}
                    />

                    <div className="relative flex items-start justify-between">
                      <span
                        className="flex size-10 items-center justify-center rounded-xl border"
                        style={{
                          borderColor: `${ACCENT}33`,
                          background: `${ACCENT}12`,
                          color: ACCENT,
                        }}
                      >
                        <Icon className="size-5" />
                      </span>

                      <span
                        className="font-mono text-[10px] opacity-40 transition-opacity group-hover:opacity-80"
                        style={{ color: INK }}
                      >
                        {action.hint}
                      </span>
                    </div>

                    <p
                      className="mt-3 font-space-grotesk text-sm font-semibold"
                      style={{ color: INK }}
                    >
                      {action.label}
                    </p>
                    <p
                      className="mt-1 text-xs leading-relaxed"
                      style={{ color: "rgba(255,251,244,0.55)" }}
                    >
                      {action.sub}
                    </p>

                    <div
                      className="relative mt-4 flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider"
                      style={{ color: ACCENT }}
                    >
                      open
                      <ArrowUpRight className="size-3" />
                    </div>
                  </motion.button>
                </Reveal>
              );
            })}
          </div>
        </Reveal>

      
        <Reveal delay={0.14}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
            {/* tickets */}
            <section className="relative">
              <SectionLabel
                icon={<ScrollText className="size-3.5" />}
                title="Recent tickets"
                hint="your history"
              />
              <div
                className="rounded-2xl border p-4 sm:p-5"
                style={{
                  borderColor: "rgba(255,251,244,0.08)",
                  background: "rgba(255,251,244,0.015)",
                }}
              >
                <TicketList />
              </div>
            </section>

            {/* faq */}
            <section className="relative" id="faq-section">
              <SectionLabel
                icon={<CircleDot className="size-3.5" />}
                title="Knowledge base"
                hint="most asked"
              />
              <div
                className="rounded-2xl border p-4 sm:p-5"
                style={{
                  borderColor: "rgba(255,251,244,0.08)",
                  background: "rgba(255,251,244,0.015)",
                }}
              >
                <FAQSection />
              </div>
            </section>
          </div>
        </Reveal>

      
        <Reveal delay={0.2}>
          <div
            className="flex flex-col items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-xs sm:flex-row"
            style={{
              borderColor: "rgba(255,251,244,0.08)",
              background: "rgba(255,251,244,0.015)",
              color: "rgba(255,251,244,0.6)",
            }}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="size-3.5" style={{ color: ACCENT }} />
              Average first reply&nbsp;
              <span
                className="font-mono font-semibold"
                style={{ color: INK }}
              >
                under 6h
              </span>
            </span>

            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider">
              <span style={{ color: ACCENT }}>●</span>
              All systems operational
            </span>
          </div>
        </Reveal>
      </div>

      <SubmitTicketDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}