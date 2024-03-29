import express from 'express';
const router = express.Router();
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserByID,
  deleteUser,
  logWeight,
  updateCalorieGoal,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Route: /api/users

// Route for all users & registering a new user
// Protect middleware is used to protect the route from unauthorized access (only logged in users can access)
// Admin middleware is used to check if the user is an admin
router.route('/').post(registerUser).get(protect, admin, getAllUsers);

// Route for logging out a user
router.post('/logout', logoutUser);

// Route for logging in a user
router.post('/login', loginUser);

// Route for getting user profile & updating user profile
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Route for getting user by ID, deleting user, & updating user
router
  .route('/:id')
  .get(protect, getUserByID)
  .delete(protect, admin, deleteUser);

// Route for logging weight
router.route('/weight').post(protect, logWeight);

// Route for updating calorie goal
router.route('/calorie-goal').put(protect, updateCalorieGoal);

export default router;
