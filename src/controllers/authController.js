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
  signin: async (request, reply) => {
    const {
      email,
      password,
    } = request.body;

    const existingUser = await User.findOne({ email }).exec();

    if (!existingUser) {
      reply.badRequest('User with this email is not registered');
      return;
    }

    if (!existingUser.approved) {
      reply.badRequest('User with this email is not approved');
      return;
    }

    if (sha256(password, config.salt).toString() !== existingUser.password.toString()) {
      reply.badRequest('Invalid password');
      return;
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
      .code(200)
      .send(payload);
  },
  // REGISTRATION
  signup: async (request, reply) => {
    const {
      firstName,
      lastName,
      email,
      password,
    } = request.body;

    const existingUser = await User.findOne({ email }).exec();

    if (existingUser) {
      reply.badRequest('User with this email already exists');
      return;
    }

    try {
      await User.validate({
        firstName,
        lastName,
        email,
        password,
      });
    } catch (error) {
      reply.badRequest(error);
      return;
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

    try {
      await user.save();
      // TODO: пока ничего не возвращам - просто 200 ОК
      reply.send();
    } catch (error) {
      reply.badRequest(error);
    }
  },
  // LOGOUT
  signout: (_request, reply) => {
    reply
      .clearCookie(config.cookieName, { path: '/' })
      .send();
    // reply.send('OK');
  },
};
