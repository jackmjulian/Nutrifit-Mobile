import { WORKOUTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const workoutApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createWorkout: builder.mutation({
      query: ({ workout }) => ({
        url: WORKOUTS_URL,
        method: 'POST',
        body: workout,
      }),
      invalidatesTags: ['Workouts'],
    }),
    addExerciseToWorkout: builder.mutation({
      query: ({ workoutId, exercise }) => ({
        url: `${WORKOUTS_URL}/${workoutId}/addexercise`,
        method: 'POST',
        body: exercise,
      }),
      invalidatesTags: (result, error, { workoutId }) => [
        { type: 'Workouts', id: workoutId },
      ],
    }),
    getWorkouts: builder.query({
      query: () => ({
        url: WORKOUTS_URL,
      }),
      providesTags: ['Workouts'],
    }),
    getWorkoutByInstanceId: builder.query({
      query: (instanceId) => ({
        url: `${WORKOUTS_URL}/instance/${instanceId}`,
      }),
      providesTags: (result, error, instanceId) => [
        { type: 'Workouts', id: instanceId },
      ],
    }),
  }),
});

export const {
  useCreateWorkoutMutation,
  useAddExerciseToWorkoutMutation,
  useGetWorkoutsQuery,
  useGetWorkoutByInstanceIdQuery,
} = workoutApiSlice;
