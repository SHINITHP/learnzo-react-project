import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/redux/store";
import type { IChapter, IUpdateCoursePayload } from "@/types";

export const chapterApi = createApi({
  reducerPath: "chapterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/admin/chapter",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Chapter", "Course"],
  endpoints: (builder) => ({
    createChapter: builder.mutation<
      { success: boolean; message: string; data: IChapter[] },
      { title: string; courseId: string }
    >({
      query: ({ courseId, title }) => ({
        url: "/create",
        method: "POST",
        body: { title, courseId },
      }),
      invalidatesTags: (result, error, { courseId }) => [
        "Chapter",
        { type: "Course", id: courseId },
      ],
    }),

    uploadDataToMux: builder.mutation<
      { success: boolean; message: string; data: { url: string; upload_id: string; } },
      void
    >({
      query: () => ({
        url: "/mux/upload-video",
        method: "POST",
        body: {},
      }),
    }),

    finalizeMuxUpload: builder.mutation<
      { success: boolean; message: string; data: { asset_id: string; playback_id: string; } },
      { upload_id: string }
    >({
      query: ({ upload_id }) => ({
        url: "/mux/upload-video/complete",
        method: "POST",
        body: { upload_id }
      }),
    }),

    updateChapter: builder.mutation<
      IChapter,
      { id: string; courseId: string; updates: IUpdateCoursePayload }
    >({
      query: ({ id, courseId, updates }) => ({
        url: `/${courseId}/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Chapter", id }],
    }),

    togglePublish: builder.mutation<
      { success: boolean; message: string; data: IChapter },
      { chapterId: string; courseId: string; publish: boolean }
    >({
      query: ({ chapterId, courseId, publish }) => ({
        url: `/${courseId}/${chapterId}/publish`,
        method: "PATCH",
        body: { publish },
      }),
      invalidatesTags: (result, error, { chapterId }) => [
        { type: "Chapter", id: chapterId },
      ],
    }),

    getChapterById: builder.query<
      { success: boolean; message: string; data: IChapter },
      { chapterId: string; courseId: string }
    >({
      query: ({ chapterId, courseId }) => ({
        url: `/${courseId}/${chapterId}`,
        method: "GET",
      }),
      providesTags: (result, error, { chapterId }) => [
        { type: "Chapter", id: chapterId },
      ],
    }),

    updateChapterPositions: builder.mutation<
      { success: boolean; message: string; data: IChapter[] },
      { courseId: string; list: { id: string; position: number }[] }
    >({
      query: ({ courseId, list }) => ({
        url: `/reorder/${courseId}`,
        method: "PUT",
        body: { list },
      }),
      invalidatesTags: (result, error, { courseId }) => [
        "Chapter",
        { type: "Course", id: courseId },
      ],
    }),
  }),
});

export const {
  useCreateChapterMutation,
  useGetChapterByIdQuery,
  useUpdateChapterPositionsMutation,
  useUpdateChapterMutation,
  useTogglePublishMutation,
  useUploadDataToMuxMutation,
  useFinalizeMuxUploadMutation
} = chapterApi;
