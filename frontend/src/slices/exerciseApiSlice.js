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
    createExercise: builder.mutation({
      query: ({ exercise }) => ({
        url: EXERCISES_URL,
        method: 'POST',
        body: exercise,
      }),
      invalidatesTags: ['Exercises'],
    }),
    addSetToExercise: builder.mutation({
      query: ({ exerciseId, set }) => ({
        url: `${EXERCISES_URL}/${exerciseId}/addset`,
        method: 'POST',
        body: set,
      }),
      invalidatesTags: (result, error, { exerciseId }) => [
        { type: 'Exercises', id: exerciseId },
      ],
    }),
  }),
});

export const {
  useGetExercisesQuery,
  useCreateExerciseMutation,
  useAddSetToExerciseMutation,
} = exerciseApiSlice;
