import express from 'express';
const router = express.Router();
import {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  addExerciseToWorkout,
  // addSetToWorkout,
} from '../controllers/workoutController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Route: /api/workouts

// Route for all workouts & creating a new workout
router.route('/').get(protect, getWorkouts).post(protect, createWorkout);

// Route for a single workout using id, updating a workout, & deleting a workout
router
  .route('/:id')
  .get(protect, getWorkoutById)
  .put(protect, updateWorkout)
  .delete(protect, deleteWorkout);

// Route for adding an exercise to a workout
router.route('/:id/addexercise').post(protect, addExerciseToWorkout);

export default router;
