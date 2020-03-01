'use strict';

const mongoose = require('mongoose');
const validator = require('validator');

const Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      index: true,
      required: true,
      trim: true,
      unique: true,
      minlength: 5,
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
        message: '{VALUE} is not an email',
      },
    },
    acl: {
      type: String,
      index: true,
      required: true,
      enum: ['admin', 'manager', 'editor', 'viewer'],
    },
    password: {
      type: String,
      required: true,
      minlength: 1,
    },
    active: {
      type: Boolean,
      index: true,
      default: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      ref: 'users',
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      ref: 'users',
    },
  },
  { collection: 'users', timestamps: true }
);

Schema.index({
  createdAt: 1,
});

module.exports = Schema;
