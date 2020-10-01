'use strict';

const Cloudant = require('@cloudant/cloudant');

const connections = require('./connections');

module.exports = (conn, dbName) => {
  let connection;

  if (connections[conn].uri && connections[conn].iamApiKey && connections[conn] === 'cloudant') {
    Cloudant(
      {
        url: connections[conn].uri,
        plugins: { iamauth: { iamApiKey: connections[conn].iamApiKey } },
      },
      (err, cloudant) => {
        // Connection throws an error
        if (err) {
          return console.error(err);
        }

        // Create database if not exists
        cloudant.db.create(dbName, (error) => {
          if (error && error.statusCode !== 412) {
            console.error(error);
          }

          connection = cloudant.db.use(conn);
        });
      }
    );
  }

  return connection;
};
