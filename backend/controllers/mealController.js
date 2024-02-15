import asyncHandler from '../middleware/asyncHandler.js';
import mongoose from 'mongoose';
import { Meal, Food } from '../models/foodModel.js';

// @desc    Fetch all meals
// @route   GET /api/meals
// @access  Private
const getMeals = asyncHandler(async (req, res) => {
  const meals = await Meal.find({}); // empty object returns all foods
  res.status(200).json(meals);
  //   res.send('get all meals');
});

// @desc    Fetch meals by user
// @route   GET /api/meals/user
// @access  Private
const getMealsByUser = asyncHandler(async (req, res) => {
  const meals = await Meal.find({ user: req.user._id });
  res.status(200).json(meals);
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
  const foodId = req.body.foodId; // get the food id from the request
  const foodInstance = await Food.findById(foodId);

  // If the meal instance is not found, return a 404 error
  if (!meal) {
    res.status(404);
    throw new Error('Meal not found');
  }

  // If the food instance is not found, return a 404 error
  if (!foodInstance) {
    res.status(404);
    throw new Error('Food not found');
  }

  // Generate a unique identifier for the food instance within the meal
  // This is used for updating and deleting the food instance from the meal
  const foodInstanceId = new mongoose.Types.ObjectId();

  // Create a new food object with the additional field food_instance_id
  const foodToAdd = {
    ...foodInstance.toObject(),
    addedAt: new Date(),
    food_instance_id: foodInstanceId,
  };

  // Push the food instance to the meal
  meal.meal_foods.push(foodToAdd);

  const updatedMeal = await meal.save();
  res.status(200).json(updatedMeal);
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
  // req.params.id is the id from the url
  const meal = await Meal.findById(req.params.id);

  // get the food id from the request
  const foodInstanceId = req.body.foodInstanceId;

  if (meal) {
    // Filter out the food instance with the matching food_instance_id
    meal.meal_foods = meal.meal_foods.filter(
      (food) => food.food_instance_id.toString() !== foodInstanceId
    );

    // Update the meal with the filtered foods
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
  getMealsByUser,
  createMeal,
  updateMeal,
  deleteMeal,
  addFoodToMeal,
  deleteFoodFromMeal,
};
