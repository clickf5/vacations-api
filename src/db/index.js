import mongoosePlugin from './mongoose.js';

const uri = process.env.MONGODB_URL || 'mongodb://localhost:27017/vacations';

export default (app) => {
  app.register(mongoosePlugin, { uri });
};
