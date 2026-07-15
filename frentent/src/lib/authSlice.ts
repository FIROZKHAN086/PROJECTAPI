import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { apiFetch } from "@/src/lib/api";
import type { User, LoginPayload, RegisterPayload, AuthResponse } from "@/src/types/auth";

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
};

function loadUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
}

function saveUser(user: User | null) {
  if (typeof window === "undefined") return;
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
  }
}

export const loginUser = createAsyncThunk<AuthResponse, LoginPayload>(
  "auth/login",
  async (payload) => {
    return apiFetch<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }
);

export const registerUser = createAsyncThunk<AuthResponse, RegisterPayload>(
  "auth/register",
  async (payload) => {
    return apiFetch<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  return apiFetch<{ success: boolean; message: string }>("/api/auth/logout", {
    method: "POST",
  });
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.isLoading = false;
      saveUser(action.payload);
    },
    loadFromStorage(state) {
      state.user = loadUser();
      state.isLoading = false;
    },
    clearUser(state) {
      state.user = null;
      state.isLoading = false;
      saveUser(null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        saveUser(action.payload.user);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        saveUser(action.payload.user);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
        saveUser(null);
      });
  },
});

export const { setUser, loadFromStorage, clearUser } = authSlice.actions;
export default authSlice.reducer;
