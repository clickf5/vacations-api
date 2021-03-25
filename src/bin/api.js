#! /usr/bin/env node

import getApp from '../index.js';

const port = process.env.PORT || 9999;
const address = '0.0.0.0';

getApp().listen(port, address, () => {
  console.log(`Server has been started on ${port}`);
});
