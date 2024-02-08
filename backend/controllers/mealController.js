import asyncHandler from '../middleware/asyncHandler.js';
import { Meal, Food } from '../models/foodModel.js';

// @desc    Fetch all meals
// @route   GET /api/meals
// @access  Private
const getMeals = asyncHandler(async (req, res) => {
  const meals = await Meal.find({}); // empty object returns all foods
  res.status(200).json(meals);
  //   res.send('get all meals');
});

// @desc    Fetch single meal
// @route   GET /api/meals/:id
// @access  Private
const getMealById = asyncHandler(async (req, res) => {
  const meal = await Meal.findById(req.params.id); // req.params.id is the id from the url

  if (meal) {
    res.status(200).json(meal);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Create a meal
// @route   POST /api/meals
// @access  Private
const createMeal = asyncHandler(async (req, res) => {
  const { meal_name, meal_foods } = req.body;
  const meal = new Meal({
    user: req.user._id,
    meal_name,
    meal_foods,
  });
  const createdMeal = await meal.save();
  res.status(201).json(createdMeal);
});

// @desc    Add a food to a meal
// @route   POST /api/meals/:id/addfood
// @access  Private
const addFoodToMeal = asyncHandler(async (req, res) => {
  const meal = await Meal.findById(req.params.id); // req.params.id is the id from the url
  const foodId = req.body.food_id;
  if (meal) {
    const food = await Food.findById(foodId);
    // meal.meal_foods.push(food);
    const addedAt = new Date();
    meal.meal_foods.push({ ...food.toObject(), addedAt }); // Adding food with addedAt field to current time
    const updatedMeal = await meal.save();
    res.status(200).json(updatedMeal);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Update a meal
// @route   PUT /api/meals/:id
// @access  Private
const updateMeal = asyncHandler(async (req, res) => {
  const { meal_name, meal_foods } = req.body;
  const meal = await Meal.findById(req.params.id); // req.params.id is the id from the url

  if (meal) {
    meal.meal_name = meal_name || meal.meal_name;
    meal.meal_foods = meal_foods || meal.meal_foods;

    const updatedMeal = await meal.save();
    res.status(200).json(updatedMeal);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Delete a meal
// @route   DELETE /api/meals/:id
// @access  Private
const deleteMeal = asyncHandler(async (req, res) => {
  const meal = await Meal.findById(req.params.id); // req.params.id is the id from the url

  if (meal) {
    await meal.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Meal removed' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Delete a food from a meal
// @route   DELETE /api/meals/:id/deletefood
// @access  Private
const deleteFoodFromMeal = asyncHandler(async (req, res) => {
  const meal = await Meal.findById(req.params.id); // req.params.id is the id from the url
  const foodId = req.body.food_id;
  if (meal) {
    // Convert the food IDs to strings for proper comparison
    // In MongoDB, the _id is an ObjectId, so we need to convert it to a string
    const filteredFoods = meal.meal_foods.filter(
      (food) => food._id.toString() !== foodId.toString()
    );
    // Update the meal with the filtered foods
    meal.meal_foods = filteredFoods;
    const updatedMeal = await meal.save();
    res.status(200).json(updatedMeal);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

export {
  getMeals,
  getMealById,
  createMeal,
  updateMeal,
  deleteMeal,
  addFoodToMeal,
  deleteFoodFromMeal,
};
