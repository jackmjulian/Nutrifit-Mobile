import asyncHandler from '../middleware/asyncHandler.js';
import { Workout, Exercise } from '../models/workoutModel.js';

// @desc    Fetch all workouts
// @route   GET /api/workouts
// @access  Private
const getWorkouts = asyncHandler(async (req, res) => {
  const workouts = await Workout.find({}); // empty object returns all workouts
  res.status(200).json(workouts);
});

// @desc    Fetch single workout
// @route   GET /api/workouts/:id
// @access  Private
const getWorkoutById = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id); // req.params.id is the id from the url

  if (workout) {
    res.status(200).json(workout);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Create a workout
// @route   POST /api/workouts
// @access  Private
const createWorkout = asyncHandler(async (req, res) => {
  const { workout_name, workout_category, workout_description } = req.body;

  const workout = new Workout({
    user: req.user._id,
    workout_name,
    workout_category,
    workout_description,
  });

  const createdWorkout = await workout.save();
  res.status(201).json(createdWorkout);
});

// @desc    Add an exercise to a workout
// @route   POST /api/workouts/:id/addexercise
// @access  Private
const addExerciseToWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id); // req.params.id is the id from the url
  const exerciseId = req.body.exercise_id;
  if (workout) {
    const exercise = await Exercise.findById(exerciseId);
    workout.workout_exercises.push(exercise);
    const updatedWorkout = await workout.save();
    res.status(200).json(updatedWorkout);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Update a workout
// @route   PUT /api/workouts/:id
// @access  Private
const updateWorkout = asyncHandler(async (req, res) => {
  const { workout_name, workout_category, workout_description } = req.body;
  const workout = await Workout.findById(req.params.id); // req.params.id is the id from the url

  if (workout) {
    workout.workout_name = workout_name || workout.workout_name;
    workout.workout_category = workout_category || workout.workout_category;
    workout.workout_description =
      workout_description || workout.workout_description;

    const updatedWorkout = await workout.save();
    res.status(200).json(updatedWorkout);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Delete a workout
// @route   DELETE /api/workouts/:id
// @access  Private
const deleteWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id); // req.params.id is the id from the url

  if (workout) {
    await workout.remove();
    res.status(200).json({ message: 'Workout removed' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

export {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  addExerciseToWorkout,
};
