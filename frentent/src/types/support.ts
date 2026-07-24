export interface SupportTicket {
  id: number;
  TicketID: string;
  subject: string;
  message: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SupportTicketsResponse {
  success: boolean;
  source?: string;
  data: SupportTicket[];
}

export interface CreateTicketPayload {
  subject: string;
  message: string;
}
