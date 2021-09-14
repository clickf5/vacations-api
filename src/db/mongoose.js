import fp from 'fastify-plugin';
import mongoose from 'mongoose';

const defaultSettings = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

const plugin = async (fastify, { uri, settings }, next) => {
  mongoose.createConnection(uri, { ...defaultSettings, ...settings })
    .then(db => {
      db.on('error', err => {
        fastify.log.error(err, 'Mongoose connection error')
      });

      fastify.addHook('onClose', (app, done) => {
        app.mongoose.connection.on('close', () => {
          done();
        });
        app.mongoose.connection.close();
      });
    
      fastify.decorate('mongoose', mongoose);

      next();

    })
    .catch(err => {
      fastify.log.error(err, 'Error connecting to MongoDB')
      next(err)
    });
};

export default fp(plugin, { fastify: '3.x' });
