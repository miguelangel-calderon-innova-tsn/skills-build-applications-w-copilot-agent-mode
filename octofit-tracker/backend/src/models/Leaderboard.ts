import mongoose, { Schema } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, required: true, min: 0 },
    completedWorkouts: { type: Number, required: true, min: 0 },
    weeklyStreak: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

export const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);