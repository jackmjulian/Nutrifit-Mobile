import asyncHandler from '../middleware/asyncHandler.js';
import { User } from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc Login user & get token
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  // Destructure email and password from req.body
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  // If user exists and entered password matches the hashed password in the database - respond with user data
  if (user && (await user.matchPassword(password))) {
    // Generate token function is used to generate a json web token and set it as a HTTP-Only cookie
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      calorie_goal: user.calorie_goal,
      weight: user.weight,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc Login user & get token
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  // Destructure name, email, and password from req.body
  const { name, email, password } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });

  // If user exists throw error
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // If user doesn't exist, create user
  const user = await User.create({
    name,
    email,
    password,
  });

  // If user is created, respond with user data
  if (user) {
    // Generate token function is used to generate a json web token and set it as a HTTP-Only cookie
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      calorie_goal: user.calorie_goal,
      weight: user.weight,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc Logout user & get clear cookie
// @route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
  // Clear cookie by setting it to an empty string and setting the expiration to now
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'User logged out' });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  // Find user by ID
  // req.user._id is the logged in user's ID
  const user = await User.findById(req.user._id);

  // If user exists, respond with user data
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  // Find user by ID
  // req.user._id is the logged in user's ID
  const user = await User.findById(req.user._id);

  // If user exists, update user data
  if (user) {
    // Check if name is sent in the request body
    // If not, use the user's current name
    user.name = req.body.name || user.name;

    // Check if email is sent in the request body
    // If not, use the user's current email
    user.email = req.body.email || user.email;

    // Check if password is sent in the request body
    // If password is sent, hash the password and save it
    if (req.body.password) {
      user.password = req.body.password;
    }

    // Check if calorie_goal is sent in the request body
    // If calorie_goal is sent, update the calorie_goal
    if (req.body.calorie_goal) {
      user.calorie_goal = req.body.calorie_goal;
    }

    // Save the updated user data
    const updatedUser = await user.save();

    // Respond with updated user data
    res.status(200).json({
      name: updatedUser.name,
      email: updatedUser.email,
      calorie_goal: updatedUser.calorie_goal,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// TODO: Implement the following user routes

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  res.send('get all users');
});

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
  // res.send('get user by ID');
});

// @desc Delete users
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send('delete user');
});

// @desc Log new weight
// @route POST /api/users/weight
// @access Private
const logWeight = asyncHandler(async (req, res) => {
  // find user by id
  // req.user._id is the logged in user's ID
  const user = await User.findById(req.user._id);

  // if user exists, log weight
  if (user) {
    // create new weight object
    const newWeight = {
      user: user._id,
      weight: req.body.weight,
      weight_units: req.body.weight_units,
    };

    // push new weight object to user's weight array
    user.weight.push(newWeight);

    // save user's updated weight array
    await user.save();

    res.status(201).json({ message: 'Weight logged' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc Update calorie goal
// @route PUT /api/users/calorie-goal
// @access Private
const updateCalorieGoal = asyncHandler(async (req, res) => {
  // find user by id
  // req.user._id is the logged in user's ID
  const user = await User.findById(req.user._id);

  // if user exists, update calorie goal
  if (user) {
    user.calorie_goal = req.body.calorie_goal;

    // save user's updated calorie goal
    await user.save();

    res.status(201).json({ message: 'Calorie goal updated' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
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
};
