import asyncHandler from '../middleware/asyncHandler.js';
import { Exercise, Set } from '../models/workoutModel.js';

// @desc    Fetch all exercises
// @route   GET /api/exercises
// @access  Private
const getExercises = asyncHandler(async (req, res) => {
  //   const exercises = await Exercise.find({}, 'exercise_name'); // returns only the exercise_name field
  const exercises = await Exercise.find({}); // empty object returns all exercises
  res.status(200).json(exercises);
});

// @desc    Fetch single exercise
// @route   GET /api/exercises/:id
// @access  Private
const getExerciseById = asyncHandler(async (req, res) => {
  const exercise = await Exercise.findById(req.params.id); // req.params.id is the id from the url

  if (exercise) {
    res.status(200).json(exercise);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Create an exercise
// @route   POST /api/exercises
// @access  Private
const createExercise = asyncHandler(async (req, res) => {
  const {
    exercise_name,
    exercise_type,
    exercise_category,
    exercise_description,
  } = req.body;

  const exercise = new Exercise({
    user: req.user._id,
    exercise_name,
    exercise_type,
    exercise_category,
    exercise_description,
  });

  const createdExercise = await exercise.save();
  res.status(201).json(createdExercise);
});

// @desc    Add a set to an exercise
// @route   POST /api/exercises/:id/addset
// @access  Private
const addSetToExercise = asyncHandler(async (req, res) => {
  const exercise = await Exercise.findById(req.params.id); // req.params.id is the id from the url
  const setId = req.body.set_id;
  if (exercise) {
    const set = await Set.findById(setId);
    exercise.exercise_sets.push(set);
    const updatedExercise = await exercise.save();
    res.status(200).json(updatedExercise);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Update an exercise
// @route   PUT /api/exercises/:id
// @access  Private
const updateExercise = asyncHandler(async (req, res) => {
  const {
    exercise_name,
    exercise_type,
    exercise_category,
    exercise_description,
  } = req.body;
  const exercise = await Exercise.findById(req.params.id); // req.params.id is the id from the url

  if (exercise) {
    exercise.exercise_name = exercise_name || exercise.exercise_name;
    exercise.exercise_type = exercise_type || exercise.exercise_type;
    exercise.exercise_category =
      exercise_category || exercise.exercise_category;
    exercise.exercise_description =
      exercise_description || exercise.exercise_description;

    const updatedExercise = await exercise.save();
    res.status(200).json(updatedExercise);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Delete an exercise
// @route   DELETE /api/exercises/:id
// @access  Private
const deleteExercise = asyncHandler(async (req, res) => {
  const exercise = await Exercise.findById(req.params.id); // req.params.id is the id from the url

  if (exercise) {
    await exercise.remove();
    res.status(200).json({ message: 'Exercise removed' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

export {
  getExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
  addSetToExercise
};
