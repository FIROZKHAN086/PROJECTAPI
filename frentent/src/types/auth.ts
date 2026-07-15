export interface User {
  id: number;
  name: string | null;
  email: string;
  OneTimeID: string | null;
  token: string;
  role?: string;
  Role?: string;
  createdAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: User;
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
