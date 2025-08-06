import { createApi } from "@reduxjs/toolkit/query/react";
import type { ISignInResponse, ISignInRequest } from "@/types";
import baseQueryWithReauth from "@/redux/baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    signIn: builder.mutation<ISignInResponse, ISignInRequest>({
      query: (data) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    adminLogout: builder.mutation<
      { data: { success: boolean } },
      { adminId: string }
    >({
      query: (data) => ({
        url: "/auth/logout",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useAdminLogoutMutation,
} = authApi;
