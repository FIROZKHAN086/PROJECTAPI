"use client";

import { motion } from "framer-motion";
import ScrollHUD from "@/src/Components/ScrollHUD";
import { HeroSection } from "@/src/Page/Hero";
import ScrollJourneySection from "@/src/Components/ScrollJourneySection";
import FeaturesPage from "@/src/Home/FeaturesPage";
import { ProblemSolutionSection } from "@/src/Page/ProblemSolution";
import PlaygroundSection from "@/src/Home/PlaygroundPage";
import { SocialProofPricingSection } from "@/src/Page/SocialProofPricing";
import FAQFooterPage from "@/src/Home/FAQFooterPage";

const Homepage = () => {
  return (
    <div
      suppressHydrationWarning={true}
      className="relative min-h-screen bg-[#11120D] text-[#FFFBF4] selection:bg-[#4ADE80] selection:text-[#0A0A0A]"
    >
      {/* Global Scroll HUD: Top progress bar, ambient particle constellation & waypoint beads */}
      <ScrollHUD />

      {/* 01 // Hero Vision */}
      <HeroSection />

      {/* 02 // lets-scroll Cinematic World Flight Journey */}
      <ScrollJourneySection />

      {/* 03 // Bento Features & Architecture */}
      <FeaturesPage />

      {/* 04 // Transformation Problem vs Solution */}
      <ProblemSolutionSection />

      {/* 05 // Live Developer API Studio / Playground */}
      <PlaygroundSection />

      {/* 06 // Personas & Transparent Pricing */}
      <SocialProofPricingSection />

      {/* 07 // FAQ & Launchpad CTA */}
      <FAQFooterPage />
    </div>
  );
};

export default Homepage;
