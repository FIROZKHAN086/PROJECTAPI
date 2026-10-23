"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { slideUp } from "@/src/Page/Hero/lib/variants";

gsap.registerPlugin(ScrollTrigger);


export default function HeroFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-feature-card]");

      cards.forEach((card, i) => {
        // Enhanced scroll animation with parallax
        gsap.from(card, {
          y: 80,
          opacity: 0,
          scale: 0.95,
          rotationX: 10,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "bottom 20%",
            scrub: 0.5,
            toggleActions: "play none none reverse",
          },
          delay: i * 0.15,
        });

        // Floating animation
        gsap.to(card, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });

        // Enhanced hover effects with physics-based animation
        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) / 20;
          const y = (e.clientY - rect.top - rect.height / 2) / 20;

          gsap.to(card, {
            rotationY: x,
            rotationX: -y,
            x: x * 2,
            y: y * 2,
            duration: 0.6,
            ease: "power2.out",
            transformPerspective: 1200,
          });

          // Mouse position glow effect
          const glow = card.querySelector("[data-hover-glow]");
          if (glow) {
            gsap.to(glow, {
              x: x * 30,
              y: y * 30,
              opacity: 0.3,
              duration: 0.4,
              ease: "power2.out",
            });
          }
        };

        const handleMouseEnter = () => {
          gsap.to(card, {
            scale: 1.05,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            duration: 0.4,
            ease: "power2.out",
          });

          // Animate icon
          const icon = card.querySelector("[data-icon]");
          if (icon) {
            gsap.to(icon, {
              scale: 1.2,
              rotate: 5,
              duration: 0.4,
              ease: "back.out(1.7)",
            });
          }
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            x: 0,
            y: 0,
            scale: 1,
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
          });

          // Reset icon
          const icon = card.querySelector("[data-icon]");
          if (icon) {
            gsap.to(icon, {
              scale: 1,
              rotate: 0,
              duration: 0.4,
              ease: "power2.out",
            });
          }

          // Reset glow
          const glow = card.querySelector("[data-hover-glow]");
          if (glow) {
            gsap.to(glow, {
              x: 0,
              y: 0,
              opacity: 0,
              duration: 0.4,
            });
          }
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          card.removeEventListener("mousemove", handleMouseMove);
          card.removeEventListener("mouseenter", handleMouseEnter);
          card.removeEventListener("mouseleave", handleMouseLeave);
        };
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      ref={containerRef}
      variants={slideUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="mt-20 w-full max-w-6xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <h2 className="text-2xl font-bold tracking-tight text-[#FFFBF4] sm:text-3xl">
          Why Choose ProjectAPI
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-base text-[#8A8578]">
          Built with performance and developer experience in mind
        </p>
      </motion.div>

      

      {/* Decorative elements */}
      <div className="mt-12 flex justify-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-px w-24 bg-linear-to-r from-transparent via-[#4ADE80] to-transparent"
        />
      </div>
    </motion.div>
  );
}
