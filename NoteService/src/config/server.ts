// src/server.ts

import express, { Request, Response } from 'express';

const app = express();

// Accepts any route and responds with a message
app.use('/', (req: Request, res: Response) => {
  res.json({
    message: `Hello from Service 2! You hit ${req.originalUrl}`
  });
});

export default app;
