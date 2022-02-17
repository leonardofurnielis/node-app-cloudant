'use strict';

const bcrypt = require('bcryptjs');
const schema = require('./users-schema');
const db = require('../../../dao/cloudant');

const dbName = 'users';

const list = () =>
  db.find(dbName, {
    selector: {},
    fields: ['_id', '_rev', 'createdAt', 'updatedAt', 'username', 'name', 'email', 'active'],
  });

const find = (id) =>
  db.find(dbName, {
    selector: { _id: id },
    fields: ['_id', '_rev', 'createdAt', 'updatedAt', 'username', 'name', 'email', 'active'],
  });

const insert = (doc) =>
  new Promise((resolve, reject) => {
    const docValidate = schema.validate(doc, { stripUnknown: true });

    if (docValidate.error) {
      return reject(docValidate.error);
    }
    doc = docValidate.value;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(doc.password, salt, (error, hash) => {
        doc.password = hash;
      });
    });

    doc._id = `user:${doc.username}-${doc.email}`;

    return resolve(db.insert(dbName, doc));
  });

const update = (doc) =>
  new Promise((resolve, reject) => {
    const docValidate = schema.validate(doc, { stripUnknown: true });

    if (docValidate.error) {
      return reject(docValidate.error);
    }
    doc = docValidate.value;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(doc.password, salt, (error, hash) => {
        doc.password = hash;
      });
    });

    return resolve(db.update(dbName, doc));
  });

const remove = (id) => db.remove(dbName, id);

module.exports = {
  list,
  find,
  insert,
  update,
  remove,
};
