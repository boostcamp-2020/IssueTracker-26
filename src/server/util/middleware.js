const passport = require('passport');

const passportJWTAuth = (req, res, next) =>
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).end();
    req.user = user;
    return next();
  })(req, res, next);

module.exports = {
  passportJWTAuth,
};
