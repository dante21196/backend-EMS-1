// src/config/server.ts
import express from 'express';
import { connectDB } from './db';
import userRoutes from '../routes/userRoutes';
import adminRoutes from '../routes/adminRoutes'
import { testReqBody } from '../middlewares/testReqBody';
import cors from 'cors';
import rolesAndPermissionsRoutes from '../routes/rolesAndPermissionsRoutes'
import subscriptionRoutes from '../routes/subscriptionRoutes'

export const startServer = async () => {
  const app = express();
  app.use(cors({
  origin: 'http://localhost:3000', // Vite frontend URL
  credentials: true,
}));
  
  app.use(express.json());

  // Routes
  app.use('/users',testReqBody, userRoutes);
  app.use('/admin',adminRoutes)
 app.use('/access-control',rolesAndPermissionsRoutes)
 app.use('/subscriptions',subscriptionRoutes)

  app.use('/', (req, res) => {
    res.json({ message: `User Service! You hit ${req.originalUrl}` });
  });

  await connectDB();

  return app;
};
