import { SETS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const setApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSet: builder.mutation({
      query: ({ set }) => ({
        url: SETS_URL,
        method: 'POST',
        body: set,
      }),
      invalidatesTags: ['Sets'],
    }),
  }),
});

export const { useCreateSetMutation } = setApiSlice;
