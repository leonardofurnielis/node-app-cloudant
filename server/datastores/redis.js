'use strict';

const redis = require('redis');
const path = require('path');
const fs = require('fs');

const connections = require('./connections');

module.exports = (db) => {
  const options = {};

  // DB uses sslCA Certificate
  if (connections[db].cert64) {
    options.tls = {
      ca: fs.readFileSync(path.join(__dirname, `../../ca/${connections[db].cert}`)),
      servername: new URL(connections[db].uri).hostname,
    };
  }

  let connection;

  if (options.servername) {
    connection = redis.createClient(connections[db].uri, options);

    // Connection throws an error
    connection.on('error', (err) => {
      console.error(err);
    });
  }

  return connection;
};
