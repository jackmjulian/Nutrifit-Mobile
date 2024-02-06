import express from 'express';
const router = express.Router();
import { getMeals } from '../controllers/mealController.js';

// TODO: Add protect middleware to protect the route from unauthorized access

// Route: /api/foods

// Route for all meals
router.route('/').get(getMeals);

// Route for a single food using id
// router.route('/:id').get(getFoodById);

export default router;
