import asyncHandler from '../middleware/asyncHandler.js';
import { Set } from '../models/workoutModel.js';

// @desc    Fetch all sets
// @route   GET /api/sets
// @access  Private
const getSets = asyncHandler(async (req, res) => {
  const sets = await Set.find({}); // empty object returns all sets
  res.status(200).json(sets);
});

// @desc    Fetch single set
// @route   GET /api/sets/:id
// @access  Private
const getSetById = asyncHandler(async (req, res) => {
  const set = await Set.findById(req.params.id); // req.params.id is the id from the url

  if (set) {
    res.status(200).json(set);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Create a set
// @route   POST /api/sets
// @access  Private
const createSet = asyncHandler(async (req, res) => {
  const { set_weight, set_reps, set_notes, workout_instance_id } = req.body;

  const set = new Set({
    user: req.user._id,
    set_weight,
    set_reps,
    set_notes,
    workout_instance_id, // Include workout_instance_id in the request body
  });

  const createdSet = await set.save();
  res.status(201).json(createdSet);
});

// @desc    Update a set
// @route   PUT /api/sets/:id
// @access  Private
const updateSet = asyncHandler(async (req, res) => {
  const { set_weight, set_reps, set_notes } = req.body;
  const set = await Set.findById(req.params.id); // req.params.id is the id from the url

  if (set) {
    set.set_weight = set_weight || set.set_weight;
    set.set_reps = set_reps || set.set_reps;
    set.set_notes = set_notes || set.set_notes;

    const updatedSet = await set.save();
    res.status(200).json(updatedSet);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Delete a set
// @route   DELETE /api/sets/:id
// @access  Private
const deleteSet = asyncHandler(async (req, res) => {
  const set = await Set.findById(req.params.id); // req.params.id is the id from the url

  if (set) {
    await set.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Resource removed' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

export { getSets, getSetById, createSet, updateSet, deleteSet };
