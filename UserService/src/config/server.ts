// src/config/server.ts
import express from 'express';
import { connectDB } from './db';
import userRoutes from '../routes/userRoutes';
import { testReqBody } from '../middlewares/testReqBody';
export const startServer = async () => {
  const app = express();
  
  app.use(express.json());

  // Routes
  app.use('/users',testReqBody, userRoutes);

  app.use('/', (req, res) => {
    res.json({ message: `User Service! You hit ${req.originalUrl}` });
  });

  await connectDB();

  return app;
};
