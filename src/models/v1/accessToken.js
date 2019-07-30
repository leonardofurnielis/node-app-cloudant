'use strict';

const schema = require('../../schemas/v1/accessToken');
const connection = require('../../../db/connections/mongodb')('db_south');

module.exports = connection.model('access_token', schema);
