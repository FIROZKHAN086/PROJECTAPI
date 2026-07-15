import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "@/src/lib/hooks";
import { clearUser } from "@/src/lib/authSlice";
import { apiFetch, ApiError } from "@/src/lib/api";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "@/src/types/auth";

export function useLogin() {
  return useMutation<AuthResponse, ApiError, LoginPayload>({
    mutationFn: (payload) =>
      apiFetch<AuthResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
  });
}

export function useRegister() {
  return useMutation<AuthResponse, ApiError, RegisterPayload>({
    mutationFn: (payload) =>
      apiFetch<AuthResponse>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
  });
}

export function useLogout() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  return useMutation<{ success: boolean; message: string }, ApiError>({
    mutationFn: () =>
      apiFetch<{ success: boolean; message: string }>("/api/auth/logout", {
        method: "POST",
      }),
    onSuccess: () => {
      dispatch(clearUser());
      queryClient.clear();
    },
  });
}
