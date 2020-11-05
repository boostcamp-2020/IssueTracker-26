const passport = require('passport');
const userService = require('../services/userService');
const { makeToken, randomString } = require('../util');

const signUp = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res.status(400).end();
  }
  const userId = await userService.signUp(userName, password);
  if (userId) {
    return res.status(201).json({ token: makeToken({ id: userId, userName }) });
  }
  return res.status(500).end();
};

const checkDuplicated = async (req, res) => {
  const { userName } = req.body;
  if (!userName) {
    return res.status(400).end();
  }
  const userId = await userService.checkDuplicated(userName);
  if (!userId) {
    return res.status(202).end();
  }
  return res.status(409).end();
};

const signIn = (req, res, next) =>
  passport.authenticate('local', (err, user) => {
    if (err) next(err);
    if (!user) return res.status(404).json({ token: undefined });
    const { id, userName } = user;
    return res.status(200).json({ token: makeToken({ id, userName }) });
  })(req, res, next);

const failGitHubAuth = (req, res) => {
  return res.status(401).json({ token: undefined });
};

const gitHubAuth = async (req, res) => {
  const { user } = req.session.passport;
  const userId = await userService.checkDuplicated(user);
  if (userId) {
    const token = makeToken({ id: userId, userName: user });
    return res.status(200).json({ token });
  }
  const newUserId = await userService.signUp(user, randomString());
  const token = makeToken({ id: newUserId, userName: user });
  return res.status(200).json({ token });
};

module.exports = {
  signUp,
  checkDuplicated,
  signIn,
  gitHubAuth,
  failGitHubAuth,
};
