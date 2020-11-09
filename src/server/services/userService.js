const userModel = require('../models/userModel');
const { makeHashPassword } = require('../util');

const signUp = async (userName, password) => {
  try {
    const userId = await userModel.signUp(userName, makeHashPassword(password));
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

const findOrCreateUser = async (userInfo) => {
  try {
    const { userName, profile } = userInfo;
    const [user] = await userModel.findSocialUser(userName);
    if (user.length)
      return {
        id: user.id,
        userName: user.userName,
        profile: user.profile,
        social: 1,
      };
    const newUser = await userModel.createSocialUser(userInfo);
    return { id: newUser, userName, profile, social: 1 };
  } catch (err) {
    return undefined;
  }
};

module.exports = {
  signUp,
  checkDuplicated,
  findOrCreateUser,
};
