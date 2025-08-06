import { createApi } from "@reduxjs/toolkit/query/react";
import type { IModule, IUpdateCoursePayload } from "@/types";
import baseQueryWithReauth from "@/redux/baseQuery";

export const ModulesApi = createApi({
  reducerPath: "ModulesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Chapter", "Course", "Module"],
  endpoints: (builder) => ({
    createModules: builder.mutation<
      { success: boolean; message: string; data: IModule[] },
      { title: string; courseId: string }
    >({
      query: ({ courseId, title }) => ({
        url: "/modules/create",
        method: "POST",
        body: { title, courseId },
      }),
      invalidatesTags: (result, error, { courseId }) => [
        "Chapter",
        { type: "Course", id: courseId },
      ],
    }),

    updateModules: builder.mutation<
      IModule,
      { id: string; courseId: string; updates: IUpdateCoursePayload }
    >({
      query: ({ id, courseId, updates }) => ({
        url: `/modules/${courseId}/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Module", id }],
    }),

    togglePublish: builder.mutation<
      { success: boolean; message: string; data: IModule },
      { moduleId: string; courseId: string; publish: boolean }
    >({
      query: ({ moduleId, courseId, publish }) => ({
        url: `/modules/${courseId}/${moduleId}/publish`,
        method: "PATCH",
        body: { publish },
      }),
      invalidatesTags: (result, error, { moduleId }) => [
        { type: "Module", id: moduleId },
      ],
    }),

    getModulesById: builder.query<
      { success: boolean; message: string; data: IModule },
      { moduleId: string; courseId: string }
    >({
      query: ({ moduleId, courseId }) => ({
        url: `/modules/${courseId}/${moduleId}`,
        method: "GET",
      }),
      providesTags: (result, error, { moduleId }) => [
        { type: "Module", id: moduleId },
      ],
    }),

    updateModulesPositions: builder.mutation<
      { success: boolean; message: string; data: IModule[] },
      { courseId: string; list: { id: string; position: number }[] }
    >({
      query: ({ courseId, list }) => ({
        url: `/modules/reorder/${courseId}`,
        method: "PUT",
        body: { list },
      }),
      invalidatesTags: (result, error, { courseId }) => [
        "Module",
        { type: "Course", id: courseId },
      ],
    }),

    deleteModule: builder.mutation<{ message: string }, { courseId: string; moduleId: string; }>({
      query: ({ courseId, moduleId }) => ({
        url: `/modules/${courseId}/delete-course/${moduleId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { moduleId }) => [
        { type: "Module", moduleId },
        "Module",
      ],
    }),
  }),
});

export const {
  useCreateModulesMutation,
  useUpdateModulesMutation,
  useTogglePublishMutation,
  useGetModulesByIdQuery,
  useUpdateModulesPositionsMutation,
  useDeleteModuleMutation,
} = ModulesApi;
