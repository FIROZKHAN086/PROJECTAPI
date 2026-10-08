
import { itemVariants } from "../AddNewProject";

import { motion } from "framer-motion";


import {
  Sparkles,
  Star,
 
} from "lucide-react";



 export const FeaturedToggle = ({
  featured,
  setFeatured,
  isPending,
}: {
  featured: boolean;
  setFeatured: (value: boolean) => void;
  isPending: boolean;
}) => {


    const pulseAnimation = {
  scale: [1, 1.03, 1],
  transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const },
};

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.01 }}
      className="relative"
    >
      <motion.button
        type="button"
        onClick={() => setFeatured(!featured)}
        disabled={isPending}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.99 }}
        className="flex w-full cursor-pointer items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-left transition-colors group hover:border-white/25 disabled:opacity-50"
      >
        <div
          className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 ${
            featured ? "bg-[#4ADE80]" : "bg-white/10"
          }`}
        >
          <motion.div
            className="absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-lg"
            animate={{ x: featured ? 24 : 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Star
              className={`size-4 ${
                featured ? "text-[#FACC15]" : "text-[#6B6B6B]"
              }`}
            />
            <span className="text-sm font-medium text-[#D8CFBC]">
              {featured ? "Featured Project" : "Mark as Featured"}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-[#6B6B6B]">
            {featured
              ? "This project will be highlighted in your portfolio"
              : "Feature this project to make it stand out"}
          </p>
        </div>
        {featured && (
          <motion.div
            animate={pulseAnimation}
            className="rounded bg-[#FACC15]/10 px-2 py-1 text-[10px] font-medium text-[#FACC15]"
          >
            <Sparkles className="mr-1 inline size-3" />
            Featured
          </motion.div>
        )}
      </motion.button>
    </motion.div>
  );
};
