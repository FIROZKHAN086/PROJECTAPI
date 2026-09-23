const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL ;

if (process.env.NEXT_PUBLIC_ENV === "development") {
 console.log("Running in development mode" + API_BASE);
}

const TOKEN_KEY = "authToken";
const COOKIE_KEY = "authToken";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY) || readCookie(COOKIE_KEY);
}

export function setStoredToken(token: string | null): void {
  if (typeof window === "undefined") return;
  if (token) {
    window.localStorage.setItem(TOKEN_KEY, token);
    document.cookie = `${COOKIE_KEY}=${encodeURIComponent(token)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  } else {
    window.localStorage.removeItem(TOKEN_KEY);
    document.cookie = `${COOKIE_KEY}=; path=/; max-age=0; SameSite=Lax`;
  }
}

interface FetchOptions extends RequestInit {
  noAuth?: boolean;
}

export class ApiError extends Error {
  status: number;
  data: { success: boolean; message: string };

  constructor(status: number, data: { success: boolean; message: string }) {
    super(data.message);
    this.status = status;
    this.data = data;
  }
}

export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { noAuth, ...fetchOptions } = options;

  
  const token = getStoredToken();

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...fetchOptions,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...fetchOptions.headers,
    },
  });

  const data = await res.json();

  type WithToken = { success?: boolean; user?: { token?: string } };
  if (res.ok && data && (data as WithToken).user?.token) {
    setStoredToken((data as WithToken).user!.token!);
  }

  if (!res.ok) {
    throw new ApiError(res.status, data);
  }

  return data as T;
}