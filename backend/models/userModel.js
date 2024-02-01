import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const weightSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      index: true,
    },
    weight: { type: Number, required: true },
    weight_units: { type: String, required: true, enum: ['kg', 'lbs'] }, // can only be kg or lbs
  },
  {
    timestamps: true,
  }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // unique means that two users cannot have the same email
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }, // is the user an admin?
    calorie_goal: { type: Number, required: true, default: 0 },
    weight: [weightSchema],
  },
  {
    timestamps: true,
  }
);

// Method to compare entered password with the hashed password in the database
// enteredPassword is the password entered by the user
// this.password is the hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware to hash the password before saving the user to the database
userSchema.pre('save', async function (next) {
  // If the password is not modified, then don't hash the password
  if (!this.isModified('password')) {
    next();
  }

  // Generate a salt
  const salt = await bcrypt.genSalt(10);

  // Hash the entered password
  this.password = await bcrypt.hash(this.password, salt);
});

const Weight = mongoose.model('weight', weightSchema);

const User = mongoose.model('User', userSchema);

export { User, Weight };
