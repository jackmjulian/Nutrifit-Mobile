import express from 'express';
const router = express.Router();
import {
  getExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
  addSetToExercise,
} from '../controllers/exerciseController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Route: /api/exercises

// Route for all workouts & creating a new workout
router.route('/').get(protect, getExercises).post(protect, createExercise);

// Route for a single workout using id, updating a workout, & deleting a workout
router
  .route('/:id')
  .get(protect, getExerciseById)
  .put(protect, updateExercise)
  .delete(protect, deleteExercise);

// Route for adding an exercise to a workout
router.route('/:id/addset').post(protect, addSetToExercise);

export default router;
