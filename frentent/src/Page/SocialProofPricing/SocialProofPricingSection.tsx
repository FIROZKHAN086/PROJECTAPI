"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {GraduationCap,Briefcase,GitBranch,Building2, Sparkles, Check, ArrowRight } from "../../Components/DynamicIcons"
import { StaggerGrid, ScrollReveal, ScaleIn, GlowCard } from "@/src/lib/animations";

import PricingHeader from "./components/PricingHeader";
import PersonaCard from "./components/PersonaCard";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const personas = [
  {
    icon: GraduationCap,
    title: "Students & New Grads",
    description:
      "Showcase coursework, hackathons, and personal projects without rebuilding your website every single semester.",
  },
  {
    icon: Briefcase,
    title: "Freelance Builders",
    description:
      "Update project links, client deliverables, and case studies once. Instantly sync across all pitch decks and live portfolios.",
  },
  {
    icon: GitBranch,
    title: "Open Source Authors",
    description:
      "Surface live GitHub stats, release notes, and documentation links directly to your public portfolio with zero upkeep.",
  },
  {
    icon: Building2,
    title: "Agencies & Studios",
    description:
      "Manage dozens of developer portfolios and client showcase sites from one centralized, multi-tenant dashboard.",
  },
];

export default function SocialProofPricingSection() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isYearly, setIsYearly] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: "20vw",
          y: "15vh",
          duration: 18,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pricingPlans = [
    {
      name: "Hobby",
      price: "$0",
      period: "forever free",
      description: "Everything needed to start showcasing developer projects with zero overhead.",
      featured: false,
      badge: "Free Starter",
      features: [
        "Up to 5 active projects",
        "Public REST API endpoint",
        "10,000 edge requests / mo",
        "Community Discord support",
        "Automated WebP image compression",
      ],
      cta: "Get Started Free",
    },
    {
      name: "Pro Developer",
      price: isYearly ? "$9.60" : "$12",
      period: isYearly ? "per month, billed annually" : "per month, billed monthly",
      description: "For active builders, freelancers, and engineers who ship high-velocity work.",
      featured: true,
      badge: "Most Popular",
      features: [
        "Unlimited projects & fields",
        "Custom domain mapping",
        "1,000,000 edge requests / mo",
        "Sub-15ms Global Edge CDN",
        "AVIF & WebP realtime transcoding",
        "Scoped API keys & secret tokens",
        "Instant edge cache invalidation",
      ],
      cta: "Start 14-Day Free Trial",
    },
    {
      name: "Studio & Team",
      price: isYearly ? "$31.20" : "$39",
      period: isYearly ? "per month, billed annually" : "per month, billed monthly",
      description: "For agencies, client studios, and teams managing multiple portfolio sites.",
      featured: false,
      badge: "Team Scale",
      features: [
        "Unlimited client workspaces",
        "10,000,000 edge requests / mo",
        "Multi-seat team RBAC access",
        "99.99% Uptime SLA guarantee",
        "Dedicated engineer support",
        "White-label API domain routing",
      ],
      cta: "Deploy for Team",
    },
  ];

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0A0A0A] py-24 sm:py-32 text-[#FFFBF4]"
      aria-label="Target Personas and Transparent Pricing"
    >
      {/* Background Ambient Glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-[#4ADE80]/[0.08] blur-[140px]"
        aria-hidden="true"
      />

      <main className="relative z-10 mx-auto max-w-6xl px-6">
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
          <div className="flex flex-col gap-12 pt-8 border-t border-[#FFFBF4]/10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <ScrollReveal direction="up">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#4ADE80]/30 bg-[#4ADE80]/10 px-3.5 py-1 text-xs text-[#4ADE80] font-mono tracking-widest uppercase">
                    <Sparkles className="h-3 w-3" />
                    <span>PREDICTABLE PRICING</span>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.1}>
                  <h2
                    className="text-3xl font-bold tracking-tight text-[#FFFBF4] sm:text-4xl md:text-5xl"
                    style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
                  >
                    Start free. Scale when you&apos;re ready.
                  </h2>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.15}>
                  <p className="max-w-2xl text-[#FFFBF4]/70 text-sm sm:text-base">
                    Transparent pricing that grows with your career. No hidden fees, cancel anytime.
                  </p>
                </ScrollReveal>
              </div>

              {/* Billing Toggle */}
              <ScrollReveal direction="up" delay={0.2}>
                <div className="flex items-center gap-3 rounded-full border border-[#FFFBF4]/15 bg-[#161712] p-1.5 backdrop-blur-md">
                  <button
                    type="button"
                    onClick={() => setIsYearly(false)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                      !isYearly
                        ? "bg-[#4ADE80] text-[#0A0A0A] shadow-md"
                        : "text-[#FFFBF4]/60 hover:text-[#FFFBF4]"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsYearly(true)}
                    className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                      isYearly
                        ? "bg-[#4ADE80] text-[#0A0A0A] shadow-md"
                        : "text-[#FFFBF4]/60 hover:text-[#FFFBF4]"
                    }`}
                  >
                    <span>Yearly</span>
                    <span className="rounded-full bg-[#0A0A0A] text-[#4ADE80] px-2 py-0.5 text-[10px] font-bold">
                      Save 20%
                    </span>
                  </button>
                </div>
              </ScrollReveal>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {pricingPlans.map((plan, idx) => (
                <ScaleIn key={plan.name} delay={0.1 + idx * 0.1} className="h-full">
                  <GlowCard className="h-full">
                    <div
                      className={`relative flex h-full flex-col justify-between rounded-3xl border p-8 backdrop-blur-md transition-all duration-300 hover:shadow-2xl ${
                        plan.featured
                          ? "border-[#4ADE80] bg-[#161912]/95 shadow-[0_0_40px_rgba(74,222,128,0.12)]"
                          : "border-[#FFFBF4]/10 bg-[#161712]/60 hover:border-[#FFFBF4]/25"
                      }`}
                    >
                      {/* Featured Ribbon */}
                      {plan.featured && (
                        <div className="absolute top-0 right-8 -translate-y-1/2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#4ADE80] px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#0A0A0A] shadow-md">
                            <Sparkles className="h-3 w-3 fill-current" />
                            {plan.badge}
                          </span>
                        </div>
                      )}

                      <div>
                        {/* Header */}
                        <div className="space-y-3 pb-6 border-b border-[#FFFBF4]/10">
                          <h3
                            className="text-xl font-bold text-[#FFFBF4]"
                            style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
                          >
                            {plan.name}
                          </h3>
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight text-[#FFFBF4]">
                              {plan.price}
                            </span>
                            <span className="text-xs text-[#FFFBF4]/60 font-mono">
                              / {isYearly && plan.price !== "$0" ? "mo" : "mo"}
                            </span>
                          </div>
                          <p className="text-xs text-[#FFFBF4]/50 font-mono">
                            {plan.period}
                          </p>
                          <p className="text-xs sm:text-sm leading-relaxed text-[#FFFBF4]/70 pt-1">
                            {plan.description}
                          </p>
                        </div>

                        {/* Features List */}
                        <ul className="space-y-3 py-6">
                          {plan.features.map((feat) => (
                            <li key={feat} className="flex items-start gap-3 text-xs sm:text-sm text-[#FFFBF4]/90">
                              <span
                                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                                  plan.featured
                                    ? "bg-[#4ADE80]/20 text-[#4ADE80]"
                                    : "bg-white/10 text-[#FFFBF4]/70"
                                }`}
                              >
                                <Check className="h-3 w-3 stroke-[2.5]" />
                              </span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <div className="pt-6 border-t border-[#FFFBF4]/10">
                        <button
                          type="button"
                          onClick={() => router.push("/login")}
                          className={`w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all duration-300 cursor-pointer ${
                            plan.featured
                              ? "bg-[#4ADE80] text-[#0A0A0A] shadow-[0_0_20px_rgba(74,222,128,0.35)] hover:bg-[#86efac]"
                              : "border border-[#FFFBF4]/15 bg-white/[0.04] text-[#FFFBF4] hover:bg-white/10 hover:border-[#FFFBF4]/30"
                          }`}
                        >
                          <span>{plan.cta}</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </GlowCard>
                </ScaleIn>
              ))}
            </div>
          </div>
        </div>
      </main>

      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
