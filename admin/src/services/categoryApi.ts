import type { RootState } from "@/redux/store";
import type { ICategoryResponse } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/admin/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({

    getCategories: builder.query<ICategoryResponse, void>({
      query: () => "/categories",
    }),

  }),
});

export const {
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
} = categoryApi;
