'use strict';

module.exports = {
  database: {
    uri: process.env.DATABASE_URI,
    iam_api_key: process.env.DATABASE_APIKEY,
    adapter: 'cloudant',
  },
  redis: {
    uri: process.env.REDIS_URI,
    adapter: 'redis',
    // ssl_ca: 'filename.cer',
  },
};
