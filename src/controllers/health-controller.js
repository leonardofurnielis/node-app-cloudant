'use strict';

const server = async (req, res, next) => {
  try {
    const memory = process.memoryUsage();

    const healthcheck = {
      status: 'UP',
      uptime: Math.floor(process.uptime()),
    };

    return res.status(200).json(healthcheck);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  server,
};
