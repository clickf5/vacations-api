import User from '../models/User.js';

export default {
  getAll: async (_request, reply) => {
    try {
      const users = await User.find({});
      reply.code(201).send(users);
    } catch (error) {
      reply.badRequest(error);
    }
  },
  getOne: async (request, reply) => {
    const { id } = request.params;
    try {
      const user = await User.findById(id);
      reply.code(201).send(user);
    } catch (error) {
      reply.badRequest(error);
    }
  },
};
