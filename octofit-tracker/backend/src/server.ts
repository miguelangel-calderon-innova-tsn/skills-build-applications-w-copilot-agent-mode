import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes/index.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.use(cors());
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