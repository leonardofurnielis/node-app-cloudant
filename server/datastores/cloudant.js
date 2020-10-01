'use strict';

const Cloudant = require('@cloudant/cloudant');

const connections = require('./connections');

module.exports = (db) => {
  let connection;

  if (connections[db].uri && connections[db].iamApiKey && connections[db] === 'cloudant') {
    Cloudant(
      {
        url: connections[db].uri,
        plugins: { iamauth: { iamApiKey: connections[db].iamApiKey } },
      },
      (err, cloudant) => {
        // Connection throws an error
        if (err) {
          return console.error(err);
        }

        // Create database if not exists
        cloudant.db.create(db, (error) => {
          if (error && error.statusCode !== 412) {
            console.error(error);
          }

          connection = cloudant.db.use(db);
        });
      }
    );
  }

  return connection;
};
