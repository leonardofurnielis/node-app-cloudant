'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const passport = require('passport');
const morgan = require('morgan');
const httpErrorHandler = require('http-json-error-handler');

const xGlobalTransactionId = require('./lib/middlewares/XGlobalTransactionId');
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
app.use(
  morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, './tmp/access.log'), { flags: 'a' }),
    skip: (req, res) => res.statusCode <= 400,
  })
);

app.use(xGlobalTransactionId());

// Server initialization
invoke(app, __dirname);

// HTTP 404 handler
app.use((req, res) => {
  const error = {
    message: `The Requested URL ('${req.path}') was not found on this server.`,
    details: {},
    http_response: {
      message:
        'We could not find the resource you requested. Please refer to the documentation for the list of resources.',
      code: 404,
    },
  };
  res.status(404).send(error);
});

// HTTP error handler
app.use(httpErrorHandler(process.env.NODE_ENV));

module.exports = app;
