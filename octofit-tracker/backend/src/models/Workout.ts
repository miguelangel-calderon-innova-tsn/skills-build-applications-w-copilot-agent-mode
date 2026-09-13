import mongoose, { Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: ['strength', 'cardio', 'mobility', 'recovery'] },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    coach: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);