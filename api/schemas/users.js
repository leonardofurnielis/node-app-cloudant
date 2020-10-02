'use strict';

const Joi = require('joi');

const schema = Joi.object({
  date: Joi.date().timestamp().default(new Date().getTime()),
  username: Joi.string().alphanum().min(3).max(30).required(),
  fullName: Joi.string().min(5).required(),
  email: Joi.string().alphanum().email().required(),
  password: Joi.string().min(5).required(),
  active: Joi.boolean().required().default(true),
});

module.exports = schema;
