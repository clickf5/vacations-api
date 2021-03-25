import mongoosePlugin from './mongoose.js';

const uri = 'mongodb://localhost:27017/vacations';

export default (app) => {
  app.register(mongoosePlugin, { uri });
};
