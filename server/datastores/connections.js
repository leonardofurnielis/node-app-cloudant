'use strict';

module.exports = {
  db_development: {
    uri: process.env.MongodbUri,
    adapter: 'mongodb',
  },
  db_qa: {
    uri: process.env.MongodbUri,
    adapter: 'mongodb',
  },
  db_production: {
    uri: process.env.MongodbUri,
    adapter: 'mongodb',
  },
  redis: {
    uri: process.env.REDIS_URI,
    adapter: 'redis',
    // cert64: 'filename.cer',
  },
};
