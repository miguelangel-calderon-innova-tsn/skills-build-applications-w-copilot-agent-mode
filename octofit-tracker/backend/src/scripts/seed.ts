import mongoose from 'mongoose';
import { connectionString } from '../config/database.js';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db. Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [alex, priya, jordan, sam] = await User.create([
      {
        username: 'alex-runner',
        email: 'alex@example.com',
        displayName: 'Alex Rivera',
        avatarUrl: 'https://i.pravatar.cc/150?img=12',
      },
      {
        username: 'priya-lifts',
        email: 'priya@example.com',
        displayName: 'Priya Shah',
        avatarUrl: 'https://i.pravatar.cc/150?img=47',
      },
      {
        username: 'jordan-flow',
        email: 'jordan@example.com',
        displayName: 'Jordan Lee',
        avatarUrl: 'https://i.pravatar.cc/150?img=33',
      },
      {
        username: 'sam-cycles',
        email: 'sam@example.com',
        displayName: 'Sam Morgan',
        avatarUrl: 'https://i.pravatar.cc/150?img=68',
      },
    ]);

    const [trailblazers, pulseCrew] = await Team.create([
      {
        name: 'Trailblazers',
        description: 'A friendly team chasing consistent outdoor miles.',
        color: '#1f7a8c',
        captain: alex._id,
      },
      {
        name: 'Pulse Crew',
        description: 'Strength, mobility, and steady progress together.',
        color: '#e07a5f',
        captain: priya._id,
      },
    ]);

    await User.bulkWrite([
      { updateOne: { filter: { _id: alex._id }, update: { team: trailblazers._id } } },
      { updateOne: { filter: { _id: sam._id }, update: { team: trailblazers._id } } },
      { updateOne: { filter: { _id: priya._id }, update: { team: pulseCrew._id } } },
      { updateOne: { filter: { _id: jordan._id }, update: { team: pulseCrew._id } } },
    ]);

    await Activity.create([
      { user: alex._id, type: 'run', durationMinutes: 42, distanceKm: 7.4, calories: 560, completedAt: new Date('2026-09-12T07:30:00Z') },
      { user: priya._id, type: 'strength', durationMinutes: 50, calories: 410, completedAt: new Date('2026-09-12T18:00:00Z') },
      { user: jordan._id, type: 'yoga', durationMinutes: 35, calories: 180, completedAt: new Date('2026-09-11T06:45:00Z') },
      { user: sam._id, type: 'cycle', durationMinutes: 65, distanceKm: 22.8, calories: 690, completedAt: new Date('2026-09-10T17:15:00Z') },
    ]);

    await Leaderboard.create([
      { user: alex._id, points: 1280, completedWorkouts: 18, weeklyStreak: 5 },
      { user: priya._id, points: 1460, completedWorkouts: 21, weeklyStreak: 7 },
      { user: jordan._id, points: 940, completedWorkouts: 14, weeklyStreak: 3 },
      { user: sam._id, points: 1125, completedWorkouts: 16, weeklyStreak: 4 },
    ]);

    await Workout.create([
      {
        title: 'Full Body Foundation',
        category: 'strength',
        difficulty: 'beginner',
        durationMinutes: 30,
        coach: 'Maya Chen',
        description: 'A balanced strength session built around controlled compound movements.',
      },
      {
        title: 'Tempo Run Builder',
        category: 'cardio',
        difficulty: 'intermediate',
        durationMinutes: 35,
        coach: 'Noah Williams',
        description: 'Intervals that improve pacing, endurance, and confident running form.',
      },
      {
        title: 'Desk Reset Mobility',
        category: 'mobility',
        difficulty: 'beginner',
        durationMinutes: 15,
        coach: 'Maya Chen',
        description: 'A short mobility flow for shoulders, hips, and a relaxed spine.',
      },
    ]);

    console.log('Database seeding complete: 4 users, 2 teams, 4 activities, 4 leaderboard entries, and 3 workouts');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
