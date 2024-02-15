import express from 'express';
const router = express.Router();
import {
  getFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
} from '../controllers/foodController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Route: /api/foods

// All Private routes are protected by the protect middleware
// Make sure this is added to the route in the route file

// Route: /api/foods

// Route for all foods & creating a new food
router.route('/').get(protect, getFoods).post(protect, createFood);

// Route for a single food using id, updating a food, & deleting a food
router
  .route('/:id')
  .get(protect, getFoodById)
  .put(protect, updateFood)
  .delete(protect, deleteFood);



export default router;
