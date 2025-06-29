import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/redux/store";
import type { IChapter } from "@/types";

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

export const { useCreateChapterMutation, useUpdateChapterPositionsMutation } =
  chapterApi;
