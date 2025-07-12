import type { RootState } from "@/redux/store";
import type { CourseResponse, ICategoryResponse } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/user/courses",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      console.log("Preparing headers for course API", token);
      if (token) headers.set("Authorization", `Bearer ${token}`);
      console.log(token);
      return headers;
    },
  }),
  tagTypes: ["Course"],
  endpoints: (builder) => ({
    getCourses: builder.query<CourseResponse, void>({
      query: () => "",
      providesTags: ["Course"],
    }),

    getCourseById: builder.query<CourseResponse, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Course", id }],
    }),
    getCategories: builder.query<ICategoryResponse, void>({
      query: () => "/categories",
    }),
  }),
});

export const { useGetCoursesQuery, useGetCourseByIdQuery, useGetCategoriesQuery } = courseApi;
