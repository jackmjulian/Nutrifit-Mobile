const notFound = (req, res, next) => {
  // create a new error object with a message and status code of 404
  // req.originalUrl is the url that was requested
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404); // 404 error
  next(error); // pass error to next middleware
};

const errorHandler = (err, req, res, next) => {
  // set status code to 500 if status code is 200
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Check for Mongoose bad ObjectId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    message = 'Resource not found';
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  }); // set status code
};

export { notFound, errorHandler };
