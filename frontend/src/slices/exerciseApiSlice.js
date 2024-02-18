import { EXERCISES_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const exerciseApiSlice = apiSlice.injectEndpoints({
  // Get all exercises from the exercises endpoint
  endpoints: (builder) => ({
    getExercises: builder.query({
      query: () => ({
        url: EXERCISES_URL,
        method: 'GET',
      }),
      keepUnusedDataFor: 5, // Keep unused data for 5 seconds
    }),
  }),
});

export const { useGetExercisesQuery } = exerciseApiSlice;
