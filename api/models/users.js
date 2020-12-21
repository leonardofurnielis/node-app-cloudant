'use strict';

const bcrypt = require('bcryptjs');
const db = require('./dao/cloudant');
const schema = require('../schemas/users');

const db_name = 'users';

const list = () =>
  db.find(db_name, {
    selector: {},
    fields: ['_id', '_rev', 'createdAt', 'username', 'name', 'email', 'active'],
  });

const find = (id) =>
  db.find(db_name, {
    selector: { _id: id },
    fields: ['_id', '_rev', 'createdAt', 'username', 'name', 'email', 'active'],
  });

const find_by_credentials = (username, password) =>
  db
    .find(db_name, {
      selector: { $or: [{ username }, { email: username }] },
      fields: ['_id', '_rev', 'username', 'password', 'name', 'email', 'active'],
    })
    .then((doc) => {
      if (doc.docs.length < 0) {
        return Promise.reject(new Error("The requested 'user' was not found"));
      }

      return new Promise((resolve, reject) => {
        bcrypt.compare(password, doc.docs[0].password, (err, isMatch) => {
          if (!isMatch || err) {
            reject(new Error("The requested 'password' was wrong"));
          }
          resolve(doc);
        });
      });
    });

const insert = (doc) =>
  new Promise((resolve, reject) => {
    const doc_validate = schema.validate(doc);

    if (doc_validate.error) {
      return reject(doc_validate.error);
    }
    doc = doc_validate.value;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(doc.password, salt, (error, hash) => {
        doc.password = hash;
      });
    });

    return resolve(db.insert(db_name, doc));
  });

const update = (doc) =>
  new Promise((resolve, reject) => {
    const doc_validate = schema.validate(doc);

    if (doc_validate.error) {
      return reject(doc_validate.error);
    }
    doc = doc_validate.value;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(doc.password, salt, (error, hash) => {
        doc.password = hash;
      });
    });

    return resolve(db.update(db_name, doc));
  });

const remove = (id) => db.remove(db_name, id);

module.exports = {
  list,
  find,
  find_by_credentials,
  insert,
  update,
  remove,
};
