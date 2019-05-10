'use strict';

module.exports.index = async (req, res) => {
  const cwt = {};

  try {
    cwt.data = 'GET /foo';
    cwt.code = 200;
    return res.status(200).json(cwt);
  } catch (err) {
    cwt.error = err;
    cwt.code = 500;
    return res.status(401).json(cwt);
  }
};
