'use strict';

const schema = require('../../../datastores/schemas/access-token/v1');
const connection = require('../../../datastores/connections/mongodb')('db-south');

module.exports = connection.model('access_token', schema);
