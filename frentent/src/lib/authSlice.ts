import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { apiFetch, ApiError, setStoredToken } from "@/src/lib/api";
import type {
  User,
  LoginPayload,
  RegisterPayload,
  AuthResponse,
  VerifyOtpPayload,
  OtpActionResponse,
} from "@/src/types/auth";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  otpRequired: boolean;
  pendingEmail: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  otpRequired: false,
  pendingEmail: null,
};

interface MeResponse {
  success: boolean;
  user: {
    id: number;
    name: string | null;
    email: string;
    role: string;
    userVerified: boolean;
    OneTimeID: string | null;
    createdAt: string;
  };
}

export type OtpErrorValue = { status: number } & OtpActionResponse;

export const fetchMe = createAsyncThunk<MeResponse>("auth/me", async () => {
  return apiFetch<MeResponse>("/api/auth/get-me", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
});

export const loginUser = createAsyncThunk<AuthResponse, LoginPayload>(
  "auth/login",
  async (payload) => {
    return apiFetch<AuthResponse>("/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  }
);

export const registerUser = createAsyncThunk<AuthResponse, RegisterPayload>(
  "auth/register",
  async (payload) => {
    return apiFetch<AuthResponse>("/api/auth/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  }
);

export const verifyOtp = createAsyncThunk<
  AuthResponse,
  VerifyOtpPayload,
  { rejectValue: OtpErrorValue }
>("auth/verify-otp", async (payload, { rejectWithValue }) => {
  try {
    return await apiFetch<AuthResponse>("/api/auth/verify-otp", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return rejectWithValue({ status: error.status, ...error.data });
    }
    throw error;
  }
});

export const resendOtp = createAsyncThunk<
  OtpActionResponse,
  void,
  { rejectValue: OtpErrorValue }
>("auth/resend-otp", async (_, { rejectWithValue }) => {
  try {
    return await apiFetch<OtpActionResponse>("/api/auth/resend-otp", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return rejectWithValue({ status: error.status, ...error.data });
    }
    throw error;
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  setStoredToken(null);
  return apiFetch<{ success: boolean; message: string }>("/api/auth/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
});

const applyUser = (state: AuthState, user: User) => {
  state.user = user;
  state.isAuthenticated = user.userVerified === true;
  state.isLoading = false;
  if (state.isAuthenticated) {
    state.otpRequired = false;
    state.pendingEmail = null;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      if (action.payload) {
        applyUser(state, action.payload);
      } else {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      }
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.otpRequired = false;
      state.pendingEmail = null;
    },
    beginOtpVerification(state, action: PayloadAction<string>) {
      state.otpRequired = true;
      state.pendingEmail = action.payload;
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    cancelOtpVerification(state) {
      state.otpRequired = false;
      state.pendingEmail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        const u = action.payload.user;
        applyUser(state, {
          id: u.id,
          name: u.name,
          email: u.email,
          OneTimeID: u.OneTimeID,
          userVerified: u.userVerified,
          role: u.role,
          createdAt: u.createdAt,
        });
      })
      .addCase(fetchMe.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        applyUser(state, action.payload.user);
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { user, code } = action.payload;
        if (code === "OTP_REQUIRED" || !user.userVerified) {
          state.user = null;
          state.isAuthenticated = false;
          state.otpRequired = true;
          state.pendingEmail = user.email;
          state.isLoading = false;
          return;
        }
        applyUser(state, user);
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        applyUser(state, action.payload.user);
      })
      .addCase(verifyOtp.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.otpRequired = false;
        state.pendingEmail = null;
      });
  },
});

export const {
  setUser,
  clearUser,
  beginOtpVerification,
  cancelOtpVerification,
} = authSlice.actions;
export default authSlice.reducer;
