"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SupportHeader } from "@/src/Components/support/SupportHeader";
import { SubmitTicketDialog } from "@/src/Components/support/SubmitTicketDialog";
import { TicketList } from "@/src/Components/support/TicketList";
import { FAQSection } from "@/src/Components/support/FAQSection";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function SupportContent() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        <motion.div variants={item}>
          <SupportHeader onCreateClick={() => setDialogOpen(true)} />
        </motion.div>

        <motion.div variants={item}>
          <TicketList />
        </motion.div>

        <motion.div variants={item}>
          <FAQSection />
        </motion.div>
      </motion.div>

      <SubmitTicketDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFBF4] font-sans antialiased">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <SupportContent />
      </main>
    </div>
  );
}
