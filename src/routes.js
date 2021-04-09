import usersController from './controllers/usersController.js';
import authController from './controllers/authController.js';

export default (app) => {
  // USERS
  app.get(
    '/api/v1/users',
    { preValidation: [app.authenticate] },
    usersController.getAll(app),
  );
  app.get(
    '/api/v1/user/:id',
    { preValidation: [app.authenticate] },
    usersController.getOne(app),
  );

  // Authentication
  app.post('/api/v1/signin', authController.signin(app));
  app.post('/api/v1/signup', authController.signup(app));
  app.get(
    '/api/v1/signout',
    { preValidation: [app.authenticate] },
    authController.signout,
  );
  app.get(
    '/api/v1/whoami',
    { preValidation: [app.authenticate] },
    authController.whoami,
  );
};
