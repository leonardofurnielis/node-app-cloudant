'use strict';

const bcrypt = require('bcryptjs');
const db = require('./dao/cloudant');
const schema = require('../schemas/users');

const dbName = 'users';

const list = () => db.list(dbName);

const insert = (doc) => {
  return new Promise((resolve, reject) => {
    const value = schema.validate(doc);

    if (value.error) {
      return reject(value.error);
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(doc.password, salt, (error, hash) => {
        doc.password = hash;
      });
    });

    return resolve(db.insert(dbName, doc));
  });
};

module.exports = {
  list,
  insert,
};
