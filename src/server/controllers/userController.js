const userService = require('../services/userService');

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

module.exports = {
  signUp,
};
