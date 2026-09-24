"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

export const ACCENT_GRADIENT =
  "bg-gradient-to-r from-[#4ADE80] via-[#34D399] to-[#22D3EE]";
export const PANEL =
  "rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm";
export const PANEL_HOVER = "hover:border-white/20 transition-colors duration-300";

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 120, damping: 20 } },
};

export const stagger = (delay = 0.08, delayChildren = 0.05) => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: delay, delayChildren } },
});

function useInViewOnce(onEnter: (el: HTMLElement) => void, rootMargin = "0px 0px -12% 0px") {
  const stored = useRef<HTMLElement | null>(null);
  const cb = useRef(onEnter);

  useEffect(() => {
    cb.current = onEnter;
  });

  useEffect(() => {
    const el = stored.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.style.opacity = "1";
      cb.current(el);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cb.current(entry.target as HTMLElement);
            observer.unobserve(entry.target as Element);
          }
        });
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return useCallback((node: HTMLElement | null) => {
    stored.current = node;
  }, []);
}

export function GradientText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`${ACCENT_GRADIENT} bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}

export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#07070B]">
      <div className="absolute -top-40 -left-40 size-[520px] rounded-full bg-[#4ADE80]/[0.14] blur-[130px]" />
      <div className="absolute top-1/3 -right-40 size-[480px] rounded-full bg-[#22D3EE]/[0.10] blur-[130px]" />
      <div className="absolute -bottom-40 left-1/3 size-[520px] rounded-full bg-[#8B5CF6]/[0.10] blur-[130px]" />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />
    </div>
  );
}

export function Reveal({
  children,
  className = "",
  y = 28,
  delay = 0,
  duration = 0.8,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
}) {
  const triggerRef = useInViewOnce((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y },
      { autoAlpha: 1, y: 0, duration, delay, ease: "power3.out" }
    );
  });

  return (
    <div ref={triggerRef} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

export function Counter({
  to,
  prefix = "",
  suffix = "",
  duration = 1.2,
  className = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const triggerRef = useInViewOnce((el) => {
    const counter = { val: 0 };
    gsap.to(counter, {
      val: to,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(counter.val)}${suffix}`;
      },
    });
  });

  return (
    <span ref={triggerRef} className={className}>
      {`${prefix}0${suffix}`}
    </span>
  );
}

export function GrowBar({
  to,
  color = "#4ADE80",
  className = "",
  height = "h-2",
  duration = 1.2,
}: {
  to: number;
  color?: string;
  className?: string;
  height?: string;
  duration?: number;
}) {
  const barRef = useRef<HTMLDivElement>(null);

  const triggerRef = useInViewOnce(() => {
    const bar = barRef.current;
    if (!bar) return;
    gsap.to(bar, {
      width: `${Math.min(Math.max(to, 0), 100)}%`,
      duration,
      ease: "power3.inOut",
    });
  });

  return (
    <div
      ref={triggerRef}
      className={`relative w-full ${height} rounded-full bg-white/[0.06] overflow-hidden ${className}`}
    >
      <div
        ref={barRef}
        className="absolute inset-y-0 left-0 rounded-full"
        style={{
          width: "0%",
          background: `linear-gradient(90deg, ${color}55, ${color})`,
          boxShadow: `0 0 14px ${color}66`,
        }}
      />
    </div>
  );
}

export function GlowCard({
  children,
  className = "",
  glow = "74, 222, 128",
  hoverable = true,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: string;
  hoverable?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm ${
        hoverable ? "transition-all duration-300 hover:border-white/20 hover:-translate-y-0.5" : ""
      } ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent opacity-60" />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(${glow}, 0.12), transparent 60%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function StatCard({
  icon: Icon,
  label,
  value,
  prefix = "",
  suffix = "",
  accent = "#4ADE80",
  badge,
  className = "",
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  accent?: string;
  badge?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="relative">
        <div className="pointer-events-none absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <GlowCard hoverable={false} className="h-full">
          <div className="p-5 flex items-start justify-between gap-3">
            <div className="min-w-0 space-y-2.5">
              <p className="text-[13px] font-medium text-[#A3A3A3] truncate">{label}</p>
              <p className="text-[26px] font-bold tracking-tight text-[#FAFAFA] font-space-grotesk leading-none">
                {typeof value === "number" ? (
                  <Counter to={value} prefix={prefix} suffix={suffix} />
                ) : (
                  <span>{prefix}{value}{suffix}</span>
                )}
              </p>
            </div>
            <div
              className="flex size-11 shrink-0 items-center justify-center rounded-xl border"
              style={{
                backgroundColor: `${accent}14`,
                borderColor: `${accent}26`,
                boxShadow: `0 8px 24px -12px ${accent}80`,
              }}
            >
              <Icon className="size-5" style={{ color: accent }} />
            </div>
          </div>
          <div
            className="mx-5 h-[3px] rounded-full"
            style={{
              background: `linear-gradient(90deg, ${accent}, transparent)`,
              boxShadow: `0 0 12px ${accent}55`,
            }}
          />
          {badge && (
            <div className="px-5 py-3 flex items-center gap-1.5">
              <span
                className="text-[10px] font-semibold uppercase tracking-wider rounded-full px-2 py-0.5"
                style={{ color: accent, backgroundColor: `${accent}14` }}
              >
                {badge}
              </span>
            </div>
          )}
        </GlowCard>
      </div>
    </div>
  );
}

export function DashHeader({
  title,
  subtitle,
  icon: Icon,
  accent = "#4ADE80",
  right,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ElementType;
  accent?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div className="space-y-2">
        {Icon && (
          <div
            className="inline-flex size-10 items-center justify-center rounded-xl border"
            style={{
              backgroundColor: `${accent}14`,
              borderColor: `${accent}26`,
              boxShadow: `0 8px 24px -12px ${accent}80`,
            }}
          >
            <Icon className="size-5" style={{ color: accent }} />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#FAFAFA] font-space-grotesk leading-none">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1.5 text-sm text-[#A3A3A3]">{subtitle}</p>
          )}
        </div>
        <div
          className="h-[3px] w-16 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${accent}, transparent)`,
            boxShadow: `0 0 12px ${accent}55`,
          }}
        />
      </div>
      {right && <div className="flex items-center gap-2 flex-wrap">{right}</div>}
    </div>
  );
}

export function PageIntro({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={stagger(0.08, 0.1)}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}