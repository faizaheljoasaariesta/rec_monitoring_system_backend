import { Socket } from 'socket.io';

export const socketHandlers = (socket: Socket): void => {
  socket.on('sending', (data: any) => {
    console.log('message:', data);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });
};
