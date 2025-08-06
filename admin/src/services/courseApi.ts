import baseQueryWithReauth from "@/redux/baseQuery";
import type {
  ICourse,
  ICourseCreationResponse,
  ICourseByIDResponse,
  ICourseResponse,
  IUpdateCoursePayload,
} from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Course", "Attachments"],
  endpoints: (builder) => ({
    createCourse: builder.mutation<ICourseCreationResponse, { title: string }>({
      query: (course) => ({
        url: "/courses",
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
        url: `/courses/attachments`,
        method: "POST",
        body: { attachments },
      }),
      invalidatesTags: (result, error, { attachments }) =>
        result
          ? [{ type: "Course", id: attachments[0].courseId }, "Attachments"]
          : ["Attachments"],
    }),

    getCourses: builder.query<ICourseResponse, void>({
      query: () => "/courses/get-courses",
      providesTags: ["Course"],
    }),

    getCourseById: builder.query<ICourseByIDResponse, string>({
      query: (id) => `/courses/${id}`,
      providesTags: (result, error, id) => [{ type: "Course", id }],
    }),

    togglePublish: builder.mutation<
      ICourseResponse,
      { id: string; publish: boolean }
    >({
      query: ({ id, publish }) => ({
        url: `/courses/${id}/publish`,
        method: "PATCH",
        body: { publish },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Course", id: id }],
    }),

    updateCourse: builder.mutation<
      ICourse,
      { id: string; updates: IUpdateCoursePayload }
    >({
      query: ({ id, updates }) => ({
        url: `/courses/${id}`,
        method: "PATCH",
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Course", id }],
    }),
    deleteCourse: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/courses/delete-course/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Course", id },
        "Course",
      ],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useLazyGetCourseByIdQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useCreateAttachmentsMutation,
  useTogglePublishMutation,
  useDeleteCourseMutation,
} = courseApi;
