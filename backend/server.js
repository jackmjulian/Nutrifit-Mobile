import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config(); // Initialise dotenv to use .env files
import connectDB from './config/db.js'; // Import database connection
import { notFound, errorHandler } from './middleware/errorMiddleware.js'; // Import error middleware
import foodRoutes from './routes/foodRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';
import exerciseRoutes from './routes/exerciseRoutes.js';
import setRoutes from './routes/setRoutes.js';
import userRoutes from './routes/userRoutes.js';
import mealRoutes from './routes/mealRoutes.js';
const port = process.env.PORT || 8000;

// Connect to database
connectDB();

// Initialise express
const app = express();

// Body parser middleware for json
app.use(express.json());

// Body parser middleware for url encoded form data
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// CORS middleware
// app.use(cors());

// Initial Route
// app.get('/', (req, res) => {
//   res.send('Server is ready');
// });

// Route: /api/foods
app.use('/api/foods', foodRoutes);

// Route: /api/meals
app.use('/api/meals', mealRoutes);

// Route: /api/workouts
app.use('/api/workouts', workoutRoutes);

// Route: /api/exercises
app.use('/api/exercises', exerciseRoutes);

// Route: /api/sets
app.use('/api/sets', setRoutes);

// Route: /api/users
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

// Error middleware
app.use(notFound);
app.use(errorHandler);

// Listen to port
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
