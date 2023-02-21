import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { configureRoutes } from './routes';
import { createNewLogger } from './settings/logger';

dotenv.config();

const app = express();
const port = process.env.PORT;
const logger = createNewLogger('ROUTES');

configureRoutes(app);

app.get("/", (req: Request, res: Response) => {
  logger.debug(`Processing route: ${req.url}`);
  res.send("Tape A Tale  Server 2023");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
