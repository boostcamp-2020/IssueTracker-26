const userModel = require('../models/userModel');

const signUp = async (userName, password) => {
  try {
    const userId = await userModel.signUp(userName, password);
    return userId;
  } catch (err) {
    return undefined;
  }
};

const checkDuplicated = async (userName) => {
  try {
    const userId = await userModel.checkDuplicated(userName);
    return userId;
  } catch (err) {
    return undefined;
  }
};

module.exports = {
  signUp,
  checkDuplicated,
};
