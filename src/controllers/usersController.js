import User from '../models/User.js';

export default {
  getAll: (app) => async () => {
    const [err, users] = await app.to(
      User.find({}),
    );

    if (err) {
      throw app.httpErrors.badRequest(err);
    }

    return users;
  },
  getOne: (app) => async (request) => {
    const { id } = request.params;

    const [err, user] = await app.to(
      User.findById(id),
    );

    if (!user) {
      throw app.httpErrors.notFound(`User with id = ${id} is not found`);
    }

    if (err) {
      throw app.httpErrors.badRequest(err);
    }

    return user;
  },
  approve: (app) => async (request) => {
    const { id } = request.params;

    const [err, user] = await app.to(
      User.findById(id),
    );

    if (!user) {
      throw app.httpErrors.notFound(`User with id = ${id} is not found`);
    }

    if (err) {
      throw app.httpErrors.badRequest(err);
    }

    if (user.approved) {
      throw app.httpErrors.badRequest(`User with id = ${id} is already approved`);
    }

    const [updateErr, updatedUser] = await app.to(
      User.updateOne({ _id: id }, { approved: true }),
    );

    if (updateErr) {
      throw app.httpErrors.badRequest(updateErr);
    }

    return updatedUser;
  },
};
