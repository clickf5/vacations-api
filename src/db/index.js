import mongoosePlugin from './mongoose.js';

export default (app, cfg) => {
  const { uri } = cfg;
  app.register(mongoosePlugin, { uri });
};
