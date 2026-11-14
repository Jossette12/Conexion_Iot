import http from 'node:http';
import { app } from './app.js';
import { env } from './config/env.js';
import { connectMongo } from './config/mongo.js';
import { setupSocket } from './realtime/socket.js';

await connectMongo();

const server = http.createServer(app);
setupSocket(server);

server.listen(env.port, () => {
  console.log(`[api] escuchando en http://localhost:${env.port}`);
});
