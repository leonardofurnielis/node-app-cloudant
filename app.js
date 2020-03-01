'use strict';

const express = require('express');

const server = require('./src/server');

async function startServer() {
  const app = express();

  server.listen(app);
}

startServer();
