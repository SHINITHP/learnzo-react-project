import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  ISignUpRequest,
  ISignUpResponse,
  IVerifyOTPResponse,
  IVerifyOTPRequest,
  ISignInResponse,
  ISignInRequest,
} from "@/types";
import baseQueryWithReauth from "@/redux/baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    signIn: builder.mutation<ISignInResponse, ISignInRequest>({
      query: (credentials) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: credentials,
      }),
    }),
    signUp: builder.mutation<ISignUpResponse, ISignUpRequest>({
      query: (credentials) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyOTP: builder.mutation<IVerifyOTPResponse, IVerifyOTPRequest>({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    
  }),
});

export const { useSignInMutation, useSignUpMutation, useVerifyOTPMutation } =
  authApi;
