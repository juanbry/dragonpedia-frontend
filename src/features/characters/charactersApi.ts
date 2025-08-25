import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Character {
  id: number;
  name: string;
  image: string;
  race: string;
  ki: string;
  description: string;
}

export interface CharactersResponse {
  items: Character[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
}

export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dragonball-api.com/api/' }),
  endpoints: (builder) => ({
    getCharacters: builder.query<CharactersResponse, { page: number; limit: number }>({
      query: ({ page = 1, limit = 10 }) => `characters?page=${page}&limit=${limit}`,
    }),
    getCharacterById: builder.query<Character, string>({
      query: (id) => `characters/${id}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = charactersApi;