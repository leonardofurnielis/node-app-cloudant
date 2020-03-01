'use strict';

const schema = require('../../../datasources/schemas/access-token/v1');
const connection = require('../../../datasources/connections/mongodb')('db-south');

module.exports = connection.model('access_token', schema);
