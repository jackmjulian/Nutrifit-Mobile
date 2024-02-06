import asyncHandler from '../middleware/asyncHandler.js';
import { Food } from '../models/foodModel.js';

// All Private routes are protected by the protect middleware
// Make sure this is added to the route in the route file

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

// @desc    Create a food
// @route   POST /api/foods
// @access  Private
const createFood = asyncHandler(async (req, res) => {
  // res.send('create food');

  const { food_name, food_calories, food_protein, food_carbs, food_fat } =
    req.body;
  const food = new Food({
    user: req.user._id,
    // user,
    food_name,
    food_calories,
    food_protein,
    food_carbs,
    food_fat,
  });
  const createdFood = await food.save();
  res.status(201).json(createdFood);
});

export { getFoods, getFoodById, createFood };
