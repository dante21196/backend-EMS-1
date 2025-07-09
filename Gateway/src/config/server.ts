// src/server.ts

import express, { Request, Response } from 'express';
import { createProxyServer } from 'http-proxy';
import { IncomingMessage, ServerResponse } from 'http';

const app = express();
const proxy = createProxyServer({});

// Define the routing map
const routes: Record<string, string> = {
  '/user': 'http://localhost:5001',
  '/notes': 'http://localhost:5002',
};
app.use(express.json())
app.use('/test',(req:Request,res : Response)=>{
  res.json({ message: 'Test endpoint for debugging purposes' });
});


// Middleware to handle proxy routing
app.use('/api', (req: Request, res: Response) => {
  console.log("Request path :", req.path);
  const targetEntry = Object.entries(routes).find(([prefix]) =>{
    console.log("Prefix : ",prefix)
    return req.path.startsWith(prefix)});

  if (!targetEntry) {
    res.status(502).send('Bad Gateway: No matching target server');
    return;
  }

  const [prefix, targetUrl] = targetEntry;
  //change the request URL to remove the prefix
  console.log(`Request URL before prefix removal: ${req.originalUrl}`);
  req.url = req.originalUrl.replace(prefix, '');
  console.log(`Proxying request to: ${targetUrl}${req.url}`);
  proxy.web(req as IncomingMessage, res as ServerResponse, { target: targetUrl }, (err: any) => {
    console.error(`Proxy error: ${(err as Error).message}`);
    res.status(500).send('Proxy error');
  });
});

export default app;
