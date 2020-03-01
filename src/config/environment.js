'use strict';

const path = require('path');
const dotenv = require('dotenv');

const invokeEnvironment = (env, dirname) => {
  dotenv.config({ path: path.resolve(`${dirname}/env/${env || 'development'}.env`) });
};

module.exports = invokeEnvironment;
