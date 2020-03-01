/* eslint-disable global-require */

'use strict';

const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

module.exports = passport => {
  const UsersV1 = require('../api/models/users/v1');
  const AccessTokenV1 = require('../api/models/access-token/v1');

  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromHeader('authorization');
  // ExtractJwt.fromUrlQueryParameter('authorization');
  opts.secretOrKey = process.env.SECRET;
  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      try {
        if (jwtPayload.aud === 'USER') {
          const user = await UsersV1.findById(jwtPayload._id);

          if (user && user.active === true) {
            return done(null, user);
          }
          done(null, false);
        } else if (jwtPayload.aud === 'APPLICATION') {
          const accessToken = await AccessTokenV1.findById(jwtPayload._id);

          if (accessToken && accessToken.active === true) {
            return done(null, accessToken);
          }
          done(null, false);
        } else {
          done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
