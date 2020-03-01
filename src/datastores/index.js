'use strict';

module.exports = {
  'mongodb_development': {
    uri: process.env.MONGODB_URI,
  },
  'mongodb_qa': {
    uri: process.env.MONGODB_URI,
  },
  'mongodb_production': {
    uri: process.env.MONGODB_URI,
  },
  'redis': {
    uri: process.env.REDIS_URI,
    cert64: '797cf5ae-4027-11e9-a020-42025ffb08c8.crt',
  },
};
