const passport = require('passport');
const fetch = require('node-fetch');
const userService = require('../services/userService');
const { makeToken, randomString } = require('../util');

const getUserInfo = (req, res) => {
  const { userName, id } = req.user;
  if (userName) return res.status(200).json({ userName, userId: id });
  return res.status(401).end();
};

const signUp = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res.status(400).end();
  }
  const userId = await userService.signUp(userName, password);
  if (userId) {
    return res.status(201).json({
      id: userId,
      userName,
      token: makeToken({ id: userId, userName }),
    });
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
    return res
      .status(200)
      .json({ userId: id, userName, token: makeToken({ id, userName }) });
  })(req, res, next);

const gitHubAuth = async (req, res) => {
  const { code } = req.body;
  try {
    const { error, access_token: accessToken } = await fetch(
      `https://github.com/login/oauth/access_token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        }),
      },
    ).then((response) => response.json());
    console.log(error)
    if (error) return res.status(401).end();
    const { login, avatar_url: profile } = await fetch(
      `https://api.github.com/user`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `token ${accessToken}`,
        },
      },
    ).then((response) => response.json());
    const userInfo = {
      userName: login,
      password: randomString(),
      profile,
    };
    const { id, userName } = await userService.findOrCreateUser(userInfo);
    return res
      .status(200)
      .json({ id, userName, profile, token: makeToken({ id, userName }) });
  } catch (err) {
    return res.status(401).end();
  }
};

const getUserByAll = async (req, res) => {
  const userList = await userService.getUserByAll();
  if (userList) {
    return res.status(200).json(userList);
  }
  return res.status(500).end();
};

module.exports = {
  signUp,
  checkDuplicated,
  signIn,
  gitHubAuth,
  getUserInfo,
  getUserByAll,
};
