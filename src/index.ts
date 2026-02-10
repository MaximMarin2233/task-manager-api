import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';
import taskRoutes from './routes/task.routes';
import { taskEvents } from './events/task.events';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: '*' }, // allow req from all
});

const PORT = process.env.PORT || 3000;

// middleware 
app.use(cors()); // allow cors
app.use(express.json()); // json parse

// static files
app.use(express.static('public')); // frontend WS

// routes
app.use('/tasks', taskRoutes);

// socket io
io.on('connection', (socket) => {
  console.log('Client connected', socket.id);
});

// watch tasks / send to clients
taskEvents.on('task:queued', (id) => io.emit('task:queued', { id }));
taskEvents.on('task:processing', (id) => io.emit('task:processing', { id }));
taskEvents.on('task:completed', (id) => io.emit('task:completed', { id }));
taskEvents.on('task:failed', (id) => io.emit('task:failed', { id }));

// start
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/index.html test websocket`);
});
