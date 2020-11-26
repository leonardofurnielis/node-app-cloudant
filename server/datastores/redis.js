'use strict';

const redis = require('redis');
const path = require('path');
const fs = require('fs');

const connections = require('./connections');

module.exports = (conn) => {
  const options = {};

  // DB uses ssl certificate
  if (connections[conn].ssl_ca) {
    options.tls = {
      ca: fs.readFileSync(path.join(__dirname, `../../ca/${connections[conn].ssl_ca}`)),
      servername: new URL(connections[conn].uri).hostname,
    };
  }

  let connection;

  if (options.servername && connections[conn].adapter === 'redis') {
    connection = redis.createClient(connections[conn].uri, options);

    // Connection throws an error
    connection.on('error', (err) => {
      return console.error(err);
    });
  }

  return connection;
};
