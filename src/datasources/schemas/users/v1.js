'use strict';

const mongoose = require('mongoose');
const validator = require('validator');

const Schema = new mongoose.Schema(
  {
    serial: {
      index: true,
      unique: true,
      type: String,
      trim: true,
    },
    username: {
      type: String,
      index: true,
      required: true,
      trim: true,
      unique: true,
      minlength: 3,
      lowercase: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      index: true,
      required: true,
      trim: true,
      unique: true,
      minlength: 5,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: 'The {VALUE} is not an email',
      },
    },
    group: {
      type: String,
      index: true,
      required: true,
      enum: ['admin', 'manager', 'editor', 'viewer'],
    },
    active: {
      type: Boolean,
      index: true,
      default: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 1,
    },
  },
  { collection: 'users', timestamps: true }
);

Schema.index({
  createdAt: 1,
});

module.exports = Schema;
