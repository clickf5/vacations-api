import usersController from './controllers/usersController.js';
import authController from './controllers/authController.js';

export default (app) => {
  // USERS
  app.get('/api/v1/users', usersController.getAll);
  app.get('/api/v1/user/:id', usersController.getOne);

  // Authentication
  app.post('/api/v1/signin', authController.signin);
  app.post('/api/v1/signup', authController.signup);
  app.get(
    '/api/v1/signout',
    { preValidation: [app.authenticate] },
    authController.signout,
  );
};
