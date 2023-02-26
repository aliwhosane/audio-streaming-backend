import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { configureRoutes } from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT;

configureRoutes(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
