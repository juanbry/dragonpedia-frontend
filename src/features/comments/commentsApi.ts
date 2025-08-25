import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
  date?: string;
}

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dragonpedia-backend.onrender.com/' }),
  tagTypes: ['Comments'],
  endpoints: (builder) => ({
    getCommentsByPostId: builder.query<Comment[], number>({
      query: (postId) => `posts/${postId}/comments`,
      providesTags: ['Comments'],
    }),
    updateComment: builder.mutation<Comment, { id: number; body: string; name: string; email: string; date: string }>({
      query: (comment) => ({
        url: `comments/${comment.id}`,
        method: 'PUT',
        body: comment,
      }),
      invalidatesTags: ['Comments'],
    }),
    createComment: builder.mutation<Comment, Omit<Comment, 'id'>>({
      query: (comment) => ({
        url: `comments`,
        method: 'POST',
        body: comment,
      }),
      invalidatesTags: ['Comments'],
    }),
    deleteComment: builder.mutation<void, number>({
      query: (id) => ({
        url: `comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const { useGetCommentsByPostIdQuery, useUpdateCommentMutation, useCreateCommentMutation, useDeleteCommentMutation } = commentsApi;