import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/redux/store";
import type { VerifyOTPRequest } from "@/types";

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
    signIn: builder.mutation({
      query: (credentials) => ({
        url: "sign-in",
        method: "POST",
        body: credentials,
      }),
    }),
    signUp: builder.mutation<
      {
        success: boolean;
        message: string;
        data: { email: string; token: string };
      },
      {
        fullName: string;
        email: string;
        password: string;
        confirmPassword: string;
      }
    >({
      query: (credentials) => ({
        url: "sign-up",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyOTP: builder.mutation<
      {
        success: boolean;
        message: string;
        data: any;
      },
      VerifyOTPRequest
    >({
      query: (data) => ({
        url: "verify-otp",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useVerifyOTPMutation } =
  authApi;
