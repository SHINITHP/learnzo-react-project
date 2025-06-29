import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Admin {
  userId: string;
  email: string;
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
      action: PayloadAction<{ token: string; admin: Admin }>
    ) => {
      state.token = action.payload.token;
      state.admin = action.payload.admin;
      state.isAuthenticated = true;
      state.tokenExpiry = Date.now() + 15 * 60 * 1000;
      localStorage.setItem('jwtToken', action.payload.token);
      localStorage.setItem('userId', action.payload.admin.userId);
    },
    logout: (state) => {
      state.token = null;
      state.admin = null;
      state.isAuthenticated = false;
      state.tokenExpiry = null;
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userId');
    },
    
  },
});

export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
