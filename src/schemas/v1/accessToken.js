'use strict';

const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
  {
    token: {
      index: true,
      type: String,
      required: true,
    },
    active: {
      index: true,
      type: Boolean,
      default: true,
    },
    serial: {
      index: true,
      type: String,
      required: true,
      trim: true,
    },
  },
  { collection: 'access_token', timestamps: true }
);

Schema.index({
  createdAt: 1,
});

module.exports = Schema;
