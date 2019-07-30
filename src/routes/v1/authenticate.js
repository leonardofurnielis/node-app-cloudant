'use strict';

const express = require('express');
const controller = require('../../controllers/v1/authenticateController');

module.exports = middlewares => {
  const router = express.Router();

  if (middlewares) {
    middlewares.forEach(middleware => router.use(middleware));
  }

  router.get('/', controller.login);
  router.get('/jwt-generator', controller.jwtGenerator);
  router.get('/jwt-revoke', controller.jwtRevoke);

  return router;
};
