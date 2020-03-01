'use strict';

const schema = require('../../schemas/access-token/v1');
const connection = require('../../../db/connections/mongodb')('db-south');

module.exports = connection.model('access_token', schema);
