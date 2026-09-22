"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  GraduationCap, 
  Briefcase, 
  GitBranch, 
  Building2 
} from "lucide-react";
import { StaggerGrid, ScrollReveal } from "@/src/lib/animations";

import PricingHeader from "./components/PricingHeader";
import PersonaCard from "./components/PersonaCard";
import PricingCard from "./components/PricingCard";

gsap.registerPlugin(ScrollTrigger);

const personas = [
  {
    icon: GraduationCap,
    title: "Students",
    description: "Show your growth without rebuilding your site every semester.",
  },
  {
    icon: Briefcase,
    title: "Freelancers",
    description: "Update your portfolio once, reuse it across every client pitch.",
  },
  {
    icon: GitBranch,
    title: "Open Source",
    description: "Surface your repos and projects with zero manual upkeep.",
  },
  {
    icon: Building2,
    title: "Agencies",
    description: "Manage multiple developer portfolios from a single dashboard.",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$0",
    description: "Perfect for students and early explorers.",
    featured: false,
    features: [
      "1 public portfolio",
      "10 project slots",
      "Basic analytics",
      "Community support",
      "standard-subdomain.com"
    ]
  },
  {
    name: "Pro",
    price: "$19",
    description: "Everything you need for a professional presence.",
    featured: true,
    badge: "Recommended",
    features: [
      "Unlimited portfolios",
      "Unlimited projects",
      "Custom domain support",
      "Advanced SEO tools",
      "Priority email support",
      "Remove branding"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Scaling tools for agencies and large teams.",
    featured: false,
    features: [
      "Everything in Pro",
      "Team collaboration",
      "White-label options",
      "API access",
      "Dedicated account manager",
      "SSO & Security"
    ]
  },
];

export default function SocialProofPricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle background glow movement
      gsap.to(glowRef.current, {
        x: "30vw",
        y: "20vh",
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Reveal sections on scroll
      gsap.from(".pricing-grid-container", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pricing-grid-container",
          start: "top 80%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0A0A0A] py-24 sm:py-32"
    >
     
      
      <main className="relative z-10 mx-auto max-w-[1140px] px-6">
        <div className="flex flex-col gap-24">
          
          {/* Header & Personas */}
          <div className="flex flex-col gap-12">
            <PricingHeader />
            
            <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {personas.map((persona) => (
                <PersonaCard key={persona.title} persona={persona} />
              ))}
            </StaggerGrid>
          </div>

          {/* Pricing Section */}
          <div className="flex flex-col gap-12">
            <div className="space-y-4">
              <ScrollReveal direction="up">
                <h2
                  className="text-3xl font-bold tracking-tight text-[#FFFBF4] md:text-5xl"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Start free. Scale when you&apos;re ready.
                </h2>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.1}>
                <p className="max-w-2xl text-[#D8CFBC]/70 md:text-lg">
                  Transparent pricing that grows with your career. No hidden fees, cancel anytime.
                </p>
              </ScrollReveal>
            </div>

            <div className="pricing-grid-container grid grid-cols-1 gap-6 lg:grid-cols-3">
              {pricingPlans.map((plan) => (
                <PricingCard key={plan.name} plan={plan} />
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
