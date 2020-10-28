const userModel = require('../models/userModel');

const signUp = async (userName, password) => {
  try {
    const userId = await userModel.signUp(userName, password);
    return userId;
  } catch (err) {
    return undefined;
  }
};

module.exports = {
  signUp,
};
