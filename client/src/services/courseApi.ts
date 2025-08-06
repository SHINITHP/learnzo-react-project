import baseQueryWithReauth from "@/redux/baseQuery";
import type { CourseByIdResponse, CourseResponse, ICategoryResponse } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Course"],
  endpoints: (builder) => ({
    getCourses: builder.query<CourseResponse, void>({
      query: () => "/user/courses",
      providesTags: ["Course"],
    }),

    getCourseById: builder.query<CourseByIdResponse, string>({
      query: (id) => `/user/courses/${id}`,
      providesTags: (result, error, id) => [{ type: "Course", id }],
    }),
    getCategories: builder.query<ICategoryResponse, void>({
      query: () => "/user/courses/categories",
    }),
  }),
});

export const { useGetCoursesQuery, useGetCourseByIdQuery, useGetCategoriesQuery } = courseApi;
