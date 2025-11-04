import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import { Server as SocketIOServer } from 'socket.io';
import { createServer, Server as HTTPServer } from 'http';

let ioServer: SocketIOServer;

export const configureApp = (): {
  app: Application;
  httpServer: HTTPServer;
  ioServer: SocketIOServer;
} => {
  const app = express();
  const httpServer = createServer(app);

  ioServer = new SocketIOServer(httpServer, {
    cors: {
      origin: '*',
    },
  });

  app.use(express.static(path.join(__dirname, '../../public')));
  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ extended: false }));
  app.use(cors({ origin: '*' }));
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    })
  );

  return { app, httpServer, ioServer };
};

export const getIoServer = (): SocketIOServer => ioServer;
