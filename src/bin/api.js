#! /usr/bin/env node

import getApp from '../index.js';

const port = 9999;
const address = '0.0.0.0';

const app = getApp();

const start = async () => {
  try {
    await app.listen(port, address);
    console.log(`Server has been started on ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
