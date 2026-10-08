"use client";

import { useRef, type ReactNode } from "react";
import { itemVariants } from "../../AddNewProject";
import { motion, type Variants } from "framer-motion";
import gsap from "gsap";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  GitBranch,
  Globe,
  Info,
  ArrowUpRight,
  Check,
  Link2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { glassInput } from "../data";


const ACCENT = {
  title: "#FF8A4C",
  description: "#8B93FF",
  liveDemo: "#7FBF97",
  github: "#A78BFA",
} as const;

const DESC_MAX = 280;


const seeded = (seed: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const fieldVariants: Variants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 10 + seeded(i) * 6,
    rotate: seeded(i + 1) * 0.6 - 0.3,
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      delay: 0.06 * i + seeded(i + 2) * 0.03,
      duration: 0.45 + seeded(i + 3) * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const letterVariants: Variants = {
  hidden: (i: number) => ({ opacity: 0, y: 5 + seeded(i) * 4 }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.015 * i, duration: 0.25, ease: "easeOut" },
  }),
};


function FieldLabel({ text }: { text: string }) {
  return (
    <span className="inline-flex">
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={letterVariants}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}


function useFocusGlow<T extends HTMLDivElement>(color: string) {
  const ref = useRef<T>(null);

  const onFocus = () => {
    if (!ref.current) return;
    gsap.killTweensOf(ref.current);
    gsap.to(ref.current, {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: "elastic.out(1, 0.55)",
    });
  };

  const onBlur = () => {
    if (!ref.current) return;
    gsap.killTweensOf(ref.current);
    gsap.to(ref.current, {
      opacity: 0,
      scale: 0.92,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const glow = (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute -inset-px scale-[0.92] rounded-xl opacity-0"
      style={{
        boxShadow: `0 0 0 1px ${color}66, 0 0 22px 3px ${color}33`,
      }}
    />
  );

  return { onFocus, onBlur, glow };
}

function SectionHeader({
  label,
  count,
}: {
  label: string;
  count?: string;
}) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="h-px flex-1 bg-white/[0.06]" />
      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9A96A6]">
        {label}
      </span>
      {count && (
        <span className="font-mono text-[10px] text-[#6B6B6B]">{count}</span>
      )}
      <span className="h-px w-3 bg-white/[0.06]" />
    </div>
  );
}

function FieldShell({
  icon,
  accent,
  label,
  right,
  children,
}: {
  icon: ReactNode;
  accent: string;
  label: string;
  right?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="group/field relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.12]">
    
      <span
        aria-hidden
        className="absolute top-4 bottom-4 left-0 w-[2px] rounded-r-full transition-all duration-300 group-focus-within/field:top-2 group-focus-within/field:bottom-2 group-focus-within/field:w-[3px]"
        style={{
          background: `linear-gradient(180deg, ${accent}, transparent)`,
          opacity: 0.75,
        }}
      />

      <div className="mb-3 flex items-center gap-2">
        <span
          className="flex size-6 items-center justify-center rounded-md"
          style={{ background: `${accent}1a`, color: accent }}
        >
          {icon}
        </span>

        <Label className="text-sm font-medium text-[#F4F1EA]">
          <FieldLabel text={label} />
        </Label>

        {right && <div className="ml-auto">{right}</div>}
      </div>

      {children}
    </div>
  );
}

function DomainChip({ url }: { url: string }) {
  if (!url.trim()) return null;
  let host: string;

  try {
    host = new URL(
      url.startsWith("http") ? url : `https://${url}`
    ).hostname;
  } catch {
    return null;
  }

  return (
    <Badge className="gap-1 border border-[#7FBF97]/25 bg-[#7FBF97]/10 text-[9px] font-normal text-[#7FBF97]">
      <Link2 className="size-2.5" />
      {host}
    </Badge>
  );
}

function SetChip({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <Badge className="gap-1 border border-[#4ADE80]/25 bg-[#4ADE80]/10 text-[9px] font-normal text-[#4ADE80]">
      <Check className="size-2.5" />
      set
    </Badge>
  );
}


export const ProjectDetailsSection = ({
  title,
  setTitle,
  description,
  setDescription,
  liveDemo,
  setLiveDemo,
  github,
  setGithub,
  isPending,
}: {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  liveDemo: string;
  setLiveDemo: (value: string) => void;
  github: string;
  setGithub: (value: string) => void;
  isPending: boolean;
}) => {
  const titleGlow = useFocusGlow(ACCENT.title);
  const descriptionGlow = useFocusGlow(ACCENT.description);
  const liveDemoGlow = useFocusGlow(ACCENT.liveDemo);
  const githubGlow = useFocusGlow(ACCENT.github);

  const filledCount =
    (title.trim() ? 1 : 0) +
    (description.trim() ? 1 : 0) +
    (liveDemo.trim() ? 1 : 0) +
    (github.trim() ? 1 : 0);
  const requiredCount = (title.trim() ? 1 : 0) + (description.trim() ? 1 : 0);
  const total = 4;

  const descLen = description.length;
  const descTone =
    descLen > DESC_MAX
      ? "text-[#F87171]"
      : descLen > DESC_MAX * 0.8
        ? "text-[#FACC15]"
        : "text-[#6B6B6B]";

  return (
    <motion.div variants={itemVariants} className="space-y-5">
 
      <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
        <span className="flex size-8 items-center justify-center rounded-lg border border-[#FF8A4C]/25 bg-[#FF8A4C]/10">
          <FileText className="size-3.5 text-[#FF8A4C]" />
        </span>

        <div className="flex-1">
          <p className="text-[13px] font-semibold text-[#F4F1EA]">
            Project details
          </p>
          <p className="text-[11px] text-[#6B6B6B]">
            What it is, and where to find it
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i < filledCount ? "w-5" : "w-1.5",
                i < requiredCount
                  ? "bg-[#4ADE80]"
                  : i < filledCount
                    ? "bg-[#4ADE80]/40"
                    : "bg-white/10"
              )}
            />
          ))}
        </div>

        <span className="ml-1 font-mono text-[10px] text-[#6B6B6B]">
          {filledCount}/{total}
        </span>
      </div>

     
      <div>
        <SectionHeader label="Identity" count="required" />

        <div className="space-y-3">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fieldVariants}
          >
            <FieldShell
              icon={<FileText className="size-3" />}
              accent={ACCENT.title}
              label="Project title"
              right={
                <div className="flex items-center gap-1.5">
                  <SetChip show={!!title.trim()} />
                  
                </div>
              }
            >
              <div className="relative">
                {titleGlow.glow}
                <Input
                  placeholder="My Awesome Project"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onFocus={titleGlow.onFocus}
                  onBlur={titleGlow.onBlur}
                  disabled={isPending}
                  className={cn(glassInput, "relative z-10")}
                />
              </div>
            </FieldShell>
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fieldVariants}
          >
            <FieldShell
              icon={<Info className="size-3" />}
              accent={ACCENT.description}
              label="Description"
              right={                
                <span className={cn("font-mono text-[10px] tabular-nums", descTone)}>
                  {descLen}/{DESC_MAX}
                  <SetChip show={!!description.trim()} />
                </span>
              }
            >
              <div className="relative">
                {descriptionGlow.glow}
                <Textarea
                  placeholder="A brief description of your project..."
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onFocus={descriptionGlow.onFocus}
                  onBlur={descriptionGlow.onBlur}
                  disabled={isPending}
                  maxLength={DESC_MAX}
                  className={cn(glassInput, "relative z-10 resize-none")}
                />
              </div>
            </FieldShell>
          </motion.div>
        </div>
      </div>

   
      <div>
        <SectionHeader label="Links" count="optional" />

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fieldVariants}
          >
            <FieldShell
              icon={<Globe className="size-3" />}
              accent={ACCENT.liveDemo}
              label="Live demo URL"
              right={<SetChip show={!!liveDemo.trim()} />}
            >
              <div className="relative">
                {liveDemoGlow.glow}
                <Input
                  placeholder="https://myproject.vercel.app"
                  value={liveDemo}
                  onChange={(e) => setLiveDemo(e.target.value)}
                  onFocus={liveDemoGlow.onFocus}
                  onBlur={liveDemoGlow.onBlur}
                  disabled={isPending}
                  className={cn(glassInput, "relative z-10")}
                />
              </div>

              {liveDemo.trim() && (
                <a
                  href={
                    liveDemo.startsWith("http")
                      ? liveDemo
                      : `https://${liveDemo}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-[11px] text-[#7FBF97]/80 transition-colors hover:text-[#7FBF97]"
                >
                  Open in new tab
                  <ArrowUpRight className="size-3" />
                </a>
              )}
            </FieldShell>
          </motion.div>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fieldVariants}
          >
            <FieldShell
              icon={<GitBranch className="size-3" />}
              accent={ACCENT.github}
              label="GitHub URL"
              right={<SetChip show={!!github.trim()} />}
            >
              <div className="relative">
                {githubGlow.glow}
                <Input
                  placeholder="https://github.com/user/repo"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  onFocus={githubGlow.onFocus}
                  onBlur={githubGlow.onBlur}
                  disabled={isPending}
                  className={cn(glassInput, "relative z-10")}
                />
              </div>

              {github.trim() && (
                <a
                  href={github.startsWith("http") ? github : `https://${github}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-[11px] text-[#A78BFA]/80 transition-colors hover:text-[#A78BFA]"
                >
                  View repository
                  <ArrowUpRight className="size-3" />
                </a>
              )}
            </FieldShell>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};