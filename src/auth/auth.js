import jwt from 'fastify-jwt';

const config = {
  secret: 'JSuYBeImgcC1WrAexQAs',
  expiresIn: 1800,
  cookieName: 'token',
};

export default (app) => {
  app.register(jwt, {
    secret: config.secret,
    sign: {
      expiresIn: config.expiresIn,
    },
    cookie: {
      cookieName: config.cookieName,
    },
  });

  app.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      reply.unauthorized(error);
    }
  });
};
