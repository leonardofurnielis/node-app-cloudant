/* eslint-disable global-require */

'use strict';

const passport = require('passport');
const fs = require('fs');

const invokeEnvironment = require('./environment');
const invokeLogger = require('./logger');
const bootstrap = require('./bootstrap');
const passportJwt = require('./passport');
const invokeRoutes = require('./routes');

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
