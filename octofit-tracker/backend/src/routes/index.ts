import { Router } from 'express';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const router = Router();

router.get('/users/', async (_request, response) => {
  response.json({ data: await User.find().populate('team').lean() });
});

router.get('/teams/', async (_request, response) => {
  response.json({ data: await Team.find().populate('captain').lean() });
});

router.get('/activities/', async (_request, response) => {
  response.json({ data: await Activity.find().populate('user').sort({ completedAt: -1 }).lean() });
});

router.get('/leaderboard/', async (_request, response) => {
  response.json({ data: await Leaderboard.find().populate('user').sort({ points: -1 }).lean() });
});

router.get('/workouts/', async (_request, response) => {
  response.json({ data: await Workout.find().sort({ difficulty: 1, title: 1 }).lean() });
});

export default router;