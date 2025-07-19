// src/index.ts

import app from './config/server';

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Reverse proxy gateway running at http://localhost:${PORT}`);
});
