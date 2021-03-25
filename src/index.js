import fastify from 'fastify';
import cookie from 'fastify-cookie';
import sensible from 'fastify-sensible';
import addMongoose from './db';
import addRoutes from './routes.js';
import addAuth from './auth/auth.js';

export default () => {
  const app = fastify({
    logger: true,
    prettyPrint: true,
  });

  addMongoose(app);

  // TODO: возможно нужно вынести подключение отдельно
  app.register(sensible);
  app.register(cookie);

  addAuth(app);
  addRoutes(app);

  return app;
};
