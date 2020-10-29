const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const userService = require('../services/userService');

const JWTStrategy = passportJWT.Strategy;
const extractJWT = passportJWT.ExtractJwt;

const initPassport = () => {
  const JWTOption = {
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  const localOption = {
    usernameField: 'userName',
    passwordField: 'password',
    session: false,
  };

  passport.use(
    new LocalStrategy(localOption, async (userName, password, done) => {
      try {
        if (!userName) return done(null, undefined);
        const user = await userService.checkDuplicated(userName);
        if (!user) return done(null, undefined);
        if (user && user.password === password) return done(null, user);
        return done(null, undefined);
      } catch (err) {
        return done(err, undefined);
      }
    }),
  );

  passport.use(
    new JWTStrategy(JWTOption, (payload, done) => {
      const { user } = payload;
      if (!user) return done(null, undefined);
      return done(null, user);
    }),
  );

  return passport.initialize();
};

module.exports = initPassport;
