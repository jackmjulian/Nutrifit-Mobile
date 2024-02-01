import express from 'express';
import dotenv from 'dotenv';
dotenv.config(); // Initialise dotenv to use .env files
import connectDB from './config/db.js'; // Import database connection
import { notFound, errorHandler } from './middleware/errorMiddleware.js'; // Import error middleware
import foodRoutes from './routes/foodRoutes.js';
const port = process.env.PORT || 5000;

// Connect to database
connectDB();

// Initialise express
const app = express();

// Initial Route
app.get('/', (req, res) => {
  res.send('Server is ready');
});

// Route: /api/foods
app.use('/api/foods', foodRoutes);

// Error middleware
app.use(notFound);
app.use(errorHandler);

// Listen to port
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
