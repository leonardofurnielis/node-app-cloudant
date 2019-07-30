/* eslint-disable global-require */

'use strict';

const express = require('express');
// const swaggerUi = require('swagger-ui-express');

// const isLoggedIn = require('./../src/policies/isLoggedIn');
// const basicAuth = require('../lib/middlewares/www_basicAuth');
// const swaggerDocument = require('../docs/swagger.json');

const routerV1 = express.Router();

const invokeRoutes = app => {
  const authenticate = require('../src/routes/v1/authenticate');

  routerV1.use('/authenticate', authenticate());

  app.use('/api/v1', routerV1);
  // app.use('/explorer', basicAuth(), swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

module.exports = invokeRoutes;
