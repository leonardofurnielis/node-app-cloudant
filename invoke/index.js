/* eslint-disable global-require */

'use strict';

const passport = require('passport');
const fs = require('fs');

const bootstrap = require('./bootstrap');
const invokeLogger = require('./logger');
const invokeEnvironment = require('./environment');
const invokeRoutes = require('./routes');
const passportJwt = require('./passport');

const invoke = async (app, dirname) => {
  if (!fs.existsSync(`${dirname}/tmp`)) {
    fs.mkdirSync(`${dirname}/tmp`);
  }

  invokeEnvironment(process.env.NODE_ENV, dirname);

  invokeLogger();

  bootstrap();

  passportJwt(passport);

  invokeRoutes(app);
};

module.exports = invoke;
