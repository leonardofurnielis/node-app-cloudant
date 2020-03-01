/* eslint-disable global-require */

'use strict';

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

module.exports = {
  passport: () => {
    // const Users = require('../../api/models/users');

    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromHeader('authorization');
    opts.secretOrKey = '01109c30-6c00-4367-ac03-40cd69940808';
    passport.use(
      new JwtStrategy(opts, async (jwtPayload, done) => {
        try {
          const user = await Users.findById(jwtPayload._id);

          if (user && user.active === true) {
            return done(null, user);
          }
          done(null, false);

        } catch (err) {
          return done(err, false);
        }
      })
    );
  }
}
