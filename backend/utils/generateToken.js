import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  // Create json web token
  // Send the user._id data as the payload
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // Set json web token as a HTTP-Only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // set cookie expiration to 30 days
  });
};

export default generateToken;
