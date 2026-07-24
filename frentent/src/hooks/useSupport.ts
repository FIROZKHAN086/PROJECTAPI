import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch, ApiError } from "@/src/lib/api";
import type {
  SupportTicket,
  SupportTicketsResponse,
  CreateTicketPayload,
} from "@/src/types/support";

export function useTickets() {
  return useQuery<SupportTicketsResponse, ApiError>({
    queryKey: ["tickets"],
    queryFn: () =>
      apiFetch<SupportTicketsResponse>("/api/support/get", {
        method: "GET",
      }),
  });
}

export function useCreateTicket() {
  const queryClient = useQueryClient();
  return useMutation<{ success: boolean; data: SupportTicket }, ApiError, CreateTicketPayload>({
    mutationFn: async (payload) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL }/api/support/create`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new ApiError(res.status, data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });
}

export function useDeleteTicket() {
  const queryClient = useQueryClient();
  return useMutation<{ success: boolean; message: string }, ApiError, string>({
    mutationFn: (ticketId) =>
      apiFetch<{ success: boolean; message: string }>(
        `/api/support/delete/${ticketId}`,
        { method: "DELETE" }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });
}
