"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  HelpCircle,
  Bug,
  Lightbulb,
  Shield,
  Zap,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  icon: typeof HelpCircle;
}

const faqs: FAQItem[] = [
  {
    question: "How do I report a bug?",
    answer:
      "Click 'Create Ticket', select 'Bug Report', describe the issue with steps to reproduce it. Include your browser, device, and any error messages you see.",
    category: "Bugs",
    icon: Bug,
  },
  {
    question: "How do I suggest a new feature?",
    answer:
      "Click 'Create Ticket', select 'Suggestion', and describe the feature you'd like to see. Include how it would help you and any examples.",
    category: "Features",
    icon: Lightbulb,
  },
  {
    question: "How long does support take to respond?",
    answer:
      "We typically respond within 24 hours. Bug reports and critical issues are prioritized. You can check the status of your ticket in the 'Your Tickets' section.",
    category: "General",
    icon: HelpCircle,
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We use industry-standard encryption for all data in transit and at rest. Your account information and project data are securely stored.",
    category: "Security",
    icon: Shield,
  },
  {
    question: "What information should I include in a bug report?",
    answer:
      "Include: what you expected to happen, what actually happened, steps to reproduce, your browser/OS, and any console errors or screenshots if possible.",
    category: "Bugs",
    icon: Bug,
  },
  {
    question: "Can I track the status of my ticket?",
    answer:
      "Yes! All your submitted tickets appear in the 'Your Tickets' section with their current status: Open, In Progress, Resolved, or Closed.",
    category: "General",
    icon: Zap,
  },
];

const categories = ["All", "Bugs", "Features", "Security", "General"];

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = faqs.filter((faq) => {
    const matchCat = activeCategory === "All" || faq.category === activeCategory;
    const matchSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div id="faq-section" className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#FFFBF4] flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#4ADE80]" />
          FAQ
        </h2>
        <p className="text-sm text-[#8A8578] mt-0.5">
          Quick answers to common questions
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8578]" />
          <Input
            placeholder="Search FAQs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-[#141414] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:ring-[#4ADE80]/50"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#4ADE80]/15 text-[#4ADE80] border border-[#4ADE80]/30"
                  : "bg-[#141414] border border-white/10 text-[#8A8578] hover:text-[#D8CFBC] hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-10">
          <HelpCircle className="w-10 h-10 text-[#8A8578]/30 mx-auto mb-3" />
          <p className="text-sm text-[#8A8578]">No FAQs found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((faq, i) => {
            const Icon = faq.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -2 }}
              >
                <Card className="bg-[#141414] border-white/10 hover:border-white/20 transition-colors h-full">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-sm text-[#FFFBF4] flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[#4ADE80] shrink-0" />
                        {faq.question}
                      </CardTitle>
                      <Badge className="bg-white/5 text-[#8A8578] border border-white/10 text-[9px] shrink-0">
                        {faq.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-[#8A8578] leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
