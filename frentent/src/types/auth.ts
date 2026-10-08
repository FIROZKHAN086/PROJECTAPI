export interface User {
  id: number;
  name: string | null;
  email: string;
  OneTimeID: string | null;
 userVerified: boolean;
  role?: string;
  Role?: string;
  createdAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  code?: "OTP_REQUIRED" | string;
  user: User;
}

export interface VerifyOtpPayload {
  otp: string;
}

export interface OtpActionResponse {
  success: boolean;
  message: string;
  code?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface ApiErrorResponse {
  success: boolean;
  message: string;
  error?: string;
}
