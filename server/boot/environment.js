'use strict';

const path = require('path');
const dotenv = require('dotenv');

module.exports = async (env) => {
  const result = dotenv.config({ path: path.resolve(`${__dirname}/env/.env.${env || 'local'}`) });

  if (result.error) {
    throw result.error;
  }

  console.debug(result);
};
