'use strict';

module.exports = {
  db_south: {
    uri: process.env.MONGODB_URI,
  },
  cache_redis: {
    uri: process.env.REDIS_URI,
    cert64: '797cf5ae-4027-11e9-a020-42025ffb08c8.cert',
  },
};
