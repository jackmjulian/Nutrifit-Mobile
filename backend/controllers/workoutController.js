import asyncHandler from '../middleware/asyncHandler.js';
import { Workout } from '../models/workoutModel.js';
import { Exercise } from '../models/workoutModel.js';
import { Set } from '../models/workoutModel.js';

// @desc Fetch all workouts
// @route GET /api/workouts
// @access Private
const getWorkouts = asyncHandler(async (req, res) => {
  const workouts = await Workout.find({}); // empty object returns all workouts
  res.status(200).json(workouts);
});

// @desc Fetch single workout
// @route GET /api/workouts/:id
// @access Private
const getWorkoutById = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id); // req.params.id is the id from the url

  if (workout) {
    res.status(200).json(workout);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

export { getWorkouts, getWorkoutById };
