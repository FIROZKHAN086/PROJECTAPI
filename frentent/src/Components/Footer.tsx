"use client";

import { motion } from "framer-motion";
import {HugeiconsIcon} from "@hugeicons/react";
import { Github01Icon, NewTwitterIcon } from "@hugeicons/core-free-icons";
import { Brackets } from "lucide-react";
import {
  StaggerGrid,
  StaggerItem,
  ScrollReveal,
} from "@/src/lib/animations";

const Footer = () => {
    const footerColumns = [
      {
        title: "Product",
        links: ["Features", "Pricing", "Playground", "Templates"],
      },
      {
        title: "Developers",
        links: ["Documentation", "API Reference", "Changelog"],
      },
      {
        title: "Company",
        links: ["About", "Support", "Privacy", "Terms"],
      },
    ];
    
  return (
    <div>
      <footer className="border-t border-white/10 bg-[#0A0A0A]">
        <div className="mx-auto max-w-[1200px] px-6 py-12">
          <StaggerGrid className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {/* Column 1 - Brand */}
            <StaggerItem>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#FFFBF4]">
                  <Brackets className="size-4" />
                  <span className="tracking-tight">ProjectAPI</span>
                </div>
                <p className="max-w-[220px] text-sm leading-relaxed text-[#D8CFBC]">
                  The GitHub + CMS + API backend for developer portfolios.
                </p>
                <div className="flex items-center gap-3 text-[#D8CFBC]">
                  <motion.div
                    whileHover={{ scale: 1.2, color: "#FFFBF4" }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <HugeiconsIcon icon={Github01Icon} className="cursor-pointer" />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.2, color: "#FFFBF4" }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <HugeiconsIcon icon={NewTwitterIcon} className="cursor-pointer" />
                  </motion.div>
                </div>
              </div>
            </StaggerItem>

            {/* Columns 2-4 - Links */}
            {footerColumns.map((column) => (
              <StaggerItem key={column.title}>
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-semibold text-[#FFFBF4]">
                    {column.title}
                  </h3>
                  {column.links.map((link) => (
                    <motion.a
                      key={link}
                      href="#"
                      whileHover={{ x: 4, color: "#FFFBF4" }}
                      className="text-sm text-[#D8CFBC] transition-colors inline-block"
                    >
                      {link}
                    </motion.a>
                  ))}
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>

          {/* Bottom Bar */}
          <ScrollReveal direction="up" delay={0.3} distance={10}>
            <div className="mt-8 border-t border-white/10 pt-4 text-center text-xs text-[#D8CFBC]">
              © 2026 ProjectAPI. All rights reserved.
            </div>
          </ScrollReveal>
        </div>
      </footer>
    </div>
  )
}

export default Footer
