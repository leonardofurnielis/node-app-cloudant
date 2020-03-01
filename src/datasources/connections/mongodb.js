'use strict';

const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const connections = require('../datasources');

mongoose.Promise = global.Promise;

module.exports = db => {
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };

  // DB uses sslCA Certificate
  if (connections[db].cert64) {
    options.sslCA = fs.readFileSync(path.join(__dirname, `../cert/${connections[db].cert64}`));
  }

  const connection = mongoose.createConnection(connections[db].uri, options);

  // Connection throws an error
  connection.on('error', err => {
    console.error(err);
  });

  return connection;
};
