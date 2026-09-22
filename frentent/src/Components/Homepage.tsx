"use client";

import { motion } from "framer-motion";
import FAQFooterPage from "@/src/Home/FAQFooterPage";
import {HeroSection} from "@/src/Hero";
import  PlaygroundSection  from "@/src/Home/PlaygroundPage";
import { ProblemSolutionSection } from "@/src/ProblemSolution";
import FeaturesPage from "@/src/Home/FeaturesPage";
import { SocialProofPricingSection } from "../SocialProofPricing";
const Homepage = () => {

const sectionItem = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};



  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      suppressHydrationWarning={true}
      className="bg-[#11120D] text-[#FFFBF4]"
    >
        <motion.div initial={sectionItem.initial} animate={sectionItem.animate}>
          <HeroSection />
        </motion.div>
        <motion.div
          initial={sectionItem.initial}
          animate={sectionItem.animate}
        >
          <FeaturesPage />
        </motion.div>
        <motion.div
          initial={sectionItem.initial}
          animate={sectionItem.animate}
        >
          <ProblemSolutionSection />
        </motion.div>
        <motion.div
          initial={sectionItem.initial}
          animate={sectionItem.animate}
        >
          <PlaygroundSection />
        </motion.div>
        <motion.div
          initial={sectionItem.initial}
          animate={sectionItem.animate}
        >
          <SocialProofPricingSection />
        </motion.div>
        <motion.div
          initial={sectionItem.initial}
          animate={sectionItem.animate}
        >
          <FAQFooterPage />
        </motion.div>
    </motion.div>
  );
};

export default Homepage;
