import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/redux/store";
import type { ISignInResponse, ISignInRequest } from "@/types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/admin/auth/",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) headers.set("Authorization", `Bearer ${token}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<ISignInResponse, ISignInRequest>({
      query: (data) => ({
        url: "sign-in",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    refreshToken: builder.mutation<ISignInResponse, void>({
      query: () => ({
        url: "refreshToken",
        method: "POST",
        credentials: "include",
      }),
    }),
    adminLogout: builder.mutation<
      { data: { success: boolean } },
      { adminId: string }
    >({
      query: (data) => ({
        url: "logout",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useRefreshTokenMutation,
  useAdminLogoutMutation,
} = authApi;
