import { USERS_URL } from '../constants';
import { apiSlice } from './apiSlice';

// Add a new endpoint to the apiSlice
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Add a new endpoint which will be accessible at /api/users
    login: builder.mutation({
      // The data sent in the query is the users credentials
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    // Add a new endpoint which will be accessible at /api/register
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    // Add a new endpoint which will be accessible at /api/users/logout
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
    logNewWeight: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/weight`,
        method: 'POST',
        body: data,
      }),
    }),
    updateCalorieGoal: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/calorie-goal`,
        method: 'PUT',
        body: data,
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

// This is the standard export pattern for a Redux-connected component mutation
// prefix with 'use' and suffix with 'Mutation'
export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetUserByIdQuery,
  useLogNewWeightMutation,
  useUpdateCalorieGoalMutation,
  useUpdateUserProfileMutation,
} = usersApiSlice;
