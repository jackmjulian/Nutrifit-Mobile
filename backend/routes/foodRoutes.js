import express from 'express';
const router = express.Router();
import { getFoods, getFoodById } from '../controllers/foodController.js';

// TODO: Add protect middleware to protect the route from unauthorized access

// Route: /api/foods

// Route for all foods
router.route('/').get(getFoods);

// Route for a single food using id
router.route('/:id').get(getFoodById);

export default router;
