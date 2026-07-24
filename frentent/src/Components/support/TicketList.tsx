"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MessageCircle,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Archive,
} from "lucide-react";
import { useTickets } from "@/src/hooks/useSupport";
import type { SupportTicket } from "@/src/types/support";

const statusConfig: Record<
  SupportTicket["status"],
  { label: string; icon: typeof Clock; color: string; bg: string; border: string }
> = {
  OPEN: {
    label: "Open",
    icon: AlertCircle,
    color: "text-[#FACC15]",
    bg: "bg-[#FACC15]/10",
    border: "border-[#FACC15]/20",
  },
  IN_PROGRESS: {
    label: "In Progress",
    icon: Clock,
    color: "text-[#60A5FA]",
    bg: "bg-[#60A5FA]/10",
    border: "border-[#60A5FA]/20",
  },
  RESOLVED: {
    label: "Resolved",
    icon: CheckCircle,
    color: "text-[#4ADE80]",
    bg: "bg-[#4ADE80]/10",
    border: "border-[#4ADE80]/20",
  },
  CLOSED: {
    label: "Closed",
    icon: Archive,
    color: "text-[#8A8578]",
    bg: "bg-white/5",
    border: "border-white/10",
  },
};

function TicketCard({ ticket }: { ticket: SupportTicket }) {
  const status = statusConfig[ticket.status] || statusConfig.OPEN;
  const StatusIcon = status.icon;

 

  const timeAgo = getTimeAgo(ticket.createdAt);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <Card className="bg-[#141414] border-white/10 hover:border-white/20 transition-colors">
        <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-[#4ADE80]/10 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 text-[#4ADE80]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-[#FFFBF4] truncate">
                {ticket.subject}
              </h3>
              <p className="text-xs text-[#8A8578] truncate mt-0.5">
                {ticket.message}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-[#8A8578]">{ticket.TicketID}</span>
                <span className="text-[10px] text-[#8A8578]">·</span>
                <span className="text-[10px] text-[#8A8578]">{timeAgo}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Badge
              className={`${status.bg} ${status.color} border ${status.border} text-[10px] gap-1`}
            >
              <StatusIcon className="w-3 h-3" />
              {status.label}
            </Badge>
          
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function TicketSkeleton() {
  return (
    <div className="bg-[#141414] border border-white/10 rounded-xl p-4 flex items-center gap-3">
      <Skeleton className="w-10 h-10 rounded-lg bg-white/5 shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-48 bg-white/5" />
        <Skeleton className="h-3 w-72 bg-white/5" />
      </div>
      <Skeleton className="h-5 w-20 rounded-full bg-white/5" />
    </div>
  );
}

export function TicketList() {
  const { data, isLoading, error } = useTickets();
  const tickets = data?.data ?? [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#FFFBF4] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#4ADE80]" />
            Your Tickets
          </h2>
          <p className="text-sm text-[#8A8578] mt-0.5">
            Track your support requests
          </p>
        </div>
        {tickets.length > 0 && (
          <Badge className="bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/20 text-[10px]">
            {tickets.length} total
          </Badge>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <TicketSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <Card className="bg-[#141414] border-[#F87171]/30">
          <CardContent className="flex flex-col items-center justify-center py-10 gap-3">
            <AlertCircle className="w-8 h-8 text-[#F87171]" />
            <p className="text-[#F87171] font-medium text-sm">Failed to load tickets</p>
            <p className="text-xs text-[#8A8578]">{error.message}</p>
          </CardContent>
        </Card>
      ) : tickets.length === 0 ? (
        <Card className="bg-[#141414] border border-dashed border-white/10">
          <CardContent className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center">
              <FileText className="w-7 h-7 text-[#8A8578]" />
            </div>
            <p className="text-[#8A8578] text-sm">No tickets yet</p>
            <p className="text-xs text-[#8A8578]/60">
              Create a ticket to report an issue or suggest a feature
            </p>
          </CardContent>
        </Card>
      ) : (
        <AnimatePresence mode="popLayout">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.TicketID} ticket={ticket} />
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}

function getTimeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
