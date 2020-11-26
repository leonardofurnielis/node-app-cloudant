'use strict';

const cors = require('cors');
const body_parser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const passport = require('passport');
const error_handler = require('node-error-handler');

const routes_loader = require('./routes');
const correlation_id = require('../middlewares/correlation_id');
const url_not_found = require('../middlewares/url_not_found');

module.exports = async (app) => {
  // Middlewares
  app.use(cors());
  app.use(helmet());
  app.use(body_parser.urlencoded({ extended: true }));
  app.use(body_parser.json());
  app.use(compression());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(correlation_id());

  // Load API routes
  routes_loader(app);

  // HTTP 404 handler
  app.use(url_not_found());

  // HTTP error handler
  app.use(error_handler());
};
