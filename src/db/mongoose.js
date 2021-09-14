import fp from 'fastify-plugin';
import mongoose from 'mongoose';

const defaultSettings = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

const plugin = async (fastify, { uri, settings }) => {
  // TODO: если нет подключения нужно выдавать ошибку
  await mongoose.connect(uri, { ...defaultSettings, ...settings });

  fastify.addHook('onClose', (app, done) => {
    app.mongoose.connection.on('close', () => {
      done();
    });
    app.mongoose.connection.close();
  });

  fastify.decorate('mongoose', mongoose);
};

export default fp(plugin, { fastify: '3.x' });
