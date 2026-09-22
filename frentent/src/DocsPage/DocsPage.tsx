"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Copy,
  Lock,
  Terminal,
} from "lucide-react";

import { ScrollReveal, StaggerGrid, StaggerItem } from "@/src/lib/animations";
import {
  docNav,
  docOptimize,
  docSections,
  docTypePhrases,
  type DocBlock,
  type DocNavItem,
  type DocSection,
  type EndpointItem,
  type ErrorItem,
  type FieldRow,
  type HttpMethod,
  type StepItem,
} from "./lib/data";

gsap.registerPlugin(ScrollTrigger);



const FALLBACK_PHRASES = ["Typed docs.", "Live endpoints."];

const METHOD_STYLES: Record<HttpMethod, string> = {
  GET: "border-[#4ADE80]/30 bg-[#4ADE80]/15 text-[#4ADE80]",
  POST: "border-[#60A5FA]/30 bg-[#60A5FA]/15 text-[#60A5FA]",
  PATCH: "border-[#FACC15]/30 bg-[#FACC15]/15 text-[#FACC15]",
  DELETE: "border-[#F87171]/30 bg-[#F87171]/15 text-[#F87171]",
};



function CodeBlock({
  id,
  title,
  language,
  code,
  copied,
  onCopy,
}: {
  id: string;
  title: string;
  language: string;
  code: string;
  copied: string;
  onCopy: (id: string, code: string) => void;
}) {
  const isCopied = copied === id;
  const lines = code.split("\n");

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-[#0D0D0D]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-3 py-2.5 sm:px-4">
        <span className="flex min-w-0 items-center gap-2 font-mono text-xs text-[#D8CFBC]">
          <Terminal className="size-3.5 shrink-0 text-[#4ADE80]" />
          <span className="truncate">{title}</span>
        </span>

        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-[#8A8578] sm:inline-block">
            {language}
          </span>

          <motion.button
            type="button"
            onClick={() => onCopy(id, code)}
            whileTap={{ scale: 0.9 }}
            aria-label={isCopied ? "Copied" : "Copy code"}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 px-2 py-1 text-xs text-[#D8CFBC] transition-colors hover:border-white/20 hover:text-[#FFFBF4]"
          >
            {isCopied ? (
              <Check className="size-3.5 text-[#4ADE80]" />
            ) : (
              <Copy className="size-3.5" />
            )}
            <span className="hidden sm:inline">
              {isCopied ? "Copied" : "Copy"}
            </span>
          </motion.button>
        </div>
      </div>

      <div className="overflow-x-auto px-3 py-4 sm:px-4">
        <pre className="space-y-1.5 font-mono text-[12px] leading-6 sm:text-[13px]">
          {lines.map((line, index) => (
            <div
              key={index}
              className={`doc-line whitespace-pre ${
                line.trim().startsWith("#")
                  ? "text-[#4ADE80]/70"
                  : "text-[#D8CFBC]"
              }`}
            >
              {line.length > 0 ? line : " "}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}



function EndpointRow({ item }: { item: EndpointItem }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#141414] p-3.5 transition-colors hover:border-white/20 sm:p-4">
      <span
        className={`mt-0.5 shrink-0 rounded-md border px-2 py-0.5 font-mono text-[10px] font-semibold ${METHOD_STYLES[item.method]}`}
      >
        {item.method}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <code className="break-all font-mono text-[13px] text-[#FFFBF4]">
            {item.path}
          </code>

          {item.auth && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-md border border-[#FACC15]/20 bg-[#FACC15]/10 px-1.5 py-0.5 text-[9px] text-[#FACC15]">
              <Lock className="size-2.5" />
              Auth
            </span>
          )}
        </div>

        <p className="mt-1 text-xs leading-relaxed text-[#8A8578]">
          {item.description}
        </p>
      </div>
    </div>
  );
}


function FieldsTable({ title, rows }: { title: string; rows: FieldRow[] }) {
  return (
    <div className="mt-6">
      <h3 className="mb-3 text-sm font-semibold text-[#FFFBF4] sm:text-base">
        {title}
      </h3>

      <div className="overflow-hidden rounded-xl border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-[#141414]">
                {["Field", "Type", "Required"].map((head) => (
                  <th
                    key={head}
                    className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-[#8A8578]"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {rows.map((row) => (
                <tr
                  key={row.field}
                  className="transition-colors hover:bg-white/[0.02]"
                >
                  <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs text-[#4ADE80]">
                    {row.field}
                  </td>
                  <td className="px-4 py-2.5 text-xs text-[#D8CFBC]">
                    {row.type}
                  </td>
                  <td className="px-4 py-2.5">
                    {row.required ? (
                      <span className="inline-block rounded-md border border-[#F87171]/20 bg-[#F87171]/10 px-2 py-0.5 text-[9px] text-[#F87171]">
                        Required
                      </span>
                    ) : (
                      <span className="inline-block rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] text-[#8A8578]">
                        Optional
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}



function ErrorGrid({ items }: { items: ErrorItem[] }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
      {items.map((err) => (
        <div
          key={err.code}
          className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#141414] p-3"
        >
          <span className="shrink-0 rounded-md border border-[#F87171]/20 bg-[#F87171]/10 px-2 py-0.5 font-mono text-[10px] text-[#F87171]">
            {err.code}
          </span>

          <div className="min-w-0">
            <p className="text-xs font-medium text-[#FFFBF4]">{err.label}</p>
            <p className="text-[11px] leading-relaxed text-[#8A8578]">
              {err.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}


function StepList({ items }: { items: StepItem[] }) {
  return (
    <div className="mt-6 space-y-2.5">
      {items.map((step) => (
        <div
          key={step.step}
          className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#141414] p-3.5"
        >
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#4ADE80]/15">
            <span className="text-[11px] font-bold text-[#4ADE80]">
              {step.step}
            </span>
          </span>

          <div className="min-w-0">
            <p className="text-sm font-medium text-[#FFFBF4]">{step.title}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-[#8A8578]">
              {step.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}



function BulletList({ items }: { items: string[] }) {
  return (
    <StaggerGrid className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
      {items.map((bullet) => (
        <StaggerItem key={bullet}>
          <div className="h-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-[#D8CFBC]">
            {bullet}
          </div>
        </StaggerItem>
      ))}
    </StaggerGrid>
  );
}



function InlineCta({ href, label }: { href: string; label: string }) {
  return (
    <div className="mt-6">
      <Link
        href={href}
        className="inline-flex items-center gap-2 rounded-lg bg-[#4ADE80] px-5 py-2.5 text-sm font-semibold text-[#0A0A0A] transition-colors hover:bg-[#4ADE80]/90"
      >
        {label}
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}



function BlockRenderer({
  block,
  sectionId,
  copied,
  onCopy,
}: {
  block: DocBlock;
  sectionId: string;
  copied: string;
  onCopy: (id: string, code: string) => void;
}) {
  switch (block.kind) {
    case "text":
      return (
        <p className="mt-4 text-[15px] leading-relaxed text-[#D8CFBC]">
          {block.body}
        </p>
      );

    case "code":
      return (
        <CodeBlock
          id={`${sectionId}-${block.title}`}
          title={block.title}
          language={block.language}
          code={block.code}
          copied={copied}
          onCopy={onCopy}
        />
      );

    case "endpoints":
      return (
        <div className="mt-6 space-y-3">
          {block.items.map((item) => (
            <EndpointRow
              key={`${item.method}-${item.path}`}
              item={item}
            />
          ))}
        </div>
      );

    case "fields":
      return <FieldsTable title={block.title} rows={block.rows} />;

    case "errors":
      return <ErrorGrid items={block.items} />;

    case "steps":
      return <StepList items={block.items} />;

    case "bullets":
      return <BulletList items={block.items} />;

    case "cta":
      return <InlineCta href={block.href} label={block.label} />;

    default:
      return null;
  }
}



export default function DocsPage() {
  const typePhrases =
    docTypePhrases.length > 0 ? docTypePhrases : FALLBACK_PHRASES;

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [copied, setCopied] = useState("");
  const codeRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const phrase = typePhrases[phraseIndex] ?? "";
    let timer: number | undefined;

    if (!deleting && display.length < phrase.length) {
      timer = window.setTimeout(
        () => setDisplay(phrase.slice(0, display.length + 1)),
        45
      );
    } else if (!deleting && display.length === phrase.length) {
      timer = window.setTimeout(() => setDeleting(true), 1750);
    } else if (deleting && display.length > 0) {
      timer = window.setTimeout(
        () => setDisplay(phrase.slice(0, display.length - 1)),
        26
      );
    } else {
      setDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % typePhrases.length);
    }

    return () => window.clearTimeout(timer);
  }, [display, deleting, phraseIndex, typePhrases]);

  
  useEffect(() => {
    if (!codeRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".doc-line").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -12 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, codeRef);

    return () => ctx.revert();
  }, []);

  
  const handleCopy = useCallback((id: string, code: string) => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;

    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(id);
        window.setTimeout(() => setCopied(""), 1600);
      })
      .catch(() => {
        
      });
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0A0A0A] text-[#FFFBF4]">
      {/* ambient background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1 }}
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(840px 420px at 18% -10%, rgba(74,222,128,0.10), transparent 62%), radial-gradient(560px 320px at 96% 10%, rgba(255,255,255,0.04), transparent 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-4 pt-20 sm:px-6 sm:pt-24">
      
        <ScrollReveal direction="up">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#4ADE80]/25 bg-[#4ADE80]/10 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.28em] text-[#4ADE80] sm:text-xs">
            <BookOpen className="size-3.5" />
            Docs
          </span>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.08}>
          <div className="mt-5 flex min-h-[4.5rem] items-center gap-2 text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            <span className="text-[#4ADE80]">{"$"}</span>
            <span className="break-words">
              {display}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.85 }}
                className="ml-1 inline-block h-6 w-[3px] -translate-y-1 bg-[#4ADE80] align-middle sm:h-8 md:h-9"
              />
            </span>
          </div>

          <p className="mt-3 font-mono text-xs text-[#4ADE80]/70 sm:text-sm">
            ~ {typePhrases[phraseIndex] ?? ""}
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.16}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#D8CFBC] sm:text-lg">
            Every endpoint, typed and documented on one page — boring docs,
            banished.
          </p>
        </ScrollReveal>

        
        <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10">
         
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ScrollReveal direction="left">
              <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <p className="px-2 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#4ADE80]">
                  Sections
                </p>

                <nav className="flex gap-1 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-col lg:overflow-visible lg:pb-0">
                  {docNav.map((item: DocNavItem) => {
                    const Icon = item.icon;
                    return (
                      <motion.a
                        key={item.id}
                        href={`#${item.id}`}
                        whileHover={{ x: 4 }}
                        className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm text-[#D8CFBC] transition-colors hover:bg-white/[0.04] hover:text-[#FFFBF4] lg:shrink"
                      >
                        <Icon className="size-4 shrink-0 text-[#4ADE80]" />
                        {item.title}
                      </motion.a>
                    );
                  })}
                </nav>
              </aside>
            </ScrollReveal>
          </div>

          {/* ----------------------------- sections ----------------------------- */}
          <div ref={codeRef} className="flex min-w-0 flex-col gap-8">
            {docSections.map((section: DocSection) => {
              const Icon = section.icon;

              return (
                <motion.section
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 md:p-8"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-[#4ADE80]/25 bg-[#4ADE80]/10 text-[#4ADE80]">
                      <Icon className="size-4" />
                    </span>

                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-[0.25em] text-[#4ADE80]">
                        {section.kicker}
                      </p>
                      <h2 className="text-lg font-bold leading-snug text-[#FFFBF4] sm:text-xl md:text-2xl">
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  <p className="mt-4 text-[15px] leading-relaxed text-[#D8CFBC]">
                    {section.body}
                  </p>

                  {section.blocks.map((block, index) => (
                    <BlockRenderer
                      key={`${section.id}-${index}`}
                      block={block}
                      sectionId={section.id}
                      copied={copied}
                      onCopy={handleCopy}
                    />
                  ))}
                </motion.section>
              );
            })}
          </div>
        </div>

        {/* ============================== optimize ============================== */}
        <div className="mt-16">
          <ScrollReveal direction="up">
            <StaggerGrid className="grid gap-6 md:grid-cols-3 md:gap-8">
              {docOptimize.map((optimize) => {
                const Icon = optimize.icon;
                return (
                  <StaggerItem key={optimize.title}>
                    <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                      <Icon className="size-5 text-[#4ADE80]" />
                      <h3 className="mt-3 font-semibold text-[#FFFBF4]">
                        {optimize.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#D8CFBC]">
                        {optimize.desc}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerGrid>
          </ScrollReveal>
        </div>

     
        <div className="mt-16">
          <ScrollReveal direction="up" delay={0.05}>
            <div className="relative overflow-hidden rounded-3xl border border-[#4ADE80]/20 bg-gradient-to-br from-[#121212] to-[#0A0A0A] p-8 text-center sm:p-10 md:p-14">
              <motion.div
                className="pointer-events-none absolute -top-16 left-1/2 h-40 w-[460px] max-w-full -translate-x-1/2 rounded-full opacity-60 blur-3xl"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ repeat: Infinity, duration: 4 }}
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(74,222,128,0.3), transparent)",
                }}
              />

              <p className="relative mx-auto mb-6 max-w-md text-sm leading-relaxed text-[#D8CFBC] sm:text-base">
                Start building with the playground — typed endpoints, live
                responses, one command to ship.
              </p>

              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="relative inline-block"
              >
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#4ADE80] px-6 py-3.5 text-sm font-semibold text-[#0A0A0A] shadow-[0_0_0_rgba(74,222,128,0)] transition-shadow hover:shadow-[0_0_40px_rgba(74,222,128,0.35)] sm:px-7"
                >
                  Start building
                  <ArrowUpRight className="size-4" />
                </Link>
              </motion.div>
            </div>
            </ScrollReveal>
          </div>
        </div>
     
    </main>
  );
}