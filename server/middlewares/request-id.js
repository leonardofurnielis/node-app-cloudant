'use strict';

const uuid_v1 = require('uuid').v1();

module.exports = () => {
  return (req, res, next) => {
    const correlation_id = 'x-correlation-id';
    if (
      !req.headers[correlation_id] ||
      (req.headers[correlation_id] && req.headers[correlation_id].trim() === '')
    ) {
      req[correlation_id] = uuid_v1();
      res.setHeader(correlation_id, req[correlation_id]);
      next();
    } else {
      req[correlation_id] = req.headers[correlation_id];
      res.setHeader(correlation_id, req[correlation_id]);
      next();
    }
  };
};
