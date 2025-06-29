import type { RootState } from "@/redux/store";
import type { IAttachment, ICourse, IUpdateCoursePayload } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/admin/courses",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Course", "Attachments"],
  endpoints: (builder) => ({
    createCourse: builder.mutation<ICourse, { title: string }>({
      query: (course) => ({
        url: "/",
        method: "POST",
        body: course,
      }),
      invalidatesTags: ["Course"],
    }),

    createAttachments: builder.mutation<
      { ids: string[] },
      { attachments: { name: string; url: string; courseId: string }[] }
    >({
      query: ({ attachments }) => ({
        url: `/attachments`,
        method: "POST",
        body: { attachments },
      }),
      invalidatesTags: (result, error, { attachments }) =>
        result
          ? [{ type: "Course", id: attachments[0].courseId }, "Attachments"]
          : ["Attachments"],
    }),

    getCourses: builder.query<ICourse[], void>({
      query: () => "/",
      providesTags: ["Course"],
    }),

    getCourseById: builder.query<ICourse, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Course', id }],
    }),

    updateCourse: builder.mutation<
      ICourse,
      { id: string; updates: IUpdateCoursePayload }
    >({
      query: ({ id, updates }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Course", id }],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useCreateAttachmentsMutation,
} = courseApi;
