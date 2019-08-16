'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const passport = require('passport');
const morgan = require('morgan');
const httpErrorHandler = require('http-json-error-handler');

const ignoreFavicon = require('./lib/middlewares/ignoreFavicon');

const app = express();
const invoke = require('./invoke');

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(ignoreFavicon());
app.use(helmet());
app.use(compression());
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev', { skip: (req, res) => res.statusCode <= 400 }));

// Server initialization
invoke(app, __dirname);

// HTTP 404 handler
app.use((req, res) => {
  const error = {
    error: {
      code: 404,
      message: 'NOT FOUND',
      details: `The Requested ${req.method} to URL ('${req.path}') was not found on this server`,
    },
  };
  res.status(404).send(error);
});

// HTTP error handler
app.use(httpErrorHandler(process.env.NODE_ENV));

module.exports = app;
