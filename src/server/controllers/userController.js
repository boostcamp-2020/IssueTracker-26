const passport = require('passport');
const userService = require('../services/userService');
const { makeToken } = require('../util');

const signUp = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res.status(400).end();
  }
  const userId = await userService.signUp(userName, password);
  if (userId) {
    return res.status(201).end();
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

module.exports = {
  signUp,
  checkDuplicated,
};
