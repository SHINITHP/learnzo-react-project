import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/redux/store";
import type { IModule, IUpdateCoursePayload } from "@/types";

export const ModulesApi = createApi({
  reducerPath: "ModulesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/admin/modules",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Chapter", "Course", "Module"],
  endpoints: (builder) => ({
    createModules: builder.mutation<
      { success: boolean; message: string; data: IModule[] },
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

    updateModules: builder.mutation<
      IModule,
      { id: string; courseId: string; updates: IUpdateCoursePayload }
    >({
      query: ({ id, courseId, updates }) => ({
        url: `/${courseId}/${id}`,
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
        url: `/${courseId}/${moduleId}/publish`,
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
        url: `/${courseId}/${moduleId}`,
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
        url: `/reorder/${courseId}`,
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
        url: `/${courseId}/delete-course/${moduleId}`,
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
