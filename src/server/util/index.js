const jwt = require('jsonwebtoken');

const makeToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

module.exports = {
  makeToken,
};
