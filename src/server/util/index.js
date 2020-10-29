const jwt = require('jsonwebtoken');

const makeToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const randomString = () => {
  return (
    Math.random().toString(36).substring(2) +
    Math.random().toString(36).substring(2)
  );
};

module.exports = {
  makeToken,
  randomString,
};
