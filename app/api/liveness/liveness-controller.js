'use strict';

const liveness = async (req, res, next) => {
  try {
    const memory = process.memoryUsage();

    const response = {
      uptime: Math.floor(process.uptime()),
      version: process.version,
      sys: {
        memory: Math.floor(memory.heapUsed * 10 ** -6),
      },
    };

    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  liveness,
};
