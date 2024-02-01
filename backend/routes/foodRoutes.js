import express from 'express';
const router = express.Router();
import foods from '../data/foods.js'; // imports need .js extension as type module is used

// Route: /api/foods

// Route for all foods
router.get('/', (req, res) => {
  res.json(foods);
});

// Route for a single food using id
router.get('/:id', (req, res) => {
  const food = foods.find((f) => f.food_id === req.params.id);
  res.json(food);
});

export default router;
