import asyncHandler from '../middleware/asyncHandler.js';
import { Food } from '../models/foodModel.js';

// @desc Fetch all foods
// @route GET /api/foods
// @access Private
const getFoods = asyncHandler(async (req, res) => {
  const foods = await Food.find({}); // empty object returns all foods
  res.status(200).json(foods);
});

// @desc Fetch single food
// @route GET /api/foods/:id
// @access Private
const getFoodById = asyncHandler(async (req, res) => {
  const food = await Food.findById(req.params.id); // req.params.id is the id from the url

  if (food) {
    res.status(200).json(food);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

export { getFoods, getFoodById };
