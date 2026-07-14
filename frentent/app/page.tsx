"use client";

import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/src/Components/Footer";
import Navbar from "@/src/Components/Navbar";
import FAQFooterPage from "@/src/Home/FAQFooterPage";
import FeaturesPage from "@/src/Home/FeaturesPage";
import Hero from "@/src/Home/Hero";
import PlaygroundPage from "@/src/Home/PlaygroundPage";
import ProblemSolutionPage from "@/src/Home/ProblemSolutionPage";
import SocialProofPricingPage from "@/src/Home/SocialProofPricingPage";

const pageVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

const sectionVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

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

const page = () => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      suppressHydrationWarning={true}
      className="bg-[#11120D] text-[#FFFBF4]"
    >
      <Navbar />
      <motion.div variants={sectionVariants} initial="initial" animate="animate">
        <motion.div variants={sectionItem}>
          <Hero />
        </motion.div>
        <motion.div variants={sectionItem}>
          <FeaturesPage />
        </motion.div>
        <motion.div variants={sectionItem}>
          <ProblemSolutionPage />
        </motion.div>
        <motion.div variants={sectionItem}>
          <PlaygroundPage />
        </motion.div>
        <motion.div variants={sectionItem}>
          <SocialProofPricingPage />
        </motion.div>
        <motion.div variants={sectionItem}>
          <FAQFooterPage />
        </motion.div>
        <motion.div variants={sectionItem}>
          <Footer />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default page;
