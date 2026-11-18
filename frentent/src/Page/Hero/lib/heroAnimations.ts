// Hero Animation Configurations - Premium Scroll Experience
import type { Variants } from "framer-motion";

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_SOFT: [number, number, number, number] = [
  0.25, 0.46, 0.45, 0.94,
];
export const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_STIFF: [number, number, number, number] = [
  0.34, 1.56, 0.64, 1,
];

// Text Reveal Variants
export const wordReveal: Variants = {
  hidden: { y: "120%", rotateX: 20, opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    rotateX: 0,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: EASE_EXPO,
      delay: i * 0.05,
      opacity: { duration: 0.4 },
    },
  }),
};

export const charReveal: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: i * 0.03,
    },
  }),
};

// Container Variants
export const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

export const sectionContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

// Scroll Reveal Variants
export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 80, transform: "perspective(1000px) rotateX(10deg)" },
  visible: {
    opacity: 1,
    y: 0,
    transform: "perspective(1000px) rotateX(0deg)",
    transition: { duration: 1.2, ease: EASE_OUT },
  },
};

export const scrollRevealSlow: Variants = {
  hidden: { opacity: 0, y: 120 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, ease: EASE_OUT, delay: 0.4 },
  },
};

// Card Variants with 3D Tilt
export const tiltCard: Variants = {
  initial: { rotateX: 0, rotateY: 0, scale: 1 },
  hover: {
    rotateX: [-2, 2, -1, 1, 0],
    rotateY: [-2, 2, -1, 1, 0],
    scale: 1.02,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Badge Float Animation
export const badgeFloat: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

// Button Variants
export const buttonGlow: Variants = {
  idle: {
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  },
  hover: {
    boxShadow: "0 0 30px rgba(74,222,128,0.4), 0 4px 20px rgba(0,0,0,0.4)",
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const buttonIconBounce: Variants = {
  hover: {
    x: [0, 4, -2, 0],
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Marquee Animation
export const marquee: Variants = {
  animate: {
    x: ["0%", "-50%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 30,
        ease: "linear",
      },
    },
  },
};

export const marqueeReverse: Variants = {
  animate: {
    x: ["-50%", "0%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 30,
        ease: "linear",
      },
    },
  },
};

// Glitch Text Effect
export const glitchText: Variants = {
  initial: { opacity: 1 },
  glitch1: {
    opacity: 0,
    clipPath: "inset(20% 0 80% 0)",
    transition: { duration: 0.1 },
  },
  glitch2: {
    opacity: 0,
    clipPath: "inset(60% 0 10% 0)",
    transition: { duration: 0.1 },
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

// Parallax Layer
export const parallax: Variants = {
  animate: {
    y: [0, -30, 0],
    transition: {
      duration: 20,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

// Gradient Shift
export const gradientShift: Variants = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      backgroundPosition: {
        duration: 8,
        ease: "linear",
        repeat: Infinity,
      },
    },
  },
};

// Fade In Up (Framer Motion)
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE_OUT },
  },
};

export const fadeInUpSlow: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.4, ease: EASE_OUT, delay: 0.4 },
  },
};

// Stagger Grid
export const staggerGrid: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.3 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SOFT },
  },
};

// Code Typing Animation
export const codeLine: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.15 },
  }),
};

// Scroll Progress Bar
export const progressBar: Variants = {
  initial: { width: "0%" },
  scroll: {
    width: "100%",
    transition: { ease: "linear", duration: 0.1 },
  },
};

// Micro-interactions
export const pulseRing: Variants = {
  animate: {
    scale: [1, 2.5, 1],
    opacity: [0.6, 0, 0],
    transition: {
      duration: 2,
      ease: "easeOut",
      repeat: Infinity,
    },
  },
};

// Hover Effects
export const cardHover: Variants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.03,
    y: -8,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const borderGlow: Variants = {
  initial: { opacity: 0.3 },
  hover: {
    opacity: 1,
    boxShadow: "0 0 20px rgba(74,222,128,0.3)",
    transition: { duration: 0.4 },
  },
};
