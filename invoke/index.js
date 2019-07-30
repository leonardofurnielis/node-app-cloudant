/* eslint-disable global-require */

'use strict';

const passport = require('passport');

const bootstrap = require('./bootstrap');
const invokeLogger = require('./logger');
const invokeEnvironment = require('./environment');
const invokeRoutes = require('./routes');
const passportJwt = require('./passport');

const invoke = async (app, dirname) => {
  invokeEnvironment(process.env.NODE_ENV, dirname);

  invokeLogger();

  bootstrap();

  passportJwt(passport);

  invokeRoutes(app);
};

module.exports = invoke;
