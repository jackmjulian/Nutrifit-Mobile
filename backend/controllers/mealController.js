import asyncHandler from '../middleware/asyncHandler.js';
import { Meal } from '../models/foodModel.js';

// @desc Fetch all meals
// @route GET /api/meals
// @access Private
const getMeals = asyncHandler(async (req, res) => {
  const meals = await Meal.find({}); // empty object returns all foods
  res.status(200).json(meals);
  //   res.send('get all meals');
});

export { getMeals };
