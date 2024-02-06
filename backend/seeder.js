import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import foods from './data/foods.js';
import meals from './data/meals.js';
import { workouts, exercises, sets } from './data/workouts.js';
// import exercises from './data/workouts.js';
// import sets from './data/workouts.js';
import { User } from './models/userModel.js';
import { Food } from './models/foodModel.js';
import { Meal } from './models/foodModel.js';
import { Set, Exercise, Workout } from './models/workoutModel.js';
import connectDB from './config/db.js';

// Initialise dotenv to use environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Import data into MongoDB
const importData = async () => {
  try {
    // Need to use async/await as all mongoose methods return a promise
    await User.deleteMany();
    await Food.deleteMany();
    await Meal.deleteMany();
    await Workout.deleteMany();
    await Exercise.deleteMany();
    await Set.deleteMany();

    // Create users and return them to the createdUsers variable
    const createdUsers = await User.insertMany(users);

    // Get the admin user from the createdUsers array
    const adminUser = createdUsers[0]._id;

    // Add the admin user to the foods array with the spread operator
    // this keeps all of the food data the same but adds the admin user to the user field
    const sampleFoods = foods.map((food) => {
      return { ...food, user: adminUser };
    });

    const sampleMeals = meals.map((meal) => {
      return { ...meal, user: adminUser };
    });

    const sampleSets = sets.map((set) => {
      return { ...set, user: adminUser };
    });

    const sampleExercises = exercises.map((exercise) => {
      return { ...exercise, user: adminUser, sets: sampleSets };
    });

    // Add the admin user to the workouts array with the spread operator
    // this keeps all of the workout data the same but adds the admin user to the user field
    const sampleWorkouts = workouts.map((workout) => {
      return {
        ...workout,
        user: adminUser,
        workout_exercises: sampleExercises,
        exercise_sets: sampleSets,
      };
    });

    await Food.insertMany(sampleFoods);

    await Meal.insertMany(sampleMeals);

    await Workout.insertMany(sampleWorkouts);

    await Exercise.insertMany(sampleExercises);

    await Set.insertMany(sampleSets);

    console.log('Data Imported!'.green.inverse); // green.inverse is a colour from the colors package
    process.exit(); // Exit with success
  } catch (error) {
    console.error(`${error}`.red.inverse); // red.inverse is a colour from the colors package
    process.exit(1); // Exit with failure
  }
};

// Destroy data in MongoDB
const destroyData = async () => {
  try {
    // Need to use async/await as all mongoose methods return a promise
    await User.deleteMany();
    await Food.deleteMany();
    await Meal.deleteMany();
    await Workout.deleteMany();
    await Exercise.deleteMany();
    await Set.deleteMany();

    console.log('Data Destroyed!'.red.inverse); // red.inverse is a colour from the colors package
    process.exit(); // Exit with success
  } catch (error) {
    console.error(`${error}`.red.inverse); // red.inverse is a colour from the colors package
    process.exit(1); // Exit with failure
  }
};

// Check if the argument passed in is '-d' (destroy data)
// if we run the seeder with the -d flag, we want to destroy the data
// process.argv[2] is the third argument in the command line
// process.argv[0] is the first argument in the command line (node)
// process.argv[1] is the second argument in the command line (seeder.js)
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
