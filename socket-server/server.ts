import express from 'express';
import { createServer } from 'http';
import { Server as IOServer } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = createServer(app);
const io = new IOServer(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('🟢 User connected:', socket.id);

  socket.on('join', (matchId: string) => {
    socket.join(matchId);
    console.log(`📥 ${socket.id} joined room: ${matchId}`);
  });

  socket.on('message:new', ({ matchId, message }) => {
    console.log(`📤 Message to room ${matchId}:`, message);
    socket.to(matchId).emit('message:new', message);
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });
});

server.listen(4000, () => {
  console.log('🚀 Socket.io server running on http://localhost:4000');
});
