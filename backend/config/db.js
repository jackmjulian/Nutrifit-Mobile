import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // try to connect to the MongoDB database
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // if there is an error, show it in the console
    console.log(`Error: ${err.message}`);
    // exit with failure/error
    process.exit(1);
  }
};

export default connectDB;
