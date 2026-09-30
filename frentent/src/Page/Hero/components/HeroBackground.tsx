"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroBackground() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.to("[data-orb='a']", {
          yPercent: 40,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to("[data-orb='b']", {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to("[data-orb='c']", {
          yPercent: 25,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }, el);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#0A0A0A]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:68px_68px] [mask-image:radial-gradient(ellipse_62%_55%_at_50%_0%,#000_45%,transparent_100%)]" />

      <div
        data-orb="a"
        className="absolute -top-40 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[#4ADE80]/[0.12] blur-[140px]"
      />
      <div
        data-orb="b"
        className="absolute top-1/4 -left-40 h-[420px] w-[420px] rounded-full bg-[#a3e635]/[0.07] blur-[130px]"
      />
      <div
        data-orb="c"
        className="absolute -right-40 bottom-0 h-[480px] w-[480px] rounded-full bg-[#4ADE80]/[0.06] blur-[140px]"
      />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}