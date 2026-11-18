"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";

interface Waypoint {
  id: string;
  num: string;
  label: string;
}

const WAYPOINTS: Waypoint[] = [
  { id: "hero", num: "01", label: "Vision & Overview" },
  { id: "journey", num: "02", label: "Cinematic Journey" },
  { id: "features", num: "03", label: "Bento Architecture" },
  { id: "problem-solution", num: "04", label: "Workflow Shift" },
  { id: "playground", num: "05", label: "Live API Studio" },
  { id: "pricing", num: "06", label: "Plans & Personas" },
  { id: "faq", num: "07", label: "FAQ & Launch" },
];

export default function ScrollHUD() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeId, setActiveId] = useState<string>("hero");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      if (totalH > 0) {
        setScrollPercent(Math.min(100, Math.round((window.scrollY / totalH) * 100)));
      }

      for (let i = WAYPOINTS.length - 1; i >= 0; i--) {
        const el = document.getElementById(WAYPOINTS[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveId(WAYPOINTS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ambient floating particle constellation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return () => window.removeEventListener("resize", onResize);

    const count = Math.min(32, Math.floor(width / 50));
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -0.15 - Math.random() * 0.35,
      radius: Math.random() * 1.6 + 0.6,
      baseAlpha: Math.random() * 0.3 + 0.15,
      alpha: 0,
      hue: Math.random() > 0.6 ? 142 : 45, // emerald or warm cream
    }));

    let lastScrollY = window.scrollY;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const deltaY = (window.scrollY - lastScrollY) * 0.12;
      lastScrollY = window.scrollY;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.vy - deltaY;
        p.x += p.vx;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        } else if (p.y > height + 20) {
          p.y = -10;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        if (p.hue === 142) {
          ctx.fillStyle = `rgba(74, 222, 128, ${p.baseAlpha})`;
        } else {
          ctx.fillStyle = `rgba(255, 251, 244, ${p.baseAlpha * 0.8})`;
        }
        ctx.fill();

        // Connect nearby particles with subtle filament lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 251, 244, ${(1 - dist / 100) * 0.05})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: -60, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <>
      {/* ─── Top Scrub Progress Bar ────────────────────────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-[#11120D]/60 backdrop-blur-xs pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          style={{ scaleX }}
          className="h-full w-full origin-left bg-gradient-to-r from-[#4ADE80] via-[#FFFBF4] to-[#4ADE80] shadow-[0_0_12px_rgba(74,222,128,0.7)]"
        />
      </div>

      {/* ─── Ambient Particle Canvas ───────────────────────────────────────── */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[1] opacity-75"
        aria-hidden="true"
      />

      {/* ─── Sticky Waypoint HUD (sw-route style) ───────────────────────────── */}
      <aside
        aria-label="Page navigation waypoints"
        className="fixed right-5 top-1/2 -translate-y-1/2 z-[70] hidden lg:flex flex-col items-end gap-3 pointer-events-auto select-none"
      >
        {/* Percentage pill */}
        <div className="mb-2 rounded-full border border-[#FFFBF4]/10 bg-[#11120D]/80 px-2.5 py-0.5 text-[10px] font-mono tracking-wider text-[#FFFBF4]/70 backdrop-blur-md shadow-lg">
          {scrollPercent}%
        </div>

        {WAYPOINTS.map((wp) => {
          const isActive = activeId === wp.id;
          const isHovered = hoveredId === wp.id;

          return (
            <div
              key={wp.id}
              className="relative flex items-center justify-end group"
              onMouseEnter={() => setHoveredId(wp.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Tooltip Label */}
              <div
                className={`pointer-events-none absolute right-8 whitespace-nowrap rounded-md border border-[#FFFBF4]/15 bg-[#161712]/95 px-2.5 py-1 text-xs font-medium text-[#FFFBF4] shadow-xl backdrop-blur-md transition-all duration-200 ${
                  isHovered || (isActive && !hoveredId)
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-2"
                }`}
              >
                <span className="font-mono text-[#4ADE80] mr-1.5">{wp.num}</span>
                {wp.label}
              </div>

              {/* Waypoint Bead Button */}
              <button
                type="button"
                onClick={() => scrollTo(wp.id)}
                aria-label={`Jump to ${wp.label}`}
                className="relative flex h-6 w-6 items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-125 focus:outline-none"
              >
                {isActive && (
                  <motion.span
                    layoutId="activeWaypointRing"
                    className="absolute inset-0 rounded-full border border-[#4ADE80] opacity-80"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-4 bg-[#4ADE80] shadow-[0_0_8px_#4ADE80]"
                      : "w-2 bg-[#FFFBF4]/25 group-hover:bg-[#FFFBF4]/80 group-hover:w-3"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </aside>
    </>
  );
}
