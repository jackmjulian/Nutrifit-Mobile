import { FOODS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const foodsApiSlice = apiSlice.injectEndpoints({
  // get all products from the foods endpoint
  endpoints: (builder) => ({
    getFoods: builder.query({
      query: () => ({
        url: FOODS_URL,
        method: 'GET',
      }),
      keepUnusedDataFor: 5, // Keep unused data for 5 seconds
    }),
  }),
});

export const { useGetFoodsQuery } = foodsApiSlice;
