"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const EASE_CURVES = {
  smooth: "power1.inOut",
  float: "sine.inOut",
  pulse: "sine.inOut",
};

export default function HeroParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particleCount = 25;
    const particles: HTMLDivElement[] = [];

    // Create particles dynamically
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full pointer-events-none";

      const size = gsap.utils.random(1.5, 4);
      const isGreen = Math.random() > 0.5;
      const duration = gsap.utils.random(12, 20);
      const delay = i * 0.08;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = isGreen
        ? `rgba(74, 222, 128, ${gsap.utils.random(0.15, 0.35)})`
        : `rgba(163, 230, 53, ${gsap.utils.random(0.12, 0.28)})`;

      particle.style.left = `${gsap.utils.random(5, 95)}%`;
      particle.style.top = `${gsap.utils.random(5, 95)}%`;
      particle.style.filter = `blur(${gsap.utils.random(0.5, 1.5)}px)`;
      particle.style.willChange = "transform, opacity";
      particle.dataset.duration = duration.toString();
      particle.dataset.delay = delay.toString();

      container.appendChild(particle);
      particles.push(particle);
    }

    const ctx = gsap.context(() => {
      particles.forEach((particle) => {
        const duration = parseFloat(particle.dataset.duration || "15");
        const delay = parseFloat(particle.dataset.delay || "0");

        // Main float animation - smooth and continuous
        gsap.to(particle, {
          y: gsap.utils.random(-120, 120),
          x: gsap.utils.random(-60, 60),
          duration: duration,
          repeat: -1,
          yoyo: true,
          ease: EASE_CURVES.float,
          delay: delay,
        });

        // Opacity pulse - subtle breathing effect
        gsap.to(particle, {
          opacity: gsap.utils.random(0.3, 0.7),
          duration: gsap.utils.random(4, 7),
          repeat: -1,
          yoyo: true,
          ease: EASE_CURVES.pulse,
          delay: delay * 0.5,
        });

        // Scale pulse - gentle size variation
        gsap.to(particle, {
          scale: gsap.utils.random(0.9, 1.3),
          duration: gsap.utils.random(5, 9),
          repeat: -1,
          yoyo: true,
          ease: EASE_CURVES.pulse,
          delay: delay * 0.7,
        });
      });
    }, container);

    return () => {
      ctx.revert();
      particles.forEach((p) => p.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    />
  );
}
