import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io('http://localhost:4000', {
      reconnectionAttempts: 5, // Try 5 times before giving up
      reconnectionDelay: 1000,  // Wait 1 second between retries
    });

    socket.on('connect', () => {
      console.log('🟢 Connected to Socket.IO');
    });

    socket.on('disconnect', () => {
      console.warn('🔴 Disconnected from Socket.IO');
    });

    socket.on('reconnect_attempt', () => {
      console.info('♻️ Trying to reconnect to Socket.IO...');
    });

    socket.on('reconnect', () => {
      console.log('✅ Successfully reconnected!');
    });

    socket.on('connect_error', (error) => {
      console.error('❌ Connection error:', error.message);
    });
  }

  return socket;
};
