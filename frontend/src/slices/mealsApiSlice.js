import { MEALS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const mealsApiSlice = apiSlice.injectEndpoints({
  // get all products from the meals endpoint
  endpoints: (builder) => ({
    getMeals: builder.query({
      query: () => ({
        url: MEALS_URL,
        method: 'GET',
      }),
      keepUnusedDataFor: 5, // Keep unused data for 5 seconds
    }),
  }),
});

export const { useGetMealsQuery } = mealsApiSlice;
