import mongoose from 'mongoose';

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

const Weight = mongoose.model('weight', weightSchema);

const User = mongoose.model('User', userSchema);

export { User, Weight };
