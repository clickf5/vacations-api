import sha256 from 'crypto-js/sha256';
import User from '../models/User.js';

const config = {
  cookieName: 'token',
  cookieParam: {
    domain: 'localhost',
    path: '/',
    httpOnly: true,
    sameSite: true,
  },
  salt: 'e29r4PRdIOAYoreJUBpA',
};

export default {
  // LOGIN
  signin: (app) => async (request, reply) => {
    const {
      email,
      password,
    } = request.body;

    const [err, existingUser] = await app.to(
      User.findOne({ email }).exec(),
    );

    if (err) {
      throw app.httpErrors.badRequest(err);
    }

    if (!existingUser) {
      throw app.httpErrors.badRequest('User with this email is not registered');
    }

    if (!existingUser.approved) {
      throw app.httpErrors.badRequest('User with this email is not approved');
    }

    if (sha256(password, config.salt).toString() !== existingUser.password.toString()) {
      throw app.httpErrors.badRequest('Invalid password');
    }

    const payload = {
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
      role: existingUser.role,
    };

    const token = await reply.jwtSign(payload);

    reply
      .setCookie(config.cookieName, token, config.cookieParam)
      .code(200);

    return payload;
  },
  // REGISTRATION
  // TODO: скорее всего нужно всю валидацию вынести в отдельные валидаторы
  signup: (app, io) => async (request) => {
    const {
      firstName,
      lastName,
      email,
      password,
    } = request.body;

    const [err, existingUser] = await app.to(
      User.findOne({ email }).exec(),
    );

    if (err) {
      throw app.httpErrors.badRequest(err);
    }

    if (existingUser) {
      throw app.httpErrors.badRequest('User with this email already exists');
    }

    const [validateErr] = await app.to(
      User.validate({
        firstName,
        lastName,
        email,
        password,
      }),
    );

    if (validateErr) {
      throw app.httpErrors.badRequest(validateErr);
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password: sha256(password, config.salt),
      // TEST: только для теста, потом удалить,
      // TEST: иначе все зарегистрированные пользователи
      // TEST: будут по умолчанию подтвержденными
      approved: process.env.NODE_ENV !== 'production',
    });

    const [saveErr] = await app.to(
      user.save(),
    );

    if (saveErr) {
      throw app.httpErrors.badRequest(saveErr);
    }

    io.emit('signup', user);

    return user;
  },
  // LOGOUT
  signout: (_request, reply) => {
    reply
      .clearCookie(config.cookieName, { path: '/' })
      .send();
    // reply.send('OK');
  },
  // WHO AM I
  whoami: (request, reply) => {
    reply.send(request.user);
  },
};
