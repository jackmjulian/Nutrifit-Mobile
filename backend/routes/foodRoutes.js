import express from 'express';
const router = express.Router();
import {
  getFoods,
  getFoodById,
  createFood,
} from '../controllers/foodController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// TODO: Add protect middleware to protect the route from unauthorized access

// All Private routes are protected by the protect middleware
// Make sure this is added to the route in the route file

// Route: /api/foods

// Route for all foods & creating a new food
router.route('/').get(getFoods).post(protect, createFood);

// Route for a single food using id
router.route('/:id').get(protect, getFoodById);

// TODO: Add the rest of the routes

export default router;
