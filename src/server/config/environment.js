'use strict';

const path = require('path');
const dotenv = require('dotenv');

module.exports = async env => {
  dotenv.config({ path: path.resolve(`./env/.env.${env || 'development'}`) });
}
