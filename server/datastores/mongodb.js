'use strict';

const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const connections = require('./connections');

mongoose.Promise = global.Promise;

module.exports = (db) => {
  const options = {
    dbName: `${db}`,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    poolSize: 100,
  };

  // DB uses sslCA Certificate
  if (connections[db].ca_filename) {
    options.sslCA = fs.readFileSync(
      path.join(__dirname, `../../ca/${connections[db].ca_filename}`)
    );
  }

  let connection;

  if (connections[db].uri && connections[db] === 'mongodb') {
    connection = mongoose.createConnection(connections[db].uri, options);

    // Connection throws an error
    connection.on('error', (err) => {
      return console.error(err);
    });
  }

  return connection;
};
