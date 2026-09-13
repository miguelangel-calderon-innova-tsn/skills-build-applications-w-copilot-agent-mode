import express from 'express';
import { apiBaseUrl } from './config/api.js';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes/index.js';

const app = express();
const port = 8000;

app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiUrl: apiBaseUrl });
});

app.get('/api/config', (_request, response) => {
  response.json({ apiUrl: apiBaseUrl });
});

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit Tracker API listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to octofit_db:', error);
    process.exit(1);
  });