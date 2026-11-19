"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const PARTICLE_POSITIONS = Array.from({ length: 15 }, () => ({
  left: Math.random() * 100,
  top: Math.random() * 100,
}));

const LINE_OPACITIES = Array.from({ length: 8 }, () => 0.3 + Math.random() * 0.2);

export default function HeroBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const particlePositions = PARTICLE_POSITIONS;
  const lineOpacities = LINE_OPACITIES;

  useEffect(() => {
    const el = rootRef.current;
    const grid = gridRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // Enhanced parallax orbs with 3D perspective
        gsap.to("[data-orb='primary']", {
          yPercent: 40,
          xPercent: -5,
          scale: 1.3,
          rotation: 5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        gsap.to("[data-orb='secondary']", {
          yPercent: -30,
          xPercent: 12,
          scale: 0.85,
          rotation: -8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: 1.8,
          },
        });

        gsap.to("[data-orb='accent']", {
          yPercent: 35,
          xPercent: -18,
          rotation: 12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: 2.2,
          },
        });

        // Animated grid with scroll effect
        if (grid) {
          gsap.fromTo(
            grid,
            { opacity: 1, scale: 1 },
            {
              opacity: 0,
              scale: 1.2,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: el,
                start: "top top",
                end: "center top",
                scrub: 1.5,
              },
            }
          );

          // Subtle grid breathing animation
          gsap.to(grid, {
            scale: 1.02,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }

        // Floating animations with varied timings
        gsap.to("[data-orb='primary']", {
          x: "random(-25, 25)",
          y: "random(-25, 25)",
          rotation: "random(-5, 5)",
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to("[data-orb='secondary']", {
          x: "random(-35, 35)",
          y: "random(-20, 20)",
          rotation: "random(-8, 8)",
          duration: 11,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to("[data-orb='accent']", {
          x: "random(-30, 30)",
          y: "random(-25, 25)",
          rotation: "random(-10, 10)",
          duration: 13,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Animated lines effect
        const lines = gsap.utils.toArray<HTMLElement>("[data-line]");
        lines.forEach((line, i) => {
          gsap.to(line, {
            scaleY: 1.2,
            opacity: 0.6,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.3,
          });
        });

        // Particle system animation
        if (particlesRef.current) {
          const particles = gsap.utils.toArray<HTMLElement>(
            "[data-particle]",
            particlesRef.current
          );

          particles.forEach((particle, i) => {
            gsap.to(particle, {
              x: "random(-50, 50)",
              y: "random(-50, 50)",
              duration: "random(3, 7)",
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: i * 0.1,
            });
          });
        }

        // Ambient light animation
        gsap.to("[data-light='ambient']", {
          opacity: 0.4,
          scale: 1.1,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
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
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#11120D]"
    >
      {/* Enhanced animated grid with perspective */}
      <div
        ref={gridRef}
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[72px_72px] mask-[radial-gradient(ellipse_70%_60%_at_50%_0%,#000_40%,transparent_100%)]"
      />

      {/* Enhanced gradient orbs with improved blur */}
      <div
        data-orb="primary"
        className="absolute -top-40 left-1/2 h-170 w-170 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,#4ADE80_0%,transparent_70%)] opacity-14 blur-160"
      />
      <div
        data-orb="secondary"
        className="absolute top-1/3 -left-48 h-120 w-120 rounded-full bg-[radial-gradient(ellipse_at_center,#a3e635_0%,transparent_70%)] opacity-9 blur-150"
      />
      <div
        data-orb="accent"
        className="absolute -right-48 bottom-1/4 h-130 w-130 rounded-full bg-[radial-gradient(ellipse_at_center,#10B981_0%,transparent_70%)] opacity-8 blur-160"
      />

      {/* Dynamic particle system */}
      <div ref={particlesRef} className="absolute inset-0">
        {particlePositions.map((pos, i) => (
          <div
            key={i}
            data-particle
            className="absolute h-px w-px rounded-full bg-[#4ADE80]/30"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
          />
        ))}
      </div>

      {/* Animated lines */}
      <div className="absolute inset-0">
        {lineOpacities.map((opacity, i) => (
          <div
            key={i}
            data-line
            className="absolute h-0.5 w-full bg-linear-to-r from-transparent via-white/5 to-transparent"
            style={{
              top: `${(i + 1) * 12.5}%`,
              opacity,
            }}
          />
        ))}
      </div>

      {/* Ambient light */}
      <div
        data-light="ambient"
        className="absolute inset-0 bg-linear-to-b from-transparent via-[#4ADE80]/2 to-transparent"
      />

      {/* Enhanced gradient borders */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#4ADE80]/30 via-40% to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-[#a3e635]/20 via-60% to-transparent" />

      {/* Radial gradient with animation */}
      <motion.div
        animate={{
          opacity: [0.8, 1, 0.8],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#11120D_70%)]"
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9Ii4wMiIvPjwvc3ZnPg==')] opacity-2" />
    </div>
  );
}
