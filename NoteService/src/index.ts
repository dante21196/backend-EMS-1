// src/index.ts

import app from './config/server';

const PORT = 5002;

app.listen(PORT, () => {
  console.log(`Service 2 running at http://localhost:${PORT}`);
});
