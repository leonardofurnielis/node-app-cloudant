/* eslint-disable global-require */

'use strict';

const express = require('express');
// const swaggerUi = require('swagger-ui-express');

// const isLoggedIn = require('./../src/policies/logged');
// const basicAuth = require('../lib/middlewares/www-basic-auth');
// const swaggerDocument = require('../swagger/swagger.json');

const routerV1 = express.Router();

const invokeRoutes = app => {
  const authenticate = require('../src/routes/authenticate/v1');

  routerV1.use('/authenticate', authenticate());

  app.use('/api/v1', routerV1);
  // app.use('/explorer', basicAuth(), swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

module.exports = invokeRoutes;
