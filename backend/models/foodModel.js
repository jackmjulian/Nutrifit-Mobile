import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // this is the id of the user who created this food
      required: true,
      ref: 'User', // this is the model the above id is referring to
      index: true,
    },

    food_name: { type: String, required: true },
    food_calories: { type: Number, required: true },
    food_protein: { type: Number, required: true },
    food_carbs: { type: Number, required: true },
    food_fat: { type: Number, required: true },
    addedAt: { type: Date }, // Define addedAt without default value so we can set it when adding to the meal
    // Add a unique identifier for each food instance
    food_instance_id: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const mealSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // this is the id of the user who created this food
      required: true,
      ref: 'User', // this is the model the above id is referring to
      index: true,
    },
    meal_name: { type: String, required: true },
    meal_foods: [foodSchema],
  },
  {
    timestamps: true,
  }
);

const Meal = mongoose.model('Meal', mealSchema);

const Food = mongoose.model('Food', foodSchema);

export { Meal, Food };
