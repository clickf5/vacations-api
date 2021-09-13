#! /usr/bin/env node

import getApp from '../index.js';

const port = process.env.PORT || 9999;
const address = process.env.ADDRESS || '0.0.0.0';

const app = getApp();

const start = async () => {
  try {
    await app.listen(port, address);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
