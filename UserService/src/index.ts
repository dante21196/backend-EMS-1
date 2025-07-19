// src/index.ts
import dotenv from 'dotenv';

dotenv.config();
import { startServer } from './config/server';

const PORT = 5001;

startServer()
  .then((app) => {
    app.listen(PORT, () => {
      console.log(`👤 User service running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('🔥 Failed to start server:', err);
  });
