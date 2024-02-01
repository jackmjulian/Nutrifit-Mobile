import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import { User } from '../models/userModel.js';

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read the JWT token from the cookie
  token = req.cookies.jwt;

  // Check if token exists
  if (token) {
    try {
      // Verify token using the JWT secret
      // Decode the token to get the user id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by id
      // Exclude password (-password)
      // Sets the user to the request object (req.user)
      req.user = await User.findById(decoded.userId).select('-password');

      next(); // move on to the next middleware
    } catch (error) {
      console.error(error);
      res.status(401); // unauthorized code
      throw new Error('Not authorized, token failed'); // throw error
    }
  } else {
    res.status(401); // unauthorized code
    throw new Error('Not authorized, no token'); // throw error
  }
});

// Check if user is an admin
const admin = (req, res, next) => {
  // Check if user exists and is an admin
  if (req.user && req.user.isAdmin) {
    next(); // move on to the next middleware
  } else {
    res.status(401); // unauthorized code
    throw new Error('Not authorized as an admin'); // throw error
  }
};

export { protect, admin };
