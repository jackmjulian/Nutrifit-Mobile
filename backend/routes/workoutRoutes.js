import express from 'express';
const router = express.Router();
import {
  getWorkouts,
  getWorkoutById,
} from '../controllers/workoutController.js';

// TODO: Add protect middleware to protect the route from unauthorized access

// Route for all workouts
router.route('/').get(getWorkouts);

// Route for a single workout using id
router.route('/:id').get(getWorkoutById);

export default router;
