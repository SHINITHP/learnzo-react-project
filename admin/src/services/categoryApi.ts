import baseQueryWithReauth from "@/redux/baseQuery";
import type { ICategoryResponse } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: baseQueryWithReauth,
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
