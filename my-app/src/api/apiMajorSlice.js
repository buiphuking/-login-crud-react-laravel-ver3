import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL_API } from "../config/constant";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${SERVER_URL_API}`,
    prepareHeaders: (headers, { getState }) => {
      const token = JSON.parse(localStorage.getItem('token'));
      // Get token from store (userSlice)
      // const token = getState().user?.token;
      console.log(token);
      // Add token to headers
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Major', 'Club','Student'],
  //major
  endpoints: (builder) => ({
    getCount: builder.query({
      query: () => "/count",
      providesTags: ['Major','Club','Student'],
    }),
    getMajor: builder.query({
      query: () => "/major",
      providesTags: ['Major'],
    }),
    addMajor: builder.mutation({
      query: (data) => ({
        url: "/major/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Major'],
    }),
    getMajorId: builder.query({
      query: (id) => `/major/edit/${id}`,
    }),
    updateMajor: builder.mutation({
      query: (data) => ({
        url: `/major/update/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Major'],
    }),
    deleteMajor: builder.mutation({
      query: ({ id }) => ({
        url: `/major/delete/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ['Major'],
    }),
    // club
    getClub: builder.query({
      query: () => "/club",
      providesTags: ['Club'],
    }),
    addClub: builder.mutation({
      query: (data) => ({
        url: "/club/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Club'],
    }),
    getClubId: builder.query({
      query: (id) => `/club/edit/${id}`,
    }),
    updateClub: builder.mutation({
      query: (data) => ({
        url: `/club/update/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Club'],
    }),
    deleteClub: builder.mutation({
      query: ({ id }) => ({
        url: `/club/delete/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ['Club'],
    }),
    // student
    getStudents: builder.query({
      query: () => "/students",
      providesTags: ['Student'],
    }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/student/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Student'],
    }),
    getStudentId: builder.query({
      query: (id) => `/student/edit/${id}`,
    }),
    updateStudent: builder.mutation({
      query: (data) => ({
        url: `/student/update/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Student'],
    }),
    deleteStudent: builder.mutation({
      query: ({ id }) => ({
        url: `/student/delete/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ['Student'],
    }),
  }),
});

export const {
  //count
  useGetCountQuery,
  //major
  useGetMajorQuery,
  useAddMajorMutation,
  useGetMajorIdQuery,
  useUpdateMajorMutation,
  useDeleteMajorMutation,
  //club
  useGetClubQuery,
  useAddClubMutation,
  useGetClubIdQuery,
  useUpdateClubMutation,
  useDeleteClubMutation,
  //students
  useGetStudentsQuery,
  useAddStudentMutation,
  useGetStudentIdQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = apiSlice;
