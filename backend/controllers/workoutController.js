import { v4 as uuidv4 } from 'uuid';
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

// @desc    Fetch single workout by workout instance ID
// @route   GET /api/workouts/:instanceId
// @access  Private
const getWorkoutByInstanceId = asyncHandler(async (req, res) => {
  const workout = await Workout.findOne({
    workout_instance_id: req.params.instanceId,
    // user: req.user._id, // Optionally, if you need to filter by user
  });

  if (workout) {
    res.status(200).json(workout);
  } else {
    res.status(404);
    throw new Error('Workout not found');
  }
});

// @desc    Create a workout
// @route   POST /api/workouts
// @access  Private
const createWorkout = asyncHandler(async (req, res) => {
  const { workout_name, workout_category, workout_description } = req.body; // Include workout_instance_id in the request body

  // Generate a random UUID for workout_instance_id
  const workout_instance_id = uuidv4();

  const workout = new Workout({
    user: req.user._id,
    workout_name,
    workout_category,
    workout_description,
    workout_instance_id, // Set workout_instance_id for the workout
  });

  const createdWorkout = await workout.save();
  res.status(201).json(createdWorkout);
});

// @desc    Add an exercise to a workout
// @route   POST /api/workouts/:id/addexercise
// @access  Private
const addExerciseToWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  const { exercise_id, workout_instance_id } = req.body; // Include workout_instance_id in the request body
  if (workout) {
    const exercise = await Exercise.findById(exercise_id);
    exercise.workout_instance_id = workout_instance_id; // Set workout_instance_id for the exercise
    workout.workout_exercises.push(exercise);
    const updatedWorkout = await workout.save();
    res.status(200).json(updatedWorkout);
  } else {
    res.status(404);
    throw new Error('Workout not found');
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
    await workout.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Workout removed' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

export {
  getWorkouts,
  getWorkoutById,
  getWorkoutByInstanceId,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  addExerciseToWorkout,
};
