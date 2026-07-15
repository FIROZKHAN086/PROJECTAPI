const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || "http://localhost:5000";

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
  const { noAuth, ...fetchOptions } = options;

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...fetchOptions,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(res.status, data);
  }

  return data as T;
}
