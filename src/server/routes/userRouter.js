const router = require('express').Router();
const passport = require('passport');
const userController = require('../controllers/userController');

// public routes
router.post('/user/signIn', userController.signIn);
router.post('/user', userController.signUp);
router.post('/userName', userController.checkDuplicated);
router.get('/user/auth/github/fail', userController.failGitHubAuth);
router.get(
  '/auth/github',
  passport.authenticate('github', (req, res) => {
    return res.status(401).end();
  }),
);
router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api/user/auth/github/fail',
  }),
  userController.gitHubAuth,
);

// private routes
router.get('/user', userController.getUserInfo);

module.exports = router;
