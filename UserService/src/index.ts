// src/index.ts

import app from './config/server';

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Service 1 running at http://localhost:${PORT}`);
});
