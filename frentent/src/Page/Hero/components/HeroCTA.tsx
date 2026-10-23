"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { fadeIn, EASE_OUT } from "@/src/Page/Hero/lib/variants";

function MagneticButton({
  children,
  href,
  className,
  primary = false,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  primary?: boolean;
}) {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    const button = buttonRef.current;
    if (!button) return;

    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <motion.a
      ref={buttonRef}
      whileHover={{
        scale: 1.05,
        boxShadow: primary
          ? "0px 0px 32px rgba(74,222,128,0.4)"
          : "0px 0px 20px rgba(255,255,255,0.1)",
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.25, ease: EASE_OUT }}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.a>
  );
}

export default function HeroCTA() {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.2 }}
      className="mt-8 flex flex-wrap items-center justify-center gap-3"
    >
      <MagneticButton
        href="/login?auth=signup"
        primary
        className="group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-lg bg-[#4ADE80] px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition-colors hover:bg-[#a3e635]"
      >
        <span className="absolute inset-0 -z-10 bg-gradient-to-r from-[#4ADE80] via-[#a3e635] to-[#4ADE80] bg-[length:200%_100%]" />
        <span className="relative z-10">Start Building Free</span>
        <svg
          viewBox="0 0 16 16"
          fill="none"
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        >
          <path
            d="M3 8h10m0 0L9 4m4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </MagneticButton>

      <MagneticButton
        href="/docs"
        className="group inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-[#FFFBF4] backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.08]"
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path
            d="M8 3v10m0 0l4-4m-4 4L4 9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
          />
          <path
            d="M2 2h12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
        View API Docs
      </MagneticButton>
    </motion.div>
  );
}
