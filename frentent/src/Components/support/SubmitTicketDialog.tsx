"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Send,
  Loader2,
  CheckCircle,
  Bug,
  Lightbulb,
  HelpCircle,
} from "lucide-react";
import { useCreateTicket } from "@/src/hooks/useSupport";
import { toast } from "@/src/lib/toastSlice";

const ticketTypes = [
  { value: "bug", label: "Bug Report", icon: Bug, color: "text-[#F87171]" },
  { value: "feature", label: "Suggestion", icon: Lightbulb, color: "text-[#FACC15]" },
  { value: "help", label: "Need Help", icon: HelpCircle, color: "text-[#60A5FA]" },
];

interface SubmitTicketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SubmitTicketDialog({ open, onOpenChange }: SubmitTicketDialogProps) {
  const { mutate: createTicket, isPending } = useCreateTicket();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [ticketType, setTicketType] = useState("bug");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const prefix =
      ticketType === "bug"
        ? "[Bug] "
        : ticketType === "feature"
        ? "[Suggestion] "
        : "[Help] ";

    createTicket(
      { subject: prefix + subject.trim(), message: message.trim() },
      {
        onSuccess: () => {
          setSubmitted(true);
          setTimeout(() => {
            onOpenChange(false);
            setSubmitted(false);
            setSubject("");
            setMessage("");
            setTicketType("bug");
          }, 2000);
        },
        onError: (err) => {
          toast.error(err?.message || "Failed to create ticket");
        },
      }
    );
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setSubject("");
      setMessage("");
      setTicketType("bug");
      setSubmitted(false);
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto bg-[#141414] border-white/10 text-[#FFFBF4]">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2 text-[#FFFBF4]">
            <MessageCircle className="w-5 h-5 text-[#4ADE80]" />
            Create Support Ticket
          </DialogTitle>
          <DialogDescription className="text-[#8A8578]">
            Describe your issue or suggestion and we&apos;ll look into it.
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex flex-col items-center justify-center py-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <div className="w-16 h-16 rounded-full bg-[#4ADE80]/10 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-[#4ADE80]" />
                </div>
              </motion.div>
              <h3 className="text-lg font-semibold text-[#FFFBF4] mb-1">
                Ticket Created!
              </h3>
              <p className="text-sm text-[#8A8578] text-center">
                We&apos;ve received your ticket and will respond soon.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4 mt-2"
            >
              <div className="space-y-2">
                <Label className="text-[#D8CFBC] text-xs font-medium">
                  What&apos;s this about?
                </Label>
                <div className="flex gap-2">
                  {ticketTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setTicketType(type.value)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                        ticketType === type.value
                          ? "border-[#4ADE80] bg-[#4ADE80]/10 text-[#FFFBF4]"
                          : "border-white/10 bg-[#0A0A0A] text-[#8A8578] hover:border-white/20"
                      }`}
                    >
                      <type.icon className={`w-3.5 h-3.5 ${type.color}`} />
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[#D8CFBC] text-xs font-medium">
                  Subject
                </Label>
                <Input
                  placeholder="Brief description of your issue"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={isPending}
                  className="bg-[#0A0A0A] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:border-[#4ADE80] focus-visible:ring-[#4ADE80]/20"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[#D8CFBC] text-xs font-medium">
                  Message
                </Label>
                <Textarea
                  placeholder="Describe your issue in detail. Include steps to reproduce if it's a bug..."
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isPending}
                  className="bg-[#0A0A0A] border-white/10 text-[#FFFBF4] placeholder:text-[#8A8578] focus-visible:border-[#4ADE80] focus-visible:ring-[#4ADE80]/20 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isPending || !subject.trim() || !message.trim()}
                className="w-full bg-[#4ADE80] hover:bg-[#4ADE80]/90 text-[#0A0A0A] font-semibold gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Ticket
                  </>
                )}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
