import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    avatarUrl: { type: String, default: '' },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);