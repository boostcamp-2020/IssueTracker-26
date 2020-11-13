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

const findUserById = async (id) => {
  try {
    const user = await userModel.findUserById(id);
    if (user.length || !user) {
      const { id: userId, userName, profile } = user[0];
      return { id: userId, userName, profile };
    }
    return {};
  } catch (err) {
    return undefined;
  }
};

const findOrCreateUser = async (userInfo) => {
  try {
    const { userName, profile } = userInfo;
    const user = await userModel.findSocialUser(userName);
    if (user.length || !user) {
      const selectedUser = user[0];
      await userModel.updateUser(selectedUser.id, profile);
      return {
        id: selectedUser.id,
        userName: selectedUser.userName,
        profile: selectedUser.profile,
        social: 1,
      };
    }
    const newUser = await userModel.createSocialUser(userInfo);
    return { id: newUser, userName, profile, social: 1 };
  } catch (err) {
    return undefined;
  }
};

const getUserByAll = async () => {
  try {
    const userList = await userModel.getUserByAll();
    return userList;
  } catch (err) {
    return undefined;
  }
};

module.exports = {
  signUp,
  checkDuplicated,
  findOrCreateUser,
  getUserByAll,
  findUserById,
};
