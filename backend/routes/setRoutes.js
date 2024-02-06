import express from 'express';
const router = express.Router();
import {
  getSets,
  getSetById,
  createSet,
  updateSet,
  deleteSet,
} from '../controllers/setController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Route: /api/sets

// Route for all sets
router.route('/').get(protect, getSets).post(protect, createSet);

// Route for a single set using id
router
  .route('/:id')
  .get(protect, getSetById)
  .put(protect, updateSet)
  .delete(protect, deleteSet);

export default router;
