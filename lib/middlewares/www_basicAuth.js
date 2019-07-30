'use strict';

module.exports = () => {
  // eslint-disable-next-line global-require
  const UserModel = require('../../src/models/v1/users');

  return async function wwwBasicAuth(req, res, next) {
    try {
      const base64Auth = (req.headers.authorization || '').split(' ')[1] || '';
      const [username, password] = Buffer.from(base64Auth, 'base64')
        .toString()
        .split(':');

      await UserModel.findByCredentials(username, password);

      return next();
    } catch (err) {
      res.set('WWW-Authenticate', 'Basic realm="401"');
      res.status(401).send('Unauthorized');
    }
  };
};
