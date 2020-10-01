'use strict';

module.exports = {
  db_development: {
    uri: process.env.DB_URI,
    iamApiKey: '',
    adapter: 'cloudant',
  },
  db_qa: {
    uri: process.env.DB_URI,
    iamApiKey: '',
    adapter: 'cloudant',
  },
  db_production: {
    uri: process.env.DB_URI,
    iamApiKey: '',
    adapter: 'cloudant',
  },
  redis: {
    uri: process.env.REDIS_URI,
    adapter: 'redis',
    // sslCA: 'filename.cer',
  },
};
