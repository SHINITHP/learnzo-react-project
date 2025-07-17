import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/redux/store";
import type {
  ISignUpRequest,
  ISignUpResponse,
  IVerifyOTPResponse,
  IVerifyOTPRequest,
  ISignInResponse,
  ISignInRequest,
} from "@/types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/auth/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<ISignInResponse, ISignInRequest>({
      query: (credentials) => ({
        url: "sign-in",
        method: "POST",
        body: credentials,
      }),
    }),
    signUp: builder.mutation<ISignUpResponse, ISignUpRequest>({
      query: (credentials) => ({
        url: "sign-up",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyOTP: builder.mutation<IVerifyOTPResponse, IVerifyOTPRequest>({
      query: (data) => ({
        url: "verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    refreshToken: builder.mutation<ISignInResponse, void>({
      query: () => ({
        url: "refreshToken",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const { useSignInMutation, useRefreshTokenMutation, useSignUpMutation, useVerifyOTPMutation } =
  authApi;
