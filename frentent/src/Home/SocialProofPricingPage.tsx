"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  GitBranch,
  Building2,
} from "lucide-react";
import {
  ScrollReveal,
  StaggerGrid,
  StaggerItem,
  LineDraw,
  ScaleIn,
  MagneticHover,
} from "@/src/lib/animations";

const personas = [
  {
    icon: GraduationCap,
    title: "Students",
    description:
      "Show your growth without rebuilding your site every semester.",
  },
  {
    icon: Briefcase,
    title: "Freelancers",
    description:
      "Update your portfolio once, reuse it across every client pitch.",
  },
  {
    icon: GitBranch,
    title: "Open Source Contributors",
    description: "Surface your repos and projects with zero manual upkeep.",
  },
  {
    icon: Building2,
    title: "Agencies",
    description:
      "Manage multiple developer portfolios from a single dashboard.",
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    description: "1 portfolio, 10 projects, community support",
    featured: false,
  },
  {
    name: "Pro",
    price: "$Xx/mo",
    description: "Unlimited projects, custom domain, priority support",
    featured: true,
    badge: "Recommended",
  },
  {
    name: "Team",
    price: "Contact us",
    description: "Multiple seats, shared workspace, SSO",
    featured: false,
  },
];

export default function SocialProofPricingPage() {
  return (
    <div className="min-h-full bg-[#0A0A0A] font-sans antialiased text-[#FFFBF4]">
      <main className="mx-auto max-w-[1140px] px-6 py-8">
        <div className="flex flex-col gap-12">
          {/* Social Proof / Who It's For */}
          <section className="flex flex-col gap-6">
            <div className="space-y-3">
              <ScrollReveal direction="up" delay={0}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D8CFBC]">
                  WHO IT&apos;S FOR
                </p>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.1}>
                <h2
                  className="max-w-[860px] text-4xl font-bold leading-[1.1] tracking-tight text-[#FFFBF4] md:text-5xl"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  For developers who manage projects once and showcase them everywhere.
                </h2>
              </ScrollReveal>
              <LineDraw className="mt-2 h-px bg-gradient-to-r from-[#4ADE80]/40 via-[#4ADE80]/20 to-transparent w-48" delay={0.3} />
            </div>

            <StaggerGrid className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {personas.map((persona) => (
                <StaggerItem key={persona.title}>
                  <motion.div
                    whileHover={{
                      y: -6,
                      borderColor: "rgba(74,222,128,0.2)",
                      boxShadow: "0 12px 40px rgba(74,222,128,0.06)",
                    }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#141414] p-4 cursor-default h-full"
                  >
                    <motion.div
                      whileHover={{ rotate: -10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-[#0A0A0A] text-[#D8CFBC]"
                    >
                      <persona.icon className="size-4" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-semibold text-[#FFFBF4]">
                        {persona.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[#D8CFBC]">
                        {persona.description}
                      </p>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </section>

          {/* Pricing Teaser */}
          <section className="flex flex-col gap-6">
            <ScrollReveal direction="up" delay={0}>
              <h2
                className="text-4xl font-bold leading-[1.1] tracking-tight text-[#FFFBF4] md:text-5xl"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Start free. Scale when you&apos;re ready.
              </h2>
            </ScrollReveal>
          </section>
        </div>
      </main>
    </div>
  );
}
