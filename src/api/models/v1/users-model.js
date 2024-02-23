'use strict';

const bcrypt = require('bcryptjs');
const Joi = require('joi');
const db = require('../../../odm/cloudant-odm');

const dbName = 'users';

const schema = Joi.object({
  _id: Joi.any(),
  _rev: Joi.any(),
  createdAt: Joi.date().timestamp().default(new Date()),
  updatedAt: Joi.date().timestamp().default(new Date()),
  username: Joi.string().alphanum().min(4).max(30).lowercase().required(),
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  active: Joi.boolean().default(true),
});

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
