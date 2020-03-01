'use strict';

const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const connections = require('../index');

mongoose.Promise = global.Promise;

module.exports = db => {
  const options = {
    dbName: `${db}`,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    poolSize: 100,
  };

  // DB uses sslCA Certificate
  if (connections[db].cert) {
    options.sslCA = fs.readFileSync(path.join(__dirname, `../../certs/${connections[db].cert}`));
  }

  const connection = mongoose.createConnection(connections[db].uri, options);

  // Connection throws an error
  connection.on('error', err => {
    console.error(err);
  });

  return connection;
};
