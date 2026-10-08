import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { clearUser, verifyOtp, resendOtp } from "@/src/lib/authSlice";
import { apiFetch, ApiError, setStoredToken } from "@/src/lib/api";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  VerifyOtpPayload,
  OtpActionResponse,
} from "@/src/types/auth";
import type { OtpErrorValue } from "@/src/lib/authSlice";

const OTP_PENDING_KEY = "otpPending";
const OTP_PENDING_TTL_MS = 30 * 60 * 1000;

export function saveOtpPending(email: string) {
  try {
    window.localStorage.setItem(
      OTP_PENDING_KEY,
      JSON.stringify({ email, at: Date.now() })
    );
  } catch {
    /* storage unavailable */
  }
}

export function clearOtpPending() {
  try {
    window.localStorage.removeItem(OTP_PENDING_KEY);
  } catch {
    /* storage unavailable */
  }
}

export function readOtpPending(): string | null {
  try {
    const raw = window.localStorage.getItem(OTP_PENDING_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { email?: string; at?: number };
    if (
      !parsed?.email ||
      typeof parsed.at !== "number" ||
      Date.now() - parsed.at > OTP_PENDING_TTL_MS
    ) {
      clearOtpPending();
      return null;
    }
    return parsed.email;
  } catch {
    clearOtpPending();
    return null;
  }
}

export function useAuth() {
  const { user, isLoading, isAuthenticated, otpRequired, pendingEmail } =
    useAppSelector((state) => state.auth);

  return {
    user,
    isLoading,
    isAuthenticated,
    isVerified: user?.userVerified === true,
    otpRequired,
    pendingEmail,
  };
}

export function useLogin() {
  return useMutation<AuthResponse, ApiError, LoginPayload>({
    mutationFn: (payload) =>
      apiFetch<AuthResponse>("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }),
  });
}

export function useRegister() {
  return useMutation<AuthResponse, ApiError, RegisterPayload>({
    mutationFn: (payload) =>
      apiFetch<AuthResponse>("/api/auth/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }),
  });
}

export function useVerifyOtp() {
  const dispatch = useAppDispatch();
  return useMutation<AuthResponse, OtpErrorValue, VerifyOtpPayload>({
    mutationFn: (payload) => dispatch(verifyOtp(payload)).unwrap(),
  });
}

export function useResendOtp() {
  const dispatch = useAppDispatch();
  return useMutation<OtpActionResponse, OtpErrorValue, void>({
    mutationFn: () => dispatch(resendOtp()).unwrap(),
  });
}

export function useLogout() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  return useMutation<{ success: boolean; message: string }, ApiError>({
    mutationFn: () =>
      apiFetch<{ success: boolean; message: string }>("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onSuccess: () => {
      setStoredToken(null);
      clearOtpPending();
      dispatch(clearUser());
      queryClient.clear();
    },
  });
}
