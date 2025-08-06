import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { IRefreshResponse, RootState } from "@/types";
import { logout, setAuth } from "./slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/admin",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.log("Access token expired. Trying refresh...");

    const refreshResult = (await baseQuery(
      "/auth/refresh-token",
      api,
      extraOptions
    )) as { data?: IRefreshResponse; error?: FetchBaseQueryError };

    console.log("Refresh result:", refreshResult, refreshResult.data);

    if (refreshResult.data?.success) {
      const { token, admin } = refreshResult.data.data;

      api.dispatch(
        setAuth({
          token,
          admin,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};
export default baseQueryWithReauth;
