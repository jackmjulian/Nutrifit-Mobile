import { FOODS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const foodsApiSlice = apiSlice.injectEndpoints({
  // get all foods from the foods endpoint
  endpoints: (builder) => ({
    getFoods: builder.query({
      query: () => ({
        url: FOODS_URL,
        method: 'GET',
      }),
      keepUnusedDataFor: 5, // Keep unused data for 5 seconds
    }),
    createFoods: builder.mutation({
      query: ({ food }) => ({
        url: FOODS_URL,
        method: 'POST',
        body: food,
      }),
      invalidatesTags: ['Foods'],
    }),
    deleteFoods: builder.mutation({
      query: ({ id }) => ({
        url: `${FOODS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Foods'],
    }),
    updateFoods: builder.mutation({
      query: ({ id, food }) => ({
        url: `${FOODS_URL}/${id}`,
        method: 'PUT',
        body: food,
      }),
      invalidatesTags: ['Foods'],
    }),
  }),
});

export const {
  useGetFoodsQuery,
  useCreateFoodsMutation,
  useDeleteFoodsMutation,
  useUpdateFoodsMutation,
} = foodsApiSlice;
