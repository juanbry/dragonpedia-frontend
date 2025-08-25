// src/features/characters/charactersApi.ts

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
    getPaginatedCharacters: builder.query<CharactersResponse, { page: number; limit: number }>({
      query: ({ page = 1, limit = 12 }) => `characters?page=${page}&limit=${limit}`,
    }),
    getCharacterSearch: builder.query<Character[], string>({
      query: (name) => `characters?name=${name}`,
    }),
    getCharacterById: builder.query<Character, string>({
      query: (id) => `characters/${id}`,
    }),
  }),
});

export const { useGetPaginatedCharactersQuery, useGetCharacterSearchQuery, useGetCharacterByIdQuery } = charactersApi;