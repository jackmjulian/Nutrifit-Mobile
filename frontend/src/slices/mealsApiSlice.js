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
    getMealsByUser: builder.query({
      query: ({ userId }) => ({
        url: `${MEALS_URL}/${userId}`, // Concatenate user with the base URL
        method: 'GET',
      }),
      keepUnusedDataFor: 5, // Keep unused data for 5 seconds
    }),
    addFoodToMeal: builder.mutation({
      query: ({ mealId, foodId }) => ({
        url: `${MEALS_URL}/${mealId}/addfood`, // Concatenate mealId with the base URL
        method: 'POST',
        body: { foodId },
      }),
    }),
    deleteFoodFromMeal: builder.mutation({
      query: ({ mealId, foodInstanceId }) => ({
        url: `${MEALS_URL}/${mealId}/deletefood`, // Concatenate mealId with the base URL
        method: 'DELETE',
        body: { foodInstanceId },
      }),
    }),
    createNewMeal: builder.mutation({
      query: ({data}) => ({
        url: `${MEALS_URL}`, // Concatenate userId with the base URL
        method: 'POST',
        body: data,
      }),
    }),
    updateMeal: builder.mutation({
      query: ({ mealId, mealName }) => ({
        url: `${MEALS_URL}/${mealId}`, // Concatenate mealId with the base URL
        method: 'PUT',
        body: mealName,
      }),
    }),
    deleteMeal: builder.mutation({
      query: ({ mealId }) => ({
        url: `${MEALS_URL}/${mealId}`, // Concatenate mealId with the base URL
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetMealsQuery,
  useGetMealsByUserQuery,
  useAddFoodToMealMutation,
  useDeleteFoodFromMealMutation,
  useCreateNewMealMutation,
  useUpdateMealMutation,
  useDeleteMealMutation,
} = mealsApiSlice;
