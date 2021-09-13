import fastify from 'fastify';
import cookie from 'fastify-cookie';
import sensible from 'fastify-sensible';
import formbody from 'fastify-formbody';
import cors from 'fastify-cors';
import addMongoose from './db/index.js';
import addRoutes from './routes.js';
import addAuth from './auth/auth.js';
import getSocketServer from './socket.js';

export default () => {
  const app = fastify({
    logger: true,
    prettyPrint: true,
  });

  addMongoose(app);

  // TODO: возможно нужно вынести подключение отдельно
  app.register(cors, {
    origin: true,
    credentials: true,
  });
  app.register(sensible);
  app.register(cookie);
  app.register(formbody);

  addAuth(app);

  const io = getSocketServer(app.server);

  addRoutes(app, io);

  return app;
};
