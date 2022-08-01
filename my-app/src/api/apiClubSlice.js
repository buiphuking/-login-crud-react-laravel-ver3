import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiClubSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api" }),
  tagTypes: ["Club"],
  endpoints: (builder) => ({
    getDatas: builder.query({
      query: () => "/club",
      transformResponse: (res) => res,
      providesTags: ["Club"],
    }),
    addMajor: builder.mutation({
      query: (data) => ({
        url: "/major/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Club"],
    }),
    getMajorId: builder.query({
      query: (id) => `/major/edit/${id}`,
      transformResponse: (res) => res,
      providesTags: ["Club"],
    }),
    updateMajor: builder.mutation({
      query: (data) => ({
        url: `/major/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Club"],
    }),
    deleteMajor: builder.mutation({
      query: ({ id }) => ({
        url: `/major/delete/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Club"],
    }),
  }),
});

export const {
  useGetDatasQuery,
  // useAddMajorMutation,
  // useGetMajorIdQuery,
  // useUpdateMajorMutation,
  // useDeleteMajorMutation,
} = apiClubSlice;
