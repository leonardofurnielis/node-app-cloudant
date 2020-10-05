'use strict';

const jwt = require('jsonwebtoken');
// const jwtDecode = require('jwt-decode');
const { ObjectId } = require('mongodb');
const _ = require('lodash');

// const AccessTokenV1 = require('../../models/access-token/v1');
// const UsersV1 = require('../../models/users/v1');

const authenticate = async (req, res, next) => {
  try {
    const base64Auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [username, password] = Buffer.from(base64Auth, 'base64').toString().split(':');

    const user = await UsersV1.findByCredentials(username, password);
    const payload = _.pick(user, ['_id', 'serial', 'username', 'fullname', 'group', 'active']);
    payload.aud = 'USER';

    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: '8h',
    });

    return res.status(200).json({ jwt: `${token}` });
  } catch (err) {
    err.status = 401;
    next(err);
  }
};

const jwtGenerator = async (req, res, next) => {
  try {
    const decoded = jwtDecode(req.headers.authorization);
    const _id = new ObjectId();
    const payload = _.pick(decoded, ['serial', 'group', 'active']);
    payload._id = _id;
    payload.aud = 'APPLICATION';

    const token = jwt.sign(payload, process.env.SECRET);
    const accessToken = new AccessTokenV1({
      _id,
      jwt: token,
      serial: payload.serial,
    });
    await accessToken.save();

    return res.status(200).json({ jwt: `${token}` });
  } catch (err) {
    err.status = 401;
    next(err);
  }
};

const jwtRevoke = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const http_response = await AccessTokenV1.findOneAndUpdate(
      { jwt: token },
      { $set: { active: false } },
      { new: true }
    );

    return res.status(200).json(http_response);
  } catch (err) {
    err.status = 401;
    next(err);
  }
};

module.exports = {
  authenticate,
  jwtGenerator,
  jwtRevoke,
};
