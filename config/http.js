'use strict';

const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const passport = require('passport');

const TransactionId = require('./middlewares/transaction-id');

module.exports = async (app) => {
  // Middlewares
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(compression());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(TransactionId());
};
