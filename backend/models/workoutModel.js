import mongoose from 'mongoose';

const setSchema = new mongoose.Schema(
  {
    set_weight: { type: Number, required: true },
    set_reps: { type: Number, required: true },
    set_notes: { type: String },
  },
  {
    timestamps: true,
  }
);

const exerciseSchema = new mongoose.Schema(
  {
    exercise_name: { type: String, required: true },
    exercise_type: { type: String, required: true },
    exercise_category: { type: String },
    exercise_description: { type: String },
    sets: [setSchema],
  },
  {
    timestamps: true,
  }
);

const workoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      index: true,
    },
    workout_name: { type: String, required: true },
    workout_category: { type: String },
    workout_description: { type: String },
    exercises: [exerciseSchema],
  },
  {
    timestamps: true,
  }
);

const Set =  mongoose.model('Set', setSchema);

const Exercise =  mongoose.model('Exercise', exerciseSchema);

const Workout =  mongoose.model('Workout', workoutSchema);

export { Set, Exercise, Workout };
