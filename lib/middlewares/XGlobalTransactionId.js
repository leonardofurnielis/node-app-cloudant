'use strict';

const uuid = require('uuid/v1');

module.exports = () => {
  return function XGlobalTransactionId(req, res, next) {
    req.transactionId = uuid().replace(/-/g, '');
    res.set('X-Global-Transaction-Id', uuid().replace(/-/g, ''));
    next();
  };
};
