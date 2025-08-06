import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Admin {
  userId: string;
  email: string;
  role: string;
}

interface AuthState {
  token: string | null;
  admin: Admin | null;
  isAuthenticated: boolean;
  tokenExpiry: number | null;
}

const initialState: AuthState = {
  token: null,
  admin: null,
  isAuthenticated: false,
  tokenExpiry: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ token: string; admin: Admin; tokenExpiry?: number }>
    ) => {
      state.token = action.payload.token;
      state.admin = action.payload.admin;
      state.isAuthenticated = true;
      state.tokenExpiry = action.payload.tokenExpiry || null;

      // Optionally persist auth *reference* (not the token itself!)
      localStorage.setItem("auth_event", "login");
    },
    logout: (state) => {
      state.token = null;
      state.admin = null;
      state.isAuthenticated = false;
      state.tokenExpiry = null;

      // Broadcast logout to all tabs
      localStorage.setItem("logout_event", Date.now().toString());
    },
  },
});

export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
