import { createApi } from "@reduxjs/toolkit/query/react";
import type { IChapter, IUpdateCoursePayload } from "@/types";
import baseQueryWithReauth from "@/redux/baseQuery";

export const chapterApi = createApi({
  reducerPath: "chapterApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Chapter", "Course", "Module"],
  endpoints: (builder) => ({
    createChapter: builder.mutation<
      { success: boolean; message: string; data: IChapter[] },
      { title: string; courseId: string; moduleId: string }
    >({
      query: ({ courseId, title, moduleId }) => ({
        url: "/chapter/create",
        method: "POST",
        body: { title, courseId, moduleId },
      }),
      invalidatesTags: (result, error, { courseId }) => [
        "Chapter",
        { type: "Course", id: courseId },
      ],
    }),

    uploadDataToMux: builder.mutation<
      {
        success: boolean;
        message: string;
        data: { url: string; upload_id: string };
      },
      void
    >({
      query: () => ({
        url: "/chapter/mux/upload-video",
        method: "POST",
        body: {},
      }),
    }),

    finalizeMuxUpload: builder.mutation<
      {
        success: boolean;
        message: string;
        data: { asset_id: string; playback_id: string };
      },
      { upload_id: string }
    >({
      query: ({ upload_id }) => ({
        url: "/chapter/mux/upload-video/complete",
        method: "POST",
        body: { upload_id },
      }),
    }),

    updateChapter: builder.mutation<
      IChapter,
      { id: string; courseId: string; updates: IUpdateCoursePayload }
    >({
      query: ({ id, courseId, updates }) => ({
        url: `/chapter/${courseId}/${id}`,
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
        url: `/chapter/${courseId}/${chapterId}/publish`,
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
        url: `/chapter/${courseId}/${chapterId}`,
        method: "GET",
      }),
      providesTags: (result, error, { chapterId }) => [
        { type: "Chapter", id: chapterId },
      ],
    }),

    updateChapterPositions: builder.mutation<
      { success: boolean; message: string; data: IChapter[] },
      {
        courseId: string;
        moduleId: string;
        list: { id: string; position: number }[];
      }
    >({
      query: ({ courseId, list, moduleId }) => ({
        url: `/chapter/reorder/${courseId}/${moduleId}`,
        method: "PUT",
        body: { list },
      }),
      invalidatesTags: (result, error, { courseId }) => [
        "Chapter",
        { type: "Course", id: courseId },
      ],
    }),

    deleteChapter: builder.mutation<
      { message: string },
      { courseId: string; moduleId: string; chapterId: string }
    >({
      query: ({ courseId, moduleId, chapterId }) => ({
        url: `/chapter/${courseId}/module/${moduleId}/delete-chapter/${chapterId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { moduleId }) => [
        "Module",
        { type: "Module", moduleId },
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
  useFinalizeMuxUploadMutation,
  useDeleteChapterMutation,
} = chapterApi;
