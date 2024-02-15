import express from 'express';
const router = express.Router();
import {
  getMeals,
  getMealById,
  getMealsByUser,
  createMeal,
  updateMeal,
  deleteMeal,
  addFoodToMeal,
  deleteFoodFromMeal,
} from '../controllers/mealController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// TODO: Add protect middleware to protect the route from unauthorized access

// Route: /api/meals

// Route for all meals & creating a new meal
router.route('/').get(protect, getMeals).post(protect, createMeal);

// Route for all meals by user
router.route('/:userId').get(protect, getMealsByUser);

// Route for a single meal using id, updating a meal, & deleting a meal
router
  .route('/:id')
  .get(protect, getMealById)
  .put(protect, updateMeal)
  .delete(protect, deleteMeal);

// Route for adding a food to a meal
router.route('/:id/addfood').post(protect, addFoodToMeal);

// Route for deleting a food from a meal
router.route('/:id/deletefood').delete(protect, deleteFoodFromMeal);

export default router;
